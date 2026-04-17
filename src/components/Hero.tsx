import { useEffect, useRef, useState } from 'react';
import { useTheme, type StyleTheme } from '../context/ThemeContext';
import { ThemeTabBar } from './ThemeTabBar';

function SceneBackground() {
  const { styleTheme, colorScheme } = useTheme();
  const dark = colorScheme === 'dark';

  const gradients: Record<StyleTheme, { base: string; blob1: string; blob2: string }> = {
    noir: {
      base: dark
        ? 'radial-gradient(ellipse 90% 65% at 50% 58%, rgba(50,20,100,0.88) 0%, rgba(22,10,55,0.65) 42%, transparent 72%)'
        : 'radial-gradient(ellipse 80% 55% at 50% 55%, rgba(200,190,220,0.5) 0%, transparent 70%)',
      blob1: dark ? 'rgba(255,61,90,0.22)' : 'rgba(255,61,90,0.08)',
      blob2: dark ? 'rgba(0,200,255,0.16)' : 'rgba(0,200,255,0.06)',
    },
    midcentury: {
      base: dark
        ? 'radial-gradient(ellipse 90% 65% at 50% 55%, rgba(120,60,20,0.8) 0%, rgba(60,30,10,0.6) 45%, transparent 75%)'
        : 'radial-gradient(ellipse 90% 65% at 50% 55%, rgba(220,170,110,0.4) 0%, transparent 70%)',
      blob1: dark ? 'rgba(198,92,62,0.3)' : 'rgba(198,92,62,0.12)',
      blob2: dark ? 'rgba(212,160,23,0.2)' : 'rgba(212,160,23,0.1)',
    },
    bauhaus: {
      base: dark
        ? 'none'
        : 'none',
      blob1: '#E63224',
      blob2: '#1B4EAF',
    },
    genz: {
      base: dark
        ? 'radial-gradient(ellipse 100% 80% at 50% 40%, rgba(80,30,140,0.9) 0%, rgba(20,10,40,0.75) 50%, transparent 80%)'
        : 'radial-gradient(ellipse 100% 80% at 50% 40%, rgba(200,170,255,0.5) 0%, transparent 70%)',
      blob1: dark ? 'rgba(255,45,120,0.25)' : 'rgba(255,45,120,0.1)',
      blob2: dark ? 'rgba(6,182,212,0.2)' : 'rgba(6,182,212,0.08)',
    },
    myspace: {
      base: 'none',
      blob1: 'rgba(255,0,255,0.12)',
      blob2: 'rgba(0,255,255,0.08)',
    },
    luxury: {
      base: 'none',
      blob1: 'rgba(196,168,130,0.1)',
      blob2: 'rgba(196,168,130,0.06)',
    },
  };

  const g = gradients[styleTheme];
  const isBauhaus = styleTheme === 'bauhaus';
  const isMySpace = styleTheme === 'myspace';

  return (
    <div className="absolute inset-0 overflow-hidden bg-bg">
      {g.base !== 'none' && (
        <div style={{ position: 'absolute', inset: 0, background: g.base, transition: 'background 0.5s ease' }} />
      )}

      {/* Bauhaus geometric decorations */}
      {isBauhaus && (
        <>
          <div style={{ position: 'absolute', width: '40vw', height: '40vw', top: '-10%', right: '5%', borderRadius: '50%', background: '#E63224', opacity: dark ? 0.18 : 0.12 }} />
          <div style={{ position: 'absolute', width: '28vw', height: '28vw', bottom: '10%', left: '8%', background: '#1B4EAF', opacity: dark ? 0.2 : 0.14 }} />
          <div style={{ position: 'absolute', width: 0, height: 0, top: '30%', right: '20%', borderLeft: '12vw solid transparent', borderRight: '12vw solid transparent', borderBottom: `20vw solid ${dark ? 'rgba(245,197,24,0.15)' : 'rgba(245,197,24,0.1)'}` }} />
        </>
      )}

      {/* MySpace star blobs */}
      {isMySpace && (
        <>
          <div style={{ position: 'absolute', width: '60vw', height: '60vw', top: '5%', left: '-15%', borderRadius: '50%', background: `radial-gradient(circle, ${g.blob1} 0%, transparent 65%)`, animation: 'gradientDrift1 38s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: '50vw', height: '50vw', top: '-5%', right: '-10%', borderRadius: '50%', background: `radial-gradient(circle, ${g.blob2} 0%, transparent 65%)`, animation: 'gradientDrift2 48s ease-in-out infinite' }} />
        </>
      )}

      {/* Default animated blobs */}
      {!isBauhaus && !isMySpace && (
        <>
          <div style={{ position: 'absolute', width: '65vw', height: '65vw', top: '15%', left: '-18%', borderRadius: '50%', background: `radial-gradient(circle, ${g.blob1} 0%, transparent 65%)`, animation: 'gradientDrift1 38s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: '55vw', height: '55vw', top: '-10%', right: '-12%', borderRadius: '50%', background: `radial-gradient(circle, ${g.blob2} 0%, transparent 65%)`, animation: 'gradientDrift2 48s ease-in-out infinite' }} />
        </>
      )}

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: `linear-gradient(to top, rgb(var(--bg)) 0%, transparent 100%)`, transition: 'background 0.35s ease' }} />
    </div>
  );
}

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionRef  = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!parallaxRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = -rect.top / rect.height;
      parallaxRef.current.style.transform = `translateY(${progress * 28}%)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Scene 1  -  brand + theme selector */}
      <section className="relative h-screen overflow-hidden">
        <SceneBackground />
        <div
          className="relative z-10 h-full flex flex-col justify-between pt-14 pb-10 px-6 md:px-14"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1.4s ease-out' }}
        >
          <div className="flex-1 flex flex-col items-center justify-center gap-8 md:gap-10">
            {/* Brand */}
            <div className="text-center">
              <h1
                className="font-bebas text-fg leading-none tracking-[0.2em]"
                style={{ fontSize: 'clamp(5rem, 10vw, 10rem)' }}
              >
                FLAT7
              </h1>
              <p
                className="font-bebas text-fg/40 tracking-[0.45em]"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.5rem)' }}
              >
                .DESIGN
              </p>
            </div>

            {/* Theme tab bar */}
            <ThemeTabBar wrap />
          </div>

          {/* Bottom tagline */}
          <div className="text-center">
            <p className="font-mono text-[11px] text-fg/35 tracking-[0.35em] uppercase">
              Human craft at machine speed.
            </p>
          </div>
        </div>
      </section>

      {/* Scene 2  -  full-screen parallax image */}
      <section ref={sectionRef} className="relative h-screen overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-[-12%] will-change-transform"
          style={{
            backgroundImage: `url('/unsplash1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Bottom-left info panel */}
        <div
          className="absolute bottom-8 left-6 md:left-14 right-6 md:right-auto z-20"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease-out 0.4s' }}
        >
          <div className="panel p-6 md:p-7 max-w-[420px]">
            <p className="font-body text-fg/85 text-base md:text-lg leading-relaxed mb-6">
              Modern teams are shipping at a velocity that was previously unimaginable. I embed
              directly with cross-functional teams of builders to make sure design craft keeps
              pace. Sculpting outputs rather than blindly accepting them.
            </p>
            <a href="#work" className="btn-outline">
              View Work <span className="text-coral">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
