# 来源：key 值在 vue 组件中的作用

- **源文件**：[`source/_posts/key-value-role-in-vue-components.md`](../../source/_posts/key-value-role-in-vue-components.md)
- **分类**：Web开发
- **标签**：前端，框架与库
- **日期**：2019-02-19 08:38:54

## 摘要

给 vue 组件添加 key 能提升 diff 算法效率，避免逐个遍历节点。

## 原文要点（有据摘要）

- Vue 更新大致路径：model → 虚拟 DOM → diff → patch → 真实 DOM；不是每次整树重建。
- 原文认为：diff 时若存在 `key`，可用类似映射的方式定位对应虚拟节点；若无则更多依赖逐项查找，因此建议在 DOM/列表项上写 `key` 以利于效率。

## 综合延展（非原文）

更完整的用法与注意点（`v-for` 身份、`key` 变化时组件重挂载、与下标/随机 key 的区别）见概念页：[Vue 中的 `key`](../concepts/vue-key.md)。
