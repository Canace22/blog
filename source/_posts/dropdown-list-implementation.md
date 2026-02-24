---
title: 下拉列表的实现
description: '点击外部区域关闭下拉列表需监听 blur 事件并给 div 添加 tabindex 属性'
comments: true
date: 2019-09-01 17:28:44
categories: Web开发
tags: [前端, 框架与库]
---

用别人的组件总有各种不可控的问题，而且不好维护，还是造轮子比较舒畅。

下拉列表是工作中经常用到的一个功能，点击按钮，显示下拉列表，点击列表中的项目显示对应的值到按钮中，这是下拉列表的常用交互。这里的一个比较有意思的点就是如何在点击别的地方时关闭列表。我采用的方法是监听组件最外层的 blur 事件，当该组件失去焦点时，关闭列表。由于按钮用的是 div 实现，默认 div 是没有 blur 事件的，这里添加一个 tabindex 属性， blur 就有效了。

demo：

```html
<!-- html -->
<div class="dropDown-wrap" tabindex="1" @blur="hidden">
  <div class="dropDown" @click="isDropDown=!isDropDown">
    {{selected.name}}
    <svg class="arrow-right" role="presentation" v-show="isIcon">
      <polyline
        points="7,0 14,7 7,14"
        fill="none"
        stroke-width="2px"
        stroke="#fff"
      />
    </svg>
  </div>
  <div class="arrow-up" :class="{isDropDown:isDropDown}"></div>
  <div class="dropDown-list" :class="{isDropDown:isDropDown}">
    <div
      class="dropDown-item"
      :class="{isSelected:selected.id===item.id}"
      v-for="(item,index) in list"
      :key="index"
      @click="selectItem(item)"
    >
      {{item.name}}
    </div>
  </div>
</div>
```

```js
selectItem (item) {
  this.$emit('changeItem', item)
  this.isDropDown = false
},
hidden () {
  this.isDropDown = false
}
```

#### 三、Demo 地址

[Demo](https://canace22.github.io/Demos/#/) => 媒体 => 列表控件
