---
title: 函数柯里化
categories: Web开发
tags: JavaScript&TypeScript
description:  浅谈函数柯里化
author: Canace
comments: true
date: 2022-06-17 11:30:17
---
## 一、是什么

函数柯里化就是一个函数一次只接收一个参数，同时返回一个函数接收下一个参数，形如f(a)(b)(c)。

## 二、为什么函数要柯里化

- 保证接收到的每一个参数都是正确的
- 避免重复传入相同参数
- 创建纯函数，减少函数出错率和副作用
- 创建高阶函数
- 增加函数的可读性

## 三、函数柯里化实现

```js
const curry =(fn) =>{
  return curried = (...args) => {
      if (fn.length !== args.length){
          return curried.bind(null, ...args)
      }
  return fn(...args);
  };
}
const totalNum=(x,y,z) => {
    return x+y+z 
} 
const curriedTotal = curry(totalNum);
console.log(curriedTotal(10) (20) (30));
```

参考文档：
[What is 'Currying'](https://stackoverflow.com/questions/36314/what-is-currying)
[https://blog.logrocket.com/understanding-javascript-currying/](https://blog.logrocket.com/understanding-javascript-currying/)
