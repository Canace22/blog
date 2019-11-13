---
title: web请求加密
comments: true
date: 2018-10-22 19:47:57
categories: web
tags: http
---

1. 代码：

```js
import CryptoJS from 'crypto-js';

export class ApiSign {
  constructor() {
    (this.wordMap = {
      '*': '%2A',
      '(': '%28',
      ')': '%29',
    }),
      (this.stdUrlsafe = {
        '+': '-',
        '/': '_',
      });
  }

  encode(str) {
    return encodeURIComponent(str).replace(/[*()]/g, v => {
      return this.wordMap[v] || v;
    });
  }

  sign(params) {
    const keys = Object.keys(params);
    if (keys.length === 0) {
      console.error('params empty');
      return '';
    }
    if (!params.F_accesstoken) {
      console.error('F_accesstoken empty');
      return '';
    }
    keys.sort();
    const encryptStr = keys
      .map(v => {
        return [this.encode(v), '=', this.encode(params[v])].join('');
      })
      .join('&');
    return (
      '01' +
      CryptoJS.HmacSHA1(encryptStr, params.F_accesstoken)
        .toString(CryptoJS.enc.Base64)
        .replace(/[+/]/g, v => {
          return this.stdUrlsafe[v] || v;
        })
    );
  }
}

const apiSign = new ApiSign();
export { apiSign };
```

2. 使用方法

- 安装 [crypto-js](https://www.npmjs.com/package/crypto-js)
- 使用示例：

  ```js
  import { apiSign } from '@/utils/sign.js';

  let params = {};
  params.F_sign = apiSign.sign(params);
  ```
