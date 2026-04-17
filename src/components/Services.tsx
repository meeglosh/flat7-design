import { useInView } from '../hooks/useInView';

const services = [
  {
    id: '01',
    name: 'Sprint',
    duration: '2–4 weeks',
    description:
      'A fixed engagement for one focused problem. You leave with a design audit and clear recommendations, a new feature fully designed and specced, or a prototype ready for user testing.',
    ideal: 'Teams that need to move fast on a specific decision, or get unstuck.',
  },
  {
    id: '02',
    name: 'Embedded',
    duration: 'Ongoing',
    description:
      'I join your team as a senior design partner. Strategy, execution, and the thing no one else will say out loud. I\'ve been a design lead at every stage of company growth. I know how to work with founders, PMs, engineers, and boards.',
    ideal: 'Funded teams building at speed who need design leadership without the overhead of a full-time hire.',
  },
  {
    id: '03',
    name: 'Advisory',
    duration: 'Monthly',
    description:
      'A regular outside perspective. I review your product, your design decisions, and your team\'s output. I ask the uncomfortable questions. I\'ve shipped AI products end-to-end and bring that context to your specific challenges.',
    ideal: 'Founders who need a trusted senior perspective they\'re not getting from inside the company.',
  },
];

export function Services() {
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
        <p className="font-mono text-[10px] text-parchment/55 tracking-[0.25em] uppercase mb-14">
          How We Work
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-parchment/[0.08]">
          {services.map((s, i) => (
            <div
              key={s.id}
              className={`pt-8 pb-12 ${i > 0 ? 'md:pl-10' : ''} ${i < 2 ? 'md:pr-10' : ''}`}
            >
              <span className="font-mono text-[10px] text-parchment/45 block mb-5">{s.id}</span>
              <h3 className="font-display font-light text-parchment text-[2.4rem] leading-none mb-2">
                {s.name}
              </h3>
              <p className="font-mono text-[10px] text-amber tracking-[0.2em] uppercase mb-7">
                {s.duration}
              </p>
              <p className="font-body text-parchment/70 text-sm leading-relaxed mb-6">
                {s.description}
              </p>
              <p className="font-mono text-[10px] text-parchment/55 leading-relaxed tracking-wide">
                <span className="text-parchment/40">Ideal for · </span>
                {s.ideal}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
