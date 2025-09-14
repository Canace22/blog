---
title: three.js 基础实战 —— 创建画布
categories: Web开发
tags: webGL
comments: true
toc: true
date: 2020-09-14 15:54:50
---
### 一、场景创建

要显示一个画面需要有以下三个元素: scene, camera 和 renderer，renderer 渲染器是根据 scene 和 camera 进行渲染的

```js
// 创建 scene
const scene = new THREE.Scene();
// 创建 camera
const fov = 75;
const aspect = 2; // the canvas default
const near = 10;
const far = 0.1;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;
// 创建渲染器
const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight, false);
```

### 二、添加物体

1、通过 BoxGeometry 对象创建一个正方体实例

```js
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
```

2、创建一个基础材质实例

```js
const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
```

3、创建一个网格实例，里面包含上述正方体和材质

```js
const cube = new THREE.Mesh(geometry, material);
```

4、把正方体添加到场景里

```js
scene.add(cube);
```

以上把一个网格模式下的正方体添加到了画布上，不难看出 three.js 的组织方式可以用下图表示

![three.js 组织方式](https://raw.githubusercontent.com/Canace22/Assets/main/images/threejs-1cube-no-light-scene.svg)

### 三、渲染物体

以上只是把物体加到了画布上，但是并没有渲染, 下面我们来看 three.js 的渲染方式

1、静态渲染，这会使物体看起来就像 2d 一样

```js
renderer.render(scene, camera);
```

2、动态渲染，使物体看起来更有 3d 效果

使用 requestAnimationFrame api 一帧一帧的渲染场景，同时在每一帧旋转一下正方体

```js
function render(time) {
  time *= 0.001; // convert time to seconds
  cube.rotation.x = time;
  cube.rotation.y = time;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
```

### 四、添加光线

为了使正方形看起来更加有立体感，我们可以给他加点光线，在加光线之前，我们需要先把目前的材质替换成可以受光影响的材质

```js
// const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 }); // 这种材质会受光线影响
```

替换了材质之后就可以添加光线了

```js
const color = 0xfffff0;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);
```

### 五、检测浏览器是否支持 webGL

```js
if (WEBGL.isWebGLAvailable()) {
  requestAnimationFrame(render);
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
```

参考文档:

[Three.js Fundamentals](https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html)

[Creating a scene](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)


