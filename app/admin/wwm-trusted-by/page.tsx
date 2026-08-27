import { wwmTrustedByLogos } from "../../data/work-with-me";
import WwmTrustedByEditor from "./WwmTrustedByEditor";

export default function AdminWwmTrustedBy() {
  return <WwmTrustedByEditor initialItems={wwmTrustedByLogos} />;
}
