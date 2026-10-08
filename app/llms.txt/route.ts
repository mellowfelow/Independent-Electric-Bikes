import { SITE, CONTACT, SHOP, MASTER_TAXONOMY, PRODUCTS, POSTS } from '@/config/site';
import { money } from '@/lib/order';

export const dynamic = 'force-static';

export function GET() {
  const o = `https://${SITE.domain}`;
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 12);
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.tagline}. Operated by ${SITE.entityName} (ABN ${SITE.abn}) in Brunswick, Victoria since 2017.`,
    '',
    '## Overview',
    `- **Entity:** ${SITE.entityName} (ABN ${SITE.abn})`,
    `- **Headquarters:** ${CONTACT.address}`,
    `- **Phone / WhatsApp:** ${CONTACT.phone}`,
    `- **Email:** ${CONTACT.email}`,
    `- **Minimum Order:** $${SHOP.minOrder} ${SITE.currency}`,
    `- **Free Express Freight:** Orders over $${SHOP.freeShippingThreshold.toLocaleString('en-AU')} ${SITE.currency}`,
    `- **Payment:** Bank transfer, PayID and cryptocurrency (BTC / USDT). ${SHOP.cryptoDiscount}% discount when paying by cryptocurrency`,
    `- **Catalogue size:** ${PRODUCTS.length} products`,
    '',
    '## Product Categories',
    ...MASTER_TAXONOMY.map((m) => `- [${m.name}](${o}/shop/${m.slug}/): ${m.description}`),
    '',
    '## Featured Products',
    ...featured.map((p) => `- [${p.name}](${o}/shop/${p.category}/${p.slug}/): ${money(p.price)} ${SITE.currency} — ${p.shortDescription}`),
    '',
    '## Pages & Resources',
    `- [Product Catalog](${o}/shop/): Browse all products`,
    `- [Brands](${o}/brands/): Shop by brand`,
    `- [Comparison Matrix](${o}/compare/): Compare motor, battery, range and weight side-by-side`,
    `- [About](${o}/about/): Company history`,
    `- [Contact](${o}/contact/): Get in touch with the Brunswick team`,
    `- [FAQ](${o}/faq/): Common questions`,
    `- [Shipping & Delivery](${o}/shipping/): Freight costs, dispatch and delivery`,
    `- [Returns, Refunds & Warranty](${o}/returns/): Consumer rights, 2-year frame and 12-month electrical warranty`,
    `- [Privacy Policy](${o}/privacy/)`,
    `- [Terms of Sale](${o}/terms/)`,
    `- [Blog](${o}/blog/): Buying guides and Australian e-bike regulations`,
    ...POSTS.map((p) => `- [${p.title}](${o}/blog/${p.slug}/)`),
    '',
    '## Optional',
    `- [API Catalog](${o}/.well-known/api-catalog): RFC 9727 API discovery catalog`,
    `- [Agent Skills](${o}/.well-known/agent-skills/index.json): Agent capabilities index`,
    `- [MCP Server Card](${o}/.well-known/mcp/server-card.json): Streamable HTTP MCP server card`,
    `- [Auth Specification](${o}/auth.md): Authentication notes for agents`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
