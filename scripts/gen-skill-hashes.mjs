// Recomputes the sha256 of each skill definition in public/.well-known/agent-skills/index.json.
// The digest covers the skill's name, type, description and url, so it changes whenever the definition changes.
// Run after editing the skills: npm run agent:hash
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const file = new URL('../public/.well-known/agent-skills/index.json', import.meta.url);
const index = JSON.parse(readFileSync(file, 'utf8'));
for (const skill of index.skills) {
  const { name, type, description, url } = skill;
  skill.sha256 = createHash('sha256').update(JSON.stringify({ name, type, description, url })).digest('hex');
}
writeFileSync(file, JSON.stringify(index, null, 2) + '\n');
console.log(`Updated ${index.skills.length} skill digests`);
