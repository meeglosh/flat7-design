export type MediaItem =
  | { type: 'image'; src: string; alt: string }
  | { type: 'span'; images: Array<{ src: string; alt: string }> }
  | { type: 'video'; src: string }
  | { type: 'quotes'; eyebrow: string; heading: string; items: Array<{ quote: string; source: string }> }
  | { type: 'ideation'; eyebrow: string; heading: string; meta: string; cards: Array<{ text: string; selected?: boolean }> };

export interface CaseStudySection {
  heading?: string;
  subheading?: string;
  body?: string;
  list?: string[];
  bodyAfter?: string;
  highlight?: string;
  media?: MediaItem[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  company: string;
  role: string;
  subtitle: string;
  thumbnail: string;
  heroImage: string;
  intro?: string;
  sections: CaseStudySection[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'soluna',
    title: 'Soluna',
    company: 'Kooth Digital Health',
    role: 'Lead Product Designer, Embedded with Data Science',
    subtitle: 'AI-Powered Case Note Summaries',
    thumbnail: '/case-studies/img/thumbs/Kooth-thumb.jpg',
    heroImage: '/case-studies/img/soluna/01.jpg',
    sections: [
      {
        heading: 'Overview',
        body: "I was embedded within Kooth's Data Science team as part of a special cross-functional task force focused on improving clinical efficiency using emerging AI and LLM technologies. Working alongside a Lead UX Researcher, we partnered directly with clinicians, clinical leadership, and service delivery teams to target the most time-intensive friction in practitioner workflows.",
      },
      {
        heading: 'The Problem',
        body: 'Practitioners were spending significant time preparing for each coaching session by manually searching for relevant context across multiple internal tools and documents. This fragmented workflow reduced efficiency and made it harder to consistently arrive fully prepared for live sessions with young service users.',
        media: [
          {
            type: 'quotes',
            eyebrow: 'Review Research',
            heading: 'Quotes on SU history review',
            items: [
              { quote: "People nowadays are used to a quick response and when we don't respond as quickly as possible, they disengage.", source: 'Peer support specialist' },
              { quote: 'For drop ins, it’s harder to reference old chats while still trying to be engaged.', source: 'Peer support specialist' },
              { quote: 'We have 10 seconds to assess what happened last time.', source: 'Peer support specialist' },
              { quote: 'I do kind of a pre-screen of everyone I have on the schedule for the day… you can see old chats, messages that have been sent, goals, journaling, I always review that stuff prior to a visit.', source: 'Licensed counselor' },
            ],
          },
        ],
      },
      {
        heading: 'The Opportunity',
        body: 'Through clinician and stakeholder interviews, we identified pre-session preparation as the highest-impact opportunity for AI assistance. After multiple ideation rounds, we aligned on a focused solution: Automatically generated case note summaries available ahead of each session.',
        highlight: 'This directly addressed the largest time sink while preserving clinical oversight and safety.',
        media: [
          {
            type: 'ideation',
            eyebrow: 'Ideation',
            heading: 'How might we make the practitioner well prepared for a chat, in 30 seconds or less?',
            meta: '10 ideas · 2 selected for exploration',
            cards: [
              { text: 'Also include list of previous coaches, so the next one can contact them to share info/ideas' },
              { text: 'Quick reference “face sheet” with all pertinent info available at a glance', selected: true },
              { text: 'Improved SU profile inclusive of risk profile, presenting issues, etc. (snapshot)' },
              { text: 'AI chat summary created' },
              { text: 'Sentiment analysis of previous chats to get an idea of the user’s mood and concerns' },
              { text: 'Key themes as a word cloud sized by frequency' },
              { text: 'Data-summary dashboard that is scannable' },
              { text: 'Bring all user data to one screen: usage, demographics, sessions, risk flags, goals, chat summary', selected: true },
              { text: 'Previous case note summaries by LLMs (with feedback)' },
              { text: 'Key themes from past chats, content, tools, etc. for each SU' },
            ],
          },
        ],
      },
      {
        heading: 'My Role & Design Focus',
        body: 'I led product design across discovery, concepting, and prototyping in close partnership with data science and research. Core design challenges included:',
        list: [
          'Defining what clinical data could be safely summarized by AI',
          'Designing for trust, accuracy, and ethical use',
          'Highlighting critical context such as PII, risk indicators, and presenting issues',
          'Building in human review and safeguards',
          'Creating a workflow that felt supportive rather than intrusive',
        ],
        bodyAfter: 'We iterated through multiple prototype cycles with regular stakeholder reviews and company-wide demos.',
        media: [{ type: 'image', src: '/case-studies/img/soluna/04.jpg', alt: 'SU summary explorations' }],
      },
      {
        heading: 'Outcome & Impact',
        body: 'The final concept was approved for development and is currently in build. Projected impact includes:',
        list: [
          '10–15 minutes saved per session, per practitioner',
          'Multiple hours recovered each week across active clinicians',
          'Scalable annual efficiency gains across hundreds of practitioners',
          "Improved session readiness and continuity of care for Soluna's 13–25-year-old users in California",
        ],
        highlight: 'Beyond efficiency, the system is designed to elevate care quality by freeing clinicians from administrative overhead and allowing them to focus fully on their clients.',
        media: [
          { type: 'image', src: '/case-studies/img/soluna/07.jpg', alt: 'SU Summary' },
          { type: 'video', src: '/case-studies/img/soluna/SUsummaries.mp4' },
        ],
      },
      {
        heading: 'Why This Matters',
        body: 'This project exemplifies my approach to AI-driven product design in regulated, human-centered environments: pairing technical possibility with ethical responsibility, clinical trust, and measurable operational impact.',
        media: [{ type: 'image', src: '/case-studies/img/soluna/06.jpg', alt: 'Soluna billboard' }],
      },
    ],
  },

  {
    slug: 'flashtract',
    title: 'Flashtract',
    company: 'Flashtract',
    role: 'Director of Product Experience Design',
    subtitle: 'Modernizing Billing and Document Workflows in Commercial Construction',
    thumbnail: '/case-studies/img/thumbs/Flashtract-thumb.jpg',
    heroImage: '/case-studies/img/flashtract/01.jpg',
    sections: [
      {
        heading: 'Understanding the Landscape',
        body: 'Commercial construction billing is notoriously tangled. Every month, general contractors, subcontractors, and vendors wrestle with incomplete paperwork, unclear requirements, slow approvals, and long chains of accountability. To ground ourselves in the reality of this workflow, our team met directly with users across multiple tiers of the supply chain. We listened as they walked us through their routines, pain points, and workarounds, and paired those conversations with stakeholder interviews and a close read of market dynamics. The goal was simple: understand the truth of their day-to-day so we could build something that actually helps.',
      },
      {
        heading: 'Clarifying the Core Problem',
        body: 'The themes were consistent. Billing and document collection were slow, opaque, and error-prone. Teams struggled to see where things were stuck, who owed what, and whether everyone was working from the right version of a document. The sheer amount of manual tracking created friction across the entire chain, leaving room for costly delays and miscommunication.',
        media: [{ type: 'image', src: '/case-studies/img/flashtract/02.jpg', alt: 'Flashtract sketchpad ideas' }],
      },
      {
        heading: 'Designing a Better Way',
        body: 'With those insights in hand, we set out to simplify the experience without oversimplifying the work. We rebuilt the billing and document workflows around clarity, transparency, and ease of use. This included streamlined onboarding, smarter guardrails for compliance, clearer communication paths, and a modern reporting layer that let teams quickly understand the status of each project. The design system supporting all of this was intentionally modular so we could scale and adapt quickly as the product grew.',
        media: [{ type: 'image', src: '/case-studies/img/flashtract/03.jpg', alt: 'Flashtract BI Dashboard' }],
      },
      {
        heading: 'Building Through Iteration',
        body: 'Everything was shaped through constant feedback loops. We prototyped early and often, testing flows with real users to make sure our solutions mapped to reality. Parallel to this, we worked closely with the front end team to create a stronger handoff rhythm. Tools like Figma and Chromatic helped us build a design QA layer into the process so every component was reviewed before it ever hit the codebase.',
        highlight: 'What designers delivered and what engineers built stayed consistently in sync.',
        media: [
          { type: 'image', src: '/case-studies/img/flashtract/04.jpg', alt: 'Flashtract vault screen 1' },
          { type: 'image', src: '/case-studies/img/flashtract/05.jpg', alt: 'Flashtract vault screen 2' },
        ],
      },
      {
        heading: 'The Result',
        body: 'The final product replaced manual, disconnected workflows with a clear, unified system that gave contractors and vendors a shared source of truth. Billing cycles became faster and more predictable. Communication improved. Errors dropped. And because the platform was built on a strong, scalable design system, Flashtract was able to grow quickly without reinventing patterns at every turn.',
        media: [{ type: 'image', src: '/case-studies/img/flashtract/06.jpg', alt: 'Flashpay marketing site' }],
      },
      {
        heading: 'My Role',
        body: 'As Director of Product Experience Design, I guided the vision, research, and execution of this work, partnering closely with product, engineering, and leadership. The mission was to bring clarity to one of the most complex corners of construction operations, and every decision, from workflow to component design, moved us closer to that goal.',
      },
    ],
  },

  {
    slug: 'renorun',
    title: 'RenoRun',
    company: 'RenoRun',
    role: 'Head of Design',
    subtitle: 'The DoorDashification of Construction Materials',
    thumbnail: '/case-studies/img/thumbs/RenoRun-thumb.jpg',
    heroImage: '/case-studies/img/renorun/01.jpg',
    sections: [
      {
        heading: 'Understanding the Landscape',
        body: 'Construction sites run on tight timelines. When materials are missing or delayed, everything grinds to a halt. To understand the daily pressure behind these moments, our team spent time listening to contractors, site supers, and delivery crews. We asked them to walk us through real situations, the shortcuts they rely on, and the stress points that cost them time and money. We paired these conversations with stakeholder interviews and a close look at market conditions to get a full picture of the procurement challenges facing modern job sites.',
        media: [{ type: 'image', src: '/case-studies/img/renorun/02.jpg', alt: 'RenoRun research' }],
      },
      {
        heading: 'The Real Problem',
        body: 'The bottleneck was not simply procurement. It was the unpredictability around it. Forgotten materials, last minute changes, and supply chain blind spots created regular moments of panic on site. Teams often described the same scene: everything is on schedule until someone realizes the wrong item arrived, or a crucial part was never ordered. That one oversight can send an entire crew home early. The core issue was speed, communication, and accountability across the chain, not just the transaction itself.',
        media: [{ type: 'image', src: '/case-studies/img/renorun/03.jpg', alt: 'RenoRun research' }],
      },
      {
        heading: 'Designing a Better Way to Get Materials',
        body: 'With this understanding, we set out to build a user-centered solution that mirrored real life on job sites. We created a modern e-commerce experience tailored for construction, paired with a get-it-today delivery model that let teams recover quickly from those stressful moments. We also built a split shipment system that let customers track what was coming now, what was coming later, and why. The goal was to replace guesswork with clarity and to let busy crews see the status of every order at a glance.',
        media: [
          {
            type: 'span',
            images: [
              { src: '/case-studies/img/renorun/04.jpg', alt: 'RenoRun homepage' },
              { src: '/case-studies/img/renorun/05.jpg', alt: 'RenoRun product list' },
              { src: '/case-studies/img/renorun/06.jpg', alt: 'RenoRun product detail' },
            ],
          },
          { type: 'video', src: '/case-studies/img/renorun/SS_v2.1.mp4' },
        ],
      },
      {
        heading: 'Building Through Continuous Feedback',
        body: 'The product evolved through constant testing and iteration. We worked closely with internal teams, long-time customers, and new users to refine flows and remove friction. On the engineering side, we established a healthy rhythm of collaboration so design intent carried through to implementation. A shared design system kept everything consistent, scalable, and easier to maintain as the product and team grew.',
        media: [{ type: 'image', src: '/case-studies/img/renorun/08.jpg', alt: 'RenoRun delivery van' }],
      },
      {
        heading: 'My Role and the Outcome',
        body: 'As Head of Design, I shaped the vision, led the research and design efforts, and built the design team that supported RenoRun as it scaled through a $142M Series B raise. I hired and mentored a talented group of designers and researchers who helped turn a fast-moving startup into a more mature, customer-centered product organization. The end result was a procurement experience that brought speed, clarity, and confidence to job sites, giving construction crews back the time and momentum they need to keep projects moving.',
        media: [{ type: 'image', src: '/case-studies/img/renorun/09.jpg', alt: 'RenoRun on Times Square' }],
      },
    ],
  },

  {
    slug: 'decathlon',
    title: 'Decathlon Community',
    company: 'Decathlon',
    role: 'Lead Product Designer',
    subtitle: 'Helping People Stay Active and Connected During a Global Pandemic',
    thumbnail: '/case-studies/img/thumbs/Decathlon-thumb.jpg',
    heroImage: '/case-studies/img/decathlon/01.jpg',
    sections: [
      {
        heading: 'Framing the Challenge',
        body: 'When the pandemic hit, daily life shrank almost overnight. Gyms closed. Group classes vanished. The social and physical rituals that kept people moving simply stopped. Decathlon asked a straightforward but urgent question: how do we help people stay active, healthy, and connected when the world has gone indoors? Decathlon Community was created as an answer to that moment.',
        media: [{ type: 'image', src: '/case-studies/img/decathlon/dancers.jpg', alt: 'Decathlon community' }],
      },
      {
        heading: 'Understanding What People Needed',
        body: 'To build the right solution, we spent time listening to both sides of the ecosystem. Coaches, trainers, gym owners, and independent fitness professionals told us about losing their income, their communities, and their ability to motivate people in person. At the same time, everyday users were searching for ways to stay active and sane while stuck at home. These conversations shaped our personas and guided early concepts. We tested interactive wireframes with at least five users in each segment to make sure we were designing for real needs instead of assumptions.',
        media: [{ type: 'image', src: '/case-studies/img/decathlon/03.jpg', alt: 'Decathlon research' }],
      },
      {
        heading: 'Designing the Experience',
        body: 'Once our wireframes proved out, we moved into higher fidelity prototypes and repeated the same cycle: test, refine, test again. The goal was to make the entire flow of discovering a local activity, booking a session, and checking out feel simple and effortless. We worked closely with a highly engaged engineering team, many of whom were athletes themselves, to ensure that the product shipped with the same clarity and energy found in the prototypes. After launch, key metrics like retention and revenue began trending steadily upward, validating the focus on simplicity and clarity.',
        media: [
          {
            type: 'span',
            images: [
              { src: '/case-studies/img/decathlon/04.jpg', alt: 'Decathlon app screens' },
              { src: '/case-studies/img/decathlon/05.jpg', alt: 'Decathlon app screens' },
              { src: '/case-studies/img/decathlon/07.jpg', alt: 'Decathlon app screens' },
            ],
          },
          { type: 'video', src: '/case-studies/img/decathlon/Activity_booking_flow.mp4' },
        ],
      },
      {
        heading: 'Creating Value for Both Sides',
        body: 'Decathlon Community did more than help people stay active. It gave fitness professionals a way to keep working during a period when gyms were closed and in-person sessions were cancelled. At a time when many in the fitness industry were struggling, the platform created a new channel for income, visibility, and community building. For users, it became a dependable and intuitive hub for discovering local sports and staying connected through movement.',
        media: [{ type: 'image', src: '/case-studies/img/decathlon/09.png', alt: 'Decathlon platform' }],
      },
      {
        heading: 'Lasting Impact',
        body: 'The platform filled a gap during one of the most disruptive periods in modern memory. It reconnected people to their bodies, their routines, and their communities, even when physical distance was non-negotiable. Decathlon Community proved that thoughtful design, grounded in real user needs, can create meaningful impact even during the most challenging conditions.',
        media: [{ type: 'image', src: '/case-studies/img/decathlon/10.png', alt: 'Decathlon impact' }],
      },
    ],
  },

  {
    slug: 'estateably',
    title: 'Estateably',
    company: 'Estateably',
    role: 'Director of Design',
    subtitle: 'Rebuilding Estate Settlement for the Digital Age',
    thumbnail: '/case-studies/img/thumbs/Estateably-thumb.jpg',
    heroImage: '/case-studies/img/estateably/e00.jpg',
    intro:
      'Estateably remains one of the most complex and ambitious platforms I have had the opportunity to design. The goal was nothing short of a full digital transformation of the estate settlement process — one of the most fragmented, manual, and emotionally charged workflows that exist. The platform set out to connect financial institutions, telecom providers, government agencies, legal professionals, and grieving families through a secure, compliant blockchain-powered network. The vision demanded radical improvements in transparency, security, regulatory compliance, and settlement speed, all while supporting people navigating deeply personal life events.',
    sections: [
      {
        heading: 'Establishing an Early Direction',
        body: 'Before formal interviews began, I conducted an initial wireframing pass based on early stakeholder requirements and business objectives. This helped frame the problem space quickly and gave leadership something tangible to react to. These early concepts acted as a starting point for deeper validation rather than a final direction.',
        media: [{ type: 'image', src: '/case-studies/img/estateably/e04.jpg', alt: 'Estateably early wireframes' }],
      },
      {
        heading: 'Eighty Hours in the Trenches',
        body: 'We then spent more than eighty hours interviewing professional estate agents and service providers to truly understand how estate settlement works in practice. These interviews exposed the realities behind the paperwork: handoffs across institutions, repetitive document collection, unclear ownership, and constant delays. As patterns emerged, the early wireframes evolved into far more detailed and realistic flows. We tested these with users as quickly as possible, iterating continuously based on feedback.\n\nAt the same time, we built a detailed process chart to map how data and documents moved through the system. Gaining a deep understanding of the existing workflow was essential before attempting to redesign it. To help align internal teams and external stakeholders, we distilled the complexity into a clear, easy-to-digest infographic that visualized the future network and how its participants would interact.',
        media: [
          {
            type: 'span',
            images: [
              { src: '/case-studies/img/estateably/e01.jpg', alt: 'Estateably research' },
              { src: '/case-studies/img/estateably/e02.jpg', alt: 'Estateably research' },
            ],
          },
        ],
      },
      {
        heading: 'Mid Fidelity Validation',
        body: 'Once the research was fully synthesized, we created an interactive mid fidelity prototype and placed it back into the hands of prospective users. This allowed us to validate core usability, identify points of friction, and pressure-test the end-to-end experience. These sessions led to several meaningful refinements before any visual polish was applied.',
        media: [{ type: 'image', src: '/case-studies/img/estateably/e06.jpg', alt: 'Estateably mid-fidelity prototype' }],
      },
      {
        heading: 'Moving into High Fidelity',
        body: 'After usability and core business requirements were validated, the product moved into high fidelity design. This phase focused on visual hierarchy, accessibility, trust signaling, and consistency across a rapidly expanding platform. The challenge here was balancing technical depth with clarity for users who were often navigating the product under stressful conditions.',
        media: [
          {
            type: 'span',
            images: [
              { src: '/case-studies/img/estateably/e08.jpg', alt: 'Estateably high fidelity' },
              { src: '/case-studies/img/estateably/e11.jpg', alt: 'Estateably high fidelity' },
              { src: '/case-studies/img/estateably/e12.jpg', alt: 'Estateably high fidelity' },
              { src: '/case-studies/img/estateably/e13.jpg', alt: 'Estateably high fidelity' },
              { src: '/case-studies/img/estateably/e14.jpg', alt: 'Estateably high fidelity' },
              { src: '/case-studies/img/estateably/e15.jpg', alt: 'Estateably high fidelity' },
            ],
          },
        ],
      },
      {
        heading: 'Expanding the Platform',
        subheading: 'Beneficiary Concierge',
        body: 'In addition to the professional settlement dashboard, we introduced a consumer-facing Beneficiary Concierge. This experience gave executors and beneficiaries real-time visibility into the progress of estates in which they were involved. For many users, this was the first time they had clear, direct insight into a process that traditionally felt opaque and inaccessible.',
        media: [{ type: 'image', src: '/case-studies/img/estateably/e09.jpg', alt: 'Estateably Beneficiary Concierge' }],
      },
      {
        subheading: 'Lifebook',
        body: 'We also designed Lifebook, a pre-death planning module that allowed individuals to organize their affairs in advance. This included inventory management, account documentation, password storage, and key personal records. The goal was to reduce the burden placed on families during already difficult moments.',
        media: [{ type: 'image', src: '/case-studies/img/estateably/e10.jpg', alt: 'Estateably Lifebook' }],
      },
      {
        subheading: 'CRA Dashboard',
        body: 'To support government integration, a dedicated dashboard was created for agents at the Canada Revenue Agency. This tool allowed estate files to be processed directly within Estateably, with specialized tools for approval, rejection, and audit flagging — all within a secure and compliant environment.',
        media: [
          {
            type: 'span',
            images: [
              { src: '/case-studies/img/estateably/e16.jpg', alt: 'CRA processes' },
              { src: '/case-studies/img/estateably/e17.jpg', alt: 'CRA dashboard' },
            ],
          },
        ],
      },
      {
        subheading: 'Supporting the Go-To-Market Effort',
        body: 'In parallel with the product work, branded tradeshow banners and supporting marketing assets were also designed to help position Estateably at industry events and communicate its vision to partners and regulators.',
        media: [{ type: 'image', src: '/case-studies/img/estateably/e18.jpg', alt: 'Estateably banners' }],
      },
      {
        subheading: 'Outcome',
        body: 'Estateably emerged as a multi-sided, highly regulated platform that replaced slow, paper-based processes with a secure, transparent digital ecosystem. By deeply understanding the existing workflow and carefully rebuilding it from the ground up, the platform created meaningful improvements in speed, accountability, and user trust across every participant in the estate settlement journey.\n\nToday, Estateably is trusted by more than 1,000 professional firms and continues to scale across North America. In Canada, the platform is available in all provinces. In the United States, Estateably is now live in Arizona, California, Colorado, Georgia, Illinois, Nevada, New Jersey, New York, North Carolina, Pennsylvania, South Carolina, and Texas.',
      },
    ],
  },

  {
    slug: 'bandsintown',
    title: 'Bandsintown for Artists',
    company: 'Bandsintown',
    role: 'Senior Product Designer',
    subtitle: 'Getting Warm Bodies Into Concert Venues',
    thumbnail: '/case-studies/img/thumbs/BIT-thumb.jpg',
    heroImage: '/case-studies/img/bandsintown/01.jpg',
    sections: [
      {
        heading: 'The Challenge',
        body: 'Bandsintown already had a massive audience for live music discovery, but artists and managers had to promote shows through a clunky Facebook-based interface that felt outdated, confusing, and totally disconnected from how modern music professionals work. It created friction where there should have been momentum. The brief was clear: take that old experience and turn it into a standalone, artist-first platform that actually helps musicians promote shows, build audiences, and sell tickets.',
        media: [{ type: 'image', src: '/case-studies/img/bandsintown/02.jpg', alt: 'Bandsintown research' }],
      },
      {
        heading: 'Listening to the People Behind the Music',
        body: 'As a former major label artist who spent years on the road, I came in with firsthand knowledge of the pain points: juggling tour logistics, engaging fans, managing constant administrative tasks, and doing all of it with limited tools. That perspective helped the team quickly define realistic personas and understand what mattered most. We then expanded the research with interviews across managers, agents, indie artists, and touring pros to capture a 360-degree view. Once we had a solid foundation, we moved into interactive wireframes and put them in front of real users, refining the flow until it felt effortless.',
        media: [{ type: 'image', src: '/case-studies/img/bandsintown/03.jpg', alt: 'Bandsintown research' }],
      },
      {
        heading: 'Designing the New Bandsintown Manager',
        body: 'With validated wireframes in place, we moved through high fidelity designs and built interactive prototypes for another round of testing. The goal was simple: give artists and managers a clean, intuitive front end for promoting shows and connecting with fans, and remove every piece of friction from the old Facebook experience. We crafted a fully responsive web app tailored for professionals across the industry. I partnered closely with engineering during handoff, even jumping in with CSS contributions where needed. We also created a smooth migration path so existing Bandsintown artists could move their data over without losing their history or their momentum.',
        media: [
          {
            type: 'span',
            images: [
              { src: '/case-studies/img/bandsintown/04.jpg', alt: 'Bandsintown manager screens' },
              { src: '/case-studies/img/bandsintown/05.jpg', alt: 'Bandsintown manager screens' },
            ],
          },
        ],
      },
      {
        heading: 'The Impact',
        body: 'When the new Bandsintown Manager launched, the numbers painted a very clear picture:',
        list: [
          'The user base grew from 40 million to 60 million',
          'Manager accounts jumped from 320,000 to 540,000',
          'Artist-to-fan engagement increased tenfold',
          'Ticket sales per concert rose an average of twelve to thirty percent',
          'Early adopters of the redesign included Sir Paul McCartney and Taylor Swift',
        ],
        bodyAfter: 'This was the kind of impact that reminded all of us why the work mattered.',
        highlight: 'Better tools lead to better shows, stronger communities, and fuller venues.',
        media: [
          {
            type: 'span',
            images: [
              { src: '/case-studies/img/bandsintown/06.jpg', alt: 'Bandsintown impact' },
              { src: '/case-studies/img/bandsintown/07.jpg', alt: 'Bandsintown impact' },
            ],
          },
        ],
      },
      {
        heading: 'Conclusion',
        body: "The redesigned Bandsintown Manager became a powerful, standalone hub for artists, managers, agents, and industry professionals to promote their concerts and grow their audiences. It replaced a clumsy, outdated workflow with a focused, intuitive experience that helped real musicians reach real fans in a real way. And it proved that when design deeply understands the people it serves, everybody wins.",
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find(cs => cs.slug === slug);
}
