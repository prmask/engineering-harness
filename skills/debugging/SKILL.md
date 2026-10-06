# Debugging

## Purpose
Find and fix root causes systematically rather than making speculative changes.

## Procedure
1. Reproduce the problem.
2. Record exact expected and actual behavior.
3. Narrow the affected boundary.
4. Form a falsifiable root-cause hypothesis.
5. Gather evidence through logs, tests, inspection, or minimal reproduction.
6. Identify the root cause.
7. Write a regression test when appropriate.
8. Make the smallest correct fix.
9. Run targeted tests.
10. Run broader verification.
11. Document the cause and fix when useful.

## Rules
- Do not randomly change multiple unrelated areas.
- Do not delete data to hide a bug.
- Do not weaken validation merely to make an error disappear.
- Do not claim resolution without verification.

## Output
Reproduction, root cause, evidence, fix, regression test, verification, and remaining risks.
