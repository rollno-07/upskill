export interface Question {
  id: number;
  question: string;
  category: "Fundamentals" | "Routing" | "Rendering" | "RSC & Streaming" | "Server & API" | "Performance";
  difficulty: "Easy" | "Medium" | "Hard";
  answer: string;
  detailedExplanation: string;
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const questions: Question[] = [
  {
    id: 1,
    category: "Fundamentals",
    difficulty: "Easy",
    question: "What is Next.js?",
    answer: "Next.js is a flexible React framework built by Vercel that provides building blocks to create fast, SEO-friendly full-stack web applications.",
    detailedExplanation: "Unlike a bare React application which handles rendering client-side in the browser, Next.js enables developers to render content on the server or pre-render at build time. It integrates a powerful compiler (Turbopack/Babel/SWC), optimizes static and dynamic routing, automatically splits code, pre-renders HTML, optimizes images, and provides built-in serverless API endpoints out of the box.",
    codeSnippet: {
      language: "typescript",
      filename: "src/App.tsx (Bare React) vs Next.js",
      code: `// Traditional React SPA (Client-side rendering only)
// Browser downloads empty HTML, then parses massive JS bundle to draw UI.

// Next.js Server Component (React Server Components)
export default async function Page() {
  const data = await fetch('https://api.example.com/items');
  const items = await data.json();
  
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Product Catalog</h1>
      <ul>
        {items.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </main>
  );
}`
    },
    quiz: {
      question: "Which of the following describes Next.js primary benefit over vanilla React?",
      options: [
        "It replaces React entirely with a new rendering engine",
        "It provides server-side rendering, static site generation, and file-based routing built on top of React",
        "It is a mobile-only application development framework",
        "It is a database management system"
      ],
      correctIndex: 1,
      explanation: "Next.js doesn't replace React; it enhances it by providing rendering options (SSR, SSG, ISR) and infrastructure like routing, optimizations, and API support."
    }
  },
  {
    id: 2,
    category: "Rendering",
    difficulty: "Medium",
    question: "What rendering strategies does Next.js support?",
    answer: "Next.js supports Server-Side Rendering (SSR), Static Site Generation (SSG), Client-Side Rendering (CSR), and Incremental Static Regeneration (ISR).",
    detailedExplanation: "Next.js allows you to mix and match these strategies on a per-route basis:\n• Static Site Generation (SSG): HTML is built once at build time. Best for speed & CDN caching.\n• Incremental Static Regeneration (ISR): Regenerates static pages in the background as requests come in, without rebuilding the whole site.\n• Server-Side Rendering (SSR): Generates HTML on the server on *every request*. Best for highly dynamic user-specific data.\n• Client-Side Rendering (CSR): Standard React flow where the server serves an empty shell and the browser fetches and renders data.",
    codeSnippet: {
      language: "typescript",
      filename: "app/products/page.tsx",
      code: `// 1. SSG (Default Server Component with static fetch)
// fetch() automatically caches responses unless configured otherwise.
async function getSSGData() {
  const res = await fetch('https://api.com/products');
  return res.json();
}

// 2. SSR (Dynamic rendering, revalidate = 0 or cache: 'no-store')
async function getSSRData() {
  const res = await fetch('https://api.com/products', { cache: 'no-store' });
  return res.json();
}

// 3. ISR (Incremental Static Regeneration, revalidate after 60s)
async function getISRData() {
  const res = await fetch('https://api.com/products', { next: { revalidate: 60 } });
  return res.json();
}`
    },
    quiz: {
      question: "Which rendering strategy is best suited for an e-commerce catalog of 50,000 items that update occasionally?",
      options: [
        "Server-Side Rendering (SSR) for every single click",
        "Incremental Static Regeneration (ISR) to cache and update in the background",
        "Client-Side Rendering (CSR) only, fetching everything in useEffect",
        "Pure Static Site Generation (SSG) requiring a full rebuild for every price change"
      ],
      correctIndex: 1,
      explanation: "ISR is ideal here: pages load instantly from a CDN cache, and update lazily in the background at set intervals, saving database costs and build times."
    }
  },
  {
    id: 3,
    category: "Routing",
    difficulty: "Easy",
    question: "What is file-based routing in Next.js?",
    answer: "Routes are automatically configured based on the directory and file structure of your project, eliminating the need for packages like React Router.",
    detailedExplanation: "In Next.js, files placed in specific folders become paths in your application. In the Pages Router, `pages/about.tsx` becomes `/about`. In the newer App Router, directories represent path segments, and a special `page.tsx` file defines the leaf. For example, `app/dashboard/settings/page.tsx` translates directly to the `/dashboard/settings` route.",
    codeSnippet: {
      language: "text",
      filename: "App Router Directory Structure",
      code: `app/
├── layout.tsx         # Global layout (HTML, Body wrapper)
├── page.tsx           # Matches route "/"
├── about/
│   └── page.tsx       # Matches route "/about"
└── blog/
    ├── page.tsx       # Matches route "/blog"
    └── [slug]/
        └── page.tsx   # Matches route "/blog/dynamic-slug"`
    },
    quiz: {
      question: "In the Next.js App Router, how would you define a route matching '/profile/settings'?",
      options: [
        "Create a file named profile-settings.tsx in the app root",
        "Create a folder 'app/profile/settings' containing a 'page.tsx' file",
        "Declare a route object inside routes.config.ts with path: '/profile/settings'",
        "Create a file 'profile.tsx' containing a function 'settings()'"
      ],
      correctIndex: 1,
      explanation: "The App Router uses folder hierarchy to determine paths. The directory 'app/profile/settings' with a 'page.tsx' inside generates the route '/profile/settings'."
    }
  },
  {
    id: 4,
    category: "Routing",
    difficulty: "Medium",
    question: "What is the difference between the Pages Router and App Router?",
    answer: "The Pages Router is Next.js's legacy system based on file-per-route, while the App Router is built on modern React Server Components, nested layouts, and simplified data-fetching.",
    detailedExplanation: "• Pages Router (`pages/`): Pages are client-side hydrated React components. Data fetching uses special functions like `getStaticProps` or `getServerSideProps` exported at the page level. No native component nesting.\n• App Router (`app/`): Built to support React Server Components (RSC) by default. It supports nested layouts (`layout.tsx`), custom loading states (`loading.tsx`), and error boundaries (`error.tsx`) in any directory level. Data fetching is simplified directly using standard `async/await` fetch operations inside Server Components, resulting in less client-side JavaScript.",
    codeSnippet: {
      language: "typescript",
      filename: "Pages (Legacy) vs App (Modern) Data Fetching",
      code: `// PAGES ROUTER (Legacy):
export async function getStaticProps() {
  const res = await fetch('https://api.com/items');
  const items = await res.json();
  return { props: { items } };
}
export default function Page({ items }) {
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}

// APP ROUTER (Modern):
export default async function Page() {
  const res = await fetch('https://api.com/items');
  const items = await res.json();
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}`
    },
    quiz: {
      question: "Which of the following is an exclusive feature of the App Router?",
      options: [
        "Support for standard dynamic route segments like [id].tsx",
        "Static HTML exportation during builds",
        "React Server Components (RSC) as the default component type and nested layouts",
        "Running Javascript on client side"
      ],
      correctIndex: 2,
      explanation: "React Server Components as the default, nested layouts (layout.tsx), loading skeletons (loading.tsx), and error.tsx boundaries are primary features of the App Router."
    }
  },
  {
    id: 5,
    category: "Rendering",
    difficulty: "Medium",
    question: "What is `getStaticProps` (Pages Router)?",
    answer: "A special page-level function in the Pages Router that fetches data strictly at build time to enable Static Site Generation (SSG).",
    detailedExplanation: "When you export `getStaticProps` from a page, Next.js pre-renders that page using the returned props during the build step (`npm run build`). The output is compiled into static HTML and JSON files. This results in incredibly fast load speeds because the page can be cached by a CDN and served to users immediately, bypassing any server-side database querying during the visit.",
    codeSnippet: {
      language: "typescript",
      filename: "pages/index.tsx (Pages Router)",
      code: `import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};

export default function Home({ posts }) {
  return (
    <div>
      {posts.map(post => <p key={post.id}>{post.title}</p>)}
    </div>
  );
}`
    },
    quiz: {
      question: "When does the code inside `getStaticProps` execute?",
      options: [
        "On every client-side page navigation in the browser",
        "On the server once at build-time (and in the background with ISR, if enabled)",
        "Every time the user clicks a button inside the component",
        "Client-side during component hydration"
      ],
      correctIndex: 1,
      explanation: "`getStaticProps` runs strictly on the server side at build time, converting dynamic data into static HTML before deployment."
    }
  },
  {
    id: 6,
    category: "Rendering",
    difficulty: "Medium",
    question: "What is `getServerSideProps` (Pages Router)?",
    answer: "A function in the Pages Router used to fetch data and pre-render a page dynamically on the server for every incoming request (Server-Side Rendering).",
    detailedExplanation: "Unlike `getStaticProps` which runs once during building, `getServerSideProps` executes on the server for every single request made to that route. Next.js blocks rendering until this function completes, generates the personalized HTML on-the-fly, and sends it to the browser. This is essential for pages containing live, user-specific data (like a user bank profile) that cannot be pre-built.",
    codeSnippet: {
      language: "typescript",
      filename: "pages/profile.tsx (Pages Router)",
      code: `import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Access cookies, request headers, query parameters
  const { req, query } = context;
  const token = req.cookies.session_token;

  if (!token) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  const res = await fetch(\`https://api.com/user?id=\${query.uid}\`);
  const userData = await res.json();

  return { props: { user: userData } };
};

export default function Profile({ user }) {
  return <h1>Welcome back, {user.name}</h1>;
}`
    },
    quiz: {
      question: "What is a major tradeoff of using `getServerSideProps` over `getStaticProps`?",
      options: [
        "You cannot access dynamic request queries or cookies",
        "It increases Time-to-First-Byte (TTFB) because HTML must be rendered on every request, and cannot be cached entirely on a static CDN",
        "It generates much smaller javascript bundle sizes",
        "It runs client-side, risking API key leaks to the browser console"
      ],
      correctIndex: 1,
      explanation: "Because SSR renders pages on-demand, the server must fetch data and render HTML on each request, introducing latency and preventing static CDN caching."
    }
  },
  {
    id: 7,
    category: "Rendering",
    difficulty: "Medium",
    question: "What is `getStaticPaths`?",
    answer: "A function used in Pages Router dynamic routes (`[id].tsx`) alongside `getStaticProps` to specify which dynamic parameter values should be pre-rendered to static files during build time.",
    detailedExplanation: "When generating static pages for dynamic routes (e.g. `/posts/[id]`), Next.js needs to know the exact list of IDs that exist so it can pre-compile them. `getStaticPaths` returns this list of parameters. It also includes a `fallback` setting: `false` (shows 404 for missing paths), `true` (renders fallback page in browser while fetching in background), or `'blocking'` (server-renders new paths on demand, then caches them for next users).",
    codeSnippet: {
      language: "typescript",
      filename: "pages/posts/[id].tsx",
      code: `import { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://api.com/posts');
  const posts = await res.json();
  
  // Create paths list: [{ params: { id: '1' } }, { params: { id: '2' } }]
  const paths = posts.map(post => ({
    params: { id: post.id.toString() }
  }));

  return {
    paths,
    fallback: 'blocking' // Generate un-built paths on the fly and cache them
  };
};`
    },
    quiz: {
      question: "If fallback: 'blocking' is specified in `getStaticPaths`, what happens when a user requests a page that wasn't built?",
      options: [
        "They receive a 404 Page immediately",
        "The browser freezes forever",
        "The server generates the HTML on-the-fly and serves it, then saves it statically for future requests",
        "Next.js automatically triggers a full site-wide rebuild"
      ],
      correctIndex: 2,
      explanation: "With 'blocking', Next.js will server-render the missing page on the first request, cache the generated HTML/JSON, and subsequently serve it statically just like pre-rendered pages."
    }
  },
  {
    id: 8,
    category: "Rendering",
    difficulty: "Hard",
    question: "What is Incremental Static Regeneration (ISR)?",
    answer: "ISR is a rendering strategy that allows you to update static pages in the background as traffic comes in, without needing to rebuild or redeploy the entire website.",
    detailedExplanation: "ISR combines the speed of static sites with the freshness of dynamic ones. When a request is made, the cached static page is served instantly. If the page's revalidation period has expired, Next.js serves the cached page but triggers a background regeneration. Once rebuilt, the cache is updated with the fresh page. Subsequent visitors receive the updated content.",
    codeSnippet: {
      language: "typescript",
      filename: "ISR concept flow",
      code: `// Pages Router ISR:
export async function getStaticProps() {
  const res = await fetch('https://api.com/price');
  const data = await res.json();
  return {
    props: { data },
    revalidate: 10 // Re-evaluate in background at most once every 10 seconds
  };
}

// App Router ISR:
export default async function Page() {
  // Standard fetch with revalidation option
  const res = await fetch('https://api.com/price', { next: { revalidate: 10 } });
  const data = await res.json();
  return <div>Price: {data.value}</div>;
}`
    },
    quiz: {
      question: "With ISR revalidate set to 60 seconds, what does the VERY FIRST user see when they visit a stale page after 5 minutes?",
      options: [
        "An active loading spinner while the database is being queried",
        "A blank white screen until regeneration completes",
        "The stale cached HTML content, while a background process regenerates the page",
        "A 504 server timeout error"
      ],
      correctIndex: 2,
      explanation: "Next.js always prioritizes instant loads. The first visitor to a stale page gets the existing cache immediately. In the background, Next.js rebuilds the page, so the second visitor sees the updated content."
    }
  },
  {
    id: 9,
    category: "Rendering",
    difficulty: "Medium",
    question: "How do you enable ISR?",
    answer: "In the Pages Router, return a `revalidate` property (in seconds) from `getStaticProps`. In the App Router, specify the `revalidate` configuration in your `fetch` calls or export a segment config constant.",
    detailedExplanation: "ISR can be enabled globally or at a granular API fetch level:\n1. App Router granular (preferred): Set `{ next: { revalidate: N } }` in individual `fetch()` requests.\n2. App Router layout/page level: Export a config constant `export const revalidate = 60;` in the file.\n3. Pages Router page-level: Return `revalidate: 60` from the `getStaticProps` return object.",
    codeSnippet: {
      language: "typescript",
      filename: "app/news/page.tsx",
      code: `// Enable ISR at the segment level in the App Router:
export const revalidate = 300; // revalidate this page at most every 5 minutes

export default async function NewsPage() {
  const res = await fetch('https://api.com/news'); // This inherits revalidate
  const articles = await res.json();
  
  return (
    <div>
      {articles.map(a => <h2 key={a.id}>{a.title}</h2>)}
    </div>
  );
}`
    },
    quiz: {
      question: "Which code correctly enables ISR for a single fetch request in the App Router?",
      options: [
        "fetch('url', { cache: 'isr' })",
        "fetch('url', { next: { revalidate: 120 } })",
        "fetch('url', { force_static: true })",
        "fetch('url', { headers: { 'X-ISR': '120' } })"
      ],
      correctIndex: 1,
      explanation: "The custom `next.revalidate` property inside the `fetch` initialization object is the modern App Router syntax to configure Incremental Static Regeneration at the fetch level."
    }
  },
  {
    id: 10,
    category: "RSC & Streaming",
    difficulty: "Medium",
    question: "What are React Server Components (RSC) in the App Router?",
    answer: "React Server Components are a modern paradigm where components are fetched and executed solely on the server, sending zero client-side JavaScript to the browser.",
    detailedExplanation: "In traditional React, every component is bundled, hydrated, and run in the browser. React Server Components reverse this. They run entirely on the server, can directly query databases, read local files, and fetch APIs securely. They render down to a lightweight Virtual DOM-like JSON structure that Next.js streams to the browser. As a result, client-side JS bundle sizes are significantly reduced, improving core performance.",
    codeSnippet: {
      language: "typescript",
      filename: "app/dashboard/page.tsx",
      code: `// By default, App Router files are React Server Components (RSC).
import { db } from '@/lib/db'; // Direct server-side secure database access!

export default async function DashboardPage() {
  // Query DB directly without creating a secondary API endpoint!
  const reports = await db.query('SELECT * FROM user_reports LIMIT 10');

  return (
    <div>
      <h1>Server-side Database Reports</h1>
      {reports.map(rep => (
        <div key={rep.id}>{rep.title}</div>
      ))}
    </div>
  );
}`
    },
    quiz: {
      question: "Which of the following is true regarding React Server Components?",
      options: [
        "They can use the useState and useEffect hooks directly",
        "They are executed on the client side during page navigation",
        "They can read server-side environment secrets and database systems directly, and don't add to client-side JS bundle sizes",
        "They require wrapping with an Express server manually"
      ],
      correctIndex: 2,
      explanation: "RSCs are server-only. They run safely on the server and do not bundle their logic into the client JS, making them faster and completely secure to access databases directly."
    }
  },
  {
    id: 11,
    category: "RSC & Streaming",
    difficulty: "Medium",
    question: "What's the difference between Server and Client Components in the App Router?",
    answer: "Server Components are default components that run entirely on the server with no browser capability, whereas Client Components have full browser interactivity but are pre-rendered on the server first.",
    detailedExplanation: "• Server Components: Run strictly on the server. No React hooks (`useState`, `useEffect`), no event listeners (`onClick`), and no browser-only APIs (`window`, `localStorage`).\n• Client Components: Defined with the `'use client'` directive at the top. They have full browser capabilities, can use all React hooks, event listeners, and browser APIs, but they still get pre-rendered to HTML on the server during the initial page load for speed.",
    codeSnippet: {
      language: "typescript",
      filename: "Component Types Comparison",
      code: `// SERVER COMPONENT (Default)
// Runs on server, direct DB access, no JS sent to client.
export async function ServerComp() {
  const data = await fetch('...');
  return <div>Static Server Content</div>;
}

// CLIENT COMPONENT (Interactivity required)
// "use client" directive indicates this segment has client interactivity.
"use client";
import { useState } from 'react';

export function ClientComp() {
  const [open, setOpen] = useState(false);
  return <button onClick={() => setOpen(!open)}>Toggle</button>;
}`
    },
    quiz: {
      question: "If a component needs to listen to a click event (onClick) and update state, which component type must be used?",
      options: [
        "A Server Component, because it optimizes code splitting",
        "A Client Component with the 'use client' directive",
        "An API handler inside a serverless routing folder",
        "A static HTML page"
      ],
      correctIndex: 1,
      explanation: "Client-side interactivity like click events and state mutations require React hooks and event listeners, which are restricted to Client Components."
    }
  },
  {
    id: 12,
    category: "RSC & Streaming",
    difficulty: "Easy",
    question: "When would you mark a component `\"use client\"`?",
    answer: "You mark a component with `\"use client\"` when it uses interactive hooks, triggers event listeners, relies on browser-only objects, or integrates client-only libraries.",
    detailedExplanation: "You must include `'use client'` at the absolute top of the file if the component:\n• Uses React state or lifecycle hooks (`useState`, `useEffect`, `useReducer`, `useRef`).\n• Attaches client-side event handlers (`onClick`, `onChange`, `onSubmit`).\n• Employs browser-specific APIs (like `window.matchMedia`, `localStorage`, `geolocation`).\n• Integrates client-exclusive libraries (such as carousel charts, animations, canvas widgets).",
    codeSnippet: {
      language: "typescript",
      filename: "components/theme-toggle.tsx",
      code: `"use client"; // Must be first line (before any imports)

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  return <button onClick={toggle}>Active: {theme}</button>;
}`
    },
    quiz: {
      question: "Does marking a component as 'use client' mean it only runs on the client side?",
      options: [
        "Yes, it is never executed on the server, skipping static generation",
        "No, it is still pre-rendered to HTML on the server during build/SSR, and then hydrated (made interactive) in the browser",
        "Yes, it acts as a client-side routing wrapper for iframe elements",
        "No, it converts the React component into a Node.js API stream"
      ],
      correctIndex: 1,
      explanation: "Next.js pre-renders Client Components to static HTML on the server so the initial page paints instantly. Then, the browser downloads the JS bundle and hydrates the components to make them interactive."
    }
  },
  {
    id: 13,
    category: "Routing",
    difficulty: "Medium",
    question: "What is a layout in the App Router?",
    answer: "A layout is a React component defined in `layout.tsx` that wraps child pages, persists its state, and does not re-render across route changes within its sub-tree.",
    detailedExplanation: "Layouts enable developers to easily build consistent structures (such as navigation bars, persistent headers, sidebars, or footer clusters) that span multiple pages. When navigating between child pages inside a shared layout, the layout's DOM is preserved, preventing layout shifts and avoiding unnecessary re-fetches. Layouts can be nested: an outer layout wraps the entire site, while subdirectory layouts wrap specific nested sections.",
    codeSnippet: {
      language: "typescript",
      filename: "app/dashboard/layout.tsx",
      code: `import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children, // Represents the pages or nested layouts inside dashboard/
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Persists and never re-renders as children change! */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}`
    },
    quiz: {
      question: "What happens to the state inside a Sidebar component inside a shared `layout.tsx` when navigating between sister pages?",
      options: [
        "The state is completely destroyed and reset as the component is re-mounted",
        "The sidebar's React state and DOM elements are preserved, preventing costly re-renders",
        "The page throws an exception unless 'use client' is deleted",
        "The entire page undergoes a hard refresh"
      ],
      correctIndex: 1,
      explanation: "A key feature of layouts is state preservation. The layout remains mounted during page changes, protecting any active component states (like open menus or user inputs) from resetting."
    }
  },
  {
    id: 14,
    category: "Server & API",
    difficulty: "Easy",
    question: "What is a Next.js API route?",
    answer: "An API route is a serverless backend endpoint built into Next.js that allows you to handle API requests (GET, POST, etc.) without needing an external Node.js backend.",
    detailedExplanation: "API routes allow Next.js to function as a genuine full-stack framework. In the App Router, these are defined using a file named `route.ts` inside the `app/` folder (e.g., `app/api/users/route.ts`). You export named HTTP methods (like `GET`, `POST`, `PATCH`, `DELETE`) which receive standard request objects and return JSON responses.",
    codeSnippet: {
      language: "typescript",
      filename: "app/api/feedback/route.ts",
      code: `import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Save feedback to database, send email alert, etc.
    console.log('Received feedback:', data);

    return NextResponse.json({ success: true, message: "Feedback saved!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }
}`
    },
    quiz: {
      question: "Which file structure defines an App Router API endpoint matching '/api/health'?",
      options: [
        "app/api/health.ts",
        "app/api/health/route.ts (or route.js)",
        "pages/api/health/route.tsx",
        "app/health/api.ts"
      ],
      correctIndex: 1,
      explanation: "In the App Router, backend endpoints must be named `route.ts` or `route.js` inside the targeted directory, such as `app/api/health/route.ts`."
    }
  },
  {
    id: 15,
    category: "Fundamentals",
    difficulty: "Easy",
    question: "What is `next/image` and why use it over a plain `<img>`?",
    answer: "The `next/image` component (the Next.js Image component) wraps the standard HTML image element with automatic responsive resizing, WebP/AVIF format conversion, lazy loading, and prevention of layout shifts.",
    detailedExplanation: "Images are often the primary cause of slow pages and layout shifts. The `<Image>` component automatically optimizes resources:\n• Responsive Resizing: Generates multiple image sizes and utilizes `srcset` under the hood.\n• Modern Formats: Automatically converts files to highly compressed formats like WebP or AVIF.\n• Lazy Loading: Delays image downloads until they enter the browser viewport.\n• Layout Shift Prevention: Requires explicit width and height dimensions to reserve spacing, protecting against Core Web Vital cls (Cumulative Layout Shift) penalties.",
    codeSnippet: {
      language: "typescript",
      filename: "components/optimized-banner.tsx",
      code: `import Image from 'next/image';
import heroPic from '../public/hero.jpg';

export default function OptimizedBanner() {
  return (
    <div className="relative w-full h-64">
      {/* High-performance image with automatic format compression and lazy loading */}
      <Image
        src={heroPic}
        alt="Aesthetic workspace layout"
        placeholder="blur" // Elegant blurred loading transition
        priority // Preloads banner instantly if above fold
        className="object-cover rounded-lg"
      />
    </div>
  );
}`
    },
    quiz: {
      question: "Why does the `<Image>` component enforce providing strict width/height dimensions (or a fill layout)?",
      options: [
        "To allow CSS to bypass grid calculations",
        "To prevent page elements from shifting abruptly (CLS) when the image resource finishes downloading",
        "Because Next.js compiles images into SVG code at build time",
        "To force the image to always render as a perfect square"
      ],
      correctIndex: 1,
      explanation: "Enforcing dimensions allows Next.js to determine the correct aspect ratio and reserve layout dimensions beforehand, avoiding abrupt shifts that harm Cumulative Layout Shift (CLS)."
    }
  },
  {
    id: 16,
    category: "Fundamentals",
    difficulty: "Easy",
    question: "What is `next/link` used for?",
    answer: "The `<Link>` component is used to enable client-side navigation between Next.js pages without performing a full-page browser reload, keeping the app fast.",
    detailedExplanation: "Standard `<a>` anchor tags trigger full browser document refreshes, clearing memory and resetting React state. The Next.js `<Link>` component intercepts clicks, executes standard history transitions, and retrieves only the necessary page bundle dynamically. It also supports prefetching, making transition page switches feel completely instantaneous.",
    codeSnippet: {
      language: "typescript",
      filename: "components/Navbar.tsx",
      code: `import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100 dark:bg-zinc-900">
      {/* Seamless transition with background prefetching */}
      <Link href="/" className="text-cyan-500 hover:underline">
        Home
      </Link>
      <Link href="/dashboard" className="text-cyan-500 hover:underline">
        Dashboard
      </Link>
    </nav>
  );
}`
    },
    quiz: {
      question: "What happens in a Next.js application if you use a standard `<a href='/about'>` tag instead of the `<Link>` component?",
      options: [
        "The link will fail and trigger an immediate server error",
        "The application performs a heavy, browser-level reload, resetting all local states and reloading all resources",
        "It acts identical to `<Link>` with zero functional difference",
        "It converts the client-side app into a static PDF file"
      ],
      correctIndex: 1,
      explanation: "Standard anchor tags trigger native browser navigations, executing full-page refreshes. `<Link>` intercepts this and does client-side routing, preserving state and performance."
    }
  },
  {
    id: 17,
    category: "Fundamentals",
    difficulty: "Medium",
    question: "What does prefetching do in `next/link`?",
    answer: "Prefetching downloads the JavaScript code and route metadata for a linked page in the background as soon as the `<Link>` element enters the user's viewport.",
    detailedExplanation: "Next.js identifies `<Link>` elements that appear on screen. In production, it initiates background fetches for those specific page bundles. If a user hovers or scrolls past links, the app preemptively caches the scripts. Once clicked, the transition is near-instant, since the code is already present in browser memory. Prefetching is enabled by default, but can be deactivated via `prefetch={false}`.",
    codeSnippet: {
      language: "typescript",
      filename: "components/CustomLink.tsx",
      code: `import Link from 'next/link';

export default function Nav() {
  return (
    <div>
      {/* Prefetches '/heavy-dashboard' page code in background as link scrolls onto screen */}
      <Link href="/heavy-dashboard" prefetch>
        Go to Dashboard
      </Link>

      {/* Disable prefetching for rarely used pages to save mobile data charges */}
      <Link href="/admin-settings" prefetch={false}>
        Admin Panel (Rarely Visited)
      </Link>
    </div>
  );
}`
    },
    quiz: {
      question: "Under what conditions does Next.js automatically prefetch links?",
      options: [
        "Only when the user hovers over a link for more than 5 seconds",
        "When the Link component enters the browser viewport, in production mode",
        "When the browser detects that the device is running low on battery",
        "Only if the developer compiles the application as a mobile APK"
      ],
      correctIndex: 1,
      explanation: "Next.js pre-fetches in production when a Link segment enters the viewport, using an IntersectionObserver to download pages asynchronously so they load instantly on click."
    }
  },
  {
    id: 18,
    category: "Server & API",
    difficulty: "Hard",
    question: "What is middleware in Next.js?",
    answer: "Middleware is custom server-side code that executes before a request completes, allowing you to rewrite, redirect, check authentication, or modify request/response headers.",
    detailedExplanation: "Middleware is run at the 'Edge'—before routing is completed or pages are rendered. This makes it ideal for global rules, including checking session cookies for route-protection, localizing language subpaths, geo-blocking, rate-limiting, and running security header injections. Middleware is defined in a single `middleware.ts` file located in the root or `src/` directory.",
    codeSnippet: {
      language: "typescript",
      filename: "middleware.ts",
      code: `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;

  // Protect dashboard paths
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      // Redirect unauthenticated requests to login screen
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

// Specify exactly which routes this middleware should execute on
export const config = {
  matcher: '/dashboard/:path*',
};`
    },
    quiz: {
      question: "Where does Middleware run in the Next.js execution lifecycle?",
      options: [
        "In the user's browser right after hydrating React components",
        "On the server (or at the edge CDN), *before* the request reaches any routing, page rendering, or API endpoint",
        "Inside getStaticProps as a post-build step",
        "In the database system as a PostgreSQL query hook"
      ],
      correctIndex: 1,
      explanation: "Middleware intercepts requests early at the gateway/edge before they execute any page or API route, making it perfect for rapid session checks and instant redirections."
    }
  },
  {
    id: 19,
    category: "Server & API",
    difficulty: "Medium",
    question: "What is the difference between `redirect` and `rewrite`?",
    answer: "A redirect changes the browser's URL and navigates the user to a new location, whereas a rewrite maps a source URL to a destination URL internally, serving different content without changing the visible URL.",
    detailedExplanation: "• Redirect (HTTP 301/302): The client browser receives an instruction to update its location. The URL in the address bar changes, and a new HTTP request is initiated. Used for permanent migrations, auth redirection, or old-link forwarding.\n• Rewrite (Internal Masking): Act as a proxy. The server serves the content of the target destination, but the browser URL remains exactly the same. Useful for white-labeling, hiding backend routing structures, or creating user-friendly URL aliases.",
    codeSnippet: {
      language: "typescript",
      filename: "next.config.js (Rewrites and Redirects)",
      code: `module.exports = {
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true, // Permanent 301 Redirect
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/feed',
        destination: '/api/rss-feed-generator', // Masks backend API path!
      },
    ];
  },
};`
    },
    quiz: {
      question: "If a user goes to '/feed' and receives the XML output of '/api/rss-feed-generator' while the URL in the address bar remains '/feed', which mechanism is being used?",
      options: [
        "An HTTP 301 Permanent Redirect",
        "A client-side window.location rewrite",
        "An internal Next.js Rewrite",
        "A hard reload request"
      ],
      correctIndex: 2,
      explanation: "An internal rewrite serves different content behind-the-scenes while preserving the original URL in the browser address bar, masking the true file path."
    }
  },
  {
    id: 20,
    category: "Routing",
    difficulty: "Easy",
    question: "How does dynamic routing work (e.g. `[id].tsx`)?",
    answer: "Dynamic routing utilizes brackets `[param]` in folder/file names to define path segments that match dynamic values, extracting them as route arguments.",
    detailedExplanation: "Instead of hardcoding every individual product page or post route, you create a directory or file using brackets like `[id]`. When a user visits `/products/123`, Next.js maps `123` as the variable `id`. In the App Router, these dynamic params are passed directly to page components as properties. In the Pages Router, they are accessed via `useRouter` or `getStaticProps` params.",
    codeSnippet: {
      language: "typescript",
      filename: "app/products/[id]/page.tsx (App Router)",
      code: `// App Router receives params as a prop directly in the page!
type PageParams = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: PageParams) {
  // Resolve params promise
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  
  const res = await fetch(\`https://api.com/products/\${productId}\`);
  const product = await res.json();

  return (
    <div>
      <h1>Product: {product.name}</h1>
      <p>ID parsed from URL: {productId}</p>
    </div>
  );
}`
    },
    quiz: {
      question: "Given a file at 'app/users/[userName]/page.tsx', what would be the value of the 'userName' parameter when visiting '/users/dan_abramov'?",
      options: [
        "[userName]",
        "dan_abramov",
        "users",
        "undefined"
      ],
      correctIndex: 1,
      explanation: "Next.js extracts whatever string is at the dynamic folder's segment location ('dan_abramov') and assigns it to the param name specified in brackets ('userName')."
    }
  },
  {
    id: 21,
    category: "Routing",
    difficulty: "Medium",
    question: "What is a catch-all route (`[...slug].tsx`)?",
    answer: "A catch-all route uses triple dots inside brackets `[...name]` to match any number of nested sub-path segments at that position, returning them as an array of params.",
    detailedExplanation: "Standard dynamic segments `[id]` only match a single path level. If you need to support deeply nested paths like `/docs/getting-started/installation/yarn`, you use a catch-all route `app/docs/[...slug]/page.tsx`. Next.js resolves `/docs/getting-started/installation/yarn` by passing an array of strings: `['getting-started', 'installation', 'yarn']`. If you use double-bracket catch-all `[[...slug]]`, it becomes optional and matches `/docs` as well.",
    codeSnippet: {
      language: "typescript",
      filename: "app/docs/[[...slug]]/page.tsx",
      code: `type DocsParams = {
  params: Promise<{ slug?: string[] }>; // Optional catch-all parameter
};

export default async function DocsPage({ params }: DocsParams) {
  const resolved = await params;
  const slug = resolved.slug || []; // Default to empty array if root '/docs'

  return (
    <div className="p-6">
      <h1>Docs Browser</h1>
      <p>Current Path Segments: {slug.join(' / ') || 'Home'}</p>
      <pre>{JSON.stringify(slug, null, 2)}</pre>
    </div>
  );
}`
    },
    quiz: {
      question: "What is the primary difference between a dynamic catch-all route '[...slug]' and an optional catch-all route '[[...slug]]'?",
      options: [
        "[...slug] can only run server-side, while [[...slug]] can run on the client",
        "[...slug] requires at least one parameter segment (e.g., '/docs/1' matches, but '/docs' fails with a 404), while [[...slug]] is optional and matches '/docs' as well",
        "[[...slug]] only matches folders containing images",
        "There is no difference; they are alternative syntax aliases"
      ],
      correctIndex: 1,
      explanation: "Double-bracket catch-alls are optional. They allow matching the parent base directory path itself (empty array) without triggering a 404, whereas single-bracket catch-alls require at least one nested segment."
    }
  },
  {
    id: 22,
    category: "Routing",
    difficulty: "Easy",
    question: "How do you handle 404 pages in Next.js?",
    answer: "You customize 404 error responses by creating a dedicated file: `not-found.tsx` in the App Router, or `404.tsx` in the Pages Router.",
    detailedExplanation: "Next.js provides built-in 404 handlers. If a URL does not match any route, it serves a default styled 404 screen. To customize this:\n• App Router: Create a `not-found.tsx` file in your root segment (or any nested segment). You can programmatically trigger this component from any other page by importing and invoking the `notFound()` utility function.\n• Pages Router: Create a `pages/404.tsx` component, which is automatically pre-rendered to a static HTML page during the build.",
    codeSnippet: {
      language: "typescript",
      filename: "app/not-found.tsx (App Router Custom 404)",
      code: `import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h2 className="text-4xl font-bold text-red-500 mb-2">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-4">Sorry, the resource you are looking for does not exist.</p>
      <Link href="/" className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700">
        Return Home
      </Link>
    </div>
  );
}

// Inside any page.tsx, you can trigger this programmatically:
export async function Page({ params }) {
  const item = await fetchProduct(params.id);
  if (!item) {
    notFound(); // Triggers the nearest NotFound segment component automatically!
  }
  return <div>{item.name}</div>;
}`
    },
    quiz: {
      question: "How can you programmatically trigger a 404 error page from inside an async Server Component in the App Router?",
      options: [
        "Throw an Error('404')",
        "Import and execute 'notFound()' from 'next/navigation'",
        "Return redirect('/404')",
        "Call res.status(404).end()"
      ],
      correctIndex: 1,
      explanation: "Calling `notFound()` from `next/navigation` throws an internal Next.js exception that automatically terminates rendering and displays the closest configured `not-found.tsx` component."
    }
  },
  {
    id: 23,
    category: "Routing",
    difficulty: "Easy",
    question: "What is `next/head` (Pages Router) used for?",
    answer: "The `<Head>` component in the Pages Router is used to inject elements (like meta tags, page titles, link styles, and scripts) into the HTML `<head>` block on a per-page basis.",
    detailedExplanation: "Because typical SPA routes render entirely within a single page context, modifying document headers dynamically can be difficult. Next.js provides `<Head>` to easily configure search engine optimizations (SEO) and site tags for each page. When the page mounts, Next.js inserts the child tags into the document's header, and cleans them up when the component unmounts.",
    codeSnippet: {
      language: "typescript",
      filename: "pages/about.tsx (Pages Router)",
      code: `import Head from 'next/head';

export default function About() {
  return (
    <div>
      <Head>
        <title>About Us | Professional Agency</title>
        <meta name="description" content="Learn more about our agency mission and values." />
        <meta property="og:title" content="About Us" />
        <link rel="icon" href="/favicon-about.ico" />
      </Head>
      <main className="p-8">
        <h1>About Our Team</h1>
      </main>
    </div>
  );
}`
    },
    quiz: {
      question: "Which router uses the `<Head>` component imported from 'next/head'?",
      options: [
        "Strictly the App Router",
        "Strictly the Pages Router (using 'next/head')",
        "Both routers identically",
        "Neither; it is a vanilla React feature"
      ],
      correctIndex: 1,
      explanation: "`next/head` is used strictly in the Pages Router. The App Router replaces it with a cleaner, built-in metadata export framework."
    }
  },
  {
    id: 24,
    category: "Routing",
    difficulty: "Medium",
    question: "How is metadata handled in the App Router?",
    answer: "Metadata in the App Router is configured by exporting a static `metadata` object or a dynamic `generateMetadata` function from any `layout.tsx` or `page.tsx` file.",
    detailedExplanation: "Next.js replaces `<Head>` in the App Router with a powerful, built-in metadata API. By exporting a configuration, Next.js handles title merging, deduplication, and open-graph generation automatically. If the metadata depends on dynamic parameters (like a product title fetched from a database), you export an async `generateMetadata` function instead of a static object.",
    codeSnippet: {
      language: "typescript",
      filename: "app/shop/[id]/page.tsx (Metadata API)",
      code: `import { Metadata } from 'next';

type ShopParams = {
  params: Promise<{ id: string }>;
};

// DYNAMIC METADATA GENERATION
export async function generateMetadata({ params }: ShopParams): Promise<Metadata> {
  const resolved = await params;
  const product = await fetch(\`https://api.com/items/\${resolved.id}\`).then(r => r.json());

  return {
    title: \`\${product.name} | E-Shop\`,
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default function ShopItemPage() {
  return <main>Product Details UI</main>;
}`
    },
    quiz: {
      question: "Which approach is correct to set a static page title in an App Router page file?",
      options: [
        "Include `<head><title>My Title</title></head>` inside the component markup",
        "Export a constant named 'metadata' of type Metadata containing 'title: \"My Title\"'",
        "Use useEffect to manually set document.title in a Client Component",
        "Call useRouter().setTitle('My Title')"
      ],
      correctIndex: 1,
      explanation: "Exporting a `metadata` object from a `page.tsx` or `layout.tsx` is the standard, declarative App Router mechanism to configure SEO headers."
    }
  },
  {
    id: 25,
    category: "Fundamentals",
    difficulty: "Medium",
    question: "What is automatic static optimization?",
    answer: "Automatic static optimization is a built-in Next.js performance feature that compiles pages containing no dynamic server requirements into static HTML pages automatically.",
    detailedExplanation: "Next.js analyzes your components at build time. If a page does not rely on dynamic request parameters (like cookies or queries) and doesn't declare blocking server-side fetches (like `getServerSideProps` in Pages or dynamic headers/uncached fetches in RSCs), Next.js builds the page as a static HTML file. This allows it to bypass server runtime overhead, rendering immediately from edge servers with virtually zero hosting costs.",
    codeSnippet: {
      language: "typescript",
      filename: "Static vs Server Build Indicators",
      code: `// AUTOMATICALLY STATIC PAGE (Optimized to HTML)
export default function SimplePage() {
  return (
    <div className="p-8">
      <h1>Terms & Conditions</h1>
      <p>Last updated: 2026</p>
    </div>
  );
}

// DYNAMIC PAGE (Requires server rendering on each request)
export async function getServerSideProps() {
  return { props: { time: Date.now() } };
}`
    },
    quiz: {
      question: "How can you tell if a page was statically optimized during Next.js compilation ('npm run build')?",
      options: [
        "The compiler alerts you with errors and blocks deployment",
        "The build output console prints a '⚡' (Static) icon next to the route, as opposed to a 'λ' (Server) icon",
        "Statically optimized pages are saved into .exe files",
        "All javascript imports are deleted"
      ],
      correctIndex: 1,
      explanation: "During the build, Next.js displays a terminal summary indicating static files with a '⚡' (or circle) symbol, and dynamic server-rendered paths with a 'λ' (lambda symbol)."
    }
  },
  {
    id: 26,
    category: "Server & API",
    difficulty: "Easy",
    question: "How do environment variables work in Next.js?",
    answer: "Unprefixed environment variables are kept secure on the server, while variables prefixed with `NEXT_PUBLIC_` are safely compiled into the browser bundle.",
    detailedExplanation: "Security is critical in web development. In Next.js, keys in your `.env` files are private by default. Only node scripts (middleware, server functions, server components) can access them. If you need an environment variable to be readable by client components running in the browser (e.g. a public Analytics ID), you must prefix its name with `NEXT_PUBLIC_`. Next.js automatically loads `.env.local` files in development.",
    codeSnippet: {
      language: "typescript",
      filename: "Accessing Environment Variables",
      code: `// server.ts or app/api/route.ts
// ✅ Secure server-side code: can read private keys!
const apiKey = process.env.DATABASE_SECRET_KEY; 

// app/components/Analytics.tsx (Client Component)
"use client";

export default function Analytics() {
  // ✅ Client can read variables prefixed with NEXT_PUBLIC_
  const analyticId = process.env.NEXT_PUBLIC_ANALYTICS_ID; 

  // ❌ Unprefixed variables resolve to undefined on client to prevent leaks!
  const secretKey = process.env.DATABASE_SECRET_KEY; // returns undefined!
  
  return <p>Analytics ID: {analyticId}</p>;
}`
    },
    quiz: {
      question: "What happens if you attempt to access an unprefixed variable like process.env.STRIPE_SECRET_KEY inside a Client Component (use client)?",
      options: [
        "The build crashes with a fatal error",
        "The secret value is printed inside the browser's developer console",
        "The variable evaluates to 'undefined' in the browser, preventing key exposure",
        "Next.js automatically prefixes it in the background"
      ],
      correctIndex: 2,
      explanation: "Next.js secures private environment keys by stripping them from browser bundles. Any attempt to read unprefixed variables on the client resolves safely to 'undefined'."
    }
  },
  {
    id: 27,
    category: "Fundamentals",
    difficulty: "Medium",
    question: "What is the purpose of `next.config.js`?",
    answer: "A configuration file used to customize and extend Next.js defaults, override builds, declare redirects/rewrites, establish image optimization boundaries, and inject environment settings.",
    detailedExplanation: "The `next.config.js` file is a Node.js module that is processed during build and startup. It is where you configure custom features, including defining cross-origin CORS rules, managing headers, setting custom cache durations, configuring webpack overrides, whitelist domains for optimized remote images, and enabling experimental compiler features.",
    codeSnippet: {
      language: "javascript",
      filename: "next.config.js",
      code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Warns of React design issues
  
  images: {
    // Whitelist image domains for next/image optimizer
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
  },

  // Setup custom redirect paths
  async redirects() {
    return [
      { source: '/docs', destination: '/docs/v2/intro', permanent: true },
    ];
  },
};

module.exports = nextConfig;`
    },
    quiz: {
      question: "Where does the `next.config.js` configuration file execute?",
      options: [
        "In the client's browser background thread",
        "Only inside index.html",
        "On the server/build-machine during compilations and application starts",
        "Within the PostgreSQL database"
      ],
      correctIndex: 2,
      explanation: "Because `next.config.js` is processed by Node.js during compilation and application startup, it runs exclusively in server environments."
    }
  },
  {
    id: 28,
    category: "Fundamentals",
    difficulty: "Medium",
    question: "How does Next.js handle code splitting automatically?",
    answer: "Next.js automatically code-splits application logic into tiny individual route bundles, ensuring that visiting a page only downloads the specific code required to view it.",
    detailedExplanation: "Traditional bundlers build massive single JavaScript files containing all page logic, leading to slow load times. Next.js solves this by automatically code-splitting based on routes. Each directory segment produces its own lightweight file. If a user visits `/shop`, they download only the shop bundle. Unrelated page scripts (like `/admin`) are not loaded. This reduces initial download sizes and speeds up core rendering.",
    codeSnippet: {
      language: "typescript",
      filename: "Code Splitting Comparison",
      code: `// Traditional Bundling (Webpack Default):
// [Bundle.js] Contains Home + Shop + Profile + Admin (1.5MB) -> Loaded on every page visit!

// Next.js Route-Based Splitting:
// [page-shop.js]      Loaded only when visiting /shop (45KB)
// [page-profile.js]   Loaded only when visiting /profile (32KB)
// [page-admin.js]     Loaded only when visiting /admin (210KB)

// Shared vendor libraries (like react/react-dom) are extracted into a common shared chunk,
// cached efficiently across navigations.`
    },
    quiz: {
      question: "What is a primary performance benefit of automatic route-based code splitting?",
      options: [
        "It eliminates the need for CSS layouts",
        "It speeds up initial load times because browsers only download the script files necessary for the active page",
        "It automatically translates text to different languages",
        "It keeps database queries running inside the client"
      ],
      correctIndex: 1,
      explanation: "By minimizing the initial payload, the browser downloads and processes far less JS, leading to improved page load speeds and better interaction scores."
    }
  },
  {
    id: 29,
    category: "RSC & Streaming",
    difficulty: "Hard",
    question: "What is streaming SSR / `loading.tsx` in the App Router?",
    answer: "Streaming SSR lets server-rendered HTML pages be parsed and sent to the client progressively in chunks, instantly rendering fallback skeletons for slower, asynchronous segments.",
    detailedExplanation: "In old Server-Side Rendering systems, the entire page fetch had to resolve before the server could send any HTML to the browser. Slow database fetches on any part of the page blocked the entire page from loading. Streaming solves this. By placing a `loading.tsx` file in a directory, Next.js serves the layout, page frame, and fallback skeletons instantly, and streams down individual components in chunks as soon as their async fetches resolve.",
    codeSnippet: {
      language: "typescript",
      filename: "app/dashboard/loading.tsx",
      code: `// Elegant skeleton loading layout, shown automatically while dashboard data is fetching!
export default function Loading() {
  return (
    <div className="animate-pulse p-6 space-y-4">
      <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}`
    },
    quiz: {
      question: "How does `loading.tsx` improve perceived performance for users?",
      options: [
        "It cancels slower API requests automatically",
        "It allows users to instantly view the page layout and skeleton structures immediately, rather than waiting for all backend database data to resolve",
        "It compresses images into small text arrays",
        "It blocks the screen with a lock overlay"
      ],
      correctIndex: 1,
      explanation: "Streaming decreases Time-to-First-Byte (TTFB) and First Contentful Paint (FCP) by loading the layout instantly, and rendering content incrementally as it becomes ready."
    }
  },
  {
    id: 30,
    category: "RSC & Streaming",
    difficulty: "Medium",
    question: "What is `Suspense` used for in the App Router's data fetching?",
    answer: "React `Suspense` allows developers to wrap slow, asynchronous data-fetching components, defining custom fallback states while they load.",
    detailedExplanation: "Behind `loading.tsx` is React's native `Suspense` mechanism. By wrapping slow components with `<Suspense>`, you can isolate slow loading sections of your UI. Instead of blocking the entire route layout, other fast components render immediately, and the slower ones 'pop in' once their data resolves.",
    codeSnippet: {
      language: "typescript",
      filename: "app/dashboard/page.tsx (Suspense Isolation)",
      code: `import { Suspense } from 'react';
import FastHeader from '@/components/FastHeader';
import SlowReportList from '@/components/SlowReportList';

export default function Page() {
  return (
    <main className="p-8">
      <FastHeader /> {/* Renders immediately! */}
      
      {/* Isolates slow component. Profile skeleton is shown until resolution */}
      <Suspense fallback={<p className="text-gray-500 animate-pulse">Loading reports...</p>}>
        <SlowReportList />
      </Suspense>
    </main>
  );
}`
    },
    quiz: {
      question: "What happens to sibling components (like FastHeader) when a Suspense-wrapped component is loading?",
      options: [
        "They are blocked from rendering and stay hidden",
        "They render and become interactive immediately without waiting for the slow component",
        "They throw a hydration error",
        "They are automatically unmounted"
      ],
      correctIndex: 1,
      explanation: "Suspense boundaries isolate asynchronous elements. Fast sibling components render immediately, while slow ones display fallbacks until finished."
    }
  },
  {
    id: 31,
    category: "RSC & Streaming",
    difficulty: "Medium",
    question: "How would you fetch data in the App Router (modern approach)?",
    answer: "Data is fetched directly inside React Server Components using standard asynchronous `async/await` fetch requests, eliminating the need for separate state hooks or page-level API routes.",
    detailedExplanation: "In the App Router, pages are Server Components by default. This allows you to write standard async functions and use `await fetch(...)` directly inside your components. Next.js extends the native `fetch` Web API to automatically handle caching, deduplication, and revalidation, greatly simplifying data architecture.",
    codeSnippet: {
      language: "typescript",
      filename: "app/posts/page.tsx",
      code: `interface Post {
  id: number;
  title: string;
}

// Data fetching is written directly inside the component body!
export default async function PostsPage() {
  const res = await fetch('https://api.com/posts');
  const posts: Post[] = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="py-2 border-b">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}`
    },
    quiz: {
      question: "Which of the following is a benefit of fetching data directly inside an async Server Component?",
      options: [
        "It eliminates the need for useState, useEffect, and client-side fetching wrappers",
        "It sends the entire API fetch script directly to the client's browser",
        "It blocks client clicks entirely during page loads",
        "It makes it impossible to use Tailwind classes"
      ],
      correctIndex: 0,
      explanation: "Fetching directly in RSCs bypasses the need for React states, loading flags, and client-side fetches, reducing boilerplate and client bundle size."
    }
  },
  {
    id: 32,
    category: "RSC & Streaming",
    difficulty: "Medium",
    question: "What does `fetch`'s `next: { revalidate: N }` option do in the App Router?",
    answer: "It configures fine-grained Incremental Static Regeneration (ISR) caching intervals for individual network requests, caching the API response for N seconds.",
    detailedExplanation: "Instead of configuring caching globally, the App Router allows you to configure revalidation per `fetch` call. When you provide `next: { revalidate: 60 }`, Next.js caches the response for 60 seconds. During this time, any request to this route uses the cached value. After 60 seconds, the next request still gets the cached value, but triggers a background refresh to update the cache.",
    codeSnippet: {
      language: "typescript",
      filename: "components/revalidating-widget.tsx",
      code: `export default async function RevalidatingWidget() {
  // Cache response and revalidate at most every 60 seconds (ISR)
  const res = await fetch('https://api.com/stocks', {
    next: { revalidate: 60 }
  });
  const data = await res.json();

  return (
    <div className="p-4 border rounded">
      <p>Latest Stock Data: {data.ticker}</p>
    </div>
  );
}`
    },
    quiz: {
      question: "What is the behavior of fetch('url', { cache: 'no-store' }) in the App Router?",
      options: [
        "It tells Next.js to cache the fetch data forever",
        "It disables caching completely, forcing Next.js to fetch fresh data from the server on every request (equivalent to SSR)",
        "It triggers a compilation error",
        "It deletes all cookies"
      ],
      correctIndex: 1,
      explanation: "`cache: 'no-store'` completely disables caching for that fetch request. This forces the server to fetch fresh data on every page hit, turning the page into a dynamically server-rendered route (SSR)."
    }
  },
  {
    id: 33,
    category: "Server & API",
    difficulty: "Hard",
    question: "How do you handle authentication in Next.js?",
    answer: "Authentication is typically managed using standard HTTP-only cookies verified within Middleware, and orchestrated by libraries like Auth.js (NextAuth.js).",
    detailedExplanation: "Because Next.js runs on both the client and server, auth must be secure. A common approach involves:\n• HTTP-only Cookies: Upon successful login, the server sets a session cookie with the `httpOnly` and `Secure` attributes, preventing client-side scripts from reading it.\n• Middleware Route Protection: Next.js Middleware intercepts incoming requests, reads the cookie, validates the session, and redirects unauthenticated users before page rendering starts.\n• Auth Libraries: Auth.js simplifies this, managing OAuth providers, database adapters, and sessions seamlessly.",
    codeSnippet: {
      language: "typescript",
      filename: "app/api/auth/login/route.ts",
      code: `import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Validate credentials...
  const isValid = username === 'admin' && password === 'secret';

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Generate secure HTTP-only cookie
  const response = NextResponse.json({ success: true, message: 'Logged in!' });
  response.cookies.set('session_token', 'secure-jwt-token-string', {
    httpOnly: true, // Crucial: protects cookie from XSS leaks!
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  return response;
}`
    },
    quiz: {
      question: "Why should session tokens be stored in httpOnly cookies instead of localStorage in a production application?",
      options: [
        "localStorage can only hold small files",
        "httpOnly cookies are automatically sent with every request and are inaccessible to client-side scripts, protecting them from Cross-Site Scripting (XSS) theft",
        "Next.js does not support localStorage APIs in client components",
        "httpOnly cookies are stored directly in the database instead of the browser"
      ],
      correctIndex: 1,
      explanation: "httpOnly cookies cannot be read by browser JavaScript. This protects them from malicious scripts (XSS), while the browser automatically includes them in headers for server authentication."
    }
  },
  {
    id: 34,
    category: "Server & API",
    difficulty: "Medium",
    question: "What is the difference between `pages/_app.tsx` and `pages/_document.tsx`?",
    answer: "In the Pages Router, `_app.tsx` initializes every page and manages global layout/providers, while `_document.tsx` customizes the raw HTML template structure itself.",
    detailedExplanation: "• `_app.tsx`: Wraps all page components during routing. It is used to apply global CSS stylesheets, persist layout across page transitions, keep state between page navigations, and configure global state providers (like Theme, QueryClient, or Redux).\n• `_document.tsx`: Renders strictly on the server once per page load. It is used to customize the initial static HTML document shell, including adding attributes to `<html>` or `<body>` tags, and importing external fonts and stylesheets. It does not handle client-side rendering or React states.",
    codeSnippet: {
      language: "typescript",
      filename: "pages/_document.tsx (Customizing raw HTML)",
      code: `// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Custom font configuration */}
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </Head>
      <body className="antialiased bg-slate-50 dark:bg-zinc-950">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}`
    },
    quiz: {
      question: "Which file should you use to wrap your Pages Router application with a global Redux or React Context provider?",
      options: [
        "pages/_document.tsx",
        "pages/_app.tsx",
        "next.config.js",
        "middleware.ts"
      ],
      correctIndex: 1,
      explanation: "`_app.tsx` wraps the active Page component on the client side, making it the correct place to initialize layouts, persist state, and mount global React Context providers."
    }
  },
  {
    id: 35,
    category: "Performance",
    difficulty: "Hard",
    question: "How would you optimize a Next.js app's Core Web Vitals?",
    answer: "You optimize Core Web Vitals by using `next/image` for images, using Server Components to minimize client JS, dynamic importing heavy scripts, prefetching key pages, and applying solid layout dimension constraints.",
    detailedExplanation: "Core Web Vitals measure user experience:\n1. LCP (Largest Contentful Paint): Speed up hero images with `next/image` and the `priority` tag.\n2. CLS (Cumulative Layout Shift): Require height/width on images, reserve spacing for loading states, and use nested layouts.\n3. INP (Interaction to Next Paint): Reduce browser JavaScript payloads by routing logic to React Server Components (RSCs) and using `next/dynamic` for heavy client features.",
    codeSnippet: {
      language: "typescript",
      filename: "Core Web Vitals Checklist",
      code: `// INP/LCP Optimization checklist:
// 1. Shift non-interactive layout components to default Server Components (0KB client JS)
// 2. Wrap heavy interactive sections (like code-editors or complex charts) in next/dynamic:
import dynamic from 'next/dynamic';
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <p>Loading dynamic chart component...</p>,
  ssr: false, // Prevents loading on initial server-render if client-only
});

// 3. Mark critical banners as 'priority' to skip lazy loading:
// <Image src={banner} priority alt="LCP banner" />`
    },
    quiz: {
      question: "Which tool or technique directly addresses CLS (Cumulative Layout Shift) in Next.js?",
      options: [
        "Using async fetch in Server Components",
        "Providing explicit width and height on next/image or using skeleton placeholders for dynamic assets",
        "Moving database keys to .env",
        "Deleting next.config.js"
      ],
      correctIndex: 1,
      explanation: "Providing explicit dimensions or placeholder containers reserves layout space before elements download, preventing elements from shifting and improving CLS scores."
    }
  },
  {
    id: 36,
    category: "Rendering",
    difficulty: "Medium",
    question: "What is the tradeoff of using SSR for every page vs static generation?",
    answer: "SSR guarantees real-time fresh data on every visit but introduces latency and hosting costs, while Static Generation offers instant CDN load speeds but can serve stale content.",
    detailedExplanation: "• Server-Side Rendering (SSR): Renders HTML dynamically for each visitor. It is ideal for real-time dashboard data or personalized bank balances. However, because pages are rendered on the fly, it increases Time-to-First-Byte (TTFB), puts strain on server resources, and cannot be cached entirely on static edge servers.\n• Static Generation (SSG/ISR): Pre-builds pages. This delivers ultra-fast page speeds, simplifies hosting, and improves SEO. However, if data updates frequently, pages can display stale information until they are rebuilt or revalidated (ISR).",
    codeSnippet: {
      language: "text",
      filename: "Comparison Metric Matrix",
      code: `┌───────────────────────┬───────────────────────────┬───────────────────────────┐
│ Metric                │ Static Generation (SSG)   │ Server Rendering (SSR)    │
├───────────────────────┼───────────────────────────┼───────────────────────────┤
│ Page Load Speed       │ 🚀 Instant (CDN cached)   │ 🐢 Variable (Server delay)│
│ Time to First Byte    │ ~20-50ms                  │ ~200-800ms                │
│ Server strain         │ None                      │ High (computes on hit)    │
│ Data Freshness        │ Stale until rebuild/ISR   │ Always 100% Real-time     │
│ SEO Rating            │ Excellent                 │ Excellent                 │
└───────────────────────┴───────────────────────────┴───────────────────────────┘`
    },
    quiz: {
      question: "Which page type would experience the lowest Time-to-First-Byte (TTFB) and fastest edge rendering?",
      options: [
        "A page fetching personalized settings on every hit using getServerSideProps",
        "A page compiled with getStaticProps and cached on an Edge CDN network",
        "A Client-Component page fetching data from a slow database within useEffect",
        "An iframe proxy page"
      ],
      correctIndex: 1,
      explanation: "Statically compiled pages cached directly on a global CDN can be served to users almost instantly, bypassing backend rendering steps entirely."
    }
  },
  {
    id: 37,
    category: "Performance",
    difficulty: "Medium",
    question: "How do dynamic imports work in Next.js for code splitting components?",
    answer: "Dynamic imports let you lazily load React components using the `next/dynamic` utility, downloading their JavaScript bundles only when they are rendered.",
    detailedExplanation: "If a page contains heavy interactive elements that are hidden by default (like modals, tabs, rich text editors, or complex interactive dashboards), importing them normally bundles their scripts into the main page load. By wrapping them in `next/dynamic`, Next.js splits them into separate files. The browser only downloads these bundles when the component is shown on screen.",
    codeSnippet: {
      language: "typescript",
      filename: "components/editor-container.tsx",
      code: `"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Load heavy code editor dynamically, only when user clicks edit!
const RichTextEditor = dynamic(
  () => import('@/components/RichTextEditor'),
  { 
    ssr: false, // Turn off SSR if component depends on client window objects
    loading: () => <div className="h-40 bg-gray-100 animate-pulse">Loading Editor...</div>
  }
);

export default function EditorContainer() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="p-4">
      <button onClick={() => setEditing(true)}>Open Rich Editor</button>
      {editing && <RichTextEditor />}
    </div>
  );
}`
    },
    quiz: {
      question: "What is a main reason to set 'ssr: false' inside a next/dynamic import configuration?",
      options: [
        "To compile the React code into Python scripts",
        "To prevent compilation errors when importing third-party libraries that rely on browser-only globals (like 'window' or 'document')",
        "To force the component to load at build time",
        "To disable all Tailwind CSS styles inside the element"
      ],
      correctIndex: 1,
      explanation: "Many legacy packages use browser APIs (like `window`) on import. Setting `ssr: false` blocks Next.js from rendering them on the server, avoiding crashes."
    }
  },
  {
    id: 38,
    category: "Routing",
    difficulty: "Hard",
    question: "What is the purpose of `generateStaticParams` in the App Router?",
    answer: "It is the modern App Router equivalent of `getStaticPaths`, defining the dynamic route segment values to pre-render statically at build time.",
    detailedExplanation: "In the App Router, when you have dynamic parameters in a path (like `/blog/[slug]`), you can pre-compile these routes into static HTML during compilation by exporting a `generateStaticParams` function. It retrieves the list of slugs and returns them as an array of path parameter objects. Next.js then pre-renders these pages statically, maximizing CDN delivery speed.",
    codeSnippet: {
      language: "typescript",
      filename: "app/blog/[slug]/page.tsx (Static Parameters)",
      code: `type BlogParams = {
  slug: string;
};

// Return array of parameter objects to pre-build during compilation
export async function generateStaticParams(): Promise<BlogParams[]> {
  const posts = await fetch('https://api.com/posts').then(res => res.json());

  // [{ slug: 'introduction' }, { slug: 'nextjs-guide' }]
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<BlogParams> }) {
  const resolved = await params;
  return <h1>Reading Post: {resolved.slug}</h1>;
}`
    },
    quiz: {
      question: "Which of the following describes the return value format of the `generateStaticParams` function?",
      options: [
        "An array of strings representing directories",
        "An array of objects matching the dynamic parameter keys and values",
        "A single string path URL",
        "A database connection hook"
      ],
      correctIndex: 1,
      explanation: "`generateStaticParams` must return an array of objects where each key matches the dynamic segment bracket name (e.g., `[{ slug: 'val1' }]`)."
    }
  },
  {
    id: 39,
    category: "Server & API",
    difficulty: "Hard",
    question: "How would you handle a WebSocket connection in a Next.js app?",
    answer: "WebSocket connections are initialized client-side within a Client Component (`'use client'`) since Server Components cannot maintain open browser socket feeds, typically pointing to an external Node.js socket server.",
    detailedExplanation: "Because standard Next.js environments (like Vercel serverless functions) have strict timeout limits, they cannot host persistent WebSocket servers. To use WebSockets:\n1. Client connection: Connect to the socket server from a Client Component using `useEffect`.\n2. WebSocket Server: Host the server independently (e.g. using Socket.io or ws on a separate Node.js/Express server), or use a managed service (such as Pusher or Ably).\n3. Alternative: Run Next.js as a full-stack Node server using a custom `server.ts` setup that can bind both HTTP and WS handlers.",
    codeSnippet: {
      language: "typescript",
      filename: "components/LiveChat.tsx",
      code: `"use client";

import { useEffect, useState } from 'react';

export default function LiveChat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // 1. Initialize client-side WebSocket client
    const ws = new WebSocket('wss://my-external-websocket-server.com');

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    setSocket(ws);

    // Clean up connection on component unmount!
    return () => ws.close();
  }, []);

  const sendMessage = (text: string) => {
    if (socket) socket.send(text);
  };

  return <div>Messages: {messages.length}</div>;
}`
    },
    quiz: {
      question: "Why are standard serverless server hosting platforms (like Vercel) unsuitable for running native WebSocket servers?",
      options: [
        "Serverless functions do not support asynchronous javascript",
        "Serverless execution models spin up containers on demand and spin them down quickly, preventing them from holding open persistent, stateful connections",
        "WebSockets can only run inside index.html files",
        "Serverless functions are unable to receive request headers"
      ],
      correctIndex: 1,
      explanation: "Serverless functions are short-lived. They execute a request and shut down, meaning they cannot maintain the continuous, stateful connections WebSockets require."
    }
  },
  {
    id: 40,
    category: "Fundamentals",
    difficulty: "Easy",
    question: "What are common reasons a team chooses Next.js over plain React + a bundler?",
    answer: "Teams choose Next.js to gain built-in routing, out-of-the-box SEO optimization (SSR/SSG), automatic image compression, simple API endpoints, and a pre-configured build system.",
    detailedExplanation: "Building a production application in plain React requires manually configuring Webpack/Vite, setting up React Router, configuring server-side rendering for SEO, and optimizing image assets. Next.js provides these production-ready features out of the box. Its strong defaults optimize performance automatically, allowing teams to focus on writing application code.",
    codeSnippet: {
      language: "text",
      filename: "Development Feature Matrix",
      code: `┌────────────────────────────────┬──────────────────────┬───────────────────────┐
│ Feature                        │ Vanilla React + Vite │ Next.js Full Stack    │
├────────────────────────────────┼──────────────────────┼───────────────────────┤
│ Server Pre-Rendering (SEO)     │ ❌ Hard manual setup │  Built-in (RSC/SSR)  │
│ Routing Configuration          │ ❌ Manual (React-Router) Built-in (File-Based) │
│ Image Optimization             │ ❌ Manual processing │  Automatic (next/image)│
│ Built-in API routes            │ ❌ Separate backend  │  Included (route.ts)  │
│ Bundle Code-Splitting          │ ❌ Needs manual config│  Automatic (by route) │
└────────────────────────────────┴──────────────────────┴───────────────────────┘`
    },
    quiz: {
      question: "Which of the following is NOT a built-in feature of Next.js?",
      options: [
        "Automatic code-splitting of pages",
        "Serverless API route handling",
        "Direct SQL database table creation during npm run build",
        "Dynamic image resizing and compression"
      ],
      correctIndex: 2,
      explanation: "While Next.js allows you to connect to databases and query them directly inside Server Components, it does not manage SQL databases or automatically create tables out of the box."
    }
  }
];
