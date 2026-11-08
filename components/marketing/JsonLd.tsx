export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // Escape "<" so a value containing "</script>" cannot end the tag early.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
