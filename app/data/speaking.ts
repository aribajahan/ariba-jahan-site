// Content data for the Speaking page. Content lives in
// content/pages/speaking.json so it's editable via the Studio.

import speakingContent from "../../content/pages/speaking.json";

export type SpeakingTheme = {
  photoSrc: string;
  title: string;
  question: string;
  description: string;
};

export const speakingThemes: SpeakingTheme[] = speakingContent.themes.items;

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
export const engagementFormats = speakingContent.engagements.formats;

import galleryPhotosData from "../../content/collections/speaking-gallery-photos.json";

export const galleryPhotos: string[] = galleryPhotosData;
