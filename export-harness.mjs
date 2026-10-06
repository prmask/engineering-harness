#!/usr/bin/env node
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const targetArg = process.argv[2];

if (!targetArg) {
  console.log(`
Usage:
  node export-harness.mjs <target-project-path>

Example:
  node export-harness.mjs ../05my-new-app
  node export-harness.mjs "C:\\Users\\PREM\\Documents\\Work Files\\Coding\\05my-new-app"
`);
  process.exit(1);
}

const targetPath = path.resolve(process.cwd(), targetArg);

if (!fs.existsSync(targetPath)) {
  console.error(`Error: Target directory does not exist: ${targetPath}`);
  process.exit(1);
}

const harnessDest = path.join(targetPath, 'engineering-harness');
const sourceDir = process.cwd();

console.log(`=== Exporting AI Engineering Harness ===`);
console.log(`Source:      ${sourceDir}`);
console.log(`Target Repo: ${targetPath}`);
console.log(`Destination: ${harnessDest}\n`);

// Ensure destination exists
fs.mkdirSync(harnessDest, { recursive: true });

// Items to copy
const itemsToCopy = [
  'adapters',
  'agents',
  'commands',
  'core',
  'hooks',
  'schemas',
  'skills',
  'templates',
  'tests',
  'README.md',
  'setup-root-shims.mjs',
  'export-harness.mjs',
  'package.json',
  'tsconfig.json',
  'vitest.config.ts'
];

for (const item of itemsToCopy) {
  const srcItem = path.join(sourceDir, item);
  const dstItem = path.join(harnessDest, item);

  if (fs.existsSync(srcItem)) {
    fs.cpSync(srcItem, dstItem, { recursive: true, force: true });
    console.log(`✔ Copied ${item}`);
  }
}

// Automatically execute setup-root-shims.mjs in the target project
console.log(`\n=== Configuring Root Shims in Target Project ===`);
try {
  execSync(`node "${path.join(harnessDest, 'setup-root-shims.mjs')}"`, {
    cwd: targetPath,
    stdio: 'inherit'
  });
  console.log(`\n🎉 Success! AI Engineering Harness is fully installed and active in:`);
  console.log(`   ${targetPath}`);
} catch (err) {
  console.error(`⚠ Could not run setup-root-shims.mjs automatically:`, err.message);
  console.log(`Run manually in the target directory: node engineering-harness/setup-root-shims.mjs`);
}
