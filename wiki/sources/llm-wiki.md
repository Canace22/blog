# 来源：使用大模型来维护知识库

- **源文件**：[`source/_posts/llm-wiki.md`](../../source/_posts/llm-wiki.md)
- **分类**：AI 探索（博客 front matter）
- **日期**：2026-04-08

## 摘要

文章提出：人只负责输入资料，由大模型维护一份持久化的 wiki。wiki 承载原始资料索引、与 agent 的对话总结、报告等产物索引；无论使用哪种 agent 工具，wiki 都可作为基础上下文，相当于给模型植入记忆。

## 架构（原文要点）

1. **原始资料**：从 various 渠道收集，类型按个人知识库定制；作者以博客中过往技术文章为例，作为主题阅读的选材。
2. **wiki**：由大模型生成与维护，含资料索引与各类产物，作为持久化中间层。
3. **规则**：与模型交互的规则文件（如 `CLAUDE.md`、`AGENTS.md` 等，名称自定），需说明 wiki 结构、写作习惯与维护工作流。

## 外部参考（原文链接）

- [LLM Wiki（Karpathy Gist）](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- [LLM Knowledge Bases（X 帖子）](https://x.com/karpathy/status/2039805659525644595)

## 关联概念

- [LLM 维护的知识库](../concepts/llm-maintained-wiki.md)
