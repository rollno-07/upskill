/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, CheckCircle2, Bookmark, BookmarkCheck, ArrowRight, ArrowLeft, 
  Sparkles, Code, Keyboard, Sliders, CheckCircle, HelpCircle, GraduationCap,
  Percent, Star, Info, Moon, Sun, Laptop, FileText
} from 'lucide-react';
import { questionsData } from './data/questions';
import { CategoryType, QuestionData } from './types';
import { InteractiveDiagram } from './components/InteractiveDiagrams';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [masteredIds, setMasteredIds] = useState<number[]>([]);

  // Load mastered questions list from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('a11y_mastered_questions');
    if (saved) {
      try {
        setMasteredIds(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading localStorage progress", e);
      }
    }
  }, []);

  // Sync mastered questions to localStorage
  const toggleMastery = (id: number) => {
    setMasteredIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('a11y_mastered_questions', JSON.stringify(next));
      return next;
    });
  };

  // Find active question details
  const activeQuestion = useMemo(() => {
    return questionsData.find((q) => q.id === activeQuestionId) || questionsData[0];
  }, [activeQuestionId]);

  // Categories helper
  const categoriesList = [
    { value: 'all', label: 'All Questions', icon: GraduationCap, color: 'bg-cyan-50 border-cyan-200 text-cyan-700' },
    { value: 'core', label: 'Core Concepts', icon: HelpCircle, color: 'bg-rose-50 border-rose-200 text-rose-700' },
    { value: 'semantics', label: 'HTML Semantics', icon: Code, color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
    { value: 'aria', label: 'ARIA Rules', icon: Sliders, color: 'bg-cyan-50 border-cyan-200 text-cyan-700' },
    { value: 'keyboard', label: 'Keyboard Nav', icon: Keyboard, color: 'bg-cyan-50 border-cyan-200 text-cyan-700' },
    { value: 'design', label: 'Visual & Design', icon: Star, color: 'bg-cyan-50 border-cyan-200 text-cyan-700' },
    { value: 'testing', label: 'Testing & Dropdowns', icon: CheckCircle, color: 'bg-teal-50 border-teal-200 text-teal-700' },
  ];

  // Filtering logic
  const filteredQuestions = useMemo(() => {
    return questionsData.filter((q) => {
      const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
      const matchesSearch = 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.conceptName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle previous/next buttons
  const navigateQuestion = (direction: 'next' | 'prev') => {
    const currentIndex = filteredQuestions.findIndex((q) => q.id === activeQuestionId);
    if (currentIndex === -1) return;

    if (direction === 'next' && currentIndex < filteredQuestions.length - 1) {
      setActiveQuestionId(filteredQuestions[currentIndex + 1].id);
    } else if (direction === 'prev' && currentIndex > 0) {
      setActiveQuestionId(filteredQuestions[currentIndex - 1].id);
    }
  };

  // Compute stats
  const stats = useMemo(() => {
    const total = questionsData.length;
    const mastered = masteredIds.length;
    const percent = Math.round((mastered / total) * 100);
    return { total, mastered, percent };
  }, [masteredIds]);

  return (
    <div className="min-h-screen bg-[#0A0C10] text-slate-200 font-sans selection:bg-cyan-950 selection:text-cyan-200">
      {/* Visual Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-cyan-600 focus:text-white focus:font-bold focus:rounded-lg focus:shadow-md"
      >
        Skip to Main Content
      </a>

      {/* Decorative Top Accent Line */}
      <div className="h-1 bg-gradient-to-r from-cyan-900 via-cyan-600 to-cyan-700 opacity-60" />

      {/* Primary Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Dashboard section */}
        <header className="mb-8" role="banner">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-900/40 tracking-wider uppercase font-mono">
                  Study & Sandbox Guide
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium font-mono">
                  ● WCAG 2.2 compliant
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
                Web Accessibility (a11y) Interview Prep
              </h1>
              <p className="mt-1 text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Master 40 critical frontend web accessibility questions with detailed answers, code examples, and interactive playground widgets.
              </p>
            </div>

            {/* Visual Progress Mastery Dashboard Bento Card */}
            <div className="bg-[#14171D] border border-slate-800 rounded-2xl p-4 shadow-md min-w-[280px] flex-shrink-0 bg-gradient-to-br from-[#14171D] to-[#1A1E26]">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 font-mono">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  STUDY PROGRESS
                </span>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-900/40">
                  {stats.percent}% Complete
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden mb-2 border border-slate-800/60">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-cyan-500 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(6,182,212,0.3)]"
                  style={{ width: `${stats.percent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                You have mastered <strong className="text-white">{stats.mastered}</strong> of <strong className="text-white">{stats.total}</strong> crucial concepts.
              </p>
            </div>
          </div>
        </header>

        {/* Filter Toolbar / Search */}
        <section className="mb-8" aria-label="Filters and Search panel">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-[#14171D]/40 border border-slate-800/60 p-3.5 rounded-2xl shadow-sm">
            {/* Category selection */}
            <div className="flex gap-2 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none" role="tablist" aria-label="Categories filter">
              {categoriesList.map((cat) => {
                const IconComp = cat.icon;
                const isSelected = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => {
                      setSelectedCategory(cat.value as any);
                      // Set default first question of this category
                      const matching = questionsData.filter((q) => cat.value === 'all' || q.category === cat.value);
                      if (matching.length > 0) {
                        setActiveQuestionId(matching[0].id);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
                      isSelected 
                        ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white border-transparent shadow-lg shadow-cyan-500/10' 
                        : 'bg-[#14171D] hover:bg-[#1C1F26] text-slate-300 border-slate-850'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input block */}
            <div className="relative max-w-md w-full">
              <label htmlFor="search-field" className="sr-only">Search study topics</label>
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-500" />
              </div>
              <input
                id="search-field"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search contrast, keyboard, focus, ARIA..."
                className="w-full pl-9 pr-10 py-2.5 text-xs bg-[#14171D] border border-slate-850 rounded-full text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/80 focus:border-cyan-500/80 shadow-inner font-sans"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 hover:text-slate-300 font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Master Detail Bento Layout */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="main-content">
          
          {/* LEFT PANEL: List of matched questions (col-span-4) */}
          <section className="lg:col-span-4 bg-[#14171D] border border-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col" aria-label="Question list index">
            <div className="p-4 bg-[#1A1D23] border-b border-slate-800/85 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                Questions Indexed ({filteredQuestions.length})
              </h2>
              <span className="text-[10px] text-slate-500 font-medium font-mono">SCROLL TO BROWSE</span>
            </div>

            <div className="divide-y divide-slate-800/60 max-h-[640px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-850 scrollbar-track-transparent">
              {filteredQuestions.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  <Info className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                  <p className="text-xs font-bold">No questions matched.</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Try widening your search terms.</p>
                </div>
              ) : (
                filteredQuestions.map((q) => {
                  const isActive = q.id === activeQuestionId;
                  const isMastered = masteredIds.includes(q.id);
                  return (
                    <button
                      key={q.id}
                      onClick={() => setActiveQuestionId(q.id)}
                      className={`w-full text-left p-3.5 transition-all flex items-start gap-3 hover:bg-[#1A1D23]/30 ${
                        isActive ? 'bg-[#1A1D23]/60 border-l-4 border-l-indigo-500 pl-2.5' : 'border-l-4 border-l-transparent'
                      }`}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {/* Mastery badge bookmark */}
                      <span className="mt-0.5 flex-shrink-0">
                        {isMastered ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950/20" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-slate-700" title="Study Pending" />
                        )}
                      </span>

                      <div className="space-y-1 flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-slate-500">
                            Q{q.id.toString().padStart(2, '0')}
                          </span>
                          <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded font-mono uppercase tracking-wider ${
                            q.category === 'core' ? 'bg-rose-950/50 text-rose-300 border border-rose-900/30' :
                            q.category === 'semantics' ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-900/30' :
                            q.category === 'aria' ? 'bg-cyan-950/50 text-cyan-300 border border-cyan-900/30' :
                            q.category === 'keyboard' ? 'bg-cyan-950/50 text-cyan-300 border border-cyan-900/30' :
                            q.category === 'design' ? 'bg-cyan-950/50 text-cyan-300 border border-cyan-900/30' : 
                            'bg-teal-950/50 text-teal-300 border border-teal-900/30'
                          }`}>
                            {q.category}
                          </span>
                        </div>
                        <h3 className={`text-xs font-semibold leading-snug transition-colors ${isActive ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}>
                          {q.question}
                        </h3>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </section>

          {/* RIGHT PANEL: Question detailed view workspace (col-span-8) */}
          <section className="lg:col-span-8 space-y-6" aria-labelledby="active-question-header">
            
            {/* Core Question Bento Block */}
            <div className="bg-[#14171D] border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[140px] shadow-lg">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500"></div>
              
              <div className="pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-cyan-950/80 text-cyan-400 border border-cyan-900/30 font-mono">
                      {activeQuestion.category} concept
                    </span>
                    <span className="text-xs font-semibold text-slate-500 font-mono">
                      Question {activeQuestion.id} of 40
                    </span>
                  </div>
                  <h2 id="active-question-header" className="text-xl sm:text-2xl font-light text-slate-100 tracking-tight font-display leading-snug">
                    {activeQuestion.question}
                  </h2>
                </div>

                {/* Mastery status toggle button */}
                <button
                  onClick={() => toggleMastery(activeQuestion.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex-shrink-0 ${
                    masteredIds.includes(activeQuestion.id)
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40 hover:bg-emerald-900/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                      : 'bg-[#1E222B] hover:bg-[#252A36] text-slate-300 border-slate-750'
                  }`}
                >
                  {masteredIds.includes(activeQuestion.id) ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                      <span>Mastered</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4 text-slate-500" />
                      <span>Mark as Mastered</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Answer & Takeaways Bento Block */}
            <div className="bg-[#14171D] border border-slate-800 rounded-2xl p-6 shadow-lg space-y-6">
              
              {/* Detailed Academic Answer column */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider font-mono">
                  Detailed Answer Explanation
                </h3>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-[#0F1219] rounded-xl p-5 border border-slate-850/80 shadow-inner">
                  {activeQuestion.answer}
                </div>
              </div>

              {/* Key Takeaway Bullet points */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider font-mono">
                  High-Impact Takeaways
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeQuestion.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-normal bg-[#0F1219]/40 p-3 rounded-xl border border-slate-850/60 shadow-sm">
                      <span className="mt-0.5 text-cyan-400 font-extrabold flex-shrink-0">✓</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Code Comparison Bento Block */}
            {activeQuestion.goodCode && activeQuestion.badCode && (
              <div className="bg-[#14171D] border border-slate-800 rounded-2xl p-6 shadow-lg space-y-3">
                <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider font-mono">
                  Coding Implementation Reference
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Non-accessible snippet */}
                  <div className="border border-red-950/60 rounded-xl overflow-hidden bg-red-950/10">
                    <div className="px-3 py-2 bg-red-950/30 text-red-400 text-[10px] font-bold uppercase tracking-wider font-mono border-b border-red-950/60 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      🔴 Non-Accessible Code (Failure)
                    </div>
                    <pre className="p-4 text-[11px] font-mono text-red-300 overflow-x-auto leading-relaxed">
                      <code>{activeQuestion.badCode}</code>
                    </pre>
                  </div>

                  {/* Accessible snippet */}
                  <div className="border border-emerald-950/60 rounded-xl overflow-hidden bg-emerald-950/10">
                    <div className="px-3 py-2 bg-emerald-950/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider font-mono border-b border-emerald-950/60 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      🟢 Accessible Code (Recommended)
                    </div>
                    <pre className="p-4 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                      <code>{activeQuestion.goodCode}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* INTERACTIVE DIAGRAMS FOR EVERY SINGLE QUESTION CONCEPT */}
            <InteractiveDiagram id={activeQuestion.id} />

            {/* Bottom Nav Bento Toolbar */}
            <div className="bg-[#14171D] border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between gap-4">
              <button
                onClick={() => navigateQuestion('prev')}
                disabled={filteredQuestions.findIndex((q) => q.id === activeQuestionId) === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border bg-[#1E222B] border-slate-750 text-slate-300 hover:bg-[#252A36] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Concept</span>
              </button>

              <button
                onClick={() => navigateQuestion('next')}
                disabled={filteredQuestions.findIndex((q) => q.id === activeQuestionId) === filteredQuestions.length - 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-transparent bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)]"
              >
                <span>Next Concept</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </section>

        </main>

        {/* Global Footer element */}
        <footer className="mt-16 border-t border-slate-850 pt-8 pb-12 text-center text-slate-500" role="contentinfo">
          <p className="text-xs font-semibold text-slate-400">
            A11yScan Interview Prep Guide & Playgrounds
          </p>
          <p className="text-[11px] text-slate-500 mt-1.5 max-w-lg mx-auto leading-normal">
            This workspace includes an integrated screen reader simulator, live WCAG contrast analyzers, focus trapping testbeds, and ARIA tree inspectors. Feel free to connect headphones to listen to the simulated TTS vocalizations.
          </p>
        </footer>

      </div>
    </div>
  );
}
