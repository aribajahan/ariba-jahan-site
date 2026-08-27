import speakingContent from "../../../content/pages/speaking.json";
import SpeakingEditor from "./SpeakingEditor";

export default function AdminSpeaking() {
  return <SpeakingEditor initialContent={speakingContent} />;
}
