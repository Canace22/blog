---
title: 用 Cursor 提高工作效率实战笔记
categories: 拓展领域
tags: AI
description: 总结最近一段时间使用 Cursor 的体会，记录一些使用经验
author: Canace
toc: true
comments: true
date: 2025-03-11 09:11:33
---

最近全民 AI 热，跟朋友交流了一下，发现自己好像有点落后了，还在用 VSCode + Codium 这种代码补全模式和 VSCode Snippet，这种模式已经提升了不少工作效率，但是相比于 Cursor 的 Agent 模式，感觉差别还是比较大的。下面做一个粗略的介绍，然后从几个方面来讲讲 Cursor 可以从哪些方面提高开发人员的工作效率。

## 一、入门

### 1. Cursor 是什么

Cursor 是基于开源编辑器 VSCode 写的，基本继承了 VSCode 的所有特性，包括界面，快捷键等，用法基本跟 VSCode 一致。 有人也许会说，我们已经用习惯 VSCode 了，为什么要切换到 Cursor 呢？要说利用 AI 进行代码补全、重构、生成测试用例等，VSCode 通过安装插件也能做到，这就不得不提到 Cursor 的 Agent 模式了。截止到我写这篇文章，查了一下，VSCode 暂时是没有官方实现 Agent 模式的。

### 2. 为什么要使用 Cursor

我们已经用习惯 VSCode 或其他编辑器，为什么要切换到 Cursor 呢？要说利用 AI 进行代码补全、重构、生成测试用例等，VSCode 通过安装插件也能做到，这就不得不提到 Cursor 的 Agent 模式了。截止到我写这篇文章，查了一下，VSCode 暂时是没有官方实现 Agent 模式的。

Agent 模式强大在哪里？先让我们来回顾一下近几年 AI 的发展历程：一开始是纯文字的多轮对话，就算是生成周报这种也只是加长上下文、加入 rag 召回。后来大家发现，langchain + tools 这种模式可以做 AI 技能，这样每次跟 AI 对话会判断要调哪个 tool ，这就是豆包那些划词翻译、解释、总结的基础。然后就是基于这些去做自动化，比如 computer-use / browser-use ，最近很火的 manus 也是这样的。

![image](https://Canace22.github.io/picx-images-hosting/20250321/image.6pno6y8qct.webp)

Cursor Agent 模式本身的厉害之处在于，它能够选择合适的代码片段给 AI ，利用 AI 做代码补全和生成，它会帮你根据当前代码库实现功能，所有关联的文件都会改，还会创建还原点让我们可以恢复回去，相当于是真正的有人在代理你写代码了，而不是你指导他写，就像网上有个梗：不要指导 AI 干活，让 AI 自己做决定干什么。

### 3. 初始化环境

- 安装：根据自己的环境[下载](https://www.cursor.com/)，安装好后会自动同步本地 VSCode 的配置到 Cursor，若本地没有用过 VSCode，可以参照我的[这篇文章](https://canace.site/%E7%94%A8vscode%E6%90%9E%E4%BA%8B%E6%83%85/)配置一个。另外，应该大家都知道 VSCode 可以同步配置到不同终端吧，之前配置过的话，登录一下，也能把配置更新到本地，同步到 Cursor。
- mac 默认是没有右键打开的，需要用 Automator 配置一下点击文件或文件夹右键用 Cursor 打开项目或文件(具体的操作自己问 AI)。Windows 安装的时候各种都通过交互式对话框帮我们配好了，一路 next 就好了。

### 4. 使用指南

- 常用默认快捷键

```bash
Cmd/Ctrl + K # 输入自然语言描述,生成代码
Cmd/Ctrl + L # 打开聊天框，进行提问和调试
```

- 定义响应规则

我们可以通过设置 rules 来自定义 AI 的行为，比如让他默认用中文回答问题，除此之外还可以针对不同的项目设置不同的规则。

![cursor-rules](https://Canace22.github.io/picx-images-hosting/20250321/cursor-rules.2rvaq7smgf.webp)

- tips

```md
聊天框都可以使用 @ 或 # 链接上下文

在函数上方输入 ///，自动生成注释
```

更多想想内容可以看看[官网指南](https://docs.cursor.com/get-started/introduction)

## 二、从 0 到 1 编写前端项目

### 1. 前端项目初始化

使用 Cursor Agent 模式初始化前端项目，相比于使用脚手架更加便捷，只需要输入我们想要的配置即可，省去了繁琐的操作步骤。 比如我们输入 【初始化 web 前端项目，要求：使用 element-plus+vue3，vue3 使用 Composition API，css 预编译器使用 scss，打包工具使用 webpack，需要生成 readme 文件】，只需要在 Agent 生成完项目文件后 <accept all> 就初始完一个完整的前端项目了。

但是这只针对熟练了解前端技术的开发人员提高工作效率，对于前端小白，还是使用多轮对话的方式逐步细化自己需求才能达到这个效果。从这里可以看出，要用好工具，首先需要具备一些专业知识才能更好的提高效率。

### 2. 根据图片生成响应式页面

#### 上传图片+prompt

【@frontend 根据图片生成响应式 web 页面】上传图片获取页面描述。以上提示词也会写一些页面代码，但是有时候不准确，我们根据他返回的描述再去让他生成，会更加精准，因为大模型的描述更有条理，也更符合规范。接着输入以上描述，生成响应式 UI 界面，调一调就能看到效果啦。

这里顺带提一下低代码，我们知道低代码这个概念已经出现一段时间了，曾经火了一阵子，很快热度就下去了，很多公司和开源项目都做了实践，但是真正完全用这一套的比较少。我想过为什么低代码或者说无代码为什么火不起来，没想明白，最近看了一篇文章，感觉恍然大悟。界面应该是遵循底层函数标准生成的，而不是本末倒置，先生成代码，再不断的改底层去适配上层 UI，这样反而会加大我们的工作量，效率更低下，所以在实际项目中，我们虽然也说自己是低代码，但是实现逻辑跟拖拉拽生成代码的逻辑都是反过来的，我们先从底层支持各种 UI 组件，然后上层拖拉拽，让用户自己拖出想要的界面再去保存起来，这样的逻辑是对的。

![image](https://Canace22.github.io/picx-images-hosting/20250321/image.51eb9rhck5.webp)

那么我们这里说到的使用 AI 进行图片转代码，跟低代码有什么不同呢？看起来好像没什么不同，但是如果用 Agent 模式，基于我们的项目上下文进项 UI 代码生成，就有点我们上面说的用户拖拉拽生成界面的味道了，本质上还是调用我们实现的 UI 组件，去生成界面，在我看来这是没毛病的，相比低代码，确实是能提升我们的工作效率。图片生成界面只适用于快速出原型，具体的交互还是得我们指导 AI 一步步去实现，然后微调。所以我觉得，AI 可以是我们的影子军队，但是短时间内是绝对做不了暗影君王自己去打怪升级的。

#### figma + mcp server

Cursor 另一个比较强大的功能是支持配置 MCP（Model Context Protocol） 服务，这可以极大的增强对话上下文，这里以一个开源的 MCP 服务 [Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP?tab=readme-ov-file) 为例，看看使用 MCP 服务能做什么。

要使用 Figma-Context-MCP，我们需要进行以下几个设置

```bash
# 使用 npm 在本地跑 server
npx figma-developer-mcp --figma-api-key=<your-figma-api-key>

# or
pnpx figma-developer-mcp --figma-api-key=<your-figma-api-key>

# or
yarn dlx figma-developer-mcp --figma-api-key=<your-figma-api-key>

# or
bunx figma-developer-mcp --figma-api-key=<your-figma-api-key>
```

```json
// 打开 Cursor 的设置，配置刚刚起的 MCP服务
{
  "mcpServers": {
    "server-name": {
      "url": "http://localhost:3333/sse",
      "env": {
        "API_KEY": "your-figma-api-key"
      }
    }
  }
}
```

设置完之后会看到配置界面长这样

![MCP 配置成功](https://Canace22.github.io/picx-images-hosting/image.491frxekup.webp)

配置成功之后，就可以在 agent 模式下使用了，比如这样【@frontend  create a Response component base on @https://www.figma.com/design/6Vr41TIAkUhRv1LVQWAcFb/【devops】报表?node-id=7-636&t=dgsm1GzcryfWHhPe-4 】生成的界面感觉还行

![基于项目生成的代码](https://Canace22.github.io/picx-images-hosting/image.ica6pq05y.webp)

![figma 原设计](https://Canace22.github.io/picx-images-hosting/20250321/image.2ks2usjt4s.webp)

![生成的界面](https://Canace22.github.io/picx-images-hosting/image.7i0jom4fdz.webp)

### 3. 在新的文件中仿写之前实现过的逻辑

要在新的文件中仿写之前实现过的逻辑，可以这样跟 Cursor 说【基于 @Index.vue 完善 @MsgCard.vue 组件中 dev-trigger-ref 相关功能】

![image](https://Canace22.github.io/picx-images-hosting/20250324/image.67xmmnzxgq.png)

### 4. 懒人文档更新助手

Cursor 可以基于我们的代码生成文档，也可以根据我们的需求做更改，生成的文档质量可能不是那么高，没法很好的表达，但是对于章节结构类类的更新，组件、函数说明等可以说是懒人神器了，可以直接让 Cursor 改或者让它改完我们做一个微调。

### 5. 从 0 到 1 实践新技术

前端技术几年一大变，各种技术五花八门，有时候我们的项目可能会涉及到一些我们没怎么接触过的技术，这时候我们按照以往阅读文档，慢慢自己摸索写 demo 的方式可能要花点时间。实践出真知，Cursor 可以用他清晰的逻辑，带我们一步一步操作，附带解释，充当师傅领进门里的师傅，带我们快速通过项目，了解一门新技术。比如我最近想了解AI聊天工具是怎么开发出来的，我可以跟他说【@index.js 基于qwen.js，使用langchain + tools调用大模型，实现两个工具功能：天气查询和地理位置查询，并添加聊天对话界面】，他就会输出一段 demo 加上说明，稍加调试，一个可用的聊天应用 demo 就出来了。

## 三、更多实践

### 1. 运维助手

上面的 MCP 服务，对于运维小白的我来说，要写个脚本部署到云端是比较难的，脚本命令规则太多了，记不住，我得各种查资料，可能得花不少时间才能成功部署完成，但是如果使用 Cursor，我可以在十分钟内就部署好一个可用的 MCP 服务

- 编写部署脚本

![image](https://Canace22.github.io/picx-images-hosting/20250324/image.4qrhkuga9e.webp)

- 编写本地测试脚本

![image](https://Canace22.github.io/picx-images-hosting/20250324/image.6ikgfrcs3d.webp)

### 2. 查找 Bug

使用 Cursor Agent 模式可以很方便的做调试，修复命令行报错，只需要 @terminal，选择对应的终端，可以找到对应的错误并修复

参考文献

[Visual programming is stuck on the form](https://interjectedfuture.com/visual-programming-is-stuck-on-the-form/)

[Cursor 官网指南](https://docs.cursor.com/get-started/introduction)

[现成的MCP服务资源](https://mcp.so/)

[一些开源的 MCP 服务](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file)