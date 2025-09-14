---
title: Egg 快速上手
comments: true
date: 2020-11-27 14:31:16
categories: Web开发
tags: [服务端,nodeJs]
---

## 一、入门

### 1. 初始化项目

```js
// 利用脚手架初始化项目
mkdir egg-example
cd egg-example
npm init egg --type=simple
npm i
yarn dev
```

### 2. 安装并配置模板引擎插件

(1) 安装：`npm i egg-view-nunjucks --save`

(2) 开启插件：

```js
// config/plugin.js
exports.nunjucks = {
  enable: true,
  package: "egg-view-nunjucks"
};
```

```js
// config/config.default.js
config.view = {
  defaultViewEngine: "nunjucks",
  mapping: {
    ".tpl": "nunjucks"
  }
};
```

## 二、开始使用
### 1. 创建模板文件

```html
<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <ul class="news-view view">
      {% for item in list %}
      <li class="item">
        <a href="{{ item.url }}">{{ item.title }}</a>
      </li>
      {% endfor %}
    </ul>
  </body>
</html>
```

### 2. 创建静态资源文件 news.css 到 public/css

```css
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.item {
  margin: 10px 0;
}

.link {
  color: orange;
  text-decoration: none;
  transform: translateY(10px);
}

.link:hover {
  color: rgb(136, 131, 131);
}

.time {
  color: rgb(136, 131, 131);
  margin-left: 20px;
}
```

### 3. 添加 Controller 和 Router

(1)、新建 news.js 到 //app/controller

```js
// app/controller/news.js
const Controller = require("egg").Controller;

class NewsController extends Controller {
  async list() {
    const dataList = {
      list: [
        {
          id: 1,
          title: "this is news 1",
          url: "/news/1"
        },
        {
          id: 2,
          title: "this is news 2",
          url: "/news/2"
        }
      ]
    };
    await this.ctx.render("news/list.tpl", dataList);
  }
}

module.exports = NewsController;
```

(2)、router.js 添加语句：`router.get('/news', controller.news.list);`

(3)、查看效果：`yarn dev` => 打开 http://127.0.0.1:7002/news

### 4. 编写业务逻辑,爬取 hacker-news 数据

(1) 新建目录：// app/service/news.js，这里请求时设置了 proxy，是因为 hacker-news 的 api 被墙了

```js
"use strict";
const Service = require("egg").Service;

class NewsService extends Service {
  async list(page = 1) {
    // read config
    const { serverUrl, pageSize } = this.config.news;
    // use build-in http client to GET hacker-news api
    const { data: idList } = await this.ctx.curl(
      `${serverUrl}/topstories.json`,
      {
        enableProxy: true,
        proxy: "http://127.0.0.1:1080",
        data: {
          orderBy: '"$key"',
          startAt: `"${pageSize * (page - 1)}"`,
          endAt: `"${pageSize * page - 1}"`
        },
        dataType: "json"
      }
    );

    // parallel GET detail
    const newsList = await Promise.all(
      Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;

        return this.ctx.curl(url, {
          enableProxy: true,
          proxy: "http://127.0.0.1:1080",
          dataType: "json"
        });
      })
    );
    return newsList.map(res => res.data);
  }
}

module.exports = NewsService;
```

(2) // app/controller/news.js 修改语句

```js
async list() {
  const ctx = this.ctx;
  const page = ctx.query.page || 1;
  const newsList = await ctx.service.news.list(page);
  await ctx.render('news/list.tpl', { list: newsList });
}
```

(3) // config/config.default.js 添加下面代码

```js
config.news = {
  pageSize: 5,
  serverUrl: "https://hacker-news.firebaseio.com/v0"
};
```

### 5. 编写扩展插件 moment，美化时间

```js
// 下载 moment 插件
npm i moment --save
```

```js
// app/extend/helper.js
"use strict";
const moment = require("moment");

exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();
```

```html
// views/news/list.tpl
<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <ul class="news-view view">
      {% for item in list %}
      <li class="item">
        <a class="link" href="{{ item.url }}">{{ item.title }}</a>
        <span class="time">{{ helper.relativeTime(item.time) }}</span>
      </li>
      {% endfor %}
    </ul>
  </body>
</html>
```

### 6. 站点禁止百度爬虫访问

(1) app/middleware/robot.js

```js
"use strict";
// options === app.config.robot
module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get("user-agent") || "";
    const match = options.ua.some(ua => ua.test(source));
    if (match) {
      ctx.status = 403;
      ctx.message = "Go away, robot.";
    } else {
      await next();
    }
  };
};
```

(2) config/config.default.js 添加如下代码

```js
// add middleware robot
config.middleware = ["robot"];
// robot's configurations
config.robot = {
  ua: [/Baiduspider/i]
};
```

### 7. 单元测试

(1) // test/app/middleware/robot.test.js

```js
"use strict";
const { app, mock, assert } = require("egg-mock/bootstrap");

describe("test/app/middleware/robot.test.js", () => {
  it("should block robot", () => {
    return app
      .httpRequest()
      .get("/")
      .set("User-Agent", "Baiduspider")
      .expect(403);
  });
});
```

(2) 执行测试脚本 `yarn test-local`
