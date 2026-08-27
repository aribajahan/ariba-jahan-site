// Logos are transparent PNGs at wildly different aspect ratios -- cropping them to
// fill a square (objectFit: cover) zooms each one to a different, arbitrary scale.
// They need objectFit: contain instead, same treatment as the dedicated Logos/WWM
// Trusted By editors. Filename convention catches even unused logo files that
// aren't tied to a gallery collection yet. Matching against `collectionKeys` (raw
// filenames like "speaking-logos") rather than the humanized display label keeps
// this working even if a collection's display label formatting ever changes.
const LOGO_COLLECTION_KEYS = ["speaking-logos", "wwm-trusted-by"];

export function isLogo(item: { src: string; collectionKeys: string[] }): boolean {
  return /\/logo-/.test(item.src) || item.collectionKeys.some((key) => LOGO_COLLECTION_KEYS.includes(key));
}
