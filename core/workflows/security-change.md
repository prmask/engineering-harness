# Security Change Workflow

## Purpose
Safely introduce or modify functionality with security implications.

## Flow
Change request
→ Threat/attack-surface analysis
→ Research if needed
→ Implementation plan
→ Security review
→ Implementation
→ Security tests
→ Fresh-context Code Review
→ Verification

## Steps

1. Identify affected data, permissions, filesystem, network, dependencies, and tools.
2. Research current security guidance when necessary.
3. Define acceptance criteria and security requirements.
4. Implement the smallest required change.
5. Test authentication/authorization, input handling, secrets, and exposure as applicable.
6. Run the Security Reviewer.
7. Run Code Reviewer from fresh context for the significant security change; do not rely on the implementation context as evidence.
8. Run normal verification.
9. Document security decisions and residual risk.

## Rules
- Never commit secrets.
- Default to least privilege.
- Do not introduce remote transmission without an explicit requirement.
- Do not add external integrations without legitimate project need.
