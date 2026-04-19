import { useInView } from '../hooks/useInView';

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string | null;
  accent: string;
  stealth?: boolean;
}

const projects: Project[] = [
  {
    id: '01',
    name: 'Onix',
    category: 'Health AI · iOS',
    description:
      "Expert-trained AI health companions built on a privacy-first architecture. 16 renowned specialists encode their life's work, not public internet knowledge. Every conversation encrypted on-device, never leaving the user's vault.",
    url: 'https://onix.life',
    accent: '#FF3D5A',
  },
  {
    id: '02',
    name: 'Kooth / Soluna',
    category: 'Mental Health AI · iOS',
    description:
      'High-stakes UX where gentleness is a feature. Mental health support for young people, designed at the intersection of clinical rigor, safeguarding requirements, and human warmth.',
    url: 'https://solunaapp.com',
    accent: '#00C8FF',
  },
  {
    id: '03',
    name: 'Wingman',
    category: 'Productivity AI · Web',
    description:
      'From prompt to polished presentation. AI-driven slide generation with real themes, real typography, audio visualization, and export. The full stack, not a demo.',
    url: 'https://wingman.design',
    accent: '#A8FF3E',
  },
  {
    id: '04',
    name: 'Woltspace',
    category: 'AI Infrastructure · Web',
    description:
      'Persistent workspaces for AI agents with memory, identity, and autonomy that survive across sessions. Designing for non-human collaborators: a new problem that required first-principles thinking.',
    url: 'https://woltspace.com',
    accent: '#FF3D5A',
  },
  {
    id: '06',
    name: 'Signal Desk Pro',
    category: 'Audio Tools · iOS',
    description:
      "Professional mix reference for producers and engineers. 12 console modes, 8 calibrated meters, speaker simulation, and export. The tools you need when you're away from the studio.",
    url: 'https://signaldeskpro.com',
    accent: '#A8FF3E',
  },
  {
    id: '07',
    name: 'Decathlon',
    category: 'E-Commerce · Web & App',
    description:
      'Large-scale retail UX for one of the world\'s biggest sports brands. Designing accessible gear discovery across 15+ sport categories for millions of recreational athletes at every skill level.',
    url: 'https://www.decathlon.ca/en',
    accent: '#00C8FF',
  },
  {
    id: '08',
    name: 'Hololabs',
    category: 'Spatial Computing · AR/VR',
    description:
      'Immersive experience design for entertainment venues and theme parks. UX that lives beyond the screen  -  spatial, embodied, and physical-first interaction design.',
    url: 'https://hololabs.org/',
    accent: '#FF3D5A',
  },
  {
    id: '09',
    name: 'Bandsintown',
    category: 'Music Tech · Web',
    description:
      'Tour promotion and fan engagement tools for 700,000+ artists. Streamlining complex multi-platform logistics  -  ticketing, fan outreach, tour dates  -  into a single coherent workflow.',
    url: 'https://www.artist.bandsintown.com/',
    accent: '#A8FF3E',
  },
  {
    id: '10',
    name: 'Flashtract',
    category: 'Construction Tech · Web',
    description:
      'Billing and payment automation for the construction industry. Designing for highly regulated, multi-party financial workflows where the stakes are compliance, not convenience.',
    url: 'https://flashtract.com/',
    accent: '#FF3D5A',
  },
  {
    id: '11',
    name: 'Estateably',
    category: 'LegalTech · Web',
    description:
      'Estate and trust administration for attorneys and CPAs. 3,000+ jurisdiction-specific forms, fiduciary accounting, and compliance  -  designed for specialists navigating high-stakes legal and tax requirements.',
    url: 'https://www.estateably.com/',
    accent: '#00C8FF',
  },
];

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className="border-t border-fg/[0.07] pt-8 pb-12 relative group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s ease-out',
        transitionDelay: `${(index % 2) * 60}ms`,
      }}
    >
      <div className="flex justify-between items-baseline mb-4">
        <span className="font-mono text-[10px] text-fg/30">{project.id}</span>
        <span
          className="font-mono text-[10px] tracking-[0.2em] uppercase"
          style={{ color: project.accent }}
        >
          {project.stealth ? `${project.category} · Stealth` : project.category}
        </span>
      </div>

      <h2
        className="font-bebas text-fg leading-none mb-5 group-hover:text-fg/80 transition-colors duration-300"
        style={{ fontSize: 'clamp(3rem, 5.5vw, 6rem)' }}
      >
        {project.url ? (
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {project.name}
            <span style={{ color: project.accent }} className="ml-2 text-[0.5em] align-middle">↗</span>
          </a>
        ) : project.name}
      </h2>

      <p className="font-body text-fg/55 text-sm md:text-base leading-relaxed max-w-2xl">
        {project.description}
      </p>

      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ background: project.accent, opacity: 0.3 }}
      />
    </div>
  );
}

export function Work() {
  const { ref, inView } = useInView();

  return (
    <section className="px-8 md:px-14 py-24" id="work">
      <div
        ref={ref}
        className="mb-14"
        style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.7s ease-out' }}
      >
        <p className="section-label">Selected Work</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
        {projects.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
