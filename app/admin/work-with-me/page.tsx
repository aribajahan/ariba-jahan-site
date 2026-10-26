import overview from "../../../content/pages/work-with-me-overview.json";
import photos from "../../../content/pages/work-with-me-photo-preview.json";
import WorkWithMeOverviewEditor from "./WorkWithMeOverviewEditor";

export default function AdminWorkWithMe() {
  return <WorkWithMeOverviewEditor initialContent={overview} initialPhotos={photos} />;
}
