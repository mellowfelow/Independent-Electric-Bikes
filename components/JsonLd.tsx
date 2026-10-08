// "<" is replaced with a JSON unicode escape (backslash + u003c) so data can never close the script tag.
const ESCAPED_LT = String.fromCharCode(92) + 'u003c';

export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, ESCAPED_LT) }}
    />
  );
}
