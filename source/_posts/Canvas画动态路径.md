---
title: Canvas 画动态路径
comments: true
date: 2019-08-25 11:04:28
categories: web
tags: webGL
---

这个函数是一个用于画 canvas 路径的，也就是把 canvas 画线的过程演示出来的一个东东。采用的是纯 js 和 canvas 描绘方法。当然前提是得有路径的点集，不然画不了。

<!--more-->

#### 一、参数列表

| 参数                | 类型        | 说明               |
| ------------------- | ----------- | ------------------ |
| config.color        | String      | 路径颜色           |
| config.path         | Object      | 路径的点集         |
| config.padding.left | Number      | 路径图的左偏移值   |
| config.padding.top  | Number      | 路径图的上偏移值   |
| config.img          | HTMLElement | 描绘路径的图       |
| config.sw           | Number      | 描绘路径图的原始宽 |
| config.sh           | Number      | 描绘路径图的原始高 |
| config.scale        | Number      | 缩放尺度           |

#### 二、函数

```js
export default function drawPolygon(config) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let t = 0;
  const [scale, path, color, sw, sh, padding, handleEl] = [
    config.scale,
    config.path,
    config.color,
    config.sw,
    config.sh,
    config.padding,
    config.handleEl
  ];
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const draw = () => {
    if (t >= config.path.length) {
      clearInterval(clock);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t += 2;
    ctx.beginPath();
    ctx.moveTo(
      path[0].x * scale + padding.left,
      path[0].y * scale + padding.top
    );
    if (t > path.length) {
      t = path.length;
    }
    if (handleEl) {
      ctx.drawImage(
        handleEl,
        path[t - 1].x * scale + padding.left,
        (path[t - 1].y - 240) * scale + padding.top,
        sw * scale,
        sh * scale
      );
    }

    for (let i = 0; i < t; i++) {
      if (config.path[i]) {
        ctx.lineTo(
          config.path[i].x * scale + config.padding.left,
          config.path[i].y * scale + config.padding.top
        );
      }
    }
    ctx.strokeStyle = color || "#07B1CA";
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const clock = setInterval(draw, 50);
}
```

#### 三、Demo 地址

[Demo](https://canace22.github.io/Demos/#/) => 绘图 => canvas 路径
