import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  AlertCircle, 
  HelpCircle,
  Zap,
  TrendingUp
} from 'lucide-react';

const DEMO_PRESETS = [
  {
    title: "เคสตัวอย่างจากรายงาน (slide 10)",
    text: "The movie was not bad, but the ending was barely watchable.",
    expected: "Negative (หักมุมตอนท้าย)"
  },
  {
    title: "เชิงบวกยอดเยี่ยม (Strong Positive)",
    text: "An absolute masterpiece with breathtaking cinematography and incredible acting.",
    expected: "Positive (เชิงบวกชัดเจน)"
  },
  {
    title: "ประโยคยาวกลับลำ (Long Distance Reversal)",
    text: "I thought I would love this film given the brilliant director, but unfortunately it was completely boring and a waste of time.",
    expected: "Negative (ชมตอนแรกแต่ด่าตอนท้าย)"
  },
  {
    title: "ปฏิเสธตอนต้น (Initial Negation)",
    text: "Not a single minute was wasted; the suspense kept me on the edge of my seat throughout.",
    expected: "Positive (การปฏิเสธสร้างความหมายบวก)"
  }
];

// Sentiment lexicon for interactive browser simulation
const POSITIVE_WORDS = new Set([
  'good', 'great', 'excellent', 'masterpiece', 'brilliant', 'wonderful', 'amazing', 'breathtaking', 
  'incredible', 'fantastic', 'love', 'loved', 'best', 'superb', 'entertaining', 'gem', 'outstanding', 
  'suspense', 'charming', 'beautiful', 'enjoyable', 'liked', 'perfect'
]);

const NEGATIVE_WORDS = new Set([
  'bad', 'worst', 'terrible', 'awful', 'horrible', 'boring', 'waste', 'poor', 'disaster', 'dull', 
  'disappointing', 'failed', 'mess', 'unwatchable', 'hate', 'hated', 'stupid', 'ridiculous', 'flat'
]);

const NEGATORS = new Set([
  'not', "n't", 'never', 'no', 'barely', 'hardly', 'without', 'lack', 'lacks'
]);

const CONTRAST_WORDS = new Set([
  'but', 'however', 'although', 'though', 'yet', 'nevertheless', 'nonetheless', 'despite'
]);

export default function PlaygroundTab() {
  const [inputText, setInputText] = useState(DEMO_PRESETS[0].text);

  // Compute simulated predictions for both models
  const analysis = useMemo(() => {
    const rawTokens = inputText.split(/\s+/).filter(Boolean);
    const cleanTokens = rawTokens.map(t => t.toLowerCase().replace(/[^a-z0-9']/g, ''));

    let lstmScore = 0.5; // baseline neutral
    let bertScore = 0.5;

    // Track token-level contributions
    const tokenDetails = rawTokens.map((raw, idx) => {
      const w = cleanTokens[idx];
      let val = 0;
      if (POSITIVE_WORDS.has(w)) val = 1.0;
      else if (NEGATIVE_WORDS.has(w)) val = -1.0;
      return { raw, clean: w, baseSentiment: val };
    });

    // 1. Simulate LSTM: Sequential flow with exponential distance decay from current position
    // As reading proceeds to the end, early tokens fade
    let runningLstmVal = 0;
    const n = tokenDetails.length;
    for (let i = 0; i < n; i++) {
      let tVal = tokenDetails[i].baseSentiment;
      // Simple local negation check (only 1 step prior)
      if (i > 0 && NEGATORS.has(tokenDetails[i - 1].clean)) {
        tVal = -tVal * 0.8;
      }
      // Decay weight: earlier tokens have less weight at the final step
      const distanceToFinal = n - 1 - i;
      const decayWeight = Math.pow(0.85, distanceToFinal);
      runningLstmVal += tVal * decayWeight;
    }
    // Sigmoid mapping
    lstmScore = 1 / (1 + Math.exp(-runningLstmVal * 1.4));

    // 2. Simulate BERT: Bidirectional attention + full negation binding
    let runningBertVal = 0;
    for (let i = 0; i < n; i++) {
      let tVal = tokenDetails[i].baseSentiment;
      // Bidirectional window search for negators (up to 3 words before or after)
      let isNegated = false;
      for (let j = Math.max(0, i - 3); j <= Math.min(n - 1, i + 2); j++) {
        if (NEGATORS.has(tokenDetails[j].clean)) {
          isNegated = true;
          break;
        }
      }

      if (isNegated && tVal !== 0) {
        tVal = -tVal * 0.9; // flip sentiment cleanly
      }

      // Check for contrastive pivot (e.g. 'but', 'however', 'although', 'yet', 'nevertheless')
      // Words after contrastive connectors carry more global weight in sentiment classification
      let positionMultiplier = 1.0;
      for (let k = 0; k < i; k++) {
        if (CONTRAST_WORDS.has(cleanTokens[k])) {
          positionMultiplier = 1.8;
        }
      }

      runningBertVal += tVal * positionMultiplier;
    }
    // Sigmoid mapping for BERT (steeper confidence)
    bertScore = 1 / (1 + Math.exp(-runningBertVal * 1.8));

    // Clamp values
    lstmScore = Math.min(0.98, Math.max(0.02, Number(lstmScore.toFixed(3))));
    bertScore = Math.min(0.99, Math.max(0.01, Number(bertScore.toFixed(3))));

    return {
      tokens: tokenDetails,
      lstmProb: lstmScore,
      lstmPred: lstmScore >= 0.5 ? 1 : 0,
      bertProb: bertScore,
      bertPred: bertScore >= 0.5 ? 1 : 0,
    };
  }, [inputText]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Box */}
      <div className="bg-[#16120e]/95 border border-[#2e251b] rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#d99f3d] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Live Interactive Playground
            </span>
            <h2 className="text-xl font-bold text-[#fdfbf7] mt-1">
              ทดสอบวิเคราะห์ความรู้สึกแบบ Real-Time (Playground & Saliency)
            </h2>
            <p className="text-xs sm:text-sm text-[#ab9b87] mt-1">
              พิมพ์ประโยคภาษาอังกฤษใดๆ เพื่อทดสอบดูว่า LSTM (จำลอง Context Decay) กับ BERT (จำลอง Bidirectional Attention) จะให้ผลทำนายอย่างไร
            </p>
          </div>

          <button
            onClick={() => setInputText('')}
            className="px-3.5 py-2 bg-[#0c0a08] hover:bg-[#221a12] border border-[#2e251b] rounded-xl text-xs text-[#9e917f] hover:text-[#fdfbf7] flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors touch-manipulation min-h-[38px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ล้างข้อความ</span>
          </button>
        </div>

        {/* Presets */}
        <div className="mt-4 flex flex-wrap gap-2">
          {DEMO_PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setInputText(p.text)}
              className="px-3.5 py-2 rounded-xl bg-[#0c0a08] border border-[#2e251b] hover:border-[#c58a2e]/60 text-xs text-[#e2d7c5] hover:text-[#fdfbf7] transition-all cursor-pointer text-left touch-manipulation min-h-[38px] flex items-center"
            >
              <span className="font-semibold text-[#d99f3d] mr-1.5">#{idx + 1}</span>
              <span>{p.title}</span>
            </button>
          ))}
        </div>

        {/* Text Area */}
        <div className="mt-4">
          <textarea
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type any English movie review sentence here..."
            className="w-full bg-[#0c0a08] border border-[#382f25] rounded-xl p-3.5 text-base sm:text-sm text-[#fdfbf7] focus:outline-none focus:border-[#c58a2e] font-mono transition-colors"
          />
        </div>
      </div>

      {/* Side-by-Side Model Prediction Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LSTM Score Card */}
        <div className="bg-[#16120e]/95 border border-[#4d3716] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#2e251b] pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 font-bold">Baseline Model</span>
              <h3 className="text-lg font-bold text-[#fdfbf7]">LSTM Classifier</h3>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
              analysis.lstmPred === 1 
                ? 'bg-emerald-500/20 text-[#34d399] border border-emerald-500/30' 
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {analysis.lstmPred === 1 ? 'Positive (เชิงบวก)' : 'Negative (เชิงลบ)'}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-[#9e917f] mb-1.5">
              <span>ความน่าจะเป็นเชิงบวก (Positive Probability):</span>
              <span className="font-mono text-amber-400 font-bold text-sm">
                {(analysis.lstmProb * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-[#0c0a08] h-3 rounded-full overflow-hidden border border-[#2e251b]">
              <div 
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${analysis.lstmProb * 100}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl text-xs text-[#e2d7c5] leading-relaxed">
            <span className="text-amber-400 font-bold block mb-1">พฤติกรรมการตัดสินใจของ LSTM:</span>
            ประมวลผลคำจากซ้ายไปขวา โดยคำที่อยู่ตอนท้ายประโยคจะมีน้ำหนักกดดันมากกว่าคำตอนต้นเนื่องจาก Context Decay หากคำปฏิเสธ (เช่น "not") อยู่ห่างจากคำคุณศัพท์ โมเดลอาจจับคู่ไม่ทัน
          </div>
        </div>

        {/* BERT Score Card */}
        <div className="bg-[#16120e]/95 border border-[#c58a2e]/40 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#2e251b] pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-[#d99f3d] font-bold">Fine-tuned Model</span>
              <h3 className="text-lg font-bold text-[#fdfbf7]">BERT Classifier</h3>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
              analysis.bertPred === 1 
                ? 'bg-emerald-500/20 text-[#34d399] border border-emerald-500/30' 
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {analysis.bertPred === 1 ? 'Positive (เชิงบวก)' : 'Negative (เชิงลบ)'}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-[#9e917f] mb-1.5">
              <span>ความน่าจะเป็นเชิงบวก (Positive Probability):</span>
              <span className="font-mono text-[#f0c674] font-bold text-sm">
                {(analysis.bertProb * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-[#0c0a08] h-3 rounded-full overflow-hidden border border-[#2e251b]">
              <div 
                className="h-full bg-gradient-to-r from-[#b87d24] to-[#f0c674] transition-all duration-300"
                style={{ width: `${analysis.bertProb * 100}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl text-xs text-[#e2d7c5] leading-relaxed">
            <span className="text-[#d99f3d] font-bold block mb-1">พฤติกรรมการตัดสินใจของ BERT:</span>
            Self-Attention ตรวจจับบริบทสองทิศทางพร้อมกัน คำปฏิเสธอย่าง "barely" หรือ "not" จะถูกผูกเข้ากับคำเป้าหมายโดยตรง และให้น้ำหนักกับ clause สำคัญหลังคำเชื่อม "but" ได้อย่างแม่นยำ
          </div>
        </div>
      </div>

      {/* Token Saliency / Heatmap Breakdown */}
      <div className="bg-[#16120e]/95 border border-[#2e251b] rounded-2xl p-6 shadow-lg">
        <h3 className="text-sm font-bold text-[#fdfbf7] mb-2 flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#d99f3d]" />
          <span>การวิเคราะห์คำสำคัญในประโยค (Token Saliency & Lexicon Breakdown)</span>
        </h3>
        <p className="text-xs text-[#9e917f] mb-4">
          คำที่มีอิทธิพลต่อความรู้สึก: <span className="text-[#34d399] font-bold">สีเขียว = เชิงบวก</span>, <span className="text-rose-400 font-bold">สีแดง = เชิงลบ</span>, <span className="text-[#f0c674] font-bold">สีทอง/ส้ม = คำปฏิเสธ/เชื่อม</span>
        </p>

        <div className="flex flex-wrap gap-2 p-4 bg-[#0c0a08] border border-[#2e251b] rounded-xl">
          {analysis.tokens.map((tok, idx) => {
            const isPos = POSITIVE_WORDS.has(tok.clean);
            const isNeg = NEGATIVE_WORDS.has(tok.clean);
            const isNegator = NEGATORS.has(tok.clean);
            const isContrast = CONTRAST_WORDS.has(tok.clean);

            return (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${
                  isPos
                    ? 'bg-emerald-500/20 text-[#34d399] border-emerald-500/40 font-bold'
                    : isNeg
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                    : isNegator || isContrast
                    ? 'bg-[#c58a2e]/20 text-[#f0c674] border-[#c58a2e]/40 font-bold'
                    : 'bg-[#16120e] text-[#9e917f] border-[#2e251b]'
                }`}
              >
                {tok.raw}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
