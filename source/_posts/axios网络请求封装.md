---
title: axios 网络请求封装
comments: true
date: 2020-03-31 10:10:02
categories: web
description: axios 是网页请求库中的新星，经常会看到他与 vue 携手，该库对 http 请求已经封装得很好了，但是，由于我需要一些更加定制化的操作，比如加密请求参数等，所以这里进行了二次封装。
tags: 网络
---

axios 是网页请求库中的新星，经常会看到他与 vue 携手，该库对 http 请求已经封装得很好了，但是，由于我需要一些更加定制化的操作，比如加密请求参数等，所以这里进行了二次封装。

### 一、方案一，根据方法封装，不预处理状态

#### 1、 代码：

```js
import axios from "axios";
import qs from "qs";

export class Http {
  constructor() {
    this.ins = axios.create({
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }

  get(url, param = {}, config = {}) {
    config.params = param;
    return this.ins.get(url, config);
  }

  post(url, data = {}, config = {}) {
    return this.ins.post(url, qs.stringify(data), config);
  }

  delete(url, param = {}, config = {}) {
    config.params = param;
    return this.ins.delete(url, config);
  }

  put(url, body = {}, config = {}) {
    return this.ins.put(url, body, config);
  }
}

const http = new Http();
export { http };
```

#### 2、 使用方法：

- 安装 [axios](https://github.com/axios/axios)

- 安装 [qs](https://www.npmjs.com/package/qs)
  
- 使用示例：

  ```js
  import { http } from '@/service.js'

  // http get example
  let url = ''
  let params = {}
  http.get(url, {
    params
  }, {})
  .then(res => {
    console.log(res)
  }
  // http post example
  let url = ''
  let params = {}
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  http.post(url, params, config)
  ```

### 二、方案二，根据请求方式分，在数据拦截阶段处理好各种状态，再返回数据

#### 1、代码

```js
import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';

const service = axios.create({
  timeout: 5000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

service.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    Vue.prototype.$message.fail(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const status = response.data.F_responseNo;

      switch (status) {
        case 10000:
          console.log('response', response.data);
          return Promise.resolve(response.data);
        case 10001:
          Vue.prototype.$messagebox.show_message(
            '操作失败，未知错误：',
            status
          );
          return Promise.reject(response.data);
        case 10002:
          Vue.prototype.$messagebox.show_message('请求参数错误：', status);
          return Promise.reject(response.data);
        case 12100:
          Vue.prototype.$messagebox.show_message('账号错误：', status);
          return Promise.reject(response.data);
        case 12105:
          Vue.prototype.$messagebox.show_message('账号在别处登录：', status);
          return Promise.reject(response.data);
        default:
          break;
      }
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          Vue.prototype.$messagebox.show_message('参数错误：', 400);
          break;
        case 401:
          Vue.prototype.$messagebox.show_message('认证错误：', 401);
          break;
        case 403:
          Vue.prototype.$messagebox.show_message(
            '拒绝执行 (access_token or refresh_access_token 错误)：',
            403
          );
          break;
        case 404:
          Vue.prototype.$messagebox.show_message('请求页面不存在：', 404);
          break;
        default:
          Vue.prototype.$messagebox.show_message(error.response.data.message);
          break;
      }
      return Promise.reject(error.response);
    }
  }
);
export default service;
```
#### 2、 使用方法：

```js
service({
  url,
  method: 'get',
  params
})
```