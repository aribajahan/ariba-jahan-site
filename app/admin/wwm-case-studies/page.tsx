import { caseStudies } from "../../data/work-with-me";
import WwmCaseStudiesEditor from "./WwmCaseStudiesEditor";

export default function AdminWwmCaseStudies() {
  return <WwmCaseStudiesEditor initialItems={caseStudies} />;
}
