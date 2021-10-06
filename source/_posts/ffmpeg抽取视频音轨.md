---
title: ffmpeg 抽取视频音轨
categories: 服务端
tags: ffmpeg
comments: true
date: 2021-10-06 11:04:03
---
看 youtube 上有些视频的音乐很好听，就想抽出来当自己的歌单，懒得去用市面上的软件，觉得麻烦，想到了 ffmpeg。 mac 可以用 homebrew 下载,过程比较烦，每次装都要更新，更新很久才开始下载，于是切了清华源，快一点。

安装好 ffmpeg 之后要抽离音轨就很简单了

```sh
# <path>.mp4 视频文件路径
# -f mp3 mp3编码
# -ar 16000 音频采样率
# <path>.mp3输出的音频文件路径
ffmpeg -i <path>.mp4 -f mp3 -ar 16000 <path>.mp3
```

这样只能一次转一个，比较麻烦，我有好几个要转，懒得在命令行一个个敲，写个脚本遍历也很简单

```sh
for var in cannon 500-miles
do
    ffmpeg -i <path>/$var.mp4 -f mp3 -ar 16000 <path>/$var.mp3
    echo $var
done
```
