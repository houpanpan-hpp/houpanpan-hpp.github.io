import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于',
  description: '关于 houpan',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">关于我</h1>
      </header>

      <div className="prose prose-custom prose-invert max-w-none">
        <p>
          AI / 算法工程师，长期在大模型训练、推理与评测管线里折腾。
          这里记录工程上的踩坑、踩对，以及一些日常想法。
        </p>

        <h2>我在做什么</h2>
        <ul>
          <li>大模型在业务侧的落地：训练管线、推理服务、评测体系。</li>
          <li>数据管线：清洗、构造、批量打标、质量审计。</li>
          <li>把工程做得轻一点、可读一点、易改一点。</li>
        </ul>

        <h2>技术栈</h2>
        <ul>
          <li><strong>主语言</strong>：Python</li>
          <li><strong>训练 / 推理</strong>：PyTorch、Transformers、vLLM</li>
          <li><strong>数据 / 评测</strong>：pandas、numpy、自研 pipeline</li>
          <li><strong>偶尔写一点</strong>：TypeScript、Next.js（比如这个站）</li>
        </ul>

        <h2>联系</h2>
        <p>
          有问题、想交流、约稿、招呼一声都行 ——
          GitHub Issue 或评论区都可以找到我。
        </p>
      </div>
    </div>
  )
}
