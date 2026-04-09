# 来源：webpack 动态修改资源域名

- **源文件**：[`source/_posts/webpack-dynamic-modify-resource-domain.md`](../../source/_posts/webpack-dynamic-modify-resource-domain.md)
- **分类**：工程化与运维
- **标签**：构建与部署
- **日期**：2021-04-09 17:15:37

## 摘要

动态修改资源域名需在入口文件设置 __webpack_public_path__，但会引发资源重复加载问题。

