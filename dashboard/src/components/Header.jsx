import React from 'react';
import { 
  BarChart3, 
  Layers, 
  Database, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  User, 
  Cpu, 
  Award
} from 'lucide-react';
import { academicInfo } from '../data/benchmarkData';

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'ภาพรวม & ทฤษฎี', sub: 'Overview & Theory', icon: BookOpen },
    { id: 'benchmark', label: 'ผลการทดลองเชิงประจักษ์', sub: 'Empirical Benchmark', icon: BarChart3 },
    { id: 'simulator', label: 'จำลองสถาปัตยกรรม & Attention', sub: 'Architecture & Attention', icon: Layers },
    { id: 'explorer', label: 'สำรวจชุดข้อมูล 500 ตัวอย่าง', sub: '500 Test Dataset Explorer', icon: Database, badge: '500' },
    { id: 'playground', label: 'Live Playground', sub: 'Interactive Testing', icon: Sparkles, highlight: true },
  ];

  return (
    <header className="border-b border-[#2e251b] bg-[#120f0b]/95 backdrop-blur-md sticky top-0 z-40">
      {/* Top Academic Banner (RMUTL Golden Brown Gradient) */}
      <div className="bg-gradient-to-r from-[#2e1c07] via-[#21170d] to-[#17120a] border-b border-[#4d3716] px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[#e2d7c5]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c58a2e]/20 text-[#f0c674] font-semibold border border-[#c58a2e]/40 shadow-sm">
              <GraduationCap className="w-3.5 h-3.5 text-[#f0c674]" />
              {academicInfo.courseCode}
            </span>
            <span className="text-[#fdfbf7] font-medium">{academicInfo.courseName}</span>
            <span className="text-[#6d5b47] hidden sm:inline">|</span>
            <span className="text-[#d4af37] font-medium hidden sm:inline">{academicInfo.university}</span>
          </div>

          <div className="flex items-center gap-4 text-[#e2d7c5]">
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[#9e917f]">อาจารย์ผู้สอน:</span>
              <span className="font-medium text-[#fdfbf7]">{academicInfo.instructor}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#34d399]" />
              <span className="text-[#9e917f]">ผู้จัดทำ:</span>
              <span className="font-medium text-[#fdfbf7]">{academicInfo.student}</span>
              <span className="text-[#8c7b68] text-[11px]">({academicInfo.studentId})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Title & Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider rounded bg-[#c58a2e]/15 text-[#f0c674] border border-[#c58a2e]/30">
                RMUTL AI Research Lab
              </span>
              <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <Cpu className="w-3 h-3" /> NVIDIA T4 Verified
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>{academicInfo.titleTh}</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#9e917f] mt-0.5">
              {academicInfo.titleEn} — <span className="text-[#d99f3d]">ชุดข้อมูล IMDb Binary Sentiment (2,000 Train / 500 Test)</span>
            </p>
          </div>

          {/* Quick Metrics Capsule in RMUTL Gold */}
          <div className="flex items-center gap-3 bg-[#18130e] border border-[#382f25] rounded-xl p-2 px-3 shadow-inner">
            <div className="text-center px-2">
              <div className="text-[10px] text-[#9e917f] font-medium">LSTM Acc</div>
              <div className="text-base font-bold text-amber-500 font-mono">55.20%</div>
            </div>
            <div className="h-7 w-px bg-[#382f25]" />
            <div className="text-center px-2">
              <div className="text-[10px] text-[#9e917f] font-medium">BERT Acc</div>
              <div className="text-base font-bold text-[#f0c674] font-mono">85.60%</div>
            </div>
            <div className="h-7 w-px bg-[#382f25]" />
            <div className="text-center px-2">
              <div className="text-[10px] text-[#c58a2e] font-medium">Delta (Δ)</div>
              <div className="text-base font-bold text-[#f0c674] font-mono">+30.40%</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation with RMUTL Gold Active States */}
        <nav className="flex items-center gap-1.5 mt-4 overflow-x-auto no-scrollbar pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#b87d24] to-[#d99f3d] text-[#0c0a08] font-bold shadow-md shadow-[#8d5c1a]/40 scale-[1.02]'
                    : 'text-[#ab9b87] hover:text-[#fdfbf7] hover:bg-[#221a12]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0c0a08]' : tab.highlight ? 'text-[#f0c674]' : 'text-[#8c7b68]'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive ? 'bg-[#3b270b] text-[#f0c674]' : 'bg-[#261e16] text-[#c5b7a5]'
                  }`}>
                    {tab.badge}
                  </span>
                )}
                {tab.highlight && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#f0c674] animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
