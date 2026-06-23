# Source: 原来我一直用错了 Cowork

## Source File

- `source/_posts/use-cowork.md`

## Summary

First-person practice note on misusing Claude Cowork for developer work. Contrasts Cowork, Claude Code, and Cursor by product positioning and execution model; explains why token bills spike (long context, agentic workflows, wrong tool choice); lists concrete habits for programmers to cut token waste.

## Key Points

- **Cowork**：面向非技术用户；agent 在沙箱里执行，不能直接在用户电脑上跑命令——安全优先，代价是需手动复制粘贴命令与结果。
- **Claude Code**：面向开发者；终端内完整 shell 权限，能力天花板高，但操作失误无安全网；写代码场景比 Cowork 更省事、更省 token。
- **Cursor**：IDE 嵌入式方案，读取完整项目上下文并在本地执行；本质是「编辑器 + AI」，近年 Agent 模式可自主拆任务、多步骤执行。

- **Token 消耗高的三个原因**：
  1. **上下文过长** — 中大型项目 + 复杂规则（AGENTS.md 等）+ 系统提示词
  2. **使用方式变化** — 从「圈文件改」转向「一句话让 agent 自己拆任务、搜文件、交互」
  3. **用错产品** — Cowork 的 Computer Use（截图、视觉理解）、工具调用、Memory 都是额外开销；视觉理解比文本贵约 10–50 倍

- **Memory 隐性成本**：Cowork / Codex 的 Memory 会随任务更新，读写记忆本身消耗 token；一次性任务可关闭；作者体感加 Memory 后幻觉反而增多。

- **程序员省 token 实践**：
  - 写代码用 CLI（Claude Code），别用 Cowork
  - 喂准上下文：圈文件、写清约束，减少 agent 猜测与搜索
  - 控制规则长度，定期清理过时 AGENTS.md / .cursorrules
  - monorepo 渐进式加载，按需引用模块
  - 排除 package-lock、node_modules 等大文件
  - 对话过长时主动触发上下文压缩
  - 警惕 Memory 的 token 与幻觉代价

- **选型结论**：
  - 日常文件处理 → Cowork（安全省心）
  - 开发者写代码、搞工程 → Claude Code
  - 习惯所见即所得、强项目上下文 → Cursor

## Related Concepts

- [AI 辅助开发](../concepts/ai-assisted-development.md)
- [Chat assistant user memory](../concepts/chat-assistant-user-memory.md)

## 另见（本库相近资料）

- [查询：AI 产品的形态分化与底层逻辑](../queries/ai-product-forms-and-models.md)（沙箱 vs 直接执行、token 效率、产品形态全景）
- [Claude Code 常见工作流程](../sources/claude-code-common-workflows.md)
- [Claude Code 并行运行代理](../sources/claude-code-parallel-agents.md)
- [用 Cursor 提高工作效率实战笔记](../sources/improve-work-efficiency-with-cursor-practical-notes.md)
- [AI协作编程——如何写好项目规则](../sources/writing-a-good-claude-md.md)

---

*维护：Cursor Agent，2026-06-23。*
