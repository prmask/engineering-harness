import { execFileSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';
import { createGitTestRepo, getBashPath } from './helpers/git-test-repo.js';

const root = process.cwd();
const hook = existsSync(join(root, 'engineering-harness/hooks/check-secrets.sh'))
  ? join(root, 'engineering-harness/hooks/check-secrets.sh')
  : join(root, 'hooks/check-secrets.sh');

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
    const processError = error as {
      status?: number;
      stdout?: string | Buffer;
      stderr?: string | Buffer;
    };

    return {
      code: processError.status ?? 1,
      output: `${processError.stdout ?? ''}${processError.stderr ?? ''}`,
    };
  }
}

describe('secret detection hook', () => {
  test('passes when there is no staged secret', () => {
    const testRepo = createGitTestRepo();

    try {
      writeFileSync(
        join(testRepo.path, 'normal.txt'),
        'ordinary project text\n',
      );

      testRepo.git('add', 'normal.txt');

      const result = runHook(testRepo.path);

      expect(result.code).toBe(0);
      expect(result.output).toContain('Secret scan passed.');
    } finally {
      testRepo.cleanup();
    }
  });

  test('blocks a staged credential-like value', () => {
    const testRepo = createGitTestRepo();

    try {
      const file = join(testRepo.path, 'config.txt');

      const key = 'api' + '_key';
      writeFileSync(file, `${key}="TEST_FAKE_SECRET_123456789"\n`);

      testRepo.git('add', 'config.txt');

      const result = runHook(testRepo.path);

      expect(result.code).not.toBe(0);
      expect(result.output).toContain('possible secret detected');
    } finally {
      testRepo.cleanup();
    }
  });

  test('blocks a staged single-quoted credential-like value', () => {
    const testRepo = createGitTestRepo();

    try {
      const file = join(testRepo.path, 'config.txt');

      const key = 'api' + '_key';
      writeFileSync(file, `${key}='TEST_FAKE_SECRET_123456789'\n`);

      testRepo.git('add', 'config.txt');

      const result = runHook(testRepo.path);

      expect(result.code).not.toBe(0);
      expect(result.output).toContain('possible secret detected');
    } finally {
      testRepo.cleanup();
    }
  });
});
