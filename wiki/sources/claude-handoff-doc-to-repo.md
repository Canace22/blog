# 来源：程序员愿意为 Claude 写文档，但不愿为同事写

- **源文件**：[`source/_posts/claude-handoff-doc-to-repo.md`](../../source/_posts/claude-handoff-doc-to-repo.md)
- **分类**：AI探索
- **标签**：AI编程
- **日期**：2026-06-13 10:00:00

## 摘要

Mark Dominus 在用 Claude 做项目时维护 handoff doc，供下一个 Claude 会话快速上手。他受论坛吐槽启发——程序员愿精心写 `CLAUDE.md` 给 AI，却不愿给同事写文档——尝试把 Claude 的项目总结审阅后 commit 进 repo，供 `git grep` 检索。流程：AI 写结构化总结 → 人审改 → 提交；任务笔记与项目总结也可贴进 commit 描述。

## 要点

1. **Handoff doc**：跨会话、跨 agent 的项目上下文，与 [AI协作编程——如何写好项目规则](writing-a-good-claude-md.md) 同属「为 AI 可读性投资」。
2. **AI 写、人来审**：十秒生成、审阅约一小时，降低「没人愿意写文档」的摩擦；人仍负责把关（曾出现照抄上一份 `Approved-by` 段落的坑）。
3. **一石二鸟**：既方便后人翻代码，也让不同 AI 对项目有全貌——与 [LLM 维护的知识库](../concepts/llm-maintained-wiki.md) 的持久上下文思路一致。
4. **相邻主题**：为 AI 优化文档 vs 为人写文档，折射协作重心转移；见 [AI 协作心理负担](../concepts/ai-collaboration-psychological-burden.md)。

## 参考文献

- [Programmers will document for Claude, but not for each other](https://blog.plover.com/2026/03/09/#documentation-wins-2)

## 另见

- [AI协作编程——如何写好项目规则](writing-a-good-claude-md.md)
- [一个提升 AI Coding 稳定性的思路](agent-coding-stability.md) · [提升 AI Coding 稳定性的经验上下文模式](../concepts/agent-coding-stability.md)
- [使用大模型来维护知识库](llm-wiki.md)

---
_Edited by assistant (Composer) on 2026-06-15._
