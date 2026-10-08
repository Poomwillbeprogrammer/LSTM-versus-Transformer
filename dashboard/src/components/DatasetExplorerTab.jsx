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
  Sparkles,
  Flame,
  Zap,
  Clock,
  ArrowRight
} from 'lucide-react';
import dataset500 from '../data/dataset_500.json';

// Helper to highlight trigger words in review text
function renderHighlightedText(text) {
  if (!text) return null;
  const tokens = text.split(/(\s+|[.,\/#!$%\^&\*;:{}=\-_`~()])/);
  
  const negators = new Set(['not', "n't", 'never', 'barely', 'hardly', 'no', 'none', 'nothing', 'neither', 'nor']);
  const contrasts = new Set(['but', 'however', 'although', 'though', 'yet', 'nevertheless', 'nonetheless', 'despite', 'whereas']);
  const sentiments = new Set(['bad', 'worst', 'terrible', 'awful', 'horrible', 'boring', 'poor', 'waste', 'disaster', 'dull', 'good', 'great', 'excellent', 'masterpiece', 'brilliant', 'wonderful', 'amazing', 'stunning', 'best', 'superb', 'watchable']);

  return tokens.map((part, idx) => {
    const clean = part.toLowerCase().trim();
    if (negators.has(clean)) {
      return (
        <mark key={idx} className="bg-rose-500/25 text-rose-300 px-1 py-0.5 rounded font-bold border border-rose-500/40">
          {part}
        </mark>
      );
    }
    if (contrasts.has(clean)) {
      return (
        <mark key={idx} className="bg-amber-500/25 text-amber-300 px-1 py-0.5 rounded font-bold border border-amber-500/40">
          {part}
        </mark>
      );
    }
    if (sentiments.has(clean)) {
      return (
        <mark key={idx} className="bg-cyan-500/20 text-cyan-300 px-1 py-0.5 rounded font-semibold border border-cyan-500/30">
          {part}
        </mark>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

export default function DatasetExplorerTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('bert_win'); // default to bert_win to showcase 183 cases!
  const [selectedSample, setSelectedSample] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Filter counts
  const counts = useMemo(() => {
    return {
      all: dataset500.length,
      bert_win: dataset500.filter(s => s.category === 'bert_win').length,
      rc_negation: dataset500.filter(s => s.category === 'bert_win' && s.root_cause_group === 'negation').length,
      rc_contrastive: dataset500.filter(s => s.category === 'bert_win' && s.root_cause_group === 'contrastive').length,
      rc_decay: dataset500.filter(s => s.category === 'bert_win' && s.root_cause_group === 'decay').length,
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
      if (activeFilter === 'rc_negation' && (item.category !== 'bert_win' || item.root_cause_group !== 'negation')) return false;
      if (activeFilter === 'rc_contrastive' && (item.category !== 'bert_win' || item.root_cause_group !== 'contrastive')) return false;
      if (activeFilter === 'rc_decay' && (item.category !== 'bert_win' || item.root_cause_group !== 'decay')) return false;
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
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0c0a08] hover:bg-[#221a12] text-[#e2d7c5] border border-[#2e251b] rounded-xl text-xs font-mono transition-all cursor-pointer shrink-0 touch-manipulation min-h-[40px]"
          >
            <Download className="w-3.5 h-3.5 text-[#d99f3d]" />
            <span>Export Filtered CSV ({filteredData.length})</span>
          </button>
        </div>

        {/* Filter Pills with Horizontal Scroll on Mobile */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#2e251b] overflow-x-auto no-scrollbar pb-1 touch-pan-x">
          <button
            onClick={() => { setActiveFilter('all'); setPage(1); }}
            className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all touch-manipulation min-h-[38px] flex items-center shrink-0 ${
              activeFilter === 'all'
                ? 'bg-[#c58a2e] text-[#0c0a08] font-bold shadow-md shadow-[#8d5c1a]/30'
                : 'bg-[#0c0a08] text-[#9e917f] hover:text-[#fdfbf7] border border-[#2e251b]'
            }`}
          >
            ทั้งหมด ({counts.all})
          </button>

          <button
            onClick={() => { setActiveFilter('bert_win'); setPage(1); }}
            className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 touch-manipulation min-h-[38px] shrink-0 ${
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
            className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 touch-manipulation min-h-[38px] shrink-0 ${
              activeFilter === 'lstm_win'
                ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/30'
                : 'bg-[#0c0a08] text-sky-400 hover:bg-sky-950/30 border border-sky-900/40'
            }`}
          >
            <span>LSTM ชนะ (BERT ผิด)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-sky-950/60 font-mono font-bold text-sky-300">
              {counts.lstm_win}
            </span>
          </button>

          <button
            onClick={() => { setActiveFilter('both_correct'); setPage(1); }}
            className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all touch-manipulation min-h-[38px] flex items-center shrink-0 ${
              activeFilter === 'both_correct'
                ? 'bg-emerald-600 text-white font-bold shadow'
                : 'bg-[#0c0a08] text-emerald-400 hover:bg-emerald-950/30 border border-emerald-900/40'
            }`}
          >
            ทายถูกทั้งคู่ ({counts.both_correct})
          </button>

          <button
            onClick={() => { setActiveFilter('both_wrong'); setPage(1); }}
            className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all touch-manipulation min-h-[38px] flex items-center shrink-0 ${
              activeFilter === 'both_wrong'
                ? 'bg-rose-600 text-white font-bold shadow'
                : 'bg-[#0c0a08] text-rose-400 hover:bg-rose-950/30 border border-rose-900/40'
            }`}
          >
            ทายผิดทั้งคู่ ({counts.both_wrong})
          </button>

          <button
            onClick={() => { setActiveFilter('negation'); setPage(1); }}
            className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all touch-manipulation min-h-[38px] flex items-center shrink-0 ${
              activeFilter === 'negation'
                ? 'bg-[#8d5c1a] text-[#fdfbf7] font-bold shadow'
                : 'bg-[#0c0a08] text-[#e5c158] hover:bg-[#2a1e0f] border border-[#4d3716]'
            }`}
          >
            มีคำปฏิเสธ (Negation: {counts.negation})
          </button>

          <button
            onClick={() => { setActiveFilter('long'); setPage(1); }}
            className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all touch-manipulation min-h-[38px] flex items-center shrink-0 ${
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
          <Search className="w-4 h-4 text-[#9e917f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            placeholder="ค้นหาตามข้อความรีวิว เช่น 'ending', 'acting', 'boring' หรือพิมพ์ ID ตัวอย่าง..."
            className="w-full bg-[#0c0a08] border border-[#2e251b] rounded-xl pl-10 pr-4 py-2.5 text-base sm:text-sm text-[#fdfbf7] placeholder-[#9e917f] focus:outline-none focus:border-[#c58a2e] transition-colors min-h-[44px]"
          />
        </div>
      </div>

      {/* 3 Error Archetypes Executive Summary (Root Cause Analysis of 183 Cases) */}
      <div className="bg-[#16120e]/95 border border-[#4d3716] rounded-2xl p-6 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2e251b] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#c58a2e]/20 text-[#f0c674] font-mono text-[11px] font-bold uppercase tracking-wider border border-[#c58a2e]/40">
                Root Cause Analysis
              </span>
              <span className="text-xs font-mono text-[#9e917f]">183 เคส (36.6% ของชุดทดสอบ)</span>
            </div>
            <h3 className="text-lg font-bold text-[#fdfbf7] mt-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#f0c674]" />
              <span>ผ่าชันสูตร 183 เคส: 3 รูปแบบหลักที่ BERT ชนะ LSTM ขาดลอย</span>
            </h3>
            <p className="text-xs text-[#ab9b87] mt-1">
              คลิกการ์ดใดการ์ดหนึ่งด้านล่าง เพื่อกรองเจาะลึกเฉพาะกลุ่มตัวอย่างและสาเหตุความผิดพลาดทันที
            </p>
          </div>

          {['rc_negation', 'rc_contrastive', 'rc_decay'].includes(activeFilter) && (
            <button
              onClick={() => { setActiveFilter('bert_win'); setPage(1); }}
              className="px-3.5 py-1.5 rounded-xl bg-[#c58a2e] text-[#0c0a08] font-bold text-xs cursor-pointer shadow-sm hover:bg-[#d99f3d] transition-all flex items-center gap-1.5 self-start sm:self-center"
            >
              <span>รีเซ็ตแสดงครบทั้ง 183 เคส</span>
            </button>
          )}
        </div>

        {/* 3 Archetype Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Group 1: Negation Flipping */}
          <div
            onClick={() => { setActiveFilter(activeFilter === 'rc_negation' ? 'bert_win' : 'rc_negation'); setPage(1); }}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
              activeFilter === 'rc_negation'
                ? 'bg-orange-950/40 border-orange-500 ring-2 ring-orange-500/40 shadow-lg shadow-orange-500/10'
                : 'bg-[#0c0a08]/80 border-[#2e251b] hover:border-orange-500/50 hover:bg-[#1a120b]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>1. Negation Flipping</span>
                </span>
                <span className="font-mono text-xs font-bold text-orange-300">
                  {counts.rc_negation} เคส ({((counts.rc_negation / counts.bert_win) * 100).toFixed(1)}%)
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#fdfbf7] mt-2">
                การกลับขั้วคำปฏิเสธ
              </h4>
              <p className="text-xs text-[#ab9b87] mt-1.5 leading-relaxed">
                คำปฏิเสธ (เช่น <em>not, barely, never, hardly</em>) อยู่ห่างจากคำคุณศัพท์ LSTM ถูก Recency Bias ท้ายประโยคดึงดูดจนทำนายผิดขั้ว ส่วน BERT ใช้ Attention ผูกคู่คำปฏิเสธได้ทันที
              </p>
            </div>
            
            <div className="pt-2 border-t border-[#262019] flex items-center justify-between text-[11px] font-mono text-orange-400/90 group-hover:text-orange-300">
              <span>{activeFilter === 'rc_negation' ? '✓ กำลังแสดง 75 เคสนี้' : 'คลิกกรอง 75 เคสนี้'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Group 2: Contrastive Shift */}
          <div
            onClick={() => { setActiveFilter(activeFilter === 'rc_contrastive' ? 'bert_win' : 'rc_contrastive'); setPage(1); }}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
              activeFilter === 'rc_contrastive'
                ? 'bg-yellow-950/40 border-yellow-500 ring-2 ring-yellow-500/40 shadow-lg shadow-yellow-500/10'
                : 'bg-[#0c0a08]/80 border-[#2e251b] hover:border-yellow-500/50 hover:bg-[#1a140a]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  <span>2. Contrastive Shift</span>
                </span>
                <span className="font-mono text-xs font-bold text-yellow-300">
                  {counts.rc_contrastive} เคส ({((counts.rc_contrastive / counts.bert_win) * 100).toFixed(1)}%)
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#fdfbf7] mt-2">
                คำเชื่อมขัดแย้งกลับทิศทาง
              </h4>
              <p className="text-xs text-[#ab9b87] mt-1.5 leading-relaxed">
                ประโยคมีคำเชื่อมขัดแย้ง (เช่น <em>but, however, although, despite</em>) สลับอารมณ์กลางประโยค LSTM ลืมอนุประโยคแรกหรือสับสน ส่วน BERT ตรวจจับโครงสร้างประโยคสองทิศทางได้สมบูรณ์
              </p>
            </div>

            <div className="pt-2 border-t border-[#262019] flex items-center justify-between text-[11px] font-mono text-yellow-400/90 group-hover:text-yellow-300">
              <span>{activeFilter === 'rc_contrastive' ? '✓ กำลังแสดง 58 เคสนี้' : 'คลิกกรอง 58 เคสนี้'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Group 3: Long-Distance Decay */}
          <div
            onClick={() => { setActiveFilter(activeFilter === 'rc_decay' ? 'bert_win' : 'rc_decay'); setPage(1); }}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
              activeFilter === 'rc_decay'
                ? 'bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/40 shadow-lg shadow-purple-500/10'
                : 'bg-[#0c0a08]/80 border-[#2e251b] hover:border-purple-500/50 hover:bg-[#16101c]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>3. Long-Distance Decay</span>
                </span>
                <span className="font-mono text-xs font-bold text-purple-300">
                  {counts.rc_decay} เคส ({((counts.rc_decay / counts.bert_win) * 100).toFixed(1)}%)
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#fdfbf7] mt-2">
                ข้อความยาวความจำเลือนหาย
              </h4>
              <p className="text-xs text-[#ab9b87] mt-1.5 leading-relaxed">
                รีวิวมีความยาวสูง (เฉลี่ย 114 คำ) สารสนเทศต้นประโยคเจือจางลงตาม Forget Gate จนเหลือ &lt;10% เวกเตอร์ $h_T$ สูญเสียใจความหลัก ส่วน BERT มี Path Length = 1 คงข้อมูลครบถ้วน
              </p>
            </div>

            <div className="pt-2 border-t border-[#262019] flex items-center justify-between text-[11px] font-mono text-purple-400/90 group-hover:text-purple-300">
              <span>{activeFilter === 'rc_decay' ? '✓ กำลังแสดง 50 เคสนี้' : 'คลิกกรอง 50 เคสนี้'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
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
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono text-[#9e917f] font-bold">#{item.id}</span>
                    <span className="text-[11px] font-mono text-[#ab9b87]">{item.token_count} tokens</span>
                    {item.root_cause_group && (
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold font-mono flex items-center gap-1 ${
                        item.root_cause_group === 'negation'
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                          : item.root_cause_group === 'contrastive'
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}>
                        {item.root_cause_group === 'negation' && <Flame className="w-2.5 h-2.5 text-orange-400" />}
                        {item.root_cause_group === 'contrastive' && <Zap className="w-2.5 h-2.5 text-yellow-400" />}
                        {item.root_cause_group === 'decay' && <Clock className="w-2.5 h-2.5 text-purple-400" />}
                        <span>{item.root_cause_name}</span>
                      </span>
                    )}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 border-t border-[#2e251b] text-xs text-[#9e917f]">
        <div className="flex items-center gap-1.5 text-xs text-[#9e917f]">
          <span>แสดงรายการที่</span>
          <span className="font-mono font-semibold text-[#fdfbf7] bg-[#221a12] px-2 py-0.5 rounded border border-[#2e251b]">
            {filteredData.length === 0 ? 0 : (page - 1) * pageSize + 1} – {Math.min(filteredData.length, page * pageSize)}
          </span>
          <span>จากทั้งหมด</span>
          <span className="font-mono font-semibold text-[#f0c674] bg-[#221a12] px-2 py-0.5 rounded border border-[#2e251b]">
            {filteredData.length}
          </span>
          <span>ตัวอย่าง</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center bg-[#0c0a08] border border-[#2e251b] rounded-lg disabled:opacity-40 hover:bg-[#221a12] text-[#fdfbf7] cursor-pointer touch-manipulation"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-[#e2d7c5] px-2">หน้า {page} / {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center bg-[#0c0a08] border border-[#2e251b] rounded-lg disabled:opacity-40 hover:bg-[#221a12] text-[#fdfbf7] cursor-pointer touch-manipulation"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Review Inspector Modal / Bottom Sheet on Mobile */}
      {selectedSample && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="bg-[#16120e] border border-[#4d3716] rounded-t-2xl sm:rounded-2xl max-w-2xl w-full p-4 sm:p-6 space-y-3.5 sm:space-y-5 shadow-2xl relative max-h-[88vh] sm:max-h-[90vh] overflow-y-auto">
            {/* Mobile Sheet Drag Handle */}
            <div className="w-12 h-1 bg-[#4d3716] rounded-full mx-auto sm:hidden mb-1 shrink-0" />

            <button
              onClick={() => setSelectedSample(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 min-w-[44px] min-h-[44px] p-2.5 rounded-lg bg-[#221a12] hover:bg-[#2e2319] text-[#9e917f] hover:text-[#fdfbf7] border border-[#2e251b] cursor-pointer flex items-center justify-center touch-manipulation"
              aria-label="Close dialog"
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
              <h3 className="text-base sm:text-lg font-bold text-[#fdfbf7] mt-1">
                การวิเคราะห์เจาะลึกตัวอย่างรีวิว (Sample Detail Inspector)
              </h3>
            </div>

            {/* Diagnostic Badge for Root Cause */}
            {selectedSample.root_cause_name && (
              <div className={`p-3 sm:p-3.5 rounded-xl border flex items-center justify-between text-xs flex-wrap gap-2 ${
                selectedSample.root_cause_group === 'negation'
                  ? 'bg-orange-950/40 border-orange-500/50 text-orange-200'
                  : selectedSample.root_cause_group === 'contrastive'
                  ? 'bg-yellow-950/40 border-yellow-500/50 text-yellow-200'
                  : 'bg-purple-950/40 border-purple-500/50 text-purple-200'
              }`}>
                <div className="flex items-center gap-2 font-bold">
                  {selectedSample.root_cause_group === 'negation' && <Flame className="w-4 h-4 text-orange-400" />}
                  {selectedSample.root_cause_group === 'contrastive' && <Zap className="w-4 h-4 text-yellow-400" />}
                  {selectedSample.root_cause_group === 'decay' && <Clock className="w-4 h-4 text-purple-400" />}
                  <span>สาเหตุหลัก: {selectedSample.root_cause_name} ({selectedSample.root_cause_name_th})</span>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-black/40 border border-white/10">
                  1 ใน 3 Error Archetypes
                </span>
              </div>
            )}

            {/* Actual Text with Highlights */}
            <div className="p-3.5 sm:p-4 bg-[#0c0a08] border border-[#2e251b] rounded-xl space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#9e917f]">ข้อความรีวิวพร้อมไฮไลต์คำกระตุ้น (Review Text & Key Triggers):</span>
                <span className="text-[11px] font-mono text-[#716556]">{selectedSample.token_count} คำ</span>
              </div>
              <p className="text-xs sm:text-sm text-[#fdfbf7] leading-relaxed font-sans">
                "{renderHighlightedText(selectedSample.text)}"
              </p>

              {/* Highlighting Legend */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 text-[10px] font-mono text-[#9e917f] border-t border-[#221a12]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-rose-500/30 border border-rose-500/60 inline-block" />
                  <span>คำปฏิเสธ (Negators)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500/30 border border-amber-500/60 inline-block" />
                  <span>คำเชื่อมขัดแย้ง (Contrast)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-cyan-500/30 border border-cyan-500/60 inline-block" />
                  <span>คำบอกความรู้สึก (Sentiment)</span>
                </span>
              </div>
            </div>

            {/* Prediction Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* LSTM Box */}
              <div className="p-3.5 sm:p-4 bg-[#0c0a08]/80 border border-sky-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-sky-400">LSTM Baseline:</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    selectedSample.lstm_pred === selectedSample.label 
                      ? 'bg-emerald-500/20 text-[#34d399]' 
                      : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {selectedSample.lstm_pred === selectedSample.label ? '✓ ถูกต้อง' : '✕ ทำนายผิด'}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#fdfbf7]">
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
                className="px-5 py-2.5 bg-[#c58a2e] hover:bg-[#d99f3d] text-[#0c0a08] font-bold rounded-xl text-xs cursor-pointer shadow-md shadow-[#8d5c1a]/30 transition-all touch-manipulation min-h-[42px]"
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
