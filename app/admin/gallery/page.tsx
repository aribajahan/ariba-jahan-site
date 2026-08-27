import { galleryPhotos } from "../../data/speaking";
import GalleryEditor from "./GalleryEditor";

export default function AdminGallery() {
  return <GalleryEditor initialItems={galleryPhotos} />;
}
