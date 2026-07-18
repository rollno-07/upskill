export interface QuestionData {
  id: number;
  category: 'Core Concepts' | 'Comparison with Redux/Context' | 'Selectors & Performance' | 'Advanced & Immutability' | 'Testing, SSR & Tabs' | 'Integrations & Ecosystem';
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  codeExample?: string;
  diagramId: 're-render' | 'redux-vs-zustand' | 'set-merger' | 'immer-nested' | 'tab-persist' | 'async-loader' | 'history-undo' | 'store-slices' | 'outside-react' | 'computed-values';
}

export const questions: QuestionData[] = [
  {
    id: 1,
    category: 'Core Concepts',
    question: "What is Zustand?",
    shortAnswer: "A minimal state management library for React using hooks, without requiring a Provider wrapper.",
    detailedAnswer: "Zustand is a small, fast, and scalable bearbones state-management solution. It uses a unidirectional data flow (Flux-like) but is built entirely on React hooks. Its main strength is simplicity—it does not require you to wrap your application in a Context Provider, meaning there is no boilerplate, no context re-render issues, and your state can live cleanly in an external module that React components subscribe to directly.",
    codeExample: `import { create } from 'zustand';

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));`,
    diagramId: 'outside-react'
  },
  {
    id: 2,
    category: 'Comparison with Redux/Context',
    question: "How is Zustand different from Redux?",
    shortAnswer: "Zustand features far less boilerplate—no actions, reducers, or dispatch ceremony; state and updates live together.",
    detailedAnswer: "Unlike Redux, which requires actions, action types, reducers, and a dispatch mechanism, Zustand co-locates your state and actions inside a single 'create' function. This reduces boilerplate drastically. Furthermore, Zustand does not require a Provider wrapper, allows simple hook-based consumption, and supports direct subscription/updates from outside the React component tree.",
    codeExample: `// REDUX (Toolkit): Needs slice + store config + useDispatch + useSelector + Provider
// ZUSTAND: Just one call!
const useStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}));`,
    diagramId: 'redux-vs-zustand'
  },
  {
    id: 3,
    category: 'Core Concepts',
    question: "Does Zustand require a Provider?",
    shortAnswer: "No, the store is a plain module-level hook, importable and usable directly in any component.",
    detailedAnswer: "No. Zustand stores are created as module-level closures. The return value of create() is a custom hook that connects directly to the store's external subscription mechanism. Any React component can import this hook and subscribe to state changes immediately without needing any <Provider> or context-wrapping at the root of the app.",
    codeExample: `// file: useStore.js
export const useStore = create((set) => ({ count: 0 }));

// file: Component.jsx
import { useStore } from './useStore';
const Component = () => {
  const count = useStore((s) => s.count);
  return <div>{count}</div>;
};`,
    diagramId: 'outside-react'
  },
  {
    id: 4,
    category: 'Core Concepts',
    question: "How do you create a Zustand store?",
    shortAnswer: "By calling the `create` function from `zustand` and passing a store creator function.",
    detailedAnswer: "To create a store, you call the `create` function, passing a callback function that receives `set`, `get`, and sometimes `api` as parameters. This callback returns the initial state object, which includes both data variables and action/updater functions.",
    codeExample: `import { create } from 'zustand';

interface Store {
  value: string;
  setValue: (next: string) => void;
}

export const useStore = create<Store>((set) => ({
  value: 'initial',
  setValue: (next) => set({ value: next }),
}));`,
    diagramId: 'set-merger'
  },
  {
    id: 5,
    category: 'Core Concepts',
    question: "What does `set` do?",
    shortAnswer: "Merges the given partial object (or function returning one) into the store's state.",
    detailedAnswer: "The `set` function is the primary mechanism to update state in Zustand. By default, it performs a shallow merge of the keys you provide into the existing state. You can pass a partial state object directly, or a function that receives the current state and returns a partial state object (useful when updates depend on the previous state).",
    codeExample: `// Simple partial update
set({ status: 'success' })

// State-dependent update
set((state) => ({ count: state.count + 1 }))`,
    diagramId: 'set-merger'
  },
  {
    id: 6,
    category: 'Core Concepts',
    question: "What does `get` do?",
    shortAnswer: "Returns the current store state, useful for reading state inside an action without subscribing.",
    detailedAnswer: "The `get` parameter passed to the store creator function returns the complete current state of the store. This allows you to inspect values inside action functions asynchronously or dynamically without triggering components to re-render, and without subscribing to state changes like a React hook would.",
    codeExample: `const useStore = create((set, get) => ({
  amount: 10,
  checkout: () => {
    const currentAmount = get().amount; // Reads amount directly
    if (currentAmount > 0) {
      // execute logic
      set({ amount: currentAmount - 1 });
    }
  }
}));`,
    diagramId: 'outside-react'
  },
  {
    id: 7,
    category: 'Selectors & Performance',
    question: "How do you select a slice of state in a component?",
    shortAnswer: "Pass a selector function to the hook: `useStore((state) => state.someValue)`.",
    detailedAnswer: "By passing a selector function to the store hook, you subscribe only to that specific slice. The component will only re-render when the selected value changes. If other values in the store change, this component will remain untouched.",
    codeExample: `// Component subscribes ONLY to 'user' changes
const user = useStore((state) => state.user);

// Component will NOT re-render if 'cart' or 'count' changes`,
    diagramId: 're-render'
  },
  {
    id: 8,
    category: 'Selectors & Performance',
    question: "Why select specific slices instead of the whole state?",
    shortAnswer: "Selecting the whole state triggers a re-render on *any* update; selecting a slice limits re-renders.",
    detailedAnswer: "If you call the store hook without a selector, e.g., `const state = useStore()`, your component subscribes to the *entire* state object. Any change to *any* property inside the store will trigger a re-render. Selecting specific fields narrow down the subscriptions so React can optimize updates.",
    codeExample: `// ❌ BAD: Re-renders on count change, user change, or theme change
const state = useStore();

// ✅ GOOD: Only re-renders when count changes
const count = useStore((s) => s.count);`,
    diagramId: 're-render'
  },
  {
    id: 9,
    category: 'Advanced & Immutability',
    question: "How do you update nested state immutably in Zustand?",
    shortAnswer: "Spread nested levels manually, or use a utility like Immer.",
    detailedAnswer: "State updates in Zustand must be immutable. If you have nested objects, you must manually spread every level to avoid mutating original state references. Alternatively, you can use the `immer` middleware or libraries like `immer` to write direct mutations safely.",
    codeExample: `// Manual spread:
set((state) => ({
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      age: state.user.profile.age + 1
    }
  }
}));`,
    diagramId: 'immer-nested'
  },
  {
    id: 10,
    category: 'Advanced & Immutability',
    question: "What is the `immer` middleware for Zustand?",
    shortAnswer: "Allows you to write direct 'mutating' code which is safely turned into immutable updates under the hood.",
    detailedAnswer: "The `immer` middleware integrates Immer directly into the store's `set` function. This lets you write code that looks like direct state mutation (e.g., modifying arrays, assigning keys), while Immer generates the corresponding immutable state changes automatically, making complex updates clean and legible.",
    codeExample: `import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useStore = create()(immer((set) => ({
  todos: [{ text: 'Learn Zustand', done: false }],
  toggleTodo: (index) => set((state) => {
    state.todos[index].done = !state.todos[index].done; // Mutate directly!
  }),
})));`,
    diagramId: 'immer-nested'
  },
  {
    id: 11,
    category: 'Advanced & Immutability',
    question: "How do you persist Zustand state (e.g. to localStorage)?",
    shortAnswer: "Wrap the store creator with the `persist` middleware from `zustand/middleware`.",
    detailedAnswer: "The `persist` middleware automatically saves store data to storage (defaults to localStorage) on every update and hydrates it back into the store when the app loads. You can customize the storage engine, serialize/deserialize functions, and filter which keys to persist.",
    codeExample: `import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'app-theme-storage' } // unique key
  )
);`,
    diagramId: 'tab-persist'
  },
  {
    id: 12,
    category: 'Core Concepts',
    question: "How do you use Zustand outside of React components?",
    shortAnswer: "Use `useStore.getState()` to read state, and `useStore.setState()` to update it anywhere.",
    detailedAnswer: "Because Zustand's core is just a standard JavaScript object store with subscriptions, it exists independently of React. The custom hook returned by `create()` has direct utility methods attached: `.getState()` for immediate reads, and `.setState()` for updates from anywhere—such as utility functions, event listeners, or routers.",
    codeExample: `// Outside React
import { useStore } from './store';

// Read state
const { token } = useStore.getState();

// Update state
useStore.setState({ token: 'new-token' });`,
    diagramId: 'outside-react'
  },
  {
    id: 13,
    category: 'Core Concepts',
    question: "How do you subscribe to store changes outside React?",
    shortAnswer: "Call `useStore.subscribe((state) => { ... })` to listen to updates globally.",
    detailedAnswer: "You can register non-React listeners to the store using `.subscribe()`. This is incredibly useful for syncing state to non-React animations, WebSockets, standard logging systems, or synchronizing with browser storage without the cost of React render lifecycles.",
    codeExample: `import { useStore } from './store';

const unsubscribe = useStore.subscribe((state) => {
  console.log('State updated to:', state.theme);
});

// Clean up listener later
unsubscribe();`,
    diagramId: 'outside-react'
  },
  {
    id: 14,
    category: 'Core Concepts',
    question: "How do you reset a Zustand store to its initial state?",
    shortAnswer: "Store the initial state separately and overwrite current state with it using `set`.",
    detailedAnswer: "A common pattern to clear or reset a store is to define a separate `initialState` object, then expose a `reset` action that sets all properties back to that initial reference. To fully clean everything (and wipe any added properties), pass `true` as the second argument to `set` to bypass the default merge behavior.",
    codeExample: `const initialState = { count: 0, items: [] };

const useStore = create((set) => ({
  ...initialState,
  increment: () => set((s) => ({ count: s.count + 1 })),
  reset: () => set(initialState, true), // true replaces state completely
}));`,
    diagramId: 'set-merger'
  },
  {
    id: 15,
    category: 'Core Concepts',
    question: "What does the boolean second argument to `set` do?",
    shortAnswer: "If `true`, replaces the entire state object instead of merging with it.",
    detailedAnswer: "By default, Zustand's `set` performs a shallow merge of properties (`set({ value: 1 })` only overwrites `value`). If you pass `true` as the second argument, e.g., `set(newState, true)`, it completely deletes the existing state object and replaces it with the new object. This is essential for clean store resets.",
    codeExample: `// Default: Shallow merge
set({ count: 5 }); // Keep other fields

// Replace: Deletes all other fields
set({ count: 5 }, true); // Only count will exist!`,
    diagramId: 'set-merger'
  },
  {
    id: 16,
    category: 'Testing, SSR & Tabs',
    question: "How do you type a Zustand store with TypeScript?",
    shortAnswer: "Use `create<StoreType>()((set, get) => ({ ... }))` double-parentheses pattern.",
    detailedAnswer: "To ensure correct TypeScript type inference for `set` and `get` (especially when middleware is used), Zustand recommends defining an interface containing your state and action types, then using the curried generic signature `create<T>()(...)`.",
    codeExample: `interface BearState {
  bears: number;
  increase: () => void;
}

export const useStore = create<BearState>()((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));`,
    diagramId: 'store-slices'
  },
  {
    id: 17,
    category: 'Testing, SSR & Tabs',
    question: "Why does Zustand's TypeScript setup need `create<T>()(...)` instead of `create<T>(...)`?",
    shortAnswer: "It's a currying pattern that allows TS to infer types correctly when middlewares are present.",
    detailedAnswer: "TypeScript cannot do partial type argument inference—if you supply one generic type parameter, you must supply all of them. The `create<T>()` curry returns a function, allowing you to pass middlewares without losing the inner types of `set` or `get` or manually annotating them.",
    codeExample: `// Double-call prevents TS from losing middleware type parameters
const useStore = create<MyStore>()(persist((set) => ({ ... }), { name: 'key' }));`,
    diagramId: 'store-slices'
  },
  {
    id: 18,
    category: 'Advanced & Immutability',
    question: "How do you combine multiple slices into one store?",
    shortAnswer: "Define individual slice creators as functions taking `(set, get, ...)` and merge them in a main `create` function.",
    detailedAnswer: "For complex stores, you can build modular slices by defining separate slice-creator functions that take the standard `(set, get, store)` parameters and return a partial state. You then compose these slice creators together in your main `create` function.",
    codeExample: `const createBearSlice = (set, get) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
});

const createFishSlice = (set, get) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
});

const useBoundStore = create((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}));`,
    diagramId: 'store-slices'
  },
  {
    id: 19,
    category: 'Integrations & Ecosystem',
    question: "How do you use Zustand with middleware like devtools?",
    shortAnswer: "Wrap the creator function inside `devtools(...)` from `zustand/middleware`.",
    detailedAnswer: "Zustand provides a DevTools middleware that registers state changes with the Redux DevTools Extension. This lets you inspect actions, inspect diffs, and perform state tracking in your browser DevTools exactly like Redux.",
    codeExample: `import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create()(
  devtools((set) => ({
    count: 0,
    inc: () => set((state) => ({ count: state.count + 1 })),
  }))
);`,
    diagramId: 'store-slices'
  },
  {
    id: 20,
    category: 'Integrations & Ecosystem',
    question: "How do you debug Zustand state changes?",
    shortAnswer: "Use Redux DevTools with `devtools` middleware, add custom logging middleware, or use `.subscribe`.",
    detailedAnswer: "Debugging can be done via Redux DevTools for visual time-travel, writing a basic wrapper middleware to automatically intercept and print state updates via `console.log`, or by creating a global listener with `useStore.subscribe`.",
    codeExample: `const logger = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('  applying', args);
      set(...args);
      console.log('  new state', get());
    },
    get,
    api
  );`,
    diagramId: 'outside-react'
  },
  {
    id: 21,
    category: 'Advanced & Immutability',
    question: "Can you have derived/computed values in Zustand?",
    shortAnswer: "Yes—compute them inside a selector during component read, or use a getter.",
    detailedAnswer: "Derived/computed values can be calculated on-the-fly inside your selector function (e.g. `const total = useStore(state => state.items.length)`), or by defining a function in the store that calls `get().property` to return a value dynamically.",
    codeExample: `// 1. Selector-based (runs on render)
const count = useStore(state => state.items.length);

// 2. Getter-based (runs on call)
const useStore = create((set, get) => ({
  items: [],
  getTotal: () => get().items.length
}));`,
    diagramId: 'computed-values'
  },
  {
    id: 22,
    category: 'Selectors & Performance',
    question: "How do you avoid unnecessary re-renders with object selectors?",
    shortAnswer: "Use `useShallow` (or standard `shallow` equality comparator) to check object contents.",
    detailedAnswer: "When selecting an object of multiple properties from your store, a new object reference is created on every render. To prevent React from thinking the value changed, wrap the selector in `useShallow` from `zustand/react/shallow`. This performs a shallow equality comparison rather than a strict reference check.",
    codeExample: `import { useShallow } from 'zustand/react/shallow';

const { name, age } = useStore(
  useShallow((state) => ({ name: state.name, age: state.age }))
);`,
    diagramId: 're-render'
  },
  {
    id: 23,
    category: 'Selectors & Performance',
    question: "What is the purpose of `useShallow`?",
    shortAnswer: "Provides a shallow-equality check so components don't re-render if properties inside selected objects remain identical.",
    detailedAnswer: "By default, React hooks determine changes via strict reference equality (`===`). If a selector function returns a new array or object (e.g., `s => [s.foo, s.bar]`), reference equality fails on every update. `useShallow` compares values inside the structure, skipping re-renders if the array elements are shallowly identical.",
    codeExample: `// Without useShallow: re-renders on ANY update because [foo, bar] is a new array instance.
// With useShallow: checks if foo and bar changed individually first!
const [foo, bar] = useStore(useShallow((s) => [s.foo, s.bar]));`,
    diagramId: 're-render'
  },
  {
    id: 24,
    category: 'Comparison with Redux/Context',
    question: "How does Zustand compare to Context API for global state?",
    shortAnswer: "Zustand avoids Context's 're-render everything' flaw using fine-grained subscriptions.",
    detailedAnswer: "Context API has a built-in bottleneck: when a Context value changes, all components consuming that context must re-render, even if they only read an unchanged property. Zustand uses an external store observer. Components subscribe selectively, meaning only components reading changed properties re-render, optimizing performance out-of-the-box.",
    codeExample: `// Context:
// Component reads 'user' but re-renders when 'theme' changes.
// Zustand:
// Component reads 'user' and ignores 'theme' updates completely.`,
    diagramId: 'redux-vs-zustand'
  },
  {
    id: 25,
    category: 'Comparison with Redux/Context',
    question: "Is Zustand suitable for large enterprise apps?",
    shortAnswer: "Yes, because it is extremely performant and can be cleanly modularized into slices.",
    detailedAnswer: "Yes. Zustand scales beautifully. Slices can be divided into separate files for clean code organization. It is frequently preferred in large projects for its light footprint, high performance with intensive rendering, and lack of boilerplate. However, Redux Toolkit might still be preferred in large teams where structural consistency needs to be enforced via rigid rules.",
    codeExample: `// Scalable: Compose separate slices, use middleware, keep types neat.
const useAppStore = create()(
  devtools(
    persist(
      (...a) => ({ ...createUserSlice(...a), ...createCartSlice(...a) }),
      { name: 'app-state' }
    )
  )
);`,
    diagramId: 'store-slices'
  },
  {
    id: 26,
    category: 'Integrations & Ecosystem',
    question: "How do async actions work in Zustand?",
    shortAnswer: "Write standard async/await functions in the store and call `set` when done.",
    detailedAnswer: "Because Zustand actions are plain JavaScript functions, they natively support asynchronous code. There's no need for middleware like redux-thunk or redux-saga. You can execute fetch requests, await them, and then invoke `set` to apply the results.",
    codeExample: `const useStore = create((set) => ({
  items: [],
  isLoading: false,
  fetchItems: async () => {
    set({ isLoading: true });
    const res = await fetch('/api/items');
    set({ items: await res.json(), isLoading: false });
  },
}));`,
    diagramId: 'async-loader'
  },
  {
    id: 27,
    category: 'Integrations & Ecosystem',
    question: "Example: async fetch action in Zustand?",
    shortAnswer: "See clean async API call with error handling.",
    detailedAnswer: "A full async fetch example showing state updates for loading, success, and error pipelines. All updates are handled via standard `set` calls within the same async block.",
    codeExample: `const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  fetchUser: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(\`/api/user/\${id}\`);
      if (!res.ok) throw new Error('Failed to fetch');
      set({ user: await res.json(), loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  }
}));`,
    diagramId: 'async-loader'
  },
  {
    id: 28,
    category: 'Testing, SSR & Tabs',
    question: "How do you test a Zustand store?",
    shortAnswer: "Import and test the store directly as a JS module, or mock/reset it between tests.",
    detailedAnswer: "Testing is straightforward because Zustand stores are plain JavaScript. You do not need to wrap your tests in Providers or testing harnesses. Just import the store, invoke action functions directly, and assert on the outputs of `useStore.getState()`.",
    codeExample: `import { useStore } from './store';

test('increments counter', () => {
  const { increment } = useStore.getState();
  increment();
  expect(useStore.getState().count).toBe(1);
});`,
    diagramId: 'outside-react'
  },
  {
    id: 29,
    category: 'Testing, SSR & Tabs',
    question: "How do you reset Zustand state between tests?",
    shortAnswer: "Call `useStore.setState(initialState, true)` in a `beforeEach` hook.",
    detailedAnswer: "To avoid test pollution (state carrying over from one test to another), define your initial store values in an object and execute `setState(initialState, true)` before each test to clear modifications entirely.",
    codeExample: `const initial = { count: 0, user: null };

beforeEach(() => {
  useStore.setState(initial, true); // true completely clears added properties
});`,
    diagramId: 'set-merger'
  },
  {
    id: 30,
    category: 'Selectors & Performance',
    question: "Common pitfall when destructuring multiple values from a selector?",
    shortAnswer: "Destructuring like `const { a, b } = useStore()` subscribes to the whole store and triggers re-renders on all changes.",
    detailedAnswer: "A very common mistake is typing `const { foo, bar } = useStore()`. This tells the component to subscribe to the entire store, causing re-renders when completely unrelated properties (like `baz`) change. To avoid this, select properties individually or use the `useShallow` wrapper.",
    codeExample: `// ❌ PITFALL (renders on anything):
const { user, cart } = useStore();

// ✅ CORRECT (only renders on user/cart change):
const { user, cart } = useStore(useShallow((s) => ({ user: s.user, cart: s.cart })));

// ✅ CORRECT (alternative, select individually):
const user = useStore(s => s.user);
const cart = useStore(s => s.cart);`,
    diagramId: 're-render'
  },
  {
    id: 31,
    category: 'Integrations & Ecosystem',
    question: "How do you combine Zustand with React Query / TanStack Query?",
    shortAnswer: "Use React Query for server state (caching/fetching) and Zustand for client state (UI, modals, filters).",
    detailedAnswer: "A recommended separation of concerns: let TanStack Query manage cache synchronization, refetching, and backend status, while Zustand controls local-only variables like slide-outs, client filters, user themes, and session configurations. Avoid syncing React Query data into Zustand manually.",
    codeExample: `// React Query for server data
const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: fetchProfile });

// Zustand for UI actions
const isOpen = useUIStore(s => s.isSidebarOpen);
const toggle = useUIStore(s => s.toggleSidebar);`,
    diagramId: 'outside-react'
  },
  {
    id: 32,
    category: 'Advanced & Immutability',
    question: "How do you slice a large Zustand store into multiple files?",
    shortAnswer: "Create separate files for each slice's creator function, then merge them in a central index file.",
    detailedAnswer: "To keep files readable, place BearSlice, CartSlice, etc. in their own modules. Each file exports a slice creator function. The central store file imports them and passes them to `create` by spreading their outputs, ensuring clean, modular organization.",
    codeExample: `// cartSlice.ts
export const createCartSlice = (set, get) => ({
  cartItems: [],
  addToCart: (item) => set((s) => ({ cartItems: [...s.cartItems, item] })),
});

// store.ts
import { createCartSlice } from './cartSlice';
export const useAppStore = create((...a) => ({
  ...createCartSlice(...a),
  // spread other slices
}));`,
    diagramId: 'store-slices'
  },
  {
    id: 33,
    category: 'Integrations & Ecosystem',
    question: "Can Zustand stores reference each other?",
    shortAnswer: "Yes, by calling `useOtherStore.getState()` inside actions, or subscribing to each other.",
    detailedAnswer: "Because stores are standalone JavaScript modules, they can interact without React boundaries. An action inside Store A can read or write to Store B directly using `useStoreB.getState()` or `useStoreB.setState()`. You can also subscribe to Store B's updates inside Store A's setup.",
    codeExample: `const useAuthStore = create((set) => ({ token: 'abc' }));

const useCartStore = create((set) => ({
  checkout: () => {
    const token = useAuthStore.getState().token; // Get token from auth store directly!
    // execute checkout
  }
}));`,
    diagramId: 'outside-react'
  },
  {
    id: 34,
    category: 'Advanced & Immutability',
    question: "How do you implement undo/redo with Zustand?",
    shortAnswer: "Maintain history stacks manually in actions, or use middleware like `zundo`.",
    detailedAnswer: "You can implement history-tracking by maintaining arrays of previous states (a past stack and a future stack) inside the store, and pushing/popping states on updates. For production, the community middleware `zundo` handles tracking, undo, redo, and state grouping automatically with zero-config setup.",
    codeExample: `// Handcrafted Undo/Redo stack:
const useStore = create((set, get) => ({
  past: [],
  present: 0,
  increment: () => set((s) => ({
    past: [...s.past, s.present],
    present: s.present + 1
  })),
  undo: () => set((s) => {
    if (s.past.length === 0) return {};
    const newPast = [...s.past];
    const prev = newPast.pop();
    return { past: newPast, present: prev };
  })
}));`,
    diagramId: 'history-undo'
  },
  {
    id: 35,
    category: 'Comparison with Redux/Context',
    question: "Bundle size advantage of Zustand over Redux Toolkit?",
    shortAnswer: "Zustand is ~1.5KB gzipped, compared to RTK + React-Redux which is ~30KB+.",
    detailedAnswer: "Zustand is incredibly lightweight. The core library is less than 2KB when minified and gzipped, and has zero external dependencies. In contrast, using Redux Toolkit requires installing `@reduxjs/toolkit` and `react-redux`, which adds significant weight to your bundle size.",
    codeExample: `// Zustand: ~1.5KB. Zero boilerplate. Ideal for performance-critical sites.`,
    diagramId: 'redux-vs-zustand'
  },
  {
    id: 36,
    category: 'Advanced & Immutability',
    question: "How to type actions with parameters in a Zustand store interface?",
    shortAnswer: "Define actions as standard typed functions inside the interface.",
    detailedAnswer: "Type your state interface fully with both parameters and actions, mapping parameter types (such as primitive values or user-defined objects) directly on the actions' function keys.",
    codeExample: `interface User { name: string; id: string; }

interface UserStore {
  user: User | null;
  updateUser: (fields: Partial<User>) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>()((set) => ({
  user: null,
  updateUser: (fields) => set((s) => ({ user: s.user ? { ...s.user, ...fields } : null })),
  clearUser: () => set({ user: null }),
}));`,
    diagramId: 'store-slices'
  },
  {
    id: 37,
    category: 'Integrations & Ecosystem',
    question: "Does Zustand support time-travel debugging?",
    shortAnswer: "Yes, but only via the `devtools` middleware connecting to Redux DevTools.",
    detailedAnswer: "Time-travel debugging (scrubbing back and forth through previous states) is not built directly into Zustand's core. However, by wrapping your store creator in the `devtools` middleware, you can connect the store to the Redux DevTools browser extension, which supports full action tracking, diffing, and time-travel replay out-of-the-box.",
    codeExample: `import { devtools } from 'zustand/middleware';
const useStore = create()(devtools((set) => ({ ... })));`,
    diagramId: 'store-slices'
  },
  {
    id: 38,
    category: 'Integrations & Ecosystem',
    question: "How do you avoid prop-drilling actions with Zustand?",
    shortAnswer: "Since the store is globally importable, any child component can import and read actions directly.",
    detailedAnswer: "One of the major benefits of global hooks is eliminating prop-drilling. If a deep child component needs to execute an action (e.g. `addToCart`), it does not need the action passed down from parent to child. It simply imports the store hook and grabs the action function directly.",
    codeExample: `// DeepChild.tsx
import { useCartStore } from './cartStore';

export const DeepChild = () => {
  const addItem = useCartStore((s) => s.addItem); // Read directly!
  return <button onClick={() => addItem('Item A')}>Add</button>;
};`,
    diagramId: 'outside-react'
  },
  {
    id: 39,
    category: 'Comparison with Redux/Context',
    question: "Difference between Zustand's `set` merge and Redux's reducers?",
    shortAnswer: "Zustand's `set` shallow-merges state properties; Redux reducers require returning a complete next state object.",
    detailedAnswer: "In Redux, your reducer must return the *entire* next state object, meaning you must manually spread existing state keys on every action. Zustand's `set` automatically merges keys at the first level, saving code. However, for deeper properties, both require spreading or helper libraries.",
    codeExample: `// Redux Reducer:
// return { ...state, count: state.count + 1 };

// Zustand Action:
// set(state => ({ count: state.count + 1 })); // 'user' and 'theme' are merged automatically!`,
    diagramId: 'redux-vs-zustand'
  },
  {
    id: 40,
    category: 'Advanced & Immutability',
    question: "How would you structure a cart store with add/remove/update actions?",
    shortAnswer: "Store a `cart: CartItem[]` array, and perform immutable map/filter updates inside actions.",
    detailedAnswer: "A classic interview task: build an efficient cart store. Items are represented in an array. To add items, check if they exist, increment quantity, or concatenate. To remove, use `filter`. To update quantity, use `map` to preserve immutability.",
    codeExample: `interface CartItem { id: string; name: string; qty: number; }
interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: string) => void;
}
const useCart = create<CartStore>((set) => ({
  items: [],
  addItem: (item) => set((s) => {
    const existing = s.items.find(i => i.id === item.id);
    if (existing) {
      return { items: s.items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) };
    }
    return { items: [...s.items, { ...item, qty: 1 }] };
  }),
  removeItem: (id) => set((s) => ({ items: s.items.filter(i => i.id !== id) })),
}));`,
    diagramId: 'history-undo'
  },
  {
    id: 41,
    category: 'Core Concepts',
    question: "What happens if you call `set` with a function instead of an object?",
    shortAnswer: "The function receives the current state and returns the partial update object.",
    detailedAnswer: "When you pass a function to `set`, e.g., `set((state) => ({ count: state.count + 1 }))`, Zustand passes the current state object as an argument. This ensures that you are calculating the new state based on a fresh, accurate snapshot of previous state values, which prevents state sync bugs inside asynchronous calls or rapid operations.",
    codeExample: `// Receives fresh state snapshot to calculate next value
set((state) => ({ count: state.count + 1 }));`,
    diagramId: 'set-merger'
  },
  {
    id: 42,
    category: 'Comparison with Redux/Context',
    question: "How do selectors improve performance vs plain Context consumption?",
    shortAnswer: "Each component subscribes *only* to selected fields. Unrelated updates bypass the component entirely.",
    detailedAnswer: "Under Context API, there is no subscription filter; any update to any field inside the Context re-evaluates and re-renders all children. Zustand acts as an event emitter—it compares the return value of your selector with the previous selector output. If they are equal, the hook prevents a component re-render entirely.",
    codeExample: `// Component only re-renders when useStore(s => s.count) changes.
// Ignore updates to useStore(s => s.userProfile).`,
    diagramId: 'redux-vs-zustand'
  },
  {
    id: 43,
    category: 'Comparison with Redux/Context',
    question: "Good use case favoring Zustand over Redux Toolkit?",
    shortAnswer: "Small to medium apps, prototypes, high-performance visual states, or teams wanting simple setups.",
    detailedAnswer: "Zustand shines when you want to avoid setup complexity and start coding immediately, when bundle size is critical, or when you are building interactive animations/UIs that require real-time outside-React mutations.",
    codeExample: `// Setup is instant, zero config. Best for fast execution and high performance.`,
    diagramId: 'redux-vs-zustand'
  },
  {
    id: 44,
    category: 'Comparison with Redux/Context',
    question: "Good use case favoring Redux Toolkit over Zustand?",
    shortAnswer: "Very large enterprises, massive distributed teams, or apps requiring strict structural compliance.",
    detailedAnswer: "Redux Toolkit's rigid separation of Slices, Actions, Reducers, Middleware, and its strict folder recommendations can be advantageous in massive team settings because it forces all developers to write code in the exact same format, improving long-term predictability and compliance.",
    codeExample: `// Strict structures can keep massive codebases predictable across multiple squads.`,
    diagramId: 'redux-vs-zustand'
  },
  {
    id: 45,
    category: 'Advanced & Immutability',
    question: "How do you handle loading/error states for async actions?",
    shortAnswer: "Keep loading/error flags directly in the store, and update them at each phase of the action.",
    detailedAnswer: "A standard pattern: define `status: 'idle' | 'loading' | 'success' | 'error'` alongside a `data` and `error` field. When starting an action, set `status: 'loading'`. When finished, set `status: 'success'` and data. In case of failure, set `status: 'error'` and save the message.",
    codeExample: `const useStore = create((set) => ({
  data: null,
  status: 'idle',
  error: null,
  execute: async () => {
    set({ status: 'loading', error: null });
    try {
      const res = await apiCall();
      set({ data: res, status: 'success' });
    } catch (e: any) {
      set({ error: e.message, status: 'error' });
    }
  }
}));`,
    diagramId: 'async-loader'
  },
  {
    id: 46,
    category: 'Testing, SSR & Tabs',
    question: "Can Zustand be used with Next.js SSR?",
    shortAnswer: "Yes, but avoid module-level singletons; create a unique store instance per request/session.",
    detailedAnswer: "In Next.js SSR, a module-level singleton store would be shared across all users accessing the server, leading to severe data leaks. In SSR contexts, you should instantiate your store inside a React Context or a reference hook, ensuring each request/user session gets a isolated instance.",
    codeExample: `// Safe SSR Store Creation:
const StoreContext = createContext<StoreType | null>(null);

export const StoreProvider = ({ children }) => {
  const storeRef = useRef<StoreType>(null);
  if (!storeRef.current) {
    storeRef.current = createStore(); // Create once per session
  }
  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};`,
    diagramId: 'tab-persist'
  },
  {
    id: 47,
    category: 'Core Concepts',
    question: "How do you avoid stale closures when reading state inside an action?",
    shortAnswer: "Always use `get()` to read the most up-to-date values inside actions, or use function parameters in `set`.",
    detailedAnswer: "If you read state variables directly from the store creator block (or close over variables during async intervals), you may get stale data. Calling `get()` or using `set((state) => ...)` ensures you are accessing the true, immediate state reference at the exact millisecond of execution.",
    codeExample: `// ❌ STALE: count might have changed during the timeout
const useStore = create((set, get) => ({
  count: 0,
  delayedLog: () => {
    const current = get().count; // Always gets latest, even inside async!
    setTimeout(() => console.log(get().count), 1000);
  }
}));`,
    diagramId: 'outside-react'
  },
  {
    id: 48,
    category: 'Core Concepts',
    question: "What does 'flux-like' mean for Zustand?",
    shortAnswer: "Unidirectional data flow (Store -> View -> Action -> Store) but without dispatcher and verbose types.",
    detailedAnswer: "Zustand follows Flux principles: a single source of truth (the store), unidirectional flow (components render state, user clicks, actions run, state updates). However, it removes the dispatcher and reducer steps, allowing actions to write directly to state via `set` for a streamlined coding workflow.",
    codeExample: `// State -> View (React renders) -> User Click -> Action (set()) -> State updates`,
    diagramId: 'redux-vs-zustand'
  },
  {
    id: 49,
    category: 'Advanced & Immutability',
    question: "How would you implement optimistic updates in Zustand?",
    shortAnswer: "Apply the update immediately, then revert it in a `.catch` block if the API call fails.",
    detailedAnswer: "Optimistic updates assume success to provide a lag-free UI experience. Inside your action, call `set()` to update values locally, make your async API call, and if the API throws an error, restore the previous value (which you read beforehand using `get()`).",
    codeExample: `const useStore = create((set, get) => ({
  score: 100,
  likePost: async () => {
    const previousScore = get().score;
    set({ score: previousScore + 1 }); // Update optimistically!
    try {
      await saveScoreToDb();
    } catch (e) {
      set({ score: previousScore }); // Revert on failure!
    }
  }
}));`,
    diagramId: 'async-loader'
  },
  {
    id: 50,
    category: 'Selectors & Performance',
    question: "How do you detect if selecting the whole store is hurting performance?",
    shortAnswer: "Check if components re-render when unrelated fields update; profile with React DevTools.",
    detailedAnswer: "If your component flashes/re-renders when unrelated properties are modified (e.g. typing in a search input triggers list-item cards to re-render), you have a subscription leak. Narrow down selectors to only the fields rendered by that component.",
    codeExample: `// Profiling: Component re-renders when 'theme' changes, but component only renders 'user.name'.
// Fix: change useStore() to useStore(s => s.user.name).`,
    diagramId: 're-render'
  },
  {
    id: 51,
    category: 'Core Concepts',
    question: "Zustand's approach to middleware composition?",
    shortAnswer: "Middlewares wrap the store creator function inside each other: `persist(devtools(immer(config)))`.",
    detailedAnswer: "Middleware in Zustand is composed functionally. Each middleware wraps the creator function, extending its behavior (such as saving state, mutating, or printing logs) before delegating to the next layer, resulting in highly customizable stores.",
    codeExample: `const useStore = create()(
  persist(
    devtools(
      immer((set) => ({ ... }))
    ),
    { name: 'app-storage' }
  )
);`,
    diagramId: 'store-slices'
  },
  {
    id: 52,
    category: 'Core Concepts',
    question: "How do you type the return value of `get()`?",
    shortAnswer: "It is automatically typed as the full Store interface `T` you provided to `create`.",
    detailedAnswer: "When you use the curried generic pattern `create<StoreType>()((set, get) => ({ ... }))`, TypeScript knows that `get()` returns an object strictly matching `StoreType`, ensuring complete type-safety without manual castings.",
    codeExample: `const useStore = create<MyStore>()((set, get) => ({
  items: [],
  checkItems: () => {
    const items = get().items; // TypeScript correctly infers MyStore['items']!
  }
}));`,
    diagramId: 'store-slices'
  },
  {
    id: 53,
    category: 'Core Concepts',
    question: "What happens to Zustand state on a full page reload without persist?",
    shortAnswer: "It resets entirely to its initial defined state, as it lives in temporary JS memory.",
    detailedAnswer: "Without the `persist` middleware, Zustand state is stored as a standard in-memory JavaScript closure. When a user refreshes or leaves the page, the JavaScript environment is destroyed, resetting the store back to the defaults specified in the `create` call.",
    codeExample: `// Lives in memory: resets on reload unless wrapped in persist()`,
    diagramId: 'tab-persist'
  },
  {
    id: 54,
    category: 'Testing, SSR & Tabs',
    question: "How would you sync Zustand state across browser tabs?",
    shortAnswer: "Use `persist` middleware (localStorage) and listen to window `storage` events to synchronize state.",
    detailedAnswer: "To keep multiple browser tabs in sync: 1. Persist the store to `localStorage`. 2. Listen to the window `storage` event. When a change is detected from another tab, rehydrate the store using `useStore.persist.rehydrate()` to instantly sync states.",
    codeExample: `// Listen to cross-tab updates and sync
window.addEventListener('storage', (event) => {
  if (event.key === 'app-storage') {
    useStore.persist.rehydrate();
  }
});`,
    diagramId: 'tab-persist'
  },
  {
    id: 55,
    category: 'Selectors & Performance',
    question: "Difference between `useStore()` (no selector) and `useStore(selector)`?",
    shortAnswer: "No selector subscribes to the whole state (re-renders on any change); selector subscribes only to the derived value.",
    detailedAnswer: "Calling `useStore()` is equivalent to subscribing to the entire state object. When any key changes, the hook fires a re-render. Providing a selector function (e.g. `useStore(s => s.count)`) sets up a specific listener that checks if the selected value changed before deciding to trigger React's rendering.",
    codeExample: `const wholeStore = useStore(); // Subscribes to EVERYTHING
const countOnly = useStore(s => s.count); // Subscribes ONLY to 'count'`,
    diagramId: 're-render'
  },
  {
    id: 56,
    category: 'Selectors & Performance',
    question: "How do you avoid creating a new selector function every render?",
    shortAnswer: "Define selector functions outside the component (in module scope).",
    detailedAnswer: "If you define selector functions inside components, a new function instance is created on every render. While this is rarely a performance issue, defining them outside components (e.g. `const countSelector = state => state.count`) provides absolute optimization, preventing selector references from changing.",
    codeExample: `const countSelector = (state: Store) => state.count;

export const Component = () => {
  const count = useStore(countSelector); // Selector never changes reference!
  return <div>{count}</div>;
};`,
    diagramId: 're-render'
  },
  {
    id: 57,
    category: 'Testing, SSR & Tabs',
    question: "Is Zustand compatible with React Server Components?",
    shortAnswer: "It relies on client hooks and subscriptions, so usage must live in Client Components (`'use client'`).",
    detailedAnswer: "React Server Components (RSC) cannot run client hooks, listen to event emitters, or manage interactive state. Since Zustand uses custom React hooks (`useStore`) and standard events, it can only be consumed inside Client Components. You can, however, pass initial server data into a Client Component's Zustand store as props.",
    codeExample: `// 'use client' must be placed at the top of components reading Zustand stores.`,
    diagramId: 'tab-persist'
  },
  {
    id: 58,
    category: 'Advanced & Immutability',
    question: "How would you add custom logging middleware manually?",
    shortAnswer: "Write a high-order function wrapping your store creator, logging state before/after updates.",
    detailedAnswer: "Zustand middleware is just a function wrapping your store initializer. By intercepting `set`, you can print logs to the console whenever an action is triggered, showing previous state, incoming updates, and subsequent state.",
    codeExample: `const log = (config) => (set, get, api) =>
  config(
    (args) => {
      console.log('Action Triggered. Current:', get());
      set(args);
      console.log('Next State:', get());
    },
    get,
    api
  );

const useStore = create(log((set) => ({ count: 0 })));`,
    diagramId: 'outside-react'
  },
  {
    id: 59,
    category: 'Integrations & Ecosystem',
    question: "Common mistake with multiple Zustand stores for different concerns?",
    shortAnswer: "Duplicating source of truth, making stores difficult to sync, or putting cached server state inside Zustand.",
    detailedAnswer: "A frequent error is creating separate stores for related items (e.g., `useCartStore` and `useDiscountStore` which both depend on items). This makes synchronization complex. It is better to use a single bound store composed of slices, or keep server-cached state (like user profiles) in React Query, reserving Zustand for UI state.",
    codeExample: `// ❌ BAD: separate unconnected stores
const useUserStore = create(...);
const useAdminStore = create(...); // hard to sync!

// ✅ GOOD: Single store with structured slices
const useBoundStore = create((...a) => ({
  ...createUserSlice(...a),
  ...createAdminSlice(...a),
}));`,
    diagramId: 'store-slices'
  },
  {
    id: 60,
    category: 'Integrations & Ecosystem',
    question: "How do you handle store initialization with async initial data?",
    shortAnswer: "Provide default synchronous states first, then execute an async action (e.g. inside `useEffect`) to fetch and populate.",
    detailedAnswer: "You cannot construct a store with an asynchronous creator function directly. Instead, create your store with a clean loading/empty state, and call a fetching action when the main application starts (e.g., inside a root-level `useEffect` or React Query query handler) to safely hydrate your store.",
    codeExample: `// Store creation is sync
const useStore = create((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));

// Populate inside app entry point
useEffect(() => {
  fetch('/api/init').then(r => r.json()).then(data => {
    useStore.getState().setData(data);
  });
}, []);`,
    diagramId: 'async-loader'
  }
];
