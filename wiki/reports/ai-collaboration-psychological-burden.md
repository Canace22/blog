# AI 协作心理负担：主题对照与来源索引

本仓库多篇博文都在谈同一件事：**深度用 AI 干活之后，为什么反而更累、更空、更怀疑自己？** 本篇把分散来源串成一条可读的主题线，并标明各篇在链中的位置。

与 [AI 外包写作与思维：对照阅读](ai-outsourcing-writing-thinking.md) 的关系：该 report 聚焦**思维与表达外包**；本篇覆盖更广，额外纳入**提效反噬**（边界、节奏、决策疲劳）与**协作文档**旁支。

## 核心定义

- **AI 协作心理负担**：AI 承担更多执行、人转向审核与兜底时，出现的认知膨胀、节奏失控、决策疲劳、价值感削弱等主观负担。
- 与「会不会被 AI 替代」的宏观焦虑不同，这里侧重**日常协作体感**：干了很多活，却像什么都没做。

## 两条证据线

### 1. 提效反噬（边界与节奏）

局部产出加速，总投入（时间、注意力、工具开销）反而上升；高价值产出占比下降。

| 现象 | 来源 | 在链中的角色 |
| --- | --- | --- |
| 认知错位、AI 捧杀、失去节奏、决策疲劳、创造力剥离感 | [AI使人膨胀](../sources/ai-expansion.md) | **主文**：本主题最完整的个人叙述 |
| 屏幕时间变长、vibe coding 堆低价值产出、需圈定 AI 任务范围 | [AI 如何让我们躺平](../sources/how-ai-lets-us-lie-flat.md) | 边界与「方向不对则越忙越空」 |
| 边界定义、检查清单、费米化复盘 | [AI 使用边界与提效反噬](../concepts/ai-usage-boundary-and-efficiency-backfire.md) · [如何把「费米化」用在 AI 提效边界管理里](../queries/fermiization-for-ai-boundary.md) | 概念与可执行复盘 |

**典型机制（合成）**

1. **认知膨胀** → 错估工时、随意承诺 → 任务拖过饭点、被动加班。
2. **AI 捧杀 + 等待结果** → 碎片化盯屏 → 决策疲劳。
3. **all in AI、多 agent 并行** → 频繁切换审核角色 → 下班更累。
4. **产出很多但过程被跳过** → 「好像自己什么也没做」→ 价值感空虚。

### 2. 思维与价值外包（深度与信任）

把思考、表达或内化过程交给 LLM，会同时损失能力、可信度与可交流的深度。

| 现象 | 来源 | 在链中的角色 |
| --- | --- | --- |
| 思维外包、原创与沉浸感消失 | [AI 让人变得无趣](../sources/ai-make-you-boring.md) | 公共讨论与工程文化视角 |
| 代写 ≈ 付费健身、损害表达与思考的真实性 | [为什么不要让LLM帮我们写文档](../sources/why-not-let-ai-write-for-us.md) | 文档与协作信任 |
| Woods + 上述两篇对照 | [AI 外包写作与思维：对照阅读](ai-outsourcing-writing-thinking.md) | **子 report**：思维线深度展开 |
| 只投喂不吸收，易成「知识接收器」 | [我们是否需要AI知识库](../sources/AI-knowledge-base.md) | 知识依赖与内化 |

## 文章归属一览

| 文章 | 是否属本主题 | 说明 |
| --- | --- | --- |
| [AI使人膨胀](../sources/ai-expansion.md) | 是（核心） | 提效反噬 + 价值感，含破局建议 |
| [AI 如何让我们躺平](../sources/how-ai-lets-us-lie-flat.md) | 是 | 提效反噬、边界 |
| [AI 让人变得无趣](../sources/ai-make-you-boring.md) | 是 | 思维外包 |
| [为什么不要让LLM帮我们写文档](../sources/why-not-let-ai-write-for-us.md) | 是 | 思维外包、信任 |
| [我们是否需要AI知识库](../sources/AI-knowledge-base.md) | 是（部分） | 依赖 vs 内化 |
| [程序员愿意为 Claude 写文档，但不愿为同事写](../sources/claude-handoff-doc-to-repo.md) | **相邻** | AI 协作文档线；折射「为 AI 优化 vs 为人协作」，非心理负担主文 |
| [知识焦虑](../sources/knowledge-anxiety.md) | 否 | 2022 生活随笔，与 AI 无关 |

## 合成结论

1. **两条线常同时出现**：边界外加班（提效反噬）+ 跳过程（思维外包）→「产出很多、体感很空」。
2. **破局方向（仓库内已有）**——来自 [AI使人膨胀](../sources/ai-expansion.md)：
   - 让 AI 干活前先自己理清思路，建立评判标准；
   - 每天留一段无 AI 深度工作时间；
   - AI 交互任务批处理，减少碎片化；
   - 只采纳自己看得懂的内容。
3. **文档用法要分流**：handoff doc / 项目规则可「AI 写、人来审」并提交 repo（见 [claude-handoff-doc-to-repo](../sources/claude-handoff-doc-to-repo.md)），与 [AI协作编程——如何写好项目规则](../sources/writing-a-good-claude-md.md) 同属协作文档线；这解决的是**上下文与维护**，不能替代上述边界与思考过程。
4. **与「正确用法」的对照**：人先倒想法 → AI 帮筛主线 → 人再砍（见 [把想法丢给 AI 拎主线](../sources/sanye-ai-organize-thoughts.md) 与 [AI 外包写作与思维](ai-outsourcing-writing-thinking.md)）——思考未被跳过，只是结构化加速。

## 推荐阅读顺序

1. [AI使人膨胀](../sources/ai-expansion.md) — 建立整体体感
2. [AI 使用边界与提效反噬](../concepts/ai-usage-boundary-and-efficiency-backfire.md) — 收束为可执行边界
3. [AI 外包写作与思维：对照阅读](ai-outsourcing-writing-thinking.md) — 补全思维/信任线
4. [我们是否需要AI知识库](../sources/AI-knowledge-base.md) — 补依赖与内化

## 另见

- [AI 协作心理负担](../concepts/ai-collaboration-psychological-burden.md)（概念页：定义与入口）
- [AI 辅助开发](../concepts/ai-assisted-development.md)（流程治理与质量责任）
- [LLM 维护的知识库](../concepts/llm-maintained-wiki.md)（用 LLM **维护**知识，而非替代思考）

---
_Edited by assistant (Composer) on 2026-06-15._
