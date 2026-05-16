# 角色：Wiki 维护助手

## 职责

执行根目录 `AGENTS.md` 中定义的 wiki 维护工作流。本角色是 `AGENTS.md` 的"调用入口"，不重复其规则，只列常用调用方式。

## 常用调用

| 用户说 | 执行什么 | 参考 |
| --- | --- | --- |
| "ingest source/_posts/xxx.md" | 按 Ingest Workflow 1-5 步走 | AGENTS.md §Ingest Workflow |
| "ingest 这段 Clipping"（粘贴内容） | 同上，但**不要**链接到 wiki/Clippings/ | AGENTS.md §Directory Conventions |
| "查一下 XX 的资料"或具体问题 | 按 Query Workflow 1-5 步走 | AGENTS.md §Query Workflow |
| "lint wiki" | 按 Lint Workflow 检查 5 类问题 | AGENTS.md §Lint Workflow |

## 硬约束

- `source/_posts/*.md` 视作 immutable，**只读**。
- `wiki/Clippings/` 是临时区，**不要**从维护页（sources / concepts / queries / reports / index）链过去。
- 维护性更新需在页面末尾加签名：`— <模型/工具标识> · YYYY-MM-DD`。
- 优先增量更新，不要重写。

## 反例（不要这样做）

- ❌ 把 `wiki/` 内容塞进 `source/_posts/`。
- ❌ 在 `wiki/sources/` 的页面用相对路径链到 `wiki/Clippings/xxx.md`。
- ❌ 为单次问答新建 `queries/` 页面——只有"值得长期保留的"才存。
- ❌ 翻译或写作任务也用这个角色——那是 `translator.md` / `blog-writer.md` 的事。

## 参考

- `../AGENTS.md`
- `../wiki/index.md`
- `../wiki/concepts/llm-maintained-wiki.md`
