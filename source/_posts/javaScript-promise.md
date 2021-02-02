---
title: javaScript-promise
comments: true
date: 2018-10-22 19:50:42
categories: web
tags: JavaScript
---

promise 对于管理异步状态很有用，可以串行执行异步任务，也可以并行执行异步任务，下面是一个简单的串行执行一步步任务的例子：

<!--more-->

```js
let steps = ["第一步", "第二步", "第三步", "最后"];

function showStep1(step1) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve => {
      console.log(step1);
    }, 500);
  });
}

function showStep2(step2) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve => {
      console.log(step2);
    }, 2000);
  });
}

let test = new Promise((resolve, reject) => {
  resolve();
});

test.then(showStep1(steps[0]));
test.then(showStep2(steps[1]));
```
