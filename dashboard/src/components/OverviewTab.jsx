import React from 'react';
import { 
  ArrowRight, 
  Zap, 
  GitCompare, 
  Binary, 
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { MathFraction, MathSqrt } from './MathView';

export default function OverviewTab({ onExploreDataset, onOpenSimulator }) {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Hero Stat Dials (RMUTL Golden Brown Theme - Compact 2x2 Grid on Mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-[#16120e]/95 border border-[#2e251b] rounded-xl sm:rounded-2xl p-3.5 sm:p-5 relative overflow-hidden group hover:border-[#c58a2e]/50 transition-all shadow-lg flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#c58a2e]/10 rounded-full blur-xl group-hover:bg-[#c58a2e]/20 transition-all pointer-events-none" />
          <div>
            <div className="text-[10px] sm:text-xs font-medium text-[#9e917f] uppercase tracking-wider">Accuracy Gain</div>
            <div className="mt-1 sm:mt-2 flex items-baseline gap-1.5 flex-wrap">
              <span className="text-2xl sm:text-4xl font-black text-[#fdfbf7] font-mono">+30.40%</span>
              <span className="text-[10px] sm:text-xs text-[#34d399] font-semibold flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> 85.6% vs 55.2%
              </span>
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-[#ab9b87] mt-2 line-clamp-2 sm:line-clamp-none">
            BERT บรรลุความถูกต้องเหนือกว่า LSTM 30.40% บนชุดทดสอบ 500 ตัวอย่าง
          </p>
        </div>

        <div className="bg-[#16120e]/95 border border-[#2e251b] rounded-xl sm:rounded-2xl p-3.5 sm:p-5 relative overflow-hidden group hover:border-[#c58a2e]/50 transition-all shadow-lg flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
          <div>
            <div className="text-[10px] sm:text-xs font-medium text-[#9e917f] uppercase tracking-wider">F1-Score Gain</div>
            <div className="mt-1 sm:mt-2 flex items-baseline gap-1.5 flex-wrap">
              <span className="text-2xl sm:text-4xl font-black text-[#f0c674] font-mono">+31.05%</span>
              <span className="text-[10px] sm:text-xs text-[#e5c158] font-semibold">85.7% vs 54.7%</span>
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-[#ab9b87] mt-2 line-clamp-2 sm:line-clamp-none">
            ความสมดุลระหว่าง Precision (83.72%) และ Recall (87.80%) เหนือกว่าชัดเจน
          </p>
        </div>

        <div className="bg-[#16120e]/95 border border-[#2e251b] rounded-xl sm:rounded-2xl p-3.5 sm:p-5 relative overflow-hidden group hover:border-[#c58a2e]/50 transition-all shadow-lg flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#c58a2e]/10 rounded-full blur-xl group-hover:bg-[#c58a2e]/20 transition-all pointer-events-none" />
          <div>
            <div className="text-[10px] sm:text-xs font-medium text-[#9e917f] uppercase tracking-wider">Fast Convergence</div>
            <div className="mt-1 sm:mt-2 flex items-baseline gap-1.5 flex-wrap">
              <span className="text-2xl sm:text-4xl font-black text-[#d99f3d] font-mono">3 Epochs</span>
              <span className="text-[10px] sm:text-xs text-[#9e917f]">vs 5 Epochs</span>
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-[#ab9b87] mt-2 line-clamp-2 sm:line-clamp-none">
            Transfer Learning ทำให้ Loss ลดเหลือ 0.1369 ในเวลาเพียง 3 รอบ
          </p>
        </div>

        <div className="bg-[#16120e]/95 border border-[#2e251b] rounded-xl sm:rounded-2xl p-3.5 sm:p-5 relative overflow-hidden group hover:border-[#c58a2e]/50 transition-all shadow-lg flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full blur-xl group-hover:bg-orange-500/20 transition-all pointer-events-none" />
          <div>
            <div className="text-[10px] sm:text-xs font-medium text-[#9e917f] uppercase tracking-wider">Engineering Cost</div>
            <div className="mt-1 sm:mt-2 flex items-baseline gap-1.5 flex-wrap">
              <span className="text-2xl sm:text-4xl font-black text-amber-500 font-mono">51.3×</span>
              <span className="text-[10px] sm:text-xs text-[#9e917f]">Training Time</span>
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-[#ab9b87] mt-2 line-clamp-2 sm:line-clamp-none">
            เวลาฝึกสอน 42.07s vs 0.82s แลกความแม่นยำเพิ่มขึ้น 30.40 จุด คุ้มค่ามาก
          </p>
        </div>
      </div>

      {/* Research Question & Core Premise */}
      <div className="bg-gradient-to-br from-[#2a1c09]/70 via-[#18130e] to-[#1f170e]/80 border border-[#4d3716] rounded-2xl p-4 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2.5 sm:space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c58a2e]/20 border border-[#c58a2e]/30 text-[#f0c674] text-[11px] sm:text-xs font-medium">
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              <span>คำถามการวิจัยหลัก (Central Research Question)</span>
            </div>
            <h2 className="text-base sm:text-2xl font-bold text-[#fdfbf7] tracking-tight leading-snug">
              "เมื่อให้ LSTM (Baseline) และ BERT (Fine-tuned) แก้โจทย์เดียวกัน บนชุดข้อมูล IMDb ภายใต้การควบคุมตัวแปรที่เที่ยงตรง ฝ่ายใดจะมีประสิทธิภาพเหนือกว่า และต้องแลกมาด้วยต้นทุนการคำนวณเท่าไร?"
            </h2>
            <p className="text-xs sm:text-sm text-[#e2d7c5] leading-relaxed">
              งานวิจัยนี้พิสูจน์เชิงประจักษ์ถึง <strong>การเปลี่ยนผ่านของกระบวนทัศน์ (Paradigm Shift)</strong> จากการประมวลผลข้อมูลลำดับตามเวลาทีละขั้นตอน (Step-by-step Recurrence) สู่การคำนวณความสัมพันธ์ระหว่างทุกตำแหน่งพร้อมกันด้วยกลไก Self-Attention แบบขนาน
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onExploreDataset}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#b87d24] to-[#d99f3d] hover:from-[#c58a2e] hover:to-[#e5b65e] text-[#0c0a08] font-bold text-xs sm:text-sm transition-all shadow-lg shadow-[#8d5c1a]/30 cursor-pointer touch-manipulation min-h-[46px] w-full"
            >
              <span>สำรวจชุดข้อมูล 500 ตัวอย่าง</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenSimulator}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#221a12] hover:bg-[#2e2319] text-[#f0c674] font-medium text-xs sm:text-sm border border-[#3d2e1c] transition-all cursor-pointer touch-manipulation min-h-[46px] w-full"
            >
              <span>ทดลอง Attention Simulator</span>
              <Zap className="w-4 h-4 text-[#d99f3d]" />
            </button>
          </div>
        </div>
      </div>

      {/* Paradigm Comparison Side-by-Side */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#fdfbf7] flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-[#c58a2e]" />
            <span>เปรียบเทียบกระบวนทัศน์เดิม vs กระบวนทัศน์ใหม่</span>
          </h2>
          <span className="text-xs text-[#9e917f]">Structural Comparison</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Old Paradigm: LSTM (Harmonized Sky Blue Theme) */}
          <div className="bg-[#16120e]/95 border border-sky-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#2e251b] pb-4 mb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                  กระบวนทัศน์เดิม (Traditional Baseline)
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Sequential Recurrent: LSTM</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono">
                Hochreiter & Schmidhuber (1997)
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#d6c8b4]">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">1</div>
                <div>
                  <strong className="text-white block">อ่านข้อมูลทีละคำตามลำดับเวลา (Step-by-step):</strong>
                  ประมวลผลคำจากซ้ายไปขวา (
                  <span className="font-serif italic text-sky-300">
                    x<sub>1</sub> → x<sub>2</sub> → … → x<sub>t</sub>
                  </span>
                  ) ผ่าน Hidden State (<span className="font-serif italic text-sky-300">h<sub>t</sub></span>) และ Cell State (<span className="font-serif italic text-sky-300">C<sub>t</sub></span>)
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</div>
                <div>
                  <strong className="text-rose-300 block">Context Decay (ความจำระยะยาวเสื่อมถอย):</strong>
                  ข้อมูลสำคัญจากตอนต้นประโยคจะถูกเจือจางลงเมื่อประโยคมีความยาวสูง ทำให้จำแนกประโยคหักมุม (Contrastive) ผิดพลาด
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</div>
                <div>
                  <strong className="text-rose-300 block">Unidirectional & Negation Blindness:</strong>
                  มองเห็นเฉพาะคำในอดีต (ซ้ายไปขวา) ไม่สามารถเข้าใจบริบทสองฝั่งของคำกำกวมหรือคำปฏิเสธ (เช่น "not bad") ได้ลึกซึ้ง
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</div>
                <div>
                  <strong className="text-rose-300 block">Overfitting จากการ Train from Scratch:</strong>
                  บนข้อมูล 2,000 ตัวอย่าง โมเดลต้องสร้างเวกเตอร์แทนคำ 30,522 คำใหม่หมด จึงจำได้แค่คำตายตัว แต่ไม่เข้าใจความหมายทั่วไป (Accuracy 55.20%)
                </div>
              </div>

              <div className="p-3 bg-[#100d0a] border border-[#2e251b] rounded-xl font-mono text-xs text-[#9e917f]">
                <span className="text-sky-400 font-bold">จุดเด่นเชิงวิศวกรรม:</span> น้ำหนักเบา (4.04M พารามิเตอร์) และใช้เวลาฝึกเฉลี่ยเพียง <span className="text-white font-bold">0.82 วินาที/รอบ</span>
              </div>
            </div>
          </div>

          {/* New Paradigm: BERT (Lanna Gold Theme) */}
          <div className="bg-[#16120e]/95 border border-[#4d3716] rounded-2xl p-6 relative overflow-hidden shadow-[#4d3716]/30 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#2e251b] pb-4 mb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#f0c674] font-bold">
                  กระบวนทัศน์ใหม่: Transformer & Self-Attention
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Self-Attention Transformer: BERT</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#c58a2e]/20 border border-[#c58a2e]/40 text-[#f0c674] text-xs font-mono font-bold">
                Devlin et al. (2019)
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#d6c8b4]">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#c58a2e]/20 text-[#f0c674] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                <div>
                  <strong className="text-white block">Multi-Head Self-Attention ประมวลผลคู่ขนาน:</strong>
                  <div className="my-2 p-2 bg-[#0c0a08]/80 border border-[#c58a2e]/30 rounded-lg inline-flex items-center flex-wrap gap-1 font-serif text-xs sm:text-sm text-[#fdfbf7]">
                    <span className="font-sans font-semibold text-[#f0c674]">Attention</span>
                    <span>(Q, K, V) = </span>
                    <span className="font-sans font-semibold text-[#e5c158]">softmax</span>
                    <span>(</span>
                    <MathFraction
                      num={<span className="italic font-bold text-[#fdfbf7]">Q K<sup className="text-[10px] font-sans text-[#f0c674]">T</sup></span>}
                      den={<MathSqrt><span className="italic">d</span><sub className="font-sans text-[10px] text-[#f0c674]">k</sub></MathSqrt>}
                    />
                    <span>) V</span>
                  </div>
                  <p className="text-xs text-[#ab9b87]">เชื่อมโยงทุกคู่คำพร้อมกันโดยตรงบน GPU ด้วยระยะทาง Path Length = 1</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#c58a2e]/20 text-[#f0c674] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                <div>
                  <strong className="text-[#f0c674] block">Bidirectional Representation ที่แท้จริง:</strong>
                  รับรู้บริบททั้งฝั่งซ้ายและฝั่งขวาพร้อมกัน เข้าใจคำประชดประชันและการปฏิเสธซ้อน (เช่น "barely watchable", "not bad") ได้อย่างแม่นยำ
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#c58a2e]/20 text-[#f0c674] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                <div>
                  <strong className="text-[#f0c674] block">แก้ปัญหา Long-term Dependency เบ็ดเสร็จ:</strong>
                  ระยะทางระหว่างคำสองคำที่ห่างกัน 100 คำ มี Path Length เท่ากับ 1 เท่าเดิม ทำให้ข้อมูลไม่เลือนหายไประหว่างทาง
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#c58a2e]/20 text-[#f0c674] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                <div>
                  <strong className="text-[#f0c674] block">Transfer Learning จาก Pre-training:</strong>
                  ปรับจูนด้วย Classification Head จากเวกเตอร์ [CLS] ขนาด 768-d เพียง 3 รอบ ก็ทำคะแนนได้ถึง <span className="text-[#f0c674] font-bold">85.60% Accuracy</span>
                </div>
              </div>

              <div className="p-3 bg-[#100d0a] border border-[#382f25] rounded-xl font-mono text-xs text-[#ab9b87]">
                <span className="text-[#d99f3d] font-bold">ต้นทุนที่ต้องแลก:</span> พารามิเตอร์ 110M ตัว และใช้เวลาฝึก <span className="text-white font-bold">42.07 วินาที/รอบ</span> (ช้ากว่า 51.3× / 51.3 เท่า)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Stage Engineering Pipeline */}
      <div className="bg-[#16120e]/95 border border-[#2e251b] rounded-2xl p-6">
        <h3 className="text-base font-bold text-[#fdfbf7] mb-4 flex items-center gap-2">
          <Binary className="w-5 h-5 text-[#c58a2e]" />
          <span>กระบวนการทดลองแบบครบวงจร 5 ขั้นตอน (5-Stage End-to-End Pipeline)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="bg-[#100d0a] border border-[#2e251b] rounded-xl p-4">
            <span className="text-xs font-mono text-[#f0c674] font-bold">ขั้นตอนที่ 01/05</span>
            <h4 className="text-sm font-semibold text-white mt-1">Dataset Preparation</h4>
            <p className="text-xs text-[#9e917f] mt-1">
              คลังรีวิว IMDb: แบ่ง Train 2,000 ตัวอย่าง / Test 500 ตัวอย่าง (บวก 246 / ลบ 254) ด้วย Seed 42
            </p>
          </div>

          <div className="bg-[#100d0a] border border-[#2e251b] rounded-xl p-4">
            <span className="text-xs font-mono text-[#f0c674] font-bold">ขั้นตอนที่ 02/05</span>
            <h4 className="text-sm font-semibold text-white mt-1">Preprocessing</h4>
            <p className="text-xs text-[#9e917f] mt-1">
              ตัดแท็ก HTML, คลีนช่องไฟ, Truncate/Pad ความยาว 128 โทเคน, แปลงเป็น Subwords ด้วย WordPiece (vocab 30,522)
            </p>
          </div>

          <div className="bg-[#100d0a] border border-[#2e251b] rounded-xl p-4">
            <span className="text-xs font-mono text-[#f0c674] font-bold">ขั้นตอนที่ 03/05</span>
            <h4 className="text-sm font-semibold text-white mt-1">Model Architecture</h4>
            <p className="text-xs text-[#9e917f] mt-1">
              สร้าง LSTM (128-d Embedding, 128 Hidden) เทียบกับ BERT (12 Layers, 12 Heads, 768-d [CLS] Head)
            </p>
          </div>

          <div className="bg-[#100d0a] border border-[#2e251b] rounded-xl p-4">
            <span className="text-xs font-mono text-[#f0c674] font-bold">ขั้นตอนที่ 04/05</span>
            <h4 className="text-sm font-semibold text-white mt-1">Training / Tuning</h4>
            <p className="text-xs text-[#9e917f] mt-1">
              LSTM 5 รอบ (Adam, lr 1e-3, batch 32) เทียบกับ BERT 3 รอบ (AdamW, lr 2e-5, batch 16, weight decay 0.01)
            </p>
          </div>

          <div className="bg-[#100d0a] border border-[#2e251b] rounded-xl p-4">
            <span className="text-xs font-mono text-[#f0c674] font-bold">ขั้นตอนที่ 05/05</span>
            <h4 className="text-sm font-semibold text-white mt-1">Evaluation & RCA</h4>
            <p className="text-xs text-[#9e917f] mt-1">
              วัดผลด้วย Accuracy, Precision, Recall, F1, Loss Curve และวิเคราะห์ข้อผิดพลาดเชิงลึก (Error Analysis)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
