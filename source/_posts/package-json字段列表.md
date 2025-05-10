---
title: NPM Package.json 字段列表(包括非官方字段)
categories: web
tags: npm
comments: true
toc: true
date: 2020-09-02 16:58:59
---
得空看看一些源码，发现 Package.json 文档里有些字段是不常见的，自然也不知道配置的是什么，查[官方文档](https://docs.npmjs.com/files/package.json.html), 发现有些找不到，看到一篇不错的英文文档，翻译一下，以后好查看。

### 一、基本字段

#### 1、name

自如其名，不多加解释，这个字段的使用需要注意一下几个要点

(1) 若项目是要作为包发布到 npm 上的话，需要是独一无二的名字

(2) 若要发布的包隶属于某个机构或者私有仓库，需要在前面加上@组织名称，比如这样, @ebag/exp-ui

(3) 名称总字符长度不能超过 214

(4) 不能以大写字母、斜划线或者点开头

(5) 只能使用 url 安全字符，因为我们的名称可能会被别人在终端使用，比如: `npm i lyp-pagination` 或者 'https://www.npmjs.com/package/lyp-pagination'

#### 2、version

version 跟 name 组成已发布包的每个版本唯一ID, 这就意味着，我们每发布一个版本就需要更新一下版本号。此外，版本号应该有一个固定的可以让 node-semver 解析的结构，比如我们常见的 npm 包版本号都是由三个被点分隔的数字组成，比如这样: 1.1.2, 有些包可能后面还接一个可选的标签，比如这样: 1.1.2-alphal。这路需要注意，不应该给版本降级，特别是当包已经被广泛使用的时候。

### 二、信息类字段

#### 1、description

一些关于包的描述信息，这些描述信息会被显示在搜索包的时候，显示在列表里或者其他地方，让用户清楚的知道它是用来干嘛的, 不过这只是一些项目的简短描述信息，更具体的描述应该写在 README.md 文件里。

#### 2、keywords

keywords 可以提升包的 SEO, 这个字符串数组里的关键字起的好的话，可以在提升包的搜索曝光率。

#### 3、license

license 是一个简单但是却非常重要的字段，有了这个字段，用户可以清楚的知道包的分享遵循的条款，这个字段对应字符串值应该是 SPDX 认证的 license，比如，MIT, GPL-3.0 等。若不知道哪些 license 适合当前包，可以查看[这里](https://tldrlegal.com/)。写了这个字段之后，最好在项目目录加上 LICENSE.md file 文件。

#### 4、homepage

若包有一个主页，可以把链接放在这里，这个链接会被放在 npm 页面和很多其他地方。

#### 5、repository

源码地址，字符穿类型，如果是开源的项目，可以加上 git clone 地址

#### 6、bugs

issues 页面地址

#### 7、author

author 的值有两个类型，Object 和 String, Object 类型适用于有多个开发者的项目，包括 name, email 和 url 三个属性，其中 url 一般是该作者的个人网站,这些属性都是可选的。String 类型的值一般用于单个开发者的项目，写法一般是这样的 `"name <email> (url)"`

#### 8、contributors

contributors 字段类似 author 字段，但是 contributors 的值类型是对象数组或者字符串。该字段另一个有趣的点是再项目根目录创建 AUTHORS.md 文件，逐行写上贡献者信息，这里面的信息会作为 contributors 的默认值。

### 三、文件类字段

#### 1、files

files 字段值的类型是字符串数组,数组里面的字符串填写需要发布到 NPM 的文件名。当然也可以在根目录下创建 .npmignore 文件，把不需要上传到 NPM 的文件名填进去。不过有些文件或者目录比如, README.md 或者 LICENSE.md 是默认就会被打包。也有默认不会被打包的目录或者文件，比如, node_modules 或者 .git。

#### 2、main

main 字段的值是入口文件,即使不包括在 files 字段里，也会被打包。

#### 3、browser

当需要打包多个版本时，设置 browser 字段，可以根据浏览器的不同环境变量，使用不同的版本

#### 4、unpkg

提供一个给 UNPKG, 用于支持 CDN 服务，有点类似 browser 

#### 5、module

若项目中有封装模块，可以设置 module, 也就是设置一个模块的入口, 该字段目前比较前卫

#### 6、typings/types

TypeScript 解析文件的入口, 该文件会被发布到 NPM, 并且可以被下载，为用户提供更加好的 IDE 支持。

#### 7、bin

若项目中包含一些可执行文件，可以把文件名在 bin 字段下, 当只有一个 Node.js 文件入口时, 可以是 string 值，当有多个的时候,可以用键值对的形式写。不过要执行这些文件，需要在文件头部加上 `#!/usr/bin/env node`

#### 8、man

若需要提供命令行输出文档，可以用 man 字段指明,当只有一个文件时, 可以是一个字符串值, 当有多个文件时, 可以是一个字符串数组。

### 四、任务类

#### 1、scripts

该字段应该都熟悉了，存放一些可执行脚本文件的对象

#### 2、config

设置一些用于可执行脚本的配置,

### 五、依赖类

#### 1、dependencies

用于管理项目所需依赖的对象, npm install / yarn  会默认下载这个字段下的所有依赖

#### 2、devDependencies

通过 --save-dev or --dev 安装的依赖放在 devDependencies 目录下，这部分依赖在开发阶段用于框架、模块测试或者编译代码，所以在使用编译后的包时，不会下载这部分依赖，比如 vue 的所有依赖都是放在该字段下的。

#### 3、peerDependencies

NPM v3开始，peerDependencies 字段需要自己配置，用于指定一个兼容项目的依赖，该字段的值是一个对象，对象的 key 是兼容包的名称，对象的值是该包的指定版本。

#### 4、optionalDependencies

optionalDependencies 字段用于设置一些项目中的可选包，这些包不一定要下载，但是却很有用，设置在该字段下后，对应的包只会在需要的时候被下载，比如  fsevents 模块，尽在 mac 下有效。

#### 5、bundledDependencies

bundledDependencies 字段是一个字符串数组，数组元素是需要跟最终包一起打包出去的依赖名称。

### 六、平台类

#### 1、engines

engines 字段可以指定编译的运行时和库，是一个对象类型，该对象的 key 是运行时或者库的名称，值是对应的具体版本。当打包需要用到一些比较新的特性时，可以用到这个字段，字段配置的环境通常是全局安装好的。

#### 2、os

os 字段可以指明操作系统类别，是字符串数组类型。

#### 3、cpu

指明 cpu 类型，也是字符串数组

### 七、发布类

#### 1、private

private 设置为 true，可以保证包不会被发布到 NPM，即使手误了点了 publish，也不会被发布

#### 2、publishConfig

设置 NPM config,会覆盖掉原有设置, 是一个对象类型。

除此之外还可能会针对特定场景使用一些字段，比如，UNPKG, Babel, Prettier 等，这些对应的字段通常会在搭配他们使用的工具的文档上有写，这里就不一一列举了。不过，建议把这些其他配置独立出去，便于维护。

参考文章:

[Package.json cheatsheet!](https://areknawo.com/whats-what-package-json-cheatsheet/)

[npm-package.json-Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json)