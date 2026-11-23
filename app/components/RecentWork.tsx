import Image from "next/image";
import Link from "next/link";
import homeContent from "../../content/pages/home.json";

type RecentItem = {
  type: string;
  title: string;
  href: string;
  imageSrc: string;
  external?: boolean;
};

function RecentItemLink({ item }: { item: RecentItem }) {
  const content = (
    <div className="w-full">
      <div className={`relative overflow-hidden bg-charcoal/5 aspect-[3/2] mb-3${item.type === "Teaching AI" ? " border border-charcoal/20" : ""}`}>
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          sizes="(max-width: 900px) 260px, 27vw"
          unoptimized={item.type === "On stage"}
          style={{
            objectFit: "cover",
            objectPosition: item.type.startsWith("Hosting") ? "center 28%" : "center",
          }}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div>
        <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-cherish mb-1">{item.type}</p>
        <h3 className="font-body font-semibold text-[15px] text-charcoal leading-[1.2] tracking-[-0.01em]">
          {item.title}
        </h3>
      </div>
    </div>
  );

  const className = "group block py-3";
  if (item.external) {
    return <a className={className} href={item.href} target="_blank" rel="noopener">{content}</a>;
  }
  return <Link className={className} href={item.href}>{content}</Link>;
}

export default function RecentWork() {
  const { recentWork } = homeContent;
  const items = recentWork.items as RecentItem[];

  return (
    <section id="recent-work" className="bg-cream">
      <div className="reveal max-w-[1400px] mx-auto px-[clamp(24px,5vw,80px)] py-[clamp(28px,3.4vw,44px)]">
        <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-charcoal/60 mb-3">{recentWork.heading}</p>
        <div className="flex gap-6 overflow-x-auto pb-1">
            {items.map((item) => (
              <div key={item.title} className="flex-none w-[clamp(260px,27vw,360px)]">
                <RecentItemLink item={item} />
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
