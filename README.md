# Canace 的博客

个人博客 [canace.site](https://canace.site/) 的源码仓库，基于 [Hexo](https://hexo.io/) 7，主题为 maupassant。

除了博客文章，仓库里还维护着一个个人知识库（`wiki/`）和一套 AI 协作用的角色文件（`roles/`）。构建时会把知识库同步进站点，在线入口是 `/wiki/`。

## 目录结构

| 路径 | 说明 |
| --- | --- |
| `source/_posts/` | 已发布的博客文章 |
| `source/_drafts/` | 草稿 |
| `wiki/` | 知识库原始内容，构建时同步到 `source/wiki/`（构建产物，已忽略） |
| `roles/` | AI 角色文件（写作、翻译、周报、知识库维护），说明见 [roles/README.md](roles/README.md) |
| `docs/` | 写作规范：[Hexo 操作](docs/hexo-blog.md)、[分类与标签](docs/categories-tags.md)、[知识库规则](docs/wiki-rule.md) |
| `tools/` | 辅助脚本：同步知识库、生成摘要、批量导入知识库 |
| `themes/maupassant/` | 站点主题 |
| `AGENTS.md` | AI Agent 入口，按任务类型路由到对应角色文件 |

## 快速开始

### 1. 安装依赖

需要先安装 Node.js、pnpm，以及全局的 Hexo 命令行工具。

```bash
npm install -g hexo-cli
pnpm install
```

如果要用 AI 生成文章摘要，在根目录的 `.env` 里配置 `QWEN_API_KEY`。

### 2. 本地预览

```bash
pnpm serve
```

这条命令会先把 `wiki/` 同步到 `source/wiki/`，再生成站点并启动本地服务，访问 <http://localhost:4000> 即可。

注意，直接执行 `hexo g` 或 `hexo s` 会跳过知识库同步，站点里的知识库内容可能是旧的。

### 3. 写文章

```bash
hexo new "文章标题"
```

新文章会创建在 `source/_posts/`。Front Matter 的分类和标签请按 [docs/categories-tags.md](docs/categories-tags.md) 填写。

### 4. 发布到 GitHub Pages

```bash
pnpm build
```

这条命令会依次执行知识库同步、`hexo clean`、`hexo generate` 和 `hexo deploy`，把 `public/` 推送到 `Canace22/blog` 仓库的 `master` 分支。注意，它不只是构建，而是会直接上线。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `pnpm serve` | 同步知识库，生成站点，启动本地预览 |
| `pnpm build` | 同步知识库，生成站点，部署到 GitHub Pages |
| `pnpm summary` | 为缺少 `description` 的文章调用千问 API 生成摘要 |
| `pnpm summary:regen` | 为所有文章重新生成摘要 |
| `pnpm wiki:ingest-all` | 把 `source/_posts/` 的文章批量导入为 `wiki/sources/` 页面 |
| `pnpm commit` | `git add .` 后输入说明并提交 |

## 部署到阿里云服务器（Docker）

除了 GitHub Pages，也可以用 Nginx 容器把站点部署到自己的服务器。

### 1. 本地生成静态文件

```bash
node tools/sync-wiki-for-hexo.mjs
hexo clean
hexo generate
```

### 2. 上传文件到服务器

第一次部署时，需要把 `docker-compose.yml` 和 `public/` 一起上传到服务器的项目目录。

```bash
scp ./docker-compose.yml root@<服务器公网 IP>:<项目路径>/
scp -r ./public root@<服务器公网 IP>:<项目路径>/
```

### 3. 启动 Nginx 容器

在服务器的项目目录执行：

```bash
docker-compose up -d
```

### 4. 访问博客

`docker-compose.yml` 把容器的 80 端口映射到服务器的 80 端口，浏览器直接访问 `http://<服务器公网 IP>` 或绑定的域名即可。

### 5. 更新内容

之后每次更新，只需在本地重新生成 `public/`，上传覆盖服务器上的 `public/` 目录。`public/` 是以数据卷方式挂载进容器的，不需要重启容器。
