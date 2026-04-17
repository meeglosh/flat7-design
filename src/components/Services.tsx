import { useInView } from '../hooks/useInView';

const services = [
  {
    id: '01',
    name: 'Sprint',
    duration: '2–4 weeks',
    accent: '#FF3D5A',
    accentClass: 'neon-coral',
    description:
      'A fixed engagement for one focused problem. You leave with a design audit and clear recommendations, a new feature fully designed and specced, or a prototype ready for user testing.',
    ideal: 'Teams that need to move fast on a specific decision, or get unstuck.',
  },
  {
    id: '02',
    name: 'Embedded',
    duration: 'Ongoing',
    accent: '#00C8FF',
    accentClass: 'neon-electric',
    description:
      "I join your team as a senior design partner. Strategy, execution, and the thing no one else will say out loud. I've been a design lead at every stage of company growth. I know how to work with founders, PMs, engineers, and boards.",
    ideal: 'Funded teams building at speed who need senior design leadership embedded in how they build.',
  },
  {
    id: '03',
    name: 'Advisory',
    duration: 'Monthly',
    accent: '#A8FF3E',
    accentClass: 'neon-acid',
    description:
      "A regular outside perspective. I review your product, your design decisions, and your team's output. I ask the uncomfortable questions. I've shipped AI products end-to-end and bring that context to your specific challenges.",
    ideal: "Founders who need a trusted senior perspective they're not getting from inside the company.",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className="panel p-7 md:p-8 flex flex-col"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s ease-out',
        transitionDelay: `${index * 80}ms`,
        borderTopColor: service.accent,
        borderTopWidth: '2px',
      }}
    >
      <div className="flex justify-between items-baseline mb-6">
        <span className="font-mono text-[10px] text-fg/30">{service.id}</span>
        <span
          className="font-mono text-[10px] tracking-[0.2em] uppercase"
          style={{ color: service.accent }}
        >
          {service.duration}
        </span>
      </div>

      <h3
        className={`font-bebas leading-none mb-7 ${service.accentClass}`}
        style={{ fontSize: 'clamp(2.8rem, 4vw, 4.5rem)' }}
      >
        {service.name}
      </h3>

      <p className="font-body text-fg/60 text-sm leading-relaxed mb-6 flex-1">
        {service.description}
      </p>

      <p className="font-mono text-[10px] text-fg/35 leading-relaxed border-t border-fg/[0.08] pt-5 mt-auto">
        <span className="text-fg/20">Ideal for · </span>
        {service.ideal}
      </p>
    </div>
  );
}

export function Services() {
  const { ref, inView } = useInView(0.08);

  return (
    <section className="px-8 md:px-14 py-24 border-t border-fg/[0.07]">
      <div
        ref={ref}
        className="mb-14"
        style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.7s ease-out' }}
      >
        <p className="section-label">Ways of working</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {services.map((s, i) => (
          <ServiceCard key={s.id} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}
