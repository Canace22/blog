---
title: HTTP 笔记
categories: web
tags: 网络
comments: true
toc: true
date: 2021-05-17 09:00:47
---
## 一、HTTP 1.0

1. 每请求一个资源都要新建一个TCP连接，而且是串行请求，性能比较差
   
2. 缓存相关头部：Expires, If-Modified-Since

## 二、HTTP 1.1

1. 缓存处理，新增 cache control 机制，协商缓存策略新增 Etag/If-none-match和Last-Modified/If-modified-since(If-Unmodified-Since)

2. 支持断点续传，请求头引入了range头域，允许只请求资源的某个部分，成功返回的状态码是206

3. 错误处理，HTTP1.1 新增24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除

4. 支持代理，要求必须有HOST头域，没有Host头域会抛出错误（400 Bad Request），使用HOST 头域的好处是当我们有多个指向同一个IP 的域名时，服务器可以通过这个值去判断我们想要请求的具体是哪一个网站

5. 支持长连接和 Pipelining 请求，默认开启 Connection： keep-alive, 这意味着可以在一次连接成功的基础上发送多个请求，解决了 HTTP 1.0 由于 TCP 慢启动带来的性能问题

6. 新增 OPTIONS 方法，用于实现 CORS 的请求预检

7. 新增 100 状态码，对于大体积文件，不确定服务端能否处理，客户端可以在发送请求实体前, 先发送一个带有 Expect: 100-continue 首部的请求，接收到 100 Continue 响应状态码才继续相关请求

## 三、HTTP 2.0

1. 采用二进制格式进行协议解析

2. 多路复用，一个连接开启多个请求，请求并行执行，弥补了浏览器限制请求数，http 1.1 请求队列阻塞等问题

3. 服务端推送，推送请求相关的静态资源，提升页面加载速度

4. header 压缩

5. 完全兼容HTTP1.x的语义

## 四、HTTP 3.0

使用基于UDP协议的QUIC协议

参考文献：

[HTTP1.0、HTTP1.1 和 HTTP2.0 的区别](https://juejin.cn/post/6844903489596833800)

[HTTP 1.0 vs 1.1](https://stackoverflow.com/questions/246859/http-1-0-vs-1-1)