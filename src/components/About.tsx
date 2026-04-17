import { useInView } from '../hooks/useInView';

export function About() {
  const { ref, inView } = useInView(0.08);

  return (
    <section className="px-8 md:px-14 py-24 border-t border-fg/[0.07]">
      <div
        ref={ref}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.8s ease-out',
        }}
      >
        <p className="section-label mb-16">About</p>

        <h2
          className="font-bebas text-fg leading-none mb-12"
          style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)' }}
        >
          I've been designing products since before{' '}
          <span className="neon-electric">"AI"</span>{' '}
          was the answer to every question.
        </h2>

        <div className="panel p-8 md:p-10 max-w-4xl space-y-6 font-body text-fg/65 text-base md:text-[1.05rem] leading-relaxed">
          <p>
            My work lives at the intersection of AI capability and human judgment. I've designed
            health intelligence platforms, legal AI tools, agentic infrastructure, and mental
            wellness apps across three continents. Before that: film post-production, a record
            deal with Interscope, a web studio, and a decade of shipping products from seed to
            hypergrowth.
          </p>
          <p>
            <strong><em>The AI space has a slop problem.</em></strong> Speed-to-market pressure pushes teams to accept
            whatever the model generates, whatever the first iteration looks like. I help teams
            move beyond that. Design isn't a layer you apply at the end. It's the difference
            between an output you settled for and{' '}
            <span className="text-fg font-medium">one you sculpted.</span>
          </p>
          <p>
            I work directly with engineers and product managers, embedded in the workflow rather
            than orbiting it. Fast teams don't need slower design. They need design that moves
            at their velocity and makes every sprint decision more intentional.
          </p>
          <p className="text-fg font-medium">
            When your team is ready to move beyond AI slop, that's the work I do.
          </p>
        </div>
      </div>
    </section>
  );
}
