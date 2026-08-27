import { allTestimonials } from "../../data/testimonials";
import TestimonialsEditor from "./TestimonialsEditor";

export default function AdminTestimonials() {
  return <TestimonialsEditor initialItems={allTestimonials} />;
}
