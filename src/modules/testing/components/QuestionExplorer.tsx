import React, { useState } from 'react';
import { Question, Category } from '../types';
import { 
  Search, Filter, ChevronRight, Activity, Zap, Cpu, Globe, AlertCircle, Sparkles
} from 'lucide-react';

interface QuestionExplorerProps {
  questions: Question[];
  activeId: number;
  onSelectQuestion: (id: number) => void;
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (diff: string) => void;
}

export default function QuestionExplorer({
  questions,
  activeId,
  onSelectQuestion,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  selectedDifficulty,
  setSelectedDifficulty,
}: QuestionExplorerProps) {

  // Difficulty colors
  const diffStyles = {
    Beginner: 'text-emerald-400 border-emerald-500/10 bg-emerald-500/5',
    Intermediate: 'text-cyan-400 border-cyan-500/10 bg-cyan-500/5',
    Advanced: 'text-rose-400 border-rose-500/10 bg-rose-500/5'
  };

  // Filter questions based on states
  const filteredQuestions = questions.filter(q => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    
    const lowerQuery = searchQuery.toLowerCase();
    const matchesSearch = q.question.toLowerCase().includes(lowerQuery) || 
                          q.answer.toLowerCase().includes(lowerQuery) ||
                          q.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
                          
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const categoryIcons = {
    all: Activity,
    jest: Cpu,
    rtl: Zap,
    cypress: Globe
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col h-full backdrop-blur-sm hover:border-slate-700/50 transition-all duration-300">
      
      {/* Title */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/15 rounded-xl text-cyan-400">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Interview Explorer</h3>
            <p className="text-[11px] text-slate-500 font-medium">Filter by topic, level, and tags</p>
          </div>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20 font-semibold">
          {filteredQuestions.length} Items Found
        </span>
      </div>

      {/* Search Input Bar */}
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search question keywords or tags..."
          className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl pl-9.5 pr-4 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none transition-all duration-200"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300 text-xs font-mono"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Selection Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800/80 mb-4 shrink-0">
        {(['all', 'jest', 'rtl', 'cypress'] as Category[]).map((cat) => {
          const Icon = categoryIcons[cat];
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-1.5 px-1 rounded-lg text-[10px] md:text-xs font-semibold capitalize transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                isActive 
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/20' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{cat === 'rtl' ? 'RTL' : cat}</span>
            </button>
          );
        })}
      </div>

      {/* Difficulty Level Tabs */}
      <div className="flex gap-1 bg-slate-950/40 p-1 rounded-lg border border-slate-850 mb-4 text-[10px] font-mono shrink-0">
        {['all', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => {
          const isActive = selectedDifficulty === diff;
          return (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`flex-1 py-1 rounded text-center capitalize transition ${
                isActive 
                  ? 'bg-slate-800 text-cyan-300 font-bold border border-slate-700/50' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {diff === 'all' ? 'All levels' : diff}
            </button>
          );
        })}
      </div>

      {/* List of Questions (scrollable) */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[440px] md:max-h-[500px] lg:max-h-[580px] scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {filteredQuestions.length === 0 ? (
          <div className="py-12 text-center text-slate-500 flex flex-col items-center justify-center space-y-2 border border-dashed border-slate-800 rounded-xl bg-slate-950/20">
            <AlertCircle className="w-8 h-8 text-slate-600 animate-pulse" />
            <p className="text-xs">No matching questions found.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedDifficulty('all'); }}
              className="text-[10px] text-cyan-400 hover:underline font-mono"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isActive = q.id === activeId;
            return (
              <button
                key={q.id}
                onClick={() => onSelectQuestion(q.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 relative overflow-hidden group ${
                  isActive 
                    ? 'bg-cyan-600/15 border-cyan-500/80 shadow-md shadow-cyan-950/10' 
                    : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700/50 hover:bg-slate-900/30'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500" />
                )}

                {/* Number bullet */}
                <span className={`w-5.5 h-5.5 rounded-lg text-[10px] font-bold font-mono flex items-center justify-center shrink-0 border transition-colors ${
                  isActive 
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' 
                    : 'bg-slate-900 border-slate-800 text-slate-500 group-hover:text-slate-300 group-hover:border-slate-700'
                }`}>
                  {q.id}
                </span>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-1.5 text-[10px] font-mono">
                    <span className="text-slate-500 font-bold uppercase">{q.category}</span>
                    <span className={`px-1.5 py-0.2 rounded border uppercase font-semibold text-[9px] ${diffStyles[q.difficulty]}`}>
                      {q.difficulty}
                    </span>
                  </div>
                  
                  <p className={`text-[11px] md:text-xs leading-normal font-medium truncate ${
                    isActive ? 'text-slate-100 font-semibold' : 'text-slate-300 group-hover:text-slate-100'
                  }`}>
                    {q.question}
                  </p>

                  {/* Badges/Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {q.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[8px] font-mono bg-slate-900 text-slate-500 px-1 py-0.2 rounded border border-slate-800/60">
                        #{tag}
                      </span>
                    ))}
                    {q.tags.length > 2 && (
                      <span className="text-[8px] font-mono text-slate-600 px-1">
                        +{q.tags.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className={`w-4 h-4 self-center transition-all ${
                  isActive ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                }`} />
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
