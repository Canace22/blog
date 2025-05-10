FROM nginx:latest
COPY public /usr/share/nginx/html
#　修改nginx的配置项
COPY docker/default.conf /etc/nginx/conf.d