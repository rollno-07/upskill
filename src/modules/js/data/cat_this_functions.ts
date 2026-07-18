import { Question } from '../types';

export const thisFunctionsQuestions: Question[] = [
  {
    id: 14,
    question: "What is this in JavaScript and how is it determined?",
    answer: "In JavaScript, 'this' is a keyword that refers to the object currently executing the function. Its value is determined at call-time (how the function was called), not at definition-time. The four rules of binding are: 1. Default Binding (global object or undefined in strict mode), 2. Implicit Binding (the object before the dot, e.g. user.greet()), 3. Explicit Binding (via call, apply, bind), and 4. New Binding (via constructor functions/classes).",
    category: "this_functions",
    difficulty: "Medium",
    codeExample: `const person = {
  name: "Alice",
  greet() {
    return "Hi, " + this.name;
  }
};

console.log(person.greet()); // "Hi, Alice" (Implicit binding)

const looseGreet = person.greet;
console.log(looseGreet()); // "Hi, undefined" (Default binding / lost context)`,
    explanationSteps: [
      "In person.greet(), person is the execution context, so 'this' refers to person.",
      "By storing the function in looseGreet, we extract the raw function without its parent object binding.",
      "Invoking looseGreet() makes 'this' fall back to the global window/global scope (or undefined in strict mode)."
    ],
    playgroundCode: `const obj = {
  num: 42,
  show() { console.log("this.num =", this.num); }
};
const unbound = obj.show;
obj.show();
try { unbound(); } catch(e) { console.log(e.message); }`
  },
  {
    id: 15,
    question: "How do arrow functions handle this differently?",
    answer: "Arrow functions do not have their own 'this' binding. Instead, they inherit 'this' lexically from their enclosing parent scope at definition time. Their 'this' is completely static, persistent, and cannot be overridden using call(), apply(), or bind(). This makes them ideal for callback functions inside methods.",
    category: "this_functions",
    difficulty: "Medium",
    codeExample: `const group = {
  title: "Devs",
  members: ["Bob", "Eve"],
  showMembers() {
    // Arrow function inherits 'this' from showMembers (which is group)
    this.members.forEach(member => {
      console.log(this.title + ": " + member);
    });
  }
};

group.showMembers();`,
    explanationSteps: [
      "Arrow functions are checked lexically at compile time for variable references.",
      "They skip standard runtime 'this' binding entirely.",
      "Calling bind() or call() on an arrow function executes but silently ignores the new 'this' parameter."
    ],
    playgroundCode: `const testObj = {
  name: "Local",
  normal: function() { return () => this.name; }
};
console.log(testObj.normal()());`
  },
  {
    id: 16,
    question: "What is the difference between call, apply, and bind?",
    answer: "call and apply invoke a function immediately with a specified 'this' context; call accepts subsequent arguments individually (args listed), while apply accepts arguments as an array. bind does not execute the function immediately; instead, it returns a brand-new function with the 'this' context permanently bound, which can be executed later with any additional arguments.",
    category: "this_functions",
    difficulty: "Medium",
    codeExample: `const trainer = { name: "Coach Bob" };

function exercise(type, duration) {
  console.log(this.name + " says: " + type + " for " + duration + "m");
}

exercise.call(trainer, "Running", 30);  // Invokes immediately
exercise.apply(trainer, ["Yoga", 45]); // Invokes immediately (array)

const boundExercise = exercise.bind(trainer, "Pilates");
boundExercise(20); // Invokes later`,
    explanationSteps: [
      "call(context, arg1, arg2...) triggers right away.",
      "apply(context, [arg1, arg2...]) unpacked the arguments array and triggers right away.",
      "bind(context, arg1) returns a partial function that can be executed later."
    ],
    playgroundCode: `function greet(greeting) { console.log(greeting + ", " + this.user); }
greet.call({ user: "Sam" }, "Hello");
greet.apply({ user: "Sam" }, ["Hi"]);`
  },
  {
    id: 30,
    question: "What is the rest parameter?",
    answer: "The rest parameter syntax (...) allows a function to accept an indefinite number of arguments as an array. It must be the last parameter in the function declaration. It solves the issue of having to use the non-array 'arguments' object historically found in JavaScript functions.",
    category: "this_functions",
    difficulty: "Easy",
    codeExample: `function sumAll(...numbers) {
  // numbers is a real Array
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sumAll(1, 2, 3, 4)); // 10`,
    explanationSteps: [
      "All additional arguments are packed into a single standard Array object.",
      "The rest parameter must appear at the very end of the argument list.",
      "Allows the immediate use of standard array methods (map, filter, reduce)."
    ],
    playgroundCode: `function logNames(title, ...names) {
  console.log(title + ": " + names.join(", "));
}
logNames("Speakers", "Alice", "Bob", "Charlie");`
  },
  {
    id: 31,
    question: "What is a higher-order function?",
    answer: "A higher-order function is a function that does at least one of the following: 1. Takes one or more functions as arguments, or 2. Returns a function as its result. It is a fundamental concept of functional programming in JavaScript, heavily utilized in array methods like map(), filter(), and reduce(), or utility helpers like currying/debounce.",
    category: "this_functions",
    difficulty: "Easy",
    codeExample: `// Accepts function as argument
function repeat(n, action) {
  for (let i = 0; i < n; i++) action(i);
}
repeat(3, console.log);

// Returns a function
function multiplier(factor) {
  return number => number * factor;
}
const double = multiplier(2);
console.log(double(5)); // 10`,
    explanationSteps: [
      "Functions in JS are treated as 'first-class citizens', meaning they are values.",
      "We can pass a function reference into another function.",
      "We can declare a function inside a function and return its reference."
    ],
    playgroundCode: `const runTwice = (f) => { f(); f(); };
runTwice(() => console.log("Run!"));`
  },
  {
    id: 32,
    question: "What is currying?",
    answer: "Currying is a transformation of a function that takes multiple arguments into a chain of nesting functions, each taking a single argument. It doesn't call a function; it just translates it. It is useful for creating specialized configuration helpers and reusable sub-functions.",
    category: "this_functions",
    difficulty: "Medium",
    codeExample: `// Normal function
const sum = (a, b) => a + b;

// Curried function
const curriedSum = a => b => a + b;

const addFive = curriedSum(5);
console.log(addFive(3)); // 8
console.log(curriedSum(1)(2)); // 3`,
    explanationSteps: [
      "We invoke the curried function with the first argument, which returns an inner function.",
      "The inner function maintains a closure over the first argument.",
      "When we supply the final argument, the nested chain resolves, computing the final result."
    ],
    playgroundCode: `const logger = level => msg => console.log("[" + level + "] " + msg);
const infoLog = logger("INFO");
infoLog("Server loaded");`
  },
  {
    id: 33,
    question: "What is debounce?",
    answer: "Debounce is a performance optimization technique that limits the rate at which a function can fire. It guarantees that a function will not be invoked until a specified amount of time has elapsed since its last call. It is commonly used for search input type-aheads, autocomplete, and window-resize events.",
    category: "this_functions",
    difficulty: "Medium",
    codeExample: `function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}`,
    explanationSteps: [
      "Every invocation triggers a clearTimeout, resetting any active countdown timers.",
      "A new setTimeout is registered to trigger the target function after the specified delay.",
      "The function runs only when a period of complete inactivity equals the delay."
    ],
    playgroundCode: `let calls = 0;
const increment = () => { calls++; console.log("Run! Total:", calls); };
// Simply demonstrating debounce logic conceptually
console.log("Debounce helper loaded.");`
  },
  {
    id: 34,
    question: "What is throttle?",
    answer: "Throttle is a performance optimization technique that ensures a function is called at most once during a specified time interval, regardless of how many times it is triggered by the user. It is highly useful for scroll event listeners, mouse-move logging, and gaming loops.",
    category: "this_functions",
    difficulty: "Medium",
    codeExample: `function throttle(func, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}`,
    explanationSteps: [
      "First call executes the function immediately.",
      "A throttle lock (boolean flag) is set to true.",
      "Subsequent triggers are locked out and ignored until the setTimeout completes and resets the flag."
    ],
    playgroundCode: `console.log("Throttle helper configured.");`
  },
  {
    id: 35,
    question: "What's the practical difference between debounce and throttle?",
    answer: "Debounce groups multiple sequential events and delays execution until there is a pause in activity (e.g. typing a search query). Throttle guarantees that execution happens periodically at regular intervals during continuous activity (e.g., checking page scroll position every 100ms).",
    category: "this_functions",
    difficulty: "Medium",
    codeExample: `// Debounce: wait 300ms AFTER user stops typing, then run
const search = debounce(fetchResults, 300);

// Throttle: run AT MOST once every 300ms while user scrolls
const handleScroll = throttle(updatePosition, 300);`,
    explanationSteps: [
      "Debouncing is triggered when execution pauses.",
      "Throttling is triggered periodically, pacing continuous activity."
    ],
    playgroundCode: `console.log("Debounce: waits for pause");
console.log("Throttle: triggers periodically");`
  },
  {
    id: 57,
    question: "What is memoization?",
    answer: "Memoization is an optimization technique used to speed up computer programs by storing the results of expensive function calls in a cache and returning the cached result when the same inputs occur again. It trades memory space to save execution time.",
    category: "this_functions",
    difficulty: "Medium",
    codeExample: `function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log("Cache hit!");
      return cache[key];
    }
    console.log("Computing...");
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}`,
    explanationSteps: [
      "Create a cache lookup store in the closure scope of the wrapper.",
      "Serialize function arguments to create a unique lookup string key.",
      "Check if key is in the cache; if found, return the cache result.",
      "If missing, run the underlying function, cache the result, and return it."
    ],
    playgroundCode: `const exp = (x) => x * x;
const memoExp = (function() {
  const cache = {};
  return (n) => {
    if (n in cache) return "Cache: " + cache[n];
    cache[n] = exp(n);
    return "Computed: " + cache[n];
  };
})();
console.log(memoExp(5));
console.log(memoExp(5));`
  },
  {
    id: 80,
    question: "What is the difference between Function.prototype.bind creating a new function vs directly calling with call?",
    answer: "bind is a non-executing function constructor — it returns a pre-configured bound function that is saved to run later with its assigned context. call is an immediate execution engine — it configures the function context and fires it on the spot, returning the direct function output immediately.",
    category: "this_functions",
    difficulty: "Easy",
    codeExample: `const cat = { sound: "Meow" };
function speak() { return this.sound; }

const talkLater = speak.bind(cat); // returns new function
const soundNow = speak.call(cat);  // returns string "Meow"

console.log(typeof talkLater); // "function"
console.log(soundNow);          // "Meow"`,
    explanationSteps: [
      "bind creates a wrapper function setting internal [[BoundThis]] record.",
      "The newly generated function awaits standard invocation.",
      "call immediately executes, modifying the active frame's 'this' directly."
    ],
    playgroundCode: `const user = { name: "A" };
function show() { console.log(this.name); }
const bound = show.bind(user);
bound();`
  },
  {
    id: 90,
    question: "What is the significance of \"first-class functions\" in JS?",
    answer: "In JavaScript, functions are first-class citizens. This means they are treated like any other value (such as Strings, Numbers, or Arrays). They can be assigned to variables, stored in properties of objects, passed as arguments into other functions, and returned from functions as results.",
    category: "this_functions",
    difficulty: "Easy",
    codeExample: `// 1. Assign to variables
const greet = () => "Hello";

// 2. Pass as argument
function runner(func) {
  return func();
}
runner(greet);

// 3. Return from function
function buildAdder(x) {
  return y => x + y;
}`,
    explanationSteps: [
      "Functions are parsed and treated as fully addressable JS objects.",
      "Enables all functional programming paradigms including closures, currying, and composition.",
      "Allows passing callbacks to direct event-driven and async programming."
    ],
    playgroundCode: `const actions = [() => "A", () => "B"];
console.log(actions.map(f => f()));`
  }
];
