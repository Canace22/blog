---
title: MAC 调试 IOS 真机上 Web 网页的方法
categories: Web开发
tags: 开发环境
comments: true
description: '最近有个项目 web 项目在 ios 上显示异常，看不到日志也不知道什么问题。网上有很多实现方法，看了看都是抄来抄去的，细节不是很全，我就记录下自己的操作过程吧，免得下次忘了难找。'
toc: true
date: 2022-03-30 16:53:10
---

## 一、使用 chrome 远程调试

- ios 设备设置：设置 -> Safari 浏览器 -> 高级 -> 打开网页检查器
  
- 安装 ios-webkit-debug-proxy: `brew install ios-webkit-debug-proxy`

- 安装 remotedebug-ios-webkit-adapter: `remotedebug_ios_webkit_adapter --port=<port>`

- 手机打开上述端口启动的本地服务

- 手机用数据线连上 mac，chrome 打开 chrome://inspect/#devices，就可以看到上述服务了，点进去可以看得到控制台，但是这个控制台的 console 模块被拦截了，还是看不到打印的日志，network，element 等模块正常。为了解决这个问题可以在测试环境装个 vconsole，我用的是 ts，需要装 3.4.0 以上的版本，不然会报类型错误。

- 此外，说是调试，并不能 debugger，只能打打日志抓抓包。

## 二、Safari 调试

- 同上第一步

- mac Safari 偏好 -> 通用 -> 开启 develop 菜单

- 手机 Safari 打开需要调试的网页

- 手机用数据线连上 mac，点击 mac Safari 的 develop 菜单看到有个 iphone 的子菜单点进去有手机上打开的调试网页点进去就可以看到控制台了，这里手机上的网页检测不太稳定，经常会闪一下控制台之后就再也看不到调试网页了，故障率高不太建议

## 三、charles

另外一种是用 charles 配代理抓包，这个感觉配置起来比较麻烦，不过挺强大的还可以映射开启 ssl，玩了下，好像我用不到这么复杂的东西，就不写了，以后有需要可以看看他的文档。