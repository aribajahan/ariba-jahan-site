// Logos are transparent PNGs at wildly different aspect ratios -- cropping them to
// fill a square (objectFit: cover) zooms each one to a different, arbitrary scale.
// They need objectFit: contain instead, same treatment as the dedicated Logos/WWM
// Trusted By editors. Filename convention catches even unused logo files that
// aren't tied to a gallery collection yet.
export function isLogo(item: { src: string; collections: string[] }): boolean {
  return (
    /\/logo-/.test(item.src) ||
    item.collections.includes("Speaking Logos") ||
    item.collections.includes("Wwm Trusted By")
  );
}
