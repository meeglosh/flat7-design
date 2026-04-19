import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeTabBar } from '../../components/ThemeTabBar';

// ─── Palette ──────────────────────────────────────────────────────────────────
function usePalette(dark: boolean) {
  return dark ? {
    pageBg:    '#111111',
    pageBg2:   '#1A1A1A',
    text:      '#F5F0E8',
    textMuted: 'rgba(245,240,232,0.55)',
    textFaint: 'rgba(245,240,232,0.3)',
    red:       '#E63329',
    blue:      '#1B5FA8',
    yellow:    '#F5C800',
    teal:      '#00837A',
    black:     '#F5F0E8',
    border:    'rgba(245,240,232,0.12)',
    cardBg:    '#1A1A1A',
    navBg:     'rgba(17,17,17,0.96)',
  } : {
    pageBg:    '#F5F0E8',
    pageBg2:   '#EDE8DC',
    text:      '#111111',
    textMuted: 'rgba(17,17,17,0.55)',
    textFaint: 'rgba(17,17,17,0.3)',
    red:       '#E63329',
    blue:      '#1B5FA8',
    yellow:    '#F5C800',
    teal:      '#00837A',
    black:     '#111111',
    border:    'rgba(17,17,17,0.12)',
    cardBg:    '#EDE8DC',
    navBg:     'rgba(245,240,232,0.96)',
  };
}

const PROJECTS = [
  { no: '01', name: 'Onix',        cat: 'Health AI · iOS',         url: 'https://onix.life',                   color: 'teal',
    desc: 'Expert-trained AI health companions built on a privacy-first architecture. 16 renowned specialists encode their life\'s work, not public internet knowledge.' },
  { no: '02', name: 'Soluna',      cat: 'Mental Health AI · iOS',  url: 'https://solunaapp.com',               color: 'teal',
    desc: 'High-stakes UX where gentleness is a feature. Mental health support for young people, designed at the intersection of clinical rigor and human warmth.' },
  { no: '03', name: 'Wingman',     cat: 'Productivity AI · Web',   url: 'https://wingman.design', color: 'yellow',
    desc: 'From prompt to polished presentation. AI-driven slide generation with real themes, real typography, audio visualization, and export.' },
  { no: '04', name: 'Woltspace',   cat: 'AI Infrastructure · Web', url: 'https://woltspace.com',               color: 'red',
    desc: 'Persistent workspaces for AI agents with memory, identity, and autonomy that survive across sessions. Designing for non-human collaborators.' },
  { no: '06', name: 'Signal Desk', cat: 'Audio Tools · iOS',       url: 'https://signaldeskpro.com',           color: 'blue',
    desc: 'Professional mix reference for producers and engineers. 12 console modes, 8 calibrated meters, speaker simulation, and export.' },
  { no: '07', name: 'Decathlon',   cat: 'E-Commerce · Web & App',  url: 'https://www.decathlon.ca/en',         color: 'teal',
    desc: "Large-scale retail UX for one of the world's biggest sports brands. Accessible gear discovery across 15+ sport categories for millions of recreational athletes." },
  { no: '08', name: 'Hololabs',    cat: 'Spatial Computing · AR/VR', url: 'https://hololabs.org/',             color: 'red',
    desc: 'Immersive experience design for entertainment venues and theme parks. UX that lives beyond the screen  -  spatial, embodied, and physical-first.' },
  { no: '09', name: 'Bandsintown', cat: 'Music Tech · Web',         url: 'https://www.artist.bandsintown.com/', color: 'yellow',
    desc: 'Tour promotion and fan engagement for 700,000+ artists. Streamlining complex multi-platform logistics  -  ticketing, fan outreach, tour dates  -  into a single coherent workflow.' },
  { no: '10', name: 'Flashtract',  cat: 'Construction Tech · Web',  url: 'https://flashtract.com/',            color: 'blue',
    desc: 'Billing and payment automation for the construction industry. Designing for highly regulated, multi-party financial workflows where the stakes are compliance, not convenience.' },
  { no: '11', name: 'Estateably',  cat: 'LegalTech · Web',          url: 'https://www.estateably.com/',        color: 'teal',
    desc: 'Estate and trust administration for attorneys and CPAs. 3,000+ jurisdiction-specific forms, fiduciary accounting, and compliance  -  designed for specialists in high-stakes legal work.' },
];

const SERVICES = [
  { no: '01', name: 'Sprint',   sub: '2–4 weeks', color: 'red',
    desc: 'A fixed engagement for one focused problem. You leave with a design audit, a new feature fully specced, or a prototype ready for user testing.',
    ideal: 'Teams that need to move fast on a specific decision.' },
  { no: '02', name: 'Embedded', sub: 'Ongoing',   color: 'blue',
    desc: 'I join your team as a senior design partner. Strategy, execution, and the thing no one else will say out loud.',
    ideal: 'Funded teams building at speed who need senior design leadership embedded in how they build.' },
  { no: '03', name: 'Advisory', sub: 'Monthly',   color: 'teal',
    desc: 'A regular outside perspective. I review your product, your design decisions, and your team\'s output.',
    ideal: 'Founders who need a trusted senior perspective from outside the company.' },
];

// ─── Geometric circle cluster ─────────────────────────────────────────────────
function CircleCluster({ colors, size = 200, dark }: { colors: string[]; size?: number; dark: boolean }) {
  const r = size / 2;
  return (
    <svg width={size * 1.6} height={size * 1.4} viewBox={`0 0 ${size * 1.6} ${size * 1.4}`} style={{ overflow: 'visible', opacity: dark ? 0.7 : 0.55 }}>
      <circle cx={r * 0.7} cy={r * 0.7} r={r * 0.78} fill={colors[0]} />
      <circle cx={r * 1.6} cy={r * 0.6} r={r * 0.62} fill={colors[1]} />
      <circle cx={r * 1.1} cy={r * 1.5} r={r * 0.52} fill={colors[2]} />
    </svg>
  );
}

// ─── Thin horizontal rule ─────────────────────────────────────────────────────
function Rule({ color }: { color: string }) {
  return <div style={{ height: '2px', background: color, width: '100%' }} />;
}

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function BauhausPage() {
  const { colorScheme, toggleColorScheme } = useTheme();
  const dark = colorScheme === 'dark';
  const p = usePalette(dark);

  const display = "'Oswald', 'Plus Jakarta Sans', system-ui, sans-serif";
  const body    = "'Plus Jakarta Sans', system-ui, sans-serif";
  const mono    = "'IBM Plex Mono', monospace";

  const accent = (key: string) => {
    const map: Record<string, string> = { red: p.red, blue: p.blue, yellow: p.yellow, teal: p.teal };
    return map[key] ?? p.red;
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ background: p.pageBg, color: p.text, fontFamily: body, minHeight: '100vh' }}>
      <style>{`
        .bh-nav-link { color: ${p.textMuted}; text-decoration: none; font-family: ${display}; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; transition: color 0.15s; }
        .bh-nav-link:hover { color: ${p.text}; }
        .bh-proj-row:hover .bh-proj-name { opacity: 0.7; }
        @media (max-width: 768px) {
          .bh-hero-grid { flex-direction: column !important; }
          .bh-proj-inner { flex-direction: column !important; gap: 16px !important; }
          .bh-svc-grid { grid-template-columns: 1fr !important; }
          .bh-contact-split { flex-direction: column !important; }
          .bh-meta-bar { display: none !important; }
          .bh-nav-links { display: none !important; }
          .bh-hamburger { display: flex !important; }
          .bh-nav-link { font-size: 22px; letter-spacing: 0.08em; }
        }
        @media (min-width: 769px) { .bh-hamburger { display: none !important; } }
      `}</style>

      {/* ── Meta bar (desktop only) ───────────────────────────────────────────── */}
      <div className="bh-meta-bar" style={{ background: dark ? '#0A0A0A' : p.black, padding: '6px 24px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', ['--fg' as string]: '245 240 232' }}>
        <span style={{ fontFamily: mono, fontSize: '9px', color: 'rgba(245,240,232,0.4)', letterSpacing: '0.35em', flexShrink: 0 }}>THEME</span>
        <ThemeTabBar />
        <button onClick={toggleColorScheme} style={{ marginLeft: 'auto', background: 'transparent', border: '1px solid rgba(245,240,232,0.3)', color: 'rgba(245,240,232,0.6)', fontFamily: mono, fontSize: '9px', letterSpacing: '0.2em', padding: '4px 10px', cursor: 'pointer', flexShrink: 0 }}>
          {dark ? '☀ LIGHT' : '☾ DARK'}
        </button>
      </div>

      {/* ── Nav ───────────────────────────────────────────────────────────────── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 40, background: p.navBg, backdropFilter: 'blur(10px)', borderBottom: `2px solid ${p.text}` }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px 0 40px', display: 'flex', alignItems: 'center', height: '52px', gap: '32px' }}>
          <span style={{ fontFamily: display, fontWeight: 700, fontSize: '18px', letterSpacing: '0.06em', color: p.text, marginRight: 'auto' }}>
            FLAT7<span style={{ color: p.red }}>.</span>DESIGN
          </span>
          <div className="bh-nav-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {[['Work','work'],['About','about'],['Ways of working','services'],['Contact','contact']].map(([label, id]) => (
              <a key={id} href={`#bh-${id}`} className="bh-nav-link">{label}</a>
            ))}
          </div>
          <button className="bh-hamburger" onClick={() => setDrawerOpen(o => !o)} style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', gap: '5px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', marginLeft: 'auto' }}>
            <span style={{ display: 'block', width: '22px', height: '2px', background: drawerOpen ? p.red : p.text, transition: 'transform 0.2s', transform: drawerOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: p.red, opacity: drawerOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: drawerOpen ? p.red : p.text, transition: 'transform 0.2s', transform: drawerOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
        {drawerOpen && (
          <div style={{ borderTop: `2px solid ${p.text}`, padding: '24px 24px', background: p.navBg, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[['Work','work'],['About','about'],['Ways of working','services'],['Contact','contact']].map(([label, id]) => (
                <a key={id} href={`#bh-${id}`} className="bh-nav-link" onClick={() => setDrawerOpen(false)}>{label}</a>
              ))}
            </div>
            <div style={{ height: '2px', background: p.text, opacity: 0.15 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontFamily: mono, fontSize: '12px', color: p.textMuted, letterSpacing: '0.2em' }}>THEME</span>
              <ThemeTabBar wrap />
            </div>
            <button onClick={toggleColorScheme} style={{ alignSelf: 'flex-start', background: 'transparent', border: `1px solid ${p.text}`, color: p.text, fontFamily: mono, fontSize: '14px', letterSpacing: '0.1em', padding: '10px 20px', cursor: 'pointer' }}>
              {dark ? '☀ LIGHT MODE' : '☾ DARK MODE'}
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: '1140px', margin: '0 auto', padding: '72px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Big geometric decoration */}
        <div style={{ position: 'absolute', right: '-60px', top: '-40px', pointerEvents: 'none', zIndex: 0 }}>
          <CircleCluster colors={[p.teal, p.red, p.yellow]} size={260} dark={dark} />
        </div>

        <div className="bh-hero-grid" style={{ display: 'flex', gap: '0', alignItems: 'flex-end', position: 'relative', zIndex: 1 }}>
          <div style={{ flex: 1 }}>
            {/* Catalog label */}
            <div style={{ display: 'inline-block', background: p.red, padding: '4px 12px', marginBottom: '32px' }}>
              <span style={{ fontFamily: mono, fontSize: '9px', color: '#fff', letterSpacing: '0.3em' }}>MIKE JERUGIM · AI PRODUCT DESIGN</span>
            </div>

            <h1 style={{ fontFamily: display, fontWeight: 700, fontSize: 'clamp(4rem, 9vw, 10rem)', lineHeight: 0.92, letterSpacing: '-0.01em', textTransform: 'uppercase', color: p.text, marginBottom: '36px' }}>
              Human<br />
              <span style={{ color: p.blue }}>Craft</span><br />
              at Machine<br />
              <span style={{ WebkitTextStroke: `2px ${p.text}`, color: 'transparent' }}>Speed.</span>
            </h1>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ width: '40px', height: '3px', background: p.red }} />
              <p style={{ fontFamily: body, fontSize: '15px', color: p.textMuted, lineHeight: 1.7, maxWidth: '460px' }}>
                Modern teams are shipping at a velocity that was previously unimaginable. I embed directly with cross-functional teams of builders to make sure design craft keeps pace.
              </p>
            </div>

            <a href="#bh-work" style={{ display: 'inline-block', marginTop: '40px', fontFamily: display, fontWeight: 700, fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: p.pageBg, background: p.text, padding: '14px 32px', textDecoration: 'none' }}>
              View Work ↓
            </a>
          </div>
        </div>

        {/* Color stripe bar */}
        <div style={{ display: 'flex', height: '6px', marginTop: '64px', gap: '2px' }}>
          {[p.red, p.blue, p.yellow, p.teal, p.text].map((c, i) => (
            <div key={i} style={{ flex: i < 4 ? 1 : 0.4, background: c }} />
          ))}
        </div>
      </section>

      {/* ── Work ──────────────────────────────────────────────────────────────── */}
      <section id="bh-work" style={{ background: p.pageBg2, padding: '80px 40px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '56px' }}>
            <div style={{ background: p.blue, width: '6px', height: '40px', flexShrink: 0 }} />
            <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '0.04em', textTransform: 'uppercase', color: p.text, margin: 0 }}>Selected Work</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {PROJECTS.map((proj, i) => {
              const { ref, visible } = useReveal();
              const col = accent(proj.color);
              return (
                <div key={proj.no} ref={ref} className="bh-proj-row" style={{ borderTop: `2px solid ${p.border}`, padding: '28px 0', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(12px)', transition: 'opacity 0.6s ease, transform 0.6s ease', transitionDelay: `${(i % 3) * 60}ms` }}>
                  <div className="bh-proj-inner" style={{ display: 'flex', alignItems: 'flex-start', gap: '40px' }}>
                    {/* No. badge */}
                    <div style={{ flexShrink: 0, width: '56px' }}>
                      <div style={{ background: col, display: 'inline-block', padding: '2px 6px' }}>
                        <span style={{ fontFamily: mono, fontSize: '9px', color: '#fff', letterSpacing: '0.15em' }}>No.{proj.no}</span>
                      </div>
                    </div>
                    {/* Content */}
                    <div style={{ flex: 1, minWidth: '240px' }}>
                      <p style={{ fontFamily: mono, fontSize: '9px', color: col, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>{proj.cat}</p>
                      <h3 className="bh-proj-name" style={{ fontFamily: display, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3.5rem)', textTransform: 'uppercase', letterSpacing: '0.02em', color: p.text, lineHeight: 1, marginBottom: '12px', transition: 'opacity 0.2s' }}>
                        {proj.url
                          ? <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{proj.name} <span style={{ fontSize: '0.4em', color: col, verticalAlign: 'super' }}>↗</span></a>
                          : proj.name
                        }
                      </h3>
                      <p style={{ fontFamily: body, fontSize: '14px', color: p.textMuted, lineHeight: 1.7, maxWidth: '560px' }}>{proj.desc}</p>
                    </div>
                    {/* Geometric accent */}
                    <div style={{ flexShrink: 0, position: 'relative', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: col, opacity: 0.15 }} />
                      <div style={{ position: 'absolute', width: '36px', height: '36px', border: `2px solid ${col}`, borderRadius: '50%', opacity: 0.4 }} />
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{ borderTop: `2px solid ${p.border}` }} />
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────────── */}
      <section id="bh-about" style={{ padding: '80px 40px', position: 'relative', overflow: 'hidden' }}>
        {/* Background geometry */}
        <div style={{ position: 'absolute', left: '-80px', bottom: '-60px', pointerEvents: 'none', zIndex: 0, opacity: dark ? 0.18 : 0.1 }}>
          <svg width="400" height="400" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="180" fill="none" stroke={p.teal} strokeWidth="3" />
            <circle cx="200" cy="200" r="130" fill="none" stroke={p.blue} strokeWidth="2" />
            <circle cx="200" cy="200" r="80" fill={p.yellow} />
          </svg>
        </div>

        <div style={{ maxWidth: '1140px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Rule color={p.text} />
          <div style={{ padding: '64px 0', display: 'flex', gap: '80px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* Left */}
            <div style={{ flex: '0 0 380px', minWidth: '260px' }}>
              <div style={{ background: p.teal, display: 'inline-block', padding: '4px 12px', marginBottom: '28px' }}>
                <span style={{ fontFamily: mono, fontSize: '9px', color: '#fff', letterSpacing: '0.3em' }}>ABOUT</span>
              </div>
              <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1, color: p.text, marginBottom: '0' }}>
                I've been<br />
                designing<br />
                <span style={{ color: p.red }}>before</span><br />
                AI was the<br />
                answer.
              </h2>
            </div>
            {/* Right */}
            <div style={{ flex: 1, minWidth: '260px', paddingTop: '60px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: body, fontSize: '15px', color: p.textMuted, lineHeight: 1.75 }}>
                <p>My work lives at the intersection of AI capability and human judgment. I've designed health intelligence platforms, legal AI tools, agentic infrastructure, and mental wellness apps across three continents. Before that: film post-production, a record deal with Interscope, a web studio, and a decade of shipping products from seed to hypergrowth.</p>
                <p><strong><em>The AI space has a slop problem.</em></strong> Speed-to-market pressure pushes teams to accept whatever the model generates. I help teams move beyond that. Design isn't a layer you apply at the end  -  it's the difference between an output you settled for and <span style={{ color: p.text, fontWeight: 600 }}>one you sculpted.</span></p>
              </div>
              <div style={{ marginTop: '40px', display: 'flex', gap: '3px' }}>
                {[p.red, p.blue, p.yellow, p.teal].map((c, i) => (
                  <div key={i} style={{ width: '24px', height: '24px', borderRadius: '50%', background: c }} />
                ))}
              </div>
            </div>
          </div>
          <Rule color={p.text} />
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────────────── */}
      <section id="bh-services" style={{ background: p.pageBg2, padding: '80px 40px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '56px' }}>
            <div style={{ background: p.yellow, width: '6px', height: '40px', flexShrink: 0 }} />
            <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '0.04em', textTransform: 'uppercase', color: p.text, margin: 0 }}>Ways of working</h2>
          </div>

          <div className="bh-svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px' }}>
            {SERVICES.map((svc) => {
              const { ref, visible } = useReveal();
              const col = accent(svc.color);
              return (
                <div key={svc.no} ref={ref} style={{ background: p.pageBg, padding: '40px 32px', borderTop: `6px solid ${col}`, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
                  {/* No. + circle */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div style={{ background: col, display: 'inline-block', padding: '2px 8px' }}>
                      <span style={{ fontFamily: mono, fontSize: '9px', color: '#fff', letterSpacing: '0.15em' }}>No.{svc.no}</span>
                    </div>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: col, opacity: 0.18 }} />
                  </div>
                  <div style={{ fontFamily: mono, fontSize: '9px', color: col, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '10px' }}>{svc.sub}</div>
                  <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: '2.4rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: p.text, lineHeight: 1, marginBottom: '16px' }}>{svc.name}</h3>
                  <p style={{ fontFamily: body, fontSize: '13px', color: p.textMuted, lineHeight: 1.7, marginBottom: '16px' }}>{svc.desc}</p>
                  <p style={{ fontFamily: mono, fontSize: '9px', color: p.textFaint, lineHeight: 1.6 }}>
                    <span style={{ opacity: 0.6 }}>Ideal for · </span>{svc.ideal}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────────────── */}
      <section id="bh-contact" style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <Rule color={p.text} />
          <div className="bh-contact-split" style={{ padding: '64px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ background: p.red, display: 'inline-block', padding: '4px 12px', marginBottom: '28px' }}>
                <span style={{ fontFamily: mono, fontSize: '9px', color: '#fff', letterSpacing: '0.3em' }}>LET'S WORK</span>
              </div>
              <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 'clamp(3rem, 8vw, 8rem)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.9, color: p.text }}>
                Ready to<br />
                Move Beyond<br />
                <span style={{ color: p.red }}>AI Slop?</span>
              </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <a href="mailto:mike@flat7.design" style={{ fontFamily: display, fontWeight: 700, fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', letterSpacing: '0.04em', textTransform: 'uppercase', color: p.text, textDecoration: 'none', borderBottom: `3px solid ${p.red}`, paddingBottom: '6px', display: 'block', marginBottom: '16px' }}>
                Let's talk
              </a>
              <p style={{ fontFamily: mono, fontSize: '9px', color: p.textFaint, letterSpacing: '0.25em', textTransform: 'uppercase' }}>US · Canada · EU</p>
              {/* Circle decoration */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '28px' }}>
                {[p.red, p.blue, p.yellow, p.teal].map((c, i) => (
                  <div key={i} style={{ width: `${20 + i * 8}px`, height: `${20 + i * 8}px`, borderRadius: '50%', border: `2px solid ${c}`, opacity: 0.5 }} />
                ))}
              </div>
            </div>
          </div>
          <Rule color={p.text} />
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer style={{ background: p.text, padding: '20px 40px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: display, fontWeight: 700, fontSize: '14px', letterSpacing: '0.12em', color: p.pageBg }}>FLAT7.DESIGN</span>
          <span style={{ fontFamily: mono, fontSize: '9px', color: dark ? 'rgba(17,17,17,0.5)' : 'rgba(245,240,232,0.5)', letterSpacing: '0.2em' }}>© {new Date().getFullYear()} MIKE JERUGIM</span>
          <a href="https://linkedin.com/in/mikejerugim/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: '9px', color: dark ? 'rgba(17,17,17,0.7)' : 'rgba(245,240,232,0.7)', letterSpacing: '0.2em', textDecoration: 'none' }}>LINKEDIN ↗</a>
        </div>
      </footer>
    </div>
  );
}
