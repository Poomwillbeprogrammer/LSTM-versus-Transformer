import { test } from 'node:test';
import assert from 'node:assert/strict';

test('attentionBounds: matrix lookup safely falls back to 0 when index is undefined or out of bounds', () => {
  const matrix = [
    [0.5, 0.5],
    [0.2, 0.8]
  ];

  const getWeight = (row, col) => matrix[row]?.[col] ?? 0;

  // Valid lookups
  assert.equal(getWeight(0, 1), 0.5);
  assert.equal(getWeight(1, 1), 0.8);

  // Out of bounds row or col should safely return 0 without throwing
  assert.equal(getWeight(null, 1), 0);
  assert.equal(getWeight(5, 1), 0);
  assert.equal(getWeight(0, 99), 0);
  assert.equal(getWeight(undefined, undefined), 0);
});

test('attentionBounds: token tokenizer regex properly strips punctuation and handles whitespace', () => {
  const customText = "The movie was not bad, but the ending was barely watchable.";
  const tokens = customText
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  assert.equal(tokens.length, 11);
  assert.deepEqual(tokens, [
    'The', 'movie', 'was', 'not', 'bad', 'but', 'the', 'ending', 'was', 'barely', 'watchable'
  ]);
});
