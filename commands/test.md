---
command: /test
workflow: engineering-harness/core/workflows/new-feature.md
skills:
  - engineering-harness/skills/tdd/SKILL.md
  - engineering-harness/skills/e2e-testing/SKILL.md
---

# /test

Test the current change or feature using the tests required by its owning workflow.

## Execution

1. Identify the change and read its owning workflow.
2. Load `tdd` for unit/integration behavior and `e2e-testing` for critical user flows where applicable.
3. Run the narrowest relevant tests first, then broader verification as required.
4. For UI changes, verify interaction and visual states, not only JavaScript behavior.
5. For experiment-facing features, verify missing-data handling, historical scoring behavior, and evidence presentation where applicable.
6. Report actual results; never claim a test passed unless it ran and passed.

## Rule

Testing is evidence, not a declaration of confidence.
