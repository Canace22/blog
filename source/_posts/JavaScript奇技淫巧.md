---
title: JavaScript 奇技淫巧
categories: web
tags: JavaScript
description: '如题，这篇文章收集一些平常见过的一些 JS 奇技淫巧。'
comments: true
date: 2022-06-16 10:22:01
---

## 巧用运算符

### 1、无符号类型转换，非数字默认为 0

巧用无符号右偏移 0 位，结果如下，字符串可以转换为 0，正数不变，但是要注意，有符号的负数得出的结果不是它本身，所以这个技巧不适用于负数，具体应用可以看看 loadash slice 源码。

example:

```js
a = 123;  // output: 123
a >>>= 0;
b = '123';  // output: 123
b >>>= 0;
c = '123a';  // output: 0
c >>>= 0;
```

lodash:

```js
function slice(array, start, end) {
  let length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  start = start == null ? 0 : start
  end = end === undefined ? length : end

  if (start < 0) {
    start = -start > length ? 0 : (length + start)
  }
  end = end > length ? length : end
  if (end < 0) {
    end += length
  }
  length = start > end ? 0 : ((end - start) >>> 0)
  start >>>= 0

  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}
```

### 2、类型转换，非数字默认为 0

上面的玩法是针对无符号类型的，这个方法是有无符号都适用。

```js
a = 123;  // output: 123
~~a;
b = '123';  // output: 123
~~b;
c = '123a';  // output: 0
~~c;
d = '-123';  // output: -123
~~d;
e = -123;  // output: -123
~~e;
```

这个用法是在一个 leetcode 题解看到的，做算法题可以常用，不过日常工作中就要看情况了，可能别人看不懂。
