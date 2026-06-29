# SQLite、Hexo db.json 与 IndexedDB 的区别

> 来源：对话整理
> 日期：2026-06-26
> 关键词：SQLite, IndexedDB, Hexo, 数据存储, 前端

---

## 问题

SQLite 什么情况下用？和 Hexo 的本地数据库（db.json）有什么区别？浏览器内部的 IndexedDB 又是什么？

## 回答

### 1. SQLite

**是什么：** 轻量级关系型数据库，数据存储在单个 .db 文件中。

**适合场景：**
- 本地存储（Electron、移动端、浏览器扩展）
- 读多写少（配置、缓存、日志）
- 单用户/低并发
- 原型开发（零配置）
- 嵌入式应用

**不适合：**
- 高并发写入（会锁表）
- 分布式部署（文件在本地）
- 大规模数据（TB 级别性能下降）

### 2. Hexo db.json

**是什么：** Hexo 生成时自动创建的 JSON 缓存文件，存储文章元数据（标题、日期、标签、分类等），加速下次生成。

**特点：**
- 不是真正的数据库，是缓存
- 不支持 SQL 查询
- 不支持复杂关联
- 只是 Hexo 内部使用

**Hexo 的"数据库"：** Markdown 文件 + db.json 缓存

### 3. IndexedDB

**是什么：** 浏览器内置的 NoSQL 数据库，用于在客户端存储大量结构化数据。

**适合场景：**
- 离线应用（PWA）
- 客户端缓存大量数据
- 不需要后端的本地应用

**特点：**
- 运行在浏览器内
- NoSQL 数据模型（键值对/对象）
- JavaScript API 查询
- 异步事务
- 容量受浏览器限制（几百 MB）

## 三者对比

| 维度 | SQLite | Hexo db.json | IndexedDB |
|------|--------|--------------|-----------|
| 类型 | 关系型数据库 | JSON 缓存文件 | 浏览器 NoSQL |
| 运行环境 | 服务器/本地 | Node.js 进程 | 浏览器 |
| 查询方式 | SQL | 遍历文件 | JavaScript API |
| 持久化 | 文件存储 | 文件存储 | 浏览器存储 |
| 容量限制 | 无硬性限制 | 无硬性限制 | 几百 MB |
| 适用场景 | 服务器/桌面应用 | 静态博客生成 | Web 离线应用 |

## 应用场景

- **Electron 应用** → SQLite（本地文件）
- **Web 应用** → IndexedDB（浏览器内）
- **静态博客** → Markdown 文件 + 缓存
- **离线优先应用** → IndexedDB + 后端同步

## 相关链接

- [SQLite 官网](https://www.sqlite.org/)
- [IndexedDB MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)
- [Hexo 官网](https://hexo.io/)
