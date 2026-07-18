'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Code, Layers, Cpu, Globe, Database, Shield, Workflow, 
  Network, Activity, Terminal, Radio, Eye, Sparkles, Cloud, GitBranch, Server, FileText,
  Search, BookOpen, CheckCircle, Star, Award, ArrowRight, ExternalLink 
} from 'lucide-react';

// Import datasets
import { questions as jsQ } from '@/modules/js/data/questions';
import { questions as reactQ } from '@/modules/react/data/questions';
import { questions as nextjsQ } from '@/modules/nextjs/questionsData';
import { QUESTIONS as nodeQ } from '@/modules/node/data';
import { questions as reduxQ } from '@/modules/redux/data/questions';
import { questions as zustandQ } from '@/modules/zustand/data/questions';
import { questionsData as tsQ } from '@/modules/typescript/data/questions';
import { QUESTIONS as webpackQ } from '@/modules/webpack/data';
import { QUESTIONS as restApiQ } from '@/modules/rest-api/data/questions';
import { QUESTIONS as websocketQ } from '@/modules/websocket/data/questions';
import { questionsData as testingQ } from '@/modules/testing/data/questions';
import { questionsData as a11yQ } from '@/modules/a11y/data/questions';
import { QUESTIONS_DATA as sysDesignQ } from '@/modules/system-design/data';
import { awsQuestions as awsQ } from '@/modules/aws/data/awsQuestions';
import { questionsData as cicdQ } from '@/modules/ci-cd/data/questions';
import { questionsData as devopsQ } from '@/modules/devops/data/questions';
import { QUESTIONS as mdQ } from '@/modules/md-visualizer/data/questions';
import { allQuestions as gcpQ } from '@/modules/gcp/data/questions';
import { ALL_QUESTIONS as htmlQ } from '@/modules/html/data/allQuestions';

interface Course {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  accent: string;
  colorName: string;
  questions: any[];
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalCompleted: 0,
    totalBookmarked: 0,
    totalQuestions: 0,
  });

  const [courseProgress, setCourseProgress] = useState<Record<string, { completed: number; bookmarked: number }>>({});



  // 13 modules configuration
  const courses: Course[] = useMemo(() => [
    {
      id: 'js',
      name: 'JavaScript Visualizer',
      shortName: 'JavaScript',
      description: 'Scope, closures, hoisting, prototypes, coercion, event loop, and DOM visualizers.',
      icon: <Terminal className="w-6 h-6 text-[#22d3ee]" />,
      path: '/javascript',
      accent: '#22d3ee',
      colorName: 'js',
      questions: jsQ,
    },
    {
      id: 'react',
      name: 'ReactJS Interview Guide',
      shortName: 'ReactJS',
      description: 'Hooks lifecycle, fiber re-renders, state reconciliation, and virtual DOM sandboxes.',
      icon: <Layers className="w-6 h-6 text-[#22d3ee]" />,
      path: '/react',
      accent: '#22d3ee',
      colorName: 'react',
      questions: reactQ,
    },
    {
      id: 'nextjs',
      name: 'Next.js Study Suite',
      shortName: 'Next.js',
      description: 'App Router dynamic routing, React Server Components (RSC), data fetching, and streaming.',
      icon: <Globe className="w-6 h-6 text-white" />,
      path: '/nextjs',
      accent: '#ffffff',
      colorName: 'nextjs',
      questions: nextjsQ,
    },
    {
      id: 'typescript',
      name: 'TypeScript Interactive Trainer',
      shortName: 'TypeScript',
      description: 'Type algebra, interface extension, strict compiler flags, and deck flashcards.',
      icon: <Code className="w-6 h-6 text-[#3178C6]" />,
      path: '/typescript',
      accent: '#3178C6',
      colorName: 'typescript',
      questions: tsQ,
    },
    {
      id: 'node',
      name: 'Node.js & Express Simulator',
      shortName: 'Node & Express',
      description: 'V8 single-threaded architecture, non-blocking I/O stream pipes, and middleware logs.',
      icon: <Cpu className="w-6 h-6 text-[#22d3ee]" />,
      path: '/node',
      accent: '#22d3ee',
      colorName: 'node',
      questions: nodeQ,
    },
    {
      id: 'redux',
      name: 'Redux Masterclass',
      shortName: 'Redux',
      description: 'RTK store slices, action dispatching, middleware thunks, and state transition flowcharts.',
      icon: <Workflow className="w-6 h-6 text-[#22d3ee]" />,
      path: '/redux',
      accent: '#22d3ee',
      colorName: 'redux',
      questions: reduxQ,
    },
    {
      id: 'zustand',
      name: 'Zustand Masterclass',
      shortName: 'Zustand',
      description: 'Transient state updates, store slices, Immer integrations, and render optimization HUDs.',
      icon: <Database className="w-6 h-6 text-[#22d3ee]" />,
      path: '/zustand',
      accent: '#22d3ee',
      colorName: 'zustand',
      questions: zustandQ,
    },
    {
      id: 'webpack',
      name: 'Webpack Visualizer',
      shortName: 'Webpack',
      description: 'Dependency graph compilers, loader pipelines, and hot-reload dev servers.',
      icon: <Network className="w-6 h-6 text-[#22d3ee]" />,
      path: '/webpack',
      accent: '#22d3ee',
      colorName: 'webpack',
      questions: webpackQ,
    },
    {
      id: 'rest-api',
      name: 'REST API Study Playground',
      shortName: 'REST API',
      description: 'HTTP methods, status code mock simulations, caching headers, and rate limiters.',
      icon: <Activity className="w-6 h-6 text-[#22d3ee]" />,
      path: '/rest-api',
      accent: '#22d3ee',
      colorName: 'rest-api',
      questions: restApiQ,
    },
    {
      id: 'websocket',
      name: 'WebSocket Interactive Guide',
      shortName: 'WebSockets',
      description: 'Full-duplex sockets, heartbeat ping/pong simulators, and chat connections.',
      icon: <Radio className="w-6 h-6 text-[#22d3ee]" />,
      path: '/websocket',
      accent: '#22d3ee',
      colorName: 'websocket',
      questions: websocketQ,
    },
    {
      id: 'testing',
      name: 'Testing Interview Guide',
      shortName: 'Testing',
      description: 'Jest mock assertions, RTL queries, and Cypress end-to-end simulators.',
      icon: <CheckCircle className="w-6 h-6 text-[#22d3ee]" />,
      path: '/testing',
      accent: '#22d3ee',
      colorName: 'testing',
      questions: testingQ,
    },
    {
      id: 'a11y',
      name: 'Web Accessibility (a11y)',
      shortName: 'Accessibility',
      description: 'WCAG checklist, semantic structures, screen-reader details, and focus rings.',
      icon: <Eye className="w-6 h-6 text-[#22d3ee]" />,
      path: '/a11y',
      accent: '#22d3ee',
      colorName: 'a11y',
      questions: a11yQ,
    },
    {
      id: 'system-design',
      name: 'System Design Explorer',
      shortName: 'System Design',
      description: 'Load balancers, database sharding, message queues, CDN, and architecture simulators.',
      icon: <Shield className="w-6 h-6 text-[#22d3ee]" />,
      path: '/system-design',
      accent: '#22d3ee',
      colorName: 'sysdesign',
      questions: sysDesignQ,
    },
    {
      id: 'aws',
      name: 'AWS Cloud Architecture',
      shortName: 'AWS Cloud',
      description: 'EC2, S3, IAM, Serverless Lambda, VPC networking, and cloud security architectures.',
      icon: <Cloud className="w-6 h-6 text-[#22d3ee]" />,
      path: '/aws',
      accent: '#22d3ee',
      colorName: 'aws',
      questions: awsQ || [],
    },
    {
      id: 'ci-cd',
      name: 'CI/CD Automation Pipelines',
      shortName: 'CI/CD',
      description: 'GitHub Actions, Jenkins, automated testing pipelines, and deployment strategies.',
      icon: <GitBranch className="w-6 h-6 text-[#22d3ee]" />,
      path: '/ci-cd',
      accent: '#22d3ee',
      colorName: 'cicd',
      questions: cicdQ || [],
    },
    {
      id: 'devops',
      name: 'DevOps & Infrastructure',
      shortName: 'DevOps',
      description: 'Docker containers, Kubernetes clusters, Terraform IaC, and observability monitoring.',
      icon: <Server className="w-6 h-6 text-[#22d3ee]" />,
      path: '/devops',
      accent: '#22d3ee',
      colorName: 'devops',
      questions: devopsQ || [],
    },
    {
      id: 'md-visualizer',
      name: 'Markdown Visual Explorer',
      shortName: 'MD Explorer',
      description: 'Interactive markdown parsing, syntax highlighting, and structural documentation.',
      icon: <FileText className="w-6 h-6 text-[#22d3ee]" />,
      path: '/md-visualizer',
      accent: '#22d3ee',
      colorName: 'mdvisualizer',
      questions: mdQ || [],
    },
    {
      id: 'gcp',
      name: 'GCP Cloud Architecture',
      shortName: 'GCP Cloud',
      description: 'Compute Engine, GKE Kubernetes, BigQuery analytics, Cloud IAM, and Google Cloud VPC.',
      icon: <Globe className="w-6 h-6 text-[#22d3ee]" />,
      path: '/gcp',
      accent: '#22d3ee',
      colorName: 'gcp',
      questions: gcpQ || [],
    },
    {
      id: 'html',
      name: 'HTML5 & Web Semantics',
      shortName: 'HTML5',
      description: 'Semantic elements, Web APIs, DOM manipulation, Accessibility ARIA, and Form validations.',
      icon: <Code className="w-6 h-6 text-[#22d3ee]" />,
      path: '/html',
      accent: '#22d3ee',
      colorName: 'html',
      questions: htmlQ || [],
    },
  ], []);

  // Compute total questions
  const totalQuestionsSum = useMemo(() => {
    return courses.reduce((acc, course) => acc + course.questions.length, 0);
  }, [courses]);

  // Load progress from localStorage on Mount
  useEffect(() => {
    const progressMap: Record<string, { completed: number; bookmarked: number }> = {};
    let totalCompleted = 0;
    let totalBookmarked = 0;

    courses.forEach(course => {
      let completed = 0;
      let bookmarked = 0;

      try {
        switch (course.id) {
          case 'js': {
            const list = JSON.parse(localStorage.getItem('js_scanner_completed') || '[]');
            completed = list.length;
            break;
          }
          case 'react': {
            const comp = JSON.parse(localStorage.getItem('react_interview_completed') || '[]');
            const book = JSON.parse(localStorage.getItem('react_interview_bookmarked') || '[]');
            completed = comp.length;
            bookmarked = book.length;
            break;
          }
          case 'nextjs': {
            const comp = JSON.parse(localStorage.getItem('next_guide_completed') || '[]');
            const book = JSON.parse(localStorage.getItem('next_guide_bookmarks') || '[]');
            completed = comp.length;
            bookmarked = book.length;
            break;
          }
          case 'typescript': {
            const raw = JSON.parse(localStorage.getItem('ts_trainer_progress_v2') || '{}');
            completed = Array.isArray(raw.completed) ? raw.completed.length : 0;
            bookmarked = Array.isArray(raw.bookmarked) ? raw.bookmarked.length : 0;
            break;
          }
          case 'node':
            // Node is stateless in local storage, but handles quiz scores. Check if custom completed exists
            completed = JSON.parse(localStorage.getItem('node_mastered') || '[]').length;
            break;
          case 'redux':
            completed = JSON.parse(localStorage.getItem('redux_mastered') || '[]').length;
            break;
          case 'zustand': {
            const comp = JSON.parse(localStorage.getItem('zustand_mastered') || '[]');
            const book = JSON.parse(localStorage.getItem('zustand_bookmarks') || '[]');
            completed = comp.length;
            bookmarked = book.length;
            break;
          }
          case 'webpack':
            completed = JSON.parse(localStorage.getItem('webpack_mastered') || '[]').length;
            break;
          case 'rest-api': {
            const mastery = JSON.parse(localStorage.getItem('rest_guide_mastery') || '{}');
            completed = Object.values(mastery).filter(Boolean).length;
            break;
          }
          case 'websocket': {
            const comp = JSON.parse(localStorage.getItem('ws_completed') || '[]');
            const book = JSON.parse(localStorage.getItem('ws_bookmarks') || '[]');
            completed = comp.length;
            bookmarked = book.length;
            break;
          }
          case 'testing':
            completed = JSON.parse(localStorage.getItem('testing_guide_mastered') || '[]').length;
            break;
          case 'a11y':
            completed = JSON.parse(localStorage.getItem('a11y_mastered_questions') || '[]').length;
            break;
          case 'system-design':
            completed = JSON.parse(localStorage.getItem('system_design_mastered') || '[]').length;
            break;
        }
      } catch (e) {
        console.error(`Error loading progress for ${course.id}`, e);
      }

      progressMap[course.id] = { completed, bookmarked };
      totalCompleted += completed;
      totalBookmarked += bookmarked;
    });

    setCourseProgress(progressMap);
    setStats({
      totalCompleted,
      totalBookmarked,
      totalQuestions: totalQuestionsSum,
    });
  }, [courses, totalQuestionsSum]);

  // Global search implementation
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const results: {
      course: Course;
      id: number;
      question: string;
      answerText: string;
    }[] = [];

    courses.forEach(course => {
      course.questions.forEach(q => {
        // Handle varying question property structures
        const questionText = q.question || '';
        const answerText = q.answer || q.shortAnswer || q.detailedAnswer || q.detailedExplanation || '';
        
        if (
          questionText.toLowerCase().includes(query) ||
          answerText.toLowerCase().includes(query) ||
          q.id?.toString() === query.trim()
        ) {
          results.push({
            course,
            id: q.id || 0,
            question: questionText,
            answerText: answerText.slice(0, 140) + (answerText.length > 140 ? '...' : ''),
          });
        }
      });
    });

    return results.slice(0, 15); // limit to 15 results
  }, [searchQuery, courses]);

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col font-sans relative overflow-x-hidden">
      
      {/* Glow Effects in background */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none select-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none select-none" />

      {/* Decorative top header line */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-cyan-500 to-cyan-500 opacity-80" />

      {/* Header */}
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-zinc-900 z-10">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-gradient-to-tr from-cyan-500 to-cyan-600 shadow-md shadow-cyan-500/20">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent font-display">
              UPSKILL
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-medium font-sans">
            The Interactive Full-Stack Developer Learning Console
          </p>
        </div>

        {/* Stats HUD */}
        <div className="flex items-center gap-4 sm:gap-6 bg-zinc-950/60 border border-zinc-900/60 p-3 px-5 rounded-xl backdrop-blur-md">
          <div className="text-center px-2">
            <div className="text-xs text-zinc-500 font-mono">COURSES</div>
            <div className="text-lg font-bold text-white font-display">19</div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="text-center px-2">
            <div className="text-xs text-zinc-500 font-mono">MASTERED</div>
            <div className="text-lg font-bold text-emerald-400 font-display flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-400 inline" />
              {stats.totalCompleted} <span className="text-[10px] text-zinc-500">/ {stats.totalQuestions}</span>
            </div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="text-center px-2">
            <div className="text-xs text-zinc-500 font-mono">BOOKMARKS</div>
            <div className="text-lg font-bold text-cyan-400 font-display flex items-center gap-1">
              <Star className="w-4 h-4 text-cyan-400 fill-cyan-400/20 inline" />
              {stats.totalBookmarked}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col gap-10 z-10">
        
        {/* Global Search and Welcome HUD */}
        <section className="relative glass-panel rounded-2xl p-6 sm:p-8 overflow-hidden shadow-2xl border border-zinc-900/50">
          <div className="absolute top-0 right-0 p-4 opacity-15 pointer-events-none select-none">
            <Award className="w-40 h-40 text-cyan-500" />
          </div>

          <div className="relative z-10 space-y-4 max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight">
              Welcome back to your upskilling console.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans max-w-2xl">
              Search across all interactive datasets of {courses.length} modular subjects below. Browse through structural diagrams, run code sandbox engines, or test your skills with flashcards.
            </p>

            {/* Search Input */}
            <div className="relative mt-6 max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={`Search concepts across ${courses.length} subjects (React, Node, AWS, GCP, WebSockets, a11y...)`}
                className="block w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800/80 rounded-xl text-sm placeholder-zinc-500 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 font-mono transition-all"
              />
            </div>
          </div>

          {/* Search Results HUD */}
          {searchQuery.trim() && (
            <div className="mt-6 border-t border-zinc-900 pt-6 max-w-3xl space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Search Results ({searchResults.length})
              </h3>
              {searchResults.length === 0 ? (
                <div className="text-xs text-zinc-500 font-mono py-2">No matching questions found in any modules.</div>
              ) : (
                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-2">
                  {searchResults.map((result, idx) => (
                    <Link 
                      key={idx}
                      href={`${result.course.path}?id=${result.id}`}
                      className="block p-3 rounded-lg bg-zinc-950/80 border border-zinc-900/60 hover:border-zinc-800 transition-all group"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold bg-zinc-900 text-zinc-400 group-hover:text-white transition-all">
                              {result.course.shortName}
                            </span>
                            <span className="text-xs font-mono text-zinc-500">
                              Question #{result.id}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-white group-hover:text-cyan-400 transition-all font-sans">
                            {result.question}
                          </p>
                          <p className="text-[11px] text-zinc-500 font-sans line-clamp-1">
                            {result.answerText}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 transition-all transform group-hover:translate-x-0.5 mt-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Courses Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-baseline border-b border-zinc-900 pb-3">
            <h3 className="text-lg font-bold text-white tracking-tight font-display flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Course Modules
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Select a Subject to Begin
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map(course => {
              const prog = courseProgress[course.id] || { completed: 0, bookmarked: 0 };
              const percent = course.questions.length > 0 ? Math.round((prog.completed / course.questions.length) * 100) : 0;

              return (
                <div 
                  key={course.id}
                  className="glass-card rounded-xl p-5 flex flex-col justify-between group relative overflow-hidden"
                  style={{
                    boxShadow: `0 4px 30px rgba(0, 0, 0, 0.4)`
                  }}
                >
                  {/* Subtle hover accent glow indicator */}
                  <div 
                    className="absolute top-0 left-0 h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: course.accent }}
                  />

                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-900 group-hover:border-zinc-800 transition-all">
                        {course.icon}
                      </div>
                      <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-950 border border-zinc-900 text-zinc-500 tracking-wider">
                        {course.questions.length} Qs
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-white group-hover:text-white transition-all font-display">
                        {course.name}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2 h-10">
                        {course.description}
                      </p>
                    </div>

                    {/* Progress HUD */}
                    <div className="space-y-1 pt-1.5">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-zinc-500 uppercase">Mastery</span>
                        <span className="text-zinc-300 font-bold">{percent}% ({prog.completed}/{course.questions.length})</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${percent}%`,
                            backgroundColor: course.accent,
                            boxShadow: `0 0 8px ${course.accent}80`
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-5 flex items-center justify-between">
                    {prog.bookmarked > 0 ? (
                      <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-cyan-400/20" />
                        {prog.bookmarked} Bookmark{prog.bookmarked > 1 ? 's' : ''}
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-600">No bookmarks</span>
                    )}

                    <Link
                      href={course.path}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-950 border border-zinc-800/80 text-zinc-300 group-hover:text-white group-hover:border-zinc-700 hover:bg-zinc-900 transition-all flex items-center gap-1.5"
                    >
                      Enter Console
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* TypeScript Lab Card */}
            <div 
              className="glass-card rounded-xl p-5 flex flex-col justify-between group border border-dashed border-zinc-800/80 hover:border-cyan-500/30 relative"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-900">
                    <Code className="w-6 h-6 text-[#3178C6] opacity-80" />
                  </div>
                  <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-[#3178C6]/10 border border-[#3178C6]/20 text-[#3178C6]">
                    Playground
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-white font-display">
                    TypeScript Lab
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2 h-10">
                    View raw exercises in typescript contracts, index signatures, and custom validations from practiceTS.
                  </p>
                </div>

                <div className="text-[10px] font-mono text-zinc-500 uppercase pt-2 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-[#3178C6]" />
                  Interactive Code Reader
                </div>
              </div>

              <div className="pt-5 flex items-center justify-end">
                <Link
                  href="/practice-ts"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#3178C6]/10 border border-[#3178C6]/20 text-white hover:bg-[#3178C6]/20 transition-all flex items-center gap-1.5"
                >
                  Launch Lab
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/40 py-6 mt-12 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-mono">
          <div>UPSKILL Portal v1.0.0</div>
          <div className="flex gap-4">
            <span>Next.js 16</span>
            <span>•</span>
            <span>Tailwind CSS v4</span>
            <span>•</span>
            <span>React 19</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
