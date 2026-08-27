import homeContent from "../../../content/pages/home.json";
import HomeEditor from "./HomeEditor";

export default function AdminHome() {
  return <HomeEditor initialContent={homeContent} />;
}
