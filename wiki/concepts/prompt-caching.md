# Prompt Caching

Prompt Caching（提示词缓存）是厂商 API 对重复前缀的复用：后续请求开头与已缓存前缀字节一致时，不再按完整输入价处理这段前缀。

## 定义

- **缓存写入（Cache Write）**：第一次把稳定前缀存进去。Claude 上这一步比普通输入更贵。
- **缓存读取（Cache Read）**：后续命中。单价远低于普通输入，是多轮 Agent 账单的主要项。
- **前缀匹配（Prefix Matching）**：从第一个 Token 逐一比对，第一处不同之后全部失效。

官方 Agent（Claude Code、Codex CLI）已经按这个规则拼请求。自己调 API 时，截短上下文看起来少发了 Token，前缀每轮都变，就会每轮重新写入。

## 命中要守的几件事

1. 静态内容在前：工具定义、系统提示、参考文档；时间、随机 ID、最新用户消息放最后。Claude 的拼接顺序是 `tools → system → messages`。
2. 序列化字节级稳定：工具顺序固定，JSON key 顺序固定，空格和换行固定。
3. 历史只追加。必须压缩时，一次截掉一大段，不要每轮微调。
4. 同一会话不换模型、工具列表、Reasoning 参数或图片集合。
5. 并发前先用一条请求预热，避免同一前缀被同时写入多次。
6. 短提示通常不缓存，长度阈值以厂商文档为准。

Claude 还要自己放 `cache_control` 断点（最多 4 个）：系统提示末尾一个，对话历史最后一条随轮次后移。等人超过 5 分钟时，改用 1 小时缓存。

## 厂商差异

| 维度 | Claude | OpenAI |
| --- | --- | --- |
| 启用 | 手动 `cache_control` | 默认自动；GPT-5.6 及之后必须设 `prompt_cache_key` |
| 写入 | 比普通输入贵 | 无额外写入费 |
| 过期 | 5 分钟 / 1 小时 | 内存模式 / 扩展模式，最长 24 小时 |
| 路由 | — | `prompt_cache_key` 与前缀哈希一起影响落到哪台机器 |

Claude 是标明「把这里缓存下来」。OpenAI 的 Key 是标明「这些请求是同一组」。多轮 Agent 优先 Responses API。Gemini、DeepSeek、Kimi 大多自动做前缀缓存；Gemini 另有按存储时长计费的 Context Caching。走第三方 OpenAI 兼容网关调 Claude 时，缓存可能传不过去。

## 和相近机制的区别

- **KV Cache**：推理服务里的中间计算结果，用于断线后少重算前文。第三方 API 通常不让你管理它。见 [AI 流式生成恢复](ai-stream-recovery.md)。
- **Codex memory**：长期工作记忆和检索线索，命中后仍要回当前仓库核对，不是前缀计费缓存。见 [Codex Memory 是本地缓存命中吗](../queries/codex-memory-local-cache.md)。
- **少发 Token**：每轮自己截取上下文会改前缀。省下的输入量，可能不如丢掉的缓存读取便宜。

## 怎么确认命中

- Claude：`usage.cache_creation_input_tokens`（写入）、`usage.cache_read_input_tokens`（命中）。
- OpenAI：`usage.prompt_tokens_details.cached_tokens`。

可做的检查：相同请求第二次应大量命中；系统提示里加时间戳应归零；第 N 轮命中量约等于第 N-1 轮总输入；超过 TTL 应重新写入；对调两个工具声明的顺序应归零。

## 来源与关联

- [Prompt Caching 笔记：原理、命中策略和各家差异](../sources/promt-cache.md)
- [原来我一直用错了 Cowork](../sources/use-cowork.md)（上下文过长、用错产品导致额度上去）
- [AI 辅助开发](ai-assisted-development.md)
- [我的文章涵盖 AI Coding 哪几方面](../queries/ai-coding-coverage.md)

---

*维护：Cursor Agent，2026-09-28。*
