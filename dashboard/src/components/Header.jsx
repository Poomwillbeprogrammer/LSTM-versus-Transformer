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
    { id: 'overview', label: 'ภาพรวม & ทฤษฎี', shortLabel: 'ภาพรวม', sub: 'Overview & Theory', icon: BookOpen },
    { id: 'benchmark', label: 'ผลการทดลองเชิงประจักษ์', shortLabel: 'ผลการทดลอง', sub: 'Empirical Benchmark', icon: BarChart3 },
    { id: 'simulator', label: 'จำลองสถาปัตยกรรม & Attention', shortLabel: 'จำลอง Attention', sub: 'Architecture & Attention', icon: Layers },
    { id: 'explorer', label: 'สำรวจชุดข้อมูล 500 ตัวอย่าง', shortLabel: 'สำรวจ 500 เคส', sub: '500 Test Dataset Explorer', icon: Database, badge: '500' },
    { id: 'playground', label: 'Live Playground', shortLabel: 'Playground', sub: 'Interactive Testing', icon: Sparkles, highlight: true },
  ];

  return (
    <header className="border-b border-[#2e251b] bg-[#120f0b]/95 backdrop-blur-md sticky top-0 z-40">
      {/* Top Academic Banner (Responsive: Compact 1-line on mobile, full on desktop) */}
      <div className="bg-gradient-to-r from-[#2e1c07] via-[#21170d] to-[#17120a] border-b border-[#4d3716] px-3 sm:px-4 py-1.5 sm:py-2 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-[#e2d7c5]">
          {/* Mobile compact academic line */}
          <div className="flex sm:hidden items-center justify-between w-full text-[11px]">
            <span className="inline-flex items-center gap-1 font-semibold text-[#f0c674] truncate">
              <GraduationCap className="w-3.5 h-3.5 text-[#f0c674] shrink-0" />
              <span>{academicInfo.courseCode} · {academicInfo.university}</span>
            </span>
            <span className="text-[#ab9b87] text-[10px] shrink-0 font-mono ml-2">
              {academicInfo.student}
            </span>
          </div>

          {/* Desktop full academic info */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c58a2e]/20 text-[#f0c674] font-semibold border border-[#c58a2e]/40 shadow-sm">
              <GraduationCap className="w-3.5 h-3.5 text-[#f0c674]" />
              {academicInfo.courseCode}
            </span>
            <span className="text-[#fdfbf7] font-medium">{academicInfo.courseName}</span>
            <span className="text-[#6d5b47]">|</span>
            <span className="text-[#d4af37] font-medium">{academicInfo.university}</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[#e2d7c5]">
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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4 pb-2 sm:pb-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
              <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider rounded bg-[#c58a2e]/15 text-[#f0c674] border border-[#c58a2e]/30">
                RMUTL AI Lab
              </span>
              <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <Cpu className="w-3 h-3" /> T4 Verified
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>{academicInfo.titleTh}</span>
            </h1>
            <p className="text-[11px] sm:text-sm text-[#9e917f] mt-0.5 line-clamp-1 sm:line-clamp-none">
              {academicInfo.titleEn} — <span className="text-[#d99f3d]">IMDb 500 Test Benchmark</span>
            </p>
          </div>

          {/* Quick Metrics Capsule in RMUTL Gold / Sky Blue Contrast */}
          <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-3 bg-[#18130e] border border-[#382f25] rounded-xl p-1.5 sm:p-2 px-3 shadow-inner w-full lg:w-auto shrink-0">
            <div className="text-center px-1 sm:px-2 flex-1 sm:flex-initial">
              <div className="text-[10px] text-[#9e917f] font-medium">LSTM Acc</div>
              <div className="text-sm sm:text-base font-bold text-sky-400 font-mono">55.20%</div>
            </div>
            <div className="h-6 sm:h-7 w-px bg-[#382f25]" />
            <div className="text-center px-1 sm:px-2 flex-1 sm:flex-initial">
              <div className="text-[10px] text-[#9e917f] font-medium">BERT Acc</div>
              <div className="text-sm sm:text-base font-bold text-[#f0c674] font-mono">85.60%</div>
            </div>
            <div className="h-6 sm:h-7 w-px bg-[#382f25]" />
            <div className="text-center px-1 sm:px-2 flex-1 sm:flex-initial">
              <div className="text-[10px] text-[#c58a2e] font-medium">Delta (Δ)</div>
              <div className="text-sm sm:text-base font-bold text-[#34d399] font-mono">+30.40%</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation with Scroll Fade Indicators & 44px Touch Targets */}
        <div className="relative mt-2.5 sm:mt-4">
          <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1.5 scroll-smooth overscroll-x-contain touch-pan-x">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2.5 min-h-[44px] rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer touch-manipulation select-none ${
                    isActive
                      ? 'bg-gradient-to-r from-[#b87d24] to-[#d99f3d] text-[#0c0a08] font-bold shadow-md shadow-[#8d5c1a]/40 scale-[1.02]'
                      : 'text-[#ab9b87] hover:text-[#fdfbf7] hover:bg-[#221a12] active:bg-[#2e2319]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0c0a08]' : tab.highlight ? 'text-[#f0c674]' : 'text-[#8c7b68]'}`} />
                  <span className="whitespace-nowrap sm:hidden">{tab.shortLabel}</span>
                  <span className="whitespace-nowrap hidden sm:inline">{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold shrink-0 ${
                      isActive ? 'bg-[#3b270b] text-[#f0c674]' : 'bg-[#261e16] text-[#c5b7a5]'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                  {tab.highlight && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#f0c674] animate-pulse shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
