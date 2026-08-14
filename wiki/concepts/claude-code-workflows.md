# Claude Code 常见工作流

## 定义

Claude Code 官方文档归纳的**日常任务操作模式**：用结构化提示完成读库、调试、重构、测试、PR、文档等；配合会话恢复、plan mode、headless 与计划任务，把单次对话扩展成可重复的工作习惯。

## 来源

- [Claude Code 常见工作流程](../sources/claude-code-common-workflows.md)（官方文档剪藏）
- [深入 Claude Code 的 Web 工具：WebFetch 与 WebSearch](../sources/claude-webfetch.md)（工具差异简要笔记）
- [Claude Code 使用笔记](../sources/claude-note.md)（权限模式与风险边界）
- [在 CLI 里用 Claude Design 做原型设计](../sources/claude-design-cli-prototyping.md)（设计探索、原型导出与代码导入）
- [笔记本都合上了，Claude 为什么还能在手机上执行电脑上装的技能？](../sources/claude-skill-cross-device.md)（云端容器与跨设备入口）

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

- **`--continue` / `--resume`**：跨会话续写，避免重讲背景；断线后的内容/推理恢复见 [AI 流式生成恢复](ai-stream-recovery.md)。
- **Plan mode**：先出计划、人批准后再改盘（`--permission-mode plan` 或 `Shift+Tab`）。
- **子代理委派**：大探索只收摘要（详见 [Claude Code 并行代理](claude-code-parallel-agents.md)）。
- **云端会话 vs Remote Control**：手机继续任务不等于接管本机环境。云端会话从账号载入 Skill，合上电脑仍可继续；Remote Control 只是远程操作本地会话，电脑休眠后连接暂停。详见 [Skill、会话与执行环境](skill-session-runtime.md)。

### 自动化层

- **Headless**：`claude -p` 接管道，适合 CI / 钩子。
- **计划任务**：Routines（云）、桌面计划、GitHub Actions、`/loop`（会话内）；提示须写清成功标准（无法追问）。

### Web 工具层

- **WebSearch**：根据查询词发现候选网页，返回网址与标题摘要。
- **WebFetch**：读取已知 URL 的页面内容，并回答围绕该页面的问题。
- 常见顺序是先搜索确定来源，再抓取具体页面；已有 URL 时可直接抓取。

### 权限与设计工作流

- 权限模式决定 Claude Code 能否直接执行高风险操作。仓库笔记建议日常优先使用较保守的 `auto`；启用 `bypassPermissions` 前，应明确删除、强制推送和任意网络请求都可能不再询问。
- 设计任务可按“同步设计系统、生成与迭代、导出原型、导入项目、浏览器自检”的顺序推进。导入时继续复用仓库现有组件和变量。

## 与本 Wiki 的关系

- 属于 [AI 辅助开发](ai-assisted-development.md) 工具链；与 [Cursor Cookbook](cursor-cookbook.md) 同属「官方示例 + 工作流」类资料。
- [提升 AI Coding 稳定性的经验上下文模式](agent-coding-stability.md)：把个人流程封装成 Skill，与官方「提示工作流」互补——前者是自定义经验，后者是产品内置模式。
- [Skill、会话与执行环境](skill-session-runtime.md)：跨设备时把 Skill、会话类型和真正跑脚本的环境分开。
- 并行与隔离见 [Claude Code 并行代理](claude-code-parallel-agents.md)。

## 综合结论

Claude Code 把常见开发动作模板化成可复制的提示与会话习惯；**人仍负责审 PR、定架构、写清计划任务的验收标准**。与 Cursor 等 IDE  agent 的差异主要在 CLI 一体化（worktree、headless、Routines），但「小步、可验证、少淹没主上下文」的原则通用。

---

*维护：Cursor Agent，2026-08-14。*
