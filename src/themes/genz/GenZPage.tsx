import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeTabBar } from '../../components/ThemeTabBar';

// ─── Palette ──────────────────────────────────────────────────────────────────
function usePalette(dark: boolean) {
  return dark ? {
    pageBg:    '#070412',
    pageBg2:   '#0D0820',
    cardBg:    '#110D24',
    cardBg2:   '#0F0B1E',
    text:      '#F0EAFF',
    textMuted: 'rgba(240,234,255,0.6)',
    textFaint: 'rgba(240,234,255,0.35)',
    magenta:   '#FF00E8',
    lavender:  '#B44FFF',
    mint:      '#00FFB0',
    yellow:    '#FFE600',
    coral:     '#FF2D55',
    sky:       '#00D4FF',
    border:    'rgba(240,234,255,0.1)',
    borderCard:'rgba(240,234,255,0.14)',
    navBg:     'rgba(7,4,18,0.94)',
    shadow:    '0 4px 32px rgba(0,0,0,0.6)',
    shadowSm:  '0 2px 16px rgba(0,0,0,0.4)',
  } : {
    pageBg:    '#FBF7FF',
    pageBg2:   '#EEE4FF',
    cardBg:    '#FFFFFF',
    cardBg2:   '#F3EAFF',
    text:      '#0A0614',
    textMuted: 'rgba(10,6,20,0.58)',
    textFaint: 'rgba(10,6,20,0.38)',
    magenta:   '#CC00A3',
    lavender:  '#6600EE',
    mint:      '#009960',
    yellow:    '#CC8800',
    coral:     '#E8002A',
    sky:       '#0077DD',
    border:    'rgba(10,6,20,0.08)',
    borderCard:'rgba(10,6,20,0.11)',
    navBg:     'rgba(251,247,255,0.92)',
    shadow:    '0 4px 32px rgba(102,0,238,0.14)',
    shadowSm:  '0 2px 16px rgba(102,0,238,0.09)',
  };
}

const PROJECTS = [
  { no: '01', name: 'Onix',        cat: 'Health AI · iOS',         url: 'https://onix.life',                   pastel: 'mint',   size: 'big',
    desc: 'Expert-trained AI health companions. 16 renowned specialists encode their life\'s work  -  not public internet knowledge.' },
  { no: '02', name: 'Soluna',      cat: 'Mental Health AI · iOS',  url: 'https://solunaapp.com',               pastel: 'coral',  size: 'small',
    desc: 'Mental health support for young people. Gentleness is a feature, not an afterthought.' },
  { no: '03', name: 'Wingman',     cat: 'Productivity AI · Web',   url: 'https://wingman-3g7a.onrender.com/', pastel: 'yellow', size: 'small',
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

  const font = "'Plus Jakarta Sans', system-ui, sans-serif";
  const mono = "'IBM Plex Mono', monospace";

  const pastelBg = (key: string, alpha = 1) => {
    const map: Record<string, [string, string]> = {
      mint:     dark ? [`rgba(0,255,176,${alpha * 0.22})`, '#00FFB0']    : [`rgba(0,153,96,${alpha * 0.15})`, '#006640'],
      sky:      dark ? [`rgba(0,212,255,${alpha * 0.22})`, '#00D4FF']    : [`rgba(0,119,221,${alpha * 0.14})`, '#004A99'],
      yellow:   dark ? [`rgba(255,230,0,${alpha * 0.22})`, '#FFE600']    : [`rgba(204,136,0,${alpha * 0.16})`, '#7A4A00'],
      lavender: dark ? [`rgba(180,79,255,${alpha * 0.28})`, '#B44FFF']   : [`rgba(102,0,238,${alpha * 0.15})`, '#4400AA'],
      coral:    dark ? [`rgba(255,45,85,${alpha * 0.25})`, '#FF2D55']    : [`rgba(232,0,42,${alpha * 0.13})`, '#99001A'],
      magenta:  dark ? [`rgba(255,0,232,${alpha * 0.25})`, '#FF00E8']    : [`rgba(204,0,163,${alpha * 0.14})`, '#880070'],
    };
    return map[key] ?? map['lavender'];
  };

  const [bgColor, textColor] = pastelBg('lavender');
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ background: p.pageBg, color: p.text, fontFamily: font, minHeight: '100vh' }}>
      <style>{`
        .gz-nav-link { color: ${p.textMuted}; text-decoration: none; font-family: ${font}; font-size: 13px; font-weight: 600; transition: color 0.15s; }
        .gz-nav-link:hover { color: ${p.text}; }
        .gz-proj-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .gz-proj-card:hover { transform: translateY(-3px); box-shadow: ${dark ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(100,80,200,0.14)'} !important; }
        .gz-svc-card { transition: transform 0.22s ease; }
        .gz-svc-card:hover { transform: translateY(-3px); }
        .gz-cta-btn { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .gz-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(217,70,166,0.35) !important; }
        .gz-grad-hero { background: linear-gradient(120deg, ${p.magenta} 0%, ${p.lavender} 45%, ${p.sky} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .gz-grad-contact { background: linear-gradient(120deg, ${p.yellow} 0%, ${p.coral} 40%, ${p.magenta} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        @media (max-width: 768px) {
          .gz-hero-inner { flex-direction: column !important; }
          .gz-bento { grid-template-columns: 1fr !important; }
          .gz-svc-grid { grid-template-columns: 1fr !important; }
          .gz-about-cols { flex-direction: column !important; }
          .gz-meta-bar { display: none !important; }
          .gz-nav-links { display: none !important; }
          .gz-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) { .gz-hamburger { display: none !important; } }
      `}</style>

      {/* ── Meta bar (desktop only) ───────────────────────────────────────────── */}
      <div className="gz-meta-bar" style={{ background: dark ? `linear-gradient(90deg, rgba(180,79,255,0.9), rgba(255,0,232,0.85))` : `linear-gradient(90deg, ${p.lavender}, ${p.magenta})`, padding: '6px 24px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', ['--fg' as string]: '255 255 255' }}>
        <span style={{ fontFamily: mono, fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.3em', flexShrink: 0 }}>THEME</span>
        <ThemeTabBar />
        <button onClick={toggleColorScheme} style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'rgba(255,255,255,0.9)', fontFamily: mono, fontSize: '9px', letterSpacing: '0.2em', padding: '5px 12px', borderRadius: '999px', cursor: 'pointer', flexShrink: 0 }}>
          {dark ? '☀ light' : '☾ dark'}
        </button>
      </div>

      {/* ── Nav ───────────────────────────────────────────────────────────────── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 40, background: p.navBg, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${p.border}` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px 0 32px', display: 'flex', alignItems: 'center', height: '56px', gap: '28px' }}>
          <span style={{ fontFamily: font, fontWeight: 800, fontSize: '16px', color: p.text, marginRight: 'auto', letterSpacing: '-0.02em' }}>
            Mike Jerugim
          </span>
          <div className="gz-nav-links" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            {[['Work','work'],['About','about'],['Ways of working','services'],['Contact','contact']].map(([label, id]) => (
              <a key={id} href={`#gz-${id}`} className="gz-nav-link">{label}</a>
            ))}
          </div>
          <button className="gz-hamburger" onClick={() => setDrawerOpen(o => !o)} style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', gap: '5px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', marginLeft: 'auto' }}>
            <span style={{ display: 'block', width: '22px', height: '2px', background: drawerOpen ? p.magenta : p.text, borderRadius: '2px', transition: 'transform 0.2s', transform: drawerOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: p.magenta, borderRadius: '2px', opacity: drawerOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: drawerOpen ? p.magenta : p.text, borderRadius: '2px', transition: 'transform 0.2s', transform: drawerOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
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
              <span style={{ fontFamily: mono, fontSize: '9px', color: p.textFaint, letterSpacing: '0.3em' }}>THEME</span>
              <ThemeTabBar wrap />
            </div>
            <button onClick={toggleColorScheme} style={{ alignSelf: 'flex-start', background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)', border: 'none', color: p.textMuted, fontFamily: mono, fontSize: '9px', letterSpacing: '0.2em', padding: '7px 16px', borderRadius: '999px', cursor: 'pointer' }}>
              {dark ? '☀ light mode' : '☾ dark mode'}
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 32px 56px' }}>
        {/* Pill badge */}
        <div style={{ marginBottom: '24px' }}>
          <Pill label="✦ Product Designer and Builder · Available" bg={dark ? 'rgba(232,121,249,0.15)' : 'rgba(217,70,166,0.1)'} fg={p.magenta} size="md" />
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: font, fontWeight: 800, fontSize: 'clamp(2.8rem, 6.5vw, 6.5rem)', lineHeight: 1.0, letterSpacing: '-0.035em', color: p.text, marginBottom: '28px', maxWidth: '820px' }}>
          Making product design make sense in an{' '}
          <span className="gz-grad-hero">
            AI world.
          </span>
        </h1>

        {/* Subhead + CTA row */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '48px' }}>
          <p style={{ fontFamily: font, fontSize: '16px', color: p.textMuted, lineHeight: 1.7, maxWidth: '480px', flex: 1, minWidth: '260px' }}>
            Modern teams are shipping at a previously unimaginable velocity. I embed directly with cross-functional teams of builders to make sure design craft keeps pace.
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#gz-work" className="gz-cta-btn" style={{ display: 'inline-block', background: p.magenta, color: '#fff', fontFamily: font, fontWeight: 700, fontSize: '14px', padding: '14px 28px', borderRadius: '999px', textDecoration: 'none', boxShadow: `0 4px 16px rgba(217,70,166,0.25)` }}>
              See my work ↓
            </a>
            <a href="mailto:mike@flat7.design" style={{ display: 'inline-block', background: 'transparent', color: p.text, fontFamily: font, fontWeight: 600, fontSize: '14px', padding: '14px 28px', borderRadius: '999px', textDecoration: 'none', border: `1.5px solid ${p.borderCard}` }}>
              Get in touch
            </a>
          </div>
        </div>

        {/* Mini bento preview blocks */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { label: 'AI-native', color: 'magenta' },
            { label: 'UX strategy', color: 'lavender' },
            { label: 'Design systems', color: 'mint' },
            { label: 'Shipped products', color: 'sky' },
            { label: 'Seed to hypergrowth', color: 'yellow' },
          ].map(({ label, color }) => {
            const [bg, fg] = pastelBg(color, 1);
            return <Pill key={label} label={label} bg={bg} fg={fg} />;
          })}
        </div>
      </section>

      {/* ── Work ──────────────────────────────────────────────────────────────── */}
      <section id="gz-work" style={{ padding: '0 32px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: p.text, margin: 0 }}>Selected work</h2>
          <span style={{ fontFamily: mono, fontSize: '10px', color: p.textFaint, letterSpacing: '0.15em' }}>06 projects</span>
        </div>

        {/* Bento grid */}
        <div className="gz-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', gridAutoRows: 'auto' }}>
          {PROJECTS.map((proj, i) => {
            const { ref, visible } = useReveal();
            const [bg, fg] = pastelBg(proj.pastel);
            const isBig = proj.size === 'big';
            return (
              <div
                key={proj.no}
                ref={ref}
                className="gz-proj-card"
                style={{
                  gridColumn: isBig ? 'span 2' : 'span 1',
                  background: p.cardBg,
                  borderRadius: '20px',
                  border: `1.5px solid ${p.borderCard}`,
                  padding: isBig ? '36px' : '28px',
                  boxShadow: p.shadowSm,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                  transitionDelay: `${(i % 3) * 60}ms`,
                  display: 'flex',
                  flexDirection: isBig ? 'row' : 'column',
                  gap: isBig ? '48px' : '16px',
                  alignItems: isBig ? 'center' : 'flex-start',
                }}
              >
                {/* Color blob */}
                <div style={{ width: isBig ? '100px' : '52px', height: isBig ? '100px' : '52px', borderRadius: '50%', background: bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: mono, fontSize: '10px', color: fg, fontWeight: 600, opacity: 0.8 }}>{proj.no}</span>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '12px' }}>
                    <Pill label={proj.cat} bg={bg} fg={fg} />
                  </div>
                  <h3 style={{ fontFamily: font, fontWeight: 800, fontSize: isBig ? '2.2rem' : '1.5rem', letterSpacing: '-0.025em', color: p.text, lineHeight: 1.05, marginBottom: '10px' }}>
                    {proj.url
                      ? <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{proj.name} <span style={{ fontSize: '0.45em', color: p.textFaint, verticalAlign: 'middle' }}>↗</span></a>
                      : proj.name
                    }
                  </h3>
                  <p style={{ fontFamily: font, fontSize: isBig ? '15px' : '13px', color: p.textMuted, lineHeight: 1.65, maxWidth: isBig ? '520px' : 'none' }}>{proj.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────────── */}
      <section id="gz-about" style={{ background: p.pageBg2, padding: '80px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="gz-about-cols" style={{ display: 'flex', gap: '64px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Left */}
            <div style={{ flex: '0 0 380px', minWidth: '260px' }}>
              <Pill label="about me" bg={dark ? 'rgba(167,139,250,0.15)' : 'rgba(139,92,246,0.1)'} fg={p.lavender} size="md" />
              <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.05, color: p.text, margin: '20px 0 28px' }}>
                I've been designing products since before "AI" was the answer to every question.
              </h2>
              {/* Skills pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {SKILLS.map(skill => (
                  <Pill key={skill} label={skill} bg={dark ? 'rgba(244,240,255,0.07)' : 'rgba(13,13,20,0.06)'} fg={p.textMuted} />
                ))}
              </div>
            </div>

            {/* Right */}
            <div style={{ flex: 1, minWidth: '260px', paddingTop: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontFamily: font, fontSize: '15px', color: p.textMuted, lineHeight: 1.75 }}>
                <p>My work lives at the intersection of AI capability and human judgment. I've designed health intelligence platforms, legal AI tools, agentic infrastructure, and mental wellness apps across three continents.</p>
                <p>Before that: film post-production, a record deal with Interscope, a web studio, and a decade of shipping products from seed to hypergrowth.</p>
                <p><strong><em>The AI space has a slop problem.</em></strong> Speed-to-market pressure pushes teams to accept whatever the model generates. I help teams move beyond that. Design isn't a layer you apply at the end  -  it's the difference between an output you settled for and <span style={{ color: p.text, fontWeight: 700 }}>one you sculpted.</span></p>
              </div>

              {/* Fun stat cards */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '36px', flexWrap: 'wrap' }}>
                {[
                  { stat: '3', label: 'Continents', color: 'mint' },
                  { stat: '10+', label: 'Years shipping', color: 'coral' },
                  { stat: 'AI-native', label: 'by design', color: 'lavender' },
                ].map(({ stat, label, color }) => {
                  const [bg, fg] = pastelBg(color);
                  return (
                    <div key={label} style={{ background: p.cardBg, borderRadius: '16px', border: `1.5px solid ${p.borderCard}`, padding: '20px 24px', flex: 1, minWidth: '100px', boxShadow: p.shadowSm }}>
                      <div style={{ fontFamily: font, fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.03em', color: fg, marginBottom: '4px' }}>{stat}</div>
                      <div style={{ fontFamily: font, fontSize: '12px', color: p.textFaint, fontWeight: 500 }}>{label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────────────── */}
      <section id="gz-services" style={{ padding: '80px 32px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: p.text, margin: 0 }}>Ways of working</h2>
          <Pill label="pick your format" bg={dark ? 'rgba(252,211,77,0.12)' : 'rgba(245,158,11,0.1)'} fg={p.yellow} />
        </div>

        <div className="gz-svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {SERVICES.map((svc) => {
            const { ref, visible } = useReveal();
            const [bg, fg] = pastelBg(svc.pastel);
            return (
              <div key={svc.name} ref={ref} className="gz-svc-card" style={{ background: p.cardBg, borderRadius: '20px', border: `1.5px solid ${p.borderCard}`, padding: '32px', boxShadow: p.shadowSm, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
                  <Pill label={svc.sub} bg={bg} fg={fg} />
                  <Pill label={svc.tag} bg={dark ? 'rgba(244,240,255,0.06)' : 'rgba(13,13,20,0.05)'} fg={p.textFaint} />
                </div>
                <h3 style={{ fontFamily: font, fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', color: p.text, lineHeight: 1.05, marginBottom: '14px' }}>{svc.name}</h3>
                <p style={{ fontFamily: font, fontSize: '13px', color: p.textMuted, lineHeight: 1.7 }}>{svc.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────────────── */}
      <section id="gz-contact" style={{ padding: '0 32px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: dark ? `linear-gradient(135deg, rgba(180,79,255,0.22) 0%, rgba(255,0,232,0.18) 50%, rgba(255,45,85,0.15) 100%)` : `linear-gradient(135deg, rgba(102,0,238,0.1) 0%, rgba(204,0,163,0.1) 50%, rgba(232,0,42,0.08) 100%)`, borderRadius: '28px', border: `1.5px solid ${dark ? 'rgba(180,79,255,0.3)' : 'rgba(102,0,238,0.15)'}`, padding: 'clamp(40px, 6vw, 80px)', boxShadow: p.shadow, textAlign: 'center' }}>
          <Pill label="let's work together" bg={dark ? 'rgba(232,121,249,0.14)' : 'rgba(217,70,166,0.1)'} fg={p.magenta} size="md" />
          <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.04em', lineHeight: 1, margin: '24px 0 20px' }}>
            Ready to move beyond{' '}
            <span className="gz-grad-contact">
              AI slop?
            </span>
          </h2>
          <p style={{ fontFamily: font, fontSize: '16px', color: p.textMuted, lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 36px' }}>
            When your team is ready to move beyond what the model generates and start sculpting something worth shipping  -  that's the work I do.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:mike@flat7.design" className="gz-cta-btn" style={{ display: 'inline-block', background: p.magenta, color: '#fff', fontFamily: font, fontWeight: 700, fontSize: '15px', padding: '16px 36px', borderRadius: '999px', textDecoration: 'none', boxShadow: `0 4px 20px rgba(217,70,166,0.3)` }}>
              Let's talk ↗
            </a>
            <a href="https://linkedin.com/in/mikejerugim/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: 'transparent', color: p.text, fontFamily: font, fontWeight: 600, fontSize: '15px', padding: '16px 36px', borderRadius: '999px', textDecoration: 'none', border: `1.5px solid ${p.borderCard}` }}>
              LinkedIn
            </a>
          </div>
          <p style={{ fontFamily: mono, fontSize: '10px', color: p.textFaint, letterSpacing: '0.2em', marginTop: '28px', textTransform: 'uppercase' }}>US · Canada · EU</p>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${p.border}`, padding: '24px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: font, fontWeight: 800, fontSize: '14px', letterSpacing: '-0.02em', color: p.text }}>
            flat7<span style={{ color: p.magenta }}>.</span>design
          </span>
          <span style={{ fontFamily: mono, fontSize: '9px', color: p.textFaint, letterSpacing: '0.2em' }}>© {new Date().getFullYear()} Mike Jerugim</span>
          <a href="https://linkedin.com/in/mikejerugim/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: font, fontWeight: 600, fontSize: '12px', color: p.textMuted, textDecoration: 'none' }}>LinkedIn ↗</a>
        </div>
      </footer>
    </div>
  );
}
