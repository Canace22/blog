---
title: 计算机图形学 —————— 空间中的物体（2）
comments: true
date: 2019-11-12 08:17:47
categories: Web开发
tags: [前端, CSS与可视化]
---

在计算机图形学 —————— 空间中的物体（1）中，我讲到了网页中颜色的填充方法，这一篇，我来讲讲网页中的视点。有空间观念的话，应该知道我们的眼睛看物体总是越近的物体看得越清楚，越大，越远的物体显得越渺小，也就是近大远小的规律。

空间中的物体，从不同角度看，给我们的视觉效也是不一样的，而视点又有上下左右之分，每个方向的视点位置也同样会影响到物体的视觉效果。

综上，要展示一个空间中的物体，我们还需要三个值，即：视点，视角以及物体的远近值，可以这么表示：

```js
class PerspectiveCamera {
  constructor(eye, front, up, fov) {
    // @eye：视点, @front：视野前方坐标点, @up：视野后方坐标点, @fov：视野远近，近大远小;
    this.eye = eye;
    this.front = front;
    this.refUp = up;
    this.fov = fov;
  }

  initialize() {
    this.right = this.front.cross(this.refUp);
    this.up = this.right.cross(this.front);
    this.fovScale = Math.tan((this.fov * 0.5 * Math.PI) / 180) * 2;
  }
}
```
