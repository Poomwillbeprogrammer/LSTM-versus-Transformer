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
  Cpu
} from 'lucide-react';

const PRESET_SENTENCES = [
  {
    id: 1,
    title: "เคสหักมุมและปฏิเสธซ้อน (จากรายงาน)",
    text: "The movie was not bad, but the ending was barely watchable.",
    note: "LSTM พลาดเพราะ 'not' กับ 'barely' อยู่คนละตำแหน่งและถูกกลบด้วยคำเชื่อม ส่วน BERT จับคู่ (not, bad) และ (barely, watchable) ได้ทันที",
  },
  {
    id: 2,
    title: "ประโยคยาวกลับทิศทาง (Long-term contrast)",
    text: "Although the visuals were stunning and cast was great, the plot was boring.",
    note: "LSTM ลืมคำชมตอนต้นเมื่อเจอ 'boring' ตอนท้าย ส่วน BERT เชื่อม 'plot' กับ 'boring' โดยตรง",
  },
  {
    id: 3,
    title: "ประโยคเชิงบวกตรงไปตรงมา",
    text: "An absolutely magnificent masterpiece that deserves every single award.",
    note: "ทั้งสองโมเดลทำนายได้ถูกต้องเพราะไม่มีคำหักมุมหรือคำปฏิเสธ",
  },
];

export default function AttentionSimulatorTab() {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_SENTENCES[0]);
  const [customText, setCustomText] = useState(PRESET_SENTENCES[0].text);
  const [selectedTokenIdx, setSelectedTokenIdx] = useState(null);
  const [lstmStep, setLstmStep] = useState(0);
  const [isPlayingLstm, setIsPlayingLstm] = useState(false);
  const [activeHead, setActiveHead] = useState(1); // 1 to 4 heads visualization

  const tokens = useMemo(() => {
    return customText
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .split(/\s+/)
      .filter(Boolean);
  }, [customText]);

  // Compute simulated Attention Matrix for BERT
  const attentionMatrix = useMemo(() => {
    const n = tokens.length;
    if (n === 0) return [];
    const mat = Array(n).fill(0).map(() => Array(n).fill(0));

    // Heuristic synthetic attention that highlights syntactic & sentiment binding
    for (let i = 0; i < n; i++) {
      let rowSum = 0;
      const wI = tokens[i].toLowerCase();

      for (let j = 0; j < n; j++) {
        const wJ = tokens[j].toLowerCase();
        let score = 0.1; // baseline uniform

        if (i === j) score += 0.35; // self-focus

        // Negation binding: 'not' <-> adjacent adjectives
        if ((wI === 'not' || wI === "n't" || wI === 'barely') && (wJ === 'bad' || wJ === 'watchable' || wJ === 'good')) {
          score += 0.85;
        }
        if ((wJ === 'not' || wJ === "n't" || wJ === 'barely') && (wI === 'bad' || wI === 'watchable' || wI === 'good')) {
          score += 0.85;
        }

        // Contrastive binding: 'but', 'although'
        if (wI === 'but' || wI === 'although') {
          score += 0.4;
        }

        // Adjective - Noun binding
        if (Math.abs(i - j) === 1) {
          score += 0.25;
        }

        mat[i][j] = score;
        rowSum += score;
      }

      // Normalize with Softmax-like scaling
      for (let j = 0; j < n; j++) {
        mat[i][j] = Number((mat[i][j] / rowSum).toFixed(3));
      }
    }
    return mat;
  }, [tokens]);

  // LSTM Context Decay Simulation:
  // As time progresses, earlier token representations decay exponentially in memory state
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
    setLstmStep(0);
    setIsPlayingLstm(false);
  };

  const handleNextStep = () => {
    setLstmStep((prev) => (prev < tokens.length - 1 ? prev + 1 : 0));
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
                className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border ${
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
            <span className="text-[#9e917f] font-medium">ประโยคที่ใช้จำลอง (Interactive Input):</span>
            <span className="text-[#d99f3d] font-mono text-[11px]">{tokens.length} โทเคน</span>
          </div>
          <input
            type="text"
            value={customText}
            onChange={(e) => {
              setCustomText(e.target.value);
              setLstmStep(0);
              setSelectedTokenIdx(null);
            }}
            className="w-full bg-[#16120e] border border-[#382f25] rounded-lg px-3 py-2 text-sm text-[#fdfbf7] font-mono focus:outline-none focus:border-[#c58a2e] transition-colors"
          />
          <div className="text-xs text-[#f0c674] flex items-start gap-1.5 pt-1">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#d99f3d]" />
            <span>{selectedPreset.note}</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Mechanism Comparators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* ===================== Left: LSTM Recurrent Flow ===================== */}
        <div className="bg-[#16120e]/95 border border-[#4d3716] rounded-2xl p-6 space-y-5 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#2e251b] pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 font-bold">กระบวนทัศน์เดิม</span>
              <h3 className="text-lg font-bold text-[#fdfbf7]">LSTM: การอ่านทีละขั้น & Context Decay</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleNextStep}
                className="px-2.5 py-1 bg-[#d97706]/20 hover:bg-[#d97706]/30 text-amber-300 border border-[#d97706]/40 rounded-lg text-xs font-mono cursor-pointer transition-all flex items-center gap-1"
              >
                <span>Step: {lstmStep + 1}/{tokens.length}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLstmStep(0)}
                className="p-1.5 bg-[#221a12] hover:bg-[#2e2319] text-[#e2d7c5] rounded-lg text-xs cursor-pointer border border-[#2e251b]"
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
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer relative border ${
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

          {/* Gate Formula Card */}
          <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-mono text-[#e2d7c5] space-y-1">
            <span className="text-amber-400 font-bold block">สมการควบคุมเกต (Hochreiter & Schmidhuber, 1997):</span>
            <div className="text-[11px] text-[#e2d7c5] pt-1">
              C_t = f_t ⊙ C_(t-1) + i_t ⊙ C̃_t <br />
              h_t = o_t ⊙ tanh(C_t)
            </div>
            <span className="text-[10px] text-[#9e917f] block pt-1">
              *ข้อจำกัด: ต้องรอคำนวณ t-1 เสร็จก่อน จึงไม่สามารถคำนวณคู่ขนานบน GPU ได้อย่างเต็มศักยภาพ
            </span>
          </div>
        </div>

        {/* ===================== Right: BERT Self-Attention ===================== */}
        <div className="bg-[#16120e]/95 border border-[#c58a2e]/40 rounded-2xl p-6 space-y-5 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#2e251b] pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-[#d99f3d] font-bold">กระบวนทัศน์ใหม่</span>
              <h3 className="text-lg font-bold text-[#fdfbf7]">BERT: Multi-Head Self-Attention Matrix</h3>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((head) => (
                <button
                  key={head}
                  onClick={() => setActiveHead(head)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-all ${
                    activeHead === head
                      ? 'bg-[#c58a2e] text-[#0c0a08] font-bold shadow-sm'
                      : 'bg-[#221a12] text-[#9e917f] hover:text-[#fdfbf7] border border-[#2e251b]'
                  }`}
                >
                  Head {head}
                </button>
              ))}
            </div>
          </div>

          {/* Token Selector for Attention Spotlight */}
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
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
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
                ใน Transformer ทุกคู่คำในประโยคเชื่อมต่อถึงกันโดยตรงด้วยระยะทาง Path Length = 1 เช่น คำปฏิเสธ <em>"not"</em> สามารถผูกติดกับ <em>"bad"</em> ได้ทันทีแม้จะอยู่ห่างกัน และ <em>"barely"</em> เชื่อมโยงกับ <em>"watchable"</em> โดยไม่สนลำดับก่อนหลัง
              </p>
            )}
          </div>

          {/* Scaled Dot-Product Formula */}
          <div className="p-3.5 bg-[#c58a2e]/10 border border-[#c58a2e]/30 rounded-xl text-xs font-mono text-[#e2d7c5] space-y-1">
            <span className="text-[#d99f3d] font-bold block">สมการ Self-Attention (Vaswani et al., 2017):</span>
            <div className="text-[11px] text-[#e2d7c5] pt-1">
              Attention(Q, K, V) = softmax( (Q × K^T) / √d_k ) × V
            </div>
            <span className="text-[10px] text-[#9e917f] block pt-1">
              *จุดเด่น: คำนวณเป็น Matrix Multiplication ขนาดใหญ่รวดเดียวบน GPU Tensor Cores ได้พร้อมกันทุกคำ
            </span>
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
