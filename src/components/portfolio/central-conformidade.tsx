import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, LockKeyhole, Mail, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactEmail } from "@/lib/dados-portfolio";

type ComplianceSection = "privacidade" | "cookies" | "termos" | "reembolso" | "lgpd";

const sections: Array<{ id: ComplianceSection; label: string }> = [
  { id: "privacidade", label: "Privacidade" },
  { id: "cookies", label: "Cookies" },
  { id: "termos", label: "Termos" },
  { id: "reembolso", label: "Reembolso" },
  { id: "lgpd", label: "Formulário LGPD" },
];

export function ComplianceCenter() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<ComplianceSection>("privacidade");
  const [sent, setSent] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    dialog.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (event.key !== "Tab") return;
      const controls = dialog.current?.querySelectorAll<HTMLElement>(
        "button, a, input, select, textarea",
      );
      const first = controls?.[0];
      const last = controls?.[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const openSection = (next: ComplianceSection) => {
    setSection(next);
    setSent(false);
    setOpen(true);
  };

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="compliance-trigger"
        aria-label="Abrir privacidade, cookies e direitos LGPD"
        onClick={() => openSection("privacidade")}
      >
        <ShieldCheck size={14} /> Privacidade e LGPD
      </button>
      {open && (
        <div className="compliance-dialog" onClick={() => setOpen(false)}>
          <div
            ref={dialog}
            className="compliance-dialog-inner"
            role="dialog"
            aria-modal="true"
            aria-labelledby="compliance-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="compliance-heading">
              <div>
                <span className="compliance-kicker">Transparência e segurança</span>
                <h2 id="compliance-title">Privacidade com clareza.</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Fechar central de privacidade"
                onClick={() => {
                  setOpen(false);
                  trigger.current?.focus();
                }}
              >
                <X />
              </Button>
            </div>
            <nav className="compliance-tabs" aria-label="Documentos de privacidade">
              {sections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={section === item.id ? "is-active" : ""}
                  aria-current={section === item.id ? "page" : undefined}
                  onClick={() => openSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="compliance-content">
              {section === "privacidade" && <PrivacyPolicy onOpen={openSection} />}
              {section === "cookies" && <CookieNotice />}
              {section === "termos" && <TermsOfService />}
              {section === "reembolso" && <RefundPolicy />}
              {section === "lgpd" && <LgpdForm sent={sent} onSent={() => setSent(true)} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PrivacyPolicy({ onOpen }: { onOpen: (section: ComplianceSection) => void }) {
  return (
    <>
      <p className="compliance-lead">
        Esta página apresenta um portfólio. No estado atual, o site não possui cadastro, login,
        analytics, anúncios, banco de dados, checkout ou formulário que envie dados automaticamente.
      </p>
      <h3>Quem é o responsável</h3>
      <p>
        O responsável pelo contato comercial é identificado no próprio portfólio pelo e-mail
        <a href={`mailto:${contactEmail}`}> {contactEmail}</a>. A localidade informada é José
        Bonifácio, São Paulo. Não há CNPJ ou razão social informados nesta versão; não inventamos
        dados empresariais.
      </p>
      <h3>Dados, finalidade e necessidade</h3>
      <p>
        Se você enviar um e-mail, serão tratados os dados que escolher informar, exclusivamente para
        responder à mensagem, preparar proposta ou atender uma solicitação de titular. Não pedimos
        CPF, documento, senha, dados bancários ou dados sensíveis para iniciar um contato comercial.
      </p>
      <h3>Direitos do titular</h3>
      <p>
        Você pode solicitar confirmação, acesso, correção, eliminação, informação sobre uso e
        revogação de consentimento, quando aplicável. Use o{" "}
        <button type="button" className="inline-link" onClick={() => onOpen("lgpd")}>
          formulário LGPD
        </button>{" "}
        ou envie um e-mail. O atendimento depende da verificação de identidade necessária para
        evitar acesso indevido.
      </p>
      <h3>Retenção e compartilhamento</h3>
      <p>
        O site não armazena mensagens. O e-mail pode ser tratado pelo provedor de correio escolhido
        pelo responsável e mantido apenas pelo tempo necessário ao atendimento, obrigações legais e
        exercício regular de direitos. Não vendemos dados nem fazemos compartilhamento para
        anúncios.
      </p>
      <p className="compliance-note">
        Última atualização: 24 de outubro de 2026. Este texto é informativo e deve ser revisado por
        profissional jurídico antes de uso comercial definitivo.
      </p>
    </>
  );
}

function CookieNotice() {
  return (
    <>
      <p className="compliance-lead">Aviso de cookies</p>
      <p>
        Este portfólio não instala cookies próprios de publicidade, métricas, pixels ou rastreamento
        comportamental. Também não há scripts de tracking de terceiros no código publicado.
      </p>
      <h3>Cookies estritamente necessários</h3>
      <p>
        A hospedagem, o navegador ou ferramentas de segurança do provedor podem usar recursos
        técnicos necessários para entregar o site. Eles não são controlados pelo código do
        portfólio; consulte a política do provedor de hospedagem para detalhes. Se analytics ou
        anúncios forem adicionados no futuro, deverão ser incluídos após revisão de finalidade, base
        legal, banner e opção de recusa.
      </p>
      <h3>Como controlar</h3>
      <p>
        Você pode bloquear ou apagar cookies nas configurações do navegador. A ausência de tracking
        neste projeto significa que não há preferências de marketing para revogar aqui.
      </p>
    </>
  );
}

function TermsOfService() {
  return (
    <>
      <p className="compliance-lead">Termos de uso e prestação de serviços</p>
      <p>
        O conteúdo do portfólio é uma apresentação profissional. Textos, preços, prazos e escopos
        são referências iniciais e não constituem proposta irrevogável. A contratação só existe após
        proposta aceita e contrato ou confirmação escrita com escopo, preço, prazo e
        responsabilidades.
      </p>
      <h3>Uso do site</h3>
      <p>
        É permitido consultar e compartilhar o link para fins legítimos. Não é permitido copiar a
        identidade visual, textos, imagens ou código para se passar pelo responsável, atacar o site,
        tentar extrair dados ou contornar controles de segurança.
      </p>
      <h3>Imagens, projetos e copyright</h3>
      <p>
        As imagens e referências exibidas devem ser mantidas somente quando houver autorização ou
        licença compatível. Projetos de terceiros continuam pertencendo aos respectivos titulares; o
        portfólio não transfere direitos sobre marcas, produtos, fotografias ou interfaces. Um
        titular pode solicitar correção ou remoção pelo e-mail de contato.
      </p>
      <h3>Sem promessas falsas</h3>
      <p>
        O portfólio não garante resultados de vendas, posicionamento, segurança absoluta, backup ou
        disponibilidade contínua. Qualquer resultado dependerá do projeto contratado, conteúdo,
        hospedagem e decisões do cliente.
      </p>
    </>
  );
}

function RefundPolicy() {
  return (
    <>
      <p className="compliance-lead">Política de reembolso</p>
      <p>
        Este site não realiza checkout nem recebe pagamentos. Portanto, não há compra automática ou
        cobrança feita por esta página. Em uma contratação, reembolso, cancelamento e valores de
        etapas devem ser definidos na proposta e no contrato antes do início.
      </p>
      <h3>Antes da execução</h3>
      <p>
        Solicitações de cancelamento antes do início devem ser tratadas por escrito, considerando
        eventuais custos já aprovados e regras do contrato. Nenhuma condição deve contrariar os
        direitos previstos na legislação aplicável.
      </p>
      <h3>Após o início</h3>
      <p>
        Entregas parciais, horas trabalhadas, materiais e despesas previamente aprovadas podem ser
        considerados na apuração. Erros comprovadamente atribuíveis ao código desenvolvido devem
        seguir o prazo de correção definido na proposta; mudanças de escopo exigem novo orçamento.
      </p>
      <p className="compliance-note">
        Não informe dados de cartão, senha ou documentos por este portfólio. Para uma contratação
        real, solicite contrato e identificação comercial.
      </p>
    </>
  );
}

function LgpdForm({ sent, onSent }: { sent: boolean; onSent: () => void }) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const subject = `Solicitação LGPD — ${String(values.get("tipo"))}`;
    const body = [
      `Tipo de solicitação: ${String(values.get("tipo"))}`,
      `E-mail para resposta: ${String(values.get("email"))}`,
      "",
      String(values.get("mensagem")),
      "",
      "Declaro que esta solicitação se refere aos meus próprios dados ou que possuo autorização para representá-la.",
    ].join("\n");
    onSent();
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <p className="compliance-lead">Solicitação de direitos do titular</p>
      <p>
        Preencha apenas o necessário. O formulário não envia dados para um servidor: ele abre o seu
        aplicativo de e-mail com uma mensagem preparada. Revise o conteúdo antes de enviar.
      </p>
      {sent ? (
        <p className="form-success" role="status">
          <Check size={16} /> Mensagem preparada. Conclua o envio no seu aplicativo de e-mail.
        </p>
      ) : null}
      <form className="lgpd-form" onSubmit={handleSubmit}>
        <label htmlFor="lgpd-tipo">Tipo de solicitação</label>
        <select id="lgpd-tipo" name="tipo" required defaultValue="acesso">
          <option value="acesso">Acesso ou confirmação de tratamento</option>
          <option value="correcao">Correção de dados</option>
          <option value="eliminacao">Eliminação ou revogação de consentimento</option>
          <option value="informacao">Informações sobre compartilhamento e finalidade</option>
          <option value="outro">Outra solicitação relacionada à LGPD</option>
        </select>
        <label htmlFor="lgpd-email">E-mail para resposta</label>
        <input
          id="lgpd-email"
          name="email"
          type="email"
          required
          maxLength={160}
          autoComplete="email"
        />
        <label htmlFor="lgpd-mensagem">Como podemos ajudar?</label>
        <textarea id="lgpd-mensagem" name="mensagem" required maxLength={2000} rows={5} />
        <label className="lgpd-consent">
          <input name="consentimento" type="checkbox" required />
          <span>Autorizo o uso dessas informações somente para responder a esta solicitação.</span>
        </label>
        <Button type="submit" variant="editorial">
          <Mail size={15} /> Preparar e-mail
        </Button>
      </form>
      <p className="compliance-note">
        Podemos pedir informações adicionais para confirmar a identidade e proteger os dados contra
        acesso indevido. Não envie senhas, números de cartão ou documentos completos neste primeiro
        contato.
      </p>
    </>
  );
}

export function SecurityNotice() {
  return (
    <span className="security-notice">
      <LockKeyhole size={12} /> Sem rastreamento de marketing · dados mínimos
    </span>
  );
}
