# Briefing de identidade visual | Join

Formulário online para reunir as informações necessárias à criação da identidade visual de uma marca. O cliente responde perguntas sobre o negócio, público, personalidade, posicionamento, referências visuais, preferências de cor e contato.

## Como funciona

- O preenchimento é dividido em etapas, com validação das respostas obrigatórias e indicador de progresso.
- O formulário mantém o rascunho no armazenamento local do navegador para permitir que o cliente continue depois no mesmo dispositivo e navegador.
- Ao concluir, o cliente revisa as respostas e pode abrir o WhatsApp com o resumo da conversa pronto para enviar à Join.

O projeto é estático e não usa servidor de aplicação, banco de dados ou envio automático de respostas. As informações só chegam à Join quando o cliente confirma o envio pelo WhatsApp.

## Publicação

Os arquivos do site estão em `site/`. Para publicar em uma hospedagem estática, envie o conteúdo dessa pasta para a raiz pública do domínio. O arquivo `.htaccess` contém configurações opcionais para hospedagens Apache.

O site usa HTML, CSS e JavaScript nativos. A fonte Manrope é carregada do Google Fonts.

## Estrutura

```text
site/
├── index.html
├── .htaccess
└── assets/
    ├── css/style.css
    ├── img/logo.png
    └── js/app.js
```
