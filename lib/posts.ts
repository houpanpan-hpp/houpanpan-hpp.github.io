import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { readingTime } from './utils'

export type Category = 'tech' | 'retro' | 'life'

export interface PostFrontmatter {
  slug?: string
  title: string
  date: string
  tags: string[]
  category: Category
  summary: string
  cover?: string
  draft?: boolean
}

export interface Post extends PostFrontmatter {
  slug: string
  content: string
  readingMinutes: number
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

function slugFromFrontmatterOrFilename(filename: string, fm: Partial<PostFrontmatter>): string {
  return fm.slug?.trim() || filename.replace(/\.(mdx|md)$/, '')
}

function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug)
  } catch {
    return slug
  }
}

function readPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
}

function parsePost(filename: string): Post | null {
  const filePath = path.join(POSTS_DIR, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const fm = data as Partial<PostFrontmatter>

  if (!fm.title || !fm.date) {
    console.warn(`[posts] Skipping ${filename}: missing required frontmatter`)
    return null
  }
  if (fm.draft) return null

  const slug = slugFromFrontmatterOrFilename(filename, fm)

  return {
    slug,
    title: fm.title,
    date: typeof fm.date === 'string' ? fm.date : new Date(fm.date).toISOString(),
    tags: fm.tags ?? [],
    category: fm.category ?? 'tech',
    summary: fm.summary ?? '',
    cover: fm.cover,
    content,
    readingMinutes: readingTime(content),
  }
}

export function getAllPosts(): Post[] {
  const posts = readPostFiles()
    .map(parsePost)
    .filter((p): p is Post => p !== null)
  posts.sort((a, b) => (a.date < b.date ? 1 : -1))
  return posts
}

export function getPostBySlug(slug: string): Post | null {
  const decodedSlug = decodeSlug(slug)
  return getAllPosts().find((post) => post.slug === decodedSlug) ?? null
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const post of getAllPosts()) {
    for (const t of post.tags) counts.set(t, (counts.get(t) ?? 0) + 1)
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag))
}

export function getAllCategories(): { category: Category; count: number }[] {
  const counts = new Map<Category, number>()
  for (const post of getAllPosts()) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1)
  }
  return Array.from(counts.entries()).map(([category, count]) => ({ category, count }))
}
