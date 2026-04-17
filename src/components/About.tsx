import { useInView } from '../hooks/useInView';

export function About() {
  const { ref, inView } = useInView(0.08);

  return (
    <section className="px-6 md:px-12 py-20 border-t border-parchment/[0.08]">
      <div
        ref={ref}
        className="max-w-3xl transition-all duration-700 ease-out"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
        }}
      >
        <p className="font-mono text-[10px] text-parchment/55 tracking-[0.25em] uppercase mb-14">
          About
        </p>

        <p className="font-display font-light text-parchment text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.25] mb-10">
          I've been designing products since before "AI" was the answer to every
          question. And building them since I realized Figma files alone don't ship.
        </p>

        <div className="space-y-5 font-body text-parchment/70 text-base md:text-[1.05rem] leading-relaxed">
          <p>
            My work lives at the intersection of AI capability and human judgment. I've designed
            health intelligence platforms, legal AI tools, agentic infrastructure, and mental
            wellness apps across three continents. Before that: film post-production, a record
            deal with Interscope, a web studio, and a decade of shipping products from seed to
            Series B.
          </p>
          <p>
            The AI space has a slop problem. Speed-to-market pressure pushes teams to accept
            whatever the model generates, whatever the first iteration looks like. I help teams
            move beyond that. Design isn't a layer you apply at the end. It's the difference
            between an output you settled for and one you sculpted.
          </p>
          <p>
            I work directly with engineers and product managers, embedded in the workflow rather
            than orbiting it. Fast teams don't need slower design. They need design that moves
            at their velocity and makes every sprint decision more intentional.
          </p>
          <p>
            When your team is ready to move beyond AI slop, that's the work I do.
          </p>
        </div>
      </div>
    </section>
  );
}
