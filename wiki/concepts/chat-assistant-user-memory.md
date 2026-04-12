# Chat assistant user memory

## Definition

Product-level mechanisms where a chat assistant retains or reconstructs information about the user across separate conversations—distinct from a single long context window or a user-managed document corpus.

## Source-Backed Model (Gemini)

According to the author’s conversation with Gemini ([source](../sources/gemini-user-summary-cross-session.md)):

- A cloud-synced **User Summary** aggregates distilled notes from prior chats (“memory fragments”).
- New sessions receive that summary as part of context so the model can personalize without shipping full raw history across threads.

## Contrast With Other Patterns

- **[AI Knowledge Bases](ai-knowledge-bases.md)**: Often user-uploaded documents the model retrieves at query time; oriented around *your files*, not automatic profiling.
- **[LLM Knowledge Bases](llm-knowledge-bases.md)**: A maintained markdown wiki the user (and agent) curates explicitly; transparent and portable compared to opaque vendor summaries.

## Practical Takeaway

Cross-session summaries can make assistants feel “aware” of stable preferences and projects. They are useful for UX but are not a substitute for explicit, auditable knowledge bases or wikis when you need provenance and control.

## Current Evidence In Repo

- [Gemini User Summary note](../sources/gemini-user-summary-cross-session.md)
