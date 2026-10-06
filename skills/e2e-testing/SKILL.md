# End-to-End Testing

## Purpose
Verify important user journeys through the real application.

## Procedure
1. Identify the user journey and acceptance criteria.
2. Prepare deterministic test data.
3. Test the primary path.
4. Test missing, skipped, corrected, and error states.
5. Test persistence and reload behavior.
6. Test responsive behavior where practical.
7. Verify experiment-critical boundaries.
8. Capture failures with reproducible steps.
9. Clean up only test data, never real experiment records.
10. Run regression coverage after fixes.

## Priority Journeys
- Today/protocol logging.
- Daily scoring.
- 3-6-9 logging.
- Health logging.
- Work and wealth logging.
- Opportunity recording.
- Dashboard/analytics.
- Historical day viewing.
- Experiment amendment flows.

## Rules
- Do not use real historical experiment data destructively in tests.
- Do not treat missing fields as zero.
- Verify Day 46 and Day 47 scoring behavior explicitly.

## Output
Journeys tested, environments/data used, results, failures, screenshots/logs where useful, and regression coverage.
