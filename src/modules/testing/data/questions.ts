import { Question, QuizQuestion } from '../types';

export const questionsData: Question[] = [
  // --- JEST (1 - 15) ---
  {
    id: 1,
    category: 'jest',
    question: 'What is Jest?',
    answer: 'A JS testing framework providing a test runner, assertion library, and mocking utilities out of the box.',
    detailedAnswer: 'Jest is a comprehensive JavaScript testing framework created and maintained by Meta (Facebook). It is designed with a focus on simplicity and works seamlessly with projects using React, TypeScript, Node.js, Angular, and Vue. Unlike other tools that require assembling a testing stack (e.g., Mocha as a runner, Chai for assertions, Sinon for mocks), Jest is a "zero-config" package that includes everything needed to run and assert tests.',
    difficulty: 'Beginner',
    tags: ['Overview', 'Testing Stack', 'Zero-Config'],
    conceptKey: 'jest-overview',
    exampleCode: `// Source Code: mathUtils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;`,
    testCaseCode: `// Jest Test Code: mathUtils.test.js
import { add, subtract } from './mathUtils';

describe('Math Utilities', () => {
  test('adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtracts two numbers correctly', () => {
    expect(subtract(5, 2)).toBe(3);
  });
});`
  },
  {
    id: 2,
    category: 'jest',
    question: 'What is a test suite vs a test case in Jest?',
    answer: 'describe() groups related tests (a suite); it()/test() defines an individual test case within it.',
    detailedAnswer: 'A test suite is a collection of related tests grouped together to organize and give structure to the test suite run. It is defined using Jest\'s global \`describe(description, callback)\` block. A test case is an individual unit of verification containing the actual code being tested and the assertions. It is defined using \`test(description, callback)\` or its alias \`it()\`. Suites can be nested within other suites to create a logical hierarchy.',
    difficulty: 'Beginner',
    tags: ['Syntax', 'Organization', 'Suites'],
    conceptKey: 'suite-vs-case',
    exampleCode: `// ShoppingCart class
export class ShoppingCart {
  items = [];
  addItem(item) { this.items.push(item); }
  get total() { return this.items.reduce((sum, i) => sum + i.price, 0); }
}`,
    testCaseCode: `import { ShoppingCart } from './cart';

describe('ShoppingCart Class', () => { // Test Suite
  let cart;
  
  beforeEach(() => { cart = new ShoppingCart(); });

  describe('addItem method', () => { // Nested Suite
    it('should add a new item', () => { // Test Case 1
      cart.addItem({ name: 'Book', price: 10 });
      expect(cart.items.length).toBe(1);
    });
  });

  describe('total getter', () => { // Nested Suite
    it('should calculate correct total price', () => { // Test Case 2
      cart.addItem({ name: 'Book', price: 10 });
      cart.addItem({ name: 'Pen', price: 2 });
      expect(cart.total).toBe(12);
    });
  });
});`
  },
  {
    id: 3,
    category: 'jest',
    question: 'What is beforeEach/afterEach used for?',
    answer: 'Running setup/teardown logic before or after every test in a suite, to keep tests isolated.',
    detailedAnswer: 'These are execution hooks that run helper setups. \`beforeEach\` executes its callback *before* every single test case inside the current describe block. It is typically used to reset mock states, instantiate fresh objects, or populate local test data. \`afterEach\` runs *after* each test case, and is ideal for teardown operations, such as clearing local/session storage, restoring mocked timers, or resetting manual spy modifications to avoid leaking state across test cases.',
    difficulty: 'Intermediate',
    tags: ['Hooks', 'Lifecycle', 'Teardown'],
    conceptKey: 'lifecycle-each',
    exampleCode: `// Database cache simulation
let dbCache = {};
export const writeToCache = (key, val) => { dbCache[key] = val; };
export const clearCache = () => { dbCache = {}; };
export const getCacheSize = () => Object.keys(dbCache).length;`,
    testCaseCode: `import { writeToCache, clearCache, getCacheSize } from './cache';

describe('Database Cache operations', () => {
  beforeEach(() => {
    // Ensures clean state before every single test
    clearCache();
  });

  afterEach(() => {
    // Clean up or log after every test
    console.log('Test case finished, cache size is:', getCacheSize());
  });

  it('starts with an empty cache', () => {
    expect(getCacheSize()).toBe(0);
  });

  it('can write items successfully', () => {
    writeToCache('user_1', { name: 'Alice' });
    expect(getCacheSize()).toBe(1);
  });
});`
  },
  {
    id: 4,
    category: 'jest',
    question: 'What is beforeAll/afterAll?',
    answer: 'Setup/teardown that runs once before/after all tests in a suite, useful for expensive shared setup.',
    detailedAnswer: '\`beforeAll\` executes once *before* any test cases inside the current block begin, making it optimal for heavy shared setup tasks (e.g., seeding a mock SQL database server, establishing connection objects, loading large static config files). \`afterAll\` executes once *after* all tests in the block finish, and is used to clean up those high-overhead global resources (e.g., shutting down the database cluster, deleting temporary folder structures, closing web servers).',
    difficulty: 'Intermediate',
    tags: ['Hooks', 'Lifecycle', 'Optimization'],
    conceptKey: 'lifecycle-all',
    exampleCode: `// Heavy shared database connection
export class TestDBConnection {
  static async connect() { /* Connects to localhost:5432 */ return true; }
  static async disconnect() { /* Closes port and connection pool */ return true; }
  async fetchUsers() { return [{ id: 1, name: 'Root' }]; }
}`,
    testCaseCode: `import { TestDBConnection } from './testDb';

describe('Global DB Users Service', () => {
  let dbConnection;

  beforeAll(async () => {
    // Heavy weight server setup, runs only ONCE
    await TestDBConnection.connect();
    dbConnection = new TestDBConnection();
  });

  afterAll(async () => {
    // Teardown server pool, runs only ONCE after everything is done
    await TestDBConnection.disconnect();
  });

  test('fetches test users correctly', async () => {
    const users = await dbConnection.fetchUsers();
    expect(users).toEqual([{ id: 1, name: 'Root' }]);
  });
});`
  },
  {
    id: 5,
    category: 'jest',
    question: 'What is a mock function (jest.fn())?',
    answer: 'A fake function that records calls/arguments and lets you control its return value, used to isolate the unit under test from its dependencies.',
    detailedAnswer: '\`jest.fn()\` creates a spy-enabled mock function. It records the context of each call (which arguments it was called with, the value of \`this\`, how many times it was called, and what it returned or threw). It is used to mock callbacks, verify dependency actions without calling actual complex subsystems, and force deterministic outputs using methods like \`mockReturnValue(val)\` or \`mockResolvedValue(val)\`.',
    difficulty: 'Intermediate',
    tags: ['Mocking', 'Spying', 'Functions'],
    conceptKey: 'jest-fn',
    exampleCode: `// Function that processes payments using a injected service
export function processOrder(cartTotal, paymentCallback) {
  if (cartTotal <= 0) return false;
  const transactionId = 'TXN-' + Math.floor(Math.random() * 100000);
  paymentCallback(transactionId, cartTotal);
  return true;
}`,
    testCaseCode: `import { processOrder } from './payment';

test('processOrder calls the callback with transaction ID and total', () => {
  // 1. Create mock callback
  const mockPaymentCallback = jest.fn();

  // 2. Run the unit under test
  const success = processOrder(150, mockPaymentCallback);

  // 3. Make assertions on the mock function
  expect(success).toBe(true);
  expect(mockPaymentCallback).toHaveBeenCalledTimes(1);
  
  // Assert details of the call (expect call index 0, first argument matching regex and second arg = 150)
  expect(mockPaymentCallback.mock.calls[0][0]).toMatch(/^TXN-\\d+/);
  expect(mockPaymentCallback.mock.calls[0][1]).toBe(150);
});`
  },
  {
    id: 6,
    category: 'jest',
    question: 'What is jest.mock() used for?',
    answer: 'Replacing an entire module with a mock implementation, useful for isolating a unit from its imported dependencies (e.g. an API client).',
    detailedAnswer: '\`jest.mock(modulePath, factory)\` allows you to hijack imports across your entire file tree. It intercepts common require or ESM import calls for specific files or npm packages (like \`axios\`, \`fs\`, or custom data-services) and automatically overrides their exports with auto-mocked functions or custom mock definitions, completely decoupling your code from slow, unstable, or network-bound modules.',
    difficulty: 'Advanced',
    tags: ['Mocking', 'Modules', 'Network'],
    conceptKey: 'jest-mock',
    exampleCode: `// apiService.js (Module we want to mock)
import axios from 'axios';
export const fetchUserProfile = async (id) => {
  const res = await axios.get(\`/api/user/\${id}\`);
  return res.data;
};`,
    testCaseCode: `import { fetchUserProfile } from './apiService';
import axios from 'axios';

// Hijack the entire axios module
jest.mock('axios');

test('fetchUserProfile yields profile payload correctly', async () => {
  // Mock the resolved response for axios.get
  axios.get.mockResolvedValue({ data: { username: 'test_user', status: 'active' } });

  const profile = await fetchUserProfile(42);
  
  expect(profile.username).toBe('test_user');
  expect(axios.get).toHaveBeenCalledWith('/api/user/42');
});`
  },
  {
    id: 7,
    category: 'jest',
    question: 'What is a spy (jest.spyOn)?',
    answer: 'Wraps an existing method to track calls to it while still (optionally) calling through to the original implementation.',
    detailedAnswer: '\`jest.spyOn(object, methodName)\` intercepts an existing object method. It retains the original, real function implementation by default, allowing you to monitor calls (inputs, execution counts, results) transparently. You can also temporarily override the output using \`mockImplementation()\` and then easily clean up the override via \`spy.mockRestore()\`, restoring the original function to its unspied behavior.',
    difficulty: 'Intermediate',
    tags: ['Mocking', 'Spying', 'Methods'],
    conceptKey: 'jest-spy-on',
    exampleCode: `// analytics.js
export const tracker = {
  sendEvent(eventName, payload) {
    console.log('Sending Real Ping:', eventName, payload);
    return true; // actually pings Google/Mixpanel
  }
};`,
    testCaseCode: `import { tracker } from './analytics';

test('verifies analytics hits without breaking real track logic', () => {
  // 1. Create a spy on the method
  const analyticsSpy = jest.spyOn(tracker, 'sendEvent');

  // 2. Trigger target logic
  tracker.sendEvent('button_click', { buttonId: 'submit_cart' });

  // 3. Assert on calls
  expect(analyticsSpy).toHaveBeenCalledTimes(1);
  expect(analyticsSpy).toHaveBeenCalledWith('button_click', { buttonId: 'submit_cart' });

  // 4. Restore original implementation to keep environments clean
  analyticsSpy.mockRestore();
});`
  },
  {
    id: 8,
    category: 'jest',
    question: 'What is snapshot testing?',
    answer: 'Captures a rendered output/serialized value and compares it against a previously saved snapshot; fails if it changes unexpectedly.',
    detailedAnswer: 'Snapshot testing is a visual-textual comparison assertion. When \`expect(value).toMatchSnapshot()\` is executed, Jest serializes the value (often a React HTML DOM tree, an object configuration, or an Redux state tree) and saves it to a local file in a \`__snapshots__\` folder. On subsequent runs, Jest compiles the new output and checks it character-by-character against the stored snapshot. If they do not match, the test fails, prompting you to either fix a bug or update the snapshot using the \`-u\` flag.',
    difficulty: 'Intermediate',
    tags: ['Snapshots', 'Visual-Diff', 'React UI'],
    conceptKey: 'snapshots',
    exampleCode: `// Button.jsx
import React from 'react';
export const CustomCard = ({ title, children, highlighted }) => (
  <div className={\`p-4 border rounded \${highlighted ? 'border-cyan-500 bg-cyan-50' : 'border-gray-200'}\`}>
    <h3 className="text-lg font-bold">{title}</h3>
    <div className="mt-2">{children}</div>
  </div>
);`,
    testCaseCode: `import React from 'react';
import renderer from 'react-test-renderer';
import { CustomCard } from './CustomCard';

test('renders CustomCard highlighted variant correctly', () => {
  const tree = renderer.create(
    <CustomCard title="Premium Offer" highlighted={true}>
      <p>Subscribe for $5/mo</p>
    </CustomCard>
  ).toJSON();
  
  // Creates a static snapshot card layout file on first run
  expect(tree).toMatchSnapshot();
});`
  },
  {
    id: 9,
    category: 'jest',
    question: 'What\'s a downside of snapshot testing?',
    answer: 'Easy to blindly approve snapshot updates without reviewing what changed, reducing the test\'s actual value as a safety net.',
    detailedAnswer: 'Snapshot tests suffer from "snapshot fatigue" and low-intent approvals. Since Jest generates and compares snapshots automatically, any small, deliberate changes in layout classnames, text copy, or tag structures will trigger a test failure. Developers frequently bypass analyzing the actual diff lines and simply press the update key (\`-u\`). This can lead to missed regressions, hard-to-read merge requests, and brittle tests that fail on trivial refactorings without verifying any actual user-facing logic.',
    difficulty: 'Intermediate',
    tags: ['Snapshots', 'Anti-Patterns', 'Regression'],
    conceptKey: 'snapshots-downside',
    exampleCode: `// Code modification that changes a harmless layout class
// OLD: <div className="text-gray-600">Name</div>
// NEW: <div className="text-slate-600">Name</div>`,
    testCaseCode: `// ❌ Jest Snapshot test immediately FAILS on class change!
// Code compiles and behaves identically, but snapshot output fails.
// Developer, tired of errors, types "jest -u" blindly.
// Actual visual regressions inside children are missed.
test('renders name correctly', () => {
  const tree = render(<NameComponent />);
  expect(tree).toMatchSnapshot(); // brittle!
});`
  },
  {
    id: 10,
    category: 'jest',
    question: 'What does toBe vs toEqual check?',
    answer: 'toBe checks strict reference/primitive equality (===); toEqual does a deep value comparison, appropriate for objects/arrays.',
    detailedAnswer: '\`toBe\` is optimized for comparing primitives (numbers, strings, booleans) or checking that two variables point to the exact same reference in memory using the triple-equals (\`===\`) operator. \`toEqual\`, on the other hand, performs a deep, structural, recursive comparison of all keys, nested objects, and arrays. Using \`toBe\` on two separate object instances with identical keys will fail, whereas \`toEqual\` will pass.',
    difficulty: 'Beginner',
    tags: ['Assertions', 'Reference', 'Data-Types'],
    conceptKey: 'to-be-vs-to-equal',
    exampleCode: `// Function returning identical structural data on each call
export const makeUserProfile = (username) => {
  return { username, roles: ['user'] };
};`,
    testCaseCode: `import { makeUserProfile } from './profile';

test('understanding strict equality vs structural equality', () => {
  const profileA = makeUserProfile('alice');
  const profileB = makeUserProfile('alice');

  // Both variables hold identical key-value properties: { username: 'alice', roles: ['user'] }

  // ❌ FAIL: These point to distinct memory heap pointers.
  expect(profileA).toBe(profileB); 

  // ✅ PASS: Recursively validates values on both objects.
  expect(profileA).toEqual(profileB); 

  // ✅ PASS: Primitive check validates matching strings successfully.
  expect(profileA.username).toBe('alice'); 
});`
  },
  {
    id: 11,
    category: 'jest',
    question: 'How do you test async code in Jest?',
    answer: 'Return a promise from the test, use async/await, or use the done callback for older callback-style code.',
    detailedAnswer: 'Jest handles async execution through three main patterns: 1. **Async/Await** (the most modern and readable approach), which automatically pauses test execution until promises resolve. 2. **Returning a Promise** from the test case, which tells the runner to wait for the promise chain to settle before finishing the test. 3. **The `done()` Callback** for older callback-based APIs. If you specify a parameter in your test callback (typically named \`done\`), Jest halts completion until you invoke \`done()\` manually, failing the test if the timeout limit is reached.',
    difficulty: 'Intermediate',
    tags: ['Async', 'Promises', 'Callbacks'],
    conceptKey: 'async-testing',
    exampleCode: `// Async APIs
export const fetchDelayMsg = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(\`Welcome ID: \${id}\`), 20);
  });
};`,
    testCaseCode: `import { fetchDelayMsg } from './asyncApi';

describe('Asynchronous Testing Styles', () => {
  // Method A: Modern Async/Await
  it('handles resolved value using async/await', async () => {
    const msg = await fetchDelayMsg(100);
    expect(msg).toBe('Welcome ID: 100');
  });

  // Method B: Return the Promise
  it('handles resolution by returning a promise', () => {
    return fetchDelayMsg(200).then((msg) => {
      expect(msg).toBe('Welcome ID: 200');
    });
  });

  // Method C: Testing Rejections
  it('handles rejections using asserts', async () => {
    const errorPromise = Promise.reject(new Error('Network Fail'));
    await expect(errorPromise).rejects.toThrow('Network Fail');
  });
});`
  },
  {
    id: 12,
    category: 'jest',
    question: 'What is jest.useFakeTimers() for?',
    answer: 'Replaces real timers (setTimeout, setInterval) with controllable fake ones, letting you fast-forward time in tests without actually waiting.',
    detailedAnswer: '\`jest.useFakeTimers()\` swaps the global JavaScript timer mechanisms (\`setTimeout\`, \`setInterval\`, \`clearTimeout\`, \`requestAnimationFrame\`) with Jest\'s internally controlled mock timer clock. This lets tests execute delay-sensitive code synchronously and instantly. You can manually advance the mock clock by calling APIs like \`jest.advanceTimersByTime(ms)\`, avoiding real-world wait times, which speeds up your test suite and prevents random timing flakes.',
    difficulty: 'Advanced',
    tags: ['Timers', 'Optimization', 'Fake-Clocks'],
    conceptKey: 'fake-timers',
    exampleCode: `// debouncer.js
export function debounceAction(callback, delayMs) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delayMs);
  };
}`,
    testCaseCode: `import { debounceAction } from './debouncer';

describe('Debounce Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Turn on fake timers before running
  });

  afterEach(() => {
    jest.useRealTimers(); // Clean up timers after running
  });

  it('runs debounced callback only after specified delay', () => {
    const mockCallback = jest.fn();
    const debouncedFn = debounceAction(mockCallback, 5000); // 5 seconds wait

    debouncedFn('hello');

    // Callback shouldn't be called immediately
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward fake timers instantly by 4999ms
    jest.advanceTimersByTime(4999);
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward 1 more millisecond (total 5000ms)
    jest.advanceTimersByTime(1);
    expect(mockCallback).toHaveBeenCalledWith('hello');
  });
});`
  },
  {
    id: 13,
    category: 'jest',
    question: 'How do you test that a function throws an error?',
    answer: 'expect(() => fn()).toThrow(), wrapping the call in a function so Jest can catch the thrown error.',
    detailedAnswer: 'To assert that code throws an error, you must wrap the execution in a wrapper callback: \`expect(() => triggerError()).toThrow(expectedError)\`. If you call the function directly (e.g. \`expect(triggerError()).toThrow()\`), the function executes *before* it can be passed to the \`expect\` wrapper. The uncaught error will propagate up and crash the test block immediately instead of being processed by Jest\'s assertion matcher.',
    difficulty: 'Beginner',
    tags: ['Assertions', 'Errors', 'Safety'],
    conceptKey: 'throwing-errors',
    exampleCode: `// Validator engine
export function checkAge(age) {
  if (typeof age !== 'number') {
    throw new TypeError('Age must be a number');
  }
  if (age < 0 || age > 150) {
    throw new RangeError('Age out of realistic bounds');
  }
  return true;
}`,
    testCaseCode: `import { checkAge } from './validator';

test('validation handles error boundaries correctly', () => {
  // ❌ INCORRECT: This will throw an error immediately and break the test before asserting!
  // expect(checkAge('not-a-number')).toThrow();

  // ✅ CORRECT: Wrap the function call inside an anonymous callback
  expect(() => checkAge('not-a-number')).toThrow(TypeError);
  expect(() => checkAge('not-a-number')).toThrow('Age must be a number');

  expect(() => checkAge(-10)).toThrow(RangeError);
  expect(() => checkAge(200)).toThrow('Age out of realistic bounds');
});`
  },
  {
    id: 14,
    category: 'jest',
    question: 'What is code coverage and how do you generate it with Jest?',
    answer: 'Percentage of code executed by tests; run Jest with the --coverage flag to generate a report.',
    detailedAnswer: 'Code coverage is an automated metrics tool that calculates how much of your codebase is executed when running your tests. Jest tracks four key metrics: 1. **Statements** (percentage of individual expressions executed), 2. **Branches** (percentage of control structures, like if/switch blocks, evaluated both true and false), 3. **Functions** (percentage of declared functions invoked), and 4. **Lines** (percentage of source file lines processed). You can generate this report by running \`jest --coverage\`, which outputs a clean terminal summary and creates an interactive HTML report in a \`coverage/\` folder.',
    difficulty: 'Intermediate',
    tags: ['Coverage', 'Metrics', 'CI/CD'],
    conceptKey: 'code-coverage',
    exampleCode: `// conditionalUtils.js (Slightly uncovered code)
export const formatStatus = (status) => {
  if (status === 'success') {
    return 'SUCCESS';
  } else if (status === 'loading') {
    return 'LOADING';
  } else {
    return 'UNKNOWN'; // Branch and statement uncovered if never tested!
  }
};`,
    testCaseCode: `import { formatStatus } from './conditionalUtils';

test('covers success status only', () => {
  expect(formatStatus('success')).toBe('SUCCESS');
  // running "jest --coverage" now will flag that:
  // - Statement Coverage is not 100% (Line 6 is unexecuted)
  // - Branch Coverage is not 100% (The 'loading' and 'else' blocks were never taken)
});`
  },
  {
    id: 15,
    category: 'jest',
    question: 'What\'s the difference between unit, integration, and end-to-end tests?',
    answer: 'Unit tests isolate a single function/component; integration tests check multiple units working together; end-to-end tests validate the full app flow in a real (or real-like) browser environment.',
    detailedAnswer: 'These form the Testing Pyramid. **Unit Tests** verify the smallest modular items in absolute isolation (e.g., individual utility functions, algorithms, pure React components) with mocked external dependencies. They are fast, reliable, and cheap to run. **Integration Tests** verify that multiple units, modules, or services communicate together correctly (e.g., a React form loading data from a state store and firing API handlers). **End-to-End (E2E) Tests** simulate an actual user journey by launching a complete system (the frontend, database, network, backend API) inside a real headless/headed browser, providing high confidence but at a higher speed and complexity cost.',
    difficulty: 'Beginner',
    tags: ['Architectures', 'Pyramid', 'Strategy'],
    conceptKey: 'pyramid',
    exampleCode: `// Architecture diagram represents:
// 1. UNIT: Math functions, pure UI buttons.
// 2. INTEGRATION: User profile forms fetching from cached services.
// 3. E2E: Cypress visiting localhost:3000, filling credentials, submitting, waiting for DB callback.`,
    testCaseCode: `// No code block: represented in our Interactive Pyramid Diagram below!`
  },

  // --- REACT TESTING LIBRARY (16 - 30) ---
  {
    id: 16,
    category: 'rtl',
    question: 'What is React Testing Library?',
    answer: 'A library for testing React components by interacting with them the way a user would, rather than testing internal implementation details.',
    detailedAnswer: 'React Testing Library (RTL) is a lightweight utility designed by Kent C. Dodds to test React components. It replaces older libraries like Enzyme, which focused on querying state/props and accessing the component instance directly. RTL enforces testing the DOM output instead. It mounts components to a virtual browser environment and queries the resulting DOM using native semantic selectors (e.g., roles, labels, text) to match how a real visitor or screen reader would perceive and interact with the page.',
    difficulty: 'Beginner',
    tags: ['Philosophy', 'React', 'DOM'],
    conceptKey: 'rtl-overview',
    exampleCode: `// AppHeader.jsx
export function AppHeader({ appName }) {
  return (
    <header className="p-4 bg-slate-900 text-white">
      <h1 className="text-xl font-bold">{appName}</h1>
      <button onClick={() => console.log('Menu')}>Open Menu</button>
    </header>
  );
}`,
    testCaseCode: `import { render, screen } from '@testing-library/react';
import { AppHeader } from './AppHeader';

test('renders app header with app name and menu button', () => {
  // 1. Render element into the virtual jsdom
  render(<AppHeader appName="Taskify" />);

  // 2. Assert on output by querying what is visible/semantic
  const heading = screen.getByRole('heading', { name: 'Taskify' });
  expect(heading).toBeInTheDocument();

  const button = screen.getByRole('button', { name: 'Open Menu' });
  expect(button).toBeInTheDocument();
});`
  },
  {
    id: 17,
    category: 'rtl',
    question: 'What is RTL\'s core philosophy?',
    answer: '"The more your tests resemble the way your software is used, the more confidence they can give you."',
    detailedAnswer: 'This statement summarizes RTL\'s philosophy. If you test internal details like your React state names, private class methods, or component keys, your tests will break during refactors even if the component\'s behavior remains unchanged. Conversely, if your tests interact with the rendered DOM exactly like an end-user (e.g., clicking a button labeled "Submit" and looking for a success message), your tests will remain stable and provide high confidence that your application actually works for real users.',
    difficulty: 'Beginner',
    tags: ['Philosophy', 'Confidence', 'Refactoring'],
    conceptKey: 'rtl-philosophy',
    exampleCode: `// Counter.jsx
import React, { useState } from 'react';
export function Counter() {
  const [count, setCount] = useState(0); // <-- This state is an implementation detail!
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}`,
    testCaseCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

test('increments counter display on click', async () => {
  render(<Counter />);

  // Query DOM elements just like a human would:
  const btn = screen.getByRole('button', { name: 'Count: 0' });

  await userEvent.click(btn);

  // We assert on visible DOM state changes, not private state counters:
  expect(screen.getByRole('button', { name: 'Count: 1' })).toBeInTheDocument();
});`
  },
  {
    id: 18,
    category: 'rtl',
    question: 'What does render() do in RTL?',
    answer: 'Renders a React component into a virtual DOM (via jsdom) for testing.',
    detailedAnswer: 'The \`render()\` function from RTL takes a React node and mounts it to a simulated browser document context provided by Node\'s testing environment (typically \`jsdom\`). Once mounted, it returns helpful utilities, such as \`container\` (the root HTML element wrapping the component), \`unmount\` (to manually trigger the component\'s cleanup hooks), and a list of query methods (though using the global \`screen\` object is preferred instead).',
    difficulty: 'Beginner',
    tags: ['Core APIs', 'DOM', 'jsdom'],
    conceptKey: 'rtl-render',
    exampleCode: `// Simple layout alert
export const AlertBox = ({ message }) => (
  <div role="alert" className="bg-red-100 p-2 text-red-700">
    <strong>Alert:</strong> {message}
  </div>
);`,
    testCaseCode: `import { render } from '@testing-library/react';
import { AlertBox } from './AlertBox';

test('inspects raw container output if needed', () => {
  // Render parses the JSX, boots the React engine, and writes standard HTML tags to jsdom:
  const { container, unmount } = render(<AlertBox message="Out of memory!" />);

  // You can inspect the compiled inner HTML structure
  expect(container.firstChild).toHaveClass('bg-red-100');
  
  // Clean up component
  unmount();
});`
  },
  {
    id: 19,
    category: 'rtl',
    question: 'What is screen in RTL?',
    answer: 'An object providing query methods (e.g. screen.getByText) bound to the whole rendered document, avoiding the need to destructure queries from render()\'s return value.',
    detailedAnswer: 'In older versions of React Testing Library, queries had to be destructured from the \`render()\` call: \`const { getByText } = render(<MyComp />)\`. Modern RTL provides the global \`screen\` object exported directly from \`@testing-library/react\`. \`screen\` acts as a shortcut bound directly to \`document.body\`, so you can query elements across the entire document without keeping track of destructured properties. This keeps your code clean, standard, and easy to maintain.',
    difficulty: 'Beginner',
    tags: ['Core APIs', 'Clean Code', 'Best Practices'],
    conceptKey: 'rtl-screen',
    exampleCode: `// MultiElementComp.jsx
export const SimpleBanner = () => (
  <section>
    <h2>Weekly Deals</h2>
    <a href="/deals">Browse Coupon</a>
  </section>
);`,
    testCaseCode: `import { render, screen } from '@testing-library/react';
import { SimpleBanner } from './MultiElementComp';

test('queries using the screen object', () => {
  render(<SimpleBanner />);

  // screen provides query helper access to the entire rendered DOM instantly!
  const heading = screen.getByRole('heading', { name: 'Weekly Deals' });
  const link = screen.getByRole('link', { name: 'Browse Coupon' });

  expect(heading).toBeInTheDocument();
  expect(link).toBeInTheDocument();
});`
  },
  {
    id: 20,
    category: 'rtl',
    question: 'Difference between getBy, queryBy, and findBy?',
    answer: 'getBy throws if not found (for asserting something exists); queryBy returns null if not found (for asserting absence); findBy returns a promise, used for elements that appear asynchronously.',
    detailedAnswer: 'These are the three core query prefixes. **getBy** queries are synchronous and assert that an element is present. If they find no matches, or find more than one match, they throw an error immediately, making them useful for checking that elements exist. **queryBy** queries are also synchronous but return \`null\` instead of throwing an error when no match is found, making them ideal for asserting that an element is *not* present. **findBy** queries are asynchronous. They return a promise that repeatedly retries the query for up to 1000ms, resolving once the element is found. This makes them the standard choice for elements that appear after network requests, timers, or transitions.',
    difficulty: 'Intermediate',
    tags: ['Queries', 'Selectors', 'Async'],
    conceptKey: 'query-differences',
    exampleCode: `// AsyncNotification.jsx
import React, { useState, useEffect } from 'react';
export function Toast({ autoShow }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (autoShow) {
      setTimeout(() => setVisible(true), 150);
    }
  }, [autoShow]);
  return visible ? <div role="status">Saved changes!</div> : null;
}`,
    testCaseCode: `import { render, screen } from '@testing-library/react';
import { Toast } from './AsyncNotification';

test('understanding query differences', async () => {
  render(<Toast autoShow={true} />);

  // 1. queryBy is ideal for asserting absence immediately:
  const absentElement = screen.queryByRole('status');
  expect(absentElement).toBeNull(); // passes!

  // 2. getBy would crash the test immediately if used right now:
  // screen.getByRole('status'); // throws error and crashes test!

  // 3. findBy resolves asynchronously once the element is rendered in jsdom:
  const appearedElement = await screen.findByRole('status');
  expect(appearedElement).toBeInTheDocument(); // passes!
});`
  },
  {
    id: 21,
    category: 'rtl',
    question: 'Why does RTL prioritize queries like getByRole over getByTestId?',
    answer: 'Role-based queries better reflect how real users (and assistive tech) perceive the page, encouraging accessible markup; test IDs are a last resort when no semantic query fits.',
    detailedAnswer: 'RTL promotes queries that align with accessibility best practices. Queries like \`getByRole\`, \`getByLabelText\`, or \`getByPlaceholderText\` verify that your HTML is structured semantically, which helps screen readers and assistive technologies navigate your page. Relying on \`getByTestId\` ignores these semantic layers, allowing completely inaccessible elements (like a plain \`<div>\` masquerading as a button with a click handler) to pass tests. This reduces the value of your tests and can lead to a degraded experience for assistive tech users.',
    difficulty: 'Intermediate',
    tags: ['A11y', 'Best Practices', 'Selectors'],
    conceptKey: 'priority-queries',
    exampleCode: `// Accessibly optimized markup vs testID crutch
// ❌ Poor: <div onClick={submit} data-testid="submit-btn">Go</div>
// ✅ Good: <button type="submit">Go</button>`,
    testCaseCode: `import { render, screen } from '@testing-library/react';
import { FormButtons } from './Form';

test('prioritizes accessibility roles', () => {
  render(<FormButtons />);

  // Prioritize checking using the implicit ARIA roles:
  const submitBtn = screen.getByRole('button', { name: /go/i });
  expect(submitBtn).toBeInTheDocument();

  // Test ID is only used as a fallback if no specific role or text matches:
  // const submitBtn = screen.getByTestId('submit-btn'); // Less accessible!
});`
  },
  {
    id: 22,
    category: 'rtl',
    question: 'What is userEvent and how does it differ from fireEvent?',
    answer: 'userEvent simulates full user interactions (e.g. typing fires keydown/keypress/input/keyup in sequence) more realistically than fireEvent, which dispatches a single low-level DOM event.',
    detailedAnswer: '\`fireEvent\` is a direct wrapper around Node\'s raw \`dispatchEvent\` API. It triggers a single browser event without running any associated browser behavior (for example, \`fireEvent.change()\` on an input updates its value, but does not trigger focus, blur, or keypress events). \`@testing-library/user-event\` is a helper package built on top of \`fireEvent\`. It simulates complete, multi-step browser interactions—such as typing, clicking, hover, and selection—firing all the expected intermediate events in the correct sequence to mimic real user behavior.',
    difficulty: 'Intermediate',
    tags: ['User Interactions', 'Events', 'Best Practices'],
    conceptKey: 'user-event-vs-fire-event',
    exampleCode: `// DynamicInput.jsx
import React, { useState } from 'react';
export function LiveForm() {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState('');
  return (
    <div className={focused ? 'bg-cyan-50' : ''}>
      <input 
        onFocus={() => setFocused(true)}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Type here"
      />
      <p>Echo: {val}</p>
    </div>
  );
}`,
    testCaseCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LiveForm } from './DynamicInput';

test('types in input using userEvent', async () => {
  render(<LiveForm />);

  const inputEl = screen.getByPlaceholderText('Type here');

  // userEvent.type simulates focus, keydown, input, and keyup sequentially:
  await userEvent.type(inputEl, 'hello');

  expect(screen.getByText('Echo: hello')).toBeInTheDocument();
  // The outer wrapper div is also correctly styled with focus-driven background:
  expect(inputEl.parentElement).toHaveClass('bg-cyan-50');
});`
  },
  {
    id: 23,
    category: 'rtl',
    question: 'How do you test a component that fetches data on mount?',
    answer: 'Mock the fetch/API call, render the component, then use findBy (async query) to wait for the loaded content to appear.',
    detailedAnswer: 'When a component requests data in a \`useEffect\` hook on mount, it starts in a loading state and then re-renders once the API promise resolves. To test this, you first mock the API service or global network resolver to return controlled dummy data. Then, you render the component, which initially displays a loading spinner. Instead of using a manual wait, you query the loaded items using \`findByRole\` or \`findByText\` to automatically wait for the UI to update with the mocked data.',
    difficulty: 'Advanced',
    tags: ['Network', 'Async', 'API Mocking'],
    conceptKey: 'fetching-on-mount',
    exampleCode: `// UsersList.jsx
import React, { useState, useEffect } from 'react';
export function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => { setUsers(data); setLoading(false); });
  }, []);

  if (loading) return <div>Loading...</div>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
    testCaseCode: `import { render, screen } from '@testing-library/react';
import { UsersList } from './UsersList';

test('loads and displays fetched users list on mount', async () => {
  // 1. Mock the global fetch function
  const fakeUsers = [{ id: 101, name: 'Gordon' }, { id: 102, name: 'Alyx' }];
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(fakeUsers)
  });

  render(<UsersList />);

  // Initially, the loading UI is displayed
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // 2. Wait for the mocked API data to load and render
  const user1 = await screen.findByText('Gordon');
  const user2 = await screen.findByText('Alyx');

  expect(user1).toBeInTheDocument();
  expect(user2).toBeInTheDocument();

  global.fetch.mockRestore(); // Restore original fetch
});`
  },
  {
    id: 24,
    category: 'rtl',
    question: 'How do you test a form submission in RTL?',
    answer: 'Use userEvent.type() to fill inputs, userEvent.click() on the submit button, then assert on the resulting UI state or a mocked submit handler being called with expected arguments.',
    detailedAnswer: 'To test a form submission, you first render the form component, providing mock functions for its submission handlers. Use \`userEvent.type()\` to fill in inputs, check boxes, or select dropdown values. Next, use \`userEvent.click()\` to click the submit button. Finally, assert that your mock submission handler was called with the expected form values, or verify that the DOM displays a success state or error message.',
    difficulty: 'Intermediate',
    tags: ['Forms', 'User Interactions', 'Mock-Callbacks'],
    conceptKey: 'form-submitting',
    exampleCode: `// ContactForm.jsx
import React, { useState } from 'react';
export function ContactForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ email }); }}>
      <label htmlFor="email">Email</label>
      <input id="email" value={email} onChange={e => setEmail(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}`,
    testCaseCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';

test('submits form with correct inputs', async () => {
  const mockSubmit = jest.fn();
  render(<ContactForm onSubmit={mockSubmit} />);

  // Fill in form inputs
  const emailInput = screen.getByLabelText('Email');
  await userEvent.type(emailInput, 'bob@example.com');

  // Submit the form
  const submitBtn = screen.getByRole('button', { name: 'Submit' });
  await userEvent.click(submitBtn);

  // Assert callback is fired with the entered values
  expect(mockSubmit).toHaveBeenCalledTimes(1);
  expect(mockSubmit).toHaveBeenCalledWith({ email: 'bob@example.com' });
});`
  },
  {
    id: 25,
    category: 'rtl',
    question: 'How do you mock a custom hook in RTL tests?',
    answer: 'jest.mock(\'../hooks/useSomething\') and provide a mock return value, or use dependency injection/wrapper components if more control is needed.',
    detailedAnswer: 'To mock a custom hook, use \`jest.mock()\` to target the hook\'s module path and return a mocked function. Within your test, import the hook and use mock implementation overrides (e.g., \`mockReturnValue()\`) to define what state, handlers, or flags the hook should return. This allows you to test different hook states (like logged-in vs. logged-out) without setting up the full provider or API flows.',
    difficulty: 'Advanced',
    tags: ['Hooks', 'Mocking', 'Advanced-RTL'],
    conceptKey: 'mocking-hooks',
    exampleCode: `// useAuth.js
export function useAuth() {
  // Returns auth details and session methods
  return { user: null, isAuthenticated: false, login: () => {} };
}`,
    testCaseCode: `import { render, screen } from '@testing-library/react';
import { useAuth } from '../hooks/useAuth';
import { ProfileDashboard } from './ProfileDashboard';

// Step 1: Mock the hook's file path
jest.mock('../hooks/useAuth');

test('displays logout button when authenticated', () => {
  // Step 2: Override the mock return value to simulate an authenticated state
  useAuth.mockReturnValue({
    user: { name: 'Alex' },
    isAuthenticated: true,
    login: jest.fn()
  });

  render(<ProfileDashboard />);

  expect(screen.getByText('Welcome, Alex')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
});`
  },
  {
    id: 26,
    category: 'rtl',
    question: 'What is waitFor used for?',
    answer: 'Repeatedly retries an assertion until it passes or times out, useful for waiting on async UI updates that aren\'t tied to a specific findBy query.',
    detailedAnswer: '\`waitFor(callback, options)\` is an asynchronous helper in RTL. It runs a callback containing your assertions repeatedly at short intervals (defaults to 50ms) until it passes, or until a timeout is reached (defaults to 1000ms). This is useful for asserting on complex, non-element async changes, such as verifying that a mocked API callback is called, a router redirection completes, or CSS animations finished and shifted layout attributes.',
    difficulty: 'Intermediate',
    tags: ['Async', 'Assertions', 'Core-Helpers'],
    conceptKey: 'wait-for',
    exampleCode: `// AsyncProcess.jsx
export function ProcessingComp({ onDone }) {
  const triggerLongProcess = () => {
    setTimeout(() => { onDone(); }, 120);
  };
  return <button onClick={triggerLongProcess}>Start</button>;
}`,
    testCaseCode: `import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProcessingComp } from './AsyncProcess';

test('calls completion handler after processing delay', async () => {
  const mockDone = jest.fn();
  render(<ProcessingComp onDone={mockDone} />);

  await userEvent.click(screen.getByRole('button', { name: 'Start' }));

  // Wait for mockDone assertion to pass (after the timer fires)
  await waitFor(() => {
    expect(mockDone).toHaveBeenCalledTimes(1);
  });
});`
  },
  {
    id: 27,
    category: 'rtl',
    question: 'How do you test components that use Context (e.g. Redux, theme)?',
    answer: 'Wrap the component in the necessary providers within a custom render wrapper function, so tests don\'t need to manually wrap every call.',
    detailedAnswer: 'If a component relies on providers (like a theme provider, router context, or state stores like Redux), rendering it directly will fail or throw errors due to missing context. To avoid wrapping every component in your tests manually, you can write a custom render helper. This helper wraps your component in the necessary providers automatically, keeping your test files clean and focused on your test assertions.',
    difficulty: 'Advanced',
    tags: ['Context', 'Redux', 'Architecture'],
    conceptKey: 'testing-context',
    exampleCode: `// ThemeContext.jsx
import React, { createContext, useContext } from 'react';
const ThemeCtx = createContext('light');
export const useTheme = () => useContext(ThemeCtx);
export const ThemeProvider = ({ value, children }) => (
  <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
);`,
    testCaseCode: `import { render as rtlRender, screen } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import { SettingsToggle } from './SettingsToggle';

// Custom render helper that applies the ThemeProvider
function customRender(ui, { theme = 'dark', ...options } = {}) {
  const AllTheProviders = ({ children }) => (
    <ThemeProvider value={theme}>{children}</ThemeProvider>
  );
  return rtlRender(ui, { wrapper: AllTheProviders, ...options });
}

test('applies theme values from context wrapper', () => {
  // Uses our custom wrapper to inject context easily:
  customRender(<SettingsToggle />);
  
  const toggleBtn = screen.getByRole('button');
  expect(toggleBtn).toHaveClass('dark-mode');
});`
  },
  {
    id: 28,
    category: 'rtl',
    question: 'What is a common anti-pattern RTL discourages?',
    answer: 'Testing implementation details like component state or internal method calls directly, rather than testing observable behavior/output.',
    detailedAnswer: 'A common anti-pattern in RTL tests is trying to access and assert on internal component states, private variables, or hook properties directly (e.g., asserting that \`wrapper.state().loading === true\`). Doing so couples your tests tightly to your implementation, making refactoring difficult and reducing confidence that your component works for real users. RTL discourages these practices, advising that tests should only interact with the visible output and user actions.',
    difficulty: 'Intermediate',
    tags: ['Philosophy', 'Anti-Patterns', 'Refactoring'],
    conceptKey: 'rtl-antipattern',
    exampleCode: `// ❌ BAD IMPLEMENTATION TEST (Enzyme style, testing details):
// const instance = render(<Form />).getInstance();
// expect(instance.state.emailValid).toBe(true);

// ✅ GOOD BEHAVIOR TEST (RTL style):
// await userEvent.type(screen.getByLabelText('Email'), 'test@valid.com');
// expect(screen.queryByText('Invalid email format')).not.toBeInTheDocument();`,
    testCaseCode: `// No test code: Concept fully explained above!`
  },
  {
    id: 29,
    category: 'rtl',
    question: 'How would you test that an element is NOT present?',
    answer: 'expect(screen.queryByText(\'...\')).not.toBeInTheDocument() — using queryBy since getBy would throw before you could assert null.',
    detailedAnswer: 'To assert that an element is not on the page, use a \`queryBy\` prefix (e.g., \`queryByText\`, \`queryByRole\`). Unlike \`getBy\`, which throws an error immediately if the element isn\'t found, \`queryBy\` returns \`null\` safely. This allows you to chain your assertion (such as \`.not.toBeInTheDocument()\` or \`.toBeNull()\`) and let your test pass.',
    difficulty: 'Beginner',
    tags: ['Queries', 'Selectors', 'Absence'],
    conceptKey: 'rtl-not-present',
    exampleCode: `// Modal.jsx
export function Modal({ isOpen, content }) {
  if (!isOpen) return null;
  return <div role="dialog">{content}</div>;
}`,
    testCaseCode: `import { render, screen } from '@testing-library/react';
import { Modal } from './Modal';

test('hides dialog window when isOpen is false', () => {
  render(<Modal isOpen={false} content="Secret vault specs" />);

  // ❌ INCORRECT: screen.getByRole throws an error, crashing the test before your assertion runs!
  // expect(screen.getByRole('dialog')).not.toBeInTheDocument();

  // ✅ CORRECT: queryBy returns null safely, allowing you to assert its absence:
  const dialogEl = screen.queryByRole('dialog');
  expect(dialogEl).not.toBeInTheDocument();
  expect(dialogEl).toBeNull();
});`
  },
  {
    id: 30,
    category: 'rtl',
    question: 'How do you test accessibility with RTL?',
    answer: 'Combine with jest-axe to run automated accessibility checks against rendered output, or rely on role-based queries surfacing accessibility issues naturally.',
    detailedAnswer: 'You can test accessibility in two main ways: 1. **Implicit Accessibility**: Using RTL\'s semantic queries like \`getByRole\` or \`getByLabelText\`. If your markup lacks accessibility markers (e.g., using a non-semantic \`<div>\` without a role), these queries will fail, highlighting accessibility issues during development. 2. **Automated Audits**: Integrating your tests with \`jest-axe\`. This library parses RTL\'s rendered DOM tree and runs automated audits, checking for color contrast, missing alt attributes, and incorrect element structures.',
    difficulty: 'Advanced',
    tags: ['A11y', 'Tools', 'Axe'],
    conceptKey: 'rtl-accessibility',
    exampleCode: `// Inaccessible image vs accessible alternative
// ❌ Poor: <img src="logo.png" />
// ✅ Good: <img src="logo.png" alt="Company Logo" />`,
    testCaseCode: `import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AccessibleComponent } from './MyComponent';

expect.extend(toHaveNoViolations);

test('component contains no critical web accessibility violations', async () => {
  const { container } = render(<AccessibleComponent />);
  
  // Runs automated axe engine checks against the rendered HTML markup
  const auditResults = await axe(container);
  
  expect(auditResults).toHaveNoViolations();
});`
  },

  // --- CYPRESS (31 - 50) ---
  {
    id: 31,
    category: 'cypress',
    question: 'What is Cypress?',
    answer: 'An end-to-end testing framework that runs tests directly in a real browser, interacting with your actual running app.',
    detailedAnswer: 'Cypress is a next-generation end-to-end (E2E) testing framework designed for web applications. Unlike older Selenium-based tools, Cypress runs inside the same run loop as your application. It provides an interactive Test Runner, automatic wait times, built-in assertion engines, and network intercepting. This setup makes writing and debugging tests faster and more reliable, ensuring your critical user journeys work as expected in a real browser.',
    difficulty: 'Beginner',
    tags: ['Overview', 'E2E Testing', 'Architecture'],
    conceptKey: 'cypress-overview',
    exampleCode: `// package.json Cypress setup
// "scripts": { "cypress:open": "cypress open" }`,
    testCaseCode: `// cypress/e2e/sample.cy.js
describe('App Onboarding Flow', () => {
  it('loads home page, signs up, and navigates to the dashboard', () => {
    // Visits the running application url directly in a real browser
    cy.visit('http://localhost:3000');
    
    cy.get('h1').should('contain', 'Welcome');
  });
});`
  },
  {
    id: 32,
    category: 'cypress',
    question: 'How is Cypress different from Jest + RTL?',
    answer: 'Cypress runs true end-to-end tests against a real browser and full app (including backend calls, unless mocked); Jest+RTL run component-level tests in a simulated DOM (jsdom), faster but less representative of real browser behavior.',
    detailedAnswer: 'Cypress and Jest + RTL serve different levels of the testing pyramid. Jest + RTL run component-level tests in a simulated browser environment (jsdom) in Node.js. This is fast and efficient for isolated testing during development, but lacks real-world rendering engines, networks, and cookies. Cypress, by contrast, runs true end-to-end tests inside a real browser instance (such as Chrome or Firefox). It tests your full application flow—including API calls, asset rendering, database updates, and CSS layout behaviors—offering high confidence before production releases.',
    difficulty: 'Intermediate',
    tags: ['Architecture', 'Pyramid', 'Comparisons'],
    conceptKey: 'cypress-vs-jest',
    exampleCode: `// 1. Jest + RTL runs inside node terminal executing jsdom simulation.
// 2. Cypress launches an automated browser (Chromium) and renders active pixels.`,
    testCaseCode: `// No code block: represented in our Interactive Comparison Matrix!`
  },
  {
    id: 33,
    category: 'cypress',
    question: 'What is a Cypress "command"?',
    answer: 'A chainable action/assertion like cy.get(), cy.click(), cy.type() that Cypress queues and retries automatically until it succeeds or times out.',
    detailedAnswer: 'A Cypress command is an asynchronous, chainable method (like \`cy.get()\`, \`cy.click()\`, \`cy.type()\`, or \`cy.should()\`) that is added to Cypress\'s execution queue. Instead of running immediately, these commands are executed sequentially and automatically retried if they fail (up to a default timeout of 4000ms). This built-in queueing and retrying helps prevent flaky tests caused by page loads, animations, or delayed network responses.',
    difficulty: 'Beginner',
    tags: ['Syntax', 'Command-Queue', 'Core-APIs'],
    conceptKey: 'cypress-command',
    exampleCode: `// Sequence of actions:
// cy.get() -> waits for element
// .type()  -> triggers key inputs
// .click() -> clicks element
// .should()-> asserts result`,
    testCaseCode: `describe('Command Chaining', () => {
  it('executes actions in order', () => {
    cy.visit('/login');

    // Each action is queued and run in sequence:
    cy.get('input[name="user"]')
      .type('admin')
      .should('have.value', 'admin'); // automatic assertion retry

    cy.get('button[type="submit"]')
      .click();
  });
});`
  },
  {
    id: 34,
    category: 'cypress',
    question: 'What is Cypress\'s automatic retry-ability?',
    answer: 'Commands and assertions automatically retry for a configurable timeout period, reducing flaky tests caused by timing/async issues.',
    detailedAnswer: 'Retry-ability is a core feature of Cypress. When executing a command or assertion (e.g., \`cy.get("#toast-msg").should("be.visible")\`), Cypress doesn\'t fail immediately if the element isn\'t found. Instead, it repeatedly queries the browser\'s active DOM tree until the assertion passes, or until its timeout (default 4000ms) is reached. This removes the need for manual waits or sleep buffers, leading to more reliable, stable tests.',
    difficulty: 'Intermediate',
    tags: ['Retry-ability', 'Asynchronous', 'Flakiness'],
    conceptKey: 'cypress-retryability',
    exampleCode: `// Dynamic element that renders after a 1.5s delay
// <div id="success">Loaded successfully!</div>`,
    testCaseCode: `it('waits for delayed element to appear without sleep blocks', () => {
  cy.visit('/dashboard');

  // Cypress will retry querying #success and checking its content
  // for up to 4000ms. It passes immediately once the element appears.
  cy.get('#success')
    .should('be.visible')
    .and('contain', 'Loaded successfully!');
});`
  },
  {
    id: 35,
    category: 'cypress',
    question: 'How do you select an element in Cypress?',
    answer: 'cy.get(selector), ideally targeting data-cy attributes for stability against markup/class changes.',
    detailedAnswer: 'Cypress uses standard CSS selectors inside \`cy.get()\` to locate elements (e.g., \`cy.get(".btn-primary")\`, \`cy.get("#email-field")\`). However, styling classnames or DOM hierarchies are often modified during refactors, which can break your selectors and cause test failures. To prevent this, Cypress recommends adding dedicated testing attributes to your HTML elements (such as \`data-cy="submit-button"\` or \`data-testid="input-username"\`), decoupling your test selectors from styles and layout structure.',
    difficulty: 'Beginner',
    tags: ['Selectors', 'Best Practices', 'Stability'],
    conceptKey: 'cypress-selectors',
    exampleCode: `// HTML Markup with dedicated testing selectors
// ❌ Fragile: <button class="px-2 py-4 bg-cyan-500 rounded">Save</button>
// ✅ Resilient: <button data-cy="save-button" class="px-2 py-4 bg-cyan-500 rounded">Save</button>`,
    testCaseCode: `it('selects elements using highly stable data-cy attributes', () => {
  cy.visit('/edit');

  // ❌ Fragile: Will fail if the style class changes or button is wrapped
  // cy.get('.px-2.py-4.bg-cyan-500').click();

  // ✅ Stable: Remains robust even if layout, styling, or tags are changed
  cy.get('[data-cy="save-button"]').click();
});`
  },
  {
    id: 36,
    category: 'cypress',
    question: 'How do you intercept and mock network requests in Cypress?',
    answer: 'cy.intercept() — stub responses, assert requests were made, or spy on real requests without altering them.',
    detailedAnswer: '\`cy.intercept(routeConfig, response)\` allows you to monitor and control network requests during E2E tests. You can use it to: 1. **Spy**: Watch real API requests to assert on headers or query parameters. 2. **Mock**: Intercept requests and return controlled dummy responses instantly. This is useful for testing edge cases (such as API errors or slow connections) without needing to set up complex backend states.',
    difficulty: 'Advanced',
    tags: ['Network', 'API Mocking', 'Interception'],
    conceptKey: 'cypress-intercept',
    exampleCode: `// API Endpoint we want to intercept
// GET /api/v1/profile`,
    testCaseCode: `it('intercepts API profile calls and returns mock data', () => {
  // 1. Intercept GET requests to the profile endpoint, returning dummy data
  cy.intercept('GET', '/api/v1/profile', {
    statusCode: 200,
    body: { name: 'Sarah Connor', tier: 'Admin' }
  }).as('getUserProfile');

  cy.visit('/profile-page');

  // 2. Wait for the intercepted request to resolve
  cy.wait('@getUserProfile');

  // 3. Assert on the updated UI
  cy.get('[data-cy="user-heading"]').should('have.text', 'Sarah Connor');
  cy.get('[data-cy="tier-badge"]').should('contain', 'Admin');
});`
  },
  {
    id: 37,
    category: 'cypress',
    question: 'What is a Cypress fixture?',
    answer: 'A static JSON (or other) file used as mock data for tests, loaded via cy.fixture().',
    detailedAnswer: 'A Cypress fixture is a static file containing pre-defined test data (typically JSON, but it can also be images, text, or PDFs) stored in the \`cypress/fixtures\` folder. Instead of writing large mock objects directly inside your test files, you can load them using \`cy.fixture("fileName")\`. This separates mock payloads from test logic, keeping your tests clean and easy to maintain.',
    difficulty: 'Intermediate',
    tags: ['Fixtures', 'Mocking', 'Clean Code'],
    conceptKey: 'cypress-fixture',
    exampleCode: `// cypress/fixtures/usersList.json
[
  { "id": 1, "name": "Tony", "status": "Online" },
  { "id": 2, "name": "Bruce", "status": "Away" }
]`,
    testCaseCode: `it('loads mock user lists from fixtures', () => {
  // Intercept the API and load the response data from our JSON fixture file
  cy.intercept('GET', '/api/users', { fixture: 'usersList.json' }).as('getUsers');

  cy.visit('/users-dashboard');

  cy.wait('@getUsers');

  // Verify UI renders the user list from the fixture correctly
  cy.get('[data-cy="user-row"]').should('have.length', 2);
  cy.get('[data-cy="user-row"]').first().should('contain', 'Tony');
});`
  },
  {
    id: 38,
    category: 'cypress',
    question: 'How do you test a login flow in Cypress?',
    answer: 'Visit the login page, type credentials, submit, then assert on the resulting authenticated state (e.g. redirect URL, welcome message, or a stored auth token/cookie).',
    detailedAnswer: 'To test a login flow, simulate the full user interaction: use \`cy.visit()\` to open the login page, locate the input fields and use \`cy.type()\` to enter valid credentials, then submit the form with \`cy.click()\`. Finally, assert on the authenticated state by verifying that the user is redirected to the dashboard (e.g., \`cy.url().should("include", "/dashboard")\`), confirming that a welcome banner is visible, or checking that an auth token is set in your cookies.',
    difficulty: 'Intermediate',
    tags: ['Auth', 'Forms', 'User Journeys'],
    conceptKey: 'cypress-login',
    exampleCode: `// Login Page DOM layout
// <input name="email" /> <input name="pwd" /> <button type="submit">Submit</button>`,
    testCaseCode: `it('logs in successfully and routes to user dashboard', () => {
  cy.visit('/login');

  // Type credentials and submit
  cy.get('[data-cy="email-input"]').type('pilot@skynet.com');
  cy.get('[data-cy="password-input"]').type('T800-model{enter}'); // fires enter key

  // Verify successful login state changes
  cy.url().should('include', '/dashboard');
  cy.get('[data-cy="welcome-message"]').should('contain', 'Welcome back, pilot!');
  
  // Verify cookie is set correctly
  cy.getCookie('auth_session').should('exist');
});`
  },
  {
    id: 39,
    category: 'cypress',
    question: 'What is the Cypress Test Runner?',
    answer: 'The interactive GUI showing test execution step-by-step with time-travel debugging — you can click any command to see the app\'s DOM state at that point.',
    detailedAnswer: 'The Cypress Test Runner is an interactive visual debugger that opens when you run \`cypress open\`. It displays your application in a real browser alongside a sidebar logs timeline. This timeline lists every command executed (such as visits, clicks, and network requests) during the test. You can click on any step in the timeline to view the state of the DOM at that moment, inspect details of network calls, and troubleshoot failures in real-time.',
    difficulty: 'Beginner',
    tags: ['Runner', 'Debugging', 'Time-Travel'],
    conceptKey: 'cypress-runner',
    exampleCode: `// Visual interface elements:
// - Left: Test Command Timeline (Time travel steps)
// - Right: Live Application IFrame
// - Top: Selector Playground tool`,
    testCaseCode: `// No code block: fully simulated in our interactive Cypress runner below!`
  },
  {
    id: 40,
    category: 'cypress',
    question: 'How do you run Cypress tests in CI?',
    answer: 'Headlessly via cypress run, often integrated into a CI pipeline (GitHub Actions, etc.), sometimes using Cypress\'s own dashboard service for recording/parallelization.',
    detailedAnswer: 'In CI environments (such as GitHub Actions or CircleCI), running tests with an interactive GUI is not possible. Instead, you run Cypress headlessly using the command \`cypress run\`. This runs tests in a background browser instance (such as Electron or Chromium), logging progress directly to your terminal. On failure, Cypress automatically captures screenshots and records videos of the run, saving them as build artifacts to help you troubleshoot CI issues.',
    difficulty: 'Intermediate',
    tags: ['CI/CD', 'Headless', 'Automation'],
    conceptKey: 'cypress-ci',
    exampleCode: `# .github/workflows/e2e.yml snippet
- name: Run Cypress Tests
  run: npx cypress run --browser chrome`,
    testCaseCode: `// No test code: CI/CD configurations are environment scripts!`
  },
  {
    id: 41,
    category: 'cypress',
    question: 'What is a flaky test and how does Cypress help reduce flakiness?',
    answer: 'A test that intermittently passes/fails without code changes, often due to timing; Cypress\'s automatic waiting/retrying for commands and assertions reduces the need for manual arbitrary waits/sleeps.',
    detailedAnswer: 'A flaky test is a test that intermittently passes and fails on the same commit without any code modifications, often due to network speed, background rendering delays, or database delays. In Selenium-based tools, developers often add manual waits (e.g., \`sleep(5000)\`) to bypass this, making test suites slow and unstable. Cypress reduces flakiness through its core feature of automatic retry-ability, automatically waiting for elements to exist and network requests to resolve before executing assertions.',
    difficulty: 'Intermediate',
    tags: ['Flakiness', 'Retry-ability', 'Best Practices'],
    conceptKey: 'cypress-flakiness',
    exampleCode: `// Selenium (❌ Flaky, manual waits):
// driver.findElement(By.id("btn")).click();
// Thread.sleep(5000); // Bad!

// Cypress (✅ Stable, automatic waits):
// cy.get('#btn').click(); // waits for element to appear, become clickable, and execute`,
    testCaseCode: `// No test code: architectural principle!`
  },
  {
    id: 42,
    category: 'cypress',
    question: 'Should you use arbitrary waits (cy.wait(5000)) in Cypress tests?',
    answer: 'Generally avoid — prefer waiting on specific conditions (element appearing, network request completing via cy.intercept) rather than a fixed time delay, which is both slow and unreliable.',
    detailedAnswer: 'Using arbitrary time delays like \`cy.wait(5000)\` is a testing anti-pattern. It slows down your test suite and remains unreliable, as a network request might take longer than your wait limit under high load. Instead, use dynamic wait strategies. You can intercept network requests with \`cy.intercept()\` and use \`cy.wait("@apiAlias")\` to wait for that specific request to resolve, or assert directly on visible element changes to let Cypress handle the waiting automatically.',
    difficulty: 'Intermediate',
    tags: ['Best Practices', 'Performance', 'Anti-Patterns'],
    conceptKey: 'cypress-wait-strategy',
    exampleCode: `// ❌ BAD: Delays tests by exactly 5 seconds, regardless of how fast the API resolved:
// cy.get('[data-cy="load-btn"]').click();
// cy.wait(5000); 

// ✅ GOOD: Waits only as long as needed for the API response:
// cy.intercept('GET', '/items').as('loadItems');
// cy.get('[data-cy="load-btn"]').click();
// cy.wait('@loadItems'); // continues instantly when response arrives!`,
    testCaseCode: `// Fully covered in the dynamic intercept example above!`
  },
  {
    id: 43,
    category: 'cypress',
    question: 'How do you test responsive/mobile layouts in Cypress?',
    answer: 'cy.viewport(width, height) to set the browser viewport size before assertions.',
    detailedAnswer: 'To test how your application behaves on different screens, use \`cy.viewport(width, height)\`. You can specify dimensions in pixels (e.g., \`cy.viewport(1280, 720)\`) or use pre-configured device names (e.g., \`cy.viewport("iphone-x")\` or \`cy.viewport("ipad-2")\`). This allows you to test mobile-specific states—such as verifying that a sidebar collapsed into a hamburger menu or confirming that touch-drag interactions work correctly.',
    difficulty: 'Beginner',
    tags: ['Responsive', 'Mobile', 'Viewport'],
    conceptKey: 'cypress-viewport',
    exampleCode: `// Responsive Navigation Component
// Mobile View: hamburger menu button is visible, sidebar is hidden.
// Desktop View: sidebar is visible, hamburger menu is hidden.`,
    testCaseCode: `describe('Responsive Layout Checks', () => {
  it('checks sidebar toggles correctly on mobile viewports', () => {
    // 1. Set viewport to mobile size
    cy.viewport('iphone-x');
    cy.visit('/');

    // 2. Assert mobile layout adjustments
    cy.get('[data-cy="hamburger-btn"]').should('be.visible');
    cy.get('[data-cy="desktop-sidebar"]').should('not.be.visible');

    // 3. Open menu and assert content
    cy.get('[data-cy="hamburger-btn"]').click();
    cy.get('[data-cy="mobile-nav-links"]').should('be.visible');
  });
});`
  },
  {
    id: 44,
    category: 'cypress',
    question: 'What is the difference between cy.visit() and navigating via clicking a link in a test?',
    answer: 'cy.visit() performs a full page load to a given URL directly; clicking a link tests actual in-app navigation behavior (e.g. SPA routing without a full reload).',
    detailedAnswer: '\`cy.visit(url)\` triggers a full browser reload, fetching fresh assets and rendering the page from scratch at the specified route. Clicking a link (e.g., \`cy.get("a").click()\`) tests actual in-app client-side navigation. For SPAs (Single Page Applications), client-side navigation updates the page dynamically without a full reload, which is crucial to test for verifying that routing logic, state managers, and component bundles work as expected.',
    difficulty: 'Intermediate',
    tags: ['Navigation', 'SPA Routing', 'Core-APIs'],
    conceptKey: 'cypress-visit',
    exampleCode: `// Router settings:
// <Link to="/settings">Go to settings</Link>`,
    testCaseCode: `it('compares route load vs router-driven link clicks', () => {
  // Option A: Direct load (full server fetch/refresh)
  cy.visit('/settings'); 

  // Option B: User-style click (tests client router state and bundle loading)
  cy.visit('/');
  cy.get('[data-cy="settings-nav-link"]').click(); 

  cy.url().should('include', '/settings');
});`
  },
  {
    id: 45,
    category: 'cypress',
    question: 'How would you test a feature that depends on a specific date/time?',
    answer: 'Use cy.clock() to control the browser\'s time, allowing deterministic tests for date-dependent UI.',
    detailedAnswer: '\`cy.clock()\` intercepts the browser\'s native timers and clock APIs (such as \`Date\`, \`setTimeout\`, \`setInterval\`). When active, it freezes the browser\'s internal clock to a date and time you define (e.g., \`cy.clock(new Date("2026-07-17").getTime())\`). This allows you to test date-dependent logic (like holiday discount banners, age verifications, or time-based greetings) deterministically, regardless of when your test suite is run.',
    difficulty: 'Advanced',
    tags: ['Time-Freeze', 'Deterministic', 'Advanced-Cypress'],
    conceptKey: 'cypress-clock',
    exampleCode: `// WelcomePromo.jsx
export function PromoHeader() {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      {currentYear === 2026 ? 'Welcome to 2026 Campaign!' : 'Standard Promo'}
    </div>
  );
}`,
    testCaseCode: `it('renders special marketing campaign banner during 2026', () => {
  // 1. Freeze browser time to July 17, 2026
  const customTime = new Date('2026-07-17T12:00:00').getTime();
  cy.clock(customTime);

  cy.visit('/');

  // 2. Assert on time-locked UI
  cy.get('[data-cy="promo-banner"]')
    .should('be.visible')
    .and('have.text', 'Welcome to 2026 Campaign!');
});`
  },
  {
    id: 46,
    category: 'cypress',
    question: 'What\'s a good strategy for keeping E2E tests maintainable as the app grows?',
    answer: 'Page Object Model or custom Cypress commands (Cypress.Commands.add) to encapsulate repeated interaction patterns, avoiding duplicated low-level selector logic across tests.',
    detailedAnswer: 'As your application grows, duplicate selector logic across multiple test files can make your test suite difficult to maintain. To keep things clean, you can use: 1. **Custom Cypress Commands**: encapsulating common, repeated flows (such as log-ins or database resets) directly in Cypress\'s api layer. 2. **Page Object Models (POM)**: creating helper classes that house selectors and actions for specific pages. This isolates selector changes to a single file, keeping your test cases easy to read and maintain.',
    difficulty: 'Advanced',
    tags: ['Architecture', 'Maintainability', 'POM'],
    conceptKey: 'cypress-maintenance',
    exampleCode: `// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.get('[data-cy="email-field"]').type(email);
  cy.get('[data-cy="password-field"]').type(password);
  cy.get('[data-cy="login-btn"]').click();
});`,
    testCaseCode: `it('uses our clean custom command wrapper', () => {
  cy.visit('/dashboard');
  
  // Reusable auth command avoids duplications
  cy.login('user@test.com', 'securePwd123'); 
  
  cy.url().should('include', '/dashboard');
});`
  },
  {
    id: 47,
    category: 'cypress',
    question: 'When would you write a Cypress E2E test vs an RTL component test for the same feature?',
    answer: 'RTL for fast, isolated component behavior verification during development; Cypress for validating critical user journeys work correctly across the whole integrated system before release.',
    detailedAnswer: 'Use Jest + RTL during development to test individual components in isolation. These tests run quickly in terminal environments, making them ideal for verifying details like validation states, props, and error boundaries. Use Cypress E2E tests for verifying critical user journeys (such as sign-up, payments, or checkout flows) across your entire system. These tests verify that your frontend, backend, database, and network integrations work together seamlessly, giving you high confidence before a release.',
    difficulty: 'Intermediate',
    tags: ['Strategy', 'Pyramid', 'Comparisons'],
    conceptKey: 'cypress-vs-rtl-usecase',
    exampleCode: `// 1. RTL Scope: Verify input validator prints Red alert text immediately if length is < 4.
// 2. Cypress Scope: Verify user logs in, goes to settings, updates email, and checks db sync.`,
    testCaseCode: `// No code block: design-strategic guidelines!`
  },
  {
    id: 48,
    category: 'cypress',
    question: 'How do you handle authentication state across multiple Cypress tests without repeating login UI steps each time?',
    answer: 'Use cy.session() (or a custom command hitting an API/login endpoint directly) to cache and reuse authenticated session state across tests.',
    detailedAnswer: 'Using login UI steps before every single E2E test is slow and can add minutes to your runs. To optimize this, Cypress provides \`cy.session()\`. This API runs your login logic once, caches the resulting session state (cookies, localStorage, token payloads), and restores it instantly before subsequent tests. This skips repetitive UI login steps, speeding up your test suite significantly.',
    difficulty: 'Advanced',
    tags: ['Auth', 'Caching', 'Performance'],
    conceptKey: 'cypress-session',
    exampleCode: `// Caches user session securely
export function cacheSession(userId) {
  return cy.session(userId, () => {
    cy.visit('/login');
    cy.get('[data-cy="email"]').type('agent@matrix.com');
    cy.get('[data-cy="password"]').type('password123');
    cy.get('[data-cy="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
}`,
    testCaseCode: `describe('Dashboard Actions', () => {
  beforeEach(() => {
    // Restores user session state instantly, skipping E2E UI login steps!
    cy.session('user-session-1', () => {
      cy.visit('/login');
      cy.get('[data-cy="email"]').type('user@test.com');
      cy.get('[data-cy="password"]').type('pwd123');
      cy.get('[data-cy="submit"]').click();
    });
  });

  it('can create a new task', () => {
    cy.visit('/dashboard');
    cy.get('[data-cy="create-task-btn"]').click();
  });

  it('can open user settings profile', () => {
    cy.visit('/settings');
    cy.get('[data-cy="profile-header"]').should('be.visible');
  });
});`
  },
  {
    id: 49,
    category: 'cypress',
    question: 'What is component testing in Cypress (Cypress Component Testing)?',
    answer: 'Runs component-level tests (similar to RTL\'s scope) but inside a real browser via Cypress\'s runner, combining RTL-like isolation with real browser rendering.',
    detailedAnswer: 'Cypress Component Testing (CCT) allows you to test isolated components (React, Angular, Vue) using Cypress\'s API, but inside a real browser instead of node-jsdom. This combines the isolation and speed of component testing with real browser rendering. It lets you inspect details like CSS styles, layout responsiveness, and touch gestures, offering a high-confidence alternative to JSDOM-based testing.',
    difficulty: 'Advanced',
    tags: ['Component-Testing', 'Real-Browser', 'Comparisons'],
    conceptKey: 'cypress-component-testing',
    exampleCode: `// Button.jsx
export function Button({ label }) {
  return <button className="hover:bg-cyan-600 transition p-2">{label}</button>;
}`,
    testCaseCode: `// Button.cy.jsx
import { mount } from 'cypress/react';
import { Button } from './Button';

describe('<Button />', () => {
  it('mounts component in a real browser, allowing real hover checks', () => {
    // Mounts component directly in Cypress's browser frame:
    mount(<Button label="Press Me" />);

    // Assert using Cypress standard API
    cy.get('button')
      .should('have.text', 'Press Me')
      .realHover() // Hover works natively with browser graphics!
      .should('have.css', 'background-color', 'rgb(79, 70, 229)');
  });
});`
  },
  {
    id: 50,
    category: 'cypress',
    question: 'How would you decide the right testing pyramid balance for a project?',
    answer: 'Many fast unit/component tests (Jest/RTL) at the base, fewer integration tests, and a small set of critical-path E2E tests (Cypress) at the top — E2E tests are valuable but slower and more brittle, so reserve them for the most important flows.',
    detailedAnswer: 'The testing pyramid is a strategic guide for structuring your test suite. Maintain **many fast, cheap Unit and Component Tests (Jest/RTL)** at the base. These catch bugs quickly during development with low overhead. Use **fewer Integration Tests** in the middle to verify that your services and state stores communicate correctly. At the top, reserve **a small, critical-path set of E2E tests (Cypress)** to verify your main user flows (e.g., login, checkout, sign-up). This setup keeps your test runs fast and maintainable while providing high confidence for releases.',
    difficulty: 'Advanced',
    tags: ['Strategy', 'Pyramid', 'Management'],
    conceptKey: 'pyramid-decision',
    exampleCode: `// Golden Testing Pyramid Ratio:
// 70% Unit/Component Tests (Fast, JSDOM)
// 20% Integration Tests (Middle-layer flows)
// 10% End-to-End Tests (Cypress browser critical path)`,
    testCaseCode: `// Fully simulated inside our interactive diagrams and strategy simulator!`
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: 'jest',
    question: 'Which Jest matcher is correct for checking that two distinct object instances have identical key-value structures?',
    options: [
      'expect(objA).toBe(objB)',
      'expect(objA).toEqual(objB)',
      'expect(objA).toMatchObject(objB)',
      'expect(objA).toBeInstanceOf(objB)'
    ],
    correctAnswer: 1,
    explanation: 'toBe checks strict reference equality (===) which fails on distinct object instances. toEqual performs recursive deep structural comparison on keys and values, which passes for structurally identical objects.'
  },
  {
    id: 2,
    category: 'jest',
    question: 'How do you fast-forward a debounce action of 5000ms using Jest\'s fake timers?',
    options: [
      'jest.advanceTimersByTime(5000)',
      'jest.skipTime(5000)',
      'jest.fastForward(5000)',
      'cy.wait(5000)'
    ],
    correctAnswer: 0,
    explanation: 'jest.advanceTimersByTime(ms) is the API used with jest.useFakeTimers() to advance the simulated timeline clock synchronously inside tests.'
  },
  {
    id: 3,
    category: 'rtl',
    question: 'Which query prefix should you use when asserting that an element is NOT present in the DOM?',
    options: [
      'getByText()',
      'findByText()',
      'queryByText()',
      'searchByText()'
    ],
    correctAnswer: 2,
    explanation: 'queryByText() returns null if the element is not found, making it safe for non-existence assertions. getByText() and findByText() will throw an error immediately, failing the test before the assertion runs.'
  },
  {
    id: 4,
    category: 'rtl',
    question: 'What is the core philosophical recommendation of React Testing Library regarding component testing?',
    options: [
      'Test internal state machines and private props to ensure structural integrity',
      'Ensure 100% snapshot code coverage on every HTML node',
      'Interact with the component as a real user or screen reader would via the DOM',
      'Bypass JSDOM and mount everything inside real headed Chrome runners'
    ],
    correctAnswer: 2,
    explanation: 'RTL\'s core philosophy is that tests should resemble actual software usage. It promotes querying semantic elements (like button roles or label texts) rather than private implementation details like state names or class names.'
  },
  {
    id: 5,
    category: 'cypress',
    question: 'Which Cypress command allows you to intercept, stub, or spy on server-side network requests?',
    options: [
      'cy.route()',
      'cy.spy()',
      'cy.intercept()',
      'cy.request()'
    ],
    correctAnswer: 2,
    explanation: 'cy.intercept() is the modern and powerful Cypress API used to mock, spy, or stub HTTP requests made by your application during end-to-end tests.'
  },
  {
    id: 6,
    category: 'cypress',
    question: 'What is the main downside of using arbitrary wait commands like cy.wait(5000) inside E2E tests?',
    options: [
      'They cause Cypress to crash due to out-of-memory errors',
      'They make tests run on the node thread rather than the browser run-loop',
      'They make tests slow and prone to timing flakes if the API takes longer than 5 seconds',
      'They are forbidden by the standard TypeScript compiler'
    ],
    correctAnswer: 2,
    explanation: 'Arbitrary wait timers are slow, and they fail under high load if requests exceed the wait limit. Prefer waiting on dynamic events or aliased network responses via cy.intercept() instead.'
  }
];
