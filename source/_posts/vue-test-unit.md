---
title: Vue 单元测试
categories: Web开发
tags: 单元测试
comments: true
toc: true
date: 2020-10-28 16:25:02
---
### 一、Vue-cli 安装测试模块

1、安装相关依赖

```sh
npm install --save-dev @vue/test-utils @vue/cli-plugin-unit-jest
```

2、根目录创建 jest.config.js 文件并进行基础配置

```js
module.exports = {
  // 显示每一个测试的结果
  verbose: true,
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
  // 测试覆盖率相关
  collectCoverage: true,
  coverageReporters: ["html"]
};
```

3、支持并配置 Babel 

(1) 安装相关依赖

```shell
npm install --save-dev @vue/cli-plugin-babel
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

### 三、测试覆盖率

1、配置

```json
{
  collectCoverage: true,
  // 报告形式
  coverageReporters: ["html", "text-summary"],
  //需要测试覆盖率的文件路径
  collectCoverageFrom: [ 
    "src/**/*.{js,vue}",
    "!src/App.vue",
    "!src/main.js",
    "!src/router.js",
    "!src/plugin/*.{js,ts,vue}",
    "!src/store.js"
  ],
   /**
   * 指定测试最低覆盖率
   * 一般由开发人员商定，项目复杂程序越高，覆盖率指数越低
   */
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
```

2、报告中的几个指标说明

(1) Statements: 语句覆盖率

(2) Branches: 选择分支覆盖率

(3) Functions: 函数覆盖率

(4) Lines: 行覆盖率

3、tips

静态组件是不会被输出到覆盖率报告的(没有操作方法的组件)





