---
title: Vitest 笔记
description: Vitest 相对 Jest 的配置复用、ESM 支持与开发体验对比，附 vi/beforeEach 用法、版本要求及 it/test 语法来源
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

## vi 是什么，beforeEach 什么时候用

单测文件里常见这样的写法：

```ts
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('sync initial upload detection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(globalThis, 'window', { value: { electron: {} }, configurable: true });
    loadProjectIndex.mockResolvedValue({ success: true, data: { ... } });
  });

  it('...', async () => { /* ... */ });
});
```

### vi 是什么

`vi` 是 Vitest 从 `'vitest'` 包导出的 mock / spy 工具集，地位类似 Jest 里的 `jest`：

| API | 作用 |
| --- | --- |
| `vi.fn()` | 创建 mock 函数，可记录调用、设返回值 |
| `vi.mock()` | mock 整个模块 |
| `vi.spyOn()` | 监听或替换对象方法 |
| `vi.clearAllMocks()` | 清空 mock 调用记录 |

常见写法：`const loadLocal = vi.fn()` 造假依赖；`vi.mock('@/stores/...', () => ({ ... }))` 在 import 被测模块前替换依赖。

### beforeEach 语法怎么读

- `beforeEach`：Vitest 生命周期钩子，当前 `describe` 下每个 `it` 跑之前执行一次。
- `() => { ... }`：传给它的箭头函数回调（无参时可写成普通 `function () { ... }`）。
- 回调里的代码 = 每个用例的公共 setup。

相关钩子：`afterEach`（每个 `it` 之后）、`beforeAll` / `afterAll`（整个 `describe` 只跑一次）。

### beforeEach 一般什么时候用

| 场景 | 说明 |
| --- | --- |
| 重置 mock | 避免上一个 `it` 的调用记录或返回值污染下一个 |
| 统一默认环境 | 多个用例共享 baseline（如 mock IPC 默认成功、伪造 `window.electron`） |
| 每用例新建实例 | Store / Service 需要从干净状态开始 |
| 单用例 setup 很短 | 只有 1～2 个 `it` 且 setup 很少 → 可直接写在 `it` 里，不必强行 `beforeEach` |
| 昂贵且不变的全局准备 | 如启动服务、读大文件 → 用 `beforeAll` 更合适 |

原则：需要用例隔离 → `beforeEach`；昂贵且可共享 → `beforeAll`。

### 单测文件里的典型分工

1. 文件顶部：`vi.fn()` + `vi.mock(...)` 声明依赖替身。
2. `beforeEach`：`vi.clearAllMocks()` + 各 mock 的默认 `mockResolvedValue`。
3. 单个 `it`：只覆盖与本场景相关的 mock（如 `listNarrativePlans.mockResolvedValue({ data: [plan] })`），其余沿用 baseline。

Node 测试环境没有浏览器 `window` 时，常用 `Object.defineProperty(globalThis, 'window', { value: { electron: {} }, configurable: true })` 模拟 Electron 渲染进程。
