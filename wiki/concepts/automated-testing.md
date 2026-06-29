# 自动化测试

## 简介

自动化测试是软件质量保障的重要手段，通过分层测试金字塔合理分配测试资源。

## 核心模型：测试金字塔

| 层级 | 成本 | 稳定性 | 数量建议 |
|------|------|--------|----------|
| 单元测试 | 低 | 高 | 多 |
| 集成测试 | 中 | 中 | 中 |
| E2E | 高 | 低 | 少 |

## 完整流程

开发 → CI → Code Review → Merge → 构建产物 → Staging → E2E/回归 → 部署

## Vitest vs Jest（Vite 项目）

| 维度 | Vitest | Jest |
| --- | --- | --- |
| 配置 | Vite 项目可复用现有配置 | 通常需 Babel 等额外配置 |
| 模块 | 原生 ESM | 零配置下往往只能用 CJS |
| 体验 | 共用 Vite transform，按需解析，watch 快 | 启动扫描 + 大量 transform，大项目冷启动慢 |

**版本要求：** Vite >= 6.0.0 且 Node >= 20.0.0。

## BDD 断言语法：describe / it / test

Jasmine 习惯：`describe` 描述行为组，`it` 读作「它应该……」，Jest/Vitest 保留；`test` 是更直白的等价写法。

## 相关来源

- [跟 Jest 相比，Vitest 的优势是什么](../sources/vitest-vs-jest-advantages.md)
- [自动化测试](../sources/automated-testing.md)
- [Vue 单元测试](../sources/vue-test-unit.md)

*维护：Cursor Agent，2026-06-29。*