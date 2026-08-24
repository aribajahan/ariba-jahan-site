import { introParagraph } from "../data/about";

export default function AboutIntro() {
  return (
    <section className="bg-cream pt-20 max-[700px]:pt-14 pb-10 px-[clamp(24px,5vw,80px)]">
      <p className="max-w-[640px] mx-auto text-center text-xl leading-[1.6] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-charcoal/75">
        {introParagraph}
      </p>
    </section>
  );
}
