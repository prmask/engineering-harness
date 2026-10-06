# Architecture Decision Records

This directory contains the project's meaningful architectural decisions.

## Purpose

ADRs prevent the engineering harness and AI agents from repeatedly reconsidering settled architectural choices.

Before proposing an architectural change:

1. Read the relevant ADRs.
2. Check the current project constitution and authoritative experiment/product documents.
3. If the decision would change an accepted ADR, create a new ADR rather than silently editing the old decision.
4. Mark the old ADR as `Superseded` when the new decision is accepted.

## ADR structure

Every ADR contains:

- Context
- Decision
- Alternatives
- Consequences
- Date
- Status

## Authority

ADRs document architectural decisions. They do not override higher-authority project, product, experiment, security, or data-integrity requirements.

## UI/UX and experiment integrity

Architectural decisions affecting the user interface, dashboards, charts, analytics, or evidence presentation must preserve the experiment's integrity.

In particular:

- Missing data must not be represented as zero.
- Historical scoring must not be silently recalculated.
- Corrections must preserve the distinction between the original observation and the correction.
- Observation must remain distinguishable from interpretation.
- Visualizations must not imply causation that the data does not establish.
- Unfavorable, incomplete, or contradictory evidence must not be hidden.
- Empty, missing, loading, error, success, correction, and historical states should be explicitly designed where relevant.
