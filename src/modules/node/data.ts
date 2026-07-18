import { QuestionData, CategoryData } from "./types";

export const CATEGORIES: CategoryData[] = [
  {
    id: "architecture",
    name: "Runtime & Architecture",
    icon: "Cpu",
    description: "Core internals of Node.js, V8 engine, and single-threaded nature.",
  },
  {
    id: "async",
    name: "Event Loop & Async",
    icon: "Activity",
    description: "The mechanics of non-blocking I/O, timers, callbacks, and microtasks.",
  },
  {
    id: "streams",
    name: "Buffers & Streams",
    icon: "FileCode",
    description: "Incremental data flow handling, raw binary memory, and pipeline design.",
  },
  {
    id: "express",
    name: "Express.js Basics",
    icon: "Server",
    description: "HTTP routing, server configuration, request flow, and response methods.",
  },
  {
    id: "middleware",
    name: "Middleware & Route Ops",
    icon: "GitFork",
    description: "Middleware pipelines, next(), error handling, parameters, and uploading files.",
  },
  {
    id: "security",
    name: "Security, Auth & Ops",
    icon: "ShieldAlert",
    description: "JWTs, CORS, rate limiting, encryption, validation, clustering, and databases.",
  },
];

export const QUESTIONS: QuestionData[] = [
  {
    id: 1,
    question: "What is Node.js?",
    answer: "A JavaScript runtime built on Chrome's V8 engine, allowing JS to run outside the browser — commonly used for backend servers. It leverages an event-driven, non-blocking I/O model making it efficient and lightweight.",
    category: "architecture",
    difficulty: "Easy",
    visualLabel: "Runtime Engine Simulator",
    keyTakeaways: [
      "Not a programming language or a framework; it's a runtime environment.",
      "Uses Chrome's V8 Engine to compile JavaScript directly into native machine code.",
      "Event-driven architecture enables extreme concurrency without multi-threading overhead.",
    ],
    codeExample: `// A simple native Node.js HTTP Server
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, Node.js Runtime!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
  },
  {
    id: 2,
    question: "Is Node.js single-threaded?",
    answer: "The main JS execution is single-threaded (it runs code on one event-loop thread), but I/O operations are handled asynchronously via the event loop and libuv's thread pool for certain blocking operations (like file system tasks, compression, or cryptography).",
    category: "architecture",
    difficulty: "Medium",
    visualLabel: "Multi-Thread offloading Simulator",
    keyTakeaways: [
      "JavaScript execution (v8) runs strictly on a single thread (the Main Thread).",
      "Offloads blocking operations to Libuv, which runs a default thread pool of 4 workers.",
      "Network I/O is handled directly by the operating system (epoll/kqueue) and is non-blocking.",
    ],
    codeExample: `// Running compute-heavy tasks blocks the main single thread!
const crypto = require('crypto');

// Synchronous - BLOCKS the event loop!
const hashSync = crypto.pbkdf2Sync('secret', 'salt', 100000, 64, 'sha512');

// Asynchronous - Runs on Libuv thread pool, event loop remains free!
crypto.pbkdf2('secret', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
  console.log('Async hash completed on thread pool!');
});`,
  },
  {
    id: 3,
    question: "What is the event loop?",
    answer: "The event loop is the core mechanism that allows Node.js to perform non-blocking I/O. It continually monitors the execution stack and the callback queues, pulling pending callbacks onto the main execution stack once it is completely empty.",
    category: "async",
    difficulty: "Medium",
    visualLabel: "Interactive Event Loop Cycle",
    keyTakeaways: [
      "Continuously loops as long as there are pending timers, network events, or file system callbacks.",
      "Operates by scheduling non-blocking asynchronous callbacks to be run later.",
      "Prevents thread blockages by assigning operations to system kernels or the worker pool.",
    ],
    codeExample: `console.log('First (Call Stack)');

// Offloaded to timer queue
setTimeout(() => {
  console.log('Third (Event Loop Callback)');
}, 0);

console.log('Second (Call Stack)');`,
  },
  {
    id: 4,
    question: "What are the phases of the event loop?",
    answer: "Roughly: timers, pending callbacks, idle/prepare, poll (I/O), check (setImmediate), and close callbacks. Each phase maintains its own queue of callbacks which must be fully depleted before transitioning to the next phase.",
    category: "async",
    difficulty: "Hard",
    visualLabel: "Phase Execution Queue Simulator",
    keyTakeaways: [
      "Timers: Executes callbacks scheduled by setTimeout() and setInterval().",
      "Poll: Retrieves new I/O events; executes I/O related callbacks.",
      "Check: Executes setImmediate() callbacks immediately after the poll phase.",
    ],
    codeExample: `const fs = require('fs');

fs.readFile(__filename, () => {
  // Inside I/O callback, setImmediate ALWAYS runs before setTimeout(0)
  setTimeout(() => console.log('Timer Phase Callback'), 0);
  setImmediate(() => console.log('Check Phase Callback'));
});`,
  },
  {
    id: 5,
    question: "What is the difference between process.nextTick() and setImmediate()?",
    answer: "process.nextTick() callbacks run immediately after the current operation finishes, before the event loop continues to the next phase (highest priority). setImmediate() is designed to run in the 'Check' phase of the event loop, after I/O polling completes.",
    category: "async",
    difficulty: "Hard",
    visualLabel: "Microtask Queue Execution Priority",
    keyTakeaways: [
      "process.nextTick() is technically NOT part of the event loop. It executes in the microtask queue.",
      "Recursive process.nextTick() calls can starve the event loop by preventing it from ever advancing.",
      "setImmediate() yields to the event loop phases, keeping the server responsive.",
    ],
    codeExample: `setImmediate(() => console.log('setImmediate (Check phase)'));

process.nextTick(() => {
  console.log('process.nextTick (Microtask queue - RUNS FIRST!)');
});

console.log('Synchronous code');`,
  },
  {
    id: 6,
    question: "What is a callback vs a Promise vs async/await?",
    answer: "Callbacks are functions passed as arguments to execute upon task completion. Promises are formal objects representing future completion/failure of an async action. Async/await is a syntactic wrapper around Promises that allows writing async code that looks synchronous.",
    category: "async",
    difficulty: "Easy",
    visualLabel: "Asynchronous Syntactic Timelines",
    keyTakeaways: [
      "Callbacks have no standard built-in error handling mechanism, leading to custom parameters (err, data).",
      "Promises allow modern chaining (.then().catch()) and parallel resolution with Promise.all().",
      "Async/await supports traditional try/catch blocks for clean, highly readable error boundaries.",
    ],
    codeExample: `// 1. Callback Style
getData((err, res) => { if (!err) console.log(res); });

// 2. Promise Style
getDataPromise()
  .then(res => console.log(res))
  .catch(err => console.error(err));

// 3. Async/Await Style
async function run() {
  try {
    const res = await getDataPromise();
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}`,
  },
  {
    id: 7,
    question: "What is 'callback hell' and how do Promises/async-await help?",
    answer: "Callback hell occurs when multiple asynchronous operations are nested sequentially, creating highly nested, unreadable, and brittle pyramid-like code. Promises flatten this into chains, while async/await fully serializes the visual layout of code.",
    category: "async",
    difficulty: "Medium",
    visualLabel: "Callback Pyramid Refactor Tool",
    keyTakeaways: [
      "Callback Hell (or 'Pyramid of Doom') makes error tracing and control flow incredibly difficult.",
      "Promises flatten nesting by returning another Promise from within .then().",
      "Async/await makes error catch blocks uniform across multiple sequential asynchronous actions.",
    ],
    codeExample: `// ❌ Callback Hell
loginUser(user, (err, u) => {
  getProfile(u.id, (err, profile) => {
    getPosts(profile.id, (err, posts) => {
      console.log(posts);
    });
  });
});

// ✅ Modern Async/Await Alternative
try {
  const u = await loginUser(user);
  const profile = await getProfile(u.id);
  const posts = await getPosts(profile.id);
  console.log(posts);
} catch (err) {
  console.error(err);
}`,
  },
  {
    id: 8,
    question: "What is the require vs import difference in Node?",
    answer: "require() belongs to CommonJS (CJS) and loads modules synchronously at runtime. import belongs to ES Modules (ESM), which supports static compilation, pre-execution analysis, and asynchronous imports.",
    category: "architecture",
    difficulty: "Medium",
    visualLabel: "CJS vs ESM Loader Comparison",
    keyTakeaways: [
      "CommonJS is the legacy default. require() can be conditionally called inside if statements.",
      "ES Modules represent standard JS. import statements must generally sit at top-level files.",
      "ESM supports Tree Shaking (excluding unused code parts automatically during builds).",
    ],
    codeExample: `// CommonJS (CJS) - file.js
const { log } = require('./utils');
module.exports = { run: () => log('CJS') };

// ES Modules (ESM) - file.mjs (or package.json "type": "module")
import { log } from './utils.js';
export const run = () => log('ESM');`,
  },
  {
    id: 9,
    question: "What is npm vs npx?",
    answer: "npm is a package manager used to install, update, and manage dependency packages in node_modules. npx is a package runner tool that executes binaries from npm packages directly without requiring local or global permanent installation.",
    category: "architecture",
    difficulty: "Easy",
    visualLabel: "npm Cache & Run Simulator",
    keyTakeaways: [
      "npm downloads packages and adds their records directly into your package.json dependencies.",
      "npx temporarily fetches and executes executable packages, cleaning up the downloaded cache immediately.",
      "Excellent for running temporary CLI helpers like create-react-app or prisma without cluttering global paths.",
    ],
    codeExample: `# Installs package locally into node_modules
npm install tailwindcss

# Runs a tool command once without installing it permanently
npx tailwindcss init`,
  },
  {
    id: 10,
    question: "What is package.json?",
    answer: "The fundamental configuration and metadata manifest file of a Node.js project. It lists production/dev dependencies, CLI execution scripts, author, licensing, package engine compatibility, and entrypoints.",
    category: "architecture",
    difficulty: "Easy",
    visualLabel: "Interactive package.json Explorer",
    keyTakeaways: [
      "A standard JSON format which dictates package setups.",
      "Dependencies: Packages required at runtime. devDependencies: Local tools needed for builds/lints.",
      "Allows pinning semantic versions using tilde (~), caret (^), or exact identifiers.",
    ],
    codeExample: `{
  "name": "my-express-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}`,
  },
  {
    id: 11,
    question: "What is package-lock.json for?",
    answer: "It locks down the exact version of every single package and sub-package installed in node_modules. This guarantees identical environment setups for every developer, CI/CD pipeline, and server deploy.",
    category: "architecture",
    difficulty: "Medium",
    visualLabel: "Lock File Determinism Visualizer",
    keyTakeaways: [
      "Avoids 'works on my machine' errors caused by minor automated updates in nested dependencies.",
      "Speeds up npm install speeds by caching the exact installation tree resolution.",
      "Maintains SHA hashes for package contents to verify security integrity.",
    ],
    codeExample: `// Example lockfile segment specifying exact versions and hashes
"node_modules/express": {
  "version": "4.18.2",
  "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
  "integrity": "sha512-...",
  "dependencies": {
    "accepts": "~1.3.8",
    "array-flatten": "1.1.1"
  }
}`,
  },
  {
    id: 12,
    question: "What is a Node.js stream?",
    answer: "A powerful abstraction to handle reading and writing data chunk-by-chunk in a continuous stream. Instead of buffer-loading massive files entirely into RAM, streams pipe small segments of data progressively to optimize memory.",
    category: "streams",
    difficulty: "Hard",
    visualLabel: "Chunked Stream Flow Simulator",
    keyTakeaways: [
      "Solves memory overflow problems when transmitting files larger than the maximum buffer limit (~2GB).",
      "Uses event emitters behind the scenes to push small chunks ('data', 'end', 'error' events).",
      "Can pipe multiple stream pipelines together seamlessly using sourceStream.pipe(destStream).",
    ],
    codeExample: `const fs = require('fs');

// ❌ BAD: Loads whole 2GB file into memory
fs.readFile('big_video.mp4', (err, data) => {
  res.end(data);
});

// ✅ GOOD: Steady stream utilizing < 20MB of memory
const src = fs.createReadStream('big_video.mp4');
src.pipe(res);`,
  },
  {
    id: 13,
    question: "What are the four types of Node streams?",
    answer: "Readable (to read data, eg: fs.createReadStream), Writable (to write data, eg: fs.createWriteStream), Duplex (both readable and writable, eg: TCP socket), and Transform (a Duplex stream that mutates or modifies data while piping, eg: zlib compression).",
    category: "streams",
    difficulty: "Hard",
    visualLabel: "Four Stream Pipes Interactor",
    keyTakeaways: [
      "Readable streams offer high-level pause/resume behaviors.",
      "Duplex streams maintain independent read and write channels.",
      "Transform streams sit cleanly in-between as filters or compression pipes.",
    ],
    codeExample: `const fs = require('fs');
const zlib = require('zlib');

// Readable -> Transform (Gzip) -> Writable
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));`,
  },
  {
    id: 14,
    question: "What is Buffer in Node.js?",
    answer: "A globally accessible class representing a raw chunk of binary data allocated outside the V8 heap. It is used to interact directly with hardware, files, and network sockets where raw bytes are transmitted.",
    category: "streams",
    difficulty: "Medium",
    visualLabel: "Text to Hex/Binary Buffer Sandbox",
    keyTakeaways: [
      "Buffers hold binary byte grids (values between 0 and 255/0xff).",
      "Fixed-size memory arrays that cannot be dynamically resized once instantiated.",
      "Directly useful for manipulating images, cryptographic payloads, and raw TCP streams.",
    ],
    codeExample: `// Instantiate from String
const buf = Buffer.from('Node.js', 'utf-8');
console.log(buf); // Output: <Buffer 4e 6f 64 65 2e 6a 73>

// Access a single byte
console.log(buf[0]); // Output: 78 (ASCII code for 'N')

// Output hex
console.log(buf.toString('hex')); // Output: 4e6f64652e6a73`,
  },
  {
    id: 15,
    question: "What is Express.js?",
    answer: "A minimalist, unopinionated web application framework for Node.js. It sits directly on top of Node's built-in 'http' module, adding powerful routing, middleware chains, dynamic template rendering, and standard HTTP utility wrappers.",
    category: "express",
    difficulty: "Easy",
    visualLabel: "HTTP Request Processing Pipeline",
    keyTakeaways: [
      "Provides intuitive router wrappers replacing cumbersome native req.url switch cases.",
      "Preserves raw Node.js req and res objects, extending them with convenience functions (.send(), .json()).",
      "Extremely extensible; entire architectures are formed around custom middleware configurations.",
    ],
    codeExample: `import express from 'express';
const app = express();

app.get('/greet', (req, res) => {
  res.send('Greetings from Express!');
});

app.listen(3000, () => console.log('Ready on 3000'));`,
  },
  {
    id: 16,
    question: "What is middleware in Express?",
    answer: "Functions executed in a linked sequence that have access to the request (req), response (res), and the next middleware function (next) in the application cycle. Middleware is utilized to perform auth checks, parse payloads, log, or mutate request objects.",
    category: "express",
    difficulty: "Medium",
    visualLabel: "Middleware Sequence Pipeline Simulator",
    keyTakeaways: [
      "Executed sequentially in the exact order they are registered via app.use() or route arrays.",
      "Can modify req or res objects (e.g. adding req.user details during auth).",
      "Can terminate requests entirely by sending a response, or pass control onwards with next().",
    ],
    codeExample: `// Custom middleware logging timestamps
app.use((req, res, next) => {
  req.receivedAt = Date.now();
  console.log(\`Request to \${req.path}\`);
  next(); // Pass to the next middleware!
});`,
  },
  {
    id: 17,
    question: "What does calling next() in middleware do?",
    answer: "It signals Express to pass control immediately to the very next middleware or router handler in the stack. If next() is not called and a response is not finalized, the client's request will hang indefinitely until a timeout occurs.",
    category: "express",
    difficulty: "Medium",
    visualLabel: "Call Chain Flow Connector",
    keyTakeaways: [
      "Calling next() does not stop executing the current function; it executes asynchronously. Use 'return next()' to halt function execution.",
      "Tells Express to look for the next matching endpoint route or general middleware.",
      "Crucial for writing non-blocking, composable security/formatting filters.",
    ],
    codeExample: `app.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized'); // Stop here!
  }
  next(); // Continue to route handler
});`,
  },
  {
    id: 18,
    question: "What is next(err) used for?",
    answer: "Calling next() with an argument — next(err) — instructs Express to bypass all remaining non-error middlewares and routes, passing control directly to the specialized error-handling middleware stack.",
    category: "middleware",
    difficulty: "Medium",
    visualLabel: "Error Bypass Pipeline Router",
    keyTakeaways: [
      "Express monitors arguments. Anything passed inside next() is recognized as an error.",
      "Instantly halts normal controller operations to isolate error responses gracefully.",
      "Ensures centralizing HTTP status determinations in one location.",
    ],
    codeExample: `app.get('/dashboard', async (req, res, next) => {
  try {
    const data = await fetchDatabase();
    res.json(data);
  } catch (err) {
    next(err); // Hands off error to Express centralized handler
  }
});`,
  },
  {
    id: 19,
    question: "How do you define an error-handling middleware in Express?",
    answer: "By defining a function with exactly four parameters: (err, req, res, next). Express uses function reflection to examine the parameter count. Normal middleware has 3 parameters; error handlers MUST have exactly 4.",
    category: "middleware",
    difficulty: "Hard",
    visualLabel: "Signature Reflection Inspector",
    keyTakeaways: [
      "Signature: (err, req, res, next) -> omission of 'next' can break Express's error detection.",
      "Always declare error-handling middleware at the very end of your middleware definitions.",
      "Great place to log trace stacks and return neat production-safe error payloads.",
    ],
    codeExample: `// MUST have all 4 arguments
app.use((err, req, res, next) => {
  console.error(err.stack); // Log trace
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});`,
  },
  {
    id: 20,
    question: "What is route parameter vs query parameter in Express?",
    answer: "Route parameters (/users/:id) are variable fields embedded directly in the structural path. Query parameters (/users?active=true) are optional key-value query pairs appended after a '?' which do not affect routing paths.",
    category: "express",
    difficulty: "Easy",
    visualLabel: "Dynamic URL Address Parser",
    keyTakeaways: [
      "Route parameters are mandatory for matching the URL path schema successfully.",
      "Query parameters are optional, often used for filtering, ordering, page sizes, or search inputs.",
      "Access: Params via req.params; Queries via req.query.",
    ],
    codeExample: `// URL: /books/1984?format=pdf
app.get('/books/:title', (req, res) => {
  const title = req.params.title; // '1984'
  const format = req.query.format; // 'pdf'
  res.json({ title, format });
});`,
  },
  {
    id: 21,
    question: "How do you access route params, query params, and body in Express?",
    answer: "You access them via req.params, req.query, and req.body. To read data inside req.body, you must register a parsing middleware like express.json() before your route handlers.",
    category: "express",
    difficulty: "Easy",
    visualLabel: "Request Object Parsing Inspector",
    keyTakeaways: [
      "req.params is populated automatically by matching path wildcards.",
      "req.query is parsed automatically from URL search parameters.",
      "req.body remains undefined unless body parser middlewares are active.",
    ],
    codeExample: `app.use(express.json()); // Essential body parser!

app.post('/posts/:category', (req, res) => {
  console.log(req.params.category); // Path Param
  console.log(req.query.limit);      // Query Param
  console.log(req.body.title);       // POST JSON payload
  res.send('Success');
});`,
  },
  {
    id: 22,
    question: "What is express.json() middleware for?",
    answer: "It parses incoming client requests carrying JSON payloads ('Content-Type: application/json'). It reads the raw incoming stream buffer, decodes it into a JS object, and binds it directly onto the req.body property.",
    category: "middleware",
    difficulty: "Medium",
    visualLabel: "JSON Payload Deserializer",
    keyTakeaways: [
      "Built-in middleware replacement for the legacy 'body-parser' external package.",
      "Safely filters request bodies depending on content headers, ignoring non-JSON payloads.",
      "Prevents manually listening to 'data' and 'end' events on HTTP requests.",
    ],
    codeExample: `import express from 'express';
const app = express();

// Without this, req.body will be undefined!
app.use(express.json());

app.post('/save', (req, res) => {
  res.json({ received: req.body });
});`,
  },
  {
    id: 23,
    question: "How do you handle CORS in Express?",
    answer: "You handle CORS using the official 'cors' middleware package. It injects the 'Access-Control-Allow-Origin' and other required headers into HTTP responses, telling browsers which origins are permitted to access the server's API.",
    category: "security",
    difficulty: "Medium",
    visualLabel: "CORS Header Checker Sandbox",
    keyTakeaways: [
      "CORS (Cross-Origin Resource Sharing) is enforced exclusively by client browsers.",
      "Enables restricting requests to specific trusted domains to prevent malicious cross-site scripting pulls.",
      "Configures pre-flight (OPTIONS) pre-requests automatically.",
    ],
    codeExample: `import cors from 'cors';

// Allow ALL origins (Not recommended for prod)
app.use(cors());

// ✅ Restricted and Safe configuration
app.use(cors({
  origin: 'https://trustedapp.com',
  methods: ['GET', 'POST'],
  credentials: true
}));`,
  },
  {
    id: 24,
    question: "What is the purpose of a router (express.Router())?",
    answer: "A router provides a modular, isolated instance of middleware and routes. It acts as a 'mini-app' which can be exported and mounted under a namespace prefix in the main application file, avoiding codebase bloating.",
    category: "express",
    difficulty: "Medium",
    visualLabel: "Modular Router Namespace Grid",
    keyTakeaways: [
      "Enforces clean Separation of Concerns by routing logical entities separately.",
      "Supports mounting sub-routes with dedicated middleware scopes (e.g. auth for /api/admin only).",
      "Organizes complex enterprise backends containing hundreds of matching endpoints.",
    ],
    codeExample: `// routes/users.js
import express from 'express';
const router = express.Router();

router.get('/profile', (req, res) => res.send('Profile'));
export default router;

// server.js
import userRouter from './routes/users.js';
app.use('/users', userRouter); // Mounts /users/profile`,
  },
  {
    id: 25,
    question: "How would you structure a larger Express application?",
    answer: "By creating dedicated folders to separate architectural concerns. A common setup organizes files into: /routes (routing schema), /controllers (business logic), /models (schemas/databases), /middlewares (guards/formatting), and /config (environment setups).",
    category: "middleware",
    difficulty: "Medium",
    visualLabel: "Enterprise Directory Explorer",
    keyTakeaways: [
      "Avoid writing logical controllers directly in route mapping files.",
      "Decouples data modeling layouts from request parameters.",
      "Enforces a predictable, scalable developer onboarding structure.",
    ],
    codeExample: `my-express-app/
├── server.js          # App bootloader & assembly
├── config/            # DB, keys, and environment variables
├── middlewares/       # Auth guards, validation, logs
├── routes/            # Routes endpoints definitions
├── controllers/       # Actual business logic handlers
└── models/            # Database schemas & queries`,
  },
  {
    id: 26,
    question: "What is the MVC pattern as applied to an Express app?",
    answer: "MVC is a pattern splitting responsibility: Models govern database structures and raw database queries; Views represent rendering engines (or JSON outputs in REST APIs); Controllers orchestrate incoming requests, mutate Models, and structure View responses.",
    category: "middleware",
    difficulty: "Medium",
    visualLabel: "MVC Pattern Controller Loop",
    keyTakeaways: [
      "Model: Interacts with the persistent DB schemas (e.g., MongoDB, PostgreSQL).",
      "View: Templates (like EJS) or JSON payloads returned to frontend panels.",
      "Controller: Binds routes to logic, parsing inputs, and calling correct databases.",
    ],
    codeExample: `// Controller orchestrating Model and View
import User from '../models/User';

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.params.id); // Model
  if (!user) return res.status(404).send('Not Found');
  res.json(user); // View/Response JSON
};`,
  },
  {
    id: 27,
    question: "How do you handle async errors in Express route handlers?",
    answer: "By wrapping operations inside try/catch blocks and forwarding errors to next(err). In Express v4, unhandled promise rejections inside async handlers will hang requests. In Express v5, async errors are natively caught.",
    category: "async",
    difficulty: "Medium",
    visualLabel: "Async Error Wrapper Sandbox",
    keyTakeaways: [
      "Avoids server crashes caused by unhandled asynchronous exceptions in background tasks.",
      "Can use helper wrapper functions (like express-async-errors) to avoid repeating try/catch templates.",
      "Returns control consistently to error middleware stacks.",
    ],
    codeExample: `// Custom Wrapper function
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/data', asyncHandler(async (req, res) => {
  const data = await fetchFromDB();
  res.json(data);
}));`,
  },
  {
    id: 28,
    question: "What is a common security middleware used in Express apps?",
    answer: "Helmet is the standard security middleware. It automatically sets vital HTTP security headers to secure apps against typical browser-targeted exploits such as XSS, clickjacking, mime sniffing, and framing.",
    category: "security",
    difficulty: "Medium",
    visualLabel: "Helmet Header Guard Visualizer",
    keyTakeaways: [
      "Secures applications with one line: app.use(helmet()).",
      "Disables headers like 'X-Powered-By' which reveal server frameworks to hackers.",
      "Enforces HSTS (Strict-Transport-Security) to mandate HTTPS connections.",
    ],
    codeExample: `import express from 'express';
import helmet from 'helmet';

const app = express();
app.use(helmet()); // Sets 15+ secure headers!`,
  },
  {
    id: 29,
    question: "How would you implement rate limiting in Express?",
    answer: "Using rate-limiting middleware like 'express-rate-limit'. It monitors requests coming from unique IP addresses, tracking frequencies over a sliding window, and throwing HTTP 429 errors when thresholds are breached.",
    category: "security",
    difficulty: "Medium",
    visualLabel: "Sliding Window Rate Limiter",
    keyTakeaways: [
      "Protects applications from brute force logins and Denial of Service (DoS) attacks.",
      "Can be backed by memory stores (dev) or Redis clusters (multi-server production systems).",
      "Returns retry-after headers advising clients on cooling times.",
    ],
    codeExample: `import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);`,
  },
  {
    id: 30,
    question: "How do you handle authentication in an Express API?",
    answer: "Commonly via token-based stateless authentication (JWT) or cookie session-based stateful authentication. In JWT schemes, incoming tokens are parsed, validated using cryptography inside middleware, and user context is attached to req.user.",
    category: "security",
    difficulty: "Medium",
    visualLabel: "Stateless Auth Lifecycle Flow",
    keyTakeaways: [
      "Session-based auth: Keeps users listed in server database/Redis; stores session IDs in cookies.",
      "JWT-based auth: Stores all data cryptographically in token payload; client handles persistence.",
      "Requires middleware guarding protected paths before resolving logical handlers.",
    ],
    codeExample: `// Auth middleware guard
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).send('Invalid Token');
  }
};`,
  },
  {
    id: 31,
    question: "What is JWT (JSON Web Token) and how does it work?",
    answer: "JWT is a secure, URL-safe compact token containing JSON-formatted claims. It consists of three periods separating: Header (algorithm), Payload (user state data), and Signature (crytographically verifiable check key).",
    category: "security",
    difficulty: "Medium",
    visualLabel: "JWT Live Cryptography Sandbox",
    keyTakeaways: [
      "Stateless: No database verification lookup is required to confirm authentication validity.",
      "Tamper-proof: Any edits to header or payload parameters instantly breaks the signature match.",
      "Visible: Anyone can base64 decode the payload; never store sensitive data (passwords) inside JWTs.",
    ],
    codeExample: `import jwt from 'jsonwebtoken';

// Issuing a token
const token = jwt.sign(
  { userId: '123', role: 'admin' }, 
  'SECRET_KEY', 
  { expiresIn: '1h' }
);

// Decoding (no verification key needed)
const decoded = jwt.decode(token);`,
  },
  {
    id: 32,
    question: "What's a security concern with storing JWTs in localStorage?",
    answer: "Storing sensitive JWTs in localStorage leaves them vulnerable to Cross-Site Scripting (XSS) attacks. If a malicious script runs, it can read localStorage directly. Storing tokens inside HttpOnly, Secure cookies prevents JavaScript from accessing them.",
    category: "security",
    difficulty: "Hard",
    visualLabel: "XSS Injection Leak Simulator",
    keyTakeaways: [
      "XSS (Cross-Site Scripting) lets scripts access standard browser Storage variables easily.",
      "HttpOnly flag prevents JavaScript (document.cookie) from reading cookie data.",
      "Using cookie auth restricts CSRF exposures, requiring CSRF token defense configurations.",
    ],
    codeExample: `// ❌ VULNERABLE: easily stolen via XSS script tag injection
localStorage.setItem('token', token);

// ✅ SECURE: Server returns token inside an httpOnly cookie
res.cookie('token', token, {
  httpOnly: true, // Invisible to JS!
  secure: true,   // Transmitted only over HTTPS
  sameSite: 'strict'
});`,
  },
  {
    id: 33,
    question: "How do you validate request bodies in Express?",
    answer: "By creating validator middlewares using robust schema validation libraries like Zod, Joi, or express-validator. Schema definitions ensure request bodies contain the exact data types, constraints, and parameters required.",
    category: "middleware",
    difficulty: "Medium",
    visualLabel: "Zod Schema Form Validator",
    keyTakeaways: [
      "Enforces a secure data boundary protecting API controllers from malformed inputs.",
      "Reduces verbose manual validation boilerplate inside actual controller logic.",
      "Instantly responds with detailed HTTP 400 Bad Request maps explaining precise validation failures.",
    ],
    codeExample: `import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18)
});

// Middleware
const validate = (req, res, next) => {
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error.issues);
  }
  next();
};`,
  },
  {
    id: 34,
    question: "What is the purpose of environment-based configuration (.env files) in a Node app?",
    answer: "It decouples environment settings (DB passwords, secret keys, API URLs) from codebase files. Keeping them in local .env files that are added to .gitignore ensures secrets are never exposed in Git control repositories.",
    category: "security",
    difficulty: "Easy",
    visualLabel: "Environment Variable Switcher",
    keyTakeaways: [
      "Adheres to Twelve-Factor App methodologies by storing configurations in environment parameters.",
      "Utilizes the 'dotenv' module to load local .env properties directly onto process.env at bootup.",
      "Enables running the exact same code codebase in local dev, QA staging, and cloud production environments.",
    ],
    codeExample: `# .env file (Never commit to git!)
PORT=3000
DATABASE_URL=postgres://user:pass@localhost:5432/db
JWT_SECRET=super_secret_string

// server.js
require('dotenv').config();
console.log(process.env.DATABASE_URL);`,
  },
  {
    id: 35,
    question: "How would you connect an Express app to a database?",
    answer: "By leveraging driver clients or Object-Relational Mappers (ORMs/ODMs) likepg (PostgreSQL), Mongoose (MongoDB), or Prisma/Drizzle. You establish a persistent database client instance at app bootup and share the connection pool.",
    category: "security",
    difficulty: "Medium",
    visualLabel: "Database Client Connection Pool",
    keyTakeaways: [
      "Avoid re-instantiating client connections within individual request functions.",
      "Connection instances should handle connection failure recoveries and retry backoffs.",
      "Keep credentials safely locked inside process.env variables rather than code strings.",
    ],
    codeExample: `import { Pool } from 'pg';

// Initialized ONCE during startup
const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.get('/users', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM users');
  res.json(rows);
});`,
  },
  {
    id: 36,
    question: "What is connection pooling and why does it matter?",
    answer: "A connection pool maintains a cache of active database connections. When a client requests a database query, it borrows a connection from the pool, runs the query, and instantly returns it back. This is faster than creating and deleting connections for every request.",
    category: "security",
    difficulty: "Hard",
    visualLabel: "Connection Pool Handshake Simulator",
    keyTakeaways: [
      "Creating TCP and database TLS handshakes for every HTTP query introduces huge latency.",
      "Protects databases from crashing due to connection limit exhaustion under spikes of traffic.",
      "Ensures predictable, high-throughput database operation queues.",
    ],
    codeExample: `// Pool configuration parameters
const pool = new Pool({
  max: 20,              // Keep max 20 connections open
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 2000 // Error out if pool is fully congested for 2s
});`,
  },
  {
    id: 37,
    question: "How would you handle file uploads in Express?",
    answer: "Using file upload middleware like 'multer'. It parses multi-part/form-data payload streams, captures binary boundaries, saves files locally or forwards them directly to cloud buckets, and populates metadata details onto req.file.",
    category: "middleware",
    difficulty: "Medium",
    visualLabel: "Multipart Upload Boundary Parser",
    keyTakeaways: [
      "Standard Express body parsers (like express.json) cannot process multi-part binary file packages.",
      "Multer populates req.file (or req.files) and req.body simultaneously.",
      "Enables limiting upload sizes and filtering acceptable mime types (e.g. PNG only).",
    ],
    codeExample: `import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

// Route accepts file under 'avatar' property key
app.post('/upload', upload.single('avatar'), (req, res) => {
  console.log(req.file); // Holds path, size, and mime info
  res.send('File saved to disk!');
});`,
  },
  {
    id: 38,
    question: "What is clustering in Node.js and why use it?",
    answer: "The cluster module allows you to spin up multiple instances of your Node process (workers) which run concurrently on different CPU cores, sharing the same server port. It scales applications to leverage multi-core systems, which standard single-process setups cannot do.",
    category: "security",
    difficulty: "Hard",
    visualLabel: "Multi-Core Load balancer Worker Pool",
    keyTakeaways: [
      "Maximizes multi-core server hardware capacities by matching process worker counts with physical cores.",
      "The Master process distributes incoming requests to workers using a Round-Robin balancing algorithm.",
      "If a worker process encounters a crash, the Master process can immediately spawn a replacement.",
    ],
    codeExample: `const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
  // Spawn workers for each CPU core
  for (let i = 0; i < numCPUs; i++) cluster.fork();
} else {
  // Workers share the TCP connection port!
  app.listen(3000);
}`,
  },
  {
    id: 39,
    question: "How would you handle graceful shutdown in a Node/Express server?",
    answer: "By listening to termination signals (like SIGTERM or SIGINT). When received, you stop taking in new connections, wait for current requests in-flight to finish processing, safely release DB clients, and exit the process using process.exit(0).",
    category: "security",
    difficulty: "Hard",
    visualLabel: "SIGTERM Cleanup Orchestrator",
    keyTakeaways: [
      "Prevents abruptly terminating in-flight queries and dropping customer carts mid-save.",
      "Crucial for zero-downtime rolling deployment systems (like Kubernetes or Cloud Run).",
      "Gives database connection pools ample time to cleanly log out of DB servers.",
    ],
    codeExample: `const server = app.listen(3000);

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Starting graceful shutdown...');
  server.close(() => {
    console.log('All active server requests finished.');
    db.end(() => {
      console.log('Database pools closed. Clean exit!');
      process.exit(0);
    });
  });
});`,
  },
  {
    id: 40,
    question: "What's the difference between res.send(), res.json(), and res.end()?",
    answer: "res.json() automatically formats objects into JSON strings, appends the Content-Type header to application/json, and calls res.send(). res.send() is general-purpose; it handles buffers, numbers, objects, and strings, automatically determining Content-Type. res.end() skips content-type parsing, ending the response instantly with raw bytes/empty streams.",
    category: "express",
    difficulty: "Medium",
    visualLabel: "Response Method Comparison Terminal",
    keyTakeaways: [
      "res.json() is best for APIs to ensure response headers match JSON layouts.",
      "res.send() sets Content-Type (e.g. text/html for HTML elements, or octet-stream for buffers).",
      "res.end() is perfect for empty responses (e.g., HTTP 204 No Content) or fast stream terminations.",
    ],
    codeExample: `// res.json() - best for API JSON payloads
res.json({ success: true }); 

// res.send() - flexible payload serializer
res.send('<h1>HTML Header output</h1>'); 

// res.end() - ends response with no headers or body
res.status(204).end();`,
  },
];
