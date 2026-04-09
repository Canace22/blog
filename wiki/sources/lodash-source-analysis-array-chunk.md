# 来源：lodash 源码解析 —— chunk

- **源文件**：[`source/_posts/lodash-source-analysis-array-chunk.md`](../../source/_posts/lodash-source-analysis-array-chunk.md)
- **分类**：Web开发
- **标签**：框架与库
- **日期**：2021-01-26 09:24:31

## 摘要

chunk 核心依赖 slice 和 toInteger，需注意参数类型转换和索引处理。

