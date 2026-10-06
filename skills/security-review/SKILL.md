# Security Review

## Purpose
Protect local experiment data, source code, tooling, dependencies, and future integrations.

## Procedure
1. Identify the change's attack surface.
2. Check secrets, environment variables, credentials, tokens, and configuration.
3. Check filesystem and local database exposure.
4. Check injection risks and unsafe input handling.
5. Check dependencies and external integrations.
6. Check API and authentication boundaries if present.
7. Check agent/tool/MCP permissions if applicable.
8. Check backups and exports.
9. Record findings and required remediation.

## Rules
- Never commit secrets.
- Default to least privilege.
- Do not introduce remote transmission without an explicit requirement.
- Do not install external tools or integrations without legitimate project need.
- Treat health, financial, journal, and business information as sensitive project data.

## Output
Threat surface, findings, severity, remediation, residual risk, and verification.
