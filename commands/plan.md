---
command: /plan
workflow: engineering-harness/core/workflows/new-feature.md
skills:
  - engineering-harness/skills/feature-planning/SKILL.md
  - engineering-harness/skills/ux-ui-design/SKILL.md
---

# /plan

Plan a requested feature or meaningful change.

## Execution

1. Read `engineering-harness/core/workflows/new-feature.md`.
2. Load `feature-planning`.
3. If the change affects UI, UX, navigation, forms, dashboards, charts, reports, or evidence presentation, load `ux-ui-design` and follow its workflow.
4. Read relevant ADRs in `docs/decisions/`.
5. Consult the project constitution and authoritative product/experiment documents.
6. Produce the implementation plan and acceptance criteria required by the workflow.
7. Do not implement unless the user explicitly asks for implementation.

## Rule

This command is an entry point to the documented workflow; do not create a second planning methodology here.
