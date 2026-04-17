import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeTabBar } from '../../components/ThemeTabBar';

// ─── Palette ──────────────────────────────────────────────────────────────────
function usePalette(dark: boolean) {
  return dark ? {
    pageBg:       '#1A1008',
    pageBg2:      '#211508',
    sectionAlt:   '#251A0C',
    text:         '#EDD8B8',
    textMuted:    'rgba(237,216,184,0.55)',
    textFaint:    'rgba(237,216,184,0.32)',
    terra:        '#E07040',
    mustard:      '#E0B828',
    teal:         '#5AA0A8',
    olive:        '#8AAA5A',
    border:       'rgba(237,216,184,0.12)',
    borderStrong: 'rgba(237,216,184,0.3)',
    cardBg:       '#211508',
    heroOverlay:  'linear-gradient(to top, rgba(26,16,8,0.9) 0%, rgba(26,16,8,0.45) 50%, rgba(26,16,8,0.2) 100%)',
    navBg:        'rgba(26,16,8,0.92)',
  } : {
    pageBg:       '#FAF3E8',
    pageBg2:      '#F2E8D5',
    sectionAlt:   '#EDE0C8',
    text:         '#2A1A06',
    textMuted:    'rgba(42,26,6,0.55)',
    textFaint:    'rgba(42,26,6,0.32)',
    terra:        '#C65C3E',
    mustard:      '#C8980A',
    teal:         '#3A7A88',
    olive:        '#5A7A3A',
    border:       'rgba(42,26,6,0.12)',
    borderStrong: 'rgba(42,26,6,0.3)',
    cardBg:       '#F2E8D5',
    heroOverlay:  'linear-gradient(to top, rgba(42,26,6,0.75) 0%, rgba(42,26,6,0.3) 55%, rgba(42,26,6,0.1) 100%)',
    navBg:        'rgba(250,243,232,0.95)',
  };
}

const PROJECTS = [
  { id: '01', name: 'Onix',        cat: 'Health AI · iOS',         url: 'https://onix.life',                   accent: 'terra',
    desc: "Expert-trained AI health companions built on a privacy-first architecture. 16 renowned specialists encode their life's work, not public internet knowledge." },
  { id: '02', name: 'Soluna',      cat: 'Mental Health AI · iOS',  url: 'https://solunaapp.com',               accent: 'teal',
    desc: 'High-stakes UX where gentleness is a feature. Mental health support for young people, designed at the intersection of clinical rigor and human warmth.' },
  { id: '03', name: 'Wingman',     cat: 'Productivity AI · Web',   url: 'https://wingman-3g7a.onrender.com/', accent: 'mustard',
    desc: 'From prompt to polished presentation. AI-driven slide generation with real themes, real typography, audio visualization, and export.' },
  { id: '04', name: 'Woltspace',   cat: 'AI Infrastructure · Web', url: 'https://woltspace.com',               accent: 'olive',
    desc: 'Persistent workspaces for AI agents with memory, identity, and autonomy that survive across sessions. Designing for non-human collaborators.' },
  { id: '06', name: 'Signal Desk', cat: 'Audio Tools · iOS',       url: 'https://signaldeskpro.com',           accent: 'mustard',
    desc: "Professional mix reference for producers and engineers. 12 console modes, 8 calibrated meters, speaker simulation, and export." },
  { id: '07', name: 'Decathlon',   cat: 'E-Commerce · Web & App',  url: 'https://www.decathlon.ca/en',         accent: 'teal',
    desc: "Large-scale retail UX for one of the world's biggest sports brands. Accessible gear discovery across 15+ sport categories for millions of recreational athletes." },
  { id: '08', name: 'Hololabs',    cat: 'Spatial Computing · AR/VR', url: 'https://hololabs.org/',             accent: 'terra',
    desc: 'Immersive experience design for entertainment venues and theme parks. UX that lives beyond the screen  -  spatial, embodied, and physical-first.' },
  { id: '09', name: 'Bandsintown', cat: 'Music Tech · Web',         url: 'https://www.artist.bandsintown.com/', accent: 'olive',
    desc: 'Tour promotion and fan engagement for 700,000+ artists. Streamlining complex multi-platform logistics  -  ticketing, fan outreach, tour dates  -  into a single coherent workflow.' },
  { id: '10', name: 'Flashtract',  cat: 'Construction Tech · Web',  url: 'https://flashtract.com/',            accent: 'mustard',
    desc: 'Billing and payment automation for the construction industry. Designing for highly regulated, multi-party financial workflows where the stakes are compliance, not convenience.' },
  { id: '11', name: 'Estateably',  cat: 'LegalTech · Web',          url: 'https://www.estateably.com/',        accent: 'terra',
    desc: 'Estate and trust administration for attorneys and CPAs. 3,000+ jurisdiction-specific forms, fiduciary accounting, and compliance  -  designed for specialists in high-stakes legal work.' },
];

const SERVICES = [
  { id: '01', name: 'Sprint',   duration: '2–4 weeks', accent: 'terra',
    desc: 'A fixed engagement for one focused problem. You leave with a design audit, a new feature fully specced, or a prototype ready for user testing.',
    ideal: 'Teams that need to move fast on a specific decision, or get unstuck.' },
  { id: '02', name: 'Embedded', duration: 'Ongoing',   accent: 'teal',
    desc: "I join your team as a senior design partner. Strategy, execution, and the thing no one else will say out loud.",
    ideal: 'Funded teams building at speed who need senior design leadership embedded in how they build.' },
  { id: '03', name: 'Advisory', duration: 'Monthly',   accent: 'mustard',
    desc: "A regular outside perspective. I review your product, your design decisions, and your team's output. I ask the uncomfortable questions.",
    ideal: "Founders who need a trusted senior perspective they're not getting from inside the company." },
];

// ─── Starburst SVG ────────────────────────────────────────────────────────────
function Starburst({ size = 120, color = '#C65C3E', opacity = 0.18 }: { size?: number; color?: string; opacity?: number }) {
  const pts = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 16;
    const r = i % 2 === 0 ? size / 2 : size / 4;
    return `${size / 2 + r * Math.cos(angle - Math.PI / 2)},${size / 2 + r * Math.sin(angle - Math.PI / 2)}`;
  }).join(' ');
  return (
    <svg width={size} height={size} style={{ opacity }} viewBox={`0 0 ${size} ${size}`}>
      <polygon points={pts} fill={color} />
    </svg>
  );
}

// ─── Decorative divider ───────────────────────────────────────────────────────
function MCDivider({ color, dark: _dark }: { color: string; dark: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '0' }}>
      <div style={{ flex: 1, height: '1px', background: color, opacity: 0.3 }} />
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, opacity: 0.6 }} />
      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: color, opacity: 0.4 }} />
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, opacity: 0.6 }} />
      <div style={{ flex: 1, height: '1px', background: color, opacity: 0.3 }} />
    </div>
  );
}

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Main component ───────────────────────────────────────────────────────────
export function MidCenturyPage() {
  const { colorScheme, toggleColorScheme } = useTheme();
  const dark = colorScheme === 'dark';
  const p = usePalette(dark);

  const serif  = "'Playfair Display', Georgia, serif";
  const sans   = "'DM Sans', system-ui, sans-serif";
  const mono   = "'DM Mono', 'IBM Plex Mono', monospace";

  const accentColor = (key: string) => {
    const map: Record<string, string> = { terra: p.terra, teal: p.teal, mustard: p.mustard, olive: p.olive };
    return map[key] ?? p.terra;
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const parallaxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ background: p.pageBg, color: p.text, fontFamily: sans, minHeight: '100vh' }}>
      <style>{`
        .mc-nav-link { color: ${p.textMuted}; text-decoration: none; font-family: ${mono}; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; transition: color 0.2s; }
        .mc-nav-link:hover { color: ${p.terra}; }
        .mc-project-row { transition: opacity 0.3s; }
        .mc-project-row:hover .mc-project-name { color: ${p.terra}; }
        .mc-service-card:hover { background: ${dark ? '#2A1A0C' : '#EDE0C8'} !important; }
        @media (max-width: 768px) {
          .mc-hero-text { padding: 20px !important; }
          .mc-two-col { flex-direction: column !important; }
          .mc-service-grid { grid-template-columns: 1fr !important; }
          .mc-project-layout { flex-direction: column !important; }
          .mc-project-img { width: 100% !important; height: 220px !important; }
          .mc-meta-bar { display: none !important; }
          .mc-nav-links { display: none !important; }
          .mc-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mc-hamburger { display: none !important; }
        }
      `}</style>

      {/* ── Theme / meta bar (desktop only) ────────────────────────────────── */}
      <div className="mc-meta-bar" style={{ background: dark ? '#0E0804' : '#EDE0C8', borderBottom: `1px solid ${p.border}`, padding: '6px 24px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: mono, fontSize: '9px', color: p.textFaint, letterSpacing: '0.3em', flexShrink: 0 }}>THEME</span>
        <ThemeTabBar />
        <button onClick={toggleColorScheme} style={{ marginLeft: 'auto', background: 'transparent', border: `1px solid ${p.borderStrong}`, color: p.textMuted, fontFamily: mono, fontSize: '9px', letterSpacing: '0.2em', padding: '4px 10px', cursor: 'pointer', flexShrink: 0 }}>
          {dark ? '☀ LIGHT' : '☾ DARK'}
        </button>
      </div>

      {/* ── Navigation ──────────────────────────────────────────────────────── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 40, background: p.navBg, backdropFilter: 'blur(12px)', borderBottom: `1px solid ${p.border}`, padding: '0 24px 0 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', height: '56px', gap: '32px' }}>
          <a href="#" style={{ fontFamily: serif, fontSize: '18px', fontStyle: 'italic', fontWeight: 700, color: p.text, textDecoration: 'none', marginRight: 'auto', letterSpacing: '-0.01em' }}>
            Mike Jerugim
          </a>
          {/* Desktop nav links */}
          <div className="mc-nav-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {[['Work','work'],['About','about'],['Ways of working','services'],['Contact','contact']].map(([label, id]) => (
              <a key={id} href={`#mc-${id}`} className="mc-nav-link">{label}</a>
            ))}
          </div>
          {/* Hamburger (mobile only) */}
          <button className="mc-hamburger" onClick={() => setDrawerOpen(o => !o)} style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', gap: '5px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', marginLeft: 'auto' }}>
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: drawerOpen ? p.terra : p.text, transition: 'transform 0.2s, opacity 0.2s', transform: drawerOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: p.terra, opacity: drawerOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: drawerOpen ? p.terra : p.text, transition: 'transform 0.2s, opacity 0.2s', transform: drawerOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div style={{ borderTop: `1px solid ${p.border}`, padding: '24px', display: 'flex', flexDirection: 'column', gap: '28px', background: p.navBg }}>
            {/* Nav links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {[['Work','work'],['About','about'],['Ways of working','services'],['Contact','contact']].map(([label, id]) => (
                <a key={id} href={`#mc-${id}`} className="mc-nav-link" onClick={() => setDrawerOpen(false)} style={{ fontSize: '13px' }}>{label}</a>
              ))}
            </div>
            {/* Divider */}
            <div style={{ height: '1px', background: p.border }} />
            {/* Theme selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontFamily: mono, fontSize: '9px', color: p.textFaint, letterSpacing: '0.3em' }}>THEME</span>
              <ThemeTabBar wrap />
            </div>
            {/* Light/dark toggle */}
            <button onClick={toggleColorScheme} style={{ alignSelf: 'flex-start', background: 'transparent', border: `1px solid ${p.borderStrong}`, color: p.textMuted, fontFamily: mono, fontSize: '9px', letterSpacing: '0.2em', padding: '6px 14px', cursor: 'pointer' }}>
              {dark ? '☀ LIGHT MODE' : '☾ DARK MODE'}
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <div ref={parallaxRef} style={{ position: 'absolute', top: '-6%', bottom: '-6%', left: 0, right: 0, backgroundImage: "url('/mid-century1.png')", backgroundSize: 'cover', backgroundPosition: 'center bottom', willChange: 'transform' }} />
        <div style={{ position: 'absolute', inset: 0, background: p.heroOverlay }} />

        {/* Decorative circle */}
        <div style={{ position: 'absolute', right: '8%', top: '12%', width: '340px', height: '340px', borderRadius: '50%', border: `2px solid ${p.terra}`, opacity: 0.25, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: '10%', top: '14%', width: '300px', height: '300px', borderRadius: '50%', border: `1px solid ${p.mustard}`, opacity: 0.15, pointerEvents: 'none' }} />

        {/* Starburst decoration */}
        <div style={{ position: 'absolute', right: '5%', bottom: '20%', pointerEvents: 'none' }}>
          <Starburst size={90} color={p.mustard} opacity={dark ? 0.22 : 0.18} />
        </div>

        {/* Hero text */}
        <div className="mc-hero-text" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '60px 60px', maxWidth: '900px' }}>
          <p style={{ fontFamily: mono, fontSize: '10px', color: 'rgba(250,243,232,0.7)', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '20px' }}>
            Mike Jerugim · Product Designer and Builder
          </p>
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(3rem, 6.5vw, 7rem)', fontWeight: 700, lineHeight: 1.05, color: '#FAF3E8', marginBottom: '24px', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            Human craft<br />at machine speed.
          </h1>
          <p style={{ fontFamily: sans, fontSize: '16px', color: 'rgba(250,243,232,0.75)', maxWidth: '480px', lineHeight: 1.7, marginBottom: '32px' }}>
            Modern teams are shipping at a velocity that was previously unimaginable. I embed directly with cross-functional teams of builders to make sure design craft keeps pace.
          </p>
          <a href="#mc-work" style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#FAF3E8', textDecoration: 'none', borderBottom: `1px solid ${p.terra}`, paddingBottom: '3px' }}>
            View Work ↓
          </a>
        </div>
      </section>

      {/* ── Work ────────────────────────────────────────────────────────────── */}
      <section id="mc-work" style={{ padding: '80px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px', marginBottom: '48px' }}>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: p.text, lineHeight: 1 }}>Selected Work</h2>
          <div style={{ flex: 1, height: '1px', background: p.border }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {PROJECTS.map((proj, i) => {
            const { ref, visible } = useReveal();
            const accent = accentColor(proj.accent);
            const even = i % 2 === 0;
            return (
              <div key={proj.id} ref={ref} className="mc-project-row mc-project-layout" style={{ display: 'flex', borderTop: `1px solid ${p.border}`, padding: '36px 0', gap: '48px', alignItems: 'center', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'opacity 0.7s ease, transform 0.7s ease', transitionDelay: `${(i % 2) * 80}ms`, flexWrap: 'wrap' }}>
                {/* Number */}
                <div style={{ width: '60px', flexShrink: 0, fontFamily: serif, fontSize: '3.5rem', color: accent, opacity: 0.35, lineHeight: 1, textAlign: even ? 'left' : 'right' }}>
                  {proj.id}
                </div>
                {/* Content */}
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <p style={{ fontFamily: mono, fontSize: '9px', color: accent, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '10px' }}>{proj.cat}</p>
                  <h3 className="mc-project-name" style={{ fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, color: p.text, lineHeight: 1.05, marginBottom: '14px', transition: 'color 0.2s' }}>
                    {proj.url
                      ? <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{proj.name} <span style={{ fontSize: '0.5em', verticalAlign: 'middle', color: accent }}>↗</span></a>
                      : proj.name
                    }
                  </h3>
                  <p style={{ fontFamily: sans, fontSize: '15px', color: p.textMuted, lineHeight: 1.7, maxWidth: '520px' }}>{proj.desc}</p>
                </div>
                {/* Color band */}
                <div className="mc-project-img" style={{ width: '120px', height: '80px', flexShrink: 0, background: accent, opacity: 0.15, borderRadius: '2px' }} />
              </div>
            );
          })}
          <div style={{ borderTop: `1px solid ${p.border}` }} />
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────────────────────── */}
      <section id="mc-about" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Full-bleed image */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/mid-century2.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: dark ? 'rgba(26,16,8,0.82)' : 'rgba(250,243,232,0.78)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', padding: '100px 40px' }}>
          <div className="mc-two-col" style={{ display: 'flex', gap: '80px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Left: big quote */}
            <div style={{ flex: '0 0 420px', minWidth: '280px' }}>
              <MCDivider color={p.terra} dark={dark} />
              <h2 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontStyle: 'italic', fontWeight: 700, color: p.text, lineHeight: 1.1, margin: '28px 0' }}>
                I've been designing products since before{' '}
                <span style={{ color: p.teal }}>"AI"</span>{' '}
                was the answer to every question.
              </h2>
              <MCDivider color={p.mustard} dark={dark} />
            </div>
            {/* Right: bio */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              <p style={{ fontFamily: mono, fontSize: '9px', color: p.terra, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '28px' }}>About</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontFamily: sans, fontSize: '15px', color: p.textMuted, lineHeight: 1.75 }}>
                <p>My work lives at the intersection of AI capability and human judgment. I've designed health intelligence platforms, legal AI tools, agentic infrastructure, and mental wellness apps across three continents. Before that: film post-production, a record deal with Interscope, a web studio, and a decade of shipping products from seed to hypergrowth.</p>
                <p><strong><em>The AI space has a slop problem.</em></strong> Speed-to-market pressure pushes teams to accept whatever the model generates. I help teams move beyond that. Design isn't a layer you apply at the end  -  it's the difference between an output you settled for and <span style={{ color: p.text, fontWeight: 500 }}>one you sculpted.</span></p>
                <p style={{ color: p.text, fontWeight: 500 }}>When your team is ready to move beyond AI slop, that's the work I do.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────────────── */}
      <section id="mc-services" style={{ background: p.sectionAlt, padding: '100px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px', marginBottom: '64px' }}>
            <div style={{ flex: 1, height: '1px', background: p.border }} />
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: p.text, lineHeight: 1 }}>Ways of working</h2>
            <div style={{ flex: 1, height: '1px', background: p.border }} />
          </div>

          <div className="mc-service-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
            {SERVICES.map((svc) => {
              const { ref, visible } = useReveal();
              const accent = accentColor(svc.accent);
              return (
                <div key={svc.id} ref={ref} className="mc-service-card" style={{ background: p.cardBg, padding: '40px 32px', borderTop: `4px solid ${accent}`, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease, background 0.25s ease' }}>
                  <div style={{ fontFamily: serif, fontSize: '4rem', color: accent, opacity: 0.3, lineHeight: 1, marginBottom: '20px' }}>{svc.id}</div>
                  <div style={{ fontFamily: mono, fontSize: '9px', color: accent, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '14px' }}>{svc.duration}</div>
                  <h3 style={{ fontFamily: serif, fontSize: '2.5rem', fontWeight: 700, color: p.text, lineHeight: 1.05, marginBottom: '18px' }}>{svc.name}</h3>
                  <p style={{ fontFamily: sans, fontSize: '14px', color: p.textMuted, lineHeight: 1.7, marginBottom: '16px' }}>{svc.desc}</p>
                  <p style={{ fontFamily: mono, fontSize: '9px', color: p.textFaint, lineHeight: 1.6 }}>
                    <span style={{ color: p.textFaint, opacity: 0.6 }}>Ideal for · </span>{svc.ideal}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────────────── */}
      <section id="mc-contact" style={{ padding: '100px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <MCDivider color={p.terra} dark={dark} />
        <div style={{ padding: '64px 0', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '40px' }}>
          <div>
            <p style={{ fontFamily: mono, fontSize: '9px', color: p.terra, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '20px' }}>Let's Work</p>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(3rem, 7vw, 7rem)', fontStyle: 'italic', fontWeight: 700, color: p.text, lineHeight: 1, marginBottom: '0' }}>
              Ready to move<br />beyond <span style={{ color: p.terra }}>AI slop?</span>
            </h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <a href="mailto:mike@flat7.design" style={{ fontFamily: serif, fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', color: p.text, textDecoration: 'none', borderBottom: `2px solid ${p.terra}`, paddingBottom: '4px', display: 'block', marginBottom: '16px' }}>
              Let's talk
            </a>
            <p style={{ fontFamily: mono, fontSize: '9px', color: p.textFaint, letterSpacing: '0.25em', textTransform: 'uppercase' }}>US · Canada · EU</p>
          </div>
        </div>
        <MCDivider color={p.mustard} dark={dark} />
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer style={{ background: dark ? '#0E0804' : '#EDE0C8', borderTop: `1px solid ${p.border}`, padding: '24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: serif, fontSize: '14px', fontStyle: 'italic', color: p.textMuted }}>flat7.design</span>
          <span style={{ fontFamily: mono, fontSize: '9px', color: p.textFaint, letterSpacing: '0.2em' }}>© {new Date().getFullYear()} Mike Jerugim</span>
          <a href="https://linkedin.com/in/mikejerugim/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: '9px', color: p.textMuted, letterSpacing: '0.2em', textDecoration: 'none' }}>LinkedIn ↗</a>
        </div>
      </footer>
    </div>
  );
}
