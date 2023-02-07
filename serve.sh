hexo cl
hexo g 
docker build -t blog:latest -f Dockerfile .
docker run -d -p 4000:80 --name blog blog:latest