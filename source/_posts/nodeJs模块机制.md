---
title: nodeJs 模块机制
categories: Web开发
tags: nodeJs
comments: true
date: 2021-06-28 20:35:31
---
在讲模块机制之前，先来说说 CommonJs 规范，我们知道在打包的时候经常会看到 cjs 这个选项，这里的 cjs，我自己之前是一直以为就是commonJs，实际上这是 node 对 CommonJs 的实现，是 node 的模块机制。

ComonJs 规范范围除了模块规范之外，还有二进制、Buffer、字符集编码、I/O 流、进程环境、文件系统、套接字、单元测试、Web 服务器网关接口以及包管理等规范。

既然 node 模块机制是 CommonJs 的一种实现，那么 CommonJs 的模块规范是怎样的呢？CommonJs 的模块规范主要做了如下定义：

**模块引用**：通过 require 引入模块

**模块定义**：module 对象代表模块自身，通过 exports 属性导出当前模块的变量或对象

**模块标识**：必须是符合小驼峰命名的字符串，或者是文件路径（相对路径、绝对路径）

接下来讲讲 nodeJs 的模块机制是怎么实现的，当我们用 require 引入某个模块时，会经历以下三个过程：路径分析，文件定位以及编译执行。再来讲讲每个步骤分别发生了什么。

**路径分析**

- 核心模块，加载速度快，加载优先级仅次于缓存加载
  
- 路径形式的文件模块：把路径转换为真实路径

- 自定义模块：沿当前路径往上逐级递归查找，最深可以查找到根目录下的 node_modules，由于路径查找速度比较慢，所以加载速度也会比较慢

基于以上因素，为提高模块加载速度，在模块引入时，引入顺序应该为：核心模块 -> 路径形式的文件模块 -> 第三方模块

**文件定位**

- 模块标识不含文件扩展名，按照 .js，.json，.node 的优先级补充扩展名，该过程是阻塞式的引入，因此 .json, .node 文件带上扩展名，可以加快加载速度

- 若模块标识不是文件名，查找当前目录下的 package.json 文件，把 main 属性的值作为文件路径进行定位
  
- 若当前目录下不存在 package.json 文件，把模块标识当成一个目录名称，将 index 作为模块默认文件名，找不到模块会抛出查找失败错误    

**编译执行**

- 新建模块对象，模块对象的定义如下           

```js
function Module(id, parent) { 
  this.id = id;
  this.exports = {}; 
  this.parent = parent;
  if (parent && parent.children) {
    parent.children.push(this);
  }
  this.filename = null; 
  this.loaded = false; 
  this.children = [];
  this.paths = []
  this.path = null
}
```

- 根据路径载入文件并编译，不同文件的载入方式不同
  
  - .js 文件通过 fs 模块同步读取后编译
  
  - .node 文件通过 dlopen 方法加载编译后的二进制文件

  - .json 文件，通过 fs 模块同步读取后，使用 JSON.parse 解析返回结果

  - 其他都按 .js 文件载入

- 编译成功的文件模块，以文件路径为索引，缓存到 Module._cache 对象上，核心模块缓存到 NativeModule._cache对象上

参考文献：

深入浅出 nodeJs