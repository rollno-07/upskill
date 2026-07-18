import { Question } from '../types';

export const arrayMethodsQuestions: Question[] = [
  {
    id: 58,
    question: "What is the difference between slice and splice?",
    answer: "slice(start, end) returns a shallow copy of a portion of an array without modifying the original array (non-mutating). splice(start, deleteCount, ...items) modifies the original array by removing, replacing, or adding elements in-place, returning the deleted elements (mutating).",
    category: "array_methods",
    difficulty: "Easy",
    codeExample: `const arr = [1, 2, 3, 4, 5];

// slice
const sliced = arr.slice(1, 3);
console.log(sliced); // [2, 3]
console.log(arr);    // [1, 2, 3, 4, 5] (unchanged)

// splice
const removed = arr.splice(1, 2, 99);
console.log(removed); // [2, 3]
console.log(arr);     // [1, 99, 4, 5] (mutated!)`,
    explanationSteps: [
      "slice creates a clean array mapping indices.",
      "splice directly alters array length, performing deletions or insertions on the original index list.",
      "Pure architectures prefer non-mutating slice."
    ],
    playgroundCode: `const numbers = [10, 20, 30];
const sub = numbers.slice(0, 2);
console.log("sliced:", sub, "original:", numbers);`
  },
  {
    id: 59,
    question: "What does Array.prototype.reduce do?",
    answer: "reduce(callback, initialValue) executes a reducer function on each element of the array, passing the return value from the calculation on the preceding element. This results in a single consolidated output value. It is incredibly versatile and can be used to sum numbers, flatten arrays, count occurrences, or group objects.",
    category: "array_methods",
    difficulty: "Medium",
    codeExample: `const nums = [1, 2, 3, 4];

// Summing items
const sum = nums.reduce((accumulator, current) => {
  return accumulator + current;
}, 0); // 10

// Counting occurrences
const fruits = ["apple", "banana", "apple"];
const count = fruits.reduce((acc, f) => {
  acc[f] = (acc[f] || 0) + 1;
  return acc;
}, {}); // { apple: 2, banana: 1 }`,
    explanationSteps: [
      "Initialize accumulator with initialValue.",
      "Step through array: current elements are passed to the callback.",
      "Result of previous step is piped as the next step's accumulator.",
      "Final accumulator state is returned."
    ],
    playgroundCode: `const val = [1, 2, 3].reduce((acc, curr) => acc * curr, 1);
console.log("Accumulated multiply:", val);`
  },
  {
    id: 60,
    question: "What's the difference between map and forEach?",
    answer: "map() executes a callback on each element and returns a brand-new array containing the computed results, preserving the original array structure. forEach() simply iterates over the array and executes a callback for its side-effects; it returns undefined. Use map when transforming data, and forEach for logging or database writes.",
    category: "array_methods",
    difficulty: "Easy",
    codeExample: `const arr = [1, 2, 3];

// map returns [2, 4, 6]
const doubled = arr.map(x => x * 2);

// forEach returns undefined
const sideEffect = arr.forEach(x => {
  console.log(x); // side-effect action
});`,
    explanationSteps: [
      "map allocates a matching-length array and stores returned values.",
      "forEach loops without allocating any return structure.",
      "Using forEach to build arrays is considered an anti-pattern when map fits."
    ],
    playgroundCode: `const items = [1, 2];
console.log("map result:", items.map(x => x * 10));
console.log("forEach result:", items.forEach(x => {}));`
  },
  {
    id: 61,
    question: "What's the difference between find and filter?",
    answer: "find() searches the array and returns the very first element that satisfies the provided testing function; if nothing matches, it returns undefined. filter() searches the entire array and returns a brand new array containing all elements that satisfy the test; if nothing matches, it returns an empty array [].",
    category: "array_methods",
    difficulty: "Easy",
    codeExample: `const users = [
  { id: 1, role: "User" },
  { id: 2, role: "Admin" },
  { id: 3, role: "Admin" }
];

const firstAdmin = users.find(u => u.role === "Admin");
// { id: 2, role: "Admin" }

const allAdmins = users.filter(u => u.role === "Admin");
// [{ id: 2, ... }, { id: 3, ... }]`,
    explanationSteps: [
      "find scans elements sequentially and exits instantly upon first match.",
      "filter scans every index to harvest a full match list."
    ],
    playgroundCode: `const nums = [1, 5, 8, 12];
console.log("first > 7:", nums.find(x => x > 7));
console.log("all > 7:", nums.filter(x => x > 7));`
  },
  {
    id: 62,
    question: "What does Array.isArray() do and why not just use typeof?",
    answer: "Array.isArray(x) is a static method that checks if the passed value is an Array. typeof is not suitable because typeof [] returns 'object'. Since arrays, plain objects, null, and dates are all typed as 'object' in JS, typeof cannot distinguish arrays from other objects.",
    category: "array_methods",
    difficulty: "Easy",
    codeExample: `const arr = [1, 2];
const obj = { x: 1 };

console.log(typeof arr); // "object"
console.log(typeof obj); // "object"

console.log(Array.isArray(arr)); // true
console.log(Array.isArray(obj)); // false`,
    explanationSteps: [
      "Checks internal [[Class]] slots or Prototype references of the target.",
      "Returns a clean boolean response.",
      "Safeguards array operations (like mapping or reducing) from breaking."
    ],
    playgroundCode: `console.log("Array.isArray([]):", Array.isArray([]));
console.log("Array.isArray({}):", Array.isArray({}));`
  },
  {
    id: 63,
    question: "What is the difference between for...in and for...of?",
    answer: "for...in iterates over the enumerable keys/properties of an object (including inherited properties on the prototype chain). for...of iterates over the values of an iterable object (like an Array, Map, Set, or String). Rule of thumb: use for...in for objects, and for...of for arrays or collections.",
    category: "array_methods",
    difficulty: "Medium",
    codeExample: `const arr = ["a", "b"];
arr.custom = "hello"; // property added

// for...in loops over keys/properties
for (let key in arr) {
  console.log(key); // "0", "1", "custom"
}

// for...of loops over iterable values
for (let value of arr) {
  console.log(value); // "a", "b"
}`,
    explanationSteps: [
      "for...in tracks stringified object indices and custom parent attributes.",
      "for...of leverages the iterator protocol (Symbol.iterator) to fetch values directly.",
      "Avoid using for...in for array iteration due to potential key contamination."
    ],
    playgroundCode: `const list = [100, 200];
for (let key in list) console.log("in:", key);
for (let val of list) console.log("of:", val);`
  },
  {
    id: 64,
    question: "What is a pure function?",
    answer: "A pure function is a function that: 1. Given the same inputs, always returns the exact same output, and 2. Has zero side effects (does not mutate external variables, perform network queries, modify DOM elements, or alter global state). Pure functions are easy to test, reason about, and cache.",
    category: "array_methods",
    difficulty: "Easy",
    codeExample: `// Pure
const add = (a, b) => a + b;

// Impure (reads external variable)
let tax = 0.05;
const calcTotal = price => price + (price * tax);

// Impure (modifies argument / side effect)
const addToArray = (arr, val) => {
  arr.push(val); // Mutated external array!
  return arr;
};`,
    explanationSteps: [
      "Deterministic computation: outputs depend entirely on arguments.",
      "Complete isolation: doesn't read or write external data registers.",
      "Pure inputs cannot be modified (arguments should be read-only)."
    ],
    playgroundCode: `const pureDouble = (x) => x * 2;
console.log(pureDouble(10));`
  },
  {
    id: 65,
    question: "What is immutability and why does it matter in JS apps?",
    answer: "Immutability is the practice of never modifying existing data structures directly. Instead, when changes occur, you create copy clones holding the updated properties. This is vital in modern frameworks (like React) because it allows for rapid 'shallow reference checks' to detect state changes, instead of having to perform heavy recursive checks, improving rendering performance.",
    category: "array_methods",
    difficulty: "Medium",
    codeExample: `// Mutation (Dangerous)
const user = { name: "Bob" };
user.name = "Alice"; 

// Immutable State Update (Safe)
const updatedUser = {
  ...user,
  name: "Alice"
};
console.log(user === updatedUser); // false (different references, easy to detect update)`,
    explanationSteps: [
      "Mutating values makes it impossible to know *when* or *where* data was changed.",
      "Shallow references comparisons (oldState === newState) run instantly in O(1).",
      "Reduces structural side-effects across shared functional pointers."
    ],
    playgroundCode: `const orig = [1, 2];
const next = [...orig, 3];
console.log("orig === next:", orig === next);`
  },
  {
    id: 66,
    question: "What is the difference between mutable and immutable data types in JS?",
    answer: "In JavaScript, primitive types (String, Number, Boolean, Null, Undefined, Symbol, BigInt) are completely immutable — their values cannot be edited; any operation returns a new value. Reference types (Objects, Arrays, Maps, Sets) are mutable by default — they are stored in the heap and their contents can be changed in place.",
    category: "array_methods",
    difficulty: "Easy",
    codeExample: `// Primitives (Immutable)
let greeting = "Hello";
greeting[0] = "J"; // Silently fails (or throws in strict)
console.log(greeting); // "Hello"

// Objects (Mutable)
const list = [1, 2];
list.push(3); // Altered in-place
console.log(list); // [1, 2, 3]`,
    explanationSteps: [
      "Primitives are stored by value on the stack.",
      "Objects are stored by reference on the heap.",
      "Re-assigning a string re-allocates a stack item; editing an array modifies the heap record directly."
    ],
    playgroundCode: `let str = "abc";
str.toUpperCase();
console.log("str remains:", str); // 'abc' (toUpperCase returns a new string)`
  },
  {
    id: 81,
    question: "What is method chaining?",
    answer: "Method chaining is a design pattern where multiple methods are called sequentially on a single expression. Each method returns an object (often 'this' or a brand-new instanced copy, like in array methods), allowing the next method call to run immediately on the returned output.",
    category: "array_methods",
    difficulty: "Easy",
    codeExample: `const scores = [50, 80, 95, 45, 60];

// Filter passing scores, double them, and calculate sum
const totalOfDoubledPassing = scores
  .filter(score => score >= 60)
  .map(score => score * 2)
  .reduce((sum, score) => sum + score, 0);

console.log(totalOfDoubledPassing); // 470`,
    explanationSteps: [
      "A method executes on a target object.",
      "The method completes and returns an iterable or reference.",
      "The next method is immediately called against the returned instance, forming a clean pipeline."
    ],
    playgroundCode: `const str = " hello ";
const clean = str.trim().toUpperCase().concat("!");
console.log(clean);`
  },
  {
    id: 85,
    question: "What is the difference between Array.prototype.sort default behavior and sorting numbers?",
    answer: "By default, Array.prototype.sort() converts elements to strings and compares their UTF-16 character codes lexicographically. This works fine for strings but fails completely for numbers (e.g. '10' is sorted before '2' because '1' is smaller than '2'). To sort numbers correctly, you must pass a compare callback function.",
    category: "array_methods",
    difficulty: "Medium",
    codeExample: `const nums = [10, 5, 2, 80];

// ❌ Incorrect Default Sort
nums.sort(); 
console.log(nums); // [10, 2, 5, 80] (lexicographical)

// ✅ Correct Numeric Sort
nums.sort((a, b) => a - b); // Ascending
console.log(nums); // [2, 5, 10, 80]`,
    explanationSteps: [
      "Default sort: converts each item to strings internally.",
      "Compare function accepts elements (a, b).",
      "Returning negative (a - b < 0) places a first. Positive (a - b > 0) places b first."
    ],
    playgroundCode: `const numbers = [25, 100, 5];
numbers.sort(); // default
console.log("Default:", numbers);
numbers.sort((a,b) => a - b); // correct
console.log("Correct:", numbers);`
  },
  {
    id: 87,
    question: "What is the difference between Array.prototype.some and every?",
    answer: "some() returns true if at least one element in the array passes the testing callback; it short-circuits and stops evaluating once it finds a match. every() returns true if and only if every single element in the array passes the testing callback; it short-circuits and returns false once it finds a failing match.",
    category: "array_methods",
    difficulty: "Easy",
    codeExample: `const ages = [12, 18, 25, 15];

// checks if any are adults
const hasAdult = ages.some(age => age >= 18); // true

// checks if all are adults
const allAdults = ages.every(age => age >= 18); // false`,
    explanationSteps: [
      "some: loops until testing condition is satisfied once. Evaluates to true.",
      "every: loops until testing condition fails once. Evaluates to false."
    ],
    playgroundCode: `const vals = [2, 4, 6];
console.log("All even?", vals.every(x => x % 2 === 0));`
  },
  {
    id: 88,
    question: "What's a common technique for flattening a nested array?",
    answer: "The modern standard way to flatten a nested array is to use the built-in Array.prototype.flat(depth) method, passing Infinity if the depth is unknown. In older environments, you can achieve this recursively using reduce and concat, or the spread operator inside a loop.",
    category: "array_methods",
    difficulty: "Medium",
    codeExample: `const nested = [1, [2, [3, 4]]];

// Modern way
const flat1 = nested.flat(Infinity); // [1, 2, 3, 4]

// Recursive reduce way (legacy alternative)
function flatten(arr) {
  return arr.reduce((acc, curr) => {
    return acc.concat(Array.isArray(curr) ? flatten(curr) : curr);
  }, []);
}`,
    explanationSteps: [
      "flat(depth) traverses nested arrays recursively.",
      "Accumulates non-array elements into a flat sequence.",
      "Specifying depth control prevents memory overload."
    ],
    playgroundCode: `const nested = [[1, 2], [3, 4]];
console.log(nested.flat());`
  }
];
