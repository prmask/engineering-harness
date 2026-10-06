---
command: /memory
---

# /memory

Record, update, verify, or promote durable project context.

## Execution

1. Read the relevant files under `engineering-harness/core/memory/`.
2. Determine whether the information belongs in memory or in an authoritative document.
3. Verify consequential information against current project truth before recording it.
4. Store durable non-authoritative context in `engineering-harness/core/memory/` only when appropriate.
5. Promote important architectural, product, experiment, or UX/UI decisions into their authoritative documents rather than relying on memory.
6. Mark stale memory when practical.

## Memory Structure

- `engineering-harness/core/memory/project.md` — durable project context
- `engineering-harness/core/memory/architecture.md` — working technical context
- `engineering-harness/core/memory/decisions.md` — non-authoritative decision memory
- `engineering-harness/core/memory/lessons.md` — lessons learned
- `engineering-harness/core/memory/bugs.md` — recurring or important bug context
- `engineering-harness/core/memory/preferences.md` — development preferences
- `engineering-harness/core/memory/handoffs/` — temporary agent/session context

## Authority

Memory is context, not authority.

The authority hierarchy for project context is:

1. Explicit current user instruction
2. Experiment specification
3. Product specification
4. Approved architecture documentation
5. Architecture Decision Records
6. `AGENTS.md`
7. Approved skills
8. Project memory
9. Agent assumptions

When memory conflicts with authoritative project documentation, the authoritative source wins.

Important decisions must be promoted from memory into the appropriate authoritative documentation.

Never use memory as justification for changing the experiment specification.
