/**
 * Sentiment analysis simulation engine with O(n) performance.
 */

export const POSITIVE_WORDS = new Set([
  'good', 'great', 'excellent', 'masterpiece', 'brilliant', 'wonderful', 'amazing', 'breathtaking', 
  'incredible', 'fantastic', 'love', 'loved', 'best', 'superb', 'entertaining', 'gem', 'outstanding', 
  'suspense', 'charming', 'beautiful', 'enjoyable', 'liked', 'perfect'
]);

export const NEGATIVE_WORDS = new Set([
  'bad', 'worst', 'terrible', 'awful', 'horrible', 'boring', 'waste', 'poor', 'disaster', 'dull', 
  'disappointing', 'failed', 'mess', 'unwatchable', 'hate', 'hated', 'stupid', 'ridiculous', 'flat'
]);

export const NEGATORS = new Set([
  'not', "n't", 'never', 'no', 'barely', 'hardly', 'without', 'lack', 'lacks'
]);

export const CONTRAST_WORDS = new Set([
  'but', 'however', 'although', 'though', 'yet', 'nevertheless', 'nonetheless', 'despite'
]);

export function analyzeSentiment(inputText = '') {
  const trimmed = inputText.trim();
  if (!trimmed) {
    return {
      tokens: [],
      lstmProb: null,
      lstmPred: null,
      bertProb: null,
      bertPred: null,
      isIdle: true,
    };
  }

  const rawTokens = trimmed.split(/\s+/).filter(Boolean);
  const cleanTokens = rawTokens.map(t => t.toLowerCase().replace(/[^a-z0-9']/g, ''));
  const n = rawTokens.length;

  // Track token-level contributions
  const tokenDetails = rawTokens.map((raw, idx) => {
    const w = cleanTokens[idx];
    let val = 0;
    if (POSITIVE_WORDS.has(w)) val = 1.0;
    else if (NEGATIVE_WORDS.has(w)) val = -1.0;
    return { raw, clean: w, baseSentiment: val };
  });

  // 1. Simulate LSTM: Sequential flow with exponential distance decay from final step
  let runningLstmVal = 0;
  for (let i = 0; i < n; i++) {
    let tVal = tokenDetails[i].baseSentiment;
    // Simple local negation check (1 step prior)
    if (i > 0 && NEGATORS.has(tokenDetails[i - 1].clean)) {
      tVal = -tVal * 0.8;
    }
    const distanceToFinal = n - 1 - i;
    const decayWeight = Math.pow(0.85, distanceToFinal);
    runningLstmVal += tVal * decayWeight;
  }
  const lstmScore = 1 / (1 + Math.exp(-runningLstmVal * 1.4));

  // 2. Simulate BERT: Bidirectional attention + full negation binding with O(n) contrast lookup
  let runningBertVal = 0;
  // Precompute first contrast token index in O(n) rather than inner O(n^2) loop
  const firstContrastIdx = cleanTokens.findIndex(t => CONTRAST_WORDS.has(t));

  for (let i = 0; i < n; i++) {
    let tVal = tokenDetails[i].baseSentiment;

    // Bidirectional window search for negators (up to 3 words before or after)
    let isNegated = false;
    for (let offset = -3; offset <= 3; offset++) {
      if (offset === 0) continue;
      const targetIdx = i + offset;
      if (targetIdx >= 0 && targetIdx < n && NEGATORS.has(cleanTokens[targetIdx])) {
        isNegated = true;
        break;
      }
    }

    if (isNegated) {
      tVal = -tVal * 1.2;
    }

    // Weight tokens following contrast conjunctions with O(1) comparison
    const positionMultiplier = (firstContrastIdx !== -1 && i > firstContrastIdx) ? 1.8 : 1.0;
    runningBertVal += tVal * positionMultiplier;
  }
  const bertScore = 1 / (1 + Math.exp(-runningBertVal * 1.2));

  return {
    tokens: tokenDetails,
    lstmProb: lstmScore,
    lstmPred: lstmScore >= 0.5 ? 1 : 0,
    bertProb: bertScore,
    bertPred: bertScore >= 0.5 ? 1 : 0,
    isIdle: false,
  };
}
