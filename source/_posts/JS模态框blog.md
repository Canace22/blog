---
title: JS 模态框————angular
comments: true
date: 2018-07-11 20:32:55
categories: web
tags: angular
---

最近有个功能要做，要用到模态框，了解了一下，可以引用 boostrap + jquery 实现，但是看了看还要引用两个库，麻烦，自己写还来得快点，自己写还有个好处，想写成什么样都行。

<!--more-->

主要思路就是，点击按钮，弹出模态框，同时模态框外的区域不可点击。

页面结构如下：

```html
<div class="mask" *ngIf="isShow"></div>
<div class="container">
  <!-- 按钮：用于打开模态框 -->
  <button class="btn btn-primary" (click)="show()">
    试卷分析
  </button>
  <!-- 模态框 -->
  <div class="modal fade" *ngIf="isShow">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- 模态框头部 -->
        <div class="modal-header">
          <span class="modal-title">试卷分析: 总分({{allScoreCount}})</span>
          <button class="close" (click)="close()">&times;</button>
        </div>

        <!-- 模态框主体 -->
        <div class="modal-body"></div>
      </div>
    </div>
  </div>
</div>
```

mask 模块是一个遮罩层，只有 isShow 为真的时候才会被触发，show 函数用于处理是否要显示模态框和遮罩层，模态框模块也写了个判断，分辨何时显示这个区域，下面是 JS 代码，很简单，但是很实用，很多地方都可以用到，用于控制显示状态。

```JS
isShow: boolean = false;

show(): void {
this.isShow = true;
}

close(): void {
this.isShow = false;
}
```
