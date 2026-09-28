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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
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

      {/* Academic Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 mt-12 py-8 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div>
              <div className="font-semibold text-slate-200 text-sm">
                {academicInfo.titleTh}
              </div>
              <div className="text-slate-400 mt-0.5">
                {academicInfo.courseCode} {academicInfo.courseName} — {academicInfo.university}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-slate-300">
              <span>อาจารย์ผู้สอน: <strong className="text-white">{academicInfo.instructor}</strong></span>
              <span>•</span>
              <span>ผู้จัดทำ: <strong className="text-white">{academicInfo.student}</strong> ({academicInfo.studentId})</span>
            </div>
          </div>

          {/* Academic References */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-300 block uppercase tracking-wider text-[11px]">
              เอกสารอ้างอิงทางวิชาการ (Academic References):
            </span>
            <ul className="space-y-1 font-mono text-[11px] text-slate-400">
              <li>[1] S. Hochreiter and J. Schmidhuber, "Long short-term memory," <em>Neural Computation</em>, vol. 9, no. 8, pp. 1735–1780, 1997.</li>
              <li>[2] A. Vaswani et al., "Attention is all you need," in <em>Advances in Neural Information Processing Systems (NeurIPS)</em>, vol. 30, 2017.</li>
              <li>[3] J. Devlin, M. W. Chang, K. Lee, and K. Toutanova, "BERT: Pre-training of deep bidirectional transformers for language understanding," in <em>Proc. NAACL-HLT</em>, pp. 4171–4186, 2019.</li>
              <li>[4] A. L. Maas et al., "Learning word vectors for sentiment analysis," in <em>Proc. 49th Annual Meeting of the ACL</em>, pp. 142–150, 2011.</li>
              <li>[5] T. Wolf et al., "Transformers: State-of-the-art natural language processing," in <em>Proc. EMNLP: System Demonstrations</em>, pp. 38–45, 2020.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>© 2026 ENGCE 408 Term Project · Faculty of Engineering, RMUTL Chiang Mai</span>
            <span className="flex items-center gap-1 text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" /> Standalone Single-File Bundle Verified
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
