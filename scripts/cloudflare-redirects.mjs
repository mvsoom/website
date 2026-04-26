import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import slugify from "slugify";

const REDIRECT_STATUS = 302;
const DEFAULT_VAULT_DIR = fileURLToPath(
  new URL("../src/content/vault/", import.meta.url),
);

function pickString(value) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

async function getMarkdownFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return getMarkdownFiles(entryPath);
      if (
        entry.isFile() &&
        entry.name.endsWith(".md") &&
        !entry.name.startsWith("_")
      ) {
        return [entryPath];
      }
      return [];
    }),
  );

  return files.flat();
}

function getFirstH1(markdown, filePath) {
  let fence = null;

  for (const line of markdown.split(/\r?\n/)) {
    const fenceMatch = line.match(/^(```+|~~~+)/);
    if (fenceMatch) {
      fence = fence === null ? fenceMatch[1][0] : null;
      continue;
    }

    if (fence !== null) continue;

    const heading = line.match(/^#\s+(.+?)\s*#*\s*$/);
    if (heading) return heading[1].replace(/[`*_~]/g, "").trim();
  }

  throw new Error(`[redirects] ${filePath}: expected a markdown H1`);
}

function getPostId({ data, content }, filePath) {
  return (
    pickString(data.slug) ??
    slugify(getFirstH1(content, filePath), { lower: true, strict: true })
  );
}

function getSourcePaths(id) {
  const source = `/${id}`;
  return [source, `${source}/`];
}

function getRedirectTarget(data, filePath) {
  const target = pickString(data.redirect);
  if (!target) return null;

  try {
    return new URL(target).href;
  } catch {
    throw new Error(
      `[redirects] ${filePath}: invalid redirect URL "${target}"`,
    );
  }
}

export async function generateCloudflareRedirects({
  outDir,
  vaultDir = DEFAULT_VAULT_DIR,
} = {}) {
  if (!outDir) throw new Error("[redirects] outDir is required");

  const markdownFiles = await getMarkdownFiles(vaultDir);
  const rules = [];

  for (const filePath of markdownFiles) {
    const parsed = matter(await fs.readFile(filePath, "utf8"));
    if (parsed.data.published === undefined) continue;

    const target = getRedirectTarget(parsed.data, filePath);
    if (!target) continue;

    const id = getPostId(parsed, filePath);
    for (const source of getSourcePaths(id)) {
      rules.push(`${source} ${target} ${REDIRECT_STATUS}`);
    }
  }

  rules.sort();

  const filePath = path.join(outDir, "_redirects");
  await fs.writeFile(
    filePath,
    [
      "# Generated from vault post frontmatter `redirect` fields.",
      "# Cloudflare Pages serves these before the static Astro redirect pages.",
      ...rules,
      "",
    ].join("\n"),
  );

  return { filePath, rules };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const outDir = process.argv[2] ?? "dist";
  const result = await generateCloudflareRedirects({ outDir });
  console.log(
    `Generated ${result.rules.length} redirect rules at ${result.filePath}`,
  );
}
