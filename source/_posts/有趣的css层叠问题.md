---
title: 有趣的CSS层叠问题
categories: web
tags: css
comments: true
date: 2021-01-07 09:28:36
---

接别人的锅，遇到个很有意思的层级问题，代码结构是这样的：

```html
<div class="container">
  <div class="box1">查看</div>
  <div class="box2">
    <button>查看图片</button>
    <div class="img-wrap">
      <img src="./umr.jpg" alt="" />
    </div>
  </div>
  <div class="box3">
    <audio controls src=""></audio>
  </div>
</div>
```

有一个遮罩层，上面

（1）有一个框框 a, a 里面有个音频;

（2）点击查看会显示框 b，框 b 可以再次点击查看缩回去;

（3）框 b 里面可以点击查看图片显示框 c，这里不需要查看按钮了，会有关闭按钮;

有意思的是当我们去掉所有的 z-index 后，现有的结果展示出来的效果如下图：

![stacking-demo](/images/stacking-demo.png)

demo 可以看[这里](https://codepen.io/AnnaLoveLife/pen/dypexrM?editors=1100)

其实要改这个，涉及到的知识主要是CSS的层叠

（1）三个div的层叠水平，层叠顺序一样，所以后面的会覆盖前面的，利用这个理论，把box1移到最后，这样他就总能在box2的上层了;

（2）同样用上面的理论，把box3移动到最前面，这样box3理论上会层叠在box2的下面;

（3）但是audio还是在，这是因为chrom下background-color默认是rgba(0,0,0,0)，也就是transparent，所以能看到下面的东西，给一个背景色就看不到了；

（4）通过上面的就可以实现弹出box2遮住box1，弹出img-wrap，遮住下面的内容；

（5）但是，在显示img-wrap的时候，查看按钮还能看得到，这时候就需要创建层叠上下文了，给img-wrap的z-index设置为1，即可
