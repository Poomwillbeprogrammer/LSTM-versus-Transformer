import React, { useState } from 'react';
import Header from './components/Header';
import OverviewTab from './components/OverviewTab';
import BenchmarkTab from './components/BenchmarkTab';
import AttentionSimulatorTab from './components/AttentionSimulatorTab';
import DatasetExplorerTab from './components/DatasetExplorerTab';
import PlaygroundTab from './components/PlaygroundTab';
import { academicInfo } from './data/benchmarkData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#fdfbf7] flex flex-col selection:bg-[#c58a2e]/40 selection:text-[#f0c674]">
      {/* Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <OverviewTab 
            onExploreDataset={() => setActiveTab('explorer')}
            onOpenSimulator={() => setActiveTab('simulator')}
          />
        )}
        {activeTab === 'benchmark' && <BenchmarkTab />}
        {activeTab === 'simulator' && <AttentionSimulatorTab />}
        {activeTab === 'explorer' && <DatasetExplorerTab />}
        {activeTab === 'playground' && <PlaygroundTab />}
      </main>

      {/* Clean Academic Footer (RMUTL Golden Brown Theme) */}
      <footer className="border-t border-[#2e251b] bg-[#120f0b]/90 mt-16 py-6 px-4 text-xs text-[#9e917f]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-semibold text-[#f0c674]">
              {academicInfo.courseCode} {academicInfo.courseName}
            </span>
            <span className="text-[#544637] hidden sm:inline">•</span>
            <span className="text-[#ab9b87]">
              {academicInfo.university}
            </span>
            <span className="text-[#544637] hidden sm:inline">•</span>
            <span className="text-[#e2d7c5]">
              {academicInfo.student} ({academicInfo.studentId})
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#8c7b68] font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#c58a2e]" />
            <span>RMUTL Golden Brown Edition · ENGCE 408</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
