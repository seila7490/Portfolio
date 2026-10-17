# Portfólio Livre Interativo

Portfólio digital em formato de livro interativo, criado com React, TanStack Start, TypeScript, Tailwind CSS e React PageFlip.

## Requisitos

- Node.js 20 ou superior
- npm, pnpm ou Bun
- Git

## Instalação

```bash
pnpm install
```

Também é possível usar npm:

```bash
npm install
```

## Executar localmente

```bash
pnpm dev
```

Depois, abra o endereço exibido no terminal, normalmente:

```text
http://localhost:3000
```

## Testar e gerar a versão de produção

```bash
pnpm test -- --run
pnpm run build
```

## Publicar no GitHub pela primeira vez

1. Crie um repositório vazio no GitHub. Não marque as opções de README, `.gitignore` ou licença, pois estes arquivos já estão neste projeto.
2. Extraia este pacote no seu computador.
3. Abra o terminal dentro da pasta do projeto.
4. Execute:

```bash
git init
git add .
git commit -m "Publica portfólio interativo"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
git push -u origin main
```

Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub e `NOME-DO-REPOSITORIO` pelo nome do repositório criado.

## Atualizar o GitHub depois de fazer alterações

```bash
git add .
git commit -m "Atualiza portfólio"
git push
```

## Publicar o site

O GitHub armazena o código, mas não executa automaticamente este projeto como um site público. Para publicar, conecte o repositório a uma plataforma como Vercel, Netlify ou Cloudflare Pages.

Para um deploy típico:

- Framework: TanStack Start / Vite
- Comando de instalação: `pnpm install`
- Comando de build: `pnpm run build`
- Diretório de saída: definido pela configuração do TanStack Start

Não envie a pasta `node_modules`, arquivos `.env`, credenciais ou artefatos gerados de build. O `.gitignore` já protege esses arquivos.
