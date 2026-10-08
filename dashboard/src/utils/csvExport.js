/**
 * Pure CSV formatting and browser download utility.
 */

export function formatDatasetToCSV(dataset) {
  if (!Array.isArray(dataset)) return '\uFEFF';

  const headers = [
    'ID',
    'Actual_Label',
    'BERT_Pred',
    'BERT_Prob',
    'LSTM_Pred',
    'LSTM_Prob',
    'Category',
    'Token_Count',
    'Text',
    'Reason'
  ];

  const rows = dataset.map((s) => [
    s.id,
    s.label_name,
    s.bert_pred === 1 ? 'Positive' : 'Negative',
    s.bert_prob,
    s.lstm_pred === 1 ? 'Positive' : 'Negative',
    s.lstm_prob,
    s.category,
    s.token_count,
    `"${(s.text || '').replace(/"/g, '""')}"`,
    `"${(s.reason || '').replace(/"/g, '""')}"`
  ]);

  // Prepend UTF-8 BOM (\uFEFF) for Microsoft Excel compatibility on Windows
  return '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
}

export function downloadCSV(csvContent, filename = 'imdb_benchmark_export.csv') {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
