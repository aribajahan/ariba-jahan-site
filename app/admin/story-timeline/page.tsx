import { storyChapters } from "../../data/about";
import StoryTimelineEditor from "./StoryTimelineEditor";

export default function AdminStoryTimeline() {
  return <StoryTimelineEditor initialItems={storyChapters} />;
}
