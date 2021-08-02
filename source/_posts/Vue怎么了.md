---
title: Vue 你这是怎么了
categories: web
tags: vue
comments: true
date: 2021-08-02 11:11:43
---
早上例行体验一下在做的项目，看看有什么问题。发现编辑界面上周还好好的，这周打开就报错了，还关不掉弹窗那种，不进发问，Vue 你这是怎么啦？上周还运行的好好的。报错如下:

```js
Error in nextTick: "TypeError: Cannot convert object to primitive value"
```

字面意思很容易懂，就是在界面更新阶段，某一个值给了对象。这种问题一般都会出现在传值的过程中，可能是某个组件要求的是一个原始值，传了对象。检查一下代码，有一个动态切换的组件，传的值有一个默认值是 `Object.create(null)`，应该是这个有问题了，把原始值改成 `null`，果然没问题了。

这里给了我一个提示，默认值最好用 null 而不是用 `Object.create(null)`。