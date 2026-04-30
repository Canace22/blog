# Hermes：`/anthropic` 网关与模型名点号规范化

跨厂商多协议栈时，**同一套「Anthropic 兼容」启发式**会对 **model 字符串** 做不同处理；小米 MiMo 与 MiniMax 在 Hermes 中的行为差异是典型案例。

## 定义

- **preserve_dots**：在走 Anthropic Messages 适配层时，是否**不把**模型 ID 里的 `.` 替换成 `-`（Claude 系列通常需要替换；部分第三方厂商 ID 含语义性点号，不能替换）。

## Claims

| ID | Claim | Confidence |
| --- | --- | --- |
| C1 | `base_url` 以 `/anthropic` 结尾时，Hermes 倾向使用 `anthropic_messages`，与「名为 xiaomi 但 URL 指向 Anthropic 网关」可同时成立。 | High |
| C2 | 未对白名单厂商保留点号时，`mimo-v2.5-pro` 可能被发成 `mimo-v2-5-pro`，导致上游 400。 | High |
| C3 | 仅使用 OpenAI 形态 `…/v1` + chat completions 时，通常不经 Anthropic 适配层的点号规则。 | Medium |

## Evidence

- `E1` [Cursor 会话整理：Hermes 小米 vs MiniMax](../sources/cursor-hermes-xiaomi-mimo-minimax.md)
- `E2` Hermes 源码语境（工作区）：`run_agent.py` 中 `_anthropic_preserve_dots`；`hermes_cli/providers.py` 中 `determine_api_mode` 对 `/anthropic` 的判定；`agent/anthropic_adapter.normalize_model_name`

## 实务建议

1. 先确认 **实际请求的 URL**（是否 `…/anthropic`）与 **请求体里的 model 字段**是否仍含 `2.5` 形式的点号。
2. 若必须用区域 **token-plan** 的 Anthropic 兼容入口，确保客户端对 **xiaomi / xiaomimimo** 与对 MiniMax 一样 **保留点号**（或与厂商文档核对接受的 model slug）。
3. 若官方推荐 **REST `/v1` OpenAI**，优先与文档一致，减少双协议栈分支。

## Open Questions

1. 小米各区域网关是否同时支持 Messages 与 Chat Completions，且 model 命名表是否一致？
2. 是否应在 Hermes 文档中单列「含点号 model id 的厂商」而非逐个加白名单？

## 关联

- [来源：Cursor 会话 — Hermes 小米 MiMo 与 MiniMax](../sources/cursor-hermes-xiaomi-mimo-minimax.md)
