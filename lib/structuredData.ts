import about from "../content/pages/about.json";
import seo from "../content/seo.json";
import siteSettings from "../content/site-settings.json";
import { siteUrl } from "./seoMeta";

const [personName, jobTitle] = seo.home.title.split(" — ", 2);

export const personId = `${siteUrl}/#ariba-jahan`;

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: personName,
  url: siteUrl,
  jobTitle,
  description: seo.home.description,
  image: new URL(about.hero.photoSrc, siteUrl).toString(),
  sameAs: siteSettings.socialLinks.map(({ href }) => href),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: personName,
  url: siteUrl,
  publisher: { "@id": personId },
};

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema],
};

export const aboutProfilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteUrl}/about/#profilepage`,
  url: `${siteUrl}/about`,
  mainEntity: { "@id": personId, "@type": "Person", name: personName },
};
