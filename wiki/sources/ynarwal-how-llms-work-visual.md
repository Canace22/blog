# 来源：How LLMs Work（可视化长文）

- **来源类型**：外部网页（静态站点）
- **链接**：<https://ynarwal.github.io/how-llms-work/index.html>
- **访问日期**：2026-05-10

## 摘要

面向大众的 **滚动式可视化** 讲解：从互联网文本采集与过滤、分词（BPE）、Transformer 结构，到预训练、推理、基础模型与后训练、心理类比、RAG、安全与整条管线。页面自述基于 **Andrej Karpathy** 的技术向深入讲解，并给出前沿模型量级的**示意数字**（如万亿 token、数百 B 参数、数十 TB 文本等，强调数量级而非精确值）。

## 与本仓库其它条目的关系

- 与 [Gemini 摘要：Karpathy《大语言模型简介》演讲（YouTube）](../sources/gemini-karpathy-intro-llm-youtube.md) 主题同轨：可把本站摘要当作「提纲」，把该页当作「带交互与插图的展开阅读」。
- 概念整理见 [大语言模型工作原理概览](../concepts/large-language-model-fundamentals.md)。

## 关键点（据页面结构归纳）

- **数据管线**：Common Crawl 类来源 → URL/语言/去重/PII 等过滤 → 高质量语料集；强调「质与多样性」对最终模型的影响。
- **Tokenization**：子词/BPE、词表规模与「为何不用纯词」的直觉。
- **章节覆盖**（导航可见）：Intro、Data、Tokens、Training、Inference、Base Model、Post-Train、Psychology、RAG、Security、Pipeline 等，适合按模块跳读。

---

*本页为外部站点摘要；细节与动效以原站为准。整理：助手；2026-05-10。*
