---
title: 前端性能优化
description: '减少请求次数和优化资源加载是提升前端性能的关键，避免冗余代码和图片压缩同样重要。'
date: 2018-10-22 19:54:10
categories: 工程化与运维
tags: 性能优化
toc: true
comments: true
---

### 一、内容优化

1、减少 HTTP 请求数:这条策略是最重要最有效的，因为一个完整的请求要经过 DNS 寻址，与服务器建立连接，发送数据，等待服务器响应，接收数据这样一个消耗时间成本和资源成本的复杂的过程。常见方法：合并多个 CSS 文件和 js 文件，利用 CSS Sprites 整合图像，Inline Images(使用 data：URL scheme 在实际的页面嵌入图像数据 )，合理设置 HTTP 缓存等。

2、减少 DNS 查找

3、避免重定向

3、使用 Ajax 缓存

4、延迟加载组件,预加载组件

5、减少 DOM 元素数量:页面中存在大量 DOM 元素,会导致 javascript 遍历 DOM 的效率变慢。

6、最小化 iframe 的数量：iframes 提供了一个简单的方式把一个网站的内容嵌入到另一个网站中。但其创建速度比其他包括 JavaScript 和 CSS 的 DOM 元素的创建慢了 1-2 个数量级。

7、避免 404：HTTP 请求时间消耗是很大的，因此使用 HTTP 请求来获得一个没有用处的响应（例如 404 没有找到页面）是完全没有必要的，它只会降低用户体验而不会有一点好处。

### 二、服务器优化

1、 使用内容分发网络（CDN）：把网站内容分散到多个、处于不同地域位置的服务器上可以加快下载速度。
  
2、GZIP 压缩

3、设置 ETag：ETags（Entity tags，实体标签）是 web 服务器和浏览器用于判断浏览器缓存中的内容和服务器中的原始内容是否匹配的一种机制。

4、提前刷新缓冲区
  
5、对 Ajax 请求使用 GET 方法

6、避免空的图像 src

### 三、Cookie 优化

1、减小 Cookie 大小

2、针对 Web 组件使用域名无关的 Cookie

### 四、javascript 优化

1、将 JavaScript 脚本放在页面的底部。

2、将 JavaScript 和 CSS 作为外部文件来引用：在实际应用中使用外部文件可以提高页面速度，因为 JavaScript 和 CSS 文件都能在浏览器中产生缓存。

3、缩小 JavaScript 和 CSS

4、删除重复的脚本

5、最小化 DOM 的访问：使用 JavaScript 访问 DOM 元素比较慢。

6、开发智能的事件处理程序

7、javascript 代码注意：谨慎使用 with,避免使用 eval Function 函数,减少作用域链查找。

### 五、图像优化

1、优化图片大小

2、通过 CSS Sprites 优化图片

3、不要在 HTML 中使用缩放图片

4、favicon.ico 要小而且可缓存
