# AI Engineering Harness (v2)

A modular, project-agnostic engineering framework for AI-assisted software development.

## 1. Directory Structure

```text
engineering-harness/
├── core/
│   ├── policy/              # Core engineering constitution and authority hierarchy
│   │   ├── AUTHORITY.md     # Precedence rules (User > Specs > ADRs > Policy > Skills > Memory)
│   │   └── CONSTITUTION.md  # Non-negotiable engineering principles and rules of engagement
│   ├── permissions/         # Security boundaries and tool permissions
│   │   ├── AGENT-PERMISSIONS.md
│   │   └── HARNESS-SECURITY.md
│   ├── workflows/           # Multi-agent standard operating procedures
│   │   ├── bug-fix.md
│   │   ├── code-review.md
│   │   ├── database-migration.md
│   │   ├── feature-planning.md
│   │   ├── new-feature.md
│   │   ├── refactoring.md
│   │   ├── release.md
│   │   ├── security-change.md
│   │   └── ux-ui-design.md
│   ├── verification/        # Verification runner and verification suites
│   │   ├── verify.mjs
│   │   └── HARNESS-VERIFICATION.md
│   ├── evidence/            # Structured execution artifacts (auditable, reproducible)
│   │   └── record-evidence.mjs
│   └── memory/              # Durable non-authoritative working context
│       └── handoffs/
├── agents/                  # Specialized role personas (10 universal engineering roles)
├── skills/                  # Reusable procedure guides & checklists (13 generic skills)
├── commands/                # Interactive AI command entry points
├── adapters/                # Tooling integration shims
│   ├── claude/              # Claude Code settings & command hooks
│   ├── codex/               # Codex execution bridges
│   └── git/                 # Git hooks & configuration
├── hooks/                   # Automated pre-commit and command safety guardrails
│   ├── check-database-change.sh
│   ├── check-missing-tests.sh
│   ├── check-secrets.sh
│   ├── guard-destructive-command.sh
│   └── pre-commit.sh
├── schemas/                 # Data contracts & evidence log schemas
├── templates/               # Standardized documentation & ADR templates
└── tests/                   # Automated harness test suite
    ├── unit/
    ├── integration/
    ├── security/
    └── self-test/
```

## 2. Tool Discovery & Root Forwarding Shims

AI developer tools (Antigravity IDE, Claude Code, Git) default to looking for their configuration in the repository root. To maintain seamless discovery without polluting the root namespace with duplicate files, the harness provides forwarding shims:

1. **Git Hooks (`.githooks/pre-commit`)**:
   Points to `engineering-harness/hooks/pre-commit.sh`.
   Active when `git config core.hooksPath .githooks` is configured.

2. **Claude Code (`.claude/settings.json`)**:
   Forwarding hooks point directly to:
   `engineering-harness/adapters/claude/hooks/guard-destructive-command.sh`.

3. **Workspace Discovery (`.agents/`)**:
   Windows Directory Junctions (or symlinks on Unix) mirror the active harness folders into the root `.agents/` path:
   - `.agents/agents` ➔ `engineering-harness/agents`
   - `.agents/skills` ➔ `engineering-harness/skills`
   - `.agents/commands` ➔ `engineering-harness/commands`
   - `.agents/hooks` ➔ `engineering-harness/hooks`
   - `.agents/workflows` ➔ `engineering-harness/core/workflows`
   - `.agents/memory` ➔ `engineering-harness/core/memory`

Run `node engineering-harness/setup-root-shims.mjs` (or `node setup-root-shims.mjs` when in harness root) anytime to verify or recreate these junctions automatically.

## 3. Core Development Principles

1. **Research Before Implementation:** Never guess APIs or algorithms. Document research before coding.
2. **Never Invent Requirements:** Clarify ambiguities affecting data integrity or behavior.
3. **Decouple Business Logic from UI:** Keep calculations testable outside of presentation layers.
4. **Data Integrity:** Missing data is never zero (`NULL ≠ 0`). Never silently overwrite records.
5. **Observation vs Interpretation:** Clearly distinguish factual metrics from explanatory hypotheses.
6. **No Fabricated Success:** Claims that tests or builds pass require actual command execution.

## 4. Exporting to New Projects

Because the framework is **100% project-agnostic**, you can install it into any target repository in seconds:

### Method A: One-Command Local Export
From this harness directory, run:
```bash
node export-harness.mjs <path-to-target-project>
```
*Example:* `node export-harness.mjs ../my-new-app`

This automatically copies the harness framework and executes root shimming in the target project.

### Method B: From GitHub
In any project repository root, clone and shim:
```bash
git clone https://github.com/prmask/engineering-harness.git engineering-harness
node engineering-harness/setup-root-shims.mjs
```
The target project immediately gains all 10 specialist personas, 13 skills, 9 workflows, pre-commit security guardrails, and Claude Code hooks with zero manual configuration.
