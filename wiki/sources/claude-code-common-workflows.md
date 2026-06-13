# 来源：Claude Code 常见工作流程

- **来源类型**：Claude Code 官方文档剪藏
- **原文**：[常见工作流程](https://code.claude.com/docs/zh-CN/common-workflows)
- **整理日期**：2026-06-13

## 摘要

Claude Code 官方整理的日常开发工作流：从提示模式（读库、修 bug、重构、测、PR、文档）到会话恢复、worktree 并行、plan mode、子代理委派、headless 管道，以及按计划自动跑任务。各模式可在 CLI / 桌面 / IDE 等界面复用，措辞按项目调整即可。

## 要点

### 提示工作流

- **读新库**：先宽后窄；问约定与术语；大库见 [Monorepos 文档](https://code.claude.com/docs/zh-CN/large-codebases)。
- **修 bug**：给出复现命令与堆栈；说明间歇/持续；让 Claude 先定位再改。
- **重构**：小步、可测；必要时要求向后兼容；可先要「现代做法」说明。
- **写测试**：点名要测的行为；Claude 会对齐现有测试风格；可要求补边界用例。
- **开 PR**：可直接说「create a pr」；`gh pr create` 后会话可链到 PR（`claude --from-pr` / `/resume`）；提交前让人审风险点。
- **文档**：指定 JSDoc/docstring 等风格；要示例；覆盖公共 API 与复杂逻辑。
- **笔记/非代码目录**：与代码库一样可搜改 reorganize；`.claude/`、`CLAUDE.md` 与其他工具配置并存；每次工具调用会重读文件。
- **图像**：截图/UI/图表作上下文；对话可多图。
- **@ 引用**：快速带入文件/目录；目录只列清单不读全文；父目录 `CLAUDE.md` 会进上下文。
- **自询能力**：Claude 可读自家文档回答 MCP、权限、Bedrock、限制等；`/powerup` 有交互课。

### 会话与模式

- **恢复**：`claude --continue` 续最近会话；`claude --resume` / `/resume` 选历史；跨会话不必重讲上下文。
- **Worktree 并行**：`claude --worktree <name>` 隔离分支检出；多终端不同名即可并行；Agent View 可一屏监控（见 [并行代理](../concepts/claude-code-parallel-agents.md)）。
- **Plan mode**：`claude --permission-mode plan` 或 `Shift+Tab`；先计划、批准后再改盘。
- **子代理**：大库探索委派出去，只收摘要回主对话（详见 [并行代理概念](../concepts/claude-code-parallel-agents.md)）。
- **Headless**：`claude -p "..."` 管道 stdin/stdout，适合 CI、钩子、批处理。

### 按计划运行

| 方式 | 运行位置 | 适合 |
| --- | --- | --- |
| Routines | Anthropic 托管 | 机关机也跑；可 API/GitHub 触发 |
| 桌面计划任务 | 本机桌面 | 需本地文件/未提交改动 |
| GitHub Actions | CI | 与 PR 等仓库事件绑定 |
| `/loop` | 当前 CLI 会话 | 会话内轮询；新对话停止 |

计划任务提示要写清成功标准与结果处理方式（无法澄清）。

## 另见

- [Claude Code 常见工作流](../concepts/claude-code-workflows.md)
- [Claude Code 并行代理](../concepts/claude-code-parallel-agents.md)
- [Claude Code 并行运行代理（来源）](claude-code-parallel-agents.md)
- [Claude CLI 速记：`/effort` 与 `/model`](claude-cli-effort-model-commands.md)
- [AI 辅助开发](../concepts/ai-assisted-development.md)
- [首次尝试95%都是垃圾：一位工程师使用 Claude Code 的 6 周之旅](translate-use-claude-code.md)

---

*维护：Cursor Agent，2026-06-13。*
