# 来源：反向提示词工程

- **分类**：AI / 提示词工程
- **标签**：Prompt Engineering / 逆向
- **日期**：2026-04-25

## 摘要

大语言模型的输出可视为输入提示词的生成结果。因此可以构造输出驱动的联合反推模型——在给定问题与目标答案的条件下，反向寻找最优提示词，使模型输出最大程度逼近期望答案。

## 核心思路

**正向**：输入 prompt → 模型 → 输出
**反向**：给定问题 + 目标输出 → 反推 → 最优 prompt

## 应用方向

- Prompt 逆向：给定问题+标准答案，反推最优 prompt
- 数据增强：用「输出→反推输入」做 augmentation
- 模型可解释性：理解模型为什么给出某个答案
- 对抗攻击：给定目标答案，构造触发 prompt

## 挑战

同一答案对应无数 prompt，解不唯一。需要加约束（最短长度、最自然表达等）才能收敛到有用解。

## 另见（本库相近资料）

- [Promt 工程师（阅读链接）](prompt-engineering-reading-list.md)：Prompt Engineering 通用入门资源。
- [Promt 英语单词（编程提示词常用动词）](prompt-vocabulary-for-coding.md)：写 prompt 时常用的英文动词表。
- [常用开发提示词](common-programming-prompt-words.md)：博文沉淀的高频提示词清单。

---

*本页由助手在 2026-05-16 维护，将"反向 prompt"与本库内 Prompt Engineering 相关 source 串联。*
