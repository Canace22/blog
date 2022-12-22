---
title: 构建 TypeScript 库
categories: web
tags: TypeScript
description: 构建 TypeScript 库简易指南
author: Canace
comments: true
toc: true
date: 2022-12-09 17:53:22
---
## 一、初始化

创建一个空目录 typescript-library, `tsc --init` 初始化 tsconfig.json，具体配置字段，生成的 json 文件又说明，这里不做赘述，修改配置如下：

```json
// typescript-library/tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2015",
    "declaration": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

## 二、创建库代码

```ts
// typescript-library/src/hello-world.ts
export function sayHello() {
  console.log('hi');
}
export function sayGoodbye() {
  console.log('goodbye');
}
```

```ts
// typescript-library/src/index.ts
export { sayHello, sayGoodbye } from './hello-world';
```

## 三、配置 package.json

`npm init -y` 创建 package.json 文件，并修改 name、main 和 types 字段

```json
{
  "name": "helloworld",
  "version": "1.0.0",
  "description": "Can log \"hello world\" and \"goodbye world\" to the console!",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["/dist"],
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## 四、库的使用

```ts
import {sayHello} from 'helloworld'
sayHello();
```

1、编译代码并上传到 npm

`tsc` => `npm publish`

2、编译代码，直接从本地安装使用

```json
 "dependencies": {
    "helloworld": "./helloworld"
  }
```

参考文献

[How to Write a TypeScript Library](https://www.tsmean.com/articles/how-to-write-a-typescript-library/)