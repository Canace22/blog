---
title: CKeditor 在 angular 中的使用文档
comments: true
date: 2018-07-29 16:07:31
categories: Web开发
tags: [前端,框架与库]
---

CKeditor 是比较好用的一款所见即所得编辑器，有多种模式可供选择，里面还可集成 leText 等第三方插件，也可以自己开发一些插件，推荐使用。上手也很简单，但是在 angular 中使用还是要费一点时间，配置上也要花点时间。

<!--more-->

1. 下载 ckeditor;

2. 把 ckeditor 解压并放到 angular 的 assets 文件中;

3. 在 angular 的 index 文件中引用 ckeditor.js;

4. 根据自己的需求修改 ckeditor 配置文件;

5. ckeditor 相关配置说明:

```js
CKEDITOR.editorConfig = function(config) {
  config.language = "zh-cn"; // 编辑器语言
  config.skin = "moono"; // 编辑器皮肤,需要下载并解压到 ckeditor 的 skins 文件夹下
  config.allowedContent = true;
  config.toolbar = "Full"; // 工具条类型
  config.extraPlugins = "ckeditor_wiris"; //  添加扩展插件 ckeditor_wiris
  config.toolbar_Full = [
    ["Underline", "-", "Subscript", "Superscript", "RemoveFormat"],
    ["Image", "Table", "SpecialChar"],
    ["ckeditor_wiris_formulaEditor"]
  ]; // 配置工具条
  config.width = 360; // 编辑器宽度设置
  config.resize_enabled = false; // 编辑器拖拽设置
};

CKEDITOR.plugins.addExternal(
  "ckeditor_wiris",
  "https://www.wiris.net/demo/plugins/ckeditor/",
  "plugin.js"
); // 扩展编辑器引用
```

6. ckeditor 的使用有两种模式,一种是 inline 模式,使用方法是直接在相应的元素加上 contentable = "true" 即可生效, 第二种是 textarea 模式, 使用方法是以 class 的形式引用,这个我暂时还没有触及,之后再添加;

7. 使用 ckeditor inline 模式会有一个广告,xx 所见即所得编辑器, 这句话可以通过删除 ckeditor.js 文件中的一些语句来删掉,要删除的语句如下:

```js
a.title =
  "string" == typeof d || !1 === d ? d : [a.lang.editor, a.name].join(", ");
```

也可以通过设置 config.title = ' '， 去除编辑框的 title。

8. 工具栏加数学公式插件的方法:

(1) 下载 ckeditor_wiri , 下载 asp 版, 具体为什么,是因为我只学过 asp.net, 看着有眼缘, 使用应该都没差吧;

(2) config.js 添加如下语句:

A. `config.extraPlugins = 'ckeditor_wiris';`

B. `[ 'ckeditor_wiris_formulaEditor']`

C. `CKEDITOR.plugins.addExternal('ckeditor_wiris', 'https://www.wiris.net/demo/plugins/ckeditor/', 'plugin.js');`

此外,要修改显示图标可以替换掉相应的 icon

9. CKedditor inline 模式是默认初始化一个全局实例的，也就是在页面的所有地方用 contenteditable = true 都会初始化一个 inline 编辑器，而这并不是我们想要的结果，可以通过在 index.html 中添加以下语句，禁止自动初始化编辑器： `CKEDITOR.disableAutoInline = true;`

10. 禁用了默认初始化全局实例，我们要用的话，就自己在相应的组件初始化一个编辑器就行了，大概思路就是，创建一个 editors 变量用于存储 CKeditor 实例， 声明一个初始化编辑器的函数，函数接收所有类名为 ckeditor 的元素，遍历这些元素，在相应的节点上依次添加编辑器的实例（
    CKEDITOR.inline(elements[i])），保存在 editors 中，在 ngAfterViewInit() 生命周期钩子中执行函数，目的是在文档加载完之后执行函数，因为一开始元素默认隐藏状态还没加载进来，初始化不了。在执行完了函数之后，为了提高性能，记得把初始化的实例都销毁掉。
