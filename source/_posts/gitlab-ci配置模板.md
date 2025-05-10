---
title: gitlab ci 配置模板
comments: true
date: 2018-10-22 19:29:20
categories: 项目管理
tags: git
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
