import React, { useState, useEffect } from 'react';
import { Send, Server, Database, RefreshCw, Layers, Cpu, HelpCircle, ArrowRight, CheckCircle, AlertCircle, Play } from 'lucide-react';

interface SimulatorProps {
  questionId: number;
}

export default function CoreSimulator({ questionId }: SimulatorProps) {
  // Common states
  const [activeTab, setActiveTab] = useState<string>('info');

  // Q1 States: Transfer Representation
  const [q1Entity, setQ1Entity] = useState<'users' | 'products' | 'orders'>('users');
  const [q1Format, setQ1Format] = useState<'json' | 'xml' | 'html'>('json');
  const [q1Transmitting, setQ1Transmitting] = useState(false);
  const [q1Output, setQ1Output] = useState<string>('');

  // Q2 States: REST Constraints
  const [q2Constraint, setQ2Constraint] = useState<string>('stateless');

  // Q3 States: Statelessness Server Crash Test
  const [q3SessionMode, setQ3SessionMode] = useState<'stateful' | 'stateless'>('stateful');
  const [q3ServerOnline, setQ3ServerOnline] = useState(true);
  const [q3CartItems, setQ3CartItems] = useState<string[]>([]);
  const [q3Logs, setQ3Logs] = useState<string[]>(['System initialized. Session Server Online.']);

  // Q4 States: Resource Tree
  const [q4Path, setQ4Path] = useState<string>('/users');

  // Q13 States: HATEOAS Checkout
  const [q13Status, setQ13Status] = useState<'cart' | 'unpaid' | 'paid' | 'shipped' | 'cancelled'>('cart');
  const [q13Logs, setQ13Logs] = useState<string[]>(['Cart opened. Ready to checkout.']);

  // Q18 States: Over/Under Fetching
  const [q18Mode, setQ18Mode] = useState<'rest' | 'graphql' | 'sparse'>('rest');

  // Q20 States: URL Naming
  const [q20Answers, setQ20Answers] = useState<Record<string, string>>({
    getUsers: '',
    deleteUser: '',
    updateBook: ''
  });
  const [q20Checked, setQ20Checked] = useState(false);

  // Q35 States: REST vs RPC
  const [q35Action, setQ35Action] = useState<'ban' | 'create' | 'list'>('ban');

  // Q36 States: N+1 Query
  const [q36Running, setQ36Running] = useState(false);
  const [q36Mode, setQ36Mode] = useState<'n1' | 'eager'>('n1');
  const [q36Steps, setQ36Steps] = useState<string[]>([]);
  const [q36Time, setQ36Time] = useState<number>(0);

  // Transmit Handler Q1
  const triggerQ1Transmit = () => {
    setQ1Transmitting(true);
    setQ1Output('Encoding payload...');
    setTimeout(() => {
      let payload = '';
      if (q1Format === 'json') {
        payload = q1Entity === 'users' 
          ? '{\n  "id": 42,\n  "name": "Alice Smith",\n  "role": "Lead Engineer"\n}'
          : q1Entity === 'products'
          ? '{\n  "sku": "KB-882",\n  "name": "Mechanical Keyboard",\n  "stock": 14\n}'
          : '{\n  "id": 1092,\n  "total_usd": 129.99,\n  "status": "processing"\n}';
      } else if (q1Format === 'xml') {
        payload = q1Entity === 'users'
          ? '<user>\n  <id>42</id>\n  <name>Alice Smith</name>\n  <role>Lead Engineer</role>\n</user>'
          : q1Entity === 'products'
          ? '<product>\n  <sku>KB-882</sku>\n  <name>Mechanical Keyboard</name>\n  <stock>14</stock>\n</product>'
          : '<order>\n  <id>1092</id>\n  <total_usd>129.99</total_usd>\n  <status>processing</status>\n</order>';
      } else {
        payload = q1Entity === 'users'
          ? '<div class="user-card">\n  <h3>Alice Smith</h3>\n  <p>Lead Engineer</p>\n</div>'
          : q1Entity === 'products'
          ? '<div class="product">\n  <h2>Mechanical Keyboard</h2>\n  <span>$129.99</span>\n</div>'
          : '<div class="order">\n  <p>Order #1092: processing</p>\n</div>';
      }
      setQ1Output(payload);
      setQ1Transmitting(false);
    }, 1000);
  };

  // Q3 handlers
  const handleQ3Add = (item: string) => {
    setQ3CartItems(prev => [...prev, item]);
    if (q3SessionMode === 'stateful') {
      setQ3Logs(prev => [...prev, `[Client] POST /cart {"item": "${item}"}`, `[Server-SessionStore] Saved "${item}" to active session ID_8820`]);
    } else {
      const currentCart = [...q3CartItems, item];
      const encodedToken = btoa(JSON.stringify({ cart: currentCart, user: 'dev_user' })).substring(0, 15);
      setQ3Logs(prev => [...prev, `[Client] POST /cart {"item": "${item}"} + Bearer jwt_header.${encodedToken}`, `[Server-Stateless] Decrypted token successfully. Appended "${item}". Sent back new JWT.`]);
    }
  };

  const restartQ3Server = () => {
    setQ3ServerOnline(false);
    setQ3Logs(prev => [...prev, `🔥 SERVER CRITICAL: Server crashed and restarted! RAM Session store is cleared.`]);
    setTimeout(() => {
      setQ3ServerOnline(true);
      setQ3Logs(prev => [...prev, `🟢 SERVER STATUS: Server online. RAM store fully empty.`]);
    }, 1500);
  };

  const handleQ3Checkout = () => {
    if (!q3ServerOnline) {
      setQ3Logs(prev => [...prev, `❌ Network Error: Server currently offline.`]);
      return;
    }
    if (q3SessionMode === 'stateful') {
      setQ3Logs(prev => [...prev, `[Client] GET /checkout (Sending Session Cookie ID_8820)`]);
      // Stateful session was cleared on server reboot
      setQ3Logs(prev => [...prev, `❌ SERVER ERROR 500: Session ID_8820 not found in Memory. Your cart is lost! Please log in again.`]);
      setQ3CartItems([]);
    } else {
      const encodedToken = btoa(JSON.stringify({ cart: q3CartItems, user: 'dev_user' })).substring(0, 15);
      setQ3Logs(prev => [...prev, `[Client] GET /checkout + Bearer jwt_header.${encodedToken}`]);
      setQ3Logs(prev => [...prev, `✅ SUCCESS 200: Decrypted JWT containing [${q3CartItems.join(', ')}]. Order processed successfully! Statelessness saved the day!`]);
      setQ3CartItems([]);
    }
  };

  // Q36 N+1 simulation
  const runQ36Sim = () => {
    setQ36Running(true);
    setQ36Steps([]);
    let timer = 0;
    setQ3TimeCounter(0);

    const logs: string[] = [];
    if (q36Mode === 'n1') {
      logs.push('1. GET /articles -> Fetching index of 5 articles...');
      setTimeout(() => {
        setQ36Steps([...logs]);
        setQ3TimeCounter(120);
        
        // Fetch article authors
        let delay = 1000;
        const authors = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve'];
        authors.forEach((author, idx) => {
          setTimeout(() => {
            logs.push(`   -> [Request ${idx+2}/6] GET /users/${idx+1} (Fetching Author: ${author})`);
            setQ36Steps([...logs]);
            setQ3TimeCounter(120 + (idx + 1) * 100);
            if (idx === authors.length - 1) {
              logs.push('🎉 Done! Made 6 total network requests to display 5 articles.');
              setQ36Steps([...logs]);
              setQ36Running(false);
            }
          }, delay * (idx + 1) * 0.4);
        });
      }, 500);
    } else {
      logs.push('1. GET /articles?include=author -> Requesting index + author info in a single eager-load database query...');
      setTimeout(() => {
        setQ36Steps([...logs]);
        setQ3TimeCounter(140);
        setTimeout(() => {
          logs.push('✅ SUCCESS 200: Loaded all 5 articles with their nested author biographies embedded in a single JSON payload.');
          logs.push('🎉 Done! Made exactly 1 network request.');
          setQ36Steps([...logs]);
          setQ36Running(false);
        }, 800);
      }, 500);
    }
  };

  const [q3TimeCounter, setQ3TimeCounter] = useState(0);

  // Trigger initial values
  useEffect(() => {
    triggerQ1Transmit();
  }, [q1Entity, q1Format]);

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Simulation Workspace Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Q1: Representational State Transfer representation engine */}
        {questionId === 1 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-[#1a1a1a] p-3 rounded border border-[#222222]">
              <div className="space-y-1">
                <label className="text-[10px] text-[#c9a44e] uppercase font-bold">Select Resource Entity</label>
                <div className="flex space-x-1">
                  {(['users', 'products', 'orders'] as const).map(entity => (
                    <button
                      key={entity}
                      onClick={() => setQ1Entity(entity)}
                      className={`px-3 py-1 text-xs rounded border transition-all ${q1Entity === entity ? 'bg-[#c9a44e]/10 border-[#c9a44e] text-white' : 'bg-transparent border-[#333333] text-[#888888]'}`}
                    >
                      {entity}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#c9a44e] uppercase font-bold">Select Format</label>
                <div className="flex space-x-1">
                  {(['json', 'xml', 'html'] as const).map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => setQ1Format(fmt)}
                      className={`px-3 py-1 text-xs uppercase rounded border transition-all ${q1Format === fmt ? 'bg-[#c9a44e]/10 border-[#c9a44e] text-white' : 'bg-transparent border-[#333333] text-[#888888]'}`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#050505] p-3 rounded-lg border border-[#222222] min-h-[160px] relative">
              <span className="absolute top-2 right-2 text-[9px] text-[#555555] font-mono uppercase">State Representation</span>
              <pre className="text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
                {q1Transmitting ? '// Transmitting states...' : q1Output}
              </pre>
            </div>

            <div className="flex items-center space-x-2 bg-[#c9a44e]/5 border border-[#c9a44e]/10 p-3 rounded text-xs text-[#bbbbbb]">
              <RefreshCw className={`w-4 h-4 text-[#c9a44e] ${q1Transmitting ? 'animate-spin' : ''}`} />
              <p>The client requests a <strong>Resource Representation</strong>. The server serializes the internal DB row into {q1Format.toUpperCase()} and transfers it.</p>
            </div>
          </div>
        )}

        {/* Q2: REST Principles Constraints Visualizer */}
        {questionId === 2 && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'stateless', label: 'Stateless' },
                { id: 'clientserver', label: 'Client-Server' },
                { id: 'cache', label: 'Cacheable' },
                { id: 'uniform', label: 'Uniform Intf' },
                { id: 'layered', label: 'Layered Sys' },
                { id: 'ondemand', label: 'Code-on-Demand' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setQ2Constraint(item.id)}
                  className={`py-2 px-1 text-[10px] font-semibold rounded border transition-all truncate text-center ${q2Constraint === item.id ? 'bg-[#c9a44e]/20 border-[#c9a44e] text-white' : 'bg-[#121212] border-[#222222] text-[#888888] hover:border-[#333333]'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="bg-[#151515] p-4 rounded-xl border border-[#222222] space-y-3 min-h-[180px]">
              {q2Constraint === 'stateless' && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider text-[#c9a44e]">Stateless Constraint</h4>
                  <p className="text-xs text-[#888888] leading-relaxed">Each request must contain everything necessary to understand the context. There is no context stored in the server memory.</p>
                  <div className="flex items-center justify-between bg-[#0a0a0a] p-3 rounded border border-[#222222] text-xs font-mono">
                    <span className="text-cyan-400">Request + Token</span>
                    <span className="text-yellow-500">→</span>
                    <span className="text-cyan-400">Database Verify</span>
                    <span className="text-yellow-500">→</span>
                    <span className="text-emerald-400">Success 200</span>
                  </div>
                </div>
              )}
              {q2Constraint === 'clientserver' && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider text-[#c9a44e]">Client-Server Separation</h4>
                  <p className="text-xs text-[#888888] leading-relaxed">Separation of concerns allows components to evolve independently. The user interface lives on the client, data persistence lives on the server.</p>
                  <div className="grid grid-cols-2 gap-4 text-center text-xs text-[#aaaaaa]">
                    <div className="bg-[#0a0a0a] p-2 rounded border border-[#222222]">
                      <div className="font-bold text-[#c9a44e]">Client Frontend</div>
                      <div className="text-[10px] text-[#555555]">UI, CSS, DOM, Routing</div>
                    </div>
                    <div className="bg-[#0a0a0a] p-2 rounded border border-[#222222]">
                      <div className="font-bold text-[#c9a44e]">Server Backend</div>
                      <div className="text-[10px] text-[#555555]">SQL, Jobs, Security, Auth</div>
                    </div>
                  </div>
                </div>
              )}
              {q2Constraint === 'cache' && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider text-[#c9a44e]">Cacheability Constraint</h4>
                  <p className="text-xs text-[#888888] leading-relaxed">Responses must explicitly tag themselves as cacheable or non-cacheable. Good caching drastically improves client rendering speed and removes server load.</p>
                  <div className="bg-[#0a0a0a] p-3 rounded border border-[#222222] text-xs font-mono text-cyan-300">
                    <div>Cache-Control: public, max-age=86400</div>
                    <div>ETag: "w/sku-992a01bf"</div>
                  </div>
                </div>
              )}
              {q2Constraint === 'uniform' && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider text-[#c9a44e]">Uniform Interface</h4>
                  <p className="text-xs text-[#888888] leading-relaxed">Standard routes and structures across the entire api. Identification of resources, manipulation of resources, and HATEOAS links.</p>
                  <div className="bg-[#0a0a0a] p-2 rounded border border-[#222222] text-[10px] text-[#bbbbbb] font-mono">
                    <div className="text-[#c9a44e]">GET /api/v1/users</div>
                    <div className="text-[#c9a44e]">POST /api/v1/users</div>
                    <div className="text-[#c9a44e]">DELETE /api/v1/users/:id</div>
                  </div>
                </div>
              )}
              {q2Constraint === 'layered' && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider text-[#c9a44e]">Layered System</h4>
                  <p className="text-xs text-[#888888] leading-relaxed">A client cannot tell if they are communicating with the server directly or via a proxy, content delivery network (CDN), or a security gateway layer.</p>
                  <div className="flex items-center justify-between text-[10px] font-mono bg-[#0a0a0a] p-2 rounded border border-[#222222] text-[#888888]">
                    <span>Client</span>
                    <span>→</span>
                    <span className="text-[#c9a44e]">Cloudflare CDN</span>
                    <span>→</span>
                    <span className="text-[#c9a44e]">Load Balancer</span>
                    <span>→</span>
                    <span>Server</span>
                  </div>
                </div>
              )}
              {q2Constraint === 'ondemand' && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider text-[#c9a44e]">Code on Demand (Optional)</h4>
                  <p className="text-xs text-[#888888] leading-relaxed">The server can send executable code (like javascript bundles or client-side widgets) dynamically to enrich client-side rendering capabilities.</p>
                  <div className="bg-[#0a0a0a] p-2 rounded border border-[#222222] text-[10px] text-cyan-300 font-mono">
                    {'const renderWidget = () => { console.log("Hydrated on Client!") };'}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Q3: Statelessness Server Crash Test */}
        {questionId === 3 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-[#1a1a1a] p-2.5 rounded border border-[#222222]">
              <div className="flex space-x-1.5">
                <button
                  onClick={() => {
                    setQ3SessionMode('stateful');
                    setQ3CartItems([]);
                    setQ3Logs(['Switched to Stateful Session. Cookie ID_8820 mapped in server RAM.']);
                  }}
                  className={`px-3 py-1 text-xs rounded border transition-all ${q3SessionMode === 'stateful' ? 'bg-red-500/10 border-red-500 text-red-200' : 'bg-transparent border-[#333333] text-[#888888]'}`}
                >
                  Stateful (Session RAM)
                </button>
                <button
                  onClick={() => {
                    setQ3SessionMode('stateless');
                    setQ3CartItems([]);
                    setQ3Logs(['Switched to Stateless API. JWT encoded on Client, decrypted on server on the fly.']);
                  }}
                  className={`px-3 py-1 text-xs rounded border transition-all ${q3SessionMode === 'stateless' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-200' : 'bg-transparent border-[#333333] text-[#888888]'}`}
                >
                  Stateless (JWT token)
                </button>
              </div>
              <button
                onClick={restartQ3Server}
                disabled={!q3ServerOnline}
                className="px-2 py-1 text-[10px] bg-red-600 hover:bg-red-700 text-white font-mono uppercase tracking-tighter rounded disabled:opacity-50"
              >
                Reboot Server 🚨
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#151515] p-3 rounded-xl border border-[#222222] space-y-2">
                <div className="text-[10px] uppercase font-bold text-[#c9a44e]">Add to Cart (Client)</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {['🍵 Green Tea', '☕ Espresso', '🥐 Croissant'].map(item => (
                    <button
                      key={item}
                      onClick={() => handleQ3Add(item.split(' ')[1])}
                      className="py-2 text-[10px] bg-[#222222] border border-[#333333] rounded hover:border-[#c9a44e] text-white"
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <div className="text-[9px] uppercase text-[#555555] font-bold">Cart Items:</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {q3CartItems.length === 0 ? (
                      <span className="text-xs text-[#555555] italic">Cart is empty</span>
                    ) : (
                      q3CartItems.map((item, i) => (
                        <span key={i} className="px-2 py-0.5 bg-[#c9a44e]/10 text-[#c9a44e] border border-[#c9a44e]/20 rounded text-[10px]">
                          {item}
                        </span>
                      ))
                    )}
                  </div>
                </div>
                <button
                  onClick={handleQ3Checkout}
                  disabled={q3CartItems.length === 0}
                  className="w-full mt-3 py-1.5 bg-[#c9a44e] text-black font-semibold text-xs rounded hover:bg-[#b08e3e] transition-colors disabled:opacity-40"
                >
                  Checkout Order
                </button>
              </div>

              <div className="bg-[#050505] p-3 rounded-xl border border-[#222222] flex flex-col justify-between h-[190px]">
                <div className="text-[10px] uppercase font-bold text-[#888888] border-b border-[#222222] pb-1 flex justify-between items-center">
                  <span>Server Console Logs</span>
                  <span className={`w-2.5 h-2.5 rounded-full ${q3ServerOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                </div>
                <div className="flex-1 overflow-y-auto font-mono text-[9px] text-[#888888] space-y-1 mt-1 pr-1">
                  {q3Logs.map((log, i) => (
                    <div key={i} className={log.startsWith('❌') ? 'text-red-400' : log.startsWith('✅') ? 'text-emerald-400' : log.startsWith('🔥') ? 'text-cyan-400 font-bold' : ''}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Q4: Resource Navigation Mapping */}
        {questionId === 4 && (
          <div className="space-y-3">
            <div className="bg-[#151515] p-3 rounded-lg border border-[#222222] flex justify-between items-center text-xs font-mono">
              <span className="text-[#888888]">Current URI:</span>
              <span className="text-white bg-[#0a0a0a] px-3 py-1 rounded border border-[#333333] text-[#c9a44e] font-bold">
                {q4Path}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0d0d0d] p-3 rounded-lg border border-[#222222] space-y-1">
                <div className="text-[10px] uppercase font-bold text-[#555555] mb-2">Available resource endpoints</div>
                {[
                  { label: '/users', desc: 'User Catalog Collection' },
                  { label: '/users/42', desc: 'Specific User Row' },
                  { label: '/users/42/orders', desc: 'Orders belonging to Alice' },
                  { label: '/users/42/orders/1092', desc: 'Order transaction #1092' }
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={() => setQ4Path(item.label)}
                    className={`w-full text-left p-2 rounded text-xs transition-colors flex flex-col ${q4Path === item.label ? 'bg-[#c9a44e]/10 border border-[#c9a44e]/30 text-white' : 'hover:bg-[#1a1a1a] text-[#888888]'}`}
                  >
                    <span className="font-mono text-[#c9a44e]">{item.label}</span>
                    <span className="text-[10px] text-[#555555]">{item.desc}</span>
                  </button>
                ))}
              </div>

              <div className="bg-[#050505] p-3 rounded-lg border border-[#222222] flex flex-col justify-between">
                <div className="text-[10px] uppercase font-bold text-[#555555] mb-2">Entity Representation</div>
                <pre className="text-[10px] font-mono text-cyan-300 leading-relaxed overflow-x-auto whitespace-pre">
                  {q4Path === '/users' && '[\n  { "id": 42, "username": "alice" },\n  { "id": 43, "username": "bob" }\n]'}
                  {q4Path === '/users/42' && '{\n  "id": 42,\n  "username": "alice",\n  "email": "alice@gmail.com"\n}'}
                  {q4Path === '/users/42/orders' && '[\n  { "orderId": 1092, "total": 129.99 },\n  { "orderId": 1093, "total": 45.50 }\n]'}
                  {q4Path === '/users/42/orders/1092' && '{\n  "orderId": 1092,\n  "items_count": 2,\n  "total_usd": 129.99,\n  "gateway": "stripe"\n}'}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Q13: HATEOAS State Navigator Checkout Engine */}
        {questionId === 13 && (
          <div className="space-y-3">
            <div className="bg-[#151515] p-3 rounded-xl border border-[#222222] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#888888]">Current Application Status:</span>
                <span className={`px-2 py-0.5 text-[10px] uppercase rounded font-bold ${q13Status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' : q13Status === 'cancelled' ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                  {q13Status}
                </span>
              </div>

              <div className="bg-[#050505] p-3 rounded border border-[#222222] text-xs font-mono text-cyan-300 leading-relaxed space-y-2">
                <div className="text-[9px] text-[#555555] uppercase font-bold">HATEOAS JSON Response Links:</div>
                <pre className="text-[10px]">
                  {q13Status === 'cart' && JSON.stringify({
                    id: 9918,
                    status: 'cart_draft',
                    _links: {
                      self: { href: '/carts/9918' },
                      checkout: { href: '/carts/9918/checkout' }
                    }
                  }, null, 2)}
                  {q13Status === 'unpaid' && JSON.stringify({
                    id: 9918,
                    status: 'unpaid_order',
                    total: 45.00,
                    _links: {
                      self: { href: '/orders/9918' },
                      pay: { href: '/orders/9918/payments' },
                      cancel: { href: '/orders/9918/cancel' }
                    }
                  }, null, 2)}
                  {q13Status === 'paid' && JSON.stringify({
                    id: 9918,
                    status: 'paid',
                    total: 45.00,
                    _links: {
                      self: { href: '/orders/9918' },
                      track_delivery: { href: '/orders/9918/shipping' }
                    }
                  }, null, 2)}
                  {q13Status === 'cancelled' && JSON.stringify({
                    id: 9918,
                    status: 'cancelled',
                    _links: {
                      shop_again: { href: '/products' }
                    }
                  }, null, 2)}
                </pre>
              </div>

              <div className="space-y-1.5">
                <div className="text-[9px] uppercase text-[#555555] font-bold">Discovered HATEOAS Dynamic Actions (Client):</div>
                <div className="flex gap-2">
                  {q13Status === 'cart' && (
                    <button
                      onClick={() => {
                        setQ13Status('unpaid');
                        setQ13Logs(prev => [...prev, 'POST /carts/9918/checkout', 'Created order #9918. Status set to Unpaid. Links updated.']);
                      }}
                      className="px-3 py-1 bg-[#c9a44e] text-black font-semibold text-xs rounded hover:bg-[#b08e3e]"
                    >
                      Follow Link: checkout ➜
                    </button>
                  )}
                  {q13Status === 'unpaid' && (
                    <>
                      <button
                        onClick={() => {
                          setQ13Status('paid');
                          setQ13Logs(prev => [...prev, 'POST /orders/9918/payments', 'Payment received. Order Paid. Links updated with delivery tracker.']);
                        }}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded"
                      >
                        Follow Link: pay ➜
                      </button>
                      <button
                        onClick={() => {
                          setQ13Status('cancelled');
                          setQ13Logs(prev => [...prev, 'POST /orders/9918/cancel', 'Order cancelled. Refund or log file processed. Link updated.']);
                        }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded"
                      >
                        Follow Link: cancel ➜
                      </button>
                    </>
                  )}
                  {q13Status === 'paid' && (
                    <div className="text-xs text-emerald-400 italic font-mono flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Tracking shipment via /orders/9918/shipping dynamically!</span>
                    </div>
                  )}
                  {q13Status === 'cancelled' && (
                    <button
                      onClick={() => {
                        setQ13Status('cart');
                        setQ13Logs(['Resetting cart workflow.']);
                      }}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold text-xs rounded"
                    >
                      Follow Link: shop_again ➜
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Q18: Over-fetching vs Under-fetching */}
        {questionId === 18 && (
          <div className="space-y-3">
            <div className="flex bg-[#1a1a1a] p-1.5 rounded border border-[#222222]">
              {(['rest', 'sparse', 'graphql'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setQ18Mode(mode)}
                  className={`flex-1 py-1 text-xs capitalize rounded transition-all ${q18Mode === mode ? 'bg-[#c9a44e] text-black font-semibold' : 'text-[#888888] hover:text-white'}`}
                >
                  {mode === 'rest' ? 'Standard REST' : mode === 'sparse' ? 'Sparse REST' : 'GraphQL'}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#050505] p-3 rounded border border-[#222222] h-[150px] flex flex-col justify-between">
                <div className="text-[10px] text-[#555555] uppercase font-bold">URI Requested</div>
                <div className="text-xs font-mono text-yellow-300">
                  {q18Mode === 'rest' && 'GET /api/v1/users/42'}
                  {q18Mode === 'sparse' && 'GET /api/v1/users/42?fields=name,avatar'}
                  {q18Mode === 'graphql' && 'POST /graphql \n\n{\n  user(id: 42) {\n    name\n    avatar\n  }\n}'}
                </div>
                <div className="mt-2 text-xs text-[#888888]">
                  {q18Mode === 'rest' && 'Returns user info including billing, settings, address history. Over-fetches fields.'}
                  {q18Mode === 'sparse' && 'Filters attributes on the server. RESTful solution to over-fetching.'}
                  {q18Mode === 'graphql' && 'Only fetches client-specified parameters. Compact and single round-trip.'}
                </div>
              </div>

              <div className="bg-[#151515] p-3 rounded border border-[#222222] flex flex-col justify-around text-center">
                <div>
                  <div className="text-[10px] text-[#888888] uppercase font-bold">Transfer Payload Cost</div>
                  <div className={`text-2xl font-bold font-mono ${q18Mode === 'rest' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {q18Mode === 'rest' ? '12.8 KB' : q18Mode === 'sparse' ? '1.4 KB' : '0.8 KB'}
                  </div>
                </div>
                <div className="border-t border-[#222222] pt-2">
                  <div className="text-[10px] text-[#888888] uppercase font-bold">Redundant Attributes</div>
                  <div className="text-xs font-mono text-white">
                    {q18Mode === 'rest' ? '82% of data unneeded' : '0% (Clean)'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Q20: REST Naming Conventions Laundry */}
        {questionId === 20 && (
          <div className="space-y-3">
            <div className="bg-[#151515] p-3 rounded-xl border border-[#222222] space-y-3">
              <div className="text-xs text-[#888888]">Type the proper RESTful equivalent for these RPC-style URLs:</div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-red-400 line-through">POST /api/getUsers</span>
                  <input
                    type="text"
                    placeholder="e.g. GET /users"
                    value={q20Answers.getUsers}
                    onChange={e => setQ20Answers({...q20Answers, getUsers: e.target.value})}
                    className="bg-[#0a0a0a] border border-[#333333] px-2 py-1 text-xs rounded text-white focus:border-[#c9a44e] outline-none w-36 text-center"
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-red-400 line-through">POST /api/deleteUser/42</span>
                  <input
                    type="text"
                    placeholder="e.g. DELETE /users/42"
                    value={q20Answers.deleteUser}
                    onChange={e => setQ20Answers({...q20Answers, deleteUser: e.target.value})}
                    className="bg-[#0a0a0a] border border-[#333333] px-2 py-1 text-xs rounded text-white focus:border-[#c9a44e] outline-none w-36 text-center"
                  />
                </div>
              </div>

              <button
                onClick={() => setQ20Checked(true)}
                className="w-full py-1 bg-[#c9a44e] hover:bg-[#b08e3e] text-black font-semibold text-xs rounded transition-colors"
              >
                Wash to REST 🧼
              </button>

              {q20Checked && (
                <div className="bg-[#0a0a0a] p-2.5 rounded border border-[#222222] text-[10px] text-[#aaaaaa] font-mono space-y-1">
                  <div>getUsers: {q20Answers.getUsers.toLowerCase().trim() === 'get /users' ? '✅ Correct! Plural noun collection.' : '❌ Try "GET /users"'}</div>
                  <div>deleteUser: {q20Answers.deleteUser.toLowerCase().trim() === 'delete /users/42' ? '✅ Correct! Standard HTTP Verb DELETE.' : '❌ Try "DELETE /users/42"'}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Q35: REST vs RPC Showdown */}
        {questionId === 35 && (
          <div className="space-y-3">
            <div className="flex bg-[#1a1a1a] p-1.5 rounded border border-[#222222] space-x-1">
              {(['ban', 'create', 'list'] as const).map(action => (
                <button
                  key={action}
                  onClick={() => setQ35Action(action)}
                  className={`flex-1 py-1 text-xs uppercase rounded transition-all ${q35Action === action ? 'bg-[#c9a44e]/20 border border-[#c9a44e]/50 text-white font-bold' : 'text-[#888888] hover:text-white bg-transparent border-transparent'}`}
                >
                  {action === 'ban' ? 'Ban User' : action === 'create' ? 'Create User' : 'List Users'}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#151515] p-3 rounded-xl border border-[#222222] space-y-2">
                <div className="text-[10px] text-[#c9a44e] font-bold uppercase tracking-widest border-b border-[#222222] pb-1">RPC Style</div>
                <div className="font-mono text-[11px] text-red-300">
                  {q35Action === 'ban' && 'POST /api/users/banUser\n\n{\n  "id": 83\n}'}
                  {q35Action === 'create' && 'POST /api/users/createUser\n\n{\n  "name": "Jane"\n}'}
                  {q35Action === 'list' && 'POST /api/users/getAllUsers'}
                </div>
                <p className="text-[10px] text-[#555555]">URLs act as verbs triggering backend remote execution endpoints.</p>
              </div>

              <div className="bg-[#151515] p-3 rounded-xl border border-[#222222] space-y-2">
                <div className="text-[10px] text-[#c9a44e] font-bold uppercase tracking-widest border-b border-[#222222] pb-1">RESTful Style</div>
                <div className="font-mono text-[11px] text-emerald-300">
                  {q35Action === 'ban' && 'PATCH /api/users/83\n\n{\n  "status": "banned"\n}'}
                  {q35Action === 'create' && 'POST /api/users\n\n{\n  "name": "Jane"\n}'}
                  {q35Action === 'list' && 'GET /api/users'}
                </div>
                <p className="text-[10px] text-[#555555]">URLs identify the resources (nouns); the HTTP verbs dictate actions.</p>
              </div>
            </div>
          </div>
        )}

        {/* Q36: N+1 Query Problem Simulator */}
        {questionId === 36 && (
          <div className="space-y-3">
            <div className="flex bg-[#1a1a1a] p-1.5 rounded border border-[#222222] justify-between items-center">
              <div className="flex space-x-1">
                <button
                  onClick={() => { setQ36Mode('n1'); setQ36Steps([]); }}
                  className={`px-3 py-1 text-xs rounded transition-all ${q36Mode === 'n1' ? 'bg-red-500/10 border border-red-500/40 text-red-300 font-bold' : 'text-[#888888] hover:text-white'}`}
                >
                  N+1 Mode
                </button>
                <button
                  onClick={() => { setQ36Mode('eager'); setQ36Steps([]); }}
                  className={`px-3 py-1 text-xs rounded transition-all ${q36Mode === 'eager' ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 font-bold' : 'text-[#888888] hover:text-white'}`}
                >
                  Eager Loading Mode
                </button>
              </div>
              <button
                onClick={runQ36Sim}
                disabled={q36Running}
                className="px-3 py-1 bg-[#c9a44e] hover:bg-[#b08e3e] text-black font-semibold text-xs rounded flex items-center space-x-1"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Run Demo</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-3 bg-[#050505] p-3 rounded border border-[#222222] min-h-[140px] flex flex-col justify-between">
                <div className="text-[10px] text-[#555555] uppercase font-bold border-b border-[#222222] pb-1">Network HTTP waterfall Trace</div>
                <div className="flex-1 font-mono text-[9px] text-[#888888] space-y-1 overflow-y-auto mt-2 max-h-[100px]">
                  {q36Steps.length === 0 ? (
                    <span className="italic text-[#555555]">Click "Run Demo" to simulate API requests flow</span>
                  ) : (
                    q36Steps.map((step, i) => (
                      <div key={i} className={step.includes('✅') || step.includes('🎉') ? 'text-emerald-400 font-semibold' : ''}>
                        {step}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="col-span-2 bg-[#151515] p-3 rounded border border-[#222222] flex flex-col justify-around text-center">
                <div>
                  <span className="text-[10px] text-[#555555] uppercase font-bold">Total Network Latency</span>
                  <div className={`text-2xl font-bold font-mono ${q36Mode === 'n1' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {q3TimeCounter === 0 ? '--' : `${q3TimeCounter} ms`}
                  </div>
                </div>
                <div className="border-t border-[#222222] pt-2">
                  <span className="text-[10px] text-[#555555] uppercase font-bold">Client Roundtrips</span>
                  <div className="text-sm font-semibold font-mono text-white">
                    {q36Mode === 'n1' ? '6 separate calls' : '1 single call'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Simulator Footer Indicator */}
      <div className="bg-[#111111] p-3.5 border-t border-[#222222] shrink-0 flex items-center space-x-2 text-[10px] text-[#888888] rounded-b-xl">
        <Cpu className="w-4 h-4 text-[#c9a44e]" />
        <span><strong>Concept {questionId} Active Simulator:</strong> Interactive state models updating locally. Click controls to inspect network telemetry.</span>
      </div>
    </div>
  );
}
