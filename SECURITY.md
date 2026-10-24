# Segurança e conformidade

## Escopo auditado

Auditoria realizada em 24 de outubro de 2026 sobre o código publicado do portfólio. O projeto é um site estático React/TanStack Start. Não há banco de dados, autenticação, contas, API pública, checkout, upload, analytics, anúncios ou serviço próprio de envio de formulário.

## Controles aplicados

- **HTTP:** respostas passam por headers de segurança no entrypoint do servidor; métodos diferentes de `GET` e `HEAD` retornam `405 Method Not Allowed`.
- **CORS:** não há endpoint de API e o servidor não emite `Access-Control-Allow-Origin`. Origem cruzada fica fechada por padrão.
- **Headers:** CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP, CORP e Origin-Agent-Cluster.
- **Sessões e cookies:** o portfólio não cria sessão, cookie próprio ou autenticação. O componente genérico de sidebar não é usado na rota pública. Recursos técnicos do provedor de hospedagem seguem a política do próprio provedor.
- **Secrets:** não existem chaves ou credenciais no código. `.env`, `node_modules`, builds e credenciais devem permanecer fora do Git.
- **Controle de acesso e RLS:** não aplicáveis sem usuários, banco ou recurso protegido. Se forem adicionados, deverão nascer com autorização server-side, menor privilégio e RLS testado.
- **Rate limiting:** não há endpoint que receba dados. Antes de criar qualquer API ou webhook, adicionar rate limit por IP/identidade, limites de corpo e observabilidade no provedor.
- **Validação de inputs:** o formulário LGPD usa `required`, tipo de campo, limites de tamanho e validação nativa. Ele apenas prepara um `mailto:` local; não persiste os dados.
- **SQL Injection:** não há SQL, ORM ou banco. Não adicionar consultas concatenadas caso a arquitetura mude.
- **XSS:** React escapa conteúdo dinâmico; não há `dangerouslySetInnerHTML` no fluxo do portfólio. O CSP reduz o impacto de injeções. O componente de gráfico genérico com SVG estático não recebe entrada do usuário.
- **CSRF:** não há mutação server-side nem sessão. O formulário LGPD não faz POST e não armazena dados.
- **Uploads:** não há upload. Se for adicionado, exigir allowlist de MIME/extensão, limite de tamanho, renomeação, armazenamento fora do diretório público, antivírus e autorização.
- **Erros:** o servidor retorna página genérica para falhas SSR e registra detalhes somente no log do servidor; não expõe stack trace ao visitante.
- **Criptografia:** o site não armazena dados. Em produção, exigir HTTPS/TLS no provedor e manter HSTS; e-mail continua sujeito às garantias do provedor de correio.
- **Dependências:** executar `pnpm install --frozen-lockfile`, `pnpm audit` e atualizar dependências por PR. O build e os testes devem passar antes do deploy.
- **Backup e monitoramento:** não são fornecidos pelo código. O repositório GitHub é uma cópia de código, não backup operacional de dados. Ativar proteção de branch, 2FA, alertas de dependência, logs de hospedagem, uptime monitor e retenção de backups no provedor.

## O que não foi declarado como garantido

Nenhum controle elimina risco. A segurança final também depende de GitHub, provedor de hospedagem, DNS, domínio, e-mail, dependências e configurações de produção. Esta documentação é um registro técnico, não uma certificação nem parecer jurídico.

## Relato de vulnerabilidade

Não publique segredos ou dados pessoais em uma issue. Para relatar um problema, use o e-mail exibido na central de privacidade do portfólio e inclua somente o mínimo necessário para reproduzir a falha.
