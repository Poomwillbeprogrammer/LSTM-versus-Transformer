import React from 'react';

/**
 * Reusable Academic Math Components with RMUTL Lanna Gold styling
 * Renders real stacked fractions, subscripts, superscripts, and radical square roots
 * 100% offline, zero external font dependencies
 */

export function MathFraction({ num, den, className = '' }) {
  return (
    <span className={`inline-flex flex-col items-center justify-center align-middle mx-1 text-center font-serif ${className}`}>
      <span className="px-1.5 pb-0.5 border-b-2 border-[#c58a2e] w-full text-center leading-snug">
        {num}
      </span>
      <span className="px-1.5 pt-0.5 w-full text-center leading-snug">
        {den}
      </span>
    </span>
  );
}

export function MathSqrt({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center align-middle ${className}`}>
      <span className="text-base sm:text-lg font-serif leading-none pr-0.5 select-none text-[#d99f3d]">√</span>
      <span className="border-t-2 border-[#d99f3d] pt-0.5 px-0.5 inline-block leading-tight">
        {children}
      </span>
    </span>
  );
}

export function MathVar({ name, sub, sup, className = '' }) {
  return (
    <span className={`inline-flex items-baseline font-serif italic ${className}`}>
      <span>{name}</span>
      {sub && <sub className="text-[10px] not-italic ml-0.5 select-none">{sub}</sub>}
      {sup && <sup className="text-[10px] not-italic ml-0.5 select-none">{sup}</sup>}
    </span>
  );
}

/**
 * Scaled Dot-Product Attention: Attention(Q, K, V) = softmax( (Q K^T) / sqrt(d_k) ) V
 */
export function AttentionFormula({ className = '' }) {
  return (
    <div className={`p-4 bg-[#140f0a] border border-[#c58a2e]/40 rounded-xl shadow-inner ${className}`}>
      <div className="flex items-center justify-between border-b border-[#2e251b] pb-2 mb-3">
        <span className="text-xs font-mono font-bold text-[#f0c674] uppercase tracking-wide flex items-center gap-1.5">
          <span>สมการ Scaled Dot-Product Self-Attention</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#c58a2e]/20 text-[#f0c674] font-normal">
            Vaswani et al. (2017)
          </span>
        </span>
      </div>

      <div className="flex items-center justify-center flex-wrap gap-1.5 py-2 text-sm sm:text-base text-[#fdfbf7] font-serif overflow-x-auto no-scrollbar">
        {/* Function Name */}
        <span className="font-sans font-semibold text-[#f0c674]">Attention</span>
        <span>(</span>
        <span className="italic text-[#fdfbf7]">Q</span>
        <span>,</span>
        <span className="italic text-[#fdfbf7] mx-0.5">K</span>
        <span>,</span>
        <span className="italic text-[#fdfbf7] mx-0.5">V</span>
        <span>)</span>

        <span className="mx-1.5 text-[#c58a2e] font-sans font-bold">=</span>

        <span className="font-sans font-semibold text-[#e5c158]">softmax</span>
        <span className="text-xl sm:text-2xl font-light text-[#ab9b87] leading-none">(</span>

        {/* Stacked Fraction: Q K^T / sqrt(d_k) */}
        <MathFraction
          num={
            <span className="inline-flex items-center gap-0.5">
              <span className="italic font-bold text-[#fdfbf7]">Q</span>
              <span className="italic font-bold text-[#fdfbf7] ml-0.5">K</span>
              <sup className="text-[11px] font-sans font-bold text-[#f0c674]">T</sup>
            </span>
          }
          den={
            <MathSqrt>
              <span className="italic text-[#fdfbf7]">d</span>
              <sub className="text-[10px] font-sans not-italic text-[#f0c674]">k</sub>
            </MathSqrt>
          }
        />

        <span className="text-xl sm:text-2xl font-light text-[#ab9b87] leading-none">)</span>
        <span className="italic font-bold text-[#fdfbf7] ml-1">V</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#2e251b] text-[11px] text-[#ab9b87] font-sans">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c58a2e]" />
          <span><strong className="text-[#fdfbf7]">Q, K, V:</strong> Query, Key, Value Matrices (ขนาด d_k = 64 ต่อ Head)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c58a2e]" />
          <span><strong className="text-[#fdfbf7]">√d_k:</strong> ตัวหาร Scaling factor ป้องกัน Gradient เล็กเกินไปจาก Softmax</span>
        </div>
      </div>
    </div>
  );
}

/**
 * LSTM Recurrent Equations: Ct and ht with Hadamard element-wise product
 */
export function LSTMMainFormulas({ className = '' }) {
  return (
    <div className={`p-4 bg-[#140f0a] border border-sky-500/30 rounded-xl shadow-inner ${className}`}>
      <div className="flex items-center justify-between border-b border-[#2e251b] pb-2 mb-3">
        <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wide flex items-center gap-1.5">
          <span>สมการปรับปรุงสถานะหน่วยความจำ (Cell & Hidden State)</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-300 font-normal">
            Hochreiter & Schmidhuber (1997)
          </span>
        </span>
      </div>

      <div className="space-y-3 py-1 font-serif text-sm sm:text-base text-[#fdfbf7]">
        {/* Cell State update: Ct = ft ⊙ C_(t-1) + it ⊙ C~t */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 bg-[#0c0a08]/60 p-2.5 rounded-lg border border-[#2e251b]">
          <span className="italic font-bold text-sky-400">C</span>
          <sub className="text-[11px] font-sans text-sky-400 font-bold">t</sub>
          <span className="mx-1 text-sky-400 font-sans font-bold">=</span>

          {/* ft ⊙ Ct-1 */}
          <span className="italic text-[#fdfbf7]">f</span>
          <sub className="text-[10px] font-sans text-[#ab9b87]">t</sub>
          <span className="mx-1 text-sky-400 text-xs font-sans">⊙</span>
          <span className="italic text-[#fdfbf7]">C</span>
          <sub className="text-[10px] font-sans text-[#ab9b87]">t-1</sub>

          <span className="mx-1.5 text-sky-400 font-sans font-bold">+</span>

          {/* it ⊙ C~t */}
          <span className="italic text-[#fdfbf7]">i</span>
          <sub className="text-[10px] font-sans text-[#ab9b87]">t</sub>
          <span className="mx-1 text-sky-400 text-xs font-sans">⊙</span>
          <span className="inline-flex items-baseline">
            <span className="relative">
              <span className="absolute -top-1.5 left-0 right-0 text-center text-xs font-bold text-sky-400">~</span>
              <span className="italic text-[#fdfbf7]">C</span>
            </span>
            <sub className="text-[10px] font-sans text-[#ab9b87] ml-0.5">t</sub>
          </span>
        </div>

        {/* Hidden State update: ht = ot ⊙ tanh(Ct) */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 bg-[#0c0a08]/60 p-2.5 rounded-lg border border-[#2e251b]">
          <span className="italic font-bold text-sky-400">h</span>
          <sub className="text-[11px] font-sans text-sky-400 font-bold">t</sub>
          <span className="mx-1 text-sky-400 font-sans font-bold">=</span>

          <span className="italic text-[#fdfbf7]">o</span>
          <sub className="text-[10px] font-sans text-[#ab9b87]">t</sub>
          <span className="mx-1 text-sky-400 text-xs font-sans">⊙</span>
          <span className="font-sans font-semibold text-[#e2d7c5]">tanh</span>
          <span>(</span>
          <span className="italic text-sky-400">C</span>
          <sub className="text-[10px] font-sans text-sky-400">t</sub>
          <span>)</span>
        </div>
      </div>

      <div className="text-[11px] text-[#9e917f] font-sans pt-2 border-t border-[#2e251b] flex items-center justify-between">
        <span>*สัญลักษณ์ <strong>⊙</strong> หมายถึง Hadamard Product (การคูณสมาชิกตำแหน่งต่อตำแหน่งแบบ Element-wise)</span>
      </div>
    </div>
  );
}

/**
 * 4 Gating Mechanisms of LSTM: Forget, Input, Candidate, Output
 */
export function LSTMGateBreakdown({ className = '' }) {
  const gates = [
    {
      name: 'Forget Gate (เกตลืม)',
      symbol: 'f',
      func: 'σ',
      w: 'W_f',
      b: 'b_f',
      desc: 'ควบคุมสัดส่วนข้อมูลเดิมใน C_(t-1) ที่จะถูกลบหรือเก็บไว้ (ถ้าได้ 0 คือลืมสนิท)',
    },
    {
      name: 'Input Gate (เกตรับ)',
      symbol: 'i',
      func: 'σ',
      w: 'W_i',
      b: 'b_i',
      desc: 'ตัดสินใจว่าข้อมูลใหม่ตัวใดที่จะได้รับอนุญาตให้อัปเดตเข้าสู่ Cell State',
    },
    {
      name: 'Candidate Memory (ความจำใหม่)',
      symbol: 'C̃',
      func: 'tanh',
      w: 'W_c',
      b: 'b_c',
      desc: 'สร้างเวกเตอร์สารสนเทศใหม่ที่เตรียมไว้ผสมกับความจำเก่า (-1 ถึง +1)',
    },
    {
      name: 'Output Gate (เกตส่งออก)',
      symbol: 'o',
      func: 'σ',
      w: 'W_o',
      b: 'b_o',
      desc: 'คัดกรองว่าสารสนเทศใน Cell State ส่วนใดที่จะถูกส่งออกเป็น Hidden State (h_t)',
    },
  ];

  return (
    <div className={`space-y-2 ${className}`}>
      <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block">
        กลไกเกตควบคุม 4 ทิศทาง (4 Gating Mechanisms):
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {gates.map((g, idx) => (
          <div key={idx} className="p-3 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sky-300 font-sans text-[11px]">{g.name}</span>
              <span className="px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 text-[10px] font-mono">
                {g.func} activation
              </span>
            </div>

            {/* Formula line */}
            <div className="font-serif text-[#fdfbf7] flex items-center gap-1 text-[13px] bg-[#16120e] p-1.5 rounded border border-[#2e251b]">
              <span className="italic font-bold text-sky-400">{g.symbol}</span>
              <sub className="text-[10px] font-sans text-sky-400">t</sub>
              <span className="mx-1 text-sky-400 font-sans">=</span>
              <span className="font-sans font-bold text-sky-300">{g.func}</span>
              <span>(</span>
              <span className="italic">{g.w.split('_')[0]}</span>
              <sub className="text-[9px] font-sans">{g.w.split('_')[1]}</sub>
              <span className="mx-0.5 font-sans">·</span>
              <span>[</span>
              <span className="italic">h</span>
              <sub className="text-[9px] font-sans">t-1</sub>
              <span>, </span>
              <span className="italic">x</span>
              <sub className="text-[9px] font-sans">t</sub>
              <span>]</span>
              <span className="mx-0.5">+</span>
              <span className="italic">{g.b.split('_')[0]}</span>
              <sub className="text-[9px] font-sans">{g.b.split('_')[1]}</sub>
              <span>)</span>
            </div>

            <p className="text-[10px] text-[#9e917f] font-sans leading-relaxed">
              {g.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Metric Breakdown Cards for BenchmarkTab (Accuracy, Precision, Recall, F1)
 * Shows mathematical formulas + empirical substitution from 500 test reviews
 */
export function MetricFormulaCard({ name, definition, symbolFormula, numFormula, result, diff }) {
  return (
    <div className="p-4 bg-[#140f0a] border border-[#2e251b] hover:border-[#c58a2e]/50 rounded-2xl transition-all shadow-md space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#9e917f] block">
            {definition}
          </span>
          <h4 className="text-base font-bold text-[#fdfbf7]">{name}</h4>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold font-mono text-[#f0c674]">{result}</div>
          <div className="text-[10px] font-mono text-[#34d399] font-semibold">{diff}</div>
        </div>
      </div>

      {/* Formulas Container */}
      <div className="p-3 bg-[#0c0a08] border border-[#2e251b] rounded-xl space-y-2">
        {/* Symbolic Formula */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#9e917f] font-mono text-[11px]">สูตรสัญลักษณ์:</span>
          <div className="text-[#fdfbf7]">{symbolFormula}</div>
        </div>

        <div className="h-px bg-[#221a12] w-full" />

        {/* Numerical Substitution */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#c58a2e] font-mono text-[11px]">แทนค่า BERT (n=500):</span>
          <div className="text-[#f0c674] font-mono font-semibold">{numFormula}</div>
        </div>
      </div>
    </div>
  );
}
