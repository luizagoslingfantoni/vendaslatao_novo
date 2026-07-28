"use client";

import { useEffect } from "react";

const checkoutUrl = "https://pay.hotmart.com/H103127357T?off=3xgl76hj";
const whatsappUrl = "https://wa.me/?text=Olá%2C%20quero%20saber%20mais%20sobre%20a%20Mentoria%20Forno%20de%20Latão";

const pillars = [
  ["01", "Projeto técnico testado", "Acesso ao projeto do forno utilizado na Kûara, desenvolvido e aprimorado na prática."],
  ["02", "Construção possível", "Lista de materiais, equipamentos, fornecedores, orçamento e adaptações para diferentes regiões."],
  ["03", "Manejo com segurança", "Maçarico, termopar, manômetro, EPIs, montagem de carga e leitura da atmosfera do forno."],
  ["04", "Curvas essenciais", "Biscoito, esmalte, monoqueima e raku com controle de tempo, temperatura e resfriamento."],
  ["05", "Queimas poéticas", "Raku nu, obvara, saggar, carbonizações, reduções e iridescências como repertório criativo."],
  ["06", "Acompanhamento próximo", "Aulas ao vivo, grupo da turma, suporte direto com Amanda e análise dos resultados."],
];

const modules = [
  ["Aula 01", "Projeto técnico do forno", "22 ago · 9h às 12h"],
  ["Aula 02", "Curvas e manejo das queimas", "02 set · 19h às 21h30"],
  ["Aula 03", "Queimas poéticas", "23 set · 19h às 21h30"],
  ["Aula 04", "Queima coletiva de biscoito", "24 out · 8h30 às 17h30"],
  ["Aula 05", "Queima coletiva de esmalte", "07 nov · 8h30 às 15h30"],
  ["Aula 06", "Estudos de caso da turma", "11 nov · 18h30 às 21h30"],
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
          <span className="brand-mark">K</span>
          <span>kûara</span>
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
            <a className="circle-link" href="#manifesto" aria-label="Conhecer a mentoria"><span>↓</span></a>
          </div>
        </div>
        <div className="hero-index">03 <span>/</span> 14 AGO</div>
      </section>

      <section className="manifesto section-pad" id="manifesto">
        <div className="eyebrow" data-reveal><span /> Em poucas palavras</div>
        <p className="statement" data-reveal>
          Uma mentoria coletiva para ceramistas que querem <em>autonomia, conhecimento técnico e repertório poético</em> para queimar suas cerâmicas.
        </p>
        <div className="signature" data-reveal>
          <span>Da construção</span>
          <strong>27 horas</strong>
          <span>às primeiras queimas</span>
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

      <section className="pillars section-pad" id="metodo">
        <div className="section-heading" data-reveal>
          <div>
            <div className="eyebrow light"><span /> Mais do que um curso</div>
            <h2>Uma mentoria.<br /><em>Um forno seu.</em></h2>
          </div>
          <p>Durante três meses, a turma caminha junta: estuda o projeto, organiza compras, tira dúvidas de montagem, aprende curvas de queima e analisa resultados.</p>
        </div>
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
          <div className="teacher-photo parallax-medium" role="img" aria-label="Imagem de referência para a foto de Amanda no ateliê" />
          <div className="photo-caption"><span>Imagem de referência</span> Amanda no ateliê</div>
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
          <h2>Essa jornada é<br /><em>para você?</em></h2>
        </div>
        <div className="audience-columns">
          <div className="audience-col yes" data-reveal>
            <span className="audience-icon">+</span>
            <h3>É para você se...</h3>
            <ul>
              <li>Já tem experiência com modelagem e quer autonomia na queima</li>
              <li>Busca um forno artesanal a gás que alcance até 1245 °C</li>
              <li>Quer aprender a manejar equipamentos, curvas e atmosferas</li>
              <li>Deseja explorar biscoito, esmalte, monoqueima e queimas poéticas</li>
              <li>Já possui um forno de latão e quer aprimorar seus resultados</li>
            </ul>
          </div>
          <div className="audience-col no" data-reveal>
            <span className="audience-icon">−</span>
            <h3>Não é para você se...</h3>
            <ul>
              <li>Está buscando aprender modelagem ou esmaltação do zero</li>
              <li>Precisa de produção padronizada e automatizada em grande volume</li>
              <li>Não tem acesso a um espaço aberto e bem ventilado</li>
              <li>Quer apenas assistir sem colocar o processo em prática</li>
            </ul>
          </div>
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
          {modules.map(([number, title, meta]) => (
            <div className="module-row" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <small>{meta}</small>
            </div>
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
          <blockquote className="testimonial-card">
            <p>“Com certeza a mentoria valeu cada centavo. Amanda está entre os professores que mudaram a minha vida pela humildade, leveza e respeito pelo processo de cada um.”</p>
            <cite>Bárbara G. · Forno de Latão e Fornos de Tijolos</cite>
          </blockquote>
          <blockquote className="testimonial-card">
            <p>“Sou muito grata por ter feito a mentoria. Além do aprendizado sobre cerâmica e fornos, também aprendi muito sobre gestão e pedagogia.”</p>
            <cite>Anna T. · Forno de Latão</cite>
          </blockquote>
        </div>
      </section>

      <section className="offer section-pad" id="oferta">
        <div className="offer-stamp" aria-hidden="true">7 dias<br />de garantia</div>
        <div className="offer-copy" data-reveal>
          <div className="eyebrow light"><span /> A oferta</div>
          <h2>Da construção<br /><em>às queimas.</em></h2>
          <p>Mentoria online, ao vivo e com acompanhamento, de 17 de agosto a 17 de novembro de 2026.</p>
          <ul>
            <li><span>✓</span> 27 horas de aulas ao vivo e todas as gravações</li>
            <li><span>✓</span> Acesso por 1 ano aos conteúdos na Hotmart</li>
            <li><span>✓</span> E-book ilustrado e projeto técnico do forno</li>
            <li><span>✓</span> Materiais, fornecedores, orçamento e curvas de queima</li>
            <li><span>✓</span> Grupo de estudos e suporte por 3 meses</li>
            <li><span>✓</span> Duas queimas coletivas e análise final dos resultados</li>
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
        <p data-reveal>As inscrições ficam abertas de 3 a 14 de agosto de 2026, ou enquanto houver lugares disponíveis na turma.</p>
        <a href={checkoutUrl} target="_blank" rel="noreferrer" className="primary-button final-button" data-reveal>Quero construir meu forno <span>↗</span></a>
      </section>

      <a className="back-to-top" href="#inicio" aria-label="Voltar ao topo">Voltar ao topo <span>↑</span></a>
      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Falar pelo WhatsApp"><span>WA</span><b>WhatsApp</b></a>

      <footer>
        <div className="footer-main">
          <div className="footer-intro">
            <div className="footer-logo">K Û A R A</div>
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
