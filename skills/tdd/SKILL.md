# Test-Driven Development

## Purpose
Use tests to define expected behavior before or alongside implementation and prevent regressions.

## Procedure
1. Read the requirement and acceptance criteria.
2. Identify deterministic behavior and edge cases.
3. Write the smallest failing test that expresses the requirement.
4. Implement the minimum behavior needed to pass.
5. Run the relevant test suite.
6. Refactor without changing behavior.
7. Add regression tests for discovered bugs.
8. Run broader verification.

## Experiment-Critical Tests
Include coverage for:
- Day 1–46 scoring under Definition v1 (13/13).
- Day 47–108 scoring under the current later threshold (>=8/13).
- No retroactive rescoring under a later definition.
- 3/6/9 repetition counts.
- 108-day date boundaries.
- missing data versus zero.
- historical data preservation.
- experiment amendments and versioning.
- revenue versus profit and opportunity value versus realized revenue.

## Rules
- Do not weaken a test merely to make implementation pass.
- Tests must encode approved behavior, not assumptions.
- Deterministic calculations must have deterministic tests.

## Output
Tests created/updated, behaviors covered, commands run, and results.
