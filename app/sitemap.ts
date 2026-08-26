import type { MetadataRoute } from "next";

const baseUrl = "https://aribajahan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/speaking`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/work-with-me`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
