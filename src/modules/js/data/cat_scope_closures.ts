import { Question } from '../types';

export const scopeClosuresQuestions: Question[] = [
  {
    id: 1,
    question: "What is the difference between var, let, and const?",
    answer: "var is function-scoped, hoisted to the top of its scope with undefined, and can be redeclared. let and const are block-scoped, live in a Temporal Dead Zone until their definition is run, and cannot be redeclared. const is block-scoped like let, but its reference cannot be reassigned (though objects or arrays it holds can still be mutated).",
    category: "scope_closures",
    difficulty: "Easy",
    codeExample: `function example() {
  if (true) {
    var x = 'var';
    let y = 'let';
    const z = 'const';
  }
  console.log(x); // Works ('var')
  try {
    console.log(y); // Throws ReferenceError
  } catch(e) {
    console.log('y is block-scoped!');
  }
}`,
    explanationSteps: [
      "var is registered inside the function scope or global scope.",
      "let and const are registered strictly in the block scope { }.",
      "Re-assigning const throws a TypeError."
    ],
    playgroundCode: `var a = 1;
let b = 2;
const c = 3;
console.log({ a, b, c });`
  },
  {
    id: 2,
    question: "What is hoisting?",
    answer: "Hoisting is the JavaScript engine's behavior of moving declarations to the top of their enclosing scope during the compilation phase, before execution. Function declarations are fully hoisted (meaning you can call them before they are written). var is hoisted and initialized with 'undefined'. let and const are hoisted but remain uninitialized, resulting in a ReferenceError if accessed early.",
    category: "scope_closures",
    difficulty: "Easy",
    codeExample: `console.log(hoistedVar); // undefined (hoisted)
// console.log(hoistedLet); // ReferenceError!

var hoistedVar = "I am hoisted";
let hoistedLet = "I am not initialized";

hoistedFunc(); // "Called before definition!"
function hoistedFunc() {
  console.log("Called before definition!");
}`,
    explanationSteps: [
      "Execution context is created.",
      "Engine scans for declarations and registers var hoistedVar = undefined.",
      "Function hoistedFunc is stored fully in memory.",
      "Code starts execution line-by-line."
    ],
    playgroundCode: `console.log(myVar);
var myVar = "Hoisted!";
myFunc();
function myFunc() { console.log("Fully hoisted function!"); }`
  },
  {
    id: 3,
    question: "What is the temporal dead zone?",
    answer: "The Temporal Dead Zone (TDZ) is the region in a block where a variable declared with let or const exists but cannot be accessed. It starts when the block scope is entered and ends when the engine executes the actual declaration statement. Accessing the variable before this point throws a ReferenceError.",
    category: "scope_closures",
    difficulty: "Medium",
    codeExample: `{
  // Entering block - TDZ for myVar starts here
  try {
    console.log(myVar); // ReferenceError
  } catch(e) {
    console.log("Error: " + e.message);
  }
  
  let myVar = 42; // TDZ for myVar ends here!
  console.log(myVar); // 42
}`,
    explanationSteps: [
      "Scope is entered: let myVar is registered but uninitialized.",
      "Accessing myVar triggers TDZ check and throws.",
      "Engine executes 'let myVar = 42', initializing the variable."
    ],
    playgroundCode: `try {
  console.log(tempVar);
} catch(e) {
  console.log("Caught: " + e.message);
}
let tempVar = "Safe now";
console.log(tempVar);`
  },
  {
    id: 4,
    question: "What is closures?",
    answer: "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In other words, a closure gives an inner function access to the outer function's scope even after the outer function has finished executing and returned.",
    category: "scope_closures",
    difficulty: "Medium",
    codeExample: `function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2`,
    explanationSteps: [
      "makeCounter executes and creates environment record [count = 0].",
      "Inner anonymous function is returned, keeping a live reference to count.",
      "makeCounter finishes, but count is not garbage collected because the returned function references it."
    ],
    playgroundCode: `function greet(name) {
  return function(greeting) {
    return greeting + ", " + name;
  };
}
const greetBob = greet("Bob");
console.log(greetBob("Hello"));`
  },
  {
    id: 5,
    question: "Classic closure interview example — what does a loop with var in a setTimeout print?",
    answer: "A loop using var inside setTimeout prints the final index value (usually the end length) for all iterations. This is because var is function-scoped and there is only a single instance of the loop variable. When the timer callbacks execute, the loop has completed and the variable has been incremented to the final value. Using let solves this because let is block-scoped, creating a brand new variable binding for each loop iteration.",
    category: "scope_closures",
    difficulty: "Medium",
    codeExample: `// prints '3, 3, 3'
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var: ', i), 100);
}

// prints '0, 1, 2'
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let: ', j), 100);
}`,
    explanationSteps: [
      "var i is shared across all 3 iterations of the loop.",
      "When the asynchronous setTimeout resolves, the value of i is already 3.",
      "let j creates a unique block-scoped binding for each loop step.",
      "Each callback retains access to its own unique j value via its closure."
    ],
    playgroundCode: `for (var i = 1; i <= 3; i++) {
  setTimeout((val) => console.log("i = " + val), 10, i); // or use let
}`
  },
  {
    id: 43,
    question: "What is an IIFE?",
    answer: "An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined. It consists of two parts: a grouping operator () enclosing an anonymous/named function expression, and a invoking operator () to execute it. Historically, IIFEs were the primary mechanism for creating private scopes and isolating variables to avoid global namespace pollution.",
    category: "scope_closures",
    difficulty: "Easy",
    codeExample: `(function () {
  var privateMessage = "Secure";
  console.log("IIFE executed!");
})();

// console.log(privateMessage); // ReferenceError`,
    explanationSteps: [
      "Grouping parenthesis forces the parser to treat the function keyword as an expression rather than a declaration.",
      "The second parenthesis () immediately executes the function.",
      "Any variable declared inside the IIFE remains encapsulated and secure."
    ],
    playgroundCode: `(function() {
  const secret = "IIFE private state";
  console.log("IIFE initiated: " + secret);
})();`
  },
  {
    id: 67,
    question: "What is the module pattern (pre-ES-modules)?",
    answer: "The module pattern is a software design pattern used to mimic classes by encapsulating public and private methods/variables in a single object. It leverages closures to shield details from the global scope while exposing a clean public API through returned properties or objects.",
    category: "scope_closures",
    difficulty: "Medium",
    codeExample: `const UserModule = (function() {
  let password = "123"; // Private
  
  function validate() { // Private
    return password === "123";
  }
  
  return {
    login: function() { // Public
      return validate() ? "Logged in!" : "Failed";
    }
  };
})();

console.log(UserModule.login()); // "Logged in!"
console.log(UserModule.password); // undefined`,
    explanationSteps: [
      "We invoke an IIFE containing private module variables.",
      "The IIFE returns a public-facing object holding methods.",
      "The returned methods maintain closure over the private internal variables."
    ],
    playgroundCode: `const myModule = (function() {
  let privateCount = 10;
  return {
    increment() { privateCount++; },
    get() { return privateCount; }
  };
})();
myModule.increment();
console.log(myModule.get());`
  },
  {
    id: 68,
    question: "What is strict mode ('use strict')?",
    answer: "Strict mode is a feature introduced in ES5 that allows you to place a program, or a function, in a 'strict' operating context. This strict context prevents certain silent errors from passing, throws errors for unsafe actions (like writing to read-only properties or creating global variables implicitly), and prohibits some problematic syntax.",
    category: "scope_closures",
    difficulty: "Easy",
    codeExample: `"use strict";

try {
  implicitGlobal = 42; // Throws ReferenceError
} catch(e) {
  console.log("Error: " + e.message);
}

function example(a, a) { // SyntaxError in strict mode
}`,
    explanationSteps: [
      "Strict mode is enabled globally or locally by adding the literal string directive.",
      "Implicit variable assignment without declaration is banned.",
      "Deleting non-configurable properties or using duplicate parameters is strictly forbidden."
    ],
    playgroundCode: `(function() {
  "use strict";
  try {
    x = 10;
  } catch(e) {
    console.log("Caught strict mode error: " + e.message);
  }
})();`
  },
  {
    id: 96,
    question: "What is the \"revealing module pattern\"?",
    answer: "The revealing module pattern is a variation of the module pattern. Instead of defining public methods directly inside the returned object, you define all functions and variables in the private scope, and return an object with pointers pointing to the private methods you want to expose. This keeps code highly readable, structured, and consistent.",
    category: "scope_closures",
    difficulty: "Medium",
    codeExample: `const Calculator = (function() {
  let val = 0;
  
  function add(num) { val += num; }
  function subtract(num) { val -= num; }
  function get() { return val; }
  
  // Reveal public pointers
  return {
    plus: add,
    minus: subtract,
    total: get
  };
})();`,
    explanationSteps: [
      "All variables and functions are declared in the private scope.",
      "A simple return block specifies which private functions map to public keys.",
      "Allows public aliases while maintaining standard private bindings."
    ],
    playgroundCode: `const itemRepo = (function() {
  let items = [];
  function add(item) { items.push(item); }
  function list() { return [...items]; }
  return { add, list };
})();
itemRepo.add("Key");
console.log(itemRepo.list());`
  },
  {
    id: 100,
    question: "What's a practical example of using closures for data privacy?",
    answer: "A classic application of closures is creating an object representing a bank account, counter, or key vault where the sensitive inner variables (like the balance) can only be accessed and modified via specific exposed methods. This prevents external code from corrupting or directly manipulating private data.",
    category: "scope_closures",
    difficulty: "Medium",
    codeExample: `function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable
  
  return {
    deposit(amount) {
      if (amount > 0) balance += amount;
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        return amount;
      }
      return "Insufficient funds";
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
account.deposit(50);
console.log(account.getBalance()); // 150
console.log(account.balance); // undefined (safe!)`,
    explanationSteps: [
      "The outer function createBankAccount defines a private balance variable.",
      "Exposed deposit, withdraw, and getBalance methods are bound to the account object.",
      "The balance is safely encapsulated; there are no paths to inspect or mutate it from outside."
    ],
    playgroundCode: `function secretVault() {
  let passcode = "super-secret";
  return {
    unlock(attempt) { return attempt === passcode; }
  };
}
const vault = secretVault();
console.log("Is password 'hello'? " + vault.unlock("hello"));
console.log("Is password 'super-secret'? " + vault.unlock("super-secret"));`
  }
];
