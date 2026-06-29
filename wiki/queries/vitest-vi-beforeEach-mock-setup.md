# Vitest 里 vi 是什么，beforeEach 什么时候用

- **性质**：对话沉淀为可复用 Q&A（NarrativeEngine 单测场景）；正文已并入 [`source/_posts/vitest-vs-jest-advantages.md`](../../source/_posts/vitest-vs-jest-advantages.md)。
- **日期**：2026-06-29

## 问题背景

在 Vitest 单测文件（如 `syncInitialUpload.test.ts`）里常见：

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

`vi` 从哪来？`beforeEach(() => { ... })` 语法怎么读？一般什么情况下要用？

## 结论

### `vi` 是什么

`vi` 是 **Vitest** 从 `'vitest'` 包导出的 **mock / spy 工具集**，地位类似 Jest 里的 `jest`：

| API | 作用 |
| --- | --- |
| `vi.fn()` | 创建 mock 函数，可记录调用、设返回值 |
| `vi.mock()` | mock 整个模块 |
| `vi.spyOn()` | 监听或替换对象方法 |
| `vi.clearAllMocks()` | 清空 mock 调用记录 |

常见写法：`const loadLocal = vi.fn()` 造假依赖；`vi.mock('@/stores/...', () => ({ ... }))` 在 import 被测模块前替换依赖。

### `beforeEach(() => { ... })` 语法

- `beforeEach`：Vitest 生命周期钩子，**当前 `describe` 下每个 `it` 跑之前**执行一次。
- `() => { ... }`：传给它的箭头函数回调（无参时可写成普通 `function () { ... }`）。
- 回调里的代码 = 每个用例的公共 setup。

相关钩子：`afterEach`（每个 `it` 之后）、`beforeAll` / `afterAll`（整个 `describe` 只跑一次）。

### `beforeEach` 一般什么时候用

| 场景 | 说明 |
| --- | --- |
| 重置 mock | 避免上一个 `it` 的调用记录或返回值污染下一个 |
| 统一默认环境 | 多个用例共享 baseline（如 mock IPC 默认成功、伪造 `window.electron`） |
| 每用例新建实例 | Store / Service 需要从干净状态开始 |
| 单用例 setup 很短 | 只有 1～2 个 `it` 且 setup 很少 → 可直接写在 `it` 里，不必强行 `beforeEach` |
| 昂贵且不变的全局准备 | 如启动服务、读大文件 → 用 `beforeAll` 更合适 |

**原则**：需要**用例隔离** → `beforeEach`；昂贵且**可共享** → `beforeAll`。

### 单测文件里的典型分工

1. 文件顶部：`vi.fn()` + `vi.mock(...)` 声明依赖替身。
2. `beforeEach`：`vi.clearAllMocks()` + 各 mock 的**默认** `mockResolvedValue`。
3. 单个 `it`：只覆盖与本场景相关的 mock（如 `listNarrativePlans.mockResolvedValue({ data: [plan] })`），其余沿用 baseline。

Node 测试环境没有浏览器 `window` 时，常用 `Object.defineProperty(globalThis, 'window', { value: { electron: {} }, configurable: true })` 模拟 Electron 渲染进程。

## 另见

- [跟 Jest 相比，Vitest 的优势是什么](../../source/_posts/vitest-vs-jest-advantages.md)（配置复用、ESM、`vi` / `beforeEach`、`describe` / `it` / `test` 语法来源）
- [自动化测试](../concepts/automated-testing.md)（测试金字塔、Vitest vs Jest 对照）
- [Vue 单元测试](../sources/vue-test-unit.md)（早期 Jest 配置参考，概念可迁移到 Vitest）

---

*Query 草稿：Cursor Agent；2026-06-29。*
