import { QuestionItem } from "./types";

export const QUESTIONS_DATA: QuestionItem[] = [
  {
    id: 1,
    category: "Architecture & Frameworks",
    question: "What's the general approach to a system design interview?",
    answer: "A structured, collaborative approach: clarify requirements & scale, sketch high-level architecture, drill into specific components, discuss tradeoffs & limitations, and address scaling/failure scenarios.",
    conceptBreakdown: [
      { title: "1. Scope & Clarify", text: "Spend the first 5 mins establishing functional requirements (what are we building) and non-functional requirements (DAU, latency, consistency, SLA, budgets)." },
      { title: "2. High-Level Design", text: "Map out the core blocks: Clients, DNS, Load Balancers, API Gateways, App Servers, and Databases. Draw a block diagram showing data flows." },
      { title: "3. Component Deep-Dive", text: "Identify key bottlenecks. Drill into schema designs, API contracts, specific technologies (Redis vs Memcached, SQL vs NoSQL, WebSockets vs SSE)." },
      { title: "4. Trade-offs & Failure Modes", text: "No system is perfect. Discuss CAP theorem compromises, single points of failure, redundancy, rate-limiting, and replication lag." }
    ],
    practicalExample: "If asked to design Twitter, don't write SQL queries first. Define if it's read-heavy (99.9% read), estimate memory for news feeds, draw the Fan-out queue, and discuss caching strategies.",
    prosCons: [
      { title: "Clarifying First vs. Jumping to Code", list: ["Avoids building the wrong system", "Builds rapport with interviewer", "Saves time on irrelevant micro-optimizations"] }
    ],
    codeExample: `// System Design Checklist framework
const systemDesignFramework = {
  phase1: "Clarify Requirements (Functional & Non-Functional)",
  phase2: "Back-of-the-envelope Estimation (QPS, Storage, Bandwidth)",
  phase3: "High-level System Diagram (Client -> CDN -> LB -> App -> DB)",
  phase4: "Detailed Component Design (Cache, DB Schema, Queues, APIs)",
  phase5: "Bottlenecks & Scaling (Sharding, Replication, Rate Limiting)"
};`
  },
  {
    id: 2,
    category: "Architecture & Frameworks",
    question: "What clarifying questions should you ask first?",
    answer: "Ask about the target user base size, read/write patterns, expected latencies, data consistency levels, availability requirements, and what features are explicitly out of scope.",
    conceptBreakdown: [
      { title: "1. Scale Estimation", text: "What is the Daily Active Users (DAU) count? For example, 100M DAU means completely different scaling needs than 10k DAU." },
      { title: "2. Traffic Mix (Read vs. Write)", text: "Is the system read-heavy (like Instagram, 100:1 ratio) or write-heavy (like IoT log collection)? This determines database and caching architecture." },
      { title: "3. Service Level Agreements (SLAs)", text: "What is the target p99 latency? Is it an ultra-low latency system (<100ms) or is asynchronous processing acceptable?" }
    ],
    practicalExample: "When designing Instagram, ask: 'Are we building real-time messaging, or just photo feeds?', 'Can we assume unlimited storage?', 'Is instant consistency needed or is eventual consistency fine?'",
    prosCons: [
      { title: "Asking vs. Assuming", list: ["Prevents expensive architecture rewrites", "Displays senior engineering behavior", "Narrows scope to fit the interview timeline"] }
    ],
    codeExample: `// Example back-of-the-envelope scale estimator
function calculateScale(dau: number) {
  const writeRatio = 0.1; // 10% users create content
  const avgPayloadSize = 1024 * 5; // 5KB per post
  
  const dailyWrites = dau * writeRatio;
  const qpsWrites = Math.ceil(dailyWrites / 86400);
  const storagePerDayBytes = dailyWrites * avgPayloadSize;
  
  return { qpsWrites, storagePerDayGB: (storagePerDayBytes / 1e9).toFixed(2) };
}`
  },
  {
    id: 3,
    category: "Real-time & Security",
    question: "How would you design a live comments/chat feed?",
    answer: "Use persistent WebSockets for low-latency bidirectional real-time push, backed by a message broker/pub-sub system (e.g., Redis Pub/Sub), paginated REST/GraphQL APIs for loading chat history, and optimistic UI client-side.",
    conceptBreakdown: [
      { title: "1. Connection Protocol", text: "HTTP polling is too heavy. WebSockets establish a single, long-lived TCP connection, bypassing HTTP header overhead for sub-millisecond delivery." },
      { title: "2. Backend Pub/Sub routing", text: "When User A sends a message, Server 1 receives it. Server 1 publishes to a Redis channel. Server 2 (holding User B's WebSocket) receives and pushes it to B." },
      { title: "3. Client Cache & Optimistic UI", text: "Append the user's message immediately to the state with a 'pending' state. When server ACK is received, flip state to 'delivered'. Resort messages dynamically." }
    ],
    practicalExample: "A live YouTube stream comment feed handling 1M concurrent viewers utilizes clustered WebSocket servers, caching hot chat-rooms in-memory, and throttling update rates.",
    prosCons: [
      { title: "WebSockets vs. Server-Sent Events (SSE)", list: ["WebSockets: True bidirectional communication, supports binary protocols", "SSE: Unidirectional (server to client), native HTTP reconnection, simpler proxying"] }
    ],
    codeExample: `// Simplified Client WebSocket + Optimistic State Handler
interface ChatMsg { id: string; text: string; status: 'sending' | 'sent' };

class ChatClient {
  private ws = new WebSocket('wss://chat.api.com');
  
  sendMessage(text: string, onUpdate: (msgs: ChatMsg[]) => void) {
    const tempId = Math.random().toString();
    const tempMsg: ChatMsg = { id: tempId, text, status: 'sending' };
    
    // 1. Render optimistically
    onUpdate([tempMsg]);
    
    // 2. Transmit payload
    this.ws.send(JSON.stringify({ id: tempId, text }));
  }
}`
  },
  {
    id: 4,
    category: "Database & Storage",
    question: "How would you design a scalable image upload feature?",
    answer: "Avoid routing large binary payloads through application servers. The client requests a secure pre-signed upload URL from the backend, uploads directly to Object Storage (S3/GCS), and the backend processes resizing asynchronously via image triggers/workers.",
    conceptBreakdown: [
      { title: "1. Pre-Signed URLs", text: "Clients query an API with file metadata. The app server validates metadata (e.g. image size/type) and returns a short-lived cryptographically signed URL." },
      { title: "2. Direct Direct Upload", text: "The client performs a HTTP PUT request with the raw file directly to S3. This completely offloads file-stream memory overhead from the application server." },
      { title: "3. Async Optimization Trigger", text: "Upon S3 upload complete, a serverless function (AWS Lambda or GCF) triggers to crop, optimize, and generate thumbnails, storing metadata in the DB." }
    ],
    practicalExample: "Airbnb profiles let users select high-res avatars. The web client pushes files straight to S3. Cloudfront CDN serves the generated optimized variations to subsequent viewers.",
    prosCons: [
      { title: "Direct to S3 vs. App Server Routing", list: ["Direct: Near-infinite scale, zero app server memory load", "Direct: Requires CORS configuration, harder to intercept/validate content in real-time"] }
    ],
    codeExample: `// Express server pre-signed URL generation (conceptual)
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function getUploadUrl(req: any, res: any) {
  const s3 = new S3Client({ region: "us-east-1" });
  const key = \`uploads/\${req.userId}/\${Date.now()}.jpg\`;
  const command = new PutObjectCommand({ Bucket: "my-bucket", Key: key });
  
  const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
  res.json({ presignedUrl, fileKey: key });
}`
  },
  {
    id: 5,
    category: "Performance & Caching",
    question: "What is a CDN and why use one?",
    answer: "A Content Delivery Network is a geographically distributed group of caching servers (Edge locations) that store static assets (images, CSS, JS, videos) close to users to minimize round-trip latencies.",
    conceptBreakdown: [
      { title: "1. Edge Caching", text: "Instead of routing a request from Tokyo to a Dublin origin server, the request is intercepted by a Tokyo CDN server, returning the asset in <15ms." },
      { title: "2. Origin Offloading", text: "By serving 95% of traffic from the CDN cache, the core origin application servers are freed from serving static files, significantly lowering hosting costs." },
      { title: "3. Anycast Routing", text: "Using Anycast DNS, the client is automatically connected to the geographically closest CDN server without manual configuration." }
    ],
    practicalExample: "Netflix pre-positions popular video chunks across localized CDNs (Open Connect) inside ISPs directly, completely eliminating international network hops during streaming.",
    prosCons: [
      { title: "CDN Caching tradeoffs", list: ["Drastically cuts Time To First Paint (TTFP)", "Saves origin server bandwidth", "Cache invalidation can be tricky when files update (uses hash-versioned filenames)"] }
    ],
    codeExample: `// Custom Cache-Control header setup for CDN
app.get('/static/bundle.js', (req, res) => {
  // Instruct CDNs to cache this immutable file for 1 year
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.sendFile(path.join(__dirname, 'bundle.js'));
});`
  },
  {
    id: 6,
    category: "Real-time & Security",
    question: "How would you design a notification system (in-app + push)?",
    answer: "Establish a dedicated Notification Service utilizing a Message Queue (e.g., RabbitMQ) to decouple requests. Route in-app updates in real-time via WebSockets or Server-Sent Events, and fall back to external push gateways (FCM, APNs, Twilio) for offline users.",
    conceptBreakdown: [
      { title: "1. Dispatcher & Queuing", text: "Never send notifications synchronously inside API threads. Queue notification requests instantly to handle surge traffic during system events." },
      { title: "2. User Registry & Preference Store", text: "Look up user communication preferences (email, SMS, push) and active connection states (online vs offline) before choosing delivery vectors." },
      { title: "3. Gateway Interfacing", text: "A dedicated worker pool processes tasks from the queue and translates payloads to Apple (APNs), Android (FCM), or SMS (Twilio) APIs." }
    ],
    practicalExample: "Uber pushes ride arrivals: if the driver app is active, it plays sound via Websocket; if in background, it triggers an APNs push notification showing the map coordinate.",
    prosCons: [
      { title: "Push Gateways vs. In-App WebSockets", list: ["Gateways: Deliver when device screen is turned off or app killed", "Gateways: Out-of-order delivery possible, highly dependent on third-party reliability"] }
    ],
    codeExample: `// Notification Dispatch Worker (Pseudocode)
async function processNotificationJob(job: { userId: string; text: string }) {
  const isOnline = await Redis.get(\`presence:\${job.userId}\`);
  
  if (isOnline) {
    // Deliver instantly via WebSocket gateway
    WebSocketServer.sendToUser(job.userId, { type: 'alert', data: job.text });
  } else {
    // Fallback to Firebase Cloud Messaging (FCM)
    await FCM.send({
      token: await DB.getUserPushToken(job.userId),
      notification: { title: "New Notification", body: job.text }
    });
  }
}`
  },
  {
    id: 7,
    category: "Performance & Caching",
    question: "What is horizontal vs vertical scaling?",
    answer: "Vertical scaling (scaling up) means adding more power (CPU, RAM) to an existing single server. Horizontal scaling (scaling out) means adding more server instances to your resource pool and distributing incoming loads across them.",
    conceptBreakdown: [
      { title: "1. Vertical Scaling Limits", text: "There is a hard hardware ceiling (e.g. 128 cores, 2TB RAM) on single machines. It also introduces a single point of failure (SPOF) and requires hardware reboot downtime." },
      { title: "2. Horizontal Flexibility", text: "Enables scaling up and down dynamically (elasticity) based on traffic demands using virtual instances, achieving redundancy and high availability." },
      { title: "3. Database Scaling Complexity", text: "Horizontal database scaling requires sharding and replication, which is vastly more complex than scaling stateless application servers." }
    ],
    practicalExample: "An indie startup hosting their MVP on a single large DigitalOcean Droplet (Vertical). As traffic explodes, they migrate to AWS Auto Scaling groups behind an ALB (Horizontal).",
    prosCons: [
      { title: "Horizontal vs. Vertical Scaling", list: ["Horizontal: Infinite capacity scaling, high tolerance to server deaths", "Vertical: Simplest code architecture, zero distributed concurrency issues, much higher single-server price tag"] }
    ],
    codeExample: `// Config illustrating Nginx balancing requests across horizontal servers
// nginx.conf
/*
upstream backend_servers {
    server 10.0.0.10:3000; # App Server 1
    server 10.0.0.11:3000; # App Server 2
    server 10.0.0.12:3000; # App Server 3
}
server {
    listen 80;
    location / {
        proxy_pass http://backend_servers;
    }
}
*/`
  },
  {
    id: 8,
    category: "Performance & Caching",
    question: "What is a load balancer?",
    answer: "A load balancer is a reverse proxy device or software that distributes network or application traffic across multiple healthy servers in a resource pool to optimize capacity, reliability, and security.",
    conceptBreakdown: [
      { title: "1. Routing Algorithms", text: "Uses schemes like Round Robin, Least Connections (routes to idle servers), or IP Hash (keeps a client sticky to a specific server for session consistency)." },
      { title: "2. Health Checking", text: "LB regularly pings backend endpoints (e.g., GET /health). If a server fails to respond, it is automatically removed from the active rotation pool." },
      { title: "3. SSL Termination", text: "The LB can decrypt incoming SSL traffic, offloading the CPU-heavy cryptographic burden from individual backend application servers." }
    ],
    practicalExample: "AWS Application Load Balancer (ALB) handles routing millions of client HTTP/HTTPS requests evenly to containers run inside an Elastic Container Service cluster.",
    prosCons: [
      { title: "Load Balancer benefits", list: ["Prevents individual backend server overloads", "Achieves high availability and zero-downtime blue-green deployments", "Acts as a primary shield against direct-server port exposure"] }
    ],
    codeExample: `// Mini Software-based Round-Robin Router (Conceptual code)
class RoundRobinLoadBalancer {
  private servers: string[] = ['10.0.1.1', '10.0.1.2', '10.0.1.3'];
  private index = 0;

  routeRequest() {
    if (this.servers.length === 0) throw new Error("No healthy servers available");
    const target = this.servers[this.index];
    this.index = (this.index + 1) % this.servers.length;
    return target;
  }
  
  removeServer(ip: string) {
    this.servers = this.servers.filter(s => s !== ip);
  }
}`
  },
  {
    id: 9,
    category: "Performance & Caching",
    question: "What is caching and where can it be applied in a web app?",
    answer: "Caching is storing copies of data in high-speed, temporary memory (RAM) to serve future requests faster. It can be applied in the browser, CDNs, API Gateways, App Servers (In-Memory Redis), and DB Query caches.",
    conceptBreakdown: [
      { title: "1. Browser Cache", text: "Stores client-side resources (images, HTML) using HTTP cache headers so the user does not re-download unchanged static assets." },
      { title: "2. Application Caching", text: "Stores heavy SQL queries or serialized session states in distributed in-memory data structures like Redis or Memcached (reads in <1ms)." },
      { title: "3. Write-Through vs. Cache-Aside", text: "Strategies to balance read speed and data consistency: update DB and cache concurrently vs. fetch-on-demand and cache on misses." }
    ],
    practicalExample: "A news website home page pulls articles from a DB. Instead of running 5,000 DB SELECT queries per second, the server fetches the page from Redis, updating it every 60 seconds.",
    prosCons: [
      { title: "Caching benefits vs. costs", list: ["Massively decreases latency and server load", "Protects primary databases from crashing during surges", "Cons: Introduces memory storage costs and cache stale-data bugs"] }
    ],
    codeExample: `// Cache-Aside Pattern Implementation
async function getProductDetail(id: string) {
  // 1. Try to read from fast Redis Cache
  const cacheKey = \`product:\${id}\`;
  const cachedData = await Redis.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData); // Cache Hit
  }
  
  // 2. Fetch from slow Relational DB on cache miss
  const product = await Database.query("SELECT * FROM products WHERE id = ?", [id]);
  
  // 3. Populate Redis Cache with an expiration time (TTL) of 1 hour
  await Redis.set(cacheKey, JSON.stringify(product), "EX", 3600);
  return product;
}`
  },
  {
    id: 10,
    category: "Performance & Caching",
    question: "What is cache invalidation and why is it considered hard?",
    answer: "Cache invalidation is the process of removing or replacing stale entries in a cache when the original source of truth (DB) changes. It is hard because of consistency requirements in distributed systems.",
    conceptBreakdown: [
      { title: "1. The Invalidation Challenge", text: "If you update a product price in the DB, any cache copy still returning the old price will lead to checkout errors. Speed and consistency compete directly." },
      { title: "2. Time-To-Live (TTL)", text: "Passive invalidation where items expire automatically after an age. Easy to implement, but leaves a window where clients read stale values." },
      { title: "3. Active Invalidation", text: "The app actively purges specific Redis keys upon database updates, which is complex when multiple microservices write to the database." }
    ],
    practicalExample: "An e-commerce app updates an inventory level. If active invalidation fails, users see 'In Stock' but checkout fails because the item is sold out, hurting customer trust.",
    prosCons: [
      { title: "Active Invalidation vs. Passive TTL", list: ["Active: Instant consistency across the system", "Active: High complexity, risk of cascading invalidation storms", "Passive: Simple, self-healing, but guaranteed periods of stale data"] }
    ],
    codeExample: `// Active Cache Invalidation on Update
async function updateProductPrice(id: string, newPrice: number) {
  // 1. Write the transaction securely to the DB
  await Database.transaction(async (tx) => {
    await tx.query("UPDATE products SET price = ? WHERE id = ?", [newPrice, id]);
  });
  
  // 2. IMMEDIATELY eject the stale cache key to avoid inconsistent reads
  const cacheKey = \`product:\${id}\`;
  await Redis.del(cacheKey);
}`
  },
  {
    id: 11,
    category: "Database & Storage",
    question: "What is optimistic locking / concurrency control relevant to?",
    answer: "It is relevant to preventing lost updates when multiple clients read and modify the same database record concurrently, without holding expensive database-level locks.",
    conceptBreakdown: [
      { title: "1. Pessimistic vs. Optimistic", text: "Pessimistic locks the row (SELECT FOR UPDATE) preventing others from reading. Optimistic assumes no conflict, but checks version number during updates." },
      { title: "2. Version-based Check", text: "Each database table has a 'version' column. When committing a write, the system checks: UPDATE table SET val = X, version = version + 1 WHERE id = 1 AND version = current_version." },
      { title: "3. Handling Rejections", text: "If another transaction updated the row first, the version query returns 0 modified rows. The application then retries, re-reads, or alerts the user." }
    ],
    practicalExample: "Two support agents open the same customer ticket concurrently. If Optimistic locking is used, Agent A saves first. When Agent B clicks save, the app rejects B, preserving A's edits.",
    prosCons: [
      { title: "Optimistic vs. Pessimistic Locking", list: ["Optimistic: High throughput, zero deadlock risk, ideal for low-conflict scenarios", "Optimistic: Fails under high-concurrency write contention (requires retry loops)"] }
    ],
    codeExample: `// Optimistic Locking Write Attempt with retry logic
async function updateWalletBalance(walletId: string, amountToAdd: number) {
  let success = false;
  let attempts = 0;
  
  while (!success && attempts < 3) {
    // 1. Read balance and current version
    const wallet = await Database.query("SELECT balance, version FROM wallets WHERE id = ?", [walletId]);
    const newBalance = wallet.balance + amountToAdd;
    
    // 2. Write back ONLY if the version has not changed
    const rowsAffected = await Database.execute(
      "UPDATE wallets SET balance = ?, version = version + 1 WHERE id = ? AND version = ?",
      [newBalance, walletId, wallet.version]
    );
    
    if (rowsAffected > 0) {
      success = true; // No conflict
    } else {
      attempts++; // Conflict detected! Retry
    }
  }
  return success;
}`
  },
  {
    id: 12,
    category: "Real-time & Security",
    question: "How would you design a real-time collaborative document editor (like Google Docs)?",
    answer: "Utilize WebSockets for ultra-low latency cursor sync, coupled with conflict resolution algorithms like Operational Transformation (OT) or Conflict-Free Replicated Data Types (CRDTs) to merge concurrent changes.",
    conceptBreakdown: [
      { title: "1. Conflict Resolution Engine", text: "If Client A inserts 'X' at position 5, and Client B deletes at position 4 simultaneously, simple character indexes break. OT shifts positions. CRDT gives characters global unique IDs." },
      { title: "2. WebSocket Synchronization", text: "Clients stream JSON mutation events (e.g., insert_char) to a central node coordinator, which broadcasts transformations to other active sessions." },
      { title: "3. Snapshot & Persistence", text: "Relieving CPU pressure: store operations in a fast ledger queue, and periodically compile them into full document snapshots saved to a document DB." }
    ],
    practicalExample: "Figma or Google Docs where 10 users can simultaneously draw or type. A centralized engine sequences operations, maintaining consistent spatial/character indexing.",
    prosCons: [
      { title: "Operational Transformation (OT) vs. CRDTs", list: ["OT: Requires a central authority/server to sequence, smaller state footprints", "CRDT: Decentralized/P2P friendly, mathematically resolved without server coordinator, but larger metadata memory overhead"] }
    ],
    codeExample: `// Conceptual character-insert Operational Transformation (OT) on Server
function transform(opA: { type: 'insert'; pos: number; char: string }, 
                   opB: { type: 'insert'; pos: number; char: string }) {
  // If B inserts before A, shift A's insertion index to keep positions aligned
  if (opB.pos < opA.pos) {
    return { ...opA, pos: opA.pos + 1 };
  }
  return opA;
}`
  },
  {
    id: 13,
    category: "Database & Storage",
    question: "What is eventual consistency?",
    answer: "A distributed consistency model where updates to a system propagate asynchronously across replicas. Reads may briefly return outdated data, but all replicas eventually converge to the same state.",
    conceptBreakdown: [
      { title: "1. The Latency Trade-off", text: "Ensuring instant consistency everywhere (Strong Consistency) requires locking replicas during writes, causing high latency. Eventual consistency yields speed by letting replicas sync in the background." },
      { title: "2. Read/Write Replication", text: "Write requests update the Master node. The Master acknowledges the write immediately, then propagates the delta log to Follower nodes asynchronously." },
      { title: "3. Read Staleness Window", text: "Clients querying a follower node before replication completes read stale data. This replication lag window is typically <1000ms." }
    ],
    practicalExample: "Social media likes: If you 'like' a photo, your friend across the globe might not see the updated count for a few seconds, which is perfectly acceptable.",
    prosCons: [
      { title: "Eventual vs. Strong Consistency", list: ["Eventual: Extremely high system availability, sub-millisecond write response times", "Eventual: Risk of race conditions and stale user experience (e.g. deleted items reappearing momentarily)"] }
    ],
    codeExample: `// Conceptual Replication Loop (Master to Follower)
class MasterDB {
  private followers: FollowerDB[] = [];
  private data: Record<string, string> = {};

  async write(key: string, value: string) {
    this.data[key] = value; // Update Master instantly
    
    // Asynchronously replicate updates to Followers in background (non-blocking)
    this.followers.forEach(follower => {
      setTimeout(() => follower.sync(key, value), Math.random() * 500); // simulated lag
    });
    
    return { status: "Write committed to Master" };
  }
}`
  },
  {
    id: 14,
    category: "Database & Storage",
    question: "What is the CAP theorem?",
    answer: "A fundamental distributed systems trade-off stating that a network partition (P) is inevitable, so a system must choose between Consistency (C - all nodes see the same data) or Availability (A - every non-failing node returns a response).",
    conceptBreakdown: [
      { title: "1. Consistency (C)", text: "Every read receives the most recent write or an error. No node is allowed to serve stale data, even if it requires returning 500 errors." },
      { title: "2. Availability (A)", text: "Every non-failing node returns a non-error response, without guarantee that it contains the most recent write. It prioritizes system uptime." },
      { title: "3. Partition Tolerance (P)", text: "The system continues to operate despite arbitrary message loss or network connection splits. This is a physical reality, not a choice." }
    ],
    practicalExample: "During an internet cable split between NYC and Dublin servers, a database must decide: accept Dublin writes (A) risking out-of-sync split-brain data, or reject Dublin queries (C) to avoid split-brain.",
    prosCons: [
      { title: "CP vs. AP Systems", list: ["CP: MongoDB/HBase. Rejects stale reads/writes to safeguard pure data correctness", "AP: Cassandra/DynamoDB. Stays fully online, resolving conflicts in subsequent merge sweeps"] }
    ],
    codeExample: `// Decision routing logic for a CAP partition event
interface CAPNode { id: string; val: string; isPartitioned: boolean; }

function readNode(node: CAPNode, systemSetting: "CP" | "AP"): string {
  if (node.isPartitioned) {
    if (systemSetting === "CP") {
      throw new Error("503 Service Unavailable: Network partition prevents consistent read");
    } else {
      return node.val; // Return potentially stale data to ensure availability
    }
  }
  return node.val;
}`
  },
  {
    id: 15,
    category: "Frontend & Rollouts",
    question: "How would you design an infinite-scroll news feed?",
    answer: "Use cursor-based pagination to fetch batches of feed items, observe scroll container boundaries using the Intersection Observer API, and implement virtualization (windowing) to recycle DOM elements and preserve browser memory.",
    conceptBreakdown: [
      { title: "1. Intersection Observer", text: "Modern Web API that replaces expensive scroll scroll event listeners with asynchronous trigger boundaries at the bottom of the feed container." },
      { title: "2. Cursor Pagination", text: "Fetch the next page using the 'ID of the last visible item' as a reference anchor, preventing skipped or duplicated posts on database updates." },
      { title: "3. List Virtualization", text: "Rendering 10,000 cards crashes browser DOM memory. Virtualization only renders the ~10 visible elements, swapping content dynamically as users scroll." }
    ],
    practicalExample: "The LinkedIn or TikTok mobile feed lets you scroll for hours. Under the hood, cards off-screen are actively unmounted or recycled into empty containers.",
    prosCons: [
      { title: "Virtualization benefits", list: ["Preserves 60 FPS scrolling on cheap smartphones", "Locks active DOM element count to a tiny fixed constant", "Cons: High development complexity, custom handling required for dynamic element heights"] }
    ],
    codeExample: `// Basic React Intersection Observer custom hook
import { useEffect, useRef, useState } from "react";

export function useInfiniteTrigger(onTrigger: () => void) {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onTrigger();
      }
    }, { threshold: 0.1 });
    
    if (triggerRef.current) observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, [onTrigger]);

  return triggerRef;
}`
  },
  {
    id: 16,
    category: "Database & Storage",
    question: "Why prefer cursor-based pagination over offset-based for feeds?",
    answer: "Offset-based pagination splits pages using a fixed skip number (LIMIT/OFFSET), which leads to duplicate or skipped entries when items are inserted/deleted concurrently, and suffers from O(N) database scan latency on deep page fetches.",
    conceptBreakdown: [
      { title: "1. The Concurrent Insertion Bug", text: "If a user is reading Page 1 and 2 new items are created, when they click Page 2 (offset 10), the database shifts indexes and the user sees the last 2 items of Page 1 again." },
      { title: "2. The Performance Drag", text: "OFFSET 500000 tells the database to read 500,000 rows, discard them, and return the next 10, which results in agonizingly slow disk-seek speeds." },
      { title: "3. Cursor Indexing", text: "Cursors utilize a constant indexed field (e.g. id or created_at) in the WHERE clause: WHERE id < cursor LIMIT 10, jumping to index pointers in O(log N) time." }
    ],
    practicalExample: "Twitter feeds use cursor-based Snowflake IDs. No matter how many thousands of tweets are posted in real-time, scrolling continues seamlessly from your precise timestamp checkpoint.",
    prosCons: [
      { title: "Cursor vs. Offset Pagination", list: ["Cursor: O(log N) fast lookup, handles real-time additions/deletions flawlessly", "Cursor: Harder to build random page jumps (e.g., 'Jump to Page 47'), requires strict sequential index sorting"] }
    ],
    codeExample: `// Comparison of Database Queries
// ❌ Offset-based pagination (Slow on deep pages, buggy on updates)
const offsetQuery = "SELECT * FROM feed ORDER BY created_at DESC LIMIT 10 OFFSET 5000";

// ✅ Cursor-based pagination (Blazing fast, stable on updates)
const cursorQuery = "SELECT * FROM feed WHERE created_at < :last_seen_timestamp ORDER BY created_at DESC LIMIT 10";`
  },
  {
    id: 17,
    category: "Real-time & Security",
    question: "How would you design rate limiting for an API?",
    answer: "Track request timestamps using fast in-memory key-value stores (Redis) employing algorithms like Token Bucket, Leaky Bucket, or Sliding Window Log to drop or queue overflow traffic.",
    conceptBreakdown: [
      { title: "1. Token Bucket Algorithm", text: "A bucket holds a max capacity of tokens. Every request consumes a token. Tokens refill at a steady rate. If empty, the system returns a 429 error." },
      { title: "2. Sliding Window Counter", text: "Tracks sub-second timestamps of incoming requests per IP/API token. Smooths out traffic spikes near boundaries compared to static Fixed Window limits." },
      { title: "3. Global Distributed Limiters", text: "Use Redis to store counters globally to prevent bypasses when clients hit different horizontally scaled API Gateways." }
    ],
    practicalExample: "Stripe API rate limits clients to 100 requests per minute. If a crawler floods them, the API Gateway immediately intercepts, returning 429 with Retry-After headers.",
    prosCons: [
      { title: "Token Bucket vs. Sliding Window", list: ["Token Bucket: Simple to implement, allows healthy bursts of requests", "Sliding Window: Most precise protection against border-flooding, but memory intensive to log all timestamps in Redis"] }
    ],
    codeExample: `// Basic Redis sliding-window rate limiter in Express (conceptual)
async function rateLimiter(req: any, res: any, next: any) {
  const clientKey = req.ip;
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 10;

  // Remove timestamps older than current window
  await Redis.zremrangebyscore(clientKey, 0, now - windowMs);
  
  const requestCount = await Redis.zcard(clientKey);
  if (requestCount >= maxRequests) {
    res.setHeader("Retry-After", "60");
    return res.status(429).json({ error: "Too Many Requests" });
  }

  // Record this request timestamp
  await Redis.zadd(clientKey, now, now.toString());
  next();
}`
  },
  {
    id: 18,
    category: "Real-time & Security",
    question: "What is a message queue and when would you use one?",
    answer: "A message queue (e.g., RabbitMQ, Amazon SQS) is an asynchronous service-to-service communication component that decouples producers of work from consumers, smoothing out traffic load and improving availability.",
    conceptBreakdown: [
      { title: "1. Asynchronous Decoupling", text: "When a heavy task is requested, the API server writes a job message to the queue and responds 'Accepted'. Background workers consume and process it." },
      { title: "2. Buffer during Peak Surge", text: "If 100,000 tasks are sent in 10 seconds, the queue safely accumulates them, protecting backend databases from crashing." },
      { title: "3. Redelivery & Retries", text: "If a worker crashes mid-processing, the message is automatically re-queued and allocated to another active worker, achieving high reliability." }
    ],
    practicalExample: "When purchasing concert tickets, order confirmations and email receipts are queued up and sent over 1-2 minutes, preventing purchase threads from stalling.",
    prosCons: [
      { title: "Message Queue tradeoffs", list: ["Decouples services, allowing independent scaling", "Protects servers from memory exhaustion during heavy traffic spikes", "Cons: Increases infrastructure complexity, debugging distributed asynchronous errors is challenging"] }
    ],
    codeExample: `// Job Producer and Consumer (Conceptual Node.js integration)
// Producer: Writes job metadata to SQS/RabbitMQ
async function handleUserRegistration(userData: any) {
  await DB.saveUser(userData);
  
  // Push email job to the queue - responds instantly to user
  await MessageQueue.publish("welcome_emails", { email: userData.email, name: userData.name });
}

// Consumer: Runs in an isolated background worker process
function emailWorker() {
  MessageQueue.subscribe("welcome_emails", async (msg) => {
    await EmailService.sendWelcome(msg.email, msg.name);
    msg.ack(); // Complete transaction
  });
}`
  },
  {
    id: 19,
    category: "Database & Storage",
    question: "How would you design a system for handling file uploads at scale (large videos)?",
    answer: "Implement multipart chunked uploads direct to object storage, tracking upload offsets database-side to support pause/resume. Run background compression/transcoding pipelines via worker queues.",
    conceptBreakdown: [
      { title: "1. Multipart Chunking", text: "Clients slice a 2GB video into 5MB chunks locally using the HTML5 File API and upload them in parallel via pre-signed URLs." },
      { title: "2. Offset tracking & Resume", text: "The database maintains an active chunk checklist. If connection is lost, the client queries the backend to learn which chunks are saved, resuming upload seamlessly." },
      { title: "3. Distributed Transcoding", text: "Once all chunks are merged in storage, an async job splits the video, parallelizing conversion to MP4/HLS across multiple GPU instances." }
    ],
    practicalExample: "YouTube uploads slice raw high-def footages into separate chunks, uploading multiple threads simultaneously, and showing live percentage indicators.",
    prosCons: [
      { title: "Multipart Uploads vs. Single Stream", list: ["Multipart: Highly resilient to network drops, allows parallel transfer boosts", "Multipart: Requires assembly stage, client-side slice complexity"] }
    ],
    codeExample: `// Client-side File chunking logic (HTML5 Blob API)
async function uploadInChunks(file: File) {
  const chunkSize = 5 * 1024 * 1024; // 5MB chunks
  const totalChunks = Math.ceil(file.size / chunkSize);
  const uploadId = await fetchUploadSessionId(file.name);

  for (let index = 0; index < totalChunks; index++) {
    const start = index * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);
    
    // Upload chunk with offset metadata
    await uploadChunkToS3(uploadId, index, chunk);
  }
}`
  },
  {
    id: 20,
    category: "Performance & Caching",
    question: "How would you design search/autocomplete for a large dataset?",
    answer: "Debounce user keystrokes client-side, query dedicated prefix index stores (like Elasticsearch or a Trie-based in-memory system) instead of running slow database 'LIKE' scans, and cache hot queries.",
    conceptBreakdown: [
      { title: "1. Input Debouncing", text: "Delay API requests until user typing stops (e.g. for 250ms), preventing unnecessary queries on every keystroke." },
      { title: "2. Trie Data Structure", text: "A tree structure where nodes store characters in sequence. Traversal along nodes finds autocomplete suggestions in time proportional only to query length O(L)." },
      { title: "3. Secondary Search Indexing", text: "Never run `WHERE title LIKE '%abc%'` on a primary Postgres DB. Periodically sync DB records to Elasticsearch/Algolia for optimized inverted-index lookups." }
    ],
    practicalExample: "Google Search autocomplete. As you type 'sys', a cached global Trie returns 'system design interview' instantly from memory, utilizing geolocated CDN edge routing.",
    prosCons: [
      { title: "Elasticsearch/Trie vs. SQL LIKE scans", list: ["Elasticsearch: Sub-millisecond text matching with fuzzy search support", "Elasticsearch: Requires database sync workers, increases architecture complexity and hosting costs"] }
    ],
    codeExample: `// Basic Client-side Search Debounce Hook
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedVal, setDebouncedVal] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVal(value);
    }, delayMs);
    
    return () => clearTimeout(handler); // Clear on changes
  }, [value, delayMs]);

  return debouncedVal;
}`
  },
  {
    id: 21,
    category: "Database & Storage",
    question: "What is database sharding?",
    answer: "Database sharding is a horizontal database scaling technique where a single logical database is partitioned into multiple physical databases (shards), each storing a designated subset of rows.",
    conceptBreakdown: [
      { title: "1. Sharding Key Selection", text: "The field (e.g., user_id) used to partition data. Choosing an optimal key is critical to avoid hot-spots (e.g., sharding by active celebrity accounts)." },
      { title: "2. Range, Hash, or Directory Sharding", text: "Mapping methods: Range (e.g. IDs 1-1M to Shard A), Hash (e.g. `hash(id) % 3` distributes evenly), or Lookup directories." },
      { title: "3. Distributed Join limitations", text: "Sharding makes joins across shards extremely complex and slow. Applications must denormalize data or perform multiple query roundtrips." }
    ],
    practicalExample: "Twitter partitions tweets by user ID. User 105's tweets are stored in Shard 1, and User 204's tweets in Shard 2. User timelines load fast since data sits on a single physical disk.",
    prosCons: [
      { title: "Database Sharding tradeoffs", list: ["Permits scaling database write volumes indefinitely", "Eliminates single database storage limitations", "Cons: Highly complex failover clustering, joins across partitions require custom application logic"] }
    ],
    codeExample: `// Shard Routing Logic (Pseudocode)
interface ShardConnection { query(sql: string): any; }

class DatabaseCluster {
  private shards: ShardConnection[] = [Shard1, Shard2, Shard3];

  getShardConnection(userId: number): ShardConnection {
    // Hash-based routing to ensure data is evenly distributed
    const shardIndex = userId % this.shards.length;
    return this.shards[shardIndex];
  }
  
  async saveUserRecord(userId: number, record: any) {
    const shard = this.getShardConnection(userId);
    await shard.query(\`INSERT INTO users VALUES (\${userId}, ...)\`);
  }
}`
  },
  {
    id: 22,
    category: "Database & Storage",
    question: "How would you design a URL shortener?",
    answer: "Generate a unique short key using Base62 encoding mapped to the long URL in a fast key-value store, caching popular links in Redis to handle redirections in <2ms, and routing requests with HTTP 301/302 redirects.",
    conceptBreakdown: [
      { title: "1. Key Generation System", text: "Convert a unique auto-incremented database ID counter to Base62 (characters [0-9][a-z][A-Z]). A 7-character string supports 62^7 = 3.5 trillion URLs." },
      { title: "2. Key-Value Mapping", text: "Map short_key -> long_url. Since mappings are immutable, cache them permanently in distributed caches like Redis." },
      { title: "3. HTTP Redirects", text: "Use 301 (Permanent Redirect) to let browsers cache the destination, saving server QPS, or 302 (Temporary Redirect) if you need to track analytics clicks." }
    ],
    practicalExample: "Bit.ly converts raw long URLs into short keys like 'bit.ly/3gX9s'. Requests are handled by an edge redirect server in milliseconds, bypassing main app servers.",
    prosCons: [
      { title: "Base62 Encoding vs. Random MD5 Hashing", list: ["Base62: Shorter keys, zero collisions when using counter-based IDs", "MD5 Hash: Generates longer strings, requires collision-resolution checks when truncated"] }
    ],
    codeExample: `// Base62 Converter Utility
const BASE62_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encodeIdToBase62(id: number): string {
  let num = id;
  let shortUrl = "";
  while (num > 0) {
    shortUrl = BASE62_ALPHABET[num % 62] + shortUrl;
    num = Math.floor(num / 62);
  }
  return shortUrl || "0";
}`
  },
  {
    id: 23,
    category: "Real-time & Security",
    question: "How would you design a system to handle 'who's online' presence indicators?",
    answer: "Clients send periodic heartbeats (e.g. every 5 seconds) over WebSockets or HTTP. The server records these active timestamps in Redis with a short TTL (e.g. 15 seconds); missing heartbeats cause immediate automatic offline status.",
    conceptBreakdown: [
      { title: "1. Redis Heartbeat Store", text: "Redis is perfect for high-frequency writes. Maintain active users in a Hash or Sorted Set keyed by `userId` to run atomic reads/writes." },
      { title: "2. Timeout Sweep", text: "Instead of running active polling sweeps, set a 15-second TTL on individual Redis presence keys. If a client disconnects, the key naturally expires." },
      { title: "3. Status Broadcasting", text: "When a user transitions online/offline, trigger a message queue event to broadcast the presence change to connected friends." }
    ],
    practicalExample: "Slack or Discord indicators. If you put your laptop to sleep, the socket closes, your heartbeat stops, and your dot changes from green to grey for team members.",
    prosCons: [
      { title: "Presence polling tradeoffs", list: ["Extremely simple client-side logic", "Redis handled easily at huge scale with TTLs", "Cons: High network request volume, small latency gaps before showing offline states"] }
    ],
    codeExample: `// Presence Heartbeat Updater (Redis backend pseudocode)
async function registerUserHeartbeat(userId: string) {
  const presenceKey = \`presence:user:\${userId}\`;
  
  // Set user online status with automatic 15-second expiration
  await Redis.set(presenceKey, "online", "EX", 15);
}

async function isUserOnline(userId: string): Promise<boolean> {
  const status = await Redis.get(\`presence:user:\${userId}\`);
  return status === "online";
}`
  },
  {
    id: 24,
    category: "Architecture & Frameworks",
    question: "What's the difference between REST and GraphQL from a system design perspective?",
    answer: "REST uses multiple endpoints returning pre-defined static payloads (susceptible to over/under-fetching). GraphQL uses a single endpoint accepting custom client queries to return exact data shapes, moving fetching complexity to the server.",
    conceptBreakdown: [
      { title: "1. Data Fetching", text: "REST requires making 3 calls: /user, /posts, /followers. GraphQL requests all 3 nested arrays in a single query payload." },
      { title: "2. Caching Strategy", text: "REST caches seamlessly at the HTTP/CDN level using unique URLs. GraphQL is hard to cache at the network edge because it uses POST with arbitrary request bodies." },
      { title: "3. API Versioning", text: "REST requires versioning directories (/v1/user, /v2/user). GraphQL uses schema deprecation tags, avoiding rigid multi-endpoint versioning." }
    ],
    practicalExample: "A mobile client running on a slow 3G network fetches profile summaries. GraphQL trims payloads to 2KB, whereas REST forces loading heavy full-user JSON objects (100KB).",
    prosCons: [
      { title: "GraphQL vs. REST", list: ["GraphQL: Prevents mobile bandwidth wastage, simplifies frontend fetching logic", "GraphQL: Complex query parsing overhead, difficult to scale database joins, vulnerable to query-DoS attacks"] }
    ],
    codeExample: `// Payload Contrast
// GraphQL Single Query payload
const gqlQuery = \`
  query GetUserProfile {
    user(id: "1") {
      name
      posts { title }
    }
  }
\`;

// REST Equivalent fetches
// 1. GET /api/v1/users/1 -> returns heavy user metadata
// 2. GET /api/v1/users/1/posts -> returns heavy array of posts`
  },
  {
    id: 25,
    category: "Performance & Caching",
    question: "How would you design client-side caching for API data (e.g. with React Query)?",
    answer: "Cache responses locally keyed by query path & params, flag cached data as 'stale' instantly or after a TTL, serve stale data instantly during loads, and trigger background refetches to keep views synchronized.",
    conceptBreakdown: [
      { title: "1. Query Key Normalization", text: "Maintain local cache maps using serialized request variables as unique dictionary keys (e.g. ['users', userId])." },
      { title: "2. SWR (Stale-While-Revalidate)", text: "Render cached data first for instant UI response, trigger background network fetches, and replace cached records upon successful server returns." },
      { title: "3. Active Prefetching", text: "Observe user hover indicators. When a user hovers a link, fetch the resource in the background before they even click, making transitions feel instant." }
    ],
    practicalExample: "Twitter client-side caching. When you visit a profile, posts render instantly from local cache while a background spinner fetches new tweets to avoid visual flashes.",
    prosCons: [
      { title: "Client Caching advantages", list: ["Zero loading screens on repeat page visits", "Eliminates redundant server requests, lowering API cost bills", "Cons: High client-side memory footprint, risk of showing out-of-date content"] }
    ],
    codeExample: `// Basic Client-side In-Memory Cache Store (SWR implementation)
class QueryCacheStore {
  private cache = new Map<string, { data: any; fetchedAt: number }>();

  async fetchQuery(key: string, fetcher: () => Promise<any>, ttl = 5000) {
    const cached = this.cache.get(key);
    const now = Date.now();
    
    if (cached && (now - cached.fetchedAt < ttl)) {
      return cached.data; // Serve fresh cache
    }
    
    // Stale or cache-miss: trigger fetch
    const freshData = await fetcher();
    this.cache.set(key, { data: freshData, fetchedAt: now });
    return freshData;
  }
}`
  },
  {
    id: 26,
    category: "Architecture & Frameworks",
    question: "What are the tradeoffs of SSR vs CSR vs SSG at a system design level?",
    answer: "SSR delivers fresh dynamic content with great SEO but puts heavy CPU load on servers. CSR delivers static shells that are cheap to host but slower for first paint. SSG builds pages at compile time for near-zero server cost, but cannot handle real-time content changes.",
    conceptBreakdown: [
      { title: "1. SSR (Server-Side Rendering)", text: "Server queries the DB and compiles HTML on-demand. High Server Overhead. Low First Contentful Paint (FCP) time. Perfect for SEO." },
      { title: "2. CSR (Client-Side Rendering)", text: "Server serves a bare index.html + JS bundle. Client queries APIs and builds DOM. Zero server overhead. Slower Time To Interactive (TTI) on mobile devices." },
      { title: "3. SSG (Static Site Generation)", text: "Pre-renders HTML during build phase. Served instantly via CDNs. Best latency. Requires full rebuild triggers upon database additions." }
    ],
    practicalExample: "E-Commerce homepage uses SSG for speed. Product listing uses SSR to show fresh inventory. Admin panels use CSR since SEO is completely irrelevant behind authentication.",
    prosCons: [
      { title: "Rendering choices", list: ["SSG: Extreme speed, near-zero server bills, perfect CDN routing fit", "SSR: Essential for SEO and real-time content, but complex caching setup required", "CSR: Easiest to deploy and host, but vulnerable to bundle-bloat slow down"] }
    ],
    codeExample: `// Conceptual illustration of Rendering Outputs
// 1. CSR Output: <div id="root"></div> <script src="bundle.js"></script>
// 2. SSR Output: <div id="root"><h1>User: John</h1><p>Age: 25</p></div>`
  },
  {
    id: 27,
    category: "Frontend & Rollouts",
    question: "How would you design a feature flag / gradual rollout system?",
    answer: "Define feature toggles in a central configuration store, fetch or cache configs client-side, and use consistent hashing/modulo algorithms on user identifiers to bucket users into test variations without central request roundtrips.",
    conceptBreakdown: [
      { title: "1. Consistent Bucketing", text: "Evaluate flag states client-side in O(1) time: \`hash(userId + flagKey) % 100 < rolloutPercentage\`. This ensures a user consistently sees the same variation." },
      { title: "2. Real-time Configurations", text: "Client retrieves a configuration manifest during boot, or listens to Server-Sent Events (SSE) for instant, real-time toggles without code redeploys." },
      { title: "3. Multi-variant Split Testing", text: "Support precise targeting criteria (e.g. country, app version) to slowly increase rollouts from 1% -> 10% -> 100%." }
    ],
    practicalExample: "Facebook launches a new redesign. They activate the flag for 1% of users, monitor Sentry crash telemetry, and incrementally dial it up to 100% after confirming stability.",
    prosCons: [
      { title: "Gradual rollouts benefit", list: ["Bypasses slow App Store approval delays", "Acts as an instant kill-switch when critical bugs occur in production", "Cons: Leads to code debt with dead branch paths, testing permutations becomes complex"] }
    ],
    codeExample: `// Deterministic Rollout Bucketer
function isFeatureEnabled(userId: string, flagKey: string, percentage: number): boolean {
  // Simple deterministic hash of user and flag
  const combinedKey = \`\${userId}_\${flagKey}\`;
  let hash = 0;
  for (let i = 0; i < combinedKey.length; i++) {
    hash = combinedKey.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const bucket = Math.abs(hash) % 100;
  return bucket < percentage;
}`
  },
  {
    id: 28,
    category: "Frontend & Rollouts",
    question: "What is idempotency and why does it matter for API design?",
    answer: "An idempotent operation is one that can be executed multiple times without changing the result beyond the initial application. It is critical for retry-safety in distributed systems to prevent side-effects like double-billing.",
    conceptBreakdown: [
      { title: "1. Idempotency Key", text: "Clients attach a unique cryptographic key (UUID) to mutating HTTP headers (Idempotency-Key: <UUID>) before sending sensitive requests." },
      { title: "2. Server deduplication", text: "Server attempts to write Key -> Pending to Redis. If key already exists, server blocks request and returns the cached response or a 'Processing' status." },
      { title: "3. Retry Safety", text: "If a network glitch occurs post-payment execution but before response delivery, clients can retry safely. The server detects the key, avoiding double-charging." }
    ],
    practicalExample: "Stripe Payment APIs. If a payment button is clicked twice due to slow internet, the second request is caught by the idempotency layer, returning the original receipt.",
    prosCons: [
      { title: "Idempotent API design", list: ["Prevents high-risk operations (money, booking) from duplicate states", "Safeguards from network retry loop errors", "Cons: Requires database/Redis storage overhead, strict key lifecycle expiration management"] }
    ],
    codeExample: `// Idempotency Middleware logic
async function processPayment(req: any, res: any) {
  const idempotencyKey = req.headers["idempotency-key"];
  if (!idempotencyKey) return res.status(400).json({ error: "Idempotency key required" });

  // 1. Check if we already handled this request
  const existingResponse = await Redis.get(\`idempotency:\${idempotencyKey}\`);
  if (existingResponse) {
    return res.json(JSON.parse(existingResponse)); // Return cached success
  }

  // 2. Process transaction and write results safely
  const result = await ChargeCard(req.body);
  
  // 3. Cache result in Redis for 24 hours
  await Redis.set(\`idempotency:\${idempotencyKey}\`, JSON.stringify(result), "EX", 86400);
  res.json(result);
}`
  },
  {
    id: 29,
    category: "Frontend & Rollouts",
    question: "How would you design a system to prevent double-submission of a form (checkout)?",
    answer: "Prevent double-submits at multiple layers: instantly disable submission buttons on click client-side, generate and attach short-lived one-time submit tokens, and implement server-side idempotency middleware.",
    conceptBreakdown: [
      { title: "1. Client-side Blocking", text: "Update button states to 'Loading...' and disable click listeners immediately upon the first pointer event." },
      { title: "2. One-Time Submit Tokens", text: "Before showing a checkout form, fetch a short-lived submission token from the API. The server only processes a request if the token exists, deleting it instantly on use." },
      { title: "3. Pointer Event Debouncing", text: "Implement CSS pointers-events-none toggles to eliminate multi-finger taps or rapid keyboard enters triggering forms." }
    ],
    practicalExample: "An airline booking checkout. Upon clicking 'Reserve Seat', the form locks out and displays a loading animation, protecting against concurrent reservation requests.",
    prosCons: [
      { title: "Client + Server layers vs. Client-only", list: ["Multi-layer: Fully secure against browser back-buttons and API crawlers", "Client-only: Easily bypassed by opening developer consoles or network repeats"] }
    ],
    codeExample: `// React Double-Submission Prevention pattern
import { useState } from "react";

export function CheckoutForm({ onSubmitPayment }: { onSubmitPayment: () => Promise<void> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async () => {
    if (isSubmitting) return; // safeguard
    setIsSubmitting(true); // Disable button instantly
    
    try {
      await onSubmitPayment();
    } finally {
      setIsSubmitting(false); // restore only if appropriate
    }
  };

  return (
    <button 
      onClick={handleCheckout} 
      disabled={isSubmitting}
      className={isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    >
      {isSubmitting ? "Processing payment..." : "Pay Now"}
    </button>
  );
}`
  },
  {
    id: 30,
    category: "Architecture & Frameworks",
    question: "How would you approach designing for accessibility and internationalization at a system level?",
    answer: "Build accessibility (A11y) into your design token system using semantic HTML, ARIA layout standards, and full keyboard navigation. Setup internationalization (i18n) using dynamic asset-fetching bundles keyed by locale, supporting RTL layouts and localized date-time systems.",
    conceptBreakdown: [
      { title: "1. Semantic Design Tokens", text: "Define focus states, high contrast color configurations, and touch targets (minimum 44x44px) inside your core design token system directly." },
      { title: "2. Code splitting translations", text: "Do not load all languages at boot. Split translations into individual JSON files (/locales/es.json) fetched on-demand depending on user settings." },
      { title: "3. RTL and Formatting Layouts", text: "Support RTL languages (Arabic, Hebrew) by using logical CSS properties (e.g., margins, alignments) and HTML direction parameters (<html dir='rtl'>)." }
    ],
    practicalExample: "A global portal like Wikipedia. Users can toggle languages instantly; the app fetches localized content, dynamically adjusts layouts to Right-To-Left, and maintains screen reader support.",
    prosCons: [
      { title: "Upfront i18n vs. Retrofitting", list: ["Upfront: Zero structural code rewrites later", "Upfront: Accessible elements benefit keyboard users and SEO search indexing", "Retrofitting: Extremely painful, requires auditing thousands of static text lines"] }
    ],
    codeExample: `// Localized and Accessible Button Component (Conceptual React)
interface GlobalButtonProps {
  labelKey: string;
  onClick: () => void;
  translations: Record<string, string>; // localized key-value
}

export function AccessibleButton({ labelKey, onClick, translations }: GlobalButtonProps) {
  const label = translations[labelKey] || labelKey;
  
  return (
    <button 
      onClick={onClick}
      aria-label={label} // Screen reader compatibility
      className="p-3 text-sm focus:outline-2 focus:outline-offset-2 focus:outline-cyan-500 rounded"
    >
      {label}
    </button>
  );
}`
  }
];
