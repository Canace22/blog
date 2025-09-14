---
title: css background-image 的应用
categories: Web开发
tags: [前端,CSS]
description: background-image 实现一些特殊效果
comments: true
toc: true
date: 2020-07-08 09:42:10
---
### 一、多背景叠加

```css
/* 多背景图 */
.more-img {
  background-image: url(https://image.flaticon.com/icons/svg/748/748122.svg),url(./snow.jpg);
  background-position: center, top;
  background-repeat: repeat, no-repeat;
  background-size: 16px 16px, cover;
}
```

![背景叠加](https://raw.githubusercontent.com/Canace22/Assets/main/images/snow-other.png)

### 二、三角形背景

```html
<!-- 三角形背景 -->
<div class="day bg-image"></div>
<div class="night bg-image"></div>
```

```css
body {
  margin: 0;
  padding: 0;
}
.bg-image {
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-image: url(./snow.jpg);
}
.day {
  background-size: cover;
  background-repeat: no-repeat;
}
.night {
  background-size: cover;
  background-repeat: no-repeat;
  clip-path: polygon(100vw 0, 0% 0vh, 100vw 100vh);
  filter: brightness(0.6);
}
```

![三角形背景](https://raw.githubusercontent.com/Canace22/Assets/main/images/triggle-bg.png)

### 三、背景图叠加渐变

```css
.gradient {
  background-image: linear-gradient(
      4deg,
      rgba(38, 8, 31, 0.75) 30%,
      rgba(213, 49, 127, 0.3) 45%,
      rgba(232, 120, 12, 0.3) 100%
    ), url('./snow.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}
```

![背景图叠加渐变](https://raw.githubusercontent.com/Canace22/Assets/main/images/gradient-bg.png)

### 四、背景颜色切换动画

```css
/* clolor animate */
.color-animateion {
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  animation: background-overlay-animation 1s ease-in-out infinite;
}
@keyframes background-overlay-animation {
  0% {
    background-image: linear-gradient(
        4deg,
        rgba(255, 78, 36, 0.3) 50%,
        rgba(255, 78, 36, 0.3) 100%
      ), url('./snow.jpg');
  }
  25% {
    background-image: linear-gradient(
        4deg,
        rgba(213, 49, 127, 0.3) 50%,
        rgba(213, 49, 127, 0.3) 100%
      ), url('./snow.jpg');
  }
  50% {
    background-image: linear-gradient(
        4deg,
        rgba(36, 182, 255, 0.3) 50%,
        rgba(36, 182, 255, 1) 100%
      ), url('./snow.jpg');
  }
  100% {
    background-image: linear-gradient(
        4deg,
        rgba(0, 255, 254, 0.3) 50%,
        rgba(0, 255, 254, 0.3) 100%
      ), url('./snow.jpg');
  }
}
```
![背景颜色切换动画](https://raw.githubusercontent.com/Canace22/Assets/main/images/bg-animation.gif)

### 五、网格背景

```html
<div class="container">
  <div class="item_img"></div>
  <div class="item"></div>
  <div class="item_img"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item_img"></div>
  <div class="item"></div>
  <div class="item_img"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item_img"></div>
  <div class="item"></div>
  <div class="item_img"></div>
  <div class="item"></div>
  <div class="item_img"></div>
  <div class="item"></div>
</div>
```

```css
/* 网格背景图 */
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(255, 235, 192);
  display: grid;
  grid-template-columns: 25fr 30fr 25fr 20fr;
  grid-template-rows: 20fr 45fr 5fr 30fr;
}
.item_img {
  background-image: url('./24.jpeg');
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
}
```

![网格背景](https://raw.githubusercontent.com/Canace22/Assets/main/images/grid-bg.png)

### 六、图像设置为文本颜色

```html
<body class="center>
  <h1 class="img-color">Hello world!</h1>
</body>
```

```css
/* 把图像设置为文本颜色 */
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
  min-height: 100vh;
  font-size: 120px;
  font-family: Arial, Helvetica, sans-serif;
}
.img-color {
  background-image: url('./24.jpeg');
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

![图片底色文字](https://raw.githubusercontent.com/Canace22/Assets/main/images/bg-text.png)

### 七、背景图半透明叠加

使用 cross-fade 函数通过背景融合的方式实现背景图的效果，目前只支持 (url1, url2, percent) 的方式，(url percent, url percent) 这种方式试了下，没效果。

```css
.cross-fade-image {
  width: 300px; 
  height: 300px;
  background: no-repeat center / contain;
  background-image: -webkit-cross-fade(url(beach.jpeg), url(pet.png), 65%);
  background-image: cross-fade(url(beach.jpeg), url(pet.png),65%);   
}
```

![背景图半透明叠加示例](https://raw.githubusercontent.com/Canace22/Assets/main/images/bg-semi-transparent.png)
