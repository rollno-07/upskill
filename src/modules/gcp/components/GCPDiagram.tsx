import React, { useState, useEffect } from 'react';
import { 
  Server, Cpu, Database, Shield, Zap, RefreshCw, Play, CheckCircle, 
  AlertTriangle, Network, ArrowRight, Lock, Key, Settings, Layers, 
  MapPin, Cloud, HelpCircle, Activity, Clock
} from 'lucide-react';
import { DiagramType } from '../types';

interface GCPDiagramProps {
  type: DiagramType;
}

export const GCPDiagram: React.FC<GCPDiagramProps> = ({ type }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  
  // Custom states for diagrams
  // 1. Compute Comparison
  const [selectedCompute, setSelectedCompute] = useState<'gce' | 'gke' | 'run' | 'gcf'>('run');
  // 2. Storage classes calculator
  const [gbAmount, setGbAmount] = useState<number>(500);
  const [daysStored, setDaysStored] = useState<number>(90);
  const [retrievals, setRetrievals] = useState<number>(1); // times per month
  // 3. Spanner vs Cloud SQL
  const [dbType, setDbType] = useState<'sql' | 'spanner'>('spanner');
  // 4. Pub/Sub trigger
  const [publishedMessages, setPublishedMessages] = useState<{ id: string; val: string }[]>([]);
  const [pubSubStep, setPubSubStep] = useState<number>(0);
  // 5. Load Balancer region failover
  const [regionStatus, setRegionStatus] = useState<Record<string, 'healthy' | 'offline'>>({
    'us-east': 'healthy',
    'europe-west': 'healthy',
    'asia-east': 'healthy'
  });
  const [trafficOrigin, setTrafficOrigin] = useState<string>('us');
  const [routingResult, setRoutingResult] = useState<string>('');
  // 6. IAM privilege builder
  const [iamSecurityLevel, setIamSecurityLevel] = useState<'admin' | 'least_privilege'>('least_privilege');
  // 7. CI/CD pipeline step simulation
  const [ciStep, setCiStep] = useState<number>(-1);
  // 8. Cold starts
  const [minInstances, setMinInstances] = useState<number>(0);
  // 9. Quotas
  const [cpuUsage, setCpuUsage] = useState<number>(18);
  // 10. BigQuery perf
  const [bqScanType, setBqScanType] = useState<'row' | 'column'>('column');

  useEffect(() => {
    // Reset simulation on type change
    setIsSimulating(false);
    setActiveStep(0);
    setPublishedMessages([]);
    setPubSubStep(0);
    setCiStep(-1);
  }, [type]);

  const triggerSimulation = () => {
    setIsSimulating(true);
    setActiveStep(1);
    
    if (type === 'pubsub_flow') {
      const msgId = Math.random().toString(36).substring(7).toUpperCase();
      setPublishedMessages(prev => [{ id: msgId, val: `UserSignupEvent_${msgId}` }, ...prev.slice(0, 4)]);
      setPubSubStep(1);
      setTimeout(() => setPubSubStep(2), 1000);
      setTimeout(() => {
        setPubSubStep(3);
        setIsSimulating(false);
      }, 2200);
    } else if (type === 'load_balancer') {
      // Calculate routing
      let targetRegion = 'us-east';
      if (trafficOrigin === 'us') {
        targetRegion = regionStatus['us-east'] === 'healthy' ? 'us-east' : (regionStatus['europe-west'] === 'healthy' ? 'europe-west' : 'asia-east');
      } else if (trafficOrigin === 'eu') {
        targetRegion = regionStatus['europe-west'] === 'healthy' ? 'europe-west' : (regionStatus['us-east'] === 'healthy' ? 'us-east' : 'asia-east');
      } else {
        targetRegion = regionStatus['asia-east'] === 'healthy' ? 'asia-east' : (regionStatus['us-east'] === 'healthy' ? 'us-east' : 'europe-west');
      }
      
      // If all offline
      if (Object.values(regionStatus).every(v => v === 'offline')) {
        setRoutingResult('CRITICAL: 502 Bad Gateway (All Regions Offline)');
      } else {
        setRoutingResult(`Request successfully routed to ${targetRegion.toUpperCase()}`);
      }
      setTimeout(() => setIsSimulating(false), 1500);
    } else if (type === 'ci_cd_pipeline') {
      let current = 0;
      setCiStep(0);
      const interval = setInterval(() => {
        current += 1;
        setCiStep(current);
        if (current >= 4) {
          clearInterval(interval);
          setIsSimulating(false);
        }
      }, 800);
    } else {
      const timer = setTimeout(() => {
        setIsSimulating(false);
        setActiveStep(2);
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  const toggleRegion = (reg: string) => {
    setRegionStatus(prev => ({
      ...prev,
      [reg]: prev[reg] === 'healthy' ? 'offline' : 'healthy'
    }));
  };

  return (
    <div className="w-full bg-zinc-950 border border-zinc-850 rounded-2xl p-6 text-zinc-100 shadow-xl overflow-hidden font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-zinc-850 gap-4">
        <div>
          <h4 className="text-sm font-bold text-sky-400 flex items-center gap-2 uppercase tracking-wider font-display">
            <Layers className="w-4 h-4 text-sky-400" /> Interactive Concept Visualizer
          </h4>
          <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">Click parameters to trigger real-time infrastructure simulations.</p>
        </div>
        
        {/* Simulator controls */}
        {['pubsub_flow', 'load_balancer', 'ci_cd_pipeline'].includes(type) && (
          <button
            onClick={triggerSimulation}
            disabled={isSimulating}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              isSimulating 
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-transparent'
                : 'bg-sky-500 hover:bg-sky-400 text-zinc-950'
            }`}
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Simulating...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" /> Trigger Live Flow
              </>
            )}
          </button>
        )}
      </div>

      {/* RENDER DIAGRAMS DYNAMICALLY */}
      
      {/* 1. RESOURCE HIERARCHY */}
      {type === 'hierarchy' && (
        <div className="space-y-4">
          <div className="relative border-l-2 border-dashed border-sky-800 ml-6 pl-8 space-y-5">
            {/* Org Level */}
            <div className="group relative bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl hover:border-sky-500 transition-all cursor-pointer">
              <div className="absolute -left-[41px] top-4 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-[10px] font-bold text-slate-950">1</div>
              <div className="flex items-center gap-2 text-sky-400 font-medium text-xs uppercase tracking-wide">
                <Shield className="w-3.5 h-3.5 text-sky-400" /> Organization (Root Level)
              </div>
              <p className="text-xs text-slate-300 mt-1">company.com (Cloud Identity Domain)</p>
              <div className="text-[10px] text-slate-500 mt-2 bg-slate-900 px-2 py-0.5 rounded inline-block">
                Inherited Rules: All children inherit global billing & security policies.
              </div>
            </div>

            {/* Folder Level */}
            <div className="group relative bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl hover:border-sky-500 transition-all cursor-pointer">
              <div className="absolute -left-[41px] top-4 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-[10px] font-bold text-slate-950">2</div>
              <div className="flex items-center gap-2 text-teal-400 font-medium text-xs uppercase tracking-wide">
                <Network className="w-3.5 h-3.5 text-teal-400" /> Folders (Department Groups)
              </div>
              <p className="text-xs text-slate-300 mt-1">Engineering / Production / Testing</p>
              <div className="text-[10px] text-slate-500 mt-2 bg-slate-900 px-2 py-0.5 rounded inline-block">
                Policy boundaries: Group related project portfolios cleanly.
              </div>
            </div>

            {/* Project Level */}
            <div className="group relative bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl hover:border-sky-500 transition-all cursor-pointer">
              <div className="absolute -left-[41px] top-4 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-[10px] font-bold text-slate-950">3</div>
              <div className="flex items-center gap-2 text-indigo-400 font-medium text-xs uppercase tracking-wide">
                <Settings className="w-3.5 h-3.5 text-indigo-400" /> Projects (Resource Isolation)
              </div>
              <p className="text-xs text-slate-300 mt-1">prod-ecommerce-app-2026</p>
              <div className="text-[10px] text-slate-500 mt-2 bg-slate-900 px-2 py-0.5 rounded inline-block">
                Billing & Activations: Boundaries for active API integrations.
              </div>
            </div>

            {/* Resource Level */}
            <div className="group relative bg-slate-950/40 border border-slate-900 p-3 rounded-xl hover:border-sky-500 transition-all cursor-pointer">
              <div className="absolute -left-[41px] top-4 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">4</div>
              <div className="flex items-center gap-2 text-amber-400 font-medium text-xs uppercase tracking-wide">
                <Server className="w-3.5 h-3.5 text-amber-400" /> Active Resources (Leaf Nodes)
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">Compute VM</span>
                <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">GCS Bucket</span>
                <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">Cloud SQL DB</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. COMPUTE SERVICES COMPARISON */}
      {type === 'compute_comparison' && (
        <div className="space-y-4">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {(['gce', 'gke', 'run', 'gcf'] as const).map(sys => (
              <button
                key={sys}
                onClick={() => setSelectedCompute(sys)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                  selectedCompute === sys 
                    ? 'bg-sky-500 text-slate-950 font-semibold' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {sys === 'gce' && 'Compute Engine (VMs)'}
                {sys === 'gke' && 'GKE (Kubernetes)'}
                {sys === 'run' && 'Cloud Run (Containers)'}
                {sys === 'gcf' && 'Cloud Functions (FaaS)'}
              </button>
            ))}
          </div>

          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 min-h-[160px] flex flex-col justify-between">
            {selectedCompute === 'gce' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-medium text-sm">
                  <Server className="w-4 h-4" /> Virtual Machine (IaaS) Layout
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 text-center text-xs font-mono font-medium">
                  <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 p-2 rounded">Your Custom Code</div>
                  <div className="bg-amber-500/20 text-amber-300 border border-amber-500/30 p-2 rounded">OS (Ubuntu/Debian)</div>
                  <div className="bg-sky-500/20 text-sky-300 border border-sky-500/30 p-2 rounded">Google Hypervisor</div>
                </div>
                <p className="text-xs text-slate-300">
                  <strong>Control:</strong> Maximum. Full root access, custom drivers, and network layouts. <br />
                  <strong>Management Overhead:</strong> High. You must manually apply security patches, OS updates, and orchestrate autoscaling.
                </p>
              </div>
            )}

            {selectedCompute === 'gke' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-medium text-sm">
                  <Cpu className="w-4 h-4" /> Container Orchestration (GKE) Layout
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono font-medium">
                  <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 p-1.5 rounded col-span-2">App Pod A</div>
                  <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 p-1.5 rounded col-span-2">App Pod B</div>
                  <div className="bg-purple-500/20 text-purple-300 border border-purple-500/30 p-1.5 rounded col-span-4">Kubernetes Node Agent (kubelet)</div>
                  <div className="bg-sky-500/20 text-sky-300 border border-sky-500/30 p-1.5 rounded col-span-4">Shared VM Host pools</div>
                </div>
                <p className="text-xs text-slate-300">
                  <strong>Control:</strong> High. Full Kubernetes API, daemonsets, service meshes, and stateful deployments. <br />
                  <strong>Billing:</strong> Pay for VM instances in Standard, or pay for actual pod requests in Autopilot.
                </p>
              </div>
            )}

            {selectedCompute === 'run' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-medium text-sm">
                  <Zap className="w-4 h-4" /> Serverless Container (Cloud Run)
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono font-medium">
                  <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 p-2 rounded col-span-3">Stateless Container App</div>
                  <div className="bg-sky-500/20 text-sky-300 border border-sky-500/30 p-2 rounded col-span-3">Google Serverless Infrastructure (Knative)</div>
                </div>
                <p className="text-xs text-slate-300">
                  <strong>Scaling:</strong> Direct 0 to N scaling in milliseconds. Zero costs when completely idle. <br />
                  <strong>Portability:</strong> Standard Docker containers can be exported to GKE, AWS, or local runtimes with zero rewrite.
                </p>
              </div>
            )}

            {selectedCompute === 'gcf' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-medium text-sm">
                  <RefreshCw className="w-4 h-4" /> Event-Driven Functions (FaaS)
                </div>
                <div className="grid grid-cols-1 gap-2 text-center text-xs font-mono font-medium">
                  <div className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 p-2 rounded">Function Handler: handleUpload()</div>
                  <div className="bg-sky-500/20 text-sky-300 border border-sky-500/30 p-2 rounded">Serverless Node/Python Sandbox Runtime</div>
                </div>
                <p className="text-xs text-slate-300">
                  <strong>Trigger:</strong> Infrastructure events (GCS uploads, Pub/Sub events, Eventarc triggers). <br />
                  <strong>Use Case:</strong> Lightweight, single-purpose microtasks with zero cluster maintenance.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. GKE AUTOPILOT VS STANDARD */}
      {type === 'gke_autopilot' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/60 text-center">
              <h5 className="text-xs font-bold uppercase text-sky-400 tracking-wide mb-3">GKE Standard Mode</h5>
              <div className="space-y-2 text-[10px] font-mono">
                <div className="bg-slate-900 border border-slate-800 p-1 rounded text-red-400">Node Sizing & OS Updates (You)</div>
                <div className="bg-slate-900 border border-slate-800 p-1 rounded text-red-400">VM Scaling & Cluster Upkeep (You)</div>
                <div className="bg-slate-900 border border-emerald-900 p-1 rounded text-emerald-400">Control Plane (Google)</div>
                <div className="bg-slate-900 border border-slate-800 p-1 rounded text-amber-300">Billing: Pay for total VM capacities</div>
              </div>
            </div>

            <div className="border border-sky-900/50 rounded-xl p-4 bg-sky-950/10 text-center">
              <h5 className="text-xs font-bold uppercase text-teal-400 tracking-wide mb-3">GKE Autopilot Mode</h5>
              <div className="space-y-2 text-[10px] font-mono">
                <div className="bg-slate-900 border border-emerald-900 p-1 rounded text-emerald-400">Node Sizing & OS Updates (Google)</div>
                <div className="bg-slate-900 border border-emerald-900 p-1 rounded text-emerald-400">VM Scaling & Cluster Upkeep (Google)</div>
                <div className="bg-slate-900 border border-emerald-900 p-1 rounded text-emerald-400">Control Plane (Google)</div>
                <div className="bg-slate-900 border border-emerald-900 p-1 rounded text-emerald-400 font-semibold">Billing: Pay ONLY for requested Pods</div>
              </div>
            </div>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
            <p className="text-xs text-slate-300">
              💡 <strong>Interview Pro-Tip:</strong> Under Autopilot, Google provides a SLA-backed Kubernetes cluster pre-hardened with security best practices, eliminating VM node overhead entirely.
            </p>
          </div>
        </div>
      )}

      {/* 4. STORAGE CLASSES CALCULATOR */}
      {type === 'storage_classes' && (
        <div className="space-y-5">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Data Volume: <strong>{gbAmount} GB</strong></span>
                <span>Select to change</span>
              </div>
              <input 
                type="range" min="50" max="10000" step="50" value={gbAmount}
                onChange={(e) => setGbAmount(Number(e.target.value))}
                className="w-full accent-sky-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Access Rate: <strong>{retrievals} times/month</strong></span>
              </div>
              <input 
                type="range" min="0" max="10" step="1" value={retrievals}
                onChange={(e) => setRetrievals(Number(e.target.value))}
                className="w-full accent-sky-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {/* Standard */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="block text-[10px] uppercase tracking-wider text-sky-400 font-medium">Standard</span>
              <span className="block text-sm font-bold text-slate-100 mt-1">
                ${(gbAmount * 0.020 + (retrievals * gbAmount * 0.0)).toFixed(2)}
              </span>
              <span className="text-[9px] text-slate-500 block mt-1">No retrieval cost</span>
            </div>

            {/* Nearline */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="block text-[10px] uppercase tracking-wider text-teal-400 font-medium">Nearline</span>
              <span className="block text-sm font-bold text-slate-100 mt-1">
                ${(gbAmount * 0.010 + (retrievals * gbAmount * 0.01)).toFixed(2)}
              </span>
              <span className="text-[9px] text-slate-500 block mt-1">30-day min storage</span>
            </div>

            {/* Coldline */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="block text-[10px] uppercase tracking-wider text-indigo-400 font-medium">Coldline</span>
              <span className="block text-sm font-bold text-slate-100 mt-1">
                ${(gbAmount * 0.007 + (retrievals * gbAmount * 0.02)).toFixed(2)}
              </span>
              <span className="text-[9px] text-slate-500 block mt-1">90-day min storage</span>
            </div>

            {/* Archive */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="block text-[10px] uppercase tracking-wider text-amber-400 font-medium">Archive</span>
              <span className="block text-sm font-bold text-slate-100 mt-1">
                ${(gbAmount * 0.0012 + (retrievals * gbAmount * 0.05)).toFixed(2)}
              </span>
              <span className="text-[9px] text-slate-500 block mt-1">365-day min storage</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 text-center italic">
            * Estimates simulate typical regional baseline prices. Notice how Archive is cheapest for storing, but expensive if retrieved frequently!
          </p>
        </div>
      )}

      {/* 5. CLOUD SPANNER VS CLOUD SQL */}
      {type === 'spanner_vs_sql' && (
        <div className="space-y-4">
          <div className="flex justify-center gap-4 mb-2">
            <button
              onClick={() => setDbType('sql')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                dbType === 'sql' 
                  ? 'bg-amber-500 text-slate-950' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              Cloud SQL (PostgreSQL/MySQL)
            </button>
            <button
              onClick={() => setDbType('spanner')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                dbType === 'spanner' 
                  ? 'bg-sky-500 text-slate-950' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              Cloud Spanner (Global Relational)
            </button>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 min-h-[170px] flex items-center justify-center">
            {dbType === 'sql' ? (
              <div className="w-full text-center space-y-3">
                <div className="flex justify-center items-center gap-10">
                  {/* Primary Zone A */}
                  <div className="border border-amber-500 p-2 rounded-lg bg-amber-500/10 text-xs">
                    <Database className="w-8 h-8 text-amber-400 mx-auto mb-1 animate-pulse" />
                    <strong>Primary DB</strong>
                    <div className="text-[10px] text-slate-400">Zone us-central1-a</div>
                    <div className="text-[9px] text-emerald-400">Read & Write</div>
                  </div>
                  <div className="text-amber-500 text-xs font-bold animate-pulse">─ Synchronous Rep ─▶</div>
                  {/* Standby Zone B */}
                  <div className="border border-slate-700 p-2 rounded-lg bg-slate-900 text-xs">
                    <Database className="w-8 h-8 text-slate-500 mx-auto mb-1" />
                    <strong>Standby DB</strong>
                    <div className="text-[10px] text-slate-400">Zone us-central1-b</div>
                    <div className="text-[9px] text-slate-400">Failover Only</div>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Relational SQL database. Best for standard apps. Scales vertically for writes. High Availability (HA) switches routing to Standby if primary zone drops.
                </p>
              </div>
            ) : (
              <div className="w-full text-center space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="border border-sky-500 p-2 rounded-lg bg-sky-500/10 text-xs">
                    <Database className="w-6 h-6 text-sky-400 mx-auto mb-1" />
                    <strong>Node US-West</strong>
                    <div className="text-[9px] text-emerald-400">Multi-Write / Read</div>
                  </div>
                  <div className="border border-sky-500 p-2 rounded-lg bg-sky-500/10 text-xs">
                    <Database className="w-6 h-6 text-sky-400 mx-auto mb-1" />
                    <strong>Node US-East</strong>
                    <div className="text-[9px] text-emerald-400">Multi-Write / Read</div>
                  </div>
                  <div className="border border-sky-500 p-2 rounded-lg bg-sky-500/10 text-xs">
                    <Database className="w-6 h-6 text-sky-400 mx-auto mb-1" />
                    <strong>Node EU-West</strong>
                    <div className="text-[9px] text-emerald-400">Multi-Write / Read</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-sky-300 bg-sky-950/40 py-1 px-3 rounded inline-block mx-auto">
                  <Clock className="w-3.5 h-3.5 animate-pulse" /> Synced via Atomic GPS Clocks (TrueTime API)
                </div>
                <p className="text-xs text-slate-400">
                  Globally distributed, horizontally scalable, relational SQL database. Synchronous consistency across continents. Zero database lockups during writes.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. PUB/SUB EVENT DECIPHER */}
      {type === 'pubsub_flow' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className={`p-3 rounded-lg border transition-all ${
              pubSubStep === 1 
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-md scale-105' 
                : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="font-bold">1. Publisher</div>
              <div className="text-[10px] text-slate-400 mt-1">Application API</div>
              <div className="text-[9px] bg-slate-900 px-1 py-0.5 mt-2 rounded inline-block text-slate-400 font-mono">
                Triggered Event
              </div>
            </div>

            <div className={`p-3 rounded-lg border transition-all ${
              pubSubStep === 2 
                ? 'bg-sky-500/20 border-sky-500 text-sky-200 shadow-md scale-105' 
                : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="font-bold">2. Pub/Sub Topic</div>
              <div className="text-[10px] text-slate-400 mt-1">Decoupled Broker</div>
              <div className="text-[9px] bg-slate-900 px-1 py-0.5 mt-2 rounded inline-block text-slate-400 font-mono">
                Duplicate/Replicate
              </div>
            </div>

            <div className={`p-3 rounded-lg border transition-all ${
              pubSubStep === 3 
                ? 'bg-indigo-500/20 border-indigo-500 text-indigo-200 shadow-md scale-105' 
                : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="font-bold">3. Subscriptions</div>
              <div className="text-[10px] text-slate-400 mt-1">Async Receivers</div>
              <div className="text-[9px] bg-slate-900 px-1 py-0.5 mt-2 rounded inline-block text-slate-400 font-mono">
                Workers / Storage
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
            <span className="block text-xs font-semibold text-sky-400 mb-1">Inflight Event Logs:</span>
            <div className="text-[10px] font-mono space-y-1 max-h-[80px] overflow-y-auto">
              {publishedMessages.length === 0 ? (
                <div className="text-slate-500 italic">No published messages yet. Click 'Trigger Live Flow' to send events.</div>
              ) : (
                publishedMessages.map((msg, index) => (
                  <div key={msg.id} className={`flex justify-between p-1 rounded ${index === 0 ? 'bg-sky-950/60 text-sky-300' : 'text-slate-400'}`}>
                    <span>▸ msg_id: {msg.id}</span>
                    <span>payload: {msg.val}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 7. GLOBAL LOAD BALANCER & REGION OUTAGE FAILOVER */}
      {type === 'load_balancer' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
            {/* Origin */}
            <div className="space-y-1.5 w-full sm:w-auto">
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Simulate Request Origin</label>
              <div className="flex gap-1.5">
                {(['us', 'eu', 'asia'] as const).map(orig => (
                  <button
                    key={orig}
                    onClick={() => setTrafficOrigin(orig)}
                    className={`px-3 py-1 rounded text-xs font-bold cursor-pointer uppercase ${
                      trafficOrigin === orig 
                        ? 'bg-sky-500 text-slate-950' 
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {orig}
                  </button>
                ))}
              </div>
            </div>

            {/* Region switchers */}
            <div className="space-y-1 w-full sm:w-auto text-right">
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Click to Toggle Region Outage</label>
              <div className="flex justify-end gap-1.5 flex-wrap">
                {Object.keys(regionStatus).map(reg => (
                  <button
                    key={reg}
                    onClick={() => toggleRegion(reg)}
                    className={`px-2 py-1 rounded text-[10px] font-mono flex items-center gap-1 cursor-pointer border ${
                      regionStatus[reg] === 'healthy' 
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400' 
                        : 'bg-red-950/40 border-red-500 text-red-400'
                    }`}
                  >
                    {reg.toUpperCase()}: {regionStatus[reg].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative border border-slate-800 rounded-xl p-4 bg-slate-950 flex flex-col justify-center items-center text-center min-h-[120px]">
            {isSimulating ? (
              <div className="space-y-2 animate-pulse">
                <RefreshCw className="w-8 h-8 text-sky-400 animate-spin mx-auto" />
                <span className="text-xs text-sky-300 font-mono">Anycast Global IP translating route loops...</span>
              </div>
            ) : (
              <div className="space-y-2">
                <MapPin className="w-8 h-8 text-sky-400 mx-auto" />
                <span className="block text-xs font-bold font-mono text-slate-200">
                  {routingResult || 'Select request origin and click Trigger Live Flow!'}
                </span>
                <span className="text-[10px] text-slate-500 max-w-sm block">
                  Notice how Google Anycast lets traffic instantly pivot to any other survivor region globally with <strong>single-digit millisecond routing swaps</strong>.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. VPC & CLOUD NAT NETWORKS */}
      {type === 'vpc_nat' && (
        <div className="space-y-4">
          <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/80 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-sky-400 font-semibold uppercase font-mono">Global VPC (CIDR: 10.0.0.0/16)</span>
              <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">Software-Defined</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Private Subnet */}
              <div className="border border-indigo-900/40 bg-indigo-950/10 p-3 rounded-lg text-center relative">
                <span className="block text-[10px] text-indigo-400 font-mono uppercase tracking-wider mb-2">Private Subnet (10.0.1.0/24)</span>
                <div className="bg-slate-900 border border-slate-800 p-2 rounded text-[10px] font-mono text-slate-300">
                  <Lock className="w-3.5 h-3.5 text-red-500 mx-auto mb-1" />
                  <strong>Secure App VM</strong>
                  <div className="text-[9px] text-slate-500">Internal IP: 10.0.1.5</div>
                  <div className="text-[9px] text-slate-500">Public IP: NONE</div>
                </div>
                {/* Arrow to NAT */}
                <div className="absolute right-[-15px] top-[50%] bg-indigo-500 text-white rounded-full p-0.5 z-10">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Cloud NAT and Internet Gateway */}
              <div className="border border-slate-800 bg-slate-950 p-3 rounded-lg text-center flex flex-col justify-between">
                <span className="block text-[10px] text-emerald-400 font-mono uppercase tracking-wider mb-2">Cloud NAT & Edge Router</span>
                <div className="bg-slate-900 border border-emerald-900/40 p-2 rounded text-[10px] font-mono text-emerald-400">
                  <Zap className="w-4 h-4 text-emerald-400 mx-auto mb-1 animate-pulse" />
                  <strong>Cloud NAT</strong>
                  <p className="text-[8px] text-slate-400 mt-1">Translates outbound queries, blocks random inbound attacks.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-900/60 p-3 rounded border border-slate-800 text-[11px] text-slate-400 text-center">
            🔒 VMs in the private subnet can trigger <code>apt-get update</code> to pull internet updates safely but remain completely invisible to scanning bots outside the cloud VPC.
          </div>
        </div>
      )}

      {/* 9. IAM LEAST PRIVILEGE AND ATTACK BLAST RADIUS */}
      {type === 'iam_least_privilege' && (
        <div className="space-y-4">
          <div className="flex justify-center gap-4 mb-2">
            <button
              onClick={() => setIamSecurityLevel('admin')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                iamSecurityLevel === 'admin' 
                  ? 'bg-red-500 text-slate-950 font-bold shadow-lg shadow-red-500/20' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              Over-privileged (Owner/Editor)
            </button>
            <button
              onClick={() => setIamSecurityLevel('least_privilege')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                iamSecurityLevel === 'least_privilege' 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              Security Hardened (Least Privilege)
            </button>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 min-h-[170px] flex items-center justify-center">
            {iamSecurityLevel === 'admin' ? (
              <div className="w-full text-center space-y-3">
                <div className="text-xs text-red-400 flex items-center justify-center gap-1.5 font-bold uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-red-400 animate-bounce" /> Danger: Excessive Permissions Blast Radius
                </div>
                <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-3 max-w-sm mx-auto text-[11px] font-mono">
                  <span className="block text-slate-300 font-bold mb-1">Assigned Role: <code>roles/editor</code></span>
                  <p className="text-red-400 text-[10px]">
                    If this service account key is leaked on GitHub, attackers can read databases, modify load balancers, spin up crypto-miners, and delete backups!
                  </p>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 max-w-xs mx-auto overflow-hidden">
                  <div className="bg-red-500 h-full w-full" />
                </div>
                <span className="text-[10px] text-slate-500">Attack Impact Capacity: 100% Critical Damage</span>
              </div>
            ) : (
              <div className="w-full text-center space-y-3">
                <div className="text-xs text-emerald-400 flex items-center justify-center gap-1.5 font-bold uppercase tracking-wide">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Secure: Least Privilege Isolation
                </div>
                <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-3 max-w-sm mx-auto text-[11px] font-mono">
                  <span className="block text-slate-300 font-bold mb-1">Assigned Role: <code>roles/logging.logWriter</code></span>
                  <p className="text-emerald-400 text-[10px]">
                    Leaking this credential allows the attacker ONLY to write logs. They cannot delete databases, view users, or configure active servers.
                  </p>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 max-w-xs mx-auto overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[10%]" />
                </div>
                <span className="text-[10px] text-slate-500">Attack Impact Capacity: 5% Negligible Damage</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 10. CI/CD PIPELINE FLOW CHART */}
      {type === 'ci_cd_pipeline' && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
            {/* Step 1 */}
            <div className={`p-2.5 rounded-lg border transition-all ${
              ciStep >= 0 
                ? (ciStep === 0 ? 'bg-sky-500/20 border-sky-400 text-sky-200' : 'bg-emerald-950 border-emerald-500 text-emerald-300') 
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div className="font-bold">1. Git Push</div>
              <div className="mt-1">Webhook fired</div>
            </div>

            {/* Step 2 */}
            <div className={`p-2.5 rounded-lg border transition-all ${
              ciStep >= 1 
                ? (ciStep === 1 ? 'bg-sky-500/20 border-sky-400 text-sky-200' : 'bg-emerald-950 border-emerald-500 text-emerald-300') 
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div className="font-bold">2. Cloud Build</div>
              <div className="mt-1">NPM tests compile</div>
            </div>

            {/* Step 3 */}
            <div className={`p-2.5 rounded-lg border transition-all ${
              ciStep >= 2 
                ? (ciStep === 2 ? 'bg-sky-500/20 border-sky-400 text-sky-200' : 'bg-emerald-950 border-emerald-500 text-emerald-300') 
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div className="font-bold">3. Push Registry</div>
              <div className="mt-1">Docker image secure</div>
            </div>

            {/* Step 4 */}
            <div className={`p-2.5 rounded-lg border transition-all ${
              ciStep >= 3 
                ? 'bg-emerald-950 border-emerald-500 text-emerald-300 animate-pulse' 
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div className="font-bold">4. Cloud Run</div>
              <div className="mt-1">API Live v2</div>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-center min-h-[50px] flex items-center justify-center">
            {ciStep === -1 && <span className="text-xs text-slate-500 italic">Click 'Trigger Live Flow' to execute test deployment build.</span>}
            {ciStep === 0 && <span className="text-xs text-sky-300 font-mono">▸ Receiving repository webhook trigger... OK</span>}
            {ciStep === 1 && <span className="text-xs text-sky-300 font-mono">▸ Executing task: npm test & linting checks... OK</span>}
            {ciStep === 2 && <span className="text-xs text-sky-300 font-mono">▸ Docker build complete; pushing layers to Artifact Registry... OK</span>}
            {ciStep === 3 && <span className="text-xs text-emerald-400 font-mono">▸ SUCCESS: Revisions swapped. 100% requests routed to Cloud Run active containers! 🎉</span>}
          </div>
        </div>
      )}

      {/* 11. DNS FLOW */}
      {type === 'dns_flow' && (
        <div className="space-y-4 text-center">
          <div className="flex justify-center items-center gap-4 text-xs font-mono">
            <div className="border border-slate-800 p-2 rounded bg-slate-950">
              <Cloud className="w-6 h-6 text-sky-400 mx-auto mb-1" />
              <strong>User Browser</strong>
              <div className="text-[9px] text-slate-500">Querying custom-domain.com</div>
            </div>
            <div className="text-sky-400">──▶</div>
            <div className="border border-sky-500 p-2 rounded bg-sky-500/10">
              <Network className="w-6 h-6 text-sky-400 mx-auto mb-1" />
              <strong>Cloud DNS Resolver</strong>
              <div className="text-[9px] text-emerald-400">100% SLA uptime response</div>
            </div>
            <div className="text-sky-400">──▶</div>
            <div className="border border-slate-800 p-2 rounded bg-slate-950">
              <Server className="w-6 h-6 text-slate-400 mx-auto mb-1" />
              <strong>Global Load Balancer IP</strong>
              <div className="text-[9px] text-slate-500">34.120.55.99</div>
            </div>
          </div>
          <p className="text-xs text-slate-400 italic">
            GCP's Anycast DNS ensures domain lookups route through the geographically closest Google physical node for ultra-low resolver latency.
          </p>
        </div>
      )}

      {/* 12. MONITORING LOGGING */}
      {type === 'monitoring_logging' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-slate-800 rounded-xl p-3 bg-slate-950 text-xs font-mono">
              <span className="block text-sky-400 font-bold mb-1">Metrics Dashboard (Monitoring)</span>
              <div className="h-20 bg-slate-900 rounded p-1 flex items-end justify-between gap-1">
                <div className="bg-sky-500 h-[20%] w-full rounded-t" />
                <div className="bg-sky-500 h-[35%] w-full rounded-t" />
                <div className="bg-sky-500 h-[10%] w-full rounded-t" />
                <div className="bg-sky-500 h-[60%] w-full rounded-t animate-pulse" />
                <div className="bg-red-500 h-[95%] w-full rounded-t animate-pulse" />
              </div>
              <span className="block text-[8px] text-red-400 mt-2 text-center font-bold">⚠️ CPU Usage spiked above 85% threshold!</span>
            </div>

            <div className="border border-slate-800 rounded-xl p-3 bg-slate-950 text-xs font-mono">
              <span className="block text-teal-400 font-bold mb-1">Logs Explorer (Logging)</span>
              <div className="h-20 bg-slate-900 rounded p-1 text-[8px] text-slate-400 overflow-y-auto space-y-1">
                <div>[11:05:03] INFO: Ingress request matched /api/v1/checkout</div>
                <div className="text-emerald-400">[11:05:04] SUCCESS: Stripe token verified</div>
                <div className="text-red-400 font-bold">[11:05:04] EXCEPTION: DB timeout retrying (Attempt 1)</div>
                <div>[11:05:05] INFO: Server flushing logs to Cloud Storage</div>
              </div>
              <span className="block text-[8px] text-slate-500 mt-2 text-center">Standard out logs auto-collected.</span>
            </div>
          </div>
        </div>
      )}

      {/* 13. COLD STARTS */}
      {type === 'cold_start' && (
        <div className="space-y-4">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-3">
            <div className="flex justify-between text-xs">
              <span>Warm Instance Pool Config:</span>
              <span className="text-sky-400 font-bold font-mono">--min-instances={minInstances}</span>
            </div>
            <div className="flex gap-2 justify-center">
              <button 
                onClick={() => setMinInstances(0)}
                className={`px-3 py-1 text-xs rounded cursor-pointer ${minInstances === 0 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800'}`}
              >
                0 (Zero Cost Idle)
              </button>
              <button 
                onClick={() => setMinInstances(1)}
                className={`px-3 py-1 text-xs rounded cursor-pointer ${minInstances === 1 ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800'}`}
              >
                1+ (Warmed Baseline)
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs space-y-2">
            {minInstances === 0 ? (
              <div className="space-y-1">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 animate-pulse" /> Cold Boot Scenario (No active warm containers)
                </span>
                <p className="text-slate-300 text-[11px]">
                  First incoming request incurs <strong>1200ms latency</strong> while GCP allocates VMs, pulls container images, and starts Node/Python servers. Cost while idle: <strong>$0.00</strong>
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Warmed Response (Active replica running)
                </span>
                <p className="text-slate-300 text-[11px]">
                  All baseline requests are answered in <strong>15ms</strong>. Zero startup delay. Cost: paying for continuous minimal VM memory reservation.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 14. SECRET MANAGER */}
      {type === 'secret_manager' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="space-y-1">
              <span className="block text-xs text-slate-400">Secure Vault Storage</span>
              <span className="text-sky-400 text-sm font-bold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Secret Manager
              </span>
            </div>
            <div className="text-xs bg-slate-900 border border-slate-800 px-3 py-1 rounded font-mono text-slate-400">
              AES-256 Encrypted
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-center p-2 bg-slate-950/40 rounded border border-slate-900">
            <div className="p-1 text-[10px]">Cloud Run requesting DB_PASS</div>
            <div className="text-sky-400">──▶ [IAM Verified Token] ──▶</div>
            <div className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">Secret Injected to RAM</div>
          </div>
        </div>
      )}

      {/* 15. CDN CACHE */}
      {type === 'cdn_cache' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-center">
              <span className="block text-amber-400 font-bold">CACHE MISS</span>
              <p className="text-[10px] text-slate-400 mt-1">Request travels all the way to primary DB region.</p>
              <div className="mt-2 text-sm font-bold text-red-400">Latency: 280ms</div>
            </div>

            <div className="bg-sky-950/40 border border-sky-500 p-3 rounded-lg text-center">
              <span className="block text-sky-400 font-bold">CACHE HIT (Cloud CDN)</span>
              <p className="text-[10px] text-sky-300 mt-1">Request answered directly at Google Edge Point of Presence.</p>
              <div className="mt-2 text-sm font-bold text-emerald-400">Latency: 12ms</div>
            </div>
          </div>
        </div>
      )}

      {/* 16. FIREBASE ARCHITECTURE */}
      {type === 'firebase_arch' && (
        <div className="space-y-4 text-center">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-950 p-2 rounded border border-slate-800 text-[10px]">
              <div className="font-bold text-amber-400">Firebase Hosting</div>
              <span className="text-slate-500">Serves compiled React frontend</span>
            </div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800 text-[10px]">
              <div className="font-bold text-teal-400">Firebase Auth</div>
              <span className="text-slate-500">Secures user login sessions</span>
            </div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800 text-[10px]">
              <div className="font-bold text-indigo-400">Firestore (NoSQL)</div>
              <span className="text-slate-500">Real-time sync of data states</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 italic">
            Startups choose Firebase for maximum speed of execution. It wraps robust underlying GCP databases inside clean, frontend-ready Web SDKs.
          </p>
        </div>
      )}

      {/* 17. SPOT VM */}
      {type === 'spot_vm' && (
        <div className="space-y-4 text-center">
          <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl space-y-3">
            <span className="block text-xs font-bold text-emerald-400">Highly Discounted Rates (Up to 90% cheaper)</span>
            <div className="flex justify-around items-center text-xs font-mono">
              <div className="p-2 border border-slate-800 rounded bg-slate-900">
                <div>Standard VM</div>
                <div className="text-slate-400 mt-1 font-bold">$45/month</div>
              </div>
              <div className="text-slate-500 font-bold">vs</div>
              <div className="p-2 border border-emerald-500 bg-emerald-950/20 rounded">
                <div>Spot VM</div>
                <div className="text-emerald-400 mt-1 font-bold">$4.50/month</div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400">
              ⚠️ <strong>Preemption Rule:</strong> GCP can shut down your Spot VM with a 30-second warning if physical data centers need capacity for standard full-price tenants. Excellent for offline batch scripting and compilation runners!
            </p>
          </div>
        </div>
      )}

      {/* 18. QUOTAS */}
      {type === 'quota_limit' && (
        <div className="space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between text-xs font-mono">
              <span>Active Project CPU Limit:</span>
              <span className="font-bold text-sky-400">{cpuUsage} / 24 vCPUs allocated</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${cpuUsage > 20 ? 'bg-red-500 animate-pulse' : 'bg-sky-400'}`} 
                style={{ width: `${(cpuUsage / 24) * 100}%` }}
              />
            </div>
            <div className="flex justify-center gap-2">
              <button 
                onClick={() => setCpuUsage(prev => Math.max(4, prev - 4))}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px] font-bold cursor-pointer"
              >
                Delete unused VM (-4 vCPUs)
              </button>
              <button 
                onClick={() => setCpuUsage(prev => Math.min(24, prev + 4))}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px] font-bold cursor-pointer"
              >
                Spin up Kubernetes Pod (+4 vCPUs)
              </button>
            </div>
            {cpuUsage === 24 && (
              <div className="text-[10px] text-red-400 font-bold text-center animate-pulse">
                ❌ LIMIT HIT: New virtual machine creation requests will fail with QUOTA_EXCEEDED!
              </div>
            )}
          </div>
        </div>
      )}

      {/* 19. WORKLOAD IDENTITY */}
      {type === 'workload_identity' && (
        <div className="space-y-4 text-center">
          <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl space-y-3">
            <span className="block text-xs font-bold text-sky-400">Workload Identity Federation Flow</span>
            <div className="flex justify-between items-center text-[10px] font-mono">
              <div className="border border-slate-800 p-2 rounded bg-slate-900 w-[28%]">
                <div>GitHub Runner</div>
                <div className="text-slate-500 mt-1">OIDC Assertion</div>
              </div>
              <div className="text-sky-500">──▶</div>
              <div className="border border-sky-500 p-2 rounded bg-sky-950/40 w-[38%]">
                <div>GCP Security Token</div>
                <div className="text-emerald-400 mt-1 font-bold">Dynamic Swap</div>
              </div>
              <div className="text-sky-500">──▶</div>
              <div className="border border-slate-800 p-2 rounded bg-slate-900 w-[28%]">
                <div>GCS Deploy</div>
                <div className="text-slate-500 mt-1">1-Hour Token</div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400">
              No downloaded key files means zero keys stored inside GitHub settings, completely protecting pipelines from leaked credentials!
            </p>
          </div>
        </div>
      )}

      {/* 20. CLOUD INTERCONNECT */}
      {type === 'interconnect' && (
        <div className="space-y-4">
          <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl text-xs space-y-2">
            <div className="flex justify-between items-center font-mono text-[10px]">
              <span className="text-amber-400 font-bold">Enterprise HQ Data Center</span>
              <span className="text-slate-500">─[ Dedicated Physical Cross-Connect Fiber ]─</span>
              <span className="text-sky-400 font-bold">Google Edge Facility</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Direct physical cables delivering up to <strong>100 Gbps bandwidth</strong> completely bypassing the public web. Ideal for extreme data syncing and secure finance migrations.
            </p>
          </div>
        </div>
      )}

      {/* 21. COLUMNAR VS ROW BASED SCANS */}
      {type === 'bigquery_perf' && (
        <div className="space-y-4">
          <div className="flex justify-center gap-4 mb-2">
            <button
              onClick={() => setBqScanType('row')}
              className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-all ${
                bqScanType === 'row' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800'
              }`}
            >
              Row-based database (MySQL)
            </button>
            <button
              onClick={() => setBqScanType('column')}
              className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-all ${
                bqScanType === 'column' ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-800'
              }`}
            >
              Columnar database (BigQuery)
            </button>
          </div>

          <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl text-xs min-h-[120px] flex items-center justify-center">
            {bqScanType === 'row' ? (
              <div className="text-center space-y-2">
                <span className="text-amber-400 font-bold font-mono">Row Scan Layout</span>
                <p className="text-[11px] text-slate-300">
                  Querying 'SELECT SUM(salary)' scans every single column of every record (ID, Name, Date, Salary, Address, Role) physically off the disks, causing major I/O slowdowns on large data.
                </p>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <span className="text-sky-400 font-bold font-mono">Capacitor Columnar Scan</span>
                <p className="text-[11px] text-slate-300">
                  Querying 'SELECT SUM(salary)' scans ONLY the physical column containing salary numbers. BigQuery completely ignores all other columns on disk, saving 95% of scanned volume fees!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DEFAULT PLACEHOLDER */}
      {type === 'default' && (
        <div className="text-center py-6 space-y-3">
          <Cloud className="w-12 h-12 text-slate-600 mx-auto animate-pulse" />
          <span className="block text-xs text-slate-400 uppercase tracking-wider">Unified Cloud Deployment Node</span>
          <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
            This core architectural block represents Google's unified container networking mesh, resolving routing tables dynamically across private fibers.
          </p>
        </div>
      )}
    </div>
  );
};
