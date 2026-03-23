---
title: 第一个 Go 程序
description: '安装 Go 后新建 hello.go 文件运行成功说明环境配置正确'
categories: Web开发
tags: [后端, Python/Go/其他]
comments: true
date: 2020-11-25 15:54:05
---
1、[下载](https://golang.org/dl/)

2、测试是否安装成功, 并运行程序

(1) 新建 hello.go

```go
package main

import "fmt"

func main() {
	fmt.Printf("hello, world\n")
}
```

(2) 执行代码

```go
go run hello.go 
```

(3) 编译二进制文件

编译 hello.go, 生成一份 hello 文件，执行该文件, 会输出一行 "hello, world"

```go
go build hello.go
./hello
```

(2)(3) 任一步骤执行成功，说明安装成功了