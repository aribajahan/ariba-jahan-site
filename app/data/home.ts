// Central content data for the Home page. Content lives in
// content/pages/home.json so it's editable via the Studio.

import siteSettings from "../../content/site-settings.json";
import homeContent from "../../content/pages/home.json";

export type NavLink = { label: string; href: string; external?: boolean };

// Reading Room is intentionally left out here — hidden from nav until the page is built.
export const navLinks: NavLink[] = siteSettings.navLinks;

export const heroSocials = siteSettings.socialLinks;

export type MarqueeRow = {
  label: string;
  items: string[];
  durationSec: number;
  reverse?: boolean;
};

export const nameMarqueeRows: MarqueeRow[] = homeContent.nameMarquee.rows;

export const stats = homeContent.credentials.stats;

export const speakingPhotos = homeContent.speakingTeaser.photos;

// "Projects & Quests" scroll-snap carousel. Content lives in
// content/collections/case-studies-quests.json so it's editable via the Studio.
// The collection holds more entries than the strip shows — each carries
// showOnHome, so cards can be parked without losing their copy.
import experimentsData from "../../content/collections/case-studies-quests.json";

export type Experiment = {
  tag: "Case Study" | "Quest";
  tagIndex: number;
  client?: string;
  headline: string;
  description: string;
  photoSrc: string | null;
  showOnHome?: boolean;
};

// Parked entries stay in the collection and out of the strip. The badge number
// is counted off what's actually shown, so parking a card never leaves a gap.
export const experiments: Experiment[] = (experimentsData as Experiment[])
  .filter((e) => e.showOnHome !== false)
  .map((e, i) => ({ ...e, tagIndex: i + 1 }));

export const recognitionItems = homeContent.recognition.items;

export type PressItem = {
  outlet: string;
  title: string;
  href: string;
  photoSrc: string;
  bg: string;
};

export const pressItems: PressItem[] = homeContent.press.items;

export { type Testimonial } from "./testimonials";
import { testimonialsFor } from "./testimonials";

export const testimonials = testimonialsFor("home");

export type CommunityPhoto = {
  photoSrc: string;
  caption: string;
  number: number;
};

const communityPhotosBase: CommunityPhoto[] = homeContent.community.photos;

// Duplicated once (matching home.dc.html) so the CSS marquee loop is seamless.
export const communityPhotos: CommunityPhoto[] = [
  ...communityPhotosBase,
  ...communityPhotosBase,
];

export const footerSocials = heroSocials;
