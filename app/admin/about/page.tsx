import aboutContent from "../../../content/pages/about.json";
import AboutEditor from "./AboutEditor";

export default function AdminAbout() {
  return <AboutEditor initialContent={aboutContent} />;
}
