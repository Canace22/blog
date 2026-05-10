# 大语言模型工作原理概览

本页以 [Karpathy《大语言模型简介》演讲（YouTube）摘要](../sources/gemini-karpathy-intro-llm-youtube.md) 为主干，整理入门框架；**数字与时间点均为摘要转述**，深入引用请对照原视频。

**扩展阅读（同主题、可视化）**：[How LLMs Work — A Visual Deep Dive](https://ynarwal.github.io/how-llms-work/index.html)（本站摘要页：[ynarwal-how-llms-work-visual](../sources/ynarwal-how-llms-work-visual.md)）——滚动交互讲解数据管线、分词、训练与安全等，自述基于 Karpathy 的技术向材料。

## 组成与直觉

- **权重 + 推理代码**：可学习的参数存储世界与语言的统计规律；推理循环可实现得相当紧凑。
- **下一词预测**：训练目标简单，但为了把分布拟合好，模型必须吸收语法、事实碎片与推理模式。
- **有损压缩隐喻**：大语料被压进有限参数；优点是泛化与生成，代价是细粒度事实可能错、且行为是**模拟**而非查表。

## 从基础模型到对话助手

| 阶段 | 目的（摘要口径） |
| ---- | ---------------- |
| 预训练 | 博学、续写互联网风格；不保证「助手式」交互 |
| 监督微调 | 用高质量对话把输出形态对齐为问答/助手 |
| RLHF | 用排序偏好打磨 helpful/harmless 等维度 |

**合成说明**：三者解决的是不同问题——能力规模、交互格式、与人类偏好对齐——而不是互相替代。

## 架构想象：LLM 作为「内核」

- **上下文**：有限窗口 ≈ 工作内存，需要取舍放什么进窗口。
- **多模态**：文本之外的感知与表达通道。
- **工具**：把不擅长的事外包给确定性系统（代码执行、检索、浏览器等）。

这与「纯聊天」不同：系统边界变成 **模型 + 运行时 + 工具链**。

## 安全层（指令与数据不分离）

- **越狱**：利用叙事/角色绕过策略。
- **提示词注入**：不可信内容里夹带指令，利用模型对「全文」的统一处理。
- **数据投毒**：在训练分布里埋行为触发器。

**合成说明**：根因之一是自然语言里「系统指令」与「用户/环境数据」没有硬件级隔离，防御往往需要策略、过滤与架构分层并用。

## 与日常助手、本仓库 LLM Wiki 的区分

训练三阶段（预训练 / SFT / RLHF）解决的是**参数如何形成与对齐**；OpenClaw、Hermes 及本仓库 **`wiki/` 维护流程**多在**推理与系统工程**侧运作（上下文、规则、工具、持久化 markdown），**不等于**你在对话里自动完成「模型微调」。辨析与问答全文见 [大模型「训练阶段」和日常助手、LLM Wiki 分别是什么关系](../queries/llm-training-vs-inference-and-maintained-wiki.md)。

## 与其它仓库概念的衔接

- [LLM Knowledge Bases](llm-knowledge-bases.md)：本仓库如何把 LLM 用于**持久化知识层**（与「模型如何训练」正交但相关）。
- [使用大模型来维护知识库](../sources/llm-wiki.md)：实践向笔记与外部 Karpathy Gist。
- [LLM 训练的真相：Andrej Karpathy 的分享笔记](../sources/llm-training-truth.md)：仓库内博文，「爬取 / 有损压缩 / 预测 + 对齐」叙事与 Karpathy 入门线并列作备忘。
- [为什么 AI 大模型需要显卡](../sources/why-graphics-card.md)：算力侧补充阅读。
- [How LLMs Work（可视化长文）](../sources/ynarwal-how-llms-work-visual.md)：与 Karpathy 演讲互补的在线长文。

---

*概念页：助手根据 `gemini-karpathy-intro-llm-youtube` 整理，并链入 `ynarwal-how-llms-work-visual`、`llm-training-truth`；补「训练 vs 推理 / LLM Wiki」段落并链至 query；2026-05-10。*
