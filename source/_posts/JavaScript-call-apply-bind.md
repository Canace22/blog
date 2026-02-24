---
title: JavaScript call、apply 和 bind
categories: Web开发
tags: JavaScript&TypeScript
description: 'call 和 apply 立即执行函数，bind 只是绑定 this 且需手动调用'
comments: true
toc: true
date: 2020-04-14 08:52:19
---

### 一、使用环境

在 es6 之前，JavaScript 经常会处理 this 的指向问题，call、apply 和 bind 方法就是为解决这个问题而生的，先来看一个简单的 demo：

```js
function People(name) {}

People.prototype = {
  name: 'Mike',
  sayHi: function () {
    console.log('Hi, my name is ' + this.name);
  },
};

var Mike = new People();
Mike.sayHi(); // Hi, my name is Mike

var Amy = { name: 'Amy' };
Mike.sayHi.call(Amy); // Hi, my name is Amy
```

从上面的 demo 可以看出使用 call 把函数的 this 指向从 Mike 变为了 Amy，所以后面打印出来的名字是 Amy 而不是 Mike，这里使用 call 和 apply 的效果是一样的。

### 二、apply 和 call 的区别

apply 和 call 的方法不同之处在于参数的传递类型不一样，call 是一个个参数传进去，apply 是以数组的形式传参。可以根据需求使用这两个方法，比如参数比较多或者参数不确定时，用 apply 可能会好点。例子：

```js
// Number 类型使用数组方法
var numbers = [5, 458, 120, -215];
var maxInNumbers = Math.max.apply(Math, numbers), //458
  maxInNumbers = Math.max.call(Math, 5, 458, 120, -215); //458
```

```js
// 伪数组使用数组方法
var domNodes = Array.prototype.slice.call(document.getElementsByTagName('div'));
var res = domNodes.splice(0, 1);
```

### 三、bind

MDN 说明：bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。在对象方法操作中经常会用到，比如我们 new 了一个对象，这个对象有一些事件，在事件里面，我们需要 this 指向该对象，而不是事件本身的执行上下文，这个时候，bind 就很有用了，来看一个 PixiJs 的 demo：

```js
sprite
  .on('pointerdown', this.onDragStart.bind(this))
  .on('pointerup', this.onDragEnd.bind(this))
  .on('pointerupoutside', this.onDragEnd.bind(this))
  .on('pointermove', this.onDragMove.bind(this));
```

从上面的 demo 可以看到，我把精灵的 onDragStart 等事件的 this 指向修改为了我自己定义的对象。

### 四、bind 与 call、apply 的不同

call 和 apply 方法是立即执行的，而 bind 方法只是一个普通的方法，需要调用才会执行。
