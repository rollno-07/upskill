import { Question } from '../types';

export const domBrowserAdvQuestions: Question[] = [
  {
    id: 36,
    question: "What is event delegation?",
    answer: "Event delegation is a design pattern of attaching a single event listener to a common parent element rather than attaching individual event listeners to multiple child elements. It leverages 'event bubbling' — events on children bubble up to the parent. In the parent handler, you check event.target to identify which child triggered the action. This saves significant memory and handles dynamically added children automatically.",
    category: "dom_browser_adv",
    difficulty: "Medium",
    codeExample: `// Attach one listener to the parent list
const list = document.querySelector("#user-list");

list.addEventListener("click", function(event) {
  // Check if click was on a button
  if (event.target.tagName === "BUTTON") {
    console.log("Clicked item: " + event.target.dataset.id);
  }
});`,
    explanationSteps: [
      "Instead of adding 1,000 listeners, add 1 listener to the container.",
      "Events bubble up the DOM from target element to parent.",
      "Check event.target to filter matching elements."
    ],
    playgroundCode: `// Conceptual check of delegation logic
const mockEvent = { target: { tagName: "BUTTON", id: "btn-4" } };
if (mockEvent.target.tagName === "BUTTON") {
  console.log("Delegation triggered on child: " + mockEvent.target.id);
}`
  },
  {
    id: 37,
    question: "What is event bubbling vs capturing?",
    answer: "Bubbling and capturing describe the two phases of event propagation in the browser DOM. When an event fires, it first flows down from the window root to the target element (Capturing Phase), fires on the target itself (Target Phase), and then bubbles back up from the target back to the window root (Bubbling Phase). By default, addEventListener listens in the bubbling phase, but setting the third parameter to true (or { capture: true }) switches it to the capturing phase.",
    category: "dom_browser_adv",
    difficulty: "Medium",
    codeExample: `const parent = document.querySelector("#parent");
const child = document.querySelector("#child");

// Bubbling (default)
child.addEventListener("click", () => console.log("Child Bubbled"));
parent.addEventListener("click", () => console.log("Parent Bubbled"));

// Capturing (third arg is true)
parent.addEventListener("click", () => console.log("Parent Captured"), true);`,
    explanationSteps: [
      "Phase 1: Capturing - flow travels downwards through ancestors.",
      "Phase 2: Target - matches active target.",
      "Phase 3: Bubbling - flow travels upwards (triggers standard parent event listeners)."
    ],
    playgroundCode: `console.log("Default propagation: Bubbling");`
  },
  {
    id: 38,
    question: "How do you stop event propagation?",
    answer: "You stop an event from continuing its journey up or down the DOM tree by calling the event.stopPropagation() method inside an event handler. This prevents any other listeners on parent/ancestor elements from triggering, but does not stop other listeners on the *same* element (use event.stopImmediatePropagation() for that).",
    category: "dom_browser_adv",
    difficulty: "Easy",
    codeExample: `button.addEventListener("click", function(event) {
  event.stopPropagation(); // Bubbling stops here!
  console.log("Button clicked!");
});

// This listener on body will NOT trigger on button click
document.body.addEventListener("click", () => {
  console.log("Body clicked!");
});`,
    explanationSteps: [
      "An event fires on a target element.",
      "Call event.stopPropagation().",
      "Propagation halts; parents receive no notification."
    ],
    playgroundCode: `console.log("stopPropagation() prevents bubbling to ancestor nodes.");`
  },
  {
    id: 39,
    question: "How do you prevent a default browser action (like form submit)?",
    answer: "You prevent default browser actions (such as a form refreshing the page upon submit or an anchor tag navigating to a new URL) by calling the event.preventDefault() method inside your event handler. This stops the native browser behavior while still allowing the event to propagate normally.",
    category: "dom_browser_adv",
    difficulty: "Easy",
    codeExample: `const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // Page will not refresh!
  
  // Custom JS submission/AJAX logic goes here
  console.log("Submitting form asynchronously...");
});`,
    explanationSteps: [
      "The event is intercepted early in the handler.",
      "Calling event.preventDefault() flags the event.",
      "The browser skips executing its default UI actions for this trigger."
    ],
    playgroundCode: `console.log("preventDefault() blocks native actions like page reloads.");`
  },
  {
    id: 44,
    question: "What is a module in JS (ES Modules)?",
    answer: "An ES Module (ESM) is a self-contained file with its own private scope. Variables and functions defined in a module are hidden from other files unless explicitly exported using the 'export' keyword. Modules are imported into other files using 'import' statements. ES Modules are evaluated statically at load time, run in strict mode automatically, and support features like tree-shaking.",
    category: "dom_browser_adv",
    difficulty: "Easy",
    codeExample: `// math.js
export const add = (a, b) => a + b;
export const PI = 3.14;

// app.js
import { add, PI } from "./math.js";
console.log(add(5, PI));`,
    explanationSteps: [
      "Every module has its own lexical environment.",
      "Use 'export' to declare exposed public references.",
      "Use 'import' to resolve dependent modules cleanly, preventing global namespace pollution."
    ],
    playgroundCode: `console.log("ES Modules support static 'import' / 'export' protocols.");`
  },
  {
    id: 45,
    question: "Difference between CommonJS (require) and ES Modules (import)?",
    answer: "CommonJS (CJS) is the module system traditional to Node.js; it uses require() and module.exports, loads modules synchronously, is evaluated at runtime, and does not support tree-shaking easily. ES Modules (ESM) is the official browser/modern JS standard; it uses import/export, is statically analyzed at compile time, supports asynchronous loading, and allows tree-shaking.",
    category: "dom_browser_adv",
    difficulty: "Medium",
    codeExample: `// CommonJS (Node.js traditional)
const fs = require("fs");
module.exports = { greet };

// ES Modules (Modern Standard)
import fs from "fs";
export { greet };`,
    explanationSteps: [
      "CommonJS runs during active execution (dynamic, can put require inside if-statements).",
      "ES Modules are linked before compilation (static, must be top-level imports).",
      "Modern node supports ESM using 'type': 'module' in package.json."
    ],
    playgroundCode: `console.log("CJS: require() / ESM: import");`
  },
  {
    id: 46,
    question: "What is tree-shaking?",
    answer: "Tree-shaking is a form of dead-code elimination used by modern bundlers (like Webpack, Rollup, or Vite). It removes unused exported code from the final production bundle. It is made possible because of ES Modules' static syntax (import/export statements are statically analyzed before code runs), which allows bundlers to safely trace which exports are actually referenced in the dependency tree.",
    category: "dom_browser_adv",
    difficulty: "Medium",
    codeExample: `// utils.js
export function usedHelper() { return "Used"; }
export function deadCode() { return "Never imported!"; }

// main.js
import { usedHelper } from "./utils.js";
// Bundler will shake out 'deadCode' and exclude it from the built file!`,
    explanationSteps: [
      "Bundler builds a static tree of all import paths.",
      "Identifies exported functions with zero active references.",
      "Prunes unreferenced methods from final build to reduce bundle size."
    ],
    playgroundCode: `console.log("Tree-shaking: dead-code elimination.");`
  },
  {
    id: 49,
    question: "What is a generator function?",
    answer: "A generator function is a special type of function that can pause its execution mid-way and resume later from where it was paused. It is declared using the function* syntax and uses the 'yield' keyword to return a sequence of values lazily on demand. Calling a generator function does not run its body immediately; instead, it returns an Iterator object.",
    category: "dom_browser_adv",
    difficulty: "Hard",
    codeExample: `function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2`,
    explanationSteps: [
      "Declare generator using function* syntax.",
      "Calling the generator creates a Generator Iterator object.",
      "Calling next() resumes execution until the engine hits 'yield value'.",
      "Returns object { value, done: false }."
    ],
    playgroundCode: `function* steps() {
  yield "Step A";
  yield "Step B";
}
const g = steps();
console.log(g.next());
console.log(g.next());`
  },
  {
    id: 50,
    question: "What is an iterator?",
    answer: "An iterator is an object that implements the Iterator Protocol by providing a next() method. This next() method must return an object with two properties: value (the next value in the sequence) and done (a boolean indicating whether the sequence has finished). Any object with Symbol.iterator defined is an 'iterable' and can be looped with for...of.",
    category: "dom_browser_adv",
    difficulty: "Hard",
    codeExample: `// Custom Iterator
const customRange = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    return {
      next: () => {
        if (current <= this.to) {
          return { value: current++, done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

for (let num of customRange) {
  console.log(num); // Prints 1, then 2, then 3
}`,
    explanationSteps: [
      "Iterables define the Symbol.iterator method.",
      "Symbol.iterator returns an object containing a next() method.",
      "for...of calls next() repeatedly until done is true."
    ],
    playgroundCode: `const it = [10][Symbol.iterator]();
console.log(it.next());`
  },
  {
    id: 72,
    question: "What is the difference between localStorage, sessionStorage, and cookies?",
    answer: "These are the main options for client-side storage. localStorage has a 5-10MB limit and persists permanently until manually cleared. sessionStorage has a 5MB limit and clears automatically when the browser tab is closed. Cookies are limited to 4KB, are sent automatically with every HTTP request, and can be configured with secure flags and expiration dates for authentication.",
    category: "dom_browser_adv",
    difficulty: "Medium",
    codeExample: `// localStorage (permanent tab survival)
localStorage.setItem("theme", "dark");

// sessionStorage (wiped on tab closure)
sessionStorage.setItem("session_key", "xyz123");

// Cookie (sent to backend on API calls)
document.cookie = "username=John; max-age=3600; secure";`,
    explanationSteps: [
      "localStorage maintains data long-term.",
      "sessionStorage bounds data to active tab context.",
      "Cookies route authentication tokens via request headers."
    ],
    playgroundCode: `console.log("Types of storage: local, session, cookie");`
  },
  {
    id: 77,
    question: "What is the difference between synchronous recursion and iteration performance-wise?",
    answer: "Recursion is a pattern where a function calls itself, which adds a new frame stack element on the Call Stack for every call, presenting a risk of exceeding the stack size ('Stack Overflow') on deep iterations. Iteration uses standard loops (for, while) within a single execution stack frame, which is faster, uses O(1) memory space, and avoids function-call overhead.",
    category: "dom_browser_adv",
    difficulty: "Medium",
    codeExample: `// Recursion (clean, but consumes stack memory)
function recursiveSum(n) {
  if (n <= 1) return n;
  return n + recursiveSum(n - 1);
}

// Iteration (safer, faster)
function iterativeSum(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}`,
    explanationSteps: [
      "Recursive calls push frames to Call Stack LIFO.",
      "Deep recursive calls hit browser Call Stack limit (usually 10,000 frames).",
      "Iteration recycles a single Call Stack frame, mutating local variables."
    ],
    playgroundCode: `const rec = (n) => n === 1 ? 1 : n * rec(n - 1);
console.log("Factorial recursive:", rec(5));`
  },
  {
    id: 91,
    question: "What is a template literal?",
    answer: "Introduced in ES6, template literals are string literals delimited by backticks (\`) instead of single/double quotes. They enable multi-line strings, string interpolation via embedded expressions using ${expression} syntax, and the creation of tagged template functions.",
    category: "dom_browser_adv",
    difficulty: "Easy",
    codeExample: `const name = "Alice";
const task = "code";

// 1. String interpolation
const greeting = \`Hello, \${name}! Time to \${task}.\`;

// 2. Multi-line strings
const html = \`
  <div>
    <h1>\${name}</h1>
  </div>
\`;`,
    explanationSteps: [
      "Backtick syntax tells parser to compile embedded expressions.",
      "Supports native carriage returns, preserving whitespace accurately.",
      "Expressions are coerced into strings inline."
    ],
    playgroundCode: `const user = "Alex";
console.log(\`Greetings, \${user}!\`);`
  },
  {
    id: 92,
    question: "What is tagged template literals used for?",
    answer: "A tagged template literal is an advanced form of template literals that lets you parse them with a custom 'tag' function. The tag function receives the array of literal string segments as its first argument, and the evaluated expressions as subsequent arguments. This is used for HTML sanitization, translations, or CSS styling (as seen in styled-components).",
    category: "dom_browser_adv",
    difficulty: "Hard",
    codeExample: `function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    const value = values[i] ? \`<mark>\${values[i]}</mark>\` : "";
    return acc + str + value;
  }, "");
}

const name = "Bob";
const result = highlight\`User \${name} is online.\`;
console.log(result); // "User <mark>Bob</mark> is online."`,
    explanationSteps: [
      "The tag function separates text from variables.",
      "Strings array maps to static segments, values maps to variables.",
      "Custom functions can sanitize variables, preventing XSS injections."
    ],
    playgroundCode: `function uppercaseTag(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (values[i]?.toUpperCase() ?? ""), "");
}
console.log(uppercaseTag\`Hello, \${"sam"}\`);`
  },
  {
    id: 97,
    question: "What is a polyfill?",
    answer: "A polyfill is a piece of JavaScript code that implements a modern web feature in older browsers or environments that do not natively support it. It replicates standard APIs by checking if they exist on the global window or prototype objects and injecting a custom implementation if missing.",
    category: "dom_browser_adv",
    difficulty: "Medium",
    codeExample: `// Polyfill for Array.prototype.includes if missing
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement) {
    return this.indexOf(searchElement) !== -1;
  };
}`,
    explanationSteps: [
      "Check if native implementation is available.",
      "If missing, attach custom JavaScript logic directly onto the prototype.",
      "Ensures modern code runs on legacy client engines without crashing."
    ],
    playgroundCode: `if (!String.prototype.repeat) {
  console.log("No repeat? We would polyfill here!");
} else {
  console.log("String.prototype.repeat is native.");
}`
  },
  {
    id: 98,
    question: "What is transpiling (e.g. via Babel) vs polyfilling?",
    answer: "Transpiling converts newer JavaScript syntax (like arrow functions, classes, or const/let) into older, browser-compatible syntax (like ES5 function expressions) during a build step. Polyfilling adds missing runtime APIs (like Promise, Map, Set, or structuredClone) directly to the environment's runtime engine.",
    category: "dom_browser_adv",
    difficulty: "Medium",
    codeExample: `// 1. Transpiled Syntax (Source -> Build compile-time)
// Source: const double = x => x * 2;
// Compiled: var double = function(x) { return x * 2; };

// 2. Polyfilled API (Runtime injection if missing)
if (!window.structuredClone) {
  window.structuredClone = function(obj) {
    return JSON.parse(JSON.stringify(obj)); // simple mock polyfill
  };
}`,
    explanationSteps: [
      "Transpiling deals with syntax transformations (Babel, tsc).",
      "Polyfilling deals with adding missing global objects or methods (core-js).",
      "Together they enable writing state-of-the-art JS that runs on retro browser setups."
    ],
    playgroundCode: `console.log("Transpile = syntax change. Polyfill = runtime additions.");`
  },
  {
    id: 99,
    question: "What is the difference between synchronous script loading (<script>) and defer/async attributes?",
    answer: "Standard <script> blocks HTML parsing; the browser stops, downloads, and executes the script before parsing the rest of the HTML. defer downloads the script in parallel, but delays execution until the HTML parser has finished completely (execution preserves order). async downloads in parallel and executes the script immediately when it finishes downloading, pausing HTML parsing (order of execution is not guaranteed).",
    category: "dom_browser_adv",
    difficulty: "Medium",
    codeExample: `<!-- Blocks parsing completely -->
<script src="main.js"></script>

<!-- parallel fetch, runs AFTER html parsing (in order) -->
<script defer src="helper1.js"></script>
<script defer src="helper2.js"></script>

<!-- parallel fetch, runs instantly on download (breaks order) -->
<script async src="analytics.js"></script>`,
    explanationSteps: [
      "Synchronous script tags create rendering blocks.",
      "defer guarantees execution happens in written order and waits for DOMContentLoaded.",
      "async is ideal for standalone third-party files (like Google Analytics) where loading order doesn't matter."
    ],
    playgroundCode: `console.log("defer: parallel load, sequential run. async: parallel load, fast run.");`
  }
];
