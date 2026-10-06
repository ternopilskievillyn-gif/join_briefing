const STEPS = [
  {
    id: 'nome',
    t: 'text',
    q: 'Qual é o nome da marca?',
    h: 'Pode ser o nome atual, um nome provisório ou o que você pretende usar.',
    ph: 'Ex.: Padaria Aurora',
    req: 1,
  },
  {
    id: 'faz',
    t: 'area',
    q: 'O que a marca faz, em poucas palavras?',
    h: 'Explique como contaria para alguém que nunca ouviu falar dela.',
    ph: 'Ex.: Pães artesanais de fermentação natural, entregues no bairro.',
    req: 1,
  },
  {
    id: 'dif',
    t: 'area',
    q: 'O que a torna diferente das outras?',
    h: 'Pense no que os clientes elogiam ou no que você faz que os concorrentes não fazem.',
    ph: 'Ex.: Ingredientes locais e entrega no mesmo dia.',
    req: 1,
  },
  {
    id: 'pub',
    t: 'area',
    q: 'Quem você quer atingir?',
    h: 'Descreva quem são as pessoas: idade, interesses, onde estão, o que valorizam.',
    ph: 'Ex.: Famílias de 28 a 45 anos que valorizam comida de verdade.',
    req: 1,
  },
  {
    id: 'pers',
    t: 'multi',
    q: 'Se a marca fosse uma pessoa, como ela seria?',
    h: 'Escolha até 4 palavras.',
    max: 4,
    o: [
      'Confiável',
      'Acolhedora',
      'Moderna',
      'Ousada',
      'Sofisticada',
      'Divertida',
      'Tecnológica',
      'Humana',
      'Sóbria',
      'Criativa',
      'Jovem',
      'Tradicional',
    ],
    req: 1,
  },
  {
    id: 'esc',
    t: 'scale',
    q: 'Onde a marca fica entre estes extremos?',
    h: 'Ajuste as barras que fazem sentido para a marca (pelo menos uma). As que você não mexer serão ignoradas.',
    s: [
      ['Clássica', 'Moderna'],
      ['Séria', 'Descontraída'],
      ['Sofisticada', 'Acessível'],
      ['Minimalista', 'Expressiva'],
    ],
    req: 1,
  },
  {
    id: 'tipo',
    t: 'single',
    q: 'Que tipo de logo faz mais sentido?',
    h: 'Se estiver em dúvida, escolha “Ainda não sei” e deixamos isso para a exploração.',
    o: [
      ['Só texto', 'O nome desenhado com tipografia'],
      ['Símbolo e texto', 'Um ícone ao lado do nome'],
      ['Só símbolo', 'Um ícone que se reconhece sozinho'],
      ['Monograma', 'Iniciais da marca'],
      ['Ainda não sei', ''],
    ],
    req: 1,
  },
  {
    id: 'cor',
    t: 'color',
    q: 'Quais cores combinam com a marca?',
    h: 'Escolha as que gostaria de ver. Depois, conte quais prefere evitar.',
    o: [
      ['Azul', '#2f5bff'],
      ['Verde', '#1f9d6b'],
      ['Amarelo', '#f5b800'],
      ['Laranja', '#f26a21'],
      ['Vermelho', '#e03131'],
      ['Rosa', '#ec6aa8'],
      ['Roxo', '#7048e8'],
      ['Marrom', '#8a5a3c'],
      ['Preto', '#18181b'],
      ['Branco', '#ffffff'],
      ['Cinza', '#a1a1aa'],
    ],
    ph: 'Cores ou combinações que deseja evitar (opcional)',
    req: 1,
  },
  {
    id: 'ref',
    t: 'area',
    q: 'Quais marcas você admira visualmente?',
    h: 'Pode ser de qualquer área. Diga também o que chamou sua atenção em cada uma.',
    ph: 'Ex.: Nubank, pela simplicidade e pela cor marcante.',
    req: 1,
  },
  {
    id: 'evit',
    t: 'area',
    q: 'O que você não quer ver na marca?',
    h: 'Estilos, símbolos, clichês ou sensações que devem ficar de fora.',
    ph: 'Ex.: Nada de trigo estilizado ou fontes manuscritas.',
    req: 1,
  },
  {
    id: 'extra',
    t: 'area',
    q: 'Há mais alguma coisa que devemos saber?',
    h: 'Qualquer detalhe que não coube nas perguntas anteriores. Se não houver, escreva “Não”.',
    ph: 'Ex.: Já temos um site e queremos manter a cor verde.',
    req: 1,
  },
  {
    id: 'contato',
    t: 'fields',
    q: 'Como podemos falar com você?',
    h: 'Usaremos só para retornar sobre este briefing.',
    f: [
      ['nome', 'Seu nome', 'text'],
      ['email', 'E-mail', 'email'],
      ['tel', 'WhatsApp (opcional)', 'text'],
    ],
    req: 1,
  },
];
const LABEL = {
  nome: 'Nome da marca',
  faz: 'O que a marca faz',
  dif: 'Diferencial',
  pub: 'Público',
  pers: 'Personalidade',
  esc: 'Posicionamento',
  tipo: 'Tipo de logo',
  cor: 'Cores',
  ref: 'Referências',
  evit: 'O que evitar',
  extra: 'Observações',
  contato: 'Contato',
};
const A = {};
let i = -1;
const app = document.getElementById('app'),
  bar = document.getElementById('bar'),
  count = document.getElementById('count');
try {
  Object.assign(A, JSON.parse(localStorage.getItem('briefing-join') || '{}'));
} catch (e) {}
const save = () => {
  try {
    localStorage.setItem('briefing-join', JSON.stringify(A));
  } catch (e) {}
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function filled(s) {
  const v = A[s.id];
  if (s.t === 'fields') return v && v.nome && v.email;
  if (s.t === 'color') return v && v.sel && v.sel.length;
  if (s.t === 'scale') return v && s.s.some((_, k) => v[k]);
  if (Array.isArray(v)) return v.length;
  return v && String(v).trim();
}

function render() {
  bar.style.width = (Math.max(0, i) / STEPS.length) * 100 + '%';
  if (i < 0) return intro();
  if (i >= STEPS.length) return summary();
  const s = STEPS[i];
  count.textContent = i + 1 + ' de ' + STEPS.length;
  let body = '';
  if (s.t === 'text')
    body = `<input type="text" id="in" placeholder="${esc(s.ph || '')}" value="${esc(A[s.id] || '')}" autocomplete="off">`;
  if (s.t === 'area') body = `<textarea id="in" placeholder="${esc(s.ph || '')}">${esc(A[s.id] || '')}</textarea>`;
  if (s.t === 'multi')
    body = `<div class="opts">${s.o.map((o) => `<button type="button" class="opt" aria-pressed="${(A[s.id] || []).includes(o)}" data-v="${esc(o)}">${esc(o)}</button>`).join('')}</div>`;
  if (s.t === 'single')
    body = `<div class="opts stack">${s.o.map(([o, d]) => `<button type="button" class="opt" aria-pressed="${A[s.id] === o}" data-v="${esc(o)}">${esc(o)}${d ? `<small>${esc(d)}</small>` : ''}</button>`).join('')}</div>`;
  if (s.t === 'color') {
    const v = A[s.id] || {};
    body = `<div class="sw">${s.o.map(([n, c]) => `<button type="button" class="swb" aria-pressed="${(v.sel || []).includes(n)}" data-v="${n}"><span style="background:${c}"></span>${n}</button>`).join('')}</div><div class="field" style="margin-top:24px"><input type="text" id="in" placeholder="${esc(s.ph)}" value="${esc(v.evit || '')}"></div>`;
  }
  if (s.t === 'scale') {
    const v = A[s.id] || {};
    body = s.s
      .map(
        ([a, b], k) =>
          `<div class="sc ${v[k] ? '' : 'untouched'}"><div class="poles"><b>${a}</b><b>${b}</b></div><input type="range" min="1" max="5" value="${v[k] || 3}" data-k="${k}" aria-label="${a} ou ${b}"></div>`,
      )
      .join('');
  }
  if (s.t === 'fields') {
    const v = A[s.id] || {};
    body = s.f
      .map(
        ([k, l, t]) =>
          `<div class="field"><label for="f-${k}">${l}</label><input type="${t}" id="f-${k}" data-k="${k}" value="${esc(v[k] || '')}" autocomplete="${k === 'email' ? 'email' : k === 'nome' ? 'name' : 'off'}"></div>`,
      )
      .join('');
  }
  const last = i === STEPS.length - 1;
  app.innerHTML = `<div class="step"><h2>${esc(s.q)}</h2>${s.h ? `<p class="hint">${esc(s.h)}</p>` : '<div style="height:20px"></div>'}${body}<div class="err" id="err"></div><div class="nav"><button class="btn" id="next">${last ? 'Concluir' : 'Continuar'}</button>${i > 0 ? '<button class="btn ghost" id="back">Voltar</button>' : ''}${!s.req ? '<button class="skip" id="skip">Pular</button>' : ''}</div></div>`;
  bind(s);
  const f = app.querySelector('input[type=text],input[type=email],textarea');
  if (f && s.t !== 'color') {
    f.focus({ preventScroll: true });
  }
}

function bind(s) {
  app.querySelectorAll('.opt,.swb').forEach(
    (b) =>
      (b.onclick = () => {
        const v = b.dataset.v;
        if (s.t === 'single') {
          A[s.id] = v;
          save();
          app.querySelectorAll('.opt').forEach((x) => x.setAttribute('aria-pressed', x === b));
          return;
        }
        if (s.t === 'color') {
          const o = (A[s.id] = A[s.id] || {});
          o.sel = o.sel || [];
          const k = o.sel.indexOf(v);
          k > -1 ? o.sel.splice(k, 1) : o.sel.push(v);
          b.setAttribute('aria-pressed', k < 0);
          save();
          return;
        }
        const a = (A[s.id] = A[s.id] || []);
        const k = a.indexOf(v);
        if (k > -1) {
          a.splice(k, 1);
          b.setAttribute('aria-pressed', false);
        } else {
          if (s.max && a.length >= s.max) {
            err('Escolha no máximo ' + s.max + '. Desmarque uma para trocar.');
            return;
          }
          a.push(v);
          b.setAttribute('aria-pressed', true);
        }
        err('');
        save();
      }),
  );
  app.querySelectorAll('input[type=range]').forEach((r) => {
    const set = () => {
      const o = (A[s.id] = A[s.id] || {});
      o[r.dataset.k] = +r.value;
      r.parentNode.classList.remove('untouched');
      save();
    };
    // pointerup/change also register a tap on the current value (e.g. keeping it in the middle)
    r.oninput = r.onchange = r.onpointerup = set;
  });
  const t = app.querySelector('#in');
  if (t)
    t.oninput = () => {
      if (s.t === 'color') {
        (A[s.id] = A[s.id] || {}).evit = t.value;
      } else A[s.id] = t.value;
      save();
    };
  app.querySelectorAll('[data-k]:not([type=range])').forEach(
    (f) =>
      (f.oninput = () => {
        (A[s.id] = A[s.id] || {})[f.dataset.k] = f.value;
        save();
      }),
  );
  document.getElementById('next').onclick = next;
  const bk = document.getElementById('back');
  if (bk)
    bk.onclick = () => {
      i--;
      render();
    };
  const sk = document.getElementById('skip');
  if (sk)
    sk.onclick = () => {
      i++;
      render();
    };
}
function err(m) {
  const e = document.getElementById('err');
  if (e) e.textContent = m;
}
function next() {
  const s = STEPS[i];
  if (s.req && !filled(s)) {
    err(
      s.t === 'fields'
        ? 'Preencha seu nome e e-mail para continuar.'
        : s.t === 'single' || s.t === 'multi'
          ? 'Escolha ao menos uma opção para continuar.'
          : s.t === 'color'
            ? 'Escolha ao menos uma cor para continuar.'
            : s.t === 'scale'
              ? 'Ajuste pelo menos uma barra para continuar.'
              : 'Escreva uma resposta curta para continuar.',
    );
    return;
  }
  if (s.t === 'fields' && A[s.id].email && !/^\S+@\S+\.\S+$/.test(A[s.id].email)) {
    err('Confira o e-mail: parece faltar algo.');
    return;
  }
  i++;
  render();
  window.scrollTo({ top: 0 });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && i >= 0 && i < STEPS.length && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'BUTTON') {
    e.preventDefault();
    next();
  }
});

function intro() {
  count.textContent = '';
  const n = Object.keys(A).length;
  app.innerHTML = `<div class="step"><h1>Vamos criar a identidade visual da sua marca</h1><p class="lead">Responda a ${STEPS.length} perguntas rápidas sobre o seu negócio, seu público e o estilo que você imagina. Leva cerca de 5 minutos e não há respostas certas ou erradas.</p><div class="nav" style="margin-top:0"><button class="btn" id="go">${n ? 'Continuar de onde parei' : 'Começar'}</button>${n ? '<button class="btn ghost" id="reset">Recomeçar</button>' : ''}</div></div>`;
  document.getElementById('go').onclick = () => {
    i = 0;
    if (n) {
      const k = STEPS.findIndex((s) => !filled(s));
      i = k < 0 ? STEPS.length - 1 : k;
    }
    render();
  };
  const r = document.getElementById('reset');
  if (r)
    r.onclick = () => {
      Object.keys(A).forEach((k) => delete A[k]);
      save();
      intro();
    };
}

function text() {
  const out = [];
  STEPS.forEach((s) => {
    const v = A[s.id];
    if (!filled(s)) return;
    let r;
    if (s.t === 'fields') r = [v.nome, v.email, v.tel].filter(Boolean).join(' · ');
    else if (s.t === 'color') r = [(v.sel || []).join(', '), v.evit ? 'Evitar: ' + v.evit : ''].filter(Boolean).join('\n');
    else if (s.t === 'scale')
      r = s.s
        .map(([a, b], k) =>
          v[k]
            ? `${a} ↔ ${b}: ${['muito ' + a.toLowerCase(), 'mais ' + a.toLowerCase(), 'equilibrado', 'mais ' + b.toLowerCase(), 'muito ' + b.toLowerCase()][v[k] - 1]}`
            : null,
        )
        .filter(Boolean)
        .join('\n');
    else r = Array.isArray(v) ? v.join(', ') : v;
    out.push([LABEL[s.id], r]);
  });
  return out;
}
function summary() {
  bar.style.width = '100%';
  count.textContent = '';
  const rows = text();
  const msg = 'Olá! Preenchi o briefing de identidade visual da Join:\n\n' + rows.map(([k, v]) => '*' + k + '*\n' + v).join('\n\n');
  const url = 'https://wa.me/5542988830303?text=' + encodeURIComponent(msg);
  app.innerHTML = `<div class="step"><span class="done">Briefing completo</span><h1>Tudo pronto para enviar</h1><p class="lead">Ao clicar em enviar, abrimos o WhatsApp com as suas respostas já escritas. Basta confirmar o envio.</p><dl class="sum">${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl><div class="nav" style="margin-top:0"><a class="btn" id="send" href="${url}" target="_blank" rel="noopener">Enviar</a></div></div>`;
  window.scrollTo({ top: 0 });
}
render();
