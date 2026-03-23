---
title: html 笔记
description: 'html 基础元素要闭合，标签小写，常用标签如 a、p、img 等需注意属性使用和嵌套规则。'
comments: true
date: 2019-01-22 13:58:20
categories: Web开发
tags: 前端
---

html 笔记

<!--more-->

## 一、html 是什么？

1. html 是使用标记标签来描述网页的一种标记语言。

2. html 文档 = 网页。

3. 除了空元素，其他元素都要闭合

4. 推荐使用小写

5. 大多数元素具有以下属性：class、id、style、title

## 二、常用元素：

1. 标题：h

2. 段落：p

3. 图形：img、canvas

4. 链接：a

   A. 新的浏览器中打开链接（target=“\_blank”)

   B. 链接到同一个页面的不同位置：

   ```
   <a href="#C4">查看 Chapter 4。</a>
   <a name="C4">Chapter 4</a>
   ```

   C. 创建邮件链接：

   ```
   <a href="mailto:someone@microsoft.com?subject=Hello%20again">发送邮件</a>
   ```

5. 水平线：hr

6. 折行：br

7. 文本格式化：b（粗体）、em（强调）、i（斜体）、small（小号）、strong（加重语气）、sub（下标字）、sup（上标字）、ins（插入字）、del（删除字）

8. 预格式文本：pre

9. 地址：address

10. 块引用：blockquote

11. 著作标题：cite

12. 表格：table、caption（标题）、tr（行）、th（表头）、td（单元格）、colspan（跨行属性）、rowspan（跨列属性）、cellpadding（单元格间距）、

13. 列表：ul（无序列表，type：disc、circle、square）、ol（有序列表，type：A、a、I、i）、li（列表项）

14. 语义元素：header（页眉）、nav（导航链接的容器）、section（章节）、article（独立的文章）、aside（侧栏）、footer（页脚）

15. 表单：form(action、method, target)、[input]('http://www.w3school.com.cn/html/html_form_input_types.asp')(name、value、输入限制、输入类型)、select、option（selected）、textarea、button、datalist

16. 媒体元素：audio、embed、video

17. 其他：div、span

## 三、元素分类：

1. 块级元素：在浏览器显示时，通常会以新行来开始和结束

2. 内联元素：内联元素在显示时通常不会以新行开始

## 四、url 组成：scheme://host.domain:port/path/filename

1. scheme - 因特网服务的类型。最常见的类型是 http， 还包括：https、ftp、file

2. host - 域主机（http 的默认主机是 www）

3. domain - 域名，比如 w3school.com.cn

4. :port - 端口号（http 的默认端口号是 80）

5. path - 服务器上的路径（如果省略，则文档必须位于网站的根目录中）。

6. filename - 文档/资源的名称

## 五、HTML 图形

1. canvas：

   (1) 本质：创建画布，使用 JavaScript 画布上绘制图像，本身不具备绘图功能。

   (2) 绘图步骤：获取元素(getContext("2d")) => 设置形状、样式等

   (3) 常用属性：fillStyle、

   (4) 常用事件：getContext、fillRect、moveTo、lineTo、stroke、beginPath、arc、closePath、fill、createLinearGradient、drawImageaddColorStop

2. svg：

   (1) 本质：可伸缩的矢量图形

   (2) 图形创建方式：使用 xml 定义

   (3) 特性：图像在放大或改变尺寸的情况下其图形质量不变

## 其他

1. 响应式 web 设计（RWD，Responsive Web Design）， 是能够以可变尺寸传递网页的一种网页布局模式。

2. 实体符号：[http://www.w3school.com.cn/html/html_entities.asp](http://www.w3school.com.cn/html/html_entities.asp)
