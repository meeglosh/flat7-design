import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeTabBar } from '../../components/ThemeTabBar';

// ─── Palette ──────────────────────────────────────────────────────────────────
function usePalette(dark: boolean) {
  return dark ? {
    pageBg:      '#0C0B09',
    pageBg2:     '#141210',
    text:        '#EDE8E0',
    textMuted:   'rgba(237,232,224,0.5)',
    textFaint:   'rgba(237,232,224,0.28)',
    gold:        '#C4A882',
    goldDim:     'rgba(196,168,130,0.35)',
    border:      'rgba(237,232,224,0.1)',
    borderMid:   'rgba(237,232,224,0.2)',
    navBg:       'rgba(12,11,9,0.94)',
    cardBg:      '#141210',
    heroOverlay: 'linear-gradient(to right, rgba(12,11,9,0.55) 0%, rgba(12,11,9,0.15) 60%, rgba(12,11,9,0.6) 100%)',
  } : {
    pageBg:      '#FAF7F2',
    pageBg2:     '#F2EDE4',
    text:        '#1A1714',
    textMuted:   'rgba(26,23,20,0.5)',
    textFaint:   'rgba(26,23,20,0.28)',
    gold:        '#8A6D48',
    goldDim:     'rgba(138,109,72,0.2)',
    border:      'rgba(26,23,20,0.1)',
    borderMid:   'rgba(26,23,20,0.2)',
    navBg:       'rgba(250,247,242,0.94)',
    cardBg:      '#F2EDE4',
    heroOverlay: 'linear-gradient(to right, rgba(250,247,242,0.45) 0%, rgba(250,247,242,0.05) 55%, rgba(250,247,242,0.55) 100%)',
  };
}

const PROJECTS = [
  { no: '01', name: 'Onix',        cat: 'Health AI · iOS',           url: 'https://onix.life',
    desc: 'Expert-trained AI health companions built on a privacy-first architecture. 16 renowned specialists encode their life\'s work, not public internet knowledge.' },
  { no: '02', name: 'Soluna',      cat: 'Mental Health AI · iOS',    url: 'https://solunaapp.com',
    desc: 'High-stakes UX where gentleness is a feature. Mental health support for young people, designed at the intersection of clinical rigor and human warmth.' },
  { no: '03', name: 'Wingman',     cat: 'Productivity AI · Web',     url: 'https://wingman-3g7a.onrender.com/',
    desc: 'From prompt to polished presentation. AI-driven slide generation with real themes, real typography, audio visualization, and export.' },
  { no: '04', name: 'Woltspace',   cat: 'AI Infrastructure · Web',   url: 'https://woltspace.com',
    desc: 'Persistent workspaces for AI agents with memory, identity, and autonomy that survive across sessions. Designing for non-human collaborators.' },
  { no: '05', name: 'Signal Desk', cat: 'Audio Tools · iOS',         url: 'https://signaldeskpro.com',
    desc: 'Professional mix reference for producers and engineers. 12 console modes, 8 calibrated meters, speaker simulation, and export.' },
  { no: '06', name: 'Decathlon',   cat: 'E-Commerce · Web & App',    url: 'https://www.decathlon.ca/en',
    desc: 'Large-scale retail UX for one of the world\'s biggest sports brands. Accessible gear discovery across 15+ sport categories for millions of recreational athletes.' },
  { no: '07', name: 'Hololabs',    cat: 'Spatial Computing · AR/VR', url: 'https://hololabs.org/',
    desc: 'Immersive experience design for entertainment venues and theme parks. UX that lives beyond the screen - spatial, embodied, and physical-first.' },
  { no: '08', name: 'Bandsintown', cat: 'Music Tech · Web',          url: 'https://www.artist.bandsintown.com/',
    desc: 'Tour promotion and fan engagement for 700,000+ artists. Streamlining complex multi-platform logistics - ticketing, fan outreach, tour dates - into a single coherent workflow.' },
  { no: '09', name: 'Flashtract',  cat: 'Construction Tech · Web',   url: 'https://flashtract.com/',
    desc: 'Billing and payment automation for the construction industry. Designing for highly regulated, multi-party financial workflows where the stakes are compliance, not convenience.' },
  { no: '10', name: 'Estateably',  cat: 'LegalTech · Web',           url: 'https://www.estateably.com/',
    desc: 'Estate and trust administration for attorneys and CPAs. 3,000+ jurisdiction-specific forms, fiduciary accounting, and compliance - designed for specialists in high-stakes legal work.' },
];

const SERVICES = [
  { no: 'I',   name: 'Sprint',   sub: '2 - 4 weeks',
    desc: 'A focused engagement for one specific problem. A design audit, a feature fully specced, or a prototype ready for testing.',
    ideal: 'Teams that need to move fast on a precise decision.' },
  { no: 'II',  name: 'Embedded', sub: 'Ongoing',
    desc: 'Senior design leadership embedded in how your team builds. Strategy, execution, and the perspective no one else will offer.',
    ideal: 'Funded teams who need design leadership at the right level of involvement.' },
  { no: 'III', name: 'Advisory', sub: 'Monthly',
    desc: 'A trusted outside perspective. Product reviews, uncomfortable questions, and senior counsel from someone who has shipped AI products end-to-end.',
    ideal: 'Founders who need a voice they are not getting from inside the company.' },
];

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.06) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Thin rule ────────────────────────────────────────────────────────────────
function Rule({ color, opacity = 1 }: { color: string; opacity?: number }) {
  return <div style={{ height: '1px', background: color, opacity, width: '100%' }} />;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function LuxuryPage() {
  const { colorScheme, toggleColorScheme } = useTheme();
  const dark = colorScheme === 'dark';
  const p = usePalette(dark);

  const display = "'Bodoni Moda', 'Playfair Display', Georgia, serif";
  const sans    = "'DM Sans', system-ui, sans-serif";
  const mono    = "'DM Mono', 'IBM Plex Mono', monospace";

  const parallaxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ background: p.pageBg, color: p.text, fontFamily: sans, minHeight: '100vh' }}>
      <style>{`
        .lx-nav-link { color: ${p.textMuted}; text-decoration: none; font-family: ${mono}; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; transition: color 0.2s; }
        .lx-nav-link:hover { color: ${p.text}; }
        .lx-proj-row:hover .lx-proj-name { color: ${p.gold}; }
        .lx-proj-name { transition: color 0.25s; }
        .lx-svc-col:not(:last-child) { border-right: 1px solid ${p.border}; }
        @media (max-width: 768px) {
          .lx-hero-panel { display: none !important; }
          .lx-hero-title { font-size: 22vw !important; }
          .lx-svc-grid { flex-direction: column !important; }
          .lx-svc-col { border-right: none !important; border-bottom: 1px solid ${p.border}; }
          .lx-about-cols { flex-direction: column !important; }
          .lx-contact-inner { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      {/* ── Theme / meta bar ──────────────────────────────────────────────────── */}
      <div style={{ background: dark ? '#080706' : p.pageBg2, borderBottom: `1px solid ${p.border}`, padding: '5px 32px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: mono, fontSize: '8px', color: p.textFaint, letterSpacing: '0.35em', flexShrink: 0 }}>THEME</span>
        <ThemeTabBar />
        <button onClick={toggleColorScheme} style={{ marginLeft: 'auto', background: 'transparent', border: `1px solid ${p.borderMid}`, color: p.textMuted, fontFamily: mono, fontSize: '8px', letterSpacing: '0.25em', padding: '4px 12px', cursor: 'pointer', flexShrink: 0 }}>
          {dark ? '○ LIGHT' : '● DARK'}
        </button>
      </div>

      {/* ── Nav ───────────────────────────────────────────────────────────────── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 40, background: p.navBg, backdropFilter: 'blur(16px)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', height: '60px', gap: '40px' }}>
          <span style={{ fontFamily: display, fontStyle: 'italic', fontWeight: 400, fontSize: '18px', letterSpacing: '0.04em', color: p.text, marginRight: 'auto' }}>
            Mike Jerugim
          </span>
          {[['Work','work'],['About','about'],['Ways of working','services'],['Contact','contact']].map(([label, id]) => (
            <a key={id} href={`#lx-${id}`} className="lx-nav-link">{label}</a>
          ))}
          <a href="mailto:mike@flat7.design" style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.25em', color: p.text, textDecoration: 'none', border: `1px solid ${p.borderMid}`, padding: '7px 18px', borderRadius: '999px', transition: 'background 0.2s' }}>
            LET'S TALK
          </a>
        </div>
        <Rule color={p.border} />
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: 'calc(100vh - 91px)', minHeight: '480px', maxHeight: '780px', overflow: 'hidden' }}>
        {/* Background image */}
        <div ref={parallaxRef} style={{ position: 'absolute', top: '-15%', bottom: '-15%', left: 0, right: 0, backgroundImage: "url('/unsplash5.jpg')", backgroundSize: 'cover', backgroundPosition: 'center 30%', willChange: 'transform' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(12,11,9,0.55) 0%, rgba(12,11,9,0.15) 60%, rgba(12,11,9,0.6) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,11,9,0.38)' }} />

        {/* Massive display title */}
        <div style={{ position: 'absolute', bottom: '-0.12em', left: 0, right: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <h1 className="lx-hero-title" style={{ fontFamily: display, fontWeight: 400, fontStyle: 'italic', fontSize: '18vw', lineHeight: 1, letterSpacing: '-0.02em', color: 'rgba(237,232,224,0.92)', margin: 0, padding: '0 32px', whiteSpace: 'nowrap' }}>
            FLAT7<span style={{ fontSize: '0.22em', letterSpacing: '0.01em', verticalAlign: 'baseline', color: 'rgba(237,232,224,0.6)', marginLeft: '0.12em' }}>.design</span>
          </h1>
        </div>

        {/* Info panel — bottom right */}
        <div className="lx-hero-panel" style={{ position: 'absolute', bottom: '80px', right: '64px', maxWidth: '300px', textAlign: 'left' }}>
          <h2 style={{ fontFamily: display, fontWeight: 400, fontSize: '1.55rem', lineHeight: 1.25, color: dark ? '#EDE8E0' : '#FAF7F2', marginBottom: '20px', letterSpacing: '0.01em' }}>
            Human craft<br />at machine speed.
          </h2>
          <Rule color={dark ? 'rgba(237,232,224,0.25)' : 'rgba(250,247,242,0.4)'} />
          <p style={{ fontFamily: sans, fontSize: '13px', color: dark ? 'rgba(237,232,224,0.65)' : 'rgba(250,247,242,0.8)', lineHeight: 1.7, margin: '16px 0 24px' }}>
            Mike Jerugim · Product Designer and Builder<br />working across AI, health, legal, and culture.
          </p>
          <a href="#lx-work" style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.3em', color: dark ? 'rgba(237,232,224,0.6)' : 'rgba(250,247,242,0.7)', textDecoration: 'none', textTransform: 'uppercase' }}>
            Scroll ↓
          </a>
        </div>
      </section>

      {/* ── Intro strip ───────────────────────────────────────────────────────── */}
      <div style={{ borderBottom: `1px solid ${p.border}` }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '40px 48px', display: 'flex', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }}>
          <p style={{ fontFamily: display, fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', color: p.text, flex: 1, minWidth: '260px', lineHeight: 1.35, margin: 0 }}>
            Making product design make sense in an increasingly AI world.
          </p>
          <p style={{ fontFamily: sans, fontSize: '14px', color: p.textMuted, flex: '0 0 340px', minWidth: '240px', lineHeight: 1.75, margin: 0 }}>
            Modern teams are shipping at a velocity that was previously unimaginable. I embed directly with cross-functional teams of builders to make sure design craft keeps pace.
          </p>
        </div>
      </div>

      {/* ── Work ──────────────────────────────────────────────────────────────── */}
      <section id="lx-work" style={{ maxWidth: '1300px', margin: '0 auto', padding: '96px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '32px', marginBottom: '64px' }}>
          <h2 style={{ fontFamily: display, fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: p.text, margin: 0 }}>Selected Work</h2>
          <div style={{ flex: 1, height: '1px', background: p.border }} />
          <span style={{ fontFamily: mono, fontSize: '8px', color: p.textFaint, letterSpacing: '0.3em' }}>{PROJECTS.length} PROJECTS</span>
        </div>

        <div>
          {PROJECTS.map((proj, i) => {
            const { ref, visible } = useReveal();
            return (
              <div key={proj.no} ref={ref} className="lx-proj-row" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(12px)', transition: 'opacity 0.7s ease, transform 0.7s ease', transitionDelay: `${(i % 4) * 50}ms` }}>
                <Rule color={p.border} />
                <div style={{ display: 'flex', gap: '48px', padding: '32px 0', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  {/* Number */}
                  <span style={{ fontFamily: mono, fontSize: '10px', color: p.gold, letterSpacing: '0.2em', flexShrink: 0, paddingTop: '6px', width: '32px' }}>{proj.no}</span>
                  {/* Name */}
                  <div style={{ flex: '0 0 280px', minWidth: '180px' }}>
                    <h3 className="lx-proj-name" style={{ fontFamily: display, fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: p.text, lineHeight: 1, margin: 0 }}>
                      {proj.url
                        ? <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{proj.name}<span style={{ fontSize: '0.4em', verticalAlign: 'super', color: p.gold, marginLeft: '4px' }}>↗</span></a>
                        : proj.name
                      }
                    </h3>
                  </div>
                  {/* Category + desc */}
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <p style={{ fontFamily: mono, fontSize: '8px', color: p.gold, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px' }}>{proj.cat}</p>
                    <p style={{ fontFamily: sans, fontSize: '14px', color: p.textMuted, lineHeight: 1.75, maxWidth: '520px', margin: 0 }}>{proj.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <Rule color={p.border} />
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────────── */}
      <section id="lx-about" style={{ background: p.pageBg2, borderTop: `1px solid ${p.border}`, borderBottom: `1px solid ${p.border}` }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '96px 48px' }}>
          <div className="lx-about-cols" style={{ display: 'flex', gap: '80px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Pull quote */}
            <div style={{ flex: '0 0 420px', minWidth: '260px' }}>
              <p style={{ fontFamily: mono, fontSize: '8px', color: p.gold, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '28px' }}>About</p>
              <blockquote style={{ fontFamily: display, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: p.text, lineHeight: 1.2, margin: '0 0 32px', padding: 0 }}>
                "I've been designing products since before 'AI' was the answer to every question."
              </blockquote>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '32px', height: '1px', background: p.gold }} />
                <span style={{ fontFamily: mono, fontSize: '8px', color: p.gold, letterSpacing: '0.25em' }}>MIKE JERUGIM</span>
              </div>
            </div>

            {/* Bio */}
            <div style={{ flex: 1, minWidth: '260px', paddingTop: '40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: sans, fontSize: '15px', color: p.textMuted, lineHeight: 1.8 }}>
                <p>My work lives at the intersection of AI capability and human judgment. I've designed health intelligence platforms, legal AI tools, agentic infrastructure, and mental wellness apps across three continents. Before that: film post-production, a record deal with Interscope, a web studio, and a decade of shipping products from seed to hypergrowth.</p>
                <p><strong><em>The AI space has a slop problem.</em></strong> Speed-to-market pressure pushes teams to accept whatever the model generates. I help teams move beyond that. Design isn't a layer you apply at the end - it's the difference between an output you settled for and <span style={{ color: p.text, fontStyle: 'italic' }}>one you sculpted.</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────────────── */}
      <section id="lx-services" style={{ borderBottom: `1px solid ${p.border}` }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '96px 48px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '32px', marginBottom: '64px' }}>
            <div style={{ flex: 1, height: '1px', background: p.border }} />
            <h2 style={{ fontFamily: display, fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: p.text, margin: 0 }}>Ways of working</h2>
            <div style={{ flex: 1, height: '1px', background: p.border }} />
          </div>

          <div className="lx-svc-grid" style={{ display: 'flex', gap: '0' }}>
            {SERVICES.map((svc) => {
              const { ref, visible } = useReveal();
              return (
                <div key={svc.name} ref={ref} className="lx-svc-col" style={{ flex: 1, padding: '0 48px', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
                  <p style={{ fontFamily: display, fontSize: '3.5rem', color: p.goldDim, lineHeight: 1, marginBottom: '20px', fontWeight: 400 }}>{svc.no}</p>
                  <p style={{ fontFamily: mono, fontSize: '8px', color: p.gold, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>{svc.sub}</p>
                  <h3 style={{ fontFamily: display, fontWeight: 400, fontSize: '2rem', color: p.text, lineHeight: 1, marginBottom: '20px' }}>{svc.name}</h3>
                  <p style={{ fontFamily: sans, fontSize: '13px', color: p.textMuted, lineHeight: 1.75, marginBottom: '20px' }}>{svc.desc}</p>
                  <Rule color={p.border} />
                  <p style={{ fontFamily: mono, fontSize: '8px', color: p.textFaint, letterSpacing: '0.15em', lineHeight: 1.6, marginTop: '16px' }}>
                    <span style={{ color: p.gold, opacity: 0.7 }}>Ideal — </span>{svc.ideal}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────────────── */}
      <section id="lx-contact" style={{ maxWidth: '1300px', margin: '0 auto', padding: '96px 48px' }}>
        <div className="lx-contact-inner" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '48px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontFamily: mono, fontSize: '8px', color: p.gold, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '24px' }}>Let's work</p>
            <h2 style={{ fontFamily: display, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(3rem, 8vw, 8rem)', lineHeight: 0.95, letterSpacing: '-0.02em', color: p.text, margin: 0 }}>
              Ready to move<br />
              beyond<br />
              <span style={{ color: p.gold }}>AI slop?</span>
            </h2>
          </div>
          <div style={{ textAlign: 'right', paddingBottom: '8px' }}>
            <a href="mailto:mike@flat7.design" style={{ fontFamily: display, fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: p.text, textDecoration: 'none', display: 'block', marginBottom: '8px', borderBottom: `1px solid ${p.gold}`, paddingBottom: '6px' }}>
              Let's talk
            </a>
            <p style={{ fontFamily: mono, fontSize: '8px', color: p.textFaint, letterSpacing: '0.25em', margin: 0, textTransform: 'uppercase' }}>US · Canada · EU</p>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${p.border}`, padding: '24px 48px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: display, fontStyle: 'italic', fontWeight: 400, fontSize: '15px', color: p.textMuted, letterSpacing: '0.03em' }}>flat7.design</span>
          <span style={{ fontFamily: mono, fontSize: '8px', color: p.textFaint, letterSpacing: '0.2em' }}>© {new Date().getFullYear()} MIKE JERUGIM</span>
          <a href="https://linkedin.com/in/mikejerugim/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: '8px', color: p.textMuted, letterSpacing: '0.2em', textDecoration: 'none', textTransform: 'uppercase' }}>LinkedIn ↗</a>
        </div>
      </footer>
    </div>
  );
}
