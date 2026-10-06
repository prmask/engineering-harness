#!/usr/bin/env bash
set -euo pipefail

COMMAND="${*:-}"

if [[ -z "$COMMAND" ]]; then
  if [[ ! -t 0 ]]; then
    COMMAND="$(cat)"
  fi
fi

if [[ -z "$COMMAND" ]]; then
  echo "Usage: guard-destructive-command.sh <command>" >&2
  exit 2
fi

# Detect common destructive patterns. This is intentionally a guardrail, not a full shell parser.
if grep -Eiq -- '(^|[;&|[:space:]])rm[[:space:]]+-rf([[:space:]]|$)|DROP[[:space:]]+TABLE|DELETE[[:space:]]+FROM|TRUNCATE[[:space:]]+TABLE|git[[:space:]]+reset[[:space:]]+--hard|git[[:space:]]+clean[[:space:]]+-fd' <<< "$COMMAND"; then
  echo "BLOCKED: potentially destructive command detected:" >&2
  echo "  $COMMAND" >&2
  echo "This operation requires explicit approval. Do not use it to bypass experiment/data-integrity safeguards." >&2
  if [[ "${DESTRUCTIVE_COMMAND_APPROVED:-false}" != "true" ]]; then
    echo "Set DESTRUCTIVE_COMMAND_APPROVED=true only for an explicitly approved operation." >&2
    exit 1
  fi
  echo "Destructive command explicitly approved. Proceed only after verifying scope and backup requirements."
fi

exit 0
