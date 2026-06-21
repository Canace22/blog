# Source: AI Native 不是接个 API

## Source File

- `source/_posts/ai-native.md`

## Summary

One-year field report from building AI Native applications for a game development team. Distinguishes "AI化" (grafting AI onto existing systems) from "AI Native" (designing from the ground up with AI as a core capability). Proposes a four-stage model and an entity-centric architecture approach.

## Key Points

- **Two modes distinguished**:
  - *AI化*：在现有系统里接入大模型 API；效率有提升，但本质是对原流程的能力增强，不是重构
  - *AI Native*：设计系统时就把 AI 当作核心能力来考虑，而不是后期增加的外挂功能

- **Four-stage model**:
  1. **AI 工具化** — 人主导、AI 辅助；原有流程几乎没有变化（绝大多数企业目前所处阶段）
  2. **AI Workflow** — AI 开始参与业务流程（如需求拆解、方案生成、代码与测试用例生成）；决策权仍在人手里；很多 Agent 产品停留在这一阶段
  3. **AI Native System** — 系统从设计之初就假设 AI 的存在；整个架构围绕 AI 重新设计（如「提出想法 → AI 生成初稿 → AI 补充资料 → AI 校验事实 → 人工修改 → 发布」）
  4. **AI Native Organization** — 组织结构随之变化；业务负责人管理多个 Agent，人工负责关键决策和最终审核

- **Entity-centric redesign（以业务实体为核心）**:
  - 游戏研发场景中，真正贯穿整个生产过程的不是流程，而是角色、NPC、场景、道具、事件等**业务实体**
  - 实体之间的关系（角色↔剧情↔任务）结构化为**知识图谱**，作为所有 AI 能力的统一上下文来源
  - 每道工序用 SOP（标准作业流程）明确规定**输入/输出**；执行单元（人/AI/工具/Workflow）可互换

- **Pipeline**：多个 SOP 串联，推动实体从一个生命周期阶段流转到下一个；验证有效后固化进系统，沉淀为组织能力

- **数据取数区分**：高度结构化信息（配音/数值配置）直接读权威数据源；半结构化/非结构化信息（剧情背景、角色关系）需 AI 理解、筛选、重组后才能被下游流程消费

- **Principles distilled（提炼出的原则）**:
  1. 先抓实体，再设计流程（Pipeline / SOP 围绕实体生命周期构建）
  2. 输入输出必须标准化（每个环节只消费自己需要的信息，产出能被下一道工序直接消费的结果）
  3. 执行者不是重点（人和 AI 都只是执行单元，关键在于谁更适合当前工作）
  4. System 的价值在于把隐性经验转化为可执行机制（经验停留在人脑里，组织能力就无法积累和复用）
  5. 事实源、标准和数据回流机制必须掌握在核心团队手中

## Related Concepts

- [AI 辅助开发](../concepts/ai-assisted-development.md)
- [软件开发范式演进](../concepts/software-development-paradigms.md)
- [LOP（面向大模型编程）模式](../concepts/lop-patterns.md)

## 另见（本库相近资料）

- [面向大模型编程在游戏制作流程中的应用畅想](../sources/ai-coding-game.md)
- [AI赋能存量项目——从函数助手到业务伙伴](../sources/ai-coding-share.md)
- [AI 角色分工：多角色专业化实践](../sources/ai-worker.md)
- [使用大模型来维护知识库](../sources/llm-wiki.md)

---

*草稿：assistant（claude-sonnet-4-6），2026-06-21。*
