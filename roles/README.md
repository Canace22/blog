# 角色框架（AI Role Framework）

把 `source/_posts/ai-worker.md` 提到的"AI 角色分工"思路落地：
**每个角色 = 一份定制 prompt + 一段隔离上下文。**

跟 `AGENTS.md` / `wiki/` 的分工关系：

- `AGENTS.md`：入口路由规则——告诉 agent 这次任务应该先读哪个角色文件。
- `wiki/`：长期上下文层——存原始资料、概念、问答、报告。
- `roles/`（本目录）：操作上下文层——存"做某件事"时的角色 prompt。

三者互不重叠：wiki 是"agent 记得什么"，roles 是"agent 这次要扮演谁"。

## 现有角色

| 文件 | 用途 | 输入 | 输出 |
| --- | --- | --- | --- |
| `translator.md` | 中英双向翻译 | 任意中/英文段落 | 译文 + 用法说明 |
| `weekly-report.md` | git log → 周报 | 一周 git log | 周报 markdown |
| `blog-writer.md` | hexo 博客草稿（仅元数据） | 标题/分类意向 | `source/_drafts/` 下仅含 front matter 的草稿 |
| `wiki-curator.md` | wiki 维护 | 自然语言指令 | 按 wiki 维护工作流操作 `wiki/` |

## 怎么用

1. 在支持 project / 对话分组的工具里（Grok / Claude / Gemini / 元宝等）建一个对应角色的 project。
2. 把对应 `.md` 文件内容复制到 project 的 system prompt 或 instructions。
3. 该 project 下的对话都自动应用这套角色定义。

如果用 Cursor / Claude Code 一类 IDE agent，把角色文件作为 attach context 或 skill 来调用。

## 扩展原则

- **抽成角色**：重复出现 + 有固定流程或模板的操作（如周报、翻译、专题写作）。
- **不抽成角色**：一次性问题、临时调研、探索性对话。
- **保持短**：除了承载完整操作规范的角色外，普通角色单文件尽量 < 100 行；前沿模型可靠遵守的指令约 150-200 条，角色 prompt 占掉一份预算就少一份。
- **不复制 wiki 内容**：需要长期知识时让角色去查 wiki，而不是把知识塞进 prompt。
