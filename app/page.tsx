"use client";

import { useEffect } from "react";

const pillars = [
  ["01", "Lorem ipsum", "Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."],
  ["02", "Dolor sit amet", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."],
  ["03", "Consectetur", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat."],
  ["04", "Adipiscing elit", "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt."],
  ["05", "Tempor incididunt", "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium."],
  ["06", "Magna aliqua", "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."],
];

const modules = [
  ["Módulo 01", "Lorem ipsum dolor sit amet", "03 aulas · 42 min"],
  ["Módulo 02", "Consectetur adipiscing elit", "04 aulas · 58 min"],
  ["Módulo 03", "Sed do eiusmod tempor", "05 aulas · 1h 12min"],
  ["Módulo 04", "Incididunt ut labore", "04 aulas · 54 min"],
  ["Módulo 05", "Et dolore magna aliqua", "03 aulas · 46 min"],
];

const faqs = [
  ["Lorem ipsum dolor sit amet?", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed ultricies magna. Integer vitae justo ac nunc vulputate faucibus."],
  ["Consectetur adipiscing elit sed do?", "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."],
  ["Ut enim ad minim veniam quis nostrud?", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."],
  ["Excepteur sint occaecat cupidatat?", "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
  ["Nemo enim ipsam voluptatem quia?", "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque."],
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
    };
  }, []);

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Forma — início">
          <span className="brand-mark">F</span>
          <span>forma</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#metodo">Método</a>
          <a href="#conteudo">Conteúdo</a>
          <a href="#sobre">Sobre</a>
        </nav>
        <a className="header-cta" href="#oferta">Quero começar <span>↗</span></a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-wash" aria-hidden="true" />
        <div className="hero-content">
          <div className="eyebrow light" data-reveal><span /> Curso online · nova turma</div>
          <h1 data-reveal>Lorem ipsum,<br /><em>dolor sit amet.</em></h1>
          <div className="hero-bottom" data-reveal>
            <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a className="circle-link" href="#manifesto" aria-label="Explorar a página"><span>↓</span></a>
          </div>
        </div>
        <div className="hero-index">01 <span>/</span> 09</div>
      </section>

      <section className="manifesto section-pad" id="manifesto">
        <div className="eyebrow" data-reveal><span /> Em poucas palavras</div>
        <p className="statement" data-reveal>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <em>Sed do eiusmod tempor</em> incididunt ut labore et dolore magna aliqua — ut enim ad minim veniam.
        </p>
        <div className="signature" data-reveal>
          <span>Uma jornada em</span>
          <strong>6 pilares</strong>
          <span>para transformar</span>
        </div>
      </section>

      <section className="problem section-pad">
        <div className="problem-copy" data-reveal>
          <div className="eyebrow"><span /> O problema</div>
          <h2>Você não precisa de <em>mais informação.</em></h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        <div className="problem-visual" data-reveal>
          <div className="arch-image parallax-slow" role="img" aria-label="Mãos trabalhando com argila em um ateliê" />
          <span className="orbit-note">prática · processo · presença ·</span>
        </div>
      </section>

      <section className="pillars section-pad" id="metodo">
        <div className="section-heading" data-reveal>
          <div>
            <div className="eyebrow light"><span /> A solução</div>
            <h2>Seis fatores.<br /><em>Uma mudança real.</em></h2>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="pillar-grid">
          {pillars.map(([number, title, copy]) => (
            <article className="pillar-card" data-reveal key={number}>
              <span className="pillar-number">{number}</span>
              <div className="pillar-symbol" aria-hidden="true"><i /><i /></div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="teacher section-pad" id="sobre">
        <div className="teacher-photo-wrap" data-reveal>
          <div className="teacher-photo parallax-medium" role="img" aria-label="Retrato da pessoa que ministra o curso" />
          <div className="photo-caption"><span>01</span> Lorem ipsum dolor sit</div>
        </div>
        <div className="teacher-copy" data-reveal>
          <div className="eyebrow"><span /> Quem conduz</div>
          <h2>Lorem Ipsum</h2>
          <p className="teacher-lead">“Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.”</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget justo vitae erat gravida consequat. Cras fermentum, sapien et tincidunt feugiat, justo velit volutpat augue.</p>
          <div className="teacher-stats">
            <div><strong>10+</strong><span>anos de<br />experiência</span></div>
            <div><strong>2k</strong><span>pessoas<br />impactadas</span></div>
          </div>
        </div>
      </section>

      <section className="audience section-pad">
        <div className="audience-title" data-reveal>
          <div className="eyebrow"><span /> Para quem é</div>
          <h2>Talvez seja<br /><em>para você.</em></h2>
        </div>
        <div className="audience-columns">
          <div className="audience-col yes" data-reveal>
            <span className="audience-icon">+</span>
            <h3>É para você se...</h3>
            <ul>
              <li>Lorem ipsum dolor sit amet, consectetur</li>
              <li>Sed do eiusmod tempor incididunt ut</li>
              <li>Quis nostrud exercitation ullamco laboris</li>
              <li>Ex ea commodo consequat duis aute</li>
            </ul>
          </div>
          <div className="audience-col no" data-reveal>
            <span className="audience-icon">−</span>
            <h3>Não é para você se...</h3>
            <ul>
              <li>Ut enim ad minim veniam quis nostrud</li>
              <li>Voluptate velit esse cillum dolore</li>
              <li>Excepteur sint occaecat cupidatat</li>
              <li>Sunt in culpa qui officia deserunt</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="curriculum section-pad" id="conteudo">
        <div className="curriculum-intro" data-reveal>
          <div className="eyebrow light"><span /> O cronograma</div>
          <h2>Do primeiro passo<br />à <em>transformação.</em></h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>
        <div className="module-list" data-reveal>
          {modules.map(([number, title, meta], index) => (
            <div className="module-row" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <small>{meta}</small>
              <i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials section-pad">
        <div className="testimonial-art" data-reveal>
          <div className="quote-mark">“</div>
          <div className="floating-photo photo-one" aria-hidden="true" />
          <div className="floating-photo photo-two" aria-hidden="true" />
        </div>
        <div className="testimonial-copy" data-reveal>
          <div className="eyebrow"><span /> Histórias reais</div>
          <blockquote>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”</blockquote>
          <div className="testimonial-person">
            <div className="avatar" aria-hidden="true" />
            <div><strong>Lorem Ipsum</strong><span>Turma 04 · São Paulo</span></div>
          </div>
          <div className="testimonial-nav" aria-label="Navegação dos depoimentos"><button aria-label="Depoimento anterior">←</button><span>01 / 04</span><button aria-label="Próximo depoimento">→</button></div>
        </div>
      </section>

      <section className="offer section-pad" id="oferta">
        <div className="offer-stamp" aria-hidden="true">acesso<br />imediato</div>
        <div className="offer-copy" data-reveal>
          <div className="eyebrow light"><span /> A oferta</div>
          <h2>Comece agora.<br /><em>No seu ritmo.</em></h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Acesso completo por 12 meses.</p>
          <ul>
            <li><span>✓</span> 19 aulas gravadas em alta definição</li>
            <li><span>✓</span> Material complementar para download</li>
            <li><span>✓</span> Encontros ao vivo e comunidade</li>
            <li><span>✓</span> Certificado de conclusão</li>
          </ul>
        </div>
        <div className="price-card" data-reveal>
          <span className="price-label">Investimento</span>
          <div className="old-price">de R$ 997</div>
          <div className="price"><small>12×</small><strong>R$ 79</strong><sup>,70</sup></div>
          <span className="cash">ou R$ 797 à vista</span>
          <a href="#inicio" className="primary-button">Quero fazer parte <span>↗</span></a>
          <p>Compra segura · 7 dias de garantia</p>
        </div>
      </section>

      <section className="faq section-pad">
        <div className="faq-heading" data-reveal>
          <div className="eyebrow"><span /> Perguntas frequentes</div>
          <h2>Ficou alguma<br /><em>dúvida?</em></h2>
          <p>Lorem ipsum dolor sit amet? <a href="mailto:ola@forma.com">Fale com a gente ↗</a></p>
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

      <footer>
        <div className="footer-top">
          <div className="footer-word">forma<span>●</span></div>
          <p>Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.</p>
          <a href="#inicio" aria-label="Voltar ao topo">↑</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Forma</span>
          <div><a href="#">Instagram</a><a href="#">Termos</a><a href="#">Privacidade</a></div>
          <span>Feito com intenção</span>
        </div>
      </footer>
    </main>
  );
}
