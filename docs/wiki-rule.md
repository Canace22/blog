# Wiki 规则

Wiki 维护规则（目录约定、Ingest / Query / Lint 流程、写作风格）以 [`roles/wiki-curator.md`](../roles/wiki-curator.md) 为准，本文件不再重复。

## Blog 内访问

- 仓库根目录 `wiki/` 是知识库原文，用 Obsidian 或编辑器浏览、维护。
- `npm run serve` / `npm run build` 会先运行 `tools/sync-wiki-for-hexo.mjs`，把 `wiki/` 同步到 `source/wiki/`（构建产物，已 gitignore），再生成站点。
- 同步时：指向 `source/_posts` 的链接改成博文地址 `/slug/`；wiki 内 `.md` 链接改成 `.html`；`wiki/index.md` 各分区按文件修改时间倒序，并加日期前缀；`wiki/Clippings/` 不同步。
- 线上入口：主题菜单「知识库」→ `/wiki/`。
