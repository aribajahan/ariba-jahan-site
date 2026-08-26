// Content data for the Speaking page, extracted from design-reference/speaking.dc.html
// and design-reference/site-content.md.

export type SpeakingTheme = {
  photoSrc: string;
  title: string;
  question: string;
  description: string;
};

export const speakingThemes: SpeakingTheme[] = [
  {
    photoSrc: "/assets/theme-bg-1-nebula-xs.jpg",
    title: "Cognitive Endurance",
    question: "How do we preserve human judgment in the age of AI?",
    description:
      "As AI becomes more capable of generating ideas, summarizing information, and making recommendations, the role of human thinking doesn’t disappear, but it does change. This talk explores Cognitive Endurance, my framework for strengthening discernment, creativity, critical thinking, and independent judgment in a world where more and more cognitive work can be outsourced.",
  },
  {
    photoSrc: "/assets/theme-bg-2-dunes-xs.jpg",
    title: "Leading with Momentum Through Uncertainty",
    question: "How do leaders create momentum when the path isn’t clear?",
    description:
      "When technology is moving fast and the answer isn’t obvious yet, teams need more than urgency. They need shared language, room to experiment, and a way to move forward without pretending to have certainty they don’t. This talk explores how to create that kind of environment while working with AI in ways that build trust instead of eroding it.",
  },
  {
    photoSrc: "/assets/theme-bg-3-bark-xs.jpg",
    title: "Brand Utility as a Moat",
    question: "What earns an organization a lasting place in people’s lives?",
    description:
      "The strongest brands are no longer defined solely by awareness or affinity. They're defined by the value they create. This talk explores why usefulness has become one of the most defensible competitive advantages and how organizations can rethink customer relationships, products, services, and experiences through that lens.",
  },
  {
    photoSrc: "/assets/theme-bg-4-coral-xs.jpg",
    title: "Experience Design at the Edge of Expectation",
    question: "How is AI reshaping what people expect from products and experiences?",
    description:
      "AI is changing more than what products can do. It’s changing what an experience even is. As interfaces become more generative, personalized, and adaptive, expectations around usefulness, trust, and quality are shifting too — especially in a world where infinite content and AI slop make good experience design matter even more. This talk explores what that means for the people building now.",
  },
  {
    photoSrc: "/assets/theme-bg-5-moss-xs.jpg",
    title: "Ethical & Responsible AI",
    question: "Who is accountable when AI gets it wrong?",
    description:
      "As organizations rush to adopt AI, the hardest questions aren't technical. They're about accountability, consent, and who bears the cost when systems fail. This talk looks at what it actually takes to build and deploy AI responsibly: the guardrails, the governance, and the judgment calls no framework can automate.",
  },
];

export type SpeakingTestimonial = {
  quote: string;
  name: string;
  role: string;
};

export const speakingTestimonials: SpeakingTestimonial[] = [
  {
    quote:
      "In 2025 we held a Leading Design AI Summit in New York to bring global design leaders together for a conversation on the future of design in a rapidly changing, AI-driven world. Ariba played a vital role - she facilitated big conversations, moderated opposing opinions, and held space for the emotions of these transformational times. She did such a fantastic job we invited her back to our London conference.",
    name: "Rebecca Groves",
    role: "Curator, Leading Design",
  },
  {
    quote:
      "Ariba was a standout speaker, combining warmth, clarity, and confidence. Her delivery made complex topics easier to understand, while her engaging style held the audience's attention. Her presence at our event was a great choice - she shared valuable insights and created a dynamic, interactive atmosphere.",
    name: "Mira Myllälä",
    role: "Director of UX Design, Reaktor and CXSphere",
  },
  {
    quote:
      "Ariba is doing some of the most vital work in design today, and excels at talking about it in an accessible, inspiring way.",
    name: "David Dylan Thomas",
    role: "Author, “Design for Cognitive Bias”",
  },
  {
    quote:
      "Ariba brought both pragmatic advice on action steps businesses could take today AND a philosophical lens on how to think about AI and other transformative technologies in the long run. She was quick-witted, sharp, and insightful without losing a warm, welcoming presence and tone. I'd recommend her for any speaking engagement.",
    name: "Kyle Hagge",
    role: "Chief of Staff, Morning Brew",
  },
  {
    quote:
      "She's brilliant, curious, thoughtful, and honest: the traits of an engaging, impactful speaker. Ariba truly cares about understanding her audience and asks the right questions to deliver exactly what they need. She doesn't shy away from tough topics, and brings herself and her story into every message, which makes her presentations so resonant.",
    name: "Danielle Barnes",
    role: "CEO, Women Talk Design",
  },
  {
    quote:
      "Ariba's insights into AI were truly enlightening. She eloquently addressed the misconception that AI is an overly complex field - her ability to humanize AI experiences made the topic accessible and relatable. Her message was clear: we cannot afford to sit on the sidelines while innovation unfolds.",
    name: "Michelle Green",
    role: "VP of Insights & Intelligence, Paramount+",
  },
  {
    quote:
      "First of all, I was completely floored by Ariba's talk; so powerful, and so on point. Ariba's talk was enlightening, powerful, and much needed - I deeply appreciate her posing thought-provoking questions and providing CTAs for us to become better, inclusive designers.",
    name: "Nikhila N",
    role: "Product Designer, HubSpot",
  },
  {
    quote:
      "I really appreciated the way you shared your ideas and methods with us, but also encouraged us to share as well. It really made this feel like the talk was a safe space and helped me learn what I should specifically be looking for in the next team that I work with.",
    name: "Aska M",
    role: "Brand Designer",
  },
  {
    quote:
      "Ariba Jahan is already a celebrated speaker, and it was a privilege to share the stage with her during our panel on Motherhood & Creativity through AIGA NY. She brought a combination of honesty and professionalism that made the conversation come alive. Ariba's perspective on achievement - shaped by her experiences as a creative person, a daughter of immigrants, and a mother - was so important to hear. Anyone who has the chance to hear her speak or work alongside her is in for a treat.",
    name: "Carrie Ingoglia",
    role: "Creative Director",
  },
];

export type SpeakingLogo = {
  src: string;
  alt: string;
  heightPx: number;
  // Some source logo files are solid black/dark and need to be flipped to
  // white to read against this section's dark background.
  invert?: boolean;
};

// The first 12 (three mobile/tablet rows at 4-per-row) are the most
// broadly recognizable, so they're the ones still visible before the
// mobile/tablet "Show more" toggle is expanded. Order matters here.
export const speakingLogos: SpeakingLogo[] = [
  { src: "/assets/logo-un.png", alt: "United Nations", heightPx: 64 },
  { src: "/assets/logo-google.png", alt: "Google", heightPx: 66 },
  { src: "/assets/logo-tiktok.png", alt: "TikTok", heightPx: 58 },
  { src: "/assets/logo-paramount.png", alt: "Paramount", heightPx: 46 },
  { src: "/assets/logo-snap.png", alt: "Snap Inc.", heightPx: 38 },
  { src: "/assets/logo-etsy.png", alt: "Etsy", heightPx: 40 },
  { src: "/assets/logo-hubspot.png", alt: "HubSpot", heightPx: 36 },
  { src: "/assets/logo-columbia.png", alt: "Columbia University", heightPx: 68 },
  { src: "/assets/logo-ogilvy.png", alt: "Ogilvy", heightPx: 40 },
  { src: "/assets/logo-voxmedia.png", alt: "Vox Media", heightPx: 34 },
  { src: "/assets/logo-ally.png", alt: "Ally", heightPx: 38 },
  { src: "/assets/logo-fanduel.png", alt: "FanDuel", heightPx: 34 },
  { src: "/assets/logo-ixda.png", alt: "IxDA", heightPx: 44 },
  { src: "/assets/logo-marketingbrew.png", alt: "Marketing Brew", heightPx: 50 },
  { src: "/assets/logo-svb.png", alt: "Silicon Valley Bank", heightPx: 42 },
  { src: "/assets/logo-aigapro.png", alt: "AIGA", heightPx: 46 },
  { src: "/assets/logo-adcolor.png", alt: "AdColor", heightPx: 38 },
  { src: "/assets/logo-anomaly.png", alt: "Anomaly", heightPx: 34 },
  { src: "/assets/logo-newschool.png", alt: "The New School", heightPx: 44 },
  { src: "/assets/logo-womeninnovation.png", alt: "Women in Innovation", heightPx: 40 },
  { src: "/assets/logo-chief.png", alt: "Chief", heightPx: 36 },
  { src: "/assets/logo-alltechishuman.png", alt: "All Tech Is Human", heightPx: 40 },
  { src: "/assets/logo-designops.png", alt: "DesignOps Summit", heightPx: 38 },
  { src: "/assets/logo-adweekny.png", alt: "Advertising Week New York", heightPx: 40 },
  { src: "/assets/logo-boardofinnovation.png", alt: "Board of Innovation", heightPx: 46 },
  { src: "/assets/logo-ama.png", alt: "American Marketing Association", heightPx: 44 },
  { src: "/assets/logo-radicalresearch.png", alt: "Radical Research Summit", heightPx: 44 },
  { src: "/assets/logo-fq.png", alt: "The Female Quotient", heightPx: 48 },
  { src: "/assets/logo-womenwhocode.png", alt: "Women Who Code", heightPx: 52 },
  { src: "/assets/logo-confab.png", alt: "Confab", heightPx: 38 },
  { src: "/assets/logo-leading-design.png", alt: "Leading Design", heightPx: 52, invert: true },
  { src: "/assets/logo-adcouncil-white-sm.png", alt: "Ad Council", heightPx: 44 },
  { src: "/assets/logo-nftnyc.png", alt: "NFT NYC", heightPx: 38 },
  { src: "/assets/logo-uxsouthafrica.png", alt: "UX South Africa", heightPx: 48 },
  { src: "/assets/logo-asiansinadvertising.png", alt: "Asians in Advertising", heightPx: 42 },
  { src: "/assets/logo-ndclondon.png", alt: "NDC London", heightPx: 34 },
];

// Order tuned so these wrap into exactly 3 rows at mobile width (375px).
export const engagementFormats = [
  "Keynotes",
  "Workshops",
  "Panel Discussions",
  "Executive Offsites",
  "Fireside Conversations",
  "Executive Briefings",
  "Podcast Interviews",
];

export const galleryPhotos = [
  "/uploads/marketing-brew-summit-2025-compressed.jpg",
  "/uploads/IMG_0075-sm.jpg",
  "/uploads/_DSC8464.jpg",
  "/uploads/speaking-photo-6.jpeg",
  "/uploads/img-1773-compressed.jpg",
  "/uploads/tfqces2020-compressed.jpg",
];
