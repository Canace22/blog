# 推送方式与 RSS 借鉴

## 定义

**推送方式与 RSS 借鉴**是指从 Web 端版本更新弹窗的几种推送方式中，提取对 RSS 推送机制有启发的架构思路。

核心原则：把"发现更新"和"送达用户"分开设计。

## 五种推送方式对 RSS 的借鉴

### 1. 轮询（Polling）

RSS 本来就是轮询，最直接的借鉴：

- **接受低频特性**：RSS 适合"低频、最终一致"场景
- **工程化轮询**：控制间隔、失败重试、退避超时
- **状态记忆**：去重、避免重复推送
- **利用缓存**：`ETag` / `Last-Modified` 减少无效抓取

### 2. 长轮询（Long Polling）

直接可借鉴性较弱，但适合内部优化：

- **适用场景**：自己有聚合服务时，Bot/前端向聚合服务做长轮询
- **限制**：公开 RSS 源通常不支持服务端挂起连接

### 3. WebSocket

启发在"在线分发"而非"抓 feed"：

- **适用场景**：轮询抓 RSS → 发现新条目 → WebSocket 广播给在线客户端
- **价值**：解耦"更新发现"和"在线分发"
- **限制**：对只推 Telegram 的简单 Bot 有点重

### 4. SSE

比 WebSocket 更适合 RSS 的单向通知场景：

- **适用场景**：RSS 轮询做上游抓取 + SSE 实时通知浏览器
- **优势**：更轻、更贴近"新内容到了就告诉前端"的模型
- **定位**：适合做 RSS 系统的网页通知层

### 5. Service Worker + Push API

最有产品形态启发：

- **原理**：服务端抓 RSS → 发现新条目 → 调 Web Push → Service Worker 弹通知
- **价值**：用户不用一直开着网页，RSS 变成被动接收提醒
- **代价**：HTTPS、订阅管理、浏览器权限、推送基础设施变复杂

## 架构总原则

### 1. 分离"发现"和"送达"

保留同一套 RSS 抓取内核，同时挂多个下游：
- Telegram Bot
- WebSocket / SSE 网页面板
- Web Push 浏览器通知
- 邮件摘要

### 2. 不追求强实时

低频场景优先用简单方案，先把轮询、去重、稳定性做好。

### 3. 缓存、去重、幂等比协议名词更关键

- 避免重复推送
- 网络抖动后维持一致状态
- 对 feed 变更、条目顺序变化保持容错

## 一句话概括

轮询解决的是 RSS 上游怎么发现更新，SSE / WebSocket / Push API 启发的是 RSS 下游怎么把更新送得更好。

## 来源

- [查询：Web 端推送方式对 RSS 的借鉴](../queries/web-update-patterns-for-rss.md)
- [消息推送对照报告](../reports/message-delivery-comparison-report.md)
- [RSS / Telegram 自建推送](rss-telegram-selfhost.md)

## 相关概念

- [RSS / Telegram 自建推送](rss-telegram-selfhost.md)
- [Diff 三层对照](diff-three-layer-model.md)
- [更新系统分层](update-system-layers.md)
