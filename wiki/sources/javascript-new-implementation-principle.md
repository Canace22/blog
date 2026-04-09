# 来源：JavaScript new 关键字的实现原理

- **源文件**：[`source/_posts/javascript-new-implementation-principle.md`](../../source/_posts/javascript-new-implementation-principle.md)
- **分类**：Web开发
- **标签**：JavaScript&TypeScript
- **日期**：2021-04-24 11:38:18

## 摘要

new 关键字通过设置实例的 __proto__ 指向构造函数原型，并绑定构造函数执行上下文实现属性和方法继承。

