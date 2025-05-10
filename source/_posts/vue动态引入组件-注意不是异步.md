---
title: vue动态引入组件,注意不是异步!
categories: web
tags: vue
description: vue动态引入组件
comments: true
date: 2019-11-22 11:36:28
---

对于页面组件我们一般并不想去异步加载，但是如果一个 vue 项目用到了多个页面，我们需要在 app.vue 进行组件切换的时候一下全部引入也不好。所以就有了一个问题如何可以同步引入组件，又可以按需的加载呢？

我们知道 vue 的局部组件最终会被合并到 option 上，所以，利用这个关系可以按不同的条件去 require 不同的页面，把加进 vue 的 option 中就达到了我的目的了，这里需要一点底层操作，因为按照平常的话，我们把需要用到的组件写进 components 就好了，合并到 option 是 vue 解析的事情。讲了这么多，看看以下 demo 吧。

```js
const comp = require(`pages/${this.currentPage}`);
this.$options.components[this.currentPage] = comp.default;
```
