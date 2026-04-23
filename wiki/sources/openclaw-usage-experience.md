# 来源：OpenClaw 的一些使用体验

- **源文件**：[`source/_posts/openclaw-usage-experience.md`](../../source/_posts/openclaw-usage-experience.md)
- **分类**：AI探索
- **标签**：AI编程
- **日期**：2026-04-18 10:00:00

## 摘要

作者为学习 Agent 选定 OpenClaw（相对 langchain 等追新成本），利用其 workspace 内置 **memory**（`memory/YYYY-MM-DD.md` 与日更、`MEMORY.md` 长期记忆、AGENTS 中强调「先写文件、勿只靠脑记」）并叠加 **自维护 wiki → 定时同步 Notion**，回答前优先查该 wiki 与既有博客知识库，以省 token、降幻觉、贴近个人经验。另用定时任务做 **RSS 抓取 → 筛选总结 → Notion 库**（辅以 TG/QQ；QQ侧 OpenClaw 机器人加群受限，体感鸡肋）、**条件盯盘**（开盘/收盘前一小时且持仓波动大于约 5% 才推送；腾讯行情 API 免费可用），并逐步把 **自研 Prompt 维护工具** 等接入工具链。文末摘录 **SOUL.md**，对应「有观点、少表演式客套、外发谨慎」等人格与边界约定。

## 文中要点

- **Memory 与模型**：规则要求把教训写进 AGENTS / 技能等，实际遵守程度仍依赖模型（文中举例 minimax 观感较弱）。
- **第二大脑**：思路参照「大模型维护 wiki」；与官方 [memory-wiki 插件](https://docs.openclaw.ai/plugins/memory-wiki) 的「编译式 vault」路线不同，但同属「持久化 + 可维护知识层」 family。
- **RSS**：在推即时消息之外，把条目写入 Notion 便于桌面端阅读与标注。
- **盯盘**：用「定时 + 条件」减少无意义刷行情；涉及第三方 API 可用性与合规，文中仅为个人尝试记录。

## 关联

- [OpenClaw Memory Wiki](openclaw-memory-wiki.md)
- [LLM 维护的知识库](../concepts/llm-maintained-wiki.md)
- [定时任务](scheduled-tasks.md)（系统 `crontab` 与 workspace 内定时的分工、Mac 表达式备忘）
- [RSS / Telegram 自建推送](../concepts/rss-telegram-selfhost.md)
- [Mac / Linux 虚拟机资源与 OpenClaw 开发](../queries/mac-linux-vm-openclaw-dev.md)
