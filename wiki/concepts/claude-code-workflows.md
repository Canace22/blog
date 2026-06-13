# Claude Code 常见工作流

## 定义

Claude Code 官方文档归纳的**日常任务操作模式**：用结构化提示完成读库、调试、重构、测试、PR、文档等；配合会话恢复、plan mode、headless 与计划任务，把单次对话扩展成可重复的工作习惯。

## 来源

- [Claude Code 常见工作流程](../sources/claude-code-common-workflows.md)（官方文档剪藏）

## 核心模式

### 提示层：把任务说全

| 场景 | 关键输入 |
| --- | --- |
| 读新库 | 先结构/约定/术语，再进具体模块 |
| 修 bug | 复现命令、堆栈、间歇/持续 |
| 重构 | 小步增量、测试、兼容要求 |
| 测试 | 目标行为 + 现有风格 + 边界用例 |
| PR | 审风险；可用 `gh` 链会话 |
| 文档 | 风格、示例、公共 API 范围 |

通用技巧：`@` 引文件/目录；截图/图表作上下文；在笔记库等非代码目录同样可用。

### 会话层：少重复、先计划

- **`--continue` / `--resume`**：跨会话续写，避免重讲背景。
- **Plan mode**：先出计划、人批准后再改盘（`--permission-mode plan` 或 `Shift+Tab`）。
- **子代理委派**：大探索只收摘要（详见 [Claude Code 并行代理](claude-code-parallel-agents.md)）。

### 自动化层

- **Headless**：`claude -p` 接管道，适合 CI / 钩子。
- **计划任务**：Routines（云）、桌面计划、GitHub Actions、`/loop`（会话内）；提示须写清成功标准（无法追问）。

## 与本 Wiki 的关系

- 属于 [AI 辅助开发](ai-assisted-development.md) 工具链；与 [Cursor Cookbook](cursor-cookbook.md) 同属「官方示例 + 工作流」类资料。
- [提升 AI Coding 稳定性的经验上下文模式](agent-coding-stability.md)：把个人流程封装成 Skill，与官方「提示工作流」互补——前者是自定义经验，后者是产品内置模式。
- 并行与隔离见 [Claude Code 并行代理](claude-code-parallel-agents.md)。

## 综合结论

Claude Code 把常见开发动作模板化成可复制的提示与会话习惯；**人仍负责审 PR、定架构、写清计划任务的验收标准**。与 Cursor 等 IDE  agent 的差异主要在 CLI 一体化（worktree、headless、Routines），但「小步、可验证、少淹没主上下文」的原则通用。

---

*维护：Cursor Agent，2026-06-13。*
