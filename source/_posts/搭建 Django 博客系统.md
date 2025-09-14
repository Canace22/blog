---
title: 搭建 Django 博客系统
date: 2018-05-20 14:30:48
updated: 2018-05-20 15:10:00
categories: Web开发
tags:  [服务端,Python/Go/其他]
comments: true
---

##### 一、 环境：

win7 系统、Django、python

##### 二、 需求分析：

实现博客的创建、编辑和删除功能，并开通后台 admin,加入富文本编辑器，并入项目中

##### 三、 搭建 Django 网站：

1. 检查 Django 版本信息，python >> import django >> django.get_version()

2. 启动 DOS 命令窗口，切换到相应文件路径，输入：`django-admin startproject mysite(网站名称)` 命令，创建一个 blog 项目目录。

3. `cd mysite` > `ls -l` 查看项目目录，可以看到项目目录包括：_init_.py、manage.py、setting.py、urls.py。_init_.py 会把项目目录变成一个 python 包（相关模块的一个集合)，可以方便我们用 python 的“点记号”来制定项目中的某个部分，比如 mysite.urls。

4. manage.py 是项目的启动文件，我们完成之后，要在 dos 中启动的就是这个文件。

5. setting.py 顾名思义，项目的配置文件，主要用来配置数据库、变量之类的基础信息。

6. urls.py 有点像路由配置，就是一些路径的集合，方便在文件中调用。

##### 四、 搭建 Django 博客：

`cd mysite` < `python manage.py startapp blog` 利用 manage.py 创建博客 app，可以看到生成了*init.py*、models.py、views.py。同样的,_init_.py 把博客变成了一个 python 包，model.py 和 views.py 是两个空文件，先占着位置。

##### 五、 修改配置文件：

打开 setting.py ，找到 INSTALLED_APPS 元组，把 APP 以模块的形式添加到元组里。

##### 六、 初始化后台数据库：

1. 由于使用的是 mysql 数据库，而 Django 默认的数据库是 SQLite3 ，所以需要修改 setting.py 文件中的数据库信息。

2. 同步数据库信息：`python manage.py migrate`

3. 创建超级管理员账号，用于登录 admin 初始化后台数据库

4. 访问 admin 后台： `python manage.py runserver` 启动页面，然后在主页链接后面加上 admin 路径 /admin/，用新创建的超级用户登录，就可以看到管理者后台了。

##### 七、设计数据表

打开 blog 目录下的 models.py 文件，加入以下代码：

```
from django.db import models

# Create your models here.
class BlogsPost(models.Model):
    title = models.CharField(max_length = 150)  # 博客标题
    body = models.TextField()                   # 博客正文
    timestamp = models.DateTimeField()          # 创建时间
```

然后执行 `python manage.py makemigrations blog` > `python manage.py migrate` 命令，同步数据库。

##### 八、 admin 后台管理搭建：

1. 打开 setting.py 文件，找到 INSTALLED_APPS 添加 `django.contrib.admin` 内置模块到元组里。

2. 打开 urls.py ，配置 admin 的 url 映射，也就是添加`（r'^admin/',include(django.contrib.admin.urls')),`到文件里。

3. 注册 BlogPost model，打开 blog/models.py 文件，添加以下代码,启动项目，访问 admin 路径，就可以在后台添加 blog 文章了。

```
from django.db import models
from django.contrib import admin

# Create your models here.

class BlogsPost(models.Model):
    title = models.CharField(max_length = 150)  # 博客标题
    body = models.TextField()                   # 博客正文
    timestamp = models.DateTimeField()          # 创建时间

admin.site.register(BlogsPost,BlogPostAdmin)
```

4. 但是我们发现这个 blog 管理界面有点丑，怎么办？添加一个列表展示类，就可以选择我们需要展示的内容了，代码如下,打开页面，点击 title 我们可以发现会按照 title 进行文章排序，点击其他两个，一样的效果。

```
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'body','timestamp')
```

##### 九、 创建文章列表模板：

在 blog 项目下创建 templates 目录（mysite/blog/templates/）,在目录下创建模板文件 archive.html，内容如下：

```
{% for post in posts %}
    <h2>{{ post.title }}</h2>
    <p>{{ post.timestamp }}</p>
    <p>{{ post.body }}</p>
{% endfor %}
```

##### 十、创建视图模板

打开 mysite/blog/views.py 文件，添加以下代码：

```
from django.template import loader,context
from django.http import HttpResponse
from matrixtech.blog.models import BlogsPost

# Create your views here.
def archive(request):
    blog_list = BlogsPost.objects.all()  # 获取所有数据
    t  = loader.get_template('archive.html')
    c = context({{'posts': posts }})
    return HttpResponse(t.render(c))  # 返回blog.html页面
```

##### 十一、创建 blog 的 url

1. 在 mysite/urls 里创建 url 模式，添加如下代码

```
url(r'^blog/', include('blog.urls'))
```

2. 在 blog/urls 定义 url，添加以下代码,重启服务，就可以访问 blog 了。

```
from django.conf.urls.defaults import  *
from matrixtech.blog.views import archive

urlpatterns = [
    url(r'^$', archive),
]
```

##### 十二、 博客整合到网站中

博客创建好之后，我需要把它整合到项目中，这里我主要是用链接的形式，把博客链接放在了主导航栏上，点击就会跳转到博客，博客导航栏有主页项，点击也可以调回来。方法是这样的：

通过 url 匹配名称，查找资源位置，代码如下：

```
<a href="{% url 'blog' %}">博客</a>
```

##### 十三、博客外观改善

1. 外观改善主要是生成 templates 文件夹，在里面添加一个 archive.html 文件作为文章模板，还有各个 theme.html 文件作为页面主题模板，其中会涉及到一些 Django 模板语言，需要去了解下，感觉用起来爽歪歪。

2. 除了模板语言之外，可以直接通过 url 来查找相关的。
