import type { Metadata } from "next";
import seo from "../content/seo.json";

type PageKey = keyof typeof seo;

function resolveOgImage(pageKey: PageKey): string | null {
  const page = seo[pageKey];
  const useHome = "useHomeOgImage" in page && page.useHomeOgImage;
  const image = useHome ? seo.home.ogImage : page.ogImage;
  return image ? image : null;
}

/**
 * Builds title/description metadata for a page plus, when an OG image is
 * set (its own or Home's, per the "use same as Home" toggle), an explicit
 * openGraph/twitter image override. With no image set, pages fall back to
 * the site's default app/opengraph-image.jpg via Next's file convention.
 */
export function buildPageMetadata(pageKey: PageKey, options: { absoluteTitle?: boolean } = {}): Metadata {
  const page = seo[pageKey];
  const image = resolveOgImage(pageKey);

  return {
    title: options.absoluteTitle ? { absolute: page.title } : page.title,
    description: page.description,
    ...(image && {
      openGraph: { images: [{ url: image }] },
      twitter: { card: "summary_large_image", images: [image] },
    }),
  };
}
