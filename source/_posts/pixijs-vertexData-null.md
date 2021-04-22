---
title: pixijs Graphics vertexData 采坑
categories: web
tags: webGL
description: 最近项目中遇到了一个 Graphics 对象，打印出来 vertexData 有数据，但是单独打印却没有，因为是引用类型，我猜应该是数据后面加进去才会出现这个问题，然而，调试了半天也没找到问题
comments: true
date: 2020-04-13 22:55:13
---

版本：PixiJs v5.2.0

最近项目中遇到了一个 Graphics 对象，打印出来 vertexData 有数据，但是单独打印却没有，因为是引用类型，我猜应该是数据后面加进去才会出现这个结果，然而，调试了半天也没找到问题，逻辑从头开始梳理，紧紧有条，没什么问题，看了他的 issue，试过里面的方法都不行。

既然是引用类型，就去看看这个属性值是怎么加进去的吧，看了作者的一些回答，发现在加 vertexData 之前会有一个 point update 和 vertexData 计算的过程，那就在打印和赋值之前先调用这两个方法吧，demo 如下：

```js
if (!graphics.vertexData) {
  if (g.geometry) {
    graphics.geometry.updateBatches();
  }
  graphics.calculateVertices();
}
const vtexs = graphics.vertexData;
```

这样写看起来没什么问题，点集和顶点都更新了，但是打印 vertexData 依然为 null，这次多出了一个 typeError 错误，可以看到 vertexData 默认值是 null，但是 calculateVertices 却在给该属性赋值时用了 vertexData[count++] 这样的操作，不知道作者怎么想的，可能是熬夜开发的结果吧。

通过 debug 出以上结论，我们知道这是 PixiJs 本身不完善的问题，所以解决 Graphics.vertexData 没有及时更新的问题了，改写一下 demo：

```js
if (!graphics.vertexData) {
  graphics.vertexData = [];
  if (graphics.geometry) {
    graphics.geometry.updateBatches();
  }
  graphics.calculateVertices();
}
const vtexs = g.vertexData;
```

网上关于 PixiJs 的文献太少了，大多是一些基础教程，而且很多是比较老旧的版本，还是自己整理资料靠谱些。
