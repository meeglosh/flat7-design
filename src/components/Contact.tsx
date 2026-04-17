import { useInView } from '../hooks/useInView';

export function Contact() {
  const { ref, inView } = useInView(0.08);

  return (
    <section className="px-6 md:px-12 py-20 border-t border-parchment/[0.08]">
      <div
        ref={ref}
        className="transition-all duration-700 ease-out"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
        }}
      >
        <h2 className="font-display font-light text-parchment leading-[0.88] text-[clamp(3rem,7vw,7.5rem)] max-w-[18ch] mb-16">
          Ready to move<br />
          beyond<br />
          <em>AI slop?</em>
        </h2>

        <a
          href="mailto:mike@flat7.design"
          className="arrow-link group inline-flex items-center gap-3 font-mono text-base md:text-lg text-parchment/65 hover:text-amber transition-colors duration-300"
        >
          mike@flat7.design
          <span className="arrow text-parchment/45 group-hover:text-amber transition-colors duration-300">
            →
          </span>
        </a>

        <div className="mt-24 pt-8 border-t border-parchment/[0.06] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="font-mono text-[10px] text-parchment/45 tracking-widest">
            flat7.design
          </span>
          <span className="font-mono text-[10px] text-parchment/40">
            © {new Date().getFullYear()} Mike Jerugim · Montreal
          </span>
          <a
            href="https://linkedin.com/in/mikejerugim/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-parchment/45 hover:text-parchment/70 transition-colors duration-300 tracking-wider"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
