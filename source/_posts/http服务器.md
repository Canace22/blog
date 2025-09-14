---
title: HTTP 服务器
categories: Web开发
tags: nodeJs
comments: true
toc: true
date: 2020-08-02 15:15:20
---
### 一、HTTP 服务是什么

#### 1、一个网页请求包含两次 HTTP 包交换

(1) 浏览器向 HTTP 服务器发送请求 HTTP 包

(2) HTTP 服务器向浏览器返回 HTTP 响应包

#### 2、HTTP 服务要做的事情

(1) 解析 HTTP 请求报文

(2) 返回 HTTP 响应报文

### 二、手写 HTTP 服务

#### 1、 最简单的服务

```js
const http = require('http')
const fs = require('fs')

http
  .createServer(function (req, res) {
    // 浏览器会默认请求的同时请求网站图标
    if (req.url === '/favicon.ico') {
      req.writeHead(200)
      req.end()
      return
    }
    res.writeHead('200')
    // 返回字符串
    // res.end('hello')
    // 返回网页
    fs
      .createReadStream(__dirname + '/index.html')
      .pipe(res)
  })
  .listen(3000)
```

#### 2、 稍微复杂一点的 HTTP 服务

```js
const http = require('http');
const fs = require('fs');
// 解析 url，把 url 分成几部分
const url = require('url');
// 解析 url 的 query
const querystring = require('querystring');

const game = require('./game');
let payloadWon = 0;

http
  .createServer(function (req, res) {
    const parseUrl = url.parse(req.url);
    // 浏览器会默认请求的同时请求网站图标
    if (parseUrl.pathname === '/favicon.ico') {
      req.writeHead(200);
      req.end();
      return;
    }

    if (parseUrl.pathname === '/game') {
      const query = querystring.parse(parseUrl.query);
      const playAction = query.action;
      const result = game(playAction);

      if (payloadWon > 3) {
        res.writeHead(500);
        res.end('我再也不和你玩了');
        return;
      }
      res.writeHead(200);
      if (result === 0) {
        res.end('平局！');
      } else if (result === 1) {
        res.end('你赢了！');
        payloadWon += 1;
      } else {
        res.end('你输了！');
      }
    }

    if (parseUrl.pathname === '/') {
      fs.createReadStream(__dirname + '/index.html').pipe(res);
    }
  })
  .listen(3000);
```

### 三、使用 express 写 HTTP 服务

#### 1、 express 的核心功能
 
- 路由

-  request/response 简化

#### 2、 简单使用

(1) 安装：`npm i express`

(2) 简单 demo

```js
const fs = require('fs');
const game = require('./game');
const express = require('express');

let payloadWon = 0;
const app = express();

app.get('/favicon.ico', function (req, res) {
  req.status(200);
  return;
});

app.get(
  '/game',
  // 中间件
  function (req, res, next) {
    if (payloadWon > 3) {
      res.status(500);
      res.send('我再也不和你玩了');
      return;
    }
    // 通过next执行后续中间件
    next();
    if (res.playWon) {
      payloadWon += 1;
    }
  },
  function (req, res, next) {
    const query = req.query;
    const playAction = query.action;
    const result = game(playAction);

    res.status(200);
    if (result === 0) {
      res.send('平局！');
    } else if (result === 1) {
      res.send('你赢了！');
      res.playWon = true;
    } else {
      res.send('你输了！');
    }
  }
);

app.get('/', function (req, res) {
  res.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
});

app.listen(3000);
```

(3) 缺点: 对异步的处理不完善,中间件是同步的，不能异步

### 四、使用 koa 写 HTTP 服务

#### 1、功能点

(1) 中间件可以异步

(2) 比 express 更极致的 resquest/response 简化，Contex 合并了 request 和 response

(3) 请求和返回的处理采用赋值的形式

(4) 精简内核，所有额外功能都移到中间件实现，相比于 express 砍掉了路由模块

#### 2、简单使用

(1) 安装 koa: `npm install koa`

(2) 安装路由中间件: `npm i koa-mount`

(3) 一个🌰

```js
const fs = require('fs');
const game = require('../game');
const koa = require('koa');
const mount = require('koa-mount');

let payloadWon = 0;
const app = new koa();

app.use(
  mount('/favicon.ico', function (ctx) {
    ctx.status = 200;
    return;
  })
);

const gameKoa = new koa();

app.use(mount('/game', gameKoa));
// 中间件
gameKoa.use(async function (ctx, next) {
  if (payloadWon > 3) {
    ctx.status = 500;
    ctx.body = '我再也不和你玩了';
    return;
  }
  // 通过next执行后续中间件
  await next();
  if (ctx.playWon) {
    payloadWon += 1;
  }
});
gameKoa.use(async function (ctx, next) {
  const query = ctx.query;
  const playAction = query.action;
  const result = game(playAction);

  await new Promise(resolve => {
    setTimeout(() => {
      ctx.status = 200;
      if (result === 0) {
        ctx.body = '平局！';
      } else if (result === 1) {
        ctx.body = '你赢了！';
        ctx.playWon = true;
      } else {
        ctx.body = '你输了！';
      }
      resolve()
    },500)
  })
});

app.use(
  mount('/', function (ctx) {
    ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8');
  })
);

app.listen(3000);
```

ps: 按模块划分逻辑，可以提升程序容错率

### 五、Express VS Koa

1、express 门槛低，koa 更强大优雅

2、express 封装更多东西， 开发更快速，koa 可定制性更高

3、express 适合小型应用，koa 适合大型，需要可维护性的程序