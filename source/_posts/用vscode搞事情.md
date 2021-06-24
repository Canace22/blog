---
title: VSCode 使用指南
categories: web
tags: 开发环境
description: 工欲善其事必先利其器，前端开发工具我用的是 VSCode，VSCode 有很多快捷的调试方法和一些插件，这里就总结一下这两方面的东西
comments: true
toc: true
date: 2021-03-17 08:44:36
---
## 一、插件篇

### 1、background：让开发不再单调

background 插件可以帮助我们设置 vscode 的背景图片，比如我是这么配置的

``` json
"background.customImages": ["图片绝对路径"],
"background.style": {
  "content": "''",
  "pointer-events": "none",
  "position": "absolute",
  "z-index": "99999",
  "width": "100%",
  "height": "100%",
  "background-position": "center",
  "background-repeat": "no-repeat",
  "background-size": "100%,100%",
  "opacity": 0.1
}
```

### 2、Live Server: 快速开启一个服务

Live Server 插件主要用于开启一些页面的服务，相比于 debug 打开页面，我觉得这个会更好用点

### 3、主题

vscode 自带的主题有挺多，不过我个人比较喜欢 One Dark Pro 这个主题，可以通过插件安装

### 4、快速把 px 转为 rem

在做响应式的时候经常会用到 rem，若 ui 给的图是 px 的，就得算，这样效率太低了，可以装一个 cssrem 插件，在输入 px 的时候会提示其他单位的转换值供选择。

### 5、显示文件图标

vscode-icons 插件可以根据文件类型去显示对应的图标，视觉效果挺好的。
### 6、Power Mode: 有极客范的写代码 

Power Mode 会在每次键盘按下字母时，在编辑界面对应的字符后面有一段动效，动效有几种模式，可以自己设置，用起来手感还是不错的，写起代码来会觉得更加的生动有趣。

![power mode 使用示例](/images/power-mode.gif)

### 7、vscode-drawio: 不需要额外的工具，画流程图就是这么简单

![vscode-drawio 使用示例](/images/draw-io.gif)

之前画流程图工具要么用在线的draw.io，要么用思维导图，还是比较麻烦的，有了这个插件，只需要创建 .drawio 文件，就可以方便快捷的创建流程图

### 8、Marp: md 写 ppt 就是这么简单 

marp，全称 Markdown Presentation Ecosystem，可以方便快捷的利用 md 预览 ppt，导出 pdf，使用方法也很简单，`---` 分割页，每一页的样式可以根据自己的兴趣去定义

![marp 使用示例](/images/marp.png)

## 二、调试开发篇

### 1、配置模板，减少重复输入代码的次数

每次用新的框架或者语言，一些常用的代码块总是要去反复输入，很麻烦，就在想有没有一种类似文件模板的东东，可以一键生成这些通用的代码块，看了看 vscode 的配置项，果然有，看一下效果：

![vscode 模板使用示例](/images/template.gif)

以上示例，有我自己定义的模板，也有插件模板，自己定义模板的方法如下：

![vscode 模板配置示例](/images/template-config.gif)

模板创建可以从设置的 user snippets 下创建，根据示例改一下提示语和内容就好，body 部分为模板内容，每一行作为数组的一个元素，该数组为字符串数组。

### 2、快速导航

`shift+command+o` 快捷键可以调出符号导航面板，点击上下箭头可以快速跳转

### 3、Refactoring

选中一段代码会有对应的重构提示，可以根据自己的需求去使用，比如说提取一个函数等

### 4、 快速修改函数或变量名称

选中变量或函数