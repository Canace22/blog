---
title: 深入浅出Node笔记
date: 2020-06-21 22:30:57
categories: Web开发
tags: JavaScript&TypeScript
toc: true
description: 'Node 适合异步 I/O 任务，但单线程处理计算密集型操作时需用子进程避免阻塞。'
---
###  一、Node 特点

1、异步 I/O（非阻塞 I/O)，任务耗时取决于最慢的事件耗时

```js
const fs = require('fs');

fs.readFile('/path1', function(err, file){
  console.log('读取文件 1 完成')
})
fs.readFile('/path2', function(err, file){
  console.log('读取文件 2 完成')
})
```

2、大量使用事件和回调函数

```js
const http = require('http');

// 侦听服务器的 request 事件
http.createServer(function (req, res) {
  let postData = '';
  req.setEncoding('utf-8');
  // 侦听请求的 data 事件
  req.on('data', function (chunk) {
    postData += chunk;
  });
  // 侦听请求的 end 事件
  req.on('end', function () {
    res.end(postData);
  });
}).listen(8080);
console.log('服务器启动完成！');
```

ps:[事件循环](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

3、单线程

(1) 单线程带来的问题

- 无法利用多核 CPU
- 错误会引起整个应用退出，应用的健壮性值得考验
- 大量计算占用 CPU 导致无法继续调用异步 I/O

(2) 解决大计算量问题的方法：child_process(子进程) 分解大量的计算，Master-Worker 管理子进程

4、跨平台，可以在 win、linux 等环境中部署 Node