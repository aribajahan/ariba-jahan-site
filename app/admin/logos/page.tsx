import { speakingLogos } from "../../data/speaking";
import LogosEditor from "./LogosEditor";

export default function AdminLogos() {
  return <LogosEditor initialItems={speakingLogos} />;
}
