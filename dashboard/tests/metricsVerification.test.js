import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('metricsVerification: dataset_500 ground-truth matches benchmark metrics exactly', async () => {
  const datasetPath = path.resolve(__dirname, '../src/data/dataset_500.json');
  const raw = fs.readFileSync(datasetPath, 'utf-8');
  const data = JSON.parse(raw);

  assert.equal(data.length, 500, 'Dataset must contain exactly 500 test samples');

  // Ground truth actual classes
  const actualPos = data.filter(d => d.label === 1).length;
  const actualNeg = data.filter(d => d.label === 0).length;
  assert.equal(actualPos, 246, 'Actual positive count must be 246');
  assert.equal(actualNeg, 254, 'Actual negative count must be 254');

  // BERT Confusion Matrix
  const bertTP = data.filter(d => d.label === 1 && d.bert_pred === 1).length;
  const bertTN = data.filter(d => d.label === 0 && d.bert_pred === 0).length;
  const bertFP = data.filter(d => d.label === 0 && d.bert_pred === 1).length;
  const bertFN = data.filter(d => d.label === 1 && d.bert_pred === 0).length;

  assert.equal(bertTP, 216, 'BERT True Positive must be 216');
  assert.equal(bertTN, 212, 'BERT True Negative must be 212');
  assert.equal(bertFP, 42, 'BERT False Positive must be 42');
  assert.equal(bertFN, 30, 'BERT False Negative must be 30');

  // Win/Tie category counts
  const bertWins = data.filter(d => d.category === 'bert_win').length;
  const lstmWins = data.filter(d => d.category === 'lstm_win').length;
  const bothCorrect = data.filter(d => d.category === 'both_correct').length;
  const bothWrong = data.filter(d => d.category === 'both_wrong').length;
  const totalTies = bothCorrect + bothWrong;

  assert.equal(bertWins, 183, 'BERT wins must be 183');
  assert.equal(lstmWins, 31, 'LSTM wins must be 31 (not 23)');
  assert.equal(totalTies, 286, 'Total ties must be 286 (not 294)');
});

test('metricsVerification: PRESENTATION_SCRIPT contains zero conflicting metrics', async () => {
  const scriptPath = path.resolve(__dirname, '../../PRESENTATION_SCRIPT.md');
  const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

  // Contradictory numbers should NOT be in the presentation script
  assert.doesNotMatch(scriptContent, /True Positive.*?215.*?True Negative.*?213/s, 'Presentation script should not contain stale TP 215 / TN 213');
  assert.doesNotMatch(scriptContent, /LSTM ชนะ 23 เคส/, 'Presentation script should not undercount LSTM wins as 23');

  // Ground truth verified numbers MUST be present
  assert.match(scriptContent, /216.*?212/, 'Presentation script must cite verified TP=216 and TN=212');
  assert.match(scriptContent, /LSTM ชนะ 31 เคส/, 'Presentation script must cite verified 31 LSTM wins');
});
