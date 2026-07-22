import { useMemo, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ThemeTabBar } from '../components/ThemeTabBar';
import { Lightbox } from '../components/Lightbox';
import { useThemeTokens } from '../hooks/useThemeTokens';
import { getCaseStudy, CASE_STUDIES, type CaseStudySection, type MediaItem } from '../data/caseStudies';

// For an 'image' item this is the single lightbox index; for a 'span' item it's one index per image, in order; video items carry no index.
type MediaIndex = number | number[] | null;

function MediaBlock({ item, t, mediaIndex, onOpen }: { item: MediaItem; t: ReturnType<typeof useThemeTokens>; mediaIndex: MediaIndex; onOpen: (index: number) => void }) {
  if (item.type === 'image') {
    const idx = mediaIndex as number;
    return (
      <img
        src={item.src}
        alt={item.alt}
        onClick={() => onOpen(idx)}
        className="cs-media-img"
        style={{ width: '100%', display: 'block', borderRadius: '4px', marginTop: '32px', cursor: 'zoom-in' }}
      />
    );
  }

  if (item.type === 'span') {
    const indices = mediaIndex as number[];
    return (
      <div style={{ display: 'flex', gap: '8px', marginTop: '32px', flexWrap: 'wrap' }}>
        {item.images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            onClick={() => onOpen(indices[i])}
            className="cs-media-img"
            style={{ flex: '1 1 0', minWidth: '120px', objectFit: 'cover', borderRadius: '4px', display: 'block', cursor: 'zoom-in' }}
          />
        ))}
      </div>
    );
  }

  if (item.type === 'video') {
    return (
      <div style={{ marginTop: '32px', borderRadius: '4px', overflow: 'hidden', background: '#000' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          controls
          style={{ width: '100%', display: 'block' }}
        >
          <source src={item.src} type="video/mp4" />
        </video>
      </div>
    );
  }

  return null;
}

function Section({ sec, t, mediaIndices, onOpen }: { sec: CaseStudySection; t: ReturnType<typeof useThemeTokens>; mediaIndices: MediaIndex[]; onOpen: (index: number) => void }) {
  const bodyLines = sec.body ? sec.body.split('\n\n') : [];

  return (
    <div style={{ marginBottom: '56px' }}>
      {sec.heading && (
        <h2 style={{ fontFamily: t.display, fontWeight: t.isSerif ? 400 : 700, fontStyle: t.isSerif ? 'italic' : 'normal', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: t.text, lineHeight: 1.1, marginBottom: '20px', letterSpacing: t.isSerif ? '0.01em' : '-0.01em' }}>
          {sec.heading}
        </h2>
      )}
      {sec.subheading && (
        <p style={{ fontFamily: t.mono, fontSize: '11px', color: t.accent, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '14px', marginTop: sec.heading ? '0' : '0' }}>
          {sec.subheading}
        </p>
      )}
      {bodyLines.map((para, i) => (
        <p key={i} style={{ fontFamily: t.body, fontSize: '17px', color: t.textMuted, lineHeight: 1.8, marginBottom: '16px' }}>
          {para}
        </p>
      ))}
      {sec.list && (
        <ul style={{ margin: '0 0 16px 0', padding: '0 0 0 24px' }}>
          {sec.list.map((item, i) => (
            <li key={i} style={{ fontFamily: t.body, fontSize: '17px', color: t.textMuted, lineHeight: 1.8, marginBottom: '8px' }}>
              {item}
            </li>
          ))}
        </ul>
      )}
      {sec.bodyAfter && (
        <p style={{ fontFamily: t.body, fontSize: '17px', color: t.textMuted, lineHeight: 1.8, marginBottom: '16px' }}>
          {sec.bodyAfter}
        </p>
      )}
      {sec.highlight && (
        <p style={{ fontFamily: t.display, fontWeight: t.isSerif ? 400 : 600, fontStyle: t.isSerif ? 'italic' : 'normal', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: t.text, lineHeight: 1.4, margin: '28px 0', paddingLeft: '20px', borderLeft: `3px solid ${t.accent}` }}>
          {sec.highlight}
        </p>
      )}
      {sec.media?.map((item, i) => (
        <MediaBlock key={i} item={item} t={t} mediaIndex={mediaIndices[i]} onOpen={onOpen} />
      ))}
    </div>
  );
}

export function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { colorScheme, toggleColorScheme } = useTheme();
  const t = useThemeTokens();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const cs = getCaseStudy(slug ?? '');

  // Built once, in the same order the page renders images: hero first, then each section's media
  // in order. Precomputing indices here (rather than mutating a counter during render) keeps the
  // component tree pure - a shared mutable counter breaks under React's dev double-invocation.
  const { flatImages, sectionMediaIndices } = useMemo(() => {
    if (!cs) return { flatImages: [] as { src: string; alt: string }[], sectionMediaIndices: [] as MediaIndex[][] };
    const arr: { src: string; alt: string }[] = [{ src: cs.heroImage, alt: cs.title }];
    let next = 1;
    const perSection: MediaIndex[][] = cs.sections.map(sec =>
      (sec.media ?? []).map(item => {
        if (item.type === 'image') {
          arr.push({ src: item.src, alt: item.alt });
          return next++;
        }
        if (item.type === 'span') {
          return item.images.map(img => {
            arr.push({ src: img.src, alt: img.alt });
            return next++;
          });
        }
        return null;
      })
    );
    return { flatImages: arr, sectionMediaIndices: perSection };
  }, [cs]);

  if (!cs) return <Navigate to="/case-studies" replace />;

  const others = CASE_STUDIES.filter(c => c.slug !== cs.slug).slice(0, 3);

  const metaBg = t.dark
    ? 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0.3))'
    : `linear-gradient(90deg, ${t.accentDim}, ${t.accentDim})`;

  return (
    <div style={{ background: t.pageBg, color: t.text, fontFamily: t.body, minHeight: '100vh' }}>
      <style>{`
        .cs-nav-link { color: ${t.textMuted}; text-decoration: none; font-family: ${t.mono}; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; transition: color 0.15s; }
        .cs-nav-link:hover { color: ${t.text}; }
        .cs-related-card { border: 1px solid ${t.border}; background: ${t.cardBg}; overflow: hidden; text-decoration: none; display: block; transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .cs-related-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.14); }
        .cs-media-img { transition: opacity 0.15s ease; }
        .cs-media-img:hover { opacity: 0.88; }
        @media (max-width: 768px) {
          .cs-meta-bar { display: none !important; }
          .cs-nav-links { display: none !important; }
          .cs-hamburger { display: flex !important; }
          .cs-related-grid { grid-template-columns: 1fr !important; }
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', height: '56px', gap: '16px' }}>
          <Link to="/" style={{ fontFamily: t.display, fontWeight: t.isSerif ? 400 : 700, fontStyle: t.isSerif ? 'italic' : 'normal', fontSize: '15px', color: t.text, textDecoration: 'none', flexShrink: 0, letterSpacing: t.isSerif ? '0.03em' : '-0.01em' }}>
            Mike Jerugim
          </Link>
          <span style={{ fontFamily: t.mono, fontSize: '9px', color: t.textFaint }}>·</span>
          <Link to="/case-studies" style={{ fontFamily: t.mono, fontSize: '9px', color: t.accent, letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none', flexShrink: 0 }}>
            ← Case Studies
          </Link>
          <div style={{ flex: 1 }} />
          <div className="cs-nav-links" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <a href="mailto:mike@flat7.design" className="cs-nav-link">Contact</a>
          </div>
          <button className="cs-hamburger" onClick={() => setDrawerOpen(o => !o)} style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', gap: '5px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <span style={{ display: 'block', width: '22px', height: '2px', background: drawerOpen ? t.accent : t.text, borderRadius: '2px', transition: 'transform 0.2s', transform: drawerOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: t.accent, borderRadius: '2px', opacity: drawerOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: drawerOpen ? t.accent : t.text, borderRadius: '2px', transition: 'transform 0.2s', transform: drawerOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
        {drawerOpen && (
          <div style={{ borderTop: `1px solid ${t.border}`, padding: '24px 32px', background: t.navBg, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Link to="/case-studies" className="cs-nav-link" onClick={() => setDrawerOpen(false)}>← Case Studies</Link>
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

      {/* Hero image */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 32px 0', background: t.pageBg2 }}>
        <img
          src={cs.heroImage}
          alt={cs.title}
          onClick={() => setLightboxIndex(0)}
          className="cs-media-img"
          style={{ maxWidth: '1024px', width: '100%', height: 'auto', display: 'block', cursor: 'zoom-in' }}
        />
      </div>

      {/* Content */}
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 32px 0' }}>
        {/* Meta block */}
        <div style={{ marginBottom: '56px', paddingBottom: '40px', borderBottom: `1px solid ${t.border}` }}>
          <p style={{ fontFamily: t.mono, fontSize: '9px', color: t.accent, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>
            {cs.company} · {cs.role}
          </p>
          <h1 style={{ fontFamily: t.display, fontWeight: t.isSerif ? 400 : 700, fontStyle: t.isSerif ? 'italic' : 'normal', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: t.text, lineHeight: 1.0, letterSpacing: t.isSerif ? '-0.01em' : '-0.02em', marginBottom: '16px' }}>
            {cs.title}
          </h1>
          <p style={{ fontFamily: t.body, fontSize: '18px', color: t.textMuted, lineHeight: 1.6 }}>
            {cs.subtitle}
          </p>
        </div>

        {/* Intro paragraph */}
        {cs.intro && (
          <p style={{ fontFamily: t.body, fontSize: '17px', color: t.textMuted, lineHeight: 1.85, marginBottom: '56px' }}>
            {cs.intro}
          </p>
        )}

        {/* Sections */}
        {cs.sections.map((sec, i) => (
          <Section key={i} sec={sec} t={t} mediaIndices={sectionMediaIndices[i]} onOpen={setLightboxIndex} />
        ))}
      </div>

      {/* Related case studies */}
      {others.length > 0 && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 32px 96px' }}>
          <div style={{ height: '1px', background: t.border, marginBottom: '48px' }} />
          <p style={{ fontFamily: t.mono, fontSize: '9px', color: t.accent, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '32px' }}>
            More case studies
          </p>
          <div className="cs-related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {others.map(other => (
              <Link key={other.slug} to={`/case-studies/${other.slug}`} className="cs-related-card">
                <img src={other.thumbnail} alt={other.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '16px 18px 20px' }}>
                  <p style={{ fontFamily: t.mono, fontSize: '8px', color: t.accent, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '6px' }}>{other.company}</p>
                  <p style={{ fontFamily: t.display, fontWeight: t.isSerif ? 400 : 700, fontStyle: t.isSerif ? 'italic' : 'normal', fontSize: '1.05rem', color: t.text, lineHeight: 1.15 }}>{other.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

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

      {lightboxIndex !== null && (
        <Lightbox
          images={flatImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </div>
  );
}
