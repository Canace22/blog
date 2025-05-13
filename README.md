1. 创建文章：` hexo n `

2. 发布文章到 gitpages：` hexo clean ` => ` hexo g ` => ` hexo s ` => ` hexo d `

---

## 使用 Docker 部署 Hexo 静态博客到阿里云服务器

### 1. 本地生成静态文件
```bash
hexo clean
hexo g
```

### 2. 上传 public 目录到服务器
```bash
scp -r ./public root@你的ECS公网IP:/项目路径/public
```

### 3. 启动 Nginx 容器服务
在服务器项目根目录执行：
```bash
docker-compose up -d
```

### 4. 访问博客
在浏览器输入服务器公网IP:4000 或绑定的域名:4000 即可访问。

### 5. 更新博客内容
每次本地写完博客后，重新生成 public 并上传覆盖服务器 public 目录即可，无需重启容器。