import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeSentiment } from '../src/utils/sentimentEngine.js';

test('sentimentEngine: empty or whitespace input returns isIdle true and null probabilities', () => {
  const result = analyzeSentiment('   ');
  assert.equal(result.isIdle, true);
  assert.equal(result.tokens.length, 0);
  assert.equal(result.lstmProb, null);
  assert.equal(result.bertProb, null);
});

test('sentimentEngine: classifies strong positive sentence correctly', () => {
  const result = analyzeSentiment('An absolute masterpiece with brilliant acting.');
  assert.equal(result.isIdle, false);
  assert.equal(result.bertPred, 1);
  assert.ok(result.bertProb > 0.6);
});

test('sentimentEngine: O(n) contrast weighting operates smoothly on long text', () => {
  const words = ['good', 'great', 'however', 'terrible', 'awful', 'waste'];
  // Build a 1,000-word sentence
  const longText = Array.from({ length: 200 }, () => words.join(' ')).join(' ');

  const startTime = performance.now();
  const result = analyzeSentiment(longText);
  const duration = performance.now() - startTime;

  assert.equal(result.isIdle, false);
  assert.ok(duration < 50, `Execution should take < 50ms, took ${duration.toFixed(2)}ms`);
});
