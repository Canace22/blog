# 来源：Cursor 的网络协议，为什么选 HTTP/1.1 才能用 Claude

- **源文件**：[`source/_posts/http-claude.md`](../../source/_posts/http-claude.md)
- **分类**：AI工程化
- **标签**：AI编程
- **日期**：2026-09-16 10:53:55

## 摘要

开了代理，浏览器能正常访问 Claude，但 Cursor 默认的 HTTP/2 模式调用模型会报区域限制，切到 HTTP/1.1 就好了。原因是 Node.js 里 HTTP/1.1 和 HTTP/2 由两套独立模块实现，只有 HTTP/1.1 那套能接上本地代理。

## 要点

- HTTP/1.1 走 `node:http` / `node:https`，连接池挂在 `Agent` 上，可以接入 ProxyAgent：先向本地代理端口（如 `7890`）发送 `CONNECT host:443`，隧道建好后再做 TLS 握手。
- HTTP/2 走 `node:http2`，`http2.connect()` 直接连目标源站。它没有 `Agent` 那样的代理钩子，不读系统代理，也不发 `CONNECT`。`@vscode/proxy-agent` 这类适配器历史上只劫持了 `http.request` / `https.request`。
- 结果：HTTP/2 流量绕过本地代理，用本机真实 IP 直连 Anthropic，于是被拒。
- HTTP/1.1 能救急，但没有多路复用，长输出、大上下文时并发差，偶尔会断连。
- 不降级协议的两种办法：
  - **TUN 模式**：在网络层用虚拟网卡接管所有出站流量。同时检查分流规则，让 `cursor.sh`、`cursor.com`、`anthropic.com` 走代理。
  - **环境变量** `HTTP_PROXY` / `HTTPS_PROXY`：对终端 `claude-cli`、新版 Cursor CLI、基于 `fetch` 的工具链有效；对直接调用 `http2.connect()` 的旧版后台进程不一定有效。

## 另见

- [Cursor Cookbook](../concepts/cursor-cookbook.md)
- [AI 辅助开发](../concepts/ai-assisted-development.md)
- [解决 Cursor debugger 模式在 electron 项目中无法使用问题](cursor-debugger.md)

---

*维护：Claude（Cowork），2026-09-28。*
