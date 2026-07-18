import { Question } from '../types';

export const asyncEventLoopQuestions: Question[] = [
  {
    id: 6,
    question: "What is the event loop?",
    answer: "The event loop is the concurrency model in JavaScript responsible for coordinating execution of code, collecting and processing events, and executing queued sub-tasks. Since JavaScript is single-threaded, the event loop monitors the Call Stack and the Task Queues. When the Call Stack is completely empty, it takes the first task from the queue and pushes it onto the Call Stack to execute.",
    category: "async_event_loop",
    difficulty: "Medium",
    codeExample: `console.log("Start");

setTimeout(() => {
  console.log("Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("Microtask (Promise)");
});

console.log("End");
// Output: Start, End, Microtask (Promise), Macrotask (setTimeout)`,
    explanationSteps: [
      "Synchronous code runs: console.log('Start') and 'End' are pushed and executed immediately on the Call Stack.",
      "setTimeout is called: browser registers a timer in Web APIs, then places the callback in the Macrotask Queue.",
      "Promise resolves: its callback is placed in the Microtask Queue.",
      "When the Call Stack becomes empty, the Event Loop processes all Microtasks first, then processes Macrotasks."
    ],
    playgroundCode: `console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");`
  },
  {
    id: 7,
    question: "Microtasks vs macrotasks — which run first?",
    answer: "Microtasks always execute before the next macrotask. At the end of every task execution on the main thread, the engine drains the entire Microtask Queue (including any microtasks added while draining) before relinquishing control back to the event loop to pick up a macrotask or re-render.",
    category: "async_event_loop",
    difficulty: "Medium",
    codeExample: `setTimeout(() => console.log("Macrotask 1"), 0);

Promise.resolve()
  .then(() => {
    console.log("Microtask 1");
    Promise.resolve().then(() => console.log("Nested Microtask"));
  });

setTimeout(() => console.log("Macrotask 2"), 0);`,
    explanationSteps: [
      "Macrotask 1 and Macrotask 2 are queued.",
      "Microtask 1 is queued and starts running first.",
      "Microtask 1 queues Nested Microtask, which runs immediately because the Microtask queue must be empty before moving to macrotasks.",
      "Finally, Macrotask 1 and 2 run."
    ],
    playgroundCode: `setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));`
  },
  {
    id: 8,
    question: "What is a Promise?",
    answer: "A Promise is an object representing the eventual completion or failure of an asynchronous operation. It acts as a placeholder for a value that will be available in the future. A Promise has three states: Pending (initial state), Fulfilled (operation completed successfully, resolving to a value), and Rejected (operation failed, resolving to an error/reason).",
    category: "async_event_loop",
    difficulty: "Easy",
    codeExample: `const fetchJob = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("Job Completed!");
  } else {
    reject("Job Failed!");
  }
});

fetchJob
  .then(data => console.log(data))
  .catch(err => console.error(err));`,
    explanationSteps: [
      "A Promise is created in the 'pending' state.",
      "The executor function runs immediately.",
      "If resolve() is called, the promise enters 'fulfilled' and triggers .then() callbacks.",
      "If reject() is called, the promise enters 'rejected' and triggers .catch() callbacks."
    ],
    playgroundCode: `const p = new Promise(res => setTimeout(() => res("Resolved!"), 50));
p.then(console.log);`
  },
  {
    id: 9,
    question: "What is async/await?",
    answer: "async/await is modern syntactic sugar on top of Promises, introduced in ES2017. Marking a function with the async keyword ensures it always returns a Promise. The await keyword can only be used inside an async function; it pauses the function execution synchronously-looking until the awaited Promise settles, allowing asynchronous code to be written with try/catch blocks.",
    category: "async_event_loop",
    difficulty: "Easy",
    codeExample: `async function loadData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Caught: " + error.message);
  }
}`,
    explanationSteps: [
      "The async function starts running synchronously until it hits the first await.",
      "The await pauses execution and yields control back to the event loop while the Promise resolves.",
      "Once resolved, the code resumes execution with the resolved value."
    ],
    playgroundCode: `async function test() {
  const data = await Promise.resolve("Awaiting data...");
  console.log(data);
}
test();`
  },
  {
    id: 10,
    question: "How do you run multiple promises in parallel?",
    answer: "You run multiple promises in parallel using the static method Promise.all([...]). It accepts an array of promises and returns a single Promise that resolves to an array of results only when all input promises have successfully fulfilled. If any single promise rejects, Promise.all immediately rejects with that error, short-circuiting other requests.",
    category: "async_event_loop",
    difficulty: "Medium",
    codeExample: `const p1 = Promise.resolve("User Profile");
const p2 = new Promise(res => setTimeout(() => res("User Orders"), 100));
const p3 = Promise.resolve("User Settings");

Promise.all([p1, p2, p3])
  .then(([profile, orders, settings]) => {
    console.log({ profile, orders, settings });
  })
  .catch(error => console.error("One failed!", error));`,
    explanationSteps: [
      "All individual promises are triggered and run concurrently.",
      "Promise.all monitors all target promises.",
      "Once all settle successfully, the master promise resolves.",
      "If any of them fail at any time, Promise.all instantly aborts."
    ],
    playgroundCode: `Promise.all([
  Promise.resolve("A"),
  Promise.resolve("B")
]).then(console.log);`
  },
  {
    id: 11,
    question: "What's the difference between Promise.all and Promise.allSettled?",
    answer: "Promise.all short-circuits and rejects immediately if any of the promises fail. Promise.allSettled waits for all promises to finish (either fulfill or reject) and returns an array of objects describing the outcome of each promise (containing status: 'fulfilled' or 'rejected', along with value or reason). Use allSettled when you want to proceed with successful values even if some failed.",
    category: "async_event_loop",
    difficulty: "Medium",
    codeExample: `const promises = [
  Promise.resolve("Success 1"),
  Promise.reject("Error 2"),
  Promise.resolve("Success 3")
];

Promise.allSettled(promises)
  .then(results => console.log(results));
/* Output:
  [
    { status: 'fulfilled', value: 'Success 1' },
    { status: 'rejected', reason: 'Error 2' },
    { status: 'fulfilled', value: 'Success 3' }
  ]
*/`,
    explanationSteps: [
      "Promise.allSettled does not short-circuit on failures.",
      "It gathers results from all operations concurrently.",
      "Provides a uniform summary format of all results once settled."
    ],
    playgroundCode: `Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Oops")
]).then(console.log);`
  },
  {
    id: 12,
    question: "What's Promise.race used for?",
    answer: "Promise.race returns a promise that resolves or rejects as soon as one of the promises in the iterable settles (resolves or rejects) with its value or error. It is commonly used for applying network timeouts to fetch requests or selecting the fastest responder among mirrored servers.",
    category: "async_event_loop",
    difficulty: "Medium",
    codeExample: `const loadData = new Promise(res => setTimeout(() => res("Data loaded"), 500));
const timeout = new Promise((_, rej) => setTimeout(() => rej("Timeout!"), 100));

Promise.race([loadData, timeout])
  .then(console.log)
  .catch(console.error); // Prints 'Timeout!' because it settled first`,
    explanationSteps: [
      "Multiple promises compete side-by-side.",
      "The fast winner determines the final resolution state (fulfilled or rejected) of the race master promise.",
      "All slower promises continue execution, but their results are ignored by the race handler."
    ],
    playgroundCode: `Promise.race([
  new Promise(r => setTimeout(() => r("Fast"), 10)),
  new Promise(r => setTimeout(() => r("Slow"), 100))
]).then(console.log);`
  },
  {
    id: 13,
    question: "What's Promise.any?",
    answer: "Promise.any is the opposite of Promise.all. It resolves as soon as any promise in the array fulfills (resolves successfully). If all promises in the array reject, Promise.any rejects with an AggregateError containing all the individual rejections. It ignores all individual failures until/unless every promise has failed.",
    category: "async_event_loop",
    difficulty: "Hard",
    codeExample: `const fail1 = Promise.reject("Fail A");
const success1 = new Promise(res => setTimeout(() => res("Fast Success"), 100));
const fail2 = Promise.reject("Fail B");

Promise.any([fail1, success1, fail2])
  .then(result => console.log(result)) // "Fast Success"
  .catch(err => console.error(err));`,
    explanationSteps: [
      "Aggregate error holds all individual error logs.",
      "The first successful resolution instantly satisfies the requirement.",
      "Any subsequent resolutions or rejections are completely discarded."
    ],
    playgroundCode: `Promise.any([
  Promise.reject("Error"),
  Promise.resolve("I won!")
]).then(console.log);`
  },
  {
    id: 40,
    question: "What is the difference between synchronous and asynchronous code execution?",
    answer: "Synchronous code execution is blocking and sequential — each line must finish executing before the next line begins. Asynchronous execution is non-blocking — the engine starts a task (e.g., fetch, timer, database read) and immediately moves on to the next instruction while the task completes in the background. Once ready, the completed task's callback runs via the event loop.",
    category: "async_event_loop",
    difficulty: "Easy",
    codeExample: `// Synchronous
console.log("A");
console.log("B"); // Prints A, B in strict order

// Asynchronous
console.log("1");
setTimeout(() => console.log("2"), 100);
console.log("3"); // Prints 1, 3, then 2`,
    explanationSteps: [
      "Synchronous instructions lock the call stack until completion.",
      "Asynchronous tasks delegate execution to Web APIs/system, keeping the thread responsive.",
      "The main execution thread never stops to wait for async tasks."
    ],
    playgroundCode: `console.log("First");
setTimeout(() => console.log("Second (Async)"), 0);
console.log("Third");`
  },
  {
    id: 41,
    question: "What is a callback function?",
    answer: "A callback function is a function passed as an argument to another function, which is intended to be invoked ('called back') at a later time. Callbacks can be synchronous (like Array.prototype.map) or asynchronous (like setTimeout, event listeners, or network requests) to handle execution results.",
    category: "async_event_loop",
    difficulty: "Easy",
    codeExample: `// Synchronous Callback
[1, 2, 3].forEach(function(num) {
  console.log(num * 2);
});

// Asynchronous Callback
function processData(callback) {
  setTimeout(() => callback("Success!"), 500);
}
processData(data => console.log(data));`,
    explanationSteps: [
      "A helper function accepts a function variable as a signature parameter.",
      "The outer function does its tasks.",
      "At the target execution step, the outer function invokes the callback parameter."
    ],
    playgroundCode: `function execute(cb) {
  console.log("Running task...");
  cb();
}
execute(() => console.log("Callback triggered!"));`
  },
  {
    id: 42,
    question: "What is \"callback hell\" and how do promises solve it?",
    answer: "Callback hell occurs when multiple asynchronous operations depend on previous results, leading to deeply nested, unreadable, and fragile code (resembling a pyramid of doom). Promises solve this by flattening the structure with chainable .then() methods, allowing asynchronous operations to be written sequentially and errors to be caught in a single .catch() block.",
    category: "async_event_loop",
    difficulty: "Medium",
    codeExample: `// Callback Hell
getUser(1, (user) => {
  getPosts(user.id, (posts) => {
    getComments(posts[0].id, (comments) => {
      console.log(comments);
    });
  });
});

// Promises Flattening
getUser(1)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err => console.error(err));`,
    explanationSteps: [
      "Deep nested structures are created as callbacks depend on previous payloads.",
      "Promises return a placeholder immediately, allowing clean chaining.",
      "Each .then block returns a new promise, keeping nesting level to 1."
    ],
    playgroundCode: `Promise.resolve("Step 1")
  .then(res => res + " -> Step 2")
  .then(res => res + " -> Step 3")
  .then(console.log);`
  },
  {
    id: 69,
    question: "What is the difference between synchronous XMLHttpRequest and fetch?",
    answer: "XMLHttpRequest (XHR) is an older API that uses events to track load status, can block the main thread if configured synchronously (highly discouraged), and is verbally verbose. fetch is a modern, promise-based API that has a clean, clean interface, integrates seamlessly with async/await, support streams, and natively aligns with newer browser specifications.",
    category: "async_event_loop",
    difficulty: "Medium",
    codeExample: `// Old XHR
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com", true);
xhr.onload = function() {
  console.log(xhr.responseText);
};
xhr.send();

// Modern Fetch
fetch("https://api.example.com")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`,
    explanationSteps: [
      "XHR requires setting event listeners and calling imperative send methods.",
      "fetch wraps the network transaction in a clean, standard Promise object.",
      "fetch simplifies data stream formatting (like .json() or .text())."
    ],
    playgroundCode: `// Fetch is standard and returns a promise
console.log(typeof fetch); // function`
  },
  {
    id: 70,
    question: "How do you handle an HTTP error status with fetch?",
    answer: "Unlike XHR or Axios, fetch does NOT reject its Promise if the server returns an HTTP error status (like 404 or 500). A fetch promise only rejects on true network failures (like loss of internet or DNS issues). To catch HTTP errors, you must manually inspect the response.ok boolean (which is true for statuses 200–299) or the response.status property.",
    category: "async_event_loop",
    difficulty: "Medium",
    codeExample: `fetch("https://api.example.com/missing-url")
  .then(response => {
    if (!response.ok) {
      throw new Error("HTTP error! Status: " + response.status);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error("Caught error:", error.message));`,
    explanationSteps: [
      "Network call completes successfully, resolving the fetch promise even for 500 server errors.",
      "Developer checks response.ok explicitly inside the first .then() callback.",
      "If response.ok is false, throwing an error redirects flow to the nearest .catch()."
    ],
    playgroundCode: `// Mocking a failing check
const mockResponse = { ok: false, status: 404 };
if (!mockResponse.ok) {
  console.log("Triggered mock error: " + mockResponse.status);
}`
  },
  {
    id: 71,
    question: "What is AbortController used for?",
    answer: "AbortController is an interface that allows you to abort (cancel) one or more asynchronous operations, most commonly fetch requests, when they are no longer needed (e.g., when a user navigates away from a page or types a new search query in a debounced input).",
    category: "async_event_loop",
    difficulty: "Hard",
    codeExample: `const controller = new AbortController();
const signal = controller.signal;

fetch("https://api.example.com/large-file", { signal })
  .then(res => res.json())
  .catch(err => {
    if (err.name === "AbortError") {
      console.log("Fetch aborted safely!");
    } else {
      console.error(err);
    }
  });

// Cancel the request 50ms later
setTimeout(() => controller.abort(), 50);`,
    explanationSteps: [
      "An AbortController instance is created, giving us a signal object.",
      "We pass the signal into the fetch options object.",
      "Calling controller.abort() triggers the signal, cancelling active network streams.",
      "The fetch promise immediately rejects with an 'AbortError'."
    ],
    playgroundCode: `const c = new AbortController();
console.log("Signal state: aborted = " + c.signal.aborted);
c.abort();
console.log("Signal state: aborted = " + c.signal.aborted);`
  },
  {
    id: 82,
    question: "What's a stack and a queue in the context of the call stack/event loop?",
    answer: "The Call Stack is a LIFO (Last In, First Out) stack structure that records the active execution point of our synchronous code, where functions are stacked on call and popped on complete. The Task Queue is a FIFO (First In, First Out) queue structure where asynchronous callbacks wait to be processed by the event loop once the Call Stack becomes clear.",
    category: "async_event_loop",
    difficulty: "Medium",
    codeExample: `function first() {
  second();
}
function second() {
  console.log("Deep on stack");
}

first(); // call stack climbs to first() -> second() -> log(), then pops.`,
    explanationSteps: [
      "Stack tracks active functions LIFO (Push on call, Pop on return).",
      "Queue holds pending async callbacks FIFO (Processes oldest task first).",
      "Event loop acts as mediator, copying task from Queue to Stack."
    ],
    playgroundCode: `// Quick demonstration of stack trace (throwing reveals stack order)
try {
  (function outer() {
    (function inner() {
      throw new Error("Stack trace lookups!");
    })();
  })();
} catch(e) {
  console.log(e.stack.split('\\n').slice(0, 3).join('\\n'));
}`
  },
  {
    id: 89,
    question: "What is the difference between synchronous throw/try-catch and promise rejection handling?",
    answer: "Synchronous try/catch blocks block execution flow, intercepting immediate exceptions thrown on the current execution call stack. Unhandled promise rejections operate out-of-sync, occurring after the synchronous stack has cleared, meaning synchronous try/catch cannot catch them. Instead, async code requires .catch() handlers or wrapping await calls in a try/catch block inside an async function.",
    category: "async_event_loop",
    difficulty: "Medium",
    codeExample: `// ❌ THIS WILL FAIL to catch the error
try {
  setTimeout(() => {
    throw new Error("Async Oops!");
  }, 50);
} catch (e) {
  console.log("Caught?", e.message); // Never printed
}

// ✅ Correct way using promises
new Promise((_, rej) => setTimeout(() => rej(new Error("Async success!")), 50))
  .catch(err => console.log("Correctly caught: " + err.message));`,
    explanationSteps: [
      "Main thread enters try-block and runs setTimeout, then exits the block immediately.",
      "The timer completes 50ms later; the callback runs on an entirely new call stack.",
      "The original try-catch context is gone, resulting in an uncaught exception.",
      "Promises preserve the context across async steps, routing failures safely."
    ],
    playgroundCode: `// Try/catch with await
(async () => {
  try {
    await Promise.reject("Rejected await!");
  } catch(e) {
    console.log("Caught: " + e);
  }
})();`
  },
  {
    id: 95,
    question: "What is the difference between synchronous module loading and dynamic import()?",
    answer: "Static imports (import x from './mod') are resolved and evaluated at compile time; they are synchronous, block execution until fully loaded, enable static analysis (tree-shaking), and must be placed at the top level of files. Dynamic imports (import('./mod')) are resolved at runtime, returning a Promise that resolves to the module namespace. This enables lazy-loading, code splitting, and conditional module loading.",
    category: "async_event_loop",
    difficulty: "Hard",
    codeExample: `// Static (Compile-time)
import { capitalize } from "./utils.js";

// Dynamic (Runtime / On-demand)
async function onUserClick() {
  try {
    const { renderChart } = await import("./chartRenderer.js");
    renderChart();
  } catch(e) {
    console.error("Module failed to load", e);
  }
}`,
    explanationSteps: [
      "Static modules are parsed and linked before any code runs.",
      "Dynamic import() is compiled into a runtime async fetch trigger.",
      "Enables loading massive vendor modules only when explicitly needed."
    ],
    playgroundCode: `// Dynamic imports return a Promise
console.log(typeof import('./types')); // 'object' (returns Promise)`
  }
];
