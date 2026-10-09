# 来源：把项目文档写得人看得懂：AI 时代的维护指南

- **源文件**：[`source/_posts/docs-in-ai-date.md`](../../source/_posts/docs-in-ai-date.md)
- **分类**：AI工程化
- **标签**：AI编程
- **日期**：2026-10-05 10:04:53
- **配套 Skill**：[human-readable-docs](https://github.com/Canace22/my-skills/blob/main/human-readable-docs/SKILL.md)

## 摘要

AI 维护的开源项目文档越来越难懂。问题不在「AI 味」，而在结构上就不是写给人看的。作者分析了三个原因，并写了一个 Skill，强制 AI 站在新用户视角写文档；产品方向则由人用一份短的 `PRODUCT.md` 把住。

## 要点

- 起因：作者让 AI 维护过一份主要给 AI 看的知识库，结构概括、逻辑清楚，但人读起来费神。现在很多 GitHub README 也是这种感觉。
- 三个原因：
  1. **全知视角**：AI 的上下文就是整个项目，意识不到 Plugin、Runtime、bootstrap 这类内部词对新用户是一堵墙。
  2. **不会偷懒，不筛信息**：人脑有负载，只挑最重要的写结论加一句为什么。AI 倾向完整记录当前状态（提交 Hash、边界等过程产物），文档成了准确但没重点的「快照」。
  3. **增量维护，缺产品观**：一次只做一个任务，README 顶部被「本次更新了什么」占满。人会退一步想「新人该先看到什么」，会删；AI 默认是加和补。产品这个角色必须由人承担。
- Skill 核心规则：
  - 前三句话说清是什么、给谁用、怎么开始。
  - 重要变化写成用户能直接用的结论（「现在装了用不了」，而不是「Runtime >= 0.5.9」）。
  - 少写「不是什么」，Hash、版本表等追溯信息放进 CHANGELOG。
- 补产品观：写几百字的 `PRODUCT.md`（给谁用、主路径、刻意不做什么），AI 每次维护前先读。方向人定，AI 在方向内执行。
- 文档分层：README 给人看，`AGENTS.md` 给 AI 看，CHANGELOG 给维护者看。
- 低成本自查：开一个没有项目上下文的新会话当新用户，只读 README，看它能否说清这东西是干嘛的、怎么开始。

## 另见

- [Harness Engineering](../concepts/harness-engineering.md)（`AGENTS.md` 当地图；本文补了「给人看」的那一层）
- [LLM 维护的知识库](../concepts/llm-maintained-wiki.md)（给 AI 维护的知识层，人读起来可能吃力）
- [AI 辅助开发](../concepts/ai-assisted-development.md)
- [为什么不要让LLM帮我们写文档](why-not-let-ai-write-for-us.md)
- [程序员愿意为 Claude 写文档，但不愿为同事写](claude-handoff-doc-to-repo.md)
- [AI协作编程——如何写好项目规则](writing-a-good-claude-md.md)

---

*维护：Cursor Agent，2026-10-08。*
