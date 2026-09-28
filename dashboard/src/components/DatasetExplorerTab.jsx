import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  SlidersHorizontal,
  X,
  Sparkles
} from 'lucide-react';
import dataset500 from '../data/dataset_500.json';

export default function DatasetExplorerTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all, bert_win, lstm_win, both_correct, both_wrong, negation, long
  const [selectedSample, setSelectedSample] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Filter counts
  const counts = useMemo(() => {
    return {
      all: dataset500.length,
      bert_win: dataset500.filter(s => s.category === 'bert_win').length,
      lstm_win: dataset500.filter(s => s.category === 'lstm_win').length,
      both_correct: dataset500.filter(s => s.category === 'both_correct').length,
      both_wrong: dataset500.filter(s => s.category === 'both_wrong').length,
      negation: dataset500.filter(s => s.tags?.includes('negation')).length,
      long: dataset500.filter(s => s.token_count >= 100).length,
    };
  }, []);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return dataset500.filter((item) => {
      // Category filter
      if (activeFilter === 'bert_win' && item.category !== 'bert_win') return false;
      if (activeFilter === 'lstm_win' && item.category !== 'lstm_win') return false;
      if (activeFilter === 'both_correct' && item.category !== 'both_correct') return false;
      if (activeFilter === 'both_wrong' && item.category !== 'both_wrong') return false;
      if (activeFilter === 'negation' && !item.tags?.includes('negation')) return false;
      if (activeFilter === 'long' && item.token_count < 100) return false;

      // Search filter
      if (searchTerm) {
        const lower = searchTerm.toLowerCase();
        const matchesText = item.text.toLowerCase().includes(lower);
        const matchesId = item.id.toString() === searchTerm;
        if (!matchesText && !matchesId) return false;
      }

      return true;
    });
  }, [activeFilter, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ["ID", "Actual_Label", "BERT_Pred", "BERT_Prob", "LSTM_Pred", "LSTM_Prob", "Category", "Token_Count", "Text", "Reason"];
    const rows = filteredData.map(s => [
      s.id,
      s.label_name,
      s.bert_pred === 1 ? "Positive" : "Negative",
      s.bert_prob,
      s.lstm_pred === 1 ? "Positive" : "Negative",
      s.lstm_prob,
      s.category,
      s.token_count,
      `"${s.text.replace(/"/g, '""')}"`,
      `"${s.reason.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `imdb_500_benchmark_${activeFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Controls & Summary Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
              500-Sample Test Set Inspector
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              สำรวจชุดข้อมูลทดสอบจริง 500 ตัวอย่าง (IMDb Test Benchmark)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              คลังข้อมูลจริงที่ใช้ประเมินผล (สุ่มด้วย Seed 42 สมดุลบวก/ลบ) พร้อมการวิเคราะห์สาเหตุความคลาดเคลื่อนรายประโยค
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-mono transition-all cursor-pointer shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export Filtered CSV ({filteredData.length})</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={() => { setActiveFilter('all'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
              activeFilter === 'all'
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            ทั้งหมด ({counts.all})
          </button>

          <button
            onClick={() => { setActiveFilter('bert_win'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
              activeFilter === 'bert_win'
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-slate-950 text-emerald-400 hover:bg-emerald-950/40 border border-emerald-900/40'
            }`}
          >
            <span>BERT ชนะ (LSTM ผิด)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-900/60 font-mono font-bold">
              {counts.bert_win}
            </span>
          </button>

          <button
            onClick={() => { setActiveFilter('lstm_win'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
              activeFilter === 'lstm_win'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-slate-950 text-amber-400 hover:bg-amber-950/40 border border-amber-900/40'
            }`}
          >
            <span>LSTM ชนะ (BERT ผิด)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-900/60 font-mono font-bold">
              {counts.lstm_win}
            </span>
          </button>

          <button
            onClick={() => { setActiveFilter('both_correct'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
              activeFilter === 'both_correct'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-950 text-blue-400 hover:bg-blue-950/40 border border-blue-900/40'
            }`}
          >
            ทายถูกทั้งคู่ ({counts.both_correct})
          </button>

          <button
            onClick={() => { setActiveFilter('both_wrong'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
              activeFilter === 'both_wrong'
                ? 'bg-rose-600 text-white shadow'
                : 'bg-slate-950 text-rose-400 hover:bg-rose-950/40 border border-rose-900/40'
            }`}
          >
            ทายผิดทั้งคู่ ({counts.both_wrong})
          </button>

          <button
            onClick={() => { setActiveFilter('negation'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
              activeFilter === 'negation'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-slate-950 text-purple-400 hover:bg-purple-950/40 border border-purple-900/40'
            }`}
          >
            มีคำปฏิเสธ (Negation: {counts.negation})
          </button>

          <button
            onClick={() => { setActiveFilter('long'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
              activeFilter === 'long'
                ? 'bg-slate-700 text-white shadow'
                : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            ข้อความยาว &gt;100 คำ ({counts.long})
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            placeholder="ค้นหาตามข้อความรีวิว เช่น 'ending', 'acting', 'boring' หรือพิมพ์ ID ตัวอย่าง..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Dataset Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedData.map((item) => {
          const isBertCorrect = item.bert_pred === item.label;
          const isLstmCorrect = item.lstm_pred === item.label;

          return (
            <div
              key={item.id}
              onClick={() => setSelectedSample(item)}
              className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 transition-all cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Header row: ID & Actual Label */}
                <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800 text-xs">
                  <span className="font-mono text-slate-500 font-bold">#{item.id}</span>
                  <span className="text-[11px] font-mono text-slate-400">{item.token_count} tokens</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    item.label === 1 
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                  }`}>
                    Actual: {item.label_name}
                  </span>
                </div>

                {/* Snippet */}
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              {/* Prediction Comparison Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  {/* LSTM Tag */}
                  <div className={`p-1.5 rounded flex items-center justify-between border ${
                    isLstmCorrect 
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  }`}>
                    <span className="flex items-center gap-1 font-sans">
                      {isLstmCorrect ? <CheckCircle className="w-3 h-3 text-amber-400" /> : <XCircle className="w-3 h-3 text-rose-400" />}
                      LSTM:
                    </span>
                    <span>{item.lstm_pred === 1 ? 'Pos' : 'Neg'}</span>
                  </div>

                  {/* BERT Tag */}
                  <div className={`p-1.5 rounded flex items-center justify-between border ${
                    isBertCorrect 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  }`}>
                    <span className="flex items-center gap-1 font-sans">
                      {isBertCorrect ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <XCircle className="w-3 h-3 text-rose-400" />}
                      BERT:
                    </span>
                    <span>{item.bert_pred === 1 ? 'Pos' : 'Neg'}</span>
                  </div>
                </div>

                {/* Category Pill Tag */}
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="capitalize">{item.category.replace('_', ' ')}</span>
                  <span className="text-indigo-400 group-hover:underline flex items-center gap-0.5">
                    เจาะลึก <Eye className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between py-4 border-t border-slate-800 text-xs text-slate-400">
        <span>
          แสดง {Math.min(filteredData.length, (page - 1) * pageSize + 1)} - {Math.min(filteredData.length, page * pageSize)} จากทั้งหมด {filteredData.length} ตัวอย่าง
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg disabled:opacity-40 hover:bg-slate-800 text-white cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-slate-300">หน้า {page} / {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg disabled:opacity-40 hover:bg-slate-800 text-white cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Review Inspector Modal / Drawer */}
      {selectedSample && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedSample(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-indigo-400 font-bold">Sample #{selectedSample.id}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{selectedSample.token_count} tokens</span>
                <span className="text-slate-500">•</span>
                <span className="capitalize text-slate-300">{selectedSample.category.replace('_', ' ')}</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                การวิเคราะห์เจาะลึกตัวอย่างรีวิว (Sample Detail Inspector)
              </h3>
            </div>

            {/* Actual Text */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">ข้อความรีวิว (Review Text):</span>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                "{selectedSample.text}"
              </p>
            </div>

            {/* Prediction Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* LSTM Box */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">LSTM Baseline:</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    selectedSample.lstm_pred === selectedSample.label 
                      ? 'bg-emerald-500/20 text-emerald-300' 
                      : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {selectedSample.lstm_pred === selectedSample.label ? '✓ ถูกต้อง' : '✕ ทำนายผิด'}
                  </span>
                </div>
                <div className="text-sm font-semibold text-white">
                  ผลทำนาย: {selectedSample.lstm_pred === 1 ? 'Positive (เชิงบวก)' : 'Negative (เชิงลบ)'}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Confidence Score: {(selectedSample.lstm_prob * 100).toFixed(1)}%
                </div>
              </div>

              {/* BERT Box */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400">BERT Fine-tuned:</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    selectedSample.bert_pred === selectedSample.label 
                      ? 'bg-emerald-500/20 text-emerald-300' 
                      : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {selectedSample.bert_pred === selectedSample.label ? '✓ ถูกต้อง' : '✕ ทำนายผิด'}
                  </span>
                </div>
                <div className="text-sm font-semibold text-white">
                  ผลทำนาย: {selectedSample.bert_pred === 1 ? 'Positive (เชิงบวก)' : 'Negative (เชิงลบ)'}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Confidence Score: {(selectedSample.bert_prob * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Error Cause Analysis */}
            <div className="p-4 bg-indigo-950/30 border border-indigo-900/40 rounded-xl space-y-1.5">
              <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>การวิเคราะห์สาเหตุความคลาดเคลื่อน (Root Cause Analysis):</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedSample.reason}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedSample(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-medium cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
