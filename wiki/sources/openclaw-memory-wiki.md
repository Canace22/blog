# 来源：OpenClaw Memory Wiki

- **来源类型**：外部资料（产品文档）
- **链接**：<https://docs.openclaw.ai/plugins/memory-wiki>
- **访问日期**：2026-04-09

## 摘要

`memory-wiki` 是 OpenClaw 的一个 bundled plugin，它不替代当前激活的 memory plugin，而是把持久记忆进一步**编译成一层可维护的知识库**。文档把它描述成 `compiled knowledge vault`：不只保留 prose，还生成确定性页面、结构化 claims / evidence、页面级 provenance、confidence、contradictions、open questions、dashboard 和 machine-readable digests。

## 核心设计

### 1. 记忆层和 wiki 层分离

文档明确区分两层：

- memory plugin：负责 recall、semantic search、promotion、dreaming、runtime memory
- `memory-wiki`：负责 compiled wiki pages、provenance-rich syntheses、dashboards、wiki-specific search/get/apply

这个分层很值得借鉴，因为它把“记得什么”和“如何把记忆整理成可维护知识”拆开了。

### 2. Wiki 不是自由笔记，而是编译产物

`memory-wiki` 强调的不是随手写页面，而是：

- deterministic page layout
- structured claims and evidence metadata
- page-level provenance / confidence / contradictions / open questions
- compiled digests for agent/runtime consumers

也就是说，wiki 在这里更像**可验证的中间层**，而不是纯人工笔记。

### 3. 有 bridge mode，能吃现有 memory 产物

它提供可选的 `bridge` 模式，从当前 memory plugin 的**公开 artifacts 和 memory events**导入内容，而不直接依赖私有内部实现。这个设计很适合做“渐进接入”：

- 不用先推翻已有记忆系统
- 先把现有记忆编译成更稳定的知识层
- 后续再逐步把更多维护规则加上去

### 4. 把健康检查前置成系统能力

文档里提到 dashboard / health report 会关注：

- contradiction note clusters
- competing claim clusters
- claims missing structured evidence
- low-confidence pages and claims
- stale or unknown freshness
- pages with unresolved questions

这意味着知识维护不再只是“有没有页面”，而是“页面质量是否持续可见”。

### 5. 提供 wiki-native tools，而不只靠通用检索

文档建议：

- 当只想走共享 recall 时，可以走 `memory_search corpus=all`
- 当你需要 wiki-specific ranking、provenance 或 page-level belief structure 时，使用 `wiki_search` / `wiki_get`
- 当你要做窄范围 synthesis 或 metadata 变更时，使用 `wiki_apply`
- 变更后用 `wiki_lint` 做 structural checks、provenance gaps、contradictions、open questions 检查

这说明一层成熟的知识库，往往需要自己的专用操作面。

## 对本知识库的启发

这份文档最值得借鉴的，不是“做一个 OpenClaw 插件”，而是它的数据维护思路：

1. 把 wiki 从自由文本升级成“带结构、带证据、带出处”的编译层
2. 为页面维护 `confidence`、`open questions`、`contradictions` 这类机器和人都能读的状态
3. 为知识层补 `lint` 和 dashboard，而不是只靠人工浏览
4. 让 agent 优先读 digest / dashboard，再按需回到完整页面

## 关联概念

- [Gemini 对话：Mac Ubuntu 虚拟机与 OpenClaw（环境规划摘要）](gemini-mac-ubuntu-vm-openclaw.md)
- [LLM 维护的知识库（概念）](../concepts/llm-maintained-wiki.md)
- [编译式知识库（概念）](../concepts/compiled-knowledge-vault.md)
- [Harness Engineering（概念）](../concepts/harness-engineering.md)

## 参考链接

- [Memory Wiki](https://docs.openclaw.ai/plugins/memory-wiki)
- [Wiki CLI / Tooling](https://docs.openclaw.ai/apps/cli/wiki)
