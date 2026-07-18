import { Question } from '../types';

export const typesCoercionQuestions: Question[] = [
  {
    id: 21,
    question: "What is the difference between == and ===?",
    answer: "== (abstract equality) compares two values after coercing (converting) them to a common type if they differ. === (strict equality) compares both value and type directly without any coercion. If types are different, === immediately returns false. For professional code, === is strongly preferred to avoid subtle type coercion bugs.",
    category: "types_coercion",
    difficulty: "Easy",
    codeExample: `console.log(5 == "5");  // true (string coerced to number)
console.log(5 === "5"); // false (number vs string)

console.log(null == undefined);  // true
console.log(null === undefined); // false`,
    explanationSteps: [
      "== checks for type equivalence and converts types.",
      "=== checks that the primitive values and types are identical.",
      "Using == can lead to strange edge cases like false == [] which returns true."
    ],
    playgroundCode: `console.log("0 == false:", 0 == false);
console.log("0 === false:", 0 === false);`
  },
  {
    id: 22,
    question: "What are falsy values in JS?",
    answer: "There are exactly six falsy values in JavaScript. When coerced to a boolean (like in an if statement), they evaluate to false. They are: false, 0 (including -0 and 0n), '' (empty string), null, undefined, and NaN. Every other value in JavaScript is truthy, including empty arrays [] and empty objects {}.",
    category: "types_coercion",
    difficulty: "Easy",
    codeExample: `const values = [false, 0, "", null, undefined, NaN];
values.forEach(v => {
  if (!v) console.log(v + " is falsy!");
});

if ([]) console.log("Empty array is TRUTHY!");
if ({}) console.log("Empty object is TRUTHY!");`,
    explanationSteps: [
      "Any condition evaluated inside Boolean(v) is processed.",
      "The specified six values default to boolean false.",
      "Non-empty values, empty collections, and function objects evaluate to true."
    ],
    playgroundCode: `console.log("Boolean([]):", Boolean([]));
console.log("Boolean(''):", Boolean(''));`
  },
  {
    id: 23,
    question: "What is NaN and how do you check for it?",
    answer: "NaN stands for 'Not-a-Number'. It is a numeric primitive representing an invalid or mathematically undefined computation (e.g. 0 / 0 or Math.sqrt(-1)). A key quirk is that NaN is the only value in JavaScript that is not equal to itself (NaN === NaN is false). To check safely, use the modern Number.isNaN(x) (returns true only for true NaN) rather than the global isNaN(x) which converts non-numbers first.",
    category: "types_coercion",
    difficulty: "Easy",
    codeExample: `const badMath = 0 / 0; // NaN

console.log(badMath === NaN); // false!

console.log(Number.isNaN(badMath)); // true
console.log(Number.isNaN("hello")); // false (safe!)
console.log(isNaN("hello"));        // true (unsafe - coerced "hello" to NaN first)`,
    explanationSteps: [
      "NaN stands for numeric errors but is actually of type 'number'.",
      "NaN is self-inequal.",
      "Number.isNaN guarantees direct validation without automatic conversion."
    ],
    playgroundCode: `console.log("typeof NaN:", typeof NaN);
console.log("NaN === NaN:", NaN === NaN);
console.log("Number.isNaN(NaN):", Number.isNaN(NaN));`
  },
  {
    id: 24,
    question: "What is the difference between null and undefined?",
    answer: "undefined represents the complete absence of a value because a variable was declared but never initialized, or a function returned nothing, or a property doesn't exist. null is an active assignment representing 'no value' — a developer-specified empty state. Note that typeof null returns 'object' (a historical bug), whereas typeof undefined returns 'undefined'.",
    category: "types_coercion",
    difficulty: "Easy",
    codeExample: `let a; // undefined
const b = null; // null (assigned empty state)

console.log(typeof a); // "undefined"
console.log(typeof b); // "object" (JavaScript bug!)

console.log(a == b);  // true (loose check)
console.log(a === b); // false (strict check)`,
    explanationSteps: [
      "undefined is the default fallback value for unassigned registers.",
      "null is an explicit marker for an empty reference.",
      "Checking typeof null yields 'object' due to primitive bitmask storage designs in early JS."
    ],
    playgroundCode: `let undefVar;
let nullVar = null;
console.log({ undefVar, nullVar });`
  },
  {
    id: 25,
    question: "What is type coercion?",
    answer: "Type coercion is the automatic conversion of values from one data type to another (such as string to number or vice-versa) performed by the JavaScript runtime during operations. It can be implicit (done automatically by the JS engine, e.g. '5' + 1) or explicit (triggered manually by the developer, e.g. Number('5')).",
    category: "types_coercion",
    difficulty: "Medium",
    codeExample: `// Implicit Coercion
console.log("5" + 2); // "52" (number coerced to string due to '+')
console.log("5" - 2); // 3 (string coerced to number due to '-')
console.log(false == 0); // true (boolean coerced to number)

// Explicit Coercion
const num = Number("42"); // 42`,
    explanationSteps: [
      "Binary operators trigger specific operand checks.",
      "Addition '+' favors strings (concatenation).",
      "Subtraction, multiplication, and division favor numbers."
    ],
    playgroundCode: `console.log("'5' * 2 =", "5" * 2);
console.log("'5' + 2 =", "5" + 2);`
  },
  {
    id: 51,
    question: "What is Symbol used for?",
    answer: "Symbol is an ES6 primitive type used to create completely unique, immutable identifiers. Symbols are primarily used to add hidden, non-colliding property keys to objects that won't interfere with normal keys or be accidentally overwritten by external libraries, and are skipped during standard loops like for...in.",
    category: "types_coercion",
    difficulty: "Medium",
    codeExample: `const secretKey = Symbol("id");
const user = {
  name: "Alice",
  [secretKey]: 12345
};

console.log(user[secretKey]); // 12345
console.log(Object.keys(user)); // ["name"] (Symbol key is hidden!)`,
    explanationSteps: [
      "Symbol('desc') returns a globally unique primitive reference.",
      "Assigning the symbol as an object key isolates the field.",
      "Symbol keys are excluded from JSON.stringify and Object.keys listings, but accessible via Object.getOwnPropertySymbols()."
    ],
    playgroundCode: `const s1 = Symbol("key");
const s2 = Symbol("key");
console.log("s1 === s2:", s1 === s2);`
  },
  {
    id: 52,
    question: "What is optional chaining (?.)",
    answer: "Optional chaining is an ES2020 operator that lets you read the value of a property located deep within a chain of connected objects without having to validate each reference in the chain. If an intermediate reference is null or undefined, the expression short-circuits and evaluates to undefined rather than throwing a TypeError.",
    category: "types_coercion",
    difficulty: "Easy",
    codeExample: `const user = { profile: { name: "Bob" } };

// Without optional chaining
const age1 = user.profile && user.profile.details && user.profile.details.age;

// With optional chaining
const age2 = user?.profile?.details?.age;

console.log(age2); // undefined (does not crash!)`,
    explanationSteps: [
      "Check current reference prior to reaching property accessor '.'.",
      "If nullish, stop execution immediately and return undefined.",
      "Can be used with property lookups, bracket indexing, and function calls."
    ],
    playgroundCode: `const test = {};
console.log("test?.address?.city:", test?.address?.city);`
  },
  {
    id: 53,
    question: "What is nullish coalescing (??)",
    answer: "The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined. Otherwise, it returns its left-hand side operand. It is a safer alternative to the logical OR (||) when providing default values.",
    category: "types_coercion",
    difficulty: "Easy",
    codeExample: `const speed = 0;

// Logical OR (||) - 0 is falsy, overrides with default!
const finalSpeed1 = speed || 50; // 50

// Nullish Coalescing (??) - 0 is NOT nullish, preserves valid value!
const finalSpeed2 = speed ?? 50; // 0`,
    explanationSteps: [
      "Assess left-hand operand.",
      "If value is strict null or undefined, yield right-hand operand.",
      "If left-hand value is a valid falsy (like 0, '', false), preserve it."
    ],
    playgroundCode: `const text = "";
console.log("OR empty:", text || "default");
console.log("Coalesce empty:", text ?? "default");`
  },
  {
    id: 54,
    question: "Why prefer ?? over || for defaults sometimes?",
    answer: "You should prefer ?? over || when valid falsy values (like 0, false, or empty strings '') are fully acceptable inputs and should not be replaced by a fallback default. The || operator replaces any falsy value, whereas ?? ONLY replaces null and undefined.",
    category: "types_coercion",
    difficulty: "Easy",
    codeExample: `const config = {
  debugMode: false,
  retries: 0
};

const debug = config.debugMode || true;  // true (Incorrectly overridden!)
const retries = config.retries ?? 5;     // 0 (Correctly preserved!)`,
    explanationSteps: [
      "Identify falsy values that are valid configuration parameters (0, false).",
      "Use ?? to guard strictly against absent values."
    ],
    playgroundCode: `const val = false;
console.log("val || true =", val || true);
console.log("val ?? true =", val ?? true);`
  },
  {
    id: 73,
    question: "What is JSON.stringify/parse used for and a common pitfall?",
    answer: "JSON.stringify/parse are used to serialize JS objects into JSON strings (for networks/storage) and parse them back. A common pitfall is that serialization discards properties holding functions, symbols, or undefined values, converts NaN and Infinity to null, and serializes Date objects into ISO string representations instead of preserving them as Dates.",
    category: "types_coercion",
    difficulty: "Medium",
    codeExample: `const data = {
  name: "Alice",
  birthDate: new Date("2026-01-01"),
  hidden: undefined,
  greet() { return "Hi"; }
};

const stringified = JSON.stringify(data);
console.log(stringified); // {"name":"Alice","birthDate":"2026-01-01T00:00:00.000Z"}
// Note: 'hidden' and 'greet' were deleted!

const parsed = JSON.parse(stringified);
console.log(typeof parsed.birthDate); // "string" (lost Date object!)`,
    explanationSteps: [
      "JSON standard has a smaller, strictly primitive-oriented schema than JavaScript objects.",
      "Functions and undefined cannot be represented in JSON syntax, so they are ignored/stripped.",
      "To preserve special formats, use replacer/reviver callback arguments."
    ],
    playgroundCode: `const test = { f: () => {}, u: undefined };
console.log("Result:", JSON.stringify(test));`
  },
  {
    id: 74,
    question: "What is the difference between Object.keys, Object.values, and Object.entries?",
    answer: "These static methods convert objects into arrays of their own enumerable properties: Object.keys() returns an array of string keys; Object.values() returns an array of property values; Object.entries() returns an array of nested key-value pairs [key, value], which is highly useful for looping and Map initializations.",
    category: "types_coercion",
    difficulty: "Easy",
    codeExample: `const user = { name: "Bob", role: "Dev" };

console.log(Object.keys(user));    // ["name", "role"]
console.log(Object.values(user));  // ["Bob", "Dev"]
console.log(Object.entries(user)); // [["name", "Bob"], ["role", "Dev"]]`,
    explanationSteps: [
      "Each method returns a standard Array structure.",
      "Extracts only own properties (skips inherited prototype properties).",
      "Filters out non-enumerable properties automatically."
    ],
    playgroundCode: `const person = { x: 10, y: 20 };
console.log(Object.entries(person));`
  },
  {
    id: 75,
    question: "What is a Set and when would you use one?",
    answer: "A Set is a built-in ES6 collection object that stores unique values of any type, whether primitive values or object references. You should use a Set when you need to maintain a list where duplicates are strictly forbidden, or when you need fast, O(1) membership checking using the .has() method (which is significantly faster than Array.prototype.includes() on large datasets).",
    category: "types_coercion",
    difficulty: "Easy",
    codeExample: `const ids = new Set([1, 2, 2, 3]);
ids.add(4);
ids.add(1); // Ignored (already exists)

console.log(ids.size); // 4
console.log(ids.has(3)); // true`,
    explanationSteps: [
      "Instantiate new Set.",
      "Duplicate values are automatically filtered out during insertion.",
      "Provides sub-linear lookup times for member validation."
    ],
    playgroundCode: `const s = new Set([10, 20, 20]);
console.log("Set items:", [...s]);`
  },
  {
    id: 76,
    question: "How would you remove duplicates from an array?",
    answer: "The cleanest and most performance-efficient way to remove duplicates from an array is to wrap it in an ES6 Set to filter out matching entries, and then spread the Set back into a new array. E.g. const unique = [...new Set(array)].",
    category: "types_coercion",
    difficulty: "Easy",
    codeExample: `const duplicates = [1, 2, 2, 3, 4, 4, 1];

const unique = [...new Set(duplicates)];
console.log(unique); // [1, 2, 3, 4]`,
    explanationSteps: [
      "The Set constructor accepts the duplicates array as an iterable.",
      "Set automatically filters out identical entries during instantiation.",
      "The spread operator [...] unpacks the unique Set values back into a new array literal."
    ],
    playgroundCode: `const names = ["A", "B", "A"];
console.log([...new Set(names)]);`
  },
  {
    id: 86,
    question: "What is short-circuit evaluation?",
    answer: "Short-circuit evaluation means that logical expressions (using && or ||) stop evaluation as soon as the outcome is determined. In `A && B`, if A is falsy, JS returns A immediately without evaluating B. In `A || B`, if A is truthy, JS returns A immediately without evaluating B. Developers use this for conditionally calling functions or rendering UI.",
    category: "types_coercion",
    difficulty: "Easy",
    codeExample: `// Short-circuiting guard
const user = { loggedIn: true, name: "Alice" };
user.loggedIn && console.log("Welcome, " + user.name);

// Fallback values
const displayName = user.nickname || "Anonymous";`,
    explanationSteps: [
      "Process logical chain left-to-right.",
      "Check truthiness of first operand.",
      "Halt immediately and return the causing operand if condition is met."
    ],
    playgroundCode: `let loaded = true;
loaded && console.log("Triggered because 'loaded' is true");`
  }
];
