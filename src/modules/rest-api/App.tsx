import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, BookOpen, Award, CheckCircle, HelpCircle, Copy, Check, 
  ChevronRight, Sliders, Cpu, Play, Terminal, Sparkles, Filter, 
  RotateCcw, Shield, Layers, RefreshCw, AlertTriangle, Lightbulb, ExternalLink
} from 'lucide-react';
import { QUESTIONS, CATEGORIES, CATEGORY_LABELS, QuestionData } from './data/questions';
import CoreSimulator from './components/simulators/CoreSimulator';
import ExtendedSimulators from './components/simulators/ExtendedSimulators';

// Custom Type for Mastery Status
type MasteryStatus = 'not-started' | 'reviewing' | 'mastered';

export default function App() {
  // Navigation & Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'explanation' | 'specs' | 'sandbox'>('explanation');

  // Mastery States Persisted in localStorage
  const [masteryMap, setMasteryMap] = useState<Record<number, MasteryStatus>>(() => {
    try {
      const saved = localStorage.getItem('rest_guide_mastery');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Copy State for HTTP Snippets
  const [copiedRequest, setCopiedRequest] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);

  // Sync Mastery state to localStorage
  useEffect(() => {
    localStorage.setItem('rest_guide_mastery', JSON.stringify(masteryMap));
  }, [masteryMap]);

  // Retrieve active question details
  const activeQuestion = useMemo(() => {
    return QUESTIONS.find(q => q.id === activeQuestionId) || QUESTIONS[0];
  }, [activeQuestionId]);

  // Filtered Questions list based on Category & Search Query
  const filteredQuestions = useMemo(() => {
    return QUESTIONS.filter(q => {
      const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
      const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            q.detailedExplanation.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Master Statistics
  const stats = useMemo(() => {
    const total = QUESTIONS.length;
    let masteredCount = 0;
    let reviewingCount = 0;
    
    QUESTIONS.forEach(q => {
      const status = masteryMap[q.id];
      if (status === 'mastered') masteredCount++;
      else if (status === 'reviewing') reviewingCount++;
    });

    const percentMastered = Math.round((masteredCount / total) * 100);
    return {
      total,
      mastered: masteredCount,
      reviewing: reviewingCount,
      notStarted: total - (masteredCount + reviewingCount),
      percent: percentMastered
    };
  }, [masteryMap]);

  // Update Mastery Status Handler
  const updateMastery = (qId: number, status: MasteryStatus) => {
    setMasteryMap(prev => ({
      ...prev,
      [qId]: status
    }));
  };

  // Helper to copy headers to clipboard
  const handleCopy = (text: string, type: 'req' | 'res') => {
    navigator.clipboard.writeText(text);
    if (type === 'req') {
      setCopiedRequest(true);
      setTimeout(() => setCopiedRequest(false), 2000);
    } else {
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    }
  };

  // Check if active question has specialized Simulator
  const hasCoreSimulator = [1, 2, 3, 4, 13, 18, 20, 35, 36].includes(activeQuestion.id);
  const hasExtendedSimulator = [5, 6, 7, 9, 10, 14, 15, 16, 17, 19, 21, 22, 28, 30, 32, 37].includes(activeQuestion.id);

  return (
    <div className="min-h-screen bg-[#070707] text-gray-300 font-sans flex flex-col antialiased">
      
      {/* BRAND HEADER BAR */}
      <header className="bg-[#0c0c0c] border-b border-[#181818] py-4 px-6 shrink-0 sticky top-0 z-50 shadow-md">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-br from-[#c9a44e]/20 to-[#a38036]/10 border border-[#c9a44e]/30 rounded-xl flex items-center justify-center">
              <Sliders className="w-5 h-5 text-[#c9a44e]" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold tracking-tight text-white flex items-center gap-2">
                KnowledgeNode <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 bg-[#c9a44e]/10 text-[#c9a44e] border border-[#c9a44e]/20 rounded">REST API</span>
              </h1>
              <p className="text-xs text-gray-500">Interactive Visual Architectural Interview Engine</p>
            </div>
          </div>

          {/* PROGRESS METRICS PANEL */}
          <div className="flex items-center space-x-6 bg-[#111111] p-2.5 rounded-xl border border-[#1e1e1e] shadow-inner max-w-md w-full md:w-auto">
            <div className="shrink-0 flex items-center justify-center p-2 bg-[#c9a44e]/5 rounded-lg border border-[#c9a44e]/10">
              <Award className="w-5 h-5 text-[#c9a44e]" />
            </div>
            
            <div className="flex-1 space-y-1.5 min-w-[180px]">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold">
                <span className="text-gray-500">Learning Progress</span>
                <span className="text-white font-mono">{stats.mastered} / {stats.total} Mastered ({stats.percent}%)</span>
              </div>
              <div className="w-full bg-[#1e1e1e] rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#c9a44e] to-emerald-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${stats.percent}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                <span>{stats.reviewing} Reviewing</span>
                <span>{stats.notStarted} Remaining</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* CORE FRAMEWORK WORKSPACE */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT COLUMN: NAVIGATION, SEARCH & QUESTION SELECTOR */}
        <aside className="w-full lg:w-[380px] shrink-0 bg-[#0a0a0a] border-r border-[#181818] flex flex-col h-[500px] lg:h-auto overflow-hidden">
          
          {/* Search Section */}
          <div className="p-4 border-b border-[#181818] space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search REST concepts..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#121212] border border-[#222222] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-gray-600 outline-none focus:border-[#c9a44e] transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white text-xs font-mono"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter Info */}
            <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
              <span>Matching: <strong>{filteredQuestions.length}</strong> / 40</span>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setMasteryMap({});
                  localStorage.removeItem('rest_guide_mastery');
                }}
                className="text-gray-600 hover:text-red-400 flex items-center space-x-1"
                title="Reset all study tracker statuses"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Study Plan</span>
              </button>
            </div>
          </div>

          {/* Category Filter list (Horizontal Scrollable) */}
          <div className="px-4 py-3 bg-[#0d0d0d] border-b border-[#181818] overflow-x-auto flex space-x-1.5 scrollbar-thin shrink-0">
            {CATEGORIES.map(cat => {
              const count = cat.id === 'all' 
                ? QUESTIONS.length 
                : QUESTIONS.filter(q => q.category === cat.id).length;

              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 text-[10px] font-semibold rounded-full border transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                    isSelected 
                      ? 'bg-[#c9a44e]/10 border-[#c9a44e] text-white' 
                      : 'bg-[#121212] border-[#222222] text-[#888888] hover:border-[#333333]'
                  }`}
                >
                  <span>{cat.name.split(' ')[0]}</span>
                  <span className={`px-1.5 py-0.2 text-[9px] font-mono rounded-full ${isSelected ? 'bg-[#c9a44e]/20 text-white' : 'bg-[#1c1c1c] text-gray-500'}`}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Active List of Questions */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#131313] scrollbar-thin">
            {filteredQuestions.length === 0 ? (
              <div className="p-8 text-center text-gray-600 flex flex-col items-center justify-center space-y-2">
                <HelpCircle className="w-8 h-8 opacity-20" />
                <p className="text-xs">No REST concepts matched your filter parameters.</p>
              </div>
            ) : (
              filteredQuestions.map(q => {
                const isActive = q.id === activeQuestionId;
                const mastery = masteryMap[q.id] || 'not-started';

                return (
                  <button
                    key={q.id}
                    id={`q-item-${q.id}`}
                    onClick={() => {
                      setActiveQuestionId(q.id);
                      setActiveTab('explanation');
                    }}
                    className={`w-full text-left p-4 transition-all hover:bg-[#121212] flex items-start space-x-3 border-l-2 ${
                      isActive 
                        ? 'bg-[#121212]/90 border-[#c9a44e]' 
                        : 'border-transparent bg-transparent'
                    }`}
                  >
                    {/* Badge Indicator ID & Status */}
                    <div className="shrink-0 flex flex-col items-center space-y-1 mt-0.5">
                      <span className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-mono font-bold ${
                        isActive 
                          ? 'bg-[#c9a44e] text-black' 
                          : 'bg-[#1a1a1a] text-gray-500'
                      }`}>
                        {q.id}
                      </span>
                      
                      {/* Mastery Indicator Dot */}
                      <span className={`w-2 h-2 rounded-full ${
                        mastery === 'mastered' 
                          ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' 
                          : mastery === 'reviewing' 
                          ? 'bg-cyan-500 shadow-sm shadow-cyan-500/50' 
                          : 'bg-gray-700'
                      }`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-gray-600">
                          {q.category}
                        </span>
                        {mastery === 'mastered' && (
                          <span className="text-[8px] uppercase tracking-tighter text-emerald-400 font-mono">Mastered</span>
                        )}
                        {mastery === 'reviewing' && (
                          <span className="text-[8px] uppercase tracking-tighter text-cyan-400 font-mono font-semibold">Reviewing</span>
                        )}
                      </div>
                      <h4 className={`text-xs font-semibold leading-tight mt-1 truncate ${
                        isActive ? 'text-white font-bold' : 'text-gray-400'
                      }`}>
                        {q.question}
                      </h4>
                      <p className="text-[10px] text-gray-600 line-clamp-1 mt-1 font-sans">
                        {q.answer}
                      </p>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 self-center transition-transform ${
                      isActive ? 'text-[#c9a44e] translate-x-1' : 'text-gray-800'
                    }`} />
                  </button>
                );
              })
            )}
          </div>

          {/* Quick instructions Footer */}
          <div className="p-3 bg-[#080808] border-t border-[#181818] text-[9px] text-[#555555] font-mono flex justify-between items-center shrink-0">
            <span>Progress stored automatically</span>
            <span className="text-[#c9a44e]">40 Core Topics</span>
          </div>
        </aside>

        {/* RIGHT COLUMN: DETAIL WORKSPACE (ACTIVE QUESTION VIEWER) */}
        <main className="flex-1 bg-[#0d0d0d] flex flex-col overflow-hidden h-[700px] lg:h-auto">
          
          {/* MAIN ACTIVE TOPIC BAR */}
          <div className="p-6 bg-[#0f0f0f] border-b border-[#181818] shrink-0 space-y-4">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 bg-[#c9a44e]/10 text-[#c9a44e] text-[9px] font-mono uppercase tracking-widest rounded border border-[#c9a44e]/20 font-bold">
                    Concept #{activeQuestion.id} — {CATEGORY_LABELS[activeQuestion.category]}
                  </span>
                </div>
                <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white leading-snug mt-1">
                  {activeQuestion.question}
                </h2>
              </div>

              {/* Mastery toggle widget inside details */}
              <div className="flex items-center space-x-1 bg-[#070707] p-1 rounded-lg border border-[#1e1e1e] shrink-0 self-start sm:self-auto">
                <span className="text-[9px] uppercase tracking-wider font-bold text-gray-500 px-2">Set Status:</span>
                
                {(['not-started', 'reviewing', 'mastered'] as const).map(mode => {
                  const currentStatus = masteryMap[activeQuestion.id] || 'not-started';
                  const isSelected = currentStatus === mode;

                  return (
                    <button
                      key={mode}
                      onClick={() => updateMastery(activeQuestion.id, mode)}
                      className={`px-2.5 py-1 text-[10px] rounded font-semibold capitalize transition-all ${
                        isSelected
                          ? mode === 'mastered' 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : mode === 'reviewing'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            : 'bg-gray-800 text-gray-300 border border-gray-700'
                          : 'text-[#555555] hover:text-gray-400 bg-transparent border border-transparent'
                      }`}
                    >
                      {mode.replace('-', ' ')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick core answer summary box */}
            <div className="bg-[#141414] border-l-2 border-[#c9a44e] p-4 rounded-r-xl shadow-inner">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-5 h-5 text-[#c9a44e] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest font-bold">Quick Core Answer Summary</span>
                  <p className="text-sm font-medium text-white leading-relaxed font-sans">
                    {activeQuestion.answer}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* TAB BAR FOR VIEWER SECTIONS */}
          <div className="px-6 bg-[#0f0f0f] border-b border-[#181818] flex space-x-4 shrink-0">
            {[
              { id: 'explanation', label: 'Detailed Explanation', icon: BookOpen },
              { id: 'specs', label: 'HTTP Request / Response', icon: Terminal },
              { id: 'sandbox', label: 'Interactive Sandbox & Live Diagram', icon: Cpu, isInteractive: true },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-1 text-xs font-semibold relative transition-all border-b-2 flex items-center space-x-2 ${
                    isActive 
                      ? 'border-[#c9a44e] text-white font-bold' 
                      : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#c9a44e]' : 'text-gray-500'}`} />
                  <span>{tab.label}</span>
                  {tab.isInteractive && (
                    <span className="px-1.5 py-0.2 bg-[#c9a44e]/10 text-[#c9a44e] text-[8px] rounded font-mono uppercase font-bold tracking-tighter">Live</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* TAB CONTENT SPACE */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            
            {/* TAB 1: DETAILED EXPLANATION */}
            {activeTab === 'explanation' && (
              <div className="space-y-6 max-w-4xl">
                
                {/* Full Explanation block */}
                <div className="space-y-4">
                  <h3 className="text-white font-bold text-sm uppercase tracking-widest font-display flex items-center space-x-2">
                    <span className="w-1.5 h-3 bg-[#c9a44e] rounded-sm" />
                    <span>Deep Architectural Drill-down</span>
                  </h3>
                  
                  <div className="text-gray-400 text-sm leading-relaxed space-y-4 font-sans font-light">
                    {activeQuestion.detailedExplanation.split('\n').map((paragraph, index) => {
                      if (paragraph.trim().startsWith('-') || paragraph.trim().startsWith('1.') || paragraph.trim().startsWith('2.') || paragraph.trim().startsWith('3.') || paragraph.trim().startsWith('4.') || paragraph.trim().startsWith('5.') || paragraph.trim().startsWith('6.')) {
                        return (
                          <div key={index} className="pl-4 py-0.5 border-l border-[#222222] italic text-gray-300">
                            {paragraph}
                          </div>
                        );
                      }
                      return (
                        <p key={index}>
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>

                {/* Key Takeaways Board */}
                <div className="bg-[#121212] border border-[#222222] rounded-xl p-5 space-y-3.5">
                  <div className="flex items-center space-x-2 text-white">
                    <Lightbulb className="w-5 h-5 text-[#c9a44e]" />
                    <h4 className="font-bold text-xs uppercase tracking-wider font-display">Key Takeaways & Core Architectural Impacts</h4>
                  </div>
                  
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li className="flex items-start space-x-2.5">
                      <span className="w-1.5 h-1.5 bg-[#c9a44e] rounded-full mt-1.5 shrink-0" />
                      <span><strong>State Isolation:</strong> Encourages strict decoupling of services, allowing seamless scaleout of cloud containers without memory replication mechanisms.</span>
                    </li>
                    <li className="flex items-start space-x-2.5">
                      <span className="w-1.5 h-1.5 bg-[#c9a44e] rounded-full mt-1.5 shrink-0" />
                      <span><strong>Contract Rigidity:</strong> Standardizes routes on uniform HTTP verbs, boosting API client onboarding speed and reducing implementation error frequencies.</span>
                    </li>
                    <li className="flex items-start space-x-2.5">
                      <span className="w-1.5 h-1.5 bg-[#c9a44e] rounded-full mt-1.5 shrink-0" />
                      <span><strong>Caching Integrity:</strong> Utilizing standardized status outputs and headers unlocks aggressive CDN edge performance layers seamlessly.</span>
                    </li>
                  </ul>
                </div>

                {/* Dynamic Suggestion Box to Try Sandbox */}
                <div className="bg-[#c9a44e]/5 border border-[#c9a44e]/10 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-5 h-5 text-[#c9a44e] shrink-0" />
                    <div className="text-xs">
                      <span className="text-white font-semibold">Ready to visualize this architecture?</span>
                      <p className="text-gray-500">Launch the live custom simulator sandbox built specifically for Concept #{activeQuestion.id}.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('sandbox')}
                    className="px-4 py-1.5 bg-[#c9a44e] hover:bg-[#b08e3e] text-black font-semibold text-xs rounded-lg transition-colors flex items-center space-x-1.5"
                  >
                    <span>Launch Sandbox</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}

            {/* TAB 2: CODE SNIPPETS & HTTP WORKSPACE */}
            {activeTab === 'specs' && (
              <div className="space-y-6 max-w-4xl">
                
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-bold text-sm uppercase tracking-widest font-display flex items-center space-x-2">
                    <span className="w-1.5 h-3 bg-cyan-500 rounded-sm" />
                    <span>Raw REST HTTP Telemetry Spec</span>
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono">Accept: application/json</span>
                </div>

                {/* Example Request Code terminal */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase tracking-wider bg-[#0f0f0f] px-4 py-1.5 border-t border-x border-[#1e1e1e] rounded-t-lg">
                    <span className="text-cyan-400">HTTP Outgoing Client Request Frame</span>
                    <button
                      onClick={() => handleCopy(activeQuestion.exampleRequest || '', 'req')}
                      className="hover:text-white flex items-center space-x-1 transition-colors"
                    >
                      {copiedRequest ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedRequest ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="bg-[#050505] border border-[#1e1e1e] p-4 rounded-b-lg font-mono text-xs text-cyan-300 leading-relaxed overflow-x-auto whitespace-pre">
                    {activeQuestion.exampleRequest || `GET /api/v1/concepts/${activeQuestion.id} HTTP/1.1\nHost: api.knowledgenode.io\nAccept: application/json`}
                  </pre>
                </div>

                {/* Example Response Code terminal */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase tracking-wider bg-[#0f0f0f] px-4 py-1.5 border-t border-x border-[#1e1e1e] rounded-t-lg">
                    <span className="text-emerald-400">HTTP Incoming Server Response Stream</span>
                    <button
                      onClick={() => handleCopy(activeQuestion.exampleResponse || '', 'res')}
                      className="hover:text-white flex items-center space-x-1 transition-colors"
                    >
                      {copiedResponse ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedResponse ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="bg-[#050505] border border-[#1e1e1e] p-4 rounded-b-lg font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre">
                    {activeQuestion.exampleResponse || `HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "id": ${activeQuestion.id},\n  "status": "active"\n}`}
                  </pre>
                </div>

                {/* Client Sandbox Simulator Note */}
                <div className="p-3 bg-[#121212] border border-[#222222] rounded-lg text-[11px] text-gray-500 leading-relaxed font-mono">
                  💡 <strong>HTTP Header Tip:</strong> Standard REST interactions exchange resource representations via headers. The <code>Content-Type</code> header is utilized by incoming receivers to decide the exact format parser mapping.
                </div>

              </div>
            )}

            {/* TAB 3: INTERACTIVE PLAYGROUND SANDBOX & LIVE DIAGRAM */}
            {activeTab === 'sandbox' && (
              <div className="space-y-6 max-w-4xl">
                
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-bold text-sm uppercase tracking-widest font-display flex items-center space-x-2">
                    <span className="w-1.5 h-3 bg-[#c9a44e] rounded-sm" />
                    <span>Concept Sandbox Simulator</span>
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-500 uppercase bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">Interactive Sandbox Sandbox</span>
                </div>

                {/* CHOOSE SIMULATOR MODULE */}
                {hasCoreSimulator ? (
                  <div className="bg-[#121212] rounded-xl border border-[#222222] overflow-hidden p-1">
                    <CoreSimulator questionId={activeQuestion.id} />
                  </div>
                ) : hasExtendedSimulator ? (
                  <ExtendedSimulators questionId={activeQuestion.id} />
                ) : (
                  /* GENERIC BEAUTIFUL DIAGRAM GRAPHICS FOR REMAINING QUESTIONS */
                  <div className="bg-[#121212] rounded-xl border border-[#222222] p-6 space-y-4 text-xs">
                    
                    <div className="flex justify-between items-center border-b border-[#222222] pb-3">
                      <div>
                        <h4 className="font-semibold text-sm text-white font-display">Concept Architectural Representation Layout</h4>
                        <p className="text-gray-500 text-[11px]">Tracing the data structures, protocol paths, and server gates for Concept #{activeQuestion.id}.</p>
                      </div>
                      
                      <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded text-[10px] uppercase font-bold font-mono">Standard Flow</span>
                    </div>

                    {/* Step by step interactive layout diagram */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-3 relative">
                      
                      {/* Step 1 */}
                      <div className="bg-[#0c0c0c] p-4 rounded-xl border border-[#222222] flex flex-col justify-between space-y-3 shadow-inner">
                        <span className="w-5 h-5 bg-[#c9a44e] text-black font-bold font-mono text-[11px] rounded-full flex items-center justify-center mx-auto">1</span>
                        <div className="space-y-1">
                          <span className="text-white font-semibold block">Client HTTP Frame Request</span>
                          <p className="text-[11px] text-gray-500">The browser dispatches a secure request pointing to a unique REST resource path.</p>
                        </div>
                        <div className="bg-[#151515] p-2 rounded font-mono text-[9px] text-[#c9a44e] select-all">
                          GET /api/v1/resource
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="bg-[#0c0c0c] p-4 rounded-xl border border-[#222222] flex flex-col justify-between space-y-3 shadow-inner">
                        <span className="w-5 h-5 bg-[#c9a44e] text-black font-bold font-mono text-[11px] rounded-full flex items-center justify-center mx-auto">2</span>
                        <div className="space-y-1">
                          <span className="text-white font-semibold block">Server Processing Gate</span>
                          <p className="text-[11px] text-gray-500">The API Gateway decrypts headers, runs validation firewalls, and routes to resources.</p>
                        </div>
                        <div className="bg-[#151515] p-2 rounded font-mono text-[9px] text-cyan-400">
                          Gateway → Service Logic
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="bg-[#0c0c0c] p-4 rounded-xl border border-[#222222] flex flex-col justify-between space-y-3 shadow-inner">
                        <span className="w-5 h-5 bg-[#c9a44e] text-black font-bold font-mono text-[11px] rounded-full flex items-center justify-center mx-auto">3</span>
                        <div className="space-y-1">
                          <span className="text-white font-semibold block">Representation Delivery</span>
                          <p className="text-[11px] text-gray-500">The database row is serialized into standard JSON and delivered back safely.</p>
                        </div>
                        <div className="bg-[#151515] p-2 rounded font-mono text-[9px] text-emerald-400">
                          HTTP/1.1 200 OK (JSON)
                        </div>
                      </div>

                    </div>

                    {/* Educational note on current topic */}
                    <div className="bg-[#050505] p-3 rounded-lg border border-[#222222] flex items-start space-x-2.5 mt-2">
                      <Lightbulb className="w-4 h-4 text-[#c9a44e] shrink-0 mt-0.5" />
                      <p className="text-gray-500 text-[11px] leading-relaxed">
                        <strong>Concept #{activeQuestion.id} Visual Guide:</strong> While this specific question acts as an architectural design constraint guideline, its transaction pipeline traces strictly through standard stateless headers, uniform routes, and structured JSON payloads depicted above. Click adjacent tabs to inspect the exact HTTP spec.
                      </p>
                    </div>

                  </div>
                )}

              </div>
            )}

          </div>

        </main>

      </div>

      {/* SYSTEM PERSISTENT STATUS AND ATTRIBUTE LOGS */}
      <footer className="bg-[#0a0a0a] border-t border-[#181818] py-3.5 px-6 shrink-0 text-center text-xs text-gray-600 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono">
        <div>
          <span>KnowledgeNode API interview engine running in secure container sandbox environment</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-[10px] uppercase font-bold text-[#c9a44e]">Port 3000 Ingress</span>
          <span className="text-gray-500">Vite + React TS</span>
        </div>
      </footer>

    </div>
  );
}
