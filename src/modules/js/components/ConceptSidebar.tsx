import React, { useState } from 'react';
import { Question, Category, Difficulty } from '../types';
import { categoryLabels } from '../data/questions';
import { Search, ShieldAlert, Cpu, Filter, CheckCircle2, ChevronDown } from 'lucide-react';

interface ConceptSidebarProps {
  questions: Question[];
  selectedQuestion: Question;
  onSelectQuestion: (question: Question) => void;
  completedQuestions: number[];
  onToggleComplete: (id: number) => void;
}

export function ConceptSidebar({
  questions,
  selectedQuestion,
  onSelectQuestion,
  completedQuestions,
  onToggleComplete,
}: ConceptSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Filter logic
  const filteredQuestions = questions.filter(q => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case 'Easy':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'Hard':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
    }
  };

  const getCategoryShort = (cat: Category) => {
    switch (cat) {
      case 'scope_closures': return 'Scope';
      case 'async_event_loop': return 'Async';
      case 'this_functions': return 'this';
      case 'objects_prototypes': return 'Proto';
      case 'types_coercion': return 'Coerce';
      case 'array_methods': return 'Array';
      case 'dom_browser_adv': return 'DOM';
    }
  };

  const scanIntegrity = ((completedQuestions.length / 100) * 100).toFixed(1);

  return (
    <aside className="w-80 bg-[#0d0d10] border-r border-zinc-800 flex flex-col h-full overflow-hidden select-none">
      {/* Top Stats Board */}
      <div className="p-4 border-b border-zinc-800 bg-[#0a0a0b]/40">
        <div className="flex justify-between items-center mb-1">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Compiler Scan Integrity</p>
          <span className="text-[10px] text-cyan-400 font-mono font-bold">{scanIntegrity}%</span>
        </div>
        <div className="w-full bg-zinc-800/80 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-cyan-500 h-full transition-all duration-500 shadow-md shadow-cyan-500/50"
            style={{ width: `${Math.max(Number(scanIntegrity), 3)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-[9px] font-mono text-zinc-500 mt-1.5">
          <span>{completedQuestions.length} / 100 Synthesized</span>
          <span>Buffer OK</span>
        </div>
      </div>

      {/* Search and Filters Header */}
      <div className="p-3 border-b border-zinc-800/50 flex flex-col gap-2 bg-[#0d0d10]">
        <div className="relative">
          <input
            id="sidebar-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search concepts, variables..."
            className="w-full bg-[#050507] border border-zinc-800 focus:border-cyan-500 text-xs text-white rounded-lg pl-8 pr-3 py-1.5 outline-none placeholder-zinc-500 font-mono transition-all"
          />
          <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-zinc-500" />
        </div>

        {/* Collapsible Filter Dropdown */}
        <button
          id="sidebar-filters-toggle"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center justify-between text-[10px] font-bold text-zinc-400 hover:text-zinc-200 uppercase tracking-wider bg-zinc-950 p-1.5 rounded border border-zinc-800/80"
        >
          <span className="flex items-center gap-1.5">
            <Filter className="w-3 h-3" />
            Filters {selectedCategory !== 'all' || selectedDifficulty !== 'all' ? '(Active)' : ''}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
        </button>

        {isFiltersOpen && (
          <div className="flex flex-col gap-2 p-2 bg-zinc-950/80 rounded border border-zinc-900 mt-1">
            {/* Category selection */}
            <div>
              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">Module Category</span>
              <select
                id="sidebar-category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
                className="w-full bg-[#0d0d10] text-zinc-300 border border-zinc-800 rounded px-1.5 py-1 text-[10px] font-mono outline-none"
              >
                <option value="all">-- All Modules --</option>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {/* Difficulty selection */}
            <div>
              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">Difficulty level</span>
              <div className="flex gap-1">
                {(['all', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                  <button
                    key={diff}
                    id={`filter-diff-${diff}`}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`flex-1 py-1 text-[9px] font-mono font-bold uppercase rounded border transition-all ${
                      selectedDifficulty === diff
                        ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300'
                        : 'bg-[#0d0d10] border-zinc-800 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* List Header */}
      <div className="px-4 py-2 border-b border-zinc-900 flex justify-between items-center bg-[#070709] shrink-0">
        <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
          Nodes Found: {filteredQuestions.length}
        </span>
        <button
          id="clear-filters-btn"
          onClick={() => {
            setSearchTerm('');
            setSelectedCategory('all');
            setSelectedDifficulty('all');
          }}
          className="text-[9px] font-mono text-cyan-400 hover:text-cyan-300 uppercase underline"
        >
          Reset All
        </button>
      </div>

      {/* Scrollable Concept Nodes */}
      <nav className="flex-1 overflow-y-auto divide-y divide-zinc-900/40 scrollbar-thin scrollbar-thumb-zinc-800">
        {filteredQuestions.length === 0 ? (
          <div className="p-8 text-center">
            <ShieldAlert className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">No matching concepts resolved in binary records.</p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isSelected = q.id === selectedQuestion.id;
            const isCompleted = completedQuestions.includes(q.id);
            const paddedId = String(q.id).padStart(2, '0');

            return (
              <div
                key={q.id}
                onClick={() => onSelectQuestion(q)}
                className={`flex gap-2 p-3 transition-all duration-200 cursor-pointer text-left relative group ${
                  isSelected
                    ? 'bg-cyan-600/10 border-l-2 border-cyan-500 shadow-inner'
                    : 'hover:bg-zinc-900 bg-transparent border-l-2 border-transparent'
                }`}
              >
                {/* Checkbox trigger */}
                <button
                  id={`toggle-complete-${q.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleComplete(q.id);
                  }}
                  className="shrink-0 mt-0.5"
                  title={isCompleted ? "Mark as Incomplete" : "Mark as Mastered"}
                >
                  <CheckCircle2
                    className={`w-4 h-4 transition-colors ${
                      isCompleted ? 'text-cyan-500 fill-cyan-500/10' : 'text-zinc-700 hover:text-zinc-500'
                    }`}
                  />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5 mb-1 flex-wrap">
                    <span className="font-mono text-[9px] text-zinc-500 font-bold tracking-widest">{paddedId}.</span>
                    <span className="font-mono text-[9px] text-zinc-500 bg-zinc-950 border border-zinc-900 px-1 py-0.5 rounded">
                      {getCategoryShort(q.category)}
                    </span>
                    <span className={`font-mono text-[9px] px-1 py-0.5 rounded border ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty}
                    </span>
                  </div>
                  
                  <p className={`text-[11.5px] font-bold leading-snug truncate ${
                    isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                  }`}>
                    {q.question}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </nav>
    </aside>
  );
}
