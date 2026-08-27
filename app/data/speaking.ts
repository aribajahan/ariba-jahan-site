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

export { type Testimonial as SpeakingTestimonial } from "./testimonials";
import { testimonialsFor } from "./testimonials";

export const speakingTestimonials = testimonialsFor("speaking");

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
