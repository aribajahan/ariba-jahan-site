// Content data for the Work With Me page, extracted from
// design-reference/work-with-me.dc.html and design-reference/site-content.md.

export type TrustedByLogo = { src: string; alt: string; heightPx: number };

import wwmTrustedByLogosData from "../../content/collections/wwm-trusted-by.json";

export const wwmTrustedByLogos: TrustedByLogo[] = wwmTrustedByLogosData;

export type ProblemCard = {
  photoSrc: string;
  title: string;
  description: string;
};

import wwmContentForOffers from "../../content/pages/work-with-me.json";

export const problemCards: ProblemCard[] = wwmContentForOffers.problemFraming.cards;

export const cxSprintFitPoints: string[] = wwmContentForOffers.cxSprint.fitPoints;

export type SprintDeliverable = { title: string; description: string };

export const cxSprintDeliverables: SprintDeliverable[] = wwmContentForOffers.cxSprint.deliverables;

export type SprintWeek = { title: string; description: string };

export const cxSprintWeeks: SprintWeek[] = wwmContentForOffers.cxSprint.weeks;

export const strategySessionBestFor: string[] = wwmContentForOffers.strategySessions.bestFor;

export { type Testimonial as WwmTestimonial } from "./testimonials";
import { testimonialsFor } from "./testimonials";

export const wwmTestimonials = testimonialsFor("work-with-me");

export type CaseStudyTestimonial = { quote: string; name: string; role: string };

export type CaseStudy = {
  tagRotationDeg: number;
  photoSrc: string;
  client: string;
  title: string;
  summary: string;
  pills: string[];
  challenge: string;
  solution: string;
  impact: string;
  roleContext: string;
  testimonial?: CaseStudyTestimonial;
};

export const caseStudies: CaseStudy[] = [
  {
    tagRotationDeg: -3,
    photoSrc: "/assets/wwm-case-1.jpg",
    client: "Ally",
    title: "Turning everyday banking into a reason to come back",
    summary:
      "Rethinking how a banking app could create more value towards customers financial goals between transactions, without relying on dark patterns.",
    pills: ["Behavioral Design", "App Utility", "Retention Strategy", "Gamification Design"],
    challenge:
      "In a highly competitive digital banking market, Ally wanted to deepen customer engagement inside the app without relying on superficial tactics or competing on rates alone. The original ask centered on badging, but the bigger question was how to create more value between transactions in a way that could build real loyalty over time.",
    solution:
      "The work reframed the problem from “how do we make badges better?” to “what would make people want to come back in the first place?” From there, the team developed an engagement strategy built around real financial behaviors, meaningful progress, and a stronger role for Ally in customers' everyday financial lives.",
    impact:
      "The result was a clearer strategic direction, a set of experience concepts, and an MVP path the product team could use to align leadership and build toward a more engaging, higher-value customer relationship.",
    roleContext: "Head of CX Transformation at Anomaly | Led cross-disciplinary teams across CX strategy & design",
    testimonial: {
      quote:
        "Ariba was an incredible partner as our teams collaborated and co-created on a strategy for deepening customer relationships within the Ally app. She helped us think in terms of how to bring real customer value in a space that is often purely transactional, delivering exciting concepts my team could pick up and run with.",
      name: "Rich Barrett",
      role: "Director of UX Design, Ally Bank",
    },
  },
  {
    tagRotationDeg: 2,
    photoSrc: "/assets/wwm-case-2.jpg",
    client: "WeightWatchers",
    title: "Reimagining WeightWatchers for a more adaptive, everyday relationship",
    summary:
      "Exploring how an iconic brand could evolve beyond legacy expectations into a more adaptive, everyday digital experience.",
    pills: ["User Journey Development", "Category Intelligence", "Product Design Concepts", "Growth Framework"],
    challenge:
      "In an overcrowded wellness market full of fragmented promises and short-term fixes, WeightWatchers needed a stronger answer to a harder question: how could the product evolve beyond legacy expectations and become more useful, adaptive, and relevant in people's everyday lives?",
    solution:
      "The work reframed the experience around a broader idea of progress, with concepts for adaptive onboarding, more personalized pacing, and a product experience that could respond better to different life stages, goals, and rhythms. It also included a deep look at the competitive landscape and the kinds of experiences shaping expectations across the category.",
    impact:
      "The result was a deep 150+ page competitive ecosystem audit, a clearer Experience-Led Growth opportunity, and a CX strategy framework and 10+ ownable concepts WeightWatchers could use across onboarding, dashboard, curriculum, and the wider product experience.",
    roleContext: "Head of CX Transformation at Anomaly | Led cross-disciplinary teams across CX strategy & design",
    testimonial: {
      quote:
        "Ariba's superpower is her curiosity and ability to connect emerging technologies with creative opportunities. She excels at understanding how new technologies can be applied in meaningful, innovative ways to create better customer and business outcomes.",
      name: "Lauren Lavalle",
      role: "Chief Client Officer, Anomaly",
    },
  },
  {
    tagRotationDeg: -2,
    photoSrc: "/assets/wwm-case-study-3.jpg",
    client: "Stagwell Marketing Cloud & The Harris Poll",
    title: "Shaping an enterprise AI research product from strategy to prototype",
    summary:
      "Working from enterprise user research through product strategy, positioning, GTM and prototype development for a new AI-native research platform.",
    pills: ["AI Product Strategy & Positioning", "Concept Prototyping", "Enterprise User Research", "Production-Ready UI/UX"],
    challenge:
      "In a fast-moving market, the team needed to validate enterprise demand, define a clearer competitive edge, and make the case for why this platform would matter to researchers and creatives in practice.",
    solution:
      "The work started with qualitative research with enterprise prospects to understand workflow needs, friction points, and what would make the platform genuinely useful. From there, the product strategy, value proposition, and competitive moat were developed in close partnership with a product manager, designer, data engineers, and other cross-functional collaborators, alongside a high-fidelity prototype and funding narrative.",
    impact:
      "The work helped secure funding, sharpened the platform's enterprise positioning, and gave the team a stronger foundation for building an AI-native research product with a clear point of view on where it could win.",
    roleContext: "Head of CX Transformation at Anomaly | Led cross-disciplinary teams across CX strategy & design",
    testimonial: {
      quote:
        "I worked with Ariba on an enterprise AI SaaS platform for researchers and creatives, from research through product strategy, user testing, and go-to-market. She could sit with potential customers, pull out what they actually needed, and turn it into a product direction. Customers, engineers, and executives all trusted her judgment.",
      name: "Mansoor Basha",
      role: "CTO, Stagwell Marketing Cloud",
    },
  },
  {
    tagRotationDeg: 3,
    photoSrc: "/assets/wwm-case-4.jpg",
    client: "Global Tech & E-Commerce Leader",
    title: "Designing a more human ecommerce experience with AI built in",
    summary:
      "Exploring how generative AI could support creator-led commerce in a way that felt intuitive, useful, and native to the shopping experience.",
    pills: ["AI Experience Design", "Product Strategy", "Retail Innovation", "Online Stream Experience Design"],
    challenge:
      "The opportunity wasn't just to add AI to the shopping journey, but to make it improve discovery in a way that still felt intuitive, trustworthy, and native to how people already shop. The challenge was finding a role for generative AI that added real value without making the experience feel forced, overly technical, or disconnected from consumer behavior.",
    solution:
      "The work shaped an end-to-end experience strategy that combined creator-led inspiration, conversational AI, virtual try-on, and seamless checkout into a more connected discovery journey. The goal was to make AI feel additive to the shopping experience rather than bolted onto it.",
    impact:
      "The result was a flagship AI-native retail concept and strategic narrative that helped secure executive buy-in and internal funding for a new kind of shopping experience.",
    roleContext: "Head of CX Transformation at Anomaly | Led cross-disciplinary teams across CX strategy & design",
  },
  {
    tagRotationDeg: -3,
    photoSrc: "/assets/wwm-case-5.jpg",
    client: "Ad Council & Huntsman Mental Health Institute",
    title: "Co-designing a more inclusive digital foundation for mental health",
    summary:
      "Working directly with communities to shape the digital experience for a $65M national mental health campaign to feel relevant, safe, and valuable.",
    pills: ["Participatory Co-Design", "Inclusive UX", "Behavioral Research", "Experience Architecture"],
    challenge:
      "Traditional public health experiences often rely on language, assumptions, and entry points that don't reflect how people actually talk about their lives or seek support. For this work, the challenge was building something that could resonate more deeply with Black and Hispanic men who are often underserved by digital mental health resources.",
    solution:
      "The work centered on participatory co-design with Black and Hispanic adult men to better understand coping behaviors, language, needs, and what would make a digital experience feel more welcoming and relevant. Those insights were translated into the experience architecture, interaction model, and strategic direction for the platform.",
    impact:
      "The result was a user-informed concept foundation for the flagship $65M national mental health initiative, helping shape a more culturally grounded and stigma-aware digital experience from the start.",
    roleContext: "VP of Product Experience & Innovation at The Ad Council. Led cross-disciplinary strategy, design & partner teams",
    testimonial: {
      quote:
        "Ariba is passionate about solving problems and pain points by co-creating with people who are the most impacted. She is expert at applying design thinking and lean startup practices to a variety of projects and challenges, and is an empathetic listener able to distill insights and present to senior leadership with confidence.",
      name: "Anastasia Goodstein",
      role: "SVP, Ad Council",
    },
  },
  {
    tagRotationDeg: 2,
    photoSrc: "/assets/wwm-case-study-6.jpg",
    client: "Ad Council",
    title: "Building A Responsible Path Into Emerging Technology And AI",
    summary:
      "Creating the internal strategy, partnerships, and governance needed to explore new technologies without losing sight of trust, cost, or usefulness.",
    pills: ["Emerging Tech Strategy", "AI Governance", "Strategic Partnership"],
    challenge:
      "As emerging technology moved quickly from metaverse experimentation to generative AI and spatial computing, the organization needed a way to explore what was relevant without chasing hype, overspending, or eroding public trust.",
    solution:
      "The work focused on building an internal structure for exploration, bringing together executive leaders, external partners, and cross-functional teams to evaluate opportunities, run pilots, establish workflows, and create a more responsible process for deciding what was worth testing or adopting.",
    impact:
      "The result was a stronger internal foundation for responsible AI and emerging tech adoption, significant cost savings through strategic partnerships, and a series of emerging media and storytelling pilots that helped the organization explore new formats more thoughtfully.",
    roleContext: "VP of Product Experience & Innovation at The Ad Council. Led cross-disciplinary strategy, design & partner teams",
    testimonial: {
      quote:
        "When tasked with leading transformation of our donated media model at the Ad Council, I turned to Ariba to co-create and reimagine the possibilities of such an ambitious exploration. Her curiosity, strategic thinking, and ability to start with a blank canvas paved new paths of opportunity across the organization, up through the C-suite.",
      name: "Kathleen Kayse",
      role: "Senior Sales & Marketing Executive",
    },
  },
];

export type WwmClosingLink = {
  index: string;
  title: string;
  cta: string;
  href: string;
  sub?: string;
};

export const wwmClosingLinks: WwmClosingLink[] = [
  {
    index: "01",
    title: "Speaking",
    cta: "Speaker inquiry →",
    href: "mailto:ariba@aribajahan.com?subject=Speaker%20Request",
  },
  {
    index: "02",
    title: "CX Ambition Sprint",
    cta: "Sprint inquiry →",
    href: "mailto:ariba@aribajahan.com?subject=CX%20Ambition%20Sprint%20Inquiry",
  },
  {
    index: "03",
    title: "1:1 Strategy Session",
    cta: "Session inquiry →",
    href: "mailto:ariba@aribajahan.com?subject=1:1%20Strategy%20Session%20Inquiry",
  },
  {
    index: "04",
    title: "Everything Else",
    cta: "Get in touch →",
    href: "mailto:ariba@aribajahan.com?subject=General%20Inquiry",
    sub: "Press, career advisory, quotes, and everything else.",
  },
];
