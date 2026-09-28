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
  Award,
  ExternalLink,
  Download
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
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top Academic Banner */}
      <div className="bg-gradient-to-r from-blue-950/80 via-indigo-950/80 to-purple-950/80 border-b border-indigo-900/40 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30">
              <GraduationCap className="w-3.5 h-3.5" />
              {academicInfo.courseCode}
            </span>
            <span className="text-slate-200 font-medium">{academicInfo.courseName}</span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">{academicInfo.university}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">อาจารย์ผู้สอน:</span>
              <span className="font-medium text-slate-200">{academicInfo.instructor}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400">ผู้จัดทำ:</span>
              <span className="font-medium text-slate-200">{academicInfo.student}</span>
              <span className="text-slate-500 text-[11px]">({academicInfo.studentId})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Title & Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Pattern Recognition Research Lab
              </span>
              <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <Cpu className="w-3 h-3" /> NVIDIA T4 Verified
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>{academicInfo.titleTh}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {academicInfo.titleEn} — <span className="text-indigo-400">ชุดข้อมูล IMDb Binary Sentiment (2,000 Train / 500 Test)</span>
            </p>
          </div>

          {/* Quick Metrics Capsule */}
          <div className="flex items-center gap-3 bg-slate-950/60 border border-slate-800 rounded-xl p-2 px-3 shadow-inner">
            <div className="text-center px-2">
              <div className="text-[10px] text-slate-400 font-medium">LSTM Acc</div>
              <div className="text-base font-bold text-amber-400 font-mono">55.20%</div>
            </div>
            <div className="h-7 w-px bg-slate-800" />
            <div className="text-center px-2">
              <div className="text-[10px] text-slate-400 font-medium">BERT Acc</div>
              <div className="text-base font-bold text-emerald-400 font-mono">85.60%</div>
            </div>
            <div className="h-7 w-px bg-slate-800" />
            <div className="text-center px-2">
              <div className="text-[10px] text-indigo-300 font-medium">Delta (Δ)</div>
              <div className="text-base font-bold text-indigo-400 font-mono">+30.40%</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
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
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
                {tab.highlight && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
