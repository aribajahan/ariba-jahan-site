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

import speakingLogosData from "../../content/collections/speaking-logos.json";

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
export const speakingLogos: SpeakingLogo[] = speakingLogosData;

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

import galleryPhotosData from "../../content/collections/speaking-gallery-photos.json";

export const galleryPhotos: string[] = galleryPhotosData;
