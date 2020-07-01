---
title: 用 vscode 搞事情
categories: web
tags: 编辑器
description: 突发奇想，写一篇 vscode 的各种骚操作文章，这些骚操作有些用的多，有些被遗忘在角落，根本想不起来，有必要把他们记录下来。
comments: true
toc: true
date: 2020-07-01 08:44:36
---
### 一、有极客范的写代码 ———— Power Mode

Power Mode 会在每次键盘按下字母时，在编辑界面对应的字符后面有一段动效，动效有几种模式，可以自己设置，用起来手感还是不错的，写起代码来会觉得更加的生动有趣。

![power mode 使用示例](/images/power-mode.gif)

### 二、不需要额外的工具，画流程图就是这么简单 ———— vscode-drawio

![vscode-drawio 使用示例](/images/draw-io.gif)

之前画流程图工具要么用在线的draw.io，要么用思维导图，还是比较麻烦的，有了这个插件，只需要创建 .drawio 文件，就可以方便快捷的创建流程图

### 三、配置模板，减少重复输入代码的次数

每次用新的框架或者语言，一些常用的代码块总是要去反复输入，很麻烦，就在想有没有一种类似文件模板的东东，可以一键生成这些通用的代码块，看了看 vscode 的配置项，果然有，看一下效果：

![vscode 模板使用示例](/images/template.gif)

以上示例，有我自己定义的模板，也有插件模板，自己定义模板的方法如下：

![vscode 模板配置示例](/images/template-config.gif)

模板创建可以从设置的 user snippets 下创建，根据示例改一下提示语和内容就好，body 部分为模板内容，每一行作为数组的一个元素，该数组为字符串数组。

### 四、md 写 ppt 就是这么简单 ———— Marp

marp，全称 Markdown Presentation Ecosystem，可以方便快捷的利用 md 预览 ppt，导出 pdf，使用方法也很简单，`---` 分割页，每一页的样式可以根据自己的兴趣去定义

![marp 使用示例](/images/marp.png)

先写这些吧，之后想起什么再补上