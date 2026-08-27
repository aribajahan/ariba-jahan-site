import homeContent from "../../content/pages/home.json";

export default function Positioning() {
  const { positioning } = homeContent;

  return (
    <section id="positioning" className="bg-cream pt-14 px-[clamp(24px,5vw,80px)] pb-14">
      <div className="max-w-[1100px] mx-auto flex flex-col gap-6">
        {positioning.paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-[26px] max-[1024px]:text-[21px] max-[700px]:text-[16px] leading-[1.6] max-[700px]:leading-[1.45] text-charcoal"
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
