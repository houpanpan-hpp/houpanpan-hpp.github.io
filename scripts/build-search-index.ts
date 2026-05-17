import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

type SearchEntry = {
  title: string
  summary: string
  tags: string[]
  category: string
  slug: string
  date: string
  type: 'post' | 'project'
}

const ROOT = process.cwd()

function readMdxDir(dir: string): { filename: string; data: Record<string, unknown> }[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data } = matter(raw)
      return { filename, data }
    })
}

function build(): SearchEntry[] {
  const entries: SearchEntry[] = []

  for (const { filename, data } of readMdxDir(path.join(ROOT, 'content', 'posts'))) {
    if (!data.title || data.draft) continue
    entries.push({
      type: 'post',
      title: String(data.title),
      summary: String(data.summary ?? ''),
      tags: (data.tags as string[] | undefined) ?? [],
      category: String(data.category ?? 'tech'),
      slug: filename.replace(/\.(mdx|md)$/, ''),
      date:
        typeof data.date === 'string'
          ? data.date
          : data.date instanceof Date
            ? data.date.toISOString()
            : '',
    })
  }

  for (const { filename, data } of readMdxDir(path.join(ROOT, 'content', 'projects'))) {
    if (!data.title) continue
    entries.push({
      type: 'project',
      title: String(data.title),
      summary: String(data.summary ?? ''),
      tags: (data.stack as string[] | undefined) ?? [],
      category: 'project',
      slug: filename.replace(/\.(mdx|md)$/, ''),
      date:
        typeof data.date === 'string'
          ? data.date
          : data.date instanceof Date
            ? data.date.toISOString()
            : '',
    })
  }

  entries.sort((a, b) => (a.date < b.date ? 1 : -1))
  return entries
}

const entries = build()
const outDir = path.join(ROOT, 'public')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'search-index.json'), JSON.stringify(entries))
console.log(`[search] wrote ${entries.length} entries to public/search-index.json`)
