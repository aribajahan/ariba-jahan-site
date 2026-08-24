// Central content data for the Home page, extracted from design-reference/home.dc.html
// and design-reference/site-content.md.

export type NavLink = { label: string; href: string; external?: boolean };

export const navLinks: NavLink[] = [
  { label: "Speaking", href: "/speaking" },
  { label: "Work With Me", href: "/work-with-me" },
  { label: "Unmissables", href: "https://www.unmissables.xyz/", external: true },
  { label: "Reading Room", href: "/reading-room" },
  { label: "About", href: "/about" },
];

export const heroSocials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aribajahan/" },
  { label: "Instagram", href: "https://www.instagram.com/ariba.jahan/" },
  { label: "Substack", href: "https://www.unmissables.xyz/" },
  { label: "YouTube", href: "https://www.youtube.com/@unmissableswithariba" },
  {
    label: "Spotify",
    href: "https://open.spotify.com/show/3ufd57tWYngjUI9LlQGXkD?si=8cc7f819c9384315",
  },
] as const;

// "Spoken at" logo row
const spokenAt = [
  "Google", "TikTok", "Etsy", "HubSpot", "Columbia University", "UN General Assembly",
  "Vox Media", "AIGA", "Advertising Week", "Paramount", "CHIEF", "Leading Design London",
  "The New School", "Ogilvy", "Anomaly", "US Chambers of Commerce", "CES", "Google",
  "The Female Quotient", "Marketing Brew", "Design Ops Summit", "Confab", "ADCOLOR",
  "NFTNYC", "CXSphere", "McCann", "Onbe", "AIGA", "Board of Innovation", "All Tech Is Human",
];

// "Featured in" logo row
const featuredIn = [
  "Cosmopolitan", "Adweek", "LITTLE BLACK BOOK", "Campaign US", "Morning Brew",
  "Women In Innovation", "Women of the Future Vol. 2", "Asians in Advertising",
  "Power in Ten Podcast", "Innovation Crush Podcast",
];

// "Worked with" logo row
const workedWith = [
  "AARP", "Anomaly", "Ad Council", "DEPARTMENT OF HEALTH & HUMAN SERVICES", "UNCF", "TIAA",
  "Ally", "WeightWatchers", "TopGolf", "US Forest Service", "Within", "AIGA",
  "Huntsman Foundation", "Google", "Lean Startup Machine", "Women in Innovation",
  "Huntsman Foundation", "Foundation for Social Connection", "Roswell Park Cancer Institute",
  "University of Chicago", "SUNY Upstate Medical University", "W.M. Keck Center for Bioelectronics",
];

export type LogoRow = {
  label: string;
  items: string[];
  durationSec: number;
  reverse?: boolean;
};

export const logoRows: LogoRow[] = [
  { label: "Spoken at", items: spokenAt, durationSec: 145 },
  { label: "Featured in", items: featuredIn, durationSec: 100, reverse: true },
  { label: "Worked with", items: workedWith, durationSec: 145 },
];

export const stats = [
  { value: "215+", labelLine1: "Talks &", labelLine2: "Panels" },
  { value: "6", labelLine1: "Industry", labelLine2: "Awards" },
  { value: "2", labelLine1: "Books", labelLine2: "Contributed to" },
  { value: "15+", labelLine1: "Years across", labelLine2: "Sectors" },
  { value: "20+", labelLine1: "Essays & podcasts", labelLine2: "Published" },
];

export const speakingPhotos = [
  "/assets/speaking-photo-1.jpg",
  "/assets/speaking-photo-2.jpg",
  "/assets/speaking-photo-3.jpg",
  "/assets/speaking-photo-4.jpg",
  "/assets/speaking-photo-5.jpg",
];

// "Projects & Quests" scroll-snap carousel — the first 3 are real Case Studies
// pulled from Work With Me (Ally, WeightWatchers, Stagwell). The final 3 are
// "Quest" (personal project) entries referenced only via
// <meta ext-resource-dependency> tags in home.dc.html's <head>
// (quest-asha-logo.png, quest-women-in-innovation.png, quest-daboodle-screenshot.jpg) —
// no headline/description copy or actual image files exist anywhere in the design
// bundle for these three. TODO: Ariba to supply real copy + photos for the 3 Quest
// cards (Asha, Women In Innovation, Daboodle) — placeholders shown for now.
export type Experiment = {
  tag: "Case Study" | "Quest";
  tagIndex: number;
  headline: string;
  description: string;
  photoSrc: string | null;
};

export const experiments: Experiment[] = [
  {
    tag: "Case Study",
    tagIndex: 1,
    headline: "Ally — Turning everyday banking into a reason to come back",
    description:
      "Rethinking how a banking app could create more value toward customers' financial goals between transactions, without relying on dark patterns.",
    photoSrc: "/assets/wwm-case-1.jpg",
  },
  {
    tag: "Case Study",
    tagIndex: 2,
    headline: "WeightWatchers — Reimagining WW for a more adaptive, everyday relationship",
    description:
      "Exploring how an iconic brand could evolve beyond legacy expectations into a more adaptive, everyday digital experience.",
    photoSrc: "/assets/wwm-case-2.jpg",
  },
  {
    tag: "Case Study",
    tagIndex: 3,
    headline: "Stagwell — Shaping an enterprise AI research product from strategy to prototype",
    description:
      "Working from enterprise user research through product strategy, positioning, GTM and prototype development for a new AI-native research platform.",
    photoSrc: "/assets/wwm-case-study-3.jpg",
  },
  {
    tag: "Quest",
    tagIndex: 4,
    headline: "Asha",
    description: "A personal quest project. Copy and photos coming soon.",
    photoSrc: null,
  },
  {
    tag: "Quest",
    tagIndex: 5,
    headline: "Women In Innovation",
    description: "A personal quest project. Copy and photos coming soon.",
    photoSrc: null,
  },
  {
    tag: "Quest",
    tagIndex: 6,
    headline: "Daboodle",
    description: "A personal quest project. Copy and photos coming soon.",
    photoSrc: null,
  },
];

export const recognitionItems = [
  "Obama Foundation Leader USA",
  "Campaign US Inspiring Women Transforming Tech Award",
  "Presidential Lifetime Achievement Award",
  "Advertising Week NY Future is Female Award",
  "Global Top 100 Women of the Future in Emerging Tech",
];

export type PressItem = {
  outlet: string;
  title: string;
  href: string;
  photoSrc: string;
  bg: string;
};

export const pressItems: PressItem[] = [
  {
    outlet: "Marketing Brew",
    title: "All Things AI With Ariba Jahan",
    href: "https://www.marketingbrew.com/stories/2025/02/14/all-things-ai-with-ariba-jahan",
    photoSrc: "/assets/press-marketingbrew-new.jpg",
    bg: "#2D2D2D",
  },
  {
    outlet: "LBB Online",
    title: "The AI Gender Gap in Advertising",
    href: "https://lbbonline.com/news/ai-gender-gap-advertising",
    photoSrc: "/assets/press-gendergap.jpg",
    bg: "#E73131",
  },
  {
    outlet: "Cosmopolitan ME",
    title: "Staying Sharp in the Age of AI",
    href: "https://www.cosmopolitanme.com/cosmo/staying-sharp-ai",
    photoSrc: "/assets/press-staysharp.jpg",
    bg: "#F5A8D5",
  },
  {
    outlet: "Obama Foundation",
    title: "Obama Foundation Leader, USA 2025–2026",
    href: "https://www.obama.org/programs/leaders/usa/2025-2026/ariba-jahan/",
    photoSrc: "/assets/press-obama-new.jpg",
    bg: "#E73131",
  },
  {
    outlet: "Cosmopolitan ME",
    title: "Digital Safety 101",
    href: "https://www.cosmopolitanme.com/life/digital-safety-101",
    photoSrc: "/assets/press-digitalsafety-new.jpg",
    bg: "#F5A8D5",
  },
  {
    outlet: "WIN/WIN Podcast",
    title: "Head of Transformation, North America",
    href: "https://podcasts.apple.com/us/podcast/131-ariba-jahan-head-of-transformation-north-america/id1528362900?i=1000721517230",
    photoSrc: "/assets/press-winwin-new.jpg",
    bg: "#2D2D2D",
  },
  {
    outlet: "LBB Online",
    title: "Career Chameleons: Strategy & Transformation",
    href: "https://lbbonline.com/news/Career-Chameleons-Strategy-Transformation",
    photoSrc: "/assets/press-career-chameleons-new.jpg",
    bg: "#E73131",
  },
  {
    outlet: "Campaign US",
    title: "Campaign US Reveals 2025 Inspiring Women",
    href: "https://www.campaignlive.com/article/campaign-us-reveals-2025-inspiring-women/1907224",
    photoSrc: "/assets/press-campaignus-new.jpg",
    bg: "#F5A8D5",
  },
  {
    outlet: "AdWeek",
    title: "Anomaly Appoints Ariba Jahan as Head of Transformation, NA",
    href: "https://www.adweek.com/agencyspy/anomaly-appoints-ariba-jahan-as-head-of-transformation-na/",
    photoSrc: "/assets/press-adweek-new.jpg",
    bg: "#2D2D2D",
  },
];

export type Testimonial = {
  category: "LEADERSHIP" | "SPEAKING" | "CLIENT";
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    category: "LEADERSHIP",
    quote:
      "Ariba's superpower is her curiosity and ability to connect emerging technologies with creative opportunities. She excels at understanding how new technologies can be applied in meaningful, innovative ways to create better customer and business outcomes.",
    name: "Lauren Lavalle",
    role: "Chief Client Officer, Anomaly",
  },
  {
    category: "SPEAKING",
    quote:
      "Ariba's insights into AI were truly enlightening. She eloquently addressed the misconception that AI is an overly complex field. Her ability to humanize AI experiences made the topic accessible and relatable. Her message was clear: we cannot afford to sit on the sidelines while innovation unfolds.",
    name: "Michelle Green",
    role: "VP of Insights & Intelligence, Paramount+",
  },
  {
    category: "CLIENT",
    quote:
      "I worked with Ariba on an enterprise AI SaaS platform for researchers and creatives, from research through product strategy, user testing, and go-to-market. She could sit with potential customers, pull out what they actually needed, and turn it into a product direction, reimagining the user journey and shaping the features that set us apart. Customers, engineers, and executives all trusted her judgment and valued working alongside her.",
    name: "Mansoor Basha",
    role: "CTO, Stagwell Marketing Cloud",
  },
  {
    category: "LEADERSHIP",
    quote:
      "Ariba is a multi-faceted, Swiss-army-knife dream of a specialist and generalist all wrapped up in one. She's a warm and engaging storyteller as a speaker, compelling in rooms big and small; a high-level thinker, designing entirely new systems and perspectives where others might have slapped bandaids on problems, and every bit as detailed an artisan as the most junior person on her team, able to see and act in the weeds as well as from the treetops.",
    name: "Jen Cotton",
    role: "Comms Strategist, Anomaly",
  },
  {
    category: "SPEAKING",
    quote:
      "In 2025 we held a Leading Design AI Summit in New York to bring global design leaders together for a conversation on the future of design in a rapidly changing, AI-driven world. Ariba played a vital role. She facilitated big conversations, moderated opposing opinions, and held space for the emotions of these transformational times. She did such a fantastic job we invited her back to our London conference.",
    name: "Rebecca Groves",
    role: "Curator, Leading Design",
  },
  {
    category: "CLIENT",
    quote:
      "Ariba was an incredible partner for me to work with as our teams collaborated and co-created on a strategy for deepening customer relationships within the Ally app. They helped us think in terms of how to bring real customer value in a space that is often purely transactional. She and her team brought so many valuable insights and delivered so many exciting concepts in a very short period of time which my team was able to pick up and run with very easily.",
    name: "Rich Barrett",
    role: "Director of UX Design, Ally Bank",
  },
  {
    category: "LEADERSHIP",
    quote:
      "Few people on this earth know how to shape a brilliant conversation, provide a complex picture of the context, challenge the status quo, AND then collaborate on how to transform it with humanity, grace, optimism, and bravery. As CEO of WIN: Women in Innovation, I entrusted Ariba to chair our Advisory Council. With her genius guidance, that group helped us understand how to conquer the biggest challenges of our time.",
    name: "Amanda Ramos",
    role: "CEO, Women In Innovation",
  },
  {
    category: "SPEAKING",
    quote:
      "Ariba was a standout speaker, combining warmth, clarity, and confidence. Her delivery made complex topics easier to understand, while her engaging style held the audience's attention. Her presence at our event was a great choice. She shared valuable insights and created a dynamic, interactive atmosphere.",
    name: "Mira Myllylä",
    role: "Director of UX Design, Reaktor and CXSphere",
  },
  {
    category: "CLIENT",
    quote:
      "When tasked with leading transformation of our donated media model at the Ad Council, I turned to Ariba, then leading business design and innovation, to co-create and reimagine the possibilities of such an ambitious exploration. Her curiosity, strategic thinking, and ability to start with a blank canvas led to an amazing experience. Her calm resolve and sheer determination helped pave new paths of opportunity across the organization, up through the C-suite.",
    name: "Kathleen Kayse",
    role: "Senior Sales & Marketing Executive",
  },
  {
    category: "LEADERSHIP",
    quote:
      "Ariba is passionate about solving problems and pain points by co-creating with people who are the most impacted. She is expert at applying design thinking and lean startup practices as well as best practices in UX to a variety of projects and challenges. She was often asked by senior team leaders to consult on larger projects, including our strategic plan, and is an empathetic listener able to distill insights and present to senior leadership with confidence.",
    name: "Anastasia Goodstein",
    role: "SVP, Ad Council",
  },
  {
    category: "SPEAKING",
    quote:
      "Ariba brought both pragmatic advice on action steps businesses could take today AND a philosophical lens on how to think about AI and other transformative technologies in the long run. She was quick-witted, sharp, and insightful without losing a warm, welcoming presence and tone. I'd recommend her for any speaking engagement.",
    name: "Kyle Hagge",
    role: "Chief of Staff, Morning Brew",
  },
  {
    category: "LEADERSHIP",
    quote:
      "Ariba is a rare talent who has touched nearly every corner of our work at the Ad Council. Her ability to facilitate workshops and design strategic solutions transformed our approach to innovation and growth. Senior leaders relied on her to lead sensitive meetings, and her creations like Splashbox brought the organization into a new era of thinking.",
    name: "Greg Kelly",
    role: "Media Director",
  },
  {
    category: "SPEAKING",
    quote:
      "She's brilliant, curious, thoughtful, and honest: the traits of an engaging, impactful speaker. Ariba truly cares about understanding her audience and asks the right questions to deliver exactly what they need. She doesn't shy away from tough topics, and brings herself and her story into every message, which makes her presentations so resonant.",
    name: "Danielle Barnes",
    role: "CEO, Women Talk Design",
  },
];

export type CommunityPhoto = {
  photoSrc: string;
  caption: string;
  number: number;
};

const communityPhotosBase: CommunityPhoto[] = [
  { number: 1, photoSrc: "/assets/community/generation-tech-mentee-group.jpg", caption: "Volunteered with America On Tech to help high school students interested in STEM." },
  { number: 2, photoSrc: "/assets/community/govcity-panel-discussion.jpg", caption: "Spoke at SXSW on the power of government and non-profit innovation with GovCity." },
  { number: 3, photoSrc: "/assets/community/wow3-unstoppable-panel-group.jpg", caption: "Spoke at the Women of Web3 event at NFTNYC." },
  { number: 4, photoSrc: "/assets/community/ac-dinner-team-photo.jpg", caption: "Joined my team at the Ad Council Annual Gala." },
  { number: 5, photoSrc: "/assets/community/shorty-awards-team-photo.jpg", caption: "Judged and presented at the Shorty Awards." },
  { number: 6, photoSrc: "/assets/community/cutting-room-event-lineup.jpg", caption: "Received the Advertising Week Future Is Female Award." },
  { number: 7, photoSrc: "/assets/community/welcome-screen-duo.jpg", caption: "Cohosted Women In Innovation Awards segment with Sabrina Romviel." },
  { number: 9, photoSrc: "/assets/community/lean-startup-machine-team.jpg", caption: "Led and produced Lean Startup Machine Tokyo with local volunteers." },
  { number: 10, photoSrc: "/assets/community/otr-community-group-photo.jpg", caption: "Attended the Off The Record Executive Leadership Event hosted by Ashley Rudolph." },
  { number: 11, photoSrc: "/assets/community/shared-futures-conference-photo.jpg", caption: "Met with my fellow Obama Foundation Leaders at the AI conference called Shared Futures hosted by Aspen Digital." },
  { number: 12, photoSrc: "/assets/community/video-call-mug-cheers.jpg", caption: "Recorded an episode of the Asians in Advertising podcast as a guest host." },
  { number: 13, photoSrc: "/assets/community/asking-ai-hard-questions-panel.jpg", caption: "Spoke at Anomaly about AI ethics & AI user experience, hosted by the Chief AI Officer." },
  { number: 14, photoSrc: "/assets/community/role-of-human-workshop-group.jpg", caption: "Facilitated a table conversation on the role of the human in this AI-driven world at the Leading Design NY event." },
  { number: 15, photoSrc: "/assets/community/cxsphere-new-york-panel.jpg", caption: "Spoke at CXSphere on the future of emerging tech's impact on consumer experience." },
  { number: 16, photoSrc: "/assets/community/andys-awards-group-photo.jpg", caption: "Received the AdClub Rockstars & Innovators Award." },
  { number: 17, photoSrc: "/assets/community/hello-workshop-group-photo.jpg", caption: "Judged and chatted at the Products By Women x Lovable Hackathon during NY Tech Week." },
  { number: 18, photoSrc: "/assets/community/panel-discussion-red-turban.jpg", caption: "Spoke at Snap with amazing co-panelists." },
  { number: 19, photoSrc: "/assets/community/pantone-cloud-dancer-photo-op.jpg", caption: "Vibing at the Pantone Color of the Year event." },
  { number: 20, photoSrc: "/assets/community/narrative-infrastructure-panel.jpg", caption: "Spoke on a panel at the United Nations on the role of media for change." },
  { number: 21, photoSrc: "/assets/community/restaurant-dinner-group-selfie.jpg", caption: "Celebrated the holidays with my fellow On Discourse community members." },
  { number: 22, photoSrc: "/assets/community/nightclub-selfie-trio-new.jpg", caption: "Spoke on AI & Creativity at the AdColor Conference." },
  { number: 23, photoSrc: "/assets/community/store-visit-selfie-trio.jpg", caption: "Attended the fireside chat with Nabiha Syed of Mozilla Foundation, hosted by Pirth.org and Veronica Beard." },
  { number: 24, photoSrc: "/assets/community/classroom-mixer-selfie-trio.jpg", caption: "Mingled with other founders at the Dreamers & Doers event." },
  { number: 25, photoSrc: "/assets/community/office-lounge-group-selfie.jpg", caption: "Delivered a keynote on CX Transformation at Anomaly Toronto." },
  { number: 26, photoSrc: "/assets/community/artist-and-machine-event-duo.jpg", caption: "Attended the Artist & the Machine conference in NY." },
  { number: 27, photoSrc: "/assets/community/hello-mixer-group-photo.jpg", caption: "Judged the Products By Women x Lovable Hackathon." },
  { number: 28, photoSrc: "/assets/community/gems-from-the-sea-podcast.jpg", caption: "Sat down with Simon Nobili to record an episode of the Gems from the Sea podcast." },
  { number: 29, photoSrc: "/assets/community/lia-awards-team-photo.jpg", caption: "Judged B2B creative and transformation with my fellow London International Awards jury." },
  { number: 30, photoSrc: "/assets/community/panel-audience-selfie-row.jpg", caption: "Spoke on a panel with my fellow panelists at Leading Design London." },
  { number: 31, photoSrc: "/assets/community/ces-female-quotient-headphones.jpg", caption: "Joined the Female Quotient and walked the floors at CES." },
  { number: 32, photoSrc: "/assets/community/js-conference-us-talk.jpg", caption: "Delivered a talk on product strategy at the JS (JavaScript) Conference US." },
  { number: 33, photoSrc: "/assets/community/pink-bus-panel-trio.jpg", caption: "Spoke on a panel about emerging technology at Advertising Week." },
  { number: 34, photoSrc: "/assets/community/product-leader-summit-portrait.jpg", caption: "Attended Product Leaders Summit along with product leaders across the world." },
  { number: 35, photoSrc: "/assets/community/present-yourself-book.jpg", caption: 'Contributed as an author to the book "Present Yourself" by Women Talk Design, Danielle Barnes.' },
  { number: 36, photoSrc: "/assets/community/spatial-computing-book-launch.jpg", caption: "Celebrated Cathy Hackl's book launch on Spatial Computing at NASDAQ." },
  { number: 37, photoSrc: "/assets/community/un-women-breaking-barriers.jpg", caption: "Attended the Women Breaking Barriers event at the United Nations, hosted by Amanda Nguyen." },
  { number: 38, photoSrc: "/assets/community/adcolor-group-photo.jpg", caption: "Attended the AdColor conference with a fantastic crew." },
];

// Duplicated once (matching home.dc.html) so the CSS marquee loop is seamless.
export const communityPhotos: CommunityPhoto[] = [
  ...communityPhotosBase,
  ...communityPhotosBase,
];

export type ClosingLink = {
  index: string;
  title: string;
  cta: string;
  href: string;
  external?: boolean;
};

export const closingLinks: ClosingLink[] = [
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
    href: "/work-with-me",
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

export const footerSocials = heroSocials;
