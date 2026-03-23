---
title: typescript 笔记
description: 'tsconfig.json 配置项影响编译结果，需根据项目需求调整目标版本和模块系统。'
comments: true
toc: true
date: 2020-11-23 10:14:39
categories: Web开发
tags: JavaScript&TypeScript
---

## 一、快速上手

### 1. 安装

`npm i -g typescript`

### 2. 编译上下文

(1) `tsc --init` 创建 tsconfig.json 文件, 创建好之后的内容长这样的

```json
{
  // 编译选项定制
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* 基础选项 */
    // "incremental": true,                   /* 支持增量编译 */
    "target": "es5" /* 指定 ECMAScript 目标版本: 'ES3' (默认), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */,
    "module": "commonjs" /* 指定使用模块: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */,
    // "lib": [],                             /* 指定要包含在编译中的库文件 */
    // "allowJs": true,                       /* 允许编译 javascript 文件 */
    // "checkJs": true,                       /* 报告 javascript 文件中的错误 */
    // "jsx": "preserve",                     /* 指定 jsx 代码的生成方式: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* 生成相应的 '.d.ts' 文件 */
    // "declarationMap": true,                /* 为相应的 '.d.ts' 文件生成 sourcemap 文件. */
    // "sourceMap": true,                     /* 生成相应的 '.map' 文件 */
    // "outFile": "./",                       /* 将输出文件合并为一个文件. */
    // "outDir": "./",                        /* 指定输出目录 */
    // "rootDir": "./",                       /* 用来控制输出目录结构 --outDir */
    // "composite": true,                     /* Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true /* Enable all strict type-checking options. */,
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */

    /* Advanced Options */
    "skipLibCheck": true /* Skip type checking of declaration files. */,
    "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
  }
}
```

(2) 显式指定需要编译的文件

```json
{
  "files": ["./some/file.ts"]
}
```

(3) 使用 include 和 exclude 选项来指定需要包含的文件和排除的文件

```json
{
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

(4) 继承来自其他文件的配置项

```json
{
  "extends": "./tsconfig"
}
```

### 3. 开始编译

执行 `tsc` 会编译项目中指定的 ts 文件(没有配置则是全部)到指定目录

## 二、类型简介

### 1. 原始类型

js 中的 string、number、boolean 等原始类型可以直接作为类型注释

```ts
const a: number = 123;

const b: string = '123';

const c: boolean = false;
```

### 2. 特殊类型

(1) any: 可以被赋值给任意类型，也可以被任意类型赋值

```ts
const anyA: any = '123';

const numB: number = anyA;
```

(2) null、 undefined: 可以被赋值给任意类型

```ts
const nullA: number = null

const undefinedA:string = undefined
```

(3) void: 函数返回值为空

```ts
function funA():void {
  let res:string = '1212'
  return res // error
}
```

### 3. 元素类型相同的数组

数组的类型注释有两种方式

(1) 原始类型 + []

```ts
const arr: number[] = [1,2,3]
```

(2) 数组泛型 Array<T>

```ts
const arr:Array<number> = [1,2,3]
```

### 4. 元素长度已知的，每个元素类型已知的数组

这类数组可以用 ts 元组来注释

```ts
const x: [string, number] = ['hello', 10]
```

### 5. 接口

接口相当于给一个类型定义集合，用到该接口注释类型的，必须遵从里面的规则, 更多细节可以查看[文档](https://www.tslang.cn/docs/handbook/interfaces.html)

```ts
interface Name {
  first: string;
  second: string;
}

let nameA: Name;
nameA = {
  first: 'John',
  second: 'Doe',
};

nameA = {
  // Error: 'Second is missing'
  first: 'John',
};

nameA = {
  // Error: 'Second is the wrong type'
  first: 'John',
  second: 1337,
};
```

### 6. 泛型

函数参数未定，需要函数返回值与传入参数类型一致时，会用到泛型, 更多细节请查看[文档](https://www.tslang.cn/docs/handbook/generics.html)

```ts
function identity<T>(arg: T): T {
    return arg;
}
let output = identity("myString");  // type of output will be 'string'
```

### 7. 联合类型

当类型可能有多个时，可以选择用联合类型

```ts
function sqrt(x: number | string) {
  return x * x
}
```



参考文献:

[深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/)

[tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html)
