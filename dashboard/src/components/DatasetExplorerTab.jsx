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
      <div className="bg-[#16120e]/95 border border-[#2e251b] rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#d99f3d] font-bold uppercase tracking-wider">
              500-Sample Test Set Inspector
            </span>
            <h2 className="text-xl font-bold text-[#fdfbf7] mt-1">
              สำรวจชุดข้อมูลทดสอบจริง 500 ตัวอย่าง (IMDb Test Benchmark)
            </h2>
            <p className="text-xs sm:text-sm text-[#ab9b87] mt-1">
              คลังข้อมูลจริงที่ใช้ประเมินผล (สุ่มด้วย Seed 42 สมดุลบวก/ลบ) พร้อมการวิเคราะห์สาเหตุความคลาดเคลื่อนรายประโยค
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0c0a08] hover:bg-[#221a12] text-[#e2d7c5] border border-[#2e251b] rounded-xl text-xs font-mono transition-all cursor-pointer shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-[#d99f3d]" />
            <span>Export Filtered CSV ({filteredData.length})</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-[#2e251b]">
          <button
            onClick={() => { setActiveFilter('all'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
              activeFilter === 'all'
                ? 'bg-[#c58a2e] text-[#0c0a08] font-bold shadow-md shadow-[#8d5c1a]/30'
                : 'bg-[#0c0a08] text-[#9e917f] hover:text-[#fdfbf7] border border-[#2e251b]'
            }`}
          >
            ทั้งหมด ({counts.all})
          </button>

          <button
            onClick={() => { setActiveFilter('bert_win'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
              activeFilter === 'bert_win'
                ? 'bg-[#c58a2e] text-[#0c0a08] font-bold shadow-md shadow-[#8d5c1a]/30'
                : 'bg-[#0c0a08] text-[#f0c674] hover:bg-[#20170e] border border-[#c58a2e]/40'
            }`}
          >
            <span>BERT ชนะ (LSTM ผิด)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#3a2815] font-mono font-bold text-[#f0c674]">
              {counts.bert_win}
            </span>
          </button>

          <button
            onClick={() => { setActiveFilter('lstm_win'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
              activeFilter === 'lstm_win'
                ? 'bg-[#d97706] text-[#0c0a08] font-bold shadow-md shadow-[#d97706]/30'
                : 'bg-[#0c0a08] text-amber-400 hover:bg-amber-950/30 border border-amber-900/40'
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
                ? 'bg-emerald-600 text-white font-bold shadow'
                : 'bg-[#0c0a08] text-emerald-400 hover:bg-emerald-950/30 border border-emerald-900/40'
            }`}
          >
            ทายถูกทั้งคู่ ({counts.both_correct})
          </button>

          <button
            onClick={() => { setActiveFilter('both_wrong'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
              activeFilter === 'both_wrong'
                ? 'bg-rose-600 text-white font-bold shadow'
                : 'bg-[#0c0a08] text-rose-400 hover:bg-rose-950/30 border border-rose-900/40'
            }`}
          >
            ทายผิดทั้งคู่ ({counts.both_wrong})
          </button>

          <button
            onClick={() => { setActiveFilter('negation'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
              activeFilter === 'negation'
                ? 'bg-[#8d5c1a] text-[#fdfbf7] font-bold shadow'
                : 'bg-[#0c0a08] text-[#e5c158] hover:bg-[#2a1e0f] border border-[#4d3716]'
            }`}
          >
            มีคำปฏิเสธ (Negation: {counts.negation})
          </button>

          <button
            onClick={() => { setActiveFilter('long'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
              activeFilter === 'long'
                ? 'bg-[#382f25] text-[#fdfbf7] font-bold shadow'
                : 'bg-[#0c0a08] text-[#9e917f] hover:text-[#fdfbf7] border border-[#2e251b]'
            }`}
          >
            ข้อความยาว &gt;100 คำ ({counts.long})
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-[#9e917f] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            placeholder="ค้นหาตามข้อความรีวิว เช่น 'ending', 'acting', 'boring' หรือพิมพ์ ID ตัวอย่าง..."
            className="w-full bg-[#0c0a08] border border-[#2e251b] rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#fdfbf7] placeholder-[#9e917f] focus:outline-none focus:border-[#c58a2e] transition-colors"
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
              className="bg-[#16120e]/95 border border-[#2e251b] hover:border-[#c58a2e]/60 rounded-xl p-4 transition-all cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Header row: ID & Actual Label */}
                <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#2e251b] text-xs">
                  <span className="font-mono text-[#9e917f] font-bold">#{item.id}</span>
                  <span className="text-[11px] font-mono text-[#ab9b87]">{item.token_count} tokens</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    item.label === 1 
                      ? 'bg-emerald-500/15 text-[#34d399] border border-emerald-500/30' 
                      : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                  }`}>
                    Actual: {item.label_name}
                  </span>
                </div>

                {/* Snippet */}
                <p className="text-xs text-[#e2d7c5] line-clamp-3 leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              {/* Prediction Comparison Footer */}
              <div className="mt-4 pt-3 border-t border-[#2e251b] space-y-2">
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
                      ? 'bg-[#c58a2e]/15 border-[#c58a2e]/40 text-[#f0c674]' 
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  }`}>
                    <span className="flex items-center gap-1 font-sans">
                      {isBertCorrect ? <CheckCircle className="w-3 h-3 text-[#d99f3d]" /> : <XCircle className="w-3 h-3 text-rose-400" />}
                      BERT:
                    </span>
                    <span>{item.bert_pred === 1 ? 'Pos' : 'Neg'}</span>
                  </div>
                </div>

                {/* Category Pill Tag */}
                <div className="flex items-center justify-between text-[10px] text-[#9e917f]">
                  <span className="capitalize">{item.category.replace('_', ' ')}</span>
                  <span className="text-[#d99f3d] group-hover:underline flex items-center gap-0.5">
                    เจาะลึก <Eye className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between py-4 border-t border-[#2e251b] text-xs text-[#9e917f]">
        <span>
          แสดง {Math.min(filteredData.length, (page - 1) * pageSize + 1)} - {Math.min(filteredData.length, page * pageSize)} จากทั้งหมด {filteredData.length} ตัวอย่าง
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 bg-[#0c0a08] border border-[#2e251b] rounded-lg disabled:opacity-40 hover:bg-[#221a12] text-[#fdfbf7] cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-[#e2d7c5]">หน้า {page} / {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1.5 bg-[#0c0a08] border border-[#2e251b] rounded-lg disabled:opacity-40 hover:bg-[#221a12] text-[#fdfbf7] cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Review Inspector Modal / Drawer */}
      {selectedSample && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#16120e] border border-[#4d3716] rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedSample(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#221a12] hover:bg-[#2e2319] text-[#9e917f] hover:text-[#fdfbf7] border border-[#2e251b] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-[#d99f3d] font-bold">Sample #{selectedSample.id}</span>
                <span className="text-[#5a4b3c]">•</span>
                <span className="text-[#9e917f]">{selectedSample.token_count} tokens</span>
                <span className="text-[#5a4b3c]">•</span>
                <span className="capitalize text-[#e2d7c5]">{selectedSample.category.replace('_', ' ')}</span>
              </div>
              <h3 className="text-lg font-bold text-[#fdfbf7] mt-1">
                การวิเคราะห์เจาะลึกตัวอย่างรีวิว (Sample Detail Inspector)
              </h3>
            </div>

            {/* Actual Text */}
            <div className="p-4 bg-[#0c0a08] border border-[#2e251b] rounded-xl space-y-2">
              <span className="text-xs font-semibold text-[#9e917f] block">ข้อความรีวิว (Review Text):</span>
              <p className="text-sm text-[#fdfbf7] leading-relaxed font-sans">
                "{selectedSample.text}"
              </p>
            </div>

            {/* Prediction Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* LSTM Box */}
              <div className="p-4 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">LSTM Baseline:</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    selectedSample.lstm_pred === selectedSample.label 
                      ? 'bg-emerald-500/20 text-[#34d399]' 
                      : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {selectedSample.lstm_pred === selectedSample.label ? '✓ ถูกต้อง' : '✕ ทำนายผิด'}
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#fdfbf7]">
                  ผลทำนาย: {selectedSample.lstm_pred === 1 ? 'Positive (เชิงบวก)' : 'Negative (เชิงลบ)'}
                </div>
                <div className="text-xs text-[#9e917f] font-mono">
                  Confidence Score: {(selectedSample.lstm_prob * 100).toFixed(1)}%
                </div>
              </div>

              {/* BERT Box */}
              <div className="p-4 bg-[#0c0a08]/80 border border-[#2e251b] rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#d99f3d]">BERT Fine-tuned:</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    selectedSample.bert_pred === selectedSample.label 
                      ? 'bg-emerald-500/20 text-[#34d399]' 
                      : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {selectedSample.bert_pred === selectedSample.label ? '✓ ถูกต้อง' : '✕ ทำนายผิด'}
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#fdfbf7]">
                  ผลทำนาย: {selectedSample.bert_pred === 1 ? 'Positive (เชิงบวก)' : 'Negative (เชิงลบ)'}
                </div>
                <div className="text-xs text-[#9e917f] font-mono">
                  Confidence Score: {(selectedSample.bert_prob * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Error Cause Analysis */}
            <div className="p-4 bg-[#2a1d0f]/60 border border-[#4d3716] rounded-xl space-y-1.5">
              <span className="text-xs font-bold text-[#f0c674] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d99f3d]" />
                <span>การวิเคราะห์สาเหตุความคลาดเคลื่อน (Root Cause Analysis):</span>
              </span>
              <p className="text-xs text-[#e2d7c5] leading-relaxed">
                {selectedSample.reason}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedSample(null)}
                className="px-4 py-2 bg-[#c58a2e] hover:bg-[#d99f3d] text-[#0c0a08] font-bold rounded-xl text-xs cursor-pointer shadow-md shadow-[#8d5c1a]/30 transition-all"
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
