import React, { useState, useEffect } from 'react';
import { BookOpen, RefreshCw, Award, ShieldAlert, Sparkles, Star } from 'lucide-react';
import { questionsData } from './data/questions';
import { UserProgress } from './types';
import { DashboardStats } from './components/DashboardStats';
import { ReferenceView } from './components/ReferenceView';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizChallengeView } from './components/QuizChallengeView';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explorer' | 'flashcards' | 'quiz'>('explorer');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Load user progress from localStorage or fallback
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('ts_trainer_progress_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure structure complies with UserProgress interface
        return {
          bookmarked: Array.isArray(parsed.bookmarked) ? parsed.bookmarked : [],
          completed: Array.isArray(parsed.completed) ? parsed.completed : [],
          flashcardStates: parsed.flashcardStates || {},
          quizHighScores: parsed.quizHighScores || {},
        };
      }
    } catch (e) {
      console.error('Error loading progress:', e);
    }
    return {
      bookmarked: [],
      completed: [],
      flashcardStates: {},
      quizHighScores: {},
    };
  });

  // Persist progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ts_trainer_progress_v2', JSON.stringify(progress));
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  }, [progress]);

  // Support updater functions for safe nested updates
  const handleUpdateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => updater(prev));
  };

  // Reset progress option
  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your mastered concepts, bookmarks, and quiz high scores? This action cannot be undone.')) {
      setProgress({
        bookmarked: [],
        completed: [],
        flashcardStates: {},
        quizHighScores: {},
      });
      setActiveCategory('all');
      setActiveTab('explorer');
    }
  };

  return (
    <div className="bg-[#0A0A0B] text-[#AEAEB2] min-h-screen font-sans antialiased selection:bg-[#22d3ee]/20 selection:text-white pb-16">
      
      {/* Decorative Golden Top Line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#22d3ee] to-transparent opacity-60" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header Branding Area */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[#1C1C1E]">
          <div className="space-y-1 text-left">
            <div className="flex items-center space-x-2.5">
              <span className="font-mono text-xs text-[#22d3ee] border-2 border-[#22d3ee]/50 px-2 py-0.5 rounded bg-[#1C1C1E] font-bold select-none tracking-wider">
                TS
              </span>
              <h1 className="text-2xl font-serif text-white tracking-tight flex items-center gap-1.5 font-serif">
                TypeScript <span className="text-[#22d3ee] font-serif italic">Interactive Trainer</span>
              </h1>
            </div>
            <p className="text-xs text-[#8E8E93] tracking-normal font-sans">
              Compile-time contract specification, static type verification, and flashcards deck.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 px-2 py-1 bg-[#111112] border border-[#242426] rounded text-[10px] font-mono text-[#22d3ee] select-none">
              <ShieldAlert className="w-3.5 h-3.5 text-[#22d3ee]" />
              <span>STRICT_MODE: TRUE</span>
            </div>
            <button
              onClick={handleResetProgress}
              className="px-3 py-1 bg-transparent hover:bg-red-950/10 hover:border-red-500/30 border border-[#242426] text-[#8E8E93] hover:text-red-400 rounded text-[10px] font-mono transition-all duration-300"
            >
              Reset Terminal
            </button>
          </div>
        </header>

        {/* Dynamic Progress Statistics Dashboard */}
        <DashboardStats
          questions={questionsData}
          progress={progress}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            // Auto switch back to explorer when picking a category from the dashboard
            setActiveTab('explorer');
          }}
          activeCategory={activeCategory}
        />

        {/* Global Navigation Tabs (Interactive Reference Book / Flashcards / Assessment) */}
        <div className="flex border-b border-[#242426] p-1.5 bg-[#111112] rounded-sm max-w-xl mx-auto border border-[#242426]">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'explorer'
                ? 'bg-[#22d3ee] text-black font-semibold shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                : 'text-[#8E8E93] hover:text-white hover:bg-[#1C1C1E]/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Reference Book</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'flashcards'
                ? 'bg-[#22d3ee] text-black font-semibold shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                : 'text-[#8E8E93] hover:text-white hover:bg-[#1C1C1E]/50'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Flashcards Deck</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'quiz'
                ? 'bg-[#22d3ee] text-black font-semibold shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                : 'text-[#8E8E93] hover:text-white hover:bg-[#1C1C1E]/50'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Quiz assessment</span>
          </button>
        </div>

        {/* Main Workspace Area */}
        <main className="pt-2">
          {activeTab === 'explorer' && (
            <ReferenceView
              questions={questionsData}
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              activeCategory={activeCategory}
            />
          )}

          {activeTab === 'flashcards' && (
            <FlashcardsView
              questions={questionsData}
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizChallengeView
              questions={questionsData}
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
            />
          )}
        </main>

        {/* Academic Sophisticated Dark Footer */}
        <footer className="pt-12 mt-12 border-t border-[#1C1C1E] text-center space-y-2">
          <div className="flex items-center justify-center space-x-1 text-[10px] font-mono text-[#48484A]">
            <Sparkles className="w-3.5 h-3.5 text-[#22d3ee]/50" />
            <span>COMPILED WITH STRICT_NULL_CHECKS AND NO_IMPLICIT_ANY SPECIFICATIONS</span>
          </div>
          <p className="text-[10px] text-[#48484A] font-mono tracking-wider">
            TypeScript Reference & Interactive Trainer © {new Date().getFullYear()}. Designed in Sophisticated Slate & Gold.
          </p>
        </footer>

      </div>
    </div>
  );
}
