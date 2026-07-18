import React, { useState, useEffect } from "react";
import { RefreshCw, Play, Shield, Globe, Eye, EyeOff } from "lucide-react";

// ==========================================
// SIMULATOR 25: Client Caching (React Query / SWR)
// ==========================================
export function SimulatorClientCaching() {
  const [cacheState, setCacheState] = useState<"Empty" | "Fresh" | "Stale">("Empty");
  const [logs, setLogs] = useState<string[]>([]);
  const [secondsRemaining, setSecondsRemaining] = useState(5);

  useEffect(() => {
    if (cacheState !== "Fresh") return;

    if (secondsRemaining > 0) {
      const timer = setTimeout(() => setSecondsRemaining(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCacheState("Stale");
      setLogs(prev => ["✓ Cache transitioned to 'Stale' state. Next fetch will serve stale value instantly, then revalidate in background.", ...prev]);
    }
  }, [secondsRemaining, cacheState]);

  const handleFetch = () => {
    setLogs([]);
    if (cacheState === "Empty") {
      setLogs(prev => ["Cache MISS! Fetching from Server API...", "✓ Server returned Users payload.", "Populated cache key ['users'] (TTL: 5s).", ...prev]);
      setCacheState("Fresh");
      setSecondsRemaining(5);
    } else if (cacheState === "Fresh") {
      setLogs(prev => ["✓ Cache HIT (Fresh state)! Serving Users payload instantly in 0ms (no server network call).", ...prev]);
    } else {
      setLogs(prev => [
        "✓ Cache HIT (Stale state)! Rendering old data instantly (0ms) to ensure smooth user experience.",
        "Revalidating in background...",
        "✓ Server returned fresh Users payload (background update completed).",
        "Cache key ['users'] refreshed (TTL: 5s).",
        ...prev
      ]);
      setCacheState("Fresh");
      setSecondsRemaining(5);
    }
  };

  const handleClear = () => {
    setCacheState("Empty");
    setLogs([]);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Toggle selectors */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5 text-emerald-400" /> Cache States</h5>

          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between">
              <span>Cache State</span>
              <span className={`font-bold ${cacheState === "Fresh" ? "text-emerald-400" : cacheState === "Stale" ? "text-cyan-400" : "text-slate-500"}`}>{cacheState}</span>
            </div>
            {cacheState === "Fresh" && (
              <div className="text-[10px] text-slate-400">Becomes stale in {secondsRemaining}s</div>
            )}
          </div>

          <div className="flex gap-2">
            <button onClick={handleFetch} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-3 rounded text-xs cursor-pointer">
              Fetch Users
            </button>
            <button onClick={handleClear} className="border border-slate-800 hover:text-white px-2 py-1.5 rounded text-xs">Clear</button>
          </div>
        </div>

        {/* Network panel */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 mb-2">Query Cache Console</div>

          <div className="bg-slate-900 p-2.5 rounded font-mono text-xs text-slate-300 h-24 overflow-y-auto space-y-1">
            {logs.length > 0 ? (
              logs.slice(0, 4).map((log, idx) => (
                <div key={idx} className={log.includes("MISS") ? "text-red-400" : log.includes("HIT") ? "text-emerald-400" : "text-slate-400"}>
                  &gt; {log}
                </div>
              ))
            ) : (
              <span className="text-slate-500">Click Fetch Users to see client cache key states...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 26: SSR vs CSR vs SSG Performance Race
// ==========================================
export function SimulatorPerformanceRace() {
  const [running, setRunning] = useState(false);
  const [ssgProgress, setSsgProgress] = useState(0);
  const [ssrProgress, setSsrProgress] = useState(0);
  const [csrProgress, setCsrProgress] = useState(0);

  const startRace = () => {
    setRunning(true);
    setSsgProgress(0);
    setSsrProgress(0);
    setCsrProgress(0);

    // SSG wins instantly (static assets at CDN edge)
    setTimeout(() => setSsgProgress(100), 100);

    // SSR parses and renders HTML on server, then loads and hydrates
    setTimeout(() => setSsrProgress(50), 400); // Server compiles HTML
    setTimeout(() => setSsrProgress(100), 1200); // Hydration completes (Interactive)

    // CSR is blank, downloads bundle, queries API, then renders
    setTimeout(() => setCsrProgress(20), 500); // Bare HTML shell downloads
    setTimeout(() => setCsrProgress(60), 1400); // Bundle fetched, queries API
    setTimeout(() => setCsrProgress(100), 2200); // Fully Interactive (TTI)
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Run control */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5"><Play className="w-3.5 h-3.5 text-cyan-400" /> Performance Race</h5>
          <button onClick={startRace} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded text-xs cursor-pointer shadow-lg shadow-cyan-500/10">
            Trigger Page Load
          </button>
          <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 text-[11px] text-slate-400 leading-normal">
            💡 SSG reaches interactive state immediately. SSR serves viewable HTML fast but delays interaction (TTI). CSR delays first paint completely.
          </div>
        </div>

        {/* Tracks progress */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3 flex flex-col justify-around">
          <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 mb-1">Time To Interactive (TTI) Race track</div>

          {/* SSG */}
          <div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span>Static Site (SSG)</span>
              <span>{ssgProgress === 100 ? "Interactive (15ms)" : "Loading..."}</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${ssgProgress}%` }}></div>
            </div>
          </div>

          {/* SSR */}
          <div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span>Server-Rendered (SSR)</span>
              <span>{ssrProgress === 100 ? "Interactive (1.2s)" : ssrProgress === 50 ? "FCP: HTML ready" : "Loading..."}</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${ssrProgress}%` }}></div>
            </div>
          </div>

          {/* CSR */}
          <div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span>Client-Rendered (CSR)</span>
              <span>{csrProgress === 100 ? "Interactive (2.2s)" : "Loading..."}</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className="h-full bg-cyan-500 transition-all duration-700" style={{ width: `${csrProgress}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 27: Feature Flag consistent hashing rollouts
// ==========================================
export function SimulatorFeatureFlags() {
  const [rolloutPercentage, setRolloutPercentage] = useState(25);
  const [userVariants, setUserVariants] = useState<Array<{ id: string; active: boolean }>>([]);

  const handleGenerateUsers = () => {
    const list = Array.from({ length: 4 }).map((_, idx) => {
      const uId = `User_${Math.round(Math.random() * 9000 + 1000)}`;
      // Deterministic bucketer
      let hash = 0;
      for (let i = 0; i < uId.length; i++) {
        hash = uId.charCodeAt(i) + ((hash << 5) - hash);
      }
      const bucket = Math.abs(hash) % 100;
      return { id: uId, active: bucket < rolloutPercentage };
    });
    setUserVariants(list);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Controls */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Rollout Slider</h5>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400 font-semibold mb-1">
              <span>Rollout Ratio</span>
              <span className="text-cyan-400 font-mono">{rolloutPercentage}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={rolloutPercentage}
              onChange={(e) => setRolloutPercentage(Number(e.target.value))}
              className="w-full accent-cyan-500 h-1 bg-slate-800 rounded"
            />
          </div>

          <button onClick={handleGenerateUsers} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded text-xs cursor-pointer">
            Generate 4 Test Users
          </button>
        </div>

        {/* Variations distribution list */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 mb-2">A/B Traffic bucket partitions</div>

          <div className="grid grid-cols-2 gap-2 text-xs text-center my-2">
            {userVariants.length > 0 ? (
              userVariants.map((u, idx) => (
                <div key={idx} className={`p-2.5 rounded border ${u.active ? "border-emerald-500 bg-emerald-950/10 text-emerald-400" : "border-slate-800 text-slate-400"}`}>
                  <div className="font-bold">{u.id}</div>
                  <div className="text-[10px] mt-0.5">{u.active ? "Variant A: Red CTA Button" : "Variant B: Control Button"}</div>
                </div>
              ))
            ) : (
              <p className="col-span-2 text-xs text-slate-500 italic py-5">Click Generate to bucket sample users using hash modulos...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 28: Payment Gateway Idempotency
// ==========================================
export function SimulatorIdempotency() {
  const [useIdempotency, setUseIdempotency] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [charges, setCharges] = useState(0);

  const handlePay = () => {
    setLogs([]);
    setLogs(prev => [...prev, "Connection Timeout simulation. Dispatching POST /api/payment..."]);

    setTimeout(() => {
      if (useIdempotency) {
        setLogs(prev => [
          ...prev,
          "✓ Client attached header: [Idempotency-Key: UUID_5210]",
          "Server processed and written original charge to DB.",
          "✓ Success: Client billed $50 once. Duplicate request rejected by server-side Redis lock."
        ]);
        setCharges(1);
      } else {
        setLogs(prev => [
          ...prev,
          "✗ No Idempotency key found in headers.",
          "Server processed second transaction, registering as fresh request.",
          "⚠️ Double Charge Warning: Client account billed $50 twice! Total: $100."
        ]);
        setCharges(2);
      }
    }, 1200);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Toggle option */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-cyan-400" /> Idempotent Gate</h5>

          <div className="space-y-2">
            <label className="flex items-center justify-between cursor-pointer bg-slate-900 p-2.5 rounded border border-slate-800">
              <span className="text-xs font-medium text-slate-300">Send Idempotency-Key</span>
              <input
                type="checkbox"
                checked={useIdempotency}
                onChange={() => setUseIdempotency(!useIdempotency)}
                className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
              />
            </label>
          </div>

          <button onClick={handlePay} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded text-xs cursor-pointer shadow-lg">
            Simulate Click "Pay $50"
          </button>
        </div>

        {/* Database log */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2 text-xs">
            <span className="font-bold text-slate-200">Account Charges Log</span>
            <span className="text-[10px] text-slate-400">Total Charged: <span className={charges > 1 ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>${charges * 50}</span></span>
          </div>

          <div className="bg-slate-900 p-2.5 rounded font-mono text-xs text-slate-300 h-24 overflow-y-auto space-y-1">
            {logs.length > 0 ? (
              logs.map((log, idx) => (
                <div key={idx} className={log.includes("Warning") ? "text-red-400 font-bold" : log.includes("✓") ? "text-emerald-400" : "text-slate-400"}>
                  &gt; {log}
                </div>
              ))
            ) : (
              <span className="text-slate-500">Trigger simulated payment to test double charges...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 29: Double Submission Block
// ==========================================
export function SimulatorDoubleSubmission() {
  const [disabledMode, setDisabledMode] = useState(true);
  const [clicks, setClicks] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSub = () => {
    if (disabledMode) {
      setLoading(true);
      setClicks(prev => prev + 1);
      setTimeout(() => setLoading(false), 2000);
    } else {
      setClicks(prev => prev + 1);
    }
  };

  const clear = () => {
    setClicks(0);
    setLoading(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Toggle options */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Button Lockout Protection</h5>

          <div className="space-y-2">
            <label className="flex items-center justify-between cursor-pointer bg-slate-900 p-2.5 rounded border border-slate-800">
              <span className="text-xs font-medium text-slate-300">Client-side Disable Button</span>
              <input
                type="checkbox"
                checked={disabledMode}
                onChange={() => setDisabledMode(!disabledMode)}
                className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
              />
            </label>
          </div>

          <div className="bg-slate-900/60 p-2 rounded border border-slate-800 text-[11px] text-slate-400">
            {disabledMode ? "Button disables instantly on click to lock out concurrent double-submissions." : "Button remains clickable, allowing multiple rapid requests."}
          </div>
        </div>

        {/* Execution visualization */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2 text-xs">
            <span className="font-bold text-slate-200">Rapid Double-Click Test Card</span>
            <button onClick={clear} className="text-[10px] text-slate-400 underline">Reset count</button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center my-4 gap-3">
            <button
              onClick={handleSub}
              disabled={disabledMode && loading}
              className={`font-bold py-2.5 px-6 rounded text-xs cursor-pointer shadow-lg ${
                disabledMode && loading
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-500 text-white"
              }`}
            >
              {disabledMode && loading ? "Processing purchase..." : "Submit Checkout Order"}
            </button>
            <p className="text-[11px] font-mono text-slate-400">
              Submissions registered by server API: <span className={`font-bold ${clicks > 1 ? "text-red-400 font-bold" : "text-emerald-400"}`}>{clicks}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATOR 30: Accessibility & i18n Layout
// ==========================================
export function SimulatorAccessibility() {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [screenReaderActive, setScreenReaderActive] = useState(false);

  const strings = {
    en: {
      title: "Welcome Candidate",
      desc: "This design token card demonstrates RTL layouts, ARIA compliance labels, and accessible focus outlines.",
      btn: "Accept Offer"
    },
    ar: {
      title: "أهلاً بك يا مرشح",
      desc: "توضح بطاقة رمز التصميم هذه تخطيطات RTL، وعلامات توافق ARIA، ومخططات تركيز يمكن الوصول إليها.",
      btn: "قبول العرض"
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 p-5 rounded-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Toggle options */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-cyan-400" /> Accessible i18n</h5>

          <div>
            <label className="text-xs text-slate-400 block font-semibold mb-2">Toggle Locale (LTR vs RTL)</label>
            <div className="flex gap-2">
              <button
                onClick={() => setLocale("en")}
                className={`flex-1 py-1 rounded text-xs font-semibold ${locale === "en" ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-400"}`}
              >
                English (LTR)
              </button>
              <button
                onClick={() => setLocale("ar")}
                className={`flex-1 py-1 rounded text-xs font-semibold ${locale === "ar" ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-400"}`}
              >
                Arabic (RTL)
              </button>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3">
            <button
              onClick={() => setScreenReaderActive(!screenReaderActive)}
              className="w-full bg-slate-800 hover:text-white py-1.5 rounded text-xs font-bold"
            >
              {screenReaderActive ? "🔊 Disable Narrator Overlay" : "🔇 Enable Narrator Overlay"}
            </button>
          </div>
        </div>

        {/* Display card */}
        <div className="md:col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 mb-2">Accessibility Sandbox</div>

          <div className="flex-1 flex flex-col items-center justify-center my-3 relative">
            {screenReaderActive && (
              <div className="absolute top-1 left-1 right-1 bg-cyan-950 border border-cyan-500/30 text-cyan-300 p-2 rounded text-[10px] font-mono">
                🗣️ Screen Reader: "Heading 2: {strings[locale].title}. Paragraph: {strings[locale].desc}. Button: {strings[locale].btn}."
              </div>
            )}

            <div
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="bg-slate-900 border border-slate-800 p-4 rounded-lg max-w-sm w-full text-xs space-y-3 mt-6"
            >
              <h4 className="font-bold text-slate-100 text-sm font-display">{strings[locale].title}</h4>
              <p className="text-slate-400 leading-relaxed">{strings[locale].desc}</p>
              <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-1.5 px-4 rounded text-xs focus:outline-2 focus:outline-offset-2 focus:outline-cyan-500">
                {strings[locale].btn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
