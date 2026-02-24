---
title: nodeJS基础
categories: Web开发
tags: [后端, Node.js]
comments: true
toc: true
date: 2019-11-30 07:03:40
---

### 常用

1、环境变量：`__filename`、`__dirname`；

2、进程对象：process

3、日期对象：Date

4、数学对象：Math

5、时间函数：setTimeout、setInterval、setImmediate（相当于 requestAnimation)

### 模块规范：commonJS

1、exports:{} ———————— require

2、module.exports —————————— require（会覆盖掉上面的 exports）

PS: 客户端以前经常用的是 AMD 规范，现在更多的是用 es6 规范

### 非阻塞 I/O

1、I/O(Input/Output)，即系统的输入输出；

2、阻塞 I/O 和非阻塞 I/O 的区别在于系统接收输入再到输出期间，能不能接收其他输入。

### 异步编程

1、callback，比较原始的处理回调的方式，用法如下：

```js
function test(callback) {
  setTimeout(() => {
    callback("success");
  }, 1000);
}

test(res => {
  console.log(res);
});
```

这种处理异步的方法有个问题，当有多个回调依次执行的时候，就会产生回调地狱，比如这样：

```js
function test(callback) {
  callback("success");
}

test(res => {
  console.log(res);
  test(() => {
    console.log("next");
    test(() => {
      console.log("next");
      ……
    });
  });
});
```

2、Promise, 原本是 commonJS 的一个规范，被扶正了，这种处理异步的方法很好的解决了上面的回调地狱问题，比如这么写：

```js
function test() {
  const pro = new Promise((resolve, reject) => resolve("hi"));
  return pro;
}
test()
  .then(res => {
    console.log(res);
  })
  .then(res => {
    console.log("hi");
  })
  ……
  .catch(err => {
    console.log(err);
  });
```

从例子中可以看出，代码就像串行一样，非常清晰明了，promise 会默认先调用第一个 then 或者第一个 catch，然后依次往下调用。

3、async/await

(1) async function 返回 promise

(2) 当使用了 await 时，只有当 await 拿到了结果才会继续往下执行

(3) await 可以用同步的写法写 Promise，因此，try catch 可以捕捉到 await 错误
