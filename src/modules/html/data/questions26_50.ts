/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from '../types';

export const QUESTIONS_26_50: Question[] = [
  {
    id: 26,
    category: 'forms',
    question: 'What is the difference between <input> and <textarea>?',
    answer: '<input> is for single-line values; <textarea> supports multi-line text input.',
    explanation: 'An `<input>` element represents a single-line data control where carriage returns are stripped automatically. A `<textarea>` is a container tag (`<textarea>...</textarea>`) designed for multi-line text entries, retaining formatting like carriage returns and tabs, and supporting size adjustments (either through standard attributes `rows` and `cols` or CSS resize controls).',
    codeLanguage: 'html',
    codeExample: '<!-- Single-line text -->\n<input type="text" name="title" value="A brief title">\n\n<!-- Multi-line paragraph -->\n<textarea name="comment" rows="4" cols="50">\nWrite your paragraphs here...\n</textarea>',
    visualId: 'input-vs-textarea-demo',
    visualDescription: 'A direct side-by-side layout comparing character limitations, resizing options, and text carriage returns.'
  },
  {
    id: 27,
    category: 'forms',
    question: 'What is the purpose of the <label> element?',
    answer: 'Associates descriptive text with a form control, improving usability and required for screen reader accessibility.',
    explanation: 'The `<label>` element plays two key roles: First, it bridges descriptions with controls for screen readers so blind users know what field is selected. Second, it enlarges the clickable target area. Clicking a label activates its corresponding checkbox or radio button, which is essential for touch targets on mobile devices.',
    codeLanguage: 'html',
    codeExample: '<label>\n  <input type="checkbox" name="newsletter">\n  Subscribe to Weekly Newsletter\n</label>',
    visualId: 'label-hit-boxes',
    visualDescription: 'Toggle a hover outline showing the expanded clickable bounding box when a label is correctly tied to an input.'
  },
  {
    id: 28,
    category: 'forms',
    question: 'How do you associate a <label> with its input?',
    answer: 'Wrap the input inside the label, or use <label for="id"> matching the input\'s id attribute.',
    explanation: 'There are two main association structures: Implicit (wrapping the `<input>` directly inside the `<label>` tags) and Explicit (matching the label`s `for` attribute with the input`s literal `id` attribute). Explicit association is generally preferred as it offers absolute flexibility in CSS placements.',
    codeLanguage: 'html',
    codeExample: '<!-- Explicit Association (Recommended) -->\n<label for="usr-email">Email Address</label>\n<input type="email" id="usr-email" name="email">\n\n<!-- Implicit Association -->\n<label>Password:\n  <input type="password" name="pwd">\n</label>',
    visualId: 'label-associator-tool',
    visualDescription: 'An interactive mapper. Wire up labels and inputs and see how screen readers declare associations or break down.'
  },
  {
    id: 29,
    category: 'forms',
    question: 'What does the required attribute do on a form input?',
    answer: 'Prevents form submission until that field has a value, with built-in browser validation feedback.',
    explanation: 'The `required` attribute is a boolean validator. When present, the browser prevents the form from submitting over the network if the field is empty, automatically scrolling to the invalid input and displaying a localized validation tooltip.',
    codeLanguage: 'html',
    codeExample: '<form onsubmit="alert(\'Form submitted!\')">\n  <label for="fullname">Name *</label>\n  <input type="text" id="fullname" required>\n  <button type="submit">Submit</button>\n</form>',
    visualId: 'validation-playground',
    visualDescription: 'Try submitting a mock form with various required, min/max, or regex validation rules and see the browser-native popups.'
  },
  {
    id: 30,
    category: 'forms',
    question: 'What is the placeholder attribute, and why isn\'t it a substitute for a <label>?',
    answer: 'Shows hint text inside an empty input that disappears on typing; it is not a persistent, accessible substitute for a proper label.',
    explanation: '`placeholder` provides a visual example of the expected input. However, using placeholders in place of `<label>` tags harms accessibility: the placeholder disappears once the user types, leaving no context of what the field was; it usually has low color contrast; and screen readers do not always announce placeholders reliably.',
    codeLanguage: 'html',
    codeExample: '<!-- Good design uses BOTH a label and an optional helper placeholder -->\n<label for="dob">Date of Birth</label>\n<input type="text" id="dob" placeholder="YYYY-MM-DD">',
    visualId: 'placeholder-critic-tool',
    visualDescription: 'Simulate a user typing in a complex form with no labels vs one with labels, demonstrating how context is lost.'
  },
  {
    id: 31,
    category: 'forms',
    question: 'What is the difference between <button type="submit"> and <button type="button">?',
    answer: 'submit triggers form submission when clicked; button does not submit the form, used for custom JS-driven actions.',
    explanation: 'Inside a `<form>`, any `<button>` defaults to `type="submit"` unless defined otherwise. Clicking a submit button validates inputs and reloads the page to send request details. Conversely, `type="button"` has no default action and is used alongside JavaScript click handlers to build interactive widgets.',
    codeLanguage: 'html',
    codeExample: '<form>\n  <!-- Submits the form -->\n  <button type="submit">Save Changes</button>\n  \n  <!-- Triggers JS logic safely without submission -->\n  <button type="button" onclick="cancelAction()">Cancel</button>\n</form>',
    visualId: 'button-types-simulator',
    visualDescription: 'Observe form events in real-time. See how clicking submit fires submit handlers vs how type="button" isolates triggers.'
  },
  {
    id: 32,
    category: 'forms',
    question: 'What does the <form> element\'s action and method attributes do?',
    answer: 'action specifies the URL to send form data to; method specifies the HTTP method (GET or POST) used for submission.',
    explanation: 'The `action` attribute specifies the endpoint URL that receives the form details. The `method` specifies the HTTP request type (GET or POST) used to carry the fields. Without an explicit `action`, the form defaults to submitting to the exact same page URL.',
    codeLanguage: 'html',
    codeExample: '<form action="/api/register" method="POST">\n  <input type="text" name="username">\n  <button type="submit">Register</button>\n</form>',
    visualId: 'form-destination-diagram',
    visualDescription: 'A graphic visualization of form data packaging, headers, and destination routing upon button press.'
  },
  {
    id: 33,
    category: 'forms',
    question: 'What is the difference between GET and POST form submission?',
    answer: 'GET appends form data to the URL as query parameters; POST sends data in the request body.',
    explanation: 'GET encodes values into key-value pairs directly in the url (e.g. `?name=alice`). It is bookmarkable, but public, restricted in size, and insecure for secrets. POST packages variables inside the HTTP message request body, making it ideal for passwords, payloads, or large image files.',
    codeLanguage: 'html',
    codeExample: '<!-- GET (for search queries) -->\n<form method="GET" action="/search">\n  <input type="search" name="q">\n</form>\n\n<!-- POST (for accounts) -->\n<form method="POST" action="/login">\n  <input type="password" name="pass">\n</form>',
    visualId: 'get-vs-post-visualizer',
    visualDescription: 'Toggle between simulated GET and POST requests to see how URLs update and how request bodies are packed.'
  },
  {
    id: 34,
    category: 'forms',
    question: 'What is an <fieldset> and <legend> used for?',
    answer: 'Grouping related form controls together with a visible caption, improving both organization and accessibility.',
    explanation: '`<fieldset>` draws a visual container box grouping related inputs together (like billing addresses or payment forms). `<legend>` provides the main label for the set. Screen readers read the legend before announcing each individual input inside, making it vital for nested form groups.',
    codeLanguage: 'html',
    codeExample: '<fieldset>\n  <legend>Select Shipping Method</legend>\n  <input type="radio" id="std" name="shipping" value="standard">\n  <label for="std">Standard ($5.00)</label>\n</fieldset>',
    visualId: 'fieldset-legend-visual',
    visualDescription: 'View how styling can customize fieldset borders and see screen reader narration scripts for grouped elements.'
  },
  {
    id: 35,
    category: 'forms',
    question: 'What is the purpose of <select> and <option>?',
    answer: 'Creates a dropdown list; each <option> represents a selectable choice within it.',
    explanation: 'The `<select>` tag declares a combobox dropdown controller. Users can pick one (or multiple, if the `multiple` attribute is attached) choice from the nested `<option>` items. Grouping options is done using `<optgroup label="Label">` for clear categorizing.',
    codeLanguage: 'html',
    codeExample: '<select name="country">\n  <optgroup label="North America">\n    <option value="us">United States</option>\n    <option value="ca">Canada</option>\n  </optgroup>\n</select>',
    visualId: 'select-option-showroom',
    visualDescription: 'Experiment with single vs multiple selection dropdowns, option groups, and check selected value logs.'
  },
  {
    id: 36,
    category: 'structure',
    question: 'What is a <table> structured with, semantically?',
    answer: '<thead> for header rows, <tbody> for body rows, <tfoot> for footer rows, with <tr> (rows), <th> (header cells), and <td> (data cells).',
    explanation: 'A fully semantic HTML table separates data segments structurally. `<thead/>` houses labels, `<tbody/>` holds values, and `<tfoot/>` lists summaries. Rows are declared using `<tr>` (table row). Inside rows, labels are defined via `<th>` (table header), while content cells are placed inside `<td>` (table data).',
    codeLanguage: 'html',
    codeExample: '<table>\n  <thead>\n    <tr> <th>Product</th> <th>Price</th> </tr>\n  </thead>\n  <tbody>\n    <tr> <td>Apples</td> <td>$2.00</td> </tr>\n  </tbody>\n</table>',
    visualId: 'table-structure-builder',
    visualDescription: 'Hover or highlight code lines to color-code different sections of a table grid and see its DOM structure.'
  },
  {
    id: 37,
    category: 'structure',
    question: 'What is the scope attribute on <th> used for?',
    answer: 'Indicates whether a header cell applies to a row or column, improving screen reader table navigation.',
    explanation: 'In complex tables, cell associations are ambiguous for screen readers. The `scope` attribute explicitly connects header cells to their data blocks. Setting `scope="col"` specifies the cell titles a vertical column, while `scope="row"` associates horizontal records.',
    codeLanguage: 'html',
    codeExample: '<table>\n  <tr>\n    <th scope="col">Employee Name</th>\n    <th scope="col">Role</th>\n  </tr>\n  <tr>\n    <th scope="row">John Doe</th>\n    <td>Web Developer</td>\n  </tr>\n</table>',
    visualId: 'table-scope-highlight',
    visualDescription: 'Interactive grid: click cells to see exactly which row or column header is announced for it by screen readers.'
  },
  {
    id: 38,
    category: 'structure',
    question: 'What is the difference between <ol> and <ul>?',
    answer: '<ol> is an ordered (numbered) list; <ul> is an unordered (bulleted) list — both contain <li> items.',
    explanation: '`<ol>` represents lists where sequence order is important (like recipes or step instructions), rendering sequential numbers (1, 2, 3...) or letters. `<ul>` defines collections where order is irrelevant (like shopping lists), rendering bullet points. Both strictly accept only list item `<li>` elements as direct children.',
    codeLanguage: 'html',
    codeExample: '<!-- Ordered List -->\n<ol>\n  <li>Preheat oven</li>\n</ol>\n\n<!-- Unordered List -->\n<ul>\n  <li>Eggs</li>\n</ul>',
    visualId: 'list-types-showroom',
    visualDescription: 'Adjust list types, nesting depths, and custom CSS list-style markers to see various visual behaviors.'
  },
  {
    id: 39,
    category: 'media',
    question: 'What is the <picture> element used for?',
    answer: 'Allows specifying multiple image sources for different conditions (screen size, format), with the browser choosing the best match.',
    explanation: 'The `<picture>` element is an art-direction wrapper. It nests multiple `<source>` tags alongside an fallback `<img>` block. Media attributes evaluate screen sizes or formats (e.g., loading `.webp` or `.avif` if supported, falling back to `.jpg`), enabling responsive graphics without JavaScript resizing.',
    codeLanguage: 'html',
    codeExample: '<picture>\n  <source media="(min-width: 800px)" srcset="large.avif" type="image/avif">\n  <source media="(min-width: 400px)" srcset="medium.jpg">\n  <img src="fallback.jpg" alt="A responsive banner">\n</picture>',
    visualId: 'picture-art-direction',
    visualDescription: 'A dynamic art-direction simulator. Resize a canvas container to see which nested source is loaded at what breakpoint.'
  },
  {
    id: 40,
    category: 'media',
    question: 'What is the srcset attribute on <img> for?',
    answer: 'Provides multiple image resolutions so the browser can choose the most appropriate one based on device pixel density/viewport size.',
    explanation: 'Instead of serving oversized images to mobile devices, `srcset` defines a list of image filenames with their actual widths (using the `w` descriptor, like `image-400w.jpg 400w`). Combined with the `sizes` attribute, the browser calculates screen dimensions and fetches the smallest suitable file, saving mobile bandwidth.',
    codeLanguage: 'html',
    codeExample: '<img src="fallback.jpg"\n     srcset="small.jpg 300w, medium.jpg 800w, large.jpg 1200w"\n     sizes="(max-width: 600px) 280px, 800px"\n     alt="High performance responsive photo">',
    visualId: 'srcset-viewport-calculator',
    visualDescription: 'Calculates viewport resolution and DPR (Device Pixel Ratio) to demonstrate which image is selected from a srcset.'
  },
  {
    id: 41,
    category: 'media',
    question: 'What is lazy loading and how is it done natively in HTML?',
    answer: 'Deferring loading of off-screen images/iframes until they\'re needed; loading="lazy" attribute enables this natively.',
    explanation: 'Traditionally, browsers download all images declared in the source code immediately, delaying page loads. Adding `loading="lazy"` instructs the browser to defer fetching the image or iframe resource until it is estimated to enter the user`s viewport, accelerating initial page speeds.',
    codeLanguage: 'html',
    codeExample: '<!-- Lazy load an image -->\n<img src="heavy-graphic.jpg" loading="lazy" alt="Loaded on scroll">\n\n<!-- Lazy load an embedded map -->\n<iframe src="map-embed" loading="lazy"></iframe>',
    visualId: 'lazy-scroll-timeline',
    visualDescription: 'An interactive vertical viewport simulator. Scroll a simulated page to trigger native image downloads on overlap.'
  },
  {
    id: 42,
    category: 'media',
    question: 'What is the <iframe> element used for?',
    answer: 'Embeds another HTML document within the current page, commonly used for embedded videos, maps, or widgets.',
    explanation: '`<iframe>` (Inline Frame) partitions a segment of the screen to render a separate HTML document isolated inside its own browsing environment. This allows hosting foreign resources like YouTube clips, Google Maps, or Stripe checkout fields seamlessly within your page layout.',
    codeLanguage: 'html',
    codeExample: '<iframe src="https://example.com/embed"\n        width="600"\n        height="400"\n        title="Embedded Content">\n</iframe>',
    visualId: 'iframe-nested-sandboxing',
    visualDescription: 'Test how pages render inside an iframe. Observe the isolated frame environment and cross-origin boundaries.'
  },
  {
    id: 43,
    category: 'media',
    question: 'What is a security concern with <iframe>, and how is it mitigated?',
    answer: 'Embedding untrusted content can expose clickjacking or other attacks; the sandbox attribute restricts the iframe\'s capabilities.',
    explanation: 'Iframes load separate documents that might execute hostile JavaScript or exploit "clickjacking" (tricking users into clicking layered iframe targets). To secure them, attach the `sandbox` attribute. An empty `sandbox` blocks scripts, popups, and form submissions. Permissions can be restored selectively (e.g. `sandbox="allow-scripts"`).',
    codeLanguage: 'html',
    codeExample: '<!-- Locked down sandbox iframe -->\n<iframe src="untrusted.html"\n        sandbox="allow-scripts allow-same-origin"\n        title="Secured Frame">\n</iframe>',
    visualId: 'sandbox-flags-builder',
    visualDescription: 'Toggle sandbox flags (allow-scripts, allow-forms, etc.) and observe what actions are blocked in a simulated runtime.'
  },
  {
    id: 44,
    category: 'media',
    question: 'What is the <canvas> element used for?',
    answer: 'Provides a drawable surface for rendering graphics/animations via JavaScript (2D or WebGL contexts).',
    explanation: '`<canvas>` defines a pixel-based raster graphics board. The HTML tag itself is only a container; all painting (shapes, lines, gradients, image manipulations, and animations) is controlled dynamically using JavaScript scripts targeting the 2D or 3D WebGL context.',
    codeLanguage: 'html',
    codeExample: '<canvas id="my-board" width="200" height="200"></canvas>\n<script>\n  const canvas = document.getElementById("my-board");\n  const ctx = canvas.getContext("2d");\n  ctx.fillStyle = "blue";\n  ctx.fillRect(10, 10, 150, 150);\n</script>',
    visualId: 'canvas-doodle-pad',
    visualDescription: 'An active drawing pad. Draw lines and render simple shapes using the canvas API live in your browser.'
  },
  {
    id: 45,
    category: 'media',
    question: 'What is <svg> and how does it differ from <canvas>?',
    answer: 'SVG is a vector graphics format described in markup; Canvas is a raster/pixel-based drawing surface controlled via JS.',
    explanation: 'SVG (Scalable Vector Graphics) is written as xml nodes inside the DOM. Every SVG shape is stylable with CSS and supports standard click events. It scales infinitely without losing sharpness. Conversely, Canvas is raster-based (resizing degrades quality) and does not maintain elements in the DOM, making it faster for high-frequency rendering (like video games) but harder to style or inspect.',
    codeLanguage: 'html',
    codeExample: '<!-- SVG Vector Graphic -->\n<svg width="100" height="100">\n  <circle cx="50" cy="50" r="40" fill="teal" />\n</svg>',
    visualId: 'svg-vs-canvas-zoomer',
    visualDescription: 'Zoom in on a vector circle vs a raster canvas circle and watch how pixelation degrades the raster shape.'
  },
  {
    id: 46,
    category: 'dom',
    question: 'What is the difference between HTML entities like &amp; and raw characters?',
    answer: 'Entities represent reserved/special characters safely within markup without being misinterpreted as syntax.',
    explanation: 'Characters like `<` or `>` are part of HTML syntax. Inserting them raw can confuse the HTML parser, potentially cutting off element trees. HTML entities like `&lt;` or `&gt;` output these symbols safely. They also represent hidden or non-keyboard layout symbols (e.g. copyright `&copy;` or non-breaking space `&nbsp;`).',
    codeLanguage: 'html',
    codeExample: '<!-- Displaying actual tag code securely in a paragraph -->\n<p>Use the &lt;div&gt; tag to wrap elements.</p>\n<p>&copy; 2026 Google AI Studio</p>',
    visualId: 'entities-translator-deck',
    visualDescription: 'Type characters and watch them compile into safe HTML Entities, or paste raw code to escape it instantly.'
  },
  {
    id: 47,
    category: 'seo_a11y',
    question: 'What is the purpose of the lang attribute on <html>?',
    answer: 'Declares the page\'s primary language, aiding screen reader pronunciation and search engine understanding.',
    explanation: 'The `lang` attribute on the opening `<html>` node is critical for accessibility. It configures the pronunciation profile of screen readers, ensuring accented syllables or words are read with the correct accent. It also informs search engine spiders of content targeting for international queries.',
    codeLanguage: 'html',
    codeExample: '<html lang="es">\n  <!-- Declares this document primary language is Spanish -->\n  <body>Hola Mundo!</body>\n</html>',
    visualId: 'lang-audio-accent-demo',
    visualDescription: 'Switch lang tags (en, fr, es, de) to see simulated speech synthesis changes for identical written text.'
  },
  {
    id: 48,
    category: 'seo_a11y',
    question: 'What is a common accessibility issue with using <div> for clickable elements?',
    answer: 'Divs aren\'t natively focusable/keyboard-operable and lack an implicit role, so screen readers and keyboard users cannot easily interact with them.',
    explanation: 'Unlike a `<button>`, a `<div>` cannot be reached using the keyboard Tab key, is ignored by assistive technologies looking for actionable elements, and does not trigger on Enter or Space keys. Fixing it requires adding `tabindex="0"`, `role="button"`, and custom keyboard keydown handlers, making the native `<button>` element far simpler and safer.',
    codeLanguage: 'html',
    codeExample: '<!-- Bad: Div clicker has poor accessibility -->\n<div onclick="doSomething()">Click Me</div>\n\n<!-- Good: Button is fully accessible out of the box -->\n<button type="button" onclick="doSomething()">Click Me</button>',
    visualId: 'div-clicker-simulator',
    visualDescription: 'Keyboard test: Attempt to trigger click actions on a plain div clicker vs a native button using only keyboard keys.'
  },
  {
    id: 49,
    category: 'seo_a11y',
    question: 'What is the purpose of tabindex="0" vs tabindex="-1"?',
    answer: '0 includes the element in the natural keyboard tab order; -1 makes it programmatically focusable but excludes it from tab sequences.',
    explanation: '`tabindex="0"` allows non-focusable elements (like generic `<divs>`) to join the tab sequence. `tabindex="-1"` removes an element from sequential keyboard navigation, but still lets you focus it via JavaScript `element.focus()`. Positive values like `tabindex="3"` should be avoided as they scramble natural document tab flow.',
    codeLanguage: 'html',
    codeExample: '<!-- Focusable via keyboard -->\n<div tabindex="0">Tab target</div>\n\n<!-- Focusable only via JavaScript -->\n<dialog id="modal" tabindex="-1">Popup</dialog>',
    visualId: 'tabindex-navigator-map',
    visualDescription: 'Tab your way through a list of elements containing negative, zero, and positive tabindex attributes to map keyboard flow.'
  },
  {
    id: 50,
    category: 'seo_a11y',
    question: 'What are ARIA roles/attributes, briefly?',
    answer: 'Attributes supplementing HTML semantics for assistive technology when native elements cannot represent the state or behavior.',
    explanation: 'ARIA (Accessible Rich Internet Applications) attributes (such as `role`, `aria-expanded`, and `aria-live`) provide supplemental descriptions to screen readers. They are critical for declaring dynamic layouts (like active disclosure drawers or live alert widgets) that plain, static HTML semantic structures cannot explain natively.',
    codeLanguage: 'html',
    codeExample: '<!-- Explains to screen reader that this expands/collapses -->\n<button aria-expanded="false" aria-controls="faq-answer">FAQ</button>\n<div id="faq-answer" class="hidden">Answer text</div>',
    visualId: 'aria-inspector-tool',
    visualDescription: 'Toggle interactive widget states and inspect how screen readers hear changes in real-time through the ARIA tree.'
  }
];
