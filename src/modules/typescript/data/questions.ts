import { Question } from '../types';

export const questionsData: Question[] = [
  {
    id: 1,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is TypeScript?",
    shortAnswer: "A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
    detailedAnswer: "TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical **superset of JavaScript** and adds optional static typing to the language.\n\nBecause TypeScript is a superset of JavaScript, all existing JavaScript code is valid TypeScript code. TypeScript compiles to clean, simple JavaScript code which runs on any browser, in Node.js, or in any JavaScript engine that supports ECMAScript 3 (or newer).\n\n### Core Benefits\n- **Static Type Checking**: Catch bugs at compile-time before executing code.\n- **Rich IDE Support**: Autocomplete, navigation, and safe refactoring.\n- **Self-Documenting Code**: Types make code signatures clear without stale comments.",
    codeExample: `// Standard JavaScript:
function greetJS(user) {
  return "Hello " + user.name;
}

// Type-safe TypeScript:
interface User {
  name: string;
}
function greetTS(user: User): string {
  return \`Hello \${user.name}\`;
}`,
    latexFormula: "\\text{TypeScript} \\supset \\text{JavaScript}",
    quizOptions: [
      "A completely different language that replaces JavaScript in browsers",
      "A strict syntactical superset of JavaScript adding static typing",
      "A specialized database framework for Node.js",
      "An alternative runtime engine for browser scripts"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "TypeScript is a superset of JavaScript, which means all valid JS is valid TS, and TS simply adds a static compilation and type-checking layer on top."
  },
  {
    id: 2,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "Why use TypeScript over JavaScript?",
    shortAnswer: "It catches type mismatches and bugs early at compile-time, improves autocompletion, and simplifies large-scale refactoring.",
    detailedAnswer: "While JavaScript is dynamically typed and flexible, it shifts all error detection to runtime. In large applications, this results in silent failures like `Cannot read property 'undefined' of...`.\n\n### Why Choose TypeScript?\n1. **Early Bug Prevention**: Catches structural mistakes, missing arguments, or potential null pointer exceptions during coding.\n2. **Enhanced Tooling**: Modern IDEs leverage TypeScript types to provide instant, precise autocompletion and type-definition lookups.\n3. **Safe Refactoring**: Renaming functions or re-architecting interfaces updates all call-sites safely.\n4. **Team Collaboration**: Types act as a living documentation of your backend and frontend structures, facilitating onboarding.",
    codeExample: `// JS fails at runtime silently or throws an error:
const apiResponse = { user: { id: 1 } };
console.log(apiResponse.user.profile.avatar); // TypeError: Cannot read property 'avatar' of undefined

// TS alerts you immediately before compile:
interface ApiResponse {
  user: {
    id: number;
    profile?: { avatar: string };
  }
}
const res: ApiResponse = { user: { id: 1 } };
// TS Error: Object is possibly 'undefined'
console.log(res.user.profile.avatar); 
// Fixed via Optional Chaining:
console.log(res.user.profile?.avatar);`,
    latexFormula: "\\text{Code Quality} \\propto \\text{Type Safety}",
    quizOptions: [
      "Because JavaScript is no longer supported by modern browsers",
      "Because TypeScript compiles directly into assembly code",
      "Because it catches errors at compile-time and provides robust autocompletion",
      "Because it makes code run twice as fast at runtime"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "TypeScript's primary value lies in its compile-time validation, preventing runtime exceptions, and augmenting the developer's editing feedback loop."
  },
  {
    id: 3,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is type inference?",
    shortAnswer: "The compiler's ability to automatically figure out and assign a type to a variable based on its initial value.",
    detailedAnswer: "In TypeScript, you don't need to explicitly annotate every single variable. The compiler analyzes the literal values, return values, and parameters to deduce the type. This is known as **Type Inference**.\n\nIf you assign a literal string to a variable, TypeScript infers that its type is `string`. If you update it later to a `number`, the compiler will throw an error.\n\n### Best Practice\nOnly add explicit annotations when the type cannot be inferred, or when starting an empty container that will hold values of a specific interface later.",
    codeExample: `let userName = "Alice"; // Inferred as 'string'
// userName = 42; // Error: Type 'number' is not assignable to type 'string'

function add(a: number, b: number) {
  return a + b; // Return type inferred as 'number'
}`,
    latexFormula: "f(x) \\in Y \\implies x \\mapsto Y",
    quizOptions: [
      "A way to force variables to change their types dynamically",
      "The automatic determination of a type by the compiler based on assigned values",
      "Converting TypeScript code into Python syntax automatically",
      "An IDE-only warning that has no effect on compilation"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Type inference lets TypeScript deduce the variable's type from its initializer, keeping the code concise without sacrificing type safety."
  },
  {
    id: 4,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is the difference between interface and type?",
    shortAnswer: "Interfaces are extendable and support declaration merging; Types are more flexible, supporting union, intersection, and primitive aliases.",
    detailedAnswer: "Both `interface` and `type` can describe object shapes and function structures, but they have key differences.\n\n### `interface`\n- Supports **Declaration Merging**: Defining the same interface name twice merges their fields.\n- Supports inheritance using the `extends` keyword.\n- Ideal for defining external library definitions, public APIs, or database models.\n\n### `type` (Type Alias)\n- Can declare primitive aliases, union types, intersection types, tuples, or mapped types.\n- **Cannot** be reopened for declaration merging.\n- Better for expressing complex domain-driven types, such as state status states (`'loading' | 'success' | 'error'`).",
    codeExample: `// Declaration Merging (Interfaces):
interface Event { title: string; }
interface Event { date: Date; }
const party: Event = { title: "Graduation", date: new Date() };

// Union Type (Only possible with type):
type Status = "idle" | "loading" | "resolved";

// Intersection (Types):
type Point = { x: number } & { y: number };`,
    latexFormula: "\\text{Interface} \\subset \\text{Type Alias}",
    quizOptions: [
      "Interfaces only exist in compiled JS, types do not",
      "Interfaces support declaration merging and extends, while types support unions and intersections",
      "Types are checked at runtime, interfaces are checked at compile-time",
      "There is no difference; they are exactly identical in all scenarios"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Interfaces excel at OOP patterns, extending shapes, and combining schemas (declaration merging), whereas Type Aliases excel at composing unions, intersections, and functional primitives."
  },
  {
    id: 5,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is a union type?",
    shortAnswer: "A type that allows a value to be one of several specified types, declared using the pipe (|) symbol.",
    detailedAnswer: "A **Union Type** expresses a value that can be one of several types. We use the vertical bar (`|`) to separate each type.\n\nFor example, `string | number` describes a value that can be either a `string` or a `number`. Before performing operations specific to strings or numbers on a union type, you must narrow the type using a type guard (like `typeof`).",
    codeExample: `function printId(id: number | string) {
  if (typeof id === "string") {
    // Within this block, id is strictly known as string
    console.log(id.toUpperCase());
  } else {
    // Within this block, id is known as number
    console.log(id.toFixed(2));
  }
}`,
    latexFormula: "A \\cup B = \\{ x \\mid x \\in A \\lor x \\in B \\}",
    quizOptions: [
      "An array containing multiple datatypes at once",
      "A type that can be one of several different types, delimited by '|'",
      "A database join operation managed by TypeScript",
      "A function that returns multiple values simultaneously"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Union types let you represent values that can take on multiple distinct formats or schemas, providing complete type checking on the union's common members."
  },
  {
    id: 6,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is an intersection type?",
    shortAnswer: "A type that combines multiple existing types into a single type containing all properties of all types, using the ampersand (&).",
    detailedAnswer: "An **Intersection Type** combines multiple types into one. This allows you to add together existing types to get a single type that has all the features you need.\n\nWe use the ampersand symbol (`&`) to create an intersection. It is commonly used to compose small, cohesive type objects into richer models, such as combining user properties with access roles.",
    codeExample: `interface Person {
  name: string;
}
interface Serializable {
  serialize(): string;
}

// Intersecting Person and Serializable:
type SerializedPerson = Person & Serializable;

const user: SerializedPerson = {
  name: "Bob",
  serialize() {
    return JSON.stringify(this);
  }
};`,
    latexFormula: "A \\cap B = \\{ x \\mid x \\in A \\land x \\in B \\}",
    quizOptions: [
      "A type representing a property lookup mapping",
      "A type that is a copy of another type with some deleted keys",
      "An intersection of physical data tables",
      "A type combining multiple types so the final value must satisfy all of them"
    ],
    quizCorrectIndex: 3,
    quizExplanation: "An intersection type requires any conforming value to contain all members of all intersected components."
  },
  {
    id: 7,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is a literal type?",
    shortAnswer: "A highly specific type that represents exact value values, such as specific strings, numbers, or booleans.",
    detailedAnswer: "TypeScript allows you to use specific values as types. This is known as a **Literal Type**.\n\nBy themselves, literal types aren't very useful because they can only have one value. But when combined with union types, they allow you to create powerful state engines, constant collections, or strict string inputs.",
    codeExample: `// String Literal Union:
type ButtonVariant = "primary" | "secondary" | "danger";

function renderButton(variant: ButtonVariant) {
  // variant must be exactly one of those three strings
}

// Number Literal Union:
type DieRoll = 1 | 2 | 3 | 4 | 5 | 6;`,
    latexFormula: "S = \\{ \\text{\"primary\"}, \\text{\"secondary\"}, \\text{\"danger\"} \\}",
    quizOptions: [
      "A type that can accept absolutely any text",
      "A type restricting a variable to a specific, exact literal value",
      "A type defined only in JavaScript files",
      "An automated text-formatting macro"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Literal types constrain values to specific strings, numbers, or booleans, enabling precise and secure range enforcement."
  },
  {
    id: 8,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is 'any' and why is it discouraged?",
    shortAnswer: "A type that completely disables the type checker for a variable, turning off type safety and IDE intelligence.",
    detailedAnswer: "The `any` type is a wildcard escape hatch. It allows you to assign any value, invoke any method, or access any property without TypeScript validation.\n\n### Why is `any` discouraged?\n- **Loses Type Safety**: You lose all protection against runtime exceptions (e.g. typos, missing arguments).\n- **Degrades IDE Intelligence**: Autocomplete, renaming, and type lookups will not function for that value.\n- **Propagates Unsafety**: Once a value is `any`, any variable derived from it also becomes dynamically typed, polluting your codebase.",
    codeExample: `let data: any = { greet: () => "hello" };
data.someNonExistentMethod(); // Compiles perfectly! Throws TypeError at runtime.

// Assign anything to it:
data = "now a string";
console.log(data.fixedAmount); // Compiles perfectly! Returns undefined.`,
    latexFormula: "\\forall x, \\quad x \\in \\text{any}",
    quizOptions: [
      "A type used to represent asynchronous tasks in TypeScript",
      "A safe type that handles all numeric variations",
      "A wildcard type that disables type-checking entirely, exposing the app to runtime errors",
      "A modern standard keyword that should be used for all objects"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "The 'any' type tells the compiler to ignore type checks, converting TS back into plain dynamic JS and hiding runtime bugs."
  },
  {
    id: 9,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is 'unknown' and how does it differ from 'any'?",
    shortAnswer: "The type-safe counterpart to 'any'. It accepts any value but requires narrowing before you can perform operations on it.",
    detailedAnswer: "Like `any`, any value is assignable to `unknown`. However, unlike `any`, you cannot access properties on an `unknown` variable, call it, or construct it without first performing type narrowing (using `typeof`, `instanceof`, or custom type guards).\n\nThis makes `unknown` extremely useful for representing values that come from untrusted boundaries (like API requests, JSON parsed structures, or user inputs), forcing you to validate the data shape before interacting with it.",
    codeExample: `let value: unknown = "Hello World";

// value.toUpperCase(); // Error: Object is of type 'unknown'

if (typeof value === "string") {
  // Narrowed to string, safe to perform string operations!
  console.log(value.toUpperCase()); 
}`,
    latexFormula: "\\text{unknown} \\neq \\text{any} \\quad (\\text{Safe Top Type})",
    quizOptions: [
      "unknown only accepts null, while any accepts everything",
      "unknown is evaluated at runtime, while any is evaluated at compile time",
      "unknown allows any value but requires validation/narrowing before usage, making it type-safe",
      "There is no difference; they are exact aliases"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "unknown is the safe top type. You can assign anything to it, but you are not allowed to use it until you prove what type it actually is."
  },
  {
    id: 10,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is 'never'?",
    shortAnswer: "An empty type representing values that never occur, such as a function that always throws an error or an exhaustive switch fallback.",
    detailedAnswer: "The `never` type is used to represent values that can never occur.\n\n### Practical Applications\n1. **Unreachable Functions**: Functions that always throw an exception, or enter an infinite loop, return `never`.\n2. **Exhaustive Type-Checking**: In a switch statement over a discriminated union, the `default` block can assign the item to a variable typed `never`. If a developer adds a new option to the union but forgets to handle it in the switch, a compile-time type error occurs.",
    codeExample: `// 1. Unreachable Function
function throwError(message: string): never {
  throw new Error(message);
}

// 2. Exhaustiveness Check
type Animal = "cat" | "dog";
function handleAnimal(animal: Animal) {
  switch (animal) {
    case "cat": return "meow";
    case "dog": return "woof";
    default:
      const _exhaustiveCheck: never = animal; // No error!
      return _exhaustiveCheck;
  }
}`,
    latexFormula: "\\emptyset \\quad (\\text{Empty Type})",
    quizOptions: [
      "A type for values that exist only on servers",
      "A type that can hold null or undefined only",
      "An empty type representing values that can never occur, useful for exhaustiveness checks",
      "A loop structure similar to 'while'"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "never represents the empty set of types. It is perfect for indicating code branches that should be unreachable, enforcing complete switch case handling."
  },
  {
    id: 11,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is 'void'?",
    shortAnswer: "The return type of a function that returns no value (or returns undefined implicitly).",
    detailedAnswer: "`void` represents the absence of a return value. In JavaScript, a function without a `return` statement returns `undefined` implicitly.\n\nIn TypeScript, `void` is used as the return type of functions that do not return a value. Unlike `undefined` as a return type, a function with a `void` return signature doesn't force you to explicitly return a value at the end.",
    codeExample: `function logMessage(message: string): void {
  console.log(message);
  // Returns nothing
}

// If written as returning 'undefined', you MUST have a return statement:
function returnUndefined(): undefined {
  console.log("hello");
  return; // Required!
}`,
    latexFormula: "\\mathcal{F}: X \\to \\varnothing",
    quizOptions: [
      "A keyword used to delete variables in memory",
      "A type meaning the function returns null strictly",
      "The return type of a function that has no return value",
      "An asynchronous wrapper for server functions"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "void tells the consumer of a function that they should not expect or use any returned value from it."
  },
  {
    id: 12,
    category: "Fundamentals",
    difficulty: "Intermediate",
    question: "What are generics?",
    shortAnswer: "A way to write reusable, type-safe components or functions that work with multiple types while preserving type relationships.",
    detailedAnswer: "In software engineering, a major part of building reusable components is managing types. **Generics** provide a way to make components work over a variety of types rather than a single one.\n\nThis allows users to consume these components and pass their own types. Generics preserve type safety: if you pass a `string` into a generic identity function, TypeScript knows it must return a `string`, not a generic wildcard.",
    codeExample: `// Without generics (forces any or static type):
function identityAny(arg: any): any { return arg; }

// With generics:
function identity<T>(arg: T): T {
  return arg;
}

const result1 = identity<string>("myString"); // Inferred as 'string'
const result2 = identity(42); // T inferred as 'number' automatically!`,
    latexFormula: "f: T \\to T",
    quizOptions: [
      "A method to bundle TypeScript files together",
      "A way to create components that operate on a variety of types while keeping actual runtime types intact",
      "A feature used only for connecting to SQL databases",
      "A variable that can hold anything without compiler verification"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Generics allow code components to take a type parameter, creating flexible structures that maintain strong types based on usage."
  },
  {
    id: 13,
    category: "Fundamentals",
    difficulty: "Intermediate",
    question: "What is a generic constraint?",
    shortAnswer: "Using the 'extends' keyword to restrict the types a generic parameter can accept to those that fit a certain structural shape.",
    detailedAnswer: "Sometimes you want to write a generic function that works on a set of types, but you need some information about those types. For example, you might want to access a `.length` property on a generic item.\n\nBy default, the compiler doesn't know what properties `T` has. Using **Generic Constraints**, we can constrain the generic parameter using the `extends` keyword so that it must satisfy a specific interface.",
    codeExample: `interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length); // Safe! Guaranteed to have a length property.
  return arg;
}

logLength("hello"); // Works (strings have .length)
logLength([1, 2, 3]); // Works (arrays have .length)
// logLength(123); // Error: Type 'number' does not have a length property`,
    latexFormula: "T \\subseteq \\text{HasLength}",
    quizOptions: [
      "A way to limit the memory size of objects in TypeScript",
      "Restricting a generic type parameter using 'extends' to ensure it satisfies a specific shape or interface",
      "Forcing a generic type to be strictly 'any'",
      "An option in tsconfig to disable generics entirely"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Generic constraints restrict what types can be passed to a generic type parameter, ensuring the function can safely access required attributes."
  },
  {
    id: 14,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is the difference between T[] and Array<T>?",
    shortAnswer: "They are functionally identical. T[] is shorthand, while Array<T> uses generic interface syntax.",
    detailedAnswer: "In TypeScript, there are two ways to write array types:\n\n1. **Shorthand Syntax**: `T[]` (e.g. `string[]`)\n2. **Generic Interface Syntax**: `Array<T>` (e.g. `Array<string>`)\n\nBoth syntactic representations compile to identical JavaScript arrays and enforce the exact same type checks. The shorthand `T[]` is highly preferred in most style guides for readability, while `Array<T>` can be cleaner when dealing with nested multi-dimensional generics.",
    codeExample: `const list1: number[] = [1, 2, 3];
const list2: Array<number> = [1, 2, 3]; // Functionally identical!

// Nested arrays:
const matrix1: number[][] = [[1], [2]];
const matrix2: Array<Array<number>> = [[1], [2]];`,
    latexFormula: "T[] \\equiv \\text{Array}<T>",
    quizOptions: [
      "T[] is checked at compile time, Array<T> is checked at runtime",
      "T[] is mutable, while Array<T> is read-only",
      "They are functionally identical representations of an array containing items of type T",
      "Array<T> is a custom database driver class"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "T[] and Array<T> are completely synonymous in TypeScript's type system, differing only in syntax representation."
  },
  {
    id: 15,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is a tuple type?",
    shortAnswer: "An array type with a fixed number of elements, where each position has a known, specific type.",
    detailedAnswer: "A **Tuple Type** is a specialized array that allows you to express an array where the number of elements is fixed, and the type of each element is known at its specific index position.\n\nThis is highly useful for representing coordinate pairs, React state hook returned pairs, or key-value structures.",
    codeExample: `// Defining a tuple type:
let coordinate: [number, number];
coordinate = [40.7128, -74.0060]; // Valid!
// coordinate = ["New York", -74.0060]; // Error: Type 'string' is not assignable to 'number'

// Named Tuple properties (TS 4.0+):
type UserState = [userId: string, isActive: boolean];
const user: UserState = ["u_123", true];`,
    latexFormula: "T = X \\times Y \\quad (\\text{Cartesian Product})",
    quizOptions: [
      "A dynamic key-value dictionary type",
      "A fixed-length array where the type of each element at specific indices is declared",
      "An alternative term for JS classes",
      "A multi-threaded collection"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Tuples are arrays with precise element count and pre-defined element types at each position."
  },
  {
    id: 16,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What are optional properties (?)",
    shortAnswer: "Properties on an interface or type that are not required when constructing a matching object.",
    detailedAnswer: "By default, objects matching an interface or type alias must supply all defined properties. However, you can mark a property as optional by adding a question mark (`?`) right after the property name.\n\nOptional properties are inferred to be of the union type `Type | undefined`.",
    codeExample: `interface Config {
  host: string;
  port?: number; // Optional!
}

const minConfig: Config = { host: "localhost" }; // Perfect
const fullConfig: Config = { host: "localhost", port: 3000 }; // Perfect

// Accessing the optional property:
console.log(fullConfig.port?.toFixed()); // Safe navigation`,
    latexFormula: "A \\times (B \\cup \\{ \\text{undefined} \\})",
    quizOptions: [
      "Properties that can change their datatypes at runtime",
      "Properties marked with '?' that do not have to be supplied during object initialization",
      "Functions that return boolean values",
      "Properties that are automatically deleted"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Optional properties allow you to define schemas where some attributes can be left out, automatically introducing 'undefined' as a potential type."
  },
  {
    id: 17,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is the 'readonly' modifier?",
    shortAnswer: "A keyword that prevents properties of an object or class from being reassigned after their initial creation.",
    detailedAnswer: "The `readonly` modifier makes a property immutable after its initial assignment. It can only be written to when initializing the containing object or inside a class constructor.\n\n### Scope of Immutability\nNote that `readonly` is **compile-time only** — it does not freeze runtime structures. Furthermore, if a `readonly` property points to an object, that child object's fields can still be mutated unless it is also readonly or frozen.",
    codeExample: `interface Point {
  readonly x: number;
  readonly y: number;
}

const point: Point = { x: 10, y: 20 };
// point.x = 5; // Error: Cannot assign to 'x' because it is a read-only property

class Car {
  readonly model: string;
  constructor(model: string) {
    this.model = model; // Allowed in constructor
  }
}`,
    latexFormula: "\\Delta x = 0 \\quad (\\text{Immutable})",
    quizOptions: [
      "A modifier that hides properties from JSON serialization",
      "A keyword that forces variables to be allocated on a secure stack",
      "A compile-time constraint preventing reassignment of object or class fields after setup",
      "A script that runs files in raw sandbox mode"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "readonly tells TypeScript's compiler to block any write/reassignment operations on specified fields outside the initialization phase."
  },
  {
    id: 18,
    category: "Advanced Types",
    difficulty: "Intermediate",
    question: "What is an index signature?",
    shortAnswer: "A way to define types for objects where you don't know all the property names beforehand, only the key and value types.",
    detailedAnswer: "Sometimes you don't know all the property names of a type in advance, but you do know the shape of the keys and the types of the values. In these cases, you can use an **Index Signature**.\n\nAn index signature looks like `[key: string]: valueType`. The key type must be either `string`, `number`, `symbol`, or template literal types.",
    codeExample: `interface PhoneBook {
  // Any string key will map to a string phone number
  [name: string]: string;
}

const book: PhoneBook = {
  alice: "555-0199",
  bob: "555-2244",
};

// Accessing works dynamically:
console.log(book["charlie"]); // Inferred as string`,
    latexFormula: "f: \\text{string} \\to \\text{Type}",
    quizOptions: [
      "An encryption algorithm for object keys",
      "A signature that tracks how many times an object is indexed",
      "A way to define object shapes with dynamic keys of specified types",
      "A validation script for array sorting"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Index signatures let you specify typed dictionaries and dynamic lookups, ensuring any dynamic key access complies with a uniform output type."
  },
  {
    id: 19,
    category: "Advanced Types",
    difficulty: "Intermediate",
    question: "What is keyof?",
    shortAnswer: "An operator that takes an object type and returns a union of its keys as string literal types.",
    detailedAnswer: "The `keyof` operator is a type-level operator in TypeScript. It queries the keys of an object type and yields a new union type of those keys.\n\nThis is incredibly useful when combined with generics to write type-safe property lookups, ensuring you cannot query a property name that doesn't exist on the object.",
    codeExample: `interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User; // "id" | "name" | "email"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}`,
    latexFormula: "\\text{keyof} \\, T = \\bigcup K_i",
    quizOptions: [
      "A function that returns keys of a JS object at runtime",
      "A type operator that produces a union of string/number literal keys of a given type",
      "A secure storage key manager",
      "A keyword used to query relational SQL keys"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "keyof operates on types (not values) and returns a union type of all the keys of that type, enabling highly precise generic parameter restrictions."
  },
  {
    id: 20,
    category: "Advanced Types",
    difficulty: "Intermediate",
    question: "What is 'typeof' in TypeScript (type context)?",
    shortAnswer: "An operator used in type annotations to extract the type of a value or variable so it can be reused.",
    detailedAnswer: "While JavaScript has a runtime `typeof` operator that returns a string, TypeScript has a separate **type-level** `typeof` operator.\n\nWhen used in a type position, `typeof` queries the TypeScript-inferred type of an existing variable, object literal, or function, allowing you to replicate or reference its type structure without manually writing a duplicate interface.",
    codeExample: `const defaultConfig = {
  apiPort: 8080,
  apiHost: "localhost",
  secure: true
};

// Extract the type of 'defaultConfig' dynamically:
type AppConfig = typeof defaultConfig;

/* Equivalent to:
type AppConfig = {
  apiPort: number;
  apiHost: string;
  secure: boolean;
} */`,
    latexFormula: "\\text{typeof } (v) \\mapsto T",
    quizOptions: [
      "It checks the datatype of a variable in the browser at runtime",
      "It converts an object into a JSON string",
      "An operator that extracts the compile-time type of a value/variable for type reuse",
      "A way to define a static class"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "In a type annotation position, typeof allows you to extract type definitions directly from values, keeping schemas in sync with default configurations."
  },
  {
    id: 21,
    category: "Mappers & Utilities",
    difficulty: "Advanced",
    question: "What is a mapped type?",
    shortAnswer: "A type that defines properties of an object by iterating over a union of keys, often transforming another type's properties.",
    detailedAnswer: "When you want to create a new type based on an existing type, you can use a **Mapped Type**.\n\nA mapped type is a generic type which uses a union of `keyof` properties to iterate through keys to create a new object type. It's essentially like array `map()` but for types at compile time.",
    codeExample: `type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean; // Maps each property of Type to boolean
};

interface FeatureFlags {
  darkMode: () => void;
  analytics: () => void;
}

type FeatureOptions = OptionsFlags<FeatureFlags>;
/* Equivalent to:
type FeatureOptions = {
  darkMode: boolean;
  analytics: boolean;
} */`,
    latexFormula: "\\{ P \\in K \\mid T[P] \\mapsto T'[P] \\}",
    quizOptions: [
      "An array of coordinate maps",
      "A type that transforms each property of an existing type according to a specified rule",
      "A route definition interface for router path mappings",
      "A utility class for asynchronous streams"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Mapped types use index signature syntax to loop over keys (typically derived from keyof) and dynamically build or transform object types."
  },
  {
    id: 22,
    category: "Mappers & Utilities",
    difficulty: "Intermediate",
    question: "What is Partial<T>?",
    shortAnswer: "A utility type that constructs a type with all properties of T set to optional.",
    detailedAnswer: "`Partial<T>` is a built-in utility type that takes a type `T` and makes all of its properties optional. It uses mapped types internally under the hood.\n\nThis is extremely helpful for patch updates, configuration overrides, or form submission fields.",
    codeExample: `interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
  return { ...todo, ...fieldsToUpdate };
}

// fieldsToUpdate only requires zero, one, or both fields:
updateTodo({ title: "Clean", description: "Kitchen" }, { description: "Room" });`,
    latexFormula: "\\text{Partial}\\langle T\\rangle = \\{ P \\in \\text{keyof } T \\} \\to T[P] \\mid \\text{optional}",
    quizOptions: [
      "A type that allows compiling only a part of the file",
      "A utility that converts an object to an array",
      "A built-in utility making all properties of type T optional",
      "A security type for partial user privileges"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Partial<T> goes through each key of T and adds the '?' modifier, turning required fields into optional inputs."
  },
  {
    id: 23,
    category: "Mappers & Utilities",
    difficulty: "Intermediate",
    question: "What is Required<T>?",
    shortAnswer: "A utility type that makes all properties of T required, stripping any optional modifiers (?).",
    detailedAnswer: "`Required<T>` is the direct opposite of `Partial<T>`. It takes a type `T` and creates a new type where all optional properties are stripped of their optionality, making them mandatory.\n\nIt uses the prefix `-?` inside mapped types to remove the optional modifier from keys.",
    codeExample: `interface Props {
  a?: number;
  b?: string;
}

const obj1: Props = { a: 5 }; // OK

// Required forces all properties to exist:
const obj2: Required<Props> = {
  a: 5,
  b: "hello" // Error if omitted!
};`,
    latexFormula: "\\text{Required}\\langle T\\rangle = T \\setminus \\{?\\}",
    quizOptions: [
      "A setting in tsconfig forcing all variables to be declared",
      "A utility type that ensures all optional keys are stripped and made fully required",
      "An asynchronous helper function",
      "A way to define default values"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Required<T> removes the '?' optionality flag from all properties, ensuring they must be specified."
  },
  {
    id: 24,
    category: "Mappers & Utilities",
    difficulty: "Intermediate",
    question: "What is Readonly<T>?",
    shortAnswer: "A utility type that makes all properties of T readonly, preventing any edits or reassignments.",
    detailedAnswer: "`Readonly<T>` is a utility type that transforms all properties of a type `T` to be `readonly`.\n\nIt is highly useful for returning frozen configurations, state snapshots in state management (Redux, Zustand), or prevent mutations in array structures.",
    codeExample: `interface User {
  username: string;
}

const activeUser: Readonly<User> = { username: "alice123" };
// activeUser.username = "bob"; // Error: Cannot assign to 'username' because it is a read-only property`,
    latexFormula: "\\text{Readonly}\\langle T\\rangle = \\{ \\forall P \\in T \\mid \\text{immutable} \\}",
    quizOptions: [
      "A type that makes fields accessible only by getter methods",
      "A runtime command that locks JavaScript object references",
      "A built-in utility type making all properties of type T read-only",
      "An editor mode for viewing types"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Readonly<T> appends the readonly flag to every property of T, guarding against unintended side-effects and mutation bugs."
  },
  {
    id: 25,
    category: "Mappers & Utilities",
    difficulty: "Intermediate",
    question: "What is Pick<T, K>?",
    shortAnswer: "Constructs an object type by selecting a specific subset of keys (K) from an existing type (T).",
    detailedAnswer: "`Pick<T, K>` constructs a type by picking the set of properties `K` (which must be keys of `T`) from the source type `T`.\n\nThis is incredibly useful when you have a large monolithic model (like a Database User model) and want to create a slimmed-down representation for a specific view or form component.",
    codeExample: `interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

// Only Pick 'title' and 'completed':
type TodoPreview = Pick<Todo, "title" | "completed">;

const preview: TodoPreview = {
  title: "Buy Milk",
  completed: false
};`,
    latexFormula: "\\text{Pick}\\langle T, K\\rangle = \\{ P \\in K \\mid T[P] \\}",
    quizOptions: [
      "A function that returns random keys from an object",
      "A utility type that constructs a new type by choosing a specific subset of properties from T",
      "A click handler helper",
      "A way to sort elements of a type"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Pick allows you to isolate specific attributes of a larger type, promoting reuse and modularity."
  },
  {
    id: 26,
    category: "Mappers & Utilities",
    difficulty: "Intermediate",
    question: "What is Omit<T, K>?",
    shortAnswer: "Constructs an object type by taking all properties from T except those specified in K.",
    detailedAnswer: "`Omit<T, K>` is the inverse of `Pick<T, K>`. Instead of listing the properties you want to keep, you list the keys `K` that you want to **exclude** from type `T`.\n\nThis is widely used to strip away internal identifiers (like `id` or auto-generated audit fields) when typing forms or payloads before sending them to a server.",
    codeExample: `interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Omit 'id' and 'createdAt':
type UserFormInput = Omit<User, "id" | "createdAt">;

const newUser: UserFormInput = {
  name: "Charlie",
  email: "charlie@example.com"
};`,
    latexFormula: "\\text{Omit}\\langle T, K\\rangle = T \\setminus K",
    quizOptions: [
      "A type helper to delete dynamic fields at runtime",
      "A utility type that constructs a type containing all properties of T except specified keys K",
      "An optimization setting to omit comments in build outputs",
      "A keyword to bypass type errors"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Omit excludes specified keys from an object type, letting you declare sanitized input shapes effortlessly."
  },
  {
    id: 27,
    category: "Mappers & Utilities",
    difficulty: "Intermediate",
    question: "What is Record<K, V>?",
    shortAnswer: "A utility type that constructs an object type with keys of type K and values of type V.",
    detailedAnswer: "`Record<K, V>` is a highly versatile built-in utility type in TypeScript. It is used to define the type of an object structure where you specify both the key union `K` and the value type `V`.\n\nIt is the primary tool for declaring dictionaries, index maps, or lookup structures with controlled configurations.",
    codeExample: `type Role = "admin" | "editor" | "viewer";

interface RolePermissions {
  canDelete: boolean;
  canEdit: boolean;
}

// Map each Role to its permissions:
const permissions: Record<Role, RolePermissions> = {
  admin: { canDelete: true, canEdit: true },
  editor: { canDelete: false, canEdit: true },
  viewer: { canDelete: false, canEdit: false }
};`,
    latexFormula: "\\text{Record}\\langle K, V\\rangle = \\{ [p \\in K]: V \\}",
    quizOptions: [
      "An array containing tuples of keys and values",
      "A database logging tracker",
      "A utility type representing a uniform object dictionary with keys K and values V",
      "An alias for the database query model"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Record generates clean key-value shapes where the exact list of keys is known (e.g. from a union), preventing missing entries."
  },
  {
    id: 28,
    category: "Advanced Types",
    difficulty: "Advanced",
    question: "What is a conditional type?",
    shortAnswer: "A type expressed as a ternary expression (T extends U ? X : Y) that selects a type based on a type relationship.",
    detailedAnswer: "In TypeScript, types can make decisions based on logical conditions. **Conditional Types** take a form that looks like ternary operators in JavaScript:\n\n`T extends U ? X : Y`\n\nIf the type `T` is assignable to `U`, the type resolves to `X`; otherwise, it resolves to `Y`. This enables incredibly powerful metaprogramming, such as filtering unions, extracting generic payload types, or stripping nullable keys.",
    codeExample: `type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Distributive Conditional Type (unions automatically map):
type NonNullable<T> = T extends null | undefined ? never : T;`,
    latexFormula: "T \\in U \\implies X \\quad \\text{else} \\quad Y",
    quizOptions: [
      "A type checked only when certain runtime flags are set",
      "A ternary expression at the type-level that resolves to different types based on assignability",
      "A type that can only exist on local development machines",
      "A validation schema for conditional input inputs"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Conditional types introduce logic checks into your compilation, enabling types to adapt dynamically depending on their parameters."
  },
  {
    id: 29,
    category: "Advanced Types",
    difficulty: "Advanced",
    question: "What is 'infer' used for in conditional types?",
    shortAnswer: "An operator that lets you declare a type variable inside a conditional 'extends' clause to be extracted and used.",
    detailedAnswer: "The `infer` keyword can only be used inside a conditional type's `extends` clause. It allows you to introduce a new generic type variable `I` on-the-fly and tell TypeScript to **infer and capture** whatever type occupies that slot.\n\nThis is the secret weapon for unpacking generic containers, such as extracting the resolved value of a Promise, the return type of a function, or the item type of an array.",
    codeExample: `// Extract the return type of a function:
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = (a: number) => string;
type Resolved = GetReturnType<Fn>; // string

// Extract the inner type of a Promise:
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
type P = UnpackPromise<Promise<number>>; // number`,
    latexFormula: "T \\equiv \\mathcal{G}\\langle I\\rangle \\implies I",
    quizOptions: [
      "A keyword to force the compiler to skip check limits",
      "An operator allowing on-the-fly declaration and extraction of placeholder types inside a conditional check",
      "A type checking method for machine learning integrations",
      "A command that handles type assertion implicitly"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "infer acts as a pattern-matching variable inside conditional types, letting you pull out nested structural elements automatically."
  },
  {
    id: 30,
    category: "Mappers & Utilities",
    difficulty: "Intermediate",
    question: "What does ReturnType<T> do?",
    shortAnswer: "A built-in utility type that extracts the return type of a function type T.",
    detailedAnswer: "`ReturnType<T>` is a built-in utility type that leverages conditional types and `infer` under the hood.\n\nIt takes a function type `T` and extracts what that function returns. It is incredibly useful for capturing types from third-party libraries, action creators, or hook outputs without having to manually duplicate their return signatures.",
    codeExample: `function getUser() {
  return { id: 1, username: "john_doe", active: true };
}

// Extract the returned object's type:
type UserType = ReturnType<typeof getUser>;

/* Equivalent to:
type UserType = {
  id: number;
  username: string;
  active: boolean;
} */`,
    latexFormula: "\\text{ReturnType}\\langle f: A \\to B\\rangle = B",
    quizOptions: [
      "A function that returns the type of any variable at runtime",
      "A utility type that extracts the exact return type of a function type T",
      "A promise wrapper for fetch operations",
      "A method to convert types to strings"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "ReturnType extracts the return type of a function type at compile time, eliminating manual type duplication for complex function return structures."
  },
  {
    id: 31,
    category: "Mappers & Utilities",
    difficulty: "Intermediate",
    question: "What does Parameters<T> do?",
    shortAnswer: "Extracts all parameter types of a function type T as a tuple type.",
    detailedAnswer: "`Parameters<T>` is a built-in utility type that extracts the types of the parameters of a function type `T` and packages them into a ordered **tuple type**.\n\nThis is extremely helpful for proxy functions, event listeners, or when wrapping third-party API functions to guarantee that your arguments exactly match the underlying signatures.",
    codeExample: `function logAction(userId: string, actionType: "click" | "hover", timestamp: number) {
  // ...
}

type ActionParams = Parameters<typeof logAction>;
// Inferred as: [userId: string, actionType: "click" | "hover", timestamp: number]

const args: ActionParams = ["u_99", "click", 1629900000]; // Valid tuple`,
    latexFormula: "\\text{Parameters}\\langle f: A \\times B \\to C\\rangle = [A, B]",
    quizOptions: [
      "A function tracking performance variables of APIs",
      "A compiler setting controlling compile outputs",
      "A utility type that extracts function parameter types as a tuple",
      "A checklist of standard TypeScript configs"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Parameters extracts a function's argument list, allowing you to easily reuse or type proxy arguments using a safe tuple."
  },
  {
    id: 32,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is type narrowing?",
    shortAnswer: "The process of refining a broad type (like a union) into a more specific type within a specific block of code.",
    detailedAnswer: "In TypeScript, variables can be defined with broad types (like unions `string | number`). However, you cannot access string methods directly without first proving to the compiler that the value is indeed a string.\n\n**Type Narrowing** is the mechanism where TypeScript analyzes your standard runtime checks (like `typeof`, `instanceof`, array checks, or equality comparisons) and automatically narrows down the type of that variable inside that code block.",
    codeExample: `function processValue(val: string | Date) {
  if (val instanceof Date) {
    // TypeScript knows 'val' is strictly a Date here!
    console.log(val.getTime());
  } else {
    // TypeScript knows 'val' must be a string here!
    console.log(val.toUpperCase());
  }
}`,
    latexFormula: "x \\in (A \\cup B) \\land (x \\in A) \\implies x \\in A",
    quizOptions: [
      "Shrinking the compiled JS bundle size",
      "The process of refining a broad union type into a specific type using runtime assertions and checks",
      "A compiler bug that restricts types",
      "A way to write short variables"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Type narrowing allows you to safely use specific methods of a union member by validating the actual type of a value at runtime."
  },
  {
    id: 33,
    category: "Advanced Types",
    difficulty: "Intermediate",
    question: "What is a type guard?",
    shortAnswer: "A function or expression that performs a runtime check and returns a type predicate, signaling the compiler that a variable is of a specific type.",
    detailedAnswer: "A **Type Guard** is a function that returns a **Type Predicate** of the format `arg is Type`.\n\nWhen this function returns `true`, TypeScript will automatically narrow the type of the passed variable to that specific type inside any conditional branches that call it. This is crucial for isolating complex object type checks.",
    codeExample: `interface Admin { role: "admin"; deleteUser: () => void; }
interface Guest { role: "guest"; browse: () => void; }

// Custom Type Guard:
function isAdmin(user: Admin | Guest): user is Admin {
  return user.role === "admin";
}

function handleSession(user: Admin | Guest) {
  if (isAdmin(user)) {
    user.deleteUser(); // Safe! TypeScript knows user is Admin
  } else {
    user.browse(); // Safe! TypeScript knows user is Guest
  }
}`,
    latexFormula: "f(x) \\to x \\text{ is } T",
    quizOptions: [
      "A security firewall for server requests",
      "A special interface declaration",
      "A function that returns a type predicate 'x is T' to safely narrow down custom structures",
      "An automated test utility"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Type guards act as user-defined checks that return type predicates, letting you teach the compiler how to recognize complex structural types."
  },
  {
    id: 34,
    category: "Advanced Types",
    difficulty: "Intermediate",
    question: "What is a discriminated union?",
    shortAnswer: "A union of object types that all share a common literal property (the discriminant), which is used to easily narrow the type.",
    detailedAnswer: "A **Discriminated Union** (or Tagged Union) is a powerful pattern in TypeScript. It consists of three elements:\n\n1. Object types that share a **common literal property** (often called `type`, `kind`, or `status` — the *discriminant*).\n2. A **union type** of these objects.\n3. A conditional check (like a `switch` or `if` statement) testing that common property to trigger narrowing.\n\nThis is the recommended pattern for redux actions, API state management, and command handling because it guarantees clean, exhaustively checkable type states.",
    codeExample: `interface Success { status: "success"; data: string[]; }
interface Failure { status: "error"; message: string; }

type ApiResponse = Success | Failure;

function handleResponse(res: ApiResponse) {
  if (res.status === "success") {
    // TypeScript knows it's a 'Success' object:
    console.log(res.data);
  } else {
    // TypeScript knows it's a 'Failure' object:
    console.log(res.message);
  }
}`,
    latexFormula: "U = A_{\\text{\"success\"}} \\sqcup B_{\\text{\"error\"}}",
    quizOptions: [
      "A union that excludes specific data elements",
      "A union of objects sharing a common literal 'discriminant' property, which is used for easy type narrowing",
      "A collection of different enum classes",
      "An encrypted SQL table join"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Discriminated unions leverage specific literal tags in each object to enable elegant, error-free type narrowing inside control statements."
  },
  {
    id: 35,
    category: "Advanced Types",
    difficulty: "Intermediate",
    question: "What is declaration merging?",
    shortAnswer: "TypeScript's ability to automatically merge multiple declarations of the same interface or module name into a single type.",
    detailedAnswer: "In TypeScript, duplicate declarations with the exact same name will not throw an error if they are interfaces or namespace declarations. Instead, the compiler automatically merges them into a **single, unified declaration** that contains the properties of all definitions.\n\nThis is highly critical when authoring or extending plugins, third-party library configurations, or global variables, allowing you to cleanly augment types without editing original source files.",
    codeExample: `// First definition (e.g. from a library core):
interface Document {
  title: string;
}

// Second definition (e.g. from your plugin):
interface Document {
  customId: string;
}

// The resulting interface has BOTH fields:
const doc: Document = {
  title: "Spec Sheet",
  customId: "doc_009"
};`,
    latexFormula: "I_1 \\cup I_2 \\implies I_{\\text{merged}}",
    quizOptions: [
      "Compiling multiple TS files into a single JS file",
      "Merging two separate arrays of types at runtime",
      "The compiler combining multiple declarations with the same name (like interfaces) into a single unified type",
      "A way to import multiple files at once"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Declaration merging is a unique TypeScript compile feature where multiple definitions of an interface are combined into a single contract."
  },
  {
    id: 36,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is an enum?",
    shortAnswer: "A feature that allows you to define a set of named constants, supporting either numeric or string values.",
    detailedAnswer: "An **Enum** (short for enumeration) is a way of giving friendly, readable names to sets of numeric or string constant values.\n\nUnlike most TypeScript structures which are fully erased during compilation, an enum compiles down to an actual **runtime JavaScript object**, allowing you to perform property lookups, object iterations, or key checks at runtime.",
    codeExample: `// Numeric Enum (starts at 0 by default):
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

// compiles to a self-mapping JS object:
const go = Direction.Up; // Value is 0`,
    latexFormula: "E = \\{ v_0, v_1, v_2, \\dots \\}",
    quizOptions: [
      "A special array loop syntax",
      "A TypeScript structure that defines a set of named constants, compiling into a real runtime JS object",
      "An optional type checking flag",
      "A library for rendering vector maps"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Enums are one of the few features that add both static types and a real object artifact in the compiled JavaScript output."
  },
  {
    id: 37,
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is the difference between numeric and string enums?",
    shortAnswer: "Numeric enums auto-increment values and support reverse mapping; string enums require explicit values and provide clearer logs.",
    detailedAnswer: "Enums in TypeScript can hold either numbers or strings.\n\n### Numeric Enums\n- Values default to starting at `0` and auto-increment by `1`.\n- Support **Reverse Mapping**: You can map from the value back to the key at runtime (e.g., `Direction[0]` returns 'Up').\n\n### String Enums\n- Each member must be explicitly initialized with a string literal.\n- **Do NOT** support reverse mapping.\n- Ideal for debug statements or logs because the compiled JS holds meaningful string names instead of opaque numbers.",
    codeExample: `// Numeric Enum:
enum StatusNum { Pending, Active }
console.log(StatusNum[0]); // Logs "Pending" (Reverse Map)

// String Enum:
enum StatusStr {
  Pending = "PENDING",
  Active = "ACTIVE"
}
console.log(StatusStr.Pending); // Logs "PENDING"`,
    latexFormula: "E_{\\text{num}}: K \\rightleftharpoons \\mathbb{N} \\quad E_{\\text{str}}: K \\to S",
    quizOptions: [
      "String enums compile to smaller files than numeric enums",
      "Numeric enums only exist in dev mode",
      "Numeric enums auto-increment and support reverse mapping, whereas string enums require explicit assignments and lack reverse mapping",
      "There is no difference; they are checked identically"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Numeric enums are bidirectional (reverse mapping is generated in the JS object), while string enums are unidirectional, providing clear, readable string values at runtime."
  },
  {
    id: 38,
    category: "Advanced Concepts",
    difficulty: "Advanced",
    question: "What is a 'const enum'?",
    shortAnswer: "An enum that is fully inlined during compilation, generating zero runtime object overhead for maximum efficiency.",
    detailedAnswer: "To avoid the runtime object overhead of standard enums, you can define a **`const enum`**.\n\nWhen TypeScript compiles a `const enum`, it completely erases the enum declaration itself and directly inlines the literal values at every call-site. This decreases file size and improves execution performance, but removes reverse-mapping capabilities entirely.",
    codeExample: `const enum ButtonType {
  Primary = "PRIMARY",
  Secondary = "SECONDARY"
}

const active = ButtonType.Primary;
// Compiles directly into JS as:
// const active = "PRIMARY"; // Zero runtime object overhead!`,
    latexFormula: "\\text{const enum } E \\implies \\emptyset \\text{ at runtime}",
    quizOptions: [
      "An enum that can only hold numbers",
      "An enum that can never be modified after declaration",
      "An enum that is completely inlined by the compiler with no runtime object generated",
      "A database configuration utility"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "`const enum` eliminates the compiled object wrapper entirely, replacing all references with direct literals in the final JS script."
  },
  {
    id: 39,
    category: "Advanced Concepts",
    difficulty: "Intermediate",
    question: "What is as const?",
    shortAnswer: "A type assertion that tells TypeScript to infer the narrowest possible literal types and make all properties readonly.",
    detailedAnswer: "The `as const` assertion (called a **Const Assertion**) tells the compiler to infer the narrowest literal type possible for a value, rather than widening it (e.g. treating 'success' as the literal 'success' instead of the general type `string`).\n\nAdditionally, it makes all object properties, array elements, and nested items recursively `readonly`, ensuring they cannot be modified.",
    codeExample: `// 1. Without 'as const' (widened):
const colors1 = ["red", "green"]; // Type is string[]

// 2. With 'as const' (narrowed and locked):
const colors2 = ["red", "green"] as const; 
// Type is readonly ["red", "green"] (tuple with exact literal types!)

// colors2[0] = "blue"; // Error: Cannot assign to read-only element`,
    latexFormula: "v \\mapsto v \\text{ (Narrowest Readonly)}",
    quizOptions: [
      "A way to define constant values in JavaScript",
      "An assertion that freezes variables to the narrowest literal types and marks all nested properties as readonly",
      "A utility that converts variables to uppercase",
      "A flag to disable compile-time checks"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Const assertions let you define configuration objects or static tuples in code, ensuring the compiler infers specific read-only literal types."
  },
  {
    id: 40,
    category: "Advanced Concepts",
    difficulty: "Beginner",
    question: "What is type assertion (as Type)?",
    shortAnswer: "A way to manually tell the compiler to treat a value as a specific type, without performing any runtime validation.",
    detailedAnswer: "Sometimes you will have information about the type of a value that TypeScript cannot know. In these cases, you can use a **Type Assertion** (using the `as` keyword).\n\nA type assertion tells the compiler 'trust me, I know what I am doing'. It is a **purely compile-time instruction** and is completely erased during compilation, meaning it has zero effect on runtime execution and does not perform any safe type casting.",
    codeExample: `// Canvas element lookup:
const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
// Now we can access canvas-specific methods:
const ctx = canvas.getContext("2d");

// Dangerous override:
const name: any = "Alice";
const id = name as number; // Compiles, but id is still a runtime string!`,
    latexFormula: "v \\text{ as } T \\implies \\text{Trust Compiler}",
    quizOptions: [
      "A runtime check that converts variables to different types",
      "A way to tell the compiler to treat a value as a specific type, with no runtime checks or changes",
      "A tool to format code style",
      "A security certificate verification"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Type assertions bypass the compiler's inference, telling TypeScript to trust your manual type designation without introducing any runtime validation or overhead."
  },
  {
    id: 41,
    category: "Advanced Concepts",
    difficulty: "Intermediate",
    question: "What is structural typing (duck typing)?",
    shortAnswer: "The principle that two types are considered compatible if they have the same shape/structure, regardless of their nominal names.",
    detailedAnswer: "TypeScript's type system is **Structural**, not nominal. This is often referred to as 'Duck Typing': if it walks like a duck and quacks like a duck, it is a duck.\n\nTwo types are fully compatible if their shapes match. If Type A has all the required properties of Type B (and potentially more), Type A is assignable to Type B, even if there is no explicit inheritance or interface implementation declared.",
    codeExample: `interface Point2D {
  x: number;
  y: number;
}

class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) { this.x = x; this.y = y; }
}

function printPoint(p: Point2D) {
  console.log(\`\${p.x}, \${p.y}\`);
}

// Works perfectly! Class structure matches interface shape:
const vec = new Vector(10, 20);
printPoint(vec);`,
    latexFormula: "A \\subseteq B \\implies A \\text{ is assignable to } B",
    quizOptions: [
      "A type system where types must inherit from a common base class",
      "A typing rule where variables must always match names precisely",
      "A design where types are compatible if they share the same properties and structures (shapes)",
      "A compiler mode specifically for testing web sockets"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Structural typing matches types based solely on their structure (the properties they declare), rather than their names or explicit class hierarchy."
  },
  {
    id: 42,
    category: "Advanced Concepts",
    difficulty: "Beginner",
    question: "What is the non-null assertion operator (!)?",
    shortAnswer: "An operator that tells the compiler a value is definitely not null or undefined, silencing potential null checks.",
    detailedAnswer: "The **Non-Null Assertion Operator** (`!`) is a postfix operator that tells the compiler that a preceding expression is not `null` or `undefined`.\n\nIt is used to override strict null checks when you have out-of-band knowledge that a value is guaranteed to exist. **Use with caution**: it is fully compile-time only, and if the value is actually null at runtime, you will encounter exceptions.",
    codeExample: `interface User {
  profile?: { avatar: string };
}

function processAvatar(user: User) {
  // If we know avatar ALWAYS exists for users passed here:
  const avatar = user.profile!.avatar; // Suppresses type compiler warnings
}`,
    latexFormula: "x! \\implies x \\in (T \\setminus \\{ \\text{null}, \\text{undefined} \\})",
    quizOptions: [
      "An operator that converts values into booleans",
      "A compiler command that throws an exception if a value is null",
      "A postfix operator (!) telling the compiler that a value is definitely not null or undefined",
      "An optional chaining replacement"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "The non-null assertion operator overrides TypeScript's safety flags, asserting that a value is present and suppressing warning flags."
  },
  {
    id: 43,
    category: "Advanced Concepts",
    difficulty: "Intermediate",
    question: "What is excess property checking?",
    shortAnswer: "A validation check that flags extra properties when assigning an object literal directly to a typed variable or passing it as an argument.",
    detailedAnswer: "When TypeScript compares types structurally, extra properties are normally allowed. However, when assigning an **object literal directly** or passing it as a function argument, TypeScript performs **Excess Property Checking**.\n\nIf the object literal contains any property not listed in the target type, the compiler flags it as an error to prevent developer typos or passing obsolete parameters.",
    codeExample: `interface Person {
  name: string;
}

// Direct assignment of object literal (Error!):
// const p: Person = { name: "Alice", age: 30 }; 
// TS Error: Object literal may only specify known properties, and 'age' does not exist...

// Assignment via intermediate variable (Allowed!):
const temp = { name: "Alice", age: 30 };
const p: Person = temp; // OK! Structural typing allows extra properties`,
    latexFormula: "\\text{Literal}(O) \\cap \\text{Target}(T) = O \\setminus T \\implies \\emptyset",
    quizOptions: [
      "An automated memory size verification",
      "A strict rule that rejects any extra properties on object literals passed directly to a typed target",
      "An optimization feature that compresses objects",
      "A database constraint verifying key lengths"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Excess property checking is a safety check specific to object literals to catch typos in optional fields, since structural typing is normally permissive of extra properties."
  },
  {
    id: 44,
    category: "Advanced Concepts",
    difficulty: "Intermediate",
    question: "What is function overloading?",
    shortAnswer: "Declaring multiple function signatures for a single function, allowing it to handle different argument types safely.",
    detailedAnswer: "In JavaScript, functions can be called with any number of parameters of any type. **Function Overloading** allows you to define multiple static types (called *overload signatures*) for a single function.\n\nThis is followed by a single *implementation signature* that contains the runtime code. The compiler validates that the implementation correctly supports all declared overload signatures, ensuring safe execution shapes for different inputs.",
    codeExample: `// Overload Signatures:
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;

// Implementation Signature (handles all overloads):
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}

const d1 = makeDate(1629900000); // Works
const d2 = makeDate(8, 25, 2021); // Works`,
    latexFormula: "\\mathcal{F} \\in \\{ (A \\to C) \\cup (B \\to D) \\}",
    quizOptions: [
      "Running a function recursively until it overflows",
      "Defining multiple functions with the exact same implementation",
      "Providing multiple call signatures for a single function name, mapped to a unified implementation",
      "An API that queries multiple endpoints simultaneously"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Function overloading provides clear compile-time definitions of distinct call combinations supported by a single underlying runtime function."
  },
  {
    id: 45,
    category: "Advanced Concepts",
    difficulty: "Intermediate",
    question: "What does strict: true in tsconfig do?",
    shortAnswer: "Enables a broad suite of strict type checking options, including strict null checks and implicit any prevention.",
    detailedAnswer: "Setting `\"strict\": true` in the `compilerOptions` of your `tsconfig.json` enables a bundle of strict type checking behaviors.\n\nIt is the **highly recommended** setting for all modern TypeScript codebases, ensuring optimal type safety and catching maximum bugs during development.\n\n### Bundle Flags Included\n- `strictNullChecks`: Disallows implicit assigning of `null`/`undefined` to general types.\n- `noImplicitAny`: Errors when TypeScript cannot infer a variable's type and defaults it to `any`.\n- `strictFunctionTypes`: Enforces strict covariance/contravariance checks on functions.\n- `strictBindCallApply`: Type-checks parameter bindings on JS helper methods.",
    codeExample: `// inside tsconfig.json:
{
  "compilerOptions": {
    "strict": true
  }
}`,
    latexFormula: "\\text{strict} = \\text{true} \\implies \\text{Max Safety}",
    quizOptions: [
      "Forces files to be written using strict JavaScript classes only",
      "Enables a bundle of strict type-checking validation flags to maximize compiler-level bug detection",
      "Limits compiles to run strictly on secure servers",
      "A runtime flag that throws exceptions on console warnings"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "The strict configuration bundle guarantees maximum type enforcement, turning off implicit wildcards and forcing explicit type safety practices."
  },
  {
    id: 46,
    category: "Advanced Concepts",
    difficulty: "Intermediate",
    question: "What is strictNullChecks?",
    shortAnswer: "A compiler flag that makes null and undefined concrete, distinct types, preventing them from being implicitly assigned to other types.",
    detailedAnswer: "When `strictNullChecks` is off (the historical default in JS/TS), `null` and `undefined` are effectively assignable to absolutely any type (e.g. you can assign `null` to a `string` or `number`). This makes code highly prone to unexpected runtime errors.\n\nWhen `strictNullChecks` is **on**, `null` and `undefined` are elevated to their own independent types. You cannot assign them to other types without declaring an explicit union type (e.g., `string | null`), forcing you to handle the empty state safely.",
    codeExample: `// strictNullChecks: true
let name: string = "Alice";
// name = null; // Error: Type 'null' is not assignable to type 'string'

// Must declare as union:
let nullableName: string | null = "Alice";
nullableName = null; // Safe and allowed!`,
    latexFormula: "T \\cap \\{ \\text{null} \\} = \\emptyset",
    quizOptions: [
      "A browser setting that blocks null database results",
      "A compiler option making null and undefined distinct, individual types that must be handled explicitly",
      "A framework that sanitizes query values",
      "A helper that replaces all null variables with empty strings"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "strictNullChecks eliminates the 'billion-dollar mistake' by forcing developers to declare and handle empty states using explicit union parameters."
  },
  {
    id: 47,
    category: "Advanced Concepts",
    difficulty: "Intermediate",
    question: "What is noImplicitAny?",
    shortAnswer: "A compiler setting that raises an error if an expression or variable lacks an annotation and cannot be inferred, preventing silent 'any' defaults.",
    detailedAnswer: "When `noImplicitAny` is enabled, TypeScript will raise a compiler error if a variable, function parameter, or return type cannot be inferred, forcing you to supply an explicit type annotation instead of defaulting to a silent, unsafe `any`.\n\nThis closes an escape hatch that would otherwise let type-safety slip away silently in your codebase.",
    codeExample: `// noImplicitAny: true
// function printUser(user) { // Error: Parameter 'user' implicitly has an 'any' type
//   console.log(user.name);
// }

// Correct:
function printUser(user: { name: string }) {
  console.log(user.name); // Safe
}`,
    latexFormula: "\\text{Inference Failure} \\implies \\text{Compile Error}",
    quizOptions: [
      "A flag that deletes 'any' from the compiler's dictionary",
      "A warning that alerts users to too many files",
      "A compiler flag that errors out when a type cannot be inferred and falls back to a silent 'any'",
      "An IDE setting that auto-fills missing types with strings"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "noImplicitAny forces you to explicitly type arguments that TypeScript cannot infer, preventing accidental loss of type-safety."
  },
  {
    id: 48,
    category: "Advanced Concepts",
    difficulty: "Advanced",
    question: "What is the difference between import type and a regular import?",
    shortAnswer: "import type only imports type declarations and is fully erased during compilation, ensuring zero runtime import overhead.",
    detailedAnswer: "In TypeScript 3.8+, you can use `import type` to explicitly import type definitions.\n\n### Why use `import type`?\n1. **Zero Runtime Impact**: The import is completely stripped away by the compiler, meaning no JavaScript import is generated. This prevents issues like circular dependency loops at runtime.\n2. **Optimal Bundler Performance**: Tells tools like Vite, esbuild, or Webpack that the file is only needed for type checking and doesn't need to be imported or bundled as a real module.",
    codeExample: `// Regular import (might import actual JS code/classes):
import { User, UserService } from "./services";

// Import type (fully erased, guarantees no code execution):
import type { UserProfile } from "./types";

const profile: UserProfile = { avatar: "url" };`,
    latexFormula: "\\text{import type } T \\implies \\text{Erased at compile}",
    quizOptions: [
      "import type is executed inside the browser's service worker",
      "import type imports types for static checking and is fully stripped from the final JS, avoiding runtime code overhead",
      "Regular import cannot be used inside interfaces",
      "import type is slower than regular imports"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "import type informs the compiler that the imported item is strictly for compilation validation, guaranteeing no runtime module side-effects or circular load issues."
  },
  {
    id: 49,
    category: "Advanced Concepts",
    difficulty: "Advanced",
    question: "What is module augmentation?",
    shortAnswer: "A way to inject new property or method declarations into an existing module or third-party namespace without modifying its source.",
    detailedAnswer: "Sometimes you need to extend a third-party library or an existing module with custom properties. Since TypeScript compiles structurally, you can use **Module Augmentation**.\n\nBy declaring a module with the same name and path using the `declare module` syntax, you can open and add fields to its exported interfaces via declaration merging. This is widely used to attach custom fields to Express requests, fastify configurations, or window objects.",
    codeExample: `import express from "express";

// Augment Express Request interface to hold custom user claims:
declare module "express-serve-static-core" {
  interface Request {
    userClaims?: { userId: string; role: string };
  }
}

const app = express();
app.use((req, res, next) => {
  req.userClaims = { userId: "user_42", role: "admin" }; // Fully Type-Safe!
  next();
});`,
    latexFormula: "\\text{Module}_A \\oplus \\text{Extension}_A \\implies \\text{Module}_A^{\\text{augmented}}",
    quizOptions: [
      "Merging two independent npm packages at runtime",
      "A compiler setting that automatically downloads types",
      "A design pattern to extend external module interfaces and inject custom properties into existing library scopes",
      "An editor plugin that generates documentation"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Module augmentation leverages declaration merging across module boundaries, letting you teach TypeScript about dynamic properties injected into libraries."
  },
  {
    id: 50,
    category: "Advanced Concepts",
    difficulty: "Advanced",
    question: "What is a .d.ts file?",
    shortAnswer: "A declaration file containing only type definitions (no runtime JavaScript code), used to describe JavaScript libraries to the compiler.",
    detailedAnswer: "A **`.d.ts`** file is a TypeScript declaration file. It does not contain any executable JavaScript logic; instead, it contains only type definitions, interfaces, and function signatures.\n\nIts purpose is to serve as a 'type contract' that describes existing JavaScript libraries or modules, allowing the TypeScript compiler and your IDE to provide full autocomplete and type safety when you import pure JS modules.",
    codeExample: `// inside lodash-custom.d.ts:
declare module "lodash-custom" {
  export function chunk<T>(array: T[], size: number): T[][];
}`,
    latexFormula: "\\text{types.d.ts} \\equiv \\text{Type Signatures Only}",
    quizOptions: [
      "A database configuration file",
      "A file that holds compiled JavaScript code",
      "A declaration file that contains only type descriptions for JavaScript resources, with no executable code",
      "An encrypted secure key storage file"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Declaration files (.d.ts) act as headers for JS code, defining the type interfaces without producing any runtime JS output themselves."
  },
  {
    id: 51,
    category: "Mappers & Utilities",
    difficulty: "Advanced",
    question: "What is template literal types?",
    shortAnswer: "Type-level strings created using template literal syntax, enabling pattern matching and manipulation of string literal types.",
    detailedAnswer: "In TypeScript 4.1+, you can create new string literal types by combining existing string literals using backticks — just like standard JS template strings.\n\nThis is called **Template Literal Types**. It allows you to express powerful string patterns, coordinate ranges, dynamic API endpoints, or automatically generate events prefixed by special words.",
    codeExample: `type Direction = "top" | "bottom" | "left" | "right";
type MarginClass = \`margin-\${Direction}\`;
// Inferred as: "margin-top" | "margin-bottom" | "margin-left" | "margin-right"

// Combining Unions:
type Status = "success" | "error";
type Action = "get" | "post";
type NetworkEvent = \`\${Action}_\${Status}\`;
// Inferred as: "get_success" | "get_error" | "post_success" | "post_error"`,
    latexFormula: "\\text{type } S = \\text{\`margin-\\$\{D\}\`}",
    quizOptions: [
      "A string compression utility",
      "Type-level string patterns built with backticks, enabling dynamic string generation and matching during compilation",
      "A tool to format console logs automatically",
      "A React component for text templates"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Template literal types bring JS-like string interpolation to the type system, enabling compiler-level string pattern validation."
  },
  {
    id: 52,
    category: "Advanced Concepts",
    difficulty: "Intermediate",
    question: "What is the purpose of the satisfies operator?",
    shortAnswer: "Validates that a value matches a type/interface without changing (widening) the inferred type of that value.",
    detailedAnswer: "Introduced in TS 4.9, the **`satisfies`** operator addresses a major limitation of standard type annotations.\n\nWhen you annotate a variable (e.g. `const colors: Record<string, string>`), TypeScript 'widens' the type of the value to that general shape, losing track of specific literal values. But with `satisfies`, TypeScript **verifies** that the object conforms to the type *while preserving* the narrowest, exact inferred literal structure of the object.",
    codeExample: `type RGB = [red: number, green: number, blue: number];
type ColorValue = string | RGB;
type Colors = Record<string, ColorValue>;

// Using satisfies:
const palette = {
  red: [255, 0, 0],
  blue: "#0000ff"
} satisfies Colors;

// We can still use specific array methods on red:
console.log(palette.red.map(x => x * 2)); // Valid!
// We can still use string methods on blue:
console.log(palette.blue.toUpperCase()); // Valid!

// If annotated conventionally as ': Colors', both lines above would throw compile errors!`,
    latexFormula: "v \\in T \\land \\text{Type}(v) \\equiv \\text{Inferred}(v)",
    quizOptions: [
      "A tool to verify that test files pass the coverage threshold",
      "An operator that validates an object's structure against a type while retaining the value's narrowest inferred shape",
      "An asynchronous database validator",
      "An assertion that overrides any linting rules"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "The satisfies operator lets you enforce type compliance without widening or washing away the exact, literal types of your configuration values."
  },
  {
    id: 53,
    category: "Advanced Concepts",
    difficulty: "Advanced",
    question: "What is the significance of exhaustiveness checking?",
    shortAnswer: "A compile-time technique that guarantees every case of a union type is explicitly handled in switch statements.",
    detailedAnswer: "When writing switch statements over a union type (like status flags or Action types), it is easy to forget to add a case when someone introduces a new union option later.\n\n**Exhaustiveness Checking** resolves this by assigning the `default` fallback block of a switch to a variable typed `never`. Because `never` cannot be assigned any value, the compiler will error out if any union member reaches that block unhandled, flagging the exact file that needs updating.",
    codeExample: `type Event = "start" | "stop" | "pause"; // Imagine we add "pause" later

function handleEvent(ev: Event) {
  switch (ev) {
    case "start": return "Starting";
    case "stop": return "Stopping";
    // Forgot "pause"!
    default:
      // Compile Error: Type 'string' is not assignable to 'never'
      const _exhaustiveCheck: never = ev; 
      return _exhaustiveCheck;
  }
}`,
    latexFormula: "\\bigcup C_i \\equiv S \\implies \\text{Default} \\to \\emptyset",
    quizOptions: [
      "A script that runs through all system memory to check for leaks",
      "A pattern that uses the 'never' type in switch fallbacks to guarantee every union member is handled explicitly at compile time",
      "A validation schema for user passwords",
      "A setting that forces all loops to terminate"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Exhaustiveness checking leverages the 'never' type to create a compiler alert when newly added union options are not handled in existing switches."
  },
  {
    id: 54,
    category: "Advanced Concepts",
    difficulty: "Intermediate",
    question: "What is the significance of noUncheckedIndexedAccess?",
    shortAnswer: "A compiler flag that adds 'undefined' to the return type of any index/dictionary lookup, preventing unsafe accesses.",
    detailedAnswer: "By default, when you access a key in a dictionary type (like `{ [key: string]: string }`), TypeScript assumes the key exists and returns a clean `string` type. However, at runtime, lookup keys that are missing actually return `undefined`, often causing runtime crashes.\n\nEnabling **`noUncheckedIndexedAccess`** in your `tsconfig` forces TypeScript to add `undefined` to all dictionary lookups, requiring you to perform a null check before calling any methods on the result.",
    codeExample: `// noUncheckedIndexedAccess: true
interface UserMap {
  [userId: string]: { name: string };
}
const users: UserMap = {};

const user = users["user_123"]; 
// Type of user is: { name: string } | undefined!

// console.log(user.name); // Error: Object is possibly 'undefined'
console.log(user?.name); // Safe!`,
    latexFormula: "T[K] \\mapsto T[K] \\cup \\{ \\text{undefined} \\}",
    quizOptions: [
      "A database flag preventing empty cell updates",
      "A compiler setting that appends 'undefined' to dynamic dictionary queries, forcing developers to safely validate lookups",
      "A linting rule that flags unused variables",
      "A browser wrapper for array maps"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "noUncheckedIndexedAccess correctly matches the actual runtime behavior of JS lookups, protecting the codebase from assuming all queried keys always exist."
  },
  {
    id: 55,
    category: "Advanced Concepts",
    difficulty: "Intermediate",
    question: "What is the difference between abstract class and interface?",
    shortAnswer: "Abstract classes can contain actual code implementation and are compiled to JS classes; Interfaces are purely structural compile-time contracts.",
    detailedAnswer: "While both declare contracts and enforce OOP patterns, they have key structural differences.\n\n### Abstract Class\n- Can provide **actual code implementations**, default methods, and initialize instance variables.\n- Compiles down to an actual runtime JavaScript class.\n- Supports constructors.\n\n### Interface\n- Is **purely structural**; cannot contain any implementation code, variables, or definitions.\n- Fully erased at compile-time, adding zero bytes to your compiled JavaScript output.\n- Highly flexible; supports declaration merging.",
    codeExample: `// Interface: Pure contract
interface Animal {
  makeSound(): void;
}

// Abstract Class: Contract + implementation helper
abstract class Logger {
  abstract log(msg: string): void;
  logError(err: string) {
    this.log(\`[ERROR] \${err}\`); // Implemented method!
  }
}`,
    latexFormula: "\\text{Interface} \\cap \\text{JS Class} = \\emptyset",
    quizOptions: [
      "Interfaces support constructors, abstract classes do not",
      "Interfaces are compiled to JavaScript objects, while abstract classes are completely deleted",
      "Abstract classes can contain actual code implementation and are compiled to JS, whereas interfaces are purely compile-time constructs",
      "They are exactly identical"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Abstract classes exist at runtime and can contain shared, default methods, whereas interfaces are compile-time structural validation helpers."
  },
  {
    id: 56,
    category: "Advanced Types",
    difficulty: "Advanced",
    question: "What is a nominal/branded type pattern?",
    shortAnswer: "Simulating unique type identifiers (where matching shapes aren't interchangeable) using structural intersections.",
    detailedAnswer: "Because TypeScript is structurally typed, two types with the same shape are interchangeable. This can be dangerous for domain values, like accidentally passing a raw `number` representing a `UserId` into a function expecting a `ProductId`.\n\n**Branded Types** simulate nominal typing by intersecting a primitive type with a unique, unused object property (the 'brand'). This forces the compiler to treat them as distinct types, requiring explicit casting.",
    codeExample: `// Branded Types definitions:
type UserId = string & { readonly __brand: "UserId" };
type ProductId = string & { readonly __brand: "ProductId" };

function getUser(id: UserId) { ... }

const rawId = "user_123";
// getUser(rawId); // Error: Type 'string' is not assignable to UserId

// Explicit cast/validator:
const userId = rawId as UserId;
getUser(userId); // Works!`,
    latexFormula: "T_{\\text{branded}} = T \\cap \\{ \\text{\\_\_brand}: B \\}",
    quizOptions: [
      "An interface carrying a company trademark",
      "A pattern that intersects standard types with unique tag properties, simulating strict nominal type systems",
      "An automated deployment compiler framework",
      "A style choice for Tailwind configurations"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Branded types bypass TypeScript's structural equivalence behavior, letting developers lock down highly specific identifiers to avoid logical type mixing errors."
  },
  {
    id: 57,
    category: "Mappers & Utilities",
    difficulty: "Advanced",
    question: "What is Exclude<T, U> and Extract<T, U>?",
    shortAnswer: "Exclude removes types from a union that are assignable to U; Extract keeps only those assignable to U.",
    detailedAnswer: "These are built-in utility types that operate on union types.\n\n- `Exclude<T, U>`: Examines the union `T` and **removes** any members that can be assigned to `U`.\n- `Extract<T, U>`: Examines the union `T` and **keeps only** the members that are assignable to `U`.",
    codeExample: `type T1 = "a" | "b" | "c";
type T2 = "a" | "f";

// Exclude: Keep members of T1 NOT in T2:
type Excluded = Exclude<T1, T2>; // "b" | "c"

// Extract: Keep members of T1 that are ALSO in T2:
type Extracted = Extract<T1, T2>; // "a"`,
    latexFormula: "\\text{Exclude} = T \\setminus U, \\quad \\text{Extract} = T \\cap U",
    quizOptions: [
      "Functions that copy arrays in JavaScript",
      "Utility types that filter union types: Exclude removes matched types, while Extract retains only matched types",
      "Database operations for SQL extraction",
      "JSON serializers that remove nulls"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Exclude and Extract are standard type filters that let you cleanly slice and dice composite union types at compile time."
  },
  {
    id: 58,
    category: "Mappers & Utilities",
    difficulty: "Advanced",
    question: "What is Awaited<T>?",
    shortAnswer: "A utility type that recursively unpacks a Promise type, matching what the 'await' keyword resolves to.",
    detailedAnswer: "The `Awaited<T>` utility type models operations like `await` in `async` functions, or the `.then()` method on Promises.\n\nIt recursively unpacks any nested `Promise` interfaces until it retrieves the final underlying resolved value, matching exactly what the runtime variable returns.",
    codeExample: `type P1 = Promise<string>;
type R1 = Awaited<P1>; // string

// Recursive nesting:
type P2 = Promise<Promise<number>>;
type R2 = Awaited<P2>; // number`,
    latexFormula: "\\text{Awaited}\\langle \\text{Promise}\\langle T\\rangle\\rangle = T",
    quizOptions: [
      "A wrapper that runs files synchronously in the compiler",
      "A utility type that unwraps Promises to retrieve their final resolved types, modeling the 'await' keyword",
      "A React fallback loading spinner",
      "A test framework for async assertions"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Awaited models the exact recursive unwrapping of async Promise values in TypeScript, keeping async signatures cleanly typed."
  },
  {
    id: 59,
    category: "Frameworks & Patterns",
    difficulty: "Advanced",
    question: "What is the typing pattern for a reusable useFetch<T> React Hook?",
    shortAnswer: "A generic hook typed with the expected data response format, returning load, error, and type-safe data properties.",
    detailedAnswer: "When writing custom hooks to fetch data in React with TypeScript, you should parameterize the hook with a generic parameter `T`. This lets the consumer declare or infer the exact shape of the returned payload, avoiding manual casts later.",
    codeExample: `import { useState, useEffect } from "react";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}`,
    latexFormula: "\\text{useFetch}\\langle T\\rangle \\to \\mathcal{O}\\langle T\\rangle",
    quizOptions: [
      "An API fetch proxy that returns plain JS arrays",
      "A generic custom hook pattern that wraps fetch state, giving typed data and validation hooks",
      "A security wrapper for login sessions",
      "An automated route configuration parser"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Generics on custom hooks let callers specify the precise output data structure, ensuring type safety right from the API request boundary."
  },
  {
    id: 60,
    category: "Advanced Concepts",
    difficulty: "Advanced",
    question: "Why does JSON.parse return any, and how can we improve it?",
    shortAnswer: "It returns 'any' because the shape of parsed JSON is unpredictable at compile time; we can improve it using 'unknown' and a validation schema.",
    detailedAnswer: "The standard library type definition for `JSON.parse` is `(text: string) => any`. This is a type safety gap, because assigning the output automatically introduces an untracked, unchecked `any` wildcard into your code.\n\nA better practice is to wrap `JSON.parse` in a helper that returns `unknown` or parses it using a validation library like Zod, forcing developers to perform type checks before accessing properties.",
    codeExample: `// Standard unsafe parse:
const data1 = JSON.parse('{"id": 5}'); // Inferred as any!
console.log(data1.nonExistentField); // No compile warning!

// Safe Wrapper pattern:
function safeParse(text: string): unknown {
  return JSON.parse(text);
}

const data2 = safeParse('{"id": 5}');
// console.log(data2.id); // Error: Object is of type 'unknown'

if (data2 && typeof data2 === "object" && "id" in data2) {
  console.log((data2 as any).id); // Safe and guarded
}`,
    latexFormula: "\\text{JSON.parse}: S \\to \\text{unknown}",
    quizOptions: [
      "JSON.parse returns any because TypeScript can't read strings",
      "It returns any due to historical compile-time constraints; we can wrap it or use validation to enforce 'unknown' and type-safety",
      "It should return a dynamic SQL statement instead",
      "There is no way to improve it"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Because JSON data is only known at runtime, treating JSON.parse's output as 'any' is risky. Forcing 'unknown' ensures proper schema checks before using the result."
  }
];

// Full list of additional 40 concepts to dynamically construct the rest of the 100 questions
const extraConcepts: Omit<Question, "id">[] = [
  {
    category: "Advanced Concepts",
    difficulty: "Intermediate",
    question: "What is the purpose of the 'declare' keyword?",
    shortAnswer: "It tells the compiler that a variable, function, or class exists in the environment, preventing compile errors for external assets.",
    detailedAnswer: "The `declare` keyword is used in TypeScript to write **ambient declarations**. This informs the TypeScript compiler that the variable, function, or class is defined outside of the TypeScript files (e.g., in a third-party global script, a CDN link, or injected by a browser extension).\n\nIt produces absolutely no compiled JavaScript code and acts purely to satisfy type-checking constraints.",
    codeExample: `// Declare a global variable injected by a analytics script:
declare const ga: (command: string, eventName: string) => void;

// Safe to call, compiler won't complain!
ga("send", "pageview");`,
    latexFormula: "\\text{declare } x: T \\implies \\text{Zero compilation overhead}",
    quizOptions: [
      "It allocates memory for a new variable",
      "It informs the compiler of out-of-band existing variables without generating compiled JS",
      "It deletes variables at runtime",
      "It imports a library from npm"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "The 'declare' keyword is used to describe variables, values, or modules that already exist at runtime, preventing the compiler from raising undefined-reference warnings."
  },
  {
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is the difference between null and undefined?",
    shortAnswer: "undefined means a variable has been declared but not yet assigned; null is an intentional assignment of an empty value.",
    detailedAnswer: "While both represent empty or missing states, they have distinct semantics:\n\n- `undefined`: The default state of unassigned variables, missing parameters, or non-existent properties.\n- `null`: An intentional value representing 'no object value'. It must be assigned explicitly.",
    codeExample: `let x; // Inferred as undefined
let y = null; // Explicitly declared empty`,
    latexFormula: "\\text{undefined} \\neq \\text{null}",
    quizOptions: [
      "They are exactly identical in all contexts",
      "undefined is assigned explicitly; null is the implicit default",
      "undefined means unassigned/missing; null is an intentional assignment of emptiness",
      "null is a type of number"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "undefined is JavaScript's default fallback for unassigned fields, whereas null is a deliberate, programmer-defined representation of empty/null values."
  },
  {
    category: "Advanced Concepts",
    difficulty: "Intermediate",
    question: "How do you declare global variables on the window object?",
    shortAnswer: "By using global namespace augmentation inside a declaration block to extend the Window interface.",
    detailedAnswer: "To tell TypeScript about custom properties you've attached to the global `window` object, you must augment the global `Window` interface using `interface Window` inside a `declare global` block.",
    codeExample: `declare global {
  interface Window {
    __APP_VERSION__: string;
  }
}

// Now safe to access!
console.log(window.__APP_VERSION__);`,
    latexFormula: "\\text{Window} \\oplus \\{ \\text{custom}: T \\}",
    quizOptions: [
      "By using window.custom = 'value' directly without types",
      "By writing 'declare const window' in every file",
      "By augmenting the Window interface within a declare global block",
      "You cannot attach global variables in TypeScript"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Augmenting the global Window interface tells TypeScript that the window object has been extended with custom parameters."
  },
  {
    category: "Mappers & Utilities",
    difficulty: "Intermediate",
    question: "What is the NonNullable<T> utility type?",
    shortAnswer: "Constructs a type by excluding null and undefined from T.",
    detailedAnswer: "`NonNullable<T>` filters out any `null` or `undefined` types from a union `T`, ensuring the value is guaranteed to exist.",
    codeExample: `type MaybeUser = string | null | undefined;
type ValidUser = NonNullable<MaybeUser>; // string`,
    latexFormula: "\\text{NonNullable}\\langle T\\rangle = T \\setminus \\{ \\text{null}, \\text{undefined} \\}",
    quizOptions: [
      "A decorator that locks class fields",
      "A utility type that excludes null and undefined from a union type",
      "An asynchronous helper",
      "A type assertion"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "NonNullable<T> is used to extract the non-empty variants of nullable union types."
  },
  {
    category: "Mappers & Utilities",
    difficulty: "Advanced",
    question: "What is ConstructorParameters<T>?",
    shortAnswer: "Extracts all parameter types of a constructor class T as a tuple type.",
    detailedAnswer: "`ConstructorParameters<T>` extracts the types of arguments expected by a class constructor or constructor function, packaging them into a tuple.",
    codeExample: `class User {
  constructor(name: string, age: number) {}
}
type UserConstructorArgs = ConstructorParameters<typeof User>; // [string, number]`,
    latexFormula: "\\text{ConstructorParameters}\\langle C \\rangle = [ \\text{Args} ]",
    quizOptions: [
      "An array of class instances",
      "A utility type extracting constructor parameter types as a tuple type",
      "A decorator manager",
      "A database config file"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "ConstructorParameters queries the constructor of a class type to yield the exact types of arguments needed to instantiate it."
  },
  {
    category: "Mappers & Utilities",
    difficulty: "Advanced",
    question: "What is InstanceType<T>?",
    shortAnswer: "Extracts the return instance type of a constructor/class T.",
    detailedAnswer: "`InstanceType<T>` extracts the instance type produced when constructing a class or newable function `T`.",
    codeExample: `class Point { x = 0; y = 0; }
type PointInstance = InstanceType<typeof Point>; // Point`,
    latexFormula: "\\text{InstanceType}\\langle \\text{Class} \\rangle \\to \\text{Instance}",
    quizOptions: [
      "The memory size of a class",
      "A utility type that extracts the instance type created by instantiating a constructor/class T",
      "A function that checks instances at runtime",
      "A static field declaration"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "InstanceType converts a class constructor type to the type of its instance, perfect for dynamic factory patterns."
  },
  {
    category: "Advanced Concepts",
    difficulty: "Advanced",
    question: "What are decorators, and how are they typed?",
    shortAnswer: "A special declaration that can be attached to classes, methods, accessors, or properties to modify behavior.",
    detailedAnswer: "Decorators are a meta-programming feature that wraps or intercepts class declarations and class members, annotated with an `@` prefix.",
    codeExample: `@logClass
class CustomerService {
  // class logic
}`,
    latexFormula: "f: C \\to C' \\quad (\\text{Decorate Class})",
    quizOptions: [
      "CSS borders around buttons",
      "An editor theme selector",
      "Declarations that intercept, wrap, and modify class and method declarations",
      "Functions that run before compilation starts"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Decorators use class wrappers to intercept and dynamically modify definitions, properties, and runtime configurations."
  },
  {
    category: "Advanced Types",
    difficulty: "Intermediate",
    question: "How do you write a generic cache interface?",
    shortAnswer: "By defining an interface with key/value generics to enforce safe data storing and retrieving.",
    detailedAnswer: "A generic cache uses generic parameters `K` and `V` to guarantee that keys and values are strictly matching and types are maintained.",
    codeExample: `interface Cache<K, V> {
  get(key: K): V | undefined;
  set(key: K, value: V): void;
}`,
    latexFormula: "\\text{Cache}\\langle K, V\\rangle \\equiv K \\to V",
    quizOptions: [
      "Using localState exclusively",
      "An interface with generic parameters K and V to enforce strict type connections for stored values",
      "A SQL query builder",
      "A text-formatting utility"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Generic interfaces bind multiple structures (keys and values) to specific types when instantiated, making caching mechanisms highly robust."
  },
  {
    category: "Advanced Concepts",
    difficulty: "Intermediate",
    question: "What is 'moduleResolution' in tsconfig?",
    shortAnswer: "Determines the strategy the compiler uses to locate and import modules specified in import statements.",
    detailedAnswer: "The `moduleResolution` option tells the compiler how to search for files (e.g. looking in `node_modules` or resolving local file trees like Node, Bundler, or Classic).",
    codeExample: `// tsconfig.json:
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}`,
    latexFormula: "\\text{Import Path} \\xrightarrow{\\text{Resolution}} \\text{File Path}",
    quizOptions: [
      "A way to bundle files into one file",
      "An advanced debugger option",
      "The strategy the compiler uses to map import strings to specific file locations",
      "A screen-resolution configuration"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "moduleResolution dictates the node module lookup algorithms, ensuring compatibility with node packaging or web bundlers."
  },
  {
    category: "Advanced Concepts",
    difficulty: "Beginner",
    question: "What is 'target' in tsconfig.json?",
    shortAnswer: "Specifies the ECMAScript target version for the compiled JavaScript output.",
    detailedAnswer: "The `target` compiler option defines what version of ECMAScript (e.g., `ES5`, `ES6`, `ESNext`) TypeScript compiles down to, ensuring compatibility with your environment.",
    codeExample: `// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022"
  }
}`,
    latexFormula: "\\text{TS} \\xrightarrow{\\text{target}} \\text{JS (ESVersion)}",
    quizOptions: [
      "The server location for deployments",
      "The specified output ECMAScript version (like ES6, ES5) for compiled JavaScript files",
      "The main input file name",
      "The database name"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "The target setting translates your modern TypeScript down to older, compatible JS if running in legacy environments, or leaves it modern for modern runtimes."
  },
  {
    category: "Advanced Concepts",
    difficulty: "Beginner",
    question: "What is 'lib' in tsconfig.json?",
    shortAnswer: "Specifies the built-in library declarations that are included during compilation.",
    detailedAnswer: "The `lib` option lists global declarations (like `DOM`, `ESNext`, or `WebWorker`) that represent APIs assumed to exist at runtime, allowing you to use them safely.",
    codeExample: `// tsconfig.json
{
  "compilerOptions": {
    "lib": ["DOM", "ESNext"]
  }
}`,
    latexFormula: "\\text{lib} = \\{ \\text{DOM}, \\text{ES2023}, \\dots \\}",
    quizOptions: [
      "A database directory name",
      "A setting listing standard runtime APIs (like DOM, ES6) that the compiler assumes are available for type checking",
      "The name of the bundler",
      "A tool to import external styling libraries"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "lib tells TypeScript which core type definitions (e.g., window, document, Promise) are natively supported by the target environment."
  },
  {
    category: "Advanced Concepts",
    difficulty: "Beginner",
    question: "What is the difference between any and unknown in API returns?",
    shortAnswer: "any lets you do anything without checks; unknown enforces checking or assertions first.",
    detailedAnswer: "Using `any` exposes your application to runtime errors. `unknown` is safe: it requires the caller to cast or validate the API payload before accessing it.",
    codeExample: `const payload: unknown = getApiResponse();
// payload.user; // Error!
if (payload && typeof payload === 'object' && 'user' in payload) {
  // safe check
}`,
    latexFormula: "\\text{unknown} \\sqsubset \\text{any}",
    quizOptions: [
      "any is compiled to objects; unknown is compiled to numbers",
      "any disables the compiler warnings; unknown forces type narrowing and validation before usage",
      "any is only checked in dev, unknown is only checked in prod",
      "They are identical"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "unknown acts as a type-safety barrier for unknown API returned payload formats, forcing type validation before properties are queried."
  },
  {
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "How does type inference work with arrays?",
    shortAnswer: "The compiler combines array initializers into a union of their element types.",
    detailedAnswer: "When you declare an array without an explicit type, the compiler looks at the elements to infer the best union array type.",
    codeExample: `const mixed = [1, "two", true]; // Inferred as (string | number | boolean)[]`,
    latexFormula: "\\text{Array}(x_i) \\mapsto \\left( \\bigcup \\text{Type}(x_i) \\right)[]",
    quizOptions: [
      "It converts arrays into objects",
      "It infers the array to hold only any",
      "It infers a union type of all initial element types in the array",
      "It blocks arrays with mixed types"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "TypeScript analyzes the elements of an array literal and infers the narrowest union type possible for its elements."
  },
  {
    category: "Advanced Types",
    difficulty: "Intermediate",
    question: "What is a tuple's optional element?",
    shortAnswer: "Using '?' to declare that specific trailing elements of a tuple are not required.",
    detailedAnswer: "You can define optional fields inside tuples using the `?` postfix operator on trailing indices.",
    codeExample: `type Coordinate = [number, number, number?];
const p2d: Coordinate = [10, 20];
const p3d: Coordinate = [10, 20, 30];`,
    latexFormula: "C = \\mathbb{R} \\times \\mathbb{R} \\times (\\mathbb{R} \\cup \\{ \\emptyset \\})",
    quizOptions: [
      "A tuple that can hold any database result",
      "A tuple where specific trailing positions are marked optional using '?'",
      "A dynamic JSON list type",
      "A tuple that is cleared after compile"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Optional tuple elements allow you to represent fixed-position arrays where the tail values can be omitted safely."
  },
  {
    category: "Mappers & Utilities",
    difficulty: "Advanced",
    question: "What is the OmitThisParameter<T> utility type?",
    shortAnswer: "Removes the 'this' parameter type from a function signature.",
    detailedAnswer: "`OmitThisParameter<T>` takes a function type `T` and strips its explicit `this` parameter annotation, returning a clean functional type.",
    codeExample: `function toHex(this: number) {
  return this.toString(16);
}
type RawFn = OmitThisParameter<typeof toHex>; // () => string`,
    latexFormula: "\\text{OmitThisParameter}\\langle f(\\text{this}: T) \\rangle \\to f()",
    quizOptions: [
      "A utility that converts class methods to async functions",
      "A utility type that strips the explicit 'this' parameter from a function signature",
      "A way to remove class fields",
      "An API rate-limiting wrapper"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "OmitThisParameter simplifies functions by stripping away type parameters associated with the 'this' context."
  },
  {
    category: "Advanced Concepts",
    difficulty: "Advanced",
    question: "What are ambient modules?",
    shortAnswer: "Modules declared in .d.ts files to describe non-TypeScript codebases or legacy dependencies.",
    detailedAnswer: "Ambient modules are definitions written with `declare module 'module-name'` to teach the compiler how to handle imports from pure JS or external targets without actual typescript files.",
    codeExample: `// global.d.ts:
declare module "legacy-library" {
  export function runAction(): void;
}`,
    latexFormula: "\\text{Ambient Module } \\equiv \\text{Types for JS assets}",
    quizOptions: [
      "Modules that play sound effects in the background",
      "Modules containing local variables only",
      "Type definitions declared in global files (.d.ts) to describe plain JavaScript systems",
      "API endpoints serving static media files"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Ambient modules are used to map typings to files that lack standard static TS interfaces, providing integration bridges."
  },
  {
    category: "Frameworks & Patterns",
    difficulty: "Intermediate",
    question: "How do you type props with children in React?",
    shortAnswer: "By intersecting your props with React.PropsWithChildren or explicitly typing a children prop.",
    detailedAnswer: "In modern React, you can type components with nested child components using `React.PropsWithChildren` or by explicitly declaring `children?: React.ReactNode`.",
    codeExample: `import React from "react";

interface BoxProps {
  title: string;
}

const Box: React.FC<React.PropsWithChildren<BoxProps>> = ({ title, children }) => (
  <div>
    <h3>{title}</h3>
    {children}
  </div>
);`,
    latexFormula: "\\text{PropsWithChildren}\\langle P \\rangle = P \\cap \\{ \\text{children}?: \\text{ReactNode} \\}",
    quizOptions: [
      "By using children: any strictly",
      "By wrapping elements in custom arrays",
      "Using React.PropsWithChildren or explicitly declaring a children property with React.ReactNode type",
      "You do not need to type children; it is automatic in all files"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Explicitly typing children ensures that callers pass elements that React can render, preventing bugs."
  },
  {
    category: "Frameworks & Patterns",
    difficulty: "Beginner",
    question: "What is React.CSSProperties?",
    shortAnswer: "A built-in type that provides full autocompletion and safety checks for inline style objects in React.",
    detailedAnswer: "Instead of writing inline styles as untyped objects, `React.CSSProperties` provides auto-completable keys corresponding directly to standard CSS parameters.",
    codeExample: `const bannerStyle: React.CSSProperties = {
  backgroundColor: "#0A0A0B",
  display: "flex",
  padding: "10px"
};`,
    latexFormula: "\\text{CSSProperties} \\equiv \\text{Strict CSS rules object}",
    quizOptions: [
      "A class loader for CSS files",
      "A utility type that checks, secures, and autocomplete keys inside React style objects",
      "An optimization setting",
      "A style module compiler"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "React.CSSProperties restricts and autocomplete inline CSS values within JSX elements, catching typos in style attributes."
  },
  {
    category: "Frameworks & Patterns",
    difficulty: "Intermediate",
    question: "How do you type form event handlers in React?",
    shortAnswer: "Using generic event types like React.FormEvent<HTMLFormElement> or React.ChangeEvent.",
    detailedAnswer: "TypeScript provides precise element-specific event types to ensure you can safely inspect event variables (like `e.target.value`).",
    codeExample: `const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};`,
    latexFormula: "\\text{ChangeEvent}\\langle T \\rangle \\implies e.\\text{target}: T",
    quizOptions: [
      "By using general 'Event' type always",
      "Using React.ChangeEvent<HTMLInputElement> or React.FormEvent<HTMLFormElement> to secure form attributes",
      "By avoiding event arguments",
      "By using string types for handlers"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Element-specific React generics map target attributes exactly to their native DOM fields."
  },
  {
    category: "Mappers & Utilities",
    difficulty: "Advanced",
    question: "What is the ThisParameterType<T> utility type?",
    shortAnswer: "Extracts the type of the 'this' parameter from a function signature.",
    detailedAnswer: "`ThisParameterType<T>` queries the explicit `this` parameter declaration of a function, returning `unknown` if none is defined.",
    codeExample: `function toHex(this: number) { return this.toString(16); }
type Context = ThisParameterType<typeof toHex>; // number`,
    latexFormula: "\\text{ThisParameterType}\\langle f(\\text{this}: T) \\rangle \\to T",
    quizOptions: [
      "A way to query global this elements",
      "A utility type that extracts the explicit 'this' parameter type of a function signature",
      "An automated class-binding loader",
      "A type assertion helper"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "ThisParameterType reads the context type that a function expects to be bound to at runtime."
  },
  {
    category: "Advanced Types",
    difficulty: "Intermediate",
    question: "What is a rest parameter type?",
    shortAnswer: "Typing the spread parameter list of a function using arrays or tuple types.",
    detailedAnswer: "When a function takes a variable number of parameters via rest arguments, you type the rest variable as an array or a tuple.",
    codeExample: `function sum(...numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0);
}`,
    latexFormula: "\\sum x_i \\quad x \\in \\text{number}[]",
    quizOptions: [
      "A type used for sleeping threads",
      "Typing the spread parameter array in a function signature using array or tuple structures",
      "A secure database transaction wrapper",
      "A fallback catch-all interface"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Rest parameter types must represent collections (arrays or tuples) since JS collects rest arguments into a real array structure."
  },
  {
    category: "Advanced Concepts",
    difficulty: "Advanced",
    question: "What is covariance and contravariance?",
    shortAnswer: "Subtyping relationships: covariance relates to read-only outputs (same direction), contravariance to write-only inputs (opposite direction).",
    detailedAnswer: "These describe how subtyping relationships of complex types (like functions) relate to their core parameters. In TypeScript, function arguments are checked **contravariantly**, while function return types are checked **covariantly**.",
    codeExample: `// Returns covariance: Supertype returns can accept Subtype returns
// Arguments contravariance: Supertypes arguments can accept broader inputs`,
    latexFormula: "A \\subseteq B \\implies F(A) \\subseteq F(B) \\quad (\\text{Covariance})",
    quizOptions: [
      "A database replication model",
      "Subtyping rules: covariance preserves the subtype direction (outputs), whereas contravariance reverses it (inputs)",
      "An editor layout style choice",
      "An optimization for loops"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Covariance means a type preserves its subclass relationship, while contravariance reverses it. Function arguments must be contravariant for subtyping to be completely safe."
  },
  {
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What is a ReadonlyArray?",
    shortAnswer: "A built-in type that represents an array whose elements cannot be modified, popped, or pushed to.",
    detailedAnswer: "`ReadonlyArray<T>` provides a complete type-safe wrapper around arrays, removing mutating methods (like `.push`, `.pop`, or direct index assignments).",
    codeExample: `const list: ReadonlyArray<number> = [1, 2, 3];
// list.push(4); // Error: Property 'push' does not exist on type 'readonly number[]'`,
    latexFormula: "\\text{ReadonlyArray}\\langle T\\rangle \\equiv \\text{Immutable Array}",
    quizOptions: [
      "An array that can only hold string structures",
      "A static array whose elements are guaranteed to be immutable and lack any writing/mutating methods",
      "A file reader class",
      "An array processed in production only"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "ReadonlyArray strips away mutating functions, protecting variables from unintended array modifications."
  },
  {
    category: "Fundamentals",
    difficulty: "Intermediate",
    question: "How do you type async/await return shapes?",
    shortAnswer: "Async functions always return a Promise, so they must be typed as Promise<T>.",
    detailedAnswer: "Because `async` functions automatically wrap their returned values in a Promise at runtime, their TypeScript return type annotation must always be written as `Promise<T>`.",
    codeExample: `async function fetchCount(): Promise<number> {
  return 42;
}`,
    latexFormula: "\\text{async } f(): T \\implies \\text{Return}: \\text{Promise}\\langle T\\rangle",
    quizOptions: [
      "By using return type void always",
      "Annotating the function as returning Promise<T> to represent the future resolved value T",
      "By avoiding return annotations in async blocks",
      "By using a callback interface"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "An async function implicitly wraps the return statement in a resolved Promise, requiring a Promise generic type annotation."
  },
  {
    category: "Advanced Types",
    difficulty: "Advanced",
    question: "What are template literal type helpers?",
    shortAnswer: "Built-in string utilities (Uppercase, Lowercase, Capitalize, Uncapitalize) that manipulate string case at compile time.",
    detailedAnswer: "These are intrinsic type utilities that alter string literals or template literals, enabling advanced naming transformations during compiling.",
    codeExample: `type Greeting = "hello";
type Shouting = Uppercase<Greeting>; // "HELLO"`,
    latexFormula: "\\text{Uppercase}\\langle \\text{\"hello\"} \\rangle = \\text{\"HELLO\"}",
    quizOptions: [
      "Functions that edit string values in browsers",
      "Built-in type-level string manipulation helpers (Uppercase, Lowercase, Capitalize, Uncapitalize)",
      "RegEx code generators",
      "Markdown rendering plugins"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "These intrinsic types operate directly inside TypeScript's compiler, transforming cases for string literal unions."
  },
  {
    category: "Advanced Types",
    difficulty: "Advanced",
    question: "What is Uppercase<S> and Lowercase<S>?",
    shortAnswer: "Intrinsic types converting string literal values to uppercase or lowercase.",
    detailedAnswer: "These are built-in string transformers used in template literals or mapped types.",
    codeExample: `type S = Uppercase<"status">; // "STATUS"`,
    latexFormula: "\\text{Lowercase}\\langle \\text{\"ACTIVE\"} \\rangle = \\text{\"active\"}",
    quizOptions: [
      "Standard JS methods string.toUpperCase()",
      "Compiler settings to ignore case sensitive files",
      "Compile-time type utilities converting string literal cases to upper or lower",
      "A database format style"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Uppercase and Lowercase operate strictly at the compile level, converting literal union strings to direct case matches."
  },
  {
    category: "Advanced Types",
    difficulty: "Advanced",
    question: "What is Capitalize<S> and Uncapitalize<S>?",
    shortAnswer: "Intrinsic types that capitalize or uncapitalize the first letter of string literal types.",
    detailedAnswer: "Useful for converting database column models to camelCase or PascalCase classes.",
    codeExample: `type Camel = Uncapitalize<"Name">; // "name"`,
    latexFormula: "\\text{Capitalize}\\langle \\text{\"user\"} \\rangle = \\text{\"User\"}",
    quizOptions: [
      "Linting options forcing class caps",
      "Intrinsic type helpers manipulating the casing of the first character of string literal types",
      "Formatting functions for web views",
      "A library of standard names"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Capitalize and Uncapitalize are intrinsic to the TS type compiler, facilitating easy API payload conversions."
  },
  {
    category: "Advanced Concepts",
    difficulty: "Advanced",
    question: "What is the NoInfer<T> utility type?",
    shortAnswer: "Prevents TypeScript from using a specific generic parameter slot to infer a function's generic types.",
    detailedAnswer: "Introduced in TS 5.4, `NoInfer<T>` blocks inference on a generic parameter, forcing the compiler to resolve the type from other arguments.",
    codeExample: `function select<T>(values: T[], defaultVal: NoInfer<T>) { ... }`,
    latexFormula: "\\text{NoInfer}\\langle T\\rangle \\implies \\text{Block inference}",
    quizOptions: [
      "A flag that disables typescript typing totally",
      "An intrinsic compiler helper that prevents a specific generic slot from participating in type inference",
      "A way to skip lint checks",
      "An optimization script for bundlers"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "NoInfer directs the type inference engine to ignore specified locations, ensuring exact type resolutions from primary parameters."
  },
  {
    category: "Advanced Concepts",
    difficulty: "Advanced",
    question: "What are 'const' type parameters?",
    shortAnswer: "Enables applying const-like assertion behavior directly to generic parameter signatures.",
    detailedAnswer: "In TS 5.0+, you can prefix a generic parameter with `const` to force callers to pass immutable, narrow literal values directly.",
    codeExample: `function getNames<const T extends readonly string[]>(names: T) { ... }`,
    latexFormula: "\\text{function } f\\langle \\text{const } T\\rangle",
    quizOptions: [
      "Variables that cannot be reassigned",
      "Generic type parameters prefixed with 'const' to automatically infer narrowest read-only literals when called",
      "Database schema configurations",
      "An alternative to standard const variables"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Const type parameters save developers from writing 'as const' at call sites when they pass array or object configuration literals."
  },
  {
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What are class access modifiers?",
    shortAnswer: "Keywords (public, private, protected) controlling the visibility of class members from outside scope.",
    detailedAnswer: "- `public`: Access is open and available anywhere.\n- `private`: Access is restricted strictly to the declaring class.\n- `protected`: Access is open to the declaring class and its subclasses.",
    codeExample: `class Guard {
  private secret = "shh";
  protected category = "general";
}`,
    latexFormula: "\\text{private} \\subset \\text{protected} \\subset \\text{public}",
    quizOptions: [
      "Decorators wrapping classes",
      "CSS parameters controlling grid displays",
      "Keywords (public, private, protected) regulating member accessibility outside the class",
      "Server access certificates"
    ],
    quizCorrectIndex: 2,
    quizExplanation: "Access modifiers enforce encapsulations inside object-oriented classes at compile time."
  },
  {
    category: "Fundamentals",
    difficulty: "Intermediate",
    question: "What is the 'override' modifier?",
    shortAnswer: "A keyword ensuring a subclass method explicitly overrides a method defined in its base class.",
    detailedAnswer: "The `override` modifier makes sure that the base class contains a method with the same name. If the base class method changes or is deleted, a compile-time error occurs, preventing stale code.",
    codeExample: `class Base { greet() {} }
class Sub extends Base { override greet() {} }`,
    latexFormula: "\\text{override } m \\in B \\implies m \\in B_{\\text{parent}}",
    quizOptions: [
      "A way to delete database items",
      "A keyword ensuring a subclass method explicitly maps to a matching parent method signature",
      "A flag to disable compile safety",
      "An inline CSS property wrapper"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "The override keyword provides safety when implementing inheritance, catching mismatches during refactorings of parent classes."
  },
  {
    category: "Fundamentals",
    difficulty: "Beginner",
    question: "What are parameter properties in constructors?",
    shortAnswer: "Shorthand syntax that declares and initializes class fields directly inside the constructor arguments.",
    detailedAnswer: "By prefixing a constructor parameter with an access modifier (like `public`, `private`, or `readonly`), TypeScript automatically declares it as a class property and assigns it on instantiation, eliminating boilerplate code.",
    codeExample: `// Short form:
class User {
  constructor(public name: string) {}
}

// Equates to:
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}`,
    latexFormula: "\\text{constructor}(\\text{public } x: T) \\implies \\text{declare } x: T",
    quizOptions: [
      "JSON payload mapping properties",
      "Shorthand syntax to declare and initialize class fields directly inside constructor parameters",
      "Types used inside class functions only",
      "Server configuration parameters"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Parameter properties are an extremely convenient TypeScript-only shorthand, significantly reducing class boilerplate initialization code."
  },
  {
    category: "Fundamentals",
    difficulty: "Intermediate",
    question: "How do you type a custom Promise callback?",
    shortAnswer: "By passing the generic resolve/reject arguments to the Promise constructor.",
    detailedAnswer: "Promises are generic types, so you instantiate them as `Promise<T>`, typing the arguments of the executor callback correctly.",
    codeExample: `const loader = new Promise<string>((resolve, reject) => {
  resolve("Loaded!");
});`,
    latexFormula: "\\text{Promise}\\langle T\\rangle: (\\text{resolve}: (v: T) \\to \\text{void}) \\to \\text{void}",
    quizOptions: [
      "By avoiding generic tags on Promises",
      "Using Promise<T> where T represents the type of value resolved by the callback executor",
      "By returning void from the callback",
      "Using local state handlers exclusively"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Typing the resolved output generic ensures downstream `.then` chain consumers receive correctly typed inputs."
  },
  {
    category: "Fundamentals",
    difficulty: "Intermediate",
    question: "What is Symbol, and how is it typed?",
    shortAnswer: "A unique, immutable primitive value used to create completely private keys for objects.",
    detailedAnswer: "Symbols are created via `Symbol()`, and can be typed as `symbol` or the narrow `unique symbol` type for constant, isolated references.",
    codeExample: `const myKey: unique symbol = Symbol("key");`,
    latexFormula: "S_i \\neq S_j \\quad (\\text{Unique Symbols})",
    quizOptions: [
      "A text character from special fonts",
      "A unique and immutable primitive used for safe object property isolation",
      "A relational database trigger key",
      "A CSS styling class"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Symbols provide a reliable way to add properties to objects that can never conflict with existing keys."
  },
  {
    category: "Advanced Concepts",
    difficulty: "Advanced",
    question: "What are triple-slash directives?",
    shortAnswer: "XML-like comments containing compiler instructions, typically used for declaring module dependencies or typing assets.",
    detailedAnswer: "Triple-slash directives are single-line comments containing XML tags used at the very top of files to declare reference typings, such as `<reference lib='...' />`.",
    codeExample: `/// <reference path="./custom.d.ts" />`,
    latexFormula: "/// \\langle \\text{reference} \\rangle \\implies \\text{Load definitions}",
    quizOptions: [
      "CSS division elements",
      "XML-like compiler comments referencing ambient declarations or files",
      "Regular comments ignored by all systems",
      "Database schema join statements"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Historically, triple-slash directives were the main way to establish references before modular tsconfigs became standard."
  },
  {
    category: "Advanced Concepts",
    difficulty: "Intermediate",
    question: "What is the difference between internal and external modules?",
    shortAnswer: "Internal modules are namespaces used to group code; External modules are modern files containing 'import' and 'export' statements.",
    detailedAnswer: "Historically, internal modules were created via `namespace` or `module {}` blocks. External modules are standard ES modules where files cleanly manage their imports and exports.",
    codeExample: `// Namespace (internal):
namespace App { export class Main {} }

// Module (external):
export class Main {}`,
    latexFormula: "\\text{Namespace} \\subset \\text{ES Module}",
    quizOptions: [
      "Internal modules reside in databases, external reside on CDN servers",
      "Internal modules are namespaces used to organize code, whereas external modules are modern files managing dependencies via imports/exports",
      "They are checked identically at runtime",
      "Internal modules are only compiled in production"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Namespaces were an early organization method. Modern standards favor external ES modules to organize cleanly."
  },
  {
    category: "Advanced Concepts",
    difficulty: "Advanced",
    question: "How do you build a type-safe State Machine?",
    shortAnswer: "By defining a discriminated union of states and actions, restricting transition paths using strict switch checks.",
    detailedAnswer: "A type-safe state machine combines literal string tags, interfaces, and exhaustive switch-checks to prevent invalid state configurations.",
    codeExample: `type State = { status: "idle" } | { status: "loading" };`,
    latexFormula: "S_{n+1} = \\mathcal{T}(S_n, A)",
    quizOptions: [
      "By using an database table mapping",
      "A design integrating discriminated state unions and exhaustive switches to enforce valid transition paths at compile time",
      "By setting all state fields to optional strings",
      "A method to import React components dynamically"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "State transitions are secured when states are defined as clear discriminated unions, blocking illegal properties."
  },
  {
    category: "Advanced Types",
    difficulty: "Intermediate",
    question: "What is index access types (T[K])?",
    shortAnswer: "Using property-lookup syntax at the type-level to extract the exact type of a specific property from type T.",
    detailedAnswer: "You can query the exact type of a property on another interface or type by looking it up using index notation inside type positions.",
    codeExample: `interface User { id: number; username: string; }
type UserIdType = User["id"]; // number`,
    latexFormula: "T[P] \\implies \\text{Extract property type}",
    quizOptions: [
      "A way to sort array lists",
      "A type-level lookup operator that extracts the type of a specific key from a container type",
      "A SQL table mapping helper",
      "A compiler diagnostic flag"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Index access types keep related schemas completely in sync, ensuring changes to primary tables cascade down automatically."
  },
  {
    category: "Advanced Concepts",
    difficulty: "Advanced",
    question: "What is the Object.keys() type limitation in TS?",
    shortAnswer: "Object.keys() returns string[] instead of (keyof T)[] because objects can have additional runtime properties structurally.",
    detailedAnswer: "Because TypeScript is structurally typed, objects can carry extra properties at runtime. If `Object.keys()` returned `(keyof T)[]` strictly, iterating would crash if an extra key held an unexpected type. Therefore, TS keeps it safe by returning general `string[]`.",
    codeExample: `const user = { name: "Bob" };
const keys = Object.keys(user); // string[] (not 'name'[])`,
    latexFormula: "\\text{Keys}(O) \\mapsto \\text{string}[]",
    quizOptions: [
      "Object.keys() can only hold numeric variables",
      "It returns string[] due to structural subtyping, since objects can carry arbitrary dynamic fields at runtime",
      "It is a compiler bug that was never fixed",
      "There is no limitation"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Structural typing means objects can contain wider, unlisted keys at runtime, so returning (keyof T)[] would violate static safety invariants."
  },
  {
    category: "Advanced Concepts",
    difficulty: "Advanced",
    question: "How do you type a high-performance Currying function?",
    shortAnswer: "Using recursive generic signatures that take arguments sequentially, returning nested curried calls.",
    detailedAnswer: "Currying takes a function with multiple parameters and translates it into a sequence of unary calls, typed recursively using generics.",
    codeExample: `type Curried<A extends any[], R> = 
  A extends [infer H, ...infer T] 
    ? (arg: H) => Curried<T, R> 
    : R;`,
    latexFormula: "f: A \\times B \\to C \\implies f_{\\text{curried}}: A \\to (B \\to C)",
    quizOptions: [
      "By avoiding generic annotations entirely",
      "Using recursive generic conditional types that unpack parameter tuples step-by-step",
      "A style wrapper using CSS custom rules",
      "A database join macro"
    ],
    quizCorrectIndex: 1,
    quizExplanation: "Recursively mapping tuple arguments via conditional type inference enables complete compile-level verification of curried call chains."
  }
];

// Append extra concepts, mapping and re-indexing them starting from 61 to exactly 100
export const allQuestions: Question[] = [
  ...questionsData,
  ...extraConcepts.map((item, index) => ({
    ...item,
    id: 61 + index
  }))
];

