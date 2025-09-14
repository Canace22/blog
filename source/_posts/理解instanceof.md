---
title: 理解 instanceof
categories: Web开发
tags: JavaScript&TypeScript
comments: true
date: 2021-06-21 09:19:09
---

最近发现很多用过的东西过后很容易忘记使用姿势，久了不用就要去翻一翻文档，有一些知道怎么用，但是记忆也很模糊。于是我就想先从一些基础的知识写起，探究知识点背后的运作原理，加深自己对知识的理解。

说到 instanceof，我们大体知道其使用场景，用于检测对象的具体类型。我们一般会怎么用这个操作符呢？

```js
const a = [1, 2, 3];
a instanceof Object;
```

由上述例子可知，instanceof 操作符是一个二元操作符，左右两边分别有一个值，上述例子就是用 instanceof 判断 a 是不是 Object 类型。那么这个操作符是怎么去判断 a 是不是 Object 类型的呢？

我们知道 JavaScript 是基于原型去实现面向对象的，每个实例都有一个指向原型的属性 `__proto__`,每个实例的构造函数也有一个指向实例原型的属性 prototype,实例一直往上查找原型，一直到 null 这个过程就是原型链。

有了这些基本的概念，我们再来看看 instanceof 是怎么去判断一个实例是不是某个类型的，这里我们说的某个类型一般这么写 `Object Array……`, 可见这些其实是构造函数，由此我们可以知道这就是需要判断构造函数的原型在不在实例的原型链上，如果在的话就返回 true，否则返回 false

```js
function MyInstanceof(a, b) {
  // 左值赋值为左边实例的原型，右值也赋值为右边实例的原型
  let leftVal = a.__proto__,
    rightVal = b.prototye;
  while (true) {
    // 遍历完左值的原型链仍然未找到右值的实例原型，返回 false
    if (leftVal === null) return false;
    // 左值的实例原型等于右值的实例原型，返回 true
    if (leftVal === rightVal) return true;
    // 遍历原型链
    leftVal = leftVal.__proto__;
  }
}
```
