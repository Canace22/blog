---
title: CSS 画两色饼状图
categories: web
tags: css
description: CSS 画两色饼状图详解
comments: true
date: 2020-04-23 08:59:17
---

一、CSS 画圆

CSS 画圆我们应该都知道，给定宽高，border-radius 值设置为 50%，比如这样：

![圆](https://raw.githubusercontent.com/Canace22/Assets/main/images/circle.png)

```html
<div class="circle"></div>
```

```css
.pie {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: rgb(51, 168, 204);
}
```

二、CSS 画三角形

扇形跟三角形很像，只是有一条边为弧，那么可以效仿画三角形去画扇形。想一下我们一般画三角形会怎么画呢？先看看画四个 1/4 正方形的等边三角形，可以这么画：

![四个1/4正三角形](https://raw.githubusercontent.com/Canace22/Assets/main/images/triggle.png)

```html
<div class="triggle"></div>
```

```css
.triggle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 75px;
  border-color: rgb(199, 110, 110) rgb(97, 97, 212) rgb(179, 153, 106) rgb(
      118,
      158,
      118
    );
}
```

那么画一个 1/4 三角形呢？可以在纯色正方形的上面盖一层正方形，比如这样：

![一个 1/4 三角形](https://raw.githubusercontent.com/Canace22/Assets/main/images/triggle-one.png)

```html
<div class="triggle"></div>
```

```css
.triggle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 75px;
  border-color: rgb(199, 110, 110);
  transform: rotate(90deg);
}
.triggle::before {
  content: '';
  position: absolute;
  border: solid 75px;
  border-color: transparent transparent rgb(118, 158, 118);
  transform: translate(-50%, -50%);
}
```

三、画扇形

从上面的例子可以知道画一个三角形的例子，仿照上面的例子，我们画出一个 1/4 圆：

![1/4 圆](https://raw.githubusercontent.com/Canace22/Assets/main/images/1-4circle.png)

```html
<div class="rad"></div>
```

```css
.rad {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 75px;
  border-color: rgb(199, 110, 110);
  border-radius: 50%;
  margin: 20px;
  transform: rotate(90deg);
}
.rad::before {
  content: '';
  position: absolute;
  border: solid 75px;
  border-color: transparent transparent rgb(118, 158, 118);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
```

调整一下，画 1/2 圆：

![1/2 圆](https://raw.githubusercontent.com/Canace22/Assets/main/images/1-2circle.png)

```css
.rad {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 75px;
  border-color: rgb(118, 158, 118) rgb(118, 158, 118) rgb(199, 110, 110) rgb(
      199,
      110,
      110
    );
  border-radius: 50%;
  margin: 20px;
  transform: rotate(45deg);
}
.rad::before {
  content: '';
  position: absolute;
  border: solid 75px;
  border-color: transparent transparent rgb(118, 158, 118) rgb(118, 158, 118);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
```

给上述伪元素加一个旋转值，即可画任意弧度的扇形：

![各种弧度圆](https://raw.githubusercontent.com/Canace22/Assets/main/images/percent-circle.png)

```html
<div class="rad"></div>
<div class="rad one"></div>
<div class="rad two"></div>
<div class="rad three"></div>
```

```css
.rad {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 75px;
  border-color: rgb(118, 158, 118) rgb(118, 158, 118) rgb(199, 110, 110) rgb(
      199,
      110,
      110
    );
  border-radius: 50%;
  margin: 20px;
  transform: rotate(45deg);
}
.rad::before {
  content: '';
  position: absolute;
  border: solid 75px;
  border-color: transparent transparent rgb(118, 158, 118) rgb(118, 158, 118);
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(0.1turn);
}
.one::before {
  transform: translate(-50%, -50%) rotate(0.25turn);
}
.two::before {
  transform: translate(-50%, -50%) rotate(0.5turn);
}
.three::before {
  transform: translate(-50%, -50%) rotate(0.8turn);
}
```

上述例子中会发现 0.8 弧度的扇形是不对的，这里因为我们设置的是右半边透明所以这里调整一下

![各种弧度圆修正版](https://raw.githubusercontent.com/Canace22/Assets/main/images/percent-circle-per.png)

```html
<div class="rad"></div>
<div class="rad one"></div>
<div class="rad two"></div>
<div class="rad-contex three"></div>
```

```css
.rad,
.rad-contex {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 75px;
  border-color: rgb(118, 158, 118) rgb(118, 158, 118) rgb(199, 110, 110) rgb(
      199,
      110,
      110
    );
  border-radius: 50%;
  margin: 20px;
  transform: rotate(45deg);
}

.rad::before {
  content: '';
  position: absolute;
  border: solid 75px;
  border-color: transparent transparent rgb(118, 158, 118) rgb(118, 158, 118);
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(0.1turn);
}
.rad-contex::before {
  content: '';
  position: absolute;
  border: solid 75px;
  border-color: rgb(199, 110, 110) rgb(199, 110, 110) transparent transparent;
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(0.1turn);
}
.one::before {
  transform: translate(-50%, -50%) rotate(0.25turn);
}
.two::before {
  transform: translate(-50%, -50%) rotate(0.5turn);
}
.three::before {
  transform: translate(-50%, -50%) rotate(0.8turn);
}
```

但是我们平常用的饼状图是动态的，百分比可能更加灵活，这里就需要进一步优化了，综合来讲，画动态的图可能还是 canvas 比较合适，静态的话，用 css 足矣。
