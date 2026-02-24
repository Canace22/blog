---
title: python2 => python3 踩坑集合
description: 'Python2 迁移 Python3 时注意模块重命名和废弃方法，如 md5 改为 hashlib，urlparse 改为 urllib.parse，setdefaultencoding 和 Queue 需注释或替换。'
comments: true
date: 2018-06-08 09:47:51
categories: Web开发
tags: [后端, Python/Go/其他]
---

python2 => python3 踩坑集合

<!--more-->

### 1. 报错内容：

ModuleNotFoundError: No module named 'md5'

#### 解析：

这是 python2 的库，python3 已经把它包含进 hashlib 库里了

#### 解决方法

直接把对 md5 库的引用语句注释掉，改为引用 hashlib 库

### 2. 报错内容：

AttributeError: module 'sys' has no attribute 'setdefaultencoding'

#### 解析：

python2 的默认字符编码为 ASCII 编码，所以有 setdefaultencoding 这个方法转换为 utf-8 编码，而 python3 的默认字符编码是 unicode 编码，这种编码本身支持汉字，所以就不存在上述方法了

#### 解决方法

直接把该语句注释掉

### 3. 报错内容：

ModuleNotFoundError: No module named 'urlparse'

#### 解析：

urlparse 是 python2 的库，python3 已经把这个库重命名为 urllib.parse 了

#### 解决方法

把对 urlparse 库的引用语句注释掉，改为引用 urllib.parse 库

### 4. 报错内容：

ModuleNotFoundError: No module named 'urlparse'

#### 解析：

urlparse 是 python2 的库，python3 已经把这个库重命名为 urllib.parse 了

#### 解决方法

把对 urlparse 库的引用语句注释掉，改为引用 multiprocessing 库里了

### 5. 报错内容：

ModuleNotFoundError: No module named 'Queue'

#### 解析：

Queue 是 python2 的库，python3 已经把这个库加到 multiprocessing 里了

#### 解决方法

把对 Queue 库的引用语句注释掉，改为引用 `from multiprocessing import Queue`
