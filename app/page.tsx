"use client";

import Script from "next/script";
import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpenText,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleGauge,
  Clock3,
  Flame,
  HandHelping,
  Mail,
  MessagesSquare,
  Phone,
  PlayCircle,
  ShieldCheck,
  UserRound,
  Wrench,
  X,
} from "lucide-react";

const checkoutUrl = "https://pay.hotmart.com/H103127357T?off=3xgl76hj";
const whatsappUrl = "https://wa.me/?text=Olá%2C%20quero%20saber%20mais%20sobre%20a%20Mentoria%20Forno%20de%20Latão";
const discountWhatsappUrl = "https://wa.me/?text=Olá%2C%20sou%20ex-aluno%28a%29%20e%20quero%20receber%20meu%20desconto%20na%20Mentoria%20Forno%20de%20Latão";
const presencialUrl = "https://www.oficina.cc/event-details/queimas-poeticas-com-kuara-ceramicas-2";
const socialSpotsUrl = "https://forms.gle/H28ag11q2wUpd4Zr7";
const freeClassFormOpensAt = Date.parse("2026-08-04T00:00:00-03:00");
const waitlistFormOpensAt = Date.parse("2026-08-15T00:00:00-03:00");
const turnstileSiteKey = "0x4AAAAAADp702-3DV1oukX8";

type TurnstileApi = {
  render: (target: HTMLElement, options: {
    sitekey: string;
    theme: "light";
    callback: (token: string) => void;
    "expired-callback": () => void;
    "error-callback": () => void;
  }) => string;
  reset: (widgetId: string) => void;
};

const quickHighlights = [
  { icon: Clock3, text: "27h de aulas ao vivo" },
  { icon: PlayCircle, text: "Aulas gravadas disponíveis por 1 ano" },
  { icon: Flame, text: "Queimas de biscoito e esmalte ao vivo" },
  { icon: MessagesSquare, text: "Suporte via WhatsApp" },
  { icon: Wrench, text: "Projeto técnico, fornecedores e curvas de queima" },
];

const socialSlides = [
  { image: "/assets/galeria-alta-temperatura.jpg", caption: "Alta temperatura" },
  { image: "/assets/galeria-obvara.jpg", caption: "Obvara" },
  { image: "/assets/galeria-raku-iridescente.jpg", caption: "Raku iridescente" },
  { image: "/assets/galeria-raku.jpg", caption: "Raku" },
  { image: "/assets/galeria-raku-nu.jpg", caption: "Raku nu" },
  { image: "/assets/galeria-saggar.jpg", caption: "Saggar" },
];

const testimonials = [
  {
    quote: "Com certeza a mentoria valeu cada centavo. Amanda está entre os professores que mudaram a minha vida pela humildade, leveza e respeito pelo processo de cada um.",
    author: "Bárbara G. · Mentoria Forno de Latão",
  },
  {
    quote: "Impossível não deixar registrado meu agradecimento por toda a sua disponibilidade, pelo cuidado no preparo do material, na pesquisa dos fornecedores e no acompanhamento. Valeu cada centavo. Um ajudando o outro: foi e está sendo incrível.",
    author: "Adriana S. · Mentoria Forno de Latão",
  },
  {
    quote: "Você é leve e calma, didática e sabe muito. Se hoje eu sei o que é um forno de latão e uma curva de queima, algo que achei que jamais aprenderia, é por você. Sou muito grata por tudo o que vivemos.",
    author: "Sara S. · Mentoria Forno de Latão",
  },
  {
    quote: "No começo achei que era muita coisa e fiquei com medo de não dar conta sozinha. Mas o material e as aulas foram tão didáticos que ficou simples seguir o passo a passo. Fazer cerâmica em casa é um sonho realizado.",
    author: "Jé · Mentoria Forno de Latão",
  },
  {
    quote: "Eu ainda nem fiz minhas queimas e já me sinto muito realizada. Amanda, você é muito dedicada, atenciosa e competente. Fico feliz de acompanhar e fazer parte da sua jornada na cerâmica. Você já virou uma inspiração para mim.",
    author: "Lolla A. · Mentoria Forno de Latão",
  },
  {
    quote: "Sou muito grata por ter feito a mentoria. Além do aprendizado sobre cerâmica e fornos, também aprendi muito sobre gestão e pedagogia.",
    author: "Anna T. · Mentoria Forno de Latão",
  },
];

const pillars = [
  ["01", "Estudando o projeto técnico"],
  ["02", "Organizando compras e fornecedores"],
  ["03", "Tirando dúvidas de montagem"],
  ["04", "Aprendendo curvas de queima"],
  ["05", "Acompanhando duas queimas coletivas em tempo real"],
  ["06", "Analisando resultados, registros e ajustes possíveis"],
];

const modules = [
  {
    number: "Aula 01", title: "Projeto técnico do forno", meta: "22 ago · 9h às 12h",
    intro: "Amanda apresenta a mentoria, o e-book e o projeto técnico do Forno de Latão utilizado na Kûara.",
    items: ["Passo a passo da construção", "Arquitetura e comportamento térmico", "Materiais, equipamentos e fornecedores", "Especificações e cuidados de segurança", "Adaptações conforme cada região", "Cronograma individual de construção", "Canais de suporte e acompanhamento"],
    objective: "Sair sabendo o que comprar, onde buscar e como planejar a construção do seu forno.",
  },
  {
    number: "Aula 02", title: "Curvas e manejo das queimas", meta: "02 set · 19h às 21h30",
    intro: "Uma aula para compreender a montagem de carga e o manejo das principais queimas realizadas no forno de latão.",
    items: ["Montagem de carga para diferentes objetivos", "Curvas de biscoito, esmalte, raku e monoqueima", "Manejo inicial dos equipamentos", "Cuidados com temperatura, tempo e atmosfera", "Ajustes e dúvidas sobre a construção"],
    objective: "Chegar ao final desta etapa com clareza para deixar o forno pronto para iniciar as queimas.",
  },
  {
    number: "Aula 03", title: "Queimas poéticas", meta: "23 set · 19h às 21h30",
    intro: "Uma aula teórica dedicada às queimas em que o fogo participa da criação.",
    items: ["Saggar com impressões botânicas, sais e metais", "Carbonizações com matérias orgânicas", "Raku iridescente e efeitos do cobre", "Raku nu e desenhos da fumaça", "Raku esmaltado, craquelados e metalizados", "Obvara e padrões orgânicos"],
    objective: "Compreender o fogo como parte do processo criativo e ampliar seu repertório técnico.",
  },
  {
    number: "Aula 04", title: "Queima coletiva de biscoito", meta: "24 out · 8h30 às 17h30",
    intro: "A vivência central da mentoria: uma queima de biscoito acompanhada em tempo real pelo Google Meet.",
    items: ["Montagem das mobílias e da carga", "Registro e controle da curva", "Manejo de maçarico, termopar e manômetro", "Cuidados de segurança", "Leitura da atmosfera", "Finalização e resfriamento controlado"],
    objective: "Desenvolver autonomia, segurança e confiança para conduzir queimas de baixa temperatura.",
  },
  {
    number: "Aula 05", title: "Queima coletiva de esmalte", meta: "07 nov · 8h30 às 15h30",
    intro: "Uma queima de esmalte acompanhada em tempo real, com orientação coletiva para ajustes, decisões e leitura do forno.",
    items: ["Acompanhamento ao vivo pelo Google Meet", "Ajustes e tomadas de decisão durante a queima", "Leitura do comportamento do forno em alta temperatura"],
    objective: "Desenvolver autonomia, segurança e confiança para conduzir queimas de alta temperatura.",
  },
  {
    number: "Aula 06", title: "Estudos de caso da turma", meta: "11 nov · 18h30 às 21h30",
    intro: "O último encontro é dedicado à análise coletiva dos resultados da turma.",
    items: ["Apresentação de peças, registros e anotações", "Leitura dos processos e pontos de aprimoramento", "Caminhos para a continuidade da pesquisa"],
    objective: "Consolidar a autonomia técnica para conduzir novas queimas com segurança, senso crítico e confiança.",
  },
];

const fitItems = [
  "Já tem experiência com modelagem e quer autonomia na queima",
  "Quer um forno artesanal a gás capaz de atingir até 1245 °C",
  "Busca uma alternativa mais acessível para ter o próprio forno",
  "Quer manejar maçarico, termopar, manômetro, curvas e atmosferas",
  "Deseja explorar biscoito, esmalte, monoqueima e queimas poéticas",
  "Já possui um forno de latão e quer aperfeiçoar seus resultados",
  "Valoriza aprendizagem acompanhada, troca e análise dos processos",
];

const notFitItems = [
  "Está buscando aprender modelagem ou esmaltação do zero",
  "Procura produção padronizada, automatizada e em grande volume",
  "Não tem acesso a um espaço aberto e bem ventilado",
  "Quer apenas assistir sem colocar o processo em prática",
];

const includedGroups = [
  {
    icon: PlayCircle,
    title: "Aulas e acesso",
    items: ["27 horas de aulas ao vivo", "Gravação de todas as aulas", "Acesso por 1 ano aos conteúdos na Hotmart"],
  },
  {
    icon: BookOpenText,
    title: "Projeto e materiais",
    items: ["E-book ilustrado para download", "Projeto técnico do forno utilizado na Kûara", "Lista de materiais, equipamentos e fornecedores", "Planilha de orçamento", "Curvas de queima em Excel e PDF", "Materiais complementares de estudo"],
  },
  {
    icon: HandHelping,
    title: "Acompanhamento",
    items: ["Grupo de estudos da turma no WhatsApp", "Suporte direto com Amanda por 3 meses", "Queimas de biscoito e esmalte acompanhadas ao vivo", "Análise final de resultados e estudos de caso"],
  },
];

const faqs = [
  ["É um forno de cerâmica profissional?", "Sim. O forno de latão é potente, versátil e pode alcançar excelentes resultados, inclusive em queimas de esmalte de alta temperatura. É um forno artesanal, com controle manual e variações internas de temperatura que fazem parte do processo. Se você busca autonomia, experimentação e uma relação mais consciente com o fogo, ele pode ser uma excelente escolha."],
  ["Preciso ter experiência prévia com cerâmica?", "Sim. É importante já ter alguma familiaridade com modelagem cerâmica. Você não precisa ter experiência com queimas, mas deverá produzir algumas peças para acompanhar o processo completo durante a mentoria."],
  ["Posso comprar agora e construir o forno depois?", "Não é o ideal. A proposta é que você construa e utilize o forno durante o período de acompanhamento, aproveitando o suporte em tempo real para tirar dúvidas, ajustar processos e evoluir com segurança."],
  ["Qual é a capacidade do forno?", "O volume interno total é de aproximadamente 121 litros. A área útil tem cerca de 44 cm de diâmetro por 55 cm de altura, correspondendo a aproximadamente 84 litros de volume útil."],
  ["Quanto vou investir para construir meu forno?", "O valor varia conforme a região, mas a média gira em torno de R$ 3.000, incluindo corpo do forno, mobília refratária básica, maçarico, termopar, manômetro, ferragens e acessórios."],
  ["Posso usar o forno em apartamento?", "Não é recomendado. O forno deve ser utilizado em áreas abertas e bem ventiladas, mesmo que cobertas e protegidas da chuva."],
  ["A manta cerâmica exige cuidados?", "Sim. As fibras podem causar irritação na pele e riscos quando inaladas continuamente. Na mentoria, você aprende quais EPIs usar e como manipular a manta com segurança."],
  ["Já tenho um forno de latão. A mentoria serve para mim?", "Sim. O estudo da arquitetura, dos materiais, da montagem de carga e das diferentes queimas pode ajudar você a aprimorar o forno que já possui e obter resultados mais consistentes."],
  ["Quais ferramentas vou precisar?", "Furadeira, esmerilhadeira, serra tico-tico, alicate, tesoura grande, estilete e EPIs, como óculos, máscara e luvas. A lista detalhada estará no e-book."],
  ["Como funciona o suporte por WhatsApp?", "Durante três meses, a turma terá um grupo exclusivo. Amanda estará presente de segunda a sexta-feira, uma vez ao dia, para orientar construções e queimas, comentar registros e tirar dúvidas."],
  ["As aulas ficam gravadas?", "Sim. Embora a participação ao vivo seja ideal, todas as aulas ficarão gravadas e disponíveis na Hotmart por um ano. O e-book e os materiais complementares poderão ser baixados."],
];

function FreeClassSignup() {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const tokenRef = useRef<HTMLInputElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("Revise os campos e tente novamente em instantes.");

  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());

    let attempts = 0;
    const renderTurnstile = () => {
      const turnstile = (window as typeof window & { turnstile?: TurnstileApi }).turnstile;
      const container = turnstileContainerRef.current;
      if (!turnstile || !container || widgetIdRef.current !== null) return;
      widgetIdRef.current = turnstile.render(container, {
        sitekey: turnstileSiteKey,
        theme: "light",
        callback: (token) => {
          if (tokenRef.current) tokenRef.current.value = token;
        },
        "expired-callback": () => {
          if (tokenRef.current) tokenRef.current.value = "";
        },
        "error-callback": () => {
          if (tokenRef.current) tokenRef.current.value = "";
        },
      });
    };

    renderTurnstile();
    const timer = window.setInterval(() => {
      attempts += 1;
      renderTurnstile();
      if (widgetIdRef.current !== null || attempts > 30) window.clearInterval(timer);
    }, 300);

    return () => window.clearInterval(timer);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!tokenRef.current?.value) {
      setErrorMessage("Confirme a verificação anti-bot antes de enviar.");
      setFormStatus("error");
      return;
    }

    setFormStatus("sending");
    setErrorMessage("Revise os campos e tente novamente em instantes.");

    try {
      const payload = new URLSearchParams();
      new FormData(form).forEach((value, key) => payload.append(key, String(value)));
      const response = await fetch("/.netlify/functions/lead", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload,
      });
      const result = await response.json().catch(() => ({})) as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || "Falha no envio");

      form.reset();
      setFormStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Não foi possível concluir a inscrição.");
      setFormStatus("error");
      const turnstile = (window as typeof window & { turnstile?: TurnstileApi }).turnstile;
      if (turnstile && widgetIdRef.current !== null) turnstile.reset(widgetIdRef.current);
      if (tokenRef.current) tokenRef.current.value = "";
    }
  }

  return (
    <section className="free-class-signup section-pad" id="aula-gratuita" aria-labelledby="free-class-title">
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" />
      <div className="free-class-copy">
        <div className="eyebrow light"><span /> Aula online gratuita</div>
        <h2 id="free-class-title">Conheça o forno de latão <em>antes de começar.</em></h2>
        <p>Preencha seus dados e receba o acesso à aula gratuita com Amanda Maciel, da Kûara Cerâmicas.</p>
      </div>
      <div className="free-class-card">
        <span className="free-class-stamp">100%<br />gratuita</span>
        {formStatus === "success" ? (
          <div className="free-class-success" role="status">
            <strong>Inscrição recebida.</strong>
            <p>O link da aula chegará no seu e-mail.</p>
          </div>
        ) : (
          <form ref={formRef} className="free-class-form" onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="formType" value="free-class" />
            <label htmlFor="free-class-name">Seu nome</label>
            <input id="free-class-name" name="name" type="text" placeholder="Como podemos te chamar?" autoComplete="name" maxLength={80} required />
            <label htmlFor="free-class-email">Seu melhor e-mail</label>
            <input id="free-class-email" name="email" type="email" placeholder="voce@email.com" autoComplete="email" maxLength={254} required />
            <label htmlFor="free-class-whatsapp">WhatsApp <span>opcional</span></label>
            <input id="free-class-whatsapp" name="whatsapp" type="tel" placeholder="(00) 00000-0000" autoComplete="tel" inputMode="tel" maxLength={20} pattern="[\d\s()+.-]{8,20}" />
            <label className="free-class-consent" htmlFor="free-class-privacy-consent">
              <input id="free-class-privacy-consent" name="privacyConsent" type="checkbox" value="yes" required />
              <span>Aceito receber comunicações sobre esta aula e conteúdos da Kûara. Li e concordo com a <a href="/privacidade-termos.html" target="_blank" rel="noreferrer">Política de Privacidade e Termos</a>.</span>
            </label>
            <input className="hp-field" type="text" name="email_address_check" defaultValue="" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <input ref={startedAtRef} type="hidden" name="formStartedAt" />
            <input ref={tokenRef} type="hidden" name="turnstileToken" />
            <div ref={turnstileContainerRef} className="turnstile-box" data-sitekey={turnstileSiteKey} aria-label="Verificação anti-bot" />
            <input type="hidden" name="locale" value="pt" />
            <button type="submit" disabled={formStatus === "sending"}>{formStatus === "sending" ? "Enviando…" : "Quero assistir à aula"}<ArrowRight aria-hidden="true" /></button>
            <small>Usaremos seus dados apenas para comunicações da aula e conteúdos relacionados à Kûara Cerâmicas. Você pode se descadastrar quando quiser.</small>
            {formStatus === "error" && <div className="free-class-error" role="alert"><strong>Não foi possível enviar.</strong><p>{errorMessage}</p></div>}
          </form>
        )}
      </div>
    </section>
  );
}

function WaitlistSignup() {
  const startedAtRef = useRef<HTMLInputElement>(null);
  const tokenRef = useRef<HTMLInputElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("Revise os campos e tente novamente em instantes.");

  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());

    let attempts = 0;
    const renderTurnstile = () => {
      const turnstile = (window as typeof window & { turnstile?: TurnstileApi }).turnstile;
      const container = turnstileContainerRef.current;
      if (!turnstile || !container || widgetIdRef.current !== null) return;
      widgetIdRef.current = turnstile.render(container, {
        sitekey: turnstileSiteKey,
        theme: "light",
        callback: (token) => {
          if (tokenRef.current) tokenRef.current.value = token;
        },
        "expired-callback": () => {
          if (tokenRef.current) tokenRef.current.value = "";
        },
        "error-callback": () => {
          if (tokenRef.current) tokenRef.current.value = "";
        },
      });
    };

    renderTurnstile();
    const timer = window.setInterval(() => {
      attempts += 1;
      renderTurnstile();
      if (widgetIdRef.current !== null || attempts > 30) window.clearInterval(timer);
    }, 300);

    return () => window.clearInterval(timer);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!tokenRef.current?.value) {
      setErrorMessage("Confirme a verificação anti-bot antes de enviar.");
      setFormStatus("error");
      return;
    }

    setFormStatus("sending");
    setErrorMessage("Revise os campos e tente novamente em instantes.");

    try {
      const payload = new URLSearchParams();
      new FormData(form).forEach((value, key) => payload.append(key, String(value)));
      const response = await fetch("/.netlify/functions/lead", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload,
      });
      const result = await response.json().catch(() => ({})) as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || "Falha no envio");

      form.reset();
      setFormStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Não foi possível concluir a inscrição.");
      setFormStatus("error");
      const turnstile = (window as typeof window & { turnstile?: TurnstileApi }).turnstile;
      if (turnstile && widgetIdRef.current !== null) turnstile.reset(widgetIdRef.current);
      if (tokenRef.current) tokenRef.current.value = "";
    }
  }

  return (
    <section className="waitlist section-pad" id="proxima-turma" aria-labelledby="waitlist-title">
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" />
      <div className="waitlist-copy">
        <div className="eyebrow"><span /> Próxima turma</div>
        <h2 id="waitlist-title">Quer saber quando uma nova turma <em>abrir?</em></h2>
        <p>Preencha com seus dados para receber o aviso em primeira mão.</p>
      </div>
      <div className="waitlist-card">
        {formStatus === "success" ? (
          <div className="waitlist-success" role="status">
            <strong>Você entrou na lista.</strong>
            <p>Vamos avisar em primeira mão quando a próxima turma abrir.</p>
          </div>
        ) : (
          <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="formType" value="waitlist" />
            <div className="waitlist-fields">
              <label className="waitlist-field" htmlFor="waitlist-name">
                <UserRound aria-hidden="true" />
                <span>Nome</span>
                <input id="waitlist-name" name="name" type="text" autoComplete="given-name" placeholder="Seu nome" maxLength={80} required />
              </label>
              <label className="waitlist-field" htmlFor="waitlist-surname">
                <UserRound aria-hidden="true" />
                <span>Sobrenome</span>
                <input id="waitlist-surname" name="surname" type="text" autoComplete="family-name" placeholder="Seu sobrenome" maxLength={80} required />
              </label>
              <label className="waitlist-field" htmlFor="waitlist-email">
                <Mail aria-hidden="true" />
                <span>E-mail</span>
                <input id="waitlist-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="voce@exemplo.com" maxLength={254} required />
              </label>
              <label className="waitlist-field" htmlFor="waitlist-whatsapp">
                <Phone aria-hidden="true" />
                <span>WhatsApp</span>
                <input id="waitlist-whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="(31) 99999-9999" maxLength={20} pattern="[\d\s()+.-]{8,20}" required />
              </label>
            </div>
            <label className="waitlist-consent" htmlFor="waitlist-privacy-consent">
              <input id="waitlist-privacy-consent" name="privacyConsent" type="checkbox" value="yes" required />
              <span>Concordo em receber comunicações sobre a próxima turma e li a <a href="/privacidade-termos.html#privacidade" target="_blank" rel="noreferrer">Política de Privacidade</a>.</span>
            </label>
            <input className="hp-field" type="text" name="email_address_check" defaultValue="" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <input ref={startedAtRef} type="hidden" name="formStartedAt" />
            <input ref={tokenRef} type="hidden" name="turnstileToken" />
            <div ref={turnstileContainerRef} className="turnstile-box" data-sitekey={turnstileSiteKey} aria-label="Verificação anti-bot" />
            <div className="waitlist-security"><ShieldCheck aria-hidden="true" /><span>Dados protegidos, validação antispam e descadastro a qualquer momento.</span></div>
            <button className="waitlist-submit" type="submit" disabled={formStatus === "sending"}>
              {formStatus === "sending" ? "Enviando…" : "Quero receber o aviso"}
              <ArrowRight aria-hidden="true" />
            </button>
            {formStatus === "error" && <div className="waitlist-error" role="alert"><strong>Não foi possível enviar.</strong><p>{errorMessage}</p></div>}
          </form>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const testimonialTrackRef = useRef<HTMLDivElement>(null);
  const [freeClassFormOpen, setFreeClassFormOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  function moveTestimonials(direction: -1 | 1) {
    const track = testimonialTrackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: "smooth" });
  }

  useEffect(() => {
    const root = document.documentElement;
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    revealItems.forEach((item) => observer.observe(item));

    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll", `${y}px`);
      root.style.setProperty("--progress", `${max > 0 ? y / max : 0}`);
      document.body.classList.toggle("is-scrolled", y > 48);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("is-scrolled");
    };
  }, []);

  useEffect(() => {
    let timer: number | undefined;
    const updateAvailability = () => {
      const remaining = waitlistFormOpensAt - Date.now();
      if (remaining <= 0) {
        setWaitlistOpen(true);
        return;
      }
      setWaitlistOpen(false);
      timer = window.setTimeout(updateAvailability, Math.min(remaining, 60 * 60 * 1000));
    };
    updateAvailability();
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const conversionHref = waitlistOpen ? "#proxima-turma" : checkoutUrl;
  const conversionTarget = waitlistOpen ? undefined : "_blank";
  const conversionRel = waitlistOpen ? undefined : "noreferrer";

  useEffect(() => {
    let timer: number | undefined;
    const updateAvailability = () => {
      const remaining = freeClassFormOpensAt - Date.now();
      if (remaining <= 0) {
        setFreeClassFormOpen(true);
        return;
      }
      setFreeClassFormOpen(false);
      timer = window.setTimeout(updateAvailability, Math.min(remaining, 60 * 60 * 1000));
    };
    updateAvailability();
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Kûara - início">
          <img className="brand-light" src="/assets/logo-kuara-white.png" alt="" />
          <img className="brand-dark" src="/assets/logo-kuara-brown.png" alt="" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#metodo">Mentoria</a>
          <a href="#conteudo">Aulas</a>
          <a className="nav-enroll" href={conversionHref} target={conversionTarget} rel={conversionRel}>{waitlistOpen ? "Próxima turma" : "Inscreva-se"}</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-progress" aria-hidden="true"><span /></div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-wash" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-main">
            <div className="eyebrow light" data-reveal><span /> Mentoria online · agosto a novembro de 2026</div>
            <h1 data-reveal>Construa seu próprio<br /><em>Forno de Latão.</em></h1>
            <div className="hero-bottom" data-reveal>
              <div>
                <p>Aprenda com Amanda Maciel a construir e manejar um forno de latão a gás para queima de cerâmica: acessível, versátil e capaz de atingir até 1245 °C.</p>
                <a className="text-cta light-cta" href={conversionHref} target={conversionTarget} rel={conversionRel}>{waitlistOpen ? "Entrar na lista" : "Inscreva-se"} <ArrowRight aria-hidden="true" /></a>
              </div>
            </div>
          </div>
          <div className="hero-highlights" data-reveal aria-label="Destaques da mentoria">
            {quickHighlights.map(({ icon: Icon, text }) => (
              <article className="hero-highlight" key={text}><Icon aria-hidden="true" /><strong>{text}</strong></article>
            ))}
          </div>
        </div>
        <div className="hero-index">{waitlistOpen ? <>PRÓXIMA <span>/</span> TURMA</> : <>03 <span>/</span> 14 AGO</>}</div>
      </section>

      <section className="video-story section-pad" aria-labelledby="video-story-title">
        <div className="video-story-heading" data-reveal>
          <div>
            <div className="eyebrow light"><span /> Conheça a mentoria</div>
            <h2 id="video-story-title">Veja o Forno de Latão <em>em ação.</em></h2>
          </div>
          <p>Conheça de perto a proposta da mentoria e a relação entre construção, manejo do fogo e autonomia na prática cerâmica.</p>
        </div>
        <div className="video-story-player" data-reveal>
          <iframe
            src="https://www.youtube-nocookie.com/embed/Sj7uvQfgdOM?rel=0"
            title="Mentoria Forno de Latão com Amanda Maciel"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      <section className="problem section-pad">
        <div className="problem-copy" data-reveal>
          <div className="eyebrow"><span /> O problema</div>
          <h2>E se a queima não dependesse de <em>fornos inacessíveis?</em></h2>
          <p>Muita gente chega à cerâmica com uma potência criativa enorme, mas encontra <mark>um gargalo justamente na etapa da queima.</mark> A dificuldade de acesso a fornos acaba limitando a produção, a experimentação e a liberdade de desenvolver um trabalho autoral.</p>
          <p>Para quem mora <mark>fora dos grandes centros</mark>, esse desafio costuma ser ainda maior. Nem sempre há fornos disponíveis para aluguel, nem sempre o tipo de queima desejado está ao alcance, nem sempre a agenda, ou o bolso, permitem o acesso a esse tipo de serviço.</p>
          <p>E, assim, muitos ceramistas permanecem distantes de uma das etapas mais importantes e transformadoras da cerâmica: acompanhar o fogo, compreender seu comportamento e construir, com ele, parte do resultado final de cada peça.</p>
          <p className="problem-emphasis">O Forno de Latão vem para te apresentar um caminho possível.</p>
          <p>Ele é <mark>artesanal, manual e exige presença.</mark> Você acompanha a chama, observa a curva de queima, aprende a ler sua atmosfera, ajustar equipamentos e entende o comportamento do forno com o corpo inteiro atento ao processo.</p>
          <p className="problem-closing">E justamente por isso ele também devolve autonomia.</p>
          <a className="problem-cta" href={conversionHref} target={conversionTarget} rel={conversionRel}>{waitlistOpen ? "Quero saber da próxima turma" : "Quero construir meu forno"} <ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="problem-visual" data-reveal>
          <div className="arch-image parallax-slow" role="img" aria-label="Mãos trabalhando com argila em um ateliê" />
          <span className="orbit-note">técnica · fogo · autonomia ·</span>
        </div>
      </section>

      <section className="pillars section-pad" id="metodo">
        <div className="section-heading" data-reveal>
          <div>
            <div className="eyebrow light"><span /> Mais do que um curso</div>
            <h2>Mais do que um curso, <em>uma mentoria.</em></h2>
          </div>
          <div className="section-heading-copy">
            <p>O que torna esta formação diferente é o tipo de acompanhamento que ela oferece.</p>
            <p>Construir um forno artesanal envolve decisões técnicas, adaptações regionais, cuidados de segurança e leitura de processos. Por isso, a mentoria combina aulas ao vivo, e-book técnico, materiais de apoio, grupo da turma e suporte direto com Amanda.</p>
            <p>Você vai ter acesso ao projeto do forno usado na Kûara, desenvolvido e aprimorado na prática, e também ao acompanhamento para entender como esse projeto se comporta nas queimas.</p>
          </div>
        </div>
        <p className="journey-label" data-reveal>Durante 3 meses, a turma caminha junta:</p>
        <div className="pillar-grid">
          {pillars.map(([number, title]) => (
            <article className="pillar-card" data-reveal key={number}>
              <span className="pillar-number">{number}</span>
              <h3>{title}</h3>
            </article>
          ))}
        </div>
        <div className="pillars-close" data-reveal>
          <a className="outline-cta pillars-cta" href={conversionHref} target={conversionTarget} rel={conversionRel}>{waitlistOpen ? "Quero saber da próxima turma" : "Quero construir meu forno"} <ArrowRight aria-hidden="true" /></a>
          <p>Ao longo da mentoria, vamos orientar você em cada etapa para que desenvolva autonomia, segurança e repertório para seguir construindo, pesquisando e experimentando.</p>
        </div>
      </section>

      <section className="promise section-pad">
        <div className="promise-copy" data-reveal>
          <h2>Da construção do forno às primeiras queimas <em>com segurança.</em></h2>
          <p>Na mentoria Forno de Latão para cerâmica: da construção às queimas, a gente te acompanha durante todo o processo: do projeto técnico do forno ao manejo dos equipamentos, da compra dos materiais ao manejo durante as queimas, das curvas de biscoito e esmalte às queimas poéticas.</p>
          <p className="promise-lead">Ao final da mentoria, a proposta é que você tenha:</p>
        </div>
        <ul className="promise-results" data-reveal>
          <li><Flame aria-hidden="true" /><span>Um Forno de Latão a gás funcional e versátil, construído por você, pronto para diferentes tipos de queima cerâmica.</span></li>
          <li><CircleGauge aria-hidden="true" /><span>Conhecimento sobre manejo e condução das queimas de biscoito, esmalte, monoqueima e várias queimas poéticas.</span></li>
          <li><BookOpenText aria-hidden="true" /><span>E-book ilustrado, aulas gravadas e outros materiais de estudo personalizados, reunindo conteúdo técnico, referências e registros do processo.</span></li>
        </ul>
      </section>

      <section className="teacher section-pad" id="sobre">
        <div className="teacher-photo-wrap" data-reveal>
          <img
            className="teacher-photo"
            src="/assets/amanda-convidativa.jpg"
            alt="Amanda Maciel sorrindo e segurando uma peça de cerâmica"
            width="1600"
            height="2000"
            loading="lazy"
            decoding="async"
          />
          <div className="photo-caption"><span>Amanda Maciel</span> Kûara Cerâmicas</div>
        </div>
        <div className="teacher-copy" data-reveal>
          <div className="eyebrow"><span /> Quem conduz</div>
          <h2>Amanda Maciel</h2>
          <p className="teacher-lead">A Kûara é a materialização desse caminho, que se faz andando e a muitas mãos.</p>
          <p>Sou graduada em Arquitetura e Urbanismo pela UFMG, onde também concluí mestrado e doutorado em Geografia.</p>
          <p>Minha trajetória socioambiental atravessa meu fazer artístico, orientado pela pesquisa, pela relação com os territórios e pelo respeito a quem mantém vivos saberes tradicionais.</p>
          <p>Na mentoria, compartilho o projeto do forno que utilizo na Kûara e os conhecimentos que consolidei ao longo do caminho.</p>
          <p>Métodos, cuidados, experimentações e aprendizados sobre fornos e queimas artesanais passam a fazer parte dessa construção coletiva.</p>
        </div>
      </section>

      <section className="audience section-pad">
        <div className="audience-title" data-reveal>
          <div className="eyebrow"><span /> Para quem é</div>
          <h2>Veja se esta jornada<br /><em>combina com você.</em></h2>
        </div>
        <span className="audience-hint">Deslize para comparar <ArrowRight aria-hidden="true" /></span>
        <div className="audience-track">
          <article className="audience-card fit" data-reveal>
            <div className="audience-card-head"><h3>É para você se...</h3></div>
            <ul>{fitItems.map((item) => <li key={item}><ArrowUpRight aria-hidden="true" /><span>{item}</span></li>)}</ul>
          </article>
          <article className="audience-card not-fit" data-reveal>
            <div className="audience-card-head"><h3>Talvez não seja para você se...</h3></div>
            <ul>{notFitItems.map((item) => <li key={item}><X aria-hidden="true" /><span>{item}</span></li>)}</ul>
          </article>
        </div>
      </section>

      <section className="curriculum section-pad" id="conteudo">
        <div className="curriculum-intro" data-reveal>
          <div className="eyebrow light"><span /> Cronograma</div>
          <h2>Projeto, construção,<br />queimas e <em>análise.</em></h2>
          <p>Seis encontros ao vivo entre agosto e novembro, incluindo duas queimas coletivas acompanhadas em tempo real.</p>
        </div>
        <div className="module-list" data-reveal>
          {modules.map((module) => (
            <details className="module-row" key={module.number}>
              <summary>
                <div className="module-meta">
                  <span>{module.number}</span>
                  {!waitlistOpen && <small>
                    <b>{module.meta.split(" · ")[0]}</b>
                    <b>{module.meta.split(" · ")[1]}</b>
                  </small>}
                </div>
                <h3>{module.title}</h3>
                <ChevronDown aria-hidden="true" />
              </summary>
              <div className="module-detail">
                <p>{module.intro}</p>
                <ul>{module.items.map((item) => <li key={item}>{item}</li>)}</ul>
                <p className="module-objective"><strong>Objetivo:</strong> {module.objective}</p>
              </div>
            </details>
          ))}
          <a className="curriculum-cta curriculum-end-cta" href={conversionHref} target={conversionTarget} rel={conversionRel}>{waitlistOpen ? "Quero saber da próxima turma" : "Ver detalhes e inscrever-se"} <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="testimonials section-pad" id="resultados">
        <div className="social-heading" data-reveal>
          <div className="eyebrow"><span /> A comunidade sobre a Kûara</div>
          <h2>O que acontece quando o forno entra na pesquisa.</h2>
          <p>Ter um forno de latão amplia as possibilidades da prática cerâmica. Ele te permite investigar materiais, atmosferas e curvas de queima no seu próprio ritmo. O forno se torna uma ferramenta de pesquisa, criação e autoria.</p>
        </div>
        <div className="social-grid" data-reveal>
          <div className="social-slideshow" aria-label="Galeria de resultados em cerâmica">
            {socialSlides.map((slide, index) => (
              <div
                className="social-slide"
                style={{
                  backgroundImage: `url("${slide.image}")`,
                  animationDelay: `${index * 3}s`,
                }}
                key={slide.caption}
                aria-hidden="true"
              >
                <span className="slide-caption">{slide.caption}</span>
              </div>
            ))}
          </div>
          <div className="testimonial-carousel">
            <div className="testimonial-nav" aria-label="Controles dos depoimentos">
              <button type="button" onClick={() => moveTestimonials(-1)} aria-label="Ver depoimentos anteriores">
                <ChevronLeft aria-hidden="true" />
              </button>
              <button type="button" onClick={() => moveTestimonials(1)} aria-label="Ver próximos depoimentos">
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
            <div className="testimonial-track" ref={testimonialTrackRef} aria-label="Depoimentos de participantes">
              {testimonials.map((testimonial) => (
                <blockquote className="testimonial-card" key={testimonial.author}>
                  <p>“{testimonial.quote}”</p>
                  <cite>{testimonial.author}</cite>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {!waitlistOpen && <section className="offer section-pad" id="oferta">
        <div className="offer-copy" data-reveal>
          <h2>Da construção<br /><em>às queimas.</em></h2>
          <div className="offer-intro">
            <p>Mentoria online, ao vivo e com acompanhamento.</p>
            <strong>17/8 a 17/11/26</strong>
          </div>
          <h3 className="included-title">Tudo o que você recebe</h3>
          <div className="included-groups">
            {includedGroups.map(({ icon: Icon, title, items }) => (
              <article className="included-group" key={title}>
                <div className="included-group-head"><Icon aria-hidden="true" /><h4>{title}</h4></div>
                <ul>{items.map((item) => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}</ul>
              </article>
            ))}
          </div>
        </div>
        <div className="price-card" data-reveal>
          <div className="price-card-head">
            <span className="price-label">Invista na sua prática</span>
            <div className="offer-stamp" aria-hidden="true">7 dias<br />de garantia</div>
          </div>
          <div className="installment-price" aria-label="Em até 12 vezes de 165 reais e 17 centavos">
            <div className="installment-line">
              <span className="installment-intro">Em até</span>
              <strong className="installment-count">12x</strong>
              <span className="installment-currency">de</span>
            </div>
            <div className="installment-main">
              <span className="installment-symbol">R$</span>
              <strong className="installment-amount">165,17</strong>
            </div>
          </div>
          <span className="cash">Pagamento pela Hotmart, com opções de Pix e parcelamento no cartão.</span>
          <div className="offer-detail">
            <strong>Inscrições de 3 a 14/8/26</strong>
            <span>Período da mentoria: 17 de agosto a 17 de novembro de 2026.</span>
            <span>Acesso às gravações e materiais por 1 ano.</span>
          </div>
          <div className="offer-detail">
            <strong>7 dias para decidir com tranquilidade</strong>
            <span>Se perceber que este não é o momento certo, você pode solicitar reembolso dentro do prazo diretamente pela Hotmart.</span>
          </div>
          <div className="offer-benefits" aria-label="Condições especiais da mentoria">
            <section className="offer-benefit">
              <HandHelping aria-hidden="true" />
              <div>
                <strong>Vagas sociais</strong>
                <p>2 vagas com 80% de desconto para multiplicadores do conhecimento.</p>
                <a href={socialSpotsUrl} target="_blank" rel="noreferrer">Saiba mais <ArrowUpRight aria-hidden="true" /></a>
              </div>
            </section>
            <section className="offer-benefit">
              <UserRound aria-hidden="true" />
              <div>
                <strong>Benefícios para ex-alunos</strong>
                <ul>
                  <li>Ex-alunos de mentorias e oficinas presenciais: <b>15% de desconto</b></li>
                  <li>Ex-alunos de cursos e aulas online: <b>5% de desconto</b></li>
                </ul>
                <p className="offer-benefit-note">Entre em contato pelo <a href={discountWhatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a> para receber seu desconto.</p>
              </div>
            </section>
          </div>
          <a href={checkoutUrl} target="_blank" rel="noreferrer" className="primary-button">Garantir minha vaga <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </section>}

      <section className="in-person section-pad" id="presencial">
        <div className="in-person-image" role="img" aria-label="Peças de cerâmica reunidas após uma queima" />
        <div className="in-person-copy" data-reveal>
          <div className="eyebrow light"><span /> Condição especial</div>
          <h2>Uma <em className="in-person-emphasis">experiência presencial</em> para ampliar seu repertório na prática.</h2>
          <p>Ao se matricular na Mentoria Forno de Latão, você recebe uma condição especial para participar do curso presencial Queimas Poéticas, em Belo Horizonte.</p>
          <p className="in-person-highlight">Após a confirmação da matrícula, você receberá por e-mail um cupom exclusivo de 20% de desconto.</p>
          <a className="outline-cta dark-outline" href={presencialUrl} target="_blank" rel="noreferrer">Conhecer o curso presencial <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="faq section-pad" id="faq">
        <div className="faq-heading" data-reveal>
          <div className="eyebrow"><span /> Perguntas frequentes</div>
          <h2>Ficou alguma<br /><em>dúvida?</em></h2>
          <p>Leia os detalhes antes de começar sua construção.</p>
        </div>
        <div className="faq-list" data-reveal>
          {faqs.map(([question, answer], index) => (
            <details key={question}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<ChevronDown aria-hidden="true" /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta section-pad">
        <div className="eyebrow light" data-reveal><span /> Sua próxima queima</div>
        <h2 data-reveal>Construa seu forno, aprenda a ler o fogo e conduza suas queimas com <strong className="keep-together">mais autonomia.</strong></h2>
        <p data-reveal>Se você quer aprofundar sua pesquisa cerâmica, deixar de depender exclusivamente de estruturas externas e construir uma relação mais próxima com o fogo, esta mentoria foi pensada para acompanhar você nesse caminho, desenvolvendo técnica, segurança e autonomia para conduzir suas próprias queimas.</p>
        {!waitlistOpen && <p className="final-dates" data-reveal>As inscrições ficam abertas de 3 a 14 de agosto de 2026, ou enquanto houver lugares disponíveis na turma.</p>}
        <a href={conversionHref} target={conversionTarget} rel={conversionRel} className="primary-button final-button" data-reveal>{waitlistOpen ? "Quero saber da próxima turma" : "Quero construir meu forno"} <ArrowUpRight aria-hidden="true" /></a>
      </section>

      {waitlistOpen && <WaitlistSignup />}
      {freeClassFormOpen && <FreeClassSignup />}

      <a className="back-to-top" href="#inicio" aria-label="Voltar ao topo"><ArrowUp aria-hidden="true" /></a>
      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Falar pelo WhatsApp"><img src="/assets/whatsapp.svg" alt="" /></a>

      <footer>
        <div className="footer-main">
          <div className="footer-intro">
            <img className="footer-logo" src="/assets/logo-kuara.svg" alt="Kûara Cerâmicas" />
            <p>Arte e pesquisa em cerâmica artesanal a partir da terra, do território e dos saberes tradicionais.</p>
          </div>
          <div className="footer-column">
            <strong>Esta página</strong>
            <a href="#metodo">Mentoria</a>
            <a href="#conteudo">Aulas</a>
            {waitlistOpen ? <a href="#proxima-turma">Próxima turma</a> : <a href="#oferta">Oferta</a>}
          </div>
          <div className="footer-column" id="contato">
            <strong>Fale com a gente</strong>
            <span>E-mail</span>
            <a href="https://www.instagram.com/kuaraceramicas/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight aria-hidden="true" /></a>
          </div>
          <div className="footer-column">
            <strong>Informações</strong>
            <a href="#faq">FAQ</a>
            <a href="/privacidade-termos.html#privacidade">Política de Privacidade</a>
            <a href="/privacidade-termos.html#termos">Termos de Uso</a>
            <a className="footer-offer" href={conversionHref} target={conversionTarget} rel={conversionRel}>{waitlistOpen ? "Entrar na lista" : "Garantir vaga"} <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Kûara Cerâmicas · CNPJ 31.660.739/0001-53</span>
          <a className="footer-credit" href="https://tauestudio.com.br" target="_blank" rel="noreferrer">Design e desenvolvimento por Estúdio Taú · tauestudio.com.br <ArrowUpRight aria-hidden="true" /></a>
          <a href="#inicio">Voltar ao topo <ArrowUp aria-hidden="true" /></a>
        </div>
      </footer>
    </main>
  );
}
