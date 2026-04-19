import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeTabBar } from '../../components/ThemeTabBar';

// ─── Palette ──────────────────────────────────────────────────────────────────
function usePalette(dark: boolean) {
  return dark ? {
    pageBg:    '#0E0630',
    pageBg2:   '#130850',
    cardBg:    '#1A0F58',
    text:      '#FFF8E6',
    textMuted: 'rgba(255,248,230,0.65)',
    textFaint: 'rgba(255,248,230,0.38)',
    orange:    '#FF7A1A',
    lavender:  '#AA66FF',
    mint:      '#22D470',
    yellow:    '#FFD60A',
    coral:     '#FF3355',
    sky:       '#2299FF',
    border:    'rgba(255,248,230,0.1)',
    borderCard:'rgba(255,248,230,0.15)',
    navBg:     'rgba(14,6,48,0.95)',
    shadow:    '0 4px 32px rgba(0,0,0,0.5)',
    shadowSm:  '0 2px 16px rgba(0,0,0,0.35)',
  } : {
    pageBg:    '#FFFBEE',
    pageBg2:   '#FFF3CC',
    cardBg:    '#FFFFFF',
    text:      '#0A0814',
    textMuted: 'rgba(10,8,20,0.62)',
    textFaint: 'rgba(10,8,20,0.38)',
    orange:    '#F06500',
    lavender:  '#7B2FBE',
    mint:      '#1DAF5E',
    yellow:    '#D9920A',
    coral:     '#CC2040',
    sky:       '#0066CC',
    border:    'rgba(10,8,20,0.08)',
    borderCard:'rgba(10,8,20,0.12)',
    navBg:     'rgba(255,251,238,0.95)',
    shadow:    '0 4px 32px rgba(240,101,0,0.1)',
    shadowSm:  '0 2px 16px rgba(240,101,0,0.07)',
  };
}

// Vivid solid card backgrounds
const VIVID: Record<string, { bg: string; text: string }> = {
  mint:     { bg: '#1DAF5E', text: '#fff' },
  yellow:   { bg: '#FFD60A', text: '#0A0814' },
  lavender: { bg: '#7B2FBE', text: '#fff' },
  coral:    { bg: '#CC2040', text: '#fff' },
  magenta:  { bg: '#F06500', text: '#fff' },
  sky:      { bg: '#0066CC', text: '#fff' },
};

const PROJECTS = [
  { no: '01', name: 'Onix',        cat: 'Health AI · iOS',         url: 'https://onix.life',                   pastel: 'mint',   size: 'big',
    desc: 'Expert-trained AI health companions. 16 renowned specialists encode their life\'s work  -  not public internet knowledge.' },
  { no: '02', name: 'Soluna',      cat: 'Mental Health AI · iOS',  url: 'https://solunaapp.com',               pastel: 'coral',  size: 'small',
    desc: 'Mental health support for young people. Gentleness is a feature, not an afterthought.' },
  { no: '03', name: 'Wingman',     cat: 'Productivity AI · Web',   url: 'https://wingman.design',              pastel: 'yellow', size: 'small',
    desc: 'From prompt to polished presentation. AI-driven slides with real themes and real typography.' },
  { no: '04', name: 'Woltspace',   cat: 'AI Infrastructure',       url: 'https://woltspace.com',               pastel: 'lavender', size: 'medium',
    desc: 'Persistent workspaces for AI agents with memory, identity, and autonomy across sessions.' },
  { no: '06', name: 'Signal Desk', cat: 'Audio Tools · iOS',       url: 'https://signaldeskpro.com',           pastel: 'magenta', size: 'small',
    desc: '12 console modes, 8 calibrated meters, speaker simulation. Mix reference done right.' },
  { no: '07', name: 'Decathlon',   cat: 'E-Commerce · Web & App',  url: 'https://www.decathlon.ca/en',         pastel: 'sky',     size: 'small',
    desc: "Large-scale retail UX for one of the world's biggest sports brands. Accessible gear discovery across 15+ sport categories." },
  { no: '08', name: 'Hololabs',    cat: 'Spatial Computing · AR/VR', url: 'https://hololabs.org/',             pastel: 'coral',   size: 'small',
    desc: 'Immersive experience design for entertainment venues and theme parks. UX beyond the screen  -  spatial and embodied.' },
  { no: '09', name: 'Bandsintown', cat: 'Music Tech · Web',         url: 'https://www.artist.bandsintown.com/', pastel: 'mint',   size: 'medium',
    desc: 'Tour promotion and fan engagement for 700,000+ artists. Complex multi-platform logistics made into a single coherent workflow.' },
  { no: '10', name: 'Flashtract',  cat: 'Construction Tech · Web',  url: 'https://flashtract.com/',            pastel: 'yellow',  size: 'small',
    desc: 'Billing and payment automation for construction. Designing for regulated, multi-party financial workflows where stakes are compliance.' },
  { no: '11', name: 'Estateably',  cat: 'LegalTech · Web',          url: 'https://www.estateably.com/',        pastel: 'lavender', size: 'small',
    desc: 'Estate and trust administration for attorneys and CPAs. 3,000+ jurisdiction-specific forms and fiduciary accounting.' },
];

const SERVICES = [
  { name: 'Sprint',   sub: '2–4 weeks', pastel: 'coral',
    desc: 'A fixed engagement for one focused problem  -  audit, spec, or prototype. For teams that need to move fast on a specific decision.',
    tag: 'move fast' },
  { name: 'Embedded', sub: 'Ongoing',   pastel: 'lavender',
    desc: 'I join your team as a senior design partner. Strategy, execution, and the thing no one else will say out loud.',
    tag: 'long haul' },
  { name: 'Advisory', sub: 'Monthly',   pastel: 'mint',
    desc: 'Regular outside perspective. I review your product and ask the uncomfortable questions.',
    tag: 'check-in' },
];

const SKILLS = ['AI Product Design', 'UX Strategy', 'Design Systems', 'Prototyping', 'User Research', 'Design Leadership', 'iOS / Mobile', 'Web Apps', 'B2B SaaS'];

// ─── Pill ─────────────────────────────────────────────────────────────────────
function Pill({ label, bg, fg, size = 'sm' }: { label: string; bg: string; fg: string; size?: 'sm' | 'md' }) {
  return (
    <span style={{
      display: 'inline-block',
      background: bg,
      color: fg,
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      fontWeight: 600,
      fontSize: size === 'sm' ? '11px' : '13px',
      letterSpacing: '0.01em',
      padding: size === 'sm' ? '4px 12px' : '7px 16px',
      borderRadius: '999px',
      lineHeight: 1.4,
    }}>
      {label}
    </span>
  );
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
export function GenZPage() {
  const { colorScheme, toggleColorScheme } = useTheme();
  const dark = colorScheme === 'dark';
  const p = usePalette(dark);

  const font    = "'Plus Jakarta Sans', system-ui, sans-serif";
  const display = "'Syne', system-ui, sans-serif";
  const mono    = "'IBM Plex Mono', monospace";

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ background: p.pageBg, color: p.text, fontFamily: font, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* ── Animated gradient blobs ───────────────────────────────────────────── */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="gz-blob gz-blob-1" />
        <div className="gz-blob gz-blob-2" />
        <div className="gz-blob gz-blob-3" />
        <div className="gz-blob gz-blob-4" />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>

      <style>{`
        @keyframes gz-drift-1 {
          0%   { transform: translate(0,    0)    scale(1);    }
          33%  { transform: translate(120px, -80px) scale(1.15); }
          66%  { transform: translate(-60px, 100px) scale(0.9); }
          100% { transform: translate(0,    0)    scale(1);    }
        }
        @keyframes gz-drift-2 {
          0%   { transform: translate(0,    0)    scale(1);    }
          33%  { transform: translate(-140px, 60px)  scale(1.2);  }
          66%  { transform: translate(80px,  -120px) scale(0.85); }
          100% { transform: translate(0,    0)    scale(1);    }
        }
        @keyframes gz-drift-3 {
          0%   { transform: translate(0,    0)    scale(1);    }
          50%  { transform: translate(100px, 140px) scale(1.25); }
          100% { transform: translate(0,    0)    scale(1);    }
        }
        @keyframes gz-drift-4 {
          0%   { transform: translate(0,    0)    scale(1);    }
          40%  { transform: translate(-90px, -110px) scale(1.1); }
          80%  { transform: translate(60px,  60px)  scale(0.9); }
          100% { transform: translate(0,    0)    scale(1);    }
        }
        .gz-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
        }
        .gz-blob-1 {
          width: 600px; height: 600px;
          top: -100px; left: -150px;
          background: ${dark ? 'rgba(255,122,26,0.35)' : 'rgba(240,101,0,0.2)'};
          animation: gz-drift-1 18s ease-in-out infinite;
        }
        .gz-blob-2 {
          width: 700px; height: 700px;
          top: 30%; right: -200px;
          background: ${dark ? 'rgba(123,47,190,0.45)' : 'rgba(123,47,190,0.18)'};
          animation: gz-drift-2 22s ease-in-out infinite;
        }
        .gz-blob-3 {
          width: 500px; height: 500px;
          bottom: 10%; left: 20%;
          background: ${dark ? 'rgba(29,175,94,0.35)' : 'rgba(29,175,94,0.15)'};
          animation: gz-drift-3 26s ease-in-out infinite;
        }
        .gz-blob-4 {
          width: 450px; height: 450px;
          top: 55%; right: 10%;
          background: ${dark ? 'rgba(255,211,10,0.25)' : 'rgba(217,146,10,0.12)'};
          animation: gz-drift-4 20s ease-in-out infinite;
        }
        .gz-nav-link { color: ${p.textMuted}; text-decoration: none; font-family: ${font}; font-size: 13px; font-weight: 600; transition: color 0.15s; }
        .gz-nav-link:hover { color: ${p.text}; }
        .gz-proj-card { transition: transform 0.22s ease, box-shadow 0.22s ease; cursor: pointer; }
        .gz-proj-card:hover { transform: translateY(-4px) rotate(-0.5deg); box-shadow: 0 16px 40px rgba(0,0,0,0.25) !important; }
        .gz-svc-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .gz-svc-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.2) !important; }
        .gz-cta-btn { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .gz-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(240,101,0,0.4) !important; }
        .gz-grad-hero { background: linear-gradient(120deg, ${p.orange} 0%, ${dark ? '#FFD60A' : '#CC2040'} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        @keyframes gz-shimmer { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .gz-grad-contact { background: linear-gradient(120deg, #ffffff, #FFE87A, #ffffff, #FFD60A, #ffffff); background-size: 300% 300%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: gz-shimmer 3s ease infinite; }
        @media (max-width: 768px) {
          .gz-hero-inner { flex-direction: column !important; }
          .gz-bento { grid-template-columns: 1fr !important; }
          .gz-svc-grid { grid-template-columns: 1fr !important; }
          .gz-about-cols { flex-direction: column !important; }
          .gz-meta-bar { display: none !important; }
          .gz-nav-links { display: none !important; }
          .gz-hamburger { display: flex !important; }
          .gz-nav-link { font-size: 26px; }
        }
        @media (min-width: 769px) { .gz-hamburger { display: none !important; } }
      `}</style>

      {/* ── Meta bar ─────────────────────────────────────────────────────────── */}
      <div className="gz-meta-bar" style={{ background: `linear-gradient(90deg, ${p.orange}, ${dark ? '#FFD60A' : '#CC2040'})`, padding: '6px 24px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: mono, fontSize: '9px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.3em', flexShrink: 0 }}>THEME</span>
        <ThemeTabBar />
        <button onClick={toggleColorScheme} style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontFamily: mono, fontSize: '9px', letterSpacing: '0.2em', padding: '5px 12px', borderRadius: '999px', cursor: 'pointer', flexShrink: 0 }}>
          {dark ? '☀ light' : '☾ dark'}
        </button>
      </div>

      {/* ── Nav ──────────────────────────────────────────────────────────────── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 40, background: p.navBg, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${p.border}` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px 0 32px', display: 'flex', alignItems: 'center', height: '56px', gap: '28px' }}>
          <span style={{ fontFamily: display, fontWeight: 800, fontSize: '16px', color: p.text, marginRight: 'auto', letterSpacing: '-0.01em' }}>
            Mike Jerugim
          </span>
          <div className="gz-nav-links" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            {[['Work','work'],['About','about'],['Ways of working','services'],['Contact','contact']].map(([label, id]) => (
              <a key={id} href={`#gz-${id}`} className="gz-nav-link">{label}</a>
            ))}
          </div>
          <button className="gz-hamburger" onClick={() => setDrawerOpen(o => !o)} style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', gap: '5px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', marginLeft: 'auto' }}>
            <span style={{ display: 'block', width: '22px', height: '2px', background: drawerOpen ? p.orange : p.text, borderRadius: '2px', transition: 'transform 0.2s', transform: drawerOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: p.orange, borderRadius: '2px', opacity: drawerOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: drawerOpen ? p.orange : p.text, borderRadius: '2px', transition: 'transform 0.2s', transform: drawerOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
        {drawerOpen && (
          <div style={{ borderTop: `1px solid ${p.border}`, padding: '24px 32px', background: p.navBg, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[['Work','work'],['About','about'],['Ways of working','services'],['Contact','contact']].map(([label, id]) => (
                <a key={id} href={`#gz-${id}`} className="gz-nav-link" onClick={() => setDrawerOpen(false)}>{label}</a>
              ))}
            </div>
            <div style={{ height: '1px', background: p.border }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontFamily: mono, fontSize: '12px', color: p.textFaint, letterSpacing: '0.3em' }}>THEME</span>
              <ThemeTabBar wrap />
            </div>
            <button onClick={toggleColorScheme} style={{ alignSelf: 'flex-start', background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)', border: 'none', color: p.textMuted, fontFamily: mono, fontSize: '14px', letterSpacing: '0.15em', padding: '10px 20px', borderRadius: '999px', cursor: 'pointer' }}>
              {dark ? '☀ light mode' : '☾ dark mode'}
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 32px 56px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Pill label="✦ Product Designer and Builder · Available" bg={dark ? 'rgba(255,122,26,0.2)' : 'rgba(240,101,0,0.1)'} fg={p.orange} size="md" />
        </div>

        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', top: '-12px', right: '0', fontFamily: display, fontSize: '3rem', color: p.orange, opacity: 0.5, userSelect: 'none' }}>✦</span>
          <h1 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(2rem, 4.5vw, 4rem)', lineHeight: 1.0, letterSpacing: '-0.02em', color: p.text, marginBottom: '28px', maxWidth: '820px' }}>
            Making product design make sense in an{' '}
            <span className="gz-grad-hero">AI world.</span>
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '48px' }}>
          <p style={{ fontFamily: font, fontSize: '16px', color: p.textMuted, lineHeight: 1.7, maxWidth: '480px', flex: 1, minWidth: '260px' }}>
            Modern teams are shipping at a previously unimaginable velocity. I embed directly with cross-functional teams of builders to make sure design craft keeps pace.
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#gz-work" className="gz-cta-btn" style={{ display: 'inline-block', background: p.orange, color: '#fff', fontFamily: display, fontWeight: 800, fontSize: '14px', padding: '14px 28px', borderRadius: '999px', textDecoration: 'none', boxShadow: `0 4px 16px rgba(240,101,0,0.3)` }}>
              See my work ↓
            </a>
            <a href="mailto:mike@flat7.design" style={{ display: 'inline-block', background: 'transparent', color: p.text, fontFamily: font, fontWeight: 600, fontSize: '14px', padding: '14px 28px', borderRadius: '999px', textDecoration: 'none', border: `1.5px solid ${p.borderCard}` }}>
              Get in touch
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { label: 'AI-native',           color: p.orange },
            { label: 'UX strategy',         color: p.lavender },
            { label: 'Design systems',      color: p.mint },
            { label: 'Shipped products',    color: p.sky },
            { label: 'Seed to hypergrowth', color: p.coral },
          ].map(({ label, color }) => (
            <Pill key={label} label={label}
              bg={dark ? `${color}26` : `${color}18`}
              fg={color} />
          ))}
        </div>
      </section>

      {/* ── Work ─────────────────────────────────────────────────────────────── */}
      <section id="gz-work" style={{ padding: '0 32px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', letterSpacing: '-0.02em', color: p.text, margin: 0 }}>Selected work</h2>
          <span style={{ color: p.orange, fontSize: '1.4rem' }}>✦</span>
          <span style={{ fontFamily: mono, fontSize: '10px', color: p.textFaint, letterSpacing: '0.15em' }}>10 projects</span>
        </div>

        <div className="gz-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', gridAutoRows: 'auto' }}>
          {PROJECTS.map((proj, i) => {
            const { ref, visible } = useReveal();
            const vivid = VIVID[proj.pastel] ?? VIVID['mint'];
            return (
              <div
                key={proj.no}
                ref={ref}
                className="gz-proj-card"
                style={{
                  background: vivid.bg,
                  borderRadius: '20px',
                  border: 'none',
                  padding: '28px',
                  boxShadow: p.shadowSm,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                  transitionDelay: `${(i % 3) * 60}ms`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span style={{ position: 'absolute', top: '12px', right: '16px', fontFamily: display, fontSize: '1.8rem', color: vivid.text, opacity: 0.2, userSelect: 'none', lineHeight: 1 }}>✦</span>

                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.22)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: mono, fontSize: '11px', color: vivid.text, fontWeight: 600 }}>{proj.no}</span>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '12px' }}>
                    <Pill label={proj.cat} bg="rgba(255,255,255,0.28)" fg={vivid.text} />
                  </div>
                  <h3 style={{ fontFamily: display, fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: vivid.text, lineHeight: 1.05, marginBottom: '10px' }}>
                    {proj.url
                      ? <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{proj.name} <span style={{ fontSize: '0.45em', opacity: 0.7, verticalAlign: 'middle' }}>↗</span></a>
                      : proj.name
                    }
                  </h3>
                  <p style={{ fontFamily: font, fontSize: '13px', color: vivid.text, opacity: 0.82, lineHeight: 1.65 }}>{proj.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────────── */}
      <section id="gz-about" style={{ background: p.pageBg2, padding: '80px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="gz-about-cols" style={{ display: 'flex', gap: '64px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: '0 0 380px', minWidth: '260px' }}>
              <Pill label="about me" bg={dark ? 'rgba(255,122,26,0.2)' : 'rgba(240,101,0,0.1)'} fg={p.orange} size="md" />
              <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em', lineHeight: 1.05, color: p.text, margin: '20px 0 28px' }}>
                I've been designing products since before "AI" was the answer to every question.
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {SKILLS.map(skill => (
                  <Pill key={skill} label={skill} bg={dark ? 'rgba(255,248,230,0.08)' : 'rgba(10,8,20,0.07)'} fg={p.textMuted} />
                ))}
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '260px', paddingTop: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontFamily: font, fontSize: '15px', color: p.textMuted, lineHeight: 1.75 }}>
                <p>My work lives at the intersection of AI capability and human judgment. I've designed health intelligence platforms, legal AI tools, agentic infrastructure, and mental wellness apps across three continents.</p>
                <p>Before that: film post-production, a record deal with Interscope, a web studio, and a decade of shipping products from seed to hypergrowth.</p>
                <p><strong><em>The AI space has a slop problem.</em></strong> Speed-to-market pressure pushes teams to accept whatever the model generates. I help teams move beyond that. Design isn't a layer you apply at the end  -  it's the difference between an output you settled for and <span style={{ color: p.text, fontWeight: 700 }}>one you sculpted.</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────────── */}
      <section id="gz-services" style={{ padding: '80px 32px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', letterSpacing: '-0.02em', color: p.text, margin: 0 }}>Ways of working</h2>
          <span style={{ color: p.orange, fontSize: '1.4rem' }}>✦</span>
          <Pill label="pick your format" bg={dark ? 'rgba(255,214,10,0.15)' : 'rgba(217,146,10,0.12)'} fg={p.yellow} />
        </div>

        <div className="gz-svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {SERVICES.map((svc) => {
            const { ref, visible } = useReveal();
            const vivid = VIVID[svc.pastel] ?? VIVID['mint'];
            return (
              <div key={svc.name} ref={ref} className="gz-svc-card" style={{ background: vivid.bg, borderRadius: '20px', border: 'none', padding: '32px', boxShadow: p.shadowSm, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'opacity 0.6s ease, transform 0.6s ease', position: 'relative', overflow: 'hidden' }}>
                <span style={{ position: 'absolute', top: '12px', right: '16px', fontFamily: display, fontSize: '1.6rem', color: vivid.text, opacity: 0.2, userSelect: 'none' }}>✦</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
                  <Pill label={svc.sub} bg="rgba(255,255,255,0.28)" fg={vivid.text} />
                  <Pill label={svc.tag} bg="rgba(255,255,255,0.15)" fg={vivid.text} />
                </div>
                <h3 style={{ fontFamily: display, fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.02em', color: vivid.text, lineHeight: 1.05, marginBottom: '14px' }}>{svc.name}</h3>
                <p style={{ fontFamily: font, fontSize: '13px', color: vivid.text, opacity: 0.82, lineHeight: 1.7 }}>{svc.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────────── */}
      <section id="gz-contact" style={{ padding: '0 32px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: VIVID['magenta'].bg, borderRadius: '28px', padding: 'clamp(40px, 6vw, 80px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <span style={{ position: 'absolute', top: '24px', left: '32px', fontFamily: display, fontSize: '3rem', color: '#fff', opacity: 0.15, userSelect: 'none' }}>✦</span>
          <span style={{ position: 'absolute', bottom: '24px', right: '32px', fontFamily: display, fontSize: '4rem', color: '#fff', opacity: 0.1, userSelect: 'none' }}>✦</span>
          <Pill label="let's work together" bg="rgba(255,255,255,0.25)" fg="#fff" size="md" />
          <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1, margin: '24px 0 20px', color: '#fff' }}>
            Ready to move beyond{' '}
            <span className="gz-grad-contact">AI slop?</span>
          </h2>
          <p style={{ fontFamily: font, fontSize: '16px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 36px' }}>
            When your team is ready to move beyond what the model generates and start sculpting something worth shipping  -  that's the work I do.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:mike@flat7.design" className="gz-cta-btn" style={{ display: 'inline-block', background: '#fff', color: VIVID['magenta'].bg, fontFamily: display, fontWeight: 800, fontSize: '15px', padding: '16px 36px', borderRadius: '999px', textDecoration: 'none' }}>
              Let's talk ↗
            </a>
            <a href="https://linkedin.com/in/mikejerugim/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', color: '#fff', fontFamily: font, fontWeight: 600, fontSize: '15px', padding: '16px 36px', borderRadius: '999px', textDecoration: 'none' }}>
              LinkedIn
            </a>
          </div>
          <p style={{ fontFamily: mono, fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', marginTop: '28px', textTransform: 'uppercase' }}>US · Canada · EU</p>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${p.border}`, padding: '24px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: display, fontWeight: 800, fontSize: '14px', color: p.text }}>
            flat7<span style={{ color: p.orange }}>.</span>design
          </span>
          <span style={{ fontFamily: mono, fontSize: '9px', color: p.textFaint, letterSpacing: '0.2em' }}>© {new Date().getFullYear()} Mike Jerugim</span>
          <a href="https://linkedin.com/in/mikejerugim/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: font, fontWeight: 600, fontSize: '12px', color: p.textMuted, textDecoration: 'none' }}>LinkedIn ↗</a>
        </div>
      </footer>
      </div>
    </div>
  );
}
