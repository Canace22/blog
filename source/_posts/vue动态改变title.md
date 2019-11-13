---
title: vue动态改变title
comments: true
date: 2018-10-22 19:40:00
categories: web
tags: vue
---

1. 代码：

```js
import router from '../router';

router.beforeEach((to, from, next) => {
  let n = to.query.subjectId;
  let x = ['mike', 'john', 'sarah'];
  if (n === '4') {
    document.title = x[2];
  } else if (n === '5') {
    document.title = x[1];
  } else if (n === '6') {
    document.title = x[0];
  }
  next();
});
```

2. 在 main.js 引入即可，使用示例：

```js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './utils/title';

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
```
