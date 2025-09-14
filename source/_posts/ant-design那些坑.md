---
title: ant-design-vue 那些坑
categories: Web开发
tags: [前端,框架与库,vue]
comments: true
date: 2021-08-10 11:34:39
---
最近项目中用到了 ant-design-vue，对于内部系统来说，ant 的风格是比较好的，但是组件的使用比较难自定义，这是我个人一个比较深的感受吧，下面记录一下使用中遇到的一些坑。

## dropdown

dropdown 组件的 menu 默认会被添加到 body 元素上，使用默认的设置，在列表中会出现点击之后失去焦点位置偏移的问题，解决这个问题的方法是设置一个 menu 的容器

```jsx
<a-dropdown
    getPopupContainer={triggerNode => {
        return triggerNode.parentNode || document.body;
    }}
>
</a-dropdown>
```

## select

设置了 v-model，给了一个默认值空，placeholder 没显示出来，这里是因为 select 组件的逻辑是值为 undefined 时才显示 placeholder，这里就需要把 v-model 绑定的变量默认值设为 undefined，这个其实挺奇葩的，一般我们是不会给变量设置 undefined 值的，这里就只能这么干。