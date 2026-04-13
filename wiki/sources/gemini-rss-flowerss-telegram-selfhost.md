# 来源：Gemini 对话——自建 RSS 推 Telegram（flowerss-bot 等）

- **类型**：Gemini 对话整理（非博客 `source/_posts`）；镜像名、配置文件路径与 Bot 行为以**项目官方仓库与镜像说明**为准，对话中的示例可能随版本变化。
- **外部链接（会话入口）**：<https://gemini.google.com/app/c3716af77c84dac7?utm_source=chrome_omnibox&utm_medium=owned&utm_campaign=gemini_shortcut>
- **分类**：工程化与运维（构建与部署 / 开发工具）
- **标签**：构建与部署
- **日期**：2026-04-12

## 安全提示（必读）

该 Gemini 对话的整理过程中曾出现**可被滥用的 Telegram Bot Token 明文**。本摘要**不摘录**任何令牌；若你曾在聊天或截图中泄露 Token，请到 **@BotFather** 对相应 Bot **Revoke** 并换新 Token。

## 摘要

用户因第三方 RSS→Telegram 机器人存在**订阅数量限制、广告、体验差**等问题，决定**自建**。对话围绕 **flowerss-bot** 生态（亦提及轻量 Node 脚本、`rss-to-telegram`、Huginn、Manybot 等），以 **Docker** 部署为主，并记录从容器启动、配置、**Webhook 与轮询冲突**、**中国大陆网络**到**频道绑定与 OPML 导入**的排错过程。

## 方案与动机（对话内）

- **自建收益（叙述）**：无广告、订阅量不受第三方限制、可自定义推送模板/频率、数据与隐私自控。
- **轻量替代**：单进程 Node 读 RSS、调 Telegram Bot API（对话提及类 `rss-to-telegram` 思路）；多源复杂场景可考察 **Huginn**、**flowerss-bot** 等。
- **前置条件**：通过 **@BotFather** 获取 Bot Token；目标频道需知 **Chat ID**（如私有频道常为 `-100…`，可用转发消息给信息类 Bot 等方式获取）。

## Docker 与镜像（对话内，需自行核对当前维护者）

- 对话中先后讨论 **`indes/flowerss-bot`** 与 **`fengkx/flowerss-bot`** 等镜像；助手称不同镜像对**环境变量 vs 配置文件**的支持不一致，例如某路径需 **`config.yml`** 且启动时找不到会 **panic**。
- **实践结论倾向**：在不愿使用某一镜像时，改用**挂载 `config.yml`**、`sqlite_path`、可选 **`proxy`** 字段等方式满足 `indes` 镜像的读取习惯。
- **校验**：`docker logs -f <容器名>` 查看是否完成 Telegram 初始化、RSS 定时任务是否启动。

## 配置与典型故障（对话内）

| 现象 | 对话中的解释/处理方向 |
| --- | --- |
| `chatbot_token` / 变量未生效 | 检查 `docker-compose` 与 `.env` 是否同级、变量名是否与文档一致，或改为在 `config.yml` 写 `bot_token` |
| `Pull access denied` / 镜像拉取失败 | 换镜像源或检查网络/registry |
| `open config.yml: no such file or directory` | 为镜像准备配置文件或换“零配置文件”镜像（依版本而定） |
| `can't use getUpdates method while webhook is active` | Webhook 与 long polling 冲突；需 **`deleteWebhook`**（注意 URL 形如 `https://api.telegram.org/bot<TOKEN>/deleteWebhook`），或在 BotFather **重置 Token** 使旧 Webhook 失效 |
| `deleteWebhook` 在浏览器失败 | 可能需 **代理**；或用 `curl` 指定代理访问 API |
| `Unauthorized (401)` | Token 错误、或与 BotFather 重置后未同步配置 |
| `getMe: EOF` / 网络断开感 | 容器出网失败；对话建议在 Docker 中配置 **`HTTP(S)_PROXY`** 指向宿主机代理，并配合 **`host.docker.internal`** 与 **`extra_hosts`**；宿主代理需允许局域网访问 |
| 导入不认 `.xml` | 先 **`/import`** 再发文件；或把扩展名改为 **`.opml`**；macOS 需注意“隐藏扩展名”导致实际仍为 `.xml` |

**说明**：具体键名（如 `endpoint`、`proxy`）以你所用 fork/镜像文档为准。

## 运行位置与网络（对话内）

- **仅本机 Mac 跑 Docker**：机器睡眠或断网时任务会停；要近似 24×7 需 **VPS**、家中常开设备，或退而求其次 **GitHub Actions** 定时拉取（实时性较差）。
- **中国内地服务器**：可能无法直连 Telegram API；对话列举 **服务器侧代理**、**Cloudflare Worker 反代 API**、或改用 **香港/海外机房** 以简化出站。

## 频道推送（对话内）

- 将 Bot 加为频道**管理员**并授予发帖权限。
- **导入默认可能是私聊订阅**；需在私聊用 **`/set`** 等把订阅指向频道，或使用 **`/import @频道`** 再发 OPML（助手描述，以 Bot 实际指令为准）。
- 测试可用更新频繁的 RSS（对话举例 **V2EX** 等）。

## 另见

- [RSS / Telegram 自建推送](../concepts/rss-telegram-selfhost.md)
- [来源：RSS 推送到 TG 的可行性探索](rss-telegram-selfhost.md)（Hexo 博文：`flowerss-bot`、Docker 代理与 Token 重置的一手记录）
- [docker 打包本地 web 项目发布到服务端](docker-documentation.md)（通用 Docker 发布思路）
