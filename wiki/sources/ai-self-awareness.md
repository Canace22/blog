# 来源：最新版 Codex 工作流的问题

- **源文件**：[`source/_posts/ai-self-awareness.md`](../../source/_posts/ai-self-awareness.md)
- **分类**：AI工程化
- **标签**：AI编程
- **日期**：2026-09-07 11:31:01

## 摘要

这是一篇 Agent 工作流笔记：Codex 新循环不再卡在「提问确认」节点，会按推测继续执行。作者一次因错别字未及时回应，模型自行往下干，先烧掉周额度，纠正后又把项目写偏重写。单会话循环里，哪些节点必须等人，不能省。

## 要点

- 不问确认、一路跑到底看起来更顺，但意图含糊或有错别字时，模型会按自己的推测继续改代码。
- 人没盯着会话时，消耗和偏航会同时放大：额度先没，项目再被改坏。
- 纠正一次不等于纠偏完成。人再次离开后，后续工作可能比前一半更偏。
- 这和「说 ok 它不继续」是对称问题：等太久会停，不等则会把误解执行到底。工作流要设计的是「该问还是该继续」。

## 另见

- [Agent 工作流](../concepts/agent-workflow.md)
- [跟 AI 说 ok，它为什么有时不继续](go-ahead-vs-continue-ai-chat.md)
- [Vibe Coding 开了一堆会话，验收不过来](ai-review-bottleneck.md)
- [AI 使用边界与提效反噬](../concepts/ai-usage-boundary-and-efficiency-backfire.md)
- [AI 辅助开发](../concepts/ai-assisted-development.md)
- [Codex Agent Harness 套壳实现自己的 AI 产品](how-can-i-use-codex-harness.md)

*维护：Cursor Agent，2026-09-07。*
