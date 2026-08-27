import articlesData from "../../content/collections/articles.json";

export type Article = {
  slug: string;
  title: string;
  coverImage: string;
  excerpt: string;
  body: string;
  tags: string[];
  publishedDate: string;
  status: "draft" | "published";
};

export const allArticles: Article[] = articlesData as Article[];

export function publishedArticles(): Article[] {
  return allArticles
    .filter((a) => a.status === "published")
    .sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));
}

export function articleBySlug(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}
