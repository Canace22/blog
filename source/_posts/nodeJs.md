---
title: nodeJs 模块
comments: true
date: 2019-08-11 10:38:41
categories: web
tags: nodeJs
---

nodeJS 模块化编程指的是将一些通用的功能转移到不同的文件里，每个文件作为一个模块，暴露给其他文件使用。这样可以使代码更容易维护，更具通用性。

<!--more-->

## 一、模块化编程

nodeJS 模块化编程指的是将一些通用的功能转移到不同的文件里，每个文件作为一个模块，暴露给其他文件使用。这样可以使代码更容易维护，更具通用性。

nodeJS 模块导出的方式有两种：module.exports 和 exports，前者可以直接被赋值，后者不能。 通过模块导出的函数所声明的全局变量不会污染其他全局变量的原因是：module.exports 和 exports 实际上都是作为 load 函数的属性存在的，每次引入，源模块中的全局变量就是函数内的变量了，所以各模块全局变量间不会互相污染。

nodeJS 引入模块的方式是 require。

## 二、nodeJS 内置模块

1、fs 模块

(1) 文件读取

A、异步读取文件

- 文本文件读取

  ```js
  "use strict";

  const fs = require("fs");

  // 读取普通文本文件
  fs.readFile("sample.txt", "utf-8", function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
  ```

- 二进制文件读取

  ```js
  "use strict";

  const fs = require("fs");
  // 读取二进制文件
  fs.readFile("sample.png", function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      console.log(data.length + " bytes");
    }
  });
  ```

B、同步读取文件

```js
"use strict";

const fs = require("fs");
// 同步读取文件
try {
  const data = fs.readFileSync("sample.txt", "utf-8");
  console.log(data);
} catch (err) {
  // 出错了
  console.log(err);
}
```

(2) 文件写入

A、异步写入

```js
"use strict";

const fs = require("fs");

const data = "Hello, Node.js";
fs.writeFile("output.txt", data, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("ok.");
  }
});
```

B、同步写入

```js
"use strict";

const fs = require("fs");

const data = "Hello, Node.js";
fs.writeFileSync("output.txt", data);
```

(3) 获取文件或目录的详细信息

A、同步获取

```js
"use strict";

const fs = require("fs");
// 获取文件详情
fs.stat("sample.txt", function(err, stat) {
  if (err) {
    console.log(err);
  } else {
    // 是否是文件:
    console.log("isFile: " + stat.isFile());
    // 是否是目录:
    console.log("isDirectory: " + stat.isDirectory());
    if (stat.isFile()) {
      // 文件大小:
      console.log("size: " + stat.size);
      // 创建时间, Date对象:
      console.log("birth time: " + stat.birthtime);
      // 修改时间, Date对象:
      console.log("modified time: " + stat.mtime);
    }
  }
});
```

B、异步获取

```js
"use strict";

const fs = require("fs");

fs.statSync("sample.txt", stat);
```

ps：在启动和结束时只执行一次的读写程序，可以用同步，其他情况用异步。

2、stream 模块

(1) 利用 stream 模块读取文件

```js
"use strict";

const fs = require("fs");

// 打开一个流:
const rs = fs.createReadStream("sample.txt", "utf-8");

rs.on("data", function(chunk) {
  console.log("DATA:");
  console.log(chunk);
});

rs.on("end", function() {
  console.log("END");
});

rs.on("error", function(err) {
  console.log("ERROR: " + err);
});
```

(2) 利用 stream 模块写入数据

```js
"use strict";

const fs = require("fs");

const ws1 = fs.createWriteStream("output1.txt", "utf-8");
ws1.write("使用Stream写入文本数据...\n");
ws1.write("END.");
ws1.end();

const ws2 = fs.createWriteStream("output2.txt");
ws2.write(new Buffer("使用Stream写入二进制数据...\n", "utf-8"));
ws2.write(new Buffer("END.", "utf-8"));
ws2.end();
```

(3) 利用 pipe 串接流

```js
"use strict";

const fs = require("fs");

const rs = fs.createReadStream("sample.txt");
const ws = fs.createWriteStream("copied.txt", "utf-8");

ws.write("写入新数据\n");
rs.pipe(ws);
```

3、http 模块

(1) 第一个 HTTP 服务器程序

```js
"use strict";

// 导入http模块:
const http = require("http");

// 创建http server，并传入回调函数:
const server = http.createServer(function(request, response) {
  // 回调函数接收request和response对象,
  // 获得HTTP请求的method和url:
  console.log(request.method + ": " + request.url);
  // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
  response.writeHead(200, {
    "Content-Type": "text/html"
  });
  // 将HTTP响应的HTML内容写入response:
  response.end("<h1>Hello world!</h1>");
});

// 让服务器监听8080端口:
server.listen(8080);

console.log("Server is running at http://127.0.0.1:8080/");
```

(2) 文件服务器

```js
"use strict";

const [fs, url, path, http] = [
  require("fs"),
  require("url"),
  require("path"),
  require("http")
];

// 从命令行参数获取root目录，默认是当前目录:
const root = path.resolve(process.argv[2] || ".");

console.log("Static root dir: " + root);

// 创建服务器:
const server = http.createServer(function(request, response) {
  // 获得URL的path，类似 '/css/bootstrap.css':
  const pathname = url.parse(request.url).pathname;
  // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
  const filepath = path.join(root, pathname);
  // 获取文件状态:
  fs.stat(filepath, function(err, stats) {
    if (!err && stats.isFile()) {
      // 没有出错并且文件存在:
      console.log("200 " + request.url);
      // 发送200响应:
      response.writeHead(200);
      // 将文件流导向response:
      fs.createReadStream(filepath).pipe(response);
    } else {
      // 出错了或者文件不存在:
      console.log("404 " + request.url);
      // 发送404响应:
      response.writeHead(404);
      response.end("404 Not Found");
    }
  });
});

server.listen(8080);

console.log("Server is running at http://172.16.1.83:8080/");
```

4、crypto 模块

(1) MD5 和 SHA1 ，每一次生成的都是一样的

```js
const crypto = require("crypto");

const hash = crypto.createHash("md5");

// 可任意多次调用update():
hash.update("Hello, world!");
hash.update("Hello, nodejs!");

console.log(hash.digest("hex"));
```

(2) Hmac ，根据秘钥改变

```js
const crypto = require("crypto");

const hmac = crypto.createHmac("sha256", "secret-key");

hmac.update("Hello, world!");
hmac.update("Hello, nodejs!");

console.log(hmac.digest("hex"));
```

(3) AES，对称加密，含加解密过程

```js
const crypto = require("crypto");

function aesEncrypt(data, key) {
  const cipher = crypto.createCipher("aes192", key);
  var crypted = cipher.update(data, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher("aes192", key);
  var decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

const data = "Hello, this is a secret message!";
const key = "Password!";
const encrypted = aesEncrypt(data, key);
const decrypted = aesDecrypt(encrypted, key);

console.log("Plain text: " + data);
console.log("Encrypted text: " + encrypted);
console.log("Decrypted text: " + decrypted);
```

(3) RSA 非对称加密
