// Record of the eyebrow pass, Oct 30 2026.
//
// Eyebrows were removed from the site that day. An eyebrow is the small
// letterspaced caps label that used to sit above a heading; it comes from
// newspaper layout, where it tells you which section a story belongs to on a
// page full of competing stories. A single-owner site hands a reader one page
// in a fixed order, so there was nothing to classify, and the label ended up
// repeating the heading underneath it.
//
// The `eyebrow` field still exists in the page JSON and in the Studio editors.
// Typing a value into an empty one puts the label back on the site — the
// rendering is conditional, not deleted. This file is the record of what each
// one used to say and why it is empty, so that is a deliberate choice rather
// than an accident.
//
// The full rule lives in the voice canon, Section 7 ("No eyebrows").

export type EyebrowState =
  | { kind: "retired"; was: string }
  | { kind: "repurposed"; was: string; rendersAs: string }
  | { kind: "moved"; was: string; movedTo: string }
  | { kind: "untouched" };

export type SectionRecord = {
  /** Human label for the section. */
  section: string;
  /** Dotted path into the page JSON. "" means the file root. */
  path: string;
  /** Which key under that path holds the heading, if any. */
  headingKey?: "heading" | "headline";
  eyebrow: EyebrowState;
  note?: string;
};

export type PageRecord = {
  page: string;
  /** Live route. */
  href: string;
  /** Studio editor that owns this page's copy, if there is one. */
  editorHref?: string;
  /** Which content file this page reads. */
  contentFile: string;
  sections: SectionRecord[];
};

export const RETIRED_ON = "October 30, 2026";

export const PAGE_RECORDS: PageRecord[] = [
  {
    page: "Home",
    href: "/",
    editorHref: "/admin/home",
    contentFile: "home.json",
    sections: [
      { section: "Work With Me teaser", path: "workWithMeTeaser", headingKey: "heading", eyebrow: { kind: "retired", was: "Engagements" } },
      { section: "Unmissables", path: "unmissables", headingKey: "heading", eyebrow: { kind: "retired", was: "Writing and Thinking" } },
      {
        section: "Reading Room",
        path: "readingRoom",
        headingKey: "heading",
        eyebrow: { kind: "moved", was: "A facilitated reading & discussion series about AI", movedTo: "Description" },
        note: "The eyebrow was a full sentence, so it was folded into the Description field, which was already carrying the subhead.",
      },
      {
        section: "Speaking teaser",
        path: "speakingTeaser",
        headingKey: "heading",
        eyebrow: { kind: "retired", was: "Speaking & Writing" },
        note: 'Heading was "People + Technology", which named a topic without saying the section was about speaking. Renamed to "Speaking" on Oct 30, 2026.',
      },
      { section: "Projects & Quests", path: "experiments", headingKey: "heading", eyebrow: { kind: "retired", was: "Select Work" } },
      { section: "Recognition", path: "recognition", headingKey: "heading", eyebrow: { kind: "retired", was: "Credentials" } },
      { section: "Press", path: "press", headingKey: "heading", eyebrow: { kind: "retired", was: "In The Press" } },
      { section: "Testimonials", path: "testimonialsSection", headingKey: "heading", eyebrow: { kind: "retired", was: "Client Voices" } },
      { section: "Community", path: "community", headingKey: "heading", eyebrow: { kind: "untouched" } },
      { section: "Closing CTA", path: "closingCTA", headingKey: "heading", eyebrow: { kind: "untouched" } },
    ],
  },
  {
    page: "Work With Me",
    href: "/work-with-me",
    editorHref: "/admin/work-with-me",
    contentFile: "work-with-me.json",
    sections: [
      {
        section: "Trusted By",
        path: "wwmTrustedBy",
        eyebrow: { kind: "repurposed", was: "Trusted By", rendersAs: "the section heading" },
        note: "The only label on the logo wall, so it became a heading rather than being cut.",
      },
      { section: "Problem framing", path: "problemFraming", headingKey: "heading", eyebrow: { kind: "retired", was: "What's Changed" } },
      {
        section: "Ambition Sprint",
        path: "cxSprint",
        headingKey: "heading",
        eyebrow: { kind: "repurposed", was: "01 · For Teams & Organizations", rendersAs: "a subhead below the heading" },
        note: "Says who the offer is for, which the heading cannot carry.",
      },
      {
        section: "1:1 Strategy Sessions",
        path: "strategySessions",
        headingKey: "heading",
        eyebrow: { kind: "repurposed", was: "02 · For Individual Leaders", rendersAs: "a subhead below the heading" },
      },
      { section: "Testimonials", path: "testimonialsSection", headingKey: "heading", eyebrow: { kind: "retired", was: "Client Voices" } },
      { section: "Case Studies", path: "caseStudiesSection", headingKey: "heading", eyebrow: { kind: "retired", was: "Some Of My Work" } },
      { section: "Two Ways divider", path: "twoWaysDivider", headingKey: "heading", eyebrow: { kind: "untouched" } },
      { section: "Closing CTA", path: "closingCTA", headingKey: "heading", eyebrow: { kind: "untouched" } },
    ],
  },
  {
    page: "Work With Me overview",
    href: "/work-with-me",
    contentFile: "work-with-me-overview.json",
    sections: [
      {
        section: "Overview intro",
        path: "",
        headingKey: "heading",
        eyebrow: { kind: "retired", was: "Work with me" },
        note: "Named the page the reader was already on. Nothing renders this field today.",
      },
    ],
  },
  {
    page: "About",
    href: "/about",
    editorHref: "/admin/about",
    contentFile: "about.json",
    sections: [
      { section: "Hero", path: "hero", headingKey: "headline", eyebrow: { kind: "retired", was: "About" }, note: "Named the page the reader was already on." },
      { section: "Story timeline", path: "storyTimeline", headingKey: "heading", eyebrow: { kind: "retired", was: "My Story" } },
      {
        section: "Bio",
        path: "bio",
        eyebrow: { kind: "repurposed", was: "Bio", rendersAs: "the section heading" },
        note: "The only label on the section. Worth asking whether the section needs a heading at all, or should open on the first line of the bio.",
      },
      {
        section: "Career Advisory",
        path: "careerAdvisory",
        headingKey: "headline",
        eyebrow: { kind: "repurposed", was: "For the Career-Ambitious", rendersAs: "a subhead below the heading" },
      },
      { section: "Recognition & features", path: "recognitionFeatures", headingKey: "heading", eyebrow: { kind: "retired", was: "Recognition & Features" } },
      { section: "Closing CTA", path: "closingCTA", headingKey: "heading", eyebrow: { kind: "untouched" } },
    ],
  },
  {
    page: "Speaking",
    href: "/speaking",
    editorHref: "/admin/speaking",
    contentFile: "speaking.json",
    sections: [
      { section: "Hero", path: "hero", headingKey: "headline", eyebrow: { kind: "retired", was: "Speaking" }, note: "Named the page the reader was already on." },
      { section: "Themes", path: "themes", headingKey: "heading", eyebrow: { kind: "retired", was: "Current Speaking Themes" } },
      { section: "Testimonials", path: "testimonialsSection", headingKey: "heading", eyebrow: { kind: "retired", was: "From the Stage" } },
      { section: "Engagements", path: "engagements", headingKey: "heading", eyebrow: { kind: "retired", was: "Selected Speaking Engagements" } },
      { section: "Closing CTA", path: "closingCTA", headingKey: "heading", eyebrow: { kind: "untouched" } },
    ],
  },
];

/** Eyebrows written directly into components. These never had a Studio field. */
export type HardcodedRecord = {
  where: string;
  file: string;
  was: string;
  outcome: string;
};

export const HARDCODED_RECORDS: HardcodedRecord[] = [
  { where: "Work With Me hero", file: "WorkWithMeHero.tsx", was: "Work With Me", outcome: "Cut. Named the page the reader was already on." },
  { where: "Contact", file: "ContactForm.tsx", was: "Get In Touch", outcome: 'Cut. The heading below it already said "Let\'s Talk".' },
  { where: "Articles", file: "articles/page.tsx", was: "Writing", outcome: 'Cut. The heading below it already said "Articles".' },
  { where: "Press kit header", file: "PressKit.tsx", was: "Press Kit", outcome: "Cut. Named the page the reader was already on." },
  { where: "Press kit — about", file: "PressKit.tsx", was: "About", outcome: "Promoted to a heading. It was the only label on the section." },
  { where: "Press kit — speaking topics", file: "PressKit.tsx", was: "Speaking Topics", outcome: "Promoted to a heading. It was the only label on the column." },
  { where: "Press kit — recognition", file: "PressKit.tsx", was: "Recognition", outcome: "Promoted to a heading. It was the only label on the column." },
  { where: "Press kit — currently", file: "PressKit.tsx", was: "Currently", outcome: "Promoted to a heading. It was the only label on the grid." },
  { where: "Press kit — logo rows", file: "PressKit.tsx", was: "Clients & Partners / Invited To Speak At", outcome: "Promoted to headings. The only label on each logo wall." },
  { where: "Press kit — download", file: "PressKit.tsx", was: "For Media & Event Organizers", outcome: "Moved below the Download Kit heading as a subhead." },
  { where: "Press kit — bookings", file: "PressKit.tsx", was: "For Bookings & Inquiries", outcome: "Moved below the email address." },
  { where: "Offer detail pages", file: "WorkWithMeOfferDetail.tsx", was: "The per-offer audience line", outcome: "Moved below the heading as a subhead." },
  { where: "Password gate", file: "PageGate.tsx", was: "Password Protected", outcome: "Left alone. Utility screen, not a public page." },
];
