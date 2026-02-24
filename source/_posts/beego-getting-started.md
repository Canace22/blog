---
title: 开始用 beego 写 http 服务
categories: Web开发
tags: [后端, Python/Go/其他]
comments: true
toc: true
date: 2020-11-27 19:23:53
---

## 一、安装

### 1. 框架安装

`go get -u github.com/astaxie/beego`

这里遇到了 git https 无法获取的问题，按照官方提示，配置本地的 git，关闭 https 验证

`git config --global http.sslVerify false`

### 2. 脚手架安装

`go get -u github.com/beego/bee` 

这里遇到的问题是 go module 一直安装不了，解决方法是切换 go module 镜像:

```go
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

### 3. 环境变量配置

```sh
vim ~/.bash_profile

# go
export GOPATH=${HOME}/go
export PATH=${PATH}:${GOPATH}/bin
# go end

source ~/.bash_profile
```

执行 `bee version` 成功说明配置成功了

## 二、开始使用

### 1. 初始化项目:

初始化一个 web 项目: `bee new myproject`

初始化一个 api 项目: `bee api apiproject`

### 2. 运行项目

`bee run`, 打开 http://localhost:8080/ 就可以看到一个界面啦

我的目的是要用来写 api 的，用的是第一种方式而不是第二种方式，因为对于初学者，第一种方式创建的项目比较好理解，而且官方的入门文档例子也是第一种方式创建的项目

### 3. get 输出一份 json 文档

#### (1) 修改端口

由于 8080 端口太经常使用了，先来把这个端口改为 7777 这个冷门端口吧

```ini
# conf/app.conf
httpport = 7777
```

跑一下代码，打开 http://localhost:7777/，页面正常打开说明修改成功了

#### (2) controllers.MainController 改造

打开 router 文件会发现 '/' 映射到了 controllers.MainController, 也就是这个路由的逻辑在 controllers.MainController 里面，重置一下 MainController 的 Get 接口

```go
// Get is ……
func (u *MainController) Get() {
	info := map[string]interface{}{
		"name": "Amy",
		"age": 18,
	}
	class := map[string]interface{}{
		"sub": "ch",
		"num": 3,
	}
	list := map[string]interface{}{
		"info": info,
		"class": class,
	}
	datas := map[string]interface{}{
		"F_responseNo":"200 ok",
		"F_list": list,
	}
	u.Data["json"] = datas
	u.ServeJSON()
}
```

重新跑一下程序，会发现 http://localhost:7777/ 输出了一份 json，其结构如下:

```json
{
  "F_list": {
    "class": {
      "num": 3,
      "sub": "ch"
    },
    "info": {
      "age": 18,
      "name": "Amy"
    }
  },
  "F_responseNo": "200 ok"
}
```

这就是我们前端经常拿到接口的数据格式了，但是我们的路由经常是 /v1/ 这样的，而不是直接用根路由，下面我们再来实现一个更复杂点的路由

### 4. 实现 v1/elabresource/save 接口

#### (1) router 改造

添加 v1/elabresource/save 路由，指明该使用 post 方法，并映射到 controllers.LabResourceController 的 SaveLabResource 函数

```go
// routers/router

func init() {
		beego.Router("/", &controllers.MainController{})

		nsv1 := beego.NewNamespace("/v1",
			beego.NSNamespace("/elabresource",
				beego.NSRouter("/save", &controllers.LabResourceController{}, "post:SaveLabResource"),
			),
		)

	beego.AddNamespace(nsv1)
}
```

#### (2) SaveLabResource 函数实现

首先，声明一个 LabResourceController 结构体

```go
type LabResourceController struct {
	beego.Controller
}
```

在 post 方法中，我们经常会传递一些参数供服务端使用，所以这里需要拿到参数，获取 form 类型的参数可以通过结构体直接获取，比如这样

```go
type saveLabResourceParams struct {
	F_name        string `form:"F_name" valid:"Required"`
	F_cover_url   string `form:"F_cover_url"`
	F_data        string `form:"F_data"`
}
```

在以上结构体中，我们声明了三个键，分别是: F_name、F_cover_url、F_data,此时他们的值都还是零值。

要拿到这几个参数的值还需要用 ParseForm 方法进行解析，所以最终的逻辑是这样的:

```go
// SaveLabResource 实验保存接口
func (u *LabResourceController) SaveLabResource() {
	params := &saveLabResourceParams{}

	datas := map[string]interface{}{
		"F_responseNo": "200 ok",
		"F_save_id": 124
	}

	if err := u.ParseForm(params); err != nil {
		// 参数异常
		datas["F_responseNo"] = 10001
		fmt.Println(err)
		return
	}

	fmt.Println(params)

	//跨域支持
	u.Ctx.ResponseWriter.Header().Set("Access-Control-Allow-Origin", "*")

	u.Data["json"] = datas
	u.ServeJSON()
}
```

到此，我们就实现了 v1/elabresource/save post 接口, postman 发送一个 post 请求到 http://127.0.0.1:7777/v1/elabresource/save ，收到一份如下 json 数据，说明成功了

```json
{
  "F_responseNo": "200 ok",
  "F_save_id": 1231
}
```

但是，到这里我们还没有对数据做任何处理，只是简单的上传数据，这显然是没什么用的，正常情况下，我们会把保存的数据存到数据库，以便下次可以拿回记录，所以下一步我们要实现的就是 post 数据，服务端存储数据到 mysql 数据库，并返回相应的 id 给客户端。

### 5. 使用 mysql 操作数据

要操作数据库，我们使用 gorm，目前使用用户比较多, 因为项目中用到了 go module, 在 run 的时候会自动帮我们安装，这里就不安装，直接引入。

新建一个 models/labresource 文件，在里面实现相关逻辑。

首先引入相关模块

```go
import (
	"fmt"
	"gorm.io/gorm"
	"gorm.io/driver/mysql"
)
```

然后初始化一下 mysql 数据库，因为需要多处用到，所以需要存到全局变量里

```go
//  models/labresource

var (
	dbOrmDefault   *gorm.DB
	err error
	myConfig       Mconfig
)

func init() {
	myConfig = Mconfig{}

	myConfig.dBHost = "127.0.0.1:3306"
	myConfig.dBName = <yourDatabaseName>
	myConfig.dBUsername = "root"
	myConfig.dBPassword = <yourpsd>

	db, er := gorm.Open(mysql.New(
		mysql.Config{
			DSN: myConfig.dBUsername+":"+myConfig.dBPassword+"@tcp("+myConfig.dBHost+")/"+myConfig.dBName+"?charset=utf8&parseTime=True&loc=Asia%2FShanghai", // DSN data source name
			DefaultStringSize: 256, // string 类型字段的默认长度
			DisableDatetimePrecision: true, // 禁用 datetime 精度，MySQL 5.6 之前的数据库不支持
			DontSupportRenameIndex: true, // 重命名索引时采用删除并新建的方式，MySQL 5.7 之前的数据库和 MariaDB 不支持重命名索引
			DontSupportRenameColumn: true, // 用 `change` 重命名列，MySQL 8 之前的数据库和 MariaDB 不支持重命名列
			SkipInitializeWithVersion: false, // 根据当前 MySQL 版本自动配置
		}), &gorm.Config{})
	
	if er != nil {
		fmt.Print(er)
		return
	}
	dbOrmDefault = db
}
```

在以上代码中，我们对 mysql 做了一些节本配置，比如设置 DNS

初始化完数据库，当然是使用它啦

声明一个结构日 LabResource，我们接下来会用到它

```go
// LabResource 仿验结构体
type LabResource struct {
	ID        int64  `gorm:"primary_key" json:"saveId"`
	Name     string `json:"name"`
	CoverImg string `json:"coverImg"`
	Data             interface{} `json:"data,omitempty" gorm:"-"`
}
```

试着把拿到的数据存到数据库, 具体的语法自行可以查看 gorm 官方文档

```go
// SaveLabResource ……
func SaveLabResource(name string, coverImg string, jsonData string) (int64) {
	var err error
	var data interface{}

	labResource := LabResource{
		ID:               int64(1231),
		Name:             name,
		CoverImg:         coverImg,
		Data:             data,
	}

	err = dbOrmDefault.Model(&LabResource{}).Create(labResource).Error; 
	
	if err != nil {
		return 0
	}

	return labResource.ID
}
```

调用一下这部分代码，我们就实现了 post 数据并存到 mysql 数据库的逻辑啦，完结撒花

