import { Question } from '../types';

export const objectsPrototypesQuestions: Question[] = [
  {
    id: 17,
    question: "What is prototypal inheritance?",
    answer: "Prototypal inheritance is a form of inheritance where an object inherits properties and methods directly from another object (its prototype). In JavaScript, every object has an internal link to another object called its prototype. When we try to access a property that doesn't exist on an object, JS automatically searches up the prototype chain until it finds the property or reaches null.",
    category: "objects_prototypes",
    difficulty: "Medium",
    codeExample: `const animal = {
  eats: true,
  walk() { return "Walking..."; }
};

const rabbit = Object.create(animal);
rabbit.jumps = true;

console.log(rabbit.eats); // true (inherited)
console.log(rabbit.walk()); // "Walking..." (inherited)`,
    explanationSteps: [
      "Create prototype object animal.",
      "Object.create(animal) creates rabbit, setting rabbit.__proto__ to animal.",
      "Accessing rabbit.walk looks up walk on rabbit (missing), then finds it on animal."
    ],
    playgroundCode: `const parent = { greet() { return "Hello from parent"; } };
const child = Object.create(parent);
console.log(child.greet());`
  },
  {
    id: 18,
    question: "What does Object.create do?",
    answer: "Object.create(proto, [propertiesObject]) is a static method that creates a brand new object, setting its internal prototype (__proto__) to point directly to the object passed as the first argument. This allows for direct prototypal inheritance without relying on ES6 class constructors.",
    category: "objects_prototypes",
    difficulty: "Medium",
    codeExample: `const protoObj = {
  role: "User",
  describe() { return "I am a " + this.role; }
};

const admin = Object.create(protoObj);
admin.role = "Admin"; // Shadowing role

console.log(admin.describe()); // "I am a Admin"`,
    explanationSteps: [
      "Object.create allocates an empty object {} in heap memory.",
      "It links the newly allocated object's [[Prototype]] slot to protoObj.",
      "Allows optional propertiesObject definition to define descriptors on-the-fly."
    ],
    playgroundCode: `const simple = Object.create({ val: 10 });
console.log(simple.val);`
  },
  {
    id: 19,
    question: "What is the prototype chain?",
    answer: "The prototype chain is the link of parent prototype objects that JavaScript follows during property resolution. When a property or method is accessed on an object, JS first checks the object itself. If missing, it traverses the object's __proto__ link, checking the parent, grandparent, and so on. The chain ends at Object.prototype. If still not found, Object.prototype.__proto__ (which is null) is reached, and undefined is returned.",
    category: "objects_prototypes",
    difficulty: "Hard",
    codeExample: `const array = [1, 2];
// 1. Checks 'array' for 'push' -> No
// 2. Checks 'Array.prototype' for 'push' -> Yes!
// 3. Checks 'Object.prototype' if missing
// 4. Ends at 'null'

console.log(array.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true`,
    explanationSteps: [
      "Accessing property starts a lookup chain.",
      "Traversal checks sequential proto pointers in memory.",
      "Ends with undefined if null is reached."
    ],
    playgroundCode: `const arr = [];
console.log("arr -> Array.prototype -> Object.prototype -> null");
console.log(arr.__proto__.__proto__.__proto__);`
  },
  {
    id: 20,
    question: "What is a class in JS under the hood?",
    answer: "In JavaScript, classes (introduced in ES6) are not real classes like in Java or C++. They are syntactic sugar over JavaScript's existing prototype-based inheritance model. Defining class methods actually attaches them to the constructor's prototype object, keeping memory usage clean as all instances share a single prototype method allocation.",
    category: "objects_prototypes",
    difficulty: "Medium",
    codeExample: `class User {
  constructor(name) { this.name = name; }
  greet() { return "Hi " + this.name; }
}

console.log(typeof User); // "function"
console.log(User.prototype.greet); // It's attached to the prototype!`,
    explanationSteps: [
      "Class declaration creates a constructor function User.",
      "All methods defined inside the class block are compiled and assigned to User.prototype.",
      "Instantiation (new User) creates an object linked to User.prototype."
    ],
    playgroundCode: `class Dog { bark() { return "Woof"; } }
const d = new Dog();
console.log("Method on proto? " + (Dog.prototype.bark !== undefined));`
  },
  {
    id: 26,
    question: "What is the difference between deep copy and shallow copy?",
    answer: "A shallow copy copies only the top-level values and references of an object; nested objects or arrays are not duplicated but shared by reference. A deep copy fully recursively duplicates every single nested object and array, ensuring that the original and copied objects share no references in memory.",
    category: "objects_prototypes",
    difficulty: "Medium",
    codeExample: `const original = { name: "A", info: { age: 10 } };

// Shallow Copy
const shallow = { ...original };
shallow.info.age = 99;
console.log(original.info.age); // 99 (affected!)

// Deep Copy
const deep = structuredClone(original);
deep.info.age = 22;
console.log(original.info.age); // 99 (safe!)`,
    explanationSteps: [
      "Shallow copy (spread, Object.assign) duplicates outer keys but keeps inner references.",
      "Deep copy (structuredClone, deep-merge) walks the reference tree and clones nested structures.",
      "Modifying nested attributes on a shallow clone corrupts original state."
    ],
    playgroundCode: `const obj = { x: [1, 2] };
const clone = { ...obj };
clone.x.push(3);
console.log("Original affected? " + obj.x);`
  },
  {
    id: 27,
    question: "How do you deep clone an object in modern JS?",
    answer: "The modern, standard way to deep clone in JavaScript is using the built-in global function structuredClone(obj). It supports deep cloning, maintains dates, regexes, sets, maps, and handles circular references correctly. A legacy alternative is JSON.parse(JSON.stringify(obj)), which works but loses functions, undefined, Map/Set structures, and blows up on circular structures.",
    category: "objects_prototypes",
    difficulty: "Medium",
    codeExample: `const original = {
  date: new Date(),
  set: new Set([1, 2]),
  nested: { key: "val" }
};

const copy = structuredClone(original);
console.log(copy.nested !== original.nested); // true (deeply cloned)
console.log(copy.date instanceof Date);       // true (preserved!)`,
    explanationSteps: [
      "Call structuredClone(original).",
      "Engine serializes values natively, rebuilding them in deep clones.",
      "Loses no type information for standard JavaScript data objects."
    ],
    playgroundCode: `const data = { u: undefined, d: new Date() };
const jsonClone = JSON.parse(JSON.stringify(data));
const structClone = structuredClone(data);
console.log("JSON date type:", typeof jsonClone.d); // string
console.log("Structured date type:", structClone.d instanceof Date); // true`
  },
  {
    id: 28,
    question: "What is destructuring?",
    answer: "Destructuring is a syntax that allows you to unpack values from arrays, or properties from objects, into distinct variables with ease. It can be used for variable extraction, renaming, setting defaults, and mapping parameters inside function signatures.",
    category: "objects_prototypes",
    difficulty: "Easy",
    codeExample: `const user = { name: "Alex", age: 25 };
const { name: userName, age, country = "USA" } = user;

console.log(userName, age, country); // "Alex", 25, "USA"

const arr = [1, 2, 3];
const [first, , third] = arr;
console.log(first, third); // 1, 3`,
    explanationSteps: [
      "Target variables match matching properties inside the source object/array.",
      "Can assign aliases (e.g., name: userName) to avoid scope collision.",
      "Enables specifying fallback default values if properties are undefined."
    ],
    playgroundCode: `const [x, y = 10] = [5];
console.log({ x, y });`
  },
  {
    id: 29,
    question: "What is the spread operator used for?",
    answer: "The spread operator (...) expands an iterable (like an array, string, or object) into its individual elements. It is used to shallow copy arrays/objects, merge them, convert string characters into arrays, or pass elements of an array as arguments to a function.",
    category: "objects_prototypes",
    difficulty: "Easy",
    codeExample: `// 1. Copying and merging arrays
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

// 2. Merging objects
const details = { age: 30 };
const profile = { name: "Zack", ...details };`,
    explanationSteps: [
      "Unpacks elements of the target collection inline.",
      "Copies enumerable key-value bindings to new memory allocations.",
      "Useful to prevent modifying original collections (pure programming)."
    ],
    playgroundCode: `const list = [10, 20];
const max = Math.max(...list);
console.log("Max is: " + max);`
  },
  {
    id: 47,
    question: "What is a WeakMap and why use it over a Map?",
    answer: "A WeakMap is a specialized Map collection where keys must be objects (primitives are not allowed) and are held as 'weak' references. This means that if there are no other references remaining to a key object in the application, the object can be safely garbage collected. WeakMaps prevent memory leaks and are used for storing private properties, caching metadata, or attaching extra data to DOM nodes.",
    category: "objects_prototypes",
    difficulty: "Hard",
    codeExample: `let element = { id: "btn" }; // object reference
const cache = new WeakMap();

cache.set(element, "Metadata");
console.log(cache.get(element)); // "Metadata"

element = null; // element is eligible for Garbage Collection!
// The entry in cache will be cleaned up automatically`,
    explanationSteps: [
      "Keys must be objects.",
      "Maintains weak pointers to key records in heap storage.",
      "Enables automatic resource cleanup to prevent memory bloating."
    ],
    playgroundCode: `const wm = new WeakMap();
let obj = {};
wm.set(obj, "value");
console.log(wm.get(obj));`
  },
  {
    id: 48,
    question: "What is the difference between Map and a plain object for key-value storage?",
    answer: "An ES6 Map preserves insertion order, allows keys of any type (including functions, objects, and primitives), and has a built-in .size property. Plain objects only allow strings or symbols as keys, do not guarantee order, and inherit prototype properties (which can create name collisions unless created with Object.create(null)). Use Map for frequent additions/removals and complex key bindings.",
    category: "objects_prototypes",
    difficulty: "Medium",
    codeExample: `const map = new Map();
const keyObj = { id: 1 };

map.set(keyObj, "User Data");
console.log(map.size); // 1
console.log(map.get(keyObj)); // "User Data"

const obj = {};
obj[keyObj] = "Overwrites [object Object]!";`,
    explanationSteps: [
      "Plain object keys are forced into strings or symbols via coercion.",
      "Map maintains discrete references without stringifying objects.",
      "Map provides fast, direct lookup and size tracking natively."
    ],
    playgroundCode: `const m = new Map();
m.set(1, "number");
m.set("1", "string");
console.log(m.get(1) !== m.get("1"));`
  },
  {
    id: 55,
    question: "What is the difference between Object.freeze and const?",
    answer: "const is a variable binding constraint — it prevents you from reassigning the variable name to another value, but does not stop you from mutating the properties of an object it holds. Object.freeze is a value constraint — it takes an object and prevents any mutations, additions, or deletions of its properties, rendering the object completely immutable (at a shallow level).",
    category: "objects_prototypes",
    difficulty: "Medium",
    codeExample: `const user = { name: "Alice" };
user.name = "Bob"; // Works fine!

const frozen = Object.freeze({ name: "Alice" });
try {
  frozen.name = "Bob"; // Silent failure, or TypeError in strict mode
} catch(e) {
  console.log("Cannot mutate frozen object!");
}`,
    explanationSteps: [
      "const forbids re-binding (using '=' on variable again).",
      "Object.freeze modifies the internal descriptors of the target object, setting writable: false and configurable: false.",
      "Frozen objects cannot have properties added, deleted, or altered."
    ],
    playgroundCode: `const obj = { age: 20 };
Object.freeze(obj);
try {
  obj.age = 21;
} catch(e) {
  console.log("Error: " + e.message);
}
console.log(obj.age);`
  },
  {
    id: 56,
    question: "What is the difference between shallow freeze and deep freeze?",
    answer: "Object.freeze() performs a shallow freeze, meaning it only freezes the immediate (top-level) properties of an object. If a property is a nested object, that nested object is not frozen and remains fully mutable. A deep freeze requires a custom recursive function that calls Object.freeze() on every nested object property.",
    category: "objects_prototypes",
    difficulty: "Medium",
    codeExample: `const shallow = Object.freeze({ name: "A", detail: { age: 10 } });
shallow.detail.age = 99; // MUTABLE!

function deepFreeze(obj) {
  Object.freeze(obj);
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  });
}`,
    explanationSteps: [
      "Object.freeze sets writable: false to top-level fields only.",
      "Deep freeze recursively scans object attributes looking for sub-objects.",
      "Freezing nested structures seals the entire object hierarchy deeply."
    ],
    playgroundCode: `const simple = { nested: { val: 5 } };
Object.freeze(simple);
simple.nested.val = 10;
console.log("Nested remains mutable on shallow freeze: " + simple.nested.val);`
  },
  {
    id: 78,
    question: "What is a memory leak in JS and a common cause in web apps?",
    answer: "A memory leak occurs when memory allocated by an application is no longer needed by the program, but is not released back to the operating system or browser because references to it still exist. Common causes include uncleaned event listeners, forgotten setInterval/setTimeout timers, out-of-scope variables, and detached DOM nodes that are still referenced in JS code.",
    category: "objects_prototypes",
    difficulty: "Medium",
    codeExample: `// Memory Leak Example
function setupLeak() {
  const giantData = new Array(1000000).fill("Data");
  
  window.addEventListener("resize", function onResize() {
    // Keeps giantData in closure scope, leaking it indefinitely
    console.log(giantData.length);
  });
} // If onResize is never removed, giantData leaks!`,
    explanationSteps: [
      "Variables must have zero active references to be cleaned.",
      "Timers or event listeners hold references to their containing closures.",
      "Navigating away without calling removeEventListener leaks active resources."
    ],
    playgroundCode: `console.log("Memory leaks require clearing event listeners and timers!");`
  },
  {
    id: 79,
    question: "What is garbage collection in JS?",
    answer: "Garbage collection in JavaScript is an automatic memory management process that monitors memory allocation and determines when block structures are no longer reachable. The primary algorithm used is 'Mark-and-Sweep'. It starts from 'root' variables (like window, active frame stack) and marks all reachable references. Unmarked objects are considered unreachable and are swept (reclaimed) from memory.",
    category: "objects_prototypes",
    difficulty: "Medium",
    codeExample: `let user = { name: "Alice" }; // Alice allocated, reachable via user.
user = null; // No reference points to Alice.

// Alice is marked for garbage collection and will be freed during next sweep.`,
    explanationSteps: [
      "Engine starts GC at roots (e.g. global context, stack frames).",
      "Marks every reference chain linked recursively to those roots.",
      "Any unvisited allocations in heap are destroyed and memory is freed."
    ],
    playgroundCode: `let data = { x: 1 };
data = null; // GC target`
  },
  {
    id: 83,
    question: "What is a Proxy in JS?",
    answer: "A Proxy is a powerful ES6 object that wraps an underlying target object or function, allowing you to intercept and customize fundamental operations (like property lookup, assignment, enumeration, function invocation, etc.) by defining 'traps' inside a handler object.",
    category: "objects_prototypes",
    difficulty: "Hard",
    codeExample: `const target = { name: "Bob" };
const handler = {
  get(obj, prop) {
    return prop in obj ? obj[prop] : "Not Found";
  },
  set(obj, prop, value) {
    if (prop === "age" && value < 0) {
      throw new Error("Age cannot be negative");
    }
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);`,
    explanationSteps: [
      "Define target object.",
      "Define handler object with custom trap methods (like get, set, deleteProperty).",
      "Create proxy = new Proxy(target, handler). All reads/writes route through traps."
    ],
    playgroundCode: `const p = new Proxy({ x: 1 }, {
  get(target, prop) { return "Accessing " + String(prop) + " = " + target[prop]; }
});
console.log(p.x);`
  },
  {
    id: 84,
    question: "What is Reflect used for?",
    answer: "Reflect is a built-in global object that provides static helper methods for intercepting JavaScript operations. Its methods match those of Proxy handler traps exactly. Reflect makes it simple and clean to forward default operations from a Proxy trap directly to the wrapped target object.",
    category: "objects_prototypes",
    difficulty: "Hard",
    codeExample: `const target = { name: "Bob" };
const handler = {
  get(obj, prop, receiver) {
    console.log("Inspecting: " + prop);
    // Forward the default property read operation cleanly
    return Reflect.get(obj, prop, receiver);
  }
};

const proxy = new Proxy(target, handler);`,
    explanationSteps: [
      "Reflect methods have identical signatures to Proxy trap methods.",
      "Bypasses direct property assignment and provides clean functional outputs.",
      "Corrects context edge cases for inherited getter/setter properties via receiver parameters."
    ],
    playgroundCode: `const user = { name: "Sam" };
console.log(Reflect.get(user, "name"));`
  },
  {
    id: 93,
    question: "What's the difference between Object.assign and spread for merging objects?",
    answer: "Both perform shallow copies. The main differences are: 1. Object.assign is an imperative method that mutates the first target object passed to it (unless you pass an empty {} as the first arg), whereas the spread operator is a declarative syntax that always creates a new object; 2. Object.assign triggers setters on the target object, whereas spread directly defines new properties.",
    category: "objects_prototypes",
    difficulty: "Medium",
    codeExample: `const target = { a: 1 };
const source = { b: 2 };

// Mutates target!
Object.assign(target, source); 

// Purely creates a new object
const cleanMerge = { ...target, ...source };`,
    explanationSteps: [
      "Object.assign(target, ...sources) overwrites matching keys directly in target.",
      "Spread constructs a new literal object mapping keys sequentially.",
      "Object.assign triggers getters/setters; spread uses defineProperty definitions."
    ],
    playgroundCode: `const a = { x: 1 };
const b = { y: 2 };
const merged = Object.assign({}, a, b);
console.log(merged);`
  },
  {
    id: 94,
    question: "What's the risk of comparing objects with ===?",
    answer: "In JavaScript, object comparison (including array and function comparison) evaluates by memory reference, not by structural value. Two separate objects with identical keys and values will evaluate to false with '===' because they point to different memory allocations in the heap.",
    category: "objects_prototypes",
    difficulty: "Easy",
    codeExample: `const a = { x: 1 };
const b = { x: 1 };
const c = a;

console.log(a === b); // false (different references)
console.log(a === c); // true (same reference)`,
    explanationSteps: [
      "Primitives compare directly by their value (e.g., 5 === 5 is true).",
      "Objects are compared by their memory addresses (pointers).",
      "To compare objects structurally, write a deep-equality function or stringify them."
    ],
    playgroundCode: `const arr1 = [1, 2];
const arr2 = [1, 2];
console.log("arr1 === arr2:", arr1 === arr2);`
  }
];
