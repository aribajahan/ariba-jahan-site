import { speakingLogos, galleryPhotos } from "../../data/speaking";
import { wwmTrustedByLogos } from "../../data/work-with-me";
import GalleriesLanding from "./GalleriesLanding";

export default function AdminGalleries() {
  const galleries = [
    {
      label: "Speaking Logos",
      href: "/admin/logos",
      count: speakingLogos.length,
      thumbnails: speakingLogos.slice(0, 4).map((l) => l.src),
    },
    {
      label: "Speaking Gallery Photos",
      href: "/admin/gallery",
      count: galleryPhotos.length,
      thumbnails: galleryPhotos.slice(0, 4),
    },
    {
      label: "WWM Trusted By",
      href: "/admin/wwm-trusted-by",
      count: wwmTrustedByLogos.length,
      thumbnails: wwmTrustedByLogos.slice(0, 4).map((l) => l.src),
    },
  ];

  return <GalleriesLanding galleries={galleries} />;
}
