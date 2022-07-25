---
title: JavaScript 在 V8 引擎浏览器上是怎么执行的
categories: web
tags: JavaScript
description: JavaScript 在 V8 引擎浏览器上的执行机制
author: Canace
comments: true
date: 2022-07-25 13:36:03
---
这里为什么要强调是在 V8 引擎浏览器呢？因为不是所有浏览器都用 V8 引擎解析 JavaScript 的，比如 Firefox 用的就是 SpiderMonkey。

## 一、调用栈(Call Stack)

作为前端开发，我们经常会听到这个词**调用栈**，那么他究竟是什么呢？我们先来看一段代码:

```jsx
function main () {
  debugger;
  console.log("I'm main dunction");
  sayHi('Amy')
}
console.log('I am handing out');
function sayHi (name) {
  console.log('hello' + name);
}
main();
```

上面这段代码会怎么执行呢？首先我们知道 JavaScript 代码是自顶向下逐条执行的，像 main 函数这种函数里面套函数的情况怎么去逐行执行？这里调用栈就要出场了，调用栈，顾名思义是一种栈结构，栈结构的最大特点就是先进后出，所以上述代码中首先调用了 main 函数，v8 解析器把 main 函数压入栈中，开始逐行执行 main 函数中的代码，遇到 sayHi 函数，把 sayHi 压入栈顶，并逐行执行代码，执行完毕，弹出 sayHi 函数，继续执行 main 函数中的代码，具体可以自己 debugger 看一下，下面是我 debugger 的截图，另外注意这里的函数都是同步的。

![call stack](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ac6e2188-cd01-472b-ba99-527e183223f8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220725%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220725T054118Z&X-Amz-Expires=86400&X-Amz-Signature=67bd07de9f6705ff0d421057859c535664c1e4e8b8ed550c036ce20d1155d3b1&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

V8 引擎的调用栈有一定的限制长度，超出则会报栈溢出，所以切记不要函数嵌套调用太深，特别是递归的时候，要注意一下。

## 二、执行上下文(Execution Context)

在解释调用栈时，上图中可以看到有个 scope，调用 sayHi 时，scope 包含一个 Local 对象和一个 Global 对象，这里的 scope 就是当前的执行上下文了，也就是我们常说的执行环境。Local 表示函数上下文，Global 表示全局上下文。从上图可以看出 scope 使用的也是栈结构，当调用栈压入了新的函数，会在 scope 最前端创建新的执行上下文，执行上下文中包含了当前环境的可用变量，当函数执行完，对应的执行上下文被弹出，变量也会被销毁，全局上下文只有在离开页面才会被销毁。此外，说到执行上下文，经常会联想到 this 指向问题，上述函数 sayHi 我们可以看到 this 是指向 Window 的，也就是浏览器的全局环境，这说明普通的函数调用，this 是指向全局上下文的。

## 三、事件循环(Event Loop)

上面讲到调用栈是自顶向下执行的，当遇到代码量很大或者响应很慢的情况时会发生什么呢？页面可能会一直等到代码执行完才渲染，更甚者，代码执行时间太长，直接就页面崩溃了，所以这里就需要异步回调了，遇到异步函数，无需等待执行完该函数，接着往下执行。要实现这个机制就需要事件循环了，简言之事件循环是为处理异步回调而生的。

![事件循环](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ba675e30-ab07-4476-9a2b-21a7632e1778/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220725%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220725T054148Z&X-Amz-Expires=86400&X-Amz-Signature=055c6d941dbfda43c04478f836d35f5ada56a02688b830862951e2b0f9d82eb8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

上图是一个表示事件循环过程的图，结合图例可以知道，代码还是自顶向下执行的，遇到异步代码，会暂时挂起，等到异步代码返回了结果，放入任务队列中，等到调用栈空了，引擎主线程会按照先进先出的方式取任务队列中的回调函数，放入调用栈中，执行其中的同步代码，一直重复这个动作，直到任务队列为空。上述的异步任务还细分为宏任务和微任务，宏任务是由宿主环境发起的，比如 seTimout,setIntervals 等，微任务是由引擎发起的，比如 promise 等,微任务始终优先于宏任务执行。

参考文献：

[call stack](https://developer.mozilla.org/en-US/docs/Glossary/Call_stack)

[Understanding Javascript Function Executions — Call Stack, Event Loop , Tasks & more](https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec)

[详解JavaScript中的Event Loop（事件循环）机制](https://zhuanlan.zhihu.com/p/33058983)