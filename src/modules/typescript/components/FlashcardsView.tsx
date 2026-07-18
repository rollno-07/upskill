import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, CheckCircle, HelpCircle, ArrowLeft, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { Question, UserProgress } from '../types';

interface FlashcardsViewProps {
  questions: Question[];
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  questions,
  progress,
  onUpdateProgress,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  // Filter questions based on difficulty
  const filteredQuestions = useMemo(() => {
    let result = questions;
    if (selectedDifficulty !== 'All') {
      result = questions.filter(q => q.difficulty === selectedDifficulty);
    }
    return result;
  }, [questions, selectedDifficulty]);

  // Handle boundary checks
  const currentQuestion = filteredQuestions[currentIndex] || null;

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredQuestions.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length);
    }, 150);
  };

  const handleDifficultyChange = (diff: typeof selectedDifficulty) => {
    setSelectedDifficulty(diff);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleRate = (rating: 'easy' | 'medium' | 'hard') => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;

    onUpdateProgress((prev) => {
      const updatedFlashcardStates = { ...prev.flashcardStates, [qId]: rating };
      let updatedCompleted = [...prev.completed];

      if (rating === 'easy' && !updatedCompleted.includes(qId)) {
        updatedCompleted.push(qId);
      } else if (rating === 'hard' && updatedCompleted.includes(qId)) {
        updatedCompleted = updatedCompleted.filter(id => id !== qId);
      }

      return {
        ...prev,
        flashcardStates: updatedFlashcardStates,
        completed: updatedCompleted,
      };
    });

    // Automatically auto-advance after rating
    setTimeout(() => {
      handleNext();
    }, 200);
  };

  return (
    <div id="flashcards-view" className="flex flex-col items-center justify-center max-w-2xl mx-auto space-y-6">
      
      {/* Filtering Toolbar */}
      <div className="flex items-center space-x-2 bg-[#111112] border border-[#242426] p-2 rounded-sm w-full justify-between">
        <span className="text-[10px] font-mono uppercase text-[#8E8E93] tracking-wider pl-2">Filter Deck:</span>
        <div className="flex space-x-1">
          {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => handleDifficultyChange(diff)}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                selectedDifficulty === diff
                  ? 'bg-[#22d3ee] text-black font-semibold'
                  : 'text-[#8E8E93] hover:text-white hover:bg-[#1C1C1E]'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="bg-[#111112] border border-[#242426] rounded-sm p-12 text-center w-full">
          <HelpCircle className="w-12 h-12 text-[#22d3ee] mx-auto opacity-40 mb-4 animate-pulse" />
          <h4 className="text-lg font-serif italic text-white mb-2">Deck Empty</h4>
          <p className="text-sm text-[#8E8E93]">No questions found matching this filter criteria.</p>
        </div>
      ) : (
        <div className="w-full space-y-6">
          {/* Deck Progress Bar */}
          <div className="flex items-center justify-between text-xs font-mono text-[#8E8E93] px-1">
            <span>Progress: {currentIndex + 1} of {filteredQuestions.length} Cards</span>
            <span className="text-[#22d3ee]">
              Mastered: {questions.filter(q => progress.completed.includes(q.id)).length} / {questions.length}
            </span>
          </div>
          <div className="w-full bg-[#111112] h-1.5 rounded-full overflow-hidden border border-[#242426]">
            <div 
              className="bg-[#22d3ee] h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>

          {/* FLIP CARD AREA */}
          <div 
            className="perspective-1000 w-full min-h-[380px] cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              className="relative w-full h-full transition-all duration-500 transform-style-3d select-none"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              style={{ minHeight: '380px' }}
            >
              {/* CARD FRONT */}
              <div className={`absolute inset-0 w-full h-full backface-hidden bg-[#111112] border-2 border-[#242426] p-8 rounded-sm flex flex-col justify-between hover:border-[#22d3ee]/40 transition-colors duration-300 ${isFlipped ? 'pointer-events-none opacity-0' : 'z-10'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E8E93] bg-[#1C1C1E] px-2.5 py-1 border border-[#242426] rounded">
                    {currentQuestion?.category}
                  </span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase ${
                    currentQuestion?.difficulty === 'Beginner' ? 'text-green-400 border-green-500/30 bg-green-500/5' :
                    currentQuestion?.difficulty === 'Intermediate' ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5' :
                    'text-red-400 border-red-500/30 bg-red-500/5'
                  }`}>
                    {currentQuestion?.difficulty}
                  </span>
                </div>

                <div className="my-auto text-center py-6">
                  <h3 className="text-2xl font-serif italic text-white leading-relaxed font-serif font-serif">
                    "{currentQuestion?.question}"
                  </h3>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-[#8E8E93] border-t border-[#1C1C1E] pt-4">
                  <div className="flex items-center space-x-1.5 text-[#22d3ee]">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>State: {progress.flashcardStates[currentQuestion?.id || 0] || 'Unseen'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3.5 h-3.5 text-[#8E8E93]" />
                    <span>Click card to reveal answer</span>
                  </div>
                </div>
              </div>

              {/* CARD BACK */}
              <div className={`absolute inset-0 w-full h-full backface-hidden bg-[#111112] border-2 border-[#22d3ee]/30 p-8 rounded-sm flex flex-col justify-between rotate-y-180 transition-colors duration-300 ${!isFlipped ? 'pointer-events-none opacity-0' : 'z-10'}`}>
                <div>
                  <div className="flex justify-between items-center border-b border-[#1C1C1E] pb-3 mb-4">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#22d3ee]">
                      REVEALED SCHEMA
                    </span>
                    <span className="text-[10px] font-mono text-[#8E8E93] truncate max-w-[200px]">
                      {currentQuestion?.question}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#8E8E93] mb-1">Concept Definition</h4>
                      <p className="text-sm text-[#AEAEB2] leading-relaxed">
                        {currentQuestion?.shortAnswer}
                      </p>
                    </div>

                    {currentQuestion?.codeExample && (
                      <div>
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#8E8E93] mb-1.5">Usage Reference</h4>
                        <div className="bg-[#0A0A0B] border border-[#242426] p-3.5 rounded font-mono text-xs overflow-x-auto text-emerald-400 select-text max-h-40 overflow-y-auto">
                          <pre className="text-left text-[#E5E5E7] leading-relaxed">
                            {currentQuestion.codeExample}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-[#1C1C1E] pt-4 mt-4" onClick={(e) => e.stopPropagation()}>
                  <p className="text-center text-[10px] font-mono text-[#8E8E93] mb-3">Rate your memory recall speed:</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleRate('hard')}
                      className="px-3 py-2 bg-[#1C1C1E] border border-red-500/20 hover:border-red-500/50 rounded-sm text-xs text-red-400 font-mono transition-all duration-300 hover:bg-red-950/10"
                    >
                      Hard (Repeat)
                    </button>
                    <button
                      onClick={() => handleRate('medium')}
                      className="px-3 py-2 bg-[#1C1C1E] border border-yellow-500/20 hover:border-yellow-500/50 rounded-sm text-xs text-yellow-400 font-mono transition-all duration-300 hover:bg-yellow-950/10"
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => handleRate('easy')}
                      className="px-3 py-2 bg-[#1C1C1E] border border-green-500/20 hover:border-green-500/50 rounded-sm text-xs text-green-400 font-mono transition-all duration-300 hover:bg-green-950/10"
                    >
                      Easy (Mastered)
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation controls */}
          <div className="flex justify-between items-center w-full">
            <button
              onClick={handlePrev}
              className="flex items-center space-x-2 px-4 py-2.5 bg-[#111112] border border-[#242426] hover:border-[#22d3ee]/50 rounded-sm text-xs font-mono text-white transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Prev Card</span>
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center space-x-2 px-6 py-2.5 bg-[#1C1C1E] border border-[#22d3ee]/40 hover:border-[#22d3ee] rounded-sm text-xs font-mono text-[#22d3ee] transition-all duration-300"
            >
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
              <span>Flip Card</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-4 py-2.5 bg-[#111112] border border-[#242426] hover:border-[#22d3ee]/50 rounded-sm text-xs font-mono text-white transition-all duration-300"
            >
              <span>Next Card</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
