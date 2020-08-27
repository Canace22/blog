---
title: CSS 系列文章 —— 文本处理
categories: web
tags: css
comments: true
toc: true
date: 2020-08-27 11:29:17
---
### 一、font-sizie

chrom 默认有字体限制最小是 12px，也就是小于 12 px 的字号都相当于 12px，但是 font-size: 0 例外，还是会保持为 0，利用这个特性可以实现可访问性隐藏

### 二、font-family

1、属性值可以是字体家族也可以是字体名，字体名需要写在字体家族前面，否则在 chrom 下只有字体家族会生效

2、字体名有空格的话，需要用引号包起来，多个字体名用逗号隔开

3、**字体家族**

(1) **衬线字体 vs 非衬线字体**

  - 衬线字体(serif), 笔画开始、结束的地方有额外装饰而且笔画的粗细会有所不同，比如中文的宋体，英文的 Times New Roman、Georgia 

  - 非衬线字体(sans-serif), 没有额外的装饰，而且笔画的粗细差不多, 比如微软雅黑

(2) **等宽字体(monospace)**

  - 每一个字符宽度一样

  - 应用
    
    - 代码呈现
    
    - 图形绘制
    
    - 与 ch 配合，做一个一个出现的动效

4、**Windows 中常见内置中文字体和对应英文名称**

![Windows 中常见内置中文字体和对应英文名称](/images/win-font.png)

5、**OS X 常见内置中文字体和对应英文名称**

![OS X 常见内置中文字体和对应英文名称](/images/osx-font.png)
 