/** Renders an email address entity-encoded so it is readable by people but not trivially scraped from the HTML source. */
export function EmailText({ email }: { email: string }) {
  const encoded = Array.from(email)
    .map((c) => `&#${c.charCodeAt(0)};`)
    .join('');
  return <span dangerouslySetInnerHTML={{ __html: encoded }} />;
}
