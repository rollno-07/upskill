import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Check, X, Award, RefreshCw, Bookmark, Star, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, UserProgress } from '../types';

interface QuizChallengeViewProps {
  questions: Question[];
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const QuizChallengeView: React.FC<QuizChallengeViewProps> = ({
  questions,
  progress,
  onUpdateProgress,
}) => {
  const [sessionActive, setSessionActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<number>(5);
  
  // Game states
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState<Question[]>([]);
  const [completedQuiz, setCompletedQuiz] = useState(false);

  // Extract available categories
  const categories = useMemo(() => {
    const list = new Set<string>();
    questions.forEach((q) => {
      if (q.quizOptions && q.quizOptions.length > 0) {
        list.add(q.category);
      }
    });
    return Array.from(list);
  }, [questions]);

  // Start the session
  const handleStartQuiz = () => {
    let pool = questions.filter(q => q.quizOptions && q.quizOptions.length > 0);
    
    if (selectedCategory !== 'all') {
      pool = pool.filter(q => q.category === selectedCategory);
    }

    // Shuffle and pick size
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(selectedSize, shuffled.length));

    if (selected.length === 0) return;

    setQuizQuestions(selected);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectAnswersCount(0);
    setIncorrectQuestions([]);
    setCompletedQuiz(false);
    setSessionActive(true);
  };

  const currentQuestion = quizQuestions[currentIndex] || null;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQuestion.quizCorrectIndex;

    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
      // Fire confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        colors: ['#22d3ee', '#FFFFFF', '#AEAEB2'],
        origin: { y: 0.8 }
      });
    } else {
      setIncorrectQuestions(prev => [...prev, currentQuestion]);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz finished!
      setCompletedQuiz(true);
      const scorePercentage = Math.round((correctAnswersCount / quizQuestions.length) * 100);
      
      // Update high scores
      onUpdateProgress(prev => {
        const key = selectedCategory === 'all' ? 'All Concepts' : selectedCategory;
        const previousHighScore = prev.quizHighScores[key] || 0;
        const newHighScore = Math.max(previousHighScore, scorePercentage);
        return {
          ...prev,
          quizHighScores: {
            ...prev.quizHighScores,
            [key]: newHighScore
          }
        };
      });
    }
  };

  const handleToggleBookmark = (qId: number) => {
    onUpdateProgress(prev => {
      const isBookmarked = prev.bookmarked.includes(qId);
      const updatedBookmarks = isBookmarked
        ? prev.bookmarked.filter(id => id !== qId)
        : [...prev.bookmarked, qId];
      return { ...prev, bookmarked: updatedBookmarks };
    });
  };

  return (
    <div id="quiz-challenge-view" className="max-w-2xl mx-auto space-y-6">
      <AnimatePresence mode="wait">
        
        {/* SETUP SCREEN */}
        {!sessionActive && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#111112] border border-[#242426] p-8 rounded-sm space-y-6"
          >
            <div className="text-center space-y-2 border-b border-[#1C1C1E] pb-5">
              <div className="inline-flex p-3 bg-[#1C1C1E] border border-[#242426] rounded-sm text-[#22d3ee] mb-2">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-white">Interactive Assessment Terminal</h3>
              <p className="text-xs text-[#8E8E93] max-w-md mx-auto">
                Test your static compilation intelligence. Select parameters to spin up a custom TypeScript verification sandbox.
              </p>
            </div>

            <div className="space-y-4">
              {/* Category Selector */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#8E8E93]">Select Focus Area</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`p-3 border rounded text-left font-mono text-xs transition-all duration-300 ${
                      selectedCategory === 'all'
                        ? 'border-[#22d3ee] bg-[#22d3ee]/5 text-white'
                        : 'border-[#242426] bg-[#0A0A0B] text-[#8E8E93] hover:text-white'
                    }`}
                  >
                    <div className="font-semibold text-white">All Concepts</div>
                    <div className="text-[10px] text-[#8E8E93] mt-1">Wide sweep of the type compiler.</div>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`p-3 border rounded text-left font-mono text-xs transition-all duration-300 ${
                        selectedCategory === cat
                          ? 'border-[#22d3ee] bg-[#22d3ee]/5 text-white'
                          : 'border-[#242426] bg-[#0A0A0B] text-[#8E8E93] hover:text-white'
                      }`}
                    >
                      <div className="font-semibold text-white">{cat}</div>
                      <div className="text-[10px] text-[#8E8E93] mt-1">Narrowed static scope.</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quiz Size Selector */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#8E8E93]">Assessment Scope (Size)</label>
                <div className="flex space-x-2">
                  {([5, 10, 15] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 py-2 border rounded-sm font-mono text-xs transition-all duration-300 ${
                        selectedSize === size
                          ? 'border-[#22d3ee] bg-[#1C1C1E] text-[#22d3ee] font-semibold'
                          : 'border-[#242426] bg-[#0A0A0B] text-[#8E8E93] hover:text-white'
                      }`}
                    >
                      {size} Concepts
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              className="w-full py-3 bg-[#22d3ee] text-black hover:bg-[#E5BF48] font-mono text-xs font-semibold uppercase tracking-widest transition-all duration-300 rounded-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              Start Type Verification Run
            </button>
          </motion.div>
        )}

        {/* ACTIVE QUIZ SCREEN */}
        {sessionActive && !completedQuiz && currentQuestion && (
          <motion.div
            key="quiz-run"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Header info */}
            <div className="flex items-center justify-between text-xs font-mono text-[#8E8E93]">
              <span>Dynamic Evaluation: {currentIndex + 1} of {quizQuestions.length}</span>
              <span>Score: {correctAnswersCount} / {currentIndex + (isAnswered ? 1 : 0)}</span>
            </div>
            <div className="w-full bg-[#111112] h-1.5 rounded-full overflow-hidden border border-[#242426]">
              <div 
                className="bg-[#22d3ee] h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-[#111112] border border-[#242426] p-6 rounded-sm space-y-6 relative overflow-hidden">
              <div className="flex justify-between items-start border-b border-[#1C1C1E] pb-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#22d3ee]">
                    {currentQuestion.category}
                  </span>
                  <h4 className="text-lg font-serif italic text-white leading-relaxed font-serif">
                    {currentQuestion.question}
                  </h4>
                </div>
                <button
                  onClick={() => handleToggleBookmark(currentQuestion.id)}
                  className={`p-2 rounded-sm border transition-all duration-300 ${
                    progress.bookmarked.includes(currentQuestion.id)
                      ? 'border-[#22d3ee] bg-[#22d3ee]/5 text-[#22d3ee]'
                      : 'border-[#242426] text-[#48484A] hover:text-[#8E8E93] hover:border-[#48484A]'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.quizOptions?.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectAnswer = idx === currentQuestion.quizCorrectIndex;
                  
                  let btnStyle = 'border-[#242426] bg-[#0A0A0B] text-[#AEAEB2] hover:border-[#22d3ee]/40 hover:bg-[#111112]';
                  
                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      btnStyle = 'border-green-500 bg-green-950/10 text-green-400 font-semibold';
                    } else if (isSelected) {
                      btnStyle = 'border-red-500 bg-red-950/10 text-red-400';
                    } else {
                      btnStyle = 'border-[#242426] bg-[#0A0A0B] text-[#48484A] opacity-60';
                    }
                  }

                  return (
                    <button
                      id={`option-${idx}`}
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-4 border rounded-sm text-left text-xs font-mono leading-relaxed transition-all duration-300 flex items-start justify-between ${btnStyle}`}
                    >
                      <span className="pr-4">{option}</span>
                      {isAnswered && isCorrectAnswer && <Check className="w-4 h-4 text-green-400 shrink-0 ml-2" />}
                      {isAnswered && isSelected && !isCorrectAnswer && <X className="w-4 h-4 text-red-400 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation section if answered */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-[#161618] border border-[#242426] rounded-sm space-y-2"
                >
                  <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-[#22d3ee]">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Compiler Feedback</span>
                  </div>
                  <p className="text-xs text-[#AEAEB2] leading-relaxed">
                    {currentQuestion.quizExplanation}
                  </p>
                </motion.div>
              )}

              {/* Actions */}
              {isAnswered && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3 bg-[#22d3ee] text-black font-semibold font-mono text-xs uppercase tracking-widest hover:bg-[#E5BF48] transition-all duration-300 rounded-sm flex items-center justify-center space-x-2"
                >
                  <span>{currentIndex + 1 === quizQuestions.length ? 'Finalize Verification' : 'Next Concept'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* RESULTS SCREEN */}
        {completedQuiz && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-[#111112] border border-[#242426] p-8 rounded-sm space-y-6 text-center"
          >
            <div className="space-y-2 pb-5 border-b border-[#1C1C1E]">
              <div className="inline-flex p-4 bg-[#1C1C1E] border border-dashed border-[#22d3ee]/50 rounded-full text-[#22d3ee] mb-2 animate-pulse">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-white">Evaluation Finalized</h3>
              <p className="text-xs text-[#8E8E93]">TypeScript code validation complete.</p>
            </div>

            {/* Score Metric display */}
            <div className="py-4">
              <div className="text-5xl font-serif text-white mb-2">
                {Math.round((correctAnswersCount / quizQuestions.length) * 100)}%
              </div>
              <p className="text-xs font-mono text-[#8E8E93]">
                Checked {correctAnswersCount} correct out of {quizQuestions.length} typings.
              </p>
            </div>

            {/* Grade Card */}
            <div className="p-4 bg-[#0A0A0B] border border-[#242426] rounded-sm text-left space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#22d3ee]">Assessment Rating</span>
              <div className="text-sm font-semibold text-white">
                {correctAnswersCount === quizQuestions.length ? '★ Absolute Compiler Safety (Perfect Score!)' :
                 (correctAnswersCount / quizQuestions.length) >= 0.8 ? '☆ TypeScript Practitioner (Passed)' :
                 '🔧 Dynamic Mode Active (Needs Revision)'}
              </div>
              <p className="text-xs text-[#8E8E93] leading-relaxed">
                {correctAnswersCount === quizQuestions.length ? 'Amazing! Your typing boundaries are perfectly static and clean. You understand these concepts flawlessly.' :
                 'Good solid score! Keep revising to cement those niche static constraints and advance your generic mapping skills.'}
              </p>
            </div>

            {/* Missed questions bookmark recommendation */}
            {incorrectQuestions.length > 0 && (
              <div className="space-y-2 text-left">
                <span className="text-[9px] font-mono uppercase tracking-widest text-red-400">Review Recommended Concepts</span>
                <div className="space-y-1">
                  {incorrectQuestions.map((q) => (
                    <div key={q.id} className="flex justify-between items-center p-2.5 bg-[#161618] border border-[#242426] rounded-sm text-xs font-mono">
                      <span className="text-[#AEAEB2] truncate max-w-[400px]">{q.question}</span>
                      <button
                        onClick={() => handleToggleBookmark(q.id)}
                        className="flex items-center space-x-1 text-[#22d3ee] hover:text-white transition-colors"
                      >
                        {progress.bookmarked.includes(q.id) ? (
                          <>
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>Starred</span>
                          </>
                        ) : (
                          <>
                            <Star className="w-3.5 h-3.5" />
                            <span>Add Star</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                onClick={() => setSessionActive(false)}
                className="py-3 bg-[#1C1C1E] border border-[#242426] text-white hover:border-[#22d3ee]/50 font-mono text-xs uppercase tracking-wider transition-all duration-300 rounded-sm flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Configure New Quiz</span>
              </button>
              <button
                onClick={handleStartQuiz}
                className="py-3 bg-[#22d3ee] text-black hover:bg-[#E5BF48] font-mono text-xs font-semibold uppercase tracking-widest transition-all duration-300 rounded-sm"
              >
                Restart Session
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
