---
title: angular 导航栏与内容联动
comments: true
date: 2018-07-29 16:07:54
categories: Web开发
tags: [前端, 框架与库]
---

通过 angular 的 render2 渲染器操作 DOM , 通过获取 DOM 的滑动只与定位,计算出滑动距离,并控制速率。

<!--more-->

1.  注入 commonService 服务,里面封装了 handleAnchor 函数,主要思路就是通过 angular 的 render2 渲染器操作 DOM , 通过获取 DOM 的滑动只与定位,计算出滑动距离,并控制速率。代码如下:

```js
/**
* 点击题目进行锚点定位
* @param targetDom 需要定位的目标Dom元素
* @param scrollElementRef 滑动区域
* @param SCROLL_OFFSET 需定位的位置在滑动区域中的距离
* @param ANCHOR_RATE 自动滑动速度，数值越小速度越快
* @param isPreview 来自试卷预览的特殊处理 默认 false
*/
handleAnchor(targetDom: any, scrollElementRef: any, SCROLL_OFFSET: number, ANCHOR_RATE: number, isPreview = false): void {
    let currentAnchor = scrollElementRef.scrollTop;
    let questionTop = this.getElementTop(targetDom);
    let scrollWrapTop = this.getElementTop(scrollElementRef);
    let actualTop = questionTop - scrollWrapTop - SCROLL_OFFSET;
    if (isPreview) {
        actualTop -= 45; // 去掉解析栏的高度
    }
    const anchorRate = (Math.abs(actualTop - currentAnchor)) / ANCHOR_RATE;
    const interval = setInterval(() => {
    if (currentAnchor < actualTop) {
        scrollElementRef.scrollTop = currentAnchor += anchorRate;
    } else {
        scrollElementRef.scrollTop = currentAnchor -= anchorRate;
    }
    if (currentAnchor <= actualTop + anchorRate && currentAnchor >= actualTop - anchorRate) {
        clearInterval(interval);
        scrollElementRef.scrollTop = actualTop;
    }
    }, 10);
}
```

2.  以上函数通过注入依赖的形式在组件中进行使用,通过传递相应的参数, 实现数据联动效果, 代码如下:

```js
handleAnchor(targetId): void {
    const targetDom = document.getElementById(targetId)
    let documentElement: Element;
    documentElement = document.documentElement;
    this.commonService.handleAnchor(targetDom, documentElement, this.SCROLL_OFFSET, this.ANCHOR_RATE)
    this.renderer.addClass(targetDom, 'paper-hover')
    setTimeout(() => {
        this.renderer.removeClass(targetDom, 'paper-hover')
    }, 1000);
}
```

以上代码将整个文档流作为滑动区域传给了 handleAnchor 函数,并且通过虚拟 DOM 加了一段样式表, 实现滚动到相应位置, 出现一个边框的视觉效果。
