import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'

const prettyCodeOptions = {
  theme: { dark: 'github-dark-dimmed', light: 'github-light' },
  keepBackground: false,
  defaultLang: 'plaintext',
}

export const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    [rehypePrettyCode, prettyCodeOptions],
  ],
}
