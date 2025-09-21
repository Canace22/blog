---
title: 滚动翻页
comments: true
date: 2019-04-15 20:16:28
categories: Web开发
tags: 前端
---

##### 一、 功能描述

有一个 list，长度不确定，显示区域只能容纳四条数据，往下滚动显示当前四条数据的前四条，往下滚动则显示当前数据的后四条。除了滚动切换数据之外，还能通过上下翻页键切换数据，切换数据的交互需要跟滚动效果一样。

##### 二、思路

说到分页，首先想到的肯定是切割 list，因为只能容纳四条数据，就把 list 切割成 4 条每组的多个 list，每次只需要显示相应的子 list 就行了。因为要有滚动的交互效果，所以考虑的 html 结构是父级元素滚动，超出部分隐藏，子元素由多个 list 组成的块构成相应的 dom。既然是滚动翻页，肯定不希望出现滚动条，所以要考虑不同浏览器隐藏滚动条的方案。

##### 三、实现

**html 结构：**

```html
<div class="audioContainer">
  <img class="icon" :src="`${baseUrl}img/last.png`" v-show="lastPageShow" @click="jump(0)" />
  <div class="audioWrap">
    <div class="audioGroup" v-for="(value, num) in audioGroupPage" :key="num">
      <span
        class="item"
        v-for="(item, index) in audioGroup.slice(4*num, 4*(num+1))"
        :key="index"
        @click="$emit('spellAudio', item.tone, item.letter)"
      >
        <ruby>{{item.text}}</ruby>
      </span>
    </div>
  </div>
  <img class="icon" :src="`${baseUrl}img/next.png`" v-show="nextPageShow" @click="jump(1)" />
</div>
<div></div>
```

**功能函数：**

```js
watch: {
    // 监听 list 的长度，如果超出可容纳数据的长度，显示下一页按钮
    audioGroup(val) {
      val.length > 4 ? (this.nextPageShow = true) : (this.nextPageShow = false);
    },
    top(val) {
      // 监听滚动的高度，如果小于 0，则上一页按钮隐藏
      if (val < 0) {
        this.lastPageShow = false;
      }
       // 监听滚动的高度，如果大于所有 list 子元素构成的dom的高度，则下一页按钮隐藏，否则显示
      if (val >= (Math.ceil(this.audioGroup.length / 4) - 1) * 204) {
        this.nextPageShow = false;
      } else {
        this.nextPageShow = true;
      }
    }
  },
  computed: {
    // list 分页
    audioGroupPage() {
      return Math.ceil(this.audioGroup.length / 4);
    }
  },
  methods: {
    // 上下翻页
    jump(val) {
      const el = document.getElementsByClassName("audioWrap")[0];

      switch (val) {
        case 1:
          this.lastPageShow = true;
          el.top = el.scrollTop + 204
          this.top = el.scrollTop + 204;
          break;
        case 0:
          el.top = el.scrollTop - 204;
          this.top = el.scrollTop - 204;
          break;
      }
    }
  }
```

##### 三、其他

实现了之后肯定很丑，因为有滚动条，如何隐藏呢？如下:

```css
/* webkit 内核浏览器 */
::-webkit-scrollbar {
  display: none;
}
/* firfox浏览器 */
.audioWrap {
  scrollbar-width: none;
}
```
