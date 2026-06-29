---
title: Vitest 笔记
description: Vitest 相对 Jest 的配置复用、ESM 支持与开发体验对比，附版本要求及 it/test 语法来源
categories: 工程化与运维
tags: 代码质量
author: Canace
toc: true
comments: true
date: 2026-06-29 10:00:00
---

## 跟 jest 相比，vitest 的优势是什么

1. 在使用 vite 的项目里可以复用配置，不需要额外加配置，jest 还需要babel等配置

2. 原生 ESM 支持，jest 需要额外配置才能支持，在 monorepo 项目中支持 import/export，如果用 jest，在不做任何配置的情况下，只能用 cjs 语法，require/exports

3. 开发体验更快

- 和 vite 共用一套 transform 管线，省去了中间转义的过程，使用 esm 做转义，开销比 Babel 全量转义小

- 继承 vite 的按需解析，watch 反馈更快，jest 在启动时需要扫描，大量 transform 文件，大项目冷启动慢

## 局限性

Vite >=v6.0.0 and Node >=v20.0.0，这意味着在 node 版本比较低的项目里 Vitest 是不适用的

## 为什么会有it/test两种断言语法

来自 BDD（行为驱动开发）习惯：

| **API**    | **读起来像**                                                  |
| ---------- | --------------------------------------------------------- |
| `describe` | 「描述一组行为」                                                  |
| `it`       | 「它应该……」→ `it('should compress and call write tool', ...)` |
| `test`     | 「测试……」→ 更直白                                               |

Jasmine 最早用 `describe` + `it`；Jest/Vitest 保留这套，同时提供 `test` 给更喜欢直白命名的人。
