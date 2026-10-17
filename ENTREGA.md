# Handoff — "Entre páginas" (portfólio em livro interativo)

## O que é
Portfólio pessoal em português, apresentado como um **livro animado sobre uma mesa**:
capa rígida, lombada, páginas que viram, sombras e barra de navegação.
Contato em destaque: **seila74900@gmail.com**.

## Stack
React 19 + TanStack Start v1 (Vite 7) + Tailwind CSS v4 (tokens em `src/estilos.css`).
Engine de virar página: `react-pageflip`.

## Onde está o quê
- `src/components/portfolio/livro-interativo.tsx` — container: engine, botões, roda, teclado, índice, URL `?pagina=`
- `src/components/portfolio/paginas-livro.tsx` — as 16 páginas (componente `BookPage` com `forwardRef`, exigido pela engine)
- `src/lib/dados-portfolio.ts` — projetos em ordem cronológica, contato, capítulos, preços sugeridos
- `src/estilos.css` — identidade visual neutra (oklch), Cormorant Garamond + DM Sans, responsivo
- `src/routes/index.tsx` — livro atrás de `ClientOnly` (a engine precisa do DOM)
- `INSTRUCOES.md` e `PLANO.md` — decisões de arquitetura e pendências
- `src/test/teste-dados-portfolio.test.ts` — regras de conteúdo (datas, contato, preços)

## Estado atual
- Livro publicado e funcionando em desktop e celular; navegação por botões, roda, teclado e índice.
- Publicações reais: Time's Book (2025 S1) e Hair Plus (2025 S2).
- Scarin (2026 S1): o link enviado está fora do ar, então a página mostra um aviso de prévia indisponível.

## Pendências
1. Scarin sem prévia — falta um endereço acessível para capturar a tela e confirmar os detalhes.
2. No celular, o botão "Próxima página" não avança a página visível (a engine não atualiza o estado).

## Como rodar
`bun install` e depois `bun run dev`. Testes: `bunx vitest run`.


## Refinamento visual aplicado
- A base enviada foi preservada; não houve migração para outra arquitetura.
- O palco ganhou centralização mais consistente, escala responsiva, luz ambiente, contraste e sombra de contato.
- O livro recebeu entrada visual suave, profundidade ao mover o cursor e controles com resposta de hover.
- O preview foi validado em 1440×960 e 390×844.


## Ajuste de foco e síntese
- A entrada agora mostra somente o livro sobre a mesa; cabeçalho, faixa introdutória e rodapé foram retirados da visualização.
- Os textos editoriais das páginas foram condensados para leitura mais rápida.
- A perspectiva do livro foi suavizada e a renderização tipográfica recebeu ajustes para reduzir desfoque.
- Build e 6 testes automatizados continuam aprovados.


## Edição compacta com assets reais
- O ZIP `w.zip` foi auditado e os logos/banners não foram usados na composição principal.
- Foram incorporadas apenas três imagens de projeto sem banner: Time’s Book, Hair Plus e Scarin.
- O livro foi reduzido de 16 para 12 páginas, reunindo cada projeto em uma página e removendo páginas intermediárias repetitivas.
- Textos editoriais foram encurtados e a cor/opacity tipográfica foi fortalecida.
- Build e 6 testes automatizados aprovados; desktop e mobile revisados.


## Entrada animada e contracapa corrigida
- O fallback inicial deixou de ser um quadrado estático e agora apresenta uma cena editorial animada com mesa, livro, luz e progresso.
- A contracapa foi sincronizada com o último índice real da edição de 12 páginas.
- A navegação foi bloqueada no último índice para impedir uma virada extra para folha vazia.
- Build e 6 testes automatizados aprovados; contracapa validada diretamente em `?pagina=11`.


## Evolução dos projetos para cases
- O diagnóstico enviado foi incorporado sem aumentar o livro: a edição continua com 12 páginas.
- Cada projeto agora apresenta contexto, desafio, papel exercido e escopo de desenvolvimento em uma ficha editorial compacta.
- O índice passou a indicar visualmente o capítulo atual com `aria-current`.
- A direção visual, a navegação e a quantidade reduzida de páginas foram preservadas.
- Desktop e mobile revisados no Time’s Book; build e 6 testes aprovados.


## Abertura cinematográfica profissional
- A entrada deixou de depender de uma capa branca aparecendo de forma abrupta.
- Foi criada uma cortina editorial em tela cheia com mesa, luz, símbolo de livro, marca, subtítulo e progresso animado.
- A cortina desaparece suavemente e revela o livro já montado sobre a mesa.
- A sequência respeita `prefers-reduced-motion`.
- Build e 6 testes automatizados aprovados.


## Capa fechada como entrada
- A cortina de abertura e a transição cinematográfica automática foram removidas conforme solicitado.
- O fallback deixou de exibir cartão branco, título ou barra de progresso.
- O livro agora inicia diretamente no índice 0, com a capa rígida fechada sobre a mesa.
- O usuário pode iniciar a leitura pelo CTA “Abrir o livro” ou pelo controle de próxima página.
- Build e 6 testes automatizados aprovados; captura inicial validada.


## Transição restaurada com capa fechada
- A cortina cinematográfica anterior foi restaurada a pedido do usuário.
- O cartão branco da tela de carregamento não voltou.
- Após a cortina desaparecer, o livro permanece no índice 0, fechado, sobre a mesa.
- Build e 6 testes automatizados aprovados; estado final capturado e validado.


## Leitura sem rolagem interna
- As páginas do livro deixaram de possuir rolagem interna.
- Imagens, fichas de case, textos e CTAs foram compactados para caber no quadro.
- O ajuste foi validado nos cases, serviços e contato em desktop e no case Time’s Book em mobile.
- Build e 6 testes automatizados aprovados.


## CTA dos projetos reposicionado
- “Visitar projeto” foi movido para imediatamente abaixo do nome de Time’s Book, Hair Plus e Scarin.
- O link recebeu área de clique clara, sublinhado editorial e microinteração no ícone.
- A posição foi validada visualmente no spread de projetos; build e 6 testes aprovados.


## Clareza tipográfica e hierarquia dos CTAs
- O CTA “Visitar projeto” foi aproximado do nome da empresa.
- A frase “Evoluir é olhar para o feito com novas perguntas.” foi elevada e agora fica totalmente dentro do quadro.
- A perspectiva 3D foi suavizada para reduzir rasterização e borrão tipográfico.
- Cores de títulos, parágrafos, metadados e rodapés foram reforçadas para leitura confortável.
- Desktop, trajetória e mobile revisados; build e 6 testes aprovados.


## Correção do hover e nitidez
- Removido o `filter: drop-shadow()` aplicado ao livro inteiro no hover.
- O filtro fazia o navegador rasterizar a composição 3D e deixava a tipografia apagada quando o mouse passava sobre o livro.
- A profundidade continua preservada pelas sombras do livro e da mesa, sem interferir no texto.
- Build e 6 testes automatizados aprovados.


## Página de planos e condições
- Inserida a página 10, entre Serviços e Vamos conversar.
- Inclui planos de criação, manutenção mensal, serviços à parte, prazos, revisões, materiais, domínio/hospedagem, pagamento, proteção de 15 dias, escopo, cancelamento e transparência.
- A página foi composta sem rolagem interna e validada em desktop e mobile.
- A navegação, o índice, o contador, o contato e a contracapa foram renumerados para 13 páginas totais (índices 0–12).
- Os valores da página-resumo de Serviços foram alinhados ao novo quadro de preços.
- Build e 6 testes automatizados aprovados.


## Divisão de planos e correção da contracapa
- A antiga página única foi dividida em duas: “Planos & condições” e “Condições”.
- Preços, serviços à parte e manutenção ficam separados das regras de pagamento, prazo, revisão, escopo e proteção.
- A contracapa passou ao índice 13 e o livro agora possui 14 páginas totais, número par para evitar a folha vazia no fim.
- Contato, índice, contador e navegação foram renumerados.
- As páginas finais foram capturadas e validadas: condições, contato e contracapa aparecem corretamente, sem folha em branco posterior.
- Build e 6 testes automatizados aprovados.


## Tipografia comercial maior e contracapa oposta
- Os valores e descrições da precificação foram ampliados para leitura mais confortável.
- O livro mantém a capa frontal fechada no carregamento.
- A contracapa não fica mais isolada no mesmo modo da capa: no final, ela aparece no lado direito, ao lado da página de contato, como encerramento natural do spread.
- O modo `showCover` agora é dinâmico: capa inicial fechada, miolo aberto e contracapa no lado oposto.
- A edição final possui 14 páginas totais, sem folha vazia ao final.
- Build e 6 testes automatizados aprovados.


## Tipografia ampliada nas condições
- Os seis blocos de condições receberam corpo maior e entrelinha mais confortável.
- A página continua organizada em duas colunas, sem rolagem interna.
- Desktop e mobile foram revisados; build e 6 testes automatizados aprovados.


## Estabilidade da última virada e planos ampliados
- A troca entre capa fechada e livro aberto agora força uma reconstrução controlada do componente de páginas, evitando estado interno inconsistente no encerramento.
- A capa inicial continua fechada e a contracapa aparece no spread final ao lado do contato.
- Os textos dos planos receberam nova ampliação: nomes, preços, descrições e serviços à parte.
- A última página e a página de planos foram capturadas após a alteração; build e 6 testes automatizados aprovados.


## Capas fora da contagem e fechamento estável
- O modo de capa voltou a ser fixo, evitando que a última virada fique em estado aberto ou crie uma folha residual.
- Capa e contracapa voltam a aparecer fechadas como antes.
- O contador agora mostra apenas as páginas internas: `Capa` e `Contracapa` não recebem número de página.
- A precificação ampliada foi preservada.
- Capa inicial, contracapa final, build e 6 testes automatizados foram validados.
