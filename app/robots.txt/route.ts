import { SITE } from '@/config/site';

const AI_BOTS = [
  'GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Applebot',
  'Amazonbot', 'Bytespider', 'CCBot', 'Google-Extended', 'Meta-ExternalAgent', 'cohere-ai',
];
const DISALLOW = ['/thank-you-contact/', '/thank-you-order/', '/thank-you-wholesale/', '/admin/', '/order/payment-details/', '/order/confirm-payment/'];

export const dynamic = 'force-static';

export function GET() {
  const origin = `https://${SITE.domain}`;
  const body = [
    'User-agent: *',
    ...DISALLOW.map((p) => `Disallow: ${p}`),
    `Sitemap: ${origin}/sitemap.xml`,
    '',
    'Content-Signal: search=yes, ai-input=yes, ai-train=no',
    '',
    '# AI Crawlers',
    ...AI_BOTS.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', ...DISALLOW.map((p) => `Disallow: ${p}`), '']),
    '# Agent Resources',
    `# llms.txt: ${origin}/llms.txt`,
    `# API Catalog: ${origin}/.well-known/api-catalog`,
    `# Agent Skills: ${origin}/.well-known/agent-skills/index.json`,
    `# MCP Server Card: ${origin}/.well-known/mcp/server-card.json`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
