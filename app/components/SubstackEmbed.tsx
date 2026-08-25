// Substack's /embed iframe is cross-origin, so its title/description/byline
// can't be restyled or removed via CSS — only cropped out of view. The crop
// offset below is calibrated against the iframe's natural 480px-wide render.
// Both sizes render the iframe at that same natural width and scale the
// whole cropped block down with a CSS transform, rather than giving the
// iframe itself a narrower width — a narrower iframe reflows its internal
// text differently (more line wraps) and throws the calibrated crop off.
const CROP_TOP = 330; // px into the iframe where the email/button row starts
const VISIBLE_HEIGHT = 110; // px tall from CROP_TOP through the fine print + logo
const NATURAL_WIDTH = 480;

function EmbedBlock({
  displayWidth,
  className,
}: {
  displayWidth: number;
  className?: string;
}) {
  const scale = displayWidth / NATURAL_WIDTH;
  const displayHeight = VISIBLE_HEIGHT * scale;

  return (
    <div
      className={`relative overflow-hidden bg-white ${className ?? ""}`}
      style={{ width: displayWidth, height: displayHeight }}
    >
      <iframe
        src="https://www.unmissables.xyz/embed"
        scrolling="no"
        loading="lazy"
        title="Subscribe to Unmissables"
        className="absolute left-0 border-0 bg-transparent"
        style={{
          width: NATURAL_WIDTH,
          height: NATURAL_WIDTH,
          top: -CROP_TOP * scale,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}

export default function SubstackEmbed() {
  // Fixed pixel widths can't reflow like fluid CSS, so this renders three
  // calibrated variants and lets Tailwind breakpoints pick which one shows:
  // narrow for mobile (fits full-width in a stacked layout), wider for
  // tablet (same stacked layout, more room to fill), and a third size for
  // desktop where it sits beside the paragraph rather than full-width.
  return (
    <>
      <EmbedBlock displayWidth={300} className="max-[700px]:block hidden" />
      <EmbedBlock
        displayWidth={480}
        className="min-[701px]:max-[1024px]:block hidden"
      />
      <EmbedBlock displayWidth={420} className="min-[1025px]:block hidden" />
    </>
  );
}
