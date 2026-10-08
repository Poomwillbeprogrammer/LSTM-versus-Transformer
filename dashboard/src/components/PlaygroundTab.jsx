import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Zap
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

import { 
  analyzeSentiment, 
  POSITIVE_WORDS, 
  NEGATIVE_WORDS, 
  NEGATORS, 
  CONTRAST_WORDS 
} from '../utils/sentimentEngine.js';

export default function PlaygroundTab() {
  const [inputText, setInputText] = useState(DEMO_PRESETS[0].text);

  // Compute simulated predictions for both models in O(n)
  const analysis = useMemo(() => analyzeSentiment(inputText), [inputText]);

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* LSTM Score Card */}
        <div className="bg-[#16120e]/95 border border-sky-500/30 rounded-2xl p-4 sm:p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#2e251b] pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-sky-400 font-bold">Baseline Model</span>
              <h3 className="text-lg font-bold text-[#fdfbf7]">LSTM Classifier</h3>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
              inputText.trim() === ''
                ? 'bg-[#221a12] text-[#9e917f] border border-[#2e251b]'
                : analysis.lstmPred === 1 
                ? 'bg-emerald-500/20 text-[#34d399] border border-emerald-500/30' 
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {inputText.trim() === '' ? 'รอข้อความนำเข้า' : analysis.lstmPred === 1 ? 'Positive (เชิงบวก)' : 'Negative (เชิงลบ)'}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-[#9e917f] mb-1.5">
              <span>ความน่าจะเป็นเชิงบวก (Positive Probability):</span>
              <span className="font-mono text-sky-400 font-bold text-sm">
                {inputText.trim() === '' ? '-' : `${(analysis.lstmProb * 100).toFixed(1)}%`}
              </span>
            </div>
            <div className="w-full bg-[#0c0a08] h-3 rounded-full overflow-hidden border border-[#2e251b]">
              <div 
                className="h-full bg-sky-500 transition-all duration-300"
                style={{ width: inputText.trim() === '' ? '0%' : `${analysis.lstmProb * 100}%` }}
              />
            </div>
          </div>

          <div className="p-3 sm:p-3.5 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl text-xs text-[#e2d7c5] leading-relaxed">
            <span className="text-sky-400 font-bold block mb-1">พฤติกรรมการตัดสินใจของ LSTM:</span>
            ประมวลผลคำตามลำดับเวลาจากซ้ายไปขวา (Sequential Processing) ทำให้คำท้ายประโยคมีอิทธิพลต่อผลลัพธ์มากกว่าคำต้นประโยคจากภาวะข้อมูลเลือนหาย (Context Decay / Recency Bias) หากคำปฏิเสธ (เช่น "not") อยู่ห่างจากคำคุณศัพท์ โมเดลจะไม่สามารถเชื่อมโยงข้ามตำแหน่งได้ดีเท่า BERT
          </div>
        </div>

        {/* BERT Score Card */}
        <div className="bg-[#16120e]/95 border border-[#c58a2e]/40 rounded-2xl p-4 sm:p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#2e251b] pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-[#d99f3d] font-bold">Fine-tuned Model</span>
              <h3 className="text-lg font-bold text-[#fdfbf7]">BERT Classifier</h3>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
              inputText.trim() === ''
                ? 'bg-[#221a12] text-[#9e917f] border border-[#2e251b]'
                : analysis.bertPred === 1 
                ? 'bg-emerald-500/20 text-[#34d399] border border-emerald-500/30' 
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {inputText.trim() === '' ? 'รอข้อความนำเข้า' : analysis.bertPred === 1 ? 'Positive (เชิงบวก)' : 'Negative (เชิงลบ)'}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-[#9e917f] mb-1.5">
              <span>ความน่าจะเป็นเชิงบวก (Positive Probability):</span>
              <span className="font-mono text-[#f0c674] font-bold text-sm">
                {inputText.trim() === '' ? '-' : `${(analysis.bertProb * 100).toFixed(1)}%`}
              </span>
            </div>
            <div className="w-full bg-[#0c0a08] h-3 rounded-full overflow-hidden border border-[#2e251b]">
              <div 
                className="h-full bg-gradient-to-r from-[#b87d24] to-[#f0c674] transition-all duration-300"
                style={{ width: inputText.trim() === '' ? '0%' : `${analysis.bertProb * 100}%` }}
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

        {analysis.tokens.length === 0 ? (
          <div className="p-8 bg-[#0c0a08] border border-[#2e251b] rounded-xl text-center space-y-2">
            <p className="text-xs text-[#9e917f]">ยังไม่มีข้อความสำหรับการวิเคราะห์คำ</p>
            <p className="text-[11px] text-[#716556]">พิมพ์ประโยคในกล่องด้านบน หรือคลิกเลือกตัวอย่างด้านบนเพื่อเริ่มการวิเคราะห์แบบจำลอง</p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
