# Command Surface

The command layer is intentionally thin.

Commands are **user-facing entry points**, not independent workflows. Each command delegates to an existing documented workflow where one exists and references the relevant reusable skills and agents.

## Design principles

1. **Skills/workflows are canonical.** Do not duplicate workflow logic inside commands.
2. **Commands are shims.** They translate a short user invocation into the correct workflow.
3. **No giant command catalog.** Add a command only when a repeated workflow benefits from a short, memorable entry point.
4. **Architectural decisions are consulted.** Architecture-related work must read relevant ADRs in `docs/decisions/`.
5. **Experiment integrity is protected.** Experiment-facing work must respect `AGENTS.md`, experiment specifications, data-integrity rules, and ADR-004.
6. **UI/UX is part of the workflow.** Interface changes must use the UX/UI skill/workflow rather than treating UI as implementation-only.
7. **Commands must not silently change experiment rules.**

## Command → workflow mapping

| Command | Canonical workflow | Primary skill(s) |
|---|---|---|
| `/plan` | `new-feature.md` | `feature-planning`, `ux-ui-design` when UI changes |
| `/research` | `research.md` | `research-first` |
| `/implement` | `new-feature.md` | `frontend-feature`, `tdd`, `ux-ui-design` when UI changes |
| `/test` | `new-feature.md` | `tdd`, `e2e-testing` |
| `/review` | `new-feature.md` review stages; conditional specialist review | `code-review`; `ux-ui-design` when UI changes |

Specialist agents are selected conditionally by the review workflow: `data-integrity` 
| `/security` | `security-change.md` | `security-review` |
| `/verify` | relevant workflow's verification stage | `tdd`, `e2e-testing`, `experiment-integrity` |
| `/memory` | `engineering-harness/core/memory/` architecture | — |
| `/release` | `release.md` | `release` |

## Invocation contract

A command should:

1. Read the referenced workflow.
2. Read the project's authoritative documents required by that workflow.
3. Load the referenced skills.
4. Delegate to the appropriate specialist agent(s).
5. Execute the workflow; do not invent a parallel process.
6. Report what was actually verified.

If the command cannot safely execute because required context, approval, or evidence is missing, it must stop and identify the missing prerequisite.

## UI/UX rule

For any change that affects screens, components, interaction, navigation, forms, dashboards, charts, reports, or evidence presentation:

- invoke the UX/UI design workflow/skill where appropriate;
- preserve explicit loading, empty, missing, error, success, correction, and historical states;
- never treat missing experiment data as zero;
- never hide unfavorable or incomplete evidence;
- never imply causation through visual design when only association/observation is supported;
- verify the final implementation visually and behaviorally.

## Adding a command

Before adding a new command, ask:

- Is there already a skill/workflow that owns this behavior?
- Is a short command materially useful?
- Can the command remain a thin adapter?
- Does it need a corresponding documented workflow?
- Does it introduce duplicate or conflicting instructions?

If yes, add the command and update this README's mapping table.
