/**
 * Pure dataset filtering and state management utilities.
 */

export function filterDataset(dataset, { activeFilter = 'all', searchTerm = '' } = {}) {
  if (!Array.isArray(dataset)) return [];

  return dataset.filter((item) => {
    // Category / Root Cause filter
    if (activeFilter === 'bert_win' && item.category !== 'bert_win') return false;
    if (activeFilter === 'rc_negation' && (item.category !== 'bert_win' || item.root_cause_group !== 'negation')) return false;
    if (activeFilter === 'rc_contrastive' && (item.category !== 'bert_win' || item.root_cause_group !== 'contrastive')) return false;
    if (activeFilter === 'rc_decay' && (item.category !== 'bert_win' || item.root_cause_group !== 'decay')) return false;
    if (activeFilter === 'lstm_win' && item.category !== 'lstm_win') return false;
    if (activeFilter === 'both_correct' && item.category !== 'both_correct') return false;
    if (activeFilter === 'both_wrong' && item.category !== 'both_wrong') return false;
    if (activeFilter === 'negation' && !item.tags?.includes('negation')) return false;
    if (activeFilter === 'long' && item.token_count < 100) return false;

    // Search filter
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      const matchesText = item.text?.toLowerCase().includes(lower);
      const matchesId = item.id?.toString() === searchTerm;
      if (!matchesText && !matchesId) return false;
    }

    return true;
  });
}

export function resetFilters() {
  return {
    searchTerm: '',
    activeFilter: 'all',
    page: 1,
  };
}
