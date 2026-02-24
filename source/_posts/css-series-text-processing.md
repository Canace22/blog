---
title: CSS 系列文章 —— 文本处理
categories: Web开发
tags: [前端, CSS与可视化]
comments: true
toc: true
date: 2020-09-04 09:15:17
---
### 一、font-size

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

![Windows 中常见内置中文字体和对应英文名称](https://raw.githubusercontent.com/Canace22/Assets/main/images/win-font.png)

5、**OS X 常见内置中文字体和对应英文名称**

![OS X 常见内置中文字体和对应英文名称](https://raw.githubusercontent.com/Canace22/Assets/main/images/osx-font.png)
 
### 三、font-weight

数字关键字, 100 - 900, 100为一个档，400 对应 normal, 700对应 bold，其他数值根据字体支持，才有不同的变化

### 四、word-break

单词拆分换行控制，主要属性值有下面几个：

(1) normal: 使用默认的换行规则

(2) break-all: 允许任意非 CJK(Chinese/Japanese/Korean)文本间的单词断行

(3) keep-all: 不允许 CJK 文本中的单词换行，只能在半角空格或连字符处换行, 非 CJK 文本的行为和 normal 一致

### 五、word-wrap

单词换行控制, 主要属性如下:

(1) normal: 正常的换行规则

(2) break-word: 一行单词中实在没有其他靠谱的换行点的时候换行

### 六、white-space

控制空白字符的显示和自动换行机制, 主要属性值如下:

(1) normal: 默认值， 合并空白字符和换行符，会自动换行

(2) pre: 空白字符和换行符保持原状, 不会自动换行

(3) nowrap: 空格被合并，换行符无效，不会自动换行

(4) pre-wrap: 保留空格和换行符，且可以自动换行

(5) pre-line: 合并空白字符，保留换行符，会自动换行
 
### 七、伪类 vs 伪元素

伪元素前接 ::, 伪类前接 :

参考文章:

《CSS 世界》

[彻底搞懂word-break、word-wrap、white-space](https://juejin.im/post/6844903667863126030)