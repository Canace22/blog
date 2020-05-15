---
title: 首屏时间(FCP) VS 白屏时间(FP)
categories: web
tags: 性能优化
description: 最近发现做了这么多的首屏优化，一直都是把白屏时间((FP))和首屏(FCP)时间算在一起，也就是页面打开之前 dom 没渲染出来，我就把他归为首屏时间。时间上这里专业点可以分为首屏和白屏两个阶段，这篇文章就讲讲二者的区别，以及计算方法。
comments: true
toc: true
date: 2020-04-01 08:58:25
---
### 一、摘要

最近发现做了这么多的首屏优化，一直都是把白屏时间和首屏时间算在一起，也就是页面打开之前 dom 没渲染出来，我就把他归为首屏时间。时间上这里专业点可以分为首屏和白屏两个阶段，这篇文章就讲讲二者的区别，以及计算方法。

### 二、 为什么需要计算首屏时间和白屏时间

首先先讲讲按照我以前理解的首屏时间慢会带来什么问题，在页面一开始总有一段 dom 没被渲染出来的时间，这里慢的话，可以看到一段页面空白的时间，快的话，空白会一闪而过，造成闪屏，页面体验很差。因此，才有必要对其进行优化。

### 三、首屏和白屏是什么

再来讲讲白屏和首屏。

#### 1、白屏（First Paint）

当浏览器开始渲染页面，白屏触发，这时候你如果设置了背景颜色的话，就可以看到页面出现了背景色。

![白屏示例图](/images/first-paint-example.png)

白屏会在页面加载之前触发，在这段时间里，不会呈现任何内容和信息给用户。虽然背景色会很快完成绘制，但是实际的内容和交互可能要花很长的时间去加载，因此，白屏时间过长，会让用户认为我们的页面不能用或可用性差。可以通过适当调整页面结构，来优化网页。

#### 2、首屏 (First Contentful Paint)

当页面绘制完第一个 DOM 内容，会触发首屏，这里的内容可以是文字、图片或者是 canvas。

![首屏示例图](/images/first-contentful-paint-example.png)

首屏决定了网页的用户体验，因为它会标记实际内容何时加载到页面中，而不仅仅是标记页面的变化状态。因为关注的是内容，所以该指标可以了解用户何时收到消耗性信息，比如文本，视觉效果等，这比通过背景改变或样式改变对用户体验进行评估更有用。

### 四、首屏时间和白屏时间计算

#### 1、 白屏时间计算

在 head 标签开始加一段脚本，用于记录白屏开始时间，在 head 标签结束之前，加一段脚本，用于计算白屏时间，有些浏览器可以调用 Performance API 得出白屏结束时间，有些不支持，因此，计算方式分两种：

```js
// 支持 Performance API
firstPaint =  firstPaintEnd - performance.timing.navigationStart;
// 不支持 Performance API，在 page onload 中计算结束时间 pageStartTime
firstPaint =  firstPaintEnd - pageStartTime;
```

#### 2、首屏时间计算

首屏时间的计算需要用到两个变量，一个是首屏开始，一个是首屏结束，首屏开始也是白屏结束的时间，因此可以用以上方法计算出来，首屏结束时间应该是页面的第一屏绘制完，但是这个我们不好定义，我们知道在一个页面中，图片资源往往是比较后加载完的，因此可以统计首屏加载最慢的图片是否加载完成，加载完了，记录结束时间.

```js
// 计算首屏加载最慢的图片是否加载完成
const img = new Image();
img.src = src;
img.onload = () => {
  firstPaintContentEnd = Date.now();
};

const onload = () => {
  firstPaintContentStart = Date.now();
}

firstPaintContent = firstPaintContentEnd - firstPaintContentStart;
```

### 五、我该计算首屏时间还是白屏时间？

在评估页面是否开始渲染方面，首屏时间会比白屏时间更精确，但是二者的结束时间往往很接近。所以要根据自己的业务场景去决定到底该用哪种计算方式。

- 对于交互性比较少的简单网页，由于加载比较快，所以二者区别不大，因此，可以根据喜好任选一种计算方式。

- 对于大型的复杂页面，你会发现由于需要处理更多复杂的元素，白屏时间和首屏时间相隔比较远，这时候，计算首屏时间会更有用。

### 六、基于以上理论，写的一个替换白屏的小 demo

```html
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <title>demo</title>
    <style>
      .static {
        width: 100%;
        height: 100%;
        background: url(./img/skeleton.png) no-repeat;
        background-size: 100% 100%;
        animation: bg-animation 3s infinite;
      }
      @keyframes bg-animation {
        from {
          opacity: .075;
        }
        40% {
          opacity: .82;
        }
        60% {
          opacity: .165;
        }
        100% {
          opacity: 1;
        }
      }
    </style>
    <script>
      startTime = Date.now();
    </script>
  </head>

  <body>
    <noscript>
      <strong
        >We're sorry but flash-experiment doesn't work properly without
        JavaScript enabled. Please enable it to continue.</strong
      >
    </noscript>
    <div class="static" id="static"></div>
    <div id="app"></div>
    <script>
      window.onload = () => {
        startEnd = Date.now();
        firstPaint = startEnd - startTime;
        console.log(firstPaint);
        removeDom();
      }
      function removeDom() {
        const div = document.querySelector('#static');
        document.querySelector('body').removeChild(div);
      }
    </script>
    <!-- built files will be auto injected -->
  </body>
</html>
```
