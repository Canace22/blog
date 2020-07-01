---
title: Flutter 学习笔记（一）—— 快速上手
categories: web
tags: flutter
toc: true
description: flutter 快速上手指南
comments: true
date: 2020-05-23 08:04:43
---
### 一、 Flutter 不同版本的特点

1、stable：稳定版（推荐生产环境使用）

2、beta： 定期选取相对稳定的 dev 作为 beta（推荐开发环境使用）

3、dev：经过 Google 初步测试通过的代码

### 二、Flutter doctor 命令的作用

检查是否安装好了相关依赖，即检查开发环境的完备性并输出报告，可以查看有哪些依赖或配置没有装好

### 三、环境搭建

1、下载 [sdk](https://flutter.dev/docs/get-started/install/macos)，并安装

2、环境变量设置

mac， 在 home 目录下把变量添加到 .bash_profile，把临时变量变为全局变量

windows 直接全局变量 path 追加 flutter 相关变量

```bash
export PATH="$PATH:[$home]/flutter/bin"
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

3、开发工具配置

(1) Android Studio 

- 下载 [Android Studio](https://developer.android.com/studio),
  
- 安装 flutter 和 docter 插件，这里应用市场没有插件，是因为没有科学上网，需要配置对应的代理

- 下载模拟器需要的 sdk，打开模拟器，就可以愉快的运行 Flutter 项目了


(2)  习惯了用 VSCode，可以下载 flutter 插件，可以一键生成项目和运行

(3) 要调试 ios 版，需要下载 xcode，并进行[对应配置](https://flutterchina.club/setup-macos/)
