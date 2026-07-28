# Mentoria Forno de Latão

Landing page da Mentoria Forno de Latão, construída com Next.js e preparada para deploy contínuo no Netlify.

## Desenvolvimento local

Requisitos: Node.js 22 e npm.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Verificação de produção

```bash
npm test
```

O comando compila a aplicação com o Next.js, valida a página pré-renderizada e confere a configuração do Netlify.

## Publicar pelo GitHub e Netlify

Este diretório já contém o arquivo `netlify.toml`. No Netlify, o build será executado com:

- Build command: `npm run build`
- Publish directory: `.next`
- Node.js: versão 22

Como este projeto já possui um remoto privado usado pela hospedagem anterior, adicione o GitHub com outro nome:

```bash
git remote add github https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u github main
```

Depois, no Netlify:

1. Selecione **Add new project**.
2. Escolha **Import an existing project**.
3. Conecte o GitHub e selecione o repositório.
4. Confirme o deploy. As configurações serão lidas de `netlify.toml`.

Não envie manualmente `node_modules`, `.next` ou `dist`. O Netlify instala as dependências e gera esses diretórios durante o build.

## Hospedagem anterior

Os comandos `npm run dev:sites` e `npm run build:sites` preservam o fluxo anterior baseado em vinext/Cloudflare. O Netlify usa os comandos padrão `npm run dev`, `npm run build` e `npm start`.
