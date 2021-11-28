1. 创建文章：` hexo n `

2. 发布文章到 gitpages：` hexo clean ` => ` hexo g ` => ` hexo s ` => ` hexo d `

```bash
docker build -t blog .

docker login --username=1402779770@qq.com registry.cn-hangzhou.aliyuncs.com
docker tag 047041f452b0 registry.cn-hangzhou.aliyuncs.com/canace/blog:v1
docker push registry.cn-hangzhou.aliyuncs.com/canace/blog:v1

docker pull registry.cn-hangzhou.aliyuncs.com/canace/blog:v1

docker run --name blog -d -p 80:80 registry.cn-hangzhou.aliyuncs.com/canace/blog:v1
```