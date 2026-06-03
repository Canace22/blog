# 生成式辩证可能性空间搜索

## 定义（来源对齐）

**生成式辩证可能性空间搜索**指：以辩证思维组织推理与研究，先把问题**生成/展开**为可能性空间中的多条解释与因果路径，再依靠证据与检验**收缩**该空间，得到当前条件下更可信或更优的行动与判断。

该表述来自 [X：@123olp 帖文摘录](../sources/x-123olp-generative-dialectical-possibility-search.md)。

## 两阶段结构（合成图示）

```mermaid
flowchart LR
  subgraph phase_expand["展开"]
    A[正反论证] --> B[矛盾分析]
    B --> C[Steelman 强钢人化]
    C --> D[多状态 / 多因果路径]
  end
  subgraph phase_contract["收敛"]
    D --> E[关键变量识别]
    E --> F[证据匹配]
    F --> G[实验验证]
    G --> H[统计评分]
    H --> I[剪枝与优选]
  end

  classDef nodeDark fill:#1a1a2e,stroke:#7eb8da,color:#e8e8ed
  class A,B,C,D,E,F,G,H,I nodeDark
```

（上图仅为把来源中的阶段关系结构化，非独立学理定义。）

## 与仓库内邻近概念的关系

- **[假设驱动 AI 调试](../concepts/hypothesis-driven-ai-debugging.md)**：同样强调**假设（路径）外化**、**证据**与**小步实验**；本概念额外突出辩证展开（正反、矛盾、Steelman）与「可能性空间」上的显式搜索/剪枝语言。二者可对照使用：前者偏调试与工程排错记录，后者偏研究与策略性推理表述。

## 开放问题（合成）

- 「统计评分」在帖文中为概括用语；落地时需明确指标（贝叶斯更新、风险加权、效用函数等）以免沦为标签。
- 与纯「头脑风暴 + 打分」的界限：关键在于是否系统执行证伪、证据匹配与可重复检验。

## 相关

- [来源：@123olp —— 生成式辩证可能性空间搜索（X）](../sources/x-123olp-generative-dialectical-possibility-search.md)
- [假设驱动 AI 调试](../concepts/hypothesis-driven-ai-debugging.md)
