# JavaScript 垃圾回收

JavaScript 通过运行时的**垃圾回收（GC）**自动回收不再需要的对象内存；开发者通常不手动释放堆对象（与 C 系手动 `free` 不同）。

## 与本库来源的关系

- 教学向入门要点（可达性、引用计数 vs 标记清除、实践提示）：见 [对话摘录：JavaScript 垃圾回收（GC）入门说明](../sources/assistant-javascript-garbage-collection-overview.md)。
- 与「引用类型」直觉衔接：[JavaScript基础 —— 基本数据类型与引用类型的异同](../sources/javascript-basics-primitive-vs-reference-types.md)。
- 执行与调度语境（调用栈、事件循环）：[JavaScript 在 V8 引擎浏览器上是怎么执行的](../sources/js-execution.md)。

## 合成说明（超出单篇摘录的边界）

- **可达性**仍是理解「为何某对象还能活着」的主线：从根集合出发能遍历到的对象会被保留。
- **真实引擎**（如 V8）在经典「标记—清除」思路上常叠加**分代假设**（年轻/老生代）、**增量或并发标记**等，以降低停顿时间；单篇通俗介绍不会展开到这一层。
- **内存泄漏**常见原因包括：未移除的监听器与定时器、全局或长生命周期闭包持有大对象、Detached DOM 树等；「帮助 GC」本质是**断开不需要的引用**，而不是保证立刻回收。

---

*概念页草稿：assistant，2026-05-14。*
