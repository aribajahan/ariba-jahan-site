// Shared Testimonials collection, referenced from Home, Speaking, and Work
// With Me via each page's `showOn` field. Content lives in
// content/collections/testimonials.json so it's editable via the Studio.
import testimonialsData from "../../content/collections/testimonials.json";

export type TestimonialCategory = "LEADERSHIP" | "SPEAKING" | "CLIENT";
export type TestimonialPage = "home" | "speaking" | "work-with-me";

export type Testimonial = {
  category: TestimonialCategory;
  quote: string;
  name: string;
  role: string;
  showOn: TestimonialPage[];
};

export const allTestimonials = testimonialsData as Testimonial[];

export function testimonialsFor(page: TestimonialPage): Testimonial[] {
  return allTestimonials.filter((t) => t.showOn.includes(page));
}
