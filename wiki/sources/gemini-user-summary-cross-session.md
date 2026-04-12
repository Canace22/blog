# Source: Gemini 新会话与 User Summary

## Source File

- `AI 探索/Gemini 在打开新会话时，是如何有记忆的.md`

## Summary

Personal observation that Gemini can behave as if it remembers prior chats across new conversations. The author summarizes an explanation from Gemini: a cloud-synced **User Summary** aggregates distilled “memory fragments” from past sessions and is injected as context in new chats so the model has a stable user profile.

## Key Points

- Cross-session continuity is framed as system-level user profiling, not full raw chat history shared verbatim.
- **User Summary** is described as a dynamic, cross-device summary (e.g. role, tech stack, tools, projects, habits).
- The author compares this to agents that “know who you are,” separate from long single-thread context windows.

## Related Concepts

- [Chat assistant user memory](../concepts/chat-assistant-user-memory.md)
- [AI Knowledge Bases](../concepts/ai-knowledge-bases.md)

## Notes

Behavior and naming reflect the author’s conversation with the product, not independent verification of Google’s implementation.
