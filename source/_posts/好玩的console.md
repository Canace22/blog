---
title: 好玩的 console
categories: web
tags: js
description: 一切要从昨天打开知乎控制台说起，昨天打开知乎控制台看到了 acii 图形的打印，比较好奇怎么画出来的，首先想肯定要用 console 吧，那么到底使用什么姿势 console 出来的呢？emmm，然后就有了这个
comments: true
date: 2020-07-18 11:25:26
---
一切要从昨天打开知乎控制台说起，昨天打开知乎控制台看到了 acii 图形的打印，比较好奇怎么画出来的，首先想肯定要用 console 吧，那么到底使用什么姿势 console 出来的呢？emmm，然后就有了这个。

日常开发中用的比较多的 console 方法就是 log，看了看，知乎的应该就是在线生成了对应的字符串，打印出来的吧，好像也没什么难度，类似这个[网站](http://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20)，就可以生成一毛一样的字符样式。那么 console 到底有没有好玩的地方呢？看看下面几个例子，感觉好像还蛮好玩。

### 一、给打印的字符加上样式

```js
var style = 'color: green; font-size: 24px;';
console.log(
  '%c我变绿了!q^q',
  style
);
```

![console-color](/images/console-color.png)

### 二、复杂数据结构打印成表格

1、 数组对象，数组索引为行名称，数组对象的 key 为列名

```js
// 数组
var price = [
  { name: '小埋抱枕', val: '50' },
  { name: '娘口老师抱枕', val: '150' },
  { name: '夏目马克杯', val: '20' },
];
console.table(price);
```

![console-table](/images/console-table.png)

2、 对象，一维对象的 key 为行的名称，二维对象的 key 为列的名称

```js
// 对象
var info = {
  'Amy': { age: 14, hobby: 'pin-pong' },
  'Mike': { age: 20, hobby: 'walking' },
};

console.table(info);
```

![console-table-obj](/images/console-table-obj.png)

### 四、查看代码执行时间

```js
console.time('Array initialize');

var array = new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
  array[i] = new Object();
}

console.timeEnd('Array initialize');
```

### 五、分组显示数据

```js
console.group('一级分组');
console.log('一级分组的内容');

console.group('二级分组');
console.log('二级分组的内容');

console.groupEnd(); // 一级分组结束
console.groupEnd(); // 二级分组结束
```

### 六、清空控制台

```js
console.clear();
```