import { useState, useEffect } from 'react';
import { 
  Play, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Cpu, 
  HardDrive, 
  Activity, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  Sliders, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  Server,
  Network,
  GitBranch,
  ShieldAlert,
  Zap,
  Gauge
} from 'lucide-react';

export default function Playground({ initialType = 'pipeline' }: { initialType?: string }) {
  const [activeTab, setActiveTab] = useState<string>(initialType);

  useEffect(() => {
    setActiveTab(initialType);
  }, [initialType]);

  const tabs = [
    { id: 'pipeline', label: 'CI/CD Pipeline', icon: Play },
    { id: 'container-vs-vm', label: 'Container vs VM', icon: Cpu },
    { id: 'k8s-pod', label: 'K8s Self-Healing', icon: Server },
    { id: 'blue-green', label: 'Blue-Green & Canary', icon: RefreshCw },
    { id: 'branching', label: 'Branching Workflows', icon: GitBranch },
    { id: 'error-budget', label: 'Error Budget SLO', icon: Gauge },
    { id: 'testing-pyramid', label: 'Testing Pyramid', icon: Layers },
    { id: 'chaos-monkey', label: 'Chaos Monkey', icon: ShieldAlert },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl h-full flex flex-col" id="devops-playground">
      {/* Tab bar */}
      <div className="bg-slate-950 border-b border-slate-800 p-2 flex flex-wrap gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Simulator Content Area */}
      <div className="flex-1 p-4 overflow-y-auto" id="playground-content-container">
        {activeTab === 'pipeline' && <PipelineSimulator />}
        {activeTab === 'container-vs-vm' && <ContainerVmSimulator />}
        {activeTab === 'k8s-pod' && <K8sPodSimulator />}
        {activeTab === 'blue-green' && <BlueGreenCanarySimulator />}
        {activeTab === 'branching' && <BranchingSimulator />}
        {activeTab === 'error-budget' && <ErrorBudgetSimulator />}
        {activeTab === 'testing-pyramid' && <TestingPyramidSimulator />}
        {activeTab === 'chaos-monkey' && <ChaosMonkeySimulator />}
      </div>
    </div>
  );
}

/* ============================================================================
   1. CI/CD BUILD PIPELINE SIMULATOR
   ============================================================================ */
function PipelineSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [failStaging, setFailStaging] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [logs, setLogs] = useState<string[]>(['[SYSTEM] Pipeline idle. Ready for commit trigger.']);
  const [progress, setProgress] = useState(0);

  const steps = [
    { label: 'Code Lint', cmd: 'npm run lint', desc: 'Analyzing code formatting & rules' },
    { label: 'Unit Tests', cmd: 'npm run test:unit', desc: 'Executing 450 isolated function tests' },
    { label: 'Docker Build', cmd: 'docker build -t app:latest .', desc: 'Compiling layers into immutable image' },
    { label: 'Push Registry', cmd: 'docker push registry/app:v1', desc: 'Uploading build artifact safely' },
    { label: 'Staging Deploy', cmd: 'helm upgrade --install app ./chart', desc: 'Deploying to staging environment' }
  ];

  const triggerPipeline = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStep(0);
    setProgress(0);
    setLogs(['[SYSTEM] Initializing webhook pipeline run...', '[GIT] Detected commit "feat: update core checkout module" by developer@company.com']);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      setProgress(20 * i + 10);
      
      const step = steps[i];
      setLogs(prev => [...prev, `\n[${step.label.toUpperCase()}] Running: ${step.cmd}`, `[${step.label.toUpperCase()}] ${step.desc}...`]);
      
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (i === 4 && failStaging) {
        setLogs(prev => [
          ...prev, 
          `[STAGING DEPLOY] Error: Connection refused at cluster ingress port 443`,
          `[STAGING DEPLOY] Failed deployment!`,
          `[SYSTEM] ❌ PIPELINE FAILED at Staging Deploy stage.`,
          `[ALERT] Sending Slack notification to #devops-alerts`,
          `[ROLLBACK] Initiating automated rolling revert to version v1.2.9... SUCCESS`
        ]);
        setCurrentStep(-2); // Error state
        setIsRunning(false);
        return;
      }

      setLogs(prev => [
        ...prev, 
        `[${step.label.toUpperCase()}] SUCCESS: Completed in ${Math.floor(Math.random() * 4) + 1}s`
      ]);
    }

    setProgress(100);
    setCurrentStep(99); // Completed
    setIsRunning(false);
    setLogs(prev => [...prev, `\n[SYSTEM] 🎉 PIPELINE SUCCESSFUL. App running in Staging.`]);
  };

  return (
    <div className="space-y-4" id="pipeline-simulator">
      <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-white">CI/CD Automated Pipeline Simulator</h3>
          <p className="text-xs text-slate-400">Observe code promotion stages from Git Push to Staging</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={failStaging} 
              onChange={() => setFailStaging(!failStaging)}
              className="rounded bg-slate-800 border-slate-700 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Simulate Fail</span>
          </label>
          <button 
            onClick={triggerPipeline} 
            disabled={isRunning}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all ${
              isRunning 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Trigger Git Push'}</span>
          </button>
        </div>
      </div>

      {/* Visual Pipeline Track */}
      <div className="grid grid-cols-5 gap-2 relative bg-slate-950/50 p-4 rounded-lg border border-slate-800/60 overflow-hidden">
        {steps.map((step, index) => {
          let stateClass = 'border-slate-800 bg-slate-900/60 text-slate-500';
          let icon = <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />;

          if (currentStep === index) {
            stateClass = 'border-amber-500 bg-amber-950/20 text-amber-300 animate-pulse';
            icon = <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />;
          } else if (currentStep > index || currentStep === 99) {
            stateClass = 'border-emerald-500 bg-emerald-950/20 text-emerald-300';
            icon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
          } else if (currentStep === -2 && index === 4) {
            stateClass = 'border-red-500 bg-red-950/20 text-red-300';
            icon = <XCircle className="w-4 h-4 text-red-400" />;
          }

          return (
            <div key={index} className={`flex flex-col items-center p-3 rounded-lg border transition-all text-center relative z-10 ${stateClass}`}>
              <div className="mb-2">{icon}</div>
              <span className="text-xs font-bold block">{step.label}</span>
              <span className="text-[10px] text-slate-400 mt-1 line-clamp-1">{step.cmd}</span>
            </div>
          );
        })}
        {/* Progress connecting track bar */}
        <div className="absolute top-[28px] left-[10%] right-[10%] h-1 bg-slate-800 -z-0">
          <div 
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${currentStep === -2 ? 80 : progress}%` }}
          />
        </div>
      </div>

      {/* Interactive logs */}
      <div className="bg-slate-950 rounded-lg border border-slate-800 p-3 flex flex-col">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-mono font-bold text-emerald-400">Console Logs (Build Agent #4)</span>
          {isRunning && <span className="text-[10px] bg-emerald-900/30 text-emerald-400 px-2 py-0.5 rounded-full animate-pulse font-mono">LIVE_STREAMING</span>}
        </div>
        <div className="bg-slate-900/50 rounded p-3 h-48 overflow-y-auto font-mono text-[11px] text-slate-300 space-y-1 scrollbar-thin border border-slate-900">
          {logs.map((log, i) => (
            <div key={i} className={`whitespace-pre-wrap ${log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('Error') || log.includes('❌') ? 'text-red-400 font-bold' : log.includes('Trigger') ? 'text-sky-300' : 'text-slate-300'}`}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   2. CONTAINER VS VM WEIGHT & RESOURCE SANDBOX
   ============================================================================ */
interface NodeInstance {
  id: string;
  type: 'vm' | 'container';
  name: string;
  status: 'booting' | 'healthy';
  ram: number; // MB
  bootTime: number; // ms
}

function ContainerVmSimulator() {
  const [instances, setInstances] = useState<NodeInstance[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const addInstance = (type: 'vm' | 'container') => {
    if (isAdding) return;
    setIsAdding(true);
    const id = Math.random().toString(36).substring(7);
    const name = type === 'vm' ? `guest-os-vm-${id}` : `docker-pod-${id}`;
    const bootTime = type === 'vm' ? 4000 : 300; // Simulated speed up for visuals
    const ram = type === 'vm' ? 2048 : 25; // VM baseline vs container

    const newInst: NodeInstance = { id, type, name, status: 'booting', ram, bootTime };
    setInstances(prev => [...prev, newInst]);

    setTimeout(() => {
      setInstances(prev => prev.map(inst => inst.id === id ? { ...inst, status: 'healthy' } : inst));
      setIsAdding(false);
    }, bootTime);
  };

  const deleteInstance = (id: string) => {
    setInstances(prev => prev.filter(inst => inst.id !== id));
  };

  const clearAll = () => {
    setInstances([]);
  };

  const vms = instances.filter(i => i.type === 'vm');
  const containers = instances.filter(i => i.type === 'container');

  const vmRamTotal = vms.reduce((acc, curr) => acc + curr.ram, 0);
  const containerRamTotal = containers.reduce((acc, curr) => acc + curr.ram, 0);

  // Total available host RAM: 16384 MB (16GB)
  const hostRamMax = 16384;
  const totalAllocated = vmRamTotal + containerRamTotal;
  const usagePercentage = Math.min((totalAllocated / hostRamMax) * 100, 100);

  return (
    <div className="space-y-4" id="container-vm-simulator">
      <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-white">Docker Container vs Virtual Machine Density Sandbox</h3>
          <p className="text-xs text-slate-400">Provision resources and observe boot times, footprint, and cluster capacity</p>
        </div>
        <button onClick={clearAll} className="text-xs text-red-400 hover:text-red-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
          Reset Cluster
        </button>
      </div>

      {/* Cluster Metrics Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center gap-3">
          <Cpu className="w-8 h-8 text-sky-400" />
          <div className="flex-1">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Total Allocated RAM</span>
            <span className="text-sm font-bold text-white font-mono">{totalAllocated} MB <span className="text-[10px] text-slate-400">/ 16 GB</span></span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
              <div className="bg-sky-500 h-full" style={{ width: `${usagePercentage}%` }} />
            </div>
          </div>
        </div>
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center gap-3">
          <Activity className="w-8 h-8 text-emerald-400" />
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Boot Efficiency</span>
            <span className="text-sm font-bold text-white font-mono">
              {containers.length > 0 ? '0.2s Avg' : 'N/A'}{' '}
              <span className="text-[10px] text-slate-400">{vms.length > 0 ? '(VMs: 15s Avg)' : ''}</span>
            </span>
            <span className="text-[10px] text-slate-500 block">Fast orchestration allows elastic scaling</span>
          </div>
        </div>
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center gap-3">
          <HardDrive className="w-8 h-8 text-amber-400" />
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">App Density Multiplier</span>
            <span className="text-sm font-bold text-white font-mono">
              {vms.length > 0 && containers.length > 0 ? `${(ramWeight(vms) / ramWeight(containers)).toFixed(1)}x Density` : 'Containers run 80x lighter'}
            </span>
            <span className="text-[10px] text-slate-500 block">No Guest OS overhead in containers</span>
          </div>
        </div>
      </div>

      {/* Side by side comparison arena */}
      <div className="grid grid-cols-2 gap-4">
        {/* Virtual Machine side */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col h-72">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
            <div>
              <span className="text-xs font-bold text-rose-400 block">Virtual Machines (Hypervisor Host)</span>
              <span className="text-[10px] text-slate-400">Requires dedicated Guest OS + virtual hardware drivers</span>
            </div>
            <button 
              onClick={() => addInstance('vm')} 
              disabled={isAdding}
              className="flex items-center gap-1 bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold px-2.5 py-1 rounded transition-colors disabled:opacity-50"
            >
              <Plus className="w-3 h-3" />
              <span>Deploy VM</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-2 pr-1 scrollbar-thin">
            {vms.length === 0 ? (
              <div className="col-span-2 flex flex-col items-center justify-center h-full text-slate-600">
                <Server className="w-10 h-10 opacity-30 mb-1" />
                <span className="text-xs">No Virtual Machines active</span>
              </div>
            ) : (
              vms.map(vm => (
                <div key={vm.id} className="bg-slate-900 border border-slate-800 p-2 rounded flex flex-col justify-between relative group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-[10px] text-white font-semibold truncate max-w-[85px]">{vm.name}</span>
                    </div>
                    <button onClick={() => deleteInstance(vm.id)} className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="mt-2 flex justify-between items-end">
                    <span className="text-[9px] text-rose-300 bg-rose-950/40 px-1 py-0.5 rounded font-mono font-semibold">2,048 MB RAM</span>
                    <span className={`text-[9px] font-mono font-semibold ${vm.status === 'healthy' ? 'text-emerald-400' : 'text-amber-400 animate-pulse'}`}>
                      {vm.status === 'healthy' ? '● Live' : '⟳ Booting'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Docker Container side */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col h-72">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
            <div>
              <span className="text-xs font-bold text-sky-400 block">Docker Containers (Docker Engine)</span>
              <span className="text-[10px] text-slate-400">Shares host kernel directly. Runs isolated processes.</span>
            </div>
            <button 
              onClick={() => addInstance('container')} 
              disabled={isAdding}
              className="flex items-center gap-1 bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold px-2.5 py-1 rounded transition-colors disabled:opacity-50"
            >
              <Plus className="w-3 h-3" />
              <span>Spawn Container</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto grid grid-cols-3 gap-2 pr-1 scrollbar-thin">
            {containers.length === 0 ? (
              <div className="col-span-3 flex flex-col items-center justify-center h-full text-slate-600">
                <Cpu className="w-10 h-10 opacity-30 mb-1" />
                <span className="text-xs">No Containers active</span>
              </div>
            ) : (
              containers.map(container => (
                <div key={container.id} className="bg-slate-900 border border-slate-800 p-2 rounded flex flex-col justify-between relative group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-sky-400" />
                      <span className="text-[10px] text-white font-semibold truncate max-w-[50px]">{container.name}</span>
                    </div>
                    <button onClick={() => deleteInstance(container.id)} className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  </div>
                  <div className="mt-2 flex justify-between items-end">
                    <span className="text-[9px] text-sky-300 bg-sky-950/40 px-1 py-0.5 rounded font-mono font-semibold">25 MB RAM</span>
                    <span className={`text-[9px] font-mono font-semibold ${container.status === 'healthy' ? 'text-emerald-400' : 'text-amber-400 animate-pulse'}`}>
                      {container.status === 'healthy' ? '● Live' : '⟳ Init'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ramWeight(instances: NodeInstance[]): number {
  return instances.length > 0 ? instances.reduce((acc, curr) => acc + curr.ram, 0) / instances.length : 1;
}

/* ============================================================================
   3. KUBERNETES CLUSTER VISUALIZER & SELF-HEALING SIMULATOR
   ============================================================================ */
interface Pod {
  id: number;
  name: string;
  status: 'Running' | 'Failed' | 'Restarting';
  ip: string;
}

function K8sPodSimulator() {
  const [targetReplicas, setTargetReplicas] = useState(3);
  const [pods, setPods] = useState<Pod[]>([
    { id: 1, name: 'checkout-api-8f4b-1', status: 'Running', ip: '10.244.1.42' },
    { id: 2, name: 'checkout-api-8f4b-2', status: 'Running', ip: '10.244.1.43' },
    { id: 3, name: 'checkout-api-8f4b-3', status: 'Running', ip: '10.244.1.44' },
  ]);
  const [configEnv, setConfigEnv] = useState('production');
  const [logMessages, setLogMessages] = useState<string[]>([
    '[Kube-Controller] Monitoring cluster state...',
    '[Kube-Controller] Desired replicas: 3 | Current healthy: 3'
  ]);

  // Handle replica scaling
  useEffect(() => {
    if (pods.length < targetReplicas) {
      // Scale up
      const diff = targetReplicas - pods.length;
      const newPods: Pod[] = [];
      for (let i = 0; i < diff; i++) {
        const nextId = Math.floor(Math.random() * 1000) + 10;
        newPods.push({
          id: nextId,
          name: `checkout-api-8f4b-${nextId}`,
          status: 'Restarting', // Spawning state
          ip: `10.244.1.${40 + pods.length + i}`
        });
      }
      setPods(prev => [...prev, ...newPods]);
      setLogMessages(prev => [...prev, `[Deployment-Controller] Scaling UP: Creating ${diff} new Pod(s)`]);
      
      // Complete boot
      setTimeout(() => {
        setPods(prev => prev.map(p => p.status === 'Restarting' ? { ...p, status: 'Running' } : p));
        setLogMessages(prev => [...prev, `[Deployment-Controller] All scaled Pods are Healthy and joined Service endpoints.`]);
      }, 1000);

    } else if (pods.length > targetReplicas) {
      // Scale down
      const diff = pods.length - targetReplicas;
      setPods(prev => prev.slice(0, targetReplicas));
      setLogMessages(prev => [...prev, `[Deployment-Controller] Scaling DOWN: Terminating ${diff} oldest Pod(s) gracefully`]);
    }
  }, [targetReplicas]);

  // Kill pod chaos
  const killPod = (id: number) => {
    setPods(prev => prev.map(p => p.id === id ? { ...p, status: 'Failed' } : p));
    setLogMessages(prev => [
      ...prev, 
      `[ReplicaSet] WARNING: Pod checkout-api failed liveness probe, removing from load balancer endpoints.`,
      `[Self-Healing] 💥 CRITICAL: Desired count is ${targetReplicas}, actual healthy count is ${pods.filter(p => p.id !== id && p.status === 'Running').length}.`
    ]);

    // Self heal in exactly 1.5 seconds
    setTimeout(() => {
      setPods(prev => {
        // Filter out failed pod, add new one
        const filtered = prev.filter(p => p.id !== id);
        const nextId = Math.floor(Math.random() * 1000) + 100;
        const replacement: Pod = {
          id: nextId,
          name: `checkout-api-8f4b-${nextId}`,
          status: 'Restarting',
          ip: `10.244.1.${50 + Math.floor(Math.random() * 40)}`
        };
        return [...filtered, replacement];
      });
      setLogMessages(prev => [...prev, `[Self-Healing] 🛠️ Autorecovery: Provisioning brand new replacement Pod.`]);

      // Complete replacement boot
      setTimeout(() => {
        setPods(prev => prev.map(p => p.status === 'Restarting' ? { ...p, status: 'Running' } : p));
        setLogMessages(prev => [...prev, `[Self-Healing] Replacement Pod is Healthy. Cluster State synchronized!`]);
      }, 1000);

    }, 1500);
  };

  // Rolling config update
  const applyConfigUpdate = () => {
    setLogMessages(prev => [...prev, `\n[ConfigMap] ConfigMap updated: ENV_CONTEXT = "${configEnv}"`, `[Deployment] Initiating ROLLING UPDATE...`]);
    
    // Restart pods sequentially to simulate zero-downtime config reload
    pods.forEach((p, idx) => {
      setTimeout(() => {
        setPods(prev => prev.map(item => item.id === p.id ? { ...item, status: 'Restarting' } : item));
        setLogMessages(prev => [...prev, `[Rolling-Update] Reloading Config on Pod ${p.name}...`]);

        setTimeout(() => {
          setPods(prev => prev.map(item => item.id === p.id ? { ...item, status: 'Running' } : item));
          setLogMessages(prev => [...prev, `[Rolling-Update] Pod ${p.name} updated successfully.`]);
        }, 800);

      }, idx * 1000);
    });
  };

  return (
    <div className="space-y-4" id="k8s-pod-simulator">
      <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-white">Kubernetes Self-Healing & Replica Controller Sandbox</h3>
          <p className="text-xs text-slate-400">Trigger manual crash injection or scale desired replicas to witness self-healing</p>
        </div>
      </div>

      {/* Controller Controls */}
      <div className="grid grid-cols-2 gap-4">
        {/* Desired Replicas slider */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-white block mb-1">Scale Replica Controller</span>
            <p className="text-[10px] text-slate-400">Desired state declaration: loops continuously adjust actual instances to match</p>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <input 
              type="range" 
              min={1} 
              max={6} 
              value={targetReplicas}
              onChange={(e) => setTargetReplicas(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <span className="text-sm font-mono font-bold text-emerald-400">{targetReplicas} Replicas</span>
          </div>
        </div>

        {/* ConfigMap and Hot-reload */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-white block mb-1">Inject ConfigMap Variables</span>
            <p className="text-[10px] text-slate-400">Decouples configuration parameters from container images</p>
          </div>
          <div className="flex gap-2 mt-2">
            <select 
              value={configEnv} 
              onChange={(e) => setConfigEnv(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white flex-1"
            >
              <option value="production">ENV = production</option>
              <option value="staging">ENV = staging</option>
              <option value="debug-mode">LOGS = debug-mode</option>
            </select>
            <button 
              onClick={applyConfigUpdate}
              className="bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold px-3 py-1 rounded transition-colors"
            >
              Apply (Rolling Update)
            </button>
          </div>
        </div>
      </div>

      {/* Cluster Visual Stage */}
      <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col items-center">
        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold border border-slate-800/80 px-2 py-0.5 rounded bg-slate-950 mb-3">
          Virtual Kubernetes Cluster Workspace
        </div>

        {/* Ingress / Service layer */}
        <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 px-4 py-2 rounded-lg shadow-lg mb-6 max-w-sm w-full justify-between">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-emerald-400 animate-pulse" />
            <div>
              <span className="text-[10px] font-bold text-white block">Service endpoint</span>
              <span className="text-[9px] font-mono text-slate-400">IP: 10.96.0.100 (Selectors: app=checkout)</span>
            </div>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded font-mono">Port 80</span>
        </div>

        {/* Pods Grid Container */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-2xl">
          {pods.map(pod => {
            let cardClass = 'border-slate-800 bg-slate-900/60 text-slate-400';
            let buttonText = 'Crash Pod';
            let statusBadge = <span className="text-[9px] text-emerald-400">● Running</span>;

            if (pod.status === 'Failed') {
              cardClass = 'border-red-500 bg-red-950/20 text-red-300 shadow-lg shadow-red-900/25 animate-bounce';
              buttonText = 'Recovering...';
              statusBadge = <span className="text-[9px] text-red-400">💥 Terminated</span>;
            } else if (pod.status === 'Restarting') {
              cardClass = 'border-amber-500 bg-amber-950/20 text-amber-300 animate-pulse';
              buttonText = 'Configuring...';
              statusBadge = <span className="text-[9px] text-amber-400 animate-spin">⟳ Initializing</span>;
            }

            return (
              <div key={pod.id} className={`p-3 rounded-lg border flex flex-col justify-between transition-all duration-300 ${cardClass}`}>
                <div>
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-[10px] font-bold text-white truncate max-w-[120px]">{pod.name}</span>
                    {statusBadge}
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 block mb-2">IP: {pod.ip}</span>
                </div>
                <button 
                  onClick={() => killPod(pod.id)} 
                  disabled={pod.status !== 'Running'}
                  className={`text-[9px] font-bold py-1 px-2 rounded w-full transition-all ${
                    pod.status === 'Running' 
                      ? 'bg-red-950/50 hover:bg-red-600 text-red-300 hover:text-white border border-red-900/50' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Logs monitor */}
      <div className="bg-slate-950 rounded-lg border border-slate-800 p-3 h-32 flex flex-col">
        <span className="text-xs font-mono font-bold text-indigo-400 mb-1">Kube-Controller Event Streams</span>
        <div className="bg-slate-900/50 rounded p-2 overflow-y-auto font-mono text-[10px] text-slate-400 flex-1 space-y-0.5 scrollbar-thin">
          {logMessages.map((msg, idx) => (
            <div key={idx} className={msg.includes('💥') || msg.includes('WARNING') ? 'text-red-400' : msg.includes('🛠️') || msg.includes('Scaled') ? 'text-emerald-400' : 'text-slate-400'}>
              {msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   4. DEPLOYMENT STRATEGIES SANDBOX (BLUE-GREEN & CANARY)
   ============================================================================ */
function BlueGreenCanarySimulator() {
  const [strategy, setStrategy] = useState<'blue-green' | 'canary'>('blue-green');
  
  // Blue-Green States
  const [activeEnv, setActiveEnv] = useState<'blue' | 'green'>('blue');
  const [bgStatus, setBgStatus] = useState<string>('Serving production traffic on v1.0.0 (Blue)');
  
  // Canary States
  const [canaryRatio, setCanaryRatio] = useState(10); // Percent traffic to v2
  const [canaryErrors, setCanaryErrors] = useState<boolean>(false);

  const handleBgSwitch = () => {
    const nextEnv = activeEnv === 'blue' ? 'green' : 'blue';
    setActiveEnv(nextEnv);
    setBgStatus(`Switching Load Balancer weights... Atomic cutover to ${nextEnv.toUpperCase()} completed.`);
  };

  const handleBgRollback = () => {
    setActiveEnv('blue');
    setBgStatus('⚠️ Emergency rollback triggered! Load balancer pointing 100% back to Blue (v1.0.0)');
  };

  return (
    <div className="space-y-4" id="deployment-strategies-simulator">
      <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-white">Deployment Strategies Playground</h3>
          <p className="text-xs text-slate-400">Toggle between instantaneous cutovers (Blue-Green) or progressive shifting (Canary)</p>
        </div>
        <div className="flex gap-1.5 bg-slate-900 p-1 rounded border border-slate-800">
          <button 
            onClick={() => setStrategy('blue-green')}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${strategy === 'blue-green' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Blue-Green
          </button>
          <button 
            onClick={() => setStrategy('canary')}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${strategy === 'canary' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Canary Release
          </button>
        </div>
      </div>

      {strategy === 'blue-green' ? (
        <div className="space-y-4">
          {/* Controls for Blue-Green */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-white block mb-1">Atomic Router Switch</span>
                <p className="text-[10px] text-slate-400">Instantly switch router weights to direct all users to the staged cluster</p>
              </div>
              <button 
                onClick={handleBgSwitch}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1.5 px-3 rounded mt-2 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Switch Traffic to {activeEnv === 'blue' ? 'Green (v1.1.0)' : 'Blue (v1.0.0)'}</span>
              </button>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-red-400 block mb-1">Quick Rollback Protection</span>
                <p className="text-[10px] text-slate-400">If v1.1.0 experiences memory leaks, instantly recover users to the original safe cluster</p>
              </div>
              <button 
                onClick={handleBgRollback}
                className="bg-red-950/60 border border-red-900 hover:bg-red-900 text-red-200 text-xs font-bold py-1.5 px-3 rounded mt-2 flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>Instant Rollback to Blue</span>
              </button>
            </div>
          </div>

          {/* Visual Environments Grid */}
          <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col items-center relative">
            {/* The Router */}
            <div className="flex flex-col items-center bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-lg mb-6 shadow-xl w-64 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Production Router Ingress</span>
              <span className="text-xs font-bold text-white font-mono">Routing Target: <span className={activeEnv === 'blue' ? 'text-sky-400' : 'text-emerald-400'}>{activeEnv.toUpperCase()}</span></span>
            </div>

            <div className="grid grid-cols-2 gap-8 w-full max-w-xl">
              {/* Blue Env */}
              <div className={`p-4 rounded-lg border transition-all duration-300 flex flex-col items-center ${activeEnv === 'blue' ? 'border-sky-500 bg-sky-950/10 shadow-lg shadow-sky-900/10 scale-105' : 'border-slate-800 bg-slate-900/40 opacity-40'}`}>
                <div className="w-8 h-8 rounded-full bg-sky-900/50 flex items-center justify-center mb-2">
                  <Server className="w-4 h-4 text-sky-400" />
                </div>
                <span className="text-xs font-bold text-white">Blue Cluster (Active v1.0.0)</span>
                <span className="text-[10px] text-slate-400 font-mono mt-1">10 Pods | Healthy</span>
                {activeEnv === 'blue' && <span className="mt-3 text-[10px] bg-sky-900 text-sky-300 px-2 py-0.5 rounded-full font-bold">🎯 100% Traffic</span>}
              </div>

              {/* Green Env */}
              <div className={`p-4 rounded-lg border transition-all duration-300 flex flex-col items-center ${activeEnv === 'green' ? 'border-emerald-500 bg-emerald-950/10 shadow-lg shadow-emerald-900/10 scale-105' : 'border-slate-800 bg-slate-900/40 opacity-40'}`}>
                <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center mb-2">
                  <Server className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-xs font-bold text-white">Green Cluster (Active v1.1.0)</span>
                <span className="text-[10px] text-slate-400 font-mono mt-1">10 Pods | Healthy</span>
                {activeEnv === 'green' && <span className="mt-3 text-[10px] bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded-full font-bold">🎯 100% Traffic</span>}
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-2 text-center rounded border border-slate-800 text-[11px] font-mono text-slate-300">
            {bgStatus}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Controls for Canary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-white block mb-1">Set Canary Weight Slider</span>
                <p className="text-[10px] text-slate-400">Slowly release code to 10% then 25% of traffic while watching alerts</p>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <input 
                  type="range" 
                  min={0} 
                  max={100} 
                  step={5}
                  value={canaryRatio}
                  onChange={(e) => setCanaryRatio(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <span className="text-xs font-mono font-bold text-emerald-400">{canaryRatio}% Canary</span>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 block mb-1">Observe Canary Error Spikes</span>
                <p className="text-[10px] text-slate-400">Trigger simulated database schema failure on the canary instances</p>
              </div>
              <button 
                onClick={() => setCanaryErrors(!canaryErrors)}
                className={`text-xs font-bold py-1.5 px-3 rounded mt-2 transition-all ${
                  canaryErrors 
                    ? 'bg-rose-600 hover:bg-rose-500 text-white' 
                    : 'bg-slate-900 border border-slate-800 text-amber-300 hover:text-white'
                }`}
              >
                {canaryErrors ? '⚠️ Resolve Error Spikes' : '💥 Inject Errors into Canary'}
              </button>
            </div>
          </div>

          {/* Traffic split visualizer */}
          <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Dynamic Traffic Split Routing</span>
              {canaryErrors && <span className="text-[10px] bg-rose-900 text-rose-300 px-2.5 py-0.5 rounded animate-pulse font-mono font-bold">ALERT: CANARY ERRORS AT 4.2%</span>}
            </div>

            <div className="flex gap-4 items-center justify-center">
              {/* Primary */}
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center flex-1">
                <span className="text-xs font-bold text-white block">Main Pool (v1.0.0)</span>
                <span className="text-[11px] font-mono text-slate-400 mt-1 block">{100 - canaryRatio}% traffic load</span>
                <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-sky-500 h-full" style={{ width: `${100 - canaryRatio}%` }} />
                </div>
              </div>

              {/* Ingress node */}
              <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 font-mono text-xs">
                ⚏
              </div>

              {/* Canary node */}
              <div className={`border p-3 rounded-lg text-center flex-1 transition-all ${canaryErrors ? 'border-red-500 bg-red-950/20' : 'border-slate-800 bg-slate-900'}`}>
                <span className={`text-xs font-bold block ${canaryErrors ? 'text-red-400' : 'text-emerald-400'}`}>Canary Pool (v1.1.0)</span>
                <span className="text-[11px] font-mono text-slate-400 mt-1 block">{canaryRatio}% traffic load</span>
                <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${canaryRatio}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   5. GIT BRANCHING & RELEASE PIPELINE WORKFLOWS
   ============================================================================ */
function BranchingSimulator() {
  const [strategy, setStrategy] = useState<'trunk' | 'gitflow'>('trunk');
  const [commits, setCommits] = useState<string[]>([
    'Init repo commit [main]',
    'Setup basic Express server [main]',
  ]);

  const addCommit = (branch: string) => {
    const id = Math.random().toString(36).substring(7);
    setCommits(prev => [...prev, `Commit ${id} pushed directly to [${branch}]`]);
  };

  const mergeFeature = () => {
    const id = Math.random().toString(36).substring(7);
    setCommits(prev => [
      ...prev, 
      `Create temporary branch [feature-${id}]`,
      `Implement hotfix and push tests [feature-${id}]`,
      `Fast-forward merge branch [feature-${id}] into [main]`,
      `Trigger automatic CI deploy run... Success!`
    ]);
  };

  return (
    <div className="space-y-4" id="git-branching-simulator">
      <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-white">Trunk-Based vs GitFlow Branching Simulator</h3>
          <p className="text-xs text-slate-400">See how merge frequency affects deployment risk and integration speed</p>
        </div>
        <div className="flex gap-1 bg-slate-900 p-1 rounded border border-slate-800">
          <button 
            onClick={() => { setStrategy('trunk'); setCommits(['Init repo [main]', 'Refactor routing [main]']); }}
            className={`px-2 py-1 rounded text-[11px] font-bold ${strategy === 'trunk' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Trunk-Based
          </button>
          <button 
            onClick={() => { setStrategy('gitflow'); setCommits(['Init repo [main]', 'Branch off [develop]', 'Create branch [feature/login]']); }}
            className={`px-2 py-1 rounded text-[11px] font-bold ${strategy === 'gitflow' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            GitFlow
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Workspace controls */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-white block mb-1">
              {strategy === 'trunk' ? 'Trunk-Based Actions' : 'GitFlow (Feature Branch) Actions'}
            </span>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              {strategy === 'trunk' 
                ? 'Developers commit directly or merge micro-branches multiple times a day. Extremely short branch lifespan ensures no integration conflicts.' 
                : 'Features are isolated in branches for days/weeks. Merges are infrequent, requiring manual reviews and coordination.'}
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {strategy === 'trunk' ? (
              <>
                <button 
                  onClick={() => addCommit('main')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold py-1.5 px-3 rounded w-full flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Commit directly to main</span>
                </button>
                <button 
                  onClick={mergeFeature}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white text-[11px] font-bold py-1.5 px-3 rounded w-full flex items-center justify-center gap-1.5"
                >
                  <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Merge micro-feature (Short lived branch)</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => addCommit('feature/login')}
                  className="bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold py-1.5 px-3 rounded w-full flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Commit in Feature Branch</span>
                </button>
                <button 
                  onClick={() => {
                    setCommits(prev => [
                      ...prev, 
                      'Pull Request created: Merge feature/login into develop',
                      'Running 45-min CI suite... SUCCESS',
                      'Lead architect approved. Merged feature into develop branch',
                      'Release v1.2.0-rc1 cut: Merged develop into main'
                    ]);
                  }}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white text-[11px] font-bold py-1.5 px-3 rounded w-full flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
                  <span>Execute full branch PR promotion</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Git Log view */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col h-56">
          <span className="text-xs font-mono font-bold text-sky-400 mb-1">Git Commit Ledger</span>
          <div className="bg-slate-900/50 rounded p-2 overflow-y-auto font-mono text-[10px] text-slate-300 flex-1 space-y-1.5 scrollbar-thin">
            {commits.map((log, idx) => (
              <div key={idx} className={log.includes('main') || log.includes('Success') ? 'text-emerald-400' : log.includes('feature') || log.includes('develop') ? 'text-sky-300' : 'text-slate-400'}>
                $ git commit &mdash; {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   6. ERROR BUDGET & SLO CALCULATOR
   ============================================================================ */
function ErrorBudgetSimulator() {
  const [slo, setSlo] = useState(99.9); // Target percent uptime
  const [traffic, setTraffic] = useState(1000000); // Monthly requests
  const [costPerMin, setCostPerMin] = useState(100); // cost in $

  // Calculations
  const allowedDowntimePercent = 100 - slo;
  const totalSecsMonth = 30 * 24 * 3600;
  const allowedDowntimeSecs = (allowedDowntimePercent / 100) * totalSecsMonth;

  const getDowntimeString = (totalSecs: number) => {
    const days = Math.floor(totalSecs / (24 * 3600));
    const hours = Math.floor((totalSecs % (24 * 3600)) / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = Math.floor(totalSecs % 60);

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (mins > 0) parts.push(`${mins}m`);
    parts.push(`${secs}s`);
    return parts.join(' ');
  };

  const allowedFailedRequests = Math.floor((allowedDowntimePercent / 100) * traffic);
  const financialRisk = (allowedDowntimeSecs / 60) * costPerMin;

  const getSreAction = (target: number) => {
    if (target < 99) return 'Basic monitoring, manual recovery on single VM.';
    if (target < 99.9) return 'Automated auto-scaling group, simple external load-balancer, 15-min SLA.';
    if (target < 99.99) return 'Kubernetes self-healing pods, multi-zone availability nodes, database replica lag monitoring.';
    return 'Multi-region active-active clusters, automated canary releases, sub-second failovers, chaos tests mandatory.';
  };

  return (
    <div className="space-y-4" id="error-budget-simulator">
      <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-white">SRE SLO & Error Budget Calculator</h3>
          <p className="text-xs text-slate-400">Tune reliability targets to see allowable down-times and organizational demands</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Sliders panel */}
        <div className="col-span-1 bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          {/* Target SLO */}
          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Availability SLO Target</label>
            <div className="flex gap-2 mb-2">
              {[95, 99, 99.9, 99.99, 99.999].map(val => (
                <button
                  key={val}
                  onClick={() => setSlo(val)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${slo === val ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400'}`}
                >
                  {val}%
                </button>
              ))}
            </div>
            <input 
              type="range" 
              min={90} 
              max={99.999} 
              step={0.01}
              value={slo}
              onChange={(e) => setSlo(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded accent-indigo-500"
            />
            <span className="text-xs font-mono font-bold text-indigo-400 mt-1 block text-right">{slo}%</span>
          </div>

          {/* Traffic */}
          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Monthly Requests</label>
            <input 
              type="range" 
              min={100000} 
              max={10000000} 
              step={100000}
              value={traffic}
              onChange={(e) => setTraffic(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded accent-indigo-500"
            />
            <span className="text-xs font-mono font-bold text-slate-300 mt-1 block text-right">
              {traffic.toLocaleString()} requests
            </span>
          </div>

          {/* Downtime cost */}
          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">1-min Outage Cost ($)</label>
            <input 
              type="range" 
              min={10} 
              max={2000} 
              step={10}
              value={costPerMin}
              onChange={(e) => setCostPerMin(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded accent-indigo-500"
            />
            <span className="text-xs font-mono font-bold text-slate-300 mt-1 block text-right">${costPerMin}/min</span>
          </div>
        </div>

        {/* Results Panel */}
        <div className="col-span-2 bg-slate-950 p-4 rounded-lg border border-slate-800 grid grid-cols-2 gap-4">
          <div className="bg-slate-900/60 p-3 rounded border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-rose-400" />
              <span className="text-[10px] text-slate-400 font-bold uppercase">Monthly Error Budget</span>
            </div>
            <div>
              <span className="text-xl font-mono font-bold text-rose-400 block">{getDowntimeString(allowedDowntimeSecs)}</span>
              <span className="text-[10px] text-slate-500">Allowable total downtime before lock-gates activate</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] text-slate-400 font-bold uppercase">Max Allowed Failures</span>
            </div>
            <div>
              <span className="text-xl font-mono font-bold text-amber-400 block">{allowedFailedRequests.toLocaleString()} reqs</span>
              <span className="text-[10px] text-slate-500">Failed HTTP requests tolerated per month</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] text-slate-400 font-bold uppercase">Financial Outage Risk</span>
            </div>
            <div>
              <span className="text-xl font-mono font-bold text-emerald-400 block">${Math.floor(financialRisk).toLocaleString()}</span>
              <span className="text-[10px] text-slate-500">Potential monetary cost of full budget burn</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-1">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] text-slate-400 font-bold uppercase">SRE Engineering Demands</span>
            </div>
            <div>
              <span className="text-xs font-bold text-white block truncate">{getSreAction(slo)}</span>
              <span className="text-[9px] text-slate-500 block leading-normal mt-1">High SLOs increase build complexity drastically</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   7. TESTING PYRAMID TUNER
   ============================================================================ */
function TestingPyramidSimulator() {
  const [unitCount, setUnitCount] = useState(80);
  const [integrationCount, setIntegrationCount] = useState(15);
  const [e2eCount, setE2eCount] = useState(5);

  const total = unitCount + integrationCount + e2eCount;
  
  // Normalizing ratios
  const unitRatio = (unitCount / total) * 100;
  const integrationRatio = (integrationCount / total) * 100;
  const e2eRatio = (e2eCount / total) * 100;

  // Calculators based on proportions
  // A healthy pyramid has very high Unit ratio, moderate integration, and very low E2E.
  // A top-heavy "ice-cream cone" (high E2E, low unit) leads to high runtime and flakiness.
  
  const pipelineTime = Math.max(1, Math.floor((e2eCount * 2) + (integrationCount * 0.4) + (unitCount * 0.01)));
  const confidence = Math.min(100, Math.floor((unitCount * 0.4) + (integrationCount * 1.5) + (e2eCount * 6)));
  const runCost = Math.floor((e2eCount * 5) + (integrationCount * 1) + (unitCount * 0.1));

  const getFrustrationLevel = (time: number) => {
    if (time < 5) return '🟢 Happy & Fast';
    if (time < 12) return '🟡 Mildly Impatient';
    if (time < 20) return '🟠 Coffee Break waiting...';
    return '🔴 Extreme Rage: CI slows team to a crawl';
  };

  return (
    <div className="space-y-4" id="testing-pyramid-simulator">
      <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-white">Testing Pyramid Design Sandbox</h3>
          <p className="text-xs text-slate-400">Balance Unit, Integration, and End-to-End tests to optimize CI pipeline performance</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Adjustment sliders */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <span className="text-xs font-bold text-white block border-b border-slate-800 pb-1.5">Adjust Test Distribution Counts</span>
          
          {/* Unit tests */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">Unit Tests (Base layer)</span>
              <span className="font-bold text-indigo-400">{unitCount} tests</span>
            </div>
            <input 
              type="range" 
              min={10} 
              max={300} 
              value={unitCount}
              onChange={(e) => setUnitCount(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded accent-indigo-500"
            />
            <span className="text-[10px] text-slate-500">Fast, isolated mock tests executing in milliseconds.</span>
          </div>

          {/* Integration tests */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">Integration Tests (Middle layer)</span>
              <span className="font-bold text-amber-400">{integrationCount} tests</span>
            </div>
            <input 
              type="range" 
              min={1} 
              max={100} 
              value={integrationCount}
              onChange={(e) => setIntegrationCount(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded accent-amber-500"
            />
            <span className="text-[10px] text-slate-500">Checks service communication API contracts.</span>
          </div>

          {/* E2E tests */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">E2E Tests (Top layer)</span>
              <span className="font-bold text-sky-400">{e2eCount} tests</span>
            </div>
            <input 
              type="range" 
              min={0} 
              max={50} 
              value={e2eCount}
              onChange={(e) => setE2eCount(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded accent-sky-500"
            />
            <span className="text-[10px] text-slate-500">Launches full browser to test UI flows. Brittle & slow.</span>
          </div>
        </div>

        {/* Dynamic visual graph and metrics */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          {/* Dynamic pyramid block */}
          <div className="flex flex-col items-center justify-center p-3 bg-slate-900/40 rounded border border-slate-900/80 h-32 relative">
            
            {/* Top: E2E */}
            <div 
              className="bg-sky-500/20 border border-sky-400 text-sky-300 text-[10px] font-bold py-1 rounded text-center flex items-center justify-center transition-all"
              style={{ width: `${Math.max(20, e2eRatio * 1.5)}%`, opacity: e2eCount === 0 ? 0 : 1 }}
            >
              E2E ({Math.floor(e2eRatio)}%)
            </div>

            {/* Mid: Integration */}
            <div 
              className="bg-amber-500/20 border border-amber-400 text-amber-300 text-[10px] font-bold py-1 rounded text-center flex items-center justify-center mt-1.5 transition-all"
              style={{ width: `${Math.max(40, integrationRatio * 1.5)}%` }}
            >
              Integration ({Math.floor(integrationRatio)}%)
            </div>

            {/* Base: Unit */}
            <div 
              className="bg-indigo-500/20 border border-indigo-400 text-indigo-300 text-[10px] font-bold py-1 rounded text-center flex items-center justify-center mt-1.5 transition-all"
              style={{ width: `${Math.max(60, unitRatio * 1.1)}%` }}
            >
              Unit ({Math.floor(unitRatio)}%)
            </div>

          </div>

          {/* Metrics outputs */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-slate-900 p-2 rounded text-center border border-slate-800/60">
              <span className="text-[10px] text-slate-400 block font-semibold">CI Pipeline Duration</span>
              <span className="text-sm font-mono font-bold text-white">{pipelineTime} mins</span>
            </div>
            <div className="bg-slate-900 p-2 rounded text-center border border-slate-800/60">
              <span className="text-[10px] text-slate-400 block font-semibold">Test Server Build Cost</span>
              <span className="text-sm font-mono font-bold text-white">${runCost}/run</span>
            </div>
            <div className="bg-slate-900 p-2 rounded text-center border border-slate-800/60">
              <span className="text-[10px] text-slate-400 block font-semibold">Deploy Confidence</span>
              <span className="text-sm font-mono font-bold text-emerald-400">{confidence}%</span>
            </div>
            <div className="bg-slate-900 p-2 rounded text-center border border-slate-800/60">
              <span className="text-[10px] text-slate-400 block font-semibold">Developer UX Mode</span>
              <span className="text-[10px] font-bold block truncate text-slate-300 mt-1">{getFrustrationLevel(pipelineTime)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   8. CHAOS ENGINEERING & RESILIENCE (CHAOS MONKEY) SIMULATOR
   ============================================================================ */
interface Microservice {
  name: string;
  label: string;
  status: 'healthy' | 'dead';
  dependencies: string[];
}

function ChaosMonkeySimulator() {
  const [circuitBreaker, setCircuitBreaker] = useState(true);
  const [services, setServices] = useState<Microservice[]>([
    { name: 'gateway', label: 'API Gateway', status: 'healthy', dependencies: ['auth', 'catalog', 'orders'] },
    { name: 'auth', label: 'Auth Service', status: 'healthy', dependencies: [] },
    { name: 'catalog', label: 'Product Catalog', status: 'healthy', dependencies: [] },
    { name: 'orders', label: 'Order Service', status: 'healthy', dependencies: ['payment', 'inventory'] },
    { name: 'payment', label: 'Payment API', status: 'healthy', dependencies: [] },
    { name: 'inventory', label: 'Inventory DB', status: 'healthy', dependencies: [] },
  ]);
  const [logMsgs, setLogMsgs] = useState<string[]>([
    '[Chaos-Manager] Running cluster health validation checks...',
    '[Cluster] Status: 6/6 services operating healthy. 100% throughput.'
  ]);

  const killRandomService = () => {
    // Pick healthy service to kill (excluding API gateway for visual cascading)
    const eligible = services.filter(s => s.status === 'healthy' && s.name !== 'gateway');
    if (eligible.length === 0) return;

    const target = eligible[Math.floor(Math.random() * eligible.length)];
    
    setServices(prev => prev.map(s => s.name === target.name ? { ...s, status: 'dead' } : s));
    setLogMsgs(prev => [
      ...prev, 
      `\n[💥 Chaos Monkey] Terminating node instance for microservice [${target.label}]...`,
    ]);

    // Handle cascading failure visual logic
    setTimeout(() => {
      if (target.name === 'payment' || target.name === 'inventory') {
        if (!circuitBreaker) {
          // Cascades to orders, which cascades to gateway
          setServices(prev => prev.map(s => (s.name === 'orders' || s.name === 'gateway') ? { ...s, status: 'dead' } : s));
          setLogMsgs(prev => [
            ...prev,
            `[Orders] Error: Failed to reach payment gateway. Network socket timeout!`,
            `[Orders] Exception: Thread execution pool exhausted. Service hanging!`,
            `[Gateway] CRITICAL: API Gateway downstream sockets blocked. API Gateway crashed!`,
            `[Cluster] 🚨 CASCADING OUTAGE DETECTED. COMPLETE SITE FAILURE.`
          ]);
        } else {
          // Circuit breaker trips, fails fast, gateway stays healthy
          setLogMsgs(prev => [
            ...prev,
            `[Orders] Circuit Breaker tripped on [Payment API] endpoint.`,
            `[Orders] Serving fallback: "Payments offline, queueing transaction."`,
            `[Gateway] Serving degraded UX gracefully. API remains ONLINE. Confidence high.`
          ]);
        }
      } else {
        setLogMsgs(prev => [...prev, `[Gateway] Rerouting endpoints. Degrading minor service feature.`]);
      }
    }, 1200);
  };

  const recoverCluster = () => {
    setServices(prev => prev.map(s => ({ ...s, status: 'healthy' })));
    setLogMsgs([
      '[Chaos-Manager] Executing cluster automated healing sequence...',
      '[Cluster] Re-initializing services pods, scaling targets back to healthy.',
      '[Cluster] Status: All systems operational!'
    ]);
  };

  return (
    <div className="space-y-4" id="chaos-monkey-simulator">
      <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-white">Chaos Engineering & Circuit Breaker Sandbox</h3>
          <p className="text-xs text-slate-400">Inject random service outages to observe cascading failures vs resilient architecture patterns</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Chaos dashboard controls */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-white block mb-1">Chaos Monkey Control Station</span>
            <p className="text-[10px] text-slate-400 mb-3">Deliberately severing components proves your fail-safes are working as intended</p>
            
            {/* Resilience Toggles */}
            <div className="bg-slate-900 p-2.5 rounded border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Resilience Circuit Breakers</span>
                <span className="text-[9px] text-slate-500">Fails fast instead of letting threads hang downstream</span>
              </div>
              <button 
                onClick={() => setCircuitBreaker(!circuitBreaker)}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                  circuitBreaker 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-red-950/60 border border-red-900 text-red-300'
                }`}
              >
                {circuitBreaker ? 'Enabled (Safe)' : 'Disabled (Risky)'}
              </button>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button 
              onClick={killRandomService}
              className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-1.5 px-3 rounded flex-1 flex items-center justify-center gap-1.5"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Release Chaos Monkey</span>
            </button>
            <button 
              onClick={recoverCluster}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold py-1.5 px-3 rounded flex-1"
            >
              Heal Cluster
            </button>
          </div>
        </div>

        {/* Live Topology map */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between min-h-[180px]">
          <span className="text-xs font-bold text-slate-400 block border-b border-slate-800 pb-1 mb-2">Cluster Node Topology</span>
          
          <div className="flex-1 grid grid-cols-3 gap-2 items-center">
            {services.map(svc => {
              let svcClass = 'border-emerald-600/50 bg-emerald-950/10 text-emerald-300';
              if (svc.status === 'dead') {
                svcClass = 'border-red-500 bg-red-950/20 text-red-300 animate-pulse';
              }

              return (
                <div key={svc.name} className={`p-2 rounded border text-center transition-all ${svcClass}`}>
                  <span className="text-[10px] font-bold block">{svc.label}</span>
                  <span className="text-[8px] opacity-70 block mt-0.5">{svc.status === 'healthy' ? 'Healthy' : 'CRASHED'}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Logs stream */}
      <div className="bg-slate-950 rounded-lg border border-slate-800 p-2.5 h-28 flex flex-col">
        <span className="text-xs font-mono font-bold text-red-400 mb-1">Chaos Monkey Event Stream</span>
        <div className="bg-slate-900/50 rounded p-2 overflow-y-auto font-mono text-[9px] text-slate-400 flex-1 space-y-0.5 scrollbar-thin">
          {logMsgs.map((msg, idx) => (
            <div key={idx} className={msg.includes('CASCADING') || msg.includes('CRITICAL') ? 'text-red-400 font-bold animate-pulse' : msg.includes('Circuit') || msg.includes('fallback') ? 'text-amber-400' : msg.includes('healthy') || msg.includes('Healing') ? 'text-emerald-400' : 'text-slate-400'}>
              {msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
