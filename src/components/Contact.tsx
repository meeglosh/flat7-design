import { useInView } from '../hooks/useInView';

export function Contact() {
  const { ref, inView } = useInView(0.08);

  return (
    <section className="px-8 md:px-14 py-24 border-t border-fg/[0.07]" id="contact">
      <div
        ref={ref}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.8s ease-out',
        }}
      >
        <p className="section-label mb-16">Let's Work</p>

        <h2
          className="font-bebas text-fg leading-none mb-14"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 9rem)' }}
        >
          Ready to move<br />
          beyond{' '}
          <span className="neon-coral">AI slop?</span>
        </h2>

        <a href="mailto:mike@flat7.design" className="btn-outline text-base md:text-lg" style={{ letterSpacing: '0.05em' }}>
          Let's talk
          <span className="text-coral">→</span>
        </a>

        <div className="mt-28 pt-8 border-t border-fg/[0.07] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="font-mono text-[10px] text-fg/35 tracking-widest uppercase">
            flat7.design
          </span>
          <span className="font-mono text-[10px] text-fg/25">
            © {new Date().getFullYear()} Mike Jerugim · US · Canada · EU
          </span>
          <a
            href="https://linkedin.com/in/mikejerugim/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-fg/35 hover:text-fg/65 transition-colors duration-300 tracking-wider"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
