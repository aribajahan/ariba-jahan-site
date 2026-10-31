// Central content data for the Home page. Content lives in
// content/pages/home.json so it's editable via the Studio.

import siteSettings from "../../content/site-settings.json";
import homeContent from "../../content/pages/home.json";

export type NavLink = { label: string; href: string; external?: boolean };

// Shared navigation order and external destinations are editable in Studio settings.
export const navLinks: NavLink[] = siteSettings.navLinks;

export const heroSocials = siteSettings.socialLinks;

export type MarqueeRow = {
  label: string;
  items: string[];
  durationSec: number;
  reverse?: boolean;
};

export const stats = homeContent.credentials.stats;

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

export { type Testimonial } from "./testimonials";
import { testimonialsFor } from "./testimonials";

export const testimonials = testimonialsFor("home");

export type CommunityPhoto = {
  photoSrc: string;
  caption: string;
  number: number;
};

export const footerSocials = heroSocials;
