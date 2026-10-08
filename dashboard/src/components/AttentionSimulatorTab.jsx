import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  ArrowRight, 
  RotateCcw, 
  Play, 
  Pause, 
  Info, 
  Activity, 
  Eye, 
  Zap, 
  Network,
  Cpu,
  Grid,
  ListFilter,
  Pin,
  Sparkles,
  HelpCircle,
  Maximize2,
  Minimize2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { LSTMMainFormulas, LSTMGateBreakdown, AttentionFormula } from './MathView';

const PRESET_SENTENCES = [
  {
    id: 1,
    title: "เคสหักมุมและปฏิเสธซ้อน (จากรายงาน)",
    text: "The movie was not bad, but the ending was barely watchable.",
    groundTruth: "Negative",
    note: "LSTM พลาดเพราะ 'not' กับ 'barely' อยู่คนละตำแหน่งและถูกกลบด้วยคำเชื่อม ส่วน BERT จับคู่ (not, bad) และ (barely, watchable) ได้ทันที",
    bindingExplanation: "ใน Transformer ทุกคู่คำเชื่อมต่อถึงกันโดยตรงด้วยระยะทาง Path Length = 1 เช่น คำปฏิเสธ 'not' สามารถผูกติดกับ 'bad' ได้ทันทีแม้จะอยู่ห่างกัน และ 'barely' เชื่อมโยงกับ 'watchable' โดยไม่สนลำดับก่อนหลัง",
    lstmResult: {
      prediction: "Positive",
      isCorrect: false,
      confidence: 63.2,
      positiveProb: 63.2,
      negativeProb: 36.8,
      reason: "ถูกคำว่า 'watchable' ท้ายประโยคดึงดูดจาก Recency Bias ขณะที่ข้อมูลคำปฏิเสธ 'not' และ 'barely' เสื่อมสลาย (Decay) เหลือเพียง 10-15%"
    },
    bertResult: {
      prediction: "Negative",
      isCorrect: true,
      confidence: 96.4,
      positiveProb: 3.6,
      negativeProb: 96.4,
      reason: "Self-Attention Head 2 ผูกมัด 'barely' ➔ 'watchable' (74%) และ 'not' ➔ 'bad' (85%) ทำให้ [CLS] เวกเตอร์สรุปเป็นขั้วลบได้อย่างเด็ดขาด"
    }
  },
  {
    id: 2,
    title: "ประโยคยาวกลับทิศทาง (Long-term contrast)",
    text: "Although the visuals were stunning and cast was great, the plot was boring.",
    groundTruth: "Negative",
    note: "LSTM ลืมคำชมตอนต้นเมื่อเจอ 'boring' ตอนท้าย ส่วน BERT เชื่อม 'plot' กับ 'boring' โดยตรง",
    bindingExplanation: "Self-Attention เชื่อมโยง 'plot' เข้ากับ 'boring' โดยตรงในระยะไกล และรักษาน้ำหนักความสัมพันธ์กับ 'Although' เพื่อระบุว่าคำชม visuals/cast เป็นเพียงส่วนเกริ่นนำ (Concessive clause) จึงสรุปทิศทางหลักเป็นเชิงลบได้ถูกต้อง",
    lstmResult: {
      prediction: "Positive",
      isCorrect: false,
      confidence: 58.6,
      positiveProb: 58.6,
      negativeProb: 41.4,
      reason: "ข้อมูลคำชมต้นประโยค (visuals stunning / cast great) ปะปนกับ 'plot boring' และไม่เข้าใจโครงสร้างประโยคขัดแย้งของ Although"
    },
    bertResult: {
      prediction: "Negative",
      isCorrect: true,
      confidence: 93.8,
      positiveProb: 6.2,
      negativeProb: 93.8,
      reason: "Head 3 (Contrastive) ตรวจจับ 'Although' และ Head 4 ให้น้ำหนักกับคำว่า 'boring' จึงสรุปใจความหลักเป็น Negative ได้ถูกต้อง"
    }
  },
  {
    id: 3,
    title: "ประโยคเชิงบวกตรงไปตรงมา",
    text: "An absolutely magnificent masterpiece that deserves every single award.",
    groundTruth: "Positive",
    note: "ทั้งสองโมเดลทำนายได้ถูกต้องเพราะไม่มีคำหักมุมหรือคำปฏิเสธ",
    bindingExplanation: "Self-Attention เสริมแรงความสัมพันธ์ระหว่างคำคุณศัพท์เชิงบวก 'magnificent' เข้ากับ 'masterpiece' และ 'deserves' ทำให้เวกเตอร์ความรู้สึกขั้วบวกกระจายครอบคลุมทั่วทั้งประโยคอย่างสม่ำเสมอ",
    lstmResult: {
      prediction: "Positive",
      isCorrect: true,
      confidence: 89.2,
      positiveProb: 89.2,
      negativeProb: 10.8,
      reason: "ไม่มีคำปฏิเสธหรือคำเชื่อมขัดแย้ง และคำท้ายประโยค (award/deserves) เป็นบวกทั้งสิ้น LSTM จึงรักษาทิศทางบวกได้สำเร็จ"
    },
    bertResult: {
      prediction: "Positive",
      isCorrect: true,
      confidence: 98.6,
      positiveProb: 98.6,
      negativeProb: 1.4,
      reason: "เวกเตอร์ [CLS] ได้รับการเสริมแรงจากทุกโทเค็นเชิงบวก (magnificent, masterpiece, deserves) ทำให้มั่นใจระดับสูงมาก 98.6%"
    }
  },
];

const HEAD_METADATA = {
  1: {
    id: 1,
    name: "Head 1: Local Syntactic Context",
    shortName: "Head 1: คำข้างเคียง",
    role: "จับคู่คำที่อยู่ติดกันตามไวยากรณ์ (Adjacent / Local Grammar)",
    desc: "โฟกัสความสัมพันธ์ระหว่างคำที่อยู่ติดกันเพื่อเก็บโครงสร้างกลุ่มคำและวลีเฉพาะที่",
    color: "#d97706"
  },
  2: {
    id: 2,
    name: "Head 2: Negation & Modifier Binding",
    shortName: "Head 2: คำปฏิเสธ",
    role: "จับคู่คำปฏิเสธและคำกำหนดทิศทาง (Negation & Modifiers)",
    desc: "ตรวจจับคู่คำปฏิเสธ เช่น 'not' ↔ 'bad' หรือ 'barely' ↔ 'watchable' เพื่อระบุการกลับขั้วอารมณ์ของประโยค",
    color: "#f59e0b"
  },
  3: {
    id: 3,
    name: "Head 3: Contrastive & Clause Discourse",
    shortName: "Head 3: คำเชื่อมขัดแย้ง",
    role: "จับคำเชื่อมอนุประโยคขัดแย้ง (Discourse / Contrast)",
    desc: "เชื่อมโยงข้ามอนุประโยคผ่านคำเชื่อม 'but', 'although' เพื่อแยกแยะข้อความเกริ่นนำกับใจความสำคัญ",
    color: "#eab308"
  },
  4: {
    id: 4,
    name: "Head 4: Global Core Sentiment",
    shortName: "Head 4: แกนอารมณ์รวม",
    role: "รวบรวมแกนความรู้สึกหลักทั้งประโยค (Global Semantic Pooling)",
    desc: "กระจายความสนใจไปยังคำที่มีค่าน้ำหนักอารมณ์สูงทั่วทั้งประโยค เพื่อเตรียมส่งข้อมูลสรุปเข้าสู่ Classification Head",
    color: "#c58a2e"
  }
};

export default function AttentionSimulatorTab() {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_SENTENCES[0]);
  const [customText, setCustomText] = useState(PRESET_SENTENCES[0].text);
  const [selectedTokenIdx, setSelectedTokenIdx] = useState(null);
  const [lstmStep, setLstmStep] = useState(0);
  const [isPlayingLstm, setIsPlayingLstm] = useState(false);
  const [activeHead, setActiveHead] = useState(2); // Default to Head 2 (Negation) as requested
  const [viewMode, setViewMode] = useState('matrix'); // 'matrix' (2D Grid Heatmap) vs 'spotlight' (Token Spotlight)
  const [hoveredCell, setHoveredCell] = useState(null); // { r, c }
  const [pinnedCell, setPinnedCell] = useState(null); // { r, c }
  const [isFullWidth, setIsFullWidth] = useState(false); // Full-width presentation mode

  const tokens = useMemo(() => {
    return customText
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .split(/\s+/)
      .filter(Boolean);
  }, [customText]);

  // Model Classification Verdicts for both architectures
  const modelVerdicts = useMemo(() => {
    if (selectedPreset && customText.trim() === selectedPreset.text.trim()) {
      return {
        groundTruth: selectedPreset.groundTruth,
        lstm: selectedPreset.lstmResult,
        bert: selectedPreset.bertResult
      };
    }
    // Dynamic calculation for custom user input
    const cleanWords = tokens.map(t => t.toLowerCase());
    const n = cleanWords.length;
    let lstmVal = 0;
    for (let i = 0; i < n; i++) {
      let v = 0;
      if (['good', 'great', 'excellent', 'masterpiece', 'wonderful', 'amazing', 'stunning', 'best', 'superb', 'watchable'].includes(cleanWords[i])) v = 1;
      else if (['bad', 'worst', 'terrible', 'awful', 'horrible', 'boring', 'poor', 'waste', 'disaster'].includes(cleanWords[i])) v = -1;
      if (i > 0 && ['not', "n't", 'barely', 'never', 'hardly'].includes(cleanWords[i - 1])) v = -v * 0.8;
      const decay = Math.pow(0.85, n - 1 - i);
      lstmVal += v * decay;
    }
    const lstmPosProb = Math.min(98, Math.max(2, Number((1 / (1 + Math.exp(-lstmVal * 1.4)) * 100).toFixed(1))));
    const lstmPred = lstmPosProb >= 50 ? 'Positive' : 'Negative';

    let bertVal = 0;
    for (let i = 0; i < n; i++) {
      let v = 0;
      if (['good', 'great', 'excellent', 'masterpiece', 'wonderful', 'amazing', 'stunning', 'best', 'superb', 'watchable'].includes(cleanWords[i])) v = 1;
      else if (['bad', 'worst', 'terrible', 'awful', 'horrible', 'boring', 'poor', 'waste', 'disaster'].includes(cleanWords[i])) v = -1;
      let isNeg = false;
      for (let j = Math.max(0, i - 3); j <= Math.min(n - 1, i + 2); j++) {
        if (['not', "n't", 'barely', 'never', 'hardly'].includes(cleanWords[j])) { isNeg = true; break; }
      }
      if (isNeg && v !== 0) v = -v * 0.9;
      let mult = 1.0;
      for (let k = 0; k < i; k++) {
        if (['but', 'however', 'although'].includes(cleanWords[k])) mult = 1.8;
      }
      bertVal += v * mult;
    }
    const bertPosProb = Math.min(99, Math.max(1, Number((1 / (1 + Math.exp(-bertVal * 1.8)) * 100).toFixed(1))));
    const bertPred = bertPosProb >= 50 ? 'Positive' : 'Negative';

    return {
      groundTruth: "ข้อความกำหนดเอง",
      lstm: {
        prediction: lstmPred,
        isCorrect: null,
        confidence: lstmPred === 'Positive' ? lstmPosProb : Number((100 - lstmPosProb).toFixed(1)),
        positiveProb: lstmPosProb,
        negativeProb: Number((100 - lstmPosProb).toFixed(1)),
        reason: "เวกเตอร์ h_T ประมวลผลแบบต่อเนื่องตามลำดับ คำท้ายประโยคมีอิทธิพลมากกว่าคำต้นประโยค (Recency Bias)"
      },
      bert: {
        prediction: bertPred,
        isCorrect: null,
        confidence: bertPred === 'Positive' ? bertPosProb : Number((100 - bertPosProb).toFixed(1)),
        positiveProb: bertPosProb,
        negativeProb: Number((100 - bertPosProb).toFixed(1)),
        reason: "เวกเตอร์ [CLS] ประมวลผล Attention สองทิศทางทั่วทั้งประโยค รวบรวมน้ำหนักจากทุกโทเค็นพร้อมกัน"
      }
    };
  }, [selectedPreset, customText, tokens]);

  // Compute simulated Attention Matrix for BERT specialized by active Head
  const attentionMatrix = useMemo(() => {
    const n = tokens.length;
    if (n === 0) return [];
    const mat = Array(n).fill(0).map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      let rowSum = 0;
      const wI = tokens[i].toLowerCase();

      for (let j = 0; j < n; j++) {
        const wJ = tokens[j].toLowerCase();
        let score = 0.08; // baseline uniform floor

        // Self-focus
        if (i === j) {
          score += (activeHead === 4 ? 0.35 : 0.22);
        }

        if (activeHead === 1) {
          // Head 1: Local grammar & adjacent words
          if (Math.abs(i - j) === 1) score += 0.95;
          if (Math.abs(i - j) === 2) score += 0.35;
        } else if (activeHead === 2) {
          // Head 2: Negation & modifier binding (not, barely, never, bad, watchable, good)
          const isNegI = ['not', "n't", 'barely', 'never', 'hardly'].includes(wI);
          const isNegJ = ['not', "n't", 'barely', 'never', 'hardly'].includes(wJ);
          const isAdjI = ['bad', 'watchable', 'good', 'stunning', 'great', 'boring', 'magnificent', 'masterpiece'].includes(wI);
          const isAdjJ = ['bad', 'watchable', 'good', 'stunning', 'great', 'boring', 'magnificent', 'masterpiece'].includes(wJ);

          const dist = Math.abs(i - j);
          if (isNegI && isAdjJ) {
            if (dist <= 3) {
              // Direct local clause target (e.g. 'barely' -> 'watchable' = 74%, 'not' -> 'bad' = 85%)
              score += (wI === 'not' ? 8.5 : 4.1);
            } else {
              // Cross-clause (dist > 3, e.g. 'barely' across to 'bad')
              score += 0.25;
            }
          } else if (isNegJ && isAdjI) {
            if (dist <= 3) score += 2.8;
            else score += 0.2;
          }

          if (dist === 1) score += 0.3;
        } else if (activeHead === 3) {
          // Head 3: Contrastive discourse ('but', 'although', 'however')
          const isContrastI = ['but', 'although', 'however'].includes(wI);
          const isContrastJ = ['but', 'although', 'however'].includes(wJ);

          if (isContrastI || isContrastJ) score += 1.3;
          if (Math.abs(i - j) >= 3) score += 0.45; // long range links
        } else if (activeHead === 4) {
          // Head 4: Global Core Sentiment
          const sentimentWords = ['magnificent', 'masterpiece', 'boring', 'bad', 'stunning', 'barely', 'watchable', 'great', 'deserves'];
          if (sentimentWords.includes(wJ)) score += 0.95;
          if (sentimentWords.includes(wI) && sentimentWords.includes(wJ)) score += 0.75;
          if (Math.abs(i - j) === 1) score += 0.2;
        }

        mat[i][j] = score;
        rowSum += score;
      }

      // Softmax-like normalization across row (Sum(A[i, :]) = 1.0)
      for (let j = 0; j < n; j++) {
        mat[i][j] = Number((mat[i][j] / rowSum).toFixed(3));
      }
    }
    return mat;
  }, [tokens, activeHead]);

  // LSTM Context Decay Simulation
  const lstmDecayAtStep = (tokenIndex, currentStep) => {
    if (tokenIndex > currentStep) return 0; // Not yet read
    const distance = currentStep - tokenIndex;
    const retention = Math.pow(0.72, distance); // 28% decay per step
    return Math.max(0.05, retention);
  };

  const handlePresetChange = (preset) => {
    setSelectedPreset(preset);
    setCustomText(preset.text);
    setSelectedTokenIdx(null);
    setPinnedCell(null);
    setHoveredCell(null);
    setLstmStep(0);
    setIsPlayingLstm(false);
  };

  const handleNextStep = () => {
    setLstmStep((prev) => (prev < tokens.length - 1 ? prev + 1 : 0));
  };

  // Active cell for inspection (pinned has priority over hovered)
  const activeCell = pinnedCell || hoveredCell;

  // Syntactic explanation generator for active cell
  const getCellExplanation = (r, c) => {
    if (r === null || c === null || !tokens[r] || !tokens[c]) return null;
    const tR = tokens[r].toLowerCase();
    const tC = tokens[c].toLowerCase();
    const w = attentionMatrix[r] ? attentionMatrix[r][c] : 0;

    if (r === c) {
      return `โทเคน "${tokens[r]}" เพ่งความสนใจไปที่ตนเอง (Self-Focus: ${(w * 100).toFixed(0)}%) เพื่อคงคุณลักษณะความหมายของคำไว้ใน Representation เวกเตอร์`;
    }

    const isNeg = (t) => ['not', "n't", 'barely', 'never', 'hardly'].includes(t);
    const isContrast = (t) => ['but', 'although', 'however'].includes(t);
    const isAdj = (t) => ['bad', 'watchable', 'good', 'stunning', 'great', 'boring', 'magnificent', 'masterpiece'].includes(t);

    if ((isNeg(tR) && isAdj(tC)) || (isNeg(tC) && isAdj(tR))) {
      return `🔥 จุดปฏิเสธซ้อน (Negation Binding): โทเคน "${tokens[r]}" เชื่อมโยงโดยตรงกับ "${tokens[c]}" ด้วยน้ำหนักสูงถึง ${(w * 100).toFixed(0)}% ทำให้โมเดลเข้าใจว่าไม่ใช่ความหมายปกติ แต่เป็นการกลับขั้วอารมณ์`;
    }

    if (isContrast(tR) || isContrast(tC)) {
      return `⚡ จุดเชื่อมต่ออนุประโยค (Contrast Shift): คำเชื่อมขัดแย้ง "${tokens[r]}" สื่อสารข้ามประโยคกับ "${tokens[c]}" (${(w * 100).toFixed(0)}%) เพื่อถ่วงน้ำหนักใจความสำคัญของรีวิว`;
    }

    if (Math.abs(r - c) === 1) {
      return `🔗 ความสัมพันธ์ทางไวยากรณ์เฉพาะที่ (Adjacent Syntax): คำข้างเคียง "${tokens[r]}" และ "${tokens[c]}" แลกเปลี่ยนข้อมูลไวยากรณ์ด้วยน้ำหนัก ${(w * 100).toFixed(0)}%`;
    }

    return `ความสัมพันธ์บริบทสองทิศทาง (Bidirectional Attention): เวกเตอร์ Query ของ "${tokens[r]}" ทำ Dot-Product กับ Key ของ "${tokens[c]}" ได้ค่าน้ำหนัก ${(w * 100).toFixed(0)}% โดยมีระยะทาง Path Length = 1 เสมอ`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Banner */}
      <div className="bg-[#16120e]/95 border border-[#2e251b] rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#d99f3d] font-bold uppercase tracking-wider">
              Mechanistic Comparison
            </span>
            <h2 className="text-xl font-bold text-[#fdfbf7] mt-1">
              จำลองกลไกการทำงาน: Recurrent Step-by-Step vs Multi-Head Self-Attention
            </h2>
            <p className="text-xs sm:text-sm text-[#ab9b87] mt-1">
              ทดลองดูการไหลของข้อมูลและความจำภายในโมเดล เพื่อเข้าใจว่าทำไม BERT จึงแก้ปัญหา Long-term Dependency ได้เบ็ดเสร็จ
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {PRESET_SENTENCES.map((p) => (
              <button
                key={p.id}
                onClick={() => handlePresetChange(p)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all border touch-manipulation min-h-[38px] flex items-center ${
                  selectedPreset.id === p.id
                    ? 'bg-[#c58a2e] border-[#f0c674] text-[#0c0a08] font-bold shadow-md shadow-[#8d5c1a]/30'
                    : 'bg-[#0c0a08] border-[#2e251b] text-[#9e917f] hover:text-[#fdfbf7]'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* Input Sentence & Current Note */}
        <div className="mt-4 p-4 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#9e917f] font-mono">ประโยคทดสอบปัจจุบัน:</span>
            <span className="text-amber-400 font-semibold">{tokens.length} โทเคน</span>
          </div>
          <p className="text-sm sm:text-base font-serif text-[#fdfbf7] tracking-wide">
            "{customText}"
          </p>
          <div className="pt-2 border-t border-[#262019] flex items-start gap-2 text-xs text-[#ab9b87]">
            <Info className="w-4 h-4 text-[#d99f3d] shrink-0 mt-0.5" />
            <span>{selectedPreset.note}</span>
          </div>
        </div>
      </div>

      {/* Main Dual Simulation Cards */}
      <div className={`grid gap-8 items-start transition-all duration-300 ${
        isFullWidth ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
      }`}>
        
        {/* ===================== Left: LSTM Recurrent Tape ===================== */}
        <div className={`bg-[#16120e]/95 border border-[#2e251b] rounded-2xl p-6 space-y-5 shadow-lg transition-all duration-300 ${
          isFullWidth ? 'order-last' : ''
        }`}>
          <div className="flex items-center justify-between border-b border-[#2e251b] pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-[#9e917f]">กระบวนทัศน์ดั้งเดิม</span>
              <h3 className="text-lg font-bold text-[#fdfbf7]">LSTM: Sequential Recurrence</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleNextStep}
                className="px-3 py-1.5 bg-[#c58a2e] hover:bg-[#b07b27] text-[#0c0a08] font-bold rounded-lg text-xs cursor-pointer transition-all flex items-center gap-1 shadow-sm touch-manipulation min-h-[38px]"
              >
                <span>ก้าวถัดไป</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLstmStep(0)}
                className="p-2 bg-[#221a12] hover:bg-[#2e2319] text-[#e2d7c5] rounded-lg text-xs cursor-pointer border border-[#2e251b] touch-manipulation min-w-[38px] min-h-[38px] flex items-center justify-center"
                title="Reset step"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Sequential Tape */}
          <div>
            <div className="text-xs text-[#9e917f] mb-2 flex items-center justify-between">
              <span>สายพานลำดับคำ (Sequential Unrolling):</span>
              <span className="text-[11px] font-mono text-amber-400">
                ประมวลผลคำที่: <strong>{tokens[lstmStep] || '-'}</strong> (t = {lstmStep + 1})
              </span>
            </div>

            <div className="flex flex-wrap gap-2 p-3 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl min-h-[70px] items-center">
              {tokens.map((tok, idx) => {
                const isCurrent = idx === lstmStep;
                const isPast = idx < lstmStep;
                const retention = isCurrent ? 1 : isPast ? lstmDecayAtStep(idx, lstmStep) : 0;
                
                return (
                  <button
                    key={idx}
                    onClick={() => setLstmStep(idx)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer relative border touch-manipulation min-h-[36px] flex items-center ${
                      isCurrent
                        ? 'bg-[#d97706] text-[#0c0a08] font-bold border-[#fbbf24] shadow-md shadow-[#d97706]/30 scale-105'
                        : isPast
                        ? 'bg-[#221a12] border-[#382f25] text-[#e2d7c5]'
                        : 'bg-[#0c0a08]/50 border-[#262019] text-[#716556]'
                    }`}
                  >
                    <span>{tok}</span>
                    {isPast && (
                      <span 
                        className="absolute -top-1.5 -right-1.5 text-[9px] px-1 rounded-full font-bold"
                        style={{
                          backgroundColor: `rgba(217, 119, 6, ${retention})`,
                          color: retention > 0.4 ? '#0c0a08' : '#fdfbf7'
                        }}
                      >
                        {(retention * 100).toFixed(0)}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Memory Signal Retention Gauge */}
          <div className="p-4 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#e2d7c5]">ระดับสัญญาณความจำของคำแรก (First Token Retention):</span>
              <span className="font-mono text-amber-400 font-bold">
                {(lstmDecayAtStep(0, lstmStep) * 100).toFixed(1)}%
              </span>
            </div>

            <div className="w-full bg-[#16120e] h-3 rounded-full overflow-hidden border border-[#2e251b]">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300"
                style={{ width: `${lstmDecayAtStep(0, lstmStep) * 100}%` }}
              />
            </div>

            <p className="text-[11px] text-[#ab9b87] leading-relaxed">
              เมื่อโมเดลอ่านมาถึงขั้นตอนที่ {lstmStep + 1} ข้อมูลของคำต้นประโยค (<strong>"{tokens[0]}"</strong>) จะถูกเจือจางลงเรื่อยๆ ตามฟังก์ชัน Forget Gate ($f_t$) หากมีข้อความยาวเกินกว่า 50-100 โทเคน สารสนเทศสำคัญจะลดลงจนแทบไม่มีอิทธิพลต่อผลลัพธ์สุดท้าย
            </p>
          </div>

          {/* LSTM Final Classification Verdict Card */}
          <div className="p-4 bg-[#0c0a08]/90 border border-[#4d3716] rounded-xl space-y-3 shadow-md">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono uppercase text-amber-400 font-bold">
                  ผลลัพธ์ที่ Classification Head (h_T ➔ Dense):
                </span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono flex items-center gap-1 ${
                modelVerdicts.lstm.isCorrect === true
                  ? 'bg-emerald-500/20 text-[#34d399] border border-emerald-500/30'
                  : modelVerdicts.lstm.isCorrect === false
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm shadow-rose-500/20'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {modelVerdicts.lstm.isCorrect === false && <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                {modelVerdicts.lstm.isCorrect === true && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                <span>
                  {modelVerdicts.lstm.prediction} {modelVerdicts.lstm.isCorrect === false ? '(ผิดพลาด)' : modelVerdicts.lstm.isCorrect === true ? '(ถูกต้อง)' : ''}
                </span>
              </span>
            </div>

            {/* Probability Breakdown Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9e917f]">ความมั่นใจการตัดสินใจ (Confidence):</span>
                <span className="font-mono font-bold text-amber-400">
                  {modelVerdicts.lstm.prediction}: {modelVerdicts.lstm.confidence}%
                </span>
              </div>
              <div className="w-full bg-[#16120e] h-2.5 rounded-full overflow-hidden flex border border-[#2e251b]">
                <div 
                  className="h-full bg-rose-500 transition-all duration-300"
                  style={{ width: `${modelVerdicts.lstm.negativeProb}%` }}
                  title={`Negative: ${modelVerdicts.lstm.negativeProb}%`}
                />
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${modelVerdicts.lstm.positiveProb}%` }}
                  title={`Positive: ${modelVerdicts.lstm.positiveProb}%`}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-[#9e917f]">
                <span className={modelVerdicts.lstm.prediction === 'Negative' ? 'text-rose-400 font-bold' : ''}>
                  Negative: {modelVerdicts.lstm.negativeProb}%
                </span>
                <span className={modelVerdicts.lstm.prediction === 'Positive' ? 'text-emerald-400 font-bold' : ''}>
                  Positive: {modelVerdicts.lstm.positiveProb}%
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#ab9b87] bg-[#1a140e]/60 p-2.5 rounded-lg border border-[#2e251b] leading-relaxed">
              <strong className="text-amber-300">วิเคราะห์สาเหตุ:</strong> {modelVerdicts.lstm.reason}
            </p>
          </div>

          {/* LSTM Mathematical Architecture */}
          <div className="space-y-4 pt-2">
            <LSTMMainFormulas />
            <LSTMGateBreakdown />
          </div>
        </div>

        {/* ===================== Right: BERT Self-Attention ===================== */}
        <div className={`bg-[#16120e]/95 border border-[#c58a2e]/40 rounded-2xl p-6 space-y-5 shadow-lg transition-all duration-300 ${
          isFullWidth ? 'order-first' : ''
        }`}>
          
          {/* Header with Title, View Mode Switcher and Full Width Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2e251b] pb-3 gap-3">
            <div>
              <span className="text-xs font-mono uppercase text-[#d99f3d] font-bold">กระบวนทัศน์ใหม่</span>
              <h3 className="text-lg font-bold text-[#fdfbf7]">BERT: Multi-Head Self-Attention Matrix</h3>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {/* View Mode Toggle: 2D Matrix vs 1D Token Spotlight */}
              <div className="flex items-center gap-1 bg-[#0c0a08] p-1 border border-[#2e251b] rounded-xl">
                <button
                  onClick={() => setViewMode('matrix')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                    viewMode === 'matrix'
                      ? 'bg-[#c58a2e] text-[#0c0a08] font-bold shadow-sm'
                      : 'text-[#9e917f] hover:text-[#fdfbf7]'
                  }`}
                  title="แสดงตารางเมทริกซ์ 2D เต็มผืน"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>ตาราง 2D</span>
                </button>
                <button
                  onClick={() => setViewMode('spotlight')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                    viewMode === 'spotlight'
                      ? 'bg-[#c58a2e] text-[#0c0a08] font-bold shadow-sm'
                      : 'text-[#9e917f] hover:text-[#fdfbf7]'
                  }`}
                  title="ส่องความสัมพันธ์ทีละคำแบบเฉพาะเจาะจง"
                >
                  <ListFilter className="w-3.5 h-3.5" />
                  <span>ส่องทีละคำ</span>
                </button>
              </div>

              {/* Full Width Toggle Button */}
              <button
                onClick={() => setIsFullWidth(!isFullWidth)}
                className={`px-2.5 py-1.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-1 ${
                  isFullWidth
                    ? 'bg-[#c58a2e] text-[#0c0a08] border-[#f0c674] font-bold shadow-sm'
                    : 'bg-[#0c0a08] text-[#9e917f] border-[#2e251b] hover:text-[#fdfbf7] hover:border-[#c58a2e]'
                }`}
                title={isFullWidth ? "ย่อมุมมองกลับเป็น 2 คอลัมน์" : "ขยายตารางเต็มความกว้างหน้าจอ"}
              >
                {isFullWidth ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] hidden sm:inline">ย่อ 2 คอลัมน์</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] hidden sm:inline">ขยายเต็มหน้า</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Multi-Head Selector Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#9e917f]">เลือก Attention Head เพื่อสังเกตมุมมองที่ต่างกัน:</span>
              <span className="text-[11px] font-mono text-[#f0c674] font-semibold">
                {HEAD_METADATA[activeHead]?.shortName}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map((head) => (
                <button
                  key={head}
                  onClick={() => {
                    setActiveHead(head);
                    setPinnedCell(null);
                  }}
                  className={`px-2 py-2 rounded-xl text-xs font-mono cursor-pointer transition-all border flex flex-col items-center justify-center text-center ${
                    activeHead === head
                      ? 'bg-[#c58a2e] text-[#0c0a08] font-bold border-[#f0c674] shadow-md shadow-[#8d5c1a]/30'
                      : 'bg-[#221a12] text-[#9e917f] hover:text-[#fdfbf7] border-[#2e251b]'
                  }`}
                >
                  <span className="font-bold text-[11px]">Head {head}</span>
                  <span className="text-[9px] truncate max-w-full opacity-85">
                    {HEAD_METADATA[head]?.shortName.replace(`Head ${head}: `, '')}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Head Role Callout */}
            <div className="p-2.5 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl text-xs flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#f0c674] shrink-0 mt-0.5" />
              <div className="text-[11px] text-[#ab9b87]">
                <strong className="text-[#fdfbf7]">{HEAD_METADATA[activeHead]?.role}:</strong> {HEAD_METADATA[activeHead]?.desc}
              </div>
            </div>
          </div>

          {/* VIEW MODE 1: 2D MATRIX GRID HEATMAP */}
          {viewMode === 'matrix' && (
            <div className="space-y-3">
              {/* Axes and Legend Guide */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#9e917f] gap-2 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 rounded bg-[#c58a2e]"></span>
                  <span>แนวตั้ง (Row: Query) ➔ แนวนอน (Col: Key)</span>
                </div>
                
                {/* Visual Heatmap Gradient Legend */}
                <div className="flex items-center gap-1 font-mono text-[9px]">
                  <span>น้อย (0%)</span>
                  <div className="flex h-2.5 w-24 rounded overflow-hidden border border-[#2e251b]">
                    <span className="flex-1 bg-[#16120e]"></span>
                    <span className="flex-1 bg-[#4d3319]"></span>
                    <span className="flex-1 bg-[#8d5c1a]"></span>
                    <span className="flex-1 bg-[#c58a2e]"></span>
                    <span className="flex-1 bg-[#fbbf24]"></span>
                  </div>
                  <span className="text-amber-300 font-bold">สูง (100%)</span>
                </div>
              </div>

              {/* 2D Matrix Table Container: 100% full width, table-fixed, NO horizontal scroll */}
              <div className="w-full overflow-hidden border border-[#2e251b] rounded-xl bg-[#0c0a08]/90 shadow-inner">
                <table className="w-full table-fixed border-collapse font-mono select-none">
                  <thead>
                    <tr>
                      <th className="p-1 sm:p-1.5 border border-[#2e251b] bg-[#1a140f] text-[#9e917f] text-[8px] sm:text-[9px] uppercase tracking-wider w-[15%] sm:w-[13%]">
                        Q \ K
                      </th>
                      {tokens.map((tok, j) => {
                        const isColHighlighted = activeCell && activeCell.c === j;
                        return (
                          <th
                            key={j}
                            className={`p-0.5 sm:p-1 border border-[#2e251b] text-center transition-colors overflow-hidden ${
                              isColHighlighted
                                ? 'bg-[#3d2714] text-[#f0c674] font-bold border-b-2 border-b-[#c58a2e]'
                                : 'bg-[#16120e] text-[#ab9b87]'
                            }`}
                            title={`Key Token ${j + 1}: "${tok}"`}
                          >
                            <span className="block text-[7px] sm:text-[8px] text-[#716556]">k{j + 1}</span>
                            <span className="truncate block font-serif text-[8px] sm:text-[10px]" title={tok}>{tok}</span>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((rowTok, i) => {
                      const isRowHighlighted = activeCell && activeCell.r === i;
                      return (
                        <tr key={i} className="hover:bg-[#1f1710]/40 transition-colors">
                          {/* Row Header (Query Token) */}
                          <th
                            className={`p-0.5 sm:p-1 border border-[#2e251b] text-left transition-colors overflow-hidden ${
                              isRowHighlighted
                                ? 'bg-[#3d2714] text-[#f0c674] font-bold border-r-2 border-r-[#c58a2e]'
                                : 'bg-[#16120e] text-[#ab9b87]'
                            }`}
                            title={`Query Token ${i + 1}: "${rowTok}"`}
                          >
                            <div className="flex items-center gap-0.5 overflow-hidden">
                              <span className="text-[7px] sm:text-[8px] text-[#716556] shrink-0">q{i + 1}</span>
                              <span className="truncate font-serif text-[8px] sm:text-[10px]" title={rowTok}>{rowTok}</span>
                            </div>
                          </th>

                          {/* Matrix Cells */}
                          {tokens.map((colTok, j) => {
                            const w = attentionMatrix[i] ? attentionMatrix[i][j] : 0;
                            const isCellActive = activeCell && activeCell.r === i && activeCell.c === j;
                            const isPinned = pinnedCell && pinnedCell.r === i && pinnedCell.c === j;
                            const isCrosshair = activeCell && (activeCell.r === i || activeCell.c === j) && !isCellActive;

                            const goldAlpha = Math.min(1, Math.max(0.06, w * 2.5));
                            const isHigh = w >= 0.28;

                            return (
                              <td
                                key={j}
                                onClick={() => setPinnedCell(isPinned ? null : { r: i, c: j })}
                                onMouseEnter={() => setHoveredCell({ r: i, c: j })}
                                onMouseLeave={() => setHoveredCell(null)}
                                className={`p-0 sm:p-0.5 border border-[#221a12] text-center transition-all cursor-pointer relative h-[25px] sm:h-[29px] overflow-hidden text-[8px] sm:text-[9px] ${
                                  isPinned
                                    ? 'ring-2 ring-[#fbbf24] z-10 font-bold shadow-md shadow-amber-500/40'
                                    : isCellActive
                                    ? 'ring-2 ring-[#f0c674] z-10 font-bold'
                                    : isCrosshair
                                    ? 'brightness-125'
                                    : ''
                                }`}
                                style={{
                                  backgroundColor: isCellActive || isPinned
                                    ? '#eab308'
                                    : `rgba(197, 138, 46, ${goldAlpha})`,
                                  color: isCellActive || isPinned || isHigh ? '#0c0a08' : '#fdfbf7',
                                  fontWeight: isHigh || isCellActive || isPinned ? 'bold' : 'normal',
                                }}
                                title={`Query: "${rowTok}" ➔ Key: "${colTok}" (${(w * 100).toFixed(1)}% / ${w.toFixed(2)})`}
                              >
                                <span className="leading-none">{(w * 100).toFixed(0)}%</span>
                                {isPinned && (
                                  <Pin className="w-2 h-2 absolute top-0.5 right-0.5 text-rose-500 fill-rose-500" />
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Interactive Cell Inspector Card */}
              {activeCell ? (
                <div className="p-4 bg-[#0c0a08]/95 border border-[#c58a2e]/60 rounded-xl space-y-2.5 shadow-lg animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-[#262019] pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#f0c674] flex items-center gap-1">
                        <Pin className="w-3.5 h-3.5 text-[#d99f3d]" />
                        <span>โฟกัสคู่คำที่เลือก:</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#3a2815] text-[#fdfbf7] font-mono text-xs font-bold">
                        Query "{tokens[activeCell.r]}" ➔ Key "{tokens[activeCell.c]}"
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-300">
                        Attention: {((attentionMatrix[activeCell.r]?.[activeCell.c] || 0) * 100).toFixed(1)}% ({((attentionMatrix[activeCell.r]?.[activeCell.c] || 0)).toFixed(2)})
                      </span>
                      {pinnedCell && (
                        <button
                          onClick={() => setPinnedCell(null)}
                          className="text-[10px] text-rose-400 hover:text-rose-300 underline cursor-pointer"
                        >
                          ปลดหมุด
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#e2d7c5] leading-relaxed">
                    {getCellExplanation(activeCell.r, activeCell.c)}
                  </p>

                  <div className="text-[10px] font-mono text-[#9e917f] flex items-center justify-between pt-1">
                    <span>สูตรคำนวณตำแหน่ง: Softmax( (q_{activeCell.r + 1} · k_{activeCell.c + 1}^T) / √d_k )</span>
                    <span className="text-amber-500/80">คลิกที่ช่องใดก็ได้เพื่อตรึงหมุดไว้</span>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-[#0c0a08]/70 border border-[#2e251b] rounded-xl text-xs text-[#9e917f] flex items-center justify-between">
                  <span>💡 เลื่อนเมาส์ชี้ช่องตารางเพื่อส่องดูค่าน้ำหนักคู่คำ หรือคลิกเพื่อปักหมุดการวิเคราะห์</span>
                  <span className="text-[10px] font-mono text-[#716556]">Scale: O(1) Path Length</span>
                </div>
              )}
            </div>
          )}

          {/* VIEW MODE 2: TOKEN SPOTLIGHT (ORIGINAL 1D VIEW) */}
          {viewMode === 'spotlight' && (
            <div className="space-y-4">
              <div>
                <div className="text-xs text-[#9e917f] mb-2 flex items-center justify-between">
                  <span>คลิกโทเคนเพื่อส่องดู Attention Weights:</span>
                  <span className="text-[11px] font-mono text-[#f0c674]">
                    {selectedTokenIdx !== null ? `Query Token: "${tokens[selectedTokenIdx]}"` : 'คลิกคำใดก็ได้ด้านล่าง'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 p-3 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl min-h-[70px] items-center">
                  {tokens.map((tok, idx) => {
                    const isSelected = selectedTokenIdx === idx;
                    const attentionWeight = selectedTokenIdx !== null && attentionMatrix[selectedTokenIdx] 
                      ? attentionMatrix[selectedTokenIdx][idx] 
                      : null;

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedTokenIdx(isSelected ? null : idx)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border touch-manipulation min-h-[36px] flex flex-col justify-center items-center ${
                          isSelected
                            ? 'bg-[#d99f3d] text-[#0c0a08] font-bold border-[#f0c674] shadow-md shadow-[#8d5c1a]/30 scale-105'
                            : attentionWeight !== null && attentionWeight > 0.15
                            ? 'bg-[#3a2815] border-[#c58a2e]/60 text-[#f0c674]'
                            : 'bg-[#221a12] border-[#2e251b] text-[#e2d7c5] hover:border-[#382f25]'
                        }`}
                      >
                        <span>{tok}</span>
                        {attentionWeight !== null && (
                          <span className="text-[9px] block text-[#f0c674] font-bold">
                            {(attentionWeight * 100).toFixed(0)}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Attention Explanation Spotlight */}
              <div className="p-4 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl space-y-2">
                <span className="text-xs font-semibold text-[#e2d7c5] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#d99f3d]" />
                  <span>การเชื่อมโยงบริบทแบบสองทิศทาง (Bidirectional Binding):</span>
                </span>

                {selectedTokenIdx !== null ? (
                  <div className="space-y-2 text-xs text-[#e2d7c5]">
                    <p>
                      คำว่า <strong className="text-[#f0c674]">"{tokens[selectedTokenIdx]}"</strong> ให้ความสนใจสูงสุดกับ:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                      {tokens.map((targetTok, targetIdx) => {
                        const w = attentionMatrix[selectedTokenIdx][targetIdx];
                        return (
                          <div 
                            key={targetIdx} 
                            className={`p-2 rounded border flex items-center justify-between ${
                              w > 0.15 ? 'bg-[#c58a2e]/15 border-[#c58a2e]/40 text-[#f0c674] font-bold' : 'bg-[#16120e] border-[#2e251b] text-[#9e917f]'
                            }`}
                          >
                            <span>{targetTok}</span>
                            <span>{(w * 100).toFixed(0)}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#ab9b87] leading-relaxed">
                    {customText === selectedPreset?.text && selectedPreset?.bindingExplanation
                      ? selectedPreset.bindingExplanation
                      : "ใน Transformer ทุกคู่คำในประโยคเชื่อมต่อถึงกันโดยตรงด้วยระยะทาง Path Length = 1 ทำให้โมเดลรับรู้บริบทสองทิศทางพร้อมกันได้โดยไม่มี Context Decay คลิกที่คำใดก็ได้ด้านบนเพื่อส่องดู Attention Weights รายตัว"}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* BERT Final Classification Verdict Card */}
          <div className="p-4 bg-[#0c0a08]/90 border border-[#c58a2e]/50 rounded-xl space-y-3 shadow-md shadow-[#8d5c1a]/15">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#f0c674]" />
                <span className="text-xs font-mono uppercase text-[#d99f3d] font-bold">
                  ผลลัพธ์ที่ Classification Head ([CLS] ➔ Dense):
                </span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono flex items-center gap-1 ${
                modelVerdicts.bert.isCorrect === true
                  ? 'bg-emerald-500/20 text-[#34d399] border border-emerald-500/30 shadow-sm shadow-emerald-500/20'
                  : modelVerdicts.bert.isCorrect === false
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-[#c58a2e]/20 text-[#f0c674] border border-[#c58a2e]/40'
              }`}>
                {modelVerdicts.bert.isCorrect === true && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                {modelVerdicts.bert.isCorrect === false && <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                <span>
                  {modelVerdicts.bert.prediction} {modelVerdicts.bert.isCorrect === true ? '(ถูกต้อง)' : modelVerdicts.bert.isCorrect === false ? '(ผิดพลาด)' : ''}
                </span>
              </span>
            </div>

            {/* Probability Breakdown Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9e917f]">ความมั่นใจการตัดสินใจ (Confidence):</span>
                <span className="font-mono font-bold text-[#f0c674] text-sm">
                  {modelVerdicts.bert.prediction}: {modelVerdicts.bert.confidence}%
                </span>
              </div>
              <div className="w-full bg-[#16120e] h-2.5 rounded-full overflow-hidden flex border border-[#2e251b]">
                <div 
                  className="h-full bg-rose-500 transition-all duration-300 shadow-sm shadow-rose-500/50"
                  style={{ width: `${modelVerdicts.bert.negativeProb}%` }}
                  title={`Negative: ${modelVerdicts.bert.negativeProb}%`}
                />
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300 shadow-sm shadow-emerald-500/50"
                  style={{ width: `${modelVerdicts.bert.positiveProb}%` }}
                  title={`Positive: ${modelVerdicts.bert.positiveProb}%`}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-[#9e917f]">
                <span className={modelVerdicts.bert.prediction === 'Negative' ? 'text-rose-400 font-bold' : ''}>
                  Negative: {modelVerdicts.bert.negativeProb}%
                </span>
                <span className={modelVerdicts.bert.prediction === 'Positive' ? 'text-emerald-400 font-bold' : ''}>
                  Positive: {modelVerdicts.bert.positiveProb}%
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#e2d7c5] bg-[#22180d]/80 p-2.5 rounded-lg border border-[#c58a2e]/30 leading-relaxed">
              <strong className="text-[#f0c674]">วิเคราะห์สาเหตุ:</strong> {modelVerdicts.bert.reason}
            </p>
          </div>

          {/* Scaled Dot-Product Formula */}
          <div className="pt-2">
            <AttentionFormula />
          </div>
        </div>
      </div>

      {/* Structural Summary Callout */}
      <div className="p-5 bg-gradient-to-r from-[#20170e] via-[#2a1d0f] to-[#16120e] border border-[#4d3716] rounded-2xl shadow-lg">
        <h4 className="text-sm font-bold text-[#fdfbf7] mb-2 flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#d99f3d]" />
          <span>บทสรุปเชิงสถาปัตยกรรม (Architecture Takeaway)</span>
        </h4>
        <p className="text-xs sm:text-sm text-[#e2d7c5] leading-relaxed">
          ความแตกต่างของ Accuracy กว่า <strong>30.40% (85.60% vs 55.20%)</strong> ในการทดลองนี้ ไม่ได้เกิดจากความบังเอิญ แต่เกิดจากความเหนือกว่าเชิงโครงสร้างของ <strong>Self-Attention</strong> ที่ไม่ถูกจำกัดด้วยคอขวดลำดับเวลา (Time-step bottleneck) และการสูญเสียข้อมูลระยะไกล (Context Decay) เหมือนในสถาปัตยกรรมเดิมอย่าง LSTM
        </p>
      </div>
    </div>
  );
}
