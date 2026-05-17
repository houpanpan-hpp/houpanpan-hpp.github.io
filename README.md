# houpan.dev

我的个人博客和经验记录站。Next.js 16 + MDX + Tailwind v4，静态导出，部署在 GitHub Pages。

## 本地开发

```bash
pnpm install        # 安装依赖
pnpm dev            # 启动 http://localhost:3000
pnpm build          # 静态导出到 out/
pnpm typecheck      # TS 类型检查
```

> `predev` 和 `prebuild` 钩子会自动调用 `scripts/build-search-index.ts`
> 重新生成 `public/search-index.json`，无需手动维护。

## 写一篇新文章

在 `content/posts/` 新建 `YYYY-MM-DD-slug.mdx`：

```mdx
---
title: "你的文章标题"
date: 2026-05-17
tags: [llm, infra]
category: tech         # tech | experience | life
summary: 一句话摘要，列表页和搜索都用它。
draft: false           # 设为 true 可隐藏不发布
---

## 一级标题

正文。MDX 里可以嵌任意 React 组件。

\`\`\`python title="example.py" {2}
import torch
model = torch.nn.Linear(10, 1)  # ← 这一行被高亮
\`\`\`
```

`pnpm dev` 即时预览。`pnpm build` 看静态产物。

## 添加一个项目

`content/projects/<slug>.mdx`：

```mdx
---
title: "项目名"
date: 2026-05-17
summary: 一句话项目简介。
stack: [Next.js, TypeScript]
url: https://example.com
repo: https://github.com/...
featured: true         # 是否精选（首页和列表页置顶）
order: 100             # 同 featured 时按这个排序
---

正文部分（项目展示页目前只显示卡片，正文留作未来扩展）。
```

## 部署

仓库必须命名为 `<your-username>.github.io`（用户主站，无 basePath 烦恼）。

1. 仓库 Settings → Pages → Source 选 **GitHub Actions**。
2. push 到 `main` 分支即触发 `.github/workflows/deploy.yml`。
3. ~2 分钟后访问 `https://<your-username>.github.io/`。

如果改用项目仓库（`/<repo-name>` 子路径），需要在 `next.config.mjs` 加：

```js
basePath: '/<repo-name>',
assetPrefix: '/<repo-name>',
```

## Giscus 评论（可选）

1. 仓库开启 Discussions（Settings → General → Features）。
2. 访问 https://giscus.app 配置，复制 4 个值。
3. 仓库 Settings → Secrets and variables → Actions → Variables 添加：
   - `GISCUS_REPO`（如 `houpanpan-hpp/houpanpan.github.io`）
   - `GISCUS_REPO_ID`
   - `GISCUS_CATEGORY`（如 `Comments`）
   - `GISCUS_CATEGORY_ID`
4. 本地预览时在项目根创建 `.env.local`：
   ```
   NEXT_PUBLIC_GISCUS_REPO=houpanpan-hpp/houpanpan.github.io
   NEXT_PUBLIC_GISCUS_REPO_ID=...
   NEXT_PUBLIC_GISCUS_CATEGORY=Comments
   NEXT_PUBLIC_GISCUS_CATEGORY_ID=...
   ```

未配置时文章页底部显示一段提示文字，不会报错。

## 目录结构

```
.
├── app/                    # Next.js App Router 路由
├── components/             # UI 组件
├── content/                # MDX 写作内容（不进 src）
│   ├── posts/
│   └── projects/
├── lib/                    # 业务逻辑（posts/projects/utils）
├── public/                 # 静态资源（含构建期生成的 search-index.json）
├── scripts/                # 构建期脚本
└── .github/workflows/      # CI/CD
```

## 技术栈

- **框架**：Next.js 16 (App Router) + React 19 + TypeScript
- **样式**：Tailwind v4（CSS-first 配置，见 `app/globals.css`）
- **MDX**：next-mdx-remote/rsc + remark-gfm + rehype-slug + rehype-pretty-code (Shiki)
- **动效**：Framer Motion + 自实现粒子 canvas
- **搜索**：Fuse.js + 构建期生成 JSON 索引
- **评论**：@giscus/react
- **部署**：GitHub Actions + GitHub Pages

## License

文章内容 © houpan，代码部分 MIT。
