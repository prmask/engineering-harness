import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
// Detect harness directory: if running inside standalone harness root, or target project with engineering-harness/ subfolder
const hasEmbeddedHarness = fs.existsSync(path.join(root, 'engineering-harness'));
const harnessDir = hasEmbeddedHarness
  ? path.join(root, 'engineering-harness')
  : (fs.existsSync(path.join(root, 'agents')) ? root : path.join(root, 'engineering-harness'));
const harnessSubpath = hasEmbeddedHarness ? 'engineering-harness' : (harnessDir === root ? '' : 'engineering-harness');
const harnessPrefix = harnessSubpath ? `${harnessSubpath}/` : '';

console.log('=== Setting up Root Shims for AI Engineering Harness ===\n');

// 1. Git Hooks Shimming
const githooksDir = path.join(root, '.githooks');
fs.mkdirSync(githooksDir, { recursive: true });
const preCommitScript = `#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
exec "$ROOT/${harnessPrefix}hooks/pre-commit.sh"
`;
fs.writeFileSync(path.join(githooksDir, 'pre-commit'), preCommitScript, { mode: 0o755 });
console.log('✔ Git pre-commit shim configured in .githooks/pre-commit');

try {
  execSync('git config core.hooksPath .githooks', { stdio: 'inherit' });
  console.log('✔ Git core.hooksPath configured to .githooks');
} catch (e) {
  console.warn('⚠ Could not set git config core.hooksPath automatically:', e.message);
}

// 2. Claude Code Settings Shimming
const claudeDir = path.join(root, '.claude');
fs.mkdirSync(claudeDir, { recursive: true });
const claudeSettings = {
  hooks: {
    PreToolUse: [
      {
        matcher: 'Edit|Write',
        hooks: [
          {
            type: 'command',
            command: `"$CLAUDE_PROJECT_DIR"/${harnessPrefix}adapters/claude/hooks/check-database-change.sh`
          }
        ]
      },
      {
        matcher: 'Bash',
        hooks: [
          {
            type: 'command',
            command: `"$CLAUDE_PROJECT_DIR"/${harnessPrefix}adapters/claude/hooks/guard-destructive-command.sh`
          }
        ]
      }
    ]
  }
};
fs.writeFileSync(path.join(claudeDir, 'settings.json'), JSON.stringify(claudeSettings, null, 2) + '\n');
console.log('✔ Claude Code settings configured in .claude/settings.json');

// 3. IDE / Antigravity / Gemini CLI Junctions inside .agents/
const agentsDir = path.join(root, '.agents');
fs.mkdirSync(agentsDir, { recursive: true });

const junctions = [
  { name: 'agents', link: path.join(agentsDir, 'agents'), target: path.join(harnessDir, 'agents') },
  { name: 'skills', link: path.join(agentsDir, 'skills'), target: path.join(harnessDir, 'skills') },
  { name: 'commands', link: path.join(agentsDir, 'commands'), target: path.join(harnessDir, 'commands') },
  { name: 'hooks', link: path.join(agentsDir, 'hooks'), target: path.join(harnessDir, 'hooks') },
  { name: 'workflows', link: path.join(agentsDir, 'workflows'), target: path.join(harnessDir, 'core', 'workflows') },
  { name: 'memory', link: path.join(agentsDir, 'memory'), target: path.join(harnessDir, 'core', 'memory') }
];

for (const { name, link, target } of junctions) {
  const legacyDir = path.join(agentsDir, `${name}.legacy`);

  try {
    const stats = fs.lstatSync(link);
    if (!stats.isSymbolicLink() && stats.isDirectory()) {
      if (!fs.existsSync(legacyDir)) {
        fs.renameSync(link, legacyDir);
        console.log(`✔ Backed up existing .agents/${name} to .agents/${name}.legacy`);
      } else {
        fs.rmSync(link, { recursive: true, force: true });
      }
    } else {
      fs.rmSync(link, { recursive: true, force: true });
    }
  } catch {
    // Link does not exist or is a broken junction/reparse point
    try {
      fs.rmSync(link, { recursive: true, force: true });
    } catch {}
  }

  try {
    if (process.platform === 'win32') {
      execSync(`powershell -Command "New-Item -ItemType Junction -Path '${link}' -Target '${target}' -Force | Out-Null"`);
    } else {
      fs.symlinkSync(target, link, 'junction');
    }
    console.log(`✔ Created junction: .agents/${name} -> ${harnessSubpath ? harnessSubpath + '/' : ''}${path.relative(harnessDir, target)}`);
  } catch (err) {
    console.error(`Failed to link .agents/${name} to ${target}:`, err.message);
  }
}

console.log('\n=== Root Shims Setup Complete! ===');
