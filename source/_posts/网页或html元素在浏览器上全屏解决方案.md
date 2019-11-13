---
title: 网页或html元素在浏览器上全屏解决方案
comments: true
date: 2019-02-20 15:05:52
categories: web
tags: js
---

1. **全屏是什么**：

   个人理解，全屏指的是去掉浏览器的导航栏，浏览器的全部空间被页面所占有，网页即 html 文档，网页全屏即 dom 全屏

2. 不同的浏览器又不同的全屏事件可以调用，但是不同浏览器的全屏事件并不一致，因为还没被写入规范中，所以需要判断在特定的浏览器下，哪个事件可以用，以下是全屏事件的封装：

   ```js
   // el 是需要全屏的 dom
   requestFullscreen(el: Element): void {
     if (el.requestFullscreen) {
       el.requestFullscreen();
     } else if (el.mozRequestFullScreen) {
       el.mozRequestFullScreen();
     } else if (el.webkitRequestFullscreen) {
       el.webkitRequestFullscreen();
     } else if (el.msRequestFullscreen) {
       el.msRequestFullscreen();
     }
   }
   ```

3. 网页全屏之后，还需要退出全屏，退出全屏的方式有多种，比如按 esc 键退出全屏，点击全屏按钮退出全屏等，其中按 esc 退出全屏，一般的浏览器在打开了全屏之后，都可以进行这个操作，不需要人工另外操作。点击按钮退出全屏，需要调用到关闭全屏的事件，同样，在不同的浏览器有不同的实现，需要一一进行判断，封装的事件如下：

   ```js
   // document 即 html 文档，不需要改变
   exitFullscreen(): void {
     if (document.exitFullscreen) {
       document.exitFullscreen();
     } else if (document.mozCancelFullScreen) {
       document.mozCancelFullScreen();
     } else if (document.webkitExitFullscreen) {
       document.webkitExitFullscreen();
     } else if (document.msExitFullscreen) {
       document.msExitFullscreen();
     }
   }
   ```

4. **如何判断是否处于全屏状态？**

   要判断是否处于全屏的状态，需要调用到相关的浏览器事件，在不同的浏览器，实现方式也不尽相同，因此同样需要判断，封装的代码如下：

   ```js
   // 判断全屏元素是否存在，并返回相应的项
   fullscreenElement(): Element {
     return (
       document.fullscreenElement ||
       document.webkitFullscreenElement ||
       document.msFullscreenElement ||
       document.mozFullScreenElement ||
       null
     );
   }
   // 判断是否处于全屏状态
   isFullScreen() {
     return !!(document.webkitIsFullScreen || this.fullscreenElement());
   }
   ```
