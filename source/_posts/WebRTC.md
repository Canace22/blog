---
title: WebRTC
categories: Web开发
tags: JavaScript&TypeScript
comments: true
date: 2022-02-10 11:29:24
---
浏览器点对点传输无效的原因：
- 穿透阻止直连的防火墙失败
- B 端没有公网 IP
- 路由器不支持直连，需要加一个中继服务器

## NAT
NAT(Network Address Translation)指的是网络地址转换，常部署在一个组织的网络出口位置
类型：完全圆锥型NAT、受限圆锥型NAT和端口受限圆锥型NAT，对称型NAT（前三种可以通过 STUN 穿透）
穿越技术、方法主要有：
- 应用层网关；
- 中间件技术；
- 打洞技术(Hole Punching)；
- Relay(服务器中转)技术。

## STUN 
STUN（Session Traversal Utilities for NAT，NAT会话穿越应用程序），是基于UDP的完整的穿透NAT的解决方案
公网寻址 
作用机制，客户端发送消息给 STUN 服务器，服务器返回该客户端的公网地址和该客户端位于哪种类型的NAT之后以及NAT为某一个本地端口所绑定的公网端端口

## TURN
TURN（Traversal Using Relay NAT，通过Relay方式穿越NAT），是一种数据传输协议
原理与 STUN 类似，主要用在使用STUN无法穿透的场景下

## ICE 
ICE（Interactive Connectivity Establishment，互动式连接建立）。ICE定义了穿越方法而不是协议。ICE整合了STUN与TURN。ICE使用STUN进行打洞，若失败，则使用TURN进行中转。
一个支持浏览器点对点连接的协议框架，使用 STUN 或 TURN 作为中继服务器，实现 NAT 穿透，进行点对点连接
建立连接步骤：收集候选地址 => 连通性检查 => 数据传输

## signaling 

参考文献：
[WebRTC音视频传输基础：NAT穿透](https://blog.jianchihu.net/webrtc-av-transport-basis-nat-traversal.html#toc-10)
[webrtc官方文档](https://webrtc.org/getting-started/overview?hl=en)
[WebRTC API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API)