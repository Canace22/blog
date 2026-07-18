---
title: 在 CLI 里用 Claude Design 做原型设计
description: 配置 Claude Design MCP 后，可在终端用自然语言生成设计系统、导出交互原型，并同步成前端组件代码。
categories: AI工程化
tags: AI编程
author: Canace
toc: true
comments: true
date: 2026-07-09 14:56:25
---

Anthropic 的 Claude Design 不只是网页画布（[claude.ai/design](https://claude.ai/design)）。配上官方 MCP 后，可以在 Claude Code 终端里直接做原型：生成界面、导出可点的 HTML，再把设计同步进现有仓库。

本文按「能照着敲」的粒度整理：前置条件、绑定步骤、核心指令、提示词模板、一条完整示例，以及减少「AI 模板脸」的外挂。

## 一、前置条件

- 账号：Claude Design 目前对 Pro / Max / Team / Enterprise 开放（Enterprise 默认关闭，需管理员开启）。用量计入套餐共享额度，没有单独的 Design 配额。
- 环境：已安装 [Claude Code](https://docs.anthropic.com/en/docs/claude-code)，能在项目目录里跑 `claude`。
- 场景：CLI 路径适合「在仓库里、想边设计边落代码」；纯视觉探索也可以继续用网页版画布。

## 二、绑定 Claude Design MCP

在任意终端执行（`--scope user` 表示全局可用，不必每个项目配一次）：

```bash
claude mcp add --scope user --transport http claude-design https://api.anthropic.com/v1/design/mcp
```

进入 Claude Code 后登录（只需一次）：

```text
/design-login
```

登录成功后，终端侧就能创建/编辑设计，而不必切到浏览器画布。

可选：若团队已有设计系统（GitHub、设计文件、本地组件库），先同步再生成，输出会更贴品牌：

```text
/design-sync
```

官方建议：大仓库尽量从 Claude Code 侧做 `/design-sync`，避免网页端挂超大 repo 卡顿。

## 三、CLI 里常用的几条指令

| 指令 / 说法 | 做什么 |
| --- | --- |
| 自然语言描述需求 | 从零生成页面 / 流程 / Dashboard |
| `/design-sync` | 拉取设计系统（颜色、字体、组件模式） |
| `/design-export` 或说「导出为实时原型 / Live Prototype」 | 在本地生成可交互 HTML（含 CSS/JS），并给预览链接 |
| `/design-import` | 把云端或刚生成的 UI 规格，同步成当前项目的 React / Vue 等组件代码 |
| 「Save what we have and try a completely different approach」 | 保留当前版本，另开一条设计方向 |

网页版还有 PDF / PPTX / 独立 HTML / 交给 Claude Code 等导出入口；CLI 侧日常最高频的是 **export 预览** 和 **import 进仓库**。

## 四、怎么写提示词（比「做个好看页面」管用）

官方有效提示通常包含四块：**目标、布局、内容、受众**。我习惯写成下面这种结构：

```text
目标：给开源项目维护者用的运营 Dashboard，桌面端优先，需支持暗黑模式。
布局：左侧窄导航 + 顶栏筛选；主区第一行 4 个 KPI 卡片，下方左图表、右活动流。
内容：月活、PR 合并数、Issue 关闭率、构建成功率；图表用近 30 天趋势；活动流显示最近 8 条。
受众：技术负责人，5 秒内要能看懂健康度，不要营销落地页风格。
约束：用我们已 sync 的设计系统；交互要能切换暗黑模式、按仓库筛选；先出核心布局，动效后补。
```

更短的可用例子（官方风格）：

- 「做一个展示月营收的 Dashboard，支持按地区和产品线筛选。」
- 「设计 4 屏移动端 onboarding，带用户走完核心功能。」
- 「给新 API 产品做落地页：Hero、代码示例、定价三块。」
- 「做内部运营审核台：列表 + 详情 + 通过/驳回。」

反馈也要具体。少说「不好看」，多说：

- 「表单字段间距收到 8px。」
- 「指标卡放到顶行，图表放到下面。」
- 「这个按钮改成下拉，不要单选。」
- 「给我 2～3 个备选布局，我来选。」

原则：**先核心布局和内容，再补交互、边界情况和抛光**。Claude 对增量迭代比一次堆满需求更稳。

## 五、一条完整示例：从 0 到进仓库

假设当前目录是一个 React + Tailwind 项目，且已完成 `/design-login`。

**第 1 步：同步设计系统（有的话）**

```text
/design-sync
```

**第 2 步：生成原型**

```text
为我的开源项目生成一个带暗黑模式切换的 Dashboard 原型。
左侧导航：Overview / Repos / CI / Settings。
主区：4 个 KPI + 近 30 天趋势图 + 最近活动列表。
请先出桌面端；组件尽量复用已 sync 的设计系统。
```

**第 3 步：迭代两轮**

```text
把 KPI 卡片改成更紧凑的一行；暗黑模式下图表对比度再提高一点。
再给我一个「无左侧栏、顶栏 Tab」的备选布局。
```

**第 4 步：导出可点原型**

```text
/design-export
```

或：

```text
将其导出为实时原型（Live Prototype），并给出本地预览地址。
```

本地会得到一组可交互 HTML，适合给同事点一点看流程，而不是只看截图。

**第 5 步：同步进当前项目**

```text
/design-import
```

并补充约束，例如：

```text
导入为 React + Tailwind 组件，放到 src/components/dashboard/，
复用现有 Button / Card，不要另起一套颜色变量。
```

到这里，路径就是：**Design 探索视觉 → export 验证交互 → import 落进真实代码**。反过来也行：先在仓库里用 Claude Code 搭骨架，再用 Design 做视觉抛光——但「先视觉后代码」通常更适合从 0 验证方向。

## 六、减少「AI 批量脸」的三个外挂

默认生成容易像通用后台模板。开发者/设计师常在终端再挂这些能力：

### 1. Figma MCP

已有线框或高保真稿时，把 Figma 链接丢给 Claude Code，让它读图层再转代码原型，而不是从纯文字空想布局。适合「稿已有、要可运行页面」的场景。

### 2. Frontend Design Skill

在终端激活 Frontend Design 一类 Skill（或明确要求非线性栅格、有意图的微动效），避免默认 Bootstrap / 卡片堆砌感。动效可以点名方向，例如参考 Emil Kowalski 一类克制的微交互，而不是满屏 glow 和紫色渐变。

### 3. Playwright 自动审查

原型导出后，可以直接让 Claude：

```text
用 Playwright 打开刚才的本地预览，截桌面和 375px 两档，
检查：重叠、溢出、对比度不足、主按钮层级不清；有问题直接改再截一张对比。
```

把「生成 → 自检 → 再改」收成闭环，比肉眼盯 HTML 省事。

## 七、和网页版 Claude Design 怎么分工

| 场景 | 更合适的入口 |
| --- | --- |
| 快速试 3 个视觉方向、给非技术同事看 | 网页画布（chat + canvas） |
| 已有仓库、要对齐现有组件/路由 | Claude Code + Design MCP |
| 只要可点击的静态/半静态原型 | `/design-export` 的 Live Prototype |
| 要进生产、接 API / 状态管理 | `/design-import` 后继续用 Claude Code 改仓库 |

一句话：**Design 负责「长什么样、好不好点」；Claude Code 负责「进不进得了我们的代码库」。**

## 八、已知限制

- 仍是 beta：多人同时编同一项目、超大仓库挂载、个别 chat 报错等还有坑。
- 设计系统导入质量取决于源：乱的组件库会原样反映到输出里。
- Design 产出偏自包含前端；有后端、鉴权、持久化时，仍要靠 Claude Code（或你们现有工程）接下去。
- 复杂项目、多轮迭代会明显吃共享用量，注意套餐额度。

## 参考

- [Get started with Claude Design](https://support.claude.com/en/articles/14604416-get-started-with-claude-design)
- [Set up your design system in Claude Design](https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design)
- [Claude Code for Designers](https://solodesign.cc/blog/claude-code-for-designers/)
- [Claude Design vs Claude Code UI Prototypes](https://www.mindstudio.ai/blog/claude-design-vs-claude-code-ui-prototypes)
