import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export function getBlogContent(slug: string): string | null {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  // The page already renders the post title as its single <h1>; drop a leading "# Title" line from the markdown.
  const md = fs.readFileSync(file, 'utf8').replace(/^\s*# [^\n]*\n+/, '');
  return marked.parse(md, { async: false }) as string;
}

export function hasBlogContent(slug: string): boolean {
  return fs.existsSync(path.join(CONTENT_DIR, `${slug}.md`));
}
