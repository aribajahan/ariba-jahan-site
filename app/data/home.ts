// Central content data for the Home page, extracted from design-reference/home.dc.html
// and design-reference/site-content.md.

import siteSettings from "../../content/site-settings.json";

export type NavLink = { label: string; href: string; external?: boolean };

// Reading Room is intentionally left out here — hidden from nav until the page is built.
export const navLinks: NavLink[] = siteSettings.navLinks;

export const heroSocials = siteSettings.socialLinks;

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

export { type Testimonial } from "./testimonials";
import { testimonialsFor } from "./testimonials";

export const testimonials = testimonialsFor("home");

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
