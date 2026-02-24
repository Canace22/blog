---
title: JavaScript 常用代码片段
categories: Web开发
tags: JavaScript&TypeScript
toc: true
description: '数组去重用 Set 更简洁，过滤空值要判断字符串是否有效，排序需明确比较函数。'
comments: true
date: 2020-05-21 09:13:35
---

### 一、数组操作

#### 1、去重

```js
let arr = [
  'apple',
  'strawberry',
  'banana',
  'pear',
  'apple',
  'orange',
  'orange',
  'strawberry',
];
let res;
// 使用 filter
res = arr.filter((element, index, self) => {
  return self.indexOf(element) === index;
});

// 使用 Set
res = [...new Set(arr)];
```

#### 2、过滤偶元素

```js
let arr = [1, 2, 4, 5, 6, 9, 10, 15];
let res = arr.filter((x) => x % 2 !== 0);
```

#### 3、过滤空字符串

```js
let arr = ['A', 'B', null, undefined, 'C', ''];
let res = arr.filter((s) => s && s.trim());
```

#### 4、降序

```js
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

#### 5、计算元素在数组中的出现次数

```js
const arr = [1, 2, 1, 2, 3];
// 计算单个元素在数组中的出现次数
const target = 2;
res = arr.reduce((a, v) => (v === target ? a + 1 : a), 0);
// 计算数组 a 中的所有元素在数组 b 中的出现次数，返回新的数组
const arrA = [1, 2, 3];
const arrB = [1, 1, 2, 3, 2, 1];
res = arrA.map((num) => arrB.filter((n) => n === num).length);
// 计算数组中每个元素出现的次数
res = arr.reduce((tally, amt) => {
  tally[amt] ? tally[amt]++ : (tally[amt] = 1);
  return tally;
}, {});
```

#### 6、初始化可伸缩数组

```js
let len = 5;
// method1
let arr = Array(len)
  .fill(null)
  .map((v, i) => String.fromCharCode(65 + i));
// method2
let arr = Array.apply(null, { length: len }).map((v, i) =>
  String.fromCharCode(65 + i)
);
console.log(arr); //[ 'A', 'B', 'C', 'D', 'E' ]
```

#### 7、求和

```js
const books = [
  {
    title: 'Showings',
    author: 'Julian of Norwich',
    checkouts: 45,
  },
  {
    title: 'The Triads',
    author: 'Gregory Palamas',
    checkouts: 32,
  },
  {
    title: 'The Praktikos',
    author: 'Evagrius Ponticus',
    checkouts: 29,
  },
];

const total = books
  .map((b) => {
    return b.checkouts;
  })
  .reduce((p, c) => {
    return p + c;
  });

console.log(total); //106
```

#### 8、求最值

```js
const arr = [1, 2, 1, 2, 3];
const min = Math.min(...arr);
const max = Math.max(...arr);
```

#### 9、求交集

```js
const arrA = [1, 4, 2, 3];
const arrB = [1, 5, 2, 6];
const res = arrA.filter((v) => arrB.includes(v));
```

#### 10、求不相交部分

```js
const arrA = [1, 4, 2, 3];
const arrB = [1, 5, 2, 6];
arrA
  .filter((v) => !arrB.includes(v))
  .concat(arrB.filter((v) => !arrA.includes(v)));
```

#### 11、多维数组扁平化

```js
function arrFlatten(arr, depth = -1) {
  if (depth === -1) {
    return [].concat(...arr.map((v) => (Array.isArray(v) ? arrFlatten(v) : v)));
  }
  if (depth === 1) {
    return arr.reduce((a, v) => a.concat(v), []);
  }
  return arr.reduce(
    (a, v) => a.concat(Array.isArray(v) ? arrFlatten(v, depth - 1) : v),
    []
  );
}
const test7 = arrFlatten([
  [
    [1, 5],
    [2, 6],
  ],
  [1, 4],
  [2, 3],
]);
console.log('arrFlatten:', test7); // [1, 5, 2, 6, 1, 4, 2, 3]
```

#### 12、乱序

```js
function arrShuffle(arr) {
  let array = arr;
  let index = array.length;

  while (index) {
    index -= 1;
    let randomInedx = Math.floor(Math.random() * index);
    let middleware = array[index];
    array[index] = array[randomInedx];
    array[randomInedx] = middleware;
  }

  return array;
}
const test9 = arrShuffle([1, 4, 5, 7]);
console.log('arr shuffle:', test9);
```

### 二、事件对象操作

#### 1、时间戳转日期

因为 js 的时间是按毫秒算的，这里要转成秒，所以要乘以一个 1000，之后就可以调用 js 内置对象中的 Date 获取对应的日期了，年份及其他，类似。

```js
function timeStampFormat(x) {
  const date = new Date(+x * 1000);
  const [m, d] = [date.getMonth() + 1, date.getDate()];
  return `${m}-${d}`;
}
const day = timeStampFormat(1560751917);
console.log(day); // 6-17
```

