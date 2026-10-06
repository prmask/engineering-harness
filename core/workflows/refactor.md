# Refactor Workflow

## Purpose
Improve internal structure without changing approved behavior.

## Flow
Identify code smell
→ Define invariants
→ Tests/baseline
→ Refactor
→ Tests
→ Fresh-context review
→ Verification

## Steps

1. Identify the concrete reason for refactoring.
2. Read affected architecture and product documentation.
3. Identify behavior that must remain unchanged.
4. Ensure adequate test coverage before changing structure.
5. Make small, coherent changes.
6. Run tests after each meaningful step.
7. Review the change with fresh context for significant changes; trivial changes may omit fresh-context review when no meaningful risk exists.
8. Run typecheck, lint, build, and relevant E2E tests.
9. Update architecture documentation if boundaries actually changed.

## Rules
- Do not refactor merely for stylistic preference.
- Do not change product behavior under the label of refactoring.
- Do not change experiment scoring or historical data.
