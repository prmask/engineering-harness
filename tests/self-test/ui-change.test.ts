import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';
import { createGitTestRepo, getBashPath } from './helpers/git-test-repo.js';

const root = process.cwd();
const hook = existsSync(join(root, 'engineering-harness/hooks/check-ui-change.sh'))
  ? join(root, 'engineering-harness/hooks/check-ui-change.sh')
  : join(root, 'hooks/check-ui-change.sh');

type ProcessError = {
  status?: number;
  stdout?: string | Buffer;
  stderr?: string | Buffer;
};

function runHook(repo: string) {
  try {
    const output = execFileSync(getBashPath(), [hook], {
      cwd: repo,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    return {
      code: 0,
      output,
    };
  } catch (error: unknown) {
    const processError = error as ProcessError;

    return {
      code: processError.status ?? 1,
      output: `${processError.stdout ?? ''}${processError.stderr ?? ''}`,
    };
  }
}

describe('ui change check hook', () => {
  test('passes silently when no UI file is modified', () => {
    const testRepo = createGitTestRepo();

    try {
      writeFileSync(
        join(testRepo.path, 'backend.py'),
        'print("hello")\n',
      );

      testRepo.git('add', 'backend.py');

      const result = runHook(testRepo.path);

      expect(result.code).toBe(0);
      expect(result.output).not.toContain('UI/DESIGN CHANGE DETECTED');
    } finally {
      testRepo.cleanup();
    }
  });

  test('detects UI component changes and logs guidance', () => {
    const testRepo = createGitTestRepo();

    try {
      const compDir = join(testRepo.path, 'src', 'components');
      mkdirSync(compDir, { recursive: true });

      writeFileSync(
        join(compDir, 'Button.tsx'),
        'export const Button = () => <button>Click</button>;\n',
      );

      testRepo.git('add', 'src/components/Button.tsx');

      const result = runHook(testRepo.path);

      expect(result.code).toBe(0);
      expect(result.output).toContain('UI/DESIGN CHANGE DETECTED:');
      expect(result.output).toContain('src/components/Button.tsx');
    } finally {
      testRepo.cleanup();
    }
  });

  test('warns when data-facing UI or analytics is modified', () => {
    const testRepo = createGitTestRepo();

    try {
      const compDir = join(testRepo.path, 'src', 'pages');
      mkdirSync(compDir, { recursive: true });

      writeFileSync(
        join(compDir, 'dashboard.tsx'),
        'export const Dashboard = () => <div>Metrics</div>;\n',
      );

      testRepo.git('add', 'src/pages/dashboard.tsx');

      const result = runHook(testRepo.path);

      expect(result.code).toBe(0);
      expect(result.output).toContain('WARNING: Data-facing UI/analytics modified.');
      expect(result.output).toContain('does not hide unfavorable evidence');
    } finally {
      testRepo.cleanup();
    }
  });
});
