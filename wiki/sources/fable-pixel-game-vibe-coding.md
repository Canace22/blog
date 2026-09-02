# 来源：如何开发一个有手感的赛车游戏 demo

- **源文件**：[`source/_posts/fable-pixel-game-vibe-coding.md`](../../source/_posts/fable-pixel-game-vibe-coding.md)
- **分类**：AI工程化
- **标签**：AI编程
- **日期**：2026-08-24 14:00:00

## 摘要

Reddit 上一条 Fable 像素游戏吐槽帖引出 10 条 AI 游戏开发准则。作者按这些准则做出可玩的俯视赛车 demo，并强调：没有设计预期和验收标准时，堆 tokens 救不回项目。

## 要点

- 对照案例：连续 4 周、约 330 亿 tokens、约 4 万行代码，车辆移动仍未解决。评论认为问题主要在方法，不在 Fable。
- 作者实践：[俯视像素赛车 demo](https://canace22.github.io/claude-car-game/)。单文件、无框架；阶段结束超过约 1200 行先重构。
- L1–L4 先锁设计：纯俯视、车头朝向即前进、贴图 16 向离散、全局统一光源。
- L5–L8 先锁工程：先做网格 / 状态 / 慢放调试，再堆内容；分阶段验收；问题写成「现象 + 期望 + 判定」。
- L9–L10 先锁手感与意图：低成本反馈（尘土、震动）优先；每个系统写代码前用一句话写清规则。
- 换皮很快，但骑马和开车不是同一套交互。自己不知道要什么，AI 只能做出勉强能玩的 demo。

## 另见

- [查询：AI编程和 Vibe Coding 的差异在哪](../queries/ai-programming-vs-vibe-coding.md)
- [一轮对话 Vibe Coding 出可直接上手玩的浏览器 3D 游戏](word-2-game.md)
- [我的 vibe coding 撞墙了，兄弟们](vibe-coding-problem.md)
- [面向大模型编程（LOP）在游戏制作流程中的应用畅想](ai-coding-game.md)
- [AI 辅助开发](../concepts/ai-assisted-development.md)
- [LOP（面向大模型编程）模式](../concepts/lop-patterns.md)
- [AI 使用边界与提效反噬](../concepts/ai-usage-boundary-and-efficiency-backfire.md)

*维护：Cursor Agent，2026-09-02。*
