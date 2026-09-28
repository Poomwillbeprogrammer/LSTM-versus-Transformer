import React, { useState } from 'react';
import Header from './components/Header';
import OverviewTab from './components/OverviewTab';
import BenchmarkTab from './components/BenchmarkTab';
import AttentionSimulatorTab from './components/AttentionSimulatorTab';
import DatasetExplorerTab from './components/DatasetExplorerTab';
import PlaygroundTab from './components/PlaygroundTab';
import { academicInfo } from './data/benchmarkData';
import { BookOpen, GraduationCap, CheckCircle2 } from 'lucide-react';

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

      {/* Academic Footer in RMUTL Theme */}
      <footer className="border-t border-[#2e251b] bg-[#120f0b]/90 mt-12 py-8 px-4 text-xs text-[#9e917f]">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#2e251b] pb-6">
            <div>
              <div className="font-semibold text-[#f0c674] text-sm flex items-center gap-2">
                <span>{academicInfo.titleTh}</span>
              </div>
              <div className="text-[#ab9b87] mt-0.5">
                {academicInfo.courseCode} {academicInfo.courseName} — <strong className="text-[#d4af37]">{academicInfo.university}</strong>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[#e2d7c5]">
              <span>อาจารย์ผู้สอน: <strong className="text-[#fdfbf7]">{academicInfo.instructor}</strong></span>
              <span className="text-[#544637]">•</span>
              <span>ผู้จัดทำ: <strong className="text-[#fdfbf7]">{academicInfo.student}</strong> ({academicInfo.studentId})</span>
            </div>
          </div>

          {/* Academic References */}
          <div className="space-y-2">
            <span className="font-semibold text-[#c58a2e] block uppercase tracking-wider text-[11px]">
              เอกสารอ้างอิงทางวิชาการ (Academic References):
            </span>
            <ul className="space-y-1 font-mono text-[11px] text-[#9e917f]">
              <li>[1] S. Hochreiter and J. Schmidhuber, "Long short-term memory," <em>Neural Computation</em>, vol. 9, no. 8, pp. 1735–1780, 1997.</li>
              <li>[2] A. Vaswani et al., "Attention is all you need," in <em>Advances in Neural Information Processing Systems (NeurIPS)</em>, vol. 30, 2017.</li>
              <li>[3] J. Devlin, M. W. Chang, K. Lee, and K. Toutanova, "BERT: Pre-training of deep bidirectional transformers for language understanding," in <em>Proc. NAACL-HLT</em>, pp. 4171–4186, 2019.</li>
              <li>[4] A. L. Maas et al., "Learning word vectors for sentiment analysis," in <em>Proc. 49th Annual Meeting of the ACL</em>, pp. 142–150, 2011.</li>
              <li>[5] T. Wolf et al., "Transformers: State-of-the-art natural language processing," in <em>Proc. EMNLP: System Demonstrations</em>, pp. 38–45, 2020.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[#262019] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#76634e]">
            <span>© 2026 ENGCE 408 Term Project · Faculty of Engineering, RMUTL Chiang Mai</span>
            <span className="flex items-center gap-1 text-[#f0c674] font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#c58a2e]" /> RMUTL Golden Brown Identity Edition
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
