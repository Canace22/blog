---
title: vue-config 配置模板
comments: true
date: 2018-10-22 19:33:31
categories: web
tags: vue
---

```js
const path = require('path');

const resolve = dir => path.join(__dirname, dir);

const urlPath = process.env.NODE_ENV === 'development' ? './' : '/item-name/';

module.exports = {
  // 基本路径
  baseUrl: urlPath,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 服务器端口号
  devServer: {
    port: 1234,
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('service', resolve('src/service'))
      .set('views', resolve('src/views'))
      .set('assets', resolve('src/assets'));
  },
};
```
