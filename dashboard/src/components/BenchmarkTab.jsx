import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  BarChart2, 
  TrendingDown, 
  Clock, 
  Sliders, 
  CheckCircle, 
  HelpCircle,
  Table as TableIcon,
  Sparkles,
  Zap
} from 'lucide-react';
import { 
  performanceMetrics, 
  hyperparameterTable, 
  lossProgression, 
  confusionMatrices,
  radarData 
} from '../data/benchmarkData';

export default function BenchmarkTab() {
  const [activeChart, setActiveChart] = useState('bar'); // 'bar' or 'radar'

  const barChartData = [
    { name: 'Accuracy', LSTM: 55.20, BERT: 85.60, diff: '+30.40%' },
    { name: 'Precision', LSTM: 54.44, BERT: 83.72, diff: '+29.28%' },
    { name: 'Recall', LSTM: 54.88, BERT: 87.80, diff: '+32.92%' },
    { name: 'F1-Score', LSTM: 54.66, BERT: 85.71, diff: '+31.06%' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner Summary */}
      <div className="bg-[#16120e]/95 border border-[#2e251b] rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#d99f3d] font-bold uppercase tracking-wider">
              Empirical Quantitative Evaluation
            </span>
            <h2 className="text-xl font-bold text-[#fdfbf7] mt-1">
              ผลการทดสอบประสิทธิภาพเชิงเปรียบเทียบ (ตารางที่ 2 จากรายงานจริง)
            </h2>
            <p className="text-xs sm:text-sm text-[#ab9b87] mt-1">
              ทดสอบบนชุดข้อมูลทดสอบมาตรฐาน IMDb Review 500 ตัวอย่าง ภายใต้สภาพแวดล้อมที่ควบคุมตัวแปรเดียวกันอย่างเคร่งครัด
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#0c0a08] p-1.5 rounded-xl border border-[#2e251b] shrink-0">
            <button
              onClick={() => setActiveChart('bar')}
              className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-medium cursor-pointer transition-all touch-manipulation ${
                activeChart === 'bar' ? 'bg-[#c58a2e] text-[#0c0a08] font-bold shadow-md shadow-[#8d5c1a]/30' : 'text-[#9e917f] hover:text-[#fdfbf7]'
              }`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setActiveChart('radar')}
              className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-medium cursor-pointer transition-all touch-manipulation ${
                activeChart === 'radar' ? 'bg-[#c58a2e] text-[#0c0a08] font-bold shadow-md shadow-[#8d5c1a]/30' : 'text-[#9e917f] hover:text-[#fdfbf7]'
              }`}
            >
              Radar Chart
            </button>
          </div>
        </div>

        {/* Charts & Metric Table Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-stretch">
          {/* Main Visual Chart */}
          <div className="lg:col-span-7 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#e2d7c5]">
                {activeChart === 'bar' ? 'เปรียบเทียบตัวชี้วัดความแม่นยำ (%)' : 'แผนภูมิเรดาร์แสดงมิติประสิทธิภาพ'}
              </span>
              <span className="text-[11px] font-mono text-[#9e917f]">Test Set n=500</span>
            </div>

            <div className="h-64 sm:h-72 w-full overflow-hidden">
              {activeChart === 'bar' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 20, right: 10, left: -15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2e251b" opacity={0.6} />
                    <XAxis dataKey="name" stroke="#9e917f" fontSize={11} />
                    <YAxis domain={[0, 100]} stroke="#9e917f" fontSize={11} unit="%" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#16120e', borderColor: '#382f25', borderRadius: '8px', color: '#fdfbf7' }}
                      formatter={(value, name) => [`${value}%`, name]}
                    />
                    <Legend wrapperStyle={{ color: '#e2d7c5', fontSize: '11px' }} />
                    <Bar dataKey="LSTM" fill="#d97706" radius={[4, 4, 0, 0]} name="LSTM (Baseline)" />
                    <Bar dataKey="BERT" fill="#d99f3d" radius={[4, 4, 0, 0]} name="BERT (Fine-tuning)" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                    <PolarGrid stroke="#2e251b" />
                    <PolarAngleAxis dataKey="metric" stroke="#e2d7c5" fontSize={10} />
                    <PolarRadiusAxis domain={[0, 100]} stroke="#5a4b3c" angle={30} />
                    <Radar name="LSTM (Baseline)" dataKey="LSTM" stroke="#d97706" fill="#d97706" fillOpacity={0.3} />
                    <Radar name="BERT (Fine-tuning)" dataKey="BERT" stroke="#d99f3d" fill="#d99f3d" fillOpacity={0.4} />
                    <Legend wrapperStyle={{ color: '#e2d7c5', fontSize: '11px' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#16120e', borderColor: '#382f25', borderRadius: '8px', color: '#fdfbf7' }} />
                  </RadarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[#2e251b] text-center font-mono text-xs">
              <div className="p-1 rounded bg-[#16120e]/60 sm:bg-transparent">
                <span className="text-[#9e917f] block text-[10px]">Δ Acc</span>
                <span className="text-[#34d399] font-bold">+30.40%</span>
              </div>
              <div className="p-1 rounded bg-[#16120e]/60 sm:bg-transparent">
                <span className="text-[#9e917f] block text-[10px]">Δ Prec</span>
                <span className="text-[#34d399] font-bold">+29.28%</span>
              </div>
              <div className="p-1 rounded bg-[#16120e]/60 sm:bg-transparent">
                <span className="text-[#9e917f] block text-[10px]">Δ Recall</span>
                <span className="text-[#34d399] font-bold">+32.92%</span>
              </div>
              <div className="p-1 rounded bg-[#16120e]/60 sm:bg-transparent">
                <span className="text-[#9e917f] block text-[10px]">Δ F1</span>
                <span className="text-[#34d399] font-bold">+31.06%</span>
              </div>
            </div>
          </div>

          {/* Table 2 View */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className="overflow-x-auto rounded-xl border border-[#2e251b] bg-[#0c0a08]/80">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#2e251b] bg-[#221a12] text-[#e2d7c5] font-mono">
                    <th className="p-3">ตัวชี้วัด (Metrics)</th>
                    <th className="p-3 text-amber-400 text-center">LSTM</th>
                    <th className="p-3 text-[#d99f3d] text-center">BERT</th>
                    <th className="p-3 text-[#f0c674] text-right">ผลต่าง (Δ)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2e251b]/60">
                  {performanceMetrics.map((m, idx) => (
                    <tr key={idx} className="hover:bg-[#221a12]/40">
                      <td className="p-3 text-[#e2d7c5] font-medium">
                        {m.metricTh}
                      </td>
                      <td className="p-3 text-center font-mono font-semibold text-amber-400/90">
                        {m.lstm}{m.unit}
                      </td>
                      <td className="p-3 text-center font-mono font-semibold text-[#f0c674]">
                        {m.bert}{m.unit}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-[#d99f3d]">
                        {m.delta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 bg-[#2a1d0f]/60 border border-[#4d3716] rounded-xl text-xs text-[#e2d7c5] leading-relaxed">
              <span className="text-[#d99f3d] font-bold block mb-1">💡 ข้อค้นพบสำคัญ:</span>
              LSTM ที่เริ่มฝึกจากศูนย์ (Train from scratch) บนข้อมูล 2,000 ตัวอย่าง ทำคะแนนได้เพียง 55.20% ซึ่งสูงกว่าการสุ่มทาย (Random guess 50.00%) เพียงเล็กน้อย ในขณะที่ BERT ดึงพลังจาก Pre-trained weights ทำให้ได้ Recall สูงถึง 87.80% และตรวจจับความคิดเห็นได้ครอบคลุม
            </div>
          </div>
        </div>
      </div>

      {/* Loss Convergence Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#16120e]/95 border border-[#2e251b] rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-mono text-[#d99f3d] font-bold uppercase tracking-wider">
                Learning Trajectory
              </span>
              <h3 className="text-lg font-bold text-[#fdfbf7] mt-1">
                การวิเคราะห์อัตราการลู่เข้าของความสูญเสีย (Loss Convergence)
              </h3>
            </div>
            <TrendingDown className="w-5 h-5 text-[#d99f3d]" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lossProgression} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2e251b" opacity={0.6} />
                <XAxis dataKey="epoch" stroke="#9e917f" fontSize={12} />
                <YAxis domain={[0, 0.8]} stroke="#9e917f" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#16120e', borderColor: '#382f25', borderRadius: '8px', color: '#fdfbf7' }}
                  formatter={(val, name) => [val ?? 'N/A (Early Stop)', name]}
                />
                <Legend wrapperStyle={{ color: '#e2d7c5', fontSize: '12px' }} />
                <Line 
                  type="monotone" 
                  dataKey="lstm" 
                  stroke="#d97706" 
                  strokeWidth={2.5} 
                  name="LSTM Loss (5 Epochs)" 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="bert" 
                  stroke="#d99f3d" 
                  strokeWidth={2.5} 
                  name="BERT Loss (3 Epochs)" 
                  activeDot={{ r: 6 }} 
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#2e251b] font-mono text-xs">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <span className="text-amber-400 font-bold block">LSTM Loss: 0.6976 → 0.3234</span>
              <span className="text-[#ab9b87] text-[11px]">ลดลง 53.6% แต่เกิด Overfitting บนข้อมูลชุดเล็ก</span>
            </div>
            <div className="p-3 bg-[#c58a2e]/10 border border-[#c58a2e]/30 rounded-lg">
              <span className="text-[#f0c674] font-bold block">BERT Loss: 0.4826 → 0.1369</span>
              <span className="text-[#ab9b87] text-[11px]">ลดลง 71.6% ในเวลาเพียง 3 รอบ มีเสถียรภาพสูงมาก</span>
            </div>
          </div>
        </div>

        {/* RCA Explanation on Overfitting vs Transfer Learning */}
        <div className="lg:col-span-5 bg-[#16120e]/95 border border-[#2e251b] rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <h4 className="text-base font-bold text-[#fdfbf7] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d99f3d]" />
              <span>ทำไม Loss ลด แต่ LSTM ยังได้คะแนนต่ำ?</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#e2d7c5] leading-relaxed">
              <div className="p-3 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl">
                <strong className="text-amber-300 block mb-1">1. ภาวะการเรียนรู้มากเกินไป (Overfitting) ของ LSTM:</strong>
                เมื่อฝึกสอนจากศูนย์ (Train from scratch) LSTM ต้องพยายามสร้าง Representation ของคลังคำศัพท์ขนาด 30,522 คำ ควบคู่กับการเรียนรู้ไวยากรณ์ด้วยข้อมูลฝึกเพียง 2,000 ตัวอย่าง โมเดลจึง "จำข้อความฝึกสอนได้" (Loss ลดลงเหลือ 0.3234) แต่ไม่สามารถ "สรุปความหมายทั่วไป" บนชุดทดสอบได้
              </div>

              <div className="p-3 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl">
                <strong className="text-[#f0c674] block mb-1">2. ข้อได้เปรียบของ Transfer Learning ใน BERT:</strong>
                BERT ได้รับการฝึกบนคลังข้อมูล Wikipedia & BookCorpus กว่า 3,300 ล้านคำมาก่อน จึงมี Semantic Matrix และไวยากรณ์ที่สมบูรณ์ การ Fine-tune เพียง 3 รอบ จึงเป็นการปรับเพียง Classification Head ให้ตรงกับโจทย์รีวิวหนัง
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#2a1d0f]/60 border border-[#4d3716] rounded-xl mt-4 font-mono text-[11px] text-[#f0c674]">
            📌 สรุป: การใช้ Pre-trained Foundation Model ช่วยลดความเสี่ยง Overfitting ได้อย่างเด็ดขาดบน Dataset ขนาดเล็ก
          </div>
        </div>
      </div>

      {/* Confusion Matrix Side-by-Side */}
      <div className="bg-[#16120e]/95 border border-[#2e251b] rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-mono text-[#d99f3d] font-bold uppercase tracking-wider">
              Diagnostic Matrices
            </span>
            <h3 className="text-lg font-bold text-[#fdfbf7] mt-1">
              เมทริกซ์ความสับสน (Confusion Matrices) บนชุดทดสอบ 500 ตัวอย่าง
            </h3>
          </div>
          <span className="text-xs font-mono text-[#9e917f]">Total: 500 Samples</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LSTM Confusion Matrix */}
          <div className="bg-[#0c0a08]/80 border border-[#4d3716] rounded-xl p-5">
            <div className="flex items-center justify-between border-b border-[#2e251b] pb-3 mb-4">
              <span className="font-bold text-[#fdfbf7] text-sm">LSTM Baseline (Acc 55.20%)</span>
              <span className="text-xs font-mono text-amber-400">Correct: 276 / 500</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <span className="text-[10px] text-[#9e917f] block uppercase font-mono">True Positive (TP)</span>
                <span className="text-2xl font-bold font-mono text-[#34d399]">{confusionMatrices.lstm.tp}</span>
                <span className="text-[11px] text-[#9e917f] block mt-1">บวกจริง / ทายบวก (54.9%)</span>
              </div>
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                <span className="text-[10px] text-[#9e917f] block uppercase font-mono">False Negative (FN)</span>
                <span className="text-2xl font-bold font-mono text-rose-400">{confusionMatrices.lstm.fn}</span>
                <span className="text-[11px] text-[#9e917f] block mt-1">บวกจริง / ทายลบ (45.1%)</span>
              </div>
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                <span className="text-[10px] text-[#9e917f] block uppercase font-mono">False Positive (FP)</span>
                <span className="text-2xl font-bold font-mono text-rose-400">{confusionMatrices.lstm.fp}</span>
                <span className="text-[11px] text-[#9e917f] block mt-1">ลบจริง / ทายบวก (44.5%)</span>
              </div>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <span className="text-[10px] text-[#9e917f] block uppercase font-mono">True Negative (TN)</span>
                <span className="text-2xl font-bold font-mono text-[#34d399]">{confusionMatrices.lstm.tn}</span>
                <span className="text-[11px] text-[#9e917f] block mt-1">ลบจริง / ทายลบ (55.5%)</span>
              </div>
            </div>

            <p className="text-xs text-[#9e917f] mt-4 text-center">
              อัตรา False Negative และ False Positive สูงเกือบเท่ากัน บ่งชี้ว่าโมเดลเกือบจะเหมือนการเดาสุ่ม
            </p>
          </div>

          {/* BERT Confusion Matrix */}
          <div className="bg-[#0c0a08]/80 border border-[#c58a2e]/40 rounded-xl p-5">
            <div className="flex items-center justify-between border-b border-[#2e251b] pb-3 mb-4">
              <span className="font-bold text-[#fdfbf7] text-sm">BERT Fine-tuned (Acc 85.60%)</span>
              <span className="text-xs font-mono text-[#d99f3d]">Correct: 428 / 500</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-4 bg-[#c58a2e]/15 border border-[#c58a2e]/40 rounded-xl">
                <span className="text-[10px] text-[#9e917f] block uppercase font-mono">True Positive (TP)</span>
                <span className="text-2xl font-bold font-mono text-[#f0c674]">{confusionMatrices.bert.tp}</span>
                <span className="text-[11px] text-[#e2d7c5] block mt-1">บวกจริง / ทายบวก (87.8%)</span>
              </div>
              <div className="p-4 bg-[#16120e] border border-[#2e251b] rounded-xl">
                <span className="text-[10px] text-[#9e917f] block uppercase font-mono">False Negative (FN)</span>
                <span className="text-2xl font-bold font-mono text-rose-400">{confusionMatrices.bert.fn}</span>
                <span className="text-[11px] text-[#9e917f] block mt-1">บวกจริง / ทายลบ (12.2%)</span>
              </div>
              <div className="p-4 bg-[#16120e] border border-[#2e251b] rounded-xl">
                <span className="text-[10px] text-[#9e917f] block uppercase font-mono">False Positive (FP)</span>
                <span className="text-2xl font-bold font-mono text-rose-400">{confusionMatrices.bert.fp}</span>
                <span className="text-[11px] text-[#9e917f] block mt-1">ลบจริง / ทายบวก (16.5%)</span>
              </div>
              <div className="p-4 bg-[#c58a2e]/15 border border-[#c58a2e]/40 rounded-xl">
                <span className="text-[10px] text-[#9e917f] block uppercase font-mono">True Negative (TN)</span>
                <span className="text-2xl font-bold font-mono text-[#f0c674]">{confusionMatrices.bert.tn}</span>
                <span className="text-[11px] text-[#e2d7c5] block mt-1">ลบจริง / ทายลบ (83.5%)</span>
              </div>
            </div>

            <p className="text-xs text-[#ab9b87] mt-4 text-center">
              สามารถระบุรีวิวบวกได้ครอบคลุมถึง 87.8% (Recall) และแม่นยำสูงถึง 83.72% (Precision)
            </p>
          </div>
        </div>
      </div>

      {/* Engineering Trade-off & Hyperparameters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trade-off Breakdown */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#20170e] to-[#16120e] border border-[#4d3716] rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <span className="text-xs font-mono text-[#d99f3d] font-bold uppercase tracking-wider">
              Engineering Cost vs Benefit
            </span>
            <h3 className="text-lg font-bold text-[#fdfbf7] mt-1">
              ต้นทุนการคำนวณเชิงวิศวกรรม (The Trade-Off)
            </h3>
            <p className="text-xs text-[#e2d7c5] mt-2 leading-relaxed">
              การเลือกสถาปัตยกรรมในงานวิศวกรรมจริงจำเป็นต้องพิจารณาความคุ้มค่าระหว่างทรัพยากรที่ต้องใช้กับผลลัพธ์ที่ได้คืนมา
            </p>

            <div className="space-y-4 mt-6">
              <div className="p-4 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl">
                <div className="flex items-center justify-between text-xs text-[#9e917f] mb-1">
                  <span>เวลาฝึกสอนเฉลี่ยต่อรอบ (Time per Epoch)</span>
                  <span className="font-mono text-amber-400 font-bold">51.3× นานกว่า</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-16 text-xs font-mono text-amber-400 font-bold">0.82 s</div>
                  <div className="flex-1 bg-[#221a12] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[2%]" />
                  </div>
                  <div className="text-[11px] text-[#9e917f]">LSTM</div>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-16 text-xs font-mono text-[#d99f3d] font-bold">42.07 s</div>
                  <div className="flex-1 bg-[#221a12] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#c58a2e] h-full w-full" />
                  </div>
                  <div className="text-[11px] text-[#9e917f]">BERT</div>
                </div>
              </div>

              <div className="p-4 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl">
                <div className="flex items-center justify-between text-xs text-[#9e917f] mb-1">
                  <span>ขนาดพารามิเตอร์ของโมเดล (Parameters)</span>
                  <span className="font-mono text-[#f0c674] font-bold">27.2× ใหญ่กว่า</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-16 text-xs font-mono text-amber-400 font-bold">4.04 M</div>
                  <div className="flex-1 bg-[#221a12] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[4%]" />
                  </div>
                  <div className="text-[11px] text-[#9e917f]">LSTM</div>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-16 text-xs font-mono text-[#d99f3d] font-bold">110.0 M</div>
                  <div className="flex-1 bg-[#221a12] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#b87d24] to-[#f0c674] h-full w-full" />
                  </div>
                  <div className="text-[11px] text-[#9e917f]">BERT</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3.5 bg-[#c58a2e]/10 border border-[#c58a2e]/30 rounded-xl text-xs text-[#f0c674]">
            <strong>บทสรุปเชิงวิศวกรรม:</strong> การจ่ายเวลาประมวลผลเพิ่มขึ้น 51 เท่า เพื่อแลกกับความแม่นยำที่ก้าวกระโดดถึง <strong>+30.40 จุด (55.20% → 85.60%)</strong> ถือเป็นการลงทุนที่คุ้มค่าอย่างยิ่งในระบบงานจริง
          </div>
        </div>

        {/* Hyperparameter Table (Table 1) */}
        <div className="lg:col-span-7 bg-[#16120e]/95 border border-[#2e251b] rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-mono text-[#9e917f] font-bold uppercase tracking-wider">
                Configuration Blueprint
              </span>
              <h3 className="text-lg font-bold text-[#fdfbf7] mt-1">
                การกำหนดค่าไฮเปอร์พารามิเตอร์ (ตารางที่ 1 จากรายงาน)
              </h3>
            </div>
            <Sliders className="w-5 h-5 text-[#d99f3d]" />
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#2e251b] bg-[#0c0a08]/80">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#2e251b] bg-[#221a12] text-[#e2d7c5] font-mono">
                  <th className="p-3">พารามิเตอร์</th>
                  <th className="p-3 text-amber-400">LSTM (Baseline)</th>
                  <th className="p-3 text-[#d99f3d]">BERT (Fine-tuning)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2e251b]/60">
                {hyperparameterTable.map((h, idx) => (
                  <tr key={idx} className="hover:bg-[#221a12]/40">
                    <td className="p-2.5 text-[#e2d7c5] font-medium font-mono">
                      {h.parameterTh}
                    </td>
                    <td className="p-2.5 text-amber-300/90 font-mono text-[11px]">
                      {h.lstm}
                    </td>
                    <td className="p-2.5 text-[#f0c674] font-mono text-[11px]">
                      {h.bert}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
