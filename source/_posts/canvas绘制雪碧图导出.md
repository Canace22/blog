---
title: canvas 绘制雪碧图导出
comments: true
date: 2019-10-26 17:19:41
categories: Web开发
tags: webGL
---

在开发中，我们经常会用到雪碧图，有时候 UI 可能给了很多小图，没有给到雪碧图，为了减少请求，我们会选择自己去在线生成或 ps，但是这样太繁琐了，能不能我们用一个函数实现呢？网上很多方案是借助 webpack 实现这个功能的，但是我想能不能简单点，于是就有了这个 demo，目前该 demo 可以合成雪碧图导出，但是没有导出对应的坐标 json 文件，后期再完善，先这样。

一、主要思路

1、要合成雪碧图的前提是拿到对应图片的路径，网页要拿图片的路径无非就是通过 input file 上传的时候拿本地路径或者更加简单粗暴地自己写；

2、要合成雪碧图，需要有个工具去把他们拼凑在一起，网页怎么把图片拼在一起呢？当然是用 canvas 画啦；

3、已经可以组合图片了，怎么导出呢？客户端的 js 没有操作文件系统的高端属性啊，我选择的是用一个保存文件的第三方库 file-saver，这是一个客户端 js 保存文件的神器。

二、实现

demo:

```js
import { saveAs } from "file-saver";

function newSprite({ canvasId, images, width, height }) {
  const canvas = document.getElementById(canvasId);
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);
  const initX = 0;
  images.forEach((ele, index) => {
    const ctx = canvas.getContext("2d");
    ctx.drawImage(ele, initX + 50 * index, 0);
  });
  canvas.toBlob(blob => {
    saveAs(blob, "sprite.png");
  });
}
```

预览：

[Demos](https://canace22.github.io/Demos/#/) => canvas 绘图 => 合成雪碧图

三、扩展

如果觉得这样还不够好用的话，可以学习 smithSprite，把对应图片的 css 坐标样式也导出来
