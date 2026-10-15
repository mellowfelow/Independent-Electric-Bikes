import { NextRequest } from 'next/server';

// Markdown for Agents: next.config.ts rewrites any page request that sends "Accept: text/markdown" here.
// The page's own HTML is fetched (with Accept: text/html, so the rewrite does not loop) and its <main> content is converted.

const ENTITIES: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'", '&#39;': "'", '&nbsp;': ' ' };
const decode = (s: string) => s.replace(/&(amp|lt|gt|quot|nbsp|#x27|#39);/g, (m) => ENTITIES[m] ?? m);

function toMarkdown(html: string, base: string): { title: string; body: string } {
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  let main = (html.match(/<main[^]*?<\/main>/) || [html])[0];
  main = main
    .replace(/<(script|style|svg|noscript|template|form|button|iframe|picture|nav)[^]*?<\/\1>/g, '')
    .replace(/<img[^>]*>/g, '')
    .replace(/<h([1-6])[^>]*>([^]*?)<\/h\1>/g, (_m, l, t) => `\n\n${'#'.repeat(Number(l))} ${t}\n\n`)
    .replace(/<a [^>]*href="([^"#][^"]*)"[^>]*>([^]*?)<\/a>/g, (_m, href, t) => {
      const text = t.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      if (!text) return '';
      const url = href.startsWith('/') ? base + href : href;
      return `[${text}](${url})`;
    })
    .replace(/<li[^>]*>/g, '\n- ')
    .replace(/<\/(p|div|section|ul|ol|tr|table|article|header|footer)>/g, '\n\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<(strong|b)[^>]*>([^]*?)<\/\1>/g, '**$2**')
    .replace(/<[^>]*>/g, ' ');
  const body = decode(main)
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return { title, body };
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ path?: string[] }> }) {
  const url = new URL(req.url);
  const { path: segs = [] } = await ctx.params;
  let path = '/' + segs.join('/');
  if (!path.startsWith('/') || path.startsWith('//') || path.startsWith('/api/')) path = '/';
  if (!path.endsWith('/')) path += '/';
  const origin = url.origin;
  const res = await fetch(origin + path, { headers: { accept: 'text/html' }, cache: 'no-store' });
  if (!res.ok) return new Response('Not found\n', { status: res.status, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  const html = await res.text();
  const { title, body } = toMarkdown(html, origin);
  const md = `# ${title}\n\nSource: ${origin}${path}\n\n${body}\n`;
  return new Response(md, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(Math.ceil(md.length / 4)),
      vary: 'Accept',
      'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'access-control-allow-origin': '*',
    },
  });
}
