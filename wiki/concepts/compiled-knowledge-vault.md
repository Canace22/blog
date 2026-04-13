# 编译式知识库

跨来源整理：把原始记忆、资料碎片或对话沉淀，进一步**编译成结构稳定、可检查、可追踪的知识层**。它不是只“存东西”，而是把知识维护变成一条持续运行的流水线。

## 和普通 wiki / memory 的区别

| 形态 | 更像什么 | 典型问题 |
| --- | --- | --- |
| 原始 memory | 事件流、片段、回忆材料 | 能记住，但难维护 |
| 普通 wiki | 可读页面集合 | 可读但质量难量化 |
| 编译式知识库 | 结构化页面 + digests + checks + dashboards | 维护成本更高，但更适合长期协作 |

## 典型组成

- **确定性页面布局**：相近主题尽量落到稳定页面结构
- **Claims / Evidence**：论断与证据分离，减少“只有结论没有出处”
- **Provenance**：页面或段落知道自己来自哪里
- **Confidence / Contradictions / Open Questions**：把不确定性显式化
- **Compiled Digests**：给 agent 或 runtime 的短摘要，不必每次全读页面
- **Lint / Dashboard**：持续暴露证据缺口、冲突、陈旧内容和待解问题

## 为什么它对 agent 特别重要

普通知识库常见的问题是“能搜到，但 agent 不知道该不该信”。编译式知识库的意义在于：

- 不只给内容，还给可信度和出处
- 不只给页面，还给机器可消费的 digest
- 不只做沉淀，还做体检

这样 agent 在多轮研究、长期维护或跨会话协作里，更容易把知识层当成真正的 system of record。

## 对当前仓库的借鉴方向

你现在这套 `source/_posts` → `wiki/sources` / `wiki/concepts` / `wiki/reports` 的结构，已经是编译式知识库的雏形。下一步如果要往这个方向继续走，可以逐步补：

1. 在 source / concept 页面里更明确地区分 **source-backed claim** 和 **综合判断**
2. 为概念页增加 `open questions` 或“仍待验证”小节
3. 做一个轻量 `wiki lint`，检查孤儿页、缺来源页、过时页、冲突页
4. 为高频主题生成 overview / digest 页面，降低 agent 每次重读成本

## 与已有概念的关系

- [LLM 维护的知识库](llm-maintained-wiki.md) 更强调“让 agent 持续维护 wiki”
- 本页更强调“wiki 维护到什么程度，才足够稳定地服务 agent”

## 来源

- [使用大模型来维护知识库](../sources/llm-wiki.md)
- [OpenClaw Memory Wiki](../sources/openclaw-memory-wiki.md)
