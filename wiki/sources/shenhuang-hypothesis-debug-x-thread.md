# 来源：Shen Huang —— 假设驱动调试与 DEBUG.md（X）

- **来源类型**：社交媒体帖子（剪藏导出整理）
- **作者**：Shen Huang（[@ShenHuang\_](https://x.com/ShenHuang_)）
- **链接**：<https://x.com/ShenHuang_/status/2043469166418735204>
- **帖子日期**：2026-04-12
- **整理日期**：2026-04-13

## 摘要

作者在排查 race condition 时消耗大量对话 token 仍失败；受 Karpathy 的 auto-research 思路启发，在流程中增加一句约束：**把所有假设和证据写到 `DEBUG.md`**。模型列出多个假设后，作者根据「某假设无任何反对证据」缩小范围，用极少行数实验确认根因并快速修复。作者归纳四条调试规则，并将对应能力做成 Claude Code / Gemini CLI 的 skill，开源在 GitHub。

## 原文要点（来源声称）

1. 改代码之前必须先列假设。
2. 每次实验最多改约 5 行。
3. 所有证据写入文件，减轻上下文压缩导致的推理链丢失。
4. 同一方向连续失败两次则强制更换假设。

## 外部链接

- Skill 仓库（路径以仓库内实际目录为准）：<https://github.com/LichAmnesia/lich-skills/tree/main/skills/debug-hypothesis>

## 关联概念

- [假设驱动 AI 调试](../concepts/hypothesis-driven-ai-debugging.md)
- [Karpathy autoresearch（来源）](karpathy-autoresearch.md)
