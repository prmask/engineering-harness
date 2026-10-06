# Authority and Conflict Resolution

## Purpose

This document defines the authority hierarchy for the engineering harness.

Its purpose is to prevent outdated memory, reusable skills, agent assumptions, or implementation convenience from overriding project and product truth.

## Authority Hierarchy

When two sources disagree, use this order:

```text
1. Explicit current user instruction
2. Domain / System specification
3. Product specification
4. Architecture decisions (ADRs)
5. Project Constitution / Policy
6. Reusable Skills
7. Working Memory
8. Agent assumptions
```

The higher-authority source wins.

## 1. Explicit Current User Instruction

A clear instruction given by the user in the current interaction has the highest authority.

An explicit instruction must not be confused with an inferred preference.

## 2. Domain / System Specification

The system specification defines the core rules, data boundaries, and invariant logic of the project.

Domain rules must not be silently changed by product, architecture, UX, skills, memory, or agent assumptions.

## 3. Product Specification

The product specification defines what the application is intended to do for the user.

Relevant documents include:
- `docs/product/`

Product requirements must be consistent with the system specification.

## 4. Architecture Decisions

Accepted architectural decisions govern implementation choices.

Relevant documents include:
- `docs/decisions/`
- `docs/architecture/`

Architecture decisions must support higher-authority product requirements.

## 5. Engineering Constitution

The project constitution defines durable engineering rules, quality gates, and agent behavior.

It must not be used to silently override product specifications.

## 6. Skills

Skills define reusable methods for performing work (`skills/`).

Skills describe **how** to perform work. They do not create or override product requirements.

## 7. Working Memory

Project memory provides durable context that may help agents work efficiently (`core/memory/`).

Memory is not authoritative and can become stale. Agents must verify consequential memory against higher-authority sources before relying on it.

## 8. Agent Assumptions

Agent assumptions are the lowest-authority information.

Agents may make reasonable implementation assumptions only when they do not alter requirements, architecture decisions, data semantics, security posture, or UX intent.

## Conflict-Resolution Procedure

When a conflict is detected:

```text
Conflict detected
        ↓
Identify the sources
        ↓
Rank sources using this hierarchy
        ↓
Follow the highest-authority source
        ↓
Do not silently rewrite the lower-authority source
        ↓
Determine whether the lower source is stale
        ↓
Update it through the appropriate workflow
```

If two sources at the same authority level conflict, do not choose arbitrarily. Stop and report the conflict.
