# 软件开发范式演进

## 来源

- [软件开发范式演进（Telegram 摘录）](../sources/software-development-paradigms.md)（频道「嘴码专项工作频道」，2026-04-30）

## 核心要点

软件开发范式的演进并非严格的历史分期，不同范式根据项目规模、业务复杂度、团队协作方式和技术环境**被组合使用**，而非固定递进。

## 主要范式

| 范式 | 核心思想 | 关键词 |
|------|---------|--------|
| 面向过程编程 | 以执行流程为核心组织代码 | 顺序性、函数/过程 |
| 面向对象编程 | 数据与行为封装为对象 | 封装、继承、多态 |
| 面向接口编程 | 依赖抽象而非具体实现 | 解耦、可替换性 |
| 组件化/分层架构 | 职责明确边界清晰、可组合可替换 | 分层、依赖注入 |
| 微服务/云原生 | 服务独立部署、弹性扩展 | 容器化、弹性、可观测 |

## AI 集成阶段演进

从一年游戏研发 AI 化实践中提炼的四阶段模型，可视为软件开发范式在 AI 时代的延伸层：

| 阶段 | 核心特征 |
|------|---------|
| AI 工具化 | 人主导，AI 辅助；原流程不变 |
| AI Workflow | AI 进入流程节点；决策权仍在人 |
| AI Native System | 系统从设计之初以 AI 为核心，架构整体重构 |
| AI Native Organization | 组织结构随技术演进；业务人员管理多 Agent |

来源：[AI Native 不是接个 API](../sources/ai-native.md)

## 另见

- [LLM 维护的知识库](../concepts/llm-maintained-wiki.md) — 本页原料经 Ingest 从 Telegram 来源转入 wiki
- [软件开发范式演进（来源）](../sources/software-development-paradigms.md)
- [AI 辅助开发](../concepts/ai-assisted-development.md)
- [AI Native 不是接个 API](../sources/ai-native.md)

---

*维护：Cursor Agent，2026-06-03。*
