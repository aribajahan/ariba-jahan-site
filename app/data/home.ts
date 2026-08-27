// Central content data for the Home page. Content lives in
// content/pages/home.json so it's editable via the Studio.

import siteSettings from "../../content/site-settings.json";
import homeContent from "../../content/pages/home.json";

export type NavLink = { label: string; href: string; external?: boolean };

// Reading Room is intentionally left out here — hidden from nav until the page is built.
export const navLinks: NavLink[] = siteSettings.navLinks;

export const heroSocials = siteSettings.socialLinks;

export type LogoRow = {
  label: string;
  items: string[];
  durationSec: number;
  reverse?: boolean;
};

export const logoRows: LogoRow[] = homeContent.logoMarquee.rows;

export const stats = homeContent.credentials.stats;

export const speakingPhotos = homeContent.speakingTeaser.photos;

// "Projects & Quests" scroll-snap carousel — the first 3 are real Case Studies
// pulled from Work With Me (Ally, WeightWatchers, Stagwell). The final 3 are
// "Quest" (personal project) entries. Content lives in
// content/collections/case-studies-quests.json so it's editable via the Studio.
import experimentsData from "../../content/collections/case-studies-quests.json";

export type Experiment = {
  tag: "Case Study" | "Quest";
  tagIndex: number;
  headline: string;
  description: string;
  photoSrc: string | null;
};

export const experiments: Experiment[] = experimentsData as Experiment[];

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

export type ClosingLink = {
  index: string;
  title: string;
  cta: string;
  href: string;
  external?: boolean;
};

export const closingLinks: ClosingLink[] = homeContent.closingCTA.links;

export const footerSocials = heroSocials;
