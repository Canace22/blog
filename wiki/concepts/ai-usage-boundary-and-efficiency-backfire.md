# AI 使用边界与提效反噬

在 AI 工具使用中，"提效" 常被默认等于 "更轻松"，但现实里经常出现反向结果：产出速度提升的同时，工作时长、注意力占用与工具开销也同步上升。这个现象可称为**提效反噬**。

## 定义

- **AI 使用边界**：预先限定 AI 参与的任务范围、时间预算和质量门槛。
- **提效反噬**：局部效率提升后，总投入不降反升，且高价值产出占比下降。

## 来自本仓库的证据

- [AI 如何让我们躺平](../sources/how-ai-lets-us-lie-flat.md)：指出 AI 使用中的时间延长、投入增加与越界产出问题，并主张在圈定范围内提效。
- [AI使人膨胀](../sources/ai-expansion.md)：从认知错位、AI 捧杀、节奏失控、决策疲劳、价值感空虚五个角度展开，是提效反噬最完整的个人叙述。
- [Programmers need to start meditating now（Jake Gold）](../sources/jacob-gold-programmers-need-to-meditate.md)：补上生理机制角度——写代码曾靠心流抑制默认模式网络（DMN）带来专注与平静；转向多 Agent 上下文切换后心流消失，"高效"是透支注意力的多巴胺幻觉，需靠冥想或低信息密度的手脑协同活动来补偿。
- [我的 vibe coding 撞墙了](../sources/vibe-coding-problem.md)：补充学习反馈角度——代码产出增长不等于理解增长，需要把审查、追问、独立实现和复盘重新放回协作流程。
- [如何开发一个有手感的赛车游戏 demo](../sources/fable-pixel-game-vibe-coding.md)：对照案例是约 330 亿 tokens、4 万行代码仍过不了车辆移动；代码量和 token 消耗是负债，没有设计预期时加码救不回来。
- [Vibe Coding 开了一堆会话，验收不过来](../sources/ai-review-bottleneck.md)：并行会话的上限是人的验收带宽；worktree 防文件冲突，防不了验收堆叠。
- [最新版 Codex 工作流的问题](../sources/ai-self-awareness.md)：不问确认按推测继续，人没盯着就会把额度与偏航一起放大。

## 可执行检查清单（轻量）

1. 是否限定了 AI 只参与某一类任务，而非所有任务？
2. 是否有固定的时间或预算上限？
3. 本周 AI 产出里，可复用成果占比是否提升？
4. 提效收益是否真的转化为休息、深度学习或长期项目推进？

## 费米化落地（低成本版）

将抽象感受 "AI 很忙但不值" 费米化为四个可估算指标：时间、成本、产出、价值。  
每周只做数量级判断，不做重统计；若连续两周出现 "投入上升 + 价值下降"，就触发边界收缩。

- 参考查询页：[如何把「费米化」用在 AI 提效边界管理里](../queries/fermiization-for-ai-boundary.md)
- 工作方式对照：[AI编程和 Vibe Coding 的差异在哪](../queries/ai-programming-vs-vibe-coding.md)

## 与相关概念的关系

- [AI 辅助开发](../concepts/ai-assisted-development.md)：强调流程治理与质量责任；本页补充个人层面的时间/边界治理。
- [Agent 工作流](agent-workflow.md)：自动续跑和无限并行是工作流设计问题；省略问人、验收节点会把局部提效变成额度与注意力透支。
- [AI 协作心理负担](../concepts/ai-collaboration-psychological-burden.md)：本页属其「提效反噬」子线；完整对照见 [AI 协作心理负担：主题对照与来源索引](../reports/ai-collaboration-psychological-burden.md)。

---
*修订：Cursor Agent，2026-09-07。*
