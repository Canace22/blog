# 来源：获取 DOM style 的正确姿势

- **源文件**：[`source/_posts/get-css-style.md`](../../source/_posts/get-css-style.md)
- **分类**：Web开发
- **标签**：前端，CSS与可视化
- **日期**：2022-06-22 10:20:29

## 摘要

直接用 dom.style 获取样式会丢失部分属性 改用 getComputedStyle 才能正确读取所有样式值

