/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from '../types';

export const QUESTIONS_51_75: Question[] = [
  {
    id: 51,
    category: 'seo_a11y',
    question: 'What is the "first rule of ARIA"?',
    answer: 'Don\'t use ARIA if an equivalent native HTML element/attribute already provides the needed behavior/semantics.',
    explanation: 'The first rule of ARIA states that you should always prefer native HTML5 elements over custom generic elements styled to look like them with added ARIA markup. For example, instead of `<div role="button" tabindex="0">Save</div>`, you should simply write `<button>Save</button>`. Native elements have built-in keyboard support, focus management, state tracking, and screen reader announcements that do not require complex custom JS code to operate correctly.',
    codeLanguage: 'html',
    codeExample: '<!-- BAD: Over-engineered and brittle -->\n<div role="checkbox" aria-checked="true" tabindex="0">Subscribe</div>\n\n<!-- GOOD: Native, accessible, standard -->\n<input type="checkbox" id="sub" checked>\n<label for="sub">Subscribe</label>',
    visualId: 'first-rule-aria',
    visualDescription: 'Interactive code analyzer: compare the heavy accessibility specifications needed to make a custom <div> checkbox function versus a single native checkbox tag.'
  },
  {
    id: 52,
    category: 'basics',
    question: 'What is the difference between <strong>/<em> and <b>/<i>?',
    answer: '<strong>/<em> convey semantic importance/emphasis (announced by screen readers); <b>/<i> are purely visual stylistic elements.',
    explanation: '`<strong>` indicates strong structural importance or urgency, while `<b>` is used for stylistic bolding without adding structural meaning (e.g., highlighting keywords). Similarly, `<em>` represents emphasis that changes the meaning of a sentence, whereas `<i>` is for alternate voice or technical terms without emphasis. Assistive technologies can verbally emphasize `<strong>` and `<em>` text, while ignoring `<b>` and `<i>` cues.',
    codeLanguage: 'html',
    codeExample: '<p>You <strong>must</strong> complete this step.</p>\n<p>The taxonomic name is <i>Homo sapiens</i>.</p>',
    visualId: 'strong-em-vs-bi',
    visualDescription: 'A reading-level simulator showing how a screen reader modulates vocal emphasis and pitch when encountering semantic tags.'
  },
  {
    id: 53,
    category: 'basics',
    question: 'What is the purpose of the <noscript> element?',
    answer: 'Displays fallback content when JavaScript is disabled or unsupported in the browser.',
    explanation: 'The `<noscript>` tag contains HTML that is parsed and rendered only if the client has disabled JavaScript in their browser settings or if the browser does not support scripting. It is commonly used to display alerts warning users that the web application requires JavaScript, or to load fallback image pixels for non-JS trackers.',
    codeLanguage: 'html',
    codeExample: '<noscript>\n  <div class="warning-banner">\n    <p>This interactive applet requires JavaScript to run properly.</p>\n  </div>\n</noscript>',
    visualId: 'noscript-previewer',
    visualDescription: 'Toggle a simulated JavaScript switch to see exactly what content is loaded inside and outside of the noscript tag.'
  },
  {
    id: 54,
    category: 'dom',
    question: 'What is the Shadow DOM?',
    answer: 'An encapsulation mechanism allowing a component\'s internal DOM structure/styles to be isolated from the rest of the page, used in Web Components.',
    explanation: 'The Shadow DOM provides style and markup encapsulation. It allows a component to have its own "shadow" DOM subtree that cannot be accidentally styled by global CSS selectors, nor will its inner element IDs collide with the main "light" DOM. This isolation is crucial for creating robust, reusable widgets (like media players or calendar pickers) that look and behave consistently regardless of where they are embedded.',
    codeLanguage: 'js',
    codeExample: '// Create a shadow root on an element\nconst host = document.querySelector("#widget");\nconst shadow = host.attachShadow({ mode: "closed" });\nshadow.innerHTML = `<style>p { color: red; }</style><p>Protected Content</p>`;',
    visualId: 'shadow-dom-boundary',
    visualDescription: 'An interactive tree visualizer showcasing global styles attempting to leak across a Shadow boundary and being blocked.'
  },
  {
    id: 55,
    category: 'dom',
    question: 'What is a Web Component?',
    answer: 'A set of browser-native APIs (Custom Elements, Shadow DOM, HTML Templates) for creating reusable, encapsulated custom HTML elements without a framework.',
    explanation: 'Web Components are a collection of standards natively supported by modern browsers. They consist of: 1) Custom Elements (defining custom tags with lifecycle hooks like `connectedCallback`), 2) Shadow DOM (style/markup isolation), and 3) HTML Templates (clonable, non-rendered snippets). They allow developer teams to build robust design systems that are completely framework-agnostic.',
    codeLanguage: 'js',
    codeExample: 'class UserCard extends HTMLElement {\n  connectedCallback() {\n    this.innerHTML = `<p>Card for ${this.getAttribute("name")}</p>`;\n  }\n}\ncustomElements.define("user-card", UserCard);',
    visualId: 'web-components-gears',
    visualDescription: 'An active visual assembly line displaying how templates, shadow hosts, and custom element registrations combine to spawn custom web components.'
  },
  {
    id: 56,
    category: 'dom',
    question: 'What is the <template> element used for?',
    answer: 'Declares HTML markup that isn\'t rendered immediately but can be cloned and inserted into the DOM later via JavaScript.',
    explanation: 'The `<template>` element is a built-in mechanism for storing client-side template HTML. The browser parses its content but does not render it, load nested images, or run nested scripts until the template content is instantiated. This is highly efficient for populating lists, cards, or tables dynamically without raw string concatenation in JavaScript.',
    codeLanguage: 'html',
    codeExample: '<template id="row-template">\n  <tr>\n    <td class="username"></td>\n    <td class="user-role"></td>\n  </tr>\n</template>\n\n<script>\n  const temp = document.getElementById("row-template");\n  const clone = temp.content.cloneNode(true);\n  clone.querySelector(".username").textContent = "Alice";\n  document.querySelector("tbody").appendChild(clone);\n</script>',
    visualId: 'template-clone-animation',
    visualDescription: 'An animated stamping press showing how template nodes are cloned, customized in memory, and stamped into the live viewport.'
  },
  {
    id: 57,
    category: 'dom',
    question: 'What is the difference between innerHTML and textContent?',
    answer: 'innerHTML parses and renders the string as HTML (XSS risk); textContent inserts the string as plain, literal text.',
    explanation: '`innerHTML` instructs the browser to pass the input string through the HTML parser, converting string markup into actual DOM elements. `textContent` skips parsing entirely, treating the payload as raw text and automatically escaping tags. Using `textContent` is not only faster for simple text changes, but it also completely eliminates the risk of cross-site scripting (XSS) injections.',
    codeLanguage: 'js',
    codeExample: 'const el = document.getElementById("output");\n\n// innerHTML: parses markup\nel.innerHTML = "<strong>Hello</strong>"; // Renders bold Hello\n\n// textContent: plain text\nel.textContent = "<strong>Hello</strong>"; // Renders literal: <strong>Hello</strong>',
    visualId: 'innerhtml-vs-textcontent',
    visualDescription: 'A direct side-by-side comparative terminal: type input text containing tags and watch how innerHTML renders it vs textContent.'
  },
  {
    id: 58,
    category: 'dom',
    question: 'Why is directly setting innerHTML with user-provided content a security risk?',
    answer: 'It can execute injected malicious scripts/markup (XSS) if the content isn\'t properly sanitized first.',
    explanation: 'If user-generated input (like search fields, chat comments, or profile handles) is directly fed into `innerHTML`, an attacker can insert a script payload (for example, via `<img src="x" onerror="alert(\'hacked\')">`). When another user loads the page, that malicious script executes automatically in their context, allowing cookies, access tokens, and sensitive data to be stolen.',
    codeLanguage: 'js',
    codeExample: '// DANGEROUS: Attacker inserts: <img src="x" onerror="stealSession()"/>\nconst userInput = localStorage.getItem("username");\nprofileCard.innerHTML = `<h3>Welcome, ${userInput}</h3>`; // XSS Vulnerability',
    visualId: 'xss-attack-simulation',
    visualDescription: 'Play a controlled simulation of an XSS exploit: enter an onerror image trigger and see how a vulnerable innerHTML line runs the script.'
  },
  {
    id: 59,
    category: 'metadata',
    question: 'What is the purpose of the <base> tag?',
    answer: 'Sets a base URL for all relative URLs used throughout the document.',
    explanation: 'The `<base>` element specifies the default target destination and baseline URL directory for all relative links (`<a>`), images (`<img>`), forms (`<form>`), and external scripts. There can be at most one `<base>` tag in a document, and it must be placed within the `<head>` segment before any elements that reference external links.',
    codeLanguage: 'html',
    codeExample: '<head>\n  <base href="https://assets.example.com/images/">\n</head>\n<body>\n  <!-- Resolves to: https://assets.example.com/images/logo.png -->\n  <img src="logo.png" alt="Company Logo">\n</body>',
    visualId: 'base-tag-router',
    visualDescription: 'A directory layout visualizer: edit the <base> URL and watch how relative link addresses update instantly in real-time.'
  },
  {
    id: 60,
    category: 'metadata',
    question: 'What is a favicon and how is it linked?',
    answer: 'The small icon shown in browser tabs/bookmarks, linked via <link rel="icon" href="..."> in the document head.',
    explanation: 'Favicons are standard brand graphics displayed on browser tab bars, shortcut folders, histories, and mobile home bookmarks. Traditionally a `.ico` file in the root, modern standards allow high-resolution PNGs, SVGs, or WebPs. You link them in the `<head>` using `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`.',
    codeLanguage: 'html',
    codeExample: '<head>\n  <!-- Vector Favicon (Scales beautifully) -->\n  <link rel="icon" type="image/svg+xml" href="/favicon.svg">\n</head>',
    visualId: 'favicon-tab-mockup',
    visualDescription: 'Interact with standard browser tab configurations, upload or preview custom SVG favicons, and inspect real-time color schemes.'
  },
  {
    id: 61,
    category: 'metadata',
    question: 'What is the Open Graph protocol used for in <meta> tags?',
    answer: 'Metadata (title, description, image) controlling how a page\'s link preview appears when shared on social media platforms.',
    explanation: 'The Open Graph (OG) protocol was created by Facebook to standardize metadata collection across the web. Placing tags like `<meta property="og:image" content="...">` in the document head ensures that when your page link is posted on platforms like Slack, Discord, Twitter, or Facebook, they generate highly detailed card preview boxes containing custom thumbnails and descriptive titles.',
    codeLanguage: 'html',
    codeExample: '<head>\n  <meta property="og:title" content="HTML 100 Q&A Masterclass">\n  <meta property="og:description" content="Visual walkthrough of HTML interview questions.">\n  <meta property="og:image" content="https://example.com/og-banner.png">\n  <meta property="og:type" content="website">\n</head>',
    visualId: 'og-card-generator',
    visualDescription: 'An interactive card mockup. Tweak open-graph attributes and instantly preview beautiful visual links on social channels.'
  },
  {
    id: 62,
    category: 'metadata',
    question: 'What is the purpose of <meta name="description">?',
    answer: 'Provides a summary of the page\'s content, often shown in search engine results as the snippet text.',
    explanation: 'The meta description attribute is a high-value element for search engine optimization. It offers search engine crawlers a clean summary (ideally 150-160 characters long) of the document content. While it is not a direct factor in ranking calculations, it highly influences the user click-through rate (CTR) on Search Engine Results Pages (SERPs).',
    codeLanguage: 'html',
    codeExample: '<head>\n  <meta name="description" content="Prepare for frontend interviews with our master collection of 100 HTML questions, comprehensive code scripts, and visual simulators.">\n</head>',
    visualId: 'serp-previewer-tool',
    visualDescription: 'Enter page descriptions, observe character counters, and see how Google constructs snippets on both mobile and desktop views.'
  },
  {
    id: 63,
    category: 'structure',
    question: 'What is the difference between HTML5 and older versions regarding semantics?',
    answer: 'HTML5 introduced dedicated semantic elements replacing the legacy convention of generic <div> tags with custom class names.',
    explanation: 'Before HTML5, structure was made using generic layout blocks (e.g. `<div id="navigation">`, `<div class="footer">`). This caused structural ambiguity since search spiders and screen readers had to guess element roles based on arbitrary class names. HTML5 standardized layouts with dedicated native components (`<nav>`, `<footer>`, `<aside>`), ensuring structural consistency across the web.',
    codeLanguage: 'html',
    codeExample: '<!-- Pre-HTML5 (XHTML / HTML4) -->\n<div id="side-navigation">\n  <div class="sidebar-item">Link</div>\n</div>\n\n<!-- HTML5 Standard -->\n<aside>\n  <nav>Link</nav>\n</aside>',
    visualId: 'semantic-evolution',
    visualDescription: 'Compare a 2005-era layout to a modern semantic schema and examine the clean visual decline in DOM structural complexity.'
  },
  {
    id: 64,
    category: 'basics',
    question: 'What is progressive enhancement in web development?',
    answer: 'Building a baseline functional experience with plain HTML first, then layering CSS and JS enhancements on top.',
    explanation: 'Progressive enhancement is a design philosophy that prioritizes content and accessibility. You construct a fully functional page using simple semantic HTML first (ensuring users on old browsers, slow networks, or screen readers can read all data and submit forms). Only after completing this baseline do you layer CSS aesthetics and rich, interactive JS logic on top.',
    codeLanguage: 'html',
    codeExample: '<!-- Semantic core HTML form (Works without JS!) -->\n<form action="/signup" method="POST">\n  <input type="text" name="usr" required>\n  <button type="submit">Sign Up</button>\n</form>\n<!-- Custom AJAX validation is layered on via JS as an enhancement later -->',
    visualId: 'progressive-enhancement-stack',
    visualDescription: 'A layered slice model. Strip CSS styles or turn off JS to verify if your application core remains functional under raw HTML modes.'
  },
  {
    id: 65,
    category: 'basics',
    question: 'What is graceful degradation, and how does it differ from progressive enhancement?',
    answer: 'Building the full-featured experience first, then ensuring it degrades acceptably in older or limited browsers.',
    explanation: 'Graceful degradation is the inverse starting point of progressive enhancement. In graceful degradation, you build the most feature-rich, high-fidelity experience using the latest tech (assuming high-speed connections and modern browser compatibility). You then patch or create fallbacks (like polyfills or layout tweaks) to ensure older devices do not crash entirely but display a functional (if simplified) page.',
    codeLanguage: 'js',
    codeExample: 'if (window.WebGLRenderingContext) {\n  init3DGraphics();\n} else {\n  // Fallback to flat static images for legacy environments\n  init2DPlaceholder();\n}',
    visualId: 'graceful-degradation-timeline',
    visualDescription: 'Compare performance and developer cost profiles when planning projects with Progressive vs Graceful architectural models.'
  },
  {
    id: 66,
    category: 'metadata',
    question: 'What is the purpose of <link rel="preload">?',
    answer: 'Hints to the browser to fetch a critical resource (font, stylesheet) early, before it\'s discovered, improving performance.',
    explanation: '`<link rel="preload">` tells the browser to download a resource immediately over the network because it will be needed shortly in the rendering pipeline. It prevents delay cascades for deep resources like custom fonts declared inside secondary CSS files. Preloading bypasses standard discovery queues but does not execute or evaluate scripts.',
    codeLanguage: 'html',
    codeExample: '<head>\n  <!-- Download the main brand font immediately -->\n  <link rel="preload" href="/fonts/inter-bold.woff2" as="font" type="font/woff2" crossorigin>\n</head>',
    visualId: 'preload-waterfall',
    visualDescription: 'A custom timeline simulator: watch how preloading moves resource download starts to the beginning of network cycles.'
  },
  {
    id: 67,
    category: 'metadata',
    question: 'What is <link rel="prefetch"> used for?',
    answer: 'Hints the browser to fetch a resource likely needed for a future navigation, during idle time, so it\'s cached.',
    explanation: '`<link rel="prefetch">` is a low-priority resource hint. It tells the browser that the user is likely to visit a specific subpage soon (like the checkout or profile page), so the resource should be downloaded during CPU idle time and stored in the HTTP cache. When the user eventually clicks the link, the page loads almost instantly.',
    codeLanguage: 'html',
    codeExample: '<head>\n  <!-- Prefetch script needed for the next step -->\n  <link rel="prefetch" href="/js/checkout-flow.js" as="script">\n</head>',
    visualId: 'prefetch-idle-sim',
    visualDescription: 'Learn about user path predictions. Click a button to see how idle browsers fetch future scripts on quiet network lines.'
  },
  {
    id: 68,
    category: 'metadata',
    question: 'What is the difference between preload and prefetch?',
    answer: 'preload is for the current page\'s critical resources needed soon; prefetch is for resources likely needed on a future navigation, fetched at lower priority.',
    explanation: 'Use `preload` when a resource is highly critical for rendering the *current* page correctly (e.g. above-the-fold stylesheets, hero images, or core UI libraries). Use `prefetch` for assets associated with *future* page routes that the viewer has not yet navigated to, saving bandwidth on the initial page load.',
    codeLanguage: 'html',
    codeExample: '<!-- Preload (Current page, highest priority) -->\n<link rel="preload" href="theme.css" as="style">\n\n<!-- Prefetch (Next page, lowest priority/idle time) -->\n<link rel="prefetch" href="details-dashboard.js" as="script">',
    visualId: 'preload-vs-prefetch-grid',
    visualDescription: 'An interactive toggle mapping priority queues: classify page assets as preload or prefetch depending on critical paths.'
  },
  {
    id: 69,
    category: 'metadata',
    question: 'What is the purpose of <link rel="stylesheet">\'s placement in <head>?',
    answer: 'Ensures CSS is loaded and applied before the page renders, avoiding a Flash of Unstyled Content (FOUC).',
    explanation: 'Browsers parse HTML documents sequentially. If stylesheets are placed at the bottom of the body, the browser renders raw text and default HTML styling first, then abruptly applies styles once the file downloads, causing a disturbing visual jump or "Flash of Unstyled Content" (FOUC). Placing links in `<head>` blocks paint until CSS rules are fully resolved.',
    codeLanguage: 'html',
    codeExample: '<head>\n  <title>Styled Document</title>\n  <!-- Blocks visual paint until styles are fully mapped -->\n  <link rel="stylesheet" href="main.css">\n</head>',
    visualId: 'fouc-flicker-demo',
    visualDescription: 'A layout renderer: trigger a simulated FOUC layout load and witness the visual shift of unstyled vs styled CSS pipelines.'
  },
  {
    id: 70,
    category: 'metadata',
    question: 'What is a render-blocking resource?',
    answer: 'A resource (typically CSS, or synchronous <script>) that the browser must download/process before it can continue rendering the page.',
    explanation: 'To render a page, the browser constructs the DOM (Document Object Model) and CSSOM (CSS Object Model). It combines them into a Render Tree. Synchronous script tags and stylesheets placed in `<head>` halt HTML token parsing and frame painting until they are downloaded and executed. Identifying and minimizing these render-blocking nodes is key to optimization.',
    codeLanguage: 'html',
    codeExample: '<!-- Render-blocking CSS (Expected) -->\n<link rel="stylesheet" href="layout.css">\n\n<!-- Render-blocking JS (Avoid!) -->\n<script src="heavy-analytics.js"></script>',
    visualId: 'render-blocking-waterfall',
    visualDescription: 'Deconstruct a render lifecycle: see where the DOM parser is paused by stylesheet or script fetches.'
  },
  {
    id: 71,
    category: 'metadata',
    question: 'What is Critical CSS and why is it used?',
    answer: 'Inlining the minimal CSS needed for above-the-fold content directly in the HTML, so initial rendering isn\'t blocked.',
    explanation: 'Above-the-fold refers to the exact portion of the page visible upon initial load before scrolling. Critical CSS extracts the exact styles required to render this area and injects them inside a `<style>` block directly in the HTML document. This allows the browser to paint the header layout instantly while loading the rest of the main stylesheet asynchronously.',
    codeLanguage: 'html',
    codeExample: '<head>\n  <style>\n    /* Critical CSS: Instant Header paint rules */\n    body { background: #000; color: #fff; }\n    header { height: 60px; }\n  </style>\n  <!-- Asynchronous stylesheet load for rest of the page -->\n  <link rel="preload" href="rest.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">\n</head>',
    visualId: 'critical-css-viewer',
    visualDescription: 'Toggle the Critical CSS pattern to watch First Contentful Paint score trends improve over standard CSS setups.'
  },
  {
    id: 72,
    category: 'metadata',
    question: 'What is the difference between a <meta http-equiv> tag and an actual HTTP header?',
    answer: 'http-equiv simulates HTTP response headers via HTML markup when you cannot directly control server configuration.',
    explanation: 'HTTP headers are key-value metadata sent by the server BEFORE sending the actual HTML file (configured via Nginx, Apache, or Cloud Run). If developers do not have direct access to server configuration, they can use `<meta http-equiv="...">` tags to mimic some of these response flags (like character types, content security guidelines, or refresh intervals).',
    codeLanguage: 'html',
    codeExample: '<!-- HTML http-equiv simulation -->\n<meta http-equiv="Content-Security-Policy" content="default-src \'self\'">\n\n<!-- Mimics actual HTTP header response payload: -->\n<!-- Content-Security-Policy: default-src \'self\' -->',
    visualId: 'http-equiv-comparer',
    visualDescription: 'A direct network package comparison displaying server-side raw response packets versus client-side meta simulations.'
  },
  {
    id: 73,
    category: 'dom',
    question: 'What is Content Security Policy (CSP) and how is it typically set?',
    answer: 'A security mechanism restricting what sources of scripts/styles/resources a page can load, typically set via HTTP header or meta tag.',
    explanation: 'Content Security Policy (CSP) is an effective defense against Cross-Site Scripting (XSS) attacks. By declaring valid source domains for scripts, styles, fonts, frames, and images, CSP blocks the execution of unauthorized, inline scripts or rogue CDNs. It can be set via an HTTP header (recommended) or inside a `<meta http-equiv="Content-Security-Policy" content="...">` tag.',
    codeLanguage: 'html',
    codeExample: '<!-- Restricts scripts to same domain (\'self\') and trustworthy API -->\n<meta http-equiv="Content-Security-Policy" \n      content="default-src \'self\'; script-src \'self\' https://apis.google.com;">',
    visualId: 'csp-guard-simulation',
    visualDescription: 'An interactive security console: attempt to inject a rogue tracking script and see how various CSP policies block the request.'
  },
  {
    id: 74,
    category: 'dom',
    question: 'What is the purpose of the crossorigin attribute?',
    answer: 'Controls how cross-origin requests for resources (like scripts/images/links) are made (with or without credentials), relevant for CORS and error logging.',
    explanation: 'The `crossorigin` attribute coordinates resource loading requests across domains under CORS (Cross-Origin Resource Sharing) regulations. Setting `crossorigin="anonymous"` requests the asset without transmitting cookies or credentials. For scripts, this is required to retrieve detailed error messages in `window.onerror` instead of safe, generic "Script error" messages.',
    codeLanguage: 'html',
    codeExample: '<!-- Safe script load from cross-domain CDN, CORS anonymous, with Subresource Integrity -->\n<script src="https://cdn.example.com/lib.js" \n        crossorigin="anonymous"\n        integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K..."></script>',
    visualId: 'crossorigin-handshake',
    visualDescription: 'An animated credential handler: see how crossorigin parameters either suppress or transmit cookies and browser tokens across domain lines.'
  },
  {
    id: 75,
    category: 'attributes',
    question: 'What is the difference between an absolute and relative URL?',
    answer: 'Absolute URLs include the full protocol/domain (https://...); relative URLs are resolved against the current page directory.',
    explanation: 'An absolute URL specifies the exact network location of a resource, including the protocol (HTTP/HTTPS) and domain name. A relative URL omits these and points to a location relative to the current file position. Root-relative paths (starting with `/`) resolve relative to the main domain root, whereas document-relative paths navigate folders using symbols like `../`.',
    codeLanguage: 'html',
    codeExample: '<!-- Absolute URL (Full address) -->\n<a href="https://example.com/pages/index.html">Absolute</a>\n\n<!-- Relative URL (Resolved locally) -->\n<a href="../about.html">Relative</a>\n<a href="/images/logo.png">Root-Relative</a>',
    visualId: 'url-resolution-tool',
    visualDescription: 'An interactive path finder. Type absolute or relative pathways and see exactly how the browser compiles the final request address.'
  }
];
