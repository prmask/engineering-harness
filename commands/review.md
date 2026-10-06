---
command: /review
workflow: engineering-harness/core/workflows/new-feature.md
skills:
  - engineering-harness/skills/code-review/SKILL.md
  - engineering-harness/skills/ux-ui-design/SKILL.md
---

# /review

Perform a fresh-context review of a completed change.

## Execution

1. Read the owning workflow and relevant ADRs.
2. Always load `code-review` and perform the Code Reviewer review.
3. If the change touches experiment data or experiment-facing behavior, also run Data Integrity and Experiment Scientist review.
4. If the change is security-sensitive, also run Security Reviewer review.
5. If UI/UX changed, load `ux-ui-design` and review information architecture, interaction states, accessibility, responsive behavior, and experiment-integrity implications.
6. For experiment-facing screens, check that unfavorable/missing evidence is not hidden and that visualizations do not imply unsupported causation.
7. Do not invoke specialist reviewers unrelated to the change.
8. Identify concrete findings and required fixes.
9. Report which reviewers were required and which actually ran.

## Rule

Review independently of the implementation context where practical; do not merely restate the implementer's claims.
