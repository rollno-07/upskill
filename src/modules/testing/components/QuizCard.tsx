import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizQuestion } from '../types';
import { 
  GraduationCap, HelpCircle, CheckCircle2, AlertCircle, 
  RefreshCw, Trophy, ArrowRight, BookOpen, Award
} from 'lucide-react';

interface QuizCardProps {
  questions: QuizQuestion[];
}

export default function QuizCard({ questions }: QuizCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answeredHistory, setAnsweredHistory] = useState<{ id: number; correct: boolean }[]>([]);

  if (questions.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full">
        <HelpCircle className="w-10 h-10 text-slate-600 mb-2" />
        <p className="text-slate-400 text-sm">No quiz questions found.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || submitted) return;
    setSubmitted(true);
    
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnsweredHistory(prev => [...prev, { id: currentQuestion.id, correct: isCorrect }]);
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setSubmitted(false);
    setScore(0);
    setCompleted(false);
    setAnsweredHistory([]);
  };

  const categoryBadges = {
    jest: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    rtl: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    cypress: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col justify-between h-full relative overflow-hidden backdrop-blur-sm group hover:border-slate-700/50 transition-all duration-300">
      
      {/* Absolute faint background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-300 pointer-events-none"></div>

      {/* Card Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-cyan-500/20 rounded-xl text-cyan-400 border border-cyan-500/15">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Concept Quiz Practice</h3>
            <p className="text-[11px] text-slate-500 font-medium">Test your testing theory knowledge</p>
          </div>
        </div>

        {/* Score indicator */}
        {!completed && (
          <div className="text-right">
            <span className="text-xs font-mono font-semibold text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
              Q: {currentIdx + 1}/{questions.length}
            </span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              {/* Question text & Category */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${categoryBadges[currentQuestion.category]}`}>
                  {currentQuestion.category}
                </span>
                
                {/* Visual tiny step dots */}
                <div className="flex gap-1 items-center mt-1.5">
                  {questions.map((q, i) => {
                    const status = answeredHistory[i];
                    return (
                      <div
                        key={q.id}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          i === currentIdx
                            ? 'bg-cyan-500 w-3'
                            : status
                              ? status.correct
                                ? 'bg-emerald-500'
                                : 'bg-rose-500'
                              : 'bg-slate-700'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              <h4 className="text-slate-200 font-medium text-sm md:text-base leading-snug mb-5">
                {currentIdx + 1}. {currentQuestion.question}
              </h4>

              {/* Options list */}
              <div className="space-y-2.5 mb-5">
                {currentQuestion.options.map((option, oIdx) => {
                  const isSelected = selectedOption === oIdx;
                  const isCorrectAnswer = oIdx === currentQuestion.correctAnswer;
                  
                  let optionStyle = "bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700/50 hover:bg-slate-900/40";
                  let numStyle = "bg-slate-900 text-slate-500";

                  if (isSelected && !submitted) {
                    optionStyle = "bg-cyan-600/10 border-cyan-500 text-cyan-300 font-medium";
                    numStyle = "bg-cyan-500/20 text-cyan-300";
                  } else if (submitted) {
                    if (isCorrectAnswer) {
                      optionStyle = "bg-emerald-500/10 border-emerald-500/60 text-emerald-300 font-semibold";
                      numStyle = "bg-emerald-500/20 text-emerald-300";
                    } else if (isSelected) {
                      optionStyle = "bg-rose-500/10 border-rose-500/60 text-rose-300 font-semibold";
                      numStyle = "bg-rose-500/20 text-rose-300";
                    } else {
                      optionStyle = "bg-slate-950/40 border-slate-900/60 text-slate-600 opacity-60";
                      numStyle = "bg-slate-950 text-slate-700";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(oIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-3 rounded-xl border text-xs md:text-sm flex items-start gap-3 transition-all duration-200 ${optionStyle}`}
                    >
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono shrink-0 font-bold ${numStyle}`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="leading-tight">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3.5 rounded-xl border mb-5 text-xs ${
                    selectedOption === currentQuestion.correctAnswer
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400/90'
                      : 'bg-rose-500/5 border-rose-500/20 text-rose-400/90'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {selectedOption === currentQuestion.correctAnswer ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-bold text-emerald-400">Correct Choice!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span className="font-bold text-rose-400">Incorrect Choice</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px] font-mono">
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800 shrink-0">
              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    selectedOption === null
                      ? 'bg-slate-800 text-slate-500 border border-slate-800 cursor-not-allowed'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white border border-cyan-600 shadow-md shadow-cyan-900/10 hover:shadow-cyan-900/20'
                  }`}
                >
                  <span>Submit Answer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <span>
                    {currentIdx + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          /* Quiz Results / Completion Stage */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center py-6"
          >
            <div className="relative mb-5">
              {/* Double rotating border rings */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center text-cyan-400 mx-auto relative z-10 shadow-inner">
                <Trophy className="w-8 h-8 text-cyan-400" />
              </div>
            </div>

            <h4 className="text-lg font-extrabold text-slate-100 mb-1">Practice Quiz Completed!</h4>
            <p className="text-slate-400 text-xs mb-6 max-w-xs leading-normal">
              You tested your concepts on standard testing frameworks. Here is your result:
            </p>

            {/* Score Ring / Bar */}
            <div className="w-full max-w-sm bg-slate-950 border border-slate-800/80 rounded-2xl p-4 mb-6 space-y-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Final Score</span>
                <span className="font-bold text-cyan-400 font-mono text-sm">
                  {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
                </span>
              </div>
              
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800/40">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(score / questions.length) * 100}%` }}
                />
              </div>

              {/* Score summary performance badge */}
              <div className="flex items-center gap-2 text-left bg-cyan-500/5 p-2 px-3 border border-cyan-500/10 rounded-xl">
                <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-[11px] font-mono text-cyan-300 leading-snug">
                  {score === questions.length ? (
                    'Flawless! You possess strong expertise in Jest, RTL, and Cypress!'
                  ) : score >= questions.length / 2 ? (
                    'Excellent! You understand basic hooks, spies, and testing priorities.'
                  ) : (
                    'Good attempt! Review the interactive telemetry and diagrams to improve.'
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-cyan-600 shadow-md shadow-cyan-900/10 hover:shadow-cyan-900/20 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Quiz Practice</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
