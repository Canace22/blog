---
title: 创建基于 null 的对象
categories: Web开发
tags: JavaScript&TypeScript
description: '用 Object.create(null) 可以创建没有原型链的对象，适合需要干净对象的场景'
comments: true
date: 2021-03-12 14:49:45
---
看前同事写的代码，用 `Object.create(null)` 去初始化对象而不是用 null 或者 `{}`，觉得有点好奇，手动敲了下，发现这几种方式初始化对象是有差别的。

```js
var a = {}
a.name = 'hello world'
```

以上代码初始化一个对象 a，对象 a 继承自 Object 对象,所以原型链上会包含 Object 对象的属性和方法。

```js
a = Object.create(null);
a.name = 'hello world'
```

上面这段代码用 `Object.create(null)` 的方式创建对象，由于对象的原型是 null，所以原型链上不会继承任何东西，创建的是一个干净的对象。

综上，若想继续调用 valueOf 等继承自 Object 的属性和方法，可以用 `{}` 来初始化对象，若想创建一个全新的干净对象，可以使用 `Object.create(null)` 初始化对象