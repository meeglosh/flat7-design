import { useEffect, useState } from 'react';

export function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 pt-32 pb-12">
      {/* Tagline */}
      <div
        className="transition-all duration-1000 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
        }}
      >
        <p className="font-mono text-[10px] text-parchment/55 tracking-[0.25em] uppercase mb-10 md:mb-14">
          Mike Jerugim · AI Product Design
        </p>
        <h1 className="font-display font-light text-parchment leading-[0.9] text-[clamp(2.4rem,5.5vw,6.5rem)] max-w-[18ch]">
          AI products<br />
          <em>shouldn't look</em><br />
          like they were<br />
          designed by one.
        </h1>

        <p className="font-body text-parchment/65 text-base leading-relaxed max-w-lg mt-8">
          Most AI teams ship fast and settle for what they get. I embed directly
          with engineering and product to bring genuine design craft to
          velocity-driven workflows. Sculpting outputs, not accepting them.
        </p>
      </div>

      {/* Footer row */}
      <div
        className="flex justify-between items-end transition-all duration-1000 ease-out delay-500"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div className="font-mono text-[10px] text-parchment/55 tracking-wider leading-relaxed">
          <p>US · Canada · EU</p>
          <p>Available for new engagements</p>
        </div>
        <div className="font-mono text-[10px] text-parchment/45 tracking-[0.2em] uppercase flex items-center gap-2">
          <span>Scroll</span>
          <span className="animate-bounce inline-block">↓</span>
        </div>
      </div>
    </section>
  );
}
