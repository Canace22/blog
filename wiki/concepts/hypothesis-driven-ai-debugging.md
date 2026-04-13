# 假设驱动 AI 调试

## 定义

**假设驱动 AI 调试**指：在让模型改代码之前，先把可检验的假设与证据外化为文档（例如 `DEBUG.md`），用短实验验证或证伪假设，并显式处理「上下文压缩导致推理链丢失」的风险。它与「在同一对话里反复试错但不留痕」相对。

## 与 Harness 的关系

这类做法把**可验证性**和**人类可读的运行记录**前置：规则文件或会话指令告诉模型如何列假设、如何写证据；文件系统承担「外部记忆」，减轻仅靠模型上下文承载推理的压力。这与 [Harness Engineering](harness-engineering.md) 中强调的反馈回路、验收与结构化上下文一致，只是落点具体在调试场景。

## 两条可对照的实践

### 1. 调试：假设列表 + 证据文件

[Shen Huang 的 X 帖子摘要](../sources/shenhuang-hypothesis-debug-x-thread.md)描述的做法是：要求把所有假设和证据写入 `DEBUG.md`，先列假设再改代码，单次实验限制改动规模，失败多次则换方向。来源中还提到将流程封装为 CLI skill 以便复用。

### 2. 研究：`program.md` 作为轻量「组织说明」

[Karpathy autoresearch](../sources/karpathy-autoresearch.md) 在训练实验场景中把人类指令集中在 `program.md`，与 agent 可改的 `train.py` 分离；README 明确把 `program.md` 比作轻量 skill。主题不同（调试 bug vs 自动炼丹），但共同点都是：**把「给模型的长期约束与语境」从「被频繁改动的代码」里拆出来**。

## 可执行的维护性建议（合成）

- 在仓库中保留一份简短的调试或实验记录模板（假设 / 证据 / 下一步实验），由人审阅后再合并大改。
- 单次变更保持可 diff、可回滚；与来源中「小步实验」一致。
- 将重复使用的流程写成 Skill 或项目内文档，与 [一个提升 AI Coding 稳定性的思路](../sources/agent-coding-stability.md)中的「经验上下文」思路一致。

## 相关

- [Harness Engineering](harness-engineering.md)
- [LLM 维护的知识库](llm-maintained-wiki.md)
- [来源：Shen Huang —— 假设驱动调试与 DEBUG.md](../sources/shenhuang-hypothesis-debug-x-thread.md)
- [来源：karpathy / autoresearch](../sources/karpathy-autoresearch.md)
