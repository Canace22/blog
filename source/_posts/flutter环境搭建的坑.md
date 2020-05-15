---
title: flutter 环境搭建
categories: web
tags: flutter
description: flutter 环境搭建的坑
comments: true
date: 2020-05-02 09:13:43
---
1. 全局变量设置

mac， 在 home 目录下把变量添加到 .bash_profile，把临时变量变为全局变量

windows 直接全局变量 path 追加 flutter 相关变量

```bash
export PATH="$PATH:[$home]/flutter/bin"
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

2. 部署到 ios 真机

运行 `sudo gem install cocoapods` 之后，`pod setup` 一直报错，更新一下 [ruby](https://medium.com/@IanRahman/how-to-upgrade-ruby-on-a-mac-a592c6085c63)
