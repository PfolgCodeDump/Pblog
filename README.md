# Pblog - 静态博客系统

> [!NOTE]
> 本项目90%以上代码由AI生成
>
> GitHub 部署: <https://pfolgcodedump.github.io/Pblog/> (不推荐)
>
> Cloudflare 部署: <https://pg25-lsae.eu.org/> (推荐)
> 
> 这两个站点的文档集中都有关于部署的文档

基于 Next.js (App Router) + TypeScript + Tailwind CSS 的纯静态博客生成器。

## 特性

- [x] 完全静态导出，可部署到任何静态托管服务
- [x] 响应式设计，支持移动端
- [x] Markdown 渲染，支持代码高亮和数学公式
- [x] 文章分页、归档、分类、标签系统
- [x] 评论系统集成（Giscus）
- [x] 主题切换支持（亮色/暗色）
- [x] Live2D 看板娘集成
- [x] 自动图片复制和优化
- [x] 目录导航（TOC）
- [x] 回到顶部功能
- [x] 四季飘落特效（使用 natural-falling-effect 库，支持花瓣、落叶、下雨、下雪，可自动根据季节切换）
- [x] 环境变量配置支持
- [x] Demo 展示功能，支持嵌入和独立页面访问
- [x] 分离式导航菜单（首页/文章/关于单独显示，其余下拉菜单）
- [x] 暗色主题完整适配
- [x] 多层级背景系统（渐变背景 → 粒子特效 → 背景图片 → 页面内容）
- [x] 完整SEO优化（Open Graph、Twitter Card、JSON-LD结构化数据）
- [x] RSS feed 支持，可导出给AI分析或RSS阅读器订阅
- [x] RGB自定义主题颜色，支持通过R、G、B滚动条精确调整
- [x] 文章音乐播放器，支持网易云音乐和本地歌曲

## 技术栈

- **框架**：Next.js 16.2.2 (App Router + Turbopack)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **Markdown 处理**：unified + remark-parse + remark-rehype + rehype-highlight
- **数学公式**：KaTeX
- **元数据解析**：gray-matter
- **Live2D**：Oh-My-Live2D

## 安装

```bash
npm install
```

## 开发

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 构建

```bash
npm run build
```

构建后的静态文件会生成在 `output/` 目录。

## 预览

```bash
npm start
```

启动静态预览服务器查看构建后的网站。

## 部署

将 `output/` 目录部署到任何静态托管服务：

- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

## 目录结构

```
pblog/
├── app/                      # App Router 页面
│   ├── layout.tsx            # 根布局
│   ├── page.tsx              # 首页
│   ├── globals.css           # 全局样式
│   ├── articles/             # 文章列表 + 分页
│   ├── posts/[slug]/         # 文章详情
│   ├── archive/              # 归档（年份索引 + 列表）
│   ├── categories/           # 分类列表 + 单个分类页面
│   ├── tags/                 # 标签云 + 单个标签页面
│   ├── about/                # 关于页
│   ├── journey/              # 历程页（时间线）
│   ├── projects/             # 项目页
│   ├── demos/                # Demo 列表页
│   ├── demos/[slug]/         # Demo 详情页
│   └── information/          # 信息页（含技术栈信息）
├── components/               # 可复用组件
│   ├── Header.tsx            # 导航栏
│   ├── Footer.tsx            # 页脚
│   ├── BackToTop.tsx         # 回到顶部
│   ├── Pagination.tsx        # 分页组件
│   ├── TableOfContents.tsx   # 目录导航
│   ├── ThemeToggle.tsx       # 主题切换
│   ├── Live2DWidget.tsx      # Live2D 看板娘
│   ├── SafeImage.tsx         # 安全图片组件
│   ├── ExpandableCover.tsx   # 可展开封面图片
│   ├── AnchorHandler.tsx     # 全局锚点跳转处理
│   ├── GiscusComments.tsx    # 评论系统
│   └── MusicPlayer.tsx       # 音乐播放器
├── lib/                      # 工具函数
│   ├── posts.ts              # 扫描、解析所有文章
│   ├── demos.ts              # 扫描、解析所有 demo
│   ├── utils.ts              # 工具函数
│   └── markdown.ts           # Markdown 处理
├── content/                  # 内容目录
│   ├── posts/                # 每篇文章一个文件夹（含 index.md 和 assets）
│   ├── demos/                # 每个 demo 一个文件夹（含 index.html/show.html 和 assets）
│   └── spec/                 # 特殊页面（about, journey, projects, information）
├── types/                    # TypeScript 类型定义
│   └── live2d.d.ts           # Live2D 类型定义
├── scripts/                  # 构建脚本
│   ├── copy-post-images.js           # 生产环境复制图片
│   ├── copy-post-images-dev.js       # 开发环境复制图片
│   └── serve-static.js               # 静态预览服务器
└── public/                   # 静态资源
```

## 文章格式

在 `content/posts/` 目录下创建文章文件夹，每个文件夹包含 `index.md` 文件：

````markdown
---
title: 文章标题
published: 2025-04-02
description: 文章摘要
category: 分类名称
tags: [标签1, 标签2]
draft: false
---

# 文章内容

这里是你的 Markdown 内容...

支持数学公式：
$$ E = mc^2 $$

支持代码高亮：

```javascript
console.log("Hello, World!");
```
````

支持音乐播放器（可选）：

```yaml
---
title: 文章标题
published: 2025-04-02
description: 文章摘要
category: 分类名称
tags: [标签1, 标签2]
draft: false
player:
  source: "netease" # "netease" 或 "local"
  link: "2085549628" # 网易云歌曲ID、完整URL或本地文件路径
  bottom: "40px" # 位置配置（可选，默认 bottom: 40px, left: 40px）
  left: "40px"
  autoPlay: false # 是否自动播放（可选，默认自动播放）
---
```

音乐播放器配置说明：

- `source`: 音源类型，`netease`（网易云音乐）或 `local`（本地歌曲）
- `link`:
  - 网易云：歌曲 ID（纯数字）或完整播放器 URL
  - 本地：相对路径（自动处理 assets 目录）
- `top`/`bottom`/`left`/`right`: 位置配置（可选），默认 `bottom: 40px, left: 40px`
- `autoPlay`: 是否自动播放（可选），默认自动播放，设置为 `false` 时不自动播放

```

## Demo 格式

在 `content/demos/` 目录下创建 demo 文件夹，每个文件夹包含以下文件：

```

content/demos/
└── demo-name/
├── meta.json # 元数据配置
├── demo.html # 主页面（必需，原 index.html）
├── show.html # 展示页面（可选，优先使用）
└── assets/ # 资源文件夹（可选）
├── style.css
├── script.js
└── images/

````

### meta.json 配置

```json
{
  "title": "Demo 标题",
  "description": "Demo 描述",
  "tags": ["标签1", "标签2"],
  "author": "作者",
  "date": "2026-04-09",
  "published": true
}
````

- `published`: 设置为 `false` 时该 demo 不会在列表中显示

### 关于文件命名

- 使用 `demo.html` 而不是 `index.html`，避免构建后路由冲突
- 系统也兼容 `index.html`，构建时会自动重命名为 `demo.html`
- `show.html` 优先用于页面展示

## 配置

复制 `.env.example` 为 `.env` 并进行配置。

### 网站基础配置

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Pblog
NEXT_PUBLIC_SITE_DESCRIPTION=个人博客，记录学习、生活和思考
NEXT_PUBLIC_AUTHOR_NAME=Your Name
```

### Giscus 评论系统

访问 [https://giscus.app/](https://giscus.app/) 获取配置信息，然后在 `.env` 中填写。

```env
NEXT_PUBLIC_GISCUS_REPO=yourusername/yourrepo
NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
```

### Live2D 看板娘

在 `.env` 中配置 Live2D 模型路径和显示位置。使用 JSON 数组格式配置多个模型：

```env
NEXT_PUBLIC_LIVE2D_MODELS=["/live2d/chuixue_3/chuixue_3.model3.json","/live2d/dujiaoshou_4/dujiaoshou_4.model3.json","/live2d/ice-girl/ice-girl-model/IceGirl.model3.json"]
NEXT_PUBLIC_LIVE2D_DOCKED_POSITION=right
NEXT_PUBLIC_LIVE2D_POSITION=[0, 60]
NEXT_PUBLIC_LIVE2D_SCALE=0.08
NEXT_PUBLIC_LIVE2D_STAGE_HEIGHT=450
```

推荐模型源：

- <https://model.hacxy.cn/> - 提供多种 Live2D 模型

### 粒子特效配置

```env
NEXT_PUBLIC_PARTICLES_ENABLED=true
NEXT_PUBLIC_PARTICLES_TYPE=petal
NEXT_PUBLIC_PARTICLES_COUNT=50
NEXT_PUBLIC_PARTICLES_ZINDEX=0
```

- `NEXT_PUBLIC_PARTICLES_ENABLED`: 是否启用粒子特效：true 或 false
- `NEXT_PUBLIC_PARTICLES_TYPE`: 特效类型：petal（花瓣）、leaf（落叶）、rain（下雨）、snow（下雪）、auto（自动根据季节选择）
- `NEXT_PUBLIC_PARTICLES_COUNT`: 粒子数量：默认 50
- `NEXT_PUBLIC_PARTICLES_ZINDEX`: 特效 z-index 层级：0（在背景图片下面），层级关系：渐变背景(底层) → 粒子特效(0) → 背景图片(1) → 页面内容(10+)

### 主题颜色配置

```env
NEXT_PUBLIC_DEFAULT_PRIMARY_COLOR=#ff69b4
```

- `NEXT_PUBLIC_DEFAULT_PRIMARY_COLOR`: 默认主色调（十六进制颜色值）

### 导航栏配置

```env
NEXT_PUBLIC_HEADER_AUTO_HIDE_ENABLED=true
```

- `NEXT_PUBLIC_HEADER_AUTO_HIDE_ENABLED`: 是否启用导航栏自动隐藏：true 或 false（默认 true），设置为 `true` 时导航栏会根据鼠标位置自动隐藏，设置为 `false` 时导航栏始终显示

## License

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0)
