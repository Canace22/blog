# 来源：面向大模型编程（LOP）在游戏制作流程中的应用畅想

- **源文件**：[`source/_posts/ai-coding-game.md`](../../source/_posts/ai-coding-game.md)
- **分类**：AI 探索 / AI 编程
- **日期**：2025-12-10

## 摘要

讨论 LOP（面向大模型编程）在游戏制作中的可能用法：对比 Web 领域已成体系的「拆解—开发—质检—DevOps」链路，设想剧本、策划、美术音频、引擎等环节里模型能做什么；强调不主张「AI 代做游戏」，更偏向**内容迭代、demo 验证、玩家共创**等方向。

## LOP 模式（原文归纳）

1. **Direct Prompt-to-Coding**：单轮出完整可运行产物，无工具与外部记忆。
2. **Autonomous Agent Programming**：多轮工具调用 + 工作区状态，类 Agent 流程。
3. **Chain-of-Verification + Structured Reasoning**：生成前显式推理链，降幻觉。
4. **Retrieval-Augmented Code Generation**：私有代码库/文档检索作 context（如 `@codebase`）。
5. **Skeleton-then-Fill**：人定骨架与占位，模型填细节。
6. **Self-Healing / Iterative Refinement**：运行失败 → 日志回灌 → 自动 patch 循环。

## 游戏相关设想（原文）

- **内容与玩法迭代**：用 LLM 创作内容；因输出随机，满意结果应以**结构化文档沉淀**，供下次迭代（角色、武器、技能等）；结构化内容可被引擎解析或用于互动视频、二创等。
- **玩家共创**：在共创流程中接入与模型的交互，迭代剧本、刷新角色与玩法。

## 关联概念

- [LOP 模式与产物](../concepts/lop-patterns.md)
- [LLM 维护的知识库](../concepts/llm-maintained-wiki.md)（与「结构化沉淀、再喂给模型」一致）
