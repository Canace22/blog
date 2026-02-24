---
title: 解决 Cursor debugger 模式在 electron 项目中无法使用问题
categories: 工程化与运维
tags: 开发工具
author: Canace
comments: true
date: 2026-02-05 10:14:13
---
项目是 electron 写的，使用 Cursor 调试模式遇到了日志无法上报问题，报错如下

```
Refused to connect to 'h customslashMenu.tsx:53ttp://127.0.0.1:7242/ingest/459a74c4-d46f-4699-6894-d4f3106d294c' because it violates the document'sContent security Policy
```

原因是： renderer 进程的 Content-Security-Policy 禁止连接 http://127.0.0.1:7242

解决方法很简单，设置为允许连接就好了,在 index.html 中加一行说明

```
<!-- connect-src 含 http://127.0.0.1:7242 以便 Debug 模式向本地日志服务发送 fetch -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: file:; script-src 'self' 'unsafe-inline' 'unsafe-eval' file:; style-src 'self' 'unsafe-inline' file:; img-src 'self' data: blob: file:; font-src 'self' data: blob: file:; connect-src 'self' data: blob: file: http://127.0.0.1:7242; worker-src 'self' blob: file:;" />
```