import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export interface ProjectFrontmatter {
  title: string
  date: string
  summary: string
  stack?: string[]
  url?: string
  repo?: string
  cover?: string
  featured?: boolean
  order?: number
}

export interface Project extends ProjectFrontmatter {
  slug: string
  content: string
}

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects')

export function getProjectBySlug(slug: string): Project | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return []
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))

  const projects: Project[] = []
  for (const filename of files) {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), 'utf-8')
    const { data, content } = matter(raw)
    const fm = data as Partial<ProjectFrontmatter>
    if (!fm.title) continue

    projects.push({
      slug: filename.replace(/\.(mdx|md)$/, ''),
      title: fm.title,
      date: fm.date ?? '',
      summary: fm.summary ?? '',
      stack: fm.stack ?? [],
      url: fm.url,
      repo: fm.repo,
      cover: fm.cover,
      featured: fm.featured,
      order: fm.order ?? 0,
      content,
    })
  }

  projects.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    if (a.order !== b.order) return (b.order ?? 0) - (a.order ?? 0)
    return a.date < b.date ? 1 : -1
  })

  return projects
}
