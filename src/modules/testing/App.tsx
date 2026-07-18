import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { questionsData, quizQuestions } from './data/questions';
import { Question, Category } from './types';
import QuestionExplorer from './components/QuestionExplorer';
import QuizCard from './components/QuizCard';
import CodeViewer from './components/CodeViewer';
import InteractiveDiagrams from './components/InteractiveDiagrams';

import { 
  Cpu, Zap, Globe, GraduationCap, CheckCircle2, Bookmark, 
  HelpCircle, Sparkles, BookOpen, Layers, Terminal, ArrowRight,
  Code2, Eye, Award, ExternalLink, Lightbulb
} from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  
  // Active Question State
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'explanation' | 'code' | 'diagram'>('explanation');
  
  // Progress/Mastery State (local storage persisted)
  const [masteredIds, setMasteredIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('testing_guide_mastered');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('testing_guide_mastered', JSON.stringify(masteredIds));
    } catch (err) {
      console.error('Failed to save progress', err);
    }
  }, [masteredIds]);

  const toggleMastery = (id: number) => {
    setMasteredIds(prev => 
      prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
    );
  };

  // Find active question object
  const activeQuestion = questionsData.find(q => q.id === activeQuestionId) || questionsData[0];

  // Stats calculation
  const totalQuestions = questionsData.length;
  const masteredCount = masteredIds.length;
  const masteryPercentage = Math.round((masteredCount / totalQuestions) * 100) || 0;

  const categoryStats = {
    jest: questionsData.filter(q => q.category === 'jest').length,
    rtl: questionsData.filter(q => q.category === 'rtl').length,
    cypress: questionsData.filter(q => q.category === 'cypress').length,
  };

  const difficultyColors = {
    Beginner: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
    Intermediate: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
    Advanced: 'text-rose-400 border-rose-500/20 bg-rose-500/5'
  };

  const handleSelectQuestion = (id: number) => {
    setActiveQuestionId(id);
    // Auto-switch tabs to 'explanation' for fresh viewing unless they are looking at code or diagrams
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Visual Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-rose-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-6 relative z-10">
        
        {/* ========================================================= */}
        {/* ROW 1: HEADER & STATS BENTO GRID TILE                     */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Title Block */}
          <div className="lg:col-span-8 bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-md group hover:border-slate-700/50 transition-all duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded-full font-bold tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  Testing Guide & Interactive Sandbox
                </span>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold tracking-wider">
                  Bento Theme v1.0
                </span>
              </div>
              <h1 className="text-xl md:text-3xl font-extrabold text-white tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-cyan-300 bg-clip-text text-transparent">
                Modern Front-End Testing Suite
              </h1>
              <p className="text-xs md:text-sm text-slate-400 max-w-2xl leading-relaxed">
                An intuitive, visually detailed companion covering 50 fundamental interview questions across <strong className="text-slate-200">Jest</strong>, <strong className="text-slate-200">React Testing Library</strong>, and <strong className="text-slate-200">Cypress</strong>, complete with interactive state telemetry simulators and dynamic diagrams.
              </p>
            </div>

            {/* Quick Tech Badges */}
            <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-slate-800/60 text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-1.5 bg-slate-950/60 p-1.5 px-3 rounded-lg border border-slate-850">
                <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Jest: <strong className="text-slate-300">{categoryStats.jest} items</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/60 p-1.5 px-3 rounded-lg border border-slate-850">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>RTL: <strong className="text-slate-300">{categoryStats.rtl} items</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/60 p-1.5 px-3 rounded-lg border border-slate-850">
                <Globe className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Cypress: <strong className="text-slate-300">{categoryStats.cypress} items</strong></span>
              </div>
            </div>
          </div>

          {/* User Progress Tracker Tile */}
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-md group hover:border-slate-700/50 transition-all duration-300">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-start">
                <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Your Study Progress
                </h2>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  {masteryPercentage}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal font-medium">
                Review questions and check the "Mastered" status box to log your compliance progress.
              </p>
            </div>

            {/* Circular or Bar Progress Visual */}
            <div className="space-y-3.5 my-4">
              <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 p-0.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full transition-all duration-700"
                  style={{ width: `${masteryPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Mastered Items:</span>
                <span className="text-slate-200 font-bold">{masteredCount} / {totalQuestions}</span>
              </div>
            </div>

            {/* Quick Tips or encouragement */}
            <div className="bg-slate-950/50 border border-slate-850 p-2.5 rounded-xl flex items-center gap-2.5">
              <Award className="w-4 h-4 text-emerald-400 shrink-0 animate-bounce" />
              <p className="text-[10px] font-mono text-slate-400 leading-snug">
                {masteredCount === 0 ? (
                  'Click any question, read the explanation and mark as mastered to begin!'
                ) : masteredCount < totalQuestions / 2 ? (
                  'Off to a strong start! Practice quizzes next to consolidate your knowledge.'
                ) : (
                  'Excellent expertise! You are fully optimized for mid-to-senior technical loops.'
                )}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ROW 2: EXPLORER AND QA VIEWER COMBO BLOCK                 */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* LEFT COLUMN: Question Explorer Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <QuestionExplorer
              questions={questionsData}
              activeId={activeQuestionId}
              onSelectQuestion={handleSelectQuestion}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
            />
          </div>

          {/* RIGHT COLUMN: Interactive Details & Active Workspace (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            
            {/* Active Question Panel */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col backdrop-blur-sm hover:border-slate-700/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

              {/* Question card header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 mb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <span className="text-slate-500 font-bold uppercase">{activeQuestion.category}</span>
                    <span className="text-slate-600 font-semibold">•</span>
                    <span className={`px-2 py-0.5 rounded border text-[9px] uppercase font-bold ${difficultyColors[activeQuestion.difficulty]}`}>
                      {activeQuestion.difficulty}
                    </span>
                    <span className="text-slate-600 font-semibold">•</span>
                    <span className="text-cyan-400 font-semibold">Question #{activeQuestion.id}</span>
                  </div>
                  <h2 className="text-base md:text-lg font-bold text-white tracking-tight leading-snug">
                    {activeQuestion.question}
                  </h2>
                </div>

                {/* Progress mastery checkbox button */}
                <button
                  onClick={() => toggleMastery(activeQuestion.id)}
                  className={`w-full sm:w-auto px-3.5 py-1.5 rounded-xl border text-[11px] font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                    masteredIds.includes(activeQuestion.id)
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${masteredIds.includes(activeQuestion.id) ? 'fill-emerald-400' : ''}`} />
                  <span>{masteredIds.includes(activeQuestion.id) ? 'Mastered ✓' : 'Mark as Mastered'}</span>
                </button>
              </div>

              {/* Summary answer highlight block */}
              <div className="bg-slate-950 border border-slate-850/60 p-4 rounded-xl mb-5 text-xs md:text-sm leading-relaxed text-slate-300 flex items-start gap-3 border-l-4 border-l-indigo-500 shadow-inner">
                <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-slate-100">Key Takeaway:</strong> {activeQuestion.answer}
                </p>
              </div>

              {/* WORKSPACE VIEW SWITCHER TABS */}
              <div className="flex border-b border-slate-800 mb-5 shrink-0">
                <button
                  onClick={() => setActiveTab('explanation')}
                  className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'explanation' 
                      ? 'border-cyan-500 text-cyan-300 font-bold' 
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Detailed Answer</span>
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'code' 
                      ? 'border-cyan-500 text-cyan-300 font-bold' 
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Example Code Snippets</span>
                </button>
                <button
                  onClick={() => setActiveTab('diagram')}
                  className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'diagram' 
                      ? 'border-cyan-500 text-cyan-300 font-bold' 
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Interactive Diagram Sim</span>
                </button>
              </div>

              {/* WORKSPACE TAB CONTENT WINDOW */}
              <div className="flex-1 min-h-[300px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'explanation' && (
                    <motion.div
                      key="explanation"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      {/* Detailed Text Block */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Concept Context Analysis</h4>
                        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal whitespace-pre-wrap">
                          {activeQuestion.detailedAnswer}
                        </p>
                      </div>

                      {/* Display a small notice that user can click Code or Diagram to dive deeper */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-850/60 text-xs text-slate-400 mt-4">
                        <span className="flex items-center gap-2 font-mono text-[11px]">
                          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                          Explore practical examples and mock diagrams for this question.
                        </span>
                        <div className="flex gap-2 w-full sm:w-auto shrink-0">
                          <button
                            onClick={() => setActiveTab('code')}
                            className="flex-1 sm:flex-none text-center px-3 py-1.5 bg-slate-900 border border-slate-800 text-cyan-300 rounded-lg text-[10px] font-semibold hover:bg-slate-850 transition"
                          >
                            View Code
                          </button>
                          <button
                            onClick={() => setActiveTab('diagram')}
                            className="flex-1 sm:flex-none text-center px-3 py-1.5 bg-slate-900 border border-slate-800 text-emerald-300 rounded-lg text-[10px] font-semibold hover:bg-slate-850 transition"
                          >
                            Launch Sandbox
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'code' && (
                    <motion.div
                      key="code"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      {activeQuestion.exampleCode || activeQuestion.testCaseCode ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {activeQuestion.exampleCode && (
                            <CodeViewer 
                              title="Standard Implementation Code" 
                              code={activeQuestion.exampleCode} 
                            />
                          )}
                          {activeQuestion.testCaseCode && (
                            <CodeViewer 
                              title="Companion Automated Tests" 
                              code={activeQuestion.testCaseCode} 
                            />
                          )}
                        </div>
                      ) : (
                        <div className="py-12 border border-dashed border-slate-800 rounded-xl text-center bg-slate-950/20 text-slate-500 text-xs">
                          <Code2 className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-600 animate-bounce" />
                          <p>No code examples available for this conceptual overview question.</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'diagram' && (
                    <motion.div
                      key="diagram"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      {/* Embedded simulator diagram matching the question concept */}
                      <InteractiveDiagrams 
                        activeConcept={activeQuestion.conceptKey} 
                        onSelectQuestion={handleSelectQuestion}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* LOWER BENTO SUB-GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Tile 1: Practice Quiz Block */}
              <QuizCard questions={quizQuestions} />

              {/* Tile 2: Testing Paradigm cheat sheet & metrics list */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col justify-between backdrop-blur-sm hover:border-slate-700/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="space-y-3.5">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800/80">
                    <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl text-emerald-400 border border-emerald-500/15">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Cheat Sheet Glossary</h3>
                      <p className="text-[11px] text-slate-500 font-medium">Core reference syntax and commands</p>
                    </div>
                  </div>

                  {/* Cheat-sheet list */}
                  <div className="space-y-3.5 py-1">
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-bold shrink-0">
                        JEST
                      </span>
                      <div className="space-y-0.5">
                        <code className="text-slate-200 text-xs font-mono">jest.fn() / jest.spyOn()</code>
                        <p className="text-[11px] text-slate-400">Create independent mocks or wrap existing class methods with telemetry trackers.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded uppercase font-bold shrink-0">
                        RTL
                      </span>
                      <div className="space-y-0.5">
                        <code className="text-slate-200 text-xs font-mono">screen.getByRole('button', &#123; name: ... &#125;)</code>
                        <p className="text-[11px] text-slate-400">Match screen-reader structures. Higher priority and confidence rating over arbitrary selectors.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded uppercase font-bold shrink-0">
                        CYPRESS
                      </span>
                      <div className="space-y-0.5">
                        <code className="text-slate-200 text-xs font-mono">cy.intercept() / cy.wait()</code>
                        <p className="text-[11px] text-slate-400">Spy, intercept and proxy network fetches. Wait synchronously for dynamic endpoints.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span>Golden testing ratio: 70:20:10</span>
                  <button 
                    onClick={() => handleSelectQuestion(50)} // selects the final testing pyramid decision question
                    className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline flex items-center gap-1.5 transition"
                  >
                    <span>Read Strategy guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
