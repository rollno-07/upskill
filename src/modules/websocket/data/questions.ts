import { Category, Difficulty, WebSocketQuestion } from '../types';

export const QUESTIONS: WebSocketQuestion[] = [
  {
    id: 1,
    question: "What is WebSocket?",
    shortAnswer: "A protocol providing a full-duplex, persistent connection between client and server over a single TCP connection.",
    detailedAnswer: "WebSocket is an application-layer network protocol (standardized as RFC 6455) that enables bi-directional, full-duplex communication over a single long-lived TCP connection.\n\nTraditionally, HTTP relied on short-lived request-response exchanges. With WebSockets, once a connection is established, either the client or the server can push raw text or binary data frames at any time, with extremely low overhead ($O(2-10\\text{ bytes})$ of frame framing compared to $O(\\text{kilobytes})$ of HTTP headers).\n\nKey features include:\n- **Full-Duplex:** Simultaneous bi-directional streaming.\n- **Single TCP Connection:** Avoids high connection setup costs for subsequent frames.\n- **Low Overhead:** Small frame-level headers ($2\\text{ to }10\\text{ bytes}$).",
    category: Category.Fundamentals,
    difficulty: Difficulty.Beginner,
    keyTakeaways: [
      "Operates over TCP and shares port 80/443 with HTTP.",
      "Starts as an HTTP upgrade request, then shifts entirely to WebSocket frames.",
      "Drastically reduces latency and server overhead compared to polling."
    ],
    tags: ["Core Protocol", "TCP", "Full-Duplex"],
    interactiveDiagramId: "connection_flow",
    codeSnippet: `// Simple WebSocket server handshake verification
// Client request has 'Upgrade: websocket'
// Server responds with status 101 (Switching Protocols)`
  },
  {
    id: 2,
    question: "How does a WebSocket connection start?",
    shortAnswer: "Via an HTTP 'upgrade' handshake — client sends a request with 'Upgrade: websocket' header, and server responds with '101 Switching Protocols' if it accepts.",
    detailedAnswer: "Every WebSocket session begins with a standard HTTP GET request containing specific headers requesting a protocol upgrade. This process is called the **Handshake**.\n\n### The Handshake Sequence\n1. **Client Request:**\n   ```http\n   GET /chat HTTP/1.1\n   Host: server.example.com\n   Upgrade: websocket\n   Connection: Upgrade\n   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\n   Sec-WebSocket-Version: 13\n   ```\n\n2. **Server Response:**\n   If the server supports WebSocket, it computes a cryptographic hash of the `Sec-WebSocket-Key` concatenated with a globally unique GUID (`258EAFA5-E914-47DA-95CA-C5AB0DC85B11`), hashes it with SHA-1, base64 encodes it, and returns:\n   ```http\n   HTTP/1.1 101 Switching Protocols\n   Upgrade: websocket\n   Connection: Upgrade\n   Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=\n   ```\n\nAfter this status code 101 handshake completes, the underlying TCP connection remains open, and both parties switch protocols from HTTP/1.1 to the raw WebSocket framing protocol.",
    category: Category.ProtocolHandshake,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Sec-WebSocket-Key prevents accidental caching and validates protocol support.",
      "Status code 101 Switching Protocols is mandatory.",
      "Uses SHA-1 hashing under the hood for security verification."
    ],
    tags: ["Handshake", "Switching Protocols", "SHA-1"],
    interactiveDiagramId: "handshake_simulator",
    codeSnippet: `// SHA-1 verification formula for Sec-WebSocket-Accept
const crypto = require('crypto');
const key = 'dGhlIHNhbXBsZSBub25jZQ==';
const guid = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const accept = crypto.createHash('sha1').update(key + guid).digest('base64');
console.log(accept); // 's3pPLMBiTxaQ9kYGzzhZRbK+xOo='`,
    mathFormula: "Sec\\text{-}WebSocket\\text{-}Accept = \\text{Base64}(\\text{SHA1}(Key + UUID))",
    mathExplanation: "Calculates the handshake verification hash using the client token and standard WS GUID."
  },
  {
    id: 3,
    question: "WebSocket vs HTTP?",
    shortAnswer: "HTTP is request-response and unidirectional; WebSocket is persistent, bidirectional, and stateful after a single handshake.",
    detailedAnswer: "WebSockets and HTTP differ fundamentally in design philosophy, architecture, and resource utilization.\n\n### Comparison Table\n\n| Feature | HTTP/1.1 & HTTP/2 | WebSocket |\n| :--- | :--- | :--- |\n| **Model** | Unidirectional (Client requests, Server responds) | Bidirectional (Either side sends anytime) |\n| **State** | Stateless (Each request carries full headers/context) | Stateful (Persistent TCP connection maintains state) |\n| **Overhead** | High (500B to several KB of headers per request) | Low (2-10 bytes frame header overhead) |\n| **Ports** | 80 / 443 | 80 / 443 (runs over the same ports) |\n| **Use Case** | Static content, REST APIs, document delivery | Live tickers, interactive multiplayer, chats |\n\nIn HTTP, the client is the initiator. If the server has new updates, it cannot push them unless the client asks. While HTTP/2 introduces Server Push, it is restricted to pre-loading static assets and cannot be used for sending runtime application data to client code in a full-duplex manner.",
    category: Category.Fundamentals,
    difficulty: Difficulty.Beginner,
    keyTakeaways: [
      "HTTP is standard for REST/gRPC and resource fetching.",
      "WebSocket is designed for low-latency, real-time message exchange.",
      "WebSocket avoids the HTTP handshake/TCP overhead on every message."
    ],
    tags: ["HTTP", "Comparison", "Web Architecture"],
    interactiveDiagramId: "http_vs_websocket",
    mathFormula: "Overhead_{HTTP} \\gg Overhead_{WS}",
    mathExplanation: "HTTP requests carry extensive cookie and header data. WS sends tiny raw frames."
  },
  {
    id: 4,
    question: "WebSocket vs polling?",
    shortAnswer: "Polling queries the server on a fixed interval, generating wasted HTTP traffic; WebSockets establish a single link that pushes updates immediately.",
    detailedAnswer: "In **Short Polling**, the client issues HTTP requests periodically (e.g., every 5 seconds) to check for updates.\n\n### The Polling Problem\nIf no new updates are available, the server still answers with a full response (usually 200 OK or 304 Not Modified), leading to high waste in network resources, bandwidth, and processing CPU cycles.\n\n### Efficiency Comparison\nLet $N$ be the number of queries, $H$ be the size of HTTP headers, and $U$ be the number of real updates. \n\n- In **Short Polling**:\n  $$Total\\text{ }Bandwidth = N \\times H$$\n  (Even if $U = 0$, bandwidth consumption is high)\n\n- In **WebSocket**:\n  $$Total\\text{ }Bandwidth = H_{handshake} + U \\times (FrameHeader + Payload)$$\n  (Bandwidth consumption is near zero when there are no updates)",
    category: Category.Fundamentals,
    difficulty: Difficulty.Beginner,
    keyTakeaways: [
      "Polling is extremely inefficient for sparse data updates.",
      "Polling floods servers with useless TCP socket allocations and logging.",
      "WebSockets provide zero-delay instant delivery without polling fatigue."
    ],
    tags: ["Polling", "Efficiency", "Network Bandwidth"],
    interactiveDiagramId: "polling_simulator",
    mathFormula: "Efficiency_{WS} = 100 \\times \\left(1 - \\frac{U \\times H_{WS}}{N \\times H_{HTTP}}\\right)\\%",
    mathExplanation: "Percentage of bandwidth saved by using WebSockets over standard periodic polling."
  },
  {
    id: 5,
    question: "WebSocket vs long polling?",
    shortAnswer: "Long polling keeps an HTTP request suspended until the server has data, but incurs full HTTP teardown and re-creation overhead for each update.",
    detailedAnswer: "To overcome the waste of short polling, **Long Polling (comet)** was introduced. \n\n### How Long Polling Works\n1. The client opens an HTTP request to the server.\n2. The server *delays* responding until new data is available or a timeout occurs.\n3. When data is ready, the server sends the response.\n4. The client *immediately* opens a new HTTP request to await the next event.\n\n### Why WebSocket is Superior\nWhile long polling gets closer to real-time, it still suffers from **high latency gaps** between requests (tearing down one HTTP request and initiating another requires a new TCP handshake if HTTP keep-alive fails, plus complete header parsing). WebSockets keep a single TCP pipe active continuously, entirely skipping the teardown/re-creation phase.",
    category: Category.Fundamentals,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Long polling still uses standard HTTP and is prone to connection limits.",
      "Requires state management to queue events while the client is reconnecting.",
      "WebSockets use less CPU and memory on both client and server."
    ],
    tags: ["Long Polling", "Comet", "Legacy Web"],
    interactiveDiagramId: "long_polling_simulator"
  },
  {
    id: 6,
    question: "WebSocket vs Server-Sent Events (SSE)?",
    shortAnswer: "SSE is a unidirectional server-to-client pipeline using standard HTTP; WebSocket is bidirectional and uses its own protocol.",
    detailedAnswer: "Server-Sent Events (SSE) is a web technology where a browser client receives a stream of automatic updates from a server over an HTTP connection using the `text/event-stream` format.\n\n### Key Differences\n\n- **Directionality:** SSE is strictly **Unidirectional** (server-to-client). WebSocket is **Bidirectional** (client can send data over the same connection).\n- **Protocol:** SSE uses plain HTTP (no upgrade handshake required). WebSocket upgraded to its own framing protocol.\n- **Built-in Features:** SSE includes native automatic reconnection, event IDs, and message filtering out-of-the-box. WebSockets require developers to implement reconnection and message tracking from scratch.\n- **Corporate Firewalls:** SSE is often friendlier to legacy firewalls since it travels over standard HTTP/2 streams without protocol upgrades.",
    category: Category.Fundamentals,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Use SSE if you only need server-to-client notifications (e.g., stock tickers, dashboards).",
      "Use WebSocket if you need interactive client-server loops (e.g., chat, multiplayer games).",
      "SSE supports HTTP multiplexing out of the box with HTTP/2."
    ],
    tags: ["SSE", "Unidirectional", "HTTP/2"],
    interactiveDiagramId: "sse_vs_ws"
  },
  {
    id: 7,
    question: "What URL scheme does WebSocket use?",
    shortAnswer: "`ws://` for unencrypted connections (port 80) and `wss://` for secure TLS connections (port 443).",
    detailedAnswer: "WebSocket introduces two brand-new URI schemes:\n- **`ws://` (WebSocket):** Used for plain, unencrypted transport over standard port 80.\n- **`wss://` (WebSocket Secure):** Used for encrypted transport over TLS on port 443.\n\n### Why Secure WebSockets (wss://) are Mandatory in Production\nUsing raw unencrypted `ws://` connections in production is highly discouraged and frequently blocked by modern web browsers due to:\n1. **Mixed Content Block:** Pages served over `https://` are strictly prohibited from opening unencrypted `ws://` resources.\n2. **Proxy Interference:** Many corporate firewalls, proxy servers, and ISPs intercept port 80 traffic. They do not recognize the custom WebSocket framing protocol and corrupt or terminate the connection. Because `wss://` is wrapped in TLS, proxies see only encrypted TCP packets and pass them through untouched.",
    category: Category.ProtocolHandshake,
    difficulty: Difficulty.Beginner,
    keyTakeaways: [
      "Always use wss:// to secure payloads and bypass aggressive proxy interference.",
      "Matches HTTPS ports (443) and relies on public key infrastructure certificates.",
      "WS is equivalent to HTTP, while WSS is equivalent to HTTPS."
    ],
    tags: ["Security", "URI Scheme", "TLS"],
    interactiveDiagramId: "secure_proxy_flow"
  },
  {
    id: 8,
    question: "How do you open a WebSocket connection in JS?",
    shortAnswer: "By instantiating the native browser class: `const ws = new WebSocket('wss://example.com/socket')`.",
    detailedAnswer: "The HTML5 standard introduces a native browser global constructor `WebSocket` allowing seamless client connections.\n\n```javascript\n// Open a secure connection\nconst socket = new WebSocket('wss://api.example.com/feed');\n```\n\n### Optional Subprotocols\nYou can also pass a second argument containing a list of subprotocols (e.g., `mqtt`, `wamp`, or custom schemas) the client supports. The server will select one and return it in the handshake header:\n```javascript\nconst socket = new WebSocket('wss://api.example.com/feed', ['graphql-ws', 'json-v1']);\n```",
    category: Category.ClientAPI,
    difficulty: Difficulty.Beginner,
    keyTakeaways: [
      "No external libraries are required to use WebSockets in modern browsers.",
      "Supports subprotocols for routing or version control.",
      "The constructor triggers the upgrade handshake immediately."
    ],
    tags: ["JavaScript API", "Browser API", "Client Setup"],
    interactiveDiagramId: "js_api_inspector",
    codeSnippet: `// Standard browser instantiation
const socket = new WebSocket('wss://echo.websocket.org');

socket.onopen = () => {
  console.log('Connected!');
};`
  },
  {
    id: 9,
    question: "What are the main WebSocket client events?",
    shortAnswer: "The four core events are: `onopen`, `onmessage`, `onerror`, and `onclose`.",
    detailedAnswer: "The browser's standard WebSocket instance operates in an event-driven lifecycle. You register listeners to handle transitions and incoming payloads.\n\n### The Four Native Event Handlers\n\n1. **`onopen`:** Triggered when the WebSocket handshake succeeds and connection transitions to the `OPEN` state. It's now safe to transmit data.\n2. **`onmessage`:** Dispatched whenever a message frame is received from the server. Payload is located in `event.data`.\n3. **`onerror`:** Triggered when a transport error occurs. This is always followed by a close event.\n4. **`onclose`:** Triggered when the connection terminates (either intentionally via `close()` or abruptly). It includes status codes and closed reasons.",
    category: Category.ClientAPI,
    difficulty: Difficulty.Beginner,
    keyTakeaways: [
      "Use event listeners or assign directly to onmessage properties.",
      "Errors are kept opaque by the browser for security reasons.",
      "Onmessage receives raw text strings or binary Blobs/ArrayBuffers."
    ],
    tags: ["Events", "Lifecycle", "Event Listeners"],
    interactiveDiagramId: "lifecycle_visualizer",
    codeSnippet: `const ws = new WebSocket('wss://echo.websocket.org');

ws.addEventListener('open', (event) => {
  console.log('Open success!');
});

ws.addEventListener('message', (event) => {
  console.log('Received payload:', event.data);
});

ws.addEventListener('error', (err) => {
  console.error('Socket encountered error');
});

ws.addEventListener('close', (event) => {
  console.log(\`Closed with code \${event.code} (Reason: \${event.reason})\`);
});`
  },
  {
    id: 10,
    question: "How do you send data over a WebSocket?",
    shortAnswer: "Call the `.send()` method with text, stringified JSON, or binary data.",
    detailedAnswer: "The browser client uses `WebSocket.prototype.send()` to push data. Transmissions are non-blocking and queued in a buffer if network congestion occurs.\n\n### Supported Formats\nYou can send three core data types:\n1. **Text Strings:** Simple strings, frequently serialized JSON standard.\n   ```javascript\n   ws.send(JSON.stringify({ type: 'CHAT_MSG', body: 'Hello!' }));\n   ```\n2. **Blob:** Raw binary objects, perfect for large files or image chunks.\n3. **ArrayBuffer:** Structured binary byte arrays, ideal for compact binary protocols like Protobuf.\n\n### Buffer Management & Congestion\nYou can monitor the `bufferedAmount` property. It returns the number of bytes queued but not yet sent, allowing for client-side backpressure flow control.",
    category: Category.ClientAPI,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Always verify readyState is OPEN before calling send().",
      "Keep payload size in mind; huge strings block the main thread for JSON parsing.",
      "Monitor bufferedAmount to avoid running out of browser memory."
    ],
    tags: ["Data Transmission", "JSON", "Binary"],
    interactiveDiagramId: "data_sender_tool",
    codeSnippet: `const ws = new WebSocket('wss://echo.websocket.org');

ws.onopen = () => {
  // 1. Sending plain text
  ws.send('Hello server!');

  // 2. Sending structured JSON
  const payload = { action: 'subscribe', channel: 'BTC_USD' };
  ws.send(JSON.stringify(payload));

  // 3. Sending binary byte arrays
  const binaryData = new Uint8Array([1, 2, 3, 4]);
  ws.send(binaryData);
};`
  },
  {
    id: 11,
    question: "How do you close a WebSocket connection?",
    shortAnswer: "Invoke the `.close()` method, optionally supplying a standard closure code and a string reason.",
    detailedAnswer: "To close the connection gracefully from the client, call the native close method:\n```javascript\nws.close(1000, 'User logged out');\n```\n\n### Closing Handshake\nRather than just dropping the TCP socket, a graceful closure involves a **Closing Handshake**:\n1. Client sends a **Close Frame** with a numeric code (e.g. `1000` for Normal Closure) and optional text payload.\n2. Server receives the close frame, echoes a corresponding close frame back to the client.\n3. The underlying TCP socket is terminated safely.\n\nThis ensures both sides release memory allocations and prevents socket dangling.",
    category: Category.ClientAPI,
    difficulty: Difficulty.Beginner,
    keyTakeaways: [
      "Closing can be initiated by either server or client.",
      "Custom closure codes must reside within the range 3000-4999.",
      "Graceful closures prevent socket orphan issues in production servers."
    ],
    tags: ["Graceful Closure", "Close Code", "Cleanup"],
    interactiveDiagramId: "closing_handshake_flow",
    codeSnippet: `// Trigger connection closure
// 1000 indicates a standard, successful, graceful closure
ws.close(1000, 'Graceful logout completed');`
  },
  {
    id: 12,
    question: "What is readyState on a WebSocket object?",
    shortAnswer: "An integer representation of the active status of the WebSocket instance: CONNECTING (0), OPEN (1), CLOSING (2), or CLOSED (3).",
    detailedAnswer: "The `readyState` read-only attribute represents the state of the connection. Handlers should inspect this value before calling operations like `send()` or `close()` to avoid exceptions.\n\n### The Four States\n\n- **`0` (WebSocket.CONNECTING):** Connection has been instantiated, but the HTTP handshake has not yet completed.\n- **`1` (WebSocket.OPEN):** Handshake completed successfully. The socket is active and ready to transmit data.\n- **`2` (WebSocket.CLOSING):** The closing handshake is actively in progress or `close()` was called.\n- **`3` (WebSocket.CLOSED):** The connection is dead, or could not be established in the first place.\n\nTrying to send data on a socket with `readyState` at `0`, `2`, or `3` will throw an invalid state DOMException.",
    category: Category.ClientAPI,
    difficulty: Difficulty.Beginner,
    keyTakeaways: [
      "Use descriptive constant comparisons rather than raw numbers (e.g., ws.readyState === WebSocket.OPEN).",
      "ReadyState transitions sequentially from 0 -> 1 -> 2 -> 3.",
      "Errors automatically push the state towards 3 (CLOSED)."
    ],
    tags: ["ReadyState", "State Machine", "Error Prevention"],
    interactiveDiagramId: "state_machine_simulator",
    codeSnippet: `// Safe sending function checking state
function safeSend(socket, message) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
    return true;
  }
  console.warn('Socket is not active. State:', socket.readyState);
  return false;
}`
  },
  {
    id: 13,
    question: "How do you handle reconnection when a WebSocket drops?",
    shortAnswer: "Avoid infinite immediate loops. Listen to `onclose` and implement reconnect attempts with an Exponential Backoff delay.",
    detailedAnswer: "WebSockets can drop frequently due to server restarts, microservices deployment, mobile handoffs (switching from Wi-Fi to cellular data), or brief network brownouts.\n\n### Immediate Reconnection Risk\nIf you simply reconnect immediately on `onclose`, and your server is crashed or suffering a database blackout, thousands of active clients will hammer your server instantly in an accidental **Distributed Denial of Service (DDoS)** attack. This is known as a Thundering Herd.\n\n### The Solution\nUse a retry wrapper that increases the delay between subsequent reconnect attempts (exponential backoff) and adds random jitter (noise) to distribute client load.",
    category: Category.NetworkPerformance,
    difficulty: Difficulty.Advanced,
    keyTakeaways: [
      "Never run simple immediate 'setInterval' or immediate 'onclose' reconnect loops.",
      "Add randomized Jitter to prevent massive synchronization issues.",
      "Re-subscribe to all required topics or send authentication payloads after re-opening."
    ],
    tags: ["Reconnection", "Backoff", "Thundering Herd"],
    interactiveDiagramId: "reconnect_simulation",
    codeSnippet: `class ReconnectingWS {
  constructor(url) {
    this.url = url;
    this.attempts = 0;
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => { this.attempts = 0; };
    this.ws.onclose = () => { this.scheduleReconnect(); };
  }

  scheduleReconnect() {
    this.attempts++;
    // Exponential formula with max limit
    const delay = Math.min(1000 * Math.pow(2, this.attempts), 30000);
    // Add jitter
    const finalDelay = delay + Math.random() * 1000;
    console.log(\`Retrying connection in \${finalDelay.toFixed(0)}ms\`);
    setTimeout(() => this.connect(), finalDelay);
  }
}`
  },
  {
    id: 14,
    question: "What is exponential backoff and why use it for reconnection?",
    shortAnswer: "An algorithmic retry delay that doubles the wait period after each consecutive failure, reducing server hammering and client battery waste.",
    detailedAnswer: "Exponential Backoff is an error-handling algorithm commonly used in networks. \n\n### The Mathematical Formula\nLet $T_{delay}$ be the delay for the $n$-th failed attempt, $T_{base}$ be the initial wait block, and $T_{max}$ be the maximum wait cap:\n\n$$T_{delay} = \\min(T_{base} \\times 2^{n}, T_{max}) + \\text{Jitter}$$\n\n### Why it's essential\n1. **Reduces Load:** Prevents thousands of crashed clients from crushing your server once it reboots.\n2. **Network Friendliness:** Gives networks breathing room to resolve routing/handover glitches.\n3. **Power/Battery Savings:** Halts unnecessary, continuous browser socket threads, saving battery cycles on mobile devices.",
    category: Category.NetworkPerformance,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "A classic backoff doubles the previous delay on each failed attempt.",
      "Jitter represents small random deviations added to spread clients across time.",
      "Commonly capped at 15-30 seconds maximum."
    ],
    tags: ["Math", "Algorithms", "Resilience"],
    interactiveDiagramId: "backoff_calculator",
    mathFormula: "T_{delay} = \\min(T_{base} \\times 2^{n}, T_{max}) + \\text{Jitter}",
    mathExplanation: "Calculated retry delay in seconds where n represents the failure count."
  },
  {
    id: 15,
    question: "How would you show connection status in a UI?",
    shortAnswer: "Map the socket's readyState to React state, and render highly visible badges (e.g., green for connected, amber for connecting, red for disconnected).",
    detailedAnswer: "Exposing socket states directly ensures users understand the source of static feeds or failing input submissions. \n\n### Implementation Guidelines\n1. Use a state value representing connection status (`'connecting' | 'connected' | 'disconnected'`).\n2. Hook up handlers in the socket manager to trigger state updates when callbacks fire.\n3. Render corresponding visual indicators like blinking dots, layout bars, or status text.\n\nFor premium high-density designs, consider utilizing subtle animations (such as keyframe pulses) to represent heartbeat signals.",
    category: Category.ClientAPI,
    difficulty: Difficulty.Beginner,
    keyTakeaways: [
      "Provide actionable text to users when disconnected (e.g. 'Reconnecting in 5s...').",
      "Disable action buttons (like 'Submit Message') when disconnected.",
      "Provide an explicit retry button for instant reconnect overrides."
    ],
    tags: ["UI Design", "Status Indicators", "React Integration"],
    interactiveDiagramId: "status_badge_playground",
    codeSnippet: `// Standard status hooks in React components
const [status, setStatus] = useState('connecting');

useEffect(() => {
  const ws = new WebSocket(URL);
  ws.onopen = () => setStatus('connected');
  ws.onclose = () => setStatus('disconnected');
  return () => ws.close();
}, []);`
  },
  {
    id: 16,
    question: "How do you handle messages arriving in different formats (JSON vs binary)?",
    shortAnswer: "Check `event.data` payload type: parse string messages as JSON, and handle Blobs or ArrayBuffers depending on client binary setup.",
    detailedAnswer: "WebSocket supports both text (UTF-8) and binary transport frames simultaneously. Handlers must dynamically inspect the incoming payload to determine how to parse it.\n\n### The Strategy\n```javascript\nws.onmessage = async (event) => {\n  if (typeof event.data === 'string') {\n    // Handle Text (JSON)\n    try {\n      const json = JSON.parse(event.data);\n      handleJSONMessage(json);\n    } catch (e) {\n      handleStringMessage(event.data);\n    }\n  } else {\n    // Handle Binary\n    // In browser, event.data is usually a Blob by default.\n    // If ws.binaryType = 'arraybuffer', it will be an ArrayBuffer instead.\n    const arrayBuffer = await event.data.arrayBuffer();\n    handleBinaryMessage(arrayBuffer);\n  }\n};\n```",
    category: Category.ClientAPI,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Set ws.binaryType = 'arraybuffer' for manual byte manipulation.",
      "Validate JSON parse operations inside a try-catch to avoid app crashes.",
      "Binary transport avoids serialization overhead, essential for compression."
    ],
    tags: ["Data Parsing", "Binary Frame", "JSON Handling"],
    interactiveDiagramId: "format_selector_playground"
  },
  {
    id: 17,
    question: "What is a common React pattern for consuming WebSocket data?",
    shortAnswer: "A custom hook wrapping connection setup and lifecycle inside a `useEffect`, exposing state or a callback emitter to other components.",
    detailedAnswer: "In React, managing external event streams requires careful lifecycle synchronization. If not implemented properly, component re-renders will spawn hundreds of concurrent sockets.\n\n### Custom Hook Pattern\nA resilient custom hook encapsulates initialization, assigns event listeners, synchronizes status, handles callbacks, and yields cleanups inside a single hook interface.",
    category: Category.ClientAPI,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Encapsulate socket mechanics inside custom reusable hooks (e.g., useWebSocket).",
      "Avoid re-instantiating sockets inside standard re-render cycles.",
      "Provide state/ref overrides for long-lived socket instances."
    ],
    tags: ["React Hook", "UseEffect", "State Management"],
    interactiveDiagramId: "react_hook_diagram",
    codeSnippet: `// Example useWebSocket Custom Hook
export function useWebSocket(url) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('connecting');

  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onopen = () => setStatus('connected');
    ws.onmessage = (e) => setData(JSON.parse(e.data));
    ws.onclose = () => setStatus('disconnected');

    return () => {
      ws.close(); // Crucial cleanup step!
    };
  }, [url]);

  return { data, status };
}`
  },
  {
    id: 18,
    question: "Why is cleanup (ws.close()) important in a useEffect for WebSockets?",
    shortAnswer: "Failing to close sockets triggers client memory leaks, double triggering, ghost events, and resource starvation on backend servers.",
    detailedAnswer: "In React, `useEffect` executes whenever dependency keys change, or when components mount. If your hook doesn't return a cleanup function containing `.close()`:\n\n1. **Ghost Connections:** The old WebSocket remains open in browser memory, receiving payloads in the background.\n2. **Zombie State Updates:** If a background socket receives a message and calls `setData()`, React will throw errors because the component was unmounted.\n3. **Throttled Browsers:** Browsers enforce concurrent socket limits per domain (typically 6-10). Unclosed sockets quickly exhaust this pool, freezing new connection attempts.",
    category: Category.ClientAPI,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Always return a cleanup closure that calls ws.close() or ws.onclose = null.",
      "Memory leak debugging can be monitored via Chrome DevTools Network Tab.",
      "Saves expensive socket allocations on your backend."
    ],
    tags: ["React Performance", "Memory Leaks", "Cleanup"],
    interactiveDiagramId: "memory_leak_simulator"
  },
  {
    id: 19,
    question: "How do you avoid re-rendering an entire list when only one WebSocket-driven item updates?",
    shortAnswer: "Normalize data state using an index hash map by ID, and memoize child components using React.memo or custom props comparison.",
    detailedAnswer: "In rich high-frequency feeds (like crypto prices or stock indicators), updating a single state array causes React to re-render the *entire* list of components. Under 100 updates/sec, the browser will drop frames and lag.\n\n### The Optimization Stack\n1. **State Normalization:** Store items in an object indexed by ID: `{ [id]: item }`.\n2. **Child Memoization:** Wrap the child card component in `React.memo()` so it only re-renders when its *specific* props change.\n3. **Windowing / Virtualization:** Use lists like `react-window` to only render the visible elements on screen, keeping the virtual node count minimal.",
    category: Category.NetworkPerformance,
    difficulty: Difficulty.Advanced,
    keyTakeaways: [
      "Avoid raw arrays for high-frequency lists; use ID-indexed objects.",
      "Use React.memo to protect list children from parent re-renders.",
      "Virtualization handles large records safely (e.g., 10k rows)."
    ],
    tags: ["React.memo", "Rendering Optimization", "State Normalization"],
    interactiveDiagramId: "rendering_optimizer_tool",
    codeSnippet: `// Wrapping list child inside Memo
import React from 'react';

export const PriceRow = React.memo(({ id, price, symbol }) => {
  console.log(\`Rendering Row Symbol: \${symbol}\`);
  return (
    <div className="flex justify-between py-2 border-b">
      <span>{symbol}</span>
      <span className="font-mono text-emerald-500">{price}</span>
    </div>
  );
}, (prev, next) => prev.price === next.price);`
  },
  {
    id: 20,
    question: "What is a heartbeat/ping-pong mechanism in WebSockets?",
    shortAnswer: "Periodic small control frames exchanged between client and server to verify the physical TCP link is still active.",
    detailedAnswer: "Because TCP/IP connections are designed to be extremely resilient, if a user unplugs their ethernet cable or loses cellular signal without closing the socket explicitly, both the browser and server can believe the connection is still alive for *minutes* or *hours*. This is called a **half-open connection**.\n\n### Heartbeats\nTo prevent zombie connections, both parties implement a periodic Ping/Pong mechanism. The server (or client) periodically broadcasts a `ping` frame. The recipient must instantly answer with a `pong` frame. If a pong is missing, the connection is assumed broken and terminated.",
    category: Category.NetworkPerformance,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Dangling TCP sockets waste memory and block server resources.",
      "Standard WebSocket protocols support native Ping (0x9) and Pong (0xA) frames.",
      "Browsers do not expose raw Ping/Pong APIs; developers write application-level heartbeats (e.g. JSON sends)."
    ],
    tags: ["Heartbeat", "TCP", "Zombie Connections"],
    interactiveDiagramId: "heartbeat_simulator"
  },
  {
    id: 21,
    question: "How do you implement a ping/pong keep-alive?",
    shortAnswer: "Configure a timer on the server/client that sends a ping payload every X seconds, resetting a timeout. If the counterpart doesn't respond in time, disconnect.",
    detailedAnswer: "Since the browser doesn't expose native Ping control frames directly via JavaScript, developers usually implement a heartbeat using standard text frames containing custom messages like `{\"type\":\"ping\"}`.\n\n### Server-Side Implementation (Node.js/ws)\n```javascript\nimport { WebSocketServer } from 'ws';\nconst wss = new WebSocketServer({ port: 8080 });\n\n// Mark each socket as alive\nwss.on('connection', (ws) => {\n  ws.isAlive = true;\n  ws.on('pong', () => ws.isAlive = true); // client pong received\n});\n\n// Run check interval\nconst interval = setInterval(() => {\n  wss.clients.forEach((ws) => {\n    if (ws.isAlive === false) return ws.terminate(); // Kill zombie\n    ws.isAlive = false;\n    ws.ping(); // send native ping frame\n  });\n}, 30000);\n\nwss.on('close', () => clearInterval(interval));\n```",
    category: Category.NetworkPerformance,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Perform passive listening; let servers trigger pings to conserve client bandwidth.",
      "Always clear keep-alive intervals when closing connections to avoid timer leaks.",
      "Keep payload text as small as possible (e.g. 'p')."
    ],
    tags: ["Keep-Alive", "Node.js", "Server Ping"],
    interactiveDiagramId: "ping_pong_diagram"
  },
  {
    id: 22,
    question: "What are WebSocket close codes used for?",
    shortAnswer: "Standardized 4-digit integers indicating the exact reason a socket closed, helping clients decide whether or not to trigger reconnection algorithms.",
    detailedAnswer: "RFC 6455 defines clear, numbered ranges for WebSocket close codes to represent standard conditions.\n\n### Standard Close Codes\n\n- **`1000` (Normal Closure):** Grateful disconnect (e.g., user logged out).\n- **`1001` (Going Away):** Server is shutting down or browser navigated away.\n- **`1006` (Abnormal Closure):** TCP connection dropped without close handshake (e.g., wifi lost).\n- **`1009` (Message Too Big):** Payload exceeded maximum buffer allowance.\n- **`1011` (Server Error):** Uncaught backend exception terminated socket.\n\nUsing these codes allows client libraries to immediately differentiate between temporary outages (like `1006` or `1001` — safe to reconnect) and configuration errors (like `1008` or `1009` — do not reconnect).",
    category: Category.ClientAPI,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Codes 1000-2999 are reserved for internal protocol definitions.",
      "Client reconnect logic should read the event.code to decide on retry delays.",
      "Always set custom close codes in ranges 3000-4999."
    ],
    tags: ["Close Codes", "Error Handling", "RFC 6455"],
    interactiveDiagramId: "close_code_lookup"
  },
  {
    id: 23,
    question: "How do you authenticate a WebSocket connection?",
    shortAnswer: "Pass a JWT in query parameters during handshake (secured via HTTPS), use cookie headers, or issue an authenticated 'init' message right after connection.",
    detailedAnswer: "Since the browser `WebSocket` constructor does not allow custom headers like `Authorization: Bearer <token>`, you cannot use standard REST authentication patterns.\n\n### The Three Authentication Vectors\n\n1. **Secure Cookies:** Standard HTTP cookies are sent automatically during the handshake GET request. This is the most secure method because you can mark cookies as `HttpOnly` and `SameSite=Strict` to prevent XSS theft.\n2. **URL Query Parameters:** `wss://example.com/stream?token=JWT_HERE`. Although easy, query strings are often cached in proxy or server logs, posing a security risk.\n3. **Post-Handshake Authentication:** Connect first with limited authorization, then require the client to immediately send an authentication frame (e.g. `{ \"type\": \"AUTH\", \"token\": \"JWT\" }`). If no valid token arrives in 5 seconds, close the socket.",
    category: Category.ScalingProduction,
    difficulty: Difficulty.Advanced,
    keyTakeaways: [
      "Avoid passing plain passwords; use short-lived single-use ticket tokens.",
      "Always use wss:// so URL tokens are encrypted over the wire.",
      "Configure automatic timeouts for sockets that fail to authenticate within seconds of connecting."
    ],
    tags: ["Authentication", "JWT", "Security Hardening"],
    interactiveDiagramId: "auth_flowchart"
  },
  {
    id: 24,
    question: "Why can't you set custom headers (like Authorization) on a browser WebSocket connection?",
    shortAnswer: "The browser native `WebSocket` API constructor does not support custom header options to prevent arbitrary protocol spoofing and secure browser sandboxes.",
    detailedAnswer: "In standard browser environments, WebSockets are initiated via the `WebSocket(url, protocols)` constructor. \n\n### The Browser's Reason\nThe restriction is a security choice by the W3C and browser manufacturers:\n1. **Sandbox Enforcement:** Allowing custom HTTP headers would let scripts arbitrary forge client authentication signatures on sockets outside CORS protection.\n2. **Simple API Design:** Keeping initialization simple keeps native platform size down.\n\n### Alternative Workarounds\n- Pass authorization tokens via **Subprotocols** (the second array argument of the WebSocket constructor).\n- Rely on **Cookies** which are shared automatically.\n- Use **Query strings** (be sure tokens expire within seconds of creation).",
    category: Category.ClientAPI,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Native browser WebSockets are deliberately isolated from custom request-header controls.",
      "The Sec-WebSocket-* headers are protected by the browser and cannot be modified by scripts.",
      "Custom authentication protocols must utilize alternative vectors."
    ],
    tags: ["API Limits", "W3C Spec", "HTTP Headers"],
    interactiveDiagramId: "header_workaround"
  },
  {
    id: 25,
    question: "What is Socket.IO and how does it relate to WebSocket?",
    shortAnswer: "A library built on top of WebSockets that provides automatic reconnection, room multiplexing, and polling fallbacks.",
    detailedAnswer: "Socket.IO is **not** a pure WebSocket client. It is a full framework built around **Engine.IO**.\n\n### Relationship & Features\nSocket.IO uses WebSocket as its primary transport when available. If WebSockets are blocked (e.g., by older proxies), Socket.IO gracefully degrades to HTTP long-polling.\n\n### Core differences from raw WS\n- **Auto Reconnect:** Reconnects automatically if disconnected.\n- **HTTP Fallback:** Guarantees connection works even on legacy environments.\n- **Rooms and Namespaces:** Built-in server-side grouping models.\n- **Custom Event Names:** Send payloads to specific event names: `socket.emit('my_event', data)` rather than parsed raw JSON strings.",
    category: Category.ScalingProduction,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Socket.IO client and server require matched custom library bindings; you cannot connect with standard browser WebSockets.",
      "Excellent choice for fast-paced team developments needing instant chat rooms.",
      "Incurs dependency weight compared to raw native browser connections."
    ],
    tags: ["Socket.IO", "Libraries", "Protocol Fallbacks"],
    interactiveDiagramId: "socketio_comparison"
  },
  {
    id: 26,
    question: "When would you use raw WebSocket vs Socket.IO?",
    shortAnswer: "Use raw WebSockets for minimal overhead, standard browser native setups, and lightweight performance. Use Socket.IO when you need out-of-the-box resilience, fallback routing, and complex group-based broadcasting.",
    detailedAnswer: "Choosing between raw WebSockets and Socket.IO depends on your project's scaling goals, tech stack, and environment constraints.\n\n### Decision Framework\n\n#### Choose Raw WebSocket If:\n- **High Performance:** Every byte of transport counts (avoiding Socket.IO's internal wrapping protocols).\n- **Browser Native:** You want a clean solution without third-party client dependencies.\n- **Non-Node Backends:** You are building servers in Go, Rust, or Elixir (where standard WebSocket protocols are native, but Socket.IO adapters are scarce or outdated).\n- **API Gateways:** You are deploying behind AWS API Gateway or custom load balancers that handle raw WebSockets natively.\n\n#### Choose Socket.IO If:\n- **Guaranteed Fallback:** Your clients are running on strict corporate networks that block protocol upgrades.\n- **Rooms/Multiplexing:** You are building multi-room collaboration suites or chat applications.\n- **Out-of-the-Box Reconnection:** You do not want to write custom retry and backoff systems from scratch.",
    category: Category.Fundamentals,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Raw WebSockets are lightweight and natively supported by almost all backend frameworks.",
      "Socket.IO adds robust fallback layers but increases bundle size and lock-in.",
      "Most modern infrastructures (e.g., AWS, GCP, Cloudflare) support raw WebSockets natively."
    ],
    tags: ["Architecture", "Engine.IO", "Framework Choice"],
    interactiveDiagramId: "decision_matrix_tool"
  },
  {
    id: 27,
    question: "What is a 'room' in Socket.IO?",
    shortAnswer: "A server-side logical channel that clusters connected sockets together, allowing for targeted multi-recipient broadcasting without manual tracking.",
    detailedAnswer: "In Socket.IO, **Rooms** are a purely server-side grouping mechanism. A socket can join or leave any room dynamically, and multiple sockets can belong to the same room.\n\n### How it works under the hood\n1. Sockets join rooms using `socket.join('room-id')`.\n2. The server broadcasts a message using `io.to('room-id').emit('event', data)`.\n3. The Socket.IO server engine automatically iterates through the clustered sockets in memory and sends individual frames to those connections.\n\nRooms are highly useful because they handle stateful client groups automatically, removing the need for developers to maintain custom arrays of socket instances in memory.",
    category: Category.ScalingProduction,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Rooms are virtual and not shared with the client. Clients cannot see what rooms they are in.",
      "Ideal for chat rooms, game lobbies, or document collaboration channels.",
      "Scaling across multiple servers requires a Redis adapter to synchronize rooms."
    ],
    tags: ["Socket.IO", "Rooms", "Broadcasting"],
    interactiveDiagramId: "socket_rooms_visual"
  },
  {
    id: 28,
    question: "How would you scale WebSocket servers horizontally?",
    shortAnswer: "Deploy multiple server instances behind a WebSocket-compatible load balancer and synchronize messages across them using a Redis Pub/Sub adapter.",
    detailedAnswer: "Unlike stateless HTTP servers, WebSocket servers are **highly stateful**. When client A connects to Server 1, and client B connects to Server 2, they cannot communicate directly because their TCP sockets reside on different machines.\n\n### Scaling Architecture (Redis Pub/Sub)\nTo solve this, you introduce a shared message-bus layer:\n1. Server 1 and Server 2 subscribe to a global Redis cluster.\n2. When client A sends a message destined for client B, Server 1 receives it and publishes it to Redis.\n3. Redis broadcasts the event to all server instances.\n4. Server 2 receives the event from Redis, recognizes that client B is connected to it, and forwards the message to client B's open socket.",
    category: Category.ScalingProduction,
    difficulty: Difficulty.Advanced,
    keyTakeaways: [
      "Redis Pub/Sub acts as the central nervous system for horizontally scaled stateful servers.",
      "Load balancers must be configured with Sticky Sessions if long-polling fallbacks are used.",
      "Enables horizontal scaling up to millions of concurrent socket connections."
    ],
    tags: ["Scale Out", "Redis", "Pub/Sub"],
    interactiveDiagramId: "horizontal_scaling_flow",
    codeSnippet: `// Concept for scaled message broadcasting via Redis
const redis = require('redis');
const publisher = redis.createClient();
const subscriber = redis.createClient();

subscriber.subscribe('chat-room-1');
subscriber.on('message', (channel, message) => {
  // Broadcast received Redis message to local connected sockets
  localSockets.forEach(ws => ws.send(message));
});`
  },
  {
    id: 29,
    question: "What is the C10K problem in the context of WebSocket servers?",
    shortAnswer: "The technical challenge of handling 10,000+ concurrent, long-lived open connections on a single machine, requiring event-driven, non-blocking network stacks.",
    detailedAnswer: "The **C10K problem** (defined by Dan Kegel in 1999) refers to optimizing network sockets to support ten thousand concurrent connections on a single server.\n\n### The Thread-Per-Connection Bottleneck\nIn traditional thread-per-connection servers (like older Apache configurations), each client connection spawned its own dedicated OS thread. Spawning 10,000 threads consumes gigabytes of RAM and triggers extreme **context-switching overhead** in the CPU, leading to server crashes.\n\n### The Non-Blocking Solution\nModern environments like Node.js, Go, or Netty solve this using **Event-Driven, Non-Blocking I/O** (e.g. `epoll` in Linux, `kqueue` in macOS). A single thread listens to multiplexed file descriptors, handling traffic only when data is ready, allowing millions of concurrent open sockets with minimal RAM usage.",
    category: Category.ScalingProduction,
    difficulty: Difficulty.Advanced,
    keyTakeaways: [
      "WebSockets require extremely light connection allocations to prevent memory exhaustion.",
      "Use Linux system tuning parameters (like file descriptor limits 'ulimit -n') to enable high density.",
      "Event loops manage thousands of concurrent pipes on a single core."
    ],
    tags: ["C10K", "Event Loop", "Performance Tuning"],
    interactiveDiagramId: "c10k_thread_model"
  },
  {
    id: 30,
    question: "How do proxies/load balancers affect WebSocket connections?",
    shortAnswer: "Proxies must support protocol upgrades and maintain sticky, long-lived TCP connections, or they will terminate sockets prematurely.",
    detailedAnswer: "Standard HTTP proxies are built to handle rapid request-response cycles. WebSockets violate this model by remaining open indefinitely.\n\n### Key Considerations for Infrastructure Teams\n1. **Upgrade Headers:** Nginx, HAProxy, and Cloudflare must be explicitly configured to forward the `Upgrade` and `Connection` headers.\n2. **TCP Idle Timeouts:** Proxies close idle TCP links to free up file descriptors. If your load balancer has a 60-second idle timeout, and no messages are sent for 60 seconds, the proxy will abruptly drop the connection. Sockets must send heartbeats or the timeout must be increased.\n3. **Sticky Sessions:** If you use polling fallbacks (e.g. Socket.IO), subsequent requests must go to the *same* server, requiring sticky session cookies in the load balancer.",
    category: Category.ScalingProduction,
    difficulty: Difficulty.Advanced,
    keyTakeaways: [
      "Always set keep-alive times slightly below proxy idle timeout thresholds.",
      "Proxy configuration requires explicitly mapping the upgrade process.",
      "SSL termination at the load balancer level simplifies backend certificate management."
    ],
    tags: ["Proxies", "Nginx", "Infrastructure"],
    interactiveDiagramId: "proxy_timeout_simulator"
  },
  {
    id: 31,
    question: "How do you test WebSocket-based features?",
    shortAnswer: "Test using mock socket libraries in unit tests, or launch a lightweight local server to run automated integration tests.",
    detailedAnswer: "Testing asynchronous real-time events can be challenging with standard synchronous unit test libraries.\n\n### Testing Framework Strategies\n\n1. **Unit Tests (Mocking):** Use libraries like `jest-websocket-mock` or mock the global `WebSocket` class. This allows you to verify that your components register event listeners correctly and send the expected payloads.\n2. **Integration Tests (Real Connection):** Launch a local testing server (e.g., a simple `ws` backend in Node.js) during your test runner suite. This verifies that your reconnection logic, auth sequences, and payload parsers function correctly under real network scenarios.",
    category: Category.RealWorldCases,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Avoid hitting production servers inside unit test pipelines.",
      "Mock WebSocket events manually to test extreme edge cases (like abrupt disconnects).",
      "Verify both text and binary framing in your integration assertions."
    ],
    tags: ["Testing", "Jest", "Automation"],
    interactiveDiagramId: "testing_playground",
    codeSnippet: `// Example unit test using a mocked WebSocket environment
import { WebSocket, Server } from 'mock-socket';

test('client sends greeting on open', async () => {
  const fakeURL = 'ws://localhost:8080';
  const mockServer = new Server(fakeURL);
  
  mockServer.on('connection', socket => {
    socket.on('message', data => {
      expect(data).toBe('Hello server!');
    });
  });

  const ws = new WebSocket(fakeURL);
  ws.onopen = () => ws.send('Hello server!');
});`
  },
  {
    id: 32,
    question: "What's a common bug with WebSocket message ordering?",
    shortAnswer: "Assuming messages arrive in order after a connection drops and reconnects, creating race conditions and state corruption.",
    detailedAnswer: "While a single TCP connection guarantees that data frames arrive in the exact order they were sent, **reconnections break this guarantee completely**.\n\n### The Reconnect Race Condition\nSuppose your client sends Message 1, the connection drops, you trigger an exponential backoff reconnect, and then you send Message 2. If your client queues Message 2 and sends it after reconnecting, but the server processes them asynchronously, they can easily arrive or be saved out-of-order.\n\n### The Solution\nAssign a **sequence number (ID)** to every message sent. Have the receiver store incoming messages in a queue, sort them by sequence ID, and process them sequentially to avoid race conditions.",
    category: Category.NetworkPerformance,
    difficulty: Difficulty.Advanced,
    keyTakeaways: [
      "TCP guarantees frame ordering *only* within a single active connection.",
      "Reconnects create race conditions for pending or buffered messages.",
      "Implement client-side sequence tracking for mission-critical events."
    ],
    tags: ["Race Conditions", "Data Integrity", "Message Order"],
    interactiveDiagramId: "order_race_simulator"
  },
  {
    id: 33,
    question: "How do you handle missed messages after a reconnect?",
    shortAnswer: "Request a fresh state snapshot from the server on reconnect, or have the server replay missed events since a specific client-provided timestamp.",
    detailedAnswer: "If a WebSocket drops for 10 seconds, several important updates may have occurred on the server during that downtime.\n\n### Recovery Strategies\n\n1. **Re-sync Snapshot (Simple):** Upon reconnect, have the client send a request for the current full state of the resource (e.g. 'fetch_chat_history'). This clears out the local state and replaces it with the latest source-of-truth from the database.\n2. **Sequence Replay (Advanced):** The client tracks the ID of the last message it successfully received. On reconnect, the client passes this ID: `wss://example.com?lastSeenId=412`. The server then queries its database or event store and plays back only the missed events.",
    category: Category.NetworkPerformance,
    difficulty: Difficulty.Advanced,
    keyTakeaways: [
      "Do not rely on the client's memory for missed events.",
      "Replaying missed events is highly efficient for collaborative editors.",
      "Fetch a full snapshot if the client has been offline for too long."
    ],
    tags: ["State Recovery", "Event Replay", "Syncing"],
    interactiveDiagramId: "missed_messages_playground"
  },
  {
    id: 34,
    question: "How would you throttle high-frequency WebSocket updates in the UI (e.g. stock ticker)?",
    shortAnswer: "Batch/buffer incoming updates in memory and commit them to state on a fixed interval (e.g., every 200ms) to prevent UI lag.",
    detailedAnswer: "If a WebSocket server pushes updates at 100+ frames per second, updating your React component state on every single frame will overwhelm the browser's rendering engine, causing massive lag and high CPU usage.\n\n### Throttled Batching\nInstead of triggering a re-render on every message, push incoming messages into a local array (buffer) and run a background interval (e.g. every 100-250ms) to flush the buffer and update React state once.\n\n```javascript\nlet updateBuffer = [];\n\nws.onmessage = (event) => {\n  const message = JSON.parse(event.data);\n  updateBuffer.push(message);\n};\n\n// Flush buffer 5 times a second\nsetInterval(() => {\n  if (updateBuffer.length > 0) {\n    updateUIState(updateBuffer);\n    updateBuffer = []; // Clear buffer\n  }\n}, 200);\n```",
    category: Category.NetworkPerformance,
    difficulty: Difficulty.Advanced,
    keyTakeaways: [
      "High-frequency updates should be batched to maintain a smooth 60fps UI.",
      "The human eye cannot process UI updates faster than 100ms anyway.",
      "Significantly reduces CPU overhead in complex dashboards."
    ],
    tags: ["Throttling", "Performance", "UI Rendering"],
    interactiveDiagramId: "throttling_simulator"
  },
  {
    id: 35,
    question: "What's the difference between binary and text WebSocket frames?",
    shortAnswer: "Text frames must contain valid UTF-8 string data, whereas binary frames carry raw bytes (ideal for custom binary protocols like Protobuf or streaming media).",
    detailedAnswer: "The WebSocket protocol defines different opcodes inside its frame headers to distinguish between text and binary data:\n- **Text Frame (Opcode `0x1`):** Payload must be valid UTF-8 encoded text. If the receiver detects invalid bytes, it must terminate the connection immediately.\n- **Binary Frame (Opcode `0x2`):** Payload is raw, unstructured bytes. The receiver passes the raw buffer to the client without validation.\n\n### Use Cases\n- **Text:** Ideal for JSON, XML, or plain text messages.\n- **Binary:** Crucial for audio/video streaming, file transfers, or highly optimized binary protocols (like Protocol Buffers or MessagePack) that reduce payload sizes by up to 80% compared to JSON.",
    category: Category.NetworkPerformance,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Text frames are validated for UTF-8 compatibility, which adds a minor CPU cost.",
      "Binary frames allow you to build custom, highly compact binary structures.",
      "Use Binary for files, images, or real-time media streams."
    ],
    tags: ["Framing", "Opcodes", "Binary vs Text"],
    interactiveDiagramId: "binary_frame_inspector"
  },
  {
    id: 36,
    question: "How would you implement a live chat feature with WebSocket?",
    shortAnswer: "Clients send message payloads via standard text frames; the server receives, saves to a database, and broadcasts them to all other participants in the room.",
    detailedAnswer: "A live chat is the classic use-case for WebSockets, leveraging its low-latency, bi-directional nature.\n\n### The Architecture\n1. **Send Message:** The client sends a JSON payload: `{\"type\": \"SEND_MSG\", \"roomId\": \"room_A\", \"text\": \"Hello!\"}`.\n2. **Database Save:** The server receives the frame, validates the sender, and writes the message to the database.\n3. **Broadcast:** The server fetches all active connections subscribed to `room_A` and writes the message to their TCP sockets.\n4. **Optimistic UI:** The sender can render their message in the chat list *immediately* before receiving the server confirmation to make the UI feel instantaneous.",
    category: Category.RealWorldCases,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Use Optimistic Rendering to make the chat feel instant and snappy.",
      "Keep message history stored in a database; only use WebSockets for real-time delivery.",
      "Handle offline delivery; notify clients of messages they missed while disconnected."
    ],
    tags: ["Chat", "Broadcasting", "Optimistic UI"],
    interactiveDiagramId: "chat_room_simulator"
  },
  {
    id: 37,
    question: "How would you show a 'typing...' indicator via WebSocket?",
    shortAnswer: "Send throttled 'typing' events on keystroke, broadcast them to other room members, and clear them on the recipient side with a brief timeout.",
    detailedAnswer: "Typing indicators are lightweight, high-frequency events. Sending a socket frame on every single keystroke is highly inefficient and creates unnecessary server load.\n\n### Efficient Implementation\n1. **Throttled Emitter:** On the sender side, monitor input changes. Send a `\"TYPING\"` socket event only when typing *starts*, and throttle subsequent events to fire at most once every 2-3 seconds.\n2. **Server Broadcast:** The server forwards the event to other users in the chat room.\n3. **Receiver Timeout:** On the receiver side, display the 'user is typing...' indicator. Start a local 3-second timer. If no new typing events are received within 3 seconds, automatically hide the indicator.",
    category: Category.RealWorldCases,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Never send socket events on every single keystroke; throttle them.",
      "Manage timeouts on the receiver side to handle users who close their tab mid-sentence.",
      "Keep typing payloads as small as possible."
    ],
    tags: ["Typing Indicator", "Throttling", "UX Patterns"],
    interactiveDiagramId: "typing_indicator_playground"
  },
  {
    id: 38,
    question: "What is backpressure in the context of WebSocket streaming?",
    shortAnswer: "A flow-control problem where a receiver cannot process incoming data as fast as it arrives, requiring the sender to slow down or buffer data.",
    detailedAnswer: "In real-time streaming (e.g., streaming live data logs or sensor telemetry), a fast sender can easily overwhelm a slow receiver.\n\n### Why it happens\nIf the browser's JavaScript main thread is blocked by heavy computations or complex rendering, the underlying WebSocket buffers will fill up. If the client cannot keep up, the TCP window size drops to zero, and the network buffer on the server fills up. Eventually, the server must either buffer messages in memory (risking out-of-memory crashes) or slow down its streaming rate.\n\n### Resolving Backpressure\nMonitor the `ws.bufferedAmount` in the browser client. If this value is rising, notify the server to slow down its transmission rate until the buffer is cleared.",
    category: Category.NetworkPerformance,
    difficulty: Difficulty.Advanced,
    keyTakeaways: [
      "Backpressure occurs when the consumption rate is slower than the production rate.",
      "In the browser, use ws.bufferedAmount to monitor client-side congestion.",
      "Slowing down the sender is the most effective way to prevent client memory crashes."
    ],
    tags: ["Backpressure", "Flow Control", "Congestion"],
    interactiveDiagramId: "backpressure_simulator"
  },
  {
    id: 39,
    question: "How would you secure a WebSocket server against abuse?",
    shortAnswer: "Enforce message size limits, rate-limit connection attempts, authenticate before allowing actions, and regularly validate/sanitize all incoming payloads.",
    detailedAnswer: "Because WebSocket connections are persistent, they are highly attractive targets for Denial of Service (DoS) and data injection attacks.\n\n### Essential Security Checklist\n\n1. **Rate Limiting:** Restrict the number of connection attempts and incoming messages per IP address using tools like Redis rate-limiters.\n2. **Payload Size Limits:** Enforce a strict maximum frame size (e.g., 10KB for chat text). Abruptly close connections that send excessively large payloads to prevent server memory exhaustion.\n3. **Input Sanitization:** Treat all incoming WebSocket data as untrusted. Sanitize and validate payloads before writing them to database collections or broadcasting them to other clients.\n4. **Origin Checks:** Validate the `Origin` header during the handshake to prevent Cross-Site WebSocket Hijacking (CSWSH) attacks.",
    category: Category.ScalingProduction,
    difficulty: Difficulty.Advanced,
    keyTakeaways: [
      "Always validate the 'Origin' header during the handshake to prevent hijacking.",
      "Enforce maximum message sizes to protect server memory allocations.",
      "Use TLS (wss://) to protect payloads from sniffing and proxy tampering."
    ],
    tags: ["Security", "CSWSH", "Abuse Prevention"],
    interactiveDiagramId: "security_checklist_tool"
  },
  {
    id: 40,
    question: "What's the tradeoff of using WebSocket for something that only needs occasional updates?",
    shortAnswer: "WebSockets consume persistent server memory and require complex load-balancing, which may be overkill compared to simple periodic REST polling or Server-Sent Events (SSE).",
    detailedAnswer: "While WebSockets are powerful, they are not always the best tool for every real-time feature.\n\n### The Tradeoffs\n\n- **Server Resources:** Each WebSocket connection requires a persistent TCP socket and server file descriptor. If you have 100,000 inactive users, they still consume server memory. In contrast, stateless HTTP polls release server resources immediately after responding.\n- **Load Balancing Complexity:** Scaling stateless HTTP is trivial. Scaling stateful WebSockets requires sticky routing and complex Pub/Sub sync layers.\n- **Reconnection Logic:** Sockets require custom, complex retry wrappers. HTTP requests handle transient drops naturally.\n\nIf your app only updates once every few minutes, simple polling or Server-Sent Events (SSE) will be far cheaper, easier to scale, and simpler to implement.",
    category: Category.Fundamentals,
    difficulty: Difficulty.Intermediate,
    keyTakeaways: [
      "Persistent sockets consume continuous server memory and file descriptors.",
      "For sparse, unidirectional updates, SSE or polling is often simpler and more cost-effective.",
      "Avoid WebSockets unless full-duplex, low-latency transmission is an absolute requirement."
    ],
    tags: ["Tradeoffs", "Cost Analysis", "Engineering Design"],
    interactiveDiagramId: "tradeoffs_visualizer"
  }
];
