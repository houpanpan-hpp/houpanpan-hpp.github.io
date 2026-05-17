import type { Metadata } from 'next'
import { PostCard } from '@/components/post-card'
import { TagFilter } from '@/components/tag-filter'
import { getAllPosts, getAllTags } from '@/lib/posts'

export const metadata: Metadata = {
  title: '博客',
  description: '技术分享、项目复盘与日常思考',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">博客</h1>
        <p className="mt-2 text-[var(--color-fg-muted)]">
          共 {posts.length} 篇文章 · {tags.length} 个标签
        </p>
      </header>

      <TagFilter tags={tags} posts={posts} />
    </div>
  )
}
