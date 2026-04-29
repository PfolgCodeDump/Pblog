![banner](public/FunRadiusP.svg)

# 静态博客系统

> [!NOTE]
> 本项目90%以上代码由AI生成
>
> GitHub 部署: <https://pfolgcodedump.github.io/FunRadiusP/> (不推荐)
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
- [x] 随笔（Moments）系统，支持图文并茂的简短内容
- [x] 文档集系统，支持结构化文档展示和阅读
- [x] 评论系统集成（Giscus）
- [x] 主题切换支持（亮色/暗色）
- [x] RGB自定义主题颜色，支持通过R、G、B滚动条精确调整
- [x] Live2D 看板娘集成
- [x] 回到顶部功能
- [x] 四季飘落特效（使用 natural-falling-effect 库，支持花瓣、落叶、下雨、下雪，可自动根据季节切换）
- [x] 环境变量配置支持
- [x] Demo 展示功能，支持嵌入和独立页面访问
- [x] 分离式导航菜单（首页/文章/关于单独显示，其余下拉菜单）
- [x] 暗色主题完整适配
- [x] 多层级背景系统（渐变背景 → 粒子特效 → 背景图片 → 页面内容）
- [x] 完整SEO优化（Open Graph、Twitter Card、JSON-LD结构化数据）
- [x] RSS feed 支持，可导出给AI分析或RSS阅读器订阅
- [x] 文章音乐播放器，支持网易云音乐和本地歌曲
- [x] 国际化（i18n）支持，支持 6 种语言（中文、英文、西班牙语、日语、德语、法语）
- [x] 图片查看器，支持点击图片全屏查看
- [x] 访客问候，根据时间和节日显示不同的问候语

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
- Cloudflare Pages (推荐)

> [!WARNING]
> 其他静态托管服务可能会有不兼容的bug，如路由问题等

## 目录结构

![structure.html](public/structure.html)

<https://pfolgcodedump.github.io/FunRadiusP/structure>

## 文章格式

> [!CAUTION]
> 必须避免使用所有可能导致路径解析错误的问题，如：非ASCII字符、路径中包含空格等

在 `content/posts/` 目录下创建文章文件夹，每个文件夹包含 `index.md` 文件：

```markdown
---
title: 文章标题
published: 2025-04-02
description: 文章摘要
category: 分类名称
tags: [标签1, 标签2]
draft: false
---

```

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
  source: "netease"  # "netease" 或 "local"
  link: "2085549628" # 网易云歌曲ID、完整URL或本地文件路径
  bottom: "40px"     # 位置配置（可选，默认 bottom: 40px, left: 40px）
  left: "40px"
  autoPlay: false    # 是否自动播放（可选，默认自动播放）
---
```

## Demo 格式

在 `content/demos/` 目录下创建 demo 文件夹，每个文件夹包含以下文件：

```

content/demos/
└── demo-name/
    ├── meta.json       # 元数据配置
    ├── demo.html       # 主页面（必需，或为： index.html）
    └── assets/         # 资源文件夹（可选）
        ├── style.css
        ├── script.js
        └── images/

```

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
```

- `published`: 设置为 `false` 时该 demo 不会在列表中显示，但在路径中可访问。

## 随笔格式（Moments）

在 `content/moments/` 目录下创建随笔文件夹，每个文件夹包含 `index.md` 文件：

```markdown
---

time: 2026-04-25 14:30:00 # 随笔时间
photos: # 图片
  - assets/1775234602116.gif
  - assets/crashed.jpeg

  - assets\1bca23f27a3f2e1e1509d5d3e14dc3e31f632a94ef36306feeea2976c6fbfa94.png
  - assets\2ad0593bb7fc4b5feb4e01d139f9daa094519ebb1e42ea442887093a41394af1.png
  - assets\14deca23740725f455d184682fe77c1bcf7b527796140c1605f1897b7606b818.png
  - assets\411bf11ff0dfbd12dff6cd4ef699b4f6ca53a60d29ac295f8f40f867b9b089f2.png
  - assets\679fffe1d819c53abaed55ac3090ed51e6e8605e9375b3668a62c54c4bbc3b44-small.png
  - assets\679fffe1d819c53abaed55ac3090ed51e6e8605e9375b3668a62c54c4bbc3b44.png

draft: true # 为true时该随笔不会在列表中显示
---

```

## 文档集格式（Docs）

在 `content/docs/` 目录下创建文档集文件夹，每个文件夹包含以下文件：

```
content/docs/
└── collection-name/
    ├── meta.json       # 元数据配置
    ├── summary.md      # 文档集介绍（可选）
    ├── p1.md           # 第一篇文档
    ├── p2.md           # 第二篇文档
    └── ...
```

### meta.json 配置

```json
{
  "title": "Python 学习笔记",
  "description": "Python 编程语言学习笔记和教程",
  "icon": "🐍",
  "order": 2,
  "published": false
}
```

```文档
---
title: Python 基础语法
description: Python 基础语法和数据类型
order: 2
draft: false
---
```

## 配置

复制 `.env.example` 为 `.env.local` 并进行配置。

```env
# 网站基础配置
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=FunRadiusP
NEXT_PUBLIC_SITE_DESCRIPTION=个人博客，记录学习、生活和思考
NEXT_PUBLIC_AUTHOR_NAME=Your Name

# GitHub 卡片配置
# GitHub 用户名，用于在关于页面显示 GitHub 卡片
NEXT_PUBLIC_GITHUB_USERNAME=yourusername

# 国际化（多语言）配置
# 默认语言： `zh` - 中文；`en` - 英文；`es` - 西班牙语；`ja` - 日语；`de` - 德语；`fr` - 法语
NEXT_PUBLIC_DEFAULT_LANGUAGE=en

# Giscus 评论系统配置
# 获取配置信息请访问：https://giscus.app/
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=

# Live2D 看板娘配置
# 模型路径：可以使用本地路径或远程URL，JSON数组格式
NEXT_PUBLIC_LIVE2D_MODELS=[]
# 模型停靠位置：left 或 right
NEXT_PUBLIC_LIVE2D_DOCKED_POSITION=right
# 模型位置：[x, y]
NEXT_PUBLIC_LIVE2D_POSITION=[0, 60]
# 模型缩放：默认0.08
NEXT_PUBLIC_LIVE2D_SCALE=0.08
# 舞台高度：默认450
NEXT_PUBLIC_LIVE2D_STAGE_HEIGHT=450

# 粒子特效配置
# 是否启用粒子特效：true 或 false
NEXT_PUBLIC_PARTICLES_ENABLED=true
# 特效类型：petal（花瓣）、leaf（落叶）、rain（下雨）、snow（下雪）、auto（自动根据季节选择）
NEXT_PUBLIC_PARTICLES_TYPE=petal
# 粒子数量：默认50
NEXT_PUBLIC_PARTICLES_COUNT=50
# 特效z-index层级：0（在背景图片下面）
# 层级关系：渐变背景(底层) -> 粒子特效(0) -> 背景图片(1) -> 页面内容(10+)
NEXT_PUBLIC_PARTICLES_ZINDEX=0

# 主题颜色配置
# 默认主色调（十六进制颜色值）
NEXT_PUBLIC_DEFAULT_PRIMARY_COLOR=#ff69b4

# 导航栏配置
# 是否启用导航栏自动隐藏：true 或 false（默认 true）
NEXT_PUBLIC_HEADER_AUTO_HIDE_ENABLED=true

# 友链配置
# 友链 JSON 文件的 URL，用于加载友链数据
NEXT_PUBLIC_FRIENDS_JSON_URL=https://raw.githubusercontent.com/<yourusername>/<yourrepositoryname>/main/friends.json
# 每页显示的友链数量
NEXT_PUBLIC_FRIENDS_ITEMS_PER_PAGE=24
```

## 常见问题

- 如果进入开发服务器，发现页面404，请酌情修改next.config.js中的basePath和assetPrefix。
- 没有找到 Live2D 模型，请检查模型路径是否正确。
- 一切页面和代码你都可以更改，请记住，别人能写的东西你未必不能写。

## License

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0)
