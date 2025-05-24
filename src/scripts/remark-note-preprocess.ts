import fs from 'node:fs';
import slugify from 'slugify';
import matter from 'gray-matter';
import type { VFile } from 'vfile';
import type { Root } from 'mdast';
import type { MarkdownPlugin } from 'astro';

const seen = new Map<string, string>();

function isPublic(fm: Record<string, unknown>) {
  return fm.published !== undefined && fm.published !== false;
}

const preprocess: MarkdownPlugin<Root, Root> = () => {
  return (_tree, file: VFile): void => {
    if (!file.path?.endsWith('.md')) return;

    const abs = file.path;
    const astro = (file.data as any).astro ?? {};
    const fm = astro.frontmatter ?? {};

    if (!isPublic(fm)) return;

    if (typeof fm.title !== 'string' || !fm.title.trim()) {
      console.warn(`[preprocess] ${abs} has no title; skipping`);
      return;
    }

    // Never overwrite existing slug
    let slug: string = fm.slug;
    if (!slug) {
      slug = slugify(fm.title, { lower: true, strict: true });
      fm.slug = slug;
      astro.frontmatter = fm;
      (file.data as any).astro = astro;

      // rebuild full markdown text with front-matter + body
      const body = file.value as string;
      const out = matter.stringify(body, fm);
      file.value = out;
      fs.writeFileSync(abs, out);   // ← enable when ready to write
      console.log(`[preprocess] slug set → ${slug}  (${abs})`);
    }

    // Check for duplicate slugs
    const clash = seen.get(slug);
    if (clash && clash !== abs) {
      throw new Error(
        `[preprocess] duplicate slug "${slug}"\n  first: ${clash}\n  again:  ${abs}`,
      );
    }
    seen.set(slug, abs);
  };
};

export default preprocess;
