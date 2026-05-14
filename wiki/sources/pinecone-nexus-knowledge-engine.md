# Pinecone Nexus：Knowledge Engine

- 来源：https://www.pinecone.io/blog/introducing-nexus-knowledge-engine/
- 作者：Jeff Zhu, Siva Ragavan
- 日期：2026-05-04
- 出版：Pinecone
- 分类：工程 / AI 基础设施

## 核心论点

生产级 AI agent 的瓶颈不在模型推理能力，而在**上下文工程**（context engineering）——把原始数据编译成模型可直接使用的结构化知识。Pinecone 将此产品化为 **Knowledge Engine**。

## 问题：agent 把 token 和延迟花在"组装上下文"上

作者用一个投资分析 agent（比较 NVIDIA、Microsoft、Walmart 的 10-K 股票回购数据）说明四种生产要求：

- **准确性**：可重复的正确答案
- **延迟**：秒级，不是分钟级
- **Token 成本**：每次调用有上限
- **治理**：字段级权限和溯源

两种常见方案都有缺陷：

1. **Agentic RAG**：分块嵌入文档，agent 多轮检索和重排序
2. **Coding Agent（沙箱）**：给 agent 文件系统工具（grep、read），让它自己循环

两种都迫使 agent 在查询时组装知识，消耗大量 token 和延迟在"找路"而非"推理"上。

## 解决方案：预编译知识（Compiled Knowledge）

核心洞察：提前把数据加工成编码了所需结构的 **artifact**，而不是每次查询时推导结构。这与知识图谱、语义层等数据基础设施思路一脉相承，但应用于 agent 场景。

### 规模化挑战

即使为一个领域构建 artifact 层也需要数月和专业团队。一个公司有几十个领域（销售、法务、财务、客服、研发），手工构建不现实。

## Pinecone Nexus 架构

四个可组合原语：

### 1. Artifact（制品）

为特定任务构建的、带类型和治理的信息单元。同一源数据为不同 agent 生成不同形状的 artifact：市场分析 agent 拿到财务指标，合规 agent 拿到风险因素披露。

### 2. Context（上下文）

为特定角色、团队或工作流策划的 artifact 集合。分析师的 bundle 包含财务指标加上 MD&A 和分部报告等叙述性章节。

### 3. Knowledge（知识）

公司内所有 context 的总体。查询可跨多个 context，引擎处理路由。

### 4. Knowledge Engine（知识引擎）

构建和提供上述所有内容的系统，核心是 **Context Compiler**。

## Context Compiler（上下文编译器）

一个自主 coding agent，使用以下组件构建任务优化的 context：

1. **评估集**（eval set）：每个领域的代表性任务 + 已知答案 + 数据源
2. **预审技能库**（pre-vetted skills）：文档处理、实体提取、分块等可组合技能
3. **反馈循环**：每轮迭代对 eval 信号评分

编译器迭代修改两个函数——`curate()`（制品构建）和 `query()`（知识检索），运行 eval 并优化直到通过。领域专家无需检索专业知识即可产出优化的 context，编译器自动发现 artifact 结构、粒度和策略。早期合作伙伴从数月缩短到数天即可服务新领域。

## KnowQL（知识查询语言）

声明式查询接口，agent 指定*需要什么*，返回精确、带类型、带引用的响应。四类参数：

- **Intent**：问题、响应形状、目标 context（可跨多个 context 组合）
- **Filter**：确定性谓词和访问控制策略
- **Provenance**：字段级引用，构建时内嵌，非事后重建
- **Control**：预算包络，含深度和延迟目标；成本以结果声明，非 token

### 示例

结构化 JSON 对象指定问题、ground truth 要求和带类型的输出形状（`company_name`、`repurchased_usd_millions` 等）。引擎返回类型化响应；agent 唯一的推理步骤是比较数值。

## 基准测试：KRAFTBench

**KRAFTBench**（Knowledge Retrieval Assessment Framework for Text）衡量不同检索机制下 agent 响应的准确性、延迟和 token 成本。

### 设置

- 493 份 S&P 500 公司 2022 年 10-K 文件（每份约 500KB，总计约 245MB）
- 150 个难题，覆盖 9 个行业、10 个财务主题
- 三种难度形态：多事实、多公司、多步骤
- 约束：每题 120 秒、100 万 token 上限

### 结果

| 方案 | 完成率 | 平均延迟 | 平均准确率 | 平均 Token | 平均步骤 |
|---|---|---|---|---|---|
| **Pinecone Nexus** | 100% (150/150) | 22.7s | 0.680 | 6,733 | 1.69 |
| **Agentic RAG** | 98.7% (148/150) | 37.9s | 0.413 | 49,103 | 7.77 |
| **Coding Agent** | 62.7% (94/150) | 84.1s | 0.585 | 528,301 | 14.77 |

Nexus 的 token 成本约为 RAG 的 1/7、Coding Agent 的 1/80。

### 失败模式

- **Coding Agent**：宽泛正则匹配返回数百结果，消歧耗尽 token 预算
- **Agentic RAG**：分解为 18 个子事实，但美元数字与分块不共置时丢失信息
- **Nexus**：编译好的公司级"fact sheet"制品实现多实体比较的单次回答

## 企业集成示例：Box → Unstructured → Pinecone Nexus

法律审查工作流：

1. **Box**：存储源文档，含文件元数据和访问控制列表
2. **Unstructured**：解析 PDF/Word 为结构化格式，提取实体、表格，传递权限元数据
3. **Pinecone Nexus**：摄入解析输出，运行 Context Compiler，产出制品（如合同续期条款表），查询时强制执行权限过滤

同一合同 context 可服务法务运维 agent、销售续期风险 agent、合规 agent——全部来自同一 Box 源。

## 对本仓库的启示

- **Context Compiler 的思路**与本仓库的 LLM-maintained wiki 工作流高度共鸣：都是把原始材料预编译成结构化知识层
- **Artifact / Context / Knowledge 的分层**与 `wiki/sources` → `wiki/concepts` → `wiki/index.md` 的层次对应
- **KnowQL 的声明式查询**提示了 agent 查询知识库的一种理想形态：指定需要什么形状的数据，而非自己组装
- **KRAFTBench** 量化了"预编译 vs 查询时组装"的差距：token 成本差 7-80 倍，延迟差 2-4 倍

## 相关

- [编译式知识库](../concepts/compiled-knowledge-vault.md)——Nexus 的 "compiled knowledge" 与此概念直接对应
- [LLM 维护的知识库](../concepts/llm-knowledge-bases.md)——本仓库的 LLM-maintained wiki 是小型个人版的"知识预编译"
- [Harness Engineering](../concepts/harness-engineering.md)——Context Compiler 属于 harness 的一种实现
- [AI Knowledge Bases](../concepts/ai-knowledge-bases.md)——Nexus 是企业级 AI 知识库的基础设施方案

---

*assistant 整理；2026-05-12*
