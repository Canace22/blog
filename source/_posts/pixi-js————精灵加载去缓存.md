---
title: PixiJs ———— 精灵加载去缓存
categories: web
tags: PixiJs
description: PixiJs v5.2.0 加载精灵的时候会有缓存相关的 warning，每次都九十多条 warning，这谁受得了，花了点时间，各种调试，终于把他们给去掉了，舒服。可能有人会问，直接 google cv 一条龙不就解决了，但是网上关于 PixiJs 的文档是很少的，官方文档看了看，开发论坛看了看，都说用 clearTextureCache 方法，但是，通过打印发现是在 load 阶段给出的 warning，所以这里没用。
comments: true
date: 2020-04-06 21:32:30
---

PixiJs v5.2.0 加载精灵的时候会有缓存相关的 warning，每次都两百多条 warning，这谁受得了，花了点时间，各种调试，终于把他们给去掉了，舒服。可能有人会问，直接 google cv 一条龙不就解决了，但是网上关于 PixiJs 的文档是很少的，官方文档看了看，开发论坛看了看，都说用 clearTextureCache 方法，，通过打印发现是在 load 阶段给出的 warning，所以这里没用。先看看比如我一开始的代码，长这样

```js
function loadBaseImgs() {
  const loader = new PIXI.Loader();
  const textures = {};

  loader.add(baseImgArr);

  return new Promise((resolve) => {
    loader.load((loaders, resources) => {
      PIXI.utils.clearTextureCache();
      const lazer = resources.lazer.textures;
      const lazerGreen = lazer['greenPen'];
      const lazerRed = lazer['redPen'];
      const lazerYellow = lazer['yellow'];
      const lazerZise = lazer['zise'];
      textures.lazerGreen = lazerGreen;
      textures.lazerRed = lazerRed;
      textures.lazerYellow = lazerYellow;
      textures.lazerZise = lazerZise;
      resolve(textures);
    });
  })
```

看起来没毛病，跟 PixiJs 开发者说的解决方案一样，但是在第一次的时候还是打印了很多,warning 内容都是 `Texture added to the cache with an id [...] that already had an entry`, 这句话告诉我们 map 中已经有了该 id 的键值对，看 PixiJs 的 issue 发现开发者说这个不影响，只是提示而已。感受一下两百多条提示，你就会发现很有必要去掉它，谁知道因为这个会发生什么呢。

![warning](/images/warning.png)

很吓人吧，然后跳到给出 warning 的地方

![warning-code](/images/wraning-code.png)

可以看到这段代码

```js
Texture.addToCache = function addToCache(texture, id) {
  if (id) {
    if (texture.textureCacheIds.indexOf(id) === -1) {
      texture.textureCacheIds.push(id);
    }

    if (_pixi_utils__WEBPACK_IMPORTED_MODULE_1__['TextureCache'][id]) {
      // eslint-disable-next-line no-console
      console.warn(
        'Texture added to the cache with an id [' +
          id +
          '] that already had an entry'
      );
    }

    _pixi_utils__WEBPACK_IMPORTED_MODULE_1__['TextureCache'][id] = texture;
  }
};
```

从以上代码可以发现，这个 warning 是在 addToCache 的时候触发的，那么再去看看文档关于 PIXI.Loader 的描述吧，可以看到 PIXI 加载精灵集的方式有两种

```js
const loader = PIXI.Loader.shared; // PixiJS exposes a premade instance for you to use.
//or
const loader = new PIXI.Loader(); // you can also create your own if you want
```

以上第一种是 PixiJS 暴露的一个默认实例，第二种是我们自己 new 的实例，这里我用的是第二种会打印 warning，那么试试第一种方式吧，修改代码为：

```js
function loadBaseImgs() {
  const loader = PIXI.Loader.shared;
  const textures = {};

  loader.add(baseImgArr);

  return new Promise((resolve) => {
    loader.load((loaders, resources) => {
      PIXI.utils.clearTextureCache();
      const lazer = resources.lazer.textures;
      const lazerGreen = lazer['greenPen'];
      const lazerRed = lazer['redPen'];
      const lazerYellow = lazer['yellow'];
      const lazerZise = lazer['zise'];
      textures.lazerGreen = lazerGreen;
      textures.lazerRed = lazerRed;
      textures.lazerYellow = lazerYellow;
      textures.lazerZise = lazerZise;
      resolve(textures);
    });
  })
```

这下 error 来了

```js
Uncaught (in promise) Error: Cannot add resources while the loader is running.
```

只能用一个 loader 实例？那么就在添加新的 resource 之前，重置一下 loader 吧

```js
function loadBaseImgs() {
  const loader = PIXI.Loader.shared;
  const textures = {};

  loader.reset();
  loader.add(baseImgArr);

  return new Promise((resolve) => {
    loader.load((loaders, resources) => {
      PIXI.utils.clearTextureCache();
      const lazer = resources.lazer.textures;
      const lazerGreen = lazer['greenPen'];
      const lazerRed = lazer['redPen'];
      const lazerYellow = lazer['yellow'];
      const lazerZise = lazer['zise'];
      textures.lazerGreen = lazerGreen;
      textures.lazerRed = lazerRed;
      textures.lazerYellow = lazerYellow;
      textures.lazerZise = lazerZise;
      resolve(textures);
    });
  })
```

emmm, 搞定，warning 再见。

等等，这样写虽然解决了问题，但是每次 loader 都会重新加载，每次执行函数也会重新的的去异步加载 resources，这明显不科学，不如把资源添加的环节放到函数外面去，这样就不用每次进来都 add 一下了

```js
const loader = PIXI.Loader.shared;
const textures = {};

loader.add(baseImgArr);
function loadBaseImgs() {
  return new Promise((resolve) => {
    loader.load((loaders, resources) => {
      PIXI.utils.clearTextureCache();
      const lazer = resources.lazer.textures;
      const lazerGreen = lazer['greenPen'];
      const lazerRed = lazer['redPen'];
      const lazerYellow = lazer['yellow'];
      const lazerZise = lazer['zise'];
      textures.lazerGreen = lazerGreen;
      textures.lazerRed = lazerRed;
      textures.lazerYellow = lazerYellow;
      textures.lazerZise = lazerZise;
      resolve(textures);
    });
  })
```

这样写，每次调用函数减少了 add 环节，但是还是会重复的 load，再改进一些，load 只用于拿数据，处理数据的部分分割出来，由于第一次 load 完毕，已经可以拿到所有的 texture 了，所以可以在这个阶段去把 resources 存起来，以后通过判断有没有这个 resources，决定是否要 load，改进代码如下：

```js
const loader = PIXI.Loader.shared;
const textures = {};
let resInstance = null;

loader.add(baseImgArr);

function loaded(resources, resolve) {
  PIXI.utils.clearTextureCache();
  const lazer = resources.lazer.textures;
  const lazerGreen = lazer['greenPen'];
  const lazerRed = lazer['redPen'];
  const lazerYellow = lazer['yellow'];
  const lazerZise = lazer['zise'];
  textures.lazerGreen = lazerGreen;
  textures.lazerRed = lazerRed;
  textures.lazerYellow = lazerYellow;
  textures.lazerZise = lazerZise;
  resolve(textures);
}
function loadBaseImgs() {
  return new Promise((resolve) => {
    if(resInstance) {
      loaded(resInstance, resolve);
      return;
    }
    loader.load((loaders, resources) => {
      resInstance = resources;
      loaded(resInstance, resolve);
    });
  })
```
