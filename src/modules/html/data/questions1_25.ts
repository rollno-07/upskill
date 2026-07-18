/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from '../types';

export const QUESTIONS_1_25: Question[] = [
  {
    id: 1,
    category: 'basics',
    question: 'What is HTML?',
    answer: 'HyperText Markup Language — the standard markup language for structuring content on the web.',
    explanation: 'HTML is the structural backbone of any webpage. It uses a series of tags to define elements like headers, paragraphs, links, and forms. Browsers read these tags and render the structural elements accordingly.',
    codeLanguage: 'html',
    codeExample: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Basic Document</title>\n</head>\n<body>\n  <h1>Welcome to Web Dev</h1>\n  <p>This is a structured page.</p>\n</body>\n</html>',
    visualId: 'html-basics-diagram',
    visualDescription: 'Learn how HTML elements nested inside a parent-child DOM tree form a visual tree of elements rendered by the browser.'
  },
  {
    id: 2,
    category: 'basics',
    question: 'What is the DOCTYPE declaration for?',
    answer: 'Tells the browser which version of HTML to use for rendering; <!DOCTYPE html> declares HTML5.',
    explanation: 'The `<!DOCTYPE html>` declaration is not an HTML tag; it is an instruction to the web browser about what version of HTML the page is written in. In the past, older versions required long references to DTDs (Document Type Definitions). In HTML5, it was simplified to `<!DOCTYPE html>`. Skipping it triggers "Quirks Mode", causing the browser to render the page in a legacy, non-standard compliance mode.',
    codeLanguage: 'html',
    codeExample: '<!DOCTYPE html>\n<!-- Tells browser to use modern HTML5 rendering engines instead of quirks mode -->\n<html>\n  ...\n</html>',
    visualId: 'doctype-visualizer',
    visualDescription: 'Toggle between Standards Mode and Quirks Mode to see how old CSS and document layout engines render headers and borders differently.'
  },
  {
    id: 3,
    category: 'basics',
    question: 'What is the difference between HTML elements and tags?',
    answer: 'A tag is the markup syntax (<p>); an element is the tag plus its content and closing tag (<p>text</p>).',
    explanation: 'Tags are the angled brackets (`<p>`, `</p>`) used to declare boundaries of elements. An element is the complete component representing a nodes in the DOM, including the opening tag, closing tag, attributes, and any inner content or nested child elements.',
    codeLanguage: 'html',
    codeExample: '<!-- Tag is: <p> and </p> -->\n<!-- Element is: <p class="intro">This whole paragraph is the element</p> -->\n<p class="intro">This whole paragraph is the element</p>',
    visualId: 'tag-vs-element',
    visualDescription: 'An interactive anatomy builder of an HTML element highlighting tag brackets, attributes, and inner content.'
  },
  {
    id: 4,
    category: 'basics',
    question: 'What is semantic HTML?',
    answer: 'Using elements according to their meaning (<article>, <nav>, <header>) rather than generic containers, improving accessibility and SEO.',
    explanation: 'Semantic HTML uses tags that explain their content structure. For instance, `<nav>` represents navigation, while `<div>` is neutral. Semantic tags help search engine crawlers map page content (SEO) and assist screen readers in summarizing sections for blind or low-vision users.',
    codeLanguage: 'html',
    codeExample: '<!-- Semantic (Good) -->\n<header>\n  <nav>\n    <a href="/">Home</a>\n  </nav>\n</header>\n\n<!-- Non-semantic (Avoid) -->\n<div class="header">\n  <div class="nav">\n    <a href="/">Home</a>\n  </div>\n</div>',
    visualId: 'semantic-structure',
    visualDescription: 'Compare a page built with standard Div layouts vs Semantic elements to see how screen readers digest structural sections.'
  },
  {
    id: 5,
    category: 'basics',
    question: 'What are void/self-closing elements?',
    answer: 'Elements with no content/closing tag, like <img>, <br>, <input>, <hr>.',
    explanation: 'Void elements are elements that cannot have any child nodes or text content inside. Therefore, they do not need a closing tag (such as `</img>`). In HTML5, adding a trailing slash like `<img />` is optional and purely stylistic (often a remnant from XHTML days), while plain `<img>` is completely valid and standard.',
    codeLanguage: 'html',
    codeExample: '<img src="photo.jpg" alt="A scenic view">\n<br>\n<input type="text" name="username">\n<hr>',
    visualId: 'void-elements-inspector',
    visualDescription: 'Explore the internal structure of void elements vs container elements to understand parsing boundaries.'
  },
  {
    id: 6,
    category: 'basics',
    question: 'What is the difference between <div> and <span>?',
    answer: '<div> is a block-level generic container; <span> is an inline generic container.',
    explanation: '`<div>` is block-level, starting on its own line and occupying 100% of the horizontal space of its parent. `<span>` is inline, flowing within text content without introducing line breaks and wrapping only its exact content width.',
    codeLanguage: 'html',
    codeExample: '<div>\n  <p>This paragraph is wrapped in a block-level container.</p>\n</div>\n<p>This text has a <span style="color: red;">red inline span</span> highlighting some terms.</p>',
    visualId: 'div-vs-span-demo',
    visualDescription: 'A responsive layout box showing real-time text flows when elements are switched between div containers and inline span highlighting.'
  },
  {
    id: 7,
    category: 'basics',
    question: 'What is the difference between block-level and inline elements?',
    answer: 'Block-level elements start on a new line and take full available width; inline elements flow within text and only take needed width.',
    explanation: 'Block-level elements (`<div>`, `<p>`, `<h1>`) create a structural block, pushing content after them to a new line. Inline elements (`<a>`, `<strong>`, `<span>`) sit alongside other inline contents and only size to fit their exact contents. Changing this behavior is done in CSS via `display: block`, `display: inline`, or `display: inline-block`.',
    codeLanguage: 'html',
    codeExample: '<!-- Block -->\n<h2>Section Header</h2>\n<p>Pushes next lines downwards.</p>\n\n<!-- Inline -->\n<a href="#">Link</a>\n<strong>Bold word</strong>',
    visualId: 'block-vs-inline-playground',
    visualDescription: 'Drag-and-drop elements to stack them and observe live how margin/padding values affect block vs inline rendering.'
  },
  {
    id: 8,
    category: 'structure',
    question: 'What are the main sectioning elements in HTML5?',
    answer: '<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>.',
    explanation: 'HTML5 introduced semantic sectioning elements to divide layout segments. `<header>` encloses masthead branding, `<nav>` wraps links, `<main>` holds unique core content, `<section>` wraps thematic groupings, `<article>` represents modular self-contained text, `<aside>` covers sidebars/callouts, and `<footer>` contains legal/contact elements.',
    codeLanguage: 'html',
    codeExample: '<body>\n  <header>Site Logo</header>\n  <nav><a href="#">Home</a></nav>\n  <main>\n    <article>\n      <h2>Article Heading</h2>\n      <p>Body text</p>\n    </article>\n  </main>\n  <aside>Ad widget</aside>\n  <footer>Copyright 2026</footer>\n</body>',
    visualId: 'sectioning-layout-builder',
    visualDescription: 'Arrange sectioning blocks visually to build a modern responsive wireframe showing proper parent-child element semantic nesting.'
  },
  {
    id: 9,
    category: 'structure',
    question: 'What is the difference between <section> and <article>?',
    answer: '<article> is self-contained, independently distributable content; <section> groups thematically related content within a page, not necessarily standalone.',
    explanation: 'An `<article>` is an independent piece of content that could theoretically be syndicatable elsewhere (like a blog post, forum card, or news item) without context of the rest of the page. A `<section>` is a generic chunk grouping related items (e.g., an "About Us" section or "Product Features" section) within a page, usually with a heading.',
    codeLanguage: 'html',
    codeExample: '<!-- Good use of Article nested in Section -->\n<section id="blog-feed">\n  <h1>Recent Updates</h1>\n  <article>\n    <h2>HTML5 Secrets</h2>\n    <p>Read about section tags...</p>\n  </article>\n</section>',
    visualId: 'section-vs-article-explorer',
    visualDescription: 'An interactive toggle showcasing syndication models - test if content is independent enough to qualify as an article.'
  },
  {
    id: 10,
    category: 'structure',
    question: 'What is the <main> element for?',
    answer: 'Marks the primary content of the page, unique per page, aiding accessibility navigation (screen readers can jump directly to it).',
    explanation: 'The `<main>` element outlines the core content of the body that is unique to this document. It must not contain content that is repeated across pages, such as navigation bar links, copyright footer elements, or site logos. There can only be one visible `<main>` element per document, providing a crucial "skip navigation" anchor for assistive technologies.',
    codeLanguage: 'html',
    codeExample: '<body>\n  <nav>Global navigation links</nav>\n  <main id="main-content">\n    <h1>Page Specific Title</h1>\n    <p>Unique page content goes here...</p>\n  </main>\n</body>',
    visualId: 'main-accessibility-anchor',
    visualDescription: 'Simulate screen reader landmark navigation. See how users with screen readers skip direct to the main content.'
  },
  {
    id: 11,
    category: 'attributes',
    question: 'What is an attribute in HTML?',
    answer: 'Additional information on an element, written as name="value" inside the opening tag (e.g. src, href, class).',
    explanation: 'Attributes configure elements or modify their behavior. They are declared in the opening tag of an element, as key-value pairs (e.g. `charset="UTF-8"`). Some attributes are global (applicable to all elements, like `id`, `class`, `style`, `tabindex`), while others are specific to certain elements (like `href` for anchors, `src` for images).',
    codeLanguage: 'html',
    codeExample: '<a href="https://google.com" target="_blank" class="primary-btn">Visit Google</a>',
    visualId: 'attributes-demo-panel',
    visualDescription: 'Add, remove, or modify elements and their corresponding attributes on-the-fly and inspect the rendered result.'
  },
  {
    id: 12,
    category: 'attributes',
    question: 'What is the alt attribute for on images?',
    answer: 'Provides alternative text for screen readers and for when the image fails to load — critical for accessibility.',
    explanation: 'The `alt` (alternative text) attribute is highly important for web accessibility. It is read aloud by screen readers, helping visually impaired visitors understand the meaning of images. Additionally, if the image link breaks or network loads fail, the browser renders the `alt` string in its place.',
    codeLanguage: 'html',
    codeExample: '<img src="chart.png" alt="Graph showing HTML5 adoption rates rising from 2010 to 2026.">',
    visualId: 'alt-text-sim',
    visualDescription: 'Disable images or simulate screen reader readouts to see the visual and accessibility difference of proper descriptive alt attributes.'
  },
  {
    id: 13,
    category: 'attributes',
    question: 'When should alt be empty (alt="")?',
    answer: 'For purely decorative images that convey no meaningful content, so screen readers skip them.',
    explanation: 'If an image is purely cosmetic (e.g. decorative borders, background squiggles, or icon duplicates of nearby textual labels), the image should contain an empty alt string (`alt=""`). This informs screen readers to skip the element, avoiding redundant reading loops or reading aloud file URLs.',
    codeLanguage: 'html',
    codeExample: '<!-- Decorative icon next to text link -->\n<a href="/settings">\n  <img src="gear.svg" alt="" width="16">\n  Manage Settings\n</a>',
    visualId: 'decorative-alt-simulator',
    visualDescription: 'Review screen reader mock audio streams when using alt="" vs missing alt attributes on decorative widgets.'
  },
  {
    id: 14,
    category: 'attributes',
    question: 'What is the difference between id and class attributes?',
    answer: 'id uniquely identifies a single element on the page; class can be applied to multiple elements for shared styling/behavior.',
    explanation: 'An `id` must be completely unique per page; no two elements should share the same `id`. This makes it ideal for jump link anchors or specific JS selection targets. Conversely, a `class` can be reused on any number of elements, grouping them together for uniform CSS styling or selection groups in JS queries.',
    codeLanguage: 'html',
    codeExample: '<div id="featured-card" class="card active border-gold">\n  <p class="card-text">Only one featured-card exists, but many share the card style.</p>\n</div>',
    visualId: 'id-vs-class-playground',
    visualDescription: 'Apply styles via id selectors vs class selectors to understand precedence, inheritance, and specificity rules.'
  },
  {
    id: 15,
    category: 'attributes',
    question: 'What is the data-* attribute used for?',
    answer: 'Custom data attributes for storing extra information on an element, accessible via JS (element.dataset.xyz) without affecting rendering.',
    explanation: '`data-*` attributes allow storing custom, private metadata directly inside standard HTML tags without relying on non-standard behaviors or custom class hacks. They are easily read and edited via JavaScript using the element`s `dataset` object, or targeted in CSS styling via attribute selectors.',
    codeLanguage: 'html',
    codeExample: '<div id="product" data-item-id="452" data-category="electronics">Smart Watch</div>\n<script>\n  const div = document.getElementById("product");\n  console.log(div.dataset.itemId); // Prints "452"\n</script>',
    visualId: 'data-attribute-visualizer',
    visualDescription: 'Interact with data attributes to filter elements on-screen using pure CSS selectors or read dataset values live in JS console logs.'
  },
  {
    id: 16,
    category: 'attributes',
    question: 'What is the difference between <a> with href="#" vs a <button>?',
    answer: '<a> should navigate somewhere; using it purely for click actions without navigation is a semantic misuse — a <button> is more appropriate.',
    explanation: 'Anchors (`<a>`) are designed to navigate across URLs or anchor sections on a page. Buttons (`<button>`) are designed to trigger actions (like submitting form details, opening modals, or altering application states). Using an anchor tag for JS click events is poor practice and breaks keyboard focus expectations unless extensive ARIA adjustments are retrofitted.',
    codeLanguage: 'html',
    codeExample: '<!-- Good: Button triggers action -->\n<button type="button" onclick="openModal()">Open Modal</button>\n\n<!-- Good: Link navigates -->\n<a href="/pricing">View Pricing Plans</a>',
    visualId: 'link-vs-button-tabindex',
    visualDescription: 'Test keyboard focus navigation (using Tab and Spacebar/Enter keys) to see how buttons and links behave under accessibility expectations.'
  },
  {
    id: 17,
    category: 'attributes',
    question: 'What does the target="_blank" attribute do on a link?',
    answer: 'Opens the link in a new browser tab/window.',
    explanation: 'The `target` attribute specifies where the linked document should open. Setting it to `_blank` directs the client to spawn a clean browsing context (tab or window). Other options include `_self` (same tab, default), `_parent` (parent frame), or `_top` (breaks out of all frames to full tab).',
    codeLanguage: 'html',
    codeExample: '<a href="https://wikipedia.org" target="_blank">Open Wiki in New Tab</a>',
    visualId: 'target-frames-simulator',
    visualDescription: 'Visualize visual frames and nested layout hierarchies to see where self, blank, parent, and top render links.'
  },
  {
    id: 18,
    category: 'attributes',
    question: 'Why should target="_blank" be paired with rel="noopener noreferrer"?',
    answer: 'Prevents the new page from accessing window.opener (a security risk) and avoids leaking referrer information.',
    explanation: 'When target `_blank` is utilized, the newly loaded page gets full access to the spawning window through `window.opener`. This is a classic "reverse-tabnabbing" vulnerability where a malicious landing page can change the user`s original tab to a realistic phishing page. `noopener` breaks this connection, while `noreferrer` additionally blocks sending the referrer header.',
    codeLanguage: 'js',
    codeExample: '// In modern browsers, target="_blank" implicitly applies rel="noopener"\n// but explicit declaration is required for supporting older browsers.\n<a href="https://external-site.com" target="_blank" rel="noopener noreferrer">Secure External Link</a>',
    visualId: 'tabnabbing-visualizer',
    visualDescription: 'See a visual animated simulation of a malicious tab manipulating its opening tab, and how noopener blocks this exploit.'
  },
  {
    id: 19,
    category: 'metadata',
    question: 'What is the <meta> tag used for?',
    answer: 'Provides metadata about the document — character encoding, viewport settings, description for SEO, social sharing tags.',
    explanation: '`<meta>` tags are placed inside the `<head>` of HTML documents. They provide metadata (structured details about the page) which isn`t rendered to viewers, but is digested by web browsers, search indexers, and social platforms. This includes charset declarations, description keywords, viewport scaling, and Open Graph tags.',
    codeLanguage: 'html',
    codeExample: '<head>\n  <meta name="description" content="Master HTML with these 100 Q&As.">\n  <meta name="keywords" content="HTML, Interview, Web Development">\n</head>',
    visualId: 'metadata-card-builder',
    visualDescription: 'Fill out SEO meta fields and preview in real-time how search engines or message apps (Twitter, Discord) construct previews.'
  },
  {
    id: 20,
    category: 'metadata',
    question: 'What does <meta charset="UTF-8"> do?',
    answer: 'Specifies the character encoding, ensuring text (including special characters) displays correctly.',
    explanation: 'This tag defines the character set encoding used by the page. UTF-8 (Unicode) is the universal encoding standard for modern websites, supporting almost all written languages, math scripts, and modern emojis. Declaring this prevents "mojibake" (garbled text where symbols like `` appear instead of accented letters). It should be defined near the very top of `<head>` to avoid double-parsing the document.',
    codeLanguage: 'html',
    codeExample: '<head>\n  <!-- Declare immediately at top of head -->\n  <meta charset="UTF-8">\n</head>',
    visualId: 'mojibake-demonstration',
    visualDescription: 'Toggle character encodings (UTF-8 vs ASCII or ISO) to see how accents and special emojis break into corrupt symbols.'
  },
  {
    id: 21,
    category: 'metadata',
    question: 'What does the viewport meta tag do?',
    answer: 'Controls how the page is scaled/sized on mobile devices, essential for responsive design.',
    explanation: 'By default, legacy mobile devices render pages at a desktop scale (often 980px) and zoom out, making content tiny. The viewport meta tag tells the device to scale the layout viewport to match the actual device width (`width=device-width`) and set initial zoom proportions (`initial-scale=1.0`), unlocking mobile-responsive stylesheet rules.',
    codeLanguage: 'html',
    codeExample: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    visualId: 'viewport-width-simulator',
    visualDescription: 'Resize a simulated phone screen and toggle the viewport tag to see the difference between responsive layout and scaled desktop views.'
  },
  {
    id: 22,
    category: 'metadata',
    question: 'What is the difference between <script>, <script async>, and <script defer>?',
    answer: 'Plain <script> blocks HTML parsing until downloaded and executed; async downloads in parallel and executes immediately; defer downloads in parallel but executes only after HTML parsing completes.',
    explanation: 'A regular script pauses HTML DOM tree parsing immediately, downloads the file, runs it, and then continues HTML parsing. `async` fetches scripts in parallel with parsing but interrupts parsing to execute immediately once loaded (order is unpredictable). `defer` downloads script files in parallel and guarantees they run in order only after DOM tree parsing has been fully completed.',
    codeLanguage: 'html',
    codeExample: '<!-- Blocks parsing -->\n<script src="normal.js"></script>\n\n<!-- Non-blocking, executes immediately on download -->\n<script async src="analytics.js"></script>\n\n<!-- Non-blocking, executes after DOM is fully parsed -->\n<script defer src="main-app.js"></script>',
    visualId: 'script-loading-timeline',
    visualDescription: 'An interactive timeline! Hit play to watch simulated tracks of parsing, network download, and JS runtime execution interact.'
  },
  {
    id: 23,
    category: 'metadata',
    question: 'Where should <script> tags typically be placed and why?',
    answer: 'Traditionally before </body> to avoid blocking rendering, though defer in the <head> achieves the same benefit.',
    explanation: 'Placing plain scripts at the bottom of the body ensures that all visual elements above have already been parsed and rendered, avoiding white-screen delays. However, with HTML5, the standard recommendation is to place scripts inside the `<head>` tag while attaching the `defer` attribute. This allows browsers to start fetching scripts over the network immediately, but delay execution safely until DOM parsing completes.',
    codeLanguage: 'html',
    codeExample: '<head>\n  <!-- Preferred modern approach: fetched early, run late -->\n  <script defer src="script.js"></script>\n</head>',
    visualId: 'script-placement-diagram',
    visualDescription: 'Compare network waterfalls and First Contentful Paint benchmarks under different script tag placement arrangements.'
  },
  {
    id: 24,
    category: 'metadata',
    question: 'What is the difference between <link> and <a>?',
    answer: '<link> is used in the document head to link external resources (stylesheets, icons); <a> creates a clickable hyperlink in the content.',
    explanation: 'The `<link>` tag is a non-visual metadata tag placed strictly inside the `<head>` that specifies relationships to auxiliary files (like stylesheets, webfonts, and icons). The `<a>` (anchor) tag is a visible, structural inline-block element placed within the document body to create a user-clickable navigation link to another resource.',
    codeLanguage: 'html',
    codeExample: '<head>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <p>Read our <a href="/about">About Us</a> page.</p>\n</body>',
    visualId: 'link-vs-anchor-inspector',
    visualDescription: 'Learn the architectural boundary separating document relationships (link) from user interactive pathways (anchor).'
  },
  {
    id: 25,
    category: 'forms',
    question: 'What are the common HTML form input types?',
    answer: 'text, email, password, number, checkbox, radio, date, file, submit, and more.',
    explanation: 'The `<input>` tag uses the `type` attribute to define its visual rendering and verification mechanics. For example, `type="number"` brings up numerical keyboards on mobile and blocks letters, while `type="email"` supports native email regex filters. Modern inputs include fields like `color`, `range`, `datetime-local`, and `tel`.',
    codeLanguage: 'html',
    codeExample: '<input type="email" placeholder="user@example.com">\n<input type="password" required>\n<input type="range" min="1" max="100">',
    visualId: 'form-inputs-showroom',
    visualDescription: 'An interactive form control tester. Try typing or altering fields to witness the native validation and mobile keyboard profiles.'
  }
];
