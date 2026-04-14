# RSS / Telegram 自建推送

把「用 Bot 把 RSS 更新推到 Telegram 频道/私聊」时的**部署与连通性**抽成可检索要点：一条线来自 Gemini 对话里的排错表，另一条线来自博文里的**第一人称实践**（Token 复用、Docker 代理、`host.docker.internal`）；**具体镜像名、环境变量与指令**以你所选项目文档为准。

## Claims（可操作的结论）

1. **动机**：第三方 RSS Bot 常有广告、订阅上限或不稳定；自建可在可接受运维成本下换取可控性与隐私边界（仍受 Telegram 平台规则约束）。
2. **最小依赖**：Bot Token（@BotFather）、目标会话/频道的 Chat ID；频道场景通常要把 Bot 设为管理员并具备发帖权限。
3. **Webhook 与轮询**：若曾把同一 Bot 配成 Webhook，后续用 `getUpdates` 式轮询可能报冲突；需清理 Webhook 或重置 Token，并核对 URL 拼写（`/bot<TOKEN>/…`）。
4. **中国大陆网络**：运行环境若无法直连 `api.telegram.org`，需在**主机或容器**侧解决出站（代理、反代、或把 workload 放到可直连区域）；这与「能不能买国内 VPS」是同一类连通性问题。
5. **导入细节**：部分 Bot 按**文件扩展名**识别 OPML；客户端若隐藏扩展名，容易出现「以为改了后缀其实仍是 `.xml`」的误判。
6. **常驻性**：笔记本上 Docker 随睡眠/断网停摆；要推送稳定需常驻主机或云端。
7. **Token 与「单调用方」感知**（博文）：同一 Bot 若已被其他客户端/用途占用，在新栈（如 flowerss）复用可能持续失败；**重置 Token** 常是最快解法（与 Gemini 摘要里「Webhook 冲突时重置 Token」可对照，根因未必相同但手段重叠）。
8. **Docker 内代理与宿主机解析**（博文）：容器访问 `api.telegram.org` 失败时，除在 `config.yml` 写 `proxy` 外，可在 compose 里设 **`HTTP_PROXY` / `HTTPS_PROXY`**，并用 **`extra_hosts`** 让容器解析 **`host.docker.internal`**（Linux 上常需 `host-gateway`）。
9. **典型开源 Bot 的实现形态（以 flowerss-bot 为例）**：常驻进程按周期 **HTTP 拉取 RSS/Atom** → **gofeed 解析** → **数据库去重** → **telebot 调 Bot API 推送**；可选 **Telegraph** 做应用内长文阅读。是否用 `getUpdates` 长轮询、定时器粒度等以具体仓库与配置为准。

1–6 主要来自 [Gemini 对话摘要](../sources/gemini-rss-flowerss-telegram-selfhost.md)（**助手建议**，非厂商 SLA）；7–8 来自 [博文：RSS 推送到 TG 的可行性探索](../sources/rss-telegram-selfhost.md)（**个人实践**，需结合你方网络与镜像版本自行验证）；9 与依赖名核对见 [Gemini 对话：flowerss-bot 原理](../sources/gemini-flowerss-bot-principle.md)。

## Evidence

- [来源：Gemini 对话——自建 RSS 推 Telegram（flowerss-bot 等）](../sources/gemini-rss-flowerss-telegram-selfhost.md)
- [来源：Gemini 对话——indes/flowerss-bot 项目原理](../sources/gemini-flowerss-bot-principle.md)
- [来源：RSS 推送到 TG 的可行性探索](../sources/rss-telegram-selfhost.md)（`source/_posts/rss-telegram-selfhost.md`）

## Open Questions

- `indes` / `fengkx` 等镜像的维护节奏与推荐入口会变化，选型前应看 Docker Hub / GitHub 最近提交与 issue。
- Cloudflare Worker 反代 Telegram API 的合规与稳定性取决于账号与地区政策，需自行评估。

## 相关

- [Mac / Linux 虚拟机资源与 OpenClaw 开发](../queries/mac-linux-vm-openclaw-dev.md)（同属「开发环境出网/代理」语境时可对照）
