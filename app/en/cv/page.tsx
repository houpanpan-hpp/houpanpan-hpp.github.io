import { Fragment } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CV',
  description:
    'Yu Ze — LLM post-training engineer · Alibaba Quark Search · ex-ByteDance multimodal pretraining · BUAA 2019.',
}

const SUMMARY =
  'AI/ML engineer with 7+ years of experience, focused on large language model post-training (SFT, RLHF) and multimodal alignment. Currently owning the post-training stack at Alibaba Quark Search end to end — from data production through training strategy, eval, and serving. Previously at ByteDance on multimodal LLM pretraining, with first-hand experience in scaling, training stability, and data quality.'

const EXPERIENCE = [
  {
    period: '2024.XX — present',
    company: 'Alibaba',
    team: 'Quark Search',
    role: 'LLM Post-Training Engineer · Senior',
    bullets: [
      'Own the SFT × RLHF stack for text and multimodal models in the Quark Search product: data → training → eval → deploy.',
      'TODO: scale line — "training scale X-YB params / Zk SFT samples per month / DAU level".',
      'TODO: business impact line — "rerank / answer-generation lifted internal metric X by Y pp (anonymized)".',
      'TODO: engineering impact line — "rebuilt the post-training pipeline, cut iteration time from N to M days".',
      'TODO: cross-team line — collaboration with data / inference / algo teams.',
    ],
  },
  {
    period: '2022.XX — 2024.XX',
    company: 'ByteDance',
    team: 'Multimodal LLMs',
    role: 'Multimodal LLM Pretraining Engineer',
    bullets: [
      'Pretraining for multimodal LLMs: image-text data cleaning, training strategy, scaling-behaviour analysis.',
      'TODO: subsystem you owned.',
      'TODO: scale fact — tokens / GPU·hours / parameter count.',
      'TODO: outcome line — improvement on a benchmark or downstream task.',
    ],
  },
] as const

const PROJECTS = [
  {
    slug: 'example-project',
    title: 'yuze.dev',
    desc: 'This site. Next.js 16 + MDX + Tailwind v4, statically exported to GitHub Pages.',
  },
  // TODO: replace with 4-6 real projects, each linking to /projects/<slug>.
] as const

const SKILLS_GROUPS = [
  {
    label: 'Languages / Frameworks',
    items: ['Python', 'PyTorch', 'Transformers', 'TRL', 'TypeScript (occasionally)'],
  },
  { label: 'Training', items: ['Megatron-LM', 'DeepSpeed', 'Internal frameworks', 'FSDP'] },
  { label: 'Inference / Serving', items: ['vLLM', 'SGLang', 'TensorRT-LLM'] },
  {
    label: 'Post-training methods',
    items: ['SFT', 'PPO', 'DPO', 'GRPO', 'KTO', 'Reward Modeling'],
  },
  {
    label: 'Data / Eval',
    items: ['LLM-as-judge', 'Custom eval pipelines', 'pandas / numpy', 'Data cleaning / dedup'],
  },
] as const

const PUBLICATIONS: { title: string; venue: string; href?: string }[] = [
  // TODO: papers / internal tech talks / public talks. Section auto-hides if empty.
]

export default function CVEnPage() {
  return (
    <article className="cv-page mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <div className="cv-no-print mb-8 flex items-center justify-between gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/60 px-4 py-2 text-xs text-[var(--color-fg-muted)]">
        <span>
          Tip:{' '}
          <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-1.5 py-0.5 font-mono">
            ⌘P
          </kbd>{' '}
          to print or save as PDF
        </span>
        <Link href="/cv" className="hover:text-[var(--color-accent)]">
          中文版本 →
        </Link>
      </div>

      <header className="mb-8 border-b border-[var(--color-border)] pb-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Yu Ze</h1>
        <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
          LLM Post-Training Engineer · Alibaba Quark Search
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-[var(--color-fg-muted)]">
          <span>📧 TODO@example.com</span>
          <span>🌐 yuze.dev</span>
          <span>💻 github.com/houpanpan</span>
          <span>🔗 linkedin.com/in/TODO</span>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          Summary
        </h2>
        <p className="text-sm leading-relaxed text-[var(--color-fg)]">{SUMMARY}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          Experience
        </h2>
        {EXPERIENCE.map((e) => (
          <div key={e.period + e.company} className="mb-5 last:mb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-2">
              <div className="font-semibold">
                {e.company}
                <span className="font-normal text-[var(--color-fg-muted)]"> · {e.team}</span>
              </div>
              <div className="font-mono text-xs text-[var(--color-fg-muted)]">{e.period}</div>
            </div>
            <div className="mt-0.5 text-sm italic text-[var(--color-fg-muted)]">{e.role}</div>
            <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-[var(--color-fg)] marker:text-[var(--color-fg-subtle)]">
              {e.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          Selected Projects
        </h2>
        <ul className="space-y-2 text-sm">
          {PROJECTS.map((p) => (
            <li key={p.slug} className="flex flex-wrap items-baseline gap-x-2">
              <Link
                href={`/projects/${p.slug}`}
                className="font-semibold text-[var(--color-fg)] hover:text-[var(--color-accent)]"
              >
                {p.title}
              </Link>
              <span className="text-[var(--color-fg-muted)]">— {p.desc}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          Skills
        </h2>
        <dl className="grid grid-cols-1 gap-y-2 text-sm md:grid-cols-[160px_1fr]">
          {SKILLS_GROUPS.map((g) => (
            <Fragment key={g.label}>
              <dt className="font-mono text-xs text-[var(--color-fg-muted)] md:pt-0.5">
                {g.label}
              </dt>
              <dd className="text-[var(--color-fg)]">{g.items.join(' · ')}</dd>
            </Fragment>
          ))}
        </dl>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          Education
        </h2>
        <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-sm">
          <div>
            <span className="font-semibold">Beihang University (BUAA)</span>
            <span className="text-[var(--color-fg-muted)]"> · TODO college / major / degree</span>
          </div>
          <div className="font-mono text-xs text-[var(--color-fg-muted)]">2015 — 2019</div>
        </div>
      </section>

      {PUBLICATIONS.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            Publications & Talks
          </h2>
          <ul className="space-y-2 text-sm">
            {PUBLICATIONS.map((p) => (
              <li key={p.title}>
                {p.href ? (
                  <Link
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent)] hover:underline"
                  >
                    {p.title}
                  </Link>
                ) : (
                  <span className="font-semibold">{p.title}</span>
                )}
                <span className="text-[var(--color-fg-muted)]"> — {p.venue}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
