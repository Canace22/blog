# AI 助手响应时，为什么要显示 loading 或打字效果

- **性质**：对话沉淀为可复用 Q&A
- **日期**：2026-07-01
- **项目上下文**：md-render AI 助手 / AgentPanel 响应态
- **关键词**：AI 助手、loading、打字效果、非流式响应、AgentPanel、响应态、感知延迟

## 问题

AI 助手正在处理用户请求时，如果界面没有任何反馈，用户会看到一段「空等」：输入已经发出，但下方没有 loading，也没有打字效果，直到模型最终返回后才一次性出现整段回答。

这种体验的问题不在于模型一定慢，而在于**应用没有把 agent 的执行阶段表达出来**。用户无法区分：

- 请求是否已经发送；
- AI 是否还在思考；
- 是否正在调用工具；
- 是否已经有回复但还没展示；
- 是否卡死或出错。

## 回答

这类问题本质上是**长耗时 AI 交互缺少响应态设计**。

传统表单提交可以靠按钮 loading 解决，但 AI 助手更像一条持续对话：用户关注的是消息流本身。因此响应态应该出现在对话区底部，而不是只在发送按钮上显示一个禁用状态。

### 推荐分层

1. **等待模型阶段：显示 loading**

   用户发送消息后，立即追加用户消息，并在消息列表底部显示「AI 正在思考」。这能确认请求已经进入系统，不会让用户误以为输入没发出去。

2. **工具执行阶段：显示任务状态**

   如果 agent 调用了读文档、写文档、创建文件等工具，继续沿用工具消息展示 running / done 状态。这样用户能看到 AI 不是静默等待，而是在分步执行。

3. **最终回复阶段：打字式输出**

   如果底层模型接口不是流式返回，也可以在拿到 `finalText` 后，由前端本地把同一条 assistant 消息分块填充，模拟打字输出。

   这不是为了伪装成真正 streaming，而是为了让用户感知「回答正在出现」，避免长文本一次性跳出造成突兀。

4. **特殊协议阶段：隐藏内部结构**

   如果 assistant 文本里包含给 UI 解析的隐藏协议，例如 `agent-choice` JSON 注释，打字过程中不能把未闭合的内部协议闪给用户。应在 typing 状态下临时剥离未闭合协议，等完整文本结束后再交给解析器渲染选择卡片。

## 在 md-render 里的实现

这次实现没有改 `agentEngine`、IPC 或模型调用链，而是把响应态控制收在 `AgentPanel.jsx` 展示层。

### 核心改动

1. **新增响应态字段**

   `AgentPanel.jsx` 增加局部状态：

   - `assistantActivity`：区分 `thinking` / `typing` / 空闲；
   - `runningSessionId`：记录当前任务属于哪个会话，避免切会话后把 loading 显示到错误会话；
   - `messagesRef`：用于消息更新后自动滚到底部。

2. **等待阶段显示底部 loading**

   `runTurn` 追加用户消息后，立即进入 `thinking`：

   ```text
   用户消息入流
     → setRunning(true)
     → assistantActivity = thinking
     → 消息列表底部显示「AI 正在思考」
   ```

3. **最终文本改为本地打字**

   原来 `runAgent` 完成后直接 append 一条完整 assistant 消息。现在改成：

   ```text
   runAgent 返回 finalText
     → 先保存模型 history
     → append 一条 typing=true 的空 assistant 消息
     → 每 18ms 填充 4 个字符
     → 长文本用更大 chunk，避免过多渲染
     → 完成后 typing=false
   ```

4. **停止响应的处理**

   用户点停止时，会取消 `AbortController`，清掉响应态，不再额外追加「出错了：已取消」。如果已经进入打字阶段，当前已输出的片段会保留为一条普通 assistant 消息。

5. **选择卡片协议兼容**

   typing 状态下，渲染层先用 `stripPartialChoiceProtocol` 临时去掉未闭合的 `<!-- agent-choice ...`。等文本完整后，再走原来的 `parseAssistantChoiceCards`，把隐藏协议渲染成选择卡片。

### 为什么不改 agentEngine

`agentEngine` 的职责是：组织 prompt、调用模型、执行工具、返回最终历史。  
loading、打字效果、滚动、复制按钮显示时机，都是 UI 展示行为。

如果把这些写进引擎层，会让纯逻辑模块依赖 React 消息状态，反而破坏原有边界。更合理的边界是：

```text
agentEngine 返回最终文本和事件
  → AgentPanel 负责消息流展示
  → CSS 负责 loading / cursor 动效
```

## 验证点

- 普通回复：发送后立刻显示「AI 正在思考」，返回后逐步出现文本。
- 长回复：打字效果不会造成明显卡顿，文本会自动滚到底部。
- 工具调用：工具 running / done 状态照常显示，最终回答仍打字输出。
- 中途停止：不追加「出错了：已取消」，当前响应态会清掉。
- 选择卡片：打字过程中不暴露 `agent-choice` JSON，完成后正常渲染卡片。
- 切换会话：loading 只显示在发起请求的会话里。

## 一句话总结

AI 助手的响应态不是装饰，而是长耗时 agent 交互的基本反馈层：等待时给 loading，完成后本地打字输出，内部协议只给 UI 解析，不直接暴露给用户。

## 另见

- [AI 助手让用户选择时，为什么要做成选择卡片](ai-assistant-choice-cards-protocol.md)
- [md-render：资产优先与业务编排原则](md-render-asset-orchestration-principles.md)
- [AI 辅助开发](../concepts/ai-assisted-development.md)
- [提升 AI Coding 稳定性的经验上下文模式](../concepts/agent-coding-stability.md)

*Query 草稿：Codex 整理本轮 md-render AI 助手响应态改造；2026-07-01。*
