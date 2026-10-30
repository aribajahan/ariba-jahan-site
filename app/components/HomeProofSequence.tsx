"use client";

import { useEffect, useRef, useState } from "react";

export type ProofExcerpt = { name: string; role: string; excerpt: string };

export default function HomeProofSequence({ quotes }: { quotes: ProofExcerpt[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused || interacting || quotes.length < 2) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      const box = container.current?.getBoundingClientRect();
      if (document.hidden || reducedMotion.matches || !box || box.top >= window.innerHeight || box.bottom <= 0) return;
      setActive(index => (index + 1) % quotes.length);
    }, quotes[active].excerpt.split(/\s+/).length > 35 ? 15000 : 12000);
    return () => window.clearInterval(timer);
  }, [paused, interacting, quotes, active]);

  if (!quotes.length) return null;
  return <div ref={container} className="max-w-[850px] mx-auto mt-11 max-[700px]:mt-8 text-center text-cream" aria-label="Client testimonials" aria-roledescription="carousel"
    onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
    onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
    <div className="grid" aria-live="off">
      {quotes.map((quote, index) => <figure key={quote.name} className={`col-start-1 row-start-1 ${index === active ? "visible" : "invisible"}`} aria-hidden={index !== active}>
        <blockquote className="text-[18px] max-[700px]:text-body">&ldquo;{quote.excerpt}&rdquo;</blockquote>
        <figcaption className="text-[13px] leading-[1.4] mt-2 text-cream/90">{quote.name} · {quote.role}</figcaption>
      </figure>)}
    </div>
    <div className="flex items-center justify-center gap-0 mt-1">
      {quotes.map((quote, index) => <button key={quote.name} type="button" aria-label={`Show testimonial from ${quote.name}`} aria-pressed={index === active}
        onClick={() => { setActive(index); setPaused(true); }} className="w-8 h-8 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-cream">
        <span className={`w-[4px] h-[4px] rounded-full ${index === active ? "bg-cream/75" : "bg-cream/30"}`} />
      </button>)}
      <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play testimonial sequence" : "Pause testimonial sequence"} title={paused ? "Play" : "Pause"} className="w-8 h-8 flex items-center justify-center text-cream/55 hover:text-cream/90 cursor-pointer focus-visible:outline-2 focus-visible:outline-cream">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">{paused ? <path d="M3 1.5 10 6 3 10.5Z" /> : <><rect x="2" y="1.5" width="2.5" height="9" /><rect x="7.5" y="1.5" width="2.5" height="9" /></>}</svg>
      </button>
    </div>
  </div>;
}
