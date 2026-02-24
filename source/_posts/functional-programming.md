---
title: 函数式编程
description: '函数式编程让代码更简洁，纯函数无副作用，柯里化能分步传参提高复用性。'
categories: Web开发
tags: JavaScript&TypeScript
comments: true
date: 2020-09-24 16:52:40
---
### 一、函数式编程有什么好处

1、代码简洁

2、函数间耦合度低，便于代码管理和迭代更新

### 二、什么是纯函数

类似于数学里的函数，x-y 是一一对应关系，一个函数只有一个输出值，函数能只进行运算，不进行其他处理，这也被称为无副作用，简言之函数只管函数内部的事情，外面的一概不管。

### 三、柯里化（curry）

只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数,示例:

```js
var add = function(x) {
  return function(y) {
    return x + y;
  };
};

var increment = add(1);
var addTen = add(10);

increment(2);
// 3

addTen(2);
// 12
```

以上代码中的 add 函数返回一个函数，这个函数接受一个 y 值，但是并未执行，需要调用的时候才会被执行。