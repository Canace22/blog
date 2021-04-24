---
title: JavaScript new 关键字的实现原理
categories: web
tags: JavaScript
comments: true
date: 2021-04-24 11:38:18
---

在实例化一个构造函数的时候，我们通常会用 new 关键字，这个 new 关键字是如何做到让实例可以调用到构造函数上的方法和属性的呢？

我们先来看看实例有啥特性，首先每个实例上都有一个 __proto__ 属性指向实例原型，也就是构造函数的原型，实例可以调用到构造函数上的方法和属性，然后实例可以向构造函数传参。咋一看这不就是在变相的问如何实现继承吗？接下来，我们写个 demo 看看怎么实现上述表述的内容

```js
function myNew() {
  var obj = new Object();
  var Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  Constructor.apply(obj, arguments);
  return obj;
}
```

简要的描述一下上述demo，首先初始化一个 Object 实例并存到 obj 变量里，我们知道 js 的对象都继承自 Object，所以这里相当于先让 obj 继承 Object。然后 new 关键字后面会接一个构造函数，这里我们用函数的形式写，所以应该给 new 一个构造函数类型的参数，我们为了方便取第一个参数为构造函数。接下来把 obj 的 __proto__ 属性指向构造函数的原型。最后把构造函数的执行上下文指向 obj，从而达到继承构造函数内部属性的目的，这里 arguments 实际上只剩下后面的参数了，因为在取构造函数的时候用了 shift 方法，这个方法会原地删除第一个参数并返回。