import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import * as sass from 'sass';
import nextConfig from '../next.config.mjs';

test('button CSS stays safe to concatenate in production without changing arrow content', () => {
  const source = readFileSync('app/(site)/components/button/Button.module.scss', 'utf8')
    .replace("@use '@/styles/_tokens.scss' as *;", "@use '_tokens.scss' as *;");
  const compile = (options) => sass.compileString(source, {
    style: 'compressed',
    loadPaths: [path.resolve('app/styles')],
    ...options,
  }).css;
  const baseline = compile({ charset: true });
  assert.ok(baseline.startsWith('\uFEFF'), 'exercise the encoding marker emitted for Unicode arrows');
  assert.equal(nextConfig.sassOptions.charset, false);
  const output = compile(nextConfig.sassOptions);
  assert.equal(output.includes('\uFEFF'), false);
  assert.ok(output.startsWith('.button{position:relative;'));
  assert.equal(output, baseline.slice(1), 'only the encoding marker should change');
});
