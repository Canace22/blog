---
title: 小程序 tabs-sticky
categories: web
tags: 小程序
description: 小程序 sticky 的正确使用姿势
comments: true
date: 2020-07-20 15:05:34
---
### 一、小程序要实现 sticky 真的无解吗？

要实现中间的导航吸顶，在网页端很简单的使用 sticky 属性就搞定了，在小程序一设置，发现没有效果，就跟同事说小程序不支持这个属性，再看看官网，有相关的扩展组件，说明是真的不支持，才有给扩展组件吧。开始结合 scroll-view 手撸，发现手撸的有点卡，这样下去不行。尝试用了下官方的扩展组件，吸顶之后就一直在顶部了 emm，而且好像不支持 flex，不符合需求，一定是我的姿势不对，那就再手撸一下吧。

### 二、实现吸顶的 tabs 组件

1、tab-item 设置 position 为 sticky

要实现这个功能，首先需要把要吸顶的元素设置 sticky，像这样

```css
position: sticky;
position: -webkit-sticky;
top: 0;
z-index: 666;
```

记得设置层级高一点，不然滚动之后可能会看不到了

2、设置滚动高度

```js
attached() {
  this.getNodeInfo('sticky')
},
getNodeInfo(nodeName) {
  const query = this.$wx.createSelectorQuery()

  query.select(`#${nodeName}`).boundingClientRect()
  query.selectViewport().scrollOffset()
  query.exec(res => {
    res = res.filter(ele => ele)
    this.scrollTop = res[0].height
  })
}
```

到此基本实现了 sticky 效果，要说有什么瑕疵吧，也还是有点的，不过能接受吧