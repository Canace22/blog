---
title: vscode代码格式化总结
categories: Web开发
tags: 开发环境
comments: true
date: 2020-03-30 10:17:59
---

工欲善其事必先利其器，有一个完美的代码编辑工具，可以大幅提高编码效率，从团队的角度讲，也有利于促进团队的写作。我个人是个强迫症，看不得一点的不干净，于代码如是。在多人合作的项目中也会发现，每个人的编码风格和格式化工具不一样，拉下代码来还要重新格式化，看看哪里不对不说，还会弄出一些奇怪的问题。鉴于此，我研究了一段时间怎么统一代码风格，怎么做才能让代码自动格式化符合标准，怎么自动修复一些代码错误。答案是，eslint + prettier 可以完美做到，关于这个，网上有很多教程，我的配置如下：

```json
{
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 100,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.wordWrapColumn": 120,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": false,
  "prettier.semi": true,
  "prettier.singleQuote": true,
  "prettier.disableLanguages": ["vue"],
  "editor.formatOnPaste": true,
  "editor.autoIndent": "keep",
  "search.followSymlinks": false,
  "vetur.format.defaultFormatter.html": "prettyhtml",
  "vetur.format.defaultFormatter.js": "prettier",
  "eslint.validate": [
      "javascript",
      "javascriptreact",
      "html",
      "vue",
  ],
  "eslint.format.enable": true,
}
```

自动格式化工具设置为 prettier, 配合 eslint 自动格式化，基本可以满足一般的代码风格配置。但是 vue 的格式化我们一般会用到 vetur, 因为某些原因，这会导致格式化时，单引号变为双引号， 这就很不舒服了，为了解决这个问题，需要添加以下配置：

```
"prettier.disableLanguages": [
    "vue"
],
```

eslint 设置

```json
"rules": {
  "semi": [
    "error",
    "always"
  ],
  "no-tabs": "off",
  "no-console": "off"
},
```

此外，vetur 最新版因为增加了对 ts 的支持，模板中的属性变量会标红，这里需要设置 "vetur.experimental.templateInterpolationService" 为 false，方能解决
