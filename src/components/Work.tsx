import { useInView } from '../hooks/useInView';

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string | null;
  gradient: string;
  glow: string;
  stealth?: boolean;
}

const projects: Project[] = [
  {
    id: '01',
    name: 'Onix',
    category: 'Health AI · iOS',
    description:
      'Expert-trained AI health companions built on a privacy-first architecture. 16 renowned specialists encode their life\'s work, not public internet knowledge. Every conversation encrypted on-device, never leaving the user\'s vault.',
    url: 'https://onix.life',
    gradient: 'linear-gradient(135deg, #060f0e 0%, #0a2420 50%, #060f0e 100%)',
    glow: '#00C49A',
  },
  {
    id: '02',
    name: 'DolphinDocs',
    category: 'Legal AI · SaaS',
    description:
      'End-to-end legal document intelligence for law firms. AI generation, clause analysis, lawyer-vetted precedent library, and a full matter management workflow from first draft to executed agreement.',
    url: null,
    gradient: 'linear-gradient(135deg, #06090f 0%, #0a1228 50%, #06090f 100%)',
    glow: '#3D7EE8',
    stealth: true,
  },
  {
    id: '03',
    name: 'Wingman',
    category: 'Productivity AI · Web',
    description:
      'From prompt to polished presentation. AI-driven slide generation with real themes, real typography, audio visualization, and export. The full stack, not a demo.',
    url: 'https://github.com/meeglosh/Wingman',
    gradient: 'linear-gradient(135deg, #100800 0%, #241400 50%, #100800 100%)',
    glow: '#E8A020',
  },
  {
    id: '04',
    name: 'Woltspace',
    category: 'AI Infrastructure · Web',
    description:
      'Persistent workspaces for AI agents with memory, identity, and autonomy that survive across sessions. Designing for non-human collaborators: a new problem that required first-principles thinking.',
    url: 'https://woltspace.com',
    gradient: 'linear-gradient(135deg, #040509 0%, #08091a 50%, #040509 100%)',
    glow: '#6C4DFF',
  },
  {
    id: '05',
    name: 'Kooth / Soluna',
    category: 'Mental Health AI · iOS',
    description:
      'High-stakes UX where gentleness is a feature. Mental health support for young people, designed at the intersection of clinical rigor, safeguarding requirements, and human warmth.',
    url: null,
    gradient: 'linear-gradient(135deg, #080612 0%, #130e22 50%, #080612 100%)',
    glow: '#A78BFA',
  },
  {
    id: '06',
    name: 'Signal Desk Pro',
    category: 'Audio Tools · iOS',
    description:
      'Professional mix reference for producers and engineers. 12 console modes, 8 calibrated meters, speaker simulation, and export. The tools you need when you\'re away from the studio.',
    url: 'https://signaldeskpro.com',
    gradient: 'linear-gradient(135deg, #060606 0%, #111111 50%, #060606 100%)',
    glow: '#38BDF8',
  },
];

function ProjectImage({ gradient, glow }: { gradient: string; glow: string }) {
  return (
    <div
      className="w-full aspect-[16/9] relative overflow-hidden"
      style={{ background: gradient }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 55% at 38% 50%, ${glow}18 0%, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 35% 35% at 78% 22%, ${glow}0d 0%, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(${glow}60 1px, transparent 1px), linear-gradient(90deg, ${glow}60 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
        }}
      />
      <div className="absolute inset-0 border border-white/[0.04]" />
    </div>
  );
}

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="border-t border-parchment/[0.08] pt-8 pb-16 transition-all duration-700 ease-out"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${index * 40}ms`,
      }}
    >
      <div className="flex justify-between items-baseline mb-5">
        <span className="font-mono text-[10px] text-parchment/45">{project.id}</span>
        <span className="font-mono text-[10px] text-amber tracking-[0.2em] uppercase">
          {project.stealth ? `${project.category} · Stealth` : project.category}
        </span>
      </div>

      <h2 className="font-display font-light text-parchment leading-[0.88] text-[clamp(2.8rem,5.5vw,5.5rem)] mb-5">
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-link group"
          >
            {project.name}
            <span className="text-parchment/45 group-hover:text-amber transition-colors duration-300 arrow ml-2">
              ↗
            </span>
          </a>
        ) : (
          project.name
        )}
      </h2>

      <p className="font-body text-parchment/70 text-base md:text-[1.05rem] leading-relaxed max-w-2xl mb-10">
        {project.description}
      </p>

      <div
        className={`w-full md:w-[88%] ${isEven ? 'mr-auto' : 'ml-auto'}`}
      >
        <ProjectImage gradient={project.gradient} glow={project.glow} />
      </div>
    </div>
  );
}

export function Work() {
  const { ref, inView } = useInView();

  return (
    <section className="px-6 md:px-12 py-20">
      <div
        ref={ref}
        className="mb-14 transition-all duration-700"
        style={{ opacity: inView ? 1 : 0 }}
      >
        <p className="font-mono text-[10px] text-parchment/55 tracking-[0.25em] uppercase mb-5">
          Selected Work
        </p>
      </div>

      {projects.map((project, index) => (
        <ProjectItem key={project.id} project={project} index={index} />
      ))}
    </section>
  );
}
