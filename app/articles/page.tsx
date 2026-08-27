import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { publishedArticles } from "../data/articles";

export const metadata: Metadata = {
  title: "Articles",
  description: "Writing from Ariba Jahan on technology, behavior, and what to build next.",
};

export default function ArticlesIndex() {
  const articles = publishedArticles();

  return (
    <div className="bg-cream font-body text-lg leading-[1.6]">
      <Nav />
      <section className="px-[clamp(24px,5vw,80px)] pt-[150px] pb-20 max-w-[900px] mx-auto">
        <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-4">Writing</div>
        <h1 className="font-display text-[48px] max-[700px]:text-[32px] font-black uppercase tracking-[-0.01em] leading-none text-charcoal mb-12">
          Articles
        </h1>

        {articles.length === 0 ? (
          <p className="text-charcoal/60">Nothing published here yet.</p>
        ) : (
          <div className="flex flex-col gap-10">
            {articles.map((article) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="flex gap-6 group">
                {article.coverImage && (
                  <div className="relative w-[180px] h-[120px] flex-shrink-0 overflow-hidden bg-charcoal/5">
                    <Image src={article.coverImage} alt="" fill sizes="180px" style={{ objectFit: "cover" }} />
                  </div>
                )}
                <div>
                  <div className="text-xs text-charcoal/50 mb-1">
                    {new Date(article.publishedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </div>
                  <h2 className="font-display text-2xl font-black uppercase text-charcoal mb-2 group-hover:text-cherish transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-charcoal/70 text-base">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
