import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Server, Cloud, Shield, Network, Database, 
  RefreshCw, Cpu, HardDrive, Trash2, Zap, ArrowRight,
  AlertTriangle, CheckCircle, Info, Users, DollarSign, Clock
} from 'lucide-react';

interface DiagramProps {
  category: string;
  questionId: number;
}

export default function InteractiveDiagrams({ category, questionId }: DiagramProps) {
  // We can choose which simulator to render based on the active question's category or override for specific questions.
  let activeSimulator = 'global';
  if (category === 'Global Infrastructure') activeSimulator = 'global';
  else if (category === 'Compute & Containers') activeSimulator = 'compute';
  else if (category === 'Storage & CDN') activeSimulator = 'storage';
  else if (category === 'Networking & VPC') activeSimulator = 'vpc';
  else if (category === 'Databases & Caching') activeSimulator = 'database';
  else if (category === 'Security & IAM') activeSimulator = 'iam';
  else if (category === 'Serverless & Integration') activeSimulator = 'serverless';
  else if (category === 'DevOps & IaC') activeSimulator = 'devops';
  else if (category === 'Architecture & Cost') activeSimulator = 'architecture';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 backdrop-blur-md rounded-full border border-slate-700/50">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-mono text-slate-400 font-medium tracking-wider uppercase">Interactive Simulator</span>
      </div>

      <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2 font-mono">
        <Zap className="w-4 h-4 text-amber-400" />
        {activeSimulator === 'global' && "Multi-Region Global Infrastructure Simulator"}
        {activeSimulator === 'compute' && "EC2 Auto-Scaling & ALB Load Balancer"}
        {activeSimulator === 'storage' && "S3 Intelligent Tiering & Storage Lifecycle"}
        {activeSimulator === 'vpc' && "VPC Networking & Packet Tracer (Public vs Private)"}
        {activeSimulator === 'database' && "RDS Multi-AZ Failover & Redis Cache Hit Engine"}
        {activeSimulator === 'iam' && "IAM Least-Privilege Policy Evaluator"}
        {activeSimulator === 'serverless' && "Event-Driven SQS & SNS Decoupling pipeline"}
        {activeSimulator === 'devops' && "Blue-Green & Canary Weighted Traffic Router"}
        {activeSimulator === 'architecture' && "Disaster Recovery RTO / RPO Cost Planner"}
      </h3>

      <div className="min-h-[340px] flex flex-col justify-between">
        {activeSimulator === 'global' && <GlobalSimulator />}
        {activeSimulator === 'compute' && <ComputeSimulator />}
        {activeSimulator === 'storage' && <StorageSimulator />}
        {activeSimulator === 'vpc' && <VpcSimulator />}
        {activeSimulator === 'database' && <DatabaseSimulator />}
        {activeSimulator === 'iam' && <IamSimulator />}
        {activeSimulator === 'serverless' && <ServerlessSimulator />}
        {activeSimulator === 'devops' && <DevopsSimulator />}
        {activeSimulator === 'architecture' && <ArchitectureSimulator />}
      </div>
    </div>
  );
}

/* ============================================================================
   1. GLOBAL INFRASTRUCTURE SIMULATOR
   ============================================================================ */
function GlobalSimulator() {
  const [activeRegion, setActiveRegion] = useState<'us' | 'eu' | 'ap'>('us');
  const [usAzCount, setUsAzCount] = useState(3);
  const [isDisaster, setIsDisaster] = useState(false);
  const [packets, setPackets] = useState<{ id: number; startX: number; endX: number }[]>([]);

  const regions = {
    us: { name: 'us-east-1 (N. Virginia)', lat: '30ms', azs: ['us-east-1a', 'us-east-1b', 'us-east-1c'] },
    eu: { name: 'eu-west-1 (Ireland)', lat: '85ms', azs: ['eu-west-1a', 'eu-west-1b', 'eu-west-1c'] },
    ap: { name: 'ap-northeast-1 (Tokyo)', lat: '140ms', azs: ['ap-northeast-1a', 'ap-northeast-1b'] },
  };

  const triggerPacket = () => {
    const id = Date.now();
    setPackets((prev) => [...prev, { id, startX: 10, endX: 280 }]);
    setTimeout(() => {
      setPackets((prev) => prev.filter((p) => p.id !== id));
    }, 1200);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(regions) as Array<keyof typeof regions>).map((key) => (
          <button
            key={key}
            onClick={() => { setActiveRegion(key); setIsDisaster(false); }}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-all text-left border ${
              activeRegion === key 
                ? 'bg-indigo-950/60 text-indigo-200 border-indigo-700 shadow-lg' 
                : 'bg-slate-800/40 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className="font-mono font-bold uppercase">{key.toUpperCase()} Region</div>
            <div className="text-[10px] opacity-75">{regions[key].name}</div>
          </button>
        ))}
      </div>

      <div className="bg-slate-950/80 rounded-lg p-4 border border-slate-800/80 relative min-h-[180px] flex items-center justify-center">
        {/* World Map Background simulation */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Inbound users */}
          <div className="flex flex-col items-center justify-center border-r border-slate-800/40 pr-4 relative">
            <Users className="w-10 h-10 text-indigo-400 mb-2" />
            <span className="text-xs text-slate-300 font-medium">Global User Requests</span>
            <span className="text-[10px] font-mono text-indigo-300 mt-1">Average Latency: {regions[activeRegion].lat}</span>
            <button 
              onClick={triggerPacket} 
              className="mt-3 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-medium flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 active:scale-95"
            >
              <Play className="w-3 h-3 fill-current" /> Send Request
            </button>
          </div>

          {/* Active Region view */}
          <div className="flex flex-col items-center relative">
            <span className="text-xs font-mono font-bold text-slate-400 mb-2 uppercase">{regions[activeRegion].name}</span>
            
            <div className="flex gap-2">
              {regions[activeRegion].azs.map((az, idx) => {
                const isDown = isDisaster && idx === 0;
                return (
                  <motion.div
                    key={az}
                    animate={isDown ? { scale: [1, 0.98, 1], opacity: 0.3 } : { scale: 1, opacity: 1 }}
                    className={`flex flex-col items-center p-2.5 rounded border ${
                      isDown 
                        ? 'bg-rose-950/30 border-rose-900/60 text-rose-400' 
                        : 'bg-slate-900/90 border-slate-700 text-emerald-400'
                    }`}
                  >
                    <Server className={`w-6 h-6 ${isDown ? 'text-rose-500' : 'text-emerald-500'} mb-1`} />
                    <span className="text-[9px] font-mono text-slate-300">{az}</span>
                    <span className="text-[8px] font-mono mt-0.5 opacity-80 uppercase">
                      {isDown ? "🔥 Dead" : "● Online"}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setIsDisaster(!isDisaster)}
                className={`px-3 py-1 rounded text-[10px] font-bold font-mono transition-all flex items-center gap-1 border ${
                  isDisaster 
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800' 
                    : 'bg-rose-950 text-rose-300 border-rose-900 hover:bg-rose-900/80'
                }`}
              >
                <AlertTriangle className="w-3 h-3" />
                {isDisaster ? "Restore Availability Zone" : "Simulate AZ Disaster"}
              </button>
            </div>
          </div>
        </div>

        {/* Animated packet nodes */}
        {packets.map((p) => (
          <motion.div
            key={p.id}
            initial={{ left: "20%", opacity: 0.9 }}
            animate={{ left: "68%", opacity: [0.9, 1, 0] }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute w-2 h-2 rounded-full bg-indigo-400 shadow-md shadow-indigo-400/50 top-1/2"
          />
        ))}
      </div>

      <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-800/20 p-3 rounded-lg border border-slate-800">
        <span className="font-semibold text-slate-300">AWS Infrastructure Concept:</span> Regions are vast areas containing physically separate data centers called AZs. Deploying across multiple AZs (Multi-AZ) ensures that if one zone fails (e.g. us-east-1a during our disaster simulation), secondary nodes in us-east-1b & 1c seamlessly absorb 100% of the workload without downtime.
      </div>
    </div>
  );
}

/* ============================================================================
   2. COMPUTE & CONTAINERS SIMULATOR (EC2 AUTO-SCALING)
   ============================================================================ */
function ComputeSimulator() {
  const [cpuLoad, setCpuLoad] = useState(30);
  const [instances, setInstances] = useState<number[]>([1, 2]);

  useEffect(() => {
    // Scaling Logic:
    // CPU < 40: 2 instances
    // CPU 40 - 75: 3 instances
    // CPU > 75: 4 instances
    let targetCount = 2;
    if (cpuLoad > 75) targetCount = 5;
    else if (cpuLoad > 40) targetCount = 3;

    if (instances.length < targetCount) {
      // Scale out
      const newId = Date.now();
      setInstances((prev) => [...prev, newId]);
    } else if (instances.length > targetCount) {
      // Scale in
      setInstances((prev) => prev.slice(0, prev.length - 1));
    }
  }, [cpuLoad]);

  return (
    <div className="space-y-4">
      {/* Load Controller Slider */}
      <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-mono font-medium text-slate-300">Simulate Target Application CPU Load</span>
            <span className={`text-xs font-mono font-bold ${cpuLoad > 75 ? 'text-rose-400' : cpuLoad > 45 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {cpuLoad}% Avg CPU
            </span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={cpuLoad} 
            onChange={(e) => setCpuLoad(Number(e.target.value))}
            className="w-full accent-indigo-500 bg-slate-800 rounded-lg appearance-none h-1.5 cursor-pointer"
          />
        </div>
      </div>

      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 relative min-h-[180px] flex flex-col justify-center">
        {/* Network diagram of ALB & Auto-scaling group */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          {/* User Requests */}
          <div className="flex flex-col items-center p-3 border border-slate-800/80 rounded bg-slate-900/50">
            <Users className="w-8 h-8 text-indigo-400 mb-1.5" />
            <span className="text-[10px] text-slate-300 font-semibold font-mono uppercase">User Traffic</span>
            <span className="text-[9px] text-slate-500 font-mono mt-0.5">HTTP/HTTPS requests</span>
            <span className="text-[9px] text-emerald-400 font-mono mt-1 font-bold animate-pulse">● Active Ingress</span>
          </div>

          {/* Elastic Load Balancer */}
          <div className="flex flex-col items-center p-3 border border-indigo-900/40 rounded bg-indigo-950/20 relative">
            <RefreshCw className="w-8 h-8 text-indigo-400 mb-1.5 animate-spin-slow" />
            <span className="text-[10px] text-slate-300 font-bold font-mono uppercase">Application Load Balancer</span>
            <span className="text-[9px] text-indigo-300 font-mono mt-0.5">Layer-7 Router</span>
            <div className="text-[8px] bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-slate-300 mt-2 font-mono">
              Targets: {instances.length} Active
            </div>
          </div>

          {/* Auto Scaling EC2 Instances */}
          <div className="border border-emerald-950/60 rounded bg-emerald-950/5 p-3 flex flex-col items-center min-h-[140px] justify-center relative">
            <span className="text-[9px] font-mono font-bold text-slate-500 mb-2 uppercase">EC2 Auto Scaling Group</span>
            
            <div className="grid grid-cols-2 gap-2 w-full">
              <AnimatePresence>
                {instances.map((id, index) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex flex-col items-center justify-center p-2 rounded bg-slate-900 border border-emerald-800/80"
                  >
                    <Cpu className="w-5 h-5 text-emerald-400 mb-1" />
                    <span className="text-[8px] font-mono text-slate-300">ec2-node-{index + 1}</span>
                    <span className="text-[7px] text-emerald-500 font-mono uppercase font-bold mt-0.5">HEALTHY</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-800/20 p-3 rounded-lg border border-slate-800">
        <span className="font-semibold text-slate-300">Compute Auto-Scaling Rule:</span> When application CPU averages high load (drag the slider above &gt; 45% or &gt; 75%), CloudWatch triggers Auto Scaling to boot fresh EC2 nodes dynamically. The Elastic Load Balancer (ALB) conducts instant health checks and begins proxying traffic to them safely.
      </div>
    </div>
  );
}

/* ============================================================================
   3. STORAGE & CDN SIMULATOR (S3 LIFECYCLE)
   ============================================================================ */
function StorageSimulator() {
  const [day, setDay] = useState(1);

  // Derive class/cost based on days
  let s3Class = 'S3 Standard';
  let costPerGB = 0.023;
  let accessDelay = 'Instant (ms)';
  let desc = 'Frequent access, high availability storage for raw hot files.';

  if (day > 180) {
    s3Class = 'S3 Glacier Deep Archive';
    costPerGB = 0.00099;
    accessDelay = '12 Hours';
    desc = 'Maximum discount cold storage. Used for regulatory archiving and audit backups.';
  } else if (day > 90) {
    s3Class = 'S3 Glacier Flexible';
    costPerGB = 0.0036;
    accessDelay = '3 - 5 Hours';
    desc = 'Low-cost cold backup storage with flexible, asynchronous retrieval times.';
  } else if (day > 30) {
    s3Class = 'S3 Standard-IA';
    costPerGB = 0.0125;
    accessDelay = 'Instant (ms)';
    desc = 'Infrequent Access. Lower storage fee, but has an immediate per-GB data access fee.';
  }

  const savingsPercent = Math.round(((0.023 - costPerGB) / 0.023) * 100);

  return (
    <div className="space-y-4">
      {/* Day Slider */}
      <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-mono font-medium text-slate-300">File Age Timeline Simulator</span>
            <span className="text-xs font-mono font-bold text-indigo-400">Day {day} of object life</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="365" 
            value={day} 
            onChange={(e) => setDay(Number(e.target.value))}
            className="w-full accent-indigo-500 bg-slate-800 rounded-lg appearance-none h-1.5 cursor-pointer"
          />
        </div>
      </div>

      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 relative min-h-[180px] flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* File Card representation */}
          <div className="flex flex-col items-center justify-center p-4 border border-slate-800 bg-slate-900/60 rounded-lg relative overflow-hidden">
            <motion.div
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="relative p-3 bg-slate-800 border border-slate-700 rounded shadow-md"
            >
              <HardDrive className={`w-10 h-10 ${day > 180 ? 'text-blue-500' : day > 90 ? 'text-teal-400' : day > 30 ? 'text-amber-400' : 'text-indigo-400'} mb-1`} />
              <div className="w-8 h-1 bg-slate-600 rounded mx-auto" />
            </motion.div>
            <span className="text-[11px] font-mono text-slate-300 mt-2 font-bold">backup_database_v1.tar.gz</span>
            <span className="text-[10px] text-slate-500 mt-1 font-mono">1,000 GB Object Size</span>
          </div>

          {/* Active S3 Class metrics */}
          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Active Storage Class</span>
              <span className="text-sm font-mono font-bold text-slate-200 flex items-center gap-2">
                <Cloud className="w-4 h-4 text-sky-400 animate-pulse" />
                {s3Class}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-900/40 p-2 rounded border border-slate-800/60">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Storage Cost / GB</span>
                <span className="text-xs font-mono font-bold text-slate-300">${costPerGB} / mo</span>
              </div>
              <div className="bg-slate-900/40 p-2 rounded border border-slate-800/60">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Retrieval Time</span>
                <span className="text-xs font-mono font-bold text-slate-300">{accessDelay}</span>
              </div>
            </div>

            <div className="bg-indigo-950/20 border border-indigo-900/50 p-2.5 rounded-lg">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-indigo-300">Cost Savings:</span>
                <span className="text-emerald-400 font-bold">-{savingsPercent}% Save</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-800/20 p-3 rounded-lg border border-slate-800">
        <span className="font-semibold text-slate-300">S3 Lifecycle Concept:</span> S3 Lifecycle rules automatically transition objects over time. Dragging the timeline slider shifts the object from Standard ($23.00/TB) to Standard-IA ($12.50/TB) at Day 30, Glacier ($3.60/TB) at Day 90, and Deep Archive ($0.99/TB) at Day 180—saving up to 95% in raw monthly storage overhead!
      </div>
    </div>
  );
}

/* ============================================================================
   4. NETWORKING & VPC SIMULATOR
   ============================================================================ */
function VpcSimulator() {
  const [packetType, setPacketType] = useState<'inbound' | 'outbound'>('inbound');
  const [allowSecurityGroup, setAllowSecurityGroup] = useState(true);
  const [tracerPath, setTracerPath] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('Ready');

  const runTracer = () => {
    setStatus('Sending packet...');
    if (packetType === 'inbound') {
      // Flow: Internet -> IGW -> Public Subnet -> Security Group -> EC2 Instance
      setTracerPath(['internet', 'igw', 'public_subnet']);
      setTimeout(() => {
        if (allowSecurityGroup) {
          setTracerPath(['internet', 'igw', 'public_subnet', 'sec_group', 'ec2_instance']);
          setStatus('Success: Packet reached EC2 server!');
        } else {
          setTracerPath(['internet', 'igw', 'public_subnet', 'sec_group_block']);
          setStatus('Blocked: Security Group rejected traffic!');
        }
      }, 1000);
    } else {
      // Flow: EC2 Instance (Private) -> Private Subnet -> NAT Gateway (Public Subnet) -> IGW -> Internet
      setTracerPath(['private_ec2', 'private_subnet', 'nat_gateway', 'igw', 'internet']);
      setTimeout(() => {
        setStatus('Success: Private server initiated software update outbound!');
      }, 1200);
    }
  };

  useEffect(() => {
    setTracerPath([]);
    setStatus('Ready');
  }, [packetType, allowSecurityGroup]);

  return (
    <div className="space-y-4">
      {/* Route Direction Selector */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setPacketType('inbound')}
          className={`px-3 py-1.5 text-xs font-semibold rounded transition-all border ${
            packetType === 'inbound' 
              ? 'bg-indigo-950 text-indigo-200 border-indigo-800' 
              : 'bg-slate-800/40 text-slate-400 border-slate-800'
          }`}
        >
          Inbound (Client request to API)
        </button>
        <button
          onClick={() => setPacketType('outbound')}
          className={`px-3 py-1.5 text-xs font-semibold rounded transition-all border ${
            packetType === 'outbound' 
              ? 'bg-indigo-950 text-indigo-200 border-indigo-800' 
              : 'bg-slate-800/40 text-slate-400 border-slate-800'
          }`}
        >
          Outbound (Private server updates)
        </button>
      </div>

      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 min-h-[200px] flex flex-col justify-between">
        {/* Network Diagram mapping */}
        <div className="flex flex-wrap gap-2 items-center justify-center py-2 relative">
          
          {/* Node: Internet */}
          <div className={`p-2 rounded border text-center text-[10px] font-mono transition-all ${
            tracerPath.includes('internet') ? 'bg-indigo-950 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-500'
          }`}>
            <Network className="w-5 h-5 mx-auto mb-1" />
            Internet
          </div>

          <ArrowRight className="w-3 h-3 text-slate-700" />

          {/* Node: IGW */}
          <div className={`p-2 rounded border text-center text-[10px] font-mono transition-all ${
            tracerPath.includes('igw') ? 'bg-indigo-950 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-500'
          }`}>
            <RefreshCw className="w-5 h-5 mx-auto mb-1" />
            Internet Gateway
          </div>

          <ArrowRight className="w-3 h-3 text-slate-700" />

          {/* Node: Public Subnet */}
          <div className={`p-2 rounded border text-center text-[10px] font-mono transition-all ${
            tracerPath.includes('public_subnet') ? 'bg-indigo-950 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-500'
          }`}>
            <Cloud className="w-5 h-5 mx-auto mb-1" />
            Public Subnet
          </div>

          <ArrowRight className="w-3 h-3 text-slate-700" />

          {packetType === 'inbound' ? (
            <>
              {/* Node: Security Group */}
              <div className={`p-2 rounded border text-center text-[10px] font-mono transition-all ${
                tracerPath.includes('sec_group') || tracerPath.includes('sec_group_block')
                  ? allowSecurityGroup ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-rose-950 border-rose-500 text-rose-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                <Shield className="w-5 h-5 mx-auto mb-1" />
                Security Group
              </div>

              <ArrowRight className="w-3 h-3 text-slate-700" />

              {/* Node: EC2 Instance */}
              <div className={`p-2 rounded border text-center text-[10px] font-mono transition-all ${
                tracerPath.includes('ec2_instance') ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                <Server className="w-5 h-5 mx-auto mb-1" />
                EC2 Server
              </div>
            </>
          ) : (
            <>
              {/* Node: NAT Gateway */}
              <div className={`p-2 rounded border text-center text-[10px] font-mono transition-all ${
                tracerPath.includes('nat_gateway') ? 'bg-indigo-950 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                <RefreshCw className="w-5 h-5 mx-auto mb-1" />
                NAT Gateway
              </div>

              <ArrowRight className="w-3 h-3 text-slate-700" />

              {/* Node: Private Subnet EC2 */}
              <div className={`p-2 rounded border text-center text-[10px] font-mono transition-all ${
                tracerPath.includes('private_ec2') ? 'bg-indigo-950 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                <Server className="w-5 h-5 mx-auto mb-1" />
                Private EC2
              </div>
            </>
          )}

        </div>

        {/* Console outputs and control actions */}
        <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded border border-slate-800">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] font-mono text-slate-300">{status}</span>
          </div>

          <div className="flex items-center gap-3">
            {packetType === 'inbound' && (
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={allowSecurityGroup} 
                  onChange={(e) => setAllowSecurityGroup(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-0"
                />
                <span className="text-[10px] font-mono text-slate-400">Allow Security Group (Port 80)</span>
              </label>
            )}

            <button 
              onClick={runTracer}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold uppercase tracking-wider"
            >
              Trace Packet
            </button>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-800/20 p-3 rounded-lg border border-slate-800">
        <span className="font-semibold text-slate-300">VPC Packet Concept:</span> Public subnets point to an Internet Gateway (IGW) directly. For private subnets (e.g. database servers), outbound queries are routed to a NAT Gateway inside the public subnet to get patches safely, while completely denying direct incoming connection scans.
      </div>
    </div>
  );
}

/* ============================================================================
   5. DATABASE & CACHING SIMULATOR
   ============================================================================ */
function DatabaseSimulator() {
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const [isPrimaryAlive, setIsPrimaryAlive] = useState(true);
  const [latency, setLatency] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev.slice(0, 4)]);
  };

  const handleQuery = () => {
    if (!isPrimaryAlive) {
      addLog("❌ ERROR: Connection Timeout. Primary RDS database is offline.");
      setLatency(0);
      return;
    }

    if (cacheEnabled) {
      addLog("🟢 CACHE HIT: Retrieved catalog data directly from ElastiCache Redis.");
      setLatency(1);
    } else {
      addLog("🟡 CACHE MISS: Polled database transactions directly from RDS PostgreSQL.");
      setLatency(85);
    }
  };

  const handleFailover = () => {
    setIsPrimaryAlive(false);
    addLog("⚠️ FAILURE DETECTED: Primary RDS Node down. Initiating RDS Multi-AZ Failover...");
    setTimeout(() => {
      setIsPrimaryAlive(true);
      addLog("🔄 FAILOVER COMPLETE: Pointed connection DNS records to hot-standby Node in secondary AZ.");
    }, 3000);
  };

  return (
    <div className="space-y-4">
      {/* Configuration Switches */}
      <div className="grid grid-cols-2 gap-3 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input 
            type="checkbox" 
            checked={cacheEnabled} 
            onChange={(e) => setCacheEnabled(e.target.checked)}
            className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-0"
          />
          <span className="text-xs font-mono text-slate-300">Enable ElastiCache (Redis)</span>
        </label>

        <button
          onClick={handleFailover}
          disabled={!isPrimaryAlive}
          className="px-3 py-1 bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded text-[10px] font-bold font-mono uppercase tracking-wider disabled:opacity-50"
        >
          Simulate RDS Node Crash
        </button>
      </div>

      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 relative min-h-[180px] flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* ElastiCache Redis Node */}
          <div className={`p-3 rounded border text-center transition-all ${
            cacheEnabled ? 'bg-indigo-950/40 border-indigo-700 text-indigo-200' : 'bg-slate-900/40 border-slate-800 text-slate-600'
          }`}>
            <Database className="w-8 h-8 mx-auto mb-1.5" />
            <span className="text-[10px] font-mono font-bold uppercase block">ElastiCache</span>
            <span className="text-[8px] font-mono uppercase">{cacheEnabled ? "● ACTIVE CACHE" : "○ DISABLED"}</span>
          </div>

          {/* Primary RDS Postgres */}
          <div className={`p-3 rounded border text-center transition-all ${
            isPrimaryAlive ? 'bg-emerald-950/30 border-emerald-700 text-emerald-200' : 'bg-rose-950/40 border-rose-900 text-rose-400'
          }`}>
            <Database className="w-8 h-8 mx-auto mb-1.5" />
            <span className="text-[10px] font-mono font-bold uppercase block">RDS PRIMARY</span>
            <span className="text-[8px] font-mono uppercase">{isPrimaryAlive ? "● ONLINE" : "💥 FAILOVER IN PROGRESS"}</span>
          </div>

          {/* Secondary RDS Standby */}
          <div className="p-3 rounded border border-slate-800 bg-slate-900/40 text-center text-slate-500">
            <Database className="w-8 h-8 mx-auto mb-1.5" />
            <span className="text-[10px] font-mono font-bold uppercase block">RDS STANDBY</span>
            <span className="text-[8px] font-mono uppercase">Synchronous Hot copy</span>
          </div>
        </div>

        {/* Live latency result */}
        <div className="mt-4 flex justify-between items-center border-t border-slate-800/80 pt-3">
          <button 
            onClick={handleQuery}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold uppercase"
          >
            Execute User Read Query
          </button>

          <span className="text-[11px] font-mono text-slate-300">
            Query Latency: <strong className={latency === 1 ? 'text-emerald-400' : latency > 0 ? 'text-amber-400' : 'text-rose-500'}>{latency}ms</strong>
          </span>
        </div>
      </div>

      {/* Terminal log panel */}
      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 font-mono text-[9px] text-slate-400 space-y-1 h-20 overflow-y-auto">
        {logs.length === 0 ? "Terminal console waiting for commands..." : logs.map((log, i) => <div key={i}>{log}</div>)}
      </div>
    </div>
  );
}

/* ============================================================================
   6. IAM LEAST-PRIVILEGE SIMULATOR
   ============================================================================ */
function IamSimulator() {
  const [role, setRole] = useState<'admin' | 'developer' | 'intern'>('developer');
  const [action, setAction] = useState<string>('ec2:DescribeInstances');
  const [evaluation, setEvaluation] = useState<'ALLOW' | 'DENY' | 'PENDING'>('PENDING');

  const policy = {
    admin: { allowed: ['*'], deny: [] },
    developer: { allowed: ['ec2:DescribeInstances', 'ec2:StartInstances', 'ec2:StopInstances'], deny: ['ec2:TerminateInstances'] },
    intern: { allowed: ['ec2:DescribeInstances'], deny: ['ec2:StartInstances', 'ec2:StopInstances', 'ec2:TerminateInstances'] }
  };

  const evaluatePolicy = () => {
    setEvaluation('PENDING');
    setTimeout(() => {
      const allowedActions = policy[role].allowed;
      const isAllowed = allowedActions.includes('*') || allowedActions.includes(action);
      setEvaluation(isAllowed ? 'ALLOW' : 'DENY');
    }, 400);
  };

  useEffect(() => {
    setEvaluation('PENDING');
  }, [role, action]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Step 1: Select Principal */}
        <div>
          <label className="text-[10px] font-mono uppercase text-slate-500 mb-1 block">1. Select IAM Principal Role</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as any)}
            className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
          >
            <option value="admin">IAM Admin User (Full Access)</option>
            <option value="developer">Developer Role (Scoped Access)</option>
            <option value="intern">ReadOnly Intern (Least Privilege)</option>
          </select>
        </div>

        {/* Step 2: Select Action */}
        <div>
          <label className="text-[10px] font-mono uppercase text-slate-500 mb-1 block">2. Select Action to Evaluate</label>
          <select 
            value={action} 
            onChange={(e) => setAction(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
          >
            <option value="ec2:DescribeInstances">ec2:DescribeInstances (List servers)</option>
            <option value="ec2:StartInstances">ec2:StartInstances (Start server)</option>
            <option value="ec2:TerminateInstances">ec2:TerminateInstances (Delete server)</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 min-h-[160px] flex flex-col justify-between items-center">
        <div className="w-full flex justify-between items-center border-b border-slate-800/80 pb-3">
          <span className="text-[10px] font-mono text-slate-400">AWS Identity Evaluator JSON Engine</span>
          <button 
            onClick={evaluatePolicy}
            className="px-4 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold uppercase"
          >
            Evaluate Request
          </button>
        </div>

        {/* Decision result board */}
        <div className="my-4 text-center">
          <span className="text-[9px] font-mono text-slate-500 uppercase block mb-1">IAM Permission Decision</span>
          
          <AnimatePresence mode="wait">
            {evaluation === 'ALLOW' && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-950/50 border border-emerald-500/80 rounded-full text-emerald-400 font-mono font-bold text-sm tracking-wide shadow-lg shadow-emerald-950/50"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                ALLOW ACCESS
              </motion.div>
            )}

            {evaluation === 'DENY' && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                className="inline-flex items-center gap-2 px-6 py-2 bg-rose-950/50 border border-rose-500/80 rounded-full text-rose-400 font-mono font-bold text-sm tracking-wide shadow-lg shadow-rose-950/50"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                DENY ACCESS (403 Unauthorized)
              </motion.div>
            )}

            {evaluation === 'PENDING' && (
              <div className="text-xs font-mono text-slate-500 animate-pulse">
                Click Evaluate to request policy decision...
              </div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full text-left font-mono text-[9px] text-slate-500 bg-slate-900/60 p-2 rounded">
          {`{ "Effect": "${evaluation === 'ALLOW' ? 'Allow' : evaluation === 'DENY' ? 'Deny' : 'Unknown'}", "Principal": "arn:aws:iam::user/${role}", "Action": "${action}" }`}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   7. SERVERLESS & INTEGRATION SIMULATOR
   ============================================================================ */
function ServerlessSimulator() {
  const [messages, setMessages] = useState<number>(0);
  const [processing, setProcessing] = useState(false);
  const [isFifo, setIsFifo] = useState(false);
  const [queueList, setQueueList] = useState<string[]>([]);

  const handleOrder = () => {
    setMessages((prev) => prev + 1);
    const orderId = `#ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setQueueList((prev) => [...prev, orderId]);
  };

  const handleProcess = () => {
    if (queueList.length === 0) return;
    setProcessing(true);
    
    // Process top element
    setTimeout(() => {
      setQueueList((prev) => {
        if (isFifo) {
          // FIFO: Remove first (index 0)
          return prev.slice(1);
        } else {
          // Standard best-effort: random or last element
          const next = [...prev];
          next.pop();
          return next;
        }
      });
      setMessages((prev) => Math.max(0, prev - 1));
      setProcessing(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      {/* Configuration Switches */}
      <div className="grid grid-cols-2 gap-3 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input 
            type="checkbox" 
            checked={isFifo} 
            onChange={(e) => { setIsFifo(e.target.checked); setQueueList([]); setMessages(0); }}
            className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-0"
          />
          <span className="text-xs font-mono text-slate-300">Set SQS queue to FIFO mode</span>
        </label>

        <button 
          onClick={handleOrder}
          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold uppercase"
        >
          Publish 'OrderPlaced' Event
        </button>
      </div>

      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 min-h-[180px] flex flex-col justify-center relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          {/* SNS Topic */}
          <div className="p-3 rounded border border-indigo-900 bg-indigo-950/20 text-center">
            <Zap className="w-8 h-8 text-indigo-400 mx-auto mb-1.5" />
            <span className="text-[10px] font-mono font-bold uppercase block">SNS TOPIC</span>
            <span className="text-[8px] text-slate-400 block font-mono">OrderCreatedTopic</span>
          </div>

          {/* SQS Queue */}
          <div className="p-3 rounded border border-slate-800 bg-slate-900/60 text-center relative min-h-[120px] flex flex-col justify-between">
            <span className="text-[10px] font-mono font-bold uppercase block">SQS QUEUE {isFifo && "(FIFO)"}</span>
            
            {/* Visual Messages stack */}
            <div className="my-2 flex flex-col-reverse gap-1 items-center justify-center min-h-[40px]">
              {queueList.length === 0 ? (
                <span className="text-[9px] font-mono text-slate-600">Queue Empty</span>
              ) : (
                queueList.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="bg-slate-800 border border-slate-700 text-[8px] font-mono text-slate-300 px-2 py-0.5 rounded w-full">
                    {item}
                  </div>
                ))
              )}
            </div>

            <div className="text-[9px] font-mono text-indigo-300">
              Total Messages: {messages}
            </div>
          </div>

          {/* SQS Consumer Lambda */}
          <div className="p-3 rounded border border-emerald-950 bg-emerald-950/5 text-center">
            <Cpu className={`w-8 h-8 mx-auto mb-1.5 ${processing ? 'text-emerald-400 animate-spin-slow' : 'text-slate-600'}`} />
            <span className="text-[10px] font-mono font-bold uppercase block">Lambda Worker</span>
            <button 
              onClick={handleProcess}
              disabled={queueList.length === 0 || processing}
              className="mt-2 w-full py-0.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-35 text-[8px] font-bold font-mono text-slate-300 border border-slate-700 rounded"
            >
              {processing ? "PROCESSING..." : "CONSUME QUEUE"}
            </button>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-800/20 p-3 rounded-lg border border-slate-800">
        <span className="font-semibold text-slate-300">Decoupled Queue Concept:</span> SNS pushes messages immediately to subscriber queues (pub/sub). SQS stores messages securely until a Lambda consumer pulls them. This prevents heavy traffic spikes from taking down down-stream order database processors.
      </div>
    </div>
  );
}

/* ============================================================================
   8. DEVOPS & CI/CD SIMULATOR
   ============================================================================ */
function DevopsSimulator() {
  const [canaryWeight, setCanaryWeight] = useState(10);
  const [packets, setPackets] = useState<{ id: number; target: 'blue' | 'green' }[]>([]);

  const sendPackets = () => {
    const arr: typeof packets = [];
    for (let i = 0; i < 10; i++) {
      const target = Math.random() * 100 > canaryWeight ? 'blue' : 'green';
      arr.push({ id: Date.now() + i, target });
    }
    setPackets(arr);
    setTimeout(() => setPackets([]), 1500);
  };

  return (
    <div className="space-y-4">
      {/* Weighted Router Slider */}
      <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-mono font-medium text-slate-300">Weighted Canary Traffic Control</span>
            <span className="text-xs font-mono font-bold text-teal-400">
              {100 - canaryWeight}% Blue / {canaryWeight}% Green (Canary)
            </span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            step="5"
            value={canaryWeight} 
            onChange={(e) => setCanaryWeight(Number(e.target.value))}
            className="w-full accent-teal-500 bg-slate-800 rounded-lg appearance-none h-1.5 cursor-pointer"
          />
        </div>
      </div>

      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 relative min-h-[180px] flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          {/* Incoming Users */}
          <div className="flex flex-col items-center">
            <Users className="w-8 h-8 text-indigo-400 mb-1" />
            <span className="text-[10px] font-mono text-slate-300 uppercase block font-bold">Client Traffic</span>
            <button 
              onClick={sendPackets}
              className="mt-3 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold"
            >
              Simulate 10 Visitors
            </button>
          </div>

          {/* Router Node */}
          <div className="p-3 rounded border border-slate-800 bg-slate-900/60 text-center relative">
            <RefreshCw className="w-8 h-8 mx-auto mb-1 text-teal-400 animate-spin-slow" />
            <span className="text-[10px] font-mono font-bold uppercase block">Route 53 Weights</span>
            
            {/* Visual flowing packets */}
            {packets.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ left: "10%", top: "40%", opacity: 1 }}
                animate={{ 
                  left: p.target === 'blue' ? "100%" : "100%", 
                  top: p.target === 'blue' ? "10%" : "80%",
                  opacity: [1, 1, 0] 
                }}
                transition={{ duration: 1.2, delay: i * 0.05 }}
                className={`absolute w-1.5 h-1.5 rounded-full ${p.target === 'blue' ? 'bg-blue-400' : 'bg-emerald-400'} z-10`}
              />
            ))}
          </div>

          {/* Blue vs Green Targets */}
          <div className="space-y-2">
            {/* Blue Pool */}
            <div className="p-2.5 rounded border border-blue-900/50 bg-blue-950/20 flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-[9px] font-mono text-slate-300 uppercase font-bold">Stable Blue (v1.0)</span>
              </div>
              <span className="text-[9px] font-mono text-blue-300 font-bold">{100 - canaryWeight}% load</span>
            </div>

            {/* Green Pool */}
            <div className="p-2.5 rounded border border-emerald-900/50 bg-emerald-950/20 flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[9px] font-mono text-slate-300 uppercase font-bold">Canary Green (v2.0)</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-300 font-bold">{canaryWeight}% load</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   9. DISASTER RECOVERY & COST SIMULATOR
   ============================================================================ */
function ArchitectureSimulator() {
  const [drStrategy, setDrStrategy] = useState<'backup' | 'pilot' | 'warm' | 'active'>('pilot');

  const configs = {
    backup: { rto: '24 Hours', rpo: '12 Hours', cost: 100, desc: 'Nightly raw backup archives stored in cross-region S3 buckets. Cheapest strategy but slowest recovery delay.' },
    pilot: { rto: '4 Hours', rpo: '1 Hour', cost: 350, desc: 'Critical services (database replicas) are kept live in the backup region; lightweight servers are spun up on-demand during disaster.' },
    warm: { rto: '15 Mins', rpo: '1 Min', cost: 850, desc: 'A scaled-down copy of full app resources runs 24/7 in secondary region. Scaled up instantly when primary fails.' },
    active: { rto: 'Zero (ms)', rpo: 'Zero (ms)', cost: 2100, desc: 'Fully redundant multi-region active-active clusters. Incoming load balanced splits traffic across both countries globally.' }
  };

  return (
    <div className="space-y-4">
      {/* Strategy selector tabs */}
      <div className="grid grid-cols-4 gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
        {(Object.keys(configs) as Array<keyof typeof configs>).map((key) => (
          <button
            key={key}
            onClick={() => setDrStrategy(key)}
            className={`py-1 text-[9px] font-mono font-bold uppercase rounded transition-all ${
              drStrategy === key 
                ? 'bg-indigo-600 text-white' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 relative min-h-[180px] flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          
          {/* Recovery Time Objective Metric */}
          <div className="bg-slate-900/60 border border-slate-850 p-3 rounded-lg flex flex-col justify-center">
            <Clock className="w-6 h-6 text-indigo-400 mx-auto mb-1.5" />
            <span className="text-[10px] font-mono text-slate-500 uppercase block">RTO (Restoration Delay)</span>
            <span className="text-sm font-mono font-bold text-indigo-300 mt-1">{configs[drStrategy].rto}</span>
          </div>

          {/* Recovery Point Objective Metric */}
          <div className="bg-slate-900/60 border border-slate-850 p-3 rounded-lg flex flex-col justify-center">
            <Trash2 className="w-6 h-6 text-emerald-400 mx-auto mb-1.5" />
            <span className="text-[10px] font-mono text-slate-500 uppercase block">RPO (Max Data Loss)</span>
            <span className="text-sm font-mono font-bold text-emerald-300 mt-1">{configs[drStrategy].rpo}</span>
          </div>

          {/* Monthly Budget Metric */}
          <div className="bg-slate-900/60 border border-slate-850 p-3 rounded-lg flex flex-col justify-center">
            <DollarSign className="w-6 h-6 text-amber-400 mx-auto mb-1.5" />
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Simulated Monthly Cost</span>
            <span className="text-sm font-mono font-bold text-amber-300 mt-1">${configs[drStrategy].cost} / mo</span>
          </div>

        </div>

        {/* Dynamic description of active choice */}
        <div className="mt-4 p-2.5 bg-slate-900/50 rounded border border-slate-800/60 text-[10px] font-mono text-slate-400 text-left">
          <span className="font-bold text-slate-300 block mb-0.5 uppercase">Strategy Details:</span>
          {configs[drStrategy].desc}
        </div>
      </div>
    </div>
  );
}
