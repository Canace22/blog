# 来源：JavaScript 在 V8 引擎浏览器上是怎么执行的

- **源文件**：[`source/_posts/js-execution.md`](../../source/_posts/js-execution.md)
- **分类**：Web开发
- **标签**：JavaScript&TypeScript
- **日期**：2022-07-25 13:36:03

## 摘要

V8 引擎中 JavaScript 执行依赖调用栈和事件循环，递归太深易栈溢出，异步任务分宏微任务，微任务优先执行。

