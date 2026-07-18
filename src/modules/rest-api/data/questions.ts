export interface QuestionData {
  id: number;
  question: string;
  answer: string;
  category: 'core' | 'methods' | 'status' | 'data' | 'security' | 'practices';
  detailedExplanation: string;
  exampleRequest?: string;
  exampleResponse?: string;
}

export const CATEGORIES = [
  { id: 'all', name: 'All Concepts' },
  { id: 'core', name: 'Core Concepts & Principles' },
  { id: 'methods', name: 'HTTP Methods & Semantics' },
  { id: 'status', name: 'Status Codes & Negotiation' },
  { id: 'data', name: 'Data Management & Patterns' },
  { id: 'security', name: 'Security, CORS & Webhooks' },
  { id: 'practices', name: 'Best Practices & Tooling' },
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  core: 'Core Concepts & Principles',
  methods: 'HTTP Methods & Semantics',
  status: 'Status Codes & Negotiation',
  data: 'Data Management & Patterns',
  security: 'Security, CORS & Webhooks',
  practices: 'Best Practices & Tooling',
};

export const QUESTIONS: QuestionData[] = [
  {
    id: 1,
    category: 'core',
    question: 'What does REST stand for?',
    answer: 'Representational State Transfer — an architectural style for designing networked APIs around resources.',
    detailedExplanation: 'REST was defined by Roy Fielding in his 2000 doctoral dissertation. Rather than exposing arbitrary remote procedures (like RPC), REST focuses on exposing resources identified by uniform resource identifiers (URIs). Clients interact with these resources using a uniform, standard set of operations (the HTTP methods) and transfer state by sending representations of resources (like JSON, XML, or HTML).',
    exampleRequest: 'GET /api/v1/users/42 HTTP/1.1\nHost: api.example.com\nAccept: application/json',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "id": 42,\n  "username": "alice",\n  "email": "alice@example.com"\n}'
  },
  {
    id: 2,
    category: 'core',
    question: 'What are the core principles of REST?',
    answer: 'Statelessness, client-server separation, uniform interface, cacheability, layered system, and (optionally) code-on-demand.',
    detailedExplanation: 'These 6 constraints define a RESTful architecture:\n1. Client-Server: Separation of concerns — the user interface and user state remain on the client, while storage remains on the server.\n2. Statelessness: Each request from any client contains all the information necessary to understand and complete the request.\n3. Cacheability: Server responses must implicitly or explicitly declare themselves as cacheable or non-cacheable to prevent clients from fetching stale data and to optimize latency.\n4. Uniform Interface: Simplified system architecture via standard resource identification (URIs), resource manipulation through representations, self-descriptive messages, and HATEOAS.\n5. Layered System: A client cannot ordinarily tell whether it is connected directly to the end server or to an intermediary (like a load balancer, proxy, or cache).\n6. Code on Demand (Optional): The server can temporarily extend or customize client functionality by transferring executable code (e.g. JavaScript scripts).',
    exampleRequest: 'GET /assets/interactive-component.js HTTP/1.1\nHost: api.example.com',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/javascript\nCache-Control: public, max-age=3600\n\nconsole.log("Hydrating interactive UI on the client side.");'
  },
  {
    id: 3,
    category: 'core',
    question: 'What does "stateless" mean in REST?',
    answer: 'Each request contains all information needed to process it — the server doesn\'t store client session state between requests.',
    detailedExplanation: 'Statelessness means that the server does not store any historical context about the client connection in its memory (like session variables, wizards state, or current page). If a client wants to perform a request that requires authentication or page context, it must send those credentials (e.g., a Bearer JWT Token) and required parameters with every single request. This makes the backend highly scalable since any incoming request can be routed to any server instance without session replication.',
    exampleRequest: 'GET /api/v1/profile HTTP/1.1\nHost: api.example.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "username": "dev_guru",\n  "role": "editor"\n}'
  },
  {
    id: 4,
    category: 'core',
    question: 'What is a "resource" in REST?',
    answer: 'Any entity/concept exposed by the API (a user, an order, a product), typically represented by a URL.',
    detailedExplanation: 'A resource is the fundamental building block of a REST API. It is any object, data, or service that can be identified, named, and manipulated. It could be a physical entity (a product), a digital entity (a PDF invoice), or a conceptual collection (active transactions). Each resource MUST have a unique, stable identifier—which in Web APIs is a URI (Uniform Resource Identifier).',
    exampleRequest: 'GET /api/v1/products/sku-99201 HTTP/1.1\nHost: api.example.com',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "sku": "sku-99201",\n  "name": "Mechanical Keyboard",\n  "price_usd": 129.99\n}'
  },
  {
    id: 5,
    category: 'methods',
    question: 'What HTTP methods map to which CRUD operations?',
    answer: 'GET (read), POST (create), PUT/PATCH (update), DELETE (delete).',
    detailedExplanation: 'HTTP verbs maps elegantly to persistent storage CRUD operations:\n- POST -> Create: Creates a new resource. The path is typically a collection URL. It is non-idempotent.\n- GET -> Read: Retrieves a representation of a resource or collection. It is safe and idempotent.\n- PUT -> Update/Replace: Replaces the entire targeted resource with the uploaded payload, or creates it if it doesn\'t exist. It is idempotent.\n- PATCH -> Update/Modify: Applies a partial delta to a resource. It can be non-idempotent depending on the implementation.\n- DELETE -> Delete: Destroys the target resource. It is idempotent.',
    exampleRequest: 'POST /api/v1/tickets HTTP/1.1\nContent-Type: application/json\n\n{\n  "title": "Bug in API authentication",\n  "severity": "High"\n}',
    exampleResponse: 'HTTP/1.1 201 Created\nLocation: /api/v1/tickets/1029\nContent-Type: application/json\n\n{\n  "id": 1029,\n  "title": "Bug in API authentication",\n  "severity": "High",\n  "status": "open"\n}'
  },
  {
    id: 6,
    category: 'methods',
    question: 'PUT vs PATCH — what\'s the difference?',
    answer: 'PUT typically replaces the entire resource; PATCH applies a partial update to specific fields.',
    detailedExplanation: 'PUT is a full replacement. When you send a PUT request, the payload is treated as the complete, new version of the resource. Any existing fields not included in the payload are cleared or set to null/defaults. PATCH is a partial update. Only the fields explicitly sent in the PATCH request body are modified; all other existing properties of the resource remain untouched. This saves bandwidth and reduces conflict risk on massive objects.',
    exampleRequest: 'PATCH /api/v1/users/12 HTTP/1.1\nContent-Type: application/json\n\n{\n  "email": "new-email@example.com"\n}',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "id": 12,\n  "username": "jane_doe",\n  "email": "new-email@example.com",\n  "role": "subscriber"\n}'
  },
  {
    id: 7,
    category: 'methods',
    question: 'What makes an HTTP method "idempotent"?',
    answer: 'Calling it multiple times produces the same result as calling it once — GET, PUT, DELETE are idempotent; POST generally is not.',
    detailedExplanation: 'An HTTP method is idempotent if the side effects of making multiple identical requests are the same as making a single request. For example, deleting resource #5 via DELETE multiple times has the same final system state (resource is gone) as doing it once. Reading via GET changes nothing (safe and idempotent). Overwriting via PUT with the same data always results in the same state. However, sending POST (Create) 5 times creates 5 separate database records!',
    exampleRequest: 'DELETE /api/v1/items/88 HTTP/1.1\nHost: api.example.com',
    exampleResponse: 'HTTP/1.1 204 No Content'
  },
  {
    id: 8,
    category: 'methods',
    question: 'Is PATCH idempotent?',
    answer: 'Not necessarily — depends on the semantics of the patch operation (e.g. "increment by 1" is not idempotent; "set field to X" is).',
    detailedExplanation: 'PATCH is not guaranteed to be idempotent. It is entirely dependent on the instructions inside the request. If the PATCH body contains instructions like JSON Patch `{ "op": "add", "path": "/score", "value": 10 }` or `{ "op": "increment", "amount": 1 }`, running it 3 times increments the resource score by 30. However, if the payload is `{ "score": 100 }` (a simple field assignment), running it multiple times always results in the score being exactly 100, which is idempotent.',
    exampleRequest: 'PATCH /api/v1/stats/user-44 HTTP/1.1\nContent-Type: application/json-patch+json\n\n[\n  { "op": "add", "path": "/loginCount", "value": 1 }\n]',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "userId": "user-44",\n  "loginCount": 16\n}'
  },
  {
    id: 9,
    category: 'status',
    question: 'What are common HTTP status code categories?',
    answer: '1xx informational, 2xx success, 3xx redirection, 4xx client error, 5xx server error.',
    detailedExplanation: 'Status codes are three-digit integers returned by the server to inform the client of the outcome of their request:\n- 1xx (Informational): Request received, continuing process.\n- 2xx (Success): The action was successfully received, understood, and accepted.\n- 3xx (Redirection): Further action must be taken by the client to complete the request.\n- 4xx (Client Error): The request contains bad syntax, missing fields, or unauthorized parameters.\n- 5xx (Server Error): The server failed to fulfill an apparently valid request due to internal crashes or timeout errors.',
    exampleRequest: 'GET /api/v1/restricted HTTP/1.1\nHost: api.example.com',
    exampleResponse: 'HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Bearer realm="Access to api"\nContent-Type: application/json\n\n{\n  "error": "Authentication token is missing or expired"\n}'
  },
  {
    id: 10,
    category: 'status',
    question: 'What\'s the difference between 401 and 403?',
    answer: '401 Unauthorized means authentication is missing/invalid; 403 Forbidden means the client is authenticated but not permitted to access the resource.',
    detailedExplanation: 'Think of 401 as "Who are you? I don\'t know, or your credentials are expired." Think of 403 as "I know exactly who you are, but you do not have permission/roles to open this door." A 401 response should trigger an authentication login flow (e.g. redirect to login page). A 403 response indicates a permissions mismatch, so the client should remain logged in but see an "Access Denied" notice.',
    exampleRequest: 'GET /api/v1/admin/billing HTTP/1.1\nAuthorization: Bearer eyJyb2xlIjoic3Vic2NyaWJlciJ9 (Subscriber Role)',
    exampleResponse: 'HTTP/1.1 403 Forbidden\nContent-Type: application/json\n\n{\n  "error": "Requires Admin role to view billing settings"\n}'
  },
  {
    id: 11,
    category: 'status',
    question: 'What\'s the difference between 200, 201, and 204?',
    answer: '200 OK (general success with body), 201 Created (resource successfully created, often with a Location header), 204 No Content (success but no response body, common for DELETE).',
    detailedExplanation: 'These 2xx codes inform the client of different success variations:\n- 200 OK: Standard response for successful GET, PUT, or POST requests where payload data is sent back to the client.\n- 201 Created: The request has been fulfilled and has resulted in one or more new resources being created. The server should supply a `Location` header containing the new resource\'s URL.\n- 204 No Content: The server successfully processed the request, but is not returning any content in the response body. This is perfect for DELETE requests or PUT actions where updating client state is not necessary.',
    exampleRequest: 'DELETE /api/v1/posts/55 HTTP/1.1\nHost: api.example.com',
    exampleResponse: 'HTTP/1.1 204 No Content\nCache-Control: no-cache'
  },
  {
    id: 12,
    category: 'status',
    question: 'What is 404 vs 410?',
    answer: '404 Not Found means the resource doesn\'t exist (or existence isn\'t disclosed); 410 Gone explicitly indicates the resource used to exist but was intentionally removed.',
    detailedExplanation: 'A 404 Not Found is generic and temporary. It means the server cannot locate the requested resource, either because of a typo, the resource never existed, or the server is hiding its existence for security. A 410 Gone is permanent. It tells search engine crawlers and clients that the resource explicitly existed but has been permanently deleted and will not return. This prompts search indexes to remove the URL instantly.',
    exampleRequest: 'GET /api/v1/discontinued-product HTTP/1.1\nHost: api.example.com',
    exampleResponse: 'HTTP/1.1 410 Gone\nContent-Type: application/json\n\n{\n  "message": "Product SKU-99 has been permanently discontinued and catalog record deleted."\n}'
  },
  {
    id: 13,
    category: 'core',
    question: 'What is HATEOAS?',
    answer: 'Hypermedia As The Engine Of Application State — API responses include links to related actions/resources, letting clients navigate the API dynamically rather than hardcoding URLs.',
    detailedExplanation: 'HATEOAS is a constraint of REST that makes your API self-discoverable. Instead of client developers reading documents to find nested endpoints (like how to pay for an order), the API returns hypertext links (`_links`) with each response. If an order is "unpaid", the response contains a link to "pay". Once it is paid, that link disappears and links for "track-shipping" or "cancel" appear. The client simply reads the links to determine what actions are currently valid.',
    exampleRequest: 'GET /api/v1/orders/772 HTTP/1.1',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/hal+json\n\n{\n  "id": 772,\n  "total": 45.00,\n  "status": "unpaid",\n  "_links": {\n    "self": { "href": "/orders/772" },\n    "customer": { "href": "/customers/19" },\n    "pay": { "href": "/orders/772/payments" }\n  }\n}'
  },
  {
    id: 14,
    category: 'data',
    question: 'How do you version a REST API?',
    answer: 'Common approaches: URL versioning (/v1/users), header-based versioning (Accept: application/vnd.api.v1+json), or query parameter versioning.',
    detailedExplanation: 'Versioning prevents breaking changes for existing API clients. Three common paradigms exist:\n1. URL Path Versioning (Most Popular): Explicit version in the path (`/api/v1/users`). Highly cacheable and visible, but violates resource identifier permanence.\n2. Header Custom Versioning (Content Negotiation): The version is specified in custom headers (`X-API-Version: 2`) or Content-Type/Accept headers (`Accept: application/vnd.myapi.v2+json`). This keeps URLs clean but is harder to debug or test in a browser.\n3. Query Parameter: Version passes in URL parameters (`/users?v=2`). Simple to implement but can pollute cache lookup indexes.',
    exampleRequest: 'GET /api/users HTTP/1.1\nHost: api.example.com\nAccept: application/vnd.company.v2+json',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/vnd.company.v2+json\n\n{\n  "users": [\n    { "uuid": "d3b07384", "full_name": "Alice Smith" }\n  ]\n}'
  },
  {
    id: 15,
    category: 'status',
    question: 'What is content negotiation?',
    answer: 'Client and server agreeing on the response format (JSON, XML, etc.) via headers like Accept and Content-Type.',
    detailedExplanation: 'Content negotiation is the process of selecting the best representation for a given response when multiple representations are available. The client sends an `Accept` header indicating preferred formats (with optional quality values, e.g., `application/json;q=0.9, text/xml;q=0.1`). The server inspects this header, serializes the resource accordingly, and sends a `Content-Type` response header confirming the format of the payload returned.',
    exampleRequest: 'GET /api/v1/reports/monthly HTTP/1.1\nAccept: text/csv',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: text/csv\nContent-Disposition: attachment; filename="report.csv"\n\nMonth,Sales,Expenses\nJan,45000,12000\nFeb,48000,13500'
  },
  {
    id: 16,
    category: 'methods',
    question: 'What is idempotency key used for in APIs (e.g. payments)?',
    answer: 'A client-generated unique key sent with a request so the server can detect and safely ignore duplicate submissions (e.g. from network retries).',
    detailedExplanation: 'In non-idempotent operations like processing payments (`POST /charges`), a client might send a request but suffer a sudden network disconnect before receiving the response. Is the payment processed or not? To retry safely, the client generates a unique UUID "Idempotency Key" and attaches it via header (`Idempotency-Key: fd67e-23aa...`). The server stores this key and its processed result. If a matching key arrives again, the server bypasses the credit card charge and simply replies with the cached success response.',
    exampleRequest: 'POST /api/v1/charges HTTP/1.1\nIdempotency-Key: 7b9b7410-b9bf-11ed-afa1-0242ac120002\nContent-Type: application/json\n\n{ "amount": 1000, "currency": "usd" }',
    exampleResponse: 'HTTP/1.1 201 Created\nX-Cache-Lookup: Idempotent HIT\n\n{ "charge_id": "ch_982103", "amount": 1000, "status": "succeeded" }'
  },
  {
    id: 17,
    category: 'data',
    question: 'How would you design pagination for a REST API?',
    answer: 'Offset-based (?page=2&limit=20) is simple but can skip/duplicate items on concurrent writes; cursor-based (?after=<id>) is more robust for frequently-changing data.',
    detailedExplanation: 'Two key pagination strategies are common:\n1. Offset Pagination: Uses `limit` (page size) and `offset` or `page` query parameters. Very easy to implement and allows direct jumping to any page (e.g., page 5). However, if an item is inserted on page 1 while the client is reading page 2, the last item of page 1 pushes down, appearing as a duplicate on page 2. It also suffers performance lags on deep database offsets.\n2. Cursor Pagination (Keyset): Uses a unique, sequential cursor indicator (e.g. `after=item_id_109`). Highly performant on massive datasets and resilient to live insertions/deletions since records are retrieved strictly relative to a stable cursor anchor.',
    exampleRequest: 'GET /api/v1/feed?limit=5&after=feed_id_4491 HTTP/1.1',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "data": [\n    { "id": "feed_id_4492", "message": "Good morning!" }\n  ],\n  "paging": {\n    "cursor": "feed_id_4492",\n    "next": "/feed?limit=5&after=feed_id_4492"\n  }\n}'
  },
  {
    id: 18,
    category: 'core',
    question: 'What is over-fetching and under-fetching, and how does REST relate to it?',
    answer: 'Over-fetching: getting more data than needed from a fixed endpoint shape; under-fetching: needing multiple requests to assemble the needed data — both common REST pain points that GraphQL was designed to address.',
    detailedExplanation: 'REST endpoints have rigid response contracts. If `/users/:id` returns a massive payload containing address history, security questions, and billing cards, a client who only needs to display the user\'s profile picture is OVER-FETCHING massive unneeded payload bandwidth. Conversely, if the endpoint is highly decomposed, the client must request `/users/:id`, then `/users/:id/posts`, then `/posts/:id/comments` — making multiple round-trips over mobile data. This is UNDER-FETCHING. While GraphQL allows fields query styling to solve this, REST can use sparse fieldset parameters (e.g. `?fields=name,avatar`).',
    exampleRequest: 'GET /api/v1/users/5?fields=name,avatar HTTP/1.1',
    exampleResponse: 'HTTP/1.1 200 OK\n\n{\n  "name": "Alex",\n  "avatar": "https://images.com/alex.jpg"\n}'
  },
  {
    id: 19,
    category: 'data',
    question: 'How do you handle filtering/sorting in a REST API?',
    answer: 'Query parameters, e.g. /products?category=shoes&sort=price_asc.',
    detailedExplanation: 'Filtering, sorting, and global searching are passed in HTTP GET requests via query parameters. This keeps resource routing clean while empowering client manipulation. Standard parameters like `sort=-created_at` (prefixing minus for descending) or object-based operators `?price[gte]=100` are common patterns. These parameters map directly into backend SQL `WHERE` and `ORDER BY` operations.',
    exampleRequest: 'GET /api/v1/products?category=apparel&price[gte]=50&sort=-rating HTTP/1.1',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "products": [\n    { "name": "Leather Jacket", "price": 120, "rating": 4.9 }\n  ]\n}'
  },
  {
    id: 20,
    category: 'core',
    question: 'What is a good REST URL naming convention?',
    answer: 'Plural nouns for collections (/users), nested resources reflecting relationships (/users/:id/orders), avoiding verbs in the path (the HTTP method is the verb).',
    detailedExplanation: 'REST URLs identify resources (things), not operations (actions). Therefore, paths must contain plural nouns representing collections and nested identifiers representing parent-child relationships:\n- ❌ BAD (RPC hybrid): `POST /api/getUsers`, `POST /api/deleteUser/45`\n- ✅ GOOD: `GET /api/users`, `DELETE /api/users/45`\n- ✅ GOOD NESTED: `GET /api/users/12/orders` (fetching orders belonging to user 12). Keep nesting under two levels deep to avoid massive, illegible URLs.',
    exampleRequest: 'GET /api/v1/authors/7/books HTTP/1.1',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n[\n  { "id": 102, "title": "Understanding API Design", "author_id": 7 }\n]'
  },
  {
    id: 21,
    category: 'status',
    question: 'How should errors be structured in a REST API response?',
    answer: 'Consistent shape across all errors — e.g. { error: { code, message, details } } — so clients can handle errors uniformly.',
    detailedExplanation: 'A production API must never return raw database dumps, HTML index files, or unstructured text stacktraces on failure. Errors should be clean, structured, and use standard formats (such as RFC 7807 Problem Details). A uniform error payload consists of a human-readable summary, an internal machine-parsable error code, and detailed field validations so clients can map errors back to specific inputs in UI forms.',
    exampleRequest: 'POST /api/v1/register HTTP/1.1\nContent-Type: application/json\n\n{ "email": "invalid-email" }',
    exampleResponse: 'HTTP/1.1 400 Bad Request\nContent-Type: application/problem+json\n\n{\n  "type": "https://api.example.com/errors/validation-failed",\n  "title": "Your request payload failed validation parameters.",\n  "status": 400,\n  "code": "VAL_001",\n  "invalid_params": [\n    { "field": "email", "reason": "Must be a syntactically valid email format." }\n  ]\n}'
  },
  {
    id: 22,
    category: 'security',
    question: 'What is rate limiting and how is it typically communicated to clients?',
    answer: 'Restricting requests per time window per client; communicated via headers like X-RateLimit-Remaining, Retry-After, and a 429 status code when exceeded.',
    detailedExplanation: 'Rate limiting is used to prevent abuse, malicious DDoS attacks, or brute-forcing. When a client exceeds their allowance, the server rejects subsequent requests with a `429 Too Many Requests` status code. Key response headers include:\n- `X-RateLimit-Limit`: Maximum requests allowed in the current window.\n- `X-RateLimit-Remaining`: Requests remaining in the current window.\n- `X-RateLimit-Reset`: Unix timestamp when the limit resets.\n- `Retry-After`: Number of seconds the client must wait before retrying (often returned with 429).',
    exampleRequest: 'GET /api/v1/search?q=guitars HTTP/1.1',
    exampleResponse: 'HTTP/1.1 429 Too Many Requests\nRetry-After: 30\nContent-Type: application/json\n\n{\n  "error": "Rate limit exceeded. Please wait 30 seconds before submitting another request."\n}'
  },
  {
    id: 23,
    category: 'security',
    question: 'What is CORS and why does it exist?',
    answer: 'Cross-Origin Resource Sharing — a browser security mechanism restricting requests to a different origin than the page was served from, unless the server explicitly allows it via headers.',
    detailedExplanation: 'CORS is enforced exclusively by web browsers to protect users from malicious scripts on one tab making unauthorized requests on another tab. An origin is defined by Protocol + Domain + Port. If your React app runs on `http://localhost:3000` and fetches from `http://api.myapp.com`, the browser halts the response unless the API server returns the header `Access-Control-Allow-Origin: http://localhost:3000` (or `*`). It is NOT a server-side security mechanism; non-browser tools like Postman completely bypass CORS.',
    exampleRequest: 'GET /api/v1/public-data HTTP/1.1\nOrigin: http://my-frontend.com',
    exampleResponse: 'HTTP/1.1 200 OK\nAccess-Control-Allow-Origin: http://my-frontend.com\nAccess-Control-Allow-Methods: GET, POST\nContent-Type: application/json\n\n{ "status": "authorized" }'
  },
  {
    id: 24,
    category: 'security',
    question: 'How do preflight requests work in CORS?',
    answer: 'For certain requests (non-simple methods/headers), the browser sends an OPTIONS request first to check if the actual request is allowed, before sending the real one.',
    detailedExplanation: 'Simple requests (GET/POST with standard form content types) do not trigger preflight. However, "complex" requests—such as those using PUT, DELETE, PATCH, or custom headers like `Authorization` or `Content-Type: application/json`—will trigger an automatic browser-initiated `OPTIONS` request. This request asks permission before making the real destructive write. If the server replies to the `OPTIONS` request with matching CORS headers, the browser fires the actual request.',
    exampleRequest: 'OPTIONS /api/v1/users/4 HTTP/1.1\nAccess-Control-Request-Method: DELETE\nAccess-Control-Request-Headers: authorization\nOrigin: http://my-frontend.com',
    exampleResponse: 'HTTP/1.1 204 No Content\nAccess-Control-Allow-Origin: http://my-frontend.com\nAccess-Control-Allow-Methods: GET, POST, PUT, DELETE\nAccess-Control-Allow-Headers: authorization\nAccess-Control-Max-Age: 86400'
  },
  {
    id: 25,
    category: 'security',
    question: 'What is the difference between authentication and authorization?',
    answer: 'Authentication verifies who the user is; authorization determines what that authenticated user is allowed to do.',
    detailedExplanation: 'Authentication is the process of confirming identity (e.g., logging in with email/password, verifying a physical key, validating a biometric face scan). The output is typically a user ID or token. Authorization happens after successful authentication. It inspects the identified user\'s roles or scopes (e.g. `role: "admin"`) to verify whether they are permitted to run a requested operation (like deleting a user).',
    exampleRequest: 'GET /api/v1/dashboard HTTP/1.1\nAuthorization: Bearer eyJ1c2VySWQiOiJkb2UiLCJyb2xlIjoiYmFzaWMifQ==',
    exampleResponse: 'HTTP/1.1 200 OK\n\n{ "welcome": "Hello Jane Doe. You have successfully authenticated!" }'
  },
  {
    id: 26,
    category: 'security',
    question: 'What is a common way to authenticate REST API requests?',
    answer: 'Bearer tokens (JWT) in the Authorization header, or API keys, or session cookies for browser-based apps.',
    detailedExplanation: 'API authentication methodologies usually fall into three categories:\n1. Bearer Token (Stateless JWT): The client sends `Authorization: Bearer <JWT_Token>`. The token is a self-signed payload. The server decrypts it to verify the user without querying a session store.\n2. API Keys: A simple, long-lived token generated by the server and sent in a custom header (e.g., `X-API-Key: my_secret_key`). Great for server-to-server integrations.\n3. Session Cookies: HttpOnly cookies sent automatically by browsers. Stateful, requiring the server to look up session IDs in memory or Redis.',
    exampleRequest: 'GET /api/v1/analytics HTTP/1.1\nX-API-Key: dev_6f019b78a9c2...',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{ "active_sessions": 240 }'
  },
  {
    id: 27,
    category: 'security',
    question: 'What is API rate limiting used to protect against?',
    answer: 'Abuse, denial-of-service, and ensuring fair resource usage across all clients of a shared API.',
    detailedExplanation: 'Rate limiting is a key infrastructure protection layer. Without it, a rogue script can make 10,000 requests per second, exhaust the database connection pool, and crash the entire system for all other users (Denial of Service). Rate limiting ensures "fair-share" resource allocation, shields expensive backend operations (like PDF report generation or heavy AI models), and prevents hackers from brute-forcing passwords or API key tokens.',
    exampleRequest: 'POST /api/v1/login HTTP/1.1\nContent-Type: application/json\n\n{ "username": "admin", "password": "wrongpassword1" }',
    exampleResponse: 'HTTP/1.1 429 Too Many Requests\nRetry-After: 60\n\n{ "error": "Too many failed login attempts. Account locked for 60 seconds." }'
  },
  {
    id: 28,
    category: 'methods',
    question: 'How would you design an endpoint to support partial updates safely?',
    answer: 'PATCH with only the changed fields in the body, validating that unspecified fields remain unchanged, potentially with optimistic concurrency control (version/ETag check).',
    detailedExplanation: 'To safely implement partial updates, use HTTP PATCH. To prevent the "lost update" problem where two users write at the same time, we use Optimistic Concurrency Control. The server returns a version or `ETag` when the resource is fetched. When updating, the client sends this ETag in the `If-Match: "v1"` header. If another client has updated the resource in the meantime, the ETag changes, and the server rejects the write with a `412 Precondition Failed` error, saving User B from overwriting User A\'s changes.',
    exampleRequest: 'PATCH /api/v1/documents/29 HTTP/1.1\nIf-Match: "version-12"\nContent-Type: application/json\n\n{ "status": "draft_complete" }',
    exampleResponse: 'HTTP/1.1 412 Precondition Failed\n\n{ "error": "The resource has been modified by another request. Fetch latest state before trying again." }'
  },
  {
    id: 29,
    category: 'methods',
    question: 'What is an ETag and how is it used?',
    answer: 'A response header representing a resource\'s version/hash; clients can send it back via If-None-Match to get a 304 Not Modified if unchanged, saving bandwidth, or use it for optimistic concurrency control on updates.',
    detailedExplanation: 'An ETag (Entity Tag) is an identifier (usually a cryptographic MD5 hash of the payload) returned by the server. When the client requests the resource again, it puts the hash in the `If-None-Match: "7a29-01b"` request header. The server calculates the hash of the current record. If they match, the server replies with a fast, body-less `304 Not Modified`. This avoids serializing and transmitting the same database payload over the network.',
    exampleRequest: 'GET /api/v1/heavy-catalog HTTP/1.1\nIf-None-Match: "w/hashing-99120a"',
    exampleResponse: 'HTTP/1.1 304 Not Modified\nETag: "w/hashing-99120a"\nCache-Control: private, max-age=3600'
  },
  {
    id: 30,
    category: 'data',
    question: 'What is the difference between synchronous and asynchronous API design (e.g. long-running operations)?',
    answer: 'Synchronous: client waits for the operation to fully complete before getting a response; asynchronous: server immediately returns a reference/status URL, and the client polls or gets notified when the long-running operation completes.',
    detailedExplanation: 'In synchronous designs, the HTTP connection is kept open until the backend completes everything (e.g., rendering a video file, scanning a file for viruses). This is clean but risky: the client can timeout, or server workers can exhaust their capacity. In an asynchronous design, the server offloads the heavy task to a background worker queue, immediately returns a `202 Accepted` status code, and gives the client a job tracking status URL (`/api/jobs/token-123`) to track progress.',
    exampleRequest: 'POST /api/v1/video-converter HTTP/1.1\nContent-Type: application/json\n\n{ "video_url": "https://s3.com/source.mp4" }',
    exampleResponse: 'HTTP/1.1 202 Accepted\nLocation: /api/v1/jobs/job-821903\nContent-Type: application/json\n\n{\n  "job_id": "job-821903",\n  "status": "queued",\n  "estimated_duration_seconds": 120\n}'
  },
  {
    id: 31,
    category: 'data',
    question: 'How would you design an API for a long-running operation (e.g. video processing)?',
    answer: 'Return 202 Accepted with a status/polling URL immediately; client polls that URL (or receives a webhook/websocket notification) for completion status.',
    detailedExplanation: 'This is the standard asynchronous job execution pattern. The workflow is:\n1. Client requests action via `POST`.\n2. Server validates parameters, pushes the job to a queue (e.g. RabbitMQ/Redis), and returns `202 Accepted` with a `Location: /api/v1/jobs/12` header.\n3. Client makes periodic `GET /api/v1/jobs/12` requests to read the current status (e.g. `pending`, `processing` + progress percentage, `completed`, `failed`).\n4. Once status is `completed`, the job response includes the final resource URI (e.g. download link).',
    exampleRequest: 'GET /api/v1/jobs/job-821903 HTTP/1.1',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "id": "job-821903",\n  "status": "processing",\n  "progress_percent": 65,\n  "completed_at": null\n}'
  },
  {
    id: 32,
    category: 'security',
    question: 'What is a webhook?',
    answer: 'A server-to-server callback — instead of the client polling for updates, the server calls a URL provided by the client when an event occurs.',
    detailedExplanation: 'Webhooks are often called "Reverse APIs." Instead of a client constantly polling an API every 5 seconds to ask "Is the payment completed yet?", the client registers a listener URL in the API portal (e.g., `https://my-frontend.com/api/webhooks/payments`). When the payment succeeds, the server immediately triggers an outgoing HTTP POST request to that exact URL with a JSON body describing the event. It is fast, efficient, and saves server resources.',
    exampleRequest: 'POST /api/webhooks/payments HTTP/1.1\nHost: my-frontend.com\nContent-Type: application/json\n\n{\n  "event": "charge.succeeded",\n  "data": {\n    "id": "ch_7a128",\n    "amount_usd": 49.00,\n    "customer_email": "bob@example.com"\n  }\n}',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: text/plain\n\nWebhook successfully parsed.'
  },
  {
    id: 33,
    category: 'security',
    question: 'How do you secure a webhook endpoint?',
    answer: 'Verify a signature (HMAC) sent with the payload against a shared secret, to confirm the request genuinely came from the expected sender.',
    detailedExplanation: 'Because webhook URLs are exposed publicly to the internet, anyone can send fake payment payloads to your URL. To prevent this, the webhook provider computes a hash (HMAC-SHA256) of the request body using a shared secret key known only to the provider and your backend. The provider sends this hash in a header (e.g. `X-Webhook-Signature`). Your backend computes the HMAC of the raw incoming body using its shared secret. If your hash matches the header signature, the request is authentic!',
    exampleRequest: 'POST /api/webhooks/payments HTTP/1.1\nX-Webhook-Signature: t=1672531200,v1=9e2da01ffbe81a...\nContent-Type: application/json\n\n{ "event": "invoice.paid" }',
    exampleResponse: 'HTTP/1.1 200 OK\n\nVerified.'
  },
  {
    id: 34,
    category: 'practices',
    question: 'What is API documentation typically generated with?',
    answer: 'OpenAPI/Swagger specifications, which can auto-generate interactive docs and even client SDKs from a single schema definition.',
    detailedExplanation: 'OpenAPI is a machine-readable specification language (JSON or YAML) for describing RESTful APIs. It documents endpoints, parameters, request bodies, authentication protocols, and response objects. Using toolsets like Swagger UI, Redoc, or Stoplight, this YAML is compiled into highly interactive web documentation where developers can execute real "Try it out" sandbox requests directly in their browser.',
    exampleRequest: 'GET /api/v1/openapi.json HTTP/1.1',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "openapi": "3.0.0",\n  "info": { "title": "Store API", "version": "1.0.0" },\n  "paths": {\n    "/users": { "get": { "summary": "Retrieve user list" } }\n  }\n}'
  },
  {
    id: 35,
    category: 'core',
    question: 'What\'s the difference between REST and RPC-style APIs?',
    answer: 'REST models the API around resources and standard HTTP verbs; RPC-style exposes specific action-named endpoints (e.g. /getUserOrders) more directly mirroring function calls.',
    detailedExplanation: 'In REST, resources are nouns and standard HTTP methods are the actions (e.g., `DELETE /users/12`). In Remote Procedure Call (RPC-style, like gRPC, JSON-RPC, or typical custom controllers), you execute functions directly by invoking endpoints that contain verbs in the URL path, often passing parameters in the payload body (e.g., `POST /api/deleteUser` with body `{ "id": 12 }`). RPC is great for custom, high-frequency actions; REST is cleaner for standardized data structures and caching.',
    exampleRequest: 'POST /rpc/userServices/banUser HTTP/1.1\nContent-Type: application/json\n\n{ "userId": 883, "reason": "spam" }',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{ "success": true, "message": "User 883 status set to banned." }'
  },
  {
    id: 36,
    category: 'core',
    question: 'What is the N+1 query problem, and how does it relate to REST API design?',
    answer: 'Fetching a list, then making a separate request per item for related data — REST endpoints should ideally support including related data (e.g. ?include=author) to avoid this pattern client-side.',
    detailedExplanation: 'If a client fetches a list of 10 articles (`GET /articles`), and for each article needs to show the author\'s biography, they must trigger 10 additional, sequential HTTP calls (`GET /users/5`, `GET /users/6`...). This makes 1 + 10 = 11 separate requests! This drains bandwidth and causes terrible delays. To solve this in REST, we design the endpoint to support "eager loading" or parameter inclusion, letting the client ask for nested objects in a single response.',
    exampleRequest: 'GET /api/v1/articles?include=author HTTP/1.1',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n[\n  {\n    "id": 1,\n    "title": "REST Core Guide",\n    "author": { "id": 5, "name": "Roy Fielding", "bio": "API pioneer" }\n  }\n]'
  },
  {
    id: 37,
    category: 'methods',
    question: 'How would you design an API to support bulk operations (e.g. deleting multiple items at once)?',
    answer: 'A dedicated bulk endpoint accepting an array of IDs/operations in the request body, returning per-item success/failure status in the response.',
    detailedExplanation: 'Sending 50 distinct `DELETE /items/id` requests is slow and inefficient. A RESTful bulk endpoint accepts an array of identifiers or operations. Standard responses for bulk actions include returning a standard list of status objects detailing exactly which items succeeded (e.g., 200 OK) and which ones failed (e.g. 403 Forbidden due to constraints), or returning `207 Multi-Status`.',
    exampleRequest: 'POST /api/v1/products/bulk-delete HTTP/1.1\nContent-Type: application/json\n\n{\n  "ids": [20, 21, 22]\n}',
    exampleResponse: 'HTTP/1.1 207 Multi-Status\nContent-Type: application/json\n\n{\n  "results": [\n    { "id": 20, "status": 200, "message": "Deleted" },\n    { "id": 21, "status": 403, "message": "Cannot delete: active purchase order holds" },\n    { "id": 22, "status": 200, "message": "Deleted" }\n  ]\n}'
  },
  {
    id: 38,
    category: 'practices',
    question: 'What are best practices for API backward compatibility?',
    answer: 'Avoid removing/renaming fields clients depend on; add new fields as optional; version the API for breaking changes rather than mutating existing endpoints\' contracts.',
    detailedExplanation: 'To maintain backward compatibility:\n1. Never rename fields (e.g. do not rename `phone` to `phoneNumber`). Keep the old field and populate both, or support a transition window.\n2. Never make optional parameters required on existing routes.\n3. Add new properties as optional or with default values.\n4. Deprecate endpoints gracefully using headers like `Sunset: Wed, 11 Nov 2026 00:00:00 GMT` or `Deprecation: true` before removing them in the next major API version.',
    exampleRequest: 'GET /api/v1/legacy-endpoint HTTP/1.1',
    exampleResponse: 'HTTP/1.1 200 OK\nDeprecation: true\nSunset: Thu, 31 Dec 2026 23:59:59 GMT\nLink: <https://api.com/v2/new-endpoint>; rel="successor-version"\nContent-Type: application/json\n\n{ "msg": "Please transition to v2 endpoints." }'
  },
  {
    id: 39,
    category: 'practices',
    question: 'How would you test a REST API?',
    answer: 'Unit tests for individual route handlers/business logic, integration tests hitting real endpoints against a test database, and contract tests to ensure the API matches its documented schema.',
    detailedExplanation: 'A fully validated REST API has 3 testing tiers:\n1. Unit Testing: Testing small, modular functions (e.g. hashing a payload, matching a regex, validating input schema) without network overhead.\n2. Integration Testing: Spawning the web server and hitting endpoints with tools like Supertest or Postman against a clean test database to assert real status codes, cookies, and record creations.\n3. Contract Testing: Verifying that the JSON payload shape exactly matches the published OpenAPI schema, ensuring that any client using generated SDKs will not experience serialization crashes.',
    exampleRequest: 'POST /api/v1/tests/run HTTP/1.1\nHost: test-runner.internal',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "suites": {\n    "unit": { "passed": 128, "failed": 0 },\n    "integration": { "passed": 45, "failed": 0 },\n    "contract_openapi": { "passed": 12, "failed": 0 }\n  },\n  "status": "GREEN"\n}'
  },
  {
    id: 40,
    category: 'practices',
    question: 'What is the role of a gateway/BFF (Backend-for-Frontend) layer in front of REST APIs?',
    answer: 'Aggregates/reshapes calls to multiple backend services into a single API tailored to a specific frontend\'s needs, reducing client-side orchestration complexity.',
    detailedExplanation: 'An API Gateway acts as a reverse proxy, handling routing, SSL termination, rate limiting, and global authentication. A Backend-for-Frontend (BFF) is a variation optimized for specific clients (e.g., Mobile BFF vs Web BFF). Instead of a low-bandwidth mobile client making 8 separate queries to internal microservices to render the homepage dashboard, the mobile client calls `/mobile-dashboard` on the BFF, which triggers internal microservice requests over high-speed local fiber, compiles a minimal JSON representation, and transfers a single compressed payload back.',
    exampleRequest: 'GET /api/v1/bff/mobile-dashboard HTTP/1.1\nHost: bff.example.com',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "user_name": "Dave",\n  "unread_count": 4,\n  "latest_order_status": "Shipped",\n  "system_alerts": []\n}'
  }
];
