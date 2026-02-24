---
title: 拼音学习项目笔记
comments: true
date: 2019-03-19 09:44:46
categories: Web开发
tags: [前端, 框架与库]
---

1. 关于数据更新机制

   （1）v-if 关闭组件的时候，会销毁数据，可以用于实现返回父组件关闭音频等媒体，如果只是界面的开关的话，用 v-show 即可

   （2）离开子组件后，父组件所传递的数据需要清空，切记不要在网络请求里做清空操作，因为网络请求是有延迟的，一般放在打开子组件的事件里执行清空操作

2. 关于 audio

   对于不同格式的音频，audio 的播放机制不一样，对于 base64 等流媒体，audio 采用边下边播的机制，对于 MP3 等非流媒体，audio 采用下载完之后再播放的机制，所以为了播放效果更好，防止出现等待状况，最好把音频转换为流媒体的形式，下面是我写的一个 MP3 转 base64 的示例：

   ```js
   mp3ToBase64(url) {
     const el = document.getElementById("voiceM");
     const temp = {
       headers: {
         "Content-Type": " audio/mpeg3"
       },
       responseType: "arraybuffer"
     };
     http.get(url, "", temp).then(res => {
       const val = new Buffer(res.data, "binary").toString("base64");
       const audioUrl = `data:${res.headers[
         "content-type"
       ].toLowerCase()};base64,${val}`;
       el.src = audioUrl;
       el.play();
     });
   }
   ```
