# 来源：跟 Jest 相比，Vitest 的优势是什么

- **源文件**：[`source/_posts/vitest-vs-jest-advantages.md`](../../source/_posts/vitest-vs-jest-advantages.md)
- **分类**：工程化与运维
- **标签**：代码质量
- **日期**：2026-06-29 10:00:00

## 摘要

Vitest 相对 Jest 的配置复用、ESM 支持与开发体验对比，附 vi/beforeEach 用法、版本要求及 it/test 语法来源。

## 要点

### Vitest 相对 Jest 的优势

1. 在使用 Vite 的项目里可以复用配置，不需要额外加配置；Jest 还需要 Babel 等配置
2. 原生 ESM 支持；Jest 需要额外配置，monorepo 里零配置时往往只能用 CJS（require/exports）
3. 开发体验更快：和 Vite 共用 transform 管线，ESM 转译开销比 Babel 全量转译小；继承按需解析，watch 反馈更快；Jest 启动时要扫描并 transform 大量文件，大项目冷启动慢

### 局限性

- Vite >= 6.0.0 且 Node >= 20.0.0；Node 版本较低的项目里 Vitest 不适用

### it / test 两种断言语法

- 来自 BDD（行为驱动开发）习惯：`describe` 描述一组行为，`it` 读作「它应该……」，`test` 更直白
- Jasmine 最早用 `describe` + `it`；Jest/Vitest 保留这套，同时提供 `test`

### vi 与 beforeEach

- `vi`：Vitest 导出的 mock/spy 工具集（`vi.fn`、`vi.mock`、`vi.spyOn`、`vi.clearAllMocks`），对应 Jest 的 `jest`
- `beforeEach`：每个 `it` 前执行的 setup 钩子；`afterEach` / `beforeAll` / `afterAll` 按隔离 vs 共享成本选用
- 典型分工：文件顶 `vi.mock` → `beforeEach` 清 mock + 设默认返回值 → 单个 `it` 只改本场景相关 mock

## 另见

- [Vitest 里 vi 是什么，beforeEach 什么时候用](../queries/vitest-vi-beforeEach-mock-setup.md)（Q&A 详版）
- [自动化测试](../concepts/automated-testing.md)
- [Vue 单元测试](../sources/vue-test-unit.md)

*维护：Cursor Agent，2026-06-29。*
