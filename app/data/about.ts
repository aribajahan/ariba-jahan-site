// Content data for the About page, extracted from design-reference/about.dc.html
// and design-reference/site-content.md.

import aboutContent from "../../content/pages/about.json";
import storyTimelineChapters from "../../content/collections/story-timeline.json";

export const aboutHero = aboutContent.hero;

export const introParagraph = aboutContent.intro.paragraph;

export type StoryPhoto = {
  src: string;
  /** position/size of this photo within its wrapper, matching about.dc.html's hand-placed polaroid layout */
  top: number;
  widthPct: number;
  rotate: number;
  z: number;
  side: "left" | "right";
};

export type StoryChapter = {
  id: number;
  align: "photo-left" | "photo-right";
  /** wrapper base rotation, reused by the scroll-drift effect (design-system.md's baseRot map) */
  baseRot: number;
  wrapperHeight: number;
  /** Eyebrow/headline text for this chapter. Per design-system.md's "Recently resolved" note,
   *  the tape now always mirrors this verbatim -- a few rows in about.dc.html still carried
   *  older, shorter tape copy (e.g. "SCIENTIFIC RESEARCH" instead of "LAB RESEARCH"); those
   *  are corrected here to match the documented rule rather than reproduced verbatim. */
  headline: string;
  body: string;
  tapeTop: number;
  tapeRotate: number;
  /** only the first chapter's tape carries the extra hard-shadow in about.dc.html */
  tapeShadow?: boolean;
  photoA: StoryPhoto;
  photoB: StoryPhoto;
};

export const storyChapters: StoryChapter[] = storyTimelineChapters as StoryChapter[];

export const rightNowPhotos = [
  { src: "/uploads/now-4-opt.jpg", rotate: -4, translateY: 0, z: 1 },
  { src: "/uploads/now-3-opt.jpg", rotate: 3, translateY: 14, z: 2 },
  { src: "/uploads/now-1-opt.jpg", rotate: -2, translateY: 6, z: 3 },
  { src: "/uploads/now-2-opt.jpg", rotate: 4, translateY: 0, z: 4 },
];

export const storyTimelineContent = aboutContent.storyTimeline;
export const rightNowCopy = aboutContent.storyTimeline.rightNowCopy;

export const bioIntro: string[] = aboutContent.bio.intro;
export const bioExpanded: string[] = aboutContent.bio.expanded;
export const bioEyebrow = aboutContent.bio.eyebrow;

export const careerAdvisory = aboutContent.careerAdvisory;

export type RecognitionItem = {
  label: string;
  year?: string;
  href?: string;
};

export const recognitionFeaturesContent = aboutContent.recognitionFeatures;
export const recognitionItems: RecognitionItem[] = aboutContent.recognitionFeatures.recognitionItems;
export const featuredItems: RecognitionItem[] = aboutContent.recognitionFeatures.featuredItems;

export const aboutClosingCTAContent = aboutContent.closingCTA;

export type AboutClosingLink = {
  index: string;
  title: string;
  cta: string;
  href: string;
  external?: boolean;
};

export const aboutClosingLinks: AboutClosingLink[] = aboutContent.closingCTA.links;
