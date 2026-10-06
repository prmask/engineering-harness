# UX/UI Design Workflow

## Purpose
Provide a dedicated workflow for designing, reviewing, and handing off interfaces for the 108-Day Experiment.

## Why This Is Separate
UX/UI is not merely an implementation detail. Interface decisions affect how the user records observations and how experiment evidence is perceived. Therefore meaningful UI work requires a repeatable design workflow.

## Flow
Product requirement
→ Experiment/context review
→ Information architecture
→ User flow
→ Wireframe
→ High-fidelity design
→ States
→ Responsive/accessibility review
→ Experiment-integrity review
→ Implementation handoff
→ Implementation
→ Visual/interaction verification

## Steps

1. Read `AGENTS.md` and relevant product and experiment documentation.
2. Confirm the user goal, task, and acceptance criteria.
3. Identify affected screens, navigation, and information architecture.
4. Map the user flow.
5. Create wireframes when the flow or interaction is complex.
6. Create high-fidelity designs when visual decisions materially affect implementation.
7. Define reusable components, variants, tokens, and interaction states.
8. Explicitly design:
   - loading
   - empty
   - missing-data
   - error
   - success
   - correction
   - historical
   - disabled
   states where applicable.
9. Define responsive behavior and accessibility requirements.
10. Review experiment-facing visualizations for scientific integrity.
11. Prepare implementation handoff with component and behavior notes.
12. Implement using the `frontend-feature` skill.
13. Compare implementation with the approved design.
14. Record approved deviations when deviations are necessary.

## Experiment-Specific Design Rules
- Never visually imply causation where only correlation is observed.
- Never display missing measurements as zero.
- Distinguish protocol success, productivity, and financial outcomes.
- Preserve visibility of challenging and unfavorable evidence.
- Make historical scoring definitions understandable.
- Avoid excessive gamification, fake achievements, or motivational mechanics that obscure evidence.
- Optimize for low-friction daily logging.

## Figma
When Figma is used, follow the project's Figma tool/skill requirements. Create reusable components, variants, tokens, key states, and implementation-ready handoff documentation.

## Output
User flow, information architecture, design artifacts, component/state specification, responsive/accessibility notes, experiment-integrity check, and implementation handoff.
