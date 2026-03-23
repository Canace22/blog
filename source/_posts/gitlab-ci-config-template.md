---
title: gitlab ci 配置模板
description: 'gitlab ci 配置模板注意 artifacts 有效期和路径设置避免部署异常'
comments: true
date: 2018-10-22 19:29:20
categories: 工程化与运维
tags: 开发工具
---

gitlab ci 配置模板

<!--more-->

```yml
build site:
  image: node:latest
  stage: build
  script:
    - npm install && npm run build
  artifacts:
    expire_in: 1 week
    paths:
      - dist

pages:
  stage: deploy
  script:
    - rm -rf public
    - mkdir public
    - mv dist/* public
  artifacts:
    expire_in: 3 days
    paths:
      - public
  only:
    - develop
```
