---
title: 从零开始撸一个 tinymce 图片上传插件
categories: Web开发
tags: 富文本
comments: true
date: 2020-11-19 19:49:19
---
## 写在前面

最近有个项目需要用到编辑器，大佬说希望用精简点的框架自己加点扩展，而不是用 ckeditor 这种比较重的。于是对比了下，ueditor 没怎么在维护了，其他的好像不太符合我的需求，最后选择了 tinymce，理由是 tinymce 比较轻巧易扩展，而且完全开源，可用于商业应用。

初步看了下文档，我需要有图片上传插件，但是已有的插件不太符合我的需求，我需要的是点击或者拖拽到 dialog 立刻打开图片目录，已有插件采用的 tab-panel 模式，多了粘贴 url 之类的多余东西。看了看 github, 别人的实现貌似也不怎么符合我的需求,于是便有了标题所述事件。

## 准备

### 下载生成器

```sh
npm install --global yo generator-tinymce
```

### 用生成器创建一个插件模板

这里的生成目录可以是源码的相应目录或者用自己想用的目录都行,填写一下插件名称,然后就是一路 next

```sh
yo tinymce
```

创建好模板之后会看到有对应的脚本

```sh
# 热更新项目
yarn start

# 编译项目
yarn build
```

主要开发目录在 src/main 下, plugin.ts 是主要的插件入口可以在里面写入插件内容

## 图片上传插件的实现

### 一、声明插件

要写一个插件，得先声明一下，把它加到编辑器里, 比如这样:

```ts
declare const tinymce: any;

const setup = (editor, url) => {
  editor.ui.registry.addButton('image-t', {
    icon: 'image',
    tooltip: 'image-t',
    onAction: () => {
      // tslint:disable-next-line:no-console
      editor.execCommand('mceInsertContent', false, `<p>Hello world</p>`);
    },
  });
};

export default () => {
  tinymce.PluginManager.add('image-t', setup);
};
```

编译一下，可以看到 dist 目录下已经有一个 image-t 目录了，这个就插件目录，把 image-t 拷贝到 tinymce/plugins 目录下就可以正常使用插件了，比如以下配置，就可以在工具条看到一个图片工具,点击会插入一句 'Hello world' 到编辑器里。

```js
tinymce.init({
  selector: 'textarea.tinymce',
  plugins: 'image-t',
  toolbar: 'image-t',
});
```

### 二、图片上传界面实现

上一步，我们已经初步尝试体验到了写插件的快感，但这只是开始，这样好像只能插入一些文字吧，没什么用的样子，我要的可以插入图片啊。想一下通常我们要插入图片会怎么做呢？

首先应该有一个上传图片的提示 ui 吧，点击某个按钮可以让我们跳转到本地目录，可以选择图片，点击确定会插入图片。

那我们要做的第一步就是点击上一步生成的按钮得弹出一个框，里面会有一些提示信息，在写这个 demo 之前，别急着动手，先去看看已有 image 插件的实现源码。

image 插件里用到了 [dialog ui 组件](https://www.tiny.cloud/docs/ui-components/dialog/),用来打开一个弹框,我们就先去看一下相关 ui 组件, 发现竟然有两种模式可选, image 插件用的是 tabpanel 模式，也就是可以有多个 tab，我的需求就是一个简单的提示界面，没必要用这个，那就选 panel 模式吧。

初次之外，dialog 还要配置 buttons, 这个是必需的，我不需要就给了空。

有了上面这些知识，就可以写一个有界面的弹框了，我们在扩展一下上面的 demo

```ts
declare const tinymce: any;

const setup = (editor, url) => {
  editor.ui.registry.addButton('image-t', {
    icon: 'image',
    tooltip: 'image-t',
    onAction: () => {
      // tslint:disable-next-line:no-console
      const dialogConfig = {
        title: '上传图片',
        body: {
          type: 'panel',
          items: [],
        },
        buttons: [],
      };
      editor.windowManager.open(dialogConfig);
    },
  });
};

export default () => {
  tinymce.PluginManager.add('image-t', setup);
};
```

预览余下 demo，点击图片按钮，会弹出一个空白框，说明魔改第一步成功了，再编译一下，放到 tinymce/plugins 下，可以看到表现一致。

### 三、选中一张图片并上传

一般情况下，要打开本地目录，我们会想到 input, 但是这里我们首先要把这个选项排除，为什么呢？因为我们是在开发一个插件啊，源码里面肯定是有相关接口暴露出来的吧。

我们不妨再回去翻一翻 image 插件吧，UploadTab 这个里面有一层 dialog 的配置, 如下

```js
const makeTab = (_info: ImageDialogInfo) => {
  const items: Dialog.BodyComponentSpec[] = [
    {
      type: 'dropzone',
      name: 'fileinput',
    },
  ];
  return {
    title: 'Upload',
    name: 'upload',
    items,
  };
};
```

不难发现这里用到了 dropzone 这个组件,那我们就把他加到弹框中吧，加完之后，我们 demo 长这样:

```ts
declare const tinymce: any;

const setup = (editor, url) => {
  editor.ui.registry.addButton('image-t', {
    icon: 'image',
    tooltip: 'image-t',
    onAction: () => {
      // tslint:disable-next-line:no-console
      const dialogConfig = {
        title: '上传图片',
        body: {
          type: 'panel',
          items: [
            {
              type: 'dropzone',
              name: 'fileinput',
            },
          ],
        },
        buttons: [],
      };
      editor.windowManager.open(dialogConfig);
    },
  });
};

export default () => {
  tinymce.PluginManager.add('image-t', setup);
};
```

重复以上步骤, dialog 里面多了一些提示和一个浏览图像按钮,点击按钮可以打开本地目录，选择图片。

这样就 ok 了吗？我们的目的是要插入图片到编辑框中，首先就得上传图片，而上传图片需要拿到图片。

在之前的 dialog 文档中我们可以看到一些配置项，其中就有一个 onChange 方法，这个方法是 input 值改变之后触发的。该方法第一个参数是 dialogApi，里面包含了一些 input 值相关的元信息，分析一下就知道这是我们要的数据。但是上传是要一段时间的，这里我们现在选择图片之后给个 loading，然后再去上传图片，上传完之后再把图片插入到编辑器中，取消 loading，关闭弹窗,来写个简单的 demo 看看吧

```ts
declare const tinymce: any;

const setup = (editor, url) => {
  editor.ui.registry.addButton('image-t', {
    icon: 'image',
    tooltip: 'image-t',
    onAction: () => {
      // tslint:disable-next-line:no-console
      const dialogConfig = {
        title: '上传图片',
        body: {
          type: 'panel',
          items: [
            {
              type: 'dropzone',
              name: 'fileinput',
            },
          ],
        },
        buttons: [],
        onChange(api) {
          api.block('上传中……');
          uploadImg(api, editor);
        },
      };
      editor.windowManager.open(dialogConfig);
    },
  });
};

export default () => {
  tinymce.PluginManager.add('image-t', setup);
};
```

在上面的 demo 中实现了打开图片确定之后给个 loading，另外加了个 uploadImg 函数，用来实现上传逻辑，至此，插件已经渐渐成型了，但是看起来代码好像有点点臃肿，来分割一下吧

```ts
const dialog = (editor) => {
  return {
    title: '上传图片',
    body: {
      type: 'panel',
      items: [
        {
          type: 'dropzone',
          name: 'fileinput',
          label: '',
        },
      ],
    },
    buttons: [],
    onChange(api) {
      api.block('上传中……');
      uploadImg(api, editor);
    },
  };
};

const setup = (editor, url) => {
  editor.ui.registry.addButton('image-t', {
    icon: 'image',
    tooltip: 'image-t',
    onAction: () => {
      // tslint:disable-next-line:no-console

      const dialogConfig = dialog(editor);
      editor.windowManager.open(dialogConfig);
    },
  });
};

export default () => {
  tinymce.PluginManager.add('image-t', setup);
};
```

拆分一下果然舒服多了，那就接着往下吧。

### 四、上传图片到七牛

要上传资源，首先得想到用一个网络请求，我想到的是 axios，因为简洁兼容，但是发现 axios 是 cjs 封装的, 编译的时候有些问题，最后勉强用了 xhr，也减少了依赖。图片上传七牛需要有图片元信息，可以通过 api.getData 拿到，此外还需要文件类型，也可以通过该方法拿到，实现可以这样

```ts
function getUrl(formdata, callback) {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", <url>, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(JSON.parse(xhr.response));
    }
  };

  xhr.send(formdata);
}
```

通过以上方法我们就可以拿到上传到七牛图片的 url 了，当然这只是个 demo，具体可以根据自己的情况实现

### 五、把图片插入编辑器

终于拿到图片 url 了，这样我们就可以愉快的插入编辑器中了，结合上一步，最终的 uploadImage 函数可以这么写

```ts
function uploadImg(api, editor) {
  const data = api.getData();
  const image = data.fileinput[0];
  const fileExt = image.name.split('.')[1];

  const getToken = (resp) => {
    const token = resp.F_token;

    const formdata = new FormData();
    formdata.append('file', image);
    formdata.append('token', token);

    getUrl(formdata, (res) => {
      const img = res.url;
      api.setData({ src: { value: res.url, meta: {} } });
      editor.execCommand(
        'mceInsertContent',
        false,
        `<img src=${img} class="img-t" alt='img-t'/>`
      );
      api.unblock();
      api.close();
    });
  };

  getQiniuToken(fileExt, getToken);
}
```

完结撒花，花了一天半的时间研究这个，做个笔记，插件开发就是这么简单

参考文献:

[常用的 HTML 富文本编译器 UEditor、CKEditor、TinyMCE、HTMLArea、eWebEditor、KindEditor 简介](https://developer.aliyun.com/article/268797)

[TinyMCE plugin Yeoman generator](https://www.tiny.cloud/docs/advanced/yeoman-generator/#runthegenerator)

[Create a plugin for TinyMCE](https://www.tiny.cloud/docs/advanced/creating-a-plugin/#exampleofthepluginfilestructure)
