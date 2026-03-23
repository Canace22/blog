---
title: JavaScript 灵魂拷问
categories: Web开发
tags: JavaScript&TypeScript
description: '闭包会保留外部变量，多次调用会创建新副本，导致结果不同，注意变量作用域和引用问题。'
comments: true
date: 2021-02-03 11:44:15
---
## 1. 以下代码输出什么？

```javascript
function a(x) {
  x++;
  return function () {
    console.log(++x);
  };
}

a(1)(); 
a(1)();
a(1)();

let x = a(1); 
x(); 
x(); 
x(); 
```

这道题考察的是 JS 的闭包，闭包创建一个可以访问外部变量的状态函数，从而延伸作用域链，只要这个状态函数没被弹出调用栈，外部的变量副本就会一直存在。

这道题的答案是输出 3, 3, 3 和 3, 4, 5，因为执行 a(1)()，会立即执行返回的函数，函数执行完，里面的变量就被销毁了，下一次执行时，用的 x 变量是新的变量，所以表现会跟普通的函数一样。

接着，声明了一个 x 变量，并且把 a(1) 的返回值存在了 x 中。执行 x，a 函数的引用还存在 x 中，所以 a 函数返回的函数并未被销毁，变量依然存在于原有作用域链上，保存的值是上一次前置加的值，因此，后三个 x 调用的返回值是 3, 4, 5。

## 2. 以下代码输出什么？

```javascript
function Name(a, b) {
  this.a = a;
  this.b = b;
}

const me = Name("Vuong", "Nguyen");

console.log(!(a.length - window.a.length));
```

这道题的答案是 true，考察的是 this 的指向相关知识。

这里直接以函数的形式调用了构造函数 Name，而没有用 new 关键字创建一个实例，this 的指向为 window 或者 global，所以 a, b 就会成为全局变量，window.a 和 a 的值为传入的 "Vuong"，a.length 和 window.a.length 都是 5，因此输出 true。

延伸一下这道题，如果把 `const me = Name("Vuong", "Nguyen")` 改为 `const me = new Name("Vuong", "Nguyen")`，又会输出什么呢？

创建 Name 的一个实例之后，this 的指向应该为 {}，而不是全局环境。me 是 Name 的一个实例， `me = {a: "Vuong", b: "Nguyen"}`。因此，调用 a.length 会抛出错误，因为全局变量 a 未声明，不存在 length 属性。

## 3. 以下代码输出什么？

```javascript
const x = function (...x) {
  let k = (typeof x).length;
  let y = () => "freetut".length;
  let z = { y: y };

  return k - z.y();
};

console.log(Boolean(x()));
```

这道题的答案是 true，考察的是类型转换相关知识。

展开式 `...x` 返回一个数组，对数组使用 typeof 操作符返回的是 object，所以 k = 6。执行函数 y 返回 "freetut" 的长度 7，因此，`k - z.y()` 等于 -1, 数字除了 0 和 NaN，转换成 Boolean 类型都为 true。

## 4. 以下代码输出什么？

```javascript
(function js(x) {
  const y = (j) => j * x;

  console.log(y(s()));

  function s() {
    return j();
  }

  function j() {
    return x ** x;
  }
})(3);
```
这道题的答案是 81，考察的是函数相关知识。

函数 `js()` 是一个立即执行函数，传入的参数是 3。

由于函数 `s()` 返回 函数`j()`，所以，调用函数 y(s())) 意味着同时调用了 `y()`, `s()` 和 `j()` 这三个函数。

j() 返回 3 的三次方，也就是 27。

y(s()) 相当于 y(27) 返回 27\*3 = 81。

这里之所以可以在 s 函数 和 j 函数声明之前调用，是因为用 function 声明的函数有函数提升，但是，换成变量声明的函数是不能这么干的。

## 5. 以下代码输出什么？

```javascript
var tip = 100;

(function () {
  console.log("I have $" + husband());

  function wife() {
    return tip * 2;
  }

  function husband() {
    return wife() / 2;
  }

  var tip = 10;
})();
```

这道题的答案是："I have \$NaN"，考察的知识点主要是变量提升和数据类型转换相关知识。

题目中有一个立即执行的函数，执行流程如下： husband 函数 返回 wife()/2, wife 函数返回 tip\*2。

首先声明了一个全局变量 tip，立即执行函数里面也在底部声明了一个 tip 变量，函数的变量查找是从当前作用域往上查找的，所以用的 tip 是函数里面声明的变量。

由于 var 声明的变量会提升到函数的开始，但是这里只是提升声明，赋值是没有被提升的，声明了但是未被赋值的变量，默认值是 undefined。

husband 函数返回值为 undefined * 2 / 2, 二元操作符会隐式转换类型，undefined 会被转为 NaN，NaN 跟其他数字的运算结果还是 NaN, 因此，结果为 NaN。

## 6. 以下代码输出什么？

```javascript
const js = { language: "loosely type", label: "difficult" };

const edu = { ...js, level: "PhD" };

const newbie = edu;

delete edu.language;

console.log(Object.keys(newbie).length);
```

这道题考察的是展开式和引用类型相关知识，答案是 2。

es6 操作符 ...，可以浅拷贝对象，edu 自身带有一个 level 属性，加上拷贝过来的 js 对象的属性，一共有三个。

把 edu 赋值给 newbie 变量，赋值的其实是一个对象指针，还是指向原有对象的内存空间，所以，删除 edu 的一个属性，也会反映到 newbie 变量中，newbie 的属性变成了两个。

## 7. 以下代码输出什么？

[问题出处](https://github.com/yeungon/In-JavaScript-we-trust)