# 来源：Cursor 会话 — Hermes 中小米 MiMo 与 MiniMax 行为差异

- **源**：Cursor 工作区 `~/.hermes`（Hermes Agent / `run_agent.py` 等）
- **分类**：AI探索
- **标签**：Hermes、多模型、Anthropic 兼容、配置
- **日期**：2026-04-30

## 摘要

在 Hermes 中，**MiniMax 能正常、小米 MiMo 报错**的常见原因不是「只能用哪家」，而是 **base URL 形态** 与 **模型 ID 规范化** 叠加：当 `base_url` 以 **`/anthropic` 结尾**时，运行时会选用 **Anthropic Messages** 协议；适配层默认会把模型名里的 **`.` 改成 `-`**（为兼容 Claude ID）。MiniMax 在 `_anthropic_preserve_dots` 白名单里，**保留点号**；小米 MiMo 的 **`mimo-v2.5-pro`** 若被改成 **`mimo-v2-5-pro`**，区域/代理网关可能返回 **400 / 不支持该 model**。若只用 **`.../v1` + OpenAI Chat Completions**，则一般不会经过这段「点变横杠」逻辑。工程上可为 `xiaomi` 与 `xiaomimimo` 域名对齐 MiniMax 的 **preserve_dots** 行为（见概念页）。

## 会话要点

| 项目 | MiniMax | 小米 MiMo（典型问题场景） |
| --- | --- | --- |
| 常用网关形态 | `…/anthropic` | 官方 `api.xiaomimimo.com/v1` 或区域 `token-plan-*.xiaomimimo.com/v1`；若误用 `…/anthropic` 会走 Anthropic 路径 |
| Hermes 默认 xiaomi transport | — | `openai_chat`（`/v1/chat/completions`） |
| URL 以 `/anthropic` 结尾时 | `api_mode` → `anthropic_messages` | 同上，与 provider 命名无关，由 URL 启发式决定 |
| 模型名 `v2.5` | 已在白名单保留点号 | 曾缺省未保留 → 易发 `mimo-v2-5-pro` |

## 配置备忘

- `model.provider: xiaomi`，`XIAOMI_API_KEY`；`model.base_url` 与控制台文档一致。
- `config.yaml` 里 `base_url` 避免多余空格；会话中曾出现 `token-plan-sgp.xiaomimimo.com/anthropic` 与 `/v1` 两种路径混用导致排查混淆。

## 关联

- [Hermes：`/anthropic` 网关与模型名点号规范化](../concepts/hermes-anthropic-endpoint-model-id-normalization.md)
- [提升 AI Coding 稳定性的经验上下文模式](../concepts/agent-coding-stability.md)（多厂商 agent 配置可归为「经验上下文」类问题）
