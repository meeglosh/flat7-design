import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ThemeTabBar } from '../components/ThemeTabBar';
import { useThemeTokens } from '../hooks/useThemeTokens';
import { useInView } from '../hooks/useInView';
import { CASE_STUDIES, type CaseStudy } from '../data/caseStudies';

function Card({ cs, t }: { cs: CaseStudy; t: ReturnType<typeof useThemeTokens> }) {
  const { ref, inView } = useInView(0.06);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <Link
        to={`/case-studies/${cs.slug}`}
        className="cs-card"
        style={{ textDecoration: 'none', display: 'block', background: t.cardBg, border: `1px solid ${t.border}`, overflow: 'hidden' }}
      >
        <div style={{ overflow: 'hidden' }}>
          <img
            src={cs.thumbnail}
            alt={cs.title}
            style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
            className="cs-card-img"
          />
        </div>
        <div style={{ padding: '24px 24px 28px' }}>
          <p style={{ fontFamily: t.mono, fontSize: '9px', color: t.accent, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '10px' }}>
            {cs.company}
          </p>
          <h3 style={{ fontFamily: t.display, fontWeight: t.isSerif ? 400 : 700, fontStyle: t.isSerif ? 'italic' : 'normal', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: t.text, lineHeight: 1.05, marginBottom: '10px', letterSpacing: t.isSerif ? '0.01em' : '-0.01em' }}>
            {cs.title}
          </h3>
          <p style={{ fontFamily: t.body, fontSize: '13px', color: t.textMuted, lineHeight: 1.65, marginBottom: '20px' }}>
            {cs.subtitle}
          </p>
          <span style={{ fontFamily: t.mono, fontSize: '10px', color: t.accent, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Read case study →
          </span>
        </div>
      </Link>
    </div>
  );
}

export function CaseStudiesGallery() {
  const { colorScheme, toggleColorScheme } = useTheme();
  const t = useThemeTokens();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const metaBg = t.dark
    ? 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0.3))'
    : `linear-gradient(90deg, ${t.accentDim}, ${t.accentDim})`;

  return (
    <div style={{ background: t.pageBg, color: t.text, fontFamily: t.body, minHeight: '100vh' }}>
      <style>{`
        .cs-card { transition: box-shadow 0.25s ease, transform 0.25s ease; }
        .cs-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.18); }
        .cs-card:hover .cs-card-img { transform: scale(1.03); }
        .cs-nav-link { color: ${t.textMuted}; text-decoration: none; font-family: ${t.mono}; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; transition: color 0.15s; }
        .cs-nav-link:hover { color: ${t.text}; }
        .cs-nav-link-accent { color: ${t.accent}; text-decoration: none; font-family: ${t.mono}; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; transition: opacity 0.15s; }
        .cs-nav-link-accent:hover { opacity: 0.75; }
        @media (max-width: 768px) {
          .cs-meta-bar { display: none !important; }
          .cs-nav-links { display: none !important; }
          .cs-hamburger { display: flex !important; }
          .cs-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) { .cs-hamburger { display: none !important; } }
      `}</style>

      {/* Meta bar */}
      <div className="cs-meta-bar" style={{ background: metaBg, borderBottom: `1px solid ${t.border}`, padding: '5px 24px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: t.mono, fontSize: '9px', color: t.textFaint, letterSpacing: '0.35em', flexShrink: 0 }}>THEME</span>
        <ThemeTabBar />
        <button
          onClick={toggleColorScheme}
          style={{ marginLeft: 'auto', background: 'transparent', border: `1px solid ${t.border}`, color: t.textMuted, fontFamily: t.mono, fontSize: '9px', letterSpacing: '0.2em', padding: '4px 12px', cursor: 'pointer', flexShrink: 0 }}
        >
          {colorScheme === 'dark' ? '☀ light' : '☾ dark'}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 40, background: t.navBg, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', height: '56px', gap: '32px' }}>
          <Link to="/" style={{ fontFamily: t.display, fontWeight: t.isSerif ? 400 : 700, fontStyle: t.isSerif ? 'italic' : 'normal', fontSize: '15px', color: t.text, textDecoration: 'none', marginRight: 'auto', letterSpacing: t.isSerif ? '0.03em' : '-0.01em', flexShrink: 0 }}>
            Mike Jerugim
          </Link>
          <div className="cs-nav-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Link to="/" className="cs-nav-link">Home</Link>
            <a href="mailto:mike@flat7.design" className="cs-nav-link">Contact</a>
          </div>
          <button className="cs-hamburger" onClick={() => setDrawerOpen(o => !o)} style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', gap: '5px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', marginLeft: 'auto' }}>
            <span style={{ display: 'block', width: '22px', height: '2px', background: drawerOpen ? t.accent : t.text, borderRadius: '2px', transition: 'transform 0.2s', transform: drawerOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: t.accent, borderRadius: '2px', opacity: drawerOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: drawerOpen ? t.accent : t.text, borderRadius: '2px', transition: 'transform 0.2s', transform: drawerOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
        {drawerOpen && (
          <div style={{ borderTop: `1px solid ${t.border}`, padding: '24px 32px', background: t.navBg, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Link to="/" className="cs-nav-link" onClick={() => setDrawerOpen(false)}>Home</Link>
            <a href="mailto:mike@flat7.design" className="cs-nav-link" onClick={() => setDrawerOpen(false)}>Contact</a>
            <div style={{ height: '1px', background: t.border }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontFamily: t.mono, fontSize: '9px', color: t.textFaint, letterSpacing: '0.3em' }}>THEME</span>
              <ThemeTabBar wrap />
            </div>
            <button onClick={toggleColorScheme} style={{ alignSelf: 'flex-start', background: 'transparent', border: `1px solid ${t.border}`, color: t.textMuted, fontFamily: t.mono, fontSize: '13px', letterSpacing: '0.15em', padding: '10px 20px', cursor: 'pointer' }}>
              {colorScheme === 'dark' ? '☀ light mode' : '☾ dark mode'}
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 32px 56px' }}>
        <p style={{ fontFamily: t.mono, fontSize: '9px', color: t.accent, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '20px' }}>
          Design & Impact
        </p>
        <h1 style={{ fontFamily: t.display, fontWeight: t.isSerif ? 400 : 700, fontStyle: t.isSerif ? 'italic' : 'normal', fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: t.text, lineHeight: 1.0, letterSpacing: t.isSerif ? '-0.01em' : '-0.02em', marginBottom: '24px' }}>
          Case Studies
        </h1>
        <p style={{ fontFamily: t.body, fontSize: '16px', color: t.textMuted, lineHeight: 1.7, maxWidth: '540px' }}>
          Thoughtful design grounded in research, craft, and outcomes. Six engagements across health, music, construction, legal, and fitness.
        </p>
        <div style={{ marginTop: '32px', height: '1px', background: t.border }} />
      </section>

      {/* Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px 96px' }}>
        <div className="cs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {CASE_STUDIES.map(cs => (
            <Card key={cs.slug} cs={cs} t={t} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${t.border}`, padding: '28px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <Link to="/" style={{ fontFamily: t.display, fontWeight: t.isSerif ? 400 : 700, fontStyle: t.isSerif ? 'italic' : 'normal', fontSize: '14px', color: t.textMuted, textDecoration: 'none' }}>
            flat7.design
          </Link>
          <span style={{ fontFamily: t.mono, fontSize: '9px', color: t.textFaint, letterSpacing: '0.2em' }}>© {new Date().getFullYear()} Mike Jerugim</span>
          <a href="https://linkedin.com/in/mikejerugim/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: t.mono, fontSize: '9px', color: t.textMuted, textDecoration: 'none', letterSpacing: '0.2em' }}>LinkedIn ↗</a>
        </div>
      </footer>
    </div>
  );
}
