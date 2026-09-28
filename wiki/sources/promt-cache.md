# 来源：Prompt Caching 笔记：原理、命中策略和各家差异

- **源文件**：[`source/_posts/promt-cache.md`](../../source/_posts/promt-cache.md)
- **分类**：AI工程化
- **标签**：AI编程
- **日期**：2026-09-28 10:46:30

## 摘要

Prompt Caching（提示词缓存）按前缀复用已处理的上下文。Agent 多轮账单的大头是反复读取同一段长上下文，所以该看缓存读取单价，而不是只比名义输入价。自己每轮截取信息会改掉前缀，省下的 Token 往往抵不上重新写入缓存的成本。

## 要点

- 服务端从第一个 Token 比对前缀，第一处不同之后的缓存全部失效。静态内容靠前，动态内容放最后。
- 命中要求字节级一致：工具顺序、JSON key 顺序、空格和换行都不能漂。历史只追加，不改中间消息。
- Claude 用 `cache_control` 手动标断点（最多 4 个）；默认 TTL 5 分钟，命中后续期，等人确认可能超时就用 1 小时缓存。
- 并发前先发 1 个请求预热。提示词短于厂商最小长度（文中记为一般 1000 Token 以上）通常不会进缓存。
- 同会话里换模型、改工具列表、调 Reasoning 或增减图片，都会让缓存无法复用。
- Claude Opus 5.5 示例：缓存写入比普通输入贵（5 分钟 1.25 倍，1 小时 2 倍）；缓存读取 $0.20 / 百万 Token，约为当时输入价 $4 的 1/20。文中另记缓存读取从 $0.50 降到 $0.20，输入价只降了 20%。
- 粗算：10 万 Token 上下文、50 轮，无缓存约 $20，充分命中约 $1.5。
- 验证字段：Claude 看 `cache_creation_input_tokens` / `cache_read_input_tokens`；OpenAI 看 `prompt_tokens_details.cached_tokens`。
- 原理各家相同，开关不同。Claude 要显式标记；OpenAI 默认自动，并用 `prompt_cache_key` 把同一组请求路由到一起。GPT-5.6 及之后必须设置该 Key。多轮 Agent 优先 Responses API。
- Gemini、DeepSeek、Kimi 多为自动前缀缓存；Gemini 另有按存储时长计费的 Context Caching。第三方 OpenAI 兼容网关转 Claude 时，可能用不上 Claude 的缓存。
- Claude Code、Codex CLI 等官方 Agent 已处理缓存。自建调用要自己守前缀稳定。

## 另见

- [Prompt Caching](../concepts/prompt-caching.md)
- [AI 流式生成恢复](../concepts/ai-stream-recovery.md)
- [原来我一直用错了 Cowork](use-cowork.md)
- [Codex Memory 是本地缓存命中吗](../queries/codex-memory-local-cache.md)

---

*维护：Cursor Agent，2026-09-28。*
