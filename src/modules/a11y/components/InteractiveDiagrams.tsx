/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, X, Volume2, Keyboard, AlertTriangle, Play, Pause, 
  RotateCcw, Sliders, Eye, EyeOff, Sparkles, RefreshCw, 
  ArrowUp, ArrowDown, Search, Lock, User, CheckCircle, HelpCircle
} from 'lucide-react';
import { ScreenReaderLog } from '../types';

interface DiagramProps {
  id: number;
}

export const InteractiveDiagram: React.FC<DiagramProps> = ({ id }) => {
  // Common states across multiple simulators
  const [logs, setLogs] = useState<ScreenReaderLog[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const addLog = (msg: string, type: 'speech' | 'alert' | 'system' = 'speech') => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [{ timestamp, message: msg, type }, ...prev.slice(0, 15)]);
    
    // Simple mock Web Audio TTS cue
    if (!isMuted && type === 'speech' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.rate = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const clearLogs = () => setLogs([]);

  // Clear speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Specialized states for individual diagrams
  // Q1: Empathy Simulator
  const [empathyFilter, setEmpathyFilter] = useState<'none' | 'blind' | 'keyboard' | 'colorblind'>('none');
  const [q1Step, setQ1Step] = useState(0);

  // Q2: a11y numeronym
  const [q2HoveredIdx, setQ2HoveredIdx] = useState<number | null>(null);

  // Q3: POUR principle
  const [q3Principle, setQ3Principle] = useState<'P' | 'O' | 'U' | 'R'>('P');

  // Q4: WCAG Levels
  const [q4Level, setQ4Level] = useState<'A' | 'AA' | 'AAA'>('AA');

  // Q5: Semantic HTML vs Div soup
  const [q5Mode, setQ5Mode] = useState<'semantic' | 'div'>('semantic');
  const [q5FocusedNode, setQ5FocusedNode] = useState<string | null>(null);

  // Q6: Div Click vs Button
  const [q6KeyEvents, setQ6KeyEvents] = useState<string[]>([]);
  const [q6FocusTarget, setQ6FocusTarget] = useState<'none' | 'button' | 'div'>('none');

  // Q7: ARIA node editor
  const [q7Expanded, setQ7Expanded] = useState<boolean>(false);
  const [q7Checked, setQ7Checked] = useState<boolean>(false);
  const [q7Role, setQ7Role] = useState<string>('button');

  // Q8: Details native vs custom ARIA
  const [q8ActiveTab, setQ8ActiveTab] = useState<'native' | 'custom'>('native');
  const [q8DetailsOpen, setQ8DetailsOpen] = useState(false);

  // Q9: aria-label
  const [q9LabelText, setQ9LabelText] = useState('Delete permanent backup');

  // Q10: aria-labelledby
  const [q10HoverId, setQ10HoverId] = useState<string | null>(null);

  // Q11: aria-describedby
  const [q11Value, setQ11Value] = useState('');
  const [q11Linked, setQ11Linked] = useState(true);

  // Q12: aria-hidden layers
  const [q12Layer, setQ12Layer] = useState<'both' | 'screen' | 'reader'>('both');

  // Q13: aria-live chat
  const [q13Mode, setQ13Mode] = useState<'off' | 'polite' | 'assertive'>('polite');
  const [q13Input, setQ13Input] = useState('');
  const [q13History, setQ13History] = useState<string[]>(['System reboot completed.', 'Database status: nominal.']);

  // Q14: Polite vs Assertive
  const [q14Speeches, setQ14Speeches] = useState<{ id: number; text: string; urgent: boolean; processed: boolean }[]>([]);

  // Q15 & Q16: Focus trap and Modal Accessibility
  const [q15ModalOpen, setQ15ModalOpen] = useState(false);
  const [q15TrapEnabled, setQ15TrapEnabled] = useState(true);
  const [q15RestoreEnabled, setQ15RestoreEnabled] = useState(true);
  const [q15EscEnabled, setQ15EscEnabled] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);
  const modalConfirmBtnRef = useRef<HTMLButtonElement>(null);
  const q15TriggerRef = useRef<HTMLButtonElement>(null);

  // Q17: Keyboard Navigation
  const [q17FocusIdx, setQ17FocusIdx] = useState<number>(0);
  const q17Items = ['Dashboard Home', 'Account Settings', 'Security Logs', 'API Terminals'];

  // Q18: Skip to Content
  const [q18SkipFocused, setQ18SkipFocused] = useState(false);
  const [q18Status, setQ18Status] = useState<'idle' | 'skipped' | 'tabbed'>('idle');

  // Q19: DOM vs Visual Focus Order
  const [q19IsVisualOrderFixed, setQ19IsVisualOrderFixed] = useState(false);
  const [q19ActiveStep, setQ19ActiveStep] = useState<number>(-1);

  // Q20: tabindex="0"
  const [q20Enabled, setQ20Enabled] = useState(false);

  // Q21: tabindex="-1" drawer
  const [q21DrawerOpen, setQ21DrawerOpen] = useState(false);
  const drawerHeaderRef = useRef<HTMLHeadingElement>(null);

  // Q22: Avoid positive tabindex
  const [q22TabMode, setQ22TabMode] = useState<'natural' | 'positive'>('natural');
  const [q22Step, setQ22Step] = useState(-1);

  // Q23: Color Contrast
  const [q23Fg, setQ23Fg] = useState('#777777');
  const [q23Bg, setQ23Bg] = useState('#FFFFFF');

  // Q24: Color as Info
  const [q24Colorblind, setQ24Colorblind] = useState(false);
  const [q24Fix, setQ24Fix] = useState(false);
  const [q24Username, setQ24Username] = useState('');

  // Q25: Image Alt Text
  const [q25AltType, setQ25AltType] = useState<'empty' | 'descriptive' | 'missing'>('descriptive');

  // Q26: Custom Dropdown
  const [q26Open, setQ26Open] = useState(false);
  const [q26Selected, setQ26Selected] = useState('Emerald Green');
  const [q26ActiveIdx, setQ26ActiveIdx] = useState(0);
  const q26Options = ['Emerald Green', 'Royal Blue', 'Crimson Red', 'Amber Orange'];

  // Q27: Accessibility Tree live view
  const [q27HtmlType, setQ27HtmlType] = useState<'button' | 'checkbox' | 'input'>('button');

  // Q28 & Q29: Lighthouse testing and Automated limits
  const [q28Auditing, setQ28Auditing] = useState(false);
  const [q28Score, setQ28Score] = useState(45);
  const [q28FixedIssues, setQ28FixedIssues] = useState<string[]>([]);

  // Q30 & Q31: Form label targets and association
  const [q30LabelActive, setQ30LabelActive] = useState(true);
  const [q30ClickLog, setQ30ClickLog] = useState('');

  // Q32: Form Validation sandbox
  const [q32Email, setQ32Email] = useState('');
  const [q32Submitted, setQ32Submitted] = useState(false);
  const [q32Error, setQ32Error] = useState('');

  // Q33: Accessible Name Calculator
  const [q33AriaLabelledby, setQ33AriaLabelledby] = useState('');
  const [q33AriaLabel, setQ33AriaLabel] = useState('Add to Shopping Cart');
  const [q33TextContent, setQ33TextContent] = useState('Buy Now');
  const [q33Title, setQ33Title] = useState('Checkout Action');

  // Q34: SPA routing focus
  const [q34Page, setQ34Page] = useState('Home');
  const [q34FocusManaged, setQ34FocusManaged] = useState(true);
  const pageHeadingRef = useRef<HTMLHeadingElement>(null);

  // Q35: Custom switch toggle
  const [q35Checked, setQ35Checked] = useState(false);

  // Q36: role="button" checklist
  const [q36Checks, setQ36Checks] = useState<Record<string, boolean>>({
    focus: false,
    click: true,
    space: false,
    enter: false,
    roleDesc: true,
  });

  // Q37: Landmark Highlighter
  const [q37ActiveLandmark, setQ37ActiveLandmark] = useState<string | null>(null);

  // Q38: Chart alternative table switcher
  const [q38View, setQ38View] = useState<'chart' | 'table' | 'split'>('chart');

  // Q39: Focus indicator toggler
  const [q39Outline, setQ39Outline] = useState(true);

  // Q40: Real-time Stock Feed
  const [q40Ticker, setQ40Ticker] = useState<{ symbol: string; price: number; change: number; textDirection: 'up' | 'down' }>({
    symbol: 'GOOG', price: 175.40, change: 0.85, textDirection: 'up'
  });

  // Focus trap effects
  useEffect(() => {
    if (!q15ModalOpen || !q15TrapEnabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll('button, [tabindex="0"]');
        if (focusable.length === 0) return;
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }

      if (e.key === 'Escape' && q15EscEnabled) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [q15ModalOpen, q15TrapEnabled, q15EscEnabled]);

  const openModal = () => {
    setQ15ModalOpen(true);
    addLog("Modal dialog opened. Screen reader focus locked inside.", "alert");
    setTimeout(() => {
      if (modalCloseBtnRef.current) modalCloseBtnRef.current.focus();
    }, 50);
  };

  const closeModal = () => {
    setQ15ModalOpen(false);
    addLog("Modal dialog closed.", "system");
    if (q15RestoreEnabled && q15TriggerRef.current) {
      q15TriggerRef.current.focus();
      addLog("Keyboard focus restored safely to open trigger button.");
    }
  };

  // Contrast Calculator helper
  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const calculateContrast = (hex1: string, hex2: string) => {
    const getLuminance = (rgb: { r: number; g: number; b: number }) => {
      const a = [rgb.r, rgb.g, rgb.b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const l1 = getLuminance(hexToRgb(hex1));
    const l2 = getLuminance(hexToRgb(hex2));
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return ((brightest + 0.05) / (darkest + 0.05)).toFixed(2);
  };

  const currentContrast = calculateContrast(q23Fg, q23Bg);
  const contrastRatioNum = parseFloat(currentContrast);

  // Q40 Dashboard updates
  useEffect(() => {
    if (id !== 40 || !isPlaying) return;

    const interval = setInterval(() => {
      const isUp = Math.random() > 0.4;
      const delta = parseFloat((Math.random() * 0.9 + 0.1).toFixed(2));
      const newPrice = parseFloat((175.40 + (isUp ? delta : -delta)).toFixed(2));
      
      setQ40Ticker({
        symbol: 'GOOG',
        price: newPrice,
        change: delta,
        textDirection: isUp ? 'up' : 'down'
      });

      const speechMessage = `GOOG updated to $${newPrice}. ${isUp ? 'Up' : 'Down'} ${delta} percent.`;
      
      if (q13Mode === 'assertive') {
        addLog(`[ALERT] ${speechMessage}`, 'alert');
      } else if (q13Mode === 'polite') {
        addLog(speechMessage, 'speech');
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [id, isPlaying, q13Mode]);

  return (
    <div className="mt-6 border border-slate-800 bg-[#14171D] rounded-2xl p-5 md:p-6 shadow-lg overflow-hidden text-slate-100" id={`diagram-${id}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" aria-hidden="true" />
          <h4 className="font-semibold text-slate-200 text-sm md:text-base">
            Concept Simulator & Visual Playground
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              isMuted 
                ? 'bg-cyan-950/40 text-cyan-300 border-cyan-800/40 hover:bg-cyan-900/30' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle speech synthesis feedback"
          >
            {isMuted ? <Volume2 className="w-3.5 h-3.5 line-through" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isMuted ? 'Muted' : 'Hear TTS'}</span>
          </button>
          {logs.length > 0 && (
            <button
              onClick={clearLogs}
              className="px-2 py-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              Clear Logs
            </button>
          )}
        </div>
      </div>

      {/* Simulator Grid split-screen: Sandbox vs Screen Reader output logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Dynamic Sandbox Widget */}
        <div className="lg:col-span-8 bg-[#0F1219] border border-slate-800/60 rounded-xl p-5 shadow-inner min-h-[280px] flex flex-col justify-between text-slate-200">
          
          {/* RENDER THE EXACT SIMULATOR FOR THIS TOPIC */}

          {/* Q1: Intro to a11y Disability Empathy Simulator */}
          {id === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-medium">Select a user profile simulation to test this content block:</p>
              <div className="flex flex-wrap gap-2">
                {(['none', 'blind', 'keyboard', 'colorblind'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setEmpathyFilter(filter);
                      if (filter === 'blind') {
                        addLog("Simulating Blind screen reader user. Page turns into an acoustic list.");
                      } else if (filter === 'keyboard') {
                        addLog("Simulating Motor-Impaired Keyboard user. Mouse clicks are locked out.");
                      } else if (filter === 'colorblind') {
                        addLog("Simulating Red-Green colorblindness. Pure color cues are disabled.");
                      } else {
                        addLog("Simulation disabled.");
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      empathyFilter === filter 
                        ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {filter === 'none' && 'Normal Sight'}
                    {filter === 'blind' && 'Blind (Audio Feed)'}
                    {filter === 'keyboard' && 'Keyboard-Only'}
                    {filter === 'colorblind' && 'Color Blindness'}
                  </button>
                ))}
              </div>

              <div className={`mt-4 p-4 border rounded-lg transition-all ${
                empathyFilter === 'colorblind' ? 'grayscale contrast-50' : ''
              } ${empathyFilter === 'blind' ? 'bg-slate-900 border-slate-800 text-green-400 font-mono' : 'bg-slate-50 text-slate-800'}`}>
                {empathyFilter === 'blind' ? (
                  <div className="space-y-2">
                    <p className="text-xs text-yellow-400 font-bold border-b border-yellow-400 pb-1">SCREEN READER SPEECH AUDIT:</p>
                    <p className="text-sm">"Heading Level 1: Designing for Everyone. Text block: Our website supports keyboard navigation and high contrast out of the box."</p>
                    <p className="text-xs text-slate-500">Interactive controls are highlighted as speech lines.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h5 className="font-bold text-base text-slate-900">Designing for Everyone</h5>
                    <p className="text-sm text-slate-600">Our app supports keyboard navigation and high contrast out of the box.</p>
                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={() => {
                          if (empathyFilter === 'keyboard') {
                            addLog("Error: Mouse click ignored! Please navigate with Tab and press Enter.");
                          } else {
                            addLog("Successfully clicked Accept!");
                          }
                        }}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium border text-white ${
                          q1Step === 1 ? 'ring-2 ring-cyan-500' : ''
                        } bg-cyan-600 border-cyan-700`}
                      >
                        Accept Terms
                      </button>
                      <button 
                        onClick={() => {
                          if (empathyFilter === 'keyboard') {
                            addLog("Error: Mouse click ignored! Please navigate with Tab.");
                          } else {
                            addLog("Successfully clicked Cancel.");
                          }
                        }}
                        className="px-3 py-1.5 rounded-md text-xs font-medium border bg-white border-slate-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {empathyFilter === 'keyboard' && (
                <div className="p-2 bg-cyan-50 border border-cyan-100 rounded text-[11px] text-cyan-700 font-medium">
                  💡 Keyboard simulation: Notice you cannot click Accept unless you Tab onto it! Press Tab on your real keyboard.
                </div>
              )}
            </div>
          )}

          {/* Q2: a11y numeronym visually highlighted */}
          {id === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-medium">Hover or tap on letters to reveal how the abbreviation works:</p>
              <div className="flex justify-center items-center gap-1.5 py-6 bg-slate-50 rounded-lg border border-slate-100">
                <div 
                  className="w-12 h-14 bg-cyan-600 text-white rounded-lg flex items-center justify-center font-bold text-2xl shadow-sm transition-all scale-110"
                  onMouseEnter={() => { addLog("Letter 'a' at position 1"); setQ2HoveredIdx(0); }}
                  onMouseLeave={() => setQ2HoveredIdx(null)}
                >
                  a
                </div>

                <div className="flex gap-0.5 px-3 py-2 bg-white rounded-md border border-slate-200 relative group">
                  {['c','c','e','s','s','i','b','i','l','i','t'].map((letter, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => {
                        setQ2HoveredIdx(idx + 1);
                        addLog(`Letter '${letter}' inside the 11-letter compressed span (Index ${idx + 1} of 11)`);
                      }}
                      onMouseLeave={() => setQ2HoveredIdx(null)}
                      className={`w-5 h-8 rounded text-xs flex items-center justify-center font-mono font-semibold transition-all ${
                        q2HoveredIdx === idx + 1 ? 'bg-cyan-100 text-cyan-700 font-bold scale-110' : 'bg-slate-50 text-slate-500'
                      }`}
                    >
                      {letter}
                    </div>
                  ))}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-0.5 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    11 letters inside
                  </div>
                </div>

                <div 
                  className="w-12 h-14 bg-cyan-600 text-white rounded-lg flex items-center justify-center font-bold text-2xl shadow-sm transition-all scale-110"
                  onMouseEnter={() => { addLog("Letter 'y' at position 13"); setQ2HoveredIdx(12); }}
                  onMouseLeave={() => setQ2HoveredIdx(null)}
                >
                  y
                </div>
              </div>

              <div className="text-center p-3 border border-slate-200 rounded-lg bg-cyan-50/50">
                <span className="text-xs text-slate-600 font-semibold">Resulting Numeronym: </span>
                <span className="font-bold text-lg text-cyan-700 tracking-wide font-mono bg-white px-3 py-1 rounded border border-cyan-200">
                  a11y
                </span>
              </div>
            </div>
          )}

          {/* Q3: POUR Principles */}
          {id === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {(['P', 'O', 'U', 'R'] as const).map((principle) => (
                  <button
                    key={principle}
                    onClick={() => {
                      setQ3Principle(principle);
                      if (principle === 'P') addLog("Perceivable: Users must be able to recognize information. Test contrast and layouts.");
                      if (principle === 'O') addLog("Operable: Users must be able to operate the controls. Test keyboard focus.");
                      if (principle === 'U') addLog("Understandable: Content must be readable. Test simple labels.");
                      if (principle === 'R') addLog("Robust: Compatible with future/diverse agents. Test native HTML tags.");
                    }}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                      q3Principle === principle 
                        ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {principle === 'P' && 'P - Perceivable'}
                    {principle === 'O' && 'O - Operable'}
                    {principle === 'U' && 'U - Understandable'}
                    {principle === 'R' && 'R - Robust'}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-150 min-h-[140px] flex flex-col justify-between">
                {q3Principle === 'P' && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Perceivable Sandbox</span>
                    <p className="text-xs text-slate-600">Simulate low contrast or screen zoom. Screen readers parse alt descriptions:</p>
                    <div className="flex items-center gap-3 p-2 bg-white rounded border border-slate-200">
                      <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120" alt="Fresh green salad plate with tomatoes and avocados" className="w-10 h-10 object-cover rounded" />
                      <div>
                        <p className="text-xs font-bold text-slate-800">Alt text representation:</p>
                        <p className="text-[11px] text-slate-500 italic">"Fresh green salad plate..."</p>
                      </div>
                    </div>
                  </div>
                )}
                {q3Principle === 'O' && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Operable Sandbox</span>
                    <p className="text-xs text-slate-600">Test keyboard focus indicators by clicking below and pressing Tab:</p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-white border border-slate-300 rounded text-xs hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                        Tab Target 1
                      </button>
                      <button className="px-3 py-1 bg-white border border-slate-300 rounded text-xs hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                        Tab Target 2
                      </button>
                    </div>
                  </div>
                )}
                {q3Principle === 'U' && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Understandable Sandbox</span>
                    <p className="text-xs text-slate-600">Complex error boxes must tell the user exactly how to fix the problem:</p>
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-800 font-medium">
                      ❌ Password is too short. Please add at least 4 more characters.
                    </div>
                  </div>
                )}
                {q3Principle === 'R' && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Robust Sandbox</span>
                    <p className="text-xs text-slate-600">Uses clean semantic markup like {"<time>"} that any software can translate:</p>
                    <div className="p-2 bg-white rounded border border-slate-200 font-mono text-xs">
                      Code: <code className="text-cyan-600">{"<time datetime=\"2026-07-17\">July 17, 2026</time>"}</code>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Q4: WCAG Conformance Levels */}
          {id === 4 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-medium font-mono">Conformity levels stack cumulative rules:</p>
              <div className="flex flex-col gap-2">
                {[
                  { level: 'AAA', desc: 'Strict (Level AAA) - Color contrast 7:1, sign language translation, no distracting flashing.', color: 'border-emerald-500 bg-emerald-50 text-emerald-800' },
                  { level: 'AA', desc: 'Standard (Level AA) - Contrast 4.5:1, skip links, clear focus indicators (Legally required baseline).', color: 'border-cyan-500 bg-cyan-50/70 text-cyan-800' },
                  { level: 'A', desc: 'Minimum (Level A) - Keyboards operable, no keyboard traps, basic alt text provided.', color: 'border-cyan-500 bg-cyan-50 text-cyan-800' }
                ].map((item) => (
                  <button
                    key={item.level}
                    onClick={() => {
                      setQ4Level(item.level as any);
                      addLog(`Selected Conformance ${item.level}: ${item.desc}`);
                    }}
                    className={`p-3 text-left border rounded-lg transition-all ${
                      q4Level === item.level 
                        ? `${item.color} ring-2 ring-cyan-500 scale-[1.02] font-bold shadow-sm` 
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span>{item.desc}</span>
                      {q4Level === item.level && <Check className="w-4 h-4 text-cyan-600" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Q5: Semantic HTML vs Div soup */}
          {id === 5 && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() => { setQ5Mode('semantic'); addLog("Semantic DOM selected. High quality tags."); }}
                  className={`flex-1 py-1.5 rounded text-xs font-semibold border ${
                    q5Mode === 'semantic' ? 'bg-cyan-600 text-white' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  Semantic Markup
                </button>
                <button
                  onClick={() => { setQ5Mode('div'); addLog("Div Soup DOM selected. No semantics."); }}
                  className={`flex-1 py-1.5 rounded text-xs font-semibold border ${
                    q5Mode === 'div' ? 'bg-cyan-600 text-white' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  "Div Soup" Markup
                </button>
              </div>

              <div className="p-4 bg-slate-50 border rounded-lg min-h-[160px] font-mono text-xs">
                {q5Mode === 'semantic' ? (
                  <div className="space-y-2">
                    <p className="text-slate-400">// Accessibility Tree builds automatically for free</p>
                    <div 
                      className="p-2 bg-cyan-50 border border-cyan-200 rounded cursor-pointer hover:bg-cyan-100"
                      onMouseEnter={() => { addLog("Focused element: Header tag. Role is banner."); setQ5FocusedNode('header'); }}
                    >
                      &lt;header&gt; <span className="text-slate-500">// Screen Reader says: "Banner"</span>
                    </div>
                    <div 
                      className="p-2 bg-cyan-50 border border-cyan-200 rounded cursor-pointer hover:bg-cyan-100"
                      onMouseEnter={() => { addLog("Focused element: Button tag. Role is button."); setQ5FocusedNode('button'); }}
                    >
                      &nbsp;&nbsp;&lt;button&gt;Submit&lt;/button&gt; <span className="text-slate-500">// "Submit, button"</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-slate-600">
                    <p className="text-slate-400">// Screen readers see static plain text nodes with zero clues</p>
                    <div 
                      className="p-2 bg-cyan-50 border border-cyan-200 rounded cursor-pointer"
                      onMouseEnter={() => { addLog("Focused element: div. Screen reader says: 'group', no distinct label."); setQ5FocusedNode('div1'); }}
                    >
                      &lt;div class="hdr"&gt; <span className="text-slate-500">// Screen reader is silent</span>
                    </div>
                    <div 
                      className="p-2 bg-cyan-50 border border-cyan-200 rounded cursor-pointer"
                      onMouseEnter={() => { addLog("Focused element: div. Silent text node."); setQ5FocusedNode('div2'); }}
                    >
                      &nbsp;&nbsp;&lt;div onclick="send()"&gt;Submit&lt;/div&gt; <span className="text-slate-500">// Just says "Submit". Impossible to trigger with Tab!</span>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-slate-500 text-center">Hover nodes in the code frame to hear screen reader output!</p>
            </div>
          )}

          {/* Q6: Div Click vs Button */}
          {id === 6 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">Test tabbing and clicking on a native Button vs a custom clickable Div:</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex flex-col justify-between items-center text-center">
                  <span className="text-xs font-bold text-slate-700 block mb-2">Native Element</span>
                  <button
                    onClick={() => {
                      addLog("Clicked button natively! Click event triggered successfully.");
                    }}
                    onFocus={() => {
                      setQ6FocusTarget('button');
                      addLog("Focused: button, 'Submit Natively'");
                    }}
                    onBlur={() => setQ6FocusTarget('none')}
                    className="px-4 py-2 bg-cyan-600 text-white text-xs font-semibold rounded hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    Submit Natively
                  </button>
                  <p className="text-[10px] text-slate-500 mt-2">Automatically focusable. Press Space/Enter to trigger.</p>
                </div>

                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex flex-col justify-between items-center text-center">
                  <span className="text-xs font-bold text-slate-700 block mb-2">Clickable Div</span>
                  <div
                    onClick={() => {
                      addLog("Clicked div via mouse pointer! But keyboard users cannot click.");
                    }}
                    className="px-4 py-2 bg-cyan-200 text-slate-800 text-xs font-semibold rounded cursor-pointer hover:bg-cyan-300"
                  >
                    Submit Custom
                  </div>
                  <p className="text-[10px] text-red-600 mt-2">❌ Keyboard invisible. Tab completely bypasses this div!</p>
                </div>
              </div>
            </div>
          )}

          {/* Q7: ARIA node editor */}
          {id === 7 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">Modify the state properties to watch the generated Accessibility Node mutate:</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">aria-expanded</label>
                    <input 
                      type="checkbox" 
                      checked={q7Expanded} 
                      onChange={(e) => {
                        setQ7Expanded(e.target.checked);
                        addLog(`Updated aria-expanded to ${e.target.checked}`);
                      }} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">aria-checked</label>
                    <input 
                      type="checkbox" 
                      checked={q7Checked} 
                      onChange={(e) => {
                        setQ7Checked(e.target.checked);
                        addLog(`Updated aria-checked to ${e.target.checked}`);
                      }} 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-700">role</label>
                    <select 
                      value={q7Role} 
                      onChange={(e) => {
                        setQ7Role(e.target.value);
                        addLog(`Updated ARIA role to: ${e.target.value}`);
                      }}
                      className="text-xs border rounded p-1"
                    >
                      <option value="button">button</option>
                      <option value="checkbox">checkbox</option>
                      <option value="switch">switch</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 text-slate-200 font-mono text-xs rounded border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-cyan-400 font-bold block mb-1">Accessibility Node:</span>
                    <p className="text-yellow-400">&lt;div</p>
                    <p className="text-cyan-400">&nbsp;&nbsp;role="<span className="text-green-300">{q7Role}</span>"</p>
                    <p className="text-cyan-400">&nbsp;&nbsp;aria-expanded="<span className="text-green-300">{q7Expanded ? 'true' : 'false'}</span>"</p>
                    <p className="text-cyan-400">&nbsp;&nbsp;aria-checked="<span className="text-green-300">{q7Checked ? 'true' : 'false'}</span>"</p>
                    <p className="text-yellow-400">&gt;</p>
                  </div>
                  <button 
                    onClick={() => addLog(`Screen reader reads: "${q7Role === 'checkbox' ? (q7Checked ? 'checked checkbox' : 'unchecked checkbox') : q7Role} ${q7Expanded ? 'expanded' : 'collapsed'}"`)}
                    className="mt-2 py-1 bg-cyan-600 text-white rounded text-[10px]"
                  >
                    Simulate Read
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Q8: First Rule of ARIA details vs summary */}
          {id === 8 && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setQ8ActiveTab('native')}
                  className={`flex-1 py-1 rounded text-xs font-semibold border ${
                    q8ActiveTab === 'native' ? 'bg-cyan-600 text-white' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  Native &lt;details&gt; (No JS/ARIA)
                </button>
                <button
                  onClick={() => setQ8ActiveTab('custom')}
                  className={`flex-1 py-1 rounded text-xs font-semibold border ${
                    q8ActiveTab === 'custom' ? 'bg-cyan-600 text-white' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  Custom ARIA Div (Overengineered)
                </button>
              </div>

              <div className="p-4 bg-slate-50 border rounded-lg min-h-[120px] flex items-center justify-center">
                {q8ActiveTab === 'native' ? (
                  <details className="w-full bg-white p-3 rounded border border-slate-200">
                    <summary className="cursor-pointer text-xs font-bold text-slate-800 select-none">
                      Why is native details element superior?
                    </summary>
                    <p className="text-xs text-slate-600 mt-2">
                      Because it requires 0 lines of custom Javascript and fully implements keyboard and screen reader states automatically!
                    </p>
                  </details>
                ) : (
                  <div className="w-full bg-white p-3 rounded border border-cyan-200">
                    <button
                      onClick={() => {
                        setQ8DetailsOpen(!q8DetailsOpen);
                        addLog(`Toggle div. Set aria-expanded="${!q8DetailsOpen}"`);
                      }}
                      aria-expanded={q8DetailsOpen}
                      className="w-full text-left flex justify-between items-center text-xs font-bold text-cyan-800"
                    >
                      <span>Why is native details element superior?</span>
                      <span>{q8DetailsOpen ? '▲' : '▼'}</span>
                    </button>
                    {q8DetailsOpen && (
                      <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-slate-100">
                        This custom container requires state synchronization, keyboard event listening, and aria configurations. Easy to mess up!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Q9: aria-label icon-only designer */}
          {id === 9 && (
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-700">Configure button aria-label text:</label>
                <input
                  type="text"
                  value={q9LabelText}
                  onChange={(e) => setQ9LabelText(e.target.value)}
                  className="p-2 border rounded text-xs"
                  placeholder="e.g. Delete this task"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-lg flex flex-col items-center justify-center gap-3">
                <button
                  aria-label={q9LabelText}
                  onClick={() => addLog(`Screen reader announces: "${q9LabelText}, button"`)}
                  className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors focus:ring-4 focus:ring-red-200"
                  title={q9LabelText}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <span className="text-[10px] text-slate-500">Tap the trash icon above to listen to the Screen Reader readout.</span>
              </div>
            </div>
          )}

          {/* Q10: aria-labelledby visual connection mapping */}
          {id === 10 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-medium">Hover over the connections below to see how ID references link:</p>
              <div className="border border-slate-200 bg-slate-50 p-4 rounded-lg space-y-4 relative">
                <div 
                  id="header-id-q10" 
                  onMouseEnter={() => setQ10HoverId('header')}
                  onMouseLeave={() => setQ10HoverId(null)}
                  className={`p-2 border rounded text-center text-xs transition-all ${
                    q10HoverId === 'header' ? 'bg-cyan-100 border-cyan-400 font-bold' : 'bg-white'
                  }`}
                >
                  &lt;h2 id="<span className="text-cyan-600 font-bold">dialog-heading</span>"&gt;Delete Confirm&lt;/h2&gt;
                </div>

                <div className="flex justify-center py-1">
                  <div className={`w-0.5 h-6 transition-all ${
                    q10HoverId ? 'bg-cyan-500 scale-y-110' : 'bg-slate-300'
                  }`} />
                </div>

                <div 
                  aria-labelledby="dialog-heading-q10"
                  onMouseEnter={() => setQ10HoverId('dialog')}
                  onMouseLeave={() => setQ10HoverId(null)}
                  className={`p-2 border rounded text-center text-xs transition-all ${
                    q10HoverId === 'dialog' ? 'bg-cyan-50 border-cyan-400 shadow-sm' : 'bg-white'
                  }`}
                >
                  &lt;div role="dialog" <span className="text-red-600 font-semibold">aria-labelledby</span>="<span className="text-cyan-600 font-bold">dialog-heading</span>"&gt;...&lt;/div&gt;
                </div>
              </div>
              <p className="text-[11px] text-center text-slate-600 font-mono">
                {q10HoverId ? "Accessible Name: 'Delete Confirm'" : "Hover cards to trace labels."}
              </p>
            </div>
          )}

          {/* Q11: aria-describedby interactive hint sandbox */}
          {id === 11 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Link description with input?</span>
                <button
                  onClick={() => {
                    setQ11Linked(!q11Linked);
                    addLog(`Toggled association. Linking is now ${!q11Linked ? 'DISABLED' : 'ENABLED'}`);
                  }}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                    q11Linked ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {q11Linked ? 'Linked (Standard)' : 'Broken (Fail)'}
                </button>
              </div>

              <div className="space-y-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <label className="text-xs font-bold text-slate-800" htmlFor="q11-input">Password field:</label>
                <input
                  id="q11-input"
                  type="password"
                  value={q11Value}
                  onChange={(e) => setQ11Value(e.target.value)}
                  aria-describedby={q11Linked ? 'pwd-requirement-q11' : undefined}
                  onFocus={() => {
                    if (q11Linked) {
                      addLog("Focused: Password edit text. Description hint: Must be 8 characters or more.");
                    } else {
                      addLog("Focused: Password edit text. (Silent, requirement text skipped entirely)");
                    }
                  }}
                  className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-cyan-500"
                  placeholder="Type anything..."
                />
                <p id="pwd-requirement-q11" className={`text-xs ${q11Linked ? 'text-cyan-600 font-semibold' : 'text-slate-400'}`}>
                  🔑 Hint: Must be 8 characters or more.
                </p>
              </div>
            </div>
          )}

          {/* Q12: aria-hidden Layer Explorer */}
          {id === 12 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-medium">Select view perspectives of a visual button with a decorative heart icon:</p>
              <div className="grid grid-cols-3 gap-2">
                {(['both', 'screen', 'reader'] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setQ12Layer(view)}
                    className={`py-1.5 rounded text-xs font-bold border ${
                      q12Layer === view ? 'bg-cyan-600 text-white' : 'bg-white text-slate-700'
                    }`}
                  >
                    {view === 'both' && 'Combined View'}
                    {view === 'screen' && 'User Screen Only'}
                    {view === 'reader' && 'Screen Reader View'}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-150 min-h-[120px] flex flex-col justify-between">
                {q12Layer === 'both' && (
                  <div className="flex items-center gap-2 p-3 bg-white rounded border border-slate-200">
                    <span className="text-red-500">❤️</span>
                    <span className="text-xs font-semibold text-slate-800">Add to Favorites (Visual & Semantic tags synchronized)</span>
                  </div>
                )}
                {q12Layer === 'screen' && (
                  <div className="flex items-center gap-2 p-3 bg-white rounded border border-slate-200">
                    <span className="text-red-500 animate-bounce">❤️</span>
                    <span className="text-xs font-semibold text-slate-800">Add to Favorites (Purely aesthetic visuals)</span>
                  </div>
                )}
                {q12Layer === 'reader' && (
                  <div className="p-3 bg-slate-900 text-green-400 font-mono text-xs rounded">
                    <p className="text-yellow-400">// The heart icon is cleanly hidden via aria-hidden="true"</p>
                    <p>"Focus: Button, 'Add to Favorites'"</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Q13: aria-live Chat Notification simulator */}
          {id === 13 && (
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-700">Choose live region intensity:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['off', 'polite', 'assertive'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setQ13Mode(mode);
                        addLog(`Set aria-live to: ${mode}`);
                      }}
                      className={`py-1 rounded text-xs font-bold border ${
                        q13Mode === mode ? 'bg-cyan-600 text-white' : 'bg-white text-slate-700'
                      }`}
                    >
                      {mode === 'off' && 'off (Silent)'}
                      {mode === 'polite' && 'polite (Polite)'}
                      {mode === 'assertive' && 'assertive (Loud)'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={q13Input}
                  onChange={(e) => setQ13Input(e.target.value)}
                  className="flex-1 p-2 border rounded text-xs"
                  placeholder="Type a custom dynamic notice..."
                />
                <button
                  onClick={() => {
                    if (!q13Input.trim()) return;
                    setQ13History((prev) => [q13Input, ...prev.slice(0, 5)]);
                    if (q13Mode !== 'off') {
                      addLog(`Notification update: ${q13Input}`, q13Mode === 'assertive' ? 'alert' : 'speech');
                    } else {
                      addLog(`(Notice logged silently in database: "${q13Input}")`, 'system');
                    }
                    setQ13Input('');
                  }}
                  className="px-3 bg-cyan-600 text-white rounded text-xs font-bold"
                >
                  Push alert
                </button>
              </div>

              <div className="p-3 bg-slate-50 rounded border max-h-[110px] overflow-y-auto space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Dashboard Log Updates:</span>
                {q13History.map((item, idx) => (
                  <p key={idx} className="text-xs text-slate-600">• {item}</p>
                ))}
              </div>
            </div>
          )}

          {/* Q14: Polite vs Assertive speech timeline */}
          {id === 14 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-medium">Enqueue messages to see how 'Polite' delays compared to 'Assertive' interrupts:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    addLog("Reading normal long documentation paragraph text about styling grids...");
                  }}
                  className="flex-1 py-1.5 bg-slate-200 hover:bg-slate-300 rounded text-xs text-slate-800 font-semibold"
                >
                  Simulate standard continuous speech
                </button>
                <button
                  onClick={() => {
                    addLog("CRITICAL ERROR: Session expired!", 'alert');
                  }}
                  className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold"
                >
                  Fire Assertive Interrupt!
                </button>
              </div>
              <p className="text-[11px] text-slate-500 text-center">Assertive cuts off the ongoing TTS voice queue instantly.</p>
            </div>
          )}

          {/* Q15 & Q16: Focus trap and Modal Accessibility Sandbox */}
          {(id === 15 || id === 16) && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-medium">Toggle modal constraints, then launch to inspect focus behaviors:</p>
              
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border rounded-lg">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-700">Trap Focus (Tab key)</label>
                  <input type="checkbox" checked={q15TrapEnabled} onChange={(e) => setQ15TrapEnabled(e.target.checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-700">Return Focus on Close</label>
                  <input type="checkbox" checked={q15RestoreEnabled} onChange={(e) => setQ15RestoreEnabled(e.target.checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-700">Close on ESC Key</label>
                  <input type="checkbox" checked={q15EscEnabled} onChange={(e) => setQ15EscEnabled(e.target.checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-700">Inert Background</label>
                  <span className="text-[10px] bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded font-mono">aria-hidden</span>
                </div>
              </div>

              <div className="flex justify-center py-3">
                <button
                  ref={q15TriggerRef}
                  onClick={openModal}
                  className="px-4 py-2 bg-cyan-600 text-white rounded text-xs font-bold hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200"
                >
                  Launch Simulator Modal
                </button>
              </div>

              {q15ModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4">
                  <div 
                    ref={modalRef} 
                    className="bg-white border rounded-lg p-6 max-w-sm w-full shadow-2xl relative space-y-4 border-cyan-200"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="sim-modal-title"
                  >
                    <h3 id="sim-modal-title" className="font-bold text-slate-900 text-sm">Interactive Testing Modal</h3>
                    <p className="text-xs text-slate-600">
                      Try hitting the <strong>Tab</strong> key repeatedly on your keyboard. 
                    </p>
                    <div className="p-2.5 bg-yellow-50 border border-yellow-200 rounded text-[11px] text-yellow-800">
                      Settings: Focus Trap: {q15TrapEnabled ? 'ACTIVE ✅' : 'INACTIVE ❌'}
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        ref={modalConfirmBtnRef}
                        onClick={() => { addLog("Confirmed action inside modal!"); closeModal(); }}
                        className="px-3 py-1.5 bg-cyan-600 text-white rounded text-xs font-bold"
                      >
                        Confirm
                      </button>
                      <button
                        ref={modalCloseBtnRef}
                        onClick={closeModal}
                        className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded text-xs font-bold"
                      >
                        Close [ESC]
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Q17: Keyboard Navigation */}
          {id === 17 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-medium">Simulated interactive navigation bar with active focus highlight trackers:</p>
              <div className="flex flex-col gap-2">
                {q17Items.map((item, idx) => (
                  <button
                    key={idx}
                    onFocus={() => {
                      setQ17FocusIdx(idx);
                      addLog(`Focused navigation link: ${item} (Item ${idx + 1} of ${q17Items.length})`);
                    }}
                    className={`p-3 text-left border rounded-lg text-xs font-semibold transition-all ${
                      q17FocusIdx === idx 
                        ? 'border-cyan-500 bg-cyan-50/50 ring-2 ring-cyan-500 pl-5 text-cyan-900' 
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Keyboard className="w-4 h-4 text-slate-400" />
                      <span>{item}</span>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 text-center font-mono">Use your real TAB key to focus each target element sequentially.</p>
            </div>
          )}

          {/* Q18: Skip to Content */}
          {id === 18 && (
            <div className="space-y-4 relative">
              {/* Skip link simulated */}
              <button
                onFocus={() => {
                  setQ18SkipFocused(true);
                  addLog("Focused: Skip to Main Content Link");
                }}
                onBlur={() => setQ18SkipFocused(false)}
                onClick={() => {
                  setQ18Status('skipped');
                  addLog("Skipped directly to main body column!");
                }}
                className={`absolute top-0 left-0 w-full z-20 py-2.5 bg-slate-900 text-white font-bold text-xs text-center transition-transform duration-200 rounded-lg ${
                  q18SkipFocused ? 'translate-y-0 opacity-100 shadow-md' : '-translate-y-20 opacity-0 pointer-events-none'
                }`}
              >
                ⚡ Skip to Main Content (Press Enter)
              </button>

              <p className="text-xs text-slate-500 font-medium">Click on the card below, then press **Tab** to expose the skip link:</p>

              <div className="border border-slate-200 rounded p-4 space-y-3 bg-slate-50">
                <div className="flex justify-between items-center bg-white p-2 border rounded">
                  <span className="text-xs font-bold text-slate-700">Repeated Navigation list (25 items):</span>
                  <button 
                    onFocus={() => {
                      if (q18Status !== 'skipped') {
                        setQ18Status('tabbed');
                        addLog("Tabbing through header menu link 1...");
                      }
                    }}
                    className="px-2 py-1 bg-slate-100 text-[10px] rounded focus:ring-2 focus:ring-cyan-500"
                  >
                    Menu Link 1
                  </button>
                </div>

                <div className={`p-4 rounded border transition-all ${
                  q18Status === 'skipped' ? 'bg-cyan-50 border-cyan-400 ring-2' : 'bg-white border-slate-200'
                }`}>
                  <span className="text-xs font-bold block mb-1">MAIN CONTENT BLOCK</span>
                  <p className="text-[11px] text-slate-600">This represents the main article body. If skipped, you land here instantly.</p>
                </div>
              </div>

              <button 
                onClick={() => {
                  setQ18Status('idle');
                  clearLogs();
                  addLog("Reset simulation.");
                }}
                className="w-full text-center py-1 bg-slate-100 text-slate-600 rounded text-xs"
              >
                Reset layout
              </button>
            </div>
          )}

          {/* Q19: Focus & DOM Order */}
          {id === 19 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Visual layout:</span>
                <button
                  onClick={() => {
                    setQ19IsVisualOrderFixed(!q19IsVisualOrderFixed);
                    setQ19ActiveStep(-1);
                    addLog(`Layout order aligned to DOM: ${!q19IsVisualOrderFixed ? 'FIXED' : 'BROKEN'}`);
                  }}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                    q19IsVisualOrderFixed ? 'bg-emerald-600 text-white' : 'bg-cyan-600 text-white'
                  }`}
                >
                  {q19IsVisualOrderFixed ? 'Logical Alignment (Pass)' : 'Visual / DOM Mismatch (Fail)'}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 py-3 bg-slate-50 rounded-lg p-3">
                {[
                  { id: 1, label: '1. Logo', visualIndex: 0 },
                  { id: 2, label: '2. Search Bar', visualIndex: q19IsVisualOrderFixed ? 1 : 2 },
                  { id: 3, label: '3. Footer Info', visualIndex: q19IsVisualOrderFixed ? 2 : 1 }
                ]
                .sort((a, b) => a.visualIndex - b.visualIndex)
                .map((item, idx) => (
                  <div
                    key={item.id}
                    className={`p-3 border rounded text-center text-xs font-semibold transition-all ${
                      q19ActiveStep === item.id 
                        ? 'border-cyan-600 bg-cyan-50 text-cyan-900 ring-2' 
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  let step = 1;
                  setQ19ActiveStep(1);
                  addLog("Tab 1: Focused Logo");
                  const interval = setInterval(() => {
                    step++;
                    if (step > 3) {
                      clearInterval(interval);
                      setQ19ActiveStep(-1);
                      addLog("Tab stream cycle ended.");
                    } else {
                      setQ19ActiveStep(step);
                      if (step === 2) {
                        addLog(q19IsVisualOrderFixed ? "Tab 2: Focused Search Bar" : "Tab 2: Focused Footer Info (Disorienting skip!)");
                      } else {
                        addLog(q19IsVisualOrderFixed ? "Tab 3: Focused Footer Info" : "Tab 3: Focused Search Bar");
                      }
                    }
                  }, 1200);
                }}
                className="w-full py-1.5 bg-cyan-600 text-white text-xs rounded font-bold"
              >
                Run Tab Path Simulation 🚀
              </button>
            </div>
          )}

          {/* Q20: tabindex="0" */}
          {id === 20 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-700">tabindex="0" enabled?</span>
                <button
                  onClick={() => {
                    setQ20Enabled(!q20Enabled);
                    addLog(`tabindex set to: ${!q20Enabled ? '0' : 'none'}`);
                  }}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                    q20Enabled ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {q20Enabled ? 'Enabled tabindex="0"' : 'Disabled'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div 
                  tabIndex={q20Enabled ? 0 : undefined}
                  onFocus={() => addLog("Focused: Custom Card A")}
                  className="p-4 border rounded-lg bg-white text-center hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                >
                  <span className="text-xs font-bold block">Custom Card A</span>
                  <span className="text-[10px] text-slate-400">Not natively focusable</span>
                </div>
                <div 
                  tabIndex={q20Enabled ? 0 : undefined}
                  onFocus={() => addLog("Focused: Custom Card B")}
                  className="p-4 border rounded-lg bg-white text-center hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                >
                  <span className="text-xs font-bold block">Custom Card B</span>
                  <span className="text-[10px] text-slate-400">Not natively focusable</span>
                </div>
              </div>
              <p className="text-[11px] text-center text-slate-500">
                {q20Enabled ? "✅ Press Tab to focus on Card A and Card B!" : "❌ Try pressing Tab. Cards are bypassed entirely."}
              </p>
            </div>
          )}

          {/* Q21: tabindex="-1" programmatic focus drawer */}
          {id === 21 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">Clicking below programmatically fires `.focus()` to focus an offscreen drawer:</p>
              
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setQ21DrawerOpen(true);
                    addLog("Opened side drawer. Executing drawerHeader.focus() programmatic event.", "system");
                    setTimeout(() => {
                      if (drawerHeaderRef.current) drawerHeaderRef.current.focus();
                    }, 100);
                  }}
                  className="px-4 py-2 bg-cyan-600 text-white rounded text-xs font-bold"
                >
                  Open Drawer & Focus Programmatically
                </button>
              </div>

              {q21DrawerOpen && (
                <div className="border border-cyan-400 bg-cyan-50/50 p-4 rounded-lg relative">
                  <button 
                    onClick={() => { setQ21DrawerOpen(false); addLog("Drawer closed."); }}
                    className="absolute top-2 right-2 text-xs font-bold text-slate-600"
                  >
                    ✕
                  </button>
                  <h5 
                    ref={drawerHeaderRef}
                    tabIndex={-1}
                    className="text-xs font-bold text-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 p-1"
                  >
                    Drawer Navigation Options
                  </h5>
                  <p className="text-[11px] text-slate-600 mt-1">This header has tabindex="-1". Tabbing ignores it, but JS can focus it on open.</p>
                </div>
              )}
            </div>
          )}

          {/* Q22: Avoid positive tabindex */}
          {id === 22 && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() => { setQ22TabMode('natural'); addLog("Natural tab order active."); }}
                  className={`flex-1 py-1 rounded text-xs font-bold border ${
                    q22TabMode === 'natural' ? 'bg-cyan-600 text-white' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  Natural Sequence (Recommended)
                </button>
                <button
                  onClick={() => { setQ22TabMode('positive'); addLog("Positive tab index active. Chaotic override."); }}
                  className={`flex-1 py-1 rounded text-xs font-bold border ${
                    q22TabMode === 'positive' ? 'bg-cyan-600 text-white' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  Positive index Overrides (Avoid!)
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className={`p-3 border rounded ${q22Step === 1 ? 'border-cyan-600 ring-2' : ''}`}>
                  <span>Input Field A</span>
                  <span className="block text-[10px] text-slate-400 font-mono">
                    {q22TabMode === 'positive' ? 'tabindex="2"' : 'Order 1'}
                  </span>
                </div>
                <div className={`p-3 border rounded ${q22Step === 2 ? 'border-cyan-600 ring-2' : ''}`}>
                  <span>Input Field B</span>
                  <span className="block text-[10px] text-slate-400 font-mono">
                    {q22TabMode === 'positive' ? 'tabindex="3"' : 'Order 2'}
                  </span>
                </div>
                <div className={`p-3 border rounded ${q22Step === 3 ? 'border-cyan-600 ring-2' : ''}`}>
                  <span>Submit Button</span>
                  <span className="block text-[10px] text-slate-400 font-mono">
                    {q22TabMode === 'positive' ? 'tabindex="1"' : 'Order 3'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  let step = 0;
                  const order = q22TabMode === 'positive' ? [3, 1, 2] : [1, 2, 3];
                  const interval = setInterval(() => {
                    if (step < 3) {
                      setQ22Step(order[step]);
                      addLog(`Focused item at physical column position ${order[step]}`);
                      step++;
                    } else {
                      clearInterval(interval);
                      setQ22Step(-1);
                    }
                  }, 1200);
                }}
                className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded"
              >
                Trigger simulated Tab loop ⚡
              </button>
            </div>
          )}

          {/* Q23: Color Contrast Lab */}
          {id === 23 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3 p-3 bg-slate-50 rounded border">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Foreground Text Color:</label>
                    <input 
                      type="color" 
                      value={q23Fg} 
                      onChange={(e) => setQ23Fg(e.target.value)} 
                      className="w-full h-8 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Background Color:</label>
                    <input 
                      type="color" 
                      value={q23Bg} 
                      onChange={(e) => setQ23Bg(e.target.value)} 
                      className="w-full h-8 rounded cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between p-3 border rounded bg-white">
                  <div className="text-center py-4 rounded border" style={{ backgroundColor: q23Bg, color: q23Fg }}>
                    <span className="text-sm font-bold block">Preview Text</span>
                    <span className="text-[10px]">Small detail line</span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-mono font-bold">
                      <span>Contrast Ratio:</span>
                      <span className={contrastRatioNum >= 4.5 ? 'text-emerald-600' : 'text-red-600'}>
                        {currentContrast}:1
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>Level AA (4.5:1):</span>
                      <span className={`font-bold ${contrastRatioNum >= 4.5 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {contrastRatioNum >= 4.5 ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>Level AAA (7.0:1):</span>
                      <span className={`font-bold ${contrastRatioNum >= 7 ? 'text-emerald-600' : 'text-cyan-600'}`}>
                        {contrastRatioNum >= 7 ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Q24: Color as Info Colorblindness sandbox */}
          {id === 24 && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setQ24Colorblind(!q24Colorblind)}
                  className={`flex-1 py-1 rounded text-xs font-semibold border ${
                    q24Colorblind ? 'bg-cyan-600 text-white' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  {q24Colorblind ? 'Colorblind Filter ON' : 'Simulate Red-Green Blindness'}
                </button>
                <button
                  onClick={() => setQ24Fix(!q24Fix)}
                  className={`flex-1 py-1 rounded text-xs font-semibold border ${
                    q24Fix ? 'bg-cyan-600 text-white' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  {q24Fix ? 'Fix Enabled (Icon + Text)' : 'Enable Accessibility Fix'}
                </button>
              </div>

              <div className={`p-4 border rounded-lg transition-all ${
                q24Colorblind ? 'grayscale contrast-50' : ''
              } bg-slate-50`}>
                <label className="text-xs font-bold text-slate-800 block mb-1">Username field:</label>
                <input
                  type="text"
                  value={q24Username}
                  onChange={(e) => setQ24Username(e.target.value)}
                  className={`w-full p-2 border rounded text-xs ${
                    q24Fix ? 'border-red-500 bg-red-50/20' : 'border-red-500'
                  }`}
                  placeholder="e.g. administrator"
                />
                
                <div className="mt-2 flex items-center gap-1.5 text-xs text-red-600 font-semibold">
                  {q24Fix ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>Error: This username is already taken.</span>
                    </>
                  ) : (
                    <span className="text-red-500 font-bold">// Red borders are the only clue. Hard to spot!</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Q25: Image Alt Text Playground */}
          {id === 25 && (
            <div className="space-y-4">
              <div className="flex gap-2">
                {(['descriptive', 'empty', 'missing'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setQ25AltType(type);
                      if (type === 'descriptive') addLog("Reading image alt: 'Golden Retriever playing fetch in green fields'");
                      if (type === 'empty') addLog("Image marked decorative. Skipping narration safely.");
                      if (type === 'missing') addLog("Warning! Alt attribute omitted. Reading raw source name: 'dog_final_compress_v3.png'");
                    }}
                    className={`flex-1 py-1 rounded text-[11px] font-bold border ${
                      q25AltType === type ? 'bg-cyan-600 text-white' : 'bg-white text-slate-700'
                    }`}
                  >
                    {type === 'descriptive' && 'Descriptive alt'}
                    {type === 'empty' && 'Decorative (alt="")'}
                    {type === 'missing' && 'Omitted Alt Attribute'}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-slate-50 border rounded-lg flex flex-col items-center">
                <img 
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=160" 
                  alt={q25AltType === 'descriptive' ? 'Golden Retriever puppy looking happy' : (q25AltType === 'empty' ? '' : undefined)}
                  className="w-24 h-24 object-cover rounded-md border shadow-sm"
                />
                <span className="text-[10px] text-slate-500 mt-2 font-mono">
                  {q25AltType === 'descriptive' && 'alt="Golden Retriever puppy..."'}
                  {q25AltType === 'empty' && 'alt=""'}
                  {q25AltType === 'missing' && 'No alt attribute present!'}
                </span>
              </div>
            </div>
          )}

          {/* Q26: Custom Dropdown Menu with full Keyboard bindings */}
          {id === 26 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-medium">Click trigger then use Up/Down arrows to test accessible combobox controls:</p>
              
              <div className="relative flex flex-col items-center">
                <button
                  aria-expanded={q26Open}
                  aria-haspopup="listbox"
                  aria-controls="q26-listbox"
                  onClick={() => {
                    setQ26Open(!q26Open);
                    addLog(`Toggled dropdown list. Status expanded: ${!q26Open}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setQ26Open(true);
                      setQ26ActiveIdx((prev) => (prev + 1) % q26Options.length);
                      addLog(`Arrow Down. Highlighted option: ${q26Options[(q26ActiveIdx + 1) % q26Options.length]}`);
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setQ26ActiveIdx((prev) => (prev - 1 + q26Options.length) % q26Options.length);
                      addLog(`Arrow Up. Highlighted option: ${q26Options[(q26ActiveIdx - 1 + q26Options.length) % q26Options.length]}`);
                    } else if (e.key === 'Enter') {
                      e.preventDefault();
                      if (q26Open) {
                        setQ26Selected(q26Options[q26ActiveIdx]);
                        setQ26Open(false);
                        addLog(`Selected and closed: ${q26Options[q26ActiveIdx]}`);
                      }
                    } else if (e.key === 'Escape') {
                      setQ26Open(false);
                      addLog("Closed via Escape key.");
                    }
                  }}
                  className="w-full max-w-[240px] px-3 py-2 bg-white border rounded-lg text-xs font-semibold flex justify-between items-center hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <span>{q26Selected}</span>
                  <span>{q26Open ? '▲' : '▼'}</span>
                </button>

                {q26Open && (
                  <ul 
                    id="q26-listbox"
                    role="listbox"
                    className="absolute top-10 w-full max-w-[240px] bg-white border rounded-lg shadow-lg z-20 overflow-hidden"
                  >
                    {q26Options.map((opt, idx) => (
                      <li
                        key={opt}
                        role="option"
                        aria-selected={q26Selected === opt}
                        className={`p-2 text-xs cursor-pointer transition-colors ${
                          q26ActiveIdx === idx ? 'bg-cyan-600 text-white font-bold' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                        onClick={() => {
                          setQ26Selected(opt);
                          setQ26ActiveIdx(idx);
                          setQ26Open(false);
                          addLog(`Selected option: ${opt}`);
                        }}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Q27: Accessibility Tree live node schema viewer */}
          {id === 27 && (
            <div className="space-y-4">
              <div className="flex gap-2">
                {(['button', 'checkbox', 'input'] as const).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setQ27HtmlType(tag);
                      addLog(`Rendered tag ${tag} inside Accessibility node mapper.`);
                    }}
                    className={`flex-1 py-1 rounded text-xs font-semibold border ${
                      q27HtmlType === tag ? 'bg-cyan-600 text-white' : 'bg-slate-50'
                    }`}
                  >
                    &lt;{tag}&gt; Element
                  </button>
                ))}
              </div>

              <div className="p-4 bg-slate-900 text-slate-100 font-mono text-xs rounded border space-y-2">
                <span className="text-[10px] text-cyan-400 block">// Chromium Accessibility tree representation:</span>
                {q27HtmlType === 'button' && (
                  <div>
                    <p>WebArea [AXRole="WebArea", Name="Home"]</p>
                    <p className="text-emerald-400">&nbsp;&nbsp;Button [AXRole="button", AXName="Log Out"]</p>
                    <p className="text-slate-500">&nbsp;&nbsp;&nbsp;&nbsp;Focusable: true, keyboardFocusable: true</p>
                  </div>
                )}
                {q27HtmlType === 'checkbox' && (
                  <div>
                    <p>WebArea [AXRole="WebArea", Name="Home"]</p>
                    <p className="text-emerald-400">&nbsp;&nbsp;CheckBox [AXRole="checkbox", AXName="Accept newsletters", AXState="unchecked"]</p>
                    <p className="text-slate-500">&nbsp;&nbsp;&nbsp;&nbsp;Value: 0 (unchecked)</p>
                  </div>
                )}
                {q27HtmlType === 'input' && (
                  <div>
                    <p>WebArea [AXRole="WebArea", Name="Home"]</p>
                    <p className="text-emerald-400">&nbsp;&nbsp;TextField [AXRole="textbox", AXName="User ID", AXValue=""]</p>
                    <p className="text-slate-500">&nbsp;&nbsp;&nbsp;&nbsp;Focusable: true, editable: true</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Q28: Accessibility Auditor Simulator */}
          {id === 28 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700">Audit Score:</span>
                <span className={`text-xl font-mono font-bold px-3 py-1 rounded ${
                  q28Score > 90 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {q28Score}/100
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 border rounded-lg bg-white text-xs">
                  <span>❌ Image has no descriptive alt tag</span>
                  <button
                    onClick={() => {
                      if (q28FixedIssues.includes('alt')) return;
                      setQ28FixedIssues((prev) => [...prev, 'alt']);
                      setQ28Score((s) => Math.min(100, s + 25));
                      addLog("Fixed: Added Descriptive Alt Tags. Score +25 points!", "system");
                    }}
                    disabled={q28FixedIssues.includes('alt')}
                    className="px-2 py-1 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 text-[10px] font-bold rounded"
                  >
                    {q28FixedIssues.includes('alt') ? 'Fixed ✓' : 'Fix Code'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 border rounded-lg bg-white text-xs">
                  <span>❌ Contrast ratio fails standard AA</span>
                  <button
                    onClick={() => {
                      if (q28FixedIssues.includes('contrast')) return;
                      setQ28FixedIssues((prev) => [...prev, 'contrast']);
                      setQ28Score((s) => Math.min(100, s + 30));
                      addLog("Fixed: Contrast ratio increased past 4.5:1. Score +30 points!", "system");
                    }}
                    disabled={q28FixedIssues.includes('contrast')}
                    className="px-2 py-1 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 text-[10px] font-bold rounded"
                  >
                    {q28FixedIssues.includes('contrast') ? 'Fixed ✓' : 'Fix Code'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Q29: Limitations of Automated scanning tools */}
          {id === 29 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 font-medium">Verify how an image with useless placeholder alt passes automated checks but fails human audits:</p>
              
              <div className="p-3 bg-slate-50 border rounded-lg space-y-2">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=120" alt="Dog placeholder final v12" className="w-14 h-14 object-cover rounded" />
                  <div className="text-xs">
                    <span className="block font-bold">Dog portrait picture</span>
                    <span className="font-mono text-cyan-600 block">alt="Dog placeholder final v12"</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] rounded text-center font-semibold">
                    🤖 AXE Scanner: PASS (Alt tag exists)
                  </div>
                  <div className="p-2 bg-red-50 border border-red-200 text-red-800 text-[11px] rounded text-center font-semibold">
                    🧑 Human Audit: FAIL (Gibberish text)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Q30: Labels in Forms */}
          {id === 30 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-700">Associate descriptive labels?</span>
                <button
                  onClick={() => {
                    setQ30LabelActive(!q30LabelActive);
                    addLog(`Form input association toggled: ${!q30LabelActive ? 'ENABLED' : 'DISABLED'}`);
                  }}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                    q30LabelActive ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {q30LabelActive ? 'Label connected' : 'No explicit label'}
                </button>
              </div>

              <div className="p-4 bg-slate-50 border rounded-lg space-y-3">
                <div 
                  onClick={() => {
                    if (q30LabelActive) {
                      setQ30ClickLog("Clicked label target. Input focused programmatically!");
                      addLog("Clicked label. Screen reader says 'Username edit text'. Target active.");
                    } else {
                      setQ30ClickLog("Clicked text block. Static tag has no trigger linking.");
                    }
                  }}
                  className="cursor-pointer hover:bg-slate-100 p-1 rounded"
                >
                  <span className="text-xs font-bold text-slate-800">
                    {q30LabelActive ? <label htmlFor="q30-inp">Username Label (Click me):</label> : 'Static Text Box Username:'}
                  </span>
                </div>
                <input
                  id="q30-inp"
                  type="text"
                  placeholder="Focus trigger placeholder..."
                  className="w-full p-2 border rounded text-xs focus:ring-2 focus:ring-cyan-500"
                />
                {q30ClickLog && <p className="text-[10px] text-slate-500 italic text-center">{q30ClickLog}</p>}
              </div>
            </div>
          )}

          {/* Q31: Explicit for/id linking vs implicit */}
          {id === 31 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-mono">Two standardized ways to build semantic label-to-input connections:</p>
              
              <div className="p-3 bg-slate-50 rounded-lg space-y-3 font-mono text-xs text-slate-700 border">
                <div>
                  <span className="text-cyan-600 font-bold block mb-1">1. Explicit Association:</span>
                  <p className="p-2 bg-white rounded border border-cyan-200">
                    &lt;label <span className="text-red-600">for="user-id"</span>&gt;Name&lt;/label&gt;<br/>
                    &lt;input <span className="text-red-600">id="user-id"</span> type="text" /&gt;
                  </p>
                </div>
                <div>
                  <span className="text-cyan-600 font-bold block mb-1">2. Implicit Association (Nested):</span>
                  <p className="p-2 bg-white rounded border border-slate-200">
                    &lt;label&gt;<br/>
                    &nbsp;&nbsp;Name Input<br/>
                    &nbsp;&nbsp;&lt;input type="text" /&gt;<br/>
                    &lt;/label&gt;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Q32: Form Validation sandbox */}
          {id === 32 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-medium font-mono">Dynamic validation playground with aria-describedby feedback logs:</p>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setQ32Submitted(true);
                  if (!q32Email.includes('@')) {
                    setQ32Error("Error: Valid email address must contain an '@' sign.");
                    addLog("Validation failed: Valid email address must contain an '@' sign. Semantics set aria-invalid='true'", "alert");
                  } else {
                    setQ32Error('');
                    addLog("Form submitted successfully! Standard validation cleared.", "system");
                  }
                }}
                className="p-3 bg-slate-50 border rounded-lg space-y-3"
              >
                <div>
                  <label htmlFor="q32-mail" className="text-xs font-bold text-slate-800 block mb-1">Your Email Address:</label>
                  <input
                    id="q32-mail"
                    type="text"
                    value={q32Email}
                    onChange={(e) => setQ32Email(e.target.value)}
                    aria-invalid={q32Error ? 'true' : undefined}
                    aria-describedby={q32Error ? 'q32-error-msg' : undefined}
                    className={`w-full p-2 border rounded text-xs ${
                      q32Error ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                    }`}
                    placeholder="e.g. invalidname"
                  />
                </div>

                {q32Error && (
                  <span id="q32-error-msg" className="text-xs text-red-600 font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {q32Error}
                  </span>
                )}

                <button
                  type="submit"
                  className="w-full py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded text-xs font-bold"
                >
                  Verify Form Submit
                </button>
              </form>
            </div>
          )}

          {/* Q33: Accessible Name Calculator */}
          {id === 33 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">Edit elements below to visualize the priority algorithm calculating the Accessible Name:</p>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-2 p-2.5 bg-slate-50 border rounded">
                  <div>
                    <label className="font-bold block mb-1">aria-label:</label>
                    <input type="text" value={q33AriaLabel} onChange={(e) => setQ33AriaLabel(e.target.value)} className="w-full border p-1 rounded" />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Visible text content:</label>
                    <input type="text" value={q33TextContent} onChange={(e) => setQ33TextContent(e.target.value)} className="w-full border p-1 rounded" />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">title attribute:</label>
                    <input type="text" value={q33Title} onChange={(e) => setQ33Title(e.target.value)} className="w-full border p-1 rounded" />
                  </div>
                </div>

                <div className="p-3 bg-slate-900 text-slate-100 rounded flex flex-col justify-between">
                  <div className="font-mono">
                    <span className="text-[10px] text-yellow-400 font-bold block mb-1">Priority Calculation:</span>
                    <p className={q33AriaLabel ? 'text-green-400 font-bold' : 'text-slate-500 line-through'}>
                      1. aria-label ({q33AriaLabel || 'none'})
                    </p>
                    <p className={(!q33AriaLabel && q33TextContent) ? 'text-green-400 font-bold' : 'text-slate-500 line-through'}>
                      2. Inner Text ({q33TextContent || 'none'})
                    </p>
                    <p className={(!q33AriaLabel && !q33TextContent && q33Title) ? 'text-green-400 font-bold' : 'text-slate-500 line-through'}>
                      3. Title ({q33Title || 'none'})
                    </p>
                  </div>

                  <div className="mt-3 p-2 bg-cyan-950/70 border border-cyan-900 rounded font-bold text-center text-xs text-cyan-300">
                    Resulting AccName: <span className="text-yellow-400">"{q33AriaLabel || q33TextContent || q33Title || 'blank'}"</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Q34: SPA routing focus */}
          {id === 34 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-700">Manage Route Focus?</span>
                <button
                  onClick={() => {
                    setQ34FocusManaged(!q34FocusManaged);
                    addLog(`SPA Route focus management set to: ${!q34FocusManaged ? 'ACTIVE' : 'INACTIVE'}`);
                  }}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                    q34FocusManaged ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {q34FocusManaged ? 'Manage focus (Pass)' : 'Do nothing (Fail)'}
                </button>
              </div>

              <div className="flex gap-2">
                {['Home Page', 'Account Dashboard', 'Analytics Logs'].map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setQ34Page(page);
                      addLog(`Navigated to page route: /${page.toLowerCase().replace(' ', '-')}`);
                      if (q34FocusManaged) {
                        setTimeout(() => {
                          if (pageHeadingRef.current) pageHeadingRef.current.focus();
                          addLog(`Moved focus programmatically to Header: "${page}" heading.`);
                        }, 100);
                      } else {
                        addLog("Route changed silently. Screen reader remains blind at screen footer.");
                      }
                    }}
                    className={`flex-1 py-1 text-xs font-semibold border rounded ${
                      q34Page === page ? 'bg-cyan-600 text-white' : 'bg-white text-slate-700'
                    }`}
                  >
                    Go to {page.split(' ')[0]}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-slate-50 rounded border min-h-[100px] flex flex-col justify-center text-center">
                <h5 
                  ref={pageHeadingRef}
                  tabIndex={-1}
                  className="text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 p-1 inline-block"
                >
                  {q34Page} Headline Column
                </h5>
                <p className="text-xs text-slate-500 mt-1">Successfully loaded dynamic components inside screen.</p>
              </div>
            </div>
          )}

          {/* Q35: Custom switch toggle */}
          {id === 35 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-medium">Recreation of an accessible visual sliding switch toggler:</p>
              
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
                <span id="dark-mode-sim-label" className="text-xs font-bold text-slate-800">
                  Allow High Contrast Dark Colors
                </span>
                <button
                  role="switch"
                  aria-checked={q35Checked}
                  aria-labelledby="dark-mode-sim-label"
                  onClick={() => {
                    setQ35Checked(!q35Checked);
                    addLog(`Toggled custom switch state to: ${!q35Checked}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      setQ35Checked(!q35Checked);
                      addLog(`Toggled custom switch via Keyboard [${e.key}] to: ${!q35Checked}`);
                    }
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    q35Checked ? 'bg-cyan-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      q35Checked ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Q36: role="button" vs Native check-list comparison */}
          {id === 36 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">Toggle properties below to compare manual code overhead of {"div[role=button]"} vs {"<button>"}:</p>
              
              <div className="space-y-2 text-xs">
                {[
                  { key: 'focus', text: 'tabindex="0" focus indicator configuration' },
                  { key: 'space', text: 'Space key click trigger event handler' },
                  { key: 'enter', text: 'Enter key click trigger event handler' },
                  { key: 'roleDesc', text: 'role="button" semantics set' }
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-2 p-2 bg-slate-50 rounded border cursor-pointer hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={q36Checks[item.key]}
                      onChange={(e) => {
                        setQ36Checks(prev => ({ ...prev, [item.key]: e.target.checked }));
                        addLog(`Updated custom div configuration: ${item.key} set to ${e.target.checked}`);
                      }}
                    />
                    <span>{item.text}</span>
                  </label>
                ))}
              </div>

              <div className="p-3 border rounded-lg bg-cyan-50/50 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold">Button Usability:</span>
                  <p className="text-[11px] text-slate-500">Is custom div button fully compliant?</p>
                </div>
                <span className={`px-2.5 py-1 rounded font-bold ${
                  Object.values(q36Checks).every(Boolean) ? 'bg-emerald-100 text-emerald-800' : 'bg-cyan-100 text-cyan-800'
                }`}>
                  {Object.values(q36Checks).every(Boolean) ? 'COMPLIANT ✓' : 'INCOMPLETE ⚠'}
                </span>
              </div>
            </div>
          )}

          {/* Q37: Landmark Highlighting Map */}
          {id === 37 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">Click a landmark role button to visualize its corresponding layout block highlight:</p>
              
              <div className="grid grid-cols-3 gap-1.5">
                {['header', 'main', 'footer'].map((land) => (
                  <button
                    key={land}
                    onClick={() => {
                      setQ37ActiveLandmark(land);
                      addLog(`Screen Reader Landmark Jump: Focused "${land}" block.`);
                    }}
                    className={`py-1 rounded text-xs font-semibold border ${
                      q37ActiveLandmark === land ? 'bg-cyan-600 text-white' : 'bg-white text-slate-700'
                    }`}
                  >
                    {land === 'header' && '<header> Banner'}
                    {land === 'main' && '<main> Principal'}
                    {land === 'footer' && '<footer> Info'}
                  </button>
                ))}
              </div>

              <div className="p-3 border rounded bg-slate-100 space-y-2 text-center text-xs font-bold">
                <div className={`p-2 rounded border transition-all ${
                  q37ActiveLandmark === 'header' ? 'bg-cyan-200 border-cyan-500 scale-102 text-cyan-900 ring-2' : 'bg-white'
                }`}>
                  Header Nav (Banner)
                </div>
                <div className={`p-4 rounded border transition-all ${
                  q37ActiveLandmark === 'main' ? 'bg-cyan-200 border-cyan-500 scale-102 text-cyan-900 ring-2' : 'bg-white'
                }`}>
                  Primary Content Area (Main Column)
                </div>
                <div className={`p-2 rounded border transition-all ${
                  q37ActiveLandmark === 'footer' ? 'bg-cyan-200 border-cyan-500 scale-102 text-cyan-900 ring-2' : 'bg-white'
                }`}>
                  Footer Legal Terms (ContentInfo)
                </div>
              </div>
            </div>
          )}

          {/* Q38: Accessible Chart representations */}
          {id === 38 && (
            <div className="space-y-4">
              <div className="flex gap-2">
                {(['chart', 'table', 'split'] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setQ38View(view)}
                    className={`flex-1 py-1 rounded text-xs font-bold border ${
                      q38View === view ? 'bg-cyan-600 text-white' : 'bg-white text-slate-700'
                    }`}
                  >
                    {view === 'chart' && 'Visual-Only Chart'}
                    {view === 'table' && 'Accessible Table View'}
                    {view === 'split' && 'Accessible Split View'}
                  </button>
                ))}
              </div>

              <div className="p-3 border rounded-lg bg-slate-50 min-h-[140px] flex flex-col justify-center">
                {q38View === 'chart' && (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <span className="text-xs text-red-600 font-bold italic">⚠️ Canvas component is completely blank to screen readers</span>
                    <div className="w-full h-16 bg-gradient-to-r from-cyan-500 to-cyan-300 rounded flex items-end justify-around p-1">
                      <div className="w-6 h-12 bg-white rounded-t"></div>
                      <div className="w-6 h-8 bg-white rounded-t"></div>
                      <div className="w-6 h-14 bg-white rounded-t"></div>
                    </div>
                  </div>
                )}

                {(q38View === 'table' || q38View === 'split') && (
                  <div className="space-y-2">
                    {q38View === 'split' && (
                      <div className="w-full h-8 bg-gradient-to-r from-cyan-500 to-cyan-300 rounded flex items-end justify-around p-1 opacity-50">
                        <div className="w-3 h-6 bg-white rounded-t"></div>
                        <div className="w-3 h-4 bg-white rounded-t"></div>
                        <div className="w-3 h-7 bg-white rounded-t"></div>
                      </div>
                    )}
                    <table className="w-full text-left text-xs bg-white border rounded border-slate-200">
                      <thead>
                        <tr className="bg-slate-100 border-b">
                          <th className="p-1">Month</th>
                          <th className="p-1">Sales</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-1">January</td>
                          <td className="p-1">$12,000</td>
                        </tr>
                        <tr>
                          <td className="p-1">February</td>
                          <td className="p-1">$15,400</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Q39: Focus indicator test sandbox */}
          {id === 39 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Custom Focus Outline?</span>
                <button
                  onClick={() => {
                    setQ39Outline(!q39Outline);
                    addLog(`Outline focus indicator: ${!q39Outline ? 'ENABLED' : 'REMOVED (outline:none)'}`);
                  }}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                    q39Outline ? 'bg-cyan-600 text-white' : 'bg-red-600 text-white'
                  }`}
                >
                  {q39Outline ? 'Active Outline (Pass)' : 'outline: none (FAIL)'}
                </button>
              </div>

              <p className="text-xs text-slate-500">Focus these buttons to observe visual state indicators:</p>
              
              <div className="flex gap-2">
                <button
                  className={`flex-1 py-2 text-xs font-bold rounded border ${
                    q39Outline 
                      ? 'bg-white text-slate-700 border-slate-300 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:border-cyan-500' 
                      : 'bg-white text-slate-700 border-slate-300 focus:outline-none'
                  }`}
                >
                  Button A
                </button>
                <button
                  className={`flex-1 py-2 text-xs font-bold rounded border ${
                    q39Outline 
                      ? 'bg-white text-slate-700 border-slate-300 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:border-cyan-500' 
                      : 'bg-white text-slate-700 border-slate-300 focus:outline-none'
                  }`}
                >
                  Button B
                </button>
              </div>
            </div>
          )}

          {/* Q40: Dashboard Live Ticker volume throttle */}
          {id === 40 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-700">WebSocket stock ticker controller:</span>
                <button
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    addLog(`Live websocket stream: ${!isPlaying ? 'RESUMED' : 'PAUSED'}`);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded transition-colors ${
                    isPlaying ? 'bg-cyan-100 text-cyan-800' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isPlaying ? 'Pause Feed' : 'Resume Feed'}</span>
                </button>
              </div>

              <div className="p-4 bg-slate-900 border rounded-lg text-slate-100 text-center">
                <h5 className="font-mono text-xl tracking-wider text-green-400">
                  {q40Ticker.symbol}: ${q40Ticker.price.toFixed(2)}
                </h5>
                <p className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
                  <span>Trend:</span>
                  <span className={q40Ticker.textDirection === 'up' ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                    {q40Ticker.textDirection === 'up' ? '▲ Up' : '▼ Down'} {q40Ticker.change}%
                  </span>
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Simulated Screen Reader Output Console */}
        <div className="lg:col-span-4 bg-[#0B0D13] text-slate-200 border border-slate-800 rounded-xl p-4 shadow-inner flex flex-col justify-between h-[280px]">
          <div>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400 font-mono">
                🗣️ Screen Reader Speech Feed
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" aria-hidden="true" />
            </div>

            <div className="space-y-2 h-[170px] overflow-y-auto pr-1">
              {logs.length === 0 ? (
                <p className="text-xs text-slate-500 italic mt-4 text-center">
                  Press buttons or hover active nodes inside the visual playground panel on the left to trigger acoustic narration cues.
                </p>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="text-xs font-mono border-b border-slate-800/50 pb-1">
                    <span className="text-[10px] text-slate-500">[{log.timestamp}]</span>{' '}
                    <span className={
                      log.type === 'alert' 
                        ? 'text-red-400 font-bold' 
                        : log.type === 'system' 
                          ? 'text-cyan-400' 
                          : 'text-green-300'
                    }>
                      {log.message}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-mono">
            <span>A11Y-TTS Engine v1.1</span>
            <span>Speech Synth {('speechSynthesis' in window) ? 'Available ✓' : 'Unavailable'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
