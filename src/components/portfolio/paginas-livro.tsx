import { forwardRef, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { chapters, contactEmail, emailLink, projects } from "@/lib/dados-portfolio";
import timeImage from "@/assets/projects/livro-tempo.png";
import hairImage from "@/assets/projects/produto-cabelos.jpg";
import scarinImage from "@/assets/projects/veiculo-scarin.jpg";

type PageProps = { number: number; title: string; children: ReactNode; cover?: boolean };

export const BookPage = forwardRef<HTMLDivElement, PageProps>(
  ({ number, title, children, cover }, ref) => (
    <div
      ref={ref}
      className={`book-page${cover ? " cover-page" : ""}`}
      data-density={cover ? "hard" : "soft"}
    >
      <div className="page-inner">
        {!cover && (
          <div className="page-top">
            <span>Entre páginas</span>
            <span>{title}</span>
          </div>
        )}
        {cover ? children : <div className="page-body">{children}</div>}
        {!cover && (
          <div className="page-bottom">
            <span>Portfólio · Desenvolvimento web</span>
            <span>{String(number).padStart(2, "0")}</span>
          </div>
        )}
      </div>
    </div>
  ),
);
BookPage.displayName = "BookPage";

function Quote({ children }: { children: ReactNode }) {
  return <blockquote className="page-quote">{children}</blockquote>;
}
function Detail({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="detail-item">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
function CaseProof({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className="case-proof" aria-label={`Resumo profissional de ${project.name}`}>
      <div>
        <span>Contexto</span>
        <strong>{project.case.context}</strong>
      </div>
      <div>
        <span>Desafio</span>
        <strong>{project.case.challenge}</strong>
      </div>
      <div>
        <span>Meu papel</span>
        <strong>{project.case.role}</strong>
      </div>
      <div>
        <span>Escopo</span>
        <strong>{project.case.scope}</strong>
      </div>
    </div>
  );
}
function EmailCTA({ label = "Solicitar uma proposta" }: { label?: string }) {
  return (
    <Button variant="editorial" size="sm" className="page-action" asChild>
      <a href={emailLink}>
        {label}
        <ArrowUpRight />
      </a>
    </Button>
  );
}

export function createBookPages(goTo: (page: number) => void) {
  return [
    <BookPage key="cover" number={0} title="Capa" cover>
      <div className="cover-top">
        <span>Desenvolvimento web</span>
        <span>2025 — 2026</span>
      </div>
      <div className="cover-center">
        <BookOpen size={30} strokeWidth={1} />
        <h1 className="cover-title">
          Sites com
          <br />
          <em>propósito.</em>
        </h1>
        <div className="cover-rule" />
        <p className="cover-copy">
          Cada negócio tem uma história.
          <br />
          Meu trabalho é ajudá-la a encontrar
          <br />
          seu lugar na web.
        </p>
        <Button
          variant="chapter"
          className="justify-start px-0 mt-5 text-xs"
          onClick={() => goTo(1)}
        >
          Abrir o livro <ArrowRight size={16} />
        </Button>
      </div>
      <div className="cover-footer">
        <span>Um portfólio entre páginas</span>
        <span>Vol. 01</span>
      </div>
    </BookPage>,
    <BookPage key="vision" number={1} title="Minha visão">
      <span className="page-kicker">Uma presença digital com intenção</span>
      <h2 className="page-title intro-title">
        Não é só
        <br />
        sobre um site.
        <br />
        <em>
          É sobre o seu
          <br />
          negócio.
        </em>
      </h2>
      <p className="page-copy">
        Crio sites claros para apresentar negócios e aproximá-los de seus clientes.
      </p>
      <Button variant="chapter" className="px-0 page-action" onClick={() => goTo(5)}>
        Conheça meus projetos <ArrowUpRight />
      </Button>
      <div>
        <span className="intro-stamp">
          <MapPin size={12} /> José Bonifácio · São Paulo
        </span>
      </div>
    </BookPage>,
    <BookPage key="index" number={2} title="Índice">
      <span className="page-kicker">O que você encontra por aqui</span>
      <h2 className="page-title">
        Cada página,
        <br />
        <em>uma descoberta.</em>
      </h2>
      <p className="page-copy">Uma seleção breve de projetos, processo e serviços.</p>
      {chapters.map((c) => (
        <Button key={c.page} variant="chapter" className="chapter-row" onClick={() => goTo(c.page)}>
          <span className="chapter-label">
            <span className="chapter-number">{c.number}</span>
            {c.title}
          </span>
          <span className="chapter-page">{String(c.page).padStart(2, "0")} ↗</span>
        </Button>
      ))}
      <p className="small-note">Projetos autorais · 2025 — 2026</p>
    </BookPage>,
    <BookPage key="approach" number={3} title="Além da aparência">
      <span className="page-kicker">Capítulo 01 · Minha proposta</span>
      <h2 className="page-title">
        Bonito é bom.
        <br />
        <em>Útil é essencial.</em>
      </h2>
      <p className="page-copy">Um bom site une clareza, função e um próximo passo simples.</p>
      <Quote>Antes das cores, vem a conversa.</Quote>
      <Detail title="Diferencial">
        Público, identidade e necessidades orientam a comunicação.
      </Detail>
      <Detail title="Confiança">Informação clara, navegação intuitiva e contato acessível.</Detail>
    </BookPage>,
    <BookPage key="process" number={4} title="Como trabalho">
      <span className="page-kicker">Capítulo 02 · Do diálogo à entrega</span>
      <h2 className="page-title">
        Ideias ganham
        <br />
        <em>estrutura.</em>
      </h2>
      {[
        ["Entender", "Conhecemos o negócio e o que ele precisa comunicar."],
        ["Planejar", "Definimos conteúdo, escopo e organização."],
        ["Criar", "Design e desenvolvimento caminham juntos."],
        ["Publicar", "Testamos navegação, leitura e adaptação."],
      ].map(([title, copy], i) => (
        <div className="step-row" key={title}>
          <span className="step-number">0{i + 1}</span>
          <div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        </div>
      ))}
    </BookPage>,
    <BookPage key="time" number={5} title="Time’s Book">
      <span className="page-kicker">01 / 03 · Projeto autoral</span>
      <div className="project-heading">
        <h2>Time’s Book</h2>
        <span className="project-year">2025</span>
      </div>
      <Button variant="chapter" className="project-visit" asChild>
        <a href={projects[0].url} target="_blank" rel="noreferrer">
          Visitar projeto <ArrowUpRight />
        </a>
      </Button>
      <div className="project-tags">
        <span>Leitura</span>
        <span>Comunidade</span>
      </div>
      <img
        className="project-image"
        src={timeImage}
        width={1080}
        height={1600}
        alt="Capa ilustrada de um livro do projeto Time’s Book"
        loading="lazy"
      />
      <CaseProof project={projects[0]} />
      <p className="page-copy">Uma comunidade para reunir leituras, avaliações e descobertas.</p>
    </BookPage>,
    <BookPage key="hair" number={6} title="Hair Plus">
      <span className="page-kicker">02 / 03 · Projeto autoral</span>
      <div className="project-heading">
        <h2>Hair Plus</h2>
        <span className="project-year">2025</span>
      </div>
      <Button variant="chapter" className="project-visit" asChild>
        <a href={projects[1].url} target="_blank" rel="noreferrer">
          Visitar projeto <ArrowUpRight />
        </a>
      </Button>
      <div className="project-tags">
        <span>Catálogo</span>
        <span>Beleza</span>
      </div>
      <img
        className="project-image"
        src={hairImage}
        width={900}
        height={900}
        alt="Produto de cuidados para cabelos em fundo claro"
        loading="lazy"
      />
      <CaseProof project={projects[1]} />
      <p className="page-copy">
        Catálogo de produtos para cuidado com os cabelos, organizado para descoberta.
      </p>
    </BookPage>,
    <BookPage key="scarin" number={7} title="Scarin">
      <span className="page-kicker">03 / 03 · Projeto autoral</span>
      <div className="project-heading">
        <h2>Scarin</h2>
        <span className="project-year">2026</span>
      </div>
      <Button variant="chapter" className="project-visit" asChild>
        <a href={projects[2].url} target="_blank" rel="noreferrer">
          Visitar projeto <ArrowUpRight />
        </a>
      </Button>
      <div className="project-tags">
        <span>Veículos</span>
        <span>Catálogo</span>
      </div>
      <img
        className="project-image"
        src={scarinImage}
        width={1200}
        height={675}
        alt="Veículo apresentado em uma composição escura"
        loading="lazy"
      />
      <CaseProof project={projects[2]} />
      <p className="page-copy">
        Experiência digital para explorar veículos e encontrar o próximo carro.
      </p>
    </BookPage>,
    <BookPage key="trajectory" number={8} title="Minha trajetória">
      <span className="page-kicker">Capítulo 03 · Uma construção contínua</span>
      <h2 className="page-title">
        Três projetos.
        <br />
        <em>Novas perspectivas.</em>
      </h2>
      <p className="page-copy">Três contextos, novas decisões e aprendizados em cada etapa.</p>
      {projects.map((p, i) => (
        <div className="step-row" key={p.name}>
          <span className="step-number">0{i + 1}</span>
          <div>
            <h3>{p.name}</h3>
            <p>{p.period}</p>
          </div>
        </div>
      ))}
      <Quote>Evoluir é olhar para o feito com novas perguntas.</Quote>
    </BookPage>,
    <BookPage key="services" number={9} title="Serviços">
      <span className="page-kicker">Capítulo 04 · Para o seu negócio</span>
      <h2 className="page-title">
        Uma presença
        <br />
        <em>bem pensada.</em>
      </h2>
      <div className="service-row">
        <div className="service-title">
          <h3>Essencial</h3>
          <span className="service-price">R$ 800–900*</span>
        </div>
        <p>Página institucional, serviços e contato, com layout adaptável.</p>
      </div>
      <div className="service-row">
        <div className="service-title">
          <h3>Profissional</h3>
          <span className="service-price">R$ 1.200–1.800</span>
        </div>
        <p>Mais páginas, conteúdo estratégico e navegação definida.</p>
      </div>
      <div className="service-row">
        <div className="service-title">
          <h3>Manutenção</h3>
          <span className="service-price">R$ 149–399/mês*</span>
        </div>
        <p>Atualizações pontuais, conforme escopo e contrato.</p>
      </div>
      <p className="small-note">
        *Faixas iniciais. Detalhes, prazos e condições na página seguinte.
      </p>
    </BookPage>,
    <BookPage key="plans" number={10} title="Planos & condições">
      <span className="page-kicker">Capítulo 05 · Escolha o ritmo do projeto</span>
      <h2 className="page-title pricing-title">
        Planos claros.
        <br />
        <em>Decisões tranquilas.</em>
      </h2>
      <div className="pricing-section">
        <div className="pricing-section-title">
          Criação de sites <span>investimento inicial</span>
        </div>
        <div className="pricing-row">
          <strong>Essencial</strong>
          <b>R$ 800–900</b>
          <p>Uma página, apresentação, serviços e WhatsApp.</p>
        </div>
        <div className="pricing-row">
          <strong>Profissional</strong>
          <b>R$ 1.200–1.800</b>
          <p>Várias páginas, design personalizado, SEO básico e formulário.</p>
        </div>
        <div className="pricing-row">
          <strong>Personalizado</strong>
          <b>A partir de R$ 2.000</b>
          <p>Catálogos, integrações e recursos adicionais.</p>
        </div>
      </div>
      <div className="pricing-section pricing-maintenance">
        <div className="pricing-section-title">
          Manutenção mensal <span>tempo incluído</span>
        </div>
        <div className="pricing-row">
          <strong>Essencial</strong>
          <b>R$ 149/mês</b>
          <p>Atualizações e correções básicas · 30 min/mês.</p>
        </div>
        <div className="pricing-row">
          <strong>Profissional</strong>
          <b>R$ 249/mês</b>
          <p>Promoções e ajustes frequentes · 1h30/mês.</p>
        </div>
        <div className="pricing-row">
          <strong>Personalizado</strong>
          <b>A partir de R$ 399/mês</b>
          <p>Mais horas e acompanhamento contínuo · conforme contrato.</p>
        </div>
      </div>
      <div className="pricing-extra">
        <strong>À parte</strong> Alterações R$ 50–100 · seção R$ 100–250 · página R$ 150–350 ·
        reformulação R$ 200–500 · funcionalidades complexas: orçamento personalizado.
      </div>
    </BookPage>,
    <BookPage key="conditions" number={11} title="Condições">
      <span className="page-kicker">Capítulo 05 · Transparência antes de começar</span>
      <h2 className="page-title pricing-title">
        Tudo combinado.
        <br />
        <em>Sem letras miúdas.</em>
      </h2>
      <div className="pricing-rules pricing-rules-page">
        <div>
          <strong>Como funciona</strong>
          <span>50% no início · 50% antes da entrega · orçamento válido por 15 dias.</span>
        </div>
        <div>
          <strong>Prazos e revisões</strong>
          <span>
            Essencial: 5–10 dias / 2 revisões · Profissional: 10–20 dias / 3 revisões ·
            Personalizado: conforme orçamento.
          </span>
        </div>
        <div>
          <strong>Escopo</strong>
          <span>
            Cliente fornece textos, fotos, logo e informações. Domínio e hospedagem são separados,
            salvo proposta.
          </span>
        </div>
        <div>
          <strong>Proteção</strong>
          <span>
            15 dias para corrigir erros do código. Mudanças fora do escopo têm novo orçamento.
          </span>
        </div>
        <div>
          <strong>Manutenção</strong>
          <span>
            Tempo não acumula · atendimento comercial · novas funções à parte · cancelamento
            conforme contrato.
          </span>
        </div>
        <div>
          <strong>Transparência</strong>
          <span>
            Aprovações por escrito, condições para atrasos, cancelamento e entrega dos arquivos.
            Segurança e backup somente quando executáveis.
          </span>
        </div>
      </div>
      <div className="conditions-note">
        O objetivo é deixar o escopo claro para que cada etapa seja aprovada com segurança e
        tranquilidade.
      </div>
    </BookPage>,
    <BookPage key="contact" number={12} title="Vamos conversar">
      <span className="page-kicker">Capítulo 06 · O próximo passo</span>
      <h2 className="page-title intro-title">
        Vamos escrever
        <br />
        <em>
          a próxima
          <br />
          página?
        </em>
      </h2>
      <p className="page-copy">Conte sobre seu negócio e o que deseja construir.</p>
      <a className="contact-address" href={emailLink}>
        {contactEmail}
      </a>
      <EmailCTA label="Vamos conversar" />
      <p className="small-note">
        José Bonifácio, São Paulo · Atendimento a pequenas e médias empresas.
      </p>
    </BookPage>,
    <BookPage key="backcover" number={13} title="Contracapa" cover>
      <div className="cover-top">
        <span>Entre páginas</span>
        <span>Vol. 01</span>
      </div>
      <div className="cover-center">
        <h2 className="cover-title">
          Toda boa
          <br />
          história
          <br />
          <em>continua.</em>
        </h2>
        <div className="cover-rule" />
        <p className="cover-copy">
          Vamos construir uma presença digital que tenha a ver com o seu negócio.
        </p>
        <EmailCTA label="Entre em contato" />
      </div>
      <div className="cover-footer">
        <span>2025 — 2026</span>
        <Button variant="chapter" size="sm" onClick={() => goTo(0)}>
          Voltar à capa <ArrowRight />
        </Button>
      </div>
    </BookPage>,
  ];
}
