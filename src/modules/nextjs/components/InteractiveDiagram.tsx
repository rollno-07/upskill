import { useState, useEffect } from 'react';
import { 
  Server, Laptop, Globe, Folder, File, ArrowRight, Clock, Database, 
  Settings, Search, Image as ImageIcon, Wifi, User, Lock, Terminal, 
  CheckCircle2, AlertTriangle, TrendingUp, Sparkles, Cpu, Layers, 
  Activity, HardDrive, RefreshCw, Eye, EyeOff, ShieldCheck, HelpCircle,
  FileCode, Play, ChevronRight, Gauge
} from 'lucide-react';

interface DiagramProps {
  questionId: number;
}

export default function InteractiveDiagram({ questionId }: DiagramProps) {
  // Shared simulation states
  const [activeTab, setActiveTab] = useState<'run' | 'config'>('run');

  // Q1: Stack Layer Explorer
  const [q1ActiveLayer, setQ1ActiveLayer] = useState<number>(0);
  const q1Layers = [
    { title: "Client Browser", desc: "Downloads optimized HTML, loads hydrated interactive client bundles, and pre-fetches linked routes in the background.", icon: Laptop, color: "text-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-950/30" },
    { title: "Edge CDN / Gateway", desc: "Serves statically compiled HTML in 20ms and caches ISR page outputs directly next to visitors worldwide.", icon: Globe, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
    { title: "Next.js Node Server", desc: "Executes React Server Components (RSC), handles serverless API routes, checks middleware auth cookies, and renders fresh HTML on demand.", icon: Server, color: "text-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-950/30" },
    { title: "Next.js SWC Compiler", desc: "Compiled code is automatically minified, split by route, and optimized. Converts images, scripts, and fonts into performance-optimized formats.", icon: Cpu, color: "text-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-950/30" },
    { title: "Database / CMS", desc: "Securely queried directly from Server Components, preventing sensitive credential leaks to browser bundles.", icon: Database, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/30" }
  ];

  // Q2, Q5, Q6, Q7, Q36: Rendering Pipeline Simulator
  const [renderingMode, setRenderingMode] = useState<'SSG' | 'SSR' | 'ISR' | 'CSR'>('SSR');
  const [simulationStep, setSimulationStep] = useState<'idle' | 'request' | 'db_fetch' | 'server_render' | 'cdn_lookup' | 'client_hydrate' | 'done'>('idle');
  const [simulationLog, setSimulationLog] = useState<string[]>([]);
  const [simulationLatency, setSimulationLatency] = useState<number>(0);

  const runRenderSimulation = () => {
    setSimulationStep('request');
    setSimulationLog(['Browser initiates navigation...', 'Checking router configurations...']);
    setSimulationLatency(0);

    let delay = 600;
    setTimeout(() => {
      if (renderingMode === 'SSG') {
        setSimulationStep('cdn_lookup');
        setSimulationLog(prev => [...prev, 'CDN Hit! Static HTML page located on closest Edge server.', 'Direct HTML response started instantly...']);
        setSimulationLatency(15);
        setTimeout(() => {
          setSimulationStep('client_hydrate');
          setSimulationLog(prev => [...prev, 'HTML structure rendered instantly.', 'Hydrating lightweight page bundles...', 'Page is interactive!']);
          setSimulationLatency(40);
          setSimulationStep('done');
        }, 700);
      } else if (renderingMode === 'SSR') {
        setSimulationStep('db_fetch');
        setSimulationLog(prev => [...prev, 'Request forwarded to Node.js server.', 'Querying database directly from server props...', 'Database returned dynamic payload.']);
        setSimulationLatency(280);
        setTimeout(() => {
          setSimulationStep('server_render');
          setSimulationLog(prev => [...prev, 'Compiling dynamic components with fresh props.', 'Building unique HTML stream.', 'Sending HTML response...']);
          setSimulationLatency(420);
          setTimeout(() => {
            setSimulationStep('client_hydrate');
            setSimulationLog(prev => [...prev, 'HTML received by browser.', 'Loading client javascript chunks.', 'Component state initialized.']);
            setSimulationLatency(580);
            setSimulationStep('done');
          }, 600);
        }, 700);
      } else if (renderingMode === 'ISR') {
        setSimulationStep('cdn_lookup');
        setSimulationLog(prev => [...prev, 'CDN check: Cached version exists (Stale duration: 340s).', 'Serving cached page instantly...']);
        setSimulationLatency(25);
        setTimeout(() => {
          setSimulationStep('server_render');
          setSimulationLog(prev => [...prev, 'Background refresh triggered!', 'Re-fetching updated API resources...', 'Regenerating static HTML cache for subsequent users.', 'Cache updated successfully!']);
          setSimulationLatency(30);
          setSimulationStep('done');
        }, 800);
      } else {
        // CSR
        setSimulationStep('server_render');
        setSimulationLog(prev => [...prev, 'Server returns blank HTML layout script wrapper immediately.', 'Browser displays loading frame.']);
        setSimulationLatency(80);
        setTimeout(() => {
          setSimulationStep('db_fetch');
          setSimulationLog(prev => [...prev, 'Browser loads app bundle, starts client API query...', 'Database responds after server proxy...', 'JSON payload received in client component.']);
          setSimulationLatency(490);
          setTimeout(() => {
            setSimulationStep('client_hydrate');
            setSimulationLog(prev => [...prev, 'Parsing payload, generating DOM elements client-side.', 'Rendering state changes completed.']);
            setSimulationLatency(640);
            setSimulationStep('done');
          }, 600);
        }, 850);
      }
    }, delay);
  };

  // Q3, Q20, Q21: Router sandbox
  const [selectedRouterPath, setSelectedRouterPath] = useState<string>('app/page.tsx');
  const [routerMode, setRouterMode] = useState<'app' | 'pages'>('app');
  const routerFiles = {
    app: [
      { path: 'app/page.tsx', url: '/', desc: 'App landing root page' },
      { path: 'app/about/page.tsx', url: '/about', desc: 'Simple static company info' },
      { path: 'app/blog/[slug]/page.tsx', url: '/blog/nextjs-is-awesome', desc: 'Dynamic blog path segment parameter ([slug] = nextjs-is-awesome)' },
      { path: 'app/docs/[[...slug]]/page.tsx', url: '/docs/v2/routing/layouts', desc: 'Optional catch-all directory matching multiple levels ([...slug] = ["v2", "routing", "layouts"])' },
      { path: 'app/api/health/route.ts', url: '/api/health', desc: 'Serverless backend API endpoint responding with JSON' }
    ],
    pages: [
      { path: 'pages/index.tsx', url: '/', desc: 'Pages landing root' },
      { path: 'pages/about.tsx', url: '/about', desc: 'Pages static route' },
      { path: 'pages/products/[id].tsx', url: '/products/45', desc: 'Pages dynamic ID parameter' },
      { path: 'pages/api/users.ts', url: '/api/users', desc: 'Pages serverless API function' }
    ]
  };

  // Q8, Q9, Q32: ISR Revalidation sandbox
  const [revalidateTime, setRevalidateTime] = useState<number>(10);
  const [clockTime, setClockTime] = useState<number>(0);
  const [cacheStatus, setCacheStatus] = useState<'fresh' | 'stale' | 'regenerating'>('fresh');
  const [dataAge, setDataAge] = useState<number>(0);
  const [activeDataValue, setActiveDataValue] = useState<number>(99);
  const [isrLog, setIsrLog] = useState<string[]>(['Cache Initialized: Static HTML generated (value: $99)']);

  useEffect(() => {
    let timer: any;
    if (clockTime >= 0) {
      timer = setInterval(() => {
        setClockTime(prev => prev + 1);
        setDataAge(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [clockTime]);

  useEffect(() => {
    if (dataAge >= revalidateTime) {
      setCacheStatus('stale');
    } else {
      setCacheStatus('fresh');
    }
  }, [dataAge, revalidateTime]);

  const requestIsrPage = () => {
    if (cacheStatus === 'stale') {
      setCacheStatus('regenerating');
      const randomValue = Math.floor(Math.random() * 50) + 75;
      setIsrLog(prev => [
        `Request at t=${clockTime}s: Serving cached STALE page (value: $${activeDataValue}) instantly.`,
        `Background Regeneration triggered at t=${clockTime}s. Fetching database...`,
        ...prev
      ]);
      setTimeout(() => {
        setActiveDataValue(randomValue);
        setDataAge(0);
        setCacheStatus('fresh');
        setIsrLog(prev => [
          `Background Regeneration Completed at t=${clockTime + 1}s. Updated cache (new value: $${randomValue})`,
          ...prev
        ]);
      }, 1500);
    } else if (cacheStatus === 'regenerating') {
      setIsrLog(prev => [
        `Request at t=${clockTime}s: Regeneration is already processing. Served stale cached page ($${activeDataValue}).`,
        ...prev
      ]);
    } else {
      setIsrLog(prev => [
        `Request at t=${clockTime}s: Served FRESH page ($${activeDataValue}) instantly from Edge cache. (Age: ${dataAge}s)`,
        ...prev
      ]);
    }
  };

  // Q10: RSC Bundle Size interactive calculation
  const [rscItems, setRscItems] = useState([
    { name: "Layout Frame & Header", size: 0, isServer: true, desc: "Renders title, container grid, and global style templates." },
    { name: "Product Static Grid", size: 0, isServer: true, desc: "Fetches product metadata from database and maps static HTML cards." },
    { name: "Persistent Sidebar Nav", size: 18, isServer: false, desc: "Tracks active navigation page state and sub-item dropdown triggers." },
    { name: "Dynamic Live Search Bar", size: 12, isServer: false, desc: "Captures text input onChange and filters search lists in real-time." },
    { name: "Heavy Interactive Chart", size: 95, isServer: false, desc: "Uses D3/Recharts canvas libraries to render client analytics nodes." },
    { name: "Related Articles List", size: 0, isServer: true, desc: "Pulls recommended text lists from CMS entirely server-side." }
  ]);

  const toggleRscItem = (index: number) => {
    setRscItems(prev => prev.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          isServer: !item.isServer,
          size: item.isServer ? (item.name.includes("Chart") ? 95 : item.name.includes("Search") ? 12 : 18) : 0
        };
      }
      return item;
    }));
  };

  const clientBundleSize = rscItems.reduce((acc, item) => acc + (item.isServer ? 0 : item.size), 0);

  // Q11, Q12: Server vs Client Component Decision Tree
  const [decisionAnswers, setDecisionAnswers] = useState<Record<string, boolean>>({});
  const decisionTreeSteps = [
    { key: "state", q: "Does the component require React state hooks (useState, useReducer) or lifecycle hooks (useEffect)?", label: "Interactivity / State" },
    { key: "events", q: "Does it attach browser event listeners (like onClick, onChange, onSubmit)?", label: "Browser Events" },
    { key: "browser", q: "Does it directly call browser-only globals (like 'window', 'document', 'localStorage')?", label: "Browser Globals" },
    { key: "secure", q: "Does it need to query a database directly, read file systems, or load secure API tokens securely?", label: "Secure Server Actions" }
  ];

  const handleDecisionToggle = (key: string, val: boolean) => {
    setDecisionAnswers(prev => ({ ...prev, [key]: val }));
  };

  const determineComponentRecommendation = () => {
    if (decisionAnswers['secure']) {
      return {
        type: "Server Component",
        badge: "Server Component (RSC)",
        desc: "Because you need direct server credentials or direct DB queries, this must be a Server Component. If you also need client hooks, split your UI: fetch data in a parent Server Component and pass it down as props to a child Client Component.",
        color: "bg-cyan-50 border-cyan-200 text-cyan-800 dark:bg-cyan-950/40 dark:border-cyan-800/60 dark:text-cyan-200"
      };
    }
    if (decisionAnswers['state'] || decisionAnswers['events'] || decisionAnswers['browser']) {
      return {
        type: "Client Component",
        badge: '"use client" (Client Component)',
        desc: "Because you require active browser interaction, state triggers, or window environments, this component must be hydrated client-side. Add the 'use client' directive at the very top of your component file.",
        color: "bg-cyan-50 border-cyan-200 text-cyan-800 dark:bg-cyan-950/40 dark:border-cyan-800/60 dark:text-cyan-200"
      };
    }
    return {
      type: "Server Component",
      badge: "Server Component (Default)",
      desc: "Since this component only displays data and does not require states, click triggers, or browser environments, it should remain a Server Component. Next.js will render it with zero client-side JavaScript sent to the browser!",
      color: "bg-cyan-50 border-cyan-200 text-cyan-800 dark:bg-cyan-950/40 dark:border-cyan-800/60 dark:text-cyan-200"
    };
  };

  // Q13: Nested Layout Wireframe Simulator
  const [activeLayoutRoute, setActiveLayoutRoute] = useState<string>('/dashboard/analytics');
  const [layoutRenderCount, setLayoutRenderCount] = useState<number>(1);
  const [childRenderCount, setChildRenderCount] = useState<Record<string, number>>({
    '/dashboard/analytics': 1,
    '/dashboard/settings': 1,
    '/dashboard/billing': 1
  });

  const navigateLayoutRoute = (route: string) => {
    setActiveLayoutRoute(route);
    setChildRenderCount(prev => ({
      ...prev,
      [route]: (prev[route] || 0) + 1
    }));
    // Note: layoutRenderCount does NOT increase because layouts persist!
  };

  // Q14: API endpoint test console
  const [apiMethod, setApiMethod] = useState<'GET' | 'POST'>('GET');
  const [apiRequestBody, setApiRequestBody] = useState<string>('{\n  "feedback": "Next.js is incredibly fast!"\n}');
  const [apiConsoleOutput, setApiConsoleOutput] = useState<string>('// Enter params/body and click "Execute HTTP Endpoint"');
  const [apiConsoleStatus, setApiConsoleStatus] = useState<number | null>(null);

  const runApiConsoleSimulation = () => {
    setApiConsoleOutput('// Connecting to serverless gateway...\n// Executing handler function in cloud container...');
    setApiConsoleStatus(null);
    setTimeout(() => {
      if (apiMethod === 'GET') {
        setApiConsoleStatus(200);
        setApiConsoleOutput(JSON.stringify({
          status: "healthy",
          uptime: "23402s",
          services: {
            database: "connected",
            cache: "active"
          },
          timestamp: new Date().toISOString()
        }, null, 2));
      } else {
        try {
          const parsed = JSON.parse(apiRequestBody);
          setApiConsoleStatus(201);
          setApiConsoleOutput(JSON.stringify({
            success: true,
            message: "Feedback submitted and validated successfully!",
            receivedData: parsed,
            meta: {
              authType: "anonymous",
              processTimeMs: 14
            }
          }, null, 2));
        } catch (e) {
          setApiConsoleStatus(400);
          setApiConsoleOutput(JSON.stringify({
            success: false,
            error: "Bad Request",
            message: "Failed to parse JSON body request payload. Please verify syntax structure."
          }, null, 2));
        }
      }
    }, 800);
  };

  // Q15: next/image compression calculator
  const [imgQuality, setImgQuality] = useState<number>(75);
  const [imgFormat, setImgFormat] = useState<'JPEG' | 'WebP' | 'AVIF'>('WebP');
  const [imgLoadingType, setImgLoadingType] = useState<'eager' | 'lazy'>('lazy');

  const calculateImageSize = () => {
    const baseSizeKb = 3400; // 3.4 MB original raw jpeg
    let ratio = 1;
    if (imgFormat === 'WebP') ratio = 0.12;
    if (imgFormat === 'AVIF') ratio = 0.07;
    if (imgFormat === 'JPEG') ratio = 0.55;

    const qualityFactor = imgQuality / 100;
    const finalSize = Math.round(baseSizeKb * ratio * (0.4 + qualityFactor * 0.6));
    return {
      originalSize: "3.4 MB",
      optimizedSize: finalSize >= 1024 ? `${(finalSize / 1024).toFixed(2)} MB` : `${finalSize} KB`,
      compressionRatio: `${Math.round((1 - (finalSize / baseSizeKb)) * 100)}%`
    };
  };

  // Q18, Q33: Middleware request parser
  const [visitorRole, setVisitorRole] = useState<'guest' | 'user' | 'admin'>('guest');
  const [visitorPath, setVisitorPath] = useState<string>('/dashboard/settings');
  const [middlewareResult, setMiddlewareResult] = useState<{
    action: string;
    target: string;
    headers: string;
  } | null>(null);

  const simulateMiddleware = () => {
    if (visitorPath.startsWith('/dashboard')) {
      if (visitorRole === 'guest') {
        setMiddlewareResult({
          action: "NextResponse.redirect() - HTTP 302",
          target: "/login?redirect=" + encodeURIComponent(visitorPath),
          headers: "Location: /login\nSet-Cookie: redirect_origin=" + visitorPath
        });
      } else if (visitorRole === 'user' && visitorPath.includes('admin')) {
        setMiddlewareResult({
          action: "NextResponse.rewrite() - HTTP 403 Forbidden Page",
          target: "/403 (Unauthorized Boundary)",
          headers: "X-Auth-Status: Denied\nX-Reason: Insufficient Scope"
        });
      } else {
        setMiddlewareResult({
          action: "NextResponse.next() - ALLOW ACCESS",
          target: visitorPath + " (Component rendered successfully)",
          headers: "X-Authenticated-User: " + visitorRole + "\nCache-Control: private, no-store"
        });
      }
    } else {
      setMiddlewareResult({
        action: "NextResponse.next() - PUBLIC ACCESS",
        target: visitorPath,
        headers: "Cache-Control: public, max-age=3600"
      });
    }
  };

  // Q25: Auto Static Optimization Page check
  const [isPageDynamic, setIsPageDynamic] = useState<boolean>(false);
  const [hasServerProps, setHasServerProps] = useState<boolean>(false);
  const [hasCookiesAccess, setHasCookiesAccess] = useState<boolean>(false);

  const getOptimizationBadge = () => {
    if (hasServerProps || hasCookiesAccess) {
      return {
        badge: "λ (Dynamic Server Page)",
        desc: "Because your code calls block-level dynamic server requirements (like reading dynamic HTTP cookies, request search queries, or exporting getServerSideProps), Next.js cannot pre-compile this route statically. It will compute and generate HTML dynamically on every request.",
        color: "text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900",
        icon: Server
      };
    }
    return {
      badge: "⚡ (Automatic Static Page)",
      desc: "Awesome! Your code contains no dynamic dependencies, API-key cookie lookups, or uncached fetch operations. Next.js compiles this page completely into static HTML files at build-time, serving it in under 20ms worldwide via CDN caches.",
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900",
      icon: Sparkles
    };
  };

  // Q26: Env variables tester
  const [envSecretValue, setEnvSecretValue] = useState<string>('my_super_secure_api_key_12345');
  const [publicEnvValue, setPublicEnvValue] = useState<string>('https://analytics.mycompany.com/v1');

  // Q29, Q30: Streaming & Suspense demonstration
  const [suspenseState, setSuspenseState] = useState<'idle' | 'loading' | 'staggered'>('idle');
  const [headerLoaded, setHeaderLoaded] = useState<boolean>(false);
  const [statsLoaded, setStatsLoaded] = useState<boolean>(false);
  const [reviewsLoaded, setReviewsLoaded] = useState<boolean>(false);

  const triggerSuspenseSimulation = () => {
    setSuspenseState('loading');
    setHeaderLoaded(true);
    setStatsLoaded(false);
    setReviewsLoaded(false);

    setTimeout(() => {
      setStatsLoaded(true);
      setSuspenseState('staggered');
    }, 1200);

    setTimeout(() => {
      setReviewsLoaded(true);
      setSuspenseState('idle');
    }, 2800);
  };

  // Q35: Core Web Vitals audit dashboard
  const [lcpFixed, setLcpFixed] = useState(false);
  const [clsFixed, setClsFixed] = useState(false);
  const [inpFixed, setInpFixed] = useState(false);

  const getVitalsScore = () => {
    let score = 55;
    if (lcpFixed) score += 15;
    if (clsFixed) score += 15;
    if (inpFixed) score += 15;
    return score;
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm h-full flex flex-col">
      <div className="bg-gray-50/80 dark:bg-zinc-950/80 p-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-500" />
          <span className="font-mono text-xs font-semibold text-gray-700 dark:text-zinc-300">
            Concept Simulator (Q#{questionId})
          </span>
        </div>
        <div className="flex bg-gray-200/60 dark:bg-zinc-800/60 rounded-lg p-0.5">
          <button 
            onClick={() => setActiveTab('run')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              activeTab === 'run' 
                ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Interactive Diagram
          </button>
        </div>
      </div>

      <div className="p-5 flex-1 overflow-y-auto">
        {/* Q1: What is Next.js - Layers diagram */}
        {questionId === 1 && (
          <div className="space-y-4">
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              Click the application stack layers below to explore how Next.js powers full-stack apps:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 pt-2">
              {q1Layers.map((layer, idx) => {
                const Icon = layer.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => setQ1ActiveLayer(idx)}
                    className={`p-3 rounded-lg border text-left transition-all flex flex-col gap-2 ${
                      q1ActiveLayer === idx 
                        ? 'border-cyan-500 ring-2 ring-cyan-500/10 bg-cyan-50/40 dark:bg-cyan-950/20' 
                        : 'border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-md ${layer.bg}`}>
                        <Icon className={`w-4 h-4 ${layer.color}`} />
                      </div>
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        L{5 - idx}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-gray-700 dark:text-zinc-300">
                      {layer.title}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="p-4 rounded-xl border border-cyan-100 dark:border-cyan-950/60 bg-gradient-to-r from-cyan-50/30 to-cyan-50/10 dark:from-cyan-950/10 dark:to-transparent mt-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></div>
                <h4 className="text-xs font-semibold text-gray-900 dark:text-white">
                  {q1Layers[q1ActiveLayer].title} Scope:
                </h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed">
                {q1Layers[q1ActiveLayer].desc}
              </p>
            </div>
          </div>
        )}

        {/* Q2, Q5, Q6, Q7, Q36: Rendering Strategies */}
        {([2, 5, 6, 7, 36, 38].includes(questionId)) && (
          <div className="space-y-4">
            <div className="flex gap-2 bg-gray-100 dark:bg-zinc-800/80 p-1 rounded-lg w-fit">
              {(['SSR', 'SSG', 'ISR', 'CSR'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setRenderingMode(m); setSimulationStep('idle'); }}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    renderingMode === m 
                      ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-xs' 
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Simulated Architecture Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-3 relative">
              {/* Browser Node */}
              <div className={`p-3 rounded-xl border text-center relative z-10 ${
                ['request', 'client_hydrate'].includes(simulationStep) 
                  ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/20' 
                  : 'border-gray-100 dark:border-zinc-800'
              }`}>
                <Laptop className="w-5 h-5 mx-auto text-cyan-500 mb-1" />
                <span className="text-xs font-semibold block text-gray-900 dark:text-white">Client Browser</span>
                <span className="text-[10px] text-gray-400">Renders DOM</span>
              </div>

              {/* Edge Node */}
              <div className={`p-3 rounded-xl border text-center relative z-10 ${
                simulationStep === 'cdn_lookup' 
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' 
                  : 'border-gray-100 dark:border-zinc-800'
              }`}>
                <Globe className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
                <span className="text-xs font-semibold block text-gray-900 dark:text-white">CDN Cache (Edge)</span>
                <span className="text-[10px] text-gray-400">Stores Static files</span>
              </div>

              {/* Server Node */}
              <div className={`p-3 rounded-xl border text-center relative z-10 ${
                ['server_render', 'db_fetch'].includes(simulationStep) 
                  ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/20' 
                  : 'border-gray-100 dark:border-zinc-800'
              }`}>
                <Server className="w-5 h-5 mx-auto text-cyan-500 mb-1" />
                <span className="text-xs font-semibold block text-gray-900 dark:text-white">Node.js Server</span>
                <span className="text-[10px] text-gray-400">Generates HTML</span>
              </div>

              {/* Database Node */}
              <div className={`p-3 rounded-xl border text-center relative z-10 ${
                simulationStep === 'db_fetch' 
                  ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20' 
                  : 'border-gray-100 dark:border-zinc-800'
              }`}>
                <Database className="w-5 h-5 mx-auto text-rose-500 mb-1" />
                <span className="text-xs font-semibold block text-gray-900 dark:text-white">Database</span>
                <span className="text-[10px] text-gray-400">Stores RAW Data</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={runRenderSimulation}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                Run Simulation Request
              </button>
              <div className="text-xs font-mono text-gray-500 dark:text-zinc-400">
                Time-to-First-Byte (TTFB): <span className="font-bold text-cyan-500">{simulationLatency ? `${simulationLatency}ms` : '--'}</span>
              </div>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-zinc-950/60 rounded-lg border border-gray-100 dark:border-zinc-800 font-mono text-xs text-gray-600 dark:text-zinc-300 h-32 overflow-y-auto space-y-1">
              <span className="text-[10px] text-gray-400 block border-b pb-1 mb-1">REAL-TIME LOG STREAM:</span>
              {simulationLog.map((log, i) => (
                <div key={i} className="flex gap-2 items-start text-[11px]">
                  <span className="text-cyan-500 select-none">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
              {simulationStep === 'idle' && (
                <p className="text-gray-400 italic">Click the run button to observe rendering sequence...</p>
              )}
            </div>
          </div>
        )}

        {/* Q3, Q20, Q21: File-based routing playground */}
        {([3, 20, 21].includes(questionId)) && (
          <div className="space-y-4">
            <div className="flex gap-2 pb-1 border-b dark:border-zinc-800">
              <button 
                onClick={() => { setRouterMode('app'); setSelectedRouterPath('app/page.tsx'); }}
                className={`pb-2 text-xs font-semibold px-2 transition-colors relative ${
                  routerMode === 'app' ? 'text-cyan-500' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                App Router (app/)
                {routerMode === 'app' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500"></div>}
              </button>
              <button 
                onClick={() => { setRouterMode('pages'); setSelectedRouterPath('pages/index.tsx'); }}
                className={`pb-2 text-xs font-semibold px-2 transition-colors relative ${
                  routerMode === 'pages' ? 'text-cyan-500' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                Pages Router (pages/)
                {routerMode === 'pages' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500"></div>}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Directory Tree */}
              <div className="space-y-1.5 p-3 rounded-lg border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/20">
                <p className="text-[10px] font-mono font-semibold text-gray-400 pb-1">DIRECTORY FILE TREE:</p>
                {routerFiles[routerMode].map((f) => (
                  <button
                    key={f.path}
                    onClick={() => setSelectedRouterPath(f.path)}
                    className={`w-full flex items-center justify-between text-left p-2 rounded text-xs transition-all ${
                      selectedRouterPath === f.path 
                        ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 border-l-4 border-cyan-500 font-medium' 
                        : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <Folder className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="font-mono truncate">{f.path}</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </button>
                ))}
              </div>

              {/* URL mapping result */}
              <div className="flex flex-col gap-3">
                <div className="bg-gray-50 dark:bg-zinc-950/60 rounded-xl border border-gray-100 dark:border-zinc-800 p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400">BROWSER ADDRESS BAR:</span>
                    <div className="flex items-center gap-2 mt-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-mono">
                      <Globe className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-gray-400">https://myapp.com</span>
                      <span className="text-gray-900 dark:text-white font-semibold">
                        {routerFiles[routerMode].find(f => f.path === selectedRouterPath)?.url}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t dark:border-zinc-800 mt-2">
                    <span className="text-[10px] font-semibold text-gray-400">ROUTE DESCRIPTION:</span>
                    <p className="text-xs text-gray-600 dark:text-zinc-300 mt-1 leading-relaxed">
                      {routerFiles[routerMode].find(f => f.path === selectedRouterPath)?.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Q4: Pages vs App Router structures */}
        {questionId === 4 && (
          <div className="space-y-4">
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              Interactive file structures contrasting how layouts and routing segments are resolved:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-xl bg-gray-50/50 dark:bg-zinc-950/20">
                <h5 className="text-xs font-bold text-gray-800 dark:text-zinc-300 border-b pb-1.5 mb-2">
                  Legacy Pages Router Layout (Flat)
                </h5>
                <pre className="font-mono text-[11px] text-gray-600 dark:text-zinc-400 space-y-1">
                  <div>pages/</div>
                  <div className="pl-4">├── _app.tsx <span className="text-cyan-500">(Global provider wrapper)</span></div>
                  <div className="pl-4">├── _document.tsx <span className="text-emerald-500">(Custom raw HTML root)</span></div>
                  <div className="pl-4">├── index.tsx <span className="text-gray-500">(/)</span></div>
                  <div className="pl-4">├── about.tsx <span className="text-gray-500">(/about)</span></div>
                  <div className="pl-4">└── dashboard.tsx <span className="text-gray-500">(/dashboard)</span></div>
                </pre>
                <div className="mt-4 p-2 bg-cyan-50/30 rounded border text-[11px] text-gray-500">
                  ⚠️ No native nesting support. Custom multi-layouts require custom manual wrapper component patterns on individual pages.
                </div>
              </div>

              <div className="p-4 border rounded-xl bg-gray-50/50 dark:bg-zinc-950/20">
                <h5 className="text-xs font-bold text-gray-800 dark:text-zinc-300 border-b pb-1.5 mb-2">
                  Modern App Router Layout (Nested)
                </h5>
                <pre className="font-mono text-[11px] text-gray-600 dark:text-zinc-400 space-y-1">
                  <div>app/</div>
                  <div className="pl-4">├── layout.tsx <span className="text-cyan-500">(Global layout HTML)</span></div>
                  <div className="pl-4">├── page.tsx <span className="text-emerald-500">(/)</span></div>
                  <div className="pl-4">└── dashboard/</div>
                  <div className="pl-8">├── layout.tsx <span className="text-cyan-500">(Nested Layout dashboard)</span></div>
                  <div className="pl-8">├── page.tsx <span className="text-emerald-500">(/dashboard)</span></div>
                  <div className="pl-8">└── loading.tsx <span className="text-cyan-500">(Automatic skeletons)</span></div>
                </pre>
                <div className="mt-4 p-2 bg-cyan-50/30 rounded border text-[11px] text-cyan-700 dark:text-cyan-300">
                  ✨ Native layout hierarchy support! Directory boundaries isolate loaders, error boundaries, and nested layouts automatically.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Q8, Q9: ISR Revalidation clock */}
        {([8, 9, 32].includes(questionId)) && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
              {/* Controls */}
              <div className="p-3 bg-gray-50 dark:bg-zinc-950/40 border rounded-xl space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 block mb-1">
                    REVALIDATE DURATION: {revalidateTime}s
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    value={revalidateTime}
                    onChange={(e) => setRevalidateTime(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setClockTime(0);
                      setDataAge(0);
                      setActiveDataValue(99);
                      setCacheStatus('fresh');
                      setIsrLog(['Cache Cleaned: Static HTML generated (value: $99)']);
                    }}
                    className="flex-1 p-2 bg-gray-200 dark:bg-zinc-800 rounded text-center text-xs font-semibold cursor-pointer"
                  >
                    Reset Clock
                  </button>
                </div>
              </div>

              {/* Visual Ticker */}
              <div className="p-4 border rounded-xl bg-gray-50/20 flex flex-col items-center justify-center gap-1.5 text-center relative overflow-hidden">
                <Clock className="w-7 h-7 text-cyan-500 animate-pulse" />
                <span className="text-[10px] text-gray-400 font-mono">APP UPTIME TIMER:</span>
                <span className="text-xl font-bold font-mono text-gray-900 dark:text-white">
                  {clockTime}s
                </span>
                <span className="text-[10px] text-gray-400 mt-2">CACHE DATA AGE:</span>
                <span className="text-sm font-semibold font-mono text-cyan-600 dark:text-cyan-400">
                  {dataAge}s
                </span>
              </div>

              {/* Live Cache Card */}
              <div className="p-4 border rounded-xl bg-white dark:bg-zinc-900 flex flex-col justify-between h-full min-h-[140px]">
                <div>
                  <div className="flex justify-between items-center pb-2 border-b dark:border-zinc-800">
                    <span className="text-[10px] font-semibold text-gray-400">CACHE STATUS:</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      cacheStatus === 'fresh' 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' 
                        : cacheStatus === 'stale' 
                        ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300' 
                        : 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 animate-pulse'
                    }`}>
                      {cacheStatus}
                    </span>
                  </div>
                  <div className="py-2 text-center">
                    <span className="text-[10px] text-gray-400 block">SERVED HTML VALUE:</span>
                    <span className="text-2xl font-black text-gray-900 dark:text-white">${activeDataValue}</span>
                  </div>
                </div>
                <button
                  onClick={requestIsrPage}
                  className="w-full py-1.5 bg-cyan-600 text-white rounded text-xs font-semibold cursor-pointer hover:bg-cyan-700 transition-colors"
                >
                  Send User Request
                </button>
              </div>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-zinc-950/60 rounded-lg border border-gray-100 dark:border-zinc-800 font-mono text-[11px] text-gray-600 dark:text-zinc-400 h-28 overflow-y-auto space-y-1">
              <span className="text-[10px] font-bold text-gray-400 block border-b pb-1 mb-1">STALE-WHILE-REVALIDATE ACTIONS LOG:</span>
              {isrLog.map((log, idx) => (
                <div key={idx} className="flex gap-1">
                  <span className="text-emerald-500">✓</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Q10: RSC Bundle Size Calculator */}
        {questionId === 10 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 dark:text-zinc-400">
                Toggle components to Server vs Client states to watch client-side JS payload change:
              </p>
              <div className="p-2 border rounded-xl bg-cyan-50/50 dark:bg-cyan-950/20 text-center">
                <span className="text-[9px] font-bold block text-gray-400">CLIENT JS LOAD:</span>
                <span className="text-lg font-bold text-cyan-600 dark:text-cyan-300">
                  {clientBundleSize} KB
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {rscItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3 border rounded-xl bg-gray-50/30 dark:bg-zinc-900/50 flex items-center justify-between gap-2"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-gray-400 leading-normal">
                      {item.desc}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleRscItem(idx)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-all uppercase min-w-[100px] text-center ${
                      item.isServer 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' 
                        : 'bg-cyan-100 text-cyan-800 border border-cyan-300 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800'
                    }`}
                  >
                    {item.isServer ? "Server (0 KB)" : `Client (+${item.size}KB)`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Q11, Q12: Server vs Client Component Decision Tree */}
        {([11, 12].includes(questionId)) && (
          <div className="space-y-4">
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              Interactive Decision Tree: Toggle variables to see whether a Server or Client Component is required.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                {decisionTreeSteps.map((step) => (
                  <div key={step.key} className="p-3 border rounded-xl flex items-center justify-between bg-gray-50/50 dark:bg-zinc-950/20">
                    <span className="text-xs font-medium text-gray-700 dark:text-zinc-300">
                      {step.label}
                    </span>
                    <div className="flex bg-gray-200 dark:bg-zinc-800 rounded p-0.5">
                      <button
                        onClick={() => handleDecisionToggle(step.key, true)}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer ${
                          decisionAnswers[step.key] === true 
                            ? 'bg-cyan-600 text-white' 
                            : 'text-gray-500'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleDecisionToggle(step.key, false)}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer ${
                          decisionAnswers[step.key] === false || decisionAnswers[step.key] === undefined 
                            ? 'bg-cyan-600 text-white' 
                            : 'text-gray-500'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`p-4 border rounded-xl flex flex-col justify-between ${determineComponentRecommendation().color}`}>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">
                    Component Outcome Recommendation:
                  </span>
                  <h4 className="text-base font-black mt-1 mb-2">
                    {determineComponentRecommendation().badge}
                  </h4>
                  <p className="text-xs leading-relaxed opacity-90">
                    {determineComponentRecommendation().desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-current/20 text-[10px] font-mono flex gap-1.5 items-center opacity-80">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Next.js compiler recommendation</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Q13: Nested Layout Wireframe Simulator */}
        {questionId === 13 && (
          <div className="space-y-4">
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              Observe that layout states persist and never re-render (render count stays static) while nested sub-pages re-mount on change:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400">SIMULATE NAVIGATION LINKS:</span>
                {['/dashboard/analytics', '/dashboard/settings', '/dashboard/billing'].map((route) => (
                  <button
                    key={route}
                    onClick={() => navigateLayoutRoute(route)}
                    className={`p-2 rounded-lg text-xs font-mono text-left border cursor-pointer transition-all uppercase ${
                      activeLayoutRoute === route 
                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300' 
                        : 'border-gray-100 dark:border-zinc-800 hover:bg-gray-100'
                    }`}
                  >
                    {route}
                  </button>
                ))}
              </div>

              {/* Wireframe display */}
              <div className="md:col-span-2 border rounded-xl p-4 bg-gray-50 dark:bg-zinc-950/60 flex h-48 gap-3 relative">
                {/* Sidebar Layout */}
                <div className="w-1/3 bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800 rounded-lg p-3 flex flex-col justify-between relative">
                  <div className="absolute top-2 right-2 bg-cyan-600 text-white font-mono text-[9px] px-1 rounded">
                    Renders: {layoutRenderCount}
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-cyan-900 dark:text-cyan-200">dashboard/layout.tsx</h5>
                    <p className="text-[9px] text-cyan-700/80 dark:text-cyan-300/80 mt-1">Sidebar state holds active menus safely.</p>
                  </div>
                  <div className="h-6 w-full bg-cyan-200 dark:bg-cyan-900 rounded"></div>
                </div>

                {/* Subpage dynamic chunk */}
                <div className="flex-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 flex flex-col justify-between relative">
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white font-mono text-[9px] px-1 rounded animate-bounce">
                    Renders: {childRenderCount[activeLayoutRoute]}
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-emerald-900 dark:text-emerald-200">
                      {activeLayoutRoute.split('/').pop()}/page.tsx
                    </h5>
                    <p className="text-[9px] text-emerald-700/80 dark:text-emerald-300/80 mt-1">Loads fresh asynchronous data components.</p>
                  </div>
                  <div className="h-6 w-full bg-emerald-200 dark:bg-emerald-900 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Q14: API Route mock console */}
        {questionId === 14 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-zinc-950/40 border rounded-xl space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 block mb-1">HTTP METHOD:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setApiMethod('GET')}
                      className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer ${
                        apiMethod === 'GET' ? 'bg-cyan-600 text-white' : 'bg-gray-200 dark:bg-zinc-800 text-gray-600'
                      }`}
                    >
                      GET
                    </button>
                    <button
                      onClick={() => setApiMethod('POST')}
                      className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer ${
                        apiMethod === 'POST' ? 'bg-cyan-600 text-white' : 'bg-gray-200 dark:bg-zinc-800 text-gray-600'
                      }`}
                    >
                      POST
                    </button>
                  </div>
                </div>

                {apiMethod === 'POST' && (
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1">POST REQUEST BODY (JSON):</label>
                    <textarea
                      value={apiRequestBody}
                      onChange={(e) => setApiRequestBody(e.target.value)}
                      className="w-full h-20 p-2 border rounded font-mono text-[11px] bg-white dark:bg-zinc-900 dark:border-zinc-800"
                    />
                  </div>
                )}

                <button
                  onClick={runApiConsoleSimulation}
                  className="w-full py-2 bg-cyan-600 text-white font-semibold rounded-lg text-xs hover:bg-cyan-700 transition-colors cursor-pointer"
                >
                  Execute HTTP Endpoint
                </button>
              </div>

              {/* Console terminal response */}
              <div className="flex flex-col rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800">
                <div className="bg-gray-100 dark:bg-zinc-950 px-3 py-1.5 border-b flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span>TERMINAL RESPONSE CONSOLE</span>
                  {apiConsoleStatus && (
                    <span className={`font-bold px-1.5 rounded uppercase ${
                      apiConsoleStatus < 300 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      STATUS {apiConsoleStatus}
                    </span>
                  )}
                </div>
                <pre className="p-3 bg-zinc-900 text-emerald-400 font-mono text-[11px] flex-1 min-h-[140px] overflow-auto leading-relaxed">
                  {apiConsoleOutput}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Q15: next/image Compression slider */}
        {questionId === 15 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50/50 dark:bg-zinc-950/20 border rounded-xl space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">IMAGE FORMAT EXPORT:</label>
                  <div className="flex gap-2">
                    {(['JPEG', 'WebP', 'AVIF'] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setImgFormat(fmt)}
                        className={`flex-1 py-1 rounded text-xs font-semibold cursor-pointer ${
                          imgFormat === fmt ? 'bg-cyan-600 text-white' : 'bg-gray-200 dark:bg-zinc-800 text-gray-600'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-bold text-gray-400">COMPRESSION QUALITY: {imgQuality}</label>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={100}
                    value={imgQuality}
                    onChange={(e) => setImgQuality(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">IMAGE LOADING STRATEGY:</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setImgLoadingType('lazy')}
                      className={`flex-1 py-1 rounded text-xs font-semibold cursor-pointer ${
                        imgLoadingType === 'lazy' ? 'bg-cyan-600 text-white' : 'bg-gray-200 dark:bg-zinc-800 text-gray-600'
                      }`}
                    >
                      Lazy loading (Standard)
                    </button>
                    <button
                      onClick={() => setImgLoadingType('eager')}
                      className={`flex-1 py-1 rounded text-xs font-semibold cursor-pointer ${
                        imgLoadingType === 'eager' ? 'bg-cyan-600 text-white' : 'bg-gray-200 dark:bg-zinc-800 text-gray-600'
                      }`}
                    >
                      Priority preload
                    </button>
                  </div>
                </div>
              </div>

              {/* Result card */}
              <div className="p-4 border border-cyan-100 dark:border-cyan-950 bg-gradient-to-br from-cyan-50/10 to-cyan-50/20 dark:from-cyan-950/10 dark:to-transparent rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ImageIcon className="w-5 h-5 text-cyan-500" />
                    <h5 className="text-xs font-bold text-gray-800 dark:text-zinc-300">next/image Compression Matrix:</h5>
                  </div>
                  <div className="space-y-2 font-mono text-xs text-gray-600 dark:text-zinc-400">
                    <div className="flex justify-between border-b pb-1 dark:border-zinc-800">
                      <span>Original file:</span>
                      <span className="font-semibold text-rose-500">{calculateImageSize().originalSize}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1 dark:border-zinc-800">
                      <span>Optimized size:</span>
                      <span className="font-semibold text-emerald-500">{calculateImageSize().optimizedSize}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1 dark:border-zinc-800">
                      <span>Saved bandwidth:</span>
                      <span className="font-semibold text-cyan-500">{calculateImageSize().compressionRatio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lazy loading:</span>
                      <span className="text-gray-900 dark:text-white uppercase text-[10px] font-bold">
                        {imgLoadingType === 'lazy' ? "✅ Enabled (Zero load cost)" : "⚠️ High priority (LCP Optimized)"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-cyan-50/50 dark:bg-cyan-950/40 rounded border border-cyan-200/50 dark:border-cyan-900/40 text-[10px] text-cyan-700 dark:text-cyan-300 leading-relaxed mt-2">
                  ✨ Next.js handles format conversion automatically on-the-fly depending on browser support matrix.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Q16, Q17: next/link & prefetching sandbox */}
        {([16, 17, 37].includes(questionId)) && (
          <div className="space-y-4">
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              Interactive Viewport Simulator: Scroll to bring links into screen context and watch Next.js compile prefetch queues instantly in background:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-xl h-44 overflow-y-auto p-4 bg-gray-50/50 dark:bg-zinc-950/20 space-y-24 scroll-smooth">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 block mb-1">HEADER SECTION (Viewport start):</span>
                  <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg shadow-xs border text-xs text-gray-600 dark:text-zinc-400">
                    Scroll down to load linked elements...
                  </div>
                </div>

                <div className="p-4 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/50 rounded-lg flex flex-col gap-2">
                  <span className="text-[9px] font-bold text-cyan-600 dark:text-cyan-400">LINK DETECTED: next/link</span>
                  <h6 className="text-xs font-bold text-gray-900 dark:text-white">Read complete case studies page</h6>
                  <button className="self-start px-3 py-1 bg-cyan-600 text-white rounded text-[10px] font-semibold cursor-pointer">
                    Link: /case-studies
                  </button>
                </div>
              </div>

              <div className="p-4 border rounded-xl flex flex-col justify-between bg-white dark:bg-zinc-900">
                <div>
                  <h5 className="text-xs font-bold text-gray-800 dark:text-zinc-300 border-b pb-1.5 mb-2 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    Prefetch status console:
                  </h5>
                  <div className="space-y-2 font-mono text-[11px] text-gray-600 dark:text-zinc-400">
                    <div className="flex justify-between">
                      <span>Link target:</span>
                      <span>/case-studies</span>
                    </div>
                    <div className="flex justify-between">
                      <span>In viewport:</span>
                      <span className="text-emerald-500 font-bold">YES</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prefetched cached:</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 animate-pulse">
                        COMPLETED (0ms load)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 leading-normal mt-3">
                  💡 By downloading route bundles automatically in background, clicking results in sub-second client-side routing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Q18: Middleware Edge Interceptor */}
        {([18, 33].includes(questionId)) && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50/50 dark:bg-zinc-950/20 border rounded-xl space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 block mb-1">VISITOR ROLE & COOKIE STATE:</span>
                  <div className="flex gap-2">
                    {(['guest', 'user', 'admin'] as const).map((role) => (
                      <button
                        key={role}
                        onClick={() => setVisitorRole(role)}
                        className={`flex-1 py-1 rounded text-xs font-semibold cursor-pointer uppercase ${
                          visitorRole === role ? 'bg-cyan-600 text-white' : 'bg-gray-200 dark:bg-zinc-800 text-gray-600'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-gray-400 block mb-1">TARGET PATH REQUEST:</span>
                  <div className="flex gap-2">
                    {['/about', '/dashboard/settings', '/dashboard/admin/logs'].map((path) => (
                      <button
                        key={path}
                        onClick={() => setVisitorPath(path)}
                        className={`flex-1 py-1 px-1.5 rounded text-[10px] font-mono cursor-pointer truncate ${
                          visitorPath === path ? 'bg-cyan-600 text-white' : 'bg-gray-200 dark:bg-zinc-800 text-gray-600'
                        }`}
                      >
                        {path}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={simulateMiddleware}
                  className="w-full py-2 bg-cyan-600 text-white font-semibold rounded-lg text-xs hover:bg-cyan-700 transition-colors cursor-pointer"
                >
                  Intercept with Middleware
                </button>
              </div>

              {/* Intercept Result */}
              <div className="border border-cyan-100 dark:border-cyan-950 rounded-xl bg-white dark:bg-zinc-900 p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 block mb-2">MIDDLEWARE INTERCEPT OUTCOME:</span>
                  {middlewareResult ? (
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-semibold text-gray-400 block">HTTP INTERCEPT ACTION:</span>
                        <p className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                          {middlewareResult.action}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-gray-400 block">FINAL USER DESTINATION:</span>
                        <p className="text-xs font-mono text-gray-800 dark:text-zinc-200">
                          {middlewareResult.target}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-gray-400 block">RESPONSE HEADERS INJECTED:</span>
                        <pre className="text-[10px] font-mono text-gray-500 bg-gray-50 dark:bg-zinc-950 p-2 rounded mt-1 border">
                          {middlewareResult.headers}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">Configure details and execute middle intercept engine...</p>
                  )}
                </div>

                <p className="text-[9px] text-gray-400 mt-2">
                  ⚡ Middleware runs at Edge locations instantly before completing browser routing actions.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Q25: Automatic Static Optimization checker */}
        {questionId === 25 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50/50 dark:bg-zinc-950/20 border rounded-xl space-y-3">
                <span className="text-[10px] font-bold text-gray-400 block pb-1 border-b">PAGE CAPABILITY BOUNDS:</span>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-700 dark:text-zinc-300">Requires getServerSideProps / dynamic API:</span>
                  <input
                    type="checkbox"
                    checked={hasServerProps}
                    onChange={(e) => setHasServerProps(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 accent-indigo-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-700 dark:text-zinc-300">Reads dynamic cookies / headers on-render:</span>
                  <input
                    type="checkbox"
                    checked={hasCookiesAccess}
                    onChange={(e) => setHasCookiesAccess(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 accent-indigo-500"
                  />
                </div>
              </div>

              {/* Build output preview */}
              <div className={`p-4 border rounded-xl flex flex-col justify-between ${getOptimizationBadge().color}`}>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider opacity-80">BUILD OUTPUT COMPILER BADGE:</span>
                  <h4 className="text-sm font-black mt-1 mb-2">
                    {getOptimizationBadge().badge}
                  </h4>
                  <p className="text-xs leading-relaxed opacity-90">
                    {getOptimizationBadge().desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Q29, Q30: Streaming & Suspense Staggered load simulator */}
        {([29, 30].includes(questionId)) && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 dark:text-zinc-400">
                Observe how Suspense lets components render staggered, loading faster items before slow database promises:
              </p>
              <button
                onClick={triggerSuspenseSimulation}
                className="px-3 py-1.5 bg-cyan-600 text-white rounded text-xs font-semibold cursor-pointer hover:bg-cyan-700"
              >
                Start Stream Simulation
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Header Box (Instant) */}
              <div className={`p-4 border rounded-xl relative overflow-hidden transition-all duration-500 ${
                headerLoaded ? 'border-emerald-300 bg-emerald-50/10' : 'border-gray-100 bg-gray-50/10'
              }`}>
                <span className="text-[10px] font-mono text-gray-400 uppercase">Header Component:</span>
                <h5 className="text-xs font-bold text-gray-900 dark:text-white mt-1">E-Commerce Page</h5>
                <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold uppercase block w-fit mt-2">
                  Instant (0ms)
                </span>
              </div>

              {/* Stats Box (Medium) */}
              <div className={`p-4 border rounded-xl relative overflow-hidden transition-all duration-500 ${
                statsLoaded 
                  ? 'border-emerald-300 bg-emerald-50/10' 
                  : suspenseState === 'loading'
                  ? 'border-cyan-300 bg-cyan-50/10 animate-pulse'
                  : 'border-gray-100 bg-gray-50/10'
              }`}>
                <span className="text-[10px] font-mono text-gray-400 uppercase">Product Details:</span>
                {statsLoaded ? (
                  <>
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white mt-1">Shoes - $120</h5>
                    <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold uppercase block w-fit mt-2">
                      Loaded (1.2s)
                    </span>
                  </>
                ) : (
                  <p className="text-[11px] text-gray-400 italic mt-1">Waiting for API...</p>
                )}
              </div>

              {/* Review Box (Slowest) */}
              <div className={`p-4 border rounded-xl relative overflow-hidden transition-all duration-500 ${
                reviewsLoaded 
                  ? 'border-emerald-300 bg-emerald-50/10' 
                  : ['loading', 'staggered'].includes(suspenseState)
                  ? 'border-cyan-300 bg-cyan-50/10 animate-pulse'
                  : 'border-gray-100 bg-gray-50/10'
              }`}>
                <span className="text-[10px] font-mono text-gray-400 uppercase">User Reviews Grid:</span>
                {reviewsLoaded ? (
                  <>
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white mt-1">5★ - Extremely Fast!</h5>
                    <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold uppercase block w-fit mt-2">
                      Loaded (2.8s)
                    </span>
                  </>
                ) : (
                  <p className="text-[11px] text-gray-400 italic mt-1">Waiting for Database...</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Q35: Core Web Vitals Audit Interactive Panel */}
        {questionId === 35 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50/50 dark:bg-zinc-950/20 border rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-gray-400 block pb-1 border-b">PERFORMANCE CHECKLIST:</span>
                <div className="flex items-center justify-between p-1.5 rounded hover:bg-white/50">
                  <span className="text-xs font-medium text-gray-700 dark:text-zinc-300">Compress assets / add 'next/image' (LCP)</span>
                  <input
                    type="checkbox"
                    checked={lcpFixed}
                    onChange={(e) => setLcpFixed(e.target.checked)}
                    className="w-4 h-4 text-cyan-600 rounded cursor-pointer accent-indigo-500"
                  />
                </div>
                <div className="flex items-center justify-between p-1.5 rounded hover:bg-white/50">
                  <span className="text-xs font-medium text-gray-700 dark:text-zinc-300">Declare dimensions/height limits (CLS)</span>
                  <input
                    type="checkbox"
                    checked={clsFixed}
                    onChange={(e) => setClsFixed(e.target.checked)}
                    className="w-4 h-4 text-cyan-600 rounded cursor-pointer accent-indigo-500"
                  />
                </div>
                <div className="flex items-center justify-between p-1.5 rounded hover:bg-white/50">
                  <span className="text-xs font-medium text-gray-700 dark:text-zinc-300">Convert heavy interactive nodes to Server Components (INP)</span>
                  <input
                    type="checkbox"
                    checked={inpFixed}
                    onChange={(e) => setInpFixed(e.target.checked)}
                    className="w-4 h-4 text-cyan-600 rounded cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>

              {/* Lighthouse Gauge mockup */}
              <div className="p-4 border rounded-xl flex flex-col justify-between items-center text-center bg-white dark:bg-zinc-900 relative">
                <span className="text-[10px] font-mono text-gray-400">LIGHTHOUSE AUDIT RATING:</span>
                <div className="relative w-24 h-24 flex items-center justify-center my-2">
                  <div className={`absolute inset-0 rounded-full border-4 ${
                    getVitalsScore() >= 90 
                      ? 'border-emerald-500 text-emerald-500' 
                      : getVitalsScore() >= 70 
                      ? 'border-cyan-500 text-cyan-500' 
                      : 'border-rose-500 text-rose-500'
                  }`} />
                  <span className="text-2xl font-black">{getVitalsScore()}</span>
                </div>
                <span className="text-[10px] text-gray-400">Core Web Vitals optimized successfully!</span>
              </div>
            </div>
          </div>
        )}

        {/* Fallback for all other IDs: General interactive preview container */}
        {!([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 25, 29, 30, 32, 33, 35, 36, 37, 38].includes(questionId)) && (
          <div className="p-6 text-center border border-dashed rounded-xl space-y-3 bg-gray-50/50 dark:bg-zinc-950/20">
            <Layers className="w-8 h-8 text-cyan-400 mx-auto" />
            <h5 className="text-xs font-bold text-gray-800 dark:text-zinc-300">Conceptual visual chart configured for Q#{questionId}</h5>
            <p className="text-xs text-gray-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
              This concept is visual-heavy. Choose the corresponding code or quiz tab on the left study console to test your implementation expertise!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
