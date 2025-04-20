---
title: Vol.13：科幻电影照进现实
categories: 七日谈
description: Canace 的七日谈第十二期
author: Canace
comments: true
date: 2025-04-20 17:00:08
---
- 美国基因工程公司 Colossal 宣布，复活了一万年前灭绝的[恐狼](https://www.hollywoodreporter.com/news/general-news/game-of-thrones-dire-wolves-return-extinction-1236181901/)
- 加密货币早期投资者王纯，买下 SpaceX 公司的一次飞行，进行了一次为期三天的[太空旅游](https://www.scmp.com/news/world/united-states-canada/article/3304663/chinese-born-entrepreneur-buys-entire-spacex-flight-ultimate-polar-orbit-adventure)。
- 得克萨斯州的特斯拉工厂生产的全新 Model Y，被发现[自己从生产线上开下来](https://www.facebook.com/watch/?v=969020125422825)。

看了这几则新闻，有没有科幻电影照进现实的感觉？太空旅行，通过基因工程产生现今世界不存在的物种，汽车会自己跑，这都是以前科幻电影才会有的情节，在现实中真的实现了。那么电影中出现的一些相关风险应该也会存在吧，无论是基因创造的新事物也好，汽车自动驾驶也好，都具有不可控性，对于不可控的事务，风险系数也会更高，也不知道相关领域想好对策没有。

## 当前最强的两个编码模型
- Gemini 2.5 Pro
- Claude 3.7 Sonnet

## 安卓的优势
相较于ios，安卓的优势在于可以root和改装，现在安卓越来越封闭，逐渐丧失了他的优势

## 农业自动化
![农业自动化](https://Canace22.github.io/picx-images-hosting/20250420/image.73u5510n8b.webp)

## 函数参数最佳实践
我们通常写参数是这样一个一个传的。

```jsx
const signup = () => {
  // ...
  createUser("John", "Doe", 28, true);
  // ...
};
```

这样写参数有几个问题，不按照顺序传的话可能会报错，而且不是作者，可能并不清楚 每个参数是什么意思，需要做注释，下面是一个优化的写法。

```jsx
type TCreateUserInput = {
  firstName: string;
  lastName: string;
  age: number;
  isActive: boolean;
};

const signup = () => {
  // ...
  createUser({ firstName: "John", lastName: "Doe", age: 28, isActive: true });
  // ...
};
```

对于 typeScripe 这种强类型的语言，可以一目了然的知道该传什么类型，每个参数代表什么意思，而且不怕传错参数，后面扩展新的参数也很方便。

参考文献
[single-param-functions](https://www.carlos-menezes.com/single-param-functions/)
[How Dairy Robots Are Changing Work for Cows (and Farmers)](https://spectrum.ieee.org/lely-dairy-robots)
