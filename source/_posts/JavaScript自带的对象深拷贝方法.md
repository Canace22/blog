---
title: JavaScript 自带的对象深拷贝方法
categories: web
tags: JavaScript
description: 介绍 JavaScript 自带的对象深拷贝方法
author: Canace
comments: true
toc: true
date: 2024-03-01 14:03:09
---
## 一、现行常用深拷贝方法的缺点

### JSON.parse(JSON.stringify())

说到 JavaScript 深拷贝，以前我们可能经常会这么干：

```js
const temp = {
  a:{
    name:'xiaoming',
    age:18
  }
}
const copyTemp = JSON.parse(JSON.stringify(temp))
copyTemp.a.age = 20

console.log(copyTemp) //{ a: { name: 'xiaoming', age: 20 } }
console.log(temp); //{ a: { name: 'xiaoming', age: 18 } }
```

但是有一些缺点，如果拷贝值里面带有 undefined/map/set 等特殊类型，可能会被转换成我们不想看到的结果，比如这样：

```js
const temp = {
  set: new Set([1, 3, 3]),
  map: new Map([[1, 2]]),
  regex: /foo/,
  deep: { array: [ new ArrayBuffer(1) ] },
  error: new Error('Hello!'),
  date: new Date(),
  buffer: new ArrayBuffer(1),
  defaultVal: undefined
}
const copyTemp = JSON.parse(JSON.stringify(temp))

console.log(copyTemp);
// {
//   set: {},
//   map: {},
//   regex: {},
//   deep: { array: [ {} ] },
//   error: {},
//   date: '2024-03-01T06:24:34.199Z',
//   buffer: {}
// }
```

上面例子可以看到 map/set 等对象会被转换成 `{}`，date 会被转换成字符串，而 undefined 值直接就被过滤掉了，有时候我们深拷贝是想要拷贝一份一模一样的数据，可能这个深拷贝方法就不适合了。

### 展开对象、Object.assign

我们可能还经常这么干使用展开或者 Object.assign 创建拷贝对象。

```js
const temp = {
  title: "Builder.io Conf",
  date: new Date(123),
  attendees: ["Steve"]
}
const copyTemp = { ...temp }
const copyTemp1 = Object.assign({}, temp)

copyTemp.title = "111"
copyTemp.attendees.push("Bob")
copyTemp.date.setTime(456)

copyTemp1.title = "111"
copyTemp1.attendees.push("Bob")
copyTemp1.date.setTime(456)

console.log(temp);
console.log(copyTemp);
console.log(copyTemp1);
// {
//   title: 'Builder.io Conf',
//   date: 1970-01-01T00:00:00.456Z,
//   attendees: [ 'Steve', 'Bob', 'Bob' ]
// }
// {
//   title: '111',
//   date: 1970-01-01T00:00:00.456Z,
//   attendees: [ 'Steve', 'Bob', 'Bob' ]
// }
// {
//   title: '111',
//   date: 1970-01-01T00:00:00.456Z,
//   attendees: [ 'Steve', 'Bob', 'Bob' ]
// }
```

从输出可以看出，这种方式只能拷贝对象的第一层，更深层的属性还是指向原来的地址，在拷贝对象上改动会改到原对象上。

### lodash cloneDeep

我们可能还经常会使用 lodash 的 cloneDeep 方法来做深拷贝，这种方法可以说是很完备了，缺点就是我们要另外去按照 lodash 库，可能会占用一点的内存

## 二、JavaScript 新推出的 structuredClone 方法

这个方法推出于 2022 年，如今已经 2024 年了，现代主流浏览器普遍都支持了，使用这个方法可以避免上述所有缺点，深拷贝对象，使用起来也很简单

```js
const temp = {
  a:{
    name:'xiaoming',
    age:18
  }
}
const copyTemp = structuredClone(temp)
copyTemp.a.age = 20

console.log(copyTemp) //{ a: { name: 'xiaoming', age: 20 } }
console.log(temp); //{ a: { name: 'xiaoming', age: 18 } }
```