---
title: flow 简易教程
categories: Web开发
tags: flow
comments: true
toc: true
date: 2020-11-09 16:59:07
---
## 一、初始化

### 1、安装 babel 并进行配置

(1) 安装

```shell
yarn add --dev @babel/core @babel/cli @babel/preset-flow
```

(2) 配置

```json
// .babelrc
{
  "presets": ["@babel/preset-flow"]
}
```

```json
// pakage.json
{
  "name": "my-project",
  "main": "lib/index.js",
  "scripts": {
    "build": "babel src/ -d lib/",
    "prepublish": "yarn build"
  }
}
```

### 2、安装 flow 并配置

```shell
yarn add --dev flow-bin
```

在项目中局部安装的，要运行 flow，需要配置一下

```json
"scripts": {
  "flow": "./node_modules/.bin/flow"
},
```

### 3、初始化 

(1) 项目中初始化 flow

```shell
yarn flow init
```

(2) 运行 flow，检查代码

```shell
yarn flow
```

## 二、类型概述

### 1、原始类型

除了undefined，字面量形式的原始类型是对应的小写英文单词，包装对象形式的原始类型用大写(用构造函数生成)，undefined 类型是 void

### 2、可选类型

(1) 可选原始类型

可选原始类型形如:?string，类型值可以是字符串，也可以是 null 或者 void

(2) 可选对象属性和可选函数参数

可选对象属性形如: { foo?: string },可选函数参数形如: param?: string, 二者都可以省略不写或者为 void 类型，但是不能是 null

(3) 函数参数的默认值

这个比较神奇，得这么写: value: string = "foo"，同样可以省略或者是 void 类型，但是不能是 null

### 3、使用原始类型值作为类型

这个比较有意思，感觉也比较好用，用法照搬官网的:

```js
// @flow
function getColor(name: "success" | "warning" | "danger") {
  switch (name) {
    case "success" : return "green";
    case "warning" : return "yellow";
    case "danger"  : return "red";
  }
}

getColor("success"); // Works!
getColor("danger");  // Works!
// $ExpectError
getColor("error");   // Error!
```

上述 demo 中要求只能输入文字集合 `["success","warning","danger"]` 中的一个，其他的值均会被认为是错误的

### 4、数组

形如: `var arr: Array<number> = [1, 2, 3]`