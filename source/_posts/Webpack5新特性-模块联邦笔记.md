---
title: Webpack5 新特性 - 模块联邦笔记
categories: web
tags: 工程化
description: 传统的模块共享方式有打包到 npm 共享，UMD 方式共享以及微前端方式共享等，但是这些方式都多少有点问题，Webpack5 新特性模块联邦就是为解决这些问题而生。
comments: true
toc: true
date: 2020-04-03 09:07:28
---
<!-- ![NPM 方式共享模块图解](/images/npm.jpeg) -->
### 一、NPM 方式共享模块

#### 1、模块共享方式

将需要共享的模块抽成通用依赖，进行 Webpack 打包构建上线，再分别安装到对应的项目中。

#### 2、存在的问题

需要走本地编译

![NPM 方式共享模块图解](/images/npm.jpeg)

### 二、UMD 方式共享模块

![UMD 方式共享模块图解](/images/umd.jpeg)

#### 1、模块共享方式

模块用 Webpack UMD 模式打包，并输出到其他项目中.

#### 2、存在的问题

包体积无法达到本地编译时的优化效果，且库之间容易冲突。

### 三、微前端方式共享模块（MFE）

![微前端方式共享模块图解](/images/mfe.jpeg)

#### 1、模块共享方式

- 子应用独立打包
  
- 整体应用一起打包

#### 2、存在的问题

- 子应用独立打包，无法抽取公共依赖

- 整体应用一起打包，速度慢，不具备扩展水平

### 四、模块联邦方式共享模块( Federated Module)

![微前端方式共享模块图解](/images/fm.jpeg)

#### 1、模块共享方式

在线动态分发 Runtime 子模块，子应用利用 Runtime 方式复用主应用的 Npm 包和模块，应用之间包直接共享。

#### 2、使用方式

核心是 ModuleFederationPlugin 插件

(1) 模块导出

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  // other webpack configs...
  plugins: [
    new ModuleFederationPlugin({
      name: "app_one_remote", // 当前应用名称，需要全局唯一
      remotes: {  //  将其他项目的 name 映射到当前项目中
        app_two: "app_two_remote",
        app_three: "app_three_remote"
      },
      exposes: {  //  表示导出的模块，只有在此申明的模块才可以作为远程依赖被使用
        AppContainer: "./src/App"
      },
      shared: ["react", "react-dom", "react-router-dom"]  //  让远程加载的模块对应依赖改为使用本地项目的 React 或 ReactDOM
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ["main"]
    })
  ]
};
```

(2) 模块使用

```js
import { Search } from "app_two/Search";
```

(3) 模块配置

```js
// app_two 的 webpack 配置
export default {
  plugins: [
    new ModuleFederationPlugin({
      name: "app_two",
      library: { type: "var", name: "app_two" },
      filename: "remoteEntry.js",
      exposes: {
        Search: "./src/Search"
      },
      shared: ["react", "react-dom"]
    })
  ]
};
```

[原文](https://mp.weixin.qq.com/s/b5Gl_1yX1enktU9oulO9zg)
