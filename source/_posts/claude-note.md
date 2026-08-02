---
title: Claude Code 使用笔记
description: 记录 Claude Code 使用中的经验。
categories: AI工程化
tags: AI编程
author: Canace
toc: true
comments: true
date: 2026-07-27 09:53:30
---

## cc 总是问权限

在执行长任务时，总是被权限询问打断，体验非常不好，可以配置一下 setting.json，放开所有权限，注意风险点：bypass 模式下 rm -rf、git push --force、任意网络请求都不会再问。如果想保守一点也可以配置为 auto，只拦截真正危险的操作。

```json
{
  "permissions": {
    "defaultMode": "bypassPermissions"
  }
}
```
