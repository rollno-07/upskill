import React, { useState, useEffect } from 'react';
import { 
  Database, RefreshCw, Key, Check, X, Shield, Lock, AlertTriangle, 
  Settings, ShoppingBag, Terminal, FileText, Code, CheckCircle, 
  TrendingUp, Layers, Filter, Trash2, Sliders, Send, CreditCard
} from 'lucide-react';

interface ExtendedSimulatorProps {
  questionId: number;
}

export default function ExtendedSimulators({ questionId }: ExtendedSimulatorProps) {
  // Q5: HTTP CRUD Mapping States
  const [q5SelectedMethod, setQ5SelectedMethod] = useState<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'>('GET');

  // Q6: PUT vs PATCH States
  const [q6Mode, setQ6Mode] = useState<'PUT' | 'PATCH'>('PUT');
  const [q6InputName, setQ6InputName] = useState('Alice Wonder');
  const [q6InputRole, setQ6InputRole] = useState('Senior DevOps');
  const [q6InputEmail, setQ6InputEmail] = useState(''); // Empty email in payload to test omission
  const [q6Result, setQ6Result] = useState({
    id: 12,
    name: 'Alice Wonder',
    role: 'Lead Architect',
    email: 'alice@company.com'
  });

  // Q7: Idempotency Tester States
  const [q7Method, setQ7Method] = useState<'POST' | 'PUT' | 'DELETE'>('POST');
  const [q7CallCount, setQ7CallCount] = useState(0);
  const [q7DbState, setQ7DbState] = useState<string[]>([]);
  const [q7Logs, setQ7Logs] = useState<string[]>([]);

  // Q9: Status Code Explorer States
  const [q9Category, setQ9Category] = useState<'2xx' | '3xx' | '4xx' | '5xx'>('2xx');
  const [q9SelectedCode, setQ9SelectedCode] = useState<number>(200);

  // Q10: 401 vs 403 Security Gate States
  const [q10Role, setQ10Role] = useState<'guest' | 'user' | 'admin'>('guest');
  const [q10Logs, setQ10Logs] = useState<string[]>(['System initialized. Choose a token credentials mode.']);

  // Q14: API Versioning Approaches
  const [q14Approach, setQ14Approach] = useState<'url' | 'header' | 'query'>('url');

  // Q15: Content Negotiation
  const [q15Accept, setQ15Accept] = useState<'application/json' | 'text/csv' | 'application/xml'>('application/json');

  // Q16: Idempotency Key Payment Gate
  const [q16KeyMode, setQ16KeyMode] = useState<'with_key' | 'without_key'>('with_key');
  const [q16Logs, setQ16Logs] = useState<string[]>([]);
  const [q16Balance, setQ16Balance] = useState(100);
  const [q16Key, setQ16Key] = useState('key-uuid-883a');

  // Q17: Pagination Simulator
  const [q17Mode, setQ17Mode] = useState<'offset' | 'cursor'>('offset');
  const [q17Page, setQ17Page] = useState(1);
  const [q17Cursor, setQ17Cursor] = useState<string | null>(null);
  const [q17ConcurrentInsert, setQ17ConcurrentInsert] = useState(false);
  const [q17Feed, setQ17Feed] = useState<any[]>([]);

  // Q19: Query Filters & Sorting
  const [q19FilterCategory, setQ19FilterCategory] = useState<string>('all');
  const [q19Sort, setQ19Sort] = useState<string>('price_asc');
  const [q19Products, setQ19Products] = useState([
    { id: 1, name: 'Quantum Keycap Set', category: 'accessories', price: 89, rating: 4.8 },
    { id: 2, name: 'Cybernetic Mouse', category: 'hardware', price: 129, rating: 4.5 },
    { id: 3, name: 'Infinite Scroll Wheel', category: 'hardware', price: 45, rating: 4.2 },
    { id: 4, name: 'Holographic Monitor Stand', category: 'furniture', price: 199, rating: 4.9 },
    { id: 5, name: 'Carbon Fiber Coaster', category: 'accessories', price: 19, rating: 4.0 },
  ]);

  // Q21: Structured Validation Error Builder
  const [q21Email, setQ21Email] = useState('invalid-email');
  const [q21Age, setQ21Age] = useState<number>(14);
  const [q21ErrorJson, setQ21ErrorJson] = useState<string>('');

  // Q22: Rate Limiter Token Bucket
  const [q22Tokens, setQ22Tokens] = useState(5);
  const [q22Logs, setQ22Logs] = useState<string[]>([]);
  const [q22Blocked, setQ22Blocked] = useState(false);

  // Q28: ETag Collision
  const [q28ClientA_ETag, setQ28ClientA_ETag] = useState('"v1"');
  const [q28ClientB_ETag, setQ28ClientB_ETag] = useState('"v1"');
  const [q28ServerETag, setQ28ServerETag] = useState('"v1"');
  const [q28ServerContent, setQ28ServerContent] = useState('Original Document Content');
  const [q28Logs, setQ28Logs] = useState<string[]>(['Server online. Document at revision "v1"']);

  // Q30: Async Task Polling
  const [q30Progress, setQ30Progress] = useState(0);
  const [q30Status, setQ30Status] = useState<'idle' | 'accepted' | 'processing' | 'completed'>('idle');
  const [q30Logs, setQ30Logs] = useState<string[]>([]);

  // Q32: Webhook Trigger
  const [q32Payload, setQ32Payload] = useState('{\n  "event": "invoice.paid",\n  "amount": 149.99\n}');
  const [q32Verified, setQ32Verified] = useState<'idle' | 'success' | 'failed'>('idle');
  const [q32Logs, setQ32Logs] = useState<string[]>([]);

  // Q37: Bulk Operations (207 Multi-Status)
  const [q37Items, setQ37Items] = useState([
    { id: 101, name: 'Draft Post #1', deletable: true, checked: true },
    { id: 102, name: 'Published Post #2 (Locked)', deletable: false, checked: true },
    { id: 103, name: 'Draft Post #3', deletable: true, checked: true }
  ]);
  const [q37Result, setQ37Result] = useState<string>('');

  // ----------------------------------------
  // Handlers Q6: PUT vs PATCH
  const triggerQ6Update = () => {
    if (q6Mode === 'PUT') {
      // PUT overwrites everything. If e.g. email isn't provided or is empty, it gets cleared/nulled out!
      setQ6Result({
        id: 12,
        name: q6InputName,
        role: q6InputRole,
        email: q6InputEmail || 'null' // Cleared out since PUT is replacement
      });
    } else {
      // PATCH updates only provided fields. Since email input was skipped, original value remains!
      setQ6Result(prev => ({
        ...prev,
        name: q6InputName || prev.name,
        role: q6InputRole || prev.role,
        email: q6InputEmail || prev.email // Retains original email if empty!
      }));
    }
  };

  // Handlers Q7: Idempotency Tester
  const triggerQ7Call = () => {
    setQ7CallCount(prev => prev + 1);
    if (q7Method === 'POST') {
      const newId = Math.floor(Math.random() * 900) + 100;
      setQ7DbState(prev => [...prev, `User #${newId}`]);
      setQ7Logs(prev => [
        `[Request] POST /users -> Created User #${newId}`,
        ...prev
      ]);
    } else if (q7Method === 'PUT') {
      // Replaces specific resource. Doing multiple times keeps state single
      setQ7DbState(['User #42 (Alice Updated)']);
      setQ7Logs(prev => [
        `[Request] PUT /users/42 -> Set name to Alice. System matches exactly 1 resource state.`,
        ...prev
      ]);
    } else if (q7Method === 'DELETE') {
      setQ7DbState([]);
      setQ7Logs(prev => [
        `[Request] DELETE /users/42 -> Removed user #42. Success state (resource is deleted).`,
        ...prev
      ]);
    }
  };

  // Q10 handlers
  const triggerQ10Request = (action: string) => {
    if (q10Role === 'guest') {
      setQ10Logs(prev => [
        `❌ HTTP 401 Unauthorized: Authorization Header Missing or Invalid Token. Please sign in!`,
        `[Client] GET ${action}`,
        ...prev
      ]);
    } else if (q10Role === 'user') {
      if (action.includes('/admin')) {
        setQ10Logs(prev => [
          `❌ HTTP 403 Forbidden: Identity verified, but regular "user" role lacks security clearance.`,
          `[Client] GET ${action} (Authorization: Bearer UserToken_JWT)`,
          ...prev
        ]);
      } else {
        setQ10Logs(prev => [
          `✅ HTTP 200 OK: Loaded dashboard for regular authenticated user successfully.`,
          `[Client] GET ${action} (Authorization: Bearer UserToken_JWT)`,
          ...prev
        ]);
      }
    } else {
      setQ10Logs(prev => [
        `✅ HTTP 200 OK: ADMIN ACCESS GRANTED to resource ${action}. Parameters executed.`,
        `[Client] GET ${action} (Authorization: Bearer AdminToken_JWT)`,
        ...prev
      ]);
    }
  };

  // Q16: Idempotency Key payments simulation
  const triggerQ16Payment = () => {
    if (q16KeyMode === 'with_key') {
      // If payment with same key was already processed, ignore second write
      const duplicate = q16Logs.some(log => log.includes(q16Key) && log.includes('Success'));
      if (duplicate) {
        setQ16Logs(prev => [
          `⚠️ [Idempotent HIT] Ignored duplicate payment processing for key ${q16Key}. Returned cached 201 response. Balance safe!`,
          `[Client Gateway Retry] POST /charges (Idempotency-Key: ${q16Key})`,
          ...prev
        ]);
      } else {
        setQ16Balance(prev => prev - 15);
        setQ16Logs(prev => [
          `✅ [Success 201] Paid $15. Token ${q16Key} registered. Balance updated to $${q16Balance - 15}.`,
          `[Client Network Send] POST /charges (Idempotency-Key: ${q16Key})`,
          ...prev
        ]);
      }
    } else {
      // No key - charging multiple times!
      setQ16Balance(prev => prev - 15);
      setQ16Logs(prev => [
        `🔥 [Charged! 201] Deducted $15. No idempotency check. Double charge occurred! Balance now $${q16Balance - 15}.`,
        `[Client Network Retry] POST /charges (No Idempotency-Key header)`,
        ...prev
      ]);
    }
  };

  // Q17: Pagination Loader
  useEffect(() => {
    // Generate initial items
    let base = [
      { id: 1, text: '💡 Post #1: Always modularize files' },
      { id: 2, text: '🔥 Post #2: Never expose keys to client' },
      { id: 3, text: '🍵 Post #3: Cache responses properly' },
      { id: 4, text: '🚀 Post #4: Keep endpoints noun-focused' },
      { id: 5, text: '⚙️ Post #5: Test with integration specs' },
    ];
    if (q17ConcurrentInsert) {
      // Insert item at the start (simulating database write by other user)
      base.unshift({ id: 0, text: '📢 NEW Post #0: Concurrent Insert Alert!' });
    }

    if (q17Mode === 'offset') {
      // Offset pagination uses slice limits
      const start = (q17Page - 1) * 2;
      setQ17Feed(base.slice(start, start + 2));
    } else {
      // Cursor pagination fetches relative to stable anchor
      if (!q17Cursor) {
        setQ17Feed(base.slice(0, 2));
      } else {
        const cursorId = parseInt(q17Cursor);
        const idx = base.findIndex(item => item.id === cursorId);
        if (idx !== -1) {
          setQ17Feed(base.slice(idx + 1, idx + 3));
        } else {
          setQ17Feed(base.slice(0, 2));
        }
      }
    }
  }, [q17Page, q17Cursor, q17Mode, q17ConcurrentInsert]);

  // Q21: Error response generator
  useEffect(() => {
    let errors: any[] = [];
    if (!q21Email.includes('@')) {
      errors.push({ field: 'email', reason: 'Value must represent a valid email layout.' });
    }
    if (q21Age < 18) {
      errors.push({ field: 'age', reason: 'Must be at least 18 years old to access endpoints.' });
    }

    if (errors.length > 0) {
      setQ21ErrorJson(JSON.stringify({
        type: 'https://api.knowledgenode.io/errors/validation-failed',
        title: 'Validation Failed Parameters',
        status: 400,
        code: 'ERR_VALID_009',
        invalid_params: errors
      }, null, 2));
    } else {
      setQ21ErrorJson('// Payload validated perfectly! Status Code: 200 OK');
    }
  }, [q21Email, q21Age]);

  // Q22: Rate limiter simulation
  const triggerQ22Call = () => {
    if (q22Tokens > 0) {
      setQ22Tokens(prev => prev - 1);
      setQ22Logs(prev => [
        `🟢 GET /api/v1/resource - Success. Token consumed (${q22Tokens - 1}/5 remaining)`,
        ...prev
      ]);
    } else {
      setQ22Logs(prev => [
        `❌ HTTP 429 Too Many Requests: Rate limit exceeded! Retry-After: 30s`,
        ...prev
      ]);
    }
  };

  useEffect(() => {
    // Regrow token over time
    const interval = setInterval(() => {
      setQ22Tokens(prev => {
        if (prev < 5) {
          return prev + 1;
        }
        return prev;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Q28: ETag Collision Control
  const handleQ28Write = (client: 'A' | 'B', newContent: string) => {
    const clientTag = client === 'A' ? q28ClientA_ETag : q28ClientB_ETag;
    if (clientTag === q28ServerETag) {
      const nextHash = `"v${parseInt(q28ServerETag.replace(/"|v/g, '')) + 1}"`;
      setQ28ServerETag(nextHash);
      setQ28ServerContent(newContent);
      setQ28Logs(prev => [
        `✅ Client ${client} Write Successful! ETag updated from ${q28ServerETag} to ${nextHash}`,
        ...prev
      ]);
      // Client updates its local ETag post-write success
      if (client === 'A') setQ28ClientA_ETag(nextHash);
      if (client === 'B') setQ28ClientB_ETag(nextHash);
    } else {
      setQ28Logs(prev => [
        `❌ Collision Blocked! Client ${client} attempted write with stale ETag ${clientTag}. Server is at ${q28ServerETag}. HTTP 412 Precondition Failed.`,
        ...prev
      ]);
    }
  };

  // Q30: Async Polling handler
  const triggerQ30Conversion = () => {
    setQ30Status('accepted');
    setQ30Progress(0);
    setQ30Logs(['1. [Client] POST /converters -> File accepted. Response: 202 Accepted. Polling URL: /converters/jobs/881']);
    
    setTimeout(() => {
      setQ30Status('processing');
      setQ30Logs(prev => [...prev, '2. [Client Polling] GET /converters/jobs/881 -> Status: "processing" (30% done)']);
      setQ30Progress(30);

      setTimeout(() => {
        setQ30Progress(65);
        setQ30Logs(prev => [...prev, '3. [Client Polling] GET /converters/jobs/881 -> Status: "processing" (65% done)']);

        setTimeout(() => {
          setQ30Progress(100);
          setQ30Status('completed');
          setQ30Logs(prev => [...prev, '4. [Client Polling] GET /converters/jobs/881 -> Status: "completed". Result: download_url is resolved!', '🎉 File converted successfully!']);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  // Q32: Webhook verify
  const triggerQ32Webhook = () => {
    setQ32Logs(['Server: Webhook event payload received. Checking signatures...']);
    setTimeout(() => {
      if (q32Payload.includes('invoice.paid')) {
        setQ32Verified('success');
        setQ32Logs(prev => [
          ...prev,
          `✅ HMAC-SHA256 Signature verified. Header value matches computed hash using shared webhook secret key.`,
          `Processed invoice payment event safely.`
        ]);
      } else {
        setQ32Verified('failed');
        setQ32Logs(prev => [
          ...prev,
          `❌ HMAC Signature mismatch or corrupted payload details! REJECTED webhook callback with 400 Bad Request.`
        ]);
      }
    }, 1200);
  };

  // Q37: Bulk operations execution
  const triggerQ37BulkDelete = () => {
    const targets = q37Items.filter(item => item.checked);
    if (targets.length === 0) return;

    let res: any[] = [];
    targets.forEach(item => {
      if (item.deletable) {
        res.push({ id: item.id, status: 200, message: 'Deleted' });
      } else {
        res.push({ id: item.id, status: 403, message: 'Cannot delete: protected database record entity constraint' });
      }
    });

    setQ37Result(JSON.stringify({
      title: 'Bulk delete operations results collection',
      status: 207,
      status_text: 'Multi-Status',
      results: res
    }, null, 2));
  };


  return (
    <div className="bg-[#121212] rounded-xl border border-[#222222] overflow-hidden p-4 space-y-4 text-xs text-[#aaaaaa]">
      
      {/* Q5: CRUD Mapping */}
      {questionId === 5 && (
        <div className="space-y-3">
          <div className="flex bg-[#1a1a1a] p-1 rounded-lg border border-[#333333]">
            {(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const).map(m => (
              <button
                key={m}
                onClick={() => setQ5SelectedMethod(m)}
                className={`flex-1 py-1 text-xs font-mono font-bold rounded transition-all ${q5SelectedMethod === m ? 'bg-[#c9a44e] text-black' : 'text-[#888888] hover:text-white'}`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="bg-[#0c0c0c] p-4 rounded-lg border border-[#222222] space-y-3">
            <div className="flex justify-between items-center border-b border-[#222222] pb-2">
              <span className="font-mono text-white text-sm">{q5SelectedMethod} Method Details</span>
              <span className="text-[10px] uppercase font-bold text-[#c9a44e]">CRUD: {
                q5SelectedMethod === 'GET' ? 'READ (Select)' :
                q5SelectedMethod === 'POST' ? 'CREATE (Insert)' :
                q5SelectedMethod === 'PUT' ? 'REPLACE (Full Update)' :
                q5SelectedMethod === 'PATCH' ? 'MODIFY (Partial Update)' : 'DELETE (Destroy)'
              }</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[#555555] uppercase text-[9px] font-bold">Idempotent?</span>
                <p className="font-mono text-white font-semibold">
                  {q5SelectedMethod === 'POST' || q5SelectedMethod === 'PATCH' ? '❌ No (By default specifications)' : '✅ Yes'}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[#555555] uppercase text-[9px] font-bold">Safe Method?</span>
                <p className="font-mono text-white font-semibold">
                  {q5SelectedMethod === 'GET' ? '✅ Yes (Does not alter server state)' : '❌ No'}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[#555555] uppercase text-[9px] font-bold">Contains Request Body?</span>
                <p className="font-mono text-white font-semibold">
                  {q5SelectedMethod === 'GET' || q5SelectedMethod === 'DELETE' ? '❌ Optional/No' : '✅ Yes (Required payload)'}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[#555555] uppercase text-[9px] font-bold">Usual Response Codes</span>
                <p className="font-mono text-white font-semibold">
                  {q5SelectedMethod === 'GET' ? '200 OK' :
                   q5SelectedMethod === 'POST' ? '201 Created' :
                   q5SelectedMethod === 'PUT' ? '200 OK / 204 No Content' :
                   q5SelectedMethod === 'PATCH' ? '200 OK' : '204 No Content / 200 OK'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Q6: PUT vs PATCH */}
      {questionId === 6 && (
        <div className="space-y-3">
          <div className="flex bg-[#1a1a1a] p-1 rounded border border-[#333333]">
            <button
              onClick={() => setQ6Mode('PUT')}
              className={`flex-1 py-1.5 rounded text-xs font-semibold ${q6Mode === 'PUT' ? 'bg-[#c9a44e] text-black' : 'text-[#888888] hover:text-white'}`}
            >
              PUT (Full Replace)
            </button>
            <button
              onClick={() => setQ6Mode('PATCH')}
              className={`flex-1 py-1.5 rounded text-xs font-semibold ${q6Mode === 'PATCH' ? 'bg-[#c9a44e] text-black' : 'text-[#888888] hover:text-white'}`}
            >
              PATCH (Partial Delta)
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2 bg-[#0c0c0c] p-3 rounded-lg border border-[#222222]">
              <span className="text-[10px] text-white uppercase font-bold">Simulation Request Fields</span>
              
              <div className="space-y-1">
                <label className="text-[9px] text-[#555555] uppercase">Name (String)</label>
                <input
                  type="text"
                  value={q6InputName}
                  onChange={e => setQ6InputName(e.target.value)}
                  className="w-full bg-[#151515] border border-[#333333] p-1.5 rounded text-white text-xs outline-none focus:border-[#c9a44e]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-[#555555] uppercase">Role (String)</label>
                <input
                  type="text"
                  value={q6InputRole}
                  onChange={e => setQ6InputRole(e.target.value)}
                  className="w-full bg-[#151515] border border-[#333333] p-1.5 rounded text-white text-xs outline-none focus:border-[#c9a44e]"
                />
              </div>

              <div className="bg-[#151515] p-2 rounded text-[10px] text-cyan-400 font-mono italic">
                {q6Mode === 'PUT' 
                  ? '⚠️ Notice: "email" field is completely OMITTED from payload. Under PUT standard, this forces the email to clear!' 
                  : '💡 Notice: "email" field is omitted. Under PATCH standard, this field is preserved untouched on the database record!'}
              </div>

              <button
                onClick={triggerQ6Update}
                className="w-full py-1.5 bg-[#c9a44e] hover:bg-[#b08e3e] text-black font-semibold rounded text-xs transition-colors"
              >
                Send {q6Mode} Update Request
              </button>
            </div>

            <div className="bg-[#050505] p-3 rounded-lg border border-[#222222] flex flex-col justify-between">
              <span className="text-[10px] uppercase font-bold text-[#555555]">Database State Post-Update</span>
              <pre className="text-emerald-400 font-mono text-[11px] leading-relaxed mt-2 whitespace-pre">
                {JSON.stringify(q6Result, null, 2)}
              </pre>
              <div className="border-t border-[#222222] pt-2 text-[10px] text-[#555555]">
                {q6Result.email === 'null' 
                  ? '❌ The email was lost because the full PUT representation replace-cleared it!' 
                  : '✅ The email was successfully preserved via the PATCH partial request!'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Q7: Idempotency Tester */}
      {questionId === 7 && (
        <div className="space-y-3">
          <div className="flex bg-[#1a1a1a] p-1 rounded-lg border border-[#333333] justify-between items-center">
            <div className="flex space-x-1">
              {(['POST', 'PUT', 'DELETE'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => {
                    setQ7Method(v);
                    setQ7CallCount(0);
                    setQ7DbState(v === 'PUT' ? ['User #42 (Alice)'] : v === 'DELETE' ? ['User #42'] : []);
                    setQ7Logs([]);
                  }}
                  className={`px-3 py-1 text-xs rounded font-mono font-bold transition-all ${q7Method === v ? 'bg-[#c9a44e] text-black' : 'text-[#888888] hover:text-white'}`}
                >
                  {v}
                </button>
              ))}
            </div>

            <div className="text-[10px] text-[#888888] pr-2">
              Is Idempotent? <strong>{q7Method === 'POST' ? '❌ No' : '✅ Yes'}</strong>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0c0c0c] p-3 rounded-lg border border-[#222222] flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#555555]">Action Controller</span>
                <p className="text-xs text-[#888888] mt-1 leading-relaxed">
                  Click the button below multiple times to simulate retried duplicate network actions. Note if the server state grows or remains stable!
                </p>
              </div>

              <button
                onClick={triggerQ7Call}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded flex items-center justify-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Execute Duplicate request #{q7CallCount + 1}</span>
              </button>

              <div className="bg-[#151515] p-2 rounded text-[11px] font-mono text-white text-center">
                Total API Requests Sent: <strong className="text-[#c9a44e]">{q7CallCount}</strong>
              </div>
            </div>

            <div className="space-y-2">
              <div className="bg-[#050505] p-2.5 rounded border border-[#222222] min-h-[90px]">
                <span className="text-[9px] uppercase font-bold text-[#555555]">Database Row Records</span>
                <div className="space-y-1 mt-1.5">
                  {q7DbState.length === 0 ? (
                    <span className="text-xs italic text-[#555555]">Database is Empty</span>
                  ) : (
                    q7DbState.map((record, i) => (
                      <div key={i} className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[11px] rounded">
                        {record}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-[#050505] p-2.5 rounded border border-[#222222] max-h-[80px] overflow-y-auto font-mono text-[10px] text-[#666666] space-y-0.5">
                {q7Logs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
                {q7Logs.length === 0 && <span className="italic">Request logging stream empty.</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Q9: Status Code Explorer */}
      {questionId === 9 && (
        <div className="space-y-3">
          <div className="flex bg-[#1a1a1a] p-1 rounded-lg border border-[#333333]">
            {(['2xx', '3xx', '4xx', '5xx'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setQ9Category(cat);
                  setQ9SelectedCode(cat === '2xx' ? 200 : cat === '3xx' ? 301 : cat === '4xx' ? 400 : 500);
                }}
                className={`flex-1 py-1 rounded text-xs font-mono font-bold transition-all ${q9Category === cat ? 'bg-[#c9a44e] text-black' : 'text-[#888888] hover:text-white'}`}
              >
                {cat} Series
              </button>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-2">
            {q9Category === '2xx' && [200, 201, 204].map(c => (
              <button
                key={c}
                onClick={() => setQ9SelectedCode(c)}
                className={`p-2 rounded border font-mono text-center transition-all ${q9SelectedCode === c ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300' : 'bg-[#151515] border-[#222222]'}`}
              >
                {c}
              </button>
            ))}
            {q9Category === '3xx' && [301, 302, 304].map(c => (
              <button
                key={c}
                onClick={() => setQ9SelectedCode(c)}
                className={`p-2 rounded border font-mono text-center transition-all ${q9SelectedCode === c ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300' : 'bg-[#151515] border-[#222222]'}`}
              >
                {c}
              </button>
            ))}
            {q9Category === '4xx' && [400, 401, 403, 404, 429].map(c => (
              <button
                key={c}
                onClick={() => setQ9SelectedCode(c)}
                className={`p-2 rounded border font-mono text-center transition-all ${q9SelectedCode === c ? 'bg-red-500/10 border-red-500 text-red-300' : 'bg-[#151515] border-[#222222]'}`}
              >
                {c}
              </button>
            ))}
            {q9Category === '5xx' && [500, 502, 503, 504].map(c => (
              <button
                key={c}
                onClick={() => setQ9SelectedCode(c)}
                className={`p-2 rounded border font-mono text-center transition-all ${q9SelectedCode === c ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300' : 'bg-[#151515] border-[#222222]'}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="bg-[#0c0c0c] p-3 rounded border border-[#222222] min-h-[100px] flex flex-col justify-between">
            <div className="font-mono text-sm text-white">
              HTTP Status {q9SelectedCode} - {
                q9SelectedCode === 200 ? 'OK' :
                q9SelectedCode === 201 ? 'Created' :
                q9SelectedCode === 204 ? 'No Content' :
                q9SelectedCode === 301 ? 'Moved Permanently' :
                q9SelectedCode === 302 ? 'Found (Temporary Redirect)' :
                q9SelectedCode === 304 ? 'Not Modified' :
                q9SelectedCode === 400 ? 'Bad Request' :
                q9SelectedCode === 401 ? 'Unauthorized' :
                q9SelectedCode === 403 ? 'Forbidden' :
                q9SelectedCode === 404 ? 'Not Found' :
                q9SelectedCode === 429 ? 'Too Many Requests' :
                q9SelectedCode === 500 ? 'Internal Server Error' :
                q9SelectedCode === 502 ? 'Bad Gateway' :
                q9SelectedCode === 503 ? 'Service Unavailable' : 'Gateway Timeout'
              }
            </div>

            <p className="text-xs text-[#888888] mt-1.5 leading-relaxed">
              {
                q9SelectedCode === 200 ? 'The request was fully processed and the server has returned the representation of the resource.' :
                q9SelectedCode === 201 ? 'The request succeeded and a new database resource entity was successfully created. Usually accompanied by a Location URL header.' :
                q9SelectedCode === 204 ? 'Action succeeded, but there is no payload body returned in the response (common in deletes, preventing bandwidth waste).' :
                q9SelectedCode === 301 ? 'The URL requested has been permanently reassigned to a new path. Search engine spiders must re-index instantly.' :
                q9SelectedCode === 302 ? 'The resource is momentarily located somewhere else. The client should request the new target path, but keep using old URL for now.' :
                q9SelectedCode === 304 ? 'Resource matches the cache ETag. The server transfers no body, indicating to browser cache to serve local version immediately.' :
                q9SelectedCode === 400 ? 'The server cannot understand the request due to malformed payload syntax, invalid parameters, or bad formatting.' :
                q9SelectedCode === 401 ? 'Missing or invalid authentication token. The client identity is completely unknown. A sign-in/renew redirect is required.' :
                q9SelectedCode === 403 ? 'The server knows exactly who you are, but your roles or token claims lack access permission to delete/modify this target.' :
                q9SelectedCode === 404 ? 'The resource requested does not exist or is purposefully hidden behind an authorization check.' :
                q9SelectedCode === 429 ? 'The client has surpassed the permitted speed-limit threshold in the current rate limit token bucket window.' :
                q9SelectedCode === 500 ? 'A generic crash, database deadlock exception, or uncaught codebase error occurred directly on the API server.' :
                q9SelectedCode === 502 ? 'An intermediary proxy server or cloud ingress router received an invalid response from upstream backend container microservices.' :
                q9SelectedCode === 503 ? 'The server is temporarily overloaded, under physical RAM constraints, or offline for continuous deployment maintenance cycles.' : 'The backend container was unable to fulfill the database transaction or upstream RPC execution inside the allowed proxy timeout window.'
              }
            </p>
          </div>
        </div>
      )}

      {/* Q10: 401 vs 403 Security Gate */}
      {questionId === 10 && (
        <div className="space-y-3">
          <div className="flex bg-[#1a1a1a] p-1 rounded-lg border border-[#333333]">
            {(['guest', 'user', 'admin'] as const).map(role => (
              <button
                key={role}
                onClick={() => setQ10Role(role)}
                className={`flex-1 py-1 text-xs capitalize rounded transition-all ${q10Role === role ? 'bg-[#c9a44e] text-black font-semibold' : 'text-[#888888] hover:text-white'}`}
              >
                {role === 'guest' ? '🔑 Anonymous Guest' : role === 'user' ? '👤 Regular User' : '👑 Administrator'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0c0c0c] p-3 rounded-lg border border-[#222222] space-y-2.5">
              <span className="text-[10px] text-white uppercase font-bold">API Gateway Endpoints</span>
              <div className="space-y-2">
                <button
                  onClick={() => triggerQ10Request('/api/v1/profile')}
                  className="w-full text-left p-2.5 bg-[#151515] hover:bg-[#1f1f1f] rounded border border-[#222222] font-mono text-[#c9a44e] transition-colors flex justify-between"
                >
                  <span>GET /profile</span>
                  <span className="text-[10px] text-[#555555]">Requires simple Auth</span>
                </button>
                <button
                  onClick={() => triggerQ10Request('/api/v1/admin/billing')}
                  className="w-full text-left p-2.5 bg-[#151515] hover:bg-[#1f1f1f] rounded border border-[#222222] font-mono text-[#c9a44e] transition-colors flex justify-between"
                >
                  <span>GET /admin/billing</span>
                  <span className="text-[10px] text-[#555555]">Requires Admin role</span>
                </button>
              </div>
            </div>

            <div className="bg-[#050505] p-3 rounded-lg border border-[#222222] flex flex-col h-[160px] justify-between">
              <span className="text-[10px] uppercase font-bold text-[#555555]">API Gateway Auth Firewall Trace</span>
              <div className="flex-1 overflow-y-auto font-mono text-[9px] text-[#888888] space-y-1 mt-1 pr-1">
                {q10Logs.map((log, i) => (
                  <div key={i} className={log.startsWith('❌ HTTP 401') ? 'text-red-400 font-bold' : log.startsWith('❌ HTTP 403') ? 'text-cyan-400 font-bold' : log.startsWith('✅') ? 'text-emerald-400 font-bold' : ''}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Q14: Versioning Approaches */}
      {questionId === 14 && (
        <div className="space-y-3">
          <div className="flex bg-[#1a1a1a] p-1 rounded-lg border border-[#333333]">
            {(['url', 'header', 'query'] as const).map(appr => (
              <button
                key={appr}
                onClick={() => setQ14Approach(appr)}
                className={`flex-1 py-1 text-xs capitalize rounded transition-all ${q14Approach === appr ? 'bg-[#c9a44e] text-black font-semibold' : 'text-[#888888] hover:text-white'}`}
              >
                {appr === 'url' ? 'URL Path version' : appr === 'header' ? 'Accept Header version' : 'Query Parameter'}
              </button>
            ))}
          </div>

          <div className="bg-[#0c0c0c] p-3 rounded-lg border border-[#222222] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-[#c9a44e]">API Client Request Structure</span>
              <span className="text-[10px] text-[#555555] uppercase font-bold">{q14Approach.toUpperCase()} Strategy</span>
            </div>

            <div className="bg-[#050505] p-3 rounded border border-[#222222] font-mono text-xs text-cyan-300 leading-relaxed">
              {q14Approach === 'url' && (
                <div>
                  <span className="text-[#888888]">GET</span> /api/<strong className="text-white">v2</strong>/users/42 HTTP/1.1<br/>
                  <span className="text-[#888888]">Host:</span> api.knowledgenode.io
                </div>
              )}
              {q14Approach === 'header' && (
                <div>
                  <span className="text-[#888888]">GET</span> /api/users/42 HTTP/1.1<br/>
                  <span className="text-[#888888]">Host:</span> api.knowledgenode.io<br/>
                  <span className="text-[#888888]">Accept:</span> application/vnd.knowledgenode.<strong className="text-white">v2</strong>+json
                </div>
              )}
              {q14Approach === 'query' && (
                <div>
                  <span className="text-[#888888]">GET</span> /api/users/42?<strong className="text-white">version=2</strong> HTTP/1.1<br/>
                  <span className="text-[#888888]">Host:</span> api.knowledgenode.io
                </div>
              )}
            </div>

            <p className="text-[#888888] leading-relaxed text-[11px]">
              {q14Approach === 'url' ? 'Highly cacheable and universally simple to configure across standard reverse proxies (Nginx/Cloudflare), though it violates resource URL permanence.' :
               q14Approach === 'header' ? 'Maintains clean, version-agnostic URLs representing the target resource purely. Relies on content negotiation parameters, though harder to execute directly in standard browsers.' :
               'Simple query-based version mapping. Often used as an alternative fallback, though URL parameters can pollute CDN caching lookup index strategies.'}
            </p>
          </div>
        </div>
      )}

      {/* Q15: Content Negotiation */}
      {questionId === 15 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-[#1a1a1a] p-2.5 rounded border border-[#222222]">
            <span className="text-[#888888]">Set Accept Header:</span>
            <select
              value={q15Accept}
              onChange={e => setQ15Accept(e.target.value as any)}
              className="bg-[#0a0a0a] text-white font-mono text-xs border border-[#333333] px-2 py-1 rounded outline-none"
            >
              <option value="application/json">application/json</option>
              <option value="text/csv">text/csv</option>
              <option value="application/xml">application/xml</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
            <div className="bg-[#0c0c0c] p-3 rounded-lg border border-[#222222] space-y-1">
              <span className="text-[#555555] uppercase text-[9px] font-bold">1. Outgoing Client Headers</span>
              <div className="text-cyan-300 space-y-0.5 mt-2">
                <div>GET /reports/quarterly</div>
                <div>Host: api.knowledgenode.io</div>
                <div className="text-white font-semibold">Accept: {q15Accept}</div>
              </div>
            </div>

            <div className="bg-[#050505] p-3 rounded-lg border border-[#222222] space-y-2">
              <span className="text-[#555555] uppercase text-[9px] font-bold">2. Server Serialization Output</span>
              <pre className="text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed font-mono">
                {q15Accept === 'application/json' && '{\n  "month": "July",\n  "revenue_usd": 145000\n}'}
                {q15Accept === 'text/csv' && 'Month,RevenueUSD\nJuly,145000'}
                {q15Accept === 'application/xml' && '<report>\n  <month>July</month>\n  <revenue>145000</revenue>\n</report>'}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Q16: Idempotency Key Payment Gate */}
      {questionId === 16 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-[#1a1a1a] p-2.5 rounded border border-[#222222]">
            <div className="flex space-x-1.5">
              <button
                onClick={() => setQ16KeyMode('with_key')}
                className={`px-3 py-1 text-xs rounded border transition-all ${q16KeyMode === 'with_key' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-200 font-semibold' : 'text-[#888888] border-[#333333]'}`}
              >
                With Idempotency Key Header
              </button>
              <button
                onClick={() => setQ16KeyMode('without_key')}
                className={`px-3 py-1 text-xs rounded border transition-all ${q16KeyMode === 'without_key' ? 'bg-red-500/10 border-red-500 text-red-200 font-semibold' : 'text-[#888888] border-[#333333]'}`}
              >
                No Idempotency Key
              </button>
            </div>

            <div className="flex items-center space-x-2 text-xs text-[#888888]">
              <span>Demo Key:</span>
              <input
                type="text"
                value={q16Key}
                onChange={e => setQ16Key(e.target.value)}
                className="bg-[#0a0a0a] border border-[#333333] px-2 py-0.5 rounded text-white font-mono w-24 text-center text-[10px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0c0c0c] p-3 rounded-lg border border-[#222222] flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#555555]">Payment Processor Sandbox</span>
                <p className="text-[#888888] mt-1 leading-relaxed">
                  Click the payment trigger button. This is a non-idempotent <strong>POST /charges</strong> execution worth $15. Retries simulate a typical network error recovery fallback.
                </p>
              </div>

              <div className="space-y-2 mt-4">
                <button
                  onClick={triggerQ16Payment}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded flex items-center justify-center space-x-1 text-xs"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Submit $15 Charge Request</span>
                </button>
                
                <button
                  onClick={() => {
                    setQ16Balance(100);
                    setQ16Logs(['Payment playground reset. Account funded to $100.']);
                    setQ16Key('key-uuid-' + Math.floor(Math.random()*8999+1000).toString(16));
                  }}
                  className="w-full py-1 text-[10px] text-[#666666] hover:text-white transition-colors"
                >
                  Reset Balance & Key 🔄
                </button>
              </div>

              <div className="mt-3 text-center bg-[#151515] p-2 rounded text-xs text-white">
                User Account Balance: <strong className="text-emerald-400 font-mono">${q16Balance}</strong>
              </div>
            </div>

            <div className="bg-[#050505] p-3 rounded-lg border border-[#222222] flex flex-col h-[180px] justify-between">
              <span className="text-[10px] uppercase font-bold text-[#555555]">Server Transactions Logger</span>
              <div className="flex-1 overflow-y-auto font-mono text-[9px] text-[#888888] space-y-1 mt-1 pr-1">
                {q16Logs.map((log, i) => (
                  <div key={i} className={log.includes('duplicate') || log.includes('Idempotent HIT') ? 'text-cyan-400 font-bold' : log.includes('Success') ? 'text-emerald-400 font-bold' : log.includes('Double charge') ? 'text-red-400 font-bold' : ''}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Q17: Pagination Simulator */}
      {questionId === 17 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-[#1a1a1a] p-2 rounded border border-[#222222]">
            <div className="flex space-x-1">
              <button
                onClick={() => { setQ17Mode('offset'); setQ17Page(1); }}
                className={`px-3 py-1 rounded text-xs font-semibold ${q17Mode === 'offset' ? 'bg-[#c9a44e] text-black' : 'text-[#888888] hover:text-white'}`}
              >
                Offset Pagination (?page=1&limit=2)
              </button>
              <button
                onClick={() => { setQ17Mode('cursor'); setQ17Cursor(null); }}
                className={`px-3 py-1 rounded text-xs font-semibold ${q17Mode === 'cursor' ? 'bg-[#c9a44e] text-black' : 'text-[#888888] hover:text-white'}`}
              >
                Cursor/Keyset Pagination (?after=id)
              </button>
            </div>

            <label className="flex items-center space-x-1.5 text-xs text-[#888888] pr-1 cursor-pointer">
              <input
                type="checkbox"
                checked={q17ConcurrentInsert}
                onChange={e => {
                  setQ17ConcurrentInsert(e.target.checked);
                  setQ17Cursor(null);
                  setQ17Page(1);
                }}
                className="rounded border-[#333333] bg-[#0c0c0c] text-[#c9a44e] focus:ring-0"
              />
              <span>Live Post #0 Inserted</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0c0c0c] p-3 rounded-lg border border-[#222222] space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-white tracking-wider">Traversal Controls</span>
                <p className="text-[11px] text-[#888888] leading-relaxed mt-1">
                  Toggle the concurrent database insert checkbox on the header, and then try scrolling between pages! Look if you receive duplication duplicates under offset!
                </p>
              </div>

              {q17Mode === 'offset' ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQ17Page(prev => Math.max(1, prev - 1))}
                    disabled={q17Page === 1}
                    className="flex-1 py-1 px-2 bg-[#222222] hover:bg-[#333333] border border-[#333333] rounded text-white font-semibold text-xs disabled:opacity-40"
                  >
                    ◀ Prev Page
                  </button>
                  <span className="text-white font-mono text-center w-12 text-xs">Page {q17Page}</span>
                  <button
                    onClick={() => setQ17Page(prev => Math.min(3, prev + 1))}
                    disabled={q17Page === 3}
                    className="flex-1 py-1 px-2 bg-[#222222] hover:bg-[#333333] border border-[#333333] rounded text-white font-semibold text-xs disabled:opacity-40"
                  >
                    Next Page ▶
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <button
                    onClick={() => setQ17Cursor('2')}
                    className="w-full py-1 bg-[#222222] border border-[#333333] hover:border-[#c9a44e] text-white rounded text-xs font-mono"
                  >
                    GET /feed?after=2 (Fetch Page 2)
                  </button>
                  <button
                    onClick={() => setQ17Cursor(null)}
                    className="w-full py-1 text-[#666666] hover:text-white text-[10px]"
                  >
                    Reset to Head of Cursor Feed
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#050505] p-3 rounded-lg border border-[#222222] flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#555555] block border-b border-[#222222] pb-1 mb-2">Paging Output Stream Response</span>
                <div className="space-y-2 mt-2">
                  {q17Feed.map((item, i) => (
                    <div key={i} className="p-2 bg-[#121212] rounded border border-[#222222] font-mono text-xs text-white">
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2 text-[10px] text-cyan-400 font-mono italic">
                {q17ConcurrentInsert && q17Mode === 'offset' && q17Page === 2
                  ? '⚠️ Observe! "Post #2" has slid down to Page 2 due to the live insertion. This is the classic duplicate item offset defect!'
                  : '💡 Cursor Traversal is resilient to live insertions since it points to the stable anchor after-cursor ID rather than counting raw offsets.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Q19: Query Filters & Sorting */}
      {questionId === 19 && (
        <div className="space-y-3">
          <div className="flex bg-[#1a1a1a] p-2 rounded-lg border border-[#222222] justify-between items-center text-xs">
            <div className="flex space-x-2">
              <div className="flex items-center space-x-1">
                <span>Category:</span>
                <select
                  value={q19FilterCategory}
                  onChange={e => setQ19FilterCategory(e.target.value)}
                  className="bg-[#0a0a0a] border border-[#333333] rounded px-1.5 py-0.5 text-white"
                >
                  <option value="all">All</option>
                  <option value="hardware">Hardware</option>
                  <option value="accessories">Accessories</option>
                  <option value="furniture">Furniture</option>
                </select>
              </div>

              <div className="flex items-center space-x-1">
                <span>Sort:</span>
                <select
                  value={q19Sort}
                  onChange={e => setQ19Sort(e.target.value)}
                  className="bg-[#0a0a0a] border border-[#333333] rounded px-1.5 py-0.5 text-white"
                >
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating_desc">Rating: High to Low</option>
                </select>
              </div>
            </div>

            <div className="font-mono text-[#c9a44e] bg-[#050505] px-2 py-1 rounded border border-[#333333] text-[10px]">
              GET /products?{q19FilterCategory !== 'all' ? `category=${q19FilterCategory}&` : ''}sort={q19Sort === 'price_asc' ? 'price' : q19Sort === 'price_desc' ? '-price' : '-rating'}
            </div>
          </div>

          <div className="bg-[#0c0c0c] rounded-lg border border-[#222222] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#151515] text-white">
                <tr>
                  <th className="p-2 font-mono text-[10px]">Product Name</th>
                  <th className="p-2 font-mono text-[10px]">Category</th>
                  <th className="p-2 font-mono text-[10px] text-right">Price</th>
                  <th className="p-2 font-mono text-[10px] text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222222] font-mono">
                {q19Products
                  .filter(p => q19FilterCategory === 'all' || p.category === q19FilterCategory)
                  .sort((a, b) => {
                    if (q19Sort === 'price_asc') return a.price - b.price;
                    if (q19Sort === 'price_desc') return b.price - a.price;
                    return b.rating - a.rating;
                  })
                  .map(p => (
                    <tr key={p.id} className="hover:bg-[#151515]/50 text-white">
                      <td className="p-2 text-[#c9a44e] font-sans font-medium">{p.name}</td>
                      <td className="p-2 capitalize text-gray-400">{p.category}</td>
                      <td className="p-2 text-right">${p.price}</td>
                      <td className="p-2 text-right text-yellow-500">⭐ {p.rating}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Q21: Error response validator */}
      {questionId === 21 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0c0c0c] p-3 rounded-lg border border-[#222222] space-y-3">
              <span className="text-[10px] text-white uppercase font-bold">Input Parameters Builder</span>
              
              <div className="space-y-1">
                <label className="text-[9px] text-[#555555] uppercase">Email</label>
                <input
                  type="text"
                  value={q21Email}
                  onChange={e => setQ21Email(e.target.value)}
                  className="w-full bg-[#151515] border border-[#333333] p-1.5 rounded text-white text-xs outline-none focus:border-[#c9a44e] font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-[#555555] uppercase">Age: {q21Age}</label>
                <input
                  type="range"
                  min="10"
                  max="30"
                  value={q21Age}
                  onChange={e => setQ21Age(parseInt(e.target.value))}
                  className="w-full accent-[#c9a44e]"
                />
              </div>

              <div className="bg-[#151515] p-2.5 rounded text-[10px] text-gray-400 leading-relaxed">
                We are testing validation bounds. Enter a correct email layout and slide age above 18 to satisfy the firewall!
              </div>
            </div>

            <div className="bg-[#050505] p-3 rounded-lg border border-[#222222] flex flex-col justify-between">
              <span className="text-[10px] uppercase font-bold text-[#555555]">Uniform RFC 7807 Error Payload</span>
              <pre className="text-red-400 font-mono text-[10px] leading-relaxed mt-2 whitespace-pre overflow-x-auto">
                {q21ErrorJson}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Q22: Rate Limiter Token Bucket */}
      {questionId === 22 && (
        <div className="space-y-3">
          <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#222222] flex justify-between items-center">
            <div className="space-y-0.5">
              <span className="text-[10px] text-[#c9a44e] uppercase font-bold">Token Bucket Capacity</span>
              <div className="flex space-x-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-5 h-5 rounded-full border transition-all ${i < q22Tokens ? 'bg-emerald-500 border-emerald-400 shadow-md shadow-emerald-500/20' : 'bg-transparent border-[#333333]'}`}
                  />
                ))}
              </div>
            </div>

            <div className="text-right text-xs">
              <div>Capacity: <strong>{q22Tokens} / 5</strong></div>
              <div className="text-[9px] text-gray-500">Regenerates 1 token every 4s</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0c0c0c] p-3 rounded-lg border border-[#222222] flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-white tracking-wider">Client Ingress Simulator</span>
                <p className="text-[11px] text-[#888888] leading-relaxed mt-1">
                  Trigger repeated requests quickly. Notice how once the tokens are depleted, subsequent requests fail immediately with status 429.
                </p>
              </div>

              <button
                onClick={triggerQ22Call}
                className="w-full mt-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded text-xs transition-colors"
              >
                Send GET /api/v1/resource
              </button>
            </div>

            <div className="bg-[#050505] p-3 rounded-lg border border-[#222222] flex flex-col h-[140px] justify-between">
              <span className="text-[10px] uppercase font-bold text-[#555555]">Server Rate Limit Telemetry</span>
              <div className="flex-1 overflow-y-auto font-mono text-[9px] text-[#888888] space-y-1 mt-2 pr-1">
                {q22Logs.map((log, i) => (
                  <div key={i} className={log.includes('429') ? 'text-red-400 font-bold animate-pulse' : 'text-gray-400'}>
                    {log}
                  </div>
                ))}
                {q22Logs.length === 0 && <span className="italic">Click Button to start requests.</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Q28: ETag Collision */}
      {questionId === 28 && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] uppercase font-bold text-white">
            <div className="bg-cyan-950/20 p-2 rounded border border-cyan-500/20">Client A (ETag: {q28ClientA_ETag})</div>
            <div className="bg-[#1a1a1a] p-2 rounded border border-[#222222]">Server Store (ETag: {q28ServerETag})</div>
            <div className="bg-cyan-950/20 p-2 rounded border border-cyan-500/20">Client B (ETag: {q28ClientB_ETag})</div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Client A Controls */}
            <div className="bg-[#0c0c0c] p-2.5 rounded border border-[#222222] space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-[9px] text-[#555555] uppercase block">Content Buffer</span>
                <input
                  type="text"
                  placeholder="A's input"
                  id="clientA_input"
                  className="w-full bg-[#151515] border border-[#333333] p-1 rounded text-white text-[11px] outline-none"
                  defaultValue="Content Modified by A"
                />
              </div>
              <button
                onClick={() => {
                  const val = (document.getElementById('clientA_input') as HTMLInputElement)?.value || '';
                  handleQ28Write('A', val);
                }}
                className="w-full py-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded text-[10px]"
              >
                PATCH Document (If-Match)
              </button>
            </div>

            {/* Server View */}
            <div className="bg-[#050505] p-2.5 rounded border border-[#222222] flex flex-col justify-between min-h-[90px] text-center text-xs">
              <div>
                <span className="text-[9px] text-[#555555] uppercase">Current Server Content</span>
                <p className="font-semibold text-white mt-2 font-mono">"{q28ServerContent}"</p>
              </div>

              <button
                onClick={() => {
                  setQ28ClientA_ETag(q28ServerETag);
                  setQ28ClientB_ETag(q28ServerETag);
                  setQ28Logs(prev => ['🔄 Synchronized Client A and Client B with Server ETags.', ...prev]);
                }}
                className="w-full py-1 text-[9px] bg-[#151515] hover:bg-[#222222] text-[#888888] rounded"
              >
                Sync Clients ETags 🔄
              </button>
            </div>

            {/* Client B Controls */}
            <div className="bg-[#0c0c0c] p-2.5 rounded border border-[#222222] space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-[9px] text-[#555555] uppercase block">Content Buffer</span>
                <input
                  type="text"
                  placeholder="B's input"
                  id="clientB_input"
                  className="w-full bg-[#151515] border border-[#333333] p-1 rounded text-white text-[11px] outline-none"
                  defaultValue="Content Overwritten by B"
                />
              </div>
              <button
                onClick={() => {
                  const val = (document.getElementById('clientB_input') as HTMLInputElement)?.value || '';
                  handleQ28Write('B', val);
                }}
                className="w-full py-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded text-[10px]"
              >
                PATCH Document (If-Match)
              </button>
            </div>
          </div>

          <div className="bg-[#050505] p-2 rounded border border-[#222222] max-h-[80px] overflow-y-auto font-mono text-[9px] text-gray-500 space-y-0.5">
            {q28Logs.map((log, i) => (
              <div key={i} className={log.startsWith('❌') ? 'text-red-400 font-semibold' : log.startsWith('✅') ? 'text-emerald-400 font-semibold' : ''}>
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q30: Async Conversion Polling */}
      {questionId === 30 && (
        <div className="space-y-3">
          <div className="bg-[#0c0c0c] p-3 rounded-lg border border-[#222222] flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-[10px] text-white uppercase font-bold block">Heavy Job Status: <strong className="uppercase text-[#c9a44e] font-mono">{q30Status}</strong></span>
              <div className="w-48 bg-[#1f1f1f] rounded-full h-2.5 border border-[#333333] overflow-hidden">
                <div
                  className="bg-emerald-500 h-2.5 transition-all duration-500"
                  style={{ width: `${q30Progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={triggerQ30Conversion}
              disabled={q30Status === 'accepted' || q30Status === 'processing'}
              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded disabled:opacity-40 text-xs"
            >
              POST Video Converter Job (4K UHD resolution)
            </button>
          </div>

          <div className="bg-[#050505] p-3 rounded-lg border border-[#222222] min-h-[100px] flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-[#555555]">Client HTTP Polling Sequence Trace</span>
            <div className="font-mono text-[10px] text-gray-400 space-y-1 mt-2">
              {q30Logs.map((log, i) => (
                <div key={i} className={log.includes('completed') || log.includes('🎉') ? 'text-emerald-400 font-bold' : ''}>
                  {log}
                </div>
              ))}
              {q30Logs.length === 0 && <span className="italic text-[#555555]">Click trigger button to simulate 202 Polling cycle.</span>}
            </div>
          </div>
        </div>
      )}

      {/* Q32: Webhook Trigger */}
      {questionId === 32 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0c0c0c] p-3 rounded-lg border border-[#222222] flex flex-col justify-between space-y-2">
              <span className="text-[10px] text-white uppercase font-bold">Stripe Payment Gateway Sandbox</span>
              
              <textarea
                value={q32Payload}
                onChange={e => setQ32Payload(e.target.value)}
                rows={3}
                className="w-full bg-[#151515] border border-[#333333] p-1.5 rounded text-white font-mono text-[11px] outline-none focus:border-[#c9a44e]"
              />

              <button
                onClick={triggerQ32Webhook}
                className="w-full py-1.5 bg-[#c9a44e] hover:bg-[#b08e3e] text-black font-semibold rounded text-xs transition-colors"
              >
                Fire Outgoing Webhook POST
              </button>
            </div>

            <div className="bg-[#050505] p-3 rounded-lg border border-[#222222] flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#555555] block border-b border-[#222222] pb-1">Client Listener Endpoint Logs</span>
                <div className="font-mono text-[10px] text-gray-400 space-y-1 mt-2">
                  {q32Logs.map((log, i) => (
                    <div key={i} className={log.startsWith('✅') ? 'text-emerald-400 font-semibold' : log.startsWith('❌') ? 'text-red-400 font-semibold' : ''}>
                      {log}
                    </div>
                  ))}
                  {q32Logs.length === 0 && <span className="italic text-[#555555]">Click Fire to dispatch raw webhook data events.</span>}
                </div>
              </div>

              <div className="mt-2 text-right">
                {q32Verified === 'success' && <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[9px] uppercase font-bold font-mono">Verified Match</span>}
                {q32Verified === 'failed' && <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-[9px] uppercase font-bold font-mono">Sign Error</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Q37: Bulk operations (207 Multi-Status) */}
      {questionId === 37 && (
        <div className="space-y-3">
          <div className="bg-[#0c0c0c] p-3 rounded-lg border border-[#222222] space-y-2.5">
            <span className="text-[10px] text-white uppercase font-bold">Bulk Select Target Resource Rows</span>
            <div className="space-y-1.5">
              {q37Items.map((item, idx) => (
                <label key={item.id} className="flex items-center justify-between p-2 bg-[#151515] border border-[#222222] hover:border-[#333333] rounded cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={e => {
                        const next = [...q37Items];
                        next[idx].checked = e.target.checked;
                        setQ37Items(next);
                      }}
                      className="rounded border-[#333333] bg-[#0c0c0c] text-[#c9a44e] focus:ring-0"
                    />
                    <span className="text-white font-medium">{item.name}</span>
                  </div>

                  <span className={`text-[10px] font-mono ${item.deletable ? 'text-emerald-400' : 'text-red-400'}`}>
                    {item.deletable ? 'Deletable' : 'Protected Admin Hold'}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={triggerQ37BulkDelete}
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded flex items-center justify-center space-x-1 text-xs"
            >
              <Trash2 className="w-4 h-4" />
              <span>Submit POST /posts/bulk-delete</span>
            </button>
          </div>

          {q37Result && (
            <div className="bg-[#050505] p-3 rounded border border-[#222222] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#555555]">Uniform HTTP 207 Multi-Status Response</span>
              <pre className="text-emerald-400 font-mono text-[10px] leading-relaxed mt-1 whitespace-pre overflow-x-auto">
                {q37Result}
              </pre>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
