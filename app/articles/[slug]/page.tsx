import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { marked } from "marked";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { articleBySlug, publishedArticles } from "../../data/articles";

export function generateStaticParams() {
  return publishedArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article || article.status !== "published") return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article || article.status !== "published") notFound();

  const bodyHtml = marked.parse(article.body, { async: false }) as string;

  return (
    <div className="bg-cream font-body text-lg leading-[1.6]">
      <Nav />
      <article className="px-[clamp(24px,5vw,80px)] pt-[150px] pb-20 max-w-[760px] mx-auto">
        <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-4">
          {new Date(article.publishedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </div>
        <h1 className="font-display text-[40px] max-[700px]:text-[28px] font-black uppercase tracking-[-0.01em] leading-[1.05] text-charcoal mb-6">
          {article.title}
        </h1>
        {article.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-8">
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs font-semibold uppercase tracking-[0.05em] text-charcoal/50 bg-charcoal/[0.06] px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        {article.coverImage && (
          <div className="relative w-full aspect-[16/9] mb-10 overflow-hidden">
            <Image src={article.coverImage} alt="" fill sizes="760px" style={{ objectFit: "cover" }} />
          </div>
        )}
        <div
          className="prose max-w-none text-charcoal/85 [&_h2]:font-display [&_h2]:font-black [&_h2]:uppercase [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:mb-5 [&_a]:text-cherish [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </article>
      <Footer />
    </div>
  );
}
