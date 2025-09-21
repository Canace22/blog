---
title: npm 常用命令
comments: true
date: 2019-08-17 13:53:16
categories: 工程化与运维
tags: 开发工具
---

## 1、安装

```npm
npm i <package>

npm i <package> -g

npm i <package> --save-dev

npm install @myco/my-package
```

## 2、切换源

```npm
# 长久切换
npm config set registry <https://registry.npm.taobao.org>

# 临时切换
npm --registry https://registry.npm.taobao.org install express
```

## 3、添加私有源

```npm
// 需要先登录
npm config set <@myco>:registry <http://reg.example.com>
.npmrc
registry=https://registry.npmjs.org/
//registry.npm.dreamdev.cn/:_password=<password>
//registry.npm.dreamdev.cn/:username=<user>
//registry.npm.dreamdev.cn/:email=<email>
//registry.npm.dreamdev.cn/:always-auth=false
@myco:registry= <http://reg.example.com>
https://registry.npm.dreamdev.cn/=
```

## 4、更新 package.json 中的所有依赖

```sh
npm install -g npm-check-updates
ncu -u
npm update
```
