---
title: axios网络请求封装
comments: true
date: 2018-10-22 19:44:02
categories: web
tags: http
---

axios 是网页请求库中的新星，经常会看到他与 vue 携手，该库对 http 请求已经封装得很好了，但是，由于我需要一些更加定制化的操作，比如加密请求参数等，所以这里进行了二次封装。

<!--more-->

1. 代码：

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

2. 使用方法：

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
