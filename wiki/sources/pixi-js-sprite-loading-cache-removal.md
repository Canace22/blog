# 来源：PixiJs ———— 精灵加载去缓存

- **源文件**：[`source/_posts/pixi-js-sprite-loading-cache-removal.md`](../../source/_posts/pixi-js-sprite-loading-cache-removal.md)
- **分类**：Web开发
- **标签**：前端，CSS与可视化
- **日期**：2020-04-06 21:32:30

## 摘要

使用 PIXI.Loader.shared 替代新实例可避免缓存警告，但需注意资源加载期间不能重复添加。

