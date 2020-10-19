---
title: Vue 单元测试
categories: web
tags: 单元测试
comments: true
toc: true
date: 2020-10-19 16:25:02
---
### 一、Vue-cli 安装测试模块

1、安装相关依赖

```sh
npm install --save-dev @vue/test-utils @vue/cli-plugin-unit-jest
```

2、根目录创建 jest.config.js 文件并进行基础配置

```js
module.exports = {
  // support the same @ -> src alias mapping in source code
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  moduleFileExtensions: [
    "js",
    "json",
    // tell Jest to handle `*.vue` files
    "vue"
  ],
  // 测试覆盖率
  collectCoverage: true,
  coverageReporters: ["html"]
};
```

3、支持并配置 Babel 

(1) 安装相关依赖

```shell
npm install --save-dev babel-jest @vue/cli-plugin-babel/preset
```

(2) jest.config.js 添加以下配置

```json
preset: "@vue/cli-plugin-unit-jest",
```

(3) babel.config.js 添加以下配置 

```json
presets: ["@vue/cli-plugin-babel/preset"]
```

### 二、测试可用性

根目录创建 tests/unit/example.spec.js, 随手一些段 jest 测试代码

```js
import { sum } from "./test";

test("test sum", () => {
  expect(sum(1, 1)).toBe(2);
});
```

创建 tests/unit/test.js 文件

```js
export const sum = (a, b) => a + b;
```

package.json script 加一个脚本配置: `"test:unit": "vue-cli-service test:unit"`

然后执行: `yarn test:unit`

就可以看到控制台输出如下字符，说明测试可以正常运行

```
PASS  tests/example.spec.js
✓ test sum (1ms)
```

