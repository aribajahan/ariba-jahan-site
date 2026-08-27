// Content data for the About page, extracted from design-reference/about.dc.html
// and design-reference/site-content.md.

import aboutContent from "../../content/pages/about.json";

export const aboutHero = aboutContent.hero;

export const introParagraph =
  "My career hasn’t followed a straight line, but the through-line has always been the same: curiosity, systems thinking, and a desire to build things that are genuinely useful to people. These are some of the chapters that shaped how I think, what I build, and why those questions matter so much to me.";

export type StoryPhoto = {
  src: string;
  /** position/size of this photo within its wrapper, matching about.dc.html's hand-placed polaroid layout */
  top: number;
  widthPct: number;
  rotate: number;
  z: number;
  side: "left" | "right";
};

export type StoryChapter = {
  id: number;
  align: "photo-left" | "photo-right";
  /** wrapper base rotation, reused by the scroll-drift effect (design-system.md's baseRot map) */
  baseRot: number;
  wrapperHeight: number;
  /** Eyebrow/headline text for this chapter. Per design-system.md's "Recently resolved" note,
   *  the tape now always mirrors this verbatim -- a few rows in about.dc.html still carried
   *  older, shorter tape copy (e.g. "SCIENTIFIC RESEARCH" instead of "LAB RESEARCH"); those
   *  are corrected here to match the documented rule rather than reproduced verbatim. */
  headline: string;
  body: string;
  tapeTop: number;
  tapeRotate: number;
  /** only the first chapter's tape carries the extra hard-shadow in about.dc.html */
  tapeShadow?: boolean;
  photoA: StoryPhoto;
  photoB: StoryPhoto;
};

export const storyChapters: StoryChapter[] = [
  {
    id: 1,
    align: "photo-left",
    baseRot: -2,
    wrapperHeight: 250,
    headline: "Immigrating from bangladesh",
    body: "I moved to the US from Bangladesh with my family when I was eight. My first years in NYC were filled with a lot of firsts: eating New York pizza, touching snow, watching Home Alone 2, and rollerskating in the summer. I was pretty shy in a foreign country, so I joined storytelling contests and ran in class elections to get better at public speaking.",
    tapeTop: 6,
    tapeRotate: -2,
    tapeShadow: true,
    photoA: { src: "/assets/story-photo-1a.jpg", top: 36, widthPct: 53, rotate: -5, z: 1, side: "left" },
    photoB: { src: "/assets/story-photo-1b.jpg", top: 0, widthPct: 53, rotate: 4, z: 2, side: "right" },
  },
  {
    id: 2,
    align: "photo-right",
    baseRot: 2,
    wrapperHeight: 250,
    headline: "Growing up in Queens, NYC",
    body: "My mother raised two daughters on her own in NYC. Around the same time, I was diagnosed with deafness in my right ear. A lot of my childhood involved navigating doctors, insurance, translation, and trying to make sense of systems that weren’t built with us in mind. I also started working under the table at 12 to help support my family.",
    tapeTop: 2,
    tapeRotate: 3,
    photoA: { src: "/assets/story-photo-2a.jpg", top: 0, widthPct: 50, rotate: 4, z: 1, side: "left" },
    photoB: { src: "/assets/story-photo-2b.jpg", top: 0, widthPct: 53, rotate: 4, z: 2, side: "right" },
  },
  {
    id: 3,
    align: "photo-left",
    baseRot: -1.5,
    wrapperHeight: 250,
    headline: "Falling for science",
    body: "I studied biomedicine at Brooklyn Tech High School. I was lucky to have teachers who really supported my interest in science and engineering. My favorite unexpected classes were wood shop and an after-school class where we read scientific journal articles to make sense of applied research.",
    tapeTop: -4,
    tapeRotate: -1,
    photoA: { src: "/assets/story-photo-3a.jpg", top: 24, widthPct: 56, rotate: -3, z: 1, side: "left" },
    photoB: { src: "/assets/story-photo-3b.jpg", top: 0, widthPct: 53, rotate: 4, z: 2, side: "right" },
  },
  {
    id: 4,
    align: "photo-right",
    baseRot: 2,
    wrapperHeight: 255,
    headline: "College years & studying abroad",
    body: "I studied Biomechanical Engineering at Syracuse University and spent a year abroad at City University of London. I was President of the National Society of Black Engineers and a leader in our school mentorship program supporting women of color. Working as a barista in London, traveling all over Europe and Egypt, working in bioinstrumentaion labs and getting my first tattoo were peak college years.",
    tapeTop: 8,
    tapeRotate: 2,
    photoA: { src: "/assets/story-photo-4a.jpg", top: 44, widthPct: 48, rotate: 6, z: 1, side: "left" },
    photoB: { src: "/assets/story-photo-4b.jpg", top: 0, widthPct: 53, rotate: 4, z: 2, side: "right" },
  },
  {
    id: 5,
    align: "photo-left",
    baseRot: -2.2,
    wrapperHeight: 255,
    headline: "Lab research",
    body: "I worked in research labs through college and med school across bioengineering, pharmacology, orthopedic surgery, thoracic surgery, and cancer research, including NSF programs, SUNY Upstate, and Roswell Park Cancer Institute. Science and engineering trained me to ask better questions, be comfortable with unknowns, look for evidence, and keep testing my assumptions.",
    tapeTop: 0,
    tapeRotate: -3,
    photoA: { src: "/assets/story-photo-5a.jpg", top: 6, widthPct: 54, rotate: -6, z: 1, side: "left" },
    photoB: { src: "/assets/story-photo-5b.jpg", top: 0, widthPct: 53, rotate: 4, z: 2, side: "right" },
  },
  {
    id: 6,
    align: "photo-right",
    baseRot: 1.8,
    wrapperHeight: 248,
    headline: "Pivoting & reinventing again",
    body: "I left my medical career path and moved into startups. It was a lean-budget, zero-certainty phase of life: a mattress on my mom’s basement floor, startup operations, SaaS product strategy, and a lot of figuring things out in real time. My work also took me to London, Tokyo, and São Paulo to facilitate workshops for entrepreneurs, and I took a ton of courses while building a new foundation for myself.",
    tapeTop: 4,
    tapeRotate: 1,
    photoA: { src: "/assets/story-photo-6a.jpg", top: 30, widthPct: 50, rotate: 3, z: 1, side: "left" },
    photoB: { src: "/assets/story-photo-6b.jpg", top: 0, widthPct: 53, rotate: 4, z: 2, side: "right" },
  },
  {
    id: 7,
    align: "photo-left",
    baseRot: -1.8,
    wrapperHeight: 252,
    headline: "Public interest and innovation",
    body: "I joined the Ad Council to work on products and stayed for nine years, where I started and led the Innovation Practice. My work expanded across audience research, growth and adoption strategy, executive advisory councils, emerging technology, and helping teams adopt new ways of working. I got to work on efforts like the Emmy Award-winning Love Has No Labels and the $52M COVID vaccine education initiative, where product, trust, behavior, and public impact were all deeply connected.",
    tapeTop: 2,
    tapeRotate: -2,
    photoA: { src: "/assets/story-photo-7a.jpg", top: 0, widthPct: 57, rotate: -4, z: 1, side: "left" },
    photoB: { src: "/assets/story-photo-7b.jpg", top: 0, widthPct: 53, rotate: 4, z: 2, side: "right" },
  },
  {
    id: 8,
    align: "photo-right",
    baseRot: 2.3,
    wrapperHeight: 255,
    headline: "Leading transformation at Anomaly",
    body: "At Anomaly, my work moved further into customer experience, commercial strategy, AI adoption, and product direction. I led CX and GTM transformation work for clients, helping teams make sense of customer behavior, emerging technology, and what was actually worth building. It was a chapter where strategy, customer value, and commercial value had to work much more closely together.",
    tapeTop: 10,
    tapeRotate: 2,
    photoA: { src: "/assets/story-photo-8a.jpg", top: 38, widthPct: 52, rotate: 5, z: 1, side: "left" },
    photoB: { src: "/assets/story-photo-8b.jpg", top: 0, widthPct: 53, rotate: 4, z: 2, side: "right" },
  },
  {
    id: 9,
    align: "photo-left",
    baseRot: -2,
    wrapperHeight: 250,
    headline: "Using my public voice to invite conversations",
    body: "Over the years, I’ve given more than 200 talks, panels, workshops, and executive sessions, including at the United Nations, Google, TikTok, and Columbia University. Public speaking has become one of the ways I think in public: testing ideas, challenging assumptions, and making sense of how technology, business, media, and human behavior are changing at the same time.",
    tapeTop: -2,
    tapeRotate: -4,
    photoA: { src: "/assets/story-photo-9a.jpg", top: 8, widthPct: 48, rotate: -2, z: 1, side: "left" },
    photoB: { src: "/assets/story-photo-9b.jpg", top: 0, widthPct: 53, rotate: 4, z: 2, side: "right" },
  },
  {
    id: 10,
    align: "photo-right",
    baseRot: 2,
    wrapperHeight: 250,
    headline: "Building Unmissables",
    body: "I started Unmissables, a podcast and newsletter, because I wanted better conversations about technology, business, human behavior, and trust than the ones I was finding. It’s also where I’ve been developing ideas like Cognitive Endurance, my framework for thinking about judgment, agency, and what it means to keep your thinking your own in an AI-shaped world.",
    tapeTop: 6,
    tapeRotate: 3,
    photoA: { src: "/assets/story-photo-10a.jpg", top: 32, widthPct: 55, rotate: 4, z: 1, side: "left" },
    photoB: { src: "/assets/story-photo-10b.jpg", top: 0, widthPct: 53, rotate: 4, z: 2, side: "right" },
  },
];

export const rightNowPhotos = [
  { src: "/uploads/now-4-opt.jpg", rotate: -4, translateY: 0, z: 1 },
  { src: "/uploads/now-3-opt.jpg", rotate: 3, translateY: 14, z: 2 },
  { src: "/uploads/now-1-opt.jpg", rotate: -2, translateY: 6, z: 3 },
  { src: "/uploads/now-2-opt.jpg", rotate: 4, translateY: 0, z: 4 },
];

export const rightNowCopy =
  "Right now, my work spans strategy, AI, customer experience, writing, and speaking. That includes advisory work, CX sprints, Unmissables, and collaborations with teams thinking through how technology and changing customer expectations should shape what they build, how they grow, and how they stay useful. Outside of work, I’m happiest being a mom to my son, a partner to my husband and dabbling in creative quests.";

export const bioIntro = [
  "Hi, I'm Ariba Jahan.",
  "For more than fifteen years, I've partnered with leadership teams across healthcare, financial services, retail, consumer technology, media, education, philanthropy, startups, and government to navigate moments of change - from emerging technologies and shifting customer expectations to new opportunities for growth. My background in bioengineering research taught me to approach uncertainty with curiosity, scientific rigor, systems thinking, and experimentation - a mindset I've carried into product, customer experience, AI, and organizational transformation.",
];

export const bioExpanded = [
  "The answer looks different every time. Sometimes it's a product, service, AI-powered experience, or go-to-market (GTM) strategy. Other times it's a customer relationship model, executive advisory council, innovation practice, operating model, or new organizational capability. The goal is always the same: helping organizations become more valuable and useful to the people they serve.",
  "I've built innovation practices, customer experience organizations, executive advisory councils, AI products and experiences, new offerings, and growth strategies. My work has spanned nonprofits, startups, agencies, and Fortune 500 companies, collaborating with organizations including Google, Ally, TIAA, AARP, WeightWatchers, the Ad Council, the U.S. Department of Health and Human Services, and the U.S. Forest Service.",
  "I write and host Unmissables, a podcast and newsletter where I explore how technology, business, creativity, science, and human experience collide and how those intersections reshape how we think, build, and lead.",
  "I've delivered more than 200 keynotes, executive workshops, conference talks, panels, podcasts, and leadership sessions, including at the United Nations General Assembly, Google, TikTok, Paramount, and Vox Media. My work has been recognized through the Obama Foundation Leadership Program, the Presidential Lifetime Achievement Award for community service, Campaign US's Inspiring Women Transforming Technology, and the Global Top 100 Women of the Future in Emerging Tech.",
  "Outside of work, I'm happiest being a mom and knitting. I also believe that the future isn't inevitable. It reflects what we're willing to question, imagine, and build, and I hope my work encourages a little more deliberate participation in all three.",
  "If you're building something new, navigating AI, rethinking customer relationships, or simply enjoy conversations about technology and human behavior, I'd love to connect.",
];

export const careerAdvisory = {
  eyebrow: "For the Career-Ambitious",
  headline: "Career Advisory 1:1",
  lead: "For people building a career with range, visibility, and a clear point of view.",
  body: "These sessions are for people building across disciplines, growing their visibility, developing a public voice, or figuring out how to shape a more multidimensional career in design, strategy, and technology.",
  cta: "Book a Session →",
  href: "mailto:ariba@aribajahan.com?subject=Career%20Advisory%20Inquiry",
  photoSrc: "/assets/personal-red-wall-sm.jpg",
};

export type RecognitionItem = {
  label: string;
  year?: string;
  href?: string;
};

export const recognitionItems: RecognitionItem[] = [
  { label: "Obama Foundation Leader USA", year: "2025" },
  { label: "Campaign US Inspiring Women Transforming Technology", year: "2025" },
  { label: "Presidential Lifetime Achievement Award", year: "2024" },
  { label: "Advertising Week NY Future is Female Award", year: "2024" },
  { label: "Ad Club NY's Rockstar, Icon & Innovator Award", year: "2024" },
  { label: "Bill Imada's Top 50 Unsung Heroes", year: "2024" },
  { label: "Global Top 100 Women of the Future in Emerging Tech", year: "2023" },
  {
    label: "Women in Innovation Movers & Makers",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7165839819657461760/",
  },
];

export const featuredItems: RecognitionItem[] = [
  {
    label: "Cosmopolitan - Your Overdue Digital Safety Intervention",
    href: "https://mags.itp.com/CosmopolitanME/2026/124-COSMOPOLITAN-SPRING-2026/#page=80",
  },
  {
    label: "Marketing Brew - All Things AI",
    href: "https://www.marketingbrew.com/stories/2025/02/14/all-things-ai-with-ariba-jahan",
  },
  {
    label: "LBB - Meet the Career Chameleons",
    href: "https://lbbonline.com/news/Career-Chameleons-Strategy-Transformation",
  },
  {
    label: "LBB - \"Women Don't Need Rescuing\"",
    href: "https://lbbonline.com/news/ai-gender-gap-advertising",
  },
  {
    label: "Recess Playbook - Contributing Creative",
    href: "https://www.cometorecess.com/playbook2026",
  },
  {
    label: "Present Yourself - Contributing Author",
    href: "https://www.amazon.com/Present-Yourself-Strategies-Authentic-Impactful/dp/B0CV6V6L7S",
  },
  {
    label: "Women of the Future Book Vol. 2",
    href: "https://womenofthefuture.com/global-vol-2/",
  },
];

export type AboutClosingLink = {
  index: string;
  title: string;
  cta: string;
  href: string;
  external?: boolean;
};

export const aboutClosingLinks: AboutClosingLink[] = [
  {
    index: "01",
    title: "Speaking",
    cta: "Speaker inquiry →",
    href: "mailto:ariba@aribajahan.com?subject=Speaker%20Request",
  },
  {
    index: "02",
    title: "Work With Me",
    cta: "Sprints & strategy sessions →",
    href: "mailto:ariba@aribajahan.com?subject=Work%20With%20Me%20Inquiry",
  },
  {
    index: "03",
    title: "Unmissables",
    cta: "Read & subscribe →",
    href: "https://www.unmissables.xyz/",
    external: true,
  },
  {
    index: "04",
    title: "Everything Else",
    cta: "Get in touch →",
    href: "mailto:ariba@aribajahan.com?subject=General%20Inquiry",
  },
];
