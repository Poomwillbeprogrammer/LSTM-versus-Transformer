import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatDatasetToCSV } from '../src/utils/csvExport.js';

test('csvExport: formatDatasetToCSV starts with UTF-8 BOM for Excel Thai compatibility', () => {
  const dummy = [{
    id: 1,
    label_name: 'Positive',
    bert_pred: 1,
    bert_prob: 0.95,
    lstm_pred: 0,
    lstm_prob: 0.45,
    category: 'bert_win',
    token_count: 50,
    text: 'A great movie with #awesome ending',
    reason: 'BERT เข้าใจความหมายสมบูรณ์'
  }];

  const csv = formatDatasetToCSV(dummy);
  assert.equal(csv.charCodeAt(0), 0xFEFF, 'First character must be UTF-8 BOM (\\uFEFF)');
});

test('csvExport: preserves reviews with #, quotes, and newlines without data truncation', () => {
  const dummy = [
    {
      id: 126,
      label_name: 'Negative',
      bert_pred: 0,
      bert_prob: 0.98,
      lstm_pred: 1,
      lstm_prob: 0.52,
      category: 'bert_win',
      token_count: 65,
      text: 'Movie #1 was bad; "really" bad.',
      reason: 'มีเครื่องหมาย # และคำพูด'
    },
    {
      id: 127,
      label_name: 'Positive',
      bert_pred: 1,
      bert_prob: 0.91,
      lstm_pred: 1,
      lstm_prob: 0.88,
      category: 'both_correct',
      token_count: 40,
      text: 'Superb film',
      reason: 'ทำนายถูกทั้งคู่'
    }
  ];

  const csv = formatDatasetToCSV(dummy);
  const lines = csv.trim().split('\r\n');
  assert.equal(lines.length, 3, 'CSV must contain 1 header line + 2 data rows');
  assert.match(lines[0], /ID,Actual_Label,BERT_Pred,BERT_Prob,LSTM_Pred,LSTM_Prob,Category,Token_Count,Text,Reason/);
  assert.match(lines[1], /Movie #1 was bad/);
  assert.match(lines[1], /มีเครื่องหมาย # และคำพูด/);
  assert.match(lines[2], /127,Positive/);
});
