type JsonLdProps = {
  data: Record<string, unknown>;
};

/** Renders server-side JSON-LD with the escaping recommended by Next.js. */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
