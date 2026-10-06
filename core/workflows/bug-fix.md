# Bug Fix Workflow

## Purpose
Fix defects through evidence and root-cause analysis rather than speculative patching.

## Flow
Bug report
→ Reproduce
→ Debug/root-cause analysis
→ Regression test
→ Fix
→ Targeted tests
→ Fresh-context review
→ Full verification
→ Documentation if needed

## Steps

1. Reproduce the bug.
2. Record expected versus actual behavior.
3. Use the `debugging` skill to isolate the root cause.
4. Determine whether experiment data, scoring, or historical records are affected.
5. Add a regression test when technically practical.
6. Implement the smallest correct fix.
7. Run targeted tests.
8. Review the change with fresh context for significant changes; trivial changes may omit fresh-context review when no meaningful risk exists.
9. Run broader tests, typecheck, lint, and build as appropriate.
10. Verify that no historical data was modified incorrectly.
11. Document the root cause when useful.

## Rules
- No bug fix without a regression test when technically practical.
- Never delete or alter real experiment data to make a test pass.
- Never weaken validation simply to hide an error.
