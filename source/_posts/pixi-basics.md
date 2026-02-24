---
title: PixiJs 极简教程
categories: Web开发
tags: [前端, CSS与可视化]
descroption: 一个极简的 PixiJs 教程
comments: true
date: 2019-11-12 08:36:10
---

PixiJs 是比较常用的 canvas 库，用来展示 2d 的平面图，相比 canvas，封装了更多的功能，也更简单容易上手，但是其官网的文档写得极其的简陋，可阅读性很差，综合了一些其他的文档，写出了这份极简教程，让小白也可以拿来即用。

### 一、创建画布

```js
//创建别名
let Application = PIXI.Application,
  loader = PIXI.Loader.shared,
  resources = PIXI.Loader.shared.resources,
  Texture = PIXI.Texture,
  TextureCache = PIXI.utils.TextureCache,
  Rectangle = PIXI.Rectangle,
  Sprite = PIXI.Sprite;

// 创建一张 canvas 画布
let app = new Application({
  width: 256,
  height: 256,
  antialiasing: true,
  transparent: false,
  resolution: 1,
});
// 把新创建的 canvas 画布挂载到对应的节点上
this.$refs.container.appendChild(app.view);
```

### 二、画布设置

```js
//canvas 全屏样式
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.width = window.innerWidth + 'px';
app.renderer.view.style.height = window.innerHeight + 'px';
app.renderer.view.style.display = 'block';

//`renderer.view` 代表原始的 `<canvas>`标签.
//给 canvas 加条虚线，就像平常操作 canvas 一样
app.renderer.view.style.border = '1px dashed black';

//重置画布大小
app.renderer.resize(512, 512);

//改变画布背颜色，颜色使用的是十六进制色
app.renderer.backgroundColor = 0x000000;
```

### 三、显示图片

1、texture 方法创建精灵

```js
// 创建一个 cat 精灵
const texture = Texture.from('./img/pixi/cat.png');
const cat = new Sprite(texture);
// 把新创建的精灵加到舞台上
app.stage.addChild(cat);
```

2、loder 方法创建精灵

```js
loader
  .add(['./img/pixi/cat.png', './img/pixi/blob.png', './img/pixi/explorer.png'])
  .load(() => {
    //创建精灵
    let cat = new Sprite(resources['./img/pixi/cat.png'].texture),
      blob = new Sprite(resources['./img/pixi/blob.png'].texture),
      explorer = new Sprite(resources['./img/pixi/explorer.png'].texture);

    //把新创建的精灵加到舞台上
    app.stage.addChild(cat);
    app.stage.addChild(blob);
    app.stage.addChild(explorer);
    loader.reset();
  });
```

3、改变精灵的属性

```js
//改变精灵位置
blob.position.set(82, 82);
explorer.position.set(128, 128);
// 改变精灵大小
cat.scale.set(1.2, 1.2);
//旋转精灵
cat.rotation = 0.5;
// 设置旋转的中心点
cat.anchor.set(0, 0);
// 精灵显示情况控制
cat.visible = false;
```

4、加载雪碧图

```js
loader.add('./img/pixi/tileset.png').load(() => {
  let texture = TextureCache['./img/pixi/tileset.png'];

  // 图片在雪碧图上的位置截取 new Rectangle(x, y, w, h)
  let rectangle = new Rectangle(192, 128, 64, 64);

  // 告诉 texture 使用截取的区域
  texture.frame = rectangle;

  let rocket = new Sprite(texture);

  rocket.position.set(32, 32);
  app.stage.addChild(rocket);
  loader.reset();
});
```

5、加载 json 贴图数据集

```js
Loader.add({
  name: 'treasure',
  url: './img/pixi/treasureHunter.json',
}).load((loader, resources) => {
  let dungeon, explorer, treasure, door;
  const things = resources['treasure'].textures;

  dungeon = new Sprite(things['dungeon.png']);
  app.stage.addChild(dungeon);

  explorer = new Sprite(things['explorer.png']);
  app.stage.addChild(explorer);

  treasure = new Sprite(things['treasure.png']);
  app.stage.addChild(treasure);

  loader.reset();
});
```

json 数据长这样：

```json
{
  "frames": {
    "blob.png": {
      "frame": { "x": 55, "y": 2, "w": 32, "h": 24 },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 24 },
      "sourceSize": { "w": 32, "h": 24 },
      "pivot": { "x": 0.5, "y": 0.5 }
    },
    "door.png": {
      "frame": { "x": 89, "y": 2, "w": 32, "h": 32 },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 32 },
      "sourceSize": { "w": 32, "h": 32 },
      "pivot": { "x": 0.5, "y": 0.5 }
    },
    "dungeon.png": {
      "frame": { "x": 2, "y": 36, "w": 512, "h": 512 },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": { "x": 0, "y": 0, "w": 512, "h": 512 },
      "sourceSize": { "w": 512, "h": 512 },
      "pivot": { "x": 0.5, "y": 0.5 }
    },
    "explorer.png": {
      "frame": { "x": 2, "y": 2, "w": 21, "h": 32 },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": { "x": 0, "y": 0, "w": 21, "h": 32 },
      "sourceSize": { "w": 21, "h": 32 },
      "pivot": { "x": 0.5, "y": 0.5 }
    },
    "treasure.png": {
      "frame": { "x": 25, "y": 2, "w": 28, "h": 24 },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": { "x": 0, "y": 0, "w": 28, "h": 24 },
      "sourceSize": { "w": 28, "h": 24 },
      "pivot": { "x": 0.5, "y": 0.5 }
    }
  },
  "meta": {
    "app": "http://www.codeandweb.com/texturepacker",
    "version": "1.0",
    "image": "treasureHunter.png",
    "format": "RGBA8888",
    "size": { "w": 516, "h": 550 },
    "scale": "1",
    "smartupdate": "$TexturePacker:SmartUpdate:51ede84c7a85e4d6aeb31a6020a20858:3923663e59fb40b578d66a492a2cda2d:9995f8b4db1ac3cb75651b1542df8ee2$"
  }
}
```

看着很复杂，不像人写的是吧？确实，可以自动生成的，你需要 TexturePacker 这个神奇，生成雪碧图的同时，可以到处 json 数据集，有专门针对 pixi 的拿来即用的版本。
