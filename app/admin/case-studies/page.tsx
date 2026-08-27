import { experiments } from "../../data/home";
import CaseStudiesEditor from "./CaseStudiesEditor";

export default function AdminCaseStudies() {
  return <CaseStudiesEditor initialItems={experiments} />;
}
