---
title: lodash 源码解析 —— slice
categories: Web开发
tags: 框架与库
description: lodash slice 函数学习
comments: true
toc: true
date: 2021-05-21 11:15:40
---
## 一、Why lodash slice

首先我们先来想一个问题，JavaScript Array 不是已经有 slice 方法了吗，为什么这里还要多此一举，重新实现一遍呢？源码上面有一句注释

> This method is used instead of [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are returned

这里说到的 dense arrays 就是有内容的数组，而不是没有内容的空数组, 先看一下原生 slice 切割数组的一个例子：

```js
var a = new Array(3)
var b = a.slice()
console.log(b); // [ <3 empty items> ]
b.forEach((el) => {
  console.log('b item:',el)
})
```

上述例子中我们创建了一个长度为 3 的数组，然后用 slice 切割放到 b 里面，打印 b，返回的是 `[ <3 empty items> ]`，可见这是一个有长度，但是没内容的数组，也就是 sparse arrays，直译为稀疏数组，不好听，不管还是叫英文吧。接着我们遍历了一下 b，发现 b 里面的内容并没有执行，说明 sparse array 并不会被迭代。

接着我们再来看看用 lodash slice 切割数组的一个例子：

```js
var a = new Array(3)
var b = slice(a)
console.log(b); // [ undefined, undefined, undefined ]
b.forEach((el) => {
  console.log('b item:',el)
})
var c = b.map(function (x, i) {
  return i;
});
console.log(c) // [(0, 1, 2)];
```

可以看到用 lodash slice 返回的是 dense array，也就是既有长度又有内容的数组，这时候我们再去遍历这个数组，可以看到已经生效了。使用 dense array 有什么好处呢？有的时候我们可能会生成一个空数组用来遍历生成一些新的空选项，这个时候使用 dense array 就比较方便了。

## 二、怎么保证返回的值正确？

先来看一段 demo

```js
console.log(slice([1,2,3,4],{}));
```

这段示例返回了一个空数组，咦，我明明传的是一个对象，他怎么没有报错呢？我们简化一下源码看看

```js
function slice(array, start, end) {
  let length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  start = start == null ? 0 : start; // start = {}
  end = end === undefined ? length : end; // end = length
  end = end > length ? length : end; // end = length
  length = start > end ? 0 : (end - start) >>> 0; //length = 0
  start >>>= 0;  // start = 0

  let index = -1;
  const result = new Array(length); // result = []
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}
```

从我的注释可以可以看出为什么我们输入的 start 是 `{}`,却可以返回空数组而没有报错，秘诀在于使用了 `>>>`, 这个符号叫做无符号右移操作符，`>>>0` 作用是保证值是有意义的正整数，若无意义则缺省为 0，这里 `{}>>>0` 会被转换为 0，因此不会报错。

再来看一段 demo

```js
console.log(slice([1, 2, 3, 4])); // [1, 2, 3, 4]
```

这段示例我们没有给 start 值，没有报错，返回了完整的数组。这又是什么原理呢？源码中有这么一句

```js
start = start == null ? 0 : start
```

可是我们的 start 不是 undefined 吗？这里用到了二元操作符 `==` 的其中一个规则，null == undefined。




参考文献：

[JavaScript: sparse arrays vs. dense arrays](https://2ality.com/2012/06/dense-arrays.html)

[lodash 源码](https://github.com/lodash/lodash)