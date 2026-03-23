---
title: 盒模型
description: '标准盒模型易被内外边距撑开宽度，设置 border-box 可解决，弹性布局更简洁但兼容性待提升。'
comments: true
date: 2018-06-08 09:56:03
categories: Web开发
tags: CSS与可视化
---

### 1. 标准盒模型：

因为 `width = margin_box_width(left_width + right_width) + border_width + padding_box_width(left_width + right_width) + content_box_width`，所以，同样宽度的内容因为 `margin`和`padding` 值不一样，撑开了内容块的宽度，显示出来的效果不尽相同。为了解决这个问题，IE8+可以用设置 `box-sizing：border-box` 来避免内容块的宽度被撑开。因此，一般可以进行如下设置，使 `content_box_width = width` 。

```
*{
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    box-sizing:border-box;
    }
```

### 2. 弹性盒模型：

弹性布局相比传统的块布局要简洁很多，但是实现原理差别挺大的。首先，要想进行弹性布局，要设置 `display:flex`，确定弹性容器。然后要知道弹性容器里面的内容块定位是由两条轴即主轴和测轴确定的。主轴由 `flex-direction` 属性值确定是横向还是纵向，`justify-content` 属性则确定内容块在主轴上的分布形式。内容块在测轴上的分布形式由 `align-item` 确定，也可以用 `align-self` 确定单个的内容块分布形式，不过这会覆盖掉 `align-item` 的值。目前弹性盒布局还没有完全普及，PC 端浏览器支持还不是很好，更多的是用于手机端的布局。
