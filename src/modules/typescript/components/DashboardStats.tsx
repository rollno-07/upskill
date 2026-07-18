import React from 'react';
import { BookOpen, CheckCircle, Bookmark, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { Question, UserProgress } from '../types';

interface DashboardStatsProps {
  questions: Question[];
  progress: UserProgress;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  questions,
  progress,
  onSelectCategory,
  activeCategory,
}) => {
  const totalCount = questions.length;
  const completedCount = progress.completed.length;
  const bookmarkedCount = progress.bookmarked.length;
  
  // Calculate completion percentage
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  // Extract all categories
  const categories = React.useMemo(() => {
    const list = new Set<string>();
    questions.forEach((q) => list.add(q.category));
    return Array.from(list);
  }, [questions]);

  // Calculate high scores average
  const highScoresArray = Object.values(progress.quizHighScores) as number[];
  const averageHighScore = highScoresArray.length > 0 
    ? Math.round(highScoresArray.reduce((a, b) => a + b, 0) / highScoresArray.length) 
    : 0;

  return (
    <div id="dashboard-stats" className="space-y-6">
      {/* Stat Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Questions Card */}
        <div className="bg-[#111112] border border-[#242426] p-5 rounded-sm relative overflow-hidden group hover:border-[#22d3ee]/50 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#22d3ee]/2 rounded-full blur-2xl pointer-events-none group-hover:bg-[#22d3ee]/5 transition-all duration-500" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#8E8E93] font-mono mb-1">Library Scale</p>
              <h3 className="text-3xl font-serif text-white">{totalCount}</h3>
            </div>
            <div className="p-2.5 bg-[#1C1C1E] border border-[#242426] rounded-sm text-[#22d3ee]">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs text-[#8E8E93] font-mono flex items-center justify-between">
            <span>Verified Typings</span>
            <span className="text-white">100% Valid</span>
          </div>
        </div>

        {/* Mastered Progress Card */}
        <div className="bg-[#111112] border border-[#242426] p-5 rounded-sm relative overflow-hidden group hover:border-[#22d3ee]/50 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/2 rounded-full blur-2xl pointer-events-none group-hover:bg-green-500/5 transition-all duration-500" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#8E8E93] font-mono mb-1">Concepts Mastered</p>
              <h3 className="text-3xl font-serif text-white">
                {completedCount} <span className="text-sm font-sans text-[#8E8E93]">/ {totalCount}</span>
              </h3>
            </div>
            <div className="p-2.5 bg-[#1C1C1E] border border-[#242426] rounded-sm text-green-400">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-[10px] font-mono text-[#8E8E93] mb-1.5">
              <span>Completion Velocity</span>
              <span className="text-green-400">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-[#1C1C1E] h-1 rounded-full overflow-hidden">
              <motion.div 
                className="bg-green-400 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Bookmarked Card */}
        <div className="bg-[#111112] border border-[#242426] p-5 rounded-sm relative overflow-hidden group hover:border-[#22d3ee]/50 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#22d3ee]/2 rounded-full blur-2xl pointer-events-none group-hover:bg-[#22d3ee]/5 transition-all duration-500" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#8E8E93] font-mono mb-1">Study Registry</p>
              <h3 className="text-3xl font-serif text-white">{bookmarkedCount}</h3>
            </div>
            <div className="p-2.5 bg-[#1C1C1E] border border-[#242426] rounded-sm text-[#22d3ee]">
              <Bookmark className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs text-[#8E8E93] font-mono flex items-center justify-between">
            <span>Starred References</span>
            <span className="text-white">Active Revisions</span>
          </div>
        </div>

        {/* Quiz Accuracy Card */}
        <div className="bg-[#111112] border border-[#242426] p-5 rounded-sm relative overflow-hidden group hover:border-[#22d3ee]/50 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/2 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/5 transition-all duration-500" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#8E8E93] font-mono mb-1">Evaluation Score</p>
              <h3 className="text-3xl font-serif text-white">
                {averageHighScore}%
              </h3>
            </div>
            <div className="p-2.5 bg-[#1C1C1E] border border-[#242426] rounded-sm text-cyan-400">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs text-[#8E8E93] font-mono flex items-center justify-between">
            <span>Quiz Sessions Run</span>
            <span className="text-white">{highScoresArray.length} Completed</span>
          </div>
        </div>
      </div>

      {/* Category Navigation Badges */}
      <div className="bg-[#111112] border border-[#242426] p-4 rounded-sm flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-mono uppercase text-[#8E8E93] tracking-widest mr-2">Category:</span>
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-3 py-1.5 rounded-sm text-xs font-mono border transition-all duration-300 ${
            activeCategory === 'all'
              ? 'border-[#22d3ee] bg-[#22d3ee]/10 text-white font-medium'
              : 'border-[#242426] text-[#8E8E93] hover:text-white hover:border-[#48484A]'
          }`}
        >
          All Concepts ({totalCount})
        </button>
        {categories.map((cat) => {
          const count = questions.filter((q) => q.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-sm text-xs font-mono border transition-all duration-300 ${
                activeCategory === cat
                  ? 'border-[#22d3ee] bg-[#22d3ee]/10 text-white font-medium'
                  : 'border-[#242426] text-[#8E8E93] hover:text-white hover:border-[#48484A]'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>
    </div>
  );
};
