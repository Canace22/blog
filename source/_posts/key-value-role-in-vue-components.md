---
title: key 值在 vue 组件中的作用
comments: true
date: 2019-02-19 08:38:54
categories: Web开发
tags: [前端, 框架与库]
---

key 值在 vue 组件的作用

<!--more-->

1. key 值在 vue 组件中的作用：

   高效利用 dom

2. 分析：

   vue 生成 dom 的过程大致是：model -> vn -> diff -> patch -> dom， 这里在生成真实 dom 之前会先生成虚拟 dom，每次 dom 的改变不是直接生成新的 dom 的，因为每次改变都重新生成新的 dom，效率太低，消耗太大。在每次改变 dom 之时，会经历以下过程，diff 函数对比新旧 vn，包括属性值等，确认哪一项变了，则生成一个新的 patch，将改变的项目插入到 dom 中。

   在执行 diff 函数之时，会判断 key 值是否存在，若存在，则采用 map 映射的方式，查找相应的 vn，若不存在则会一个个去遍历 vn，直到找到相应的改变项，由于直接遍历的速度比 map 映射查找的速度慢，所以在最好在 vue dom 中加上 key 值。
