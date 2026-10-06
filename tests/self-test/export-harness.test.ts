import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';

const root = process.cwd();
const exportScript = join(root, 'export-harness.mjs');

describe('export harness CLI', () => {
  test('exports harness files including LICENSE to a target project directory', () => {
    const tempTarget = mkdtempSync(join(tmpdir(), 'harness-export-test-'));

    try {
      const output = execFileSync(
        process.execPath,
        [exportScript, tempTarget],
        {
          cwd: root,
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'pipe'],
        },
      );

      expect(output).toContain('=== Exporting AI Engineering Harness ===');
      expect(existsSync(join(tempTarget, 'engineering-harness', 'LICENSE'))).toBe(true);
      expect(existsSync(join(tempTarget, 'engineering-harness', 'package.json'))).toBe(true);
      expect(existsSync(join(tempTarget, 'engineering-harness', 'setup-root-shims.mjs'))).toBe(true);
      expect(existsSync(join(tempTarget, 'engineering-harness', 'core', 'policy', 'CONSTITUTION.md'))).toBe(true);
    } finally {
      try {
        rmSync(tempTarget, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      } catch {
        // Ignored on Windows temporary file lock
      }
    }
  });
});
