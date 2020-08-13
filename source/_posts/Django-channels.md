---
title: Django-channels
date: 2018-05-20 16:43:09
categories: 服务端
tags:  python
comments: true
---

写在前面，这个项目用到了 py 的全能框架 Django 来写 web 界面，其中引用了一个通道插件 Django Channel。Django Channels 是为了解决 Django 只发送一个调用视图请求，却不断发送数据到客户端的问题而存在的。Django Channels 的实现机制大概是：生产者把消息推到通道队列中，再通过通道队列把消息传递给消费者之一。

<!--more-->

##### 一、 关于 Django 实现实时聊天应用

Django 实现实时聊天应用一共分为以下几步：

1. 定义一个模型，用来表示聊天室和其中的消息；

2. 创建聊天室视图以及相应的 urls.py 和模板；

3. 定义一个通道层；

4. 创建通道路由；

5. 替换 Django 的基于 HTTP/WSGI 的请求处理器；

6. 运行应用

##### 二、 项目目录

主要包括以下文件。

1. **urls.py** 是 Django 项目的 URL 声明，配置目录映射。

2. **_init_.py** 是一个空文件，告诉 python 该目录事一个 python 包。

3. **setting.py** 是 Django 项目的配置文件，包括 template 模板 path 设置之类的。

4. **wsgi.py** 是 WSGI 兼容的 Web 服务器入口。

5. **asgi.py** 文件用于替换 Django 的基于 HTTP/WSGI 的请求处理器。

6. **production.py** 创建队列消息。

7. **logger.py** 提供 log 接口，记录 log，这里可以直接这么用，是因为在 setting 里已经配置过 logging 了。

##### 三、 网页文件

主要网页文件，相当于 Django 框架的一个应用实例，通过 urls.py 可以映射到该文件夹并进行页面或者函数的调用。

1. **admin.py** 文件调用了 Django 的网站后台管理模块，主要使用方式是在 Django 框架的 url.py 中映射路径，激活该功能。

2. **apps.py** 配置应用信息.

3. **consumer.py**

   (1) 首先检测有没有新的请求要求打开 WebSocket,有的话,记录该请求产生的房间并给出回应。

   (2) 接着，检测有没有新的消息请求，有的话，先把它转换为 json 字段，然后把它放入消息队列，并给出回应，这个过程会一直执行，知道接下来收到客户端发出的结束请求为止。简言之，这个文档就是实现线程通信的，俗称实时通信。

4. **routing.py** 通信路由，用于连接 WebSocket。

5. **view.py** 视图页，渲染前端页面。

6. **accounts 文件夹** 是用户组件。

##### 四、 tensorflow 组件

主要是用了 tensorflow 进行人机交互。
