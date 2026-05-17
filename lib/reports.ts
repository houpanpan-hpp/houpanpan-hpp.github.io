import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export interface ReportFrontmatter {
  title: string
  date: string
  summary: string
  tags?: string[]
  html?: string
  height?: number
  draft?: boolean
}

export interface Report extends ReportFrontmatter {
  slug: string
  content: string
}

const REPORTS_DIR = path.join(process.cwd(), 'content', 'reports')

function parseReport(filename: string): Report | null {
  const filePath = path.join(REPORTS_DIR, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const fm = data as Partial<ReportFrontmatter>

  if (!fm.title || !fm.date) {
    console.warn(`[reports] Skipping ${filename}: missing required frontmatter`)
    return null
  }
  if (fm.draft) return null

  return {
    slug: filename.replace(/\.(mdx|md)$/, ''),
    title: fm.title,
    date: typeof fm.date === 'string' ? fm.date : new Date(fm.date).toISOString(),
    summary: fm.summary ?? '',
    tags: fm.tags ?? [],
    html: fm.html,
    height: fm.height ?? 800,
    content,
  }
}

export function getAllReports(): Report[] {
  if (!fs.existsSync(REPORTS_DIR)) return []
  const reports = fs
    .readdirSync(REPORTS_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(parseReport)
    .filter((r): r is Report => r !== null)
  reports.sort((a, b) => (a.date < b.date ? 1 : -1))
  return reports
}

export function getReportBySlug(slug: string): Report | null {
  return getAllReports().find((r) => r.slug === slug) ?? null
}
