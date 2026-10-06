# 108-Day Experiment Memory

> **Memory is not truth.**

Memory provides useful context; it does not override governed project documentation.

## Structure
- `project.md` — durable project context
- `architecture.md` — working technical context
- `decisions.md` — non-authoritative decision memory
- `lessons.md` — lessons learned
- `bugs.md` — recurring/important bug context
- `preferences.md` — development preferences
- `handoffs/` — temporary agent/session context

## Authority
1. Explicit current user instruction
2. Experiment specification
3. Product specification
4. Approved architecture documentation
5. Architecture Decision Records
6. `AGENTS.md`
7. Approved skills
8. Project memory
9. Agent assumptions

## Promotion Rule
When memory becomes important enough to govern behavior, promote it into the correct authoritative document.

Example:
- Memory: "SQLite is currently being used."
- Authority: `docs/architecture/DATABASE.md` says SQLite is the approved persistence layer.

## Verification Rule
Before using important memory for a consequential change:
1. Locate authoritative source.
2. Verify the memory is current.
3. Follow authoritative source if there is conflict.
4. Mark stale memory when practical.

## UX/UI Rule
Design preferences and lessons may live in memory. Approved requirements, design-system decisions, and experiment-facing visualization rules belong in authoritative product/design documentation.
