// Content data for the Work With Me page, extracted from
// design-reference/work-with-me.dc.html and design-reference/site-content.md.

export type TrustedByLogo = { src: string; alt: string; heightPx: number };

import wwmTrustedByLogosData from "../../content/collections/wwm-trusted-by.json";

export const wwmTrustedByLogos: TrustedByLogo[] = wwmTrustedByLogosData;

export type ProblemCard = {
  photoSrc: string;
  title: string;
  description: string;
};

import wwmContentForOffers from "../../content/pages/work-with-me.json";

export type ProblemFramingView = { label: string; intro: string; cards: ProblemCard[] };

// Problem framing is two views — what customers experience, what organizations
// need — switched by a toggle in the component.
export const problemFramingViews: ProblemFramingView[] = wwmContentForOffers.problemFraming.views;

export const cxSprintFitPoints: string[] = wwmContentForOffers.cxSprint.fitPoints;

export type SprintDeliverable = { title: string; description: string };

export const cxSprintDeliverables: SprintDeliverable[] = wwmContentForOffers.cxSprint.deliverables;

export type SprintWeek = { title: string; description: string };

export const cxSprintWeeks: SprintWeek[] = wwmContentForOffers.cxSprint.weeks;

export const cxSprintContent = wwmContentForOffers.cxSprint;

export const strategySessionBestFor: string[] = wwmContentForOffers.strategySessions.bestFor;

export const strategySessionsContent = wwmContentForOffers.strategySessions;

export { type Testimonial as WwmTestimonial } from "./testimonials";
import { testimonialsFor } from "./testimonials";

export const wwmTestimonials = testimonialsFor("work-with-me");

export type CaseStudyTestimonial = { quote: string; name: string; role: string };

export type CaseStudy = {
  tagRotationDeg: number;
  photoSrc: string;
  client: string;
  title: string;
  summary: string;
  pills: string[];
  challenge: string;
  solution: string;
  impact: string;
  roleContext: string;
  testimonial?: CaseStudyTestimonial;
};

// The six flip cards on Work With Me. Content lives in
// content/collections/wwm-case-studies.json so it's editable via the Studio.
// The Home page's Select Work strip is a separate, deliberately shorter
// collection (content/collections/case-studies-quests.json).
import wwmCaseStudiesData from "../../content/collections/wwm-case-studies.json";

export const caseStudies: CaseStudy[] = wwmCaseStudiesData;


export type WwmClosingLink = {
  index: string;
  title: string;
  cta: string;
  href: string;
  sub?: string;
  external?: boolean;
};

export const wwmClosingLinks: WwmClosingLink[] = wwmContentForOffers.closingCTA.links;
