# 来源：Gemini 对话——indes/flowerss-bot 项目原理

- **类型**：Gemini 对话整理（非博客 `source/_posts`）；架构级描述与 Gemini 归纳一致，**依赖与目录名**已与 GitHub 仓库 `go.mod` / 常见布局核对。
- **外部链接（会话入口）**：<https://gemini.google.com/app/5f9ae6a8c1e0a25a?utm_source=chrome_omnibox&utm_medium=owned&utm_campaign=gemini_shortcut>
- **项目**：<https://github.com/indes/flowerss-bot>
- **分类**：工程化与运维（构建与部署 / 开发工具）
- **标签**：构建与部署
- **日期**：2026-04-13

## 摘要

对话回答「flowerss-bot 的原理」：将其概括为 **带持久化的定时 RSS 抓取器**，在 **RSS/Atom** 与 **Telegram Bot API** 之间做桥接；用户通过 Bot 指令管理订阅，进程按周期拉取 feed、解析条目、与库中已推送记录比对去重，再组装消息推送。可选 **Telegraph** 将正文转为应用内可读页面。

## 技术栈（与仓库核对）

- **语言**：Go。
- **订阅解析**：`github.com/mmcdole/gofeed`。
- **Telegram**：`gopkg.in/telebot.v3`（对话中写「tucnak/telebot」为旧名/泛指，以仓库为准）。
- **存储**：GORM + SQLite（默认）或 MySQL（`go.mod` 中驱动齐全）。
- **Telegraph**：`github.com/indes/telegraph-go`（Instant View / 长文排版类能力依赖此链）。

## 工作流程（对话归纳）

1. **订阅**：用户发 `/sub <feed URL>` 等；Bot 校验 URL，将订阅与用户/会话关联写入库。
2. **抓取**：内部定时任务轮询库中订阅；可用协程并发请求多个 feed。
3. **去重**：解析后与已存 GUID、链接或更新时间对比，识别新条目再进入推送队列。
4. **推送**：组装标题、摘要、链接等，经 Bot API（如 `sendMessage`）发到用户/群/频道；若启用 Telegraph，则对正文做抓取与清洗后走 Telegraph API，再把预览链一并发出。
5. **其它**：关键词过滤（推送前匹配标题/正文）；OPML 导入导出（解析 XML 批量订阅）。

## 仓库结构（对话列举，以当前仓库为准）

- `internal/model`：数据模型与持久化。
- `internal/bot`：Telegram 指令与交互。
- `internal/fetch`：RSS 拉取与内容处理相关逻辑。

## 另见

- [RSS / Telegram 自建推送](../concepts/rss-telegram-selfhost.md)
- [Gemini 对话：自建 RSS 推 Telegram（flowerss-bot）](gemini-rss-flowerss-telegram-selfhost.md)（部署与排错侧重）
- [RSS 推送到 TG 的可行性探索](rss-telegram-selfhost.md)（Hexo 博文实践）
