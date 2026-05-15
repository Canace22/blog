# 来源：JavaScript 在 V8 引擎浏览器上是怎么执行的

- **源文件**：[`source/_posts/js-execution.md`](../../source/_posts/js-execution.md)
- **分类**：Web开发
- **标签**：JavaScript&TypeScript
- **日期**：2022-07-25 13:36:03

## 摘要

博文以 **V8 + 浏览器** 为主场景说明：同步代码靠**调用栈**逐层压入/弹出；**执行上下文**（与 DevTools 里看到的 scope 链相关）管理当前可见变量；异步靠**事件循环**把回调排入队列，在栈空时取出执行。并提醒递归过深易栈溢出，以及宏任务与微任务调度上「微任务优先于下一个宏任务」的常见结论。

下文「核对与补充」对原文中偏简化或易误解处做了对照（**未改** Hexo 原文，仅在本页维护层说明）。

## 博文结构（与原文一致）

### 一、调用栈（Call Stack）

- 同步函数嵌套调用时，引擎按栈（先进后出）压入/弹出栈帧；内层函数执行完先弹出，再回到外层。
- 调用栈深度有上限，递归过深会 **栈溢出（stack overflow）**。
- 原文强调示例均为同步函数，便于用 `debugger` 观察栈行为。

### 二、执行上下文（Execution Context）

- DevTools 里看到的 **Scope**（Local / Global 等）与「当前执行环境」直观对应：新函数入栈时会有新的词法环境；函数结束则随栈帧离开而不再可用（全局上下文随页面生命周期更久）。
- 原文以普通函数在浏览器全局下调用为例，说明 **`this` 可能指向 `window`**（见下方核对）。

### 三、事件循环（Event Loop）

- 动机：避免长时间同步执行阻塞交互；异步 API 先把回调交给宿主/运行时排队，主线程继续执行后续同步代码。
- 教学向二分：**宏任务**（如 `setTimeout` / `setInterval` 等由宿主排队的任务）与 **微任务**（如 `Promise.then` 等）；常见结论是：**当前宏任务对应的同步代码跑完、调用栈清空后，会先尽量清空微任务队列，再取下一个宏任务**。

## 核对与补充（维护说明）

### 1. 「V8 浏览器」与引擎边界

- 原文已说明：并非所有浏览器都用 V8（例如 Firefox 的 **SpiderMonkey**、Safari 的 **JavaScriptCore**）。
- **事件循环**在浏览器里主要由 **HTML 标准中的「事件循环 / 任务 / 微任务检查点」** 与 ECMAScript 的 **Job（微任务）** 机制共同描述；把它完全说成「V8 自己的机制」不准确——V8 负责执行 JS 并与**宿主**（浏览器）协作排队与调度。

### 2. `this` 与「普通函数一定指向 Window」

- 原文结论**仅适用于**：非严格模式、在浏览器全局下以普通函数形式调用等典型课堂例子。
- **严格模式**（`'use strict'`）下，普通函数若作为独立调用，**`this` 常为 `undefined`**（非严格时才是全局对象）。
- **箭头函数**没有自己的 `this`，继承外层词法环境；**模块**代码默认严格模式，行为又与全局脚本不同。
- 需要精确行为时应查调用方式（方法调用、`call`/`apply`/`bind`、`new` 等），不宜只记「指向 Window」一条。

### 3. 宏任务 / 微任务：教学标签 vs 规范用语

- 「宏任务 = 宿主、微任务 = 引擎」是**便于记忆**的粗分法；规范侧更常见的是 **task（任务）** 与 **microtask（微任务）** / **Job** 等术语，边界不必强行扣成「只属于引擎或只属于宿主」。
- 除 `Promise` 外，**`queueMicrotask()`**、**`MutationObserver` 回调**等也常归入「微任务」讨论语境（具体仍应以 HTML / ECMAScript 算法为准）。
- 原文中的 **`seTimout` / `setIntervals` 为笔误**，应为 `setTimeout` / `setInterval`（Hexo 原文未改，此处注明）。

### 4. 长时间同步代码与「渲染」

- 长同步任务会**长时间占用主线程**，导致卡顿、交互与动画掉帧，这一点原文担心是对的。
- 但不宜理解成「永远先整段 JS 跑完才渲染一次」：浏览器会在事件循环各阶段之间插入**渲染、合成**等步骤（与 **帧、`requestAnimationFrame`** 等机制相关），具体时机以 HTML 事件循环模型为准；工程上仍应避免超长同步块，并关注 **Long Task** 与性能指标。

### 5. 调用栈与执行上下文

- 教学上把「栈帧 + 当前 scope」一起讲没问题；若与 ECMAScript 规范对照，**执行上下文**还包括词法环境、变量环境、`this` 绑定等细项，与 DevTools 展示并非一一像素级对应。

## 延伸阅读（规范 / 文档向）

- MDN：[Event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
- MDN：[Call stack](https://developer.mozilla.org/en-US/docs/Glossary/Call_stack)（原文已链）
- WHATWG HTML：[Event loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)

## 另见

- [JavaScript 垃圾回收](../concepts/javascript-garbage-collection.md)（堆对象生命周期与引擎回收）

---

*本页在保留博文脉络的基础上补充核对说明；编辑：assistant，2026-05-14。*
