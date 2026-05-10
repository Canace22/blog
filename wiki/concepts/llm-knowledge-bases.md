# LLM Knowledge Bases

## Definition

An LLM knowledge base is a workflow where immutable source material is incrementally compiled by an LLM into a persistent, interlinked markdown wiki.

## Why It Is Different From Plain RAG

- Plain RAG retrieves raw fragments at question time.
- This method maintains a durable synthesis ahead of time.
- Cross-links, summaries, and contradictions accumulate instead of being rediscovered for every query.

## Working Model In This Repo

- Source material lives outside `wiki/` and is treated as immutable.
- `wiki/sources/` holds source summaries.
- `wiki/concepts/` holds cross-source synthesis.
- `wiki/queries/` and `wiki/reports/` hold durable outputs from asking questions.
- `wiki/index.md` and `wiki/log.md` help navigation and maintenance.

## Contrast With AI Knowledge Bases

- Many AI knowledge base products focus on question-time grounding over uploaded documents.
- An LLM-maintained wiki adds a persistent synthesis layer: summaries, cross-links, contradiction tracking, and updated concept pages.
- The two approaches can complement each other: an AI knowledge base can help with retrieval, while the wiki preserves durable synthesis.

## Current Evidence In Repo

- [Source: llm-wiki](../sources/llm-wiki.md)
- [Source: Gemini 摘要——Karpathy LLM 入门演讲（YouTube）](../sources/gemini-karpathy-intro-llm-youtube.md)
- [Source: LLM 训练的真相（Karpathy 分享笔记，博文）](../sources/llm-training-truth.md)
- [Source: How LLMs Work（可视化长文）](../sources/ynarwal-how-llms-work-visual.md)
- [Concept: 大语言模型工作原理概览](large-language-model-fundamentals.md)
- [Source: Thread by @karpathy](../sources/thread-by-karpathy.md)
- [Source: OpenClaw agent + memory-wiki](../sources/openclaw-agent-pi-mono.md) (external pattern pointer)
- [Concept: AI Knowledge Bases](ai-knowledge-bases.md)
- [Concept: AI-assisted development](ai-assisted-development.md)

## Practical Loop

1. Add a source to one of the immutable source folders outside `wiki/`.
2. Ingest it into `wiki/sources/`.
3. Update any affected concept pages.
4. Ask questions against the wiki.
5. Save useful answers back into the wiki.
6. Periodically lint for missing links, stale claims, and gaps.

## Early Takeaway

Even at small scale, this method can be useful because the wiki index and concise summaries reduce repeated search effort and make later questions easier to answer consistently.

---

*Evidence 区补充 Karpathy 演讲摘要、`llm-training-truth`、`ynarwal-how-llms-work-visual` 与 `large-language-model-fundamentals` 互链；2026-05-10。*
