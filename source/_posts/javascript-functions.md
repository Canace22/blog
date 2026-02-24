---
title: javaScript 函数
description: '箭头函数简化 this 指向，生成器用 yield 多次返回，解构赋值提升代码简洁性，闭包实现变量私有和延迟执行。'
comments: true
date: 2018-10-22 19:51:48
categories: Web开发
tags: JavaScript&TypeScript
toc: true
---

### 一、箭头函数

相当于匿名函数的简写，不同之处在于及箭头函数的 this 指向的是当前的词法作用域，也就是说省去了写 `var that = this` 的过程，可以直接使用 this；

### 二、generator

类似 python 的生成器，不同的是，python 的生成器一般是写在 list 里，而 es6 的 generator 是写在函数里，形如：function\*() {}，yield 在 generator 里可以多次返回函数值，而不用像 functoin 一样进行多次调用；

```js
//裴波那契数列
function* fib(max) {
  var t,
    a = 0,
    b = 1,
    n = 0;
  while (n < max) {
    yield a;
    [a, b] = [b, a + b];
    n++;
  }
  return;
}

for (var x of fib(10)) {
  console.log(x);
}
```

### 三、解构赋值

简化代码的一种手段，可以同时对多个变量进行赋值操作，上面的代码 `[a, b] = [b, a + b]` 就用到了解构赋值，再把上面的示例代码用解构赋值改一下，得到如下代码：

```js
function* fib(max) {
  var t;
  var [a, b, n] = [0, 1, 0];
  while (n < max) {
    yield a;
    [a, b] = [b, a + b];
    n++;
  }
  return;
}

for (var x of fib(10)) {
  console.log(x);
}
```

### 四、闭包

通常别人都会说闭包是用来延长函数作用域链的，但是听到这个词往往会使人一脸蒙蔽，廖雪峰的 js 教程中说闭包有以下功用：延迟执行函数、 多参数的函数变成单参数的函数、封装私有变量，总结来说闭包的作用就是私有化变量和延长变量的生命周期，下面是相关代码示例：

```js
// 闭包 | 延迟执行函数
function lazy_sum(arr) {
  let sum = function() {
    return arr.reduce((x, y) => x + y);
  };
  return sum;
}
let f = lazy_sum([1, 2, 3, 4, 5]);
// console.log(f);
// console.log(f());

// 闭包 | 多参数的函数变成单参数的函数
function make_pow(n) {
  return function(x) {
    return Math.pow(x, n);
  };
}
let pow2 = make_pow(2);
let pow3 = make_pow(3);
// console.log(pow2(5));
// console.log(pow3(7));

// 闭包 | 封装私有变量（可以考虑用这种方法进行状态管理）
function create_counter(innitial) {
  let x = innitial || 0;
  return {
    inc: () => {
      x += 1;
      return x;
    }
  };
}
let c1 = create_counter();
for (let i = 0; i < 5; i++) {
  let x = c1.inc();
  //   console.log(x);
}
let c2 = create_counter(10);
for (let i = 0; i < 5; i++) {
  let x = c2.inc();
  //   console.log(x);
}
```

### 五、map

将一个函数作用在一个数组上，接收带一个参数的函数，是 array 的一个方法，可以方便快捷的对数组进行运算，省略循环过程，示例代码如下：

```js
function pow(x) {
  return Math.pow(x, 2);
}
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let results = arr.map(pow);
console.log(results);
```

### 六、reduce

将一个函数作用在一个数组上，接收带两个参数的函数，对函数的结果做累积计算，可以方便快捷的对数组进行运算，省略循环过程，示例代码如下:

```js
let arr1 = [1, 3, 5, 7, 9];
let mul = arr1.reduce((x, y) => x * y);
console.log(mul);
```

### 七、filter

过滤数组元素，接收一个函数作为参数，函数内容为过滤条件。filter 的回调函数可以接收多个参数，element 参数返回的是数组的元素，index 返回数组元素的索引，self 参数返回整个数组，相关示例代码如下：

```js
// 过滤偶元素
let arr2 = [1, 2, 4, 5, 6, 9, 10, 15];
let r = arr2.filter(x => x % 2 !== 0);
// console.log(r);
// 过滤空字符串
let arr3 = ["A", "B", null, undefined, "C", ""];
let r1 = arr3.filter(s => s && s.trim());
// console.log(r1);
// 利用回调函数去除数组中的重复元素
let arr4 = [
  "apple",
  "strawberry",
  "banana",
  "pear",
  "apple",
  "orange",
  "orange",
  "strawberry"
];
let r2 = arr4.filter((element, index, self) => {
  return self.indexOf(element) === index;
});
// console.log(r2);
```
### 八、sort

排序方法，直接修改原来的数组，默认是把数组元素转换为字符串进行排序，接收有一个函数作为参数，函数内容是排序规则，示例代码如下：
   
```js
// 数字按从大到小排序
let nums = [10, 20, 1, 2];
nums.sort((x, y) => {
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
});
console.log(nums);
```
