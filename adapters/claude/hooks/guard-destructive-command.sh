#!/usr/bin/env bash
set -euo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}"
if [[ -f "$ROOT/engineering-harness/hooks/guard-destructive-command.sh" ]]; then
  GUARD="$ROOT/engineering-harness/hooks/guard-destructive-command.sh"
else
  GUARD="$ROOT/hooks/guard-destructive-command.sh"
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "BLOCKED: destructive-command guard requires python3." >&2
  exit 2
fi

COMMAND="$(
  python3 -c '
import json
import sys

try:
    payload = json.load(sys.stdin)
    command = payload.get("tool_input", {}).get("command", "")
except Exception:
    command = ""

if command:
    print(command)
'
)"

if [[ -z "$COMMAND" ]]; then
  echo "BLOCKED: unable to determine the Bash command for security inspection." >&2
  exit 2
fi

if "$GUARD" "$COMMAND"; then
  exit 0
else
  echo "Destructive command denied by project security policy." >&2
  exit 2
fi
