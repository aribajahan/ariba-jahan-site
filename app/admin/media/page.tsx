import { getMediaLibrary } from "../../../lib/mediaLibrary";
import MediaLibraryEditor from "./MediaLibraryEditor";

export const dynamic = "force-dynamic";

export default function AdminMedia() {
  const items = getMediaLibrary();
  return <MediaLibraryEditor initialItems={items} />;
}
