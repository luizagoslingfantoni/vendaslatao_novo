"use client";

import { useEffect } from "react";

const checkoutUrl = "https://pay.hotmart.com/H103127357T?off=3xgl76hj";
const whatsappUrl = "https://wa.me/?text=Olá%2C%20quero%20saber%20mais%20sobre%20a%20Mentoria%20Forno%20de%20Latão";
const presencialUrl = "https://www.oficina.cc/event-details/queimas-poeticas-com-kuara-ceramicas-2";

const quickHighlights = [
  "27 horas de aulas ao vivo",
  "3 meses de acompanhamento e suporte via WhatsApp",
  "E-book e materiais de estudo para download",
  "Aulas gravadas por 1 ano na Hotmart",
  "Acompanhamento ao vivo das queimas de biscoito e esmalte",
  "Projeto técnico, fornecedores e curvas de queima",
  "Vendas de 3 a 14 de agosto de 2026",
];

const pillars = [
  ["01", "Projeto técnico testado", "Acesso ao projeto do forno utilizado na Kûara, desenvolvido e aprimorado na prática."],
  ["02", "Construção possível", "Lista de materiais, equipamentos, fornecedores, orçamento e adaptações para diferentes regiões."],
  ["03", "Manejo com segurança", "Maçarico, termopar, manômetro, EPIs, montagem de carga e leitura da atmosfera do forno."],
  ["04", "Curvas essenciais", "Biscoito, esmalte, monoqueima e raku com controle de tempo, temperatura e resfriamento."],
  ["05", "Queimas poéticas", "Raku nu, obvara, saggar, carbonizações, reduções e iridescências como repertório criativo."],
  ["06", "Acompanhamento próximo", "Aulas ao vivo, grupo da turma, suporte direto com Amanda e análise dos resultados."],
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

const outcomes = [
  "Um Forno de Latão a gás funcional, construído por você ou em processo avançado, pronto para queimas até 1245 °C.",
  "Economia significativa em relação a fornos elétricos semelhantes, com investimento médio de R$ 3.000 na estrutura.",
  "Conhecimento para conduzir biscoito, esmalte, monoqueima e diferentes queimas poéticas.",
  "E-book, planilhas, curvas, fornecedores, registros e gravações para consultar sempre que precisar.",
  "Mais autonomia, segurança e liberdade para seguir seu caminho na cerâmica.",
];

const included = [
  "27 horas de aulas ao vivo",
  "Gravação de todas as aulas",
  "Acesso por 1 ano aos conteúdos na Hotmart",
  "E-book ilustrado para download",
  "Projeto técnico do forno utilizado na Kûara",
  "Lista de materiais, equipamentos e fornecedores",
  "Planilha de orçamento",
  "Curvas de queima em Excel e PDF",
  "Materiais complementares de estudo",
  "Grupo de estudos da turma no WhatsApp",
  "Suporte direto com Amanda por 3 meses",
  "Queimas de biscoito e esmalte acompanhadas ao vivo",
  "Análise final de resultados e estudos de caso",
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

export default function Home() {
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

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Kûara - início">
          <img className="brand-light" src="/assets/logo-kuara.svg" alt="" />
          <img className="brand-dark" src="/assets/logo-escuro.svg" alt="" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#metodo">Mentoria</a>
          <a href="#conteudo">Aulas</a>
          <a className="nav-enroll" href={checkoutUrl} target="_blank" rel="noreferrer">Inscreva-se</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-progress" aria-hidden="true"><span /></div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-wash" aria-hidden="true" />
        <div className="hero-content">
          <div className="eyebrow light" data-reveal><span /> Mentoria online · agosto a novembro de 2026</div>
          <h1 data-reveal>Construa seu próprio<br /><em>Forno de Latão.</em></h1>
          <div className="hero-bottom" data-reveal>
            <div>
              <p>Aprenda com Amanda Maciel a construir e manejar um forno de latão a gás para queima de cerâmica: acessível, versátil e capaz de atingir até 1245 °C.</p>
              <a className="text-cta light-cta" href={checkoutUrl} target="_blank" rel="noreferrer">Inscreva-se <span>⟶</span></a>
            </div>
          </div>
        </div>
        <div className="hero-index">03 <span>/</span> 14 AGO</div>
      </section>

      <section className="manifesto section-pad" id="manifesto">
        <div className="eyebrow" data-reveal><span /> Em poucas palavras</div>
        <p className="statement" data-reveal>
          Uma mentoria coletiva para ceramistas que querem <em>autonomia, conhecimento técnico e repertório poético</em> para queimar suas cerâmicas.
        </p>
        <div className="quick-highlights" data-reveal>
          {quickHighlights.map((item, index) => (
            <div className="quick-highlight" key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>
          ))}
        </div>
      </section>

      <section className="problem section-pad">
        <div className="problem-copy" data-reveal>
          <div className="eyebrow"><span /> O problema</div>
          <h2>E se a queima não dependesse de <em>fornos inacessíveis?</em></h2>
          <p>Muita gente chega à cerâmica com uma potência criativa enorme, mas encontra um gargalo justamente na etapa da queima. A dificuldade de acesso a fornos limita a produção, a experimentação e a liberdade de desenvolver um trabalho autoral.</p>
          <p>O Forno de Latão apresenta um caminho possível: artesanal, manual e capaz de devolver autonomia. Você acompanha a chama, lê a atmosfera e entende o comportamento do forno com o corpo inteiro atento ao processo.</p>
          <a className="outline-cta" href={checkoutUrl} target="_blank" rel="noreferrer">Quero construir meu forno <span>⟶</span></a>
        </div>
        <div className="problem-visual" data-reveal>
          <div className="arch-image parallax-slow" role="img" aria-label="Mãos trabalhando com argila em um ateliê" />
          <span className="orbit-note">técnica · fogo · autonomia ·</span>
        </div>
      </section>

      <section className="promise section-pad">
        <div className="promise-copy" data-reveal>
          <h2>Da construção do forno às primeiras queimas <em>com segurança.</em></h2>
          <p>Na Mentoria Forno de Latão, acompanhamos você durante todo o processo: do projeto técnico ao manejo dos equipamentos, da compra dos materiais às curvas de biscoito, esmalte e queimas poéticas.</p>
          <p>Você não recebe apenas um passo a passo. Cada etapa é orientada para que você desenvolva autonomia, segurança e repertório para continuar pesquisando e experimentando.</p>
        </div>
        <div className="promise-steps" data-reveal>
          <div><span>01</span><strong>Projetar</strong><small>materiais, fornecedores e construção</small></div>
          <div><span>02</span><strong>Manejar</strong><small>equipamentos, curvas e atmosferas</small></div>
          <div><span>03</span><strong>Queimar</strong><small>biscoito, esmalte e processos poéticos</small></div>
        </div>
      </section>

      <section className="pillars section-pad" id="metodo">
        <div className="section-heading" data-reveal>
          <div>
            <div className="eyebrow light"><span /> Mais do que um curso</div>
            <h2>Uma mentoria.<br /><em>Um forno seu.</em></h2>
          </div>
          <p>Durante três meses, a turma caminha junta: estuda o projeto, organiza compras, tira dúvidas de montagem, aprende curvas de queima e analisa resultados.</p>
        </div>
        <span className="swipe-hint">Deslize para conhecer os 6 fatores <b>⟶</b></span>
        <div className="pillar-grid">
          {pillars.map(([number, title, copy]) => (
            <article className="pillar-card" data-reveal key={number}>
              <span className="pillar-number">{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="teacher section-pad" id="sobre">
        <div className="teacher-photo-wrap" data-reveal>
          <div className="teacher-photo parallax-medium" role="img" aria-label="Amanda Maciel segurando uma peça de cerâmica" />
          <div className="photo-caption"><span>Amanda Maciel</span> Kûara Cerâmicas</div>
        </div>
        <div className="teacher-copy" data-reveal>
          <div className="eyebrow"><span /> Quem conduz</div>
          <h2>Amanda Maciel</h2>
          <p className="teacher-lead">“A Kûara é a materialização desse caminho, que se faz andando e a muitas mãos.”</p>
          <p>Sou graduada em Arquitetura e Urbanismo pela UFMG, onde também concluí mestrado e doutorado em Geografia. Minha trajetória socioambiental atravessa meu fazer artístico, orientado pela pesquisa, pela relação com os territórios e pelo respeito a quem mantém vivos saberes tradicionais.</p>
          <p>Na mentoria, compartilho o projeto do forno que utilizo na Kûara e os conhecimentos que consolidei ao longo do caminho: métodos, cuidados, experimentações e aprendizados sobre fornos e queimas artesanais.</p>
        </div>
      </section>

      <section className="audience section-pad">
        <div className="audience-title" data-reveal>
          <div className="eyebrow"><span /> Para quem é</div>
          <h2>Veja se esta jornada<br /><em>combina com você.</em></h2>
        </div>
        <span className="audience-hint">Deslize para comparar <b>⟶</b></span>
        <div className="audience-track">
          <article className="audience-card fit" data-reveal>
            <div className="audience-card-head"><span>SIM</span><h3>É para você se...</h3></div>
            <ul>{fitItems.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="audience-card not-fit" data-reveal>
            <div className="audience-card-head"><span>NÃO</span><h3>Talvez não seja para você se...</h3></div>
            <ul>{notFitItems.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="curriculum section-pad" id="conteudo">
        <div className="curriculum-intro" data-reveal>
          <div className="eyebrow light"><span /> O cronograma</div>
          <h2>Projeto, construção,<br />queimas e <em>análise.</em></h2>
          <p>Seis encontros ao vivo entre agosto e novembro, incluindo duas queimas coletivas acompanhadas em tempo real.</p>
          <a className="outline-cta dark-outline" href={checkoutUrl} target="_blank" rel="noreferrer">Ver detalhes e inscrever-se <span>⟶</span></a>
        </div>
        <div className="module-list" data-reveal>
          {modules.map((module) => (
            <details className="module-row" key={module.number}>
              <summary>
                <span>{module.number}</span>
                <h3>{module.title}</h3>
                <small>{module.meta}</small>
                <i aria-hidden="true">+</i>
              </summary>
              <div className="module-detail">
                <p>{module.intro}</p>
                <ul>{module.items.map((item) => <li key={item}>{item}</li>)}</ul>
                <p className="module-objective"><strong>Objetivo:</strong> {module.objective}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="outcomes section-pad">
        <div className="outcomes-heading" data-reveal>
          <div className="eyebrow"><span /> Resultados esperados</div>
          <h2>Ao final da mentoria, <em>você terá</em></h2>
        </div>
        <span className="swipe-hint outcome-hint">Deslize para ver os resultados <b>⟶</b></span>
        <div className="outcome-track">
          {outcomes.map((item, index) => (
            <article className="outcome-card" data-reveal key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></article>
          ))}
        </div>
      </section>

      <section className="testimonials section-pad" id="resultados">
        <div className="social-heading" data-reveal>
          <div className="eyebrow"><span /> A comunidade sobre a Kûara</div>
          <h2>O que acontece quando o forno entra na pesquisa.</h2>
          <p>O forno de latão não é apenas uma estrutura. Ele muda a relação com o tempo, com o risco, com a observação e com a autoria do processo.</p>
        </div>
        <div className="social-grid" data-reveal>
          <div className="social-slideshow" aria-label="Galeria de resultados em cerâmica">
            <div className="social-slide slide-a" aria-hidden="true" />
            <div className="social-slide slide-b" aria-hidden="true" />
            <div className="social-slide slide-c" aria-hidden="true" />
            <span className="slide-caption">Pesquisa, fogo e atmosfera</span>
            <div className="slide-dots" aria-hidden="true"><i /><i /><i /></div>
          </div>
          <div className="testimonial-track" aria-label="Depoimentos de participantes">
            <blockquote className="testimonial-card">
              <p>“Com certeza a mentoria valeu cada centavo. Amanda está entre os professores que mudaram a minha vida pela humildade, leveza e respeito pelo processo de cada um.”</p>
              <cite>Bárbara G. · Forno de Latão e Fornos de Tijolos</cite>
            </blockquote>
            <blockquote className="testimonial-card">
              <p>“Sou muito grata por ter feito a mentoria. Além do aprendizado sobre cerâmica e fornos, também aprendi muito sobre gestão e pedagogia.”</p>
              <cite>Anna T. · Forno de Latão</cite>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="offer section-pad" id="oferta">
        <div className="offer-stamp" aria-hidden="true">7 dias<br />de garantia</div>
        <div className="offer-copy" data-reveal>
          <div className="eyebrow light"><span /> A oferta</div>
          <h2>Da construção<br /><em>às queimas.</em></h2>
          <p>Mentoria online, ao vivo e com acompanhamento, de 17 de agosto a 17 de novembro de 2026.</p>
          <h3 className="included-title">Tudo o que você recebe</h3>
          <ul className="included-list">
            {included.map((item) => <li key={item}><span>✓</span>{item}</li>)}
          </ul>
        </div>
        <div className="price-card" data-reveal>
          <span className="price-label">Invista na sua prática</span>
          <div className="price price-single"><strong>R$ 1.597</strong></div>
          <span className="cash">Pagamento pela Hotmart, com opções de Pix e parcelamento no cartão.</span>
          <div className="offer-detail">
            <strong>Matrículas de 3 a 14/8/26</strong>
            <span>Período da mentoria: 17 de agosto a 17 de novembro de 2026. Acesso às gravações e materiais por 1 ano.</span>
          </div>
          <div className="offer-detail">
            <strong>7 dias para decidir com tranquilidade</strong>
            <span>Se perceber que este não é o momento certo, você pode solicitar reembolso dentro do prazo diretamente pela Hotmart.</span>
          </div>
          <a href={checkoutUrl} target="_blank" rel="noreferrer" className="primary-button">Garantir minha vaga <span>↗</span></a>
        </div>
      </section>

      <section className="in-person section-pad" id="presencial">
        <div className="in-person-image" role="img" aria-label="Peças de cerâmica reunidas após uma queima" />
        <div className="in-person-copy" data-reveal>
          <div className="eyebrow light"><span /> Condição especial</div>
          <h2>Uma experiência presencial para ampliar seu repertório <em>na prática.</em></h2>
          <p>Ao se matricular na Mentoria Forno de Latão, você recebe uma condição especial para participar do curso presencial Queimas Poéticas, em Belo Horizonte.</p>
          <p>Após a confirmação da matrícula, você receberá por e-mail um cupom exclusivo de 20% de desconto.</p>
          <div className="in-person-price"><small>de R$ 750 por</small><strong>R$ 600</strong></div>
          <a className="outline-cta dark-outline" href={presencialUrl} target="_blank" rel="noreferrer">Conhecer o curso presencial <span>↗</span></a>
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
            <details key={question} open={index === 0}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i aria-hidden="true">+</i></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta section-pad">
        <div className="eyebrow light" data-reveal><span /> Sua próxima queima</div>
        <h2 data-reveal>Construa seu forno, aprenda a ler o fogo e conduza suas queimas <em>com mais autonomia.</em></h2>
        <p data-reveal>Se você quer aprofundar sua pesquisa cerâmica, deixar de depender exclusivamente de estruturas externas e construir uma relação mais próxima com o fogo, esta mentoria foi pensada para acompanhar você nesse caminho, desenvolvendo técnica, segurança e autonomia para conduzir suas próprias queimas.</p>
        <p className="final-dates" data-reveal>As inscrições ficam abertas de 3 a 14 de agosto de 2026, ou enquanto houver lugares disponíveis na turma.</p>
        <a href={checkoutUrl} target="_blank" rel="noreferrer" className="primary-button final-button" data-reveal>Quero construir meu forno <span>↗</span></a>
      </section>

      <a className="back-to-top" href="#inicio" aria-label="Voltar ao topo">Voltar ao topo <span>↑</span></a>
      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Falar pelo WhatsApp"><img src="https://cdn.simpleicons.org/whatsapp/FFFFFF" alt="" /></a>

      <footer>
        <div className="footer-main">
          <div className="footer-intro">
            <img className="footer-logo" src="/assets/logo-kuara.svg" alt="Kûara Cerâmicas" />
            <p>Arte e pesquisa em cerâmica artesanal a partir da terra, do território e dos saberes tradicionais.</p>
          </div>
          <div className="footer-column">
            <strong>Esta página</strong>
            <a href="#metodo">Método</a>
            <a href="#conteudo">Programa</a>
            <a href="#oferta">Oferta</a>
          </div>
          <div className="footer-column" id="contato">
            <strong>Fale com a gente</strong>
            <span>E-mail</span>
            <a href="https://www.instagram.com/kuaraceramicas/" target="_blank" rel="noreferrer">Instagram ↗</a>
          </div>
          <div className="footer-column">
            <strong>Informações</strong>
            <a href="#faq">FAQ</a>
            <a className="footer-offer" href={checkoutUrl} target="_blank" rel="noreferrer">Garantir vaga ↗</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Kûara Cerâmicas · CNPJ 31.660.739/0001-53</span>
          <span>Produzido e desenvolvido por Sacada</span>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>
    </main>
  );
}
