import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Clock, 
  GitCompare, 
  Binary, 
  ShieldCheck, 
  HelpCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { performanceMetrics, academicInfo } from '../data/benchmarkData';

export default function OverviewTab({ onExploreDataset, onOpenSimulator }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Stat Dials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group hover:border-indigo-500/50 transition-all shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Accuracy Improvement</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">+30.40%</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> 85.60% vs 55.20%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            BERT บรรลุความถูกต้องเหนือกว่า LSTM 30.40% บนชุดทดสอบ 500 ตัวอย่าง
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group hover:border-indigo-500/50 transition-all shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">F1-Score Gain</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">+31.06%</span>
            <span className="text-xs text-blue-400 font-semibold">85.71% vs 54.66%</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            ความสมดุลระหว่าง Precision (83.72%) และ Recall (87.80%) ของ BERT สูงกว่าอย่างชัดเจน
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group hover:border-indigo-500/50 transition-all shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Fast Convergence</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-purple-400 font-mono">3 Epochs</span>
            <span className="text-xs text-slate-400">vs 5 Epochs</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            พลังของ Transfer Learning ทำให้ Loss ลดเหลือ 0.1369 ในเวลาเพียง 3 รอบ
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group hover:border-indigo-500/50 transition-all shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Engineering Trade-off</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">51.3×</span>
            <span className="text-xs text-slate-400">Training Time</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            แลกเวลาฝึกสอน 42.07s vs 0.82s เพื่อความแม่นยำที่เพิ่มขึ้นกว่า 30.40 จุด คุ้มค่ามากในงานจริง
          </p>
        </div>
      </div>

      {/* Research Question & Core Premise */}
      <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/30 border border-indigo-900/40 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
              <HelpCircle className="w-3.5 h-3.5" />
              คำถามการวิจัยหลัก (Central Research Question)
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              "เมื่อให้ LSTM (Baseline) และ BERT (Fine-tuned) แก้โจทย์เดียวกัน บนชุดข้อมูล IMDb ภายใต้การควบคุมตัวแปรที่เที่ยงตรง ฝ่ายใดจะมีประสิทธิภาพเหนือกว่า และต้องแลกมาด้วยต้นทุนการคำนวณเท่าไร?"
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              งานวิจัยนี้พิสูจน์เชิงประจักษ์ถึง **การเปลี่ยนผ่านของกระบวนทัศน์ (Paradigm Shift)** ในสาขาการรู้จำรูปแบบ (Pattern Recognition) จากการประมวลผลข้อมูลลำดับตามเวลาทีละขั้นตอน (Step-by-step Recurrence) สู่การคำนวณความสัมพันธ์ระหว่างทุกตำแหน่งพร้อมกันด้วยกลไก Self-Attention แบบขนาน
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={onExploreDataset}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <span>สำรวจชุดข้อมูล 500 ตัวอย่าง</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenSimulator}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition-all cursor-pointer"
            >
              <span>ทดลอง Attention Simulator</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Paradigm Comparison Side-by-Side */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-indigo-400" />
            <span>เปรียบเทียบกระบวนทัศน์เดิม vs กระบวนทัศน์ใหม่</span>
          </h2>
          <span className="text-xs text-slate-400">Structural Comparison</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Old Paradigm: LSTM */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  กระบวนทัศน์เดิม (Traditional Baseline)
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Sequential Recurrent: LSTM</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
                Hochreiter & Schmidhuber (1997)
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">1</div>
                <div>
                  <strong className="text-white block">อ่านข้อมูลทีละคำตามลำดับเวลา (Step-by-step):</strong>
                  ประมวลผลคำจากซ้ายไปขวา ($x_1 \rightarrow x_2 \rightarrow \dots \rightarrow x_t$) ผ่าน Hidden State ($h_t$) และ Cell State ($C_t$)
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

              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl font-mono text-xs text-slate-400">
                <span className="text-amber-400 font-bold">จุดเด่นเชิงวิศวกรรม:</span> น้ำหนักเบา (4.04M พารามิเตอร์) และใช้เวลาฝึกเฉลี่ยเพียง <span className="text-white font-bold">0.82 วินาที/รอบ</span>
              </div>
            </div>
          </div>

          {/* New Paradigm: BERT */}
          <div className="bg-slate-900/90 border border-indigo-900/50 rounded-2xl p-6 relative overflow-hidden shadow-indigo-950/20 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  กระบวนทัศน์ใหม่ (Modern Transformer Paradigm)
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Self-Attention Transformer: BERT</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
                Devlin et al. (2019)
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                <div>
                  <strong className="text-white block">Multi-Head Self-Attention ประมวลผลคู่ขนาน:</strong>
                  คำนวณ Attention(Q, K, V) = softmax( (Q × K^T) / √d_k ) × V เชื่อมโยงทุกคู่คำพร้อมกันโดยตรงบน GPU
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                <div>
                  <strong className="text-emerald-300 block">Bidirectional Representation ที่แท้จริง:</strong>
                  รับรู้บริบททั้งฝั่งซ้ายและฝั่งขวาพร้อมกัน เข้าใจคำประชดประชันและการปฏิเสธซ้อน (เช่น "barely watchable", "not bad") ได้อย่างแม่นยำ
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                <div>
                  <strong className="text-emerald-300 block">แก้ปัญหา Long-term Dependency เบ็ดเสร็จ:</strong>
                  ระยะทางระหว่างคำสองคำที่ห่างกัน 100 คำ มี Path Length เท่ากับ 1 เท่าเดิม ทำให้ข้อมูลไม่เลือนหายไประหว่างทาง
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                <div>
                  <strong className="text-emerald-300 block">Transfer Learning จาก Pre-training:</strong>
                  ปรับจูนด้วย Classification Head จากเวกเตอร์ [CLS] ขนาด 768-d เพียง 3 รอบ ก็ทำคะแนนได้ถึง <span className="text-white font-bold">85.60% Accuracy</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950/70 border border-indigo-900/30 rounded-xl font-mono text-xs text-slate-400">
                <span className="text-indigo-400 font-bold">ต้นทุนที่ต้องแลก:</span> พารามิเตอร์ 110M ตัว และใช้เวลาฝึก <span className="text-white font-bold">42.07 วินาที/รอบ</span> (ช้ากว่า 51 เท่า)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Stage Engineering Pipeline */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Binary className="w-5 h-5 text-indigo-400" />
          <span>กระบวนการทดลองแบบครบวงจร (End-to-End Experimental Pipeline)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <span className="text-xs font-mono text-indigo-400 font-bold">ขั้นที่ 1</span>
            <h4 className="text-sm font-semibold text-white mt-1">Dataset Preparation</h4>
            <p className="text-xs text-slate-400 mt-1">
              คลังรีวิว IMDb: แบ่ง Train 2,000 ตัวอย่าง / Test 500 ตัวอย่าง (บวก 246 / ลบ 254) ด้วย Seed 42
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <span className="text-xs font-mono text-indigo-400 font-bold">ขั้นที่ 2</span>
            <h4 className="text-sm font-semibold text-white mt-1">Preprocessing</h4>
            <p className="text-xs text-slate-400 mt-1">
              ตัดแท็ก HTML, คลีนช่องไฟ, Truncate/Pad ความยาว 128 โทเคน, แปลงเป็น Subwords ด้วย WordPiece (vocab 30,522)
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <span className="text-xs font-mono text-indigo-400 font-bold">ขั้นที่ 3</span>
            <h4 className="text-sm font-semibold text-white mt-1">Model Architecture</h4>
            <p className="text-xs text-slate-400 mt-1">
              สร้าง LSTM (128-d Embedding, 128 Hidden) เทียบกับ BERT (12 Layers, 12 Heads, 768-d [CLS] Head)
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <span className="text-xs font-mono text-indigo-400 font-bold">ขั้นที่ 4</span>
            <h4 className="text-sm font-semibold text-white mt-1">Training / Tuning</h4>
            <p className="text-xs text-slate-400 mt-1">
              LSTM 5 รอบ (Adam, lr 1e-3, batch 32) เทียบกับ BERT 3 รอบ (AdamW, lr 2e-5, batch 16, weight decay 0.01)
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <span className="text-xs font-mono text-indigo-400 font-bold">ขั้นที่ 5</span>
            <h4 className="text-sm font-semibold text-white mt-1">Evaluation & RCA</h4>
            <p className="text-xs text-slate-400 mt-1">
              วัดผลด้วย Accuracy, Precision, Recall, F1, Loss Curve และวิเคราะห์ข้อผิดพลาดเชิงลึก (Error Analysis)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
