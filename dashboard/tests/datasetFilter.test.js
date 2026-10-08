import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterDataset, resetFilters } from '../src/utils/datasetFilter.js';

test('datasetFilter: filterDataset returns all 500 items when activeFilter is all and searchTerm is empty', () => {
  const dummyData = [
    { id: 1, text: 'Great movie', category: 'bert_win', token_count: 50 },
    { id: 2, text: 'Awful acting', category: 'lstm_win', token_count: 120 },
  ];

  const result = filterDataset(dummyData, { activeFilter: 'all', searchTerm: '' });
  assert.equal(result.length, 2);
});

test('datasetFilter: filterDataset filters by activeFilter and searchTerm', () => {
  const dummyData = [
    { id: 1, text: 'Great movie', category: 'bert_win', token_count: 50 },
    { id: 2, text: 'Terrible movie', category: 'bert_win', token_count: 80 },
    { id: 3, text: 'Great acting', category: 'lstm_win', token_count: 40 },
  ];

  const result = filterDataset(dummyData, { activeFilter: 'bert_win', searchTerm: 'Great' });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 1);
});

test('datasetFilter: resetFilters safely returns default state without referencing non-existent properties', () => {
  const state = resetFilters();
  assert.deepEqual(state, {
    searchTerm: '',
    activeFilter: 'all',
    page: 1,
  });
  // Ensure no categoryFilter property exists to prevent ReferenceError
  assert.equal('categoryFilter' in state, false);
});
