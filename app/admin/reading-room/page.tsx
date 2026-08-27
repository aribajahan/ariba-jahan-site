import books from "../../../content/collections/reading-room-books.json";
import ReadingRoomEditor from "./ReadingRoomEditor";

export default function AdminReadingRoom() {
  return <ReadingRoomEditor initialItems={books} />;
}
