import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export function getBashPath(): string {
  if (process.platform === 'win32') {
    const gitBash = 'C:\\Program Files\\Git\\bin\\bash.exe';
    if (existsSync(gitBash)) {
      return gitBash;
    }
  }
  return 'bash';
}

export function createGitTestRepo() {
  const repo = mkdtempSync(join(tmpdir(), 'harness-test-'));

  const git = (...args: string[]) =>
    execFileSync('git', args, {
      cwd: repo,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });

  git('init');
  git('config', 'user.email', 'harness-test@example.invalid');
  git('config', 'user.name', 'Harness Test');
  git('commit', '--allow-empty', '-m', 'test baseline');

  return {
    path: repo,
    git,
    cleanup() {
      try {
        rmSync(repo, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      } catch {
        // Ignored on Windows temporary file lock
      }
    },
  };
}
