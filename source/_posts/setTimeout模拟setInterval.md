---
title: setTimeout 模拟 setInterval
categories: Web开发
tags: JavaScript&TypeScript
description: 本文主要讲一下为什么要用 setTimeout 去模拟 setInterval，以及如何实现
comments: true
date: 2021-06-02 10:53:20
---
## 一、为什么要用 setTimeout 模拟 setInterval

1. 在 setInterval 回调函数中处理异步任务，会创建一个很长的请求队列，执行效率很低。

2. 存在耗时很长的同步任务，setInterval 的周期性会被打乱，执行回调函数可能会不在预期内。
   
3. 回调函数抛出错误，还是会继续执行，不会停止

## 二、setTimeout 去模拟 setInterval 的实现

```js
let timeMap = {};
let id = 0; 
const mySetInterval = (cb, time) => {
  let timeId = id;
  id++; 
  let fn = () => {
    cb();
    timeMap[timeId] = setTimeout(() => {
      fn();
    }, time);
  };
  timeMap[timeId] = setTimeout(fn, time);
  return timeId; 
};

const myClearInterval = (id) => {
  clearTimeout(timeMap[id]); 
  delete timeMap[id];
};

let timeId = null;
timeId = mySetInterval(() => {
  console.log(111);
}, 1000);
setTimeout(() => {
  myClearInterval(timeId);
}, 2000);
```

基本思路是递归+setTimeout，这里用 timeMap 去存 time id 是因为定时器可能有很多，每个都是唯一的，使用 map 去存储每一个 time id，方便清除多个定时器。

参考文献：

[Why not to use setInterval](https://dev.to/akanksha_9560/why-not-to-use-setinterval--2na9)

[用setTimeout和clearTimeout简单实现setInterval与clearInterval](https://juejin.cn/post/6844903839934447629)