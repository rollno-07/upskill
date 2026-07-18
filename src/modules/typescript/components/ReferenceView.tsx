import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, CheckCircle, Check, Copy, HelpCircle, ArrowRight, Sparkles, X } from 'lucide-react';
import { Question, UserProgress } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';
import { DiagramView } from './DiagramView';
import confetti from 'canvas-confetti';

interface ReferenceViewProps {
  questions: Question[];
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  activeCategory: string;
}

export const ReferenceView: React.FC<ReferenceViewProps> = ({
  questions,
  progress,
  onUpdateProgress,
  activeCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(questions[0]?.id || 1);
  const [activeDetailTab, setActiveDetailTab] = useState<'explanation' | 'code' | 'visualizer' | 'quiz'>('explanation');
  
  // Local states for inline quiz practice
  const [inlineSelectedOption, setInlineSelectedOption] = useState<number | null>(null);
  const [inlineIsAnswered, setInlineIsAnswered] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Filter questions by Category + Search Query
  const filteredQuestions = useMemo(() => {
    let result = questions;
    
    // Filter by Category
    if (activeCategory !== 'all') {
      result = questions.filter((q) => q.category === activeCategory);
    }
    
    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (q) =>
          q.question.toLowerCase().includes(query) ||
          q.shortAnswer.toLowerCase().includes(query) ||
          q.detailedAnswer.toLowerCase().includes(query) ||
          q.codeExample.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [questions, activeCategory, searchQuery]);

  // Ensure a question is selected
  const selectedQuestion = useMemo(() => {
    const found = filteredQuestions.find((q) => q.id === selectedQuestionId);
    if (found) return found;
    return filteredQuestions[0] || null;
  }, [filteredQuestions, selectedQuestionId]);

  // Handle question selection changes - reset states
  const handleSelectQuestion = (qId: number) => {
    setSelectedQuestionId(qId);
    setInlineSelectedOption(null);
    setInlineIsAnswered(false);
  };

  // Toggle Bookmark
  const handleToggleBookmark = (qId: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    onUpdateProgress((prev) => {
      const isBookmarked = prev.bookmarked.includes(qId);
      const updated = isBookmarked
        ? prev.bookmarked.filter((id) => id !== qId)
        : [...prev.bookmarked, qId];
      return { ...prev, bookmarked: updated };
    });
  };

  // Toggle Completion
  const handleToggleCompleted = (qId: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    onUpdateProgress((prev) => {
      const isCompleted = prev.completed.includes(qId);
      const updated = isCompleted
        ? prev.completed.filter((id) => id !== qId)
        : [...prev.completed, qId];
      return { ...prev, completed: updated };
    });
  };

  // Copy code sample
  const handleCopyCode = () => {
    if (!selectedQuestion) return;
    navigator.clipboard.writeText(selectedQuestion.codeExample).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  };

  // Answer inline quiz
  const handleAnswerInlineQuiz = (optionIdx: number) => {
    if (inlineIsAnswered || !selectedQuestion) return;
    setInlineSelectedOption(optionIdx);
    setInlineIsAnswered(true);

    if (optionIdx === selectedQuestion.quizCorrectIndex) {
      // Trigger a light confetti burst!
      confetti({
        particleCount: 60,
        spread: 40,
        colors: ['#22d3ee', '#FFFFFF'],
        origin: { y: 0.8 }
      });
      // Automatically add to completed if correct
      if (!progress.completed.includes(selectedQuestion.id)) {
        handleToggleCompleted(selectedQuestion.id);
      }
    }
  };

  return (
    <div id="reference-view" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* LEFT COLUMN: LIST AND SEARCH */}
      <div className="lg:col-span-5 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#48484A]" />
          <input
            type="text"
            placeholder="Search verified typings, keywords, code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111112] border border-[#242426] pl-10 pr-4 py-2.5 rounded-sm text-xs font-mono text-white placeholder-[#48484A] focus:outline-none focus:border-[#22d3ee]/50 focus:ring-1 focus:ring-[#22d3ee]/20 transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-[10px] font-mono text-[#8E8E93] hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Questions list */}
        <div className="bg-[#111112] border border-[#242426] rounded-sm divide-y divide-[#1C1C1E] max-h-[580px] overflow-y-auto">
          {filteredQuestions.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-[#8E8E93]">
              No compile contracts match this search filter.
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const isSelected = selectedQuestion?.id === q.id;
              const isBookmarked = progress.bookmarked.includes(q.id);
              const isCompleted = progress.completed.includes(q.id);

              return (
                <div
                  key={q.id}
                  onClick={() => handleSelectQuestion(q.id)}
                  className={`p-4 cursor-pointer transition-all duration-300 flex items-start space-x-3 text-left ${
                    isSelected
                      ? 'bg-[#161618] border-l-2 border-[#22d3ee]'
                      : 'bg-transparent hover:bg-[#161618]/40 border-l-2 border-transparent'
                  }`}
                >
                  {/* index bubble */}
                  <span className={`w-6 h-6 rounded-sm text-[10px] font-mono flex items-center justify-center border shrink-0 ${
                    isSelected
                      ? 'bg-[#22d3ee]/15 border-[#22d3ee]/40 text-[#22d3ee]'
                      : 'bg-[#1C1C1E] border-[#242426] text-[#8E8E93]'
                  }`}>
                    {q.id}
                  </span>

                  {/* content */}
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-mono tracking-widest text-[#8E8E93] uppercase">
                        {q.category}
                      </span>
                      <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded border uppercase ${
                        q.difficulty === 'Beginner' ? 'text-green-400 border-green-500/20 bg-green-500/5' :
                        q.difficulty === 'Intermediate' ? 'text-yellow-400 border-yellow-500/20 bg-yellow-500/5' :
                        'text-red-400 border-red-500/20 bg-red-500/5'
                      }`}>
                        {q.difficulty}
                      </span>
                    </div>
                    <h4 className={`text-xs font-mono truncate leading-normal ${isSelected ? 'text-white font-medium' : 'text-[#AEAEB2]'}`}>
                      {q.question}
                    </h4>
                  </div>

                  {/* badges status */}
                  <div className="flex items-center space-x-1 shrink-0 pl-1">
                    {isBookmarked && (
                      <Star className="w-3.5 h-3.5 text-[#22d3ee] fill-current" />
                    )}
                    {isCompleted && (
                      <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: PRECISE DETAILS */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          {selectedQuestion ? (
            <motion.div
              key={selectedQuestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#111112] border border-[#242426] rounded-sm p-6 space-y-6"
            >
              
              {/* Question title area */}
              <div className="border-b border-[#1C1C1E] pb-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#22d3ee]">
                      {selectedQuestion.category} • ID: {selectedQuestion.id}
                    </span>
                    <h3 className="text-2xl font-serif italic text-white leading-relaxed font-serif">
                      "{selectedQuestion.question}"
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase ${
                      selectedQuestion.difficulty === 'Beginner' ? 'text-green-400 border-green-500/30 bg-green-500/5' :
                      selectedQuestion.difficulty === 'Intermediate' ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5' :
                      'text-red-400 border-red-500/30 bg-red-500/5'
                    }`}>
                      {selectedQuestion.difficulty}
                    </span>
                    <span className="text-[9px] font-mono text-[#8E8E93]">
                      Type Contract Specification
                    </span>
                  </div>

                  {/* Bookmark and master controls */}
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleToggleBookmark(selectedQuestion.id)}
                      className={`flex items-center space-x-1 px-2.5 py-1 text-[10px] font-mono border rounded-sm transition-all duration-300 ${
                        progress.bookmarked.includes(selectedQuestion.id)
                          ? 'border-[#22d3ee] bg-[#22d3ee]/5 text-[#22d3ee]'
                          : 'border-[#242426] bg-[#0A0A0B] text-[#8E8E93] hover:text-white'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${progress.bookmarked.includes(selectedQuestion.id) ? 'fill-current' : ''}`} />
                      <span>{progress.bookmarked.includes(selectedQuestion.id) ? 'Bookmarked' : 'Bookmark'}</span>
                    </button>

                    <button
                      onClick={() => handleToggleCompleted(selectedQuestion.id)}
                      className={`flex items-center space-x-1 px-2.5 py-1 text-[10px] font-mono border rounded-sm transition-all duration-300 ${
                        progress.completed.includes(selectedQuestion.id)
                          ? 'border-green-500 bg-green-500/5 text-green-400'
                          : 'border-[#242426] bg-[#0A0A0B] text-[#8E8E93] hover:text-white'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{progress.completed.includes(selectedQuestion.id) ? 'Mastered' : 'Mark Mastered'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation tabs */}
              <div className="flex border-b border-[#1C1C1E] p-1 bg-[#0A0A0B] border border-[#242426] rounded-sm">
                {(['explanation', 'code', 'visualizer', 'quiz'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveDetailTab(tab)}
                    className={`flex-1 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded transition-colors ${
                      activeDetailTab === tab
                        ? 'bg-[#22d3ee] text-black font-semibold'
                        : 'text-[#8E8E93] hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* DETAILS CONTENT ACCORDING TO ACTIVE TAB */}
              <div className="min-h-[280px]">
                {activeDetailTab === 'explanation' && (
                  <motion.div
                    key="explanation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4 text-left"
                  >
                    <div className="p-4 bg-[#161618] border-l-2 border-[#22d3ee] rounded-sm">
                      <span className="text-[8px] font-mono uppercase tracking-widest text-[#22d3ee] block mb-1">In Brief</span>
                      <p className="text-sm text-white font-medium italic">
                        {selectedQuestion.shortAnswer}
                      </p>
                    </div>

                    <MarkdownRenderer 
                      content={selectedQuestion.detailedAnswer} 
                      latex={selectedQuestion.latexFormula} 
                    />
                  </motion.div>
                )}

                {activeDetailTab === 'code' && selectedQuestion.codeExample && (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4 text-left"
                  >
                    {/* Fake terminal mock window */}
                    <div className="bg-[#09090B] border border-[#242426] rounded-sm overflow-hidden flex flex-col font-mono text-xs shadow-xl">
                      {/* Top bar */}
                      <div className="bg-[#141416] px-4 py-2.5 border-b border-[#242426] flex justify-between items-center select-none">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                          <span className="text-[10px] text-[#8E8E93] pl-2 font-mono">spec_example.ts</span>
                        </div>
                        <button
                          onClick={handleCopyCode}
                          className="flex items-center space-x-1 px-2 py-0.5 rounded border border-[#242426] bg-[#1C1C1E] text-[#8E8E93] hover:text-white transition-colors"
                        >
                          {copyFeedback ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-400" />
                              <span className="text-[9px]">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[9px]">Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Code Area */}
                      <div className="p-4 overflow-x-auto max-h-[380px] overflow-y-auto bg-[#070708]">
                        <pre className="text-left text-[#E5E5E7] leading-relaxed font-mono selection:bg-[#22d3ee]/35 select-all">
                          {selectedQuestion.codeExample}
                        </pre>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-[#8E8E93] flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#22d3ee] animate-pulse" />
                      <span>Syntax elements validated under TypeScript 5.x rules.</span>
                    </div>
                  </motion.div>
                )}

                {activeDetailTab === 'visualizer' && (
                  <motion.div
                    key="visualizer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full"
                  >
                    <DiagramView 
                      questionId={selectedQuestion.id} 
                      category={selectedQuestion.category} 
                    />
                  </motion.div>
                )}

                {activeDetailTab === 'quiz' && selectedQuestion.quizOptions && (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4 text-left"
                  >
                    <div className="border border-[#242426] bg-[#0A0A0B] p-4 rounded-sm flex items-start space-x-2.5">
                      <HelpCircle className="w-5 h-5 text-[#22d3ee] shrink-0 pt-0.5" />
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#22d3ee] block">Inline Question Practice</span>
                        <p className="text-sm text-white font-medium leading-relaxed font-sans">
                          {selectedQuestion.question}
                        </p>
                      </div>
                    </div>

                    {/* Quiz answers */}
                    <div className="space-y-2">
                      {selectedQuestion.quizOptions.map((opt, idx) => {
                        const isSelected = inlineSelectedOption === idx;
                        const isCorrectAnswer = idx === selectedQuestion.quizCorrectIndex;
                        
                        let btnStyle = 'border-[#242426] bg-[#111112] hover:border-[#22d3ee]/40 hover:bg-[#161618] text-[#AEAEB2]';
                        
                        if (inlineIsAnswered) {
                          if (isCorrectAnswer) {
                            btnStyle = 'border-green-500 bg-green-950/10 text-green-400 font-semibold';
                          } else if (isSelected) {
                            btnStyle = 'border-red-500 bg-red-950/10 text-red-400';
                          } else {
                            btnStyle = 'border-[#242426] bg-[#111112] text-[#48484A] opacity-50';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleAnswerInlineQuiz(idx)}
                            disabled={inlineIsAnswered}
                            className={`w-full p-3.5 border rounded-sm text-left text-xs font-mono leading-relaxed transition-all duration-300 flex items-start justify-between ${btnStyle}`}
                          >
                            <span className="pr-4">{opt}</span>
                            {inlineIsAnswered && isCorrectAnswer && <Check className="w-4 h-4 text-green-400 shrink-0 ml-2" />}
                            {inlineIsAnswered && isSelected && !isCorrectAnswer && <X className="w-4 h-4 text-red-400 shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Inline feedback explanation */}
                    {inlineIsAnswered && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-[#161618] border border-[#242426] rounded-sm space-y-1.5"
                      >
                        <div className="text-[9px] font-mono uppercase tracking-widest text-[#22d3ee]">
                          Explanation Feedback
                        </div>
                        <p className="text-xs text-[#AEAEB2] leading-relaxed">
                          {selectedQuestion.quizExplanation}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>

            </motion.div>
          ) : (
            <div className="bg-[#111112] border border-[#242426] p-12 text-center rounded-sm">
              <p className="text-xs font-mono text-[#8E8E93]">No question selected.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
