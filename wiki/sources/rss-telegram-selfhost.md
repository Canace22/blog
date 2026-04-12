# 来源：RSS 推送到 TG 的可行性探索

- **类型**：Hexo 博文（`source/_posts/rss-telegram-selfhost.md`）
- **日期**：2026-04-12
- **分类 / 标签**（博文 front matter）：软技能与思考 · 随笔

## 摘要

作者在已用 OpenClaw 连 Telegram 的前提下，想把 **RSS 更新推到 TG** 以便多设备查看；此前习惯用 Kindle 侧稳定推送，Kindle 中国区调整后改网页阅读，仍希望有类似「订阅聚合推送」。试用若干第三方 RSS Bot 后，因**批量导入差、广告或订阅源限制**等改为自建 **flowerss-bot**（`indes/flowerss-bot` 镜像），流程为 @BotFather 建 Bot → 配置 flowerss → Bot 加入频道定时推送。

## 文中可操作要点（第一人称实践）

- **Token 独占**：同一 Bot 若曾被其他用途（文中举例「龙虾」）占用，再在 flowerss 复用会持续报错；**在 BotFather 重置 Token** 后解决。
- **Docker 出网**：本地 Docker 跑脚本时 **Telegram API 调不通**，为容器配置 **`HTTP(S)_PROXY`** 指向宿主机代理，并配合 **`host.docker.internal`** 与 compose 里 **`extra_hosts: host.docker.internal:host-gateway`**；`config.yml` 中 **`proxy`** 与 **`bot_token`**、`sqlite_path` 需与挂载路径一致。作者由此推断**服务器部署**也需可出网环境（反代或在对应网络环境机器上跑）。
- **常驻性**：仅 Mac 本地跑时，**睡眠或断网**会导致收不到推送；作者接受「有空再看」，或需迁到常在线机器/VPS。

## 配置示例（帖内摘录，Token 为占位符）

博文贴出 `docker-compose.yml` 与 `config.yml` 片段；**勿将真实 Token 写入仓库或截图**。

## 参考文献（帖内）

- [flowerss-bot](https://github.com/indes/flowerss-bot)

## 另见

- [RSS / Telegram 自建推送（概念）](../concepts/rss-telegram-selfhost.md)
- [来源：Gemini 对话——自建 RSS 推 Telegram（flowerss-bot 等）](gemini-rss-flowerss-telegram-selfhost.md)（故障表与 OPML/Webhook 等更细排错）
