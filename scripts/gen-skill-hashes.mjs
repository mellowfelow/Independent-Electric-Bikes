// Writes the Agent Skills discovery index (v0.2.0) and one SKILL.md per skill under public/.well-known/agent-skills/.
// Each index entry carries a sha256 digest of its SKILL.md file bytes. Run after editing a skill: npm run agent:hash
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';

const ORIGIN = 'https://independentelectricbikes.com.au';
const DIR = new URL('../public/.well-known/agent-skills/', import.meta.url);
const SKILLS = [
  {
    name: 'search-products',
    description: 'Search e-bikes, scooters, skateboards, unicycles, mobility scooters, parts and accessories by keyword, category, or price',
    body: `Use the store MCP server at ${ORIGIN}/api/mcp/ (Streamable HTTP, read-only) and call the search tool with a keyword, optional category and optional maximum price in AUD.\nAlternatively call GET ${ORIGIN}/api/search/?q=<terms>. Prices are in AUD. Only products with a verified specification table list technical figures; never infer motor, range or weight for the others.`,
  },
  {
    name: 'browse-catalog',
    description: 'Browse the full catalog by category',
    body: `Start at ${ORIGIN}/shop/ and follow the category links (electric bikes, electric scooters, electric skateboards, mobility scooters, kids off-road EVs, batteries, parts and kits, safety gear).\nEach product page has a canonical URL, a price in AUD and structured data. Request any page with Accept: text/markdown for a compact version.`,
  },
  {
    name: 'compare-ebikes',
    description: 'Compare motor, battery, range and weight across e-bike models with manufacturer-verified specifications',
    body: `Open ${ORIGIN}/compare/ and choose the models to compare. Only models whose specifications have been verified against the manufacturer appear there; do not present figures for any other model.`,
  },
  {
    name: 'order-draft',
    description: 'Create a prefilled order draft for human customer completion via Email or WhatsApp',
    body: `Use the order-draft tool of the MCP server at ${ORIGIN}/api/mcp/. It returns a prefilled draft only: it never takes payment and never submits an order. The customer completes checkout themselves at ${ORIGIN}/checkout/ or over WhatsApp, pays by bank transfer, PayID or crypto, and must send a screenshot of the payment straight away so the order can be confirmed. Minimum order is AUD 350.`,
  },
  {
    name: 'ebike-guides',
    description: 'Read Australian buying guides and rules for e-bikes, scooters, skateboards, unicycles, mobility scooters, kids EVs, quads and electric water sports',
    body: `Read the guides at ${ORIGIN}/blog/. Each guide links to the related shop categories. Road rules differ by vehicle type and Australian state, so quote the guide and tell the customer to confirm local rules.`,
  },
  {
    name: 'contact-support',
    description: 'Contact Brunswick showroom sales and warranty support team',
    body: `Direct people to ${ORIGIN}/contact/, phone or WhatsApp +61 480 811 308, or the showroom at 380 Sydney Road, Brunswick VIC 3056. Operated by VYRON INDUSTRIES PTY LTD (ABN 23 618 699 479).`,
  },
];

const entries = [];
for (const s of SKILLS) {
  const md = `---\nname: ${s.name}\ndescription: ${s.description}\n---\n\n# ${s.name}\n\n${s.body}\n`;
  mkdirSync(new URL(`${s.name}/`, DIR), { recursive: true });
  writeFileSync(new URL(`${s.name}/SKILL.md`, DIR), md);
  entries.push({
    name: s.name,
    type: 'skill-md',
    description: s.description,
    url: `/.well-known/agent-skills/${s.name}/SKILL.md`,
    digest: `sha256:${createHash('sha256').update(md).digest('hex')}`,
  });
}
const index = { $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json', skills: entries };
writeFileSync(new URL('index.json', DIR), JSON.stringify(index, null, 2) + '\n');
console.log(`Wrote ${entries.length} skills`);
