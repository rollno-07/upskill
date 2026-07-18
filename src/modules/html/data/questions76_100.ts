/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from '../types';

export const QUESTIONS_76_100: Question[] = [
  {
    id: 76,
    category: 'attributes',
    question: 'What is the purpose of the download attribute on <a>?',
    answer: 'Forces the browser to download the linked resource rather than navigating to/displaying it, optionally specifying a suggested filename.',
    explanation: 'By default, clicking an anchor tag pointing to a PDF, image, or audio file opens that resource in the current browser tab. Attacking the boolean `download` attribute forces the user agent to trigger a native file download. Providing a string value (e.g. `download="report-2026.pdf"`) dictates the default filename suggested to the user upon download.',
    codeLanguage: 'html',
    codeExample: '<!-- Triggers a file download instead of viewport navigation -->\n<a href="/documents/quarterly-stats.csv" download="Q2_Stats_2026.csv">\n  Download CSV Stats\n</a>',
    visualId: 'download-trigger-sim',
    visualDescription: 'A direct link inspector showing target behaviors. Hover a link to see if clicking will navigate or trigger a local file write.'
  },
  {
    id: 77,
    category: 'forms',
    question: 'What is form validation, and what\'s the difference between client-side and server-side validation?',
    answer: 'Client-side validation gives immediate user feedback; server-side validation is the authoritative, secure check that can never be bypassed.',
    explanation: 'Form validation ensures entered text complies with expected shapes (e.g., matching length or patterns). Client-side checks (built into HTML or run in JS) provide instant, user-friendly warnings so errors can be corrected before submission. However, client-side validation is easily bypassed (e.g., using browser dev tools or cURL). Therefore, server-side validation is an absolute requirement for security and database integrity.',
    codeLanguage: 'html',
    codeExample: '<!-- Client-side validation is convenient -->\n<input type="text" minlength="4" required>\n\n<!-- Server-side validation must replicate these rules in code -->',
    visualId: 'validation-shields',
    visualDescription: 'A visual schematic diagram showing client-side validation tooltip alerts and how server-side shields catch bypassed payloads.'
  },
  {
    id: 78,
    category: 'forms',
    question: 'What does the pattern attribute on an input do?',
    answer: 'Specifies a regular expression the input\'s value must match for the form to be considered valid.',
    explanation: 'The `pattern` attribute takes a standard JavaScript Regular Expression (regex). When present, the browser automatically validates the field value against this regex before form submission, rejecting inputs that fail to match and showing localized error balloons.',
    codeLanguage: 'html',
    codeExample: '<!-- Only accepts a valid 5-digit US ZIP Code -->\n<label for="zip">ZIP Code:</label>\n<input type="text" id="zip" pattern="\\d{5}" title="Please enter a 5-digit ZIP code">',
    visualId: 'regex-matcher-tool',
    visualDescription: 'Enter custom regular expressions or type test strings to watch how the HTML pattern attribute resolves validity in real-time.'
  },
  {
    id: 79,
    category: 'forms',
    question: 'What is the difference between disabled and readonly on a form input?',
    answer: 'disabled prevents interaction and excludes the field from submission; readonly prevents editing but the field remains focusable and is submitted.',
    explanation: 'Both attributes block the user from modifying input values. However, `disabled` elements are visually grayed-out, skipped during keyboard tab navigation, cannot be focused, and their value is completely excluded from form data submitted over the network. `readonly` elements look standard, remain focusable, can be copied, and their value is submitted normally.',
    codeLanguage: 'html',
    codeExample: '<!-- Excluded from submission, not focusable -->\n<input type="text" name="banned" value="Banned" disabled>\n\n<!-- Included in submission, focusable/copiable -->\n<input type="text" name="ref-id" value="REF-295" readonly>',
    visualId: 'disabled-vs-readonly-table',
    visualDescription: 'Select fields to see interactive indicators detailing click outcomes, keyboard tabbing paths, and active form submission data packets.'
  },
  {
    id: 80,
    category: 'seo_a11y',
    question: 'What is the purpose of the <meta name="robots"> tag?',
    answer: 'Controls search engine crawler behavior for the page (e.g. noindex to exclude from search results, nofollow to ignore links).',
    explanation: 'The robots meta tag communicates instructions to search engines crawling your site. Standard directives include `noindex` (prevents this page from showing up in Google search results) and `nofollow` (instructs the crawler not to pass search equity or crawl authority down any hyperlink paths on this page).',
    codeLanguage: 'html',
    codeExample: '<head>\n  <!-- Prevent indexing this page, do not follow links -->\n  <meta name="robots" content="noindex, nofollow">\n</head>',
    visualId: 'robots-spider-sim',
    visualDescription: 'A crawling simulator: release a virtual search bot and watch how index, noindex, and nofollow flags direct its exploration paths.'
  },
  {
    id: 81,
    category: 'seo_a11y',
    question: 'What is a canonical URL and how is it declared in HTML?',
    answer: 'tells search engines the preferred/authoritative URL when the same content is accessible via multiple URLs, avoiding duplicate content SEO issues.',
    explanation: 'If identical page content can be accessed via multiple paths (e.g. `example.com/item` and `example.com/item?category=shoes`), search spiders might penalize the site for duplicate content. Declaring `<link rel="canonical" href="...">` in the head tells search crawlers which version is the single authoritative source, routing all SEO value directly to that single URL.',
    codeLanguage: 'html',
    codeExample: '<head>\n  <!-- Routes search spider focus to the single primary address -->\n  <link rel="canonical" href="https://example.com/products/hiking-boot">\n</head>',
    visualId: 'canonical-spider-map',
    visualDescription: 'A multi-path domain mapping showing how duplicate link branches are resolved back to a single canonical node.'
  },
  {
    id: 82,
    category: 'basics',
    question: 'What is the difference between an HTML comment and a hidden element?',
    answer: 'A comment (<!-- -->) is never rendered or included in the DOM tree; a hidden element exists in the DOM but is visually hidden.',
    explanation: 'An HTML comment is completely ignored by layout engines during visual rendering and does not generate accessibility tree items. However, comments are still sent to the browser, so users can read them in Page Source. A hidden element (using the `hidden` attribute or `display: none`) is fully loaded in the browser DOM and accessible via JS scripts, but it is invisible to users and screen readers.',
    codeLanguage: 'html',
    codeExample: '<!-- This comment is only visible in source code views -->\n\n<div hidden>\n  <p>This paragraph exists in the DOM but is hidden from render views.</p>\n</div>',
    visualId: 'hidden-elements-inspector',
    visualDescription: 'Switch views between visual viewport rendering, DOM inspector tree nodes, and raw page source to locate hidden assets.'
  },
  {
    id: 83,
    category: 'basics',
    question: 'What does the hidden attribute do?',
    answer: 'Hides an element from rendering; a simpler native alternative to display: none in CSS.',
    explanation: 'The `hidden` attribute is a native boolean attribute that hides elements visually and from assistive screen readers. Adding `<div hidden>` is semantically equivalent to adding CSS style `display: none;`. It should not be used to hide elements that are only temporarily hidden (like tabs), but rather for elements that are completely irrelevant to the current state.',
    codeLanguage: 'html',
    codeExample: '<div hidden>\n  <p>This content is completely invisible to users and screen readers.</p>\n</div>',
    visualId: 'hidden-toggle-playground',
    visualDescription: 'Toggle the native hidden attribute and inspect how the layout immediately reflows, removing the element from the display queue.'
  },
  {
    id: 84,
    category: 'metadata',
    question: 'What is the purpose of <meta name="theme-color">?',
    answer: 'Suggests a color for the browser UI (e.g. mobile browser\'s address bar) to match the page\'s branding.',
    explanation: 'The `theme-color` meta tag instructs the browser to tint its chrome (for example, the mobile address bar, pull-to-refresh panels, or title margins) with a specific hex color code. This aligns the browser framework with your page`s branding palette, making the web experience feel like a native application.',
    codeLanguage: 'html',
    codeExample: '<head>\n  <!-- Sets a dark charcoal theme tint in supporting mobile browsers -->\n  <meta name="theme-color" content="#1a1a1a">\n</head>',
    visualId: 'theme-color-tab-mockup',
    visualDescription: 'Toggle theme-color parameters and watch a simulated smartphone browser address bar morph its accent colors to match.'
  },
  {
    id: 85,
    category: 'metadata',
    question: 'What is a manifest file in Progressive Web Apps (PWAs)?',
    answer: 'A JSON file (linked via <link rel="manifest">) describing app metadata, enabling "add to home screen" and native styling.',
    explanation: 'A web app manifest is a standard JSON file that provides information about your web application in a text-based format. It details key features like the application name, start URL paths, default icon sets (for desktop and mobile launchers), and custom orientation rules. This enables modern mobile browsers to install the webpage as a native-feeling app directly on mobile home screens.',
    codeLanguage: 'html',
    codeExample: '<head>\n  <link rel="manifest" href="/manifest.json">\n</head>',
    visualId: 'manifest-json-inspector',
    visualDescription: 'Browse a standard manifest.json schema and preview how application launchers and splash screens render on mobile devices.'
  },
  {
    id: 86,
    category: 'basics',
    question: 'What is the difference between HTML validation and browser rendering leniency?',
    answer: 'Browsers silently correct or ignore markup errors to render the page; validation explicitly verifies strict syntactic standards.',
    explanation: 'Browsers are built to be extremely forgiving of syntax errors (like missing closing tags or mismatched tag nests). While the browser will execute background calculations to patch these errors, different browsers can resolve errors differently, leading to unpredictable page layouts. Verifying strict HTML validation ensures your code is standard-compliant, preventing rendering bugs and improving SEO.',
    codeLanguage: 'html',
    codeExample: '<!-- Malformed (invalid) HTML -->\n<p>This tag is <b>bold and nested poorly.</p></b>\n\n<!-- Standard-compliant HTML -->\n<p>This tag is <b>bold</b> and nested properly.</p>',
    visualId: 'leniency-fault-finder',
    visualDescription: 'Submit malformed HTML snippets and watch how different browser parsing engines reconstruct domestic DOM trees.'
  },
  {
    id: 87,
    category: 'structure',
    question: 'What is the purpose of the <address> element?',
    answer: 'Marks up contact information for the nearest <article> or the whole document, semantically distinct from generic text.',
    explanation: 'The `<address>` element is a dedicated semantic tag representing physical mailing addresses, phone directories, URLs, email addresses, or social handle anchors. When placed inside an `<article>`, it represents contact details specifically for that article; when placed in the root body context, it represents contact details for the entire website.',
    codeLanguage: 'html',
    codeExample: '<address>\n  Contact the author at <a href="mailto:author@example.com">email</a>.<br>\n  Visit us at:<br>\n  Google AI Studio, Cloud Boulevard\n</address>',
    visualId: 'address-element-builder',
    visualDescription: 'Contrast the default italic rendering of an address block with semantic indexing details used by modern search engines.'
  },
  {
    id: 88,
    category: 'structure',
    question: 'What is the difference between <figure> / <figcaption> and a plain <img> with nearby text?',
    answer: '<figure> semantically groups an image (or other content) with its caption, explicitly associating them for screen readers.',
    explanation: 'Using plain text next to an image is only a visual association. A screen reader user navigating the document may not understand that the text describes that image. Enclosing the content inside a `<figure>` tag alongside a `<figcaption>` explicitly binds them together in the browser`s accessibility mapping, ensuring assistive software reads them as a single item.',
    codeLanguage: 'html',
    codeExample: '<figure>\n  <img src="chart-adoption.png" alt="adoption graph">\n  <figcaption>Figure 1.1: HTML5 adoption rates across the globe, 2010-2026.</figcaption>\n</figure>',
    visualId: 'figure-figcaption-mapper',
    visualDescription: 'Click a figure card to see how its components are bundled into an isolated visual frame and an accessible group block.'
  },
  {
    id: 89,
    category: 'structure',
    question: 'What is the purpose of the <time> element?',
    answer: 'Marks up a date/time in a machine-readable format (via datetime attribute) while displaying human-readable text.',
    explanation: 'Human dates like "Next Thursday" or "2 days ago" are ambiguous for machines. The `<time>` element lets developers specify a machine-readable date/time string inside the `datetime` attribute (using standardized formats like ISO 8601, e.g. `2026-07-18`), while displaying whatever text they want to users. This improves calendar integrations and search engine indexing accuracy.',
    codeLanguage: 'html',
    codeExample: '<p>The conference begins on <time datetime="2026-07-18T09:00">Saturday, July 18 at 9 AM</time>.</p>',
    visualId: 'time-element-translator',
    visualDescription: 'Type human conversational dates and see how they are translated into ISO 8601 syntax for the datetime attribute.'
  },
  {
    id: 90,
    category: 'seo_a11y',
    question: 'What is the significance of heading hierarchy (<h1> through <h6>)?',
    answer: 'Establishes a logical document outline that screen reader users use to navigate; headings should never skip levels.',
    explanation: 'Headings should never be chosen based on their default visual font sizes. Instead, they must establish a logical, nested outline of your document content. An `<h1>` is the primary topic, nested details are grouped in `<h2>` tags, subheadings in `<h3>`, and so on. Screen readers allow users to search and jump between headings; skipping heading levels (e.g. going from `<h1>` directly to `<h4>`) breaks this outline hierarchy and confuses readers.',
    codeLanguage: 'html',
    codeExample: '<!-- Correct hierarchy nesting -->\n<h1>Modern CSS Mastery</h1>\n  <h2>Grid Layouts</h2>\n    <h3>Creating Bento Layouts</h3>\n  <h2>Flexbox Tricks</h2>',
    visualId: 'heading-tree-builder',
    visualDescription: 'See a visual outline tree representation of a webpage based solely on heading levels, highlighting skipped-level errors.'
  },
  {
    id: 91,
    category: 'seo_a11y',
    question: 'Should a page have more than one <h1>?',
    answer: 'Most accessibility and SEO guidelines recommend a single, clear <h1> representing the page\'s main topic.',
    explanation: 'While the HTML5 specification technically permits multiple `<h1>` elements (such as placing an `<h1>` inside each nested `<section>` tag), modern screen reader software and search engine indexers still assume a single principal heading per document. Having only one `<h1>` represents a clear starting point for assistive readers and improves the SEO indexing profile of the page.',
    codeLanguage: 'html',
    codeExample: '<body>\n  <header>\n    <!-- One single authoritative topic header per document -->\n    <h1>The Ultimate Frontend Masterclass</h1>\n  </header>\n</body>',
    visualId: 'h1-counter-validator',
    visualDescription: 'A heading outline checker: highlight structural concerns and analyze document hierarchy structures.'
  },
  {
    id: 92,
    category: 'metadata',
    question: 'What is the difference between <script type="module"> and a regular script?',
    answer: 'Module scripts support import/export syntax, are deferred by default, and run in strict mode automatically.',
    explanation: '`<script type="module">` tells the browser that the script contains standard ES6 JavaScript modules. It unlocks native `import` and `export` commands, enabling code modularity. Additionally, module scripts automatically apply the `defer` attribute behavior (they load in parallel but delay execution until DOM parsing completes) and run in Strict Mode by default, preventing common JS errors.',
    codeLanguage: 'html',
    codeExample: '<!-- Module scripts can use native imports and are deferred automatically -->\n<script type="module">\n  import { renderApp } from "./app.js";\n  renderApp();\n</script>',
    visualId: 'module-loader-graph',
    visualDescription: 'A node import graph: click nodes to see how standard modules import dependencies dynamically in the browser.'
  },
  {
    id: 93,
    category: 'metadata',
    question: 'What is the purpose of the integrity attribute (Subresource Integrity)?',
    answer: 'Provides a cryptographic hash the browser checks against the fetched resource, ensuring CDN-hosted files haven\'t been tampered with.',
    explanation: 'Subresource Integrity (SRI) is a critical security attribute. When loading assets (like jQuery, Tailwind, or fonts) from third-party CDNs, there is a risk that the CDN could be compromised, serving malicious JavaScript. The `integrity` attribute specifies a cryptographic hash of the file. The browser downloads the file, calculates its hash, and blocks execution if the hashes do not match, neutralizing security compromises.',
    codeLanguage: 'html',
    codeExample: '<script src="https://cdn.example.com/scripts/core-3.5.js"\n        integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K..."\n        crossorigin="anonymous"></script>',
    visualId: 'sri-hash-checker',
    visualDescription: 'See a visual simulated handshake: modify files inside a CDN to trigger hash validation errors in real-time.'
  },
  {
    id: 94,
    category: 'basics',
    question: 'What is the difference between inline, internal, and external CSS?',
    answer: 'Inline is a style attribute on an element; internal is a <style> block in head; external is linked via stylesheet file.',
    explanation: 'Inline CSS is declared directly inside an HTML element opening tag (e.g. `<p style="color: red;">`), offering maximum specificity but zero maintainability. Internal CSS resides inside `<style>` tags in the `<head>` of the document, which is useful for single-file pages. External CSS links to a separate `.css` file via a `<link>` tag, allowing rules to be shared across pages and fully cached by browsers.',
    codeLanguage: 'html',
    codeExample: '<!-- Inline (Avoid unless dynamic) -->\n<p style="color: red;">Red Text</p>\n\n<!-- Internal (Single document) -->\n<style> p { color: blue; } </style>\n\n<!-- External (Recommended, cached) -->\n<link rel="stylesheet" href="styles.css">',
    visualId: 'css-specificity-pyramid',
    visualDescription: 'Drag-and-drop selector blocks to calculate specificity priority values: see how inline styles override internal and external rules.'
  },
  {
    id: 95,
    category: 'seo_a11y',
    question: 'Why is user-scalable=no in viewport meta tags an accessibility concern?',
    answer: 'It prevents low-vision users from pinching-to-zoom on mobile screens, making reading small text difficult.',
    explanation: 'Disabling user zooming using directives like `user-scalable=no`, `maximum-scale=1.0`, or `minimum-scale=1.0` in the viewport meta tag is highly discouraged. Doing so blocks users from using standard pinch-to-zoom gestures, which is a major barrier for low-vision visitors. Letting users zoom is an essential accessibility best practice.',
    codeLanguage: 'html',
    codeExample: '<!-- BAD (Accessibility barrier) -->\n<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">\n\n<!-- GOOD (Standard, accessible) -->\n<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    visualId: 'viewport-zoom-sim',
    visualDescription: 'A zoom testing environment: see how disabling zooming hinders mobile readability, and review WCAG recommendations.'
  },
  {
    id: 96,
    category: 'dom',
    question: 'What is the difference between HTML attributes and DOM properties?',
    answer: 'Attributes are the initial values defined in HTML markup (strings); properties are live JavaScript object values.',
    explanation: 'HTML attributes are defined directly in the source markup (like `value="alice"`); they remain static and are always parsed as strings. Once the page is parsed, the browser generates the DOM object. Each DOM node has properties (like `element.value`), which represent the current active state of that element in JavaScript. Typing in an input changes its live DOM `value` property, but the underlying HTML `value` attribute remains unchanged.',
    codeLanguage: 'js',
    codeExample: 'const input = document.querySelector("input");\nconsole.log(input.getAttribute("value")); // Prints the initial HTML markup string\nconsole.log(input.value); // Prints the current live typed value',
    visualId: 'attribute-vs-property',
    visualDescription: 'An interactive input tracker: type in a text box and watch how the attribute remains static while the DOM property updates.'
  },
  {
    id: 97,
    category: 'dom',
    question: 'What is the purpose of the contenteditable attribute?',
    answer: 'Makes any HTML element directly editable by the user in the browser, commonly used for rich-text editors.',
    explanation: 'Adding the `contenteditable` attribute (typically `contenteditable="true"`) to a standard element (like a `<div>`, `<p>`, or `<span>`) instructs the browser to open a cursor focus on that block, allowing visitors to type, erase, or style text. This is a crucial foundation for building modern, rich-text WYSIWYG editors inside browsers.',
    codeLanguage: 'html',
    codeExample: '<!-- Makes this specific paragraph a rich-text input -->\n<div contenteditable="true" class="rich-editor">\n  Type or edit this text directly in your browser!\n</div>',
    visualId: 'contenteditable-richtext',
    visualDescription: 'A fully functional rich-text notepad. Type in a contenteditable container and click bold/italic buttons to modify style nodes.'
  },
  {
    id: 98,
    category: 'metadata',
    question: 'What is the difference between a <script> in the head versus one just before </body>?',
    answer: 'Both block HTML parsing, but placing scripts before </body> ensures the DOM is parsed and rendered first, improving performance.',
    explanation: 'Placing synchronous script tags in the `<head>` halts DOM parsing early on, showing users a blank white screen while the script downloads. Placing scripts right before the closing `</body>` tag ensures the browser renders the page layout first. After the page is fully drawn, the browser loads and executes scripts, improving perceived performance.',
    codeLanguage: 'html',
    codeExample: '<body>\n  <h1>Ready visual contents</h1>\n  \n  <!-- Rendered first, scripts loaded and bound afterwards -->\n  <script src="interactive-handlers.js"></script>\n</body>',
    visualId: 'dom-parsing-blocker',
    visualDescription: 'A parsing timeline generator: compare first paint benchmarks of head scripts versus bottom scripts.'
  },
  {
    id: 99,
    category: 'seo_a11y',
    question: 'What HTML change would most directly improve SEO for a poorly structured page?',
    answer: 'Adding proper semantic sectioning elements, a logical heading hierarchy, descriptive image alt text, and accurate title/meta tags.',
    explanation: 'Search crawlers read webpage text. Converting layout structures from flat, generic `<div>` nests to rich semantic regions (`<header>`, `<main>`, `<article>`) allows indexers to quickly map page structure. Standardizing heading tags to construct a logical document outline further improves SEO, and descriptive alternative image text lets crawlers index graphics.',
    codeLanguage: 'html',
    codeExample: '<!-- Converting chaotic divs to a semantic document map boosts crawling indexing -->\n<main>\n  <h1>The Importance of HTML Semantics</h1>\n  <article>\n    <h2>Why Semantics Matter</h2>\n    <p>Read on...</p>\n  </article>\n</main>',
    visualId: 'seo-audit-report',
    visualDescription: 'Run a live SEO audit mockup: score page markup for head hierarchies, image alt attributes, and indexable landmarks.'
  },
  {
    id: 100,
    category: 'basics',
    question: 'How would you explain the relationship between HTML, CSS, and JavaScript?',
    answer: 'HTML is the structure (the skeleton), CSS is the appearance (the styling), and JavaScript is the interactivity (the behavior).',
    explanation: 'Think of web development like building a house. HTML acts as the framing blueprint, defining where walls, windows, and doors are placed. CSS acts as the interior design, defining wall paint, textures, and dimensions. JavaScript acts as the home automation, defining how doorbells, light switches, and electronic blinds function in response to events.',
    codeLanguage: 'html',
    codeExample: '<!-- HTML skeleton -->\n<button id="cta-btn">Click Me</button>\n\n<!-- CSS styling -->\n<style> #cta-btn { background: teal; color: #fff; } </style>\n\n<!-- JS behavior -->\n<script>\n  document.getElementById("cta-btn").addEventListener("click", () => alert("Hello!"));\n</script>',
    visualId: 'web-house-builder',
    visualDescription: 'An interactive visualization: toggle skeleton (HTML), paint (CSS), and machinery (JS) on a visual model to build a web page.'
  }
];
