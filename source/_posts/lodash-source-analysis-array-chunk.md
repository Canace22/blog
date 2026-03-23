---
title: lodash 源码解析 —— chunk
categories: Web开发
tags: 框架与库
description: 'chunk 核心依赖 slice 和 toInteger，需注意参数类型转换和索引处理。'
comments: true
date: 2021-01-26 09:24:31
---
chunk 的依赖关系如下图所示

![chunk 依赖图](https://raw.githubusercontent.com/Canace22/Assets/main/images/chunk.png)

通过上面的依赖图我们可以知道，chunk 依赖 slice 和 toInteger 这两个函数，slice 函数基于索引切割数组生成新的子数组，toInteger 函数把传入的值转换为整数。



