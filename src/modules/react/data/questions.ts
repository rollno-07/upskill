import { Category, Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    category: Category.CoreConcepts,
    question: "What is React?",
    shortAnswer: "A JavaScript library for building UIs using a component-based, declarative model.",
    detailedAnswer: "React is an open-source front-end JavaScript library developed by Meta. It allows developers to build user interfaces out of individual, self-contained components. React uses a declarative paradigm, meaning you describe what the UI should look like for a given state, and React handles updating the browser's DOM to match that state.",
    visualExplanation: "Think of React as a smart builder. Instead of you manually replacing bricks when a room changes (imperative), you draw a blueprint of how you want the house to look now, and React handles changing only the specific bricks that are different.",
    examples: [
      {
        title: "Basic React Component",
        code: `export default function Welcome() { \n  return <h1 className="text-white text-xl">Hello World!</h1>; \n}`,
        explanation: "A simple functional component returning JSX."
      }
    ],
    visualizerType: "vdom"
  },
  {
    id: 2,
    category: Category.CoreConcepts,
    question: "What is JSX?",
    shortAnswer: "Syntax extension that lets you write HTML-like code in JS; compiles to React.createElement calls.",
    detailedAnswer: "JSX (JavaScript XML) is a syntax extension for JavaScript. It allows you to write HTML-like elements directly within your JavaScript files. Browser engines do not understand JSX, so a build tool (like Babel or SWC) transpiles JSX into standard 'React.createElement' or direct compiler runtime calls.",
    visualExplanation: "JSX is a translation helper. It lets you draw what you want in comfortable HTML tags, which are immediately translated into JavaScript object representations that React can manipulate.",
    examples: [
      {
        title: "JSX Transpilation Example",
        code: `// JSX: \nconst element = <h1 id="title">Hello</h1>; \n\n// Compiled JavaScript (Legacy): \nconst element = React.createElement('h1', { id: 'title' }, 'Hello');`,
        explanation: "How JSX is translated by compilers under the hood."
      }
    ],
    visualizerType: "vdom"
  },
  {
    id: 3,
    category: Category.CoreConcepts,
    question: "What is the Virtual DOM?",
    shortAnswer: "An in-memory tree representation of the UI that React diffs against the previous version to compute minimal real DOM updates.",
    detailedAnswer: "The Virtual DOM (VDOM) is a programming concept where an idealized, lightweight representation of a UI is kept in memory and synced with the 'real' DOM by a library such as ReactDOM. This syncing process is called reconciliation.",
    visualExplanation: "Think of the Virtual DOM as a high-fidelity digital draft. Making changes on this digital draft is lightning fast. Once all draft changes are finalized, we compare it with the old draft to figure out the exact physical changes needed on the actual wall.",
    examples: [
      {
        title: "Virtual DOM Node Structure",
        code: `const virtualNode = { \n  type: 'div', \n  props: { \n    className: 'container', \n    children: [{ type: 'h1', props: { children: 'Hello' } }] \n  } \n};`,
        explanation: "A simplified look at how React represents DOM nodes in memory."
      }
    ],
    visualizerType: "vdom"
  },
  {
    id: 4,
    category: Category.CoreConcepts,
    question: "What is reconciliation?",
    shortAnswer: "The algorithm React uses to diff the new virtual tree against the old one and decide what DOM mutations are needed.",
    detailedAnswer: "Reconciliation is the algorithm React uses to compare two Virtual DOM trees. When a component's state or props change, React generates a new Virtual DOM tree. It then diffs this tree against the previous one using an O(n) heuristic algorithm to determine the minimum number of DOM updates needed.",
    visualExplanation: "Think of reconciliation as Spot-the-Difference. It takes two photos, places them side-by-side, quickly circles only the actual changes, and instructs the real DOM to apply those specific corrections.",
    examples: [
      {
        title: "Reconciliation Process",
        code: `// Old State: <div className="text-cyan-500">Welcome</div> \n// New State: <div className="text-red-500">Welcome</div> \n// Reconciliation detects only the class changed, updating 'className' on the DOM node instead of replacing the entire div.`,
        explanation: "React minimizes layout thrashing by updating attributes in place."
      }
    ],
    visualizerType: "vdom"
  },
  {
    id: 5,
    category: Category.CoreConcepts,
    question: "Why do we need 'key' in lists?",
    shortAnswer: "Helps React identify which items changed/added/removed across renders so it can reuse DOM nodes correctly instead of recreating them.",
    detailedAnswer: "Keys help React identify which items have changed, are added, or are removed. They should be given to elements inside an array to give the elements a stable identity. This allows React's diffing algorithm to match children across different renders and avoid fully re-rendering unchanged list items.",
    visualExplanation: "Imagine students in a line. If they don't have name badges, and someone slips into the middle, you have to look at everyone from that point onward to identify them. With name badges (keys), you immediately know who moved, who stayed, and who is new.",
    examples: [
      {
        title: "Correct Key Usage",
        code: `const listItems = items.map((item) => \n  <li key={item.id}>{item.name}</li> \n);`,
        explanation: "Always use stable, unique identifiers (like database IDs) for keys."
      }
    ],
    visualizerType: "keys"
  },
  {
    id: 6,
    category: Category.CoreConcepts,
    question: "Why is using array index as key risky?",
    shortAnswer: "If list order changes, React may misidentify items, causing state to attach to the wrong row and subtle bugs.",
    detailedAnswer: "Using the array index as a key can cause issues when items are reordered, filtered, or prepended. Since indices change when items move, React will map the state of a component based on its index. This can lead to inputs or checkboxes displaying values belonging to completely different items.",
    visualExplanation: "If list items are numbered 0, 1, 2, and you delete index 0, what was index 1 now becomes index 0. If index 1 had state (like a checked checkbox), React thinks index 0 is the one that is checked now, causing visual glitches.",
    examples: [
      {
        title: "The Danger of Indexes",
        code: `// Bad: index as key \n{todos.map((todo, idx) => <TodoItem key={idx} {...todo} />)} \n\n// Good: unique ID as key \n{todos.map(todo => <TodoItem key={todo.id} {...todo} />)}`,
        explanation: "Index keys trigger layout bugs when lists are sorted or filtered."
      }
    ],
    visualizerType: "keys"
  },
  {
    id: 7,
    category: Category.StateAndProps,
    question: "What is a controlled component?",
    shortAnswer: "Form element whose value is driven by React state, updated via onChange.",
    detailedAnswer: "In a controlled component, form data is handled by a React component's state. The alternative is uncontrolled components, where form data is handled by the DOM itself. Because state is the 'single source of truth', any user input is immediately synced to state, which then updates the input value.",
    visualExplanation: "Controlled is like a puppet. The puppet can't move its hands unless the puppeteer pulls the string (state). When a user types, the puppeteer catches the movement, decides what the new value is, and moves the puppet's hand.",
    examples: [
      {
        title: "Controlled Component",
        code: `function ControlledInput() { \n  const [value, setValue] = useState(''); \n  return ( \n    <input \n      value={value} \n      onChange={(e) => setValue(e.target.value)} \n    /> \n  ); \n}`,
        explanation: "React state dictates the absolute value of the input on every keystroke."
      }
    ],
    visualizerType: "forms"
  },
  {
    id: 8,
    category: Category.StateAndProps,
    question: "What is an uncontrolled component?",
    shortAnswer: "Form element whose value is managed by the DOM itself, accessed via ref when needed.",
    detailedAnswer: "Uncontrolled components store their state internally within the DOM elements themselves rather than in React state. Instead of writing an event handler for every state update, you use a 'ref' to pull the value from the DOM directly when you need it (e.g., during form submission).",
    visualExplanation: "Uncontrolled is like a ballot box. Voters drop papers into the box independently. The election officer (React) doesn't monitor each voter's pencil strokes; they just open the box at the very end to read the values.",
    examples: [
      {
        title: "Uncontrolled Component with Ref",
        code: `function UncontrolledInput() { \n  const inputRef = useRef<HTMLInputElement>(null); \n  const handleSubmit = (e) => { \n    e.preventDefault(); \n    alert('A name was submitted: ' + inputRef.current?.value); \n  }; \n  return ( \n    <form onSubmit={handleSubmit}> \n      <input type="text" ref={inputRef} /> \n      <button type="submit">Submit</button> \n    </form> \n  ); \n}`,
        explanation: "The DOM retains the state. React reads it on demand via inputRef."
      }
    ],
    visualizerType: "forms"
  },
  {
    id: 9,
    category: Category.StateAndProps,
    question: "Difference between state and props?",
    shortAnswer: "Props are passed from parent and read-only; state is local, mutable data owned by the component.",
    detailedAnswer: "Props (short for properties) are read-only objects passed from a parent component down to a child. State represents private, mutable, local data that is owned and managed entirely within the component itself. State changes trigger re-renders, while receiving new props triggers updates.",
    visualExplanation: "Think of a smartphone. Props are its physical dimensions and factory colors (assigned externally, unchangeable by the phone). State is the battery level, volume, or open apps (managed locally, changes dynamically based on events).",
    examples: [
      {
        title: "Props vs State",
        code: `// Props passed in: { title } \nfunction Card({ title }) { \n  // State managed internally \n  const [isOpen, setIsOpen] = useState(false); \n  return ( \n    <div> \n      <h2>{title}</h2> \n      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button> \n    </div> \n  ); \n}`,
        explanation: "Props represent configuration; State represents local interactive status."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 10,
    category: Category.StateAndProps,
    question: "What is prop drilling?",
    shortAnswer: "Passing props through multiple intermediate components that don't need them, just to reach a deeply nested child.",
    detailedAnswer: "Prop drilling is the process of passing props through several layers of nested components to deliver data to a deeply nested child component, even though the intermediate components have no direct interest in or use for that data.",
    visualExplanation: "Imagine you want to pass a letter to a friend in the back row. You have to pass it to the person in front of you, who passes it to the next, and so on. The intermediate people are just couriers; they don't read or care about the letter.",
    examples: [
      {
        title: "Prop Drilling Example",
        code: `function App() { \n  const [theme] = useState('dark'); \n  return <Header theme={theme} />; \n} \nfunction Header({ theme }) { \n  return <Nav theme={theme} />; \n} \nfunction Nav({ theme }) { \n  return <ThemeButton theme={theme} />; // theme finally used here \n}`,
        explanation: "Header and Nav have to accept and forward 'theme' prop purely as couriers."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 11,
    category: Category.StateAndProps,
    question: "How does Context help with prop drilling?",
    shortAnswer: "Lets you provide a value at a top level and consume it anywhere below without passing it through every layer.",
    detailedAnswer: "The Context API allows a component to provide values to the entire tree below it. Any nested child can consume the values directly, bypassing intermediate components entirely. This decouples the visual nesting layout from the data access patterns.",
    visualExplanation: "Instead of passing a letter physical hand-to-hand, Context is like broadcasting a radio channel. The parent turns on the transmitter, and only the interested child tunes their receiver to listen directly, skipping the others.",
    examples: [
      {
        title: "Bypassing Drilling with Context",
        code: `const ThemeContext = createContext('light'); \n\nfunction App() { \n  return ( \n    <ThemeContext.Provider value="dark"> \n      <Header /> \n    </ThemeContext.Provider> \n  ); \n} \n// Header and Nav do NOT take or forward props anymore! \nfunction ThemeButton() { \n  const theme = useContext(ThemeContext); \n  return <button className={theme}>Style</button>; \n}`,
        explanation: "useContext fetches 'dark' directly from the nearest Provider upward."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 12,
    category: Category.StateAndProps,
    question: "Downside of Context for frequently changing data?",
    shortAnswer: "Every consumer re-renders on any context value change, which can hurt performance if not split carefully.",
    detailedAnswer: "When a Context Provider's value changes, all components that consume that context are automatically re-rendered. If the context holds a large object and changes frequently, this can trigger massive, unnecessary re-renders of the entire component subtree.",
    visualExplanation: "If a single radio broadcast covers everything (weather, stocks, news), and the stocks change, the listener has to stop, pay attention, and re-evaluate their entire day, even if they only cared about the weather.",
    examples: [
      {
        title: "Mitigating Context Re-renders",
        code: `// Avoid single bulky objects in context: \n// Bad: const [state, setState] = useState({ user, theme, cart }); \n\n// Better: Split into separate contexts! \nreturn ( \n  <UserContext.Provider value={user}> \n    <ThemeContext.Provider value={theme}> \n      <AppContent /> \n    </ThemeContext.Provider> \n  </UserContext.Provider> \n);`,
        explanation: "Splitting contexts isolates updates to only affected consumer components."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 13,
    category: Category.Hooks,
    question: "What are React Hooks?",
    shortAnswer: "Functions that let function components use state, lifecycle, and other React features without classes.",
    detailedAnswer: "Hooks were introduced in React 16.8. They are special JavaScript functions that allow you to 'hook into' React's state and lifecycle features from functional components. They enable logic reuse without the complex hierarchy of higher-order components or render props.",
    visualExplanation: "Hooks are utility plug-ins. Instead of building a massive class vehicle to get a radio, GPS, and AC, you start with a simple functional motorcycle and plug in specific accessories (Hooks) as needed.",
    examples: [
      {
        title: "Composing Basic Hooks",
        code: `import { useState, useEffect } from 'react'; \n\nfunction Tracker() { \n  const [pos, setPos] = useState({ x: 0, y: 0 }); \n  useEffect(() => { \n    const update = (e) => setPos({ x: e.clientX, y: e.clientY }); \n    window.addEventListener('mousemove', update); \n    return () => window.removeEventListener('mousemove', update); \n  }, []); \n  return <div>X: {pos.x}, Y: {pos.y}</div>; \n}`,
        explanation: "A functional component leveraging local state and window events smoothly."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 14,
    category: Category.Hooks,
    question: "Rules of Hooks?",
    shortAnswer: "Only call hooks at the top level (not in loops/conditions), and only call them from React function components or custom hooks.",
    detailedAnswer: "React relies on the order in which Hooks are called to keep track of state across renders. Calling hooks inside conditions, loops, or nested functions breaks this sequence. Additionally, hooks can only be called from functional components or custom hooks, not plain JavaScript helper functions.",
    visualExplanation: "Think of Hooks as boarding passes in a fixed sequence of seats. If some passengers (Hooks) only show up under certain weather conditions, React gets confused about who is sitting where, causing state values to mismatch.",
    examples: [
      {
        title: "Violating and Correcting Rules",
        code: `// ❌ BAD: Conditional Hook \nif (condition) { \n  useEffect(() => {}, []); \n} \n\n// ✅ GOOD: Keep effect top-level, put condition inside \nuseEffect(() => { \n  if (condition) { \n    // do effect logic \n  } \n}, [condition]);`,
        explanation: "Always call Hooks unconditionally at the very top of your React functions."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 15,
    category: Category.Hooks,
    question: "What does useState return?",
    shortAnswer: "A pair: current state value and a setter function to update it and trigger re-render.",
    detailedAnswer: "useState returns an array with exactly two values. The first value is the current state snapshot, and the second value is a function that, when called with a new value, updates the state and schedules a re-render of the component.",
    visualExplanation: "It's like a scoreboard. You get the current score (read-only), and a dedicated button that lets you update the score. Pressing the button automatically triggers the board to flash and redraw the numbers.",
    examples: [
      {
        title: "useState Array Destructuring",
        code: `// Destructuring standard return \nconst [count, setCount] = useState<number>(0); \n\n// Equates to: \nconst stateArray = useState(0); \nconst count = stateArray[0]; \nconst setCount = stateArray[1];`,
        explanation: "Array destructuring is a convenient syntax but it is just unpacking a tuple."
      }
    ],
    visualizerType: "forms"
  },
  {
    id: 16,
    category: Category.Hooks,
    question: "What does useEffect do?",
    shortAnswer: "Runs side effects after render (data fetching, subscriptions, manual DOM changes).",
    detailedAnswer: "useEffect lets you perform side effects in functional components. Side effects are operations that reach outside the local rendering scope, such as fetching data from an API, setting up WebSockets, updating the document title, or manually modifying the DOM.",
    visualExplanation: "Think of useEffect as an 'after-party' coordinator. Once the main event (rendering the UI) is completely done and painted on screen, this coordinator steps in to handle external tasks like setting up audio channels or ordering more refreshments.",
    examples: [
      {
        title: "Basic Data Fetching with useEffect",
        code: `useEffect(() => { \n  let active = true; \n  fetch('/api/user') \n    .then(res => res.json()) \n    .then(data => { if (active) setUser(data); }); \n  return () => { active = false; }; \n}, []);`,
        explanation: "Performs an asynchronous fetch and guards against setting state if unmounted."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 17,
    category: Category.Hooks,
    question: "Dependency array in useEffect — empty array vs no array vs array with values?",
    shortAnswer: "Empty: runs once on mount. No array: runs after every render. With values: runs when any listed value changes.",
    detailedAnswer: "1. No dependency array: React runs the effect after *every single render*. 2. Empty array `[]`: React runs the effect only once, when the component initially mounts. 3. Array with values `[a, b]`: React runs the effect during mount, and thereafter only if the values of 'a' or 'b' change between renders.",
    visualExplanation: "It's a security guard checking IDs. No array = guard checks you every single second. Empty array = guard checks your ID only when you first enter the building. Array with values = guard only checks you when you change your coat or hair color.",
    examples: [
      {
        title: "Dependency Triggers",
        code: `// 1. Every render \nuseEffect(() => { console.log('I run every render'); }); \n\n// 2. Mount only \nuseEffect(() => { console.log('I run on mount'); }, []); \n\n// 3. Conditional \nuseEffect(() => { console.log('I run when ID changes'); }, [id]);`,
        explanation: "Correctly specifying dependencies is critical to avoid infinite render loops."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 18,
    category: Category.Hooks,
    question: "What's a cleanup function in useEffect?",
    shortAnswer: "A function returned from the effect that runs before the next effect execution or on unmount — used to cancel subscriptions/timers.",
    detailedAnswer: "If your effect returns a function, React will execute that function both when the component unmounts and immediately before running that effect again. This is essential to prevent memory leaks by cleaning up subscriptions, event listeners, or clearing timers.",
    visualExplanation: "Like borrowing a library book. The effect is checking the book out and reading it. The cleanup function is the action of returning the book to the shelf before you leave or check out a new one.",
    examples: [
      {
        title: "Clearing Timer on Unmount",
        code: `useEffect(() => { \n  const timer = setInterval(() => { \n    console.log('Tick'); \n  }, 1000); \n  // Cleanup function: \n  return () => clearInterval(timer); \n}, []);`,
        explanation: "Returning clearInterval prevents the interval from ticking indefinitely after unmount."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 19,
    category: Category.Hooks,
    question: "useEffect vs useLayoutEffect?",
    shortAnswer: "useEffect runs async after paint; useLayoutEffect runs sync before paint, used when you must measure/mutate DOM before the browser shows anything.",
    detailedAnswer: "useEffect runs asynchronously after the browser has completed painting the layout on screen, making it non-blocking. useLayoutEffect fires synchronously after all DOM mutations but *before* the browser paints. It is useful for measuring layouts (like node sizes) or updating the DOM to prevent visual flickering.",
    visualExplanation: "useEffect is adjusting the decorations after the guests are in the room. useLayoutEffect is adjusting the curtains *before* the host opens the stage doors, ensuring no one sees the intermediate messy state.",
    examples: [
      {
        title: "Measuring with useLayoutEffect",
        code: `useLayoutEffect(() => { \n  if (ref.current) { \n    const { height } = ref.current.getBoundingClientRect(); \n    setHeight(height); // updates before browser paints! \n  } \n}, []);`,
        explanation: "Eliminates layout jumps by syncing measurements before visual rendering."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 20,
    category: Category.Hooks,
    question: "What is useRef used for?",
    shortAnswer: "Persisting a mutable value across renders without causing re-render, or referencing a DOM node directly.",
    detailedAnswer: "useRef returns a mutable ref object whose '.current' property is initialized with the passed argument. The returned object will persist for the full lifetime of the component. It has two main use cases: accessing raw DOM elements directly, or keeping a mutable variable that does not trigger re-renders when mutated.",
    visualExplanation: "Think of useRef as a secret pocket. You can put things in it, look at them, and swap them anytime, and the rest of the world (re-rendering) has no idea you are doing it. It's completely silent.",
    examples: [
      {
        title: "Direct DOM Access and Mutable Count",
        code: `// DOM Ref \nconst inputRef = useRef<HTMLInputElement>(null); \nconst clickCount = useRef<number>(0); \n\nconst handleClick = () => { \n  clickCount.current++; // No re-render triggered! \n  inputRef.current?.focus(); // DOM manipulation \n};`,
        explanation: "useRef lets you interact with native elements and track values silently."
      }
    ],
    visualizerType: "forms"
  },
  {
    id: 21,
    category: Category.Hooks,
    question: "useState vs useRef for storing a value?",
    shortAnswer: "useState triggers re-render on change; useRef doesn't — use ref for values that shouldn't affect rendering (like a timer ID).",
    detailedAnswer: "Modifying a state variable via useState schedules a component re-render so that the visual UI is updated to reflect the new state. Modifying the '.current' property of a useRef object is a plain mutation that does not trigger a re-render. If a value is used in your JSX rendering, store it in state; if it's only used inside event handlers or hooks (like a timer ref), use a ref.",
    visualExplanation: "Use state for things that are visible on the stage (characters, props). Use ref for behind-the-scenes equipment (stage lights, timers, rigging) that work silently without stopping or restarting the scene.",
    examples: [
      {
        title: "When to use State vs Ref",
        code: `// State: Rendered in JSX \nconst [seconds, setSeconds] = useState(0); \n\n// Ref: Used behind the scenes to clear interval \nconst intervalRef = useRef<NodeJS.Timeout | null>(null);`,
        explanation: "Changing seconds updates the visual screen; changing intervalRef does not."
      }
    ],
    visualizerType: "debounce"
  },
  {
    id: 22,
    category: Category.Performance,
    question: "What is useMemo?",
    shortAnswer: "Memoizes a computed value so it's only recalculated when its dependencies change.",
    detailedAnswer: "useMemo is a hook that caches the result of an expensive calculation between renders. It accepts a calculation function and a dependency array, and recalculates the value only if one of the dependencies has changed. This prevents costly calculations from running on every single render.",
    visualExplanation: "It's like a calculator with a history memory. If you ask it to compute 5649 * 9382, it does it once, writes it down, and immediately hands you the cached answer the next time you ask, unless you change the numbers.",
    examples: [
      {
        title: "Memoizing Expensive Filter",
        code: `const sortedItems = useMemo(() => { \n  console.log('Sorting items...'); \n  return [...items].sort((a, b) => b.price - a.price); \n}, [items]); // Only resorts when items list changes`,
        explanation: "Saves processing cycles during unrelated state updates in parent scope."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 23,
    category: Category.Performance,
    question: "What is useCallback?",
    shortAnswer: "Memoizes a function reference so it doesn't get recreated on every render — useful when passed to memoized children.",
    detailedAnswer: "useCallback returns a memoized version of the callback function that only changes if one of the dependencies has changed. Since JavaScript functions are object references under the hood, defining a function inside a component creates a fresh reference on every render. useCallback preserves the exact same reference across renders.",
    visualExplanation: "Think of it as giving someone your phone number. Defining it inline is like giving them a brand new phone number every day (even if you look the same). useCallback makes sure they keep dialing the exact same number, preventing them from updating their address book.",
    examples: [
      {
        title: "Passing Callback to Memoized Child",
        code: `const handleDelete = useCallback((id) => { \n  setTodos(prev => prev.filter(t => t.id !== id)); \n}, []); // stable function reference`,
        explanation: "Ensures child components optimized with React.memo don't re-render due to changing function references."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 24,
    category: Category.Performance,
    question: "When should you avoid useMemo/useCallback?",
    shortAnswer: "When the computation/function is cheap — the memoization overhead can outweigh the benefit.",
    detailedAnswer: "You should avoid these hooks for trivial computations (like simple string manipulations or additions). Executing useMemo and useCallback incurs overhead (dependency comparison, closure memory allocation). If the expense of creating the function or doing the calculation is less than the expense of running the hook's diffing checks, let it recompute.",
    visualExplanation: "Writing down '1+1 = 2' on a notepad and storing it in a safety deposit box to avoid recalculating it is way more work and cost than just adding 1+1 in your head every single time.",
    examples: [
      {
        title: "Unnecessary Memoization",
        code: `// ❌ Over-engineering (Avoid): \nconst uppercaseName = useMemo(() => name.toUpperCase(), [name]); \nconst handleClick = useCallback(() => console.log('click'), []); \n\n// ✅ Clean & Simple: \nconst uppercaseName = name.toUpperCase(); \nconst handleClick = () => console.log('click');`,
        explanation: "Trivial string mutations are practically free; skip memoization overhead."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 25,
    category: Category.Hooks,
    question: "What is useReducer and when would you use it over useState?",
    shortAnswer: "A reducer-style state hook, useful when state logic is complex or the next state depends on the previous state via multiple actions.",
    detailedAnswer: "useReducer is an alternative to useState. It accepts a reducer function of type (state, action) => newState, and returns the current state paired with a dispatch method. It is preferred when you have complex state transitions with nested structures, or when the next state depends on multiple distinct user commands (actions).",
    visualExplanation: "useReducer is like a bank teller. Customers don't just walk up and change the vault balances directly. They hand a deposit or withdrawal slip (Action) to the teller, who processes the balance change safely according to strict company policies.",
    examples: [
      {
        title: "Basic useReducer State Machine",
        code: `const reducer = (state, action) => { \n  switch (action.type) { \n    case 'increment': return { count: state.count + 1 }; \n    case 'reset': return { count: 0 }; \n    default: return state; \n  } \n}; \nconst [state, dispatch] = useReducer(reducer, { count: 0 });`,
        explanation: "Encapsulates predictable state changes into discrete, inspectable actions."
      }
    ],
    visualizerType: "reducer"
  },
  {
    id: 26,
    category: Category.Hooks,
    question: "What is a custom hook?",
    shortAnswer: "A reusable function starting with 'use' that composes other hooks to encapsulate reusable logic.",
    detailedAnswer: "A custom hook is a JavaScript function whose name starts with 'use' and that may call other hooks. Custom hooks allow you to extract component logic into reusable functions, separating stateful operations from the rendering concern of your UI components.",
    visualExplanation: "It's like building your own custom appliance. You combine a standard motor (useState) and a power cord (useEffect) into a customized coffee maker hook (`useCoffeeMaker`). Now, any kitchen component can just install it to get fresh coffee easily.",
    examples: [
      {
        title: "Custom Hook for Keypress Hook",
        code: `function useKeyPress(targetKey) { \n  const [pressed, setPressed] = useState(false); \n  useEffect(() => { \n    const down = ({ key }) => key === targetKey && setPressed(true); \n    const up = ({ key }) => key === targetKey && setPressed(false); \n    window.addEventListener('keydown', down); \n    window.addEventListener('keyup', up); \n    return () => { \n      window.removeEventListener('keydown', down); \n      window.removeEventListener('keyup', up); \n    }; \n  }, [targetKey]); \n  return pressed; \n}`,
        explanation: "Exposes clean, reactive keyboard state that any component can consume in one line."
      }
    ],
    visualizerType: "reducer"
  },
  {
    id: 27,
    category: Category.Performance,
    question: "What is React.memo?",
    shortAnswer: "A higher-order component that skips re-rendering if props haven't changed (shallow comparison).",
    detailedAnswer: "React.memo is a higher-order component that wraps functional components. If your component renders the same result given the same props, you can wrap it in React.memo for a performance boost, causing React to skip rendering the component and reuse the last rendered result.",
    visualExplanation: "Think of an artist painting a portrait. If you hand them the exact same reference photo as yesterday (same props), instead of re-painting the canvas from scratch for hours, they just slide the finished painting from yesterday out of the cabinet.",
    examples: [
      {
        title: "Wrapping Component in React.memo",
        code: `const ChildComponent = React.memo(({ name }) => { \n  console.log('Render Child'); \n  return <p>{name}</p>; \n});`,
        explanation: "Skips rendering ChildComponent entirely if parent state updates do not modify 'name'."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 28,
    category: Category.Performance,
    question: "What causes React.memo to not work as expected?",
    shortAnswer: "Passing new object/array/function references as props each render, which fail shallow equality even if the actual values are the same.",
    detailedAnswer: "React.memo uses shallow equality comparison by default. In JavaScript, inline objects `{}` or arrays `[]` or inline functions `() => {}` create fresh memory references on every single render. If passed as props, shallow comparison fails (`prevProp !== nextProp`), causing the memoized component to re-render anyway.",
    visualExplanation: "You hand the artist a copy of the photo, but inside a brand new envelope. The artist compares the envelopes, sees they are different envelopes, and decides they have to paint a brand new canvas even though the photo inside is identical.",
    examples: [
      {
        title: "Failing and Fixing Memoization",
        code: `// ❌ DEFEATS MEMO: fresh array reference every render \n<List items={['a', 'b']} /> \n\n// ✅ FIX: Use a stable reference or memoized value \nconst items = useMemo(() => ['a', 'b'], []); \n<List items={items} />`,
        explanation: "Stable object references are required to leverage React.memo optimizations."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 29,
    category: Category.Architecture,
    question: "What is a Higher-Order Component (HOC)?",
    shortAnswer: "A function that takes a component and returns a new component with added behavior/props.",
    detailedAnswer: "A Higher-Order Component (HOC) is an advanced pattern in React for reusing component logic. It is not part of the React API, but rather a pattern that emerges from React's compositional nature. Specifically, an HOC is a pure function that wraps a component to augment its functionality.",
    visualExplanation: "Think of a spacesuit. Instead of surgically modifying a human to breathe in space and handle radiation, you put them in a spacesuit (HOC). The human (component) inside remains unchanged, but now they have space-faring abilities.",
    examples: [
      {
        title: "HOC Authentication Wrapper",
        code: `function withAuth(Component) { \n  return function AuthenticatedComponent(props) { \n    const isAuth = checkAuth(); \n    if (!isAuth) return <Login />; \n    return <Component {...props} />; \n  }; \n}`,
        explanation: "Intercepts render to enforce security controls before showing the underlying page."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 30,
    category: Category.Architecture,
    question: "What are render props?",
    shortAnswer: "A pattern where a component takes a function as a prop to determine what to render, sharing logic between components.",
    detailedAnswer: "The term 'render prop' refers to a technique for sharing code between React components using a prop whose value is a function. A component with a render prop takes a function that returns a React element and calls it instead of implementing its own rendering logic.",
    visualExplanation: "Like renting an empty food truck. The truck supplies the wheels, gas, kitchen, and window (state/logic). You supply the chef and the custom menu (the render prop function) to decide what food actually gets served.",
    examples: [
      {
        title: "Mouse Tracker with Render Prop",
        code: `function Mouse({ render }) { \n  const [pos, setPos] = useState({ x: 0, y: 0 }); \n  // event tracking logic \n  return <div onMouseMove={...}>{render(pos)}</div>; \n} \n\n// Consumption: \n<Mouse render={(pos) => <p>Cursor at {pos.x}, {pos.y}</p>} />`,
        explanation: "The Mouse component manages coordinates, letting the caller control styling."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 31,
    category: Category.Architecture,
    question: "HOC/render props vs hooks — why did hooks largely replace them?",
    shortAnswer: "Hooks let you share logic without extra component nesting ('wrapper hell') and without the indirection of render props.",
    detailedAnswer: "Before hooks, sharing stateful logic required wrapping components in HOCs or render prop providers, which resulted in deep component trees ('wrapper hell') that made debugging difficult. Hooks allow you to share stateful logic flatly inside the component, making the code cleaner and easier to read.",
    visualExplanation: "Instead of wearing 5 nested coats (each coat adding one pocket for keys, cards, cash), hooks let you just stand freely and put 5 items directly into your own pants pockets, keeping your appearance flat and simple.",
    examples: [
      {
        title: "Wrapper Hell vs Flattened Hooks",
        code: `// ❌ Wrapper Hell: \n<WithTheme><WithUser><WithMouse>{(mouse) => <App />}</WithMouse></WithUser></WithTheme> \n\n// ✅ Flat with Hooks: \nconst theme = useTheme(); \nconst user = useUser(); \nconst mouse = useMouse();`,
        explanation: "Hooks decouple state sharing from visual component hierarchy."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 32,
    category: Category.StateAndProps,
    question: "What is the Context API?",
    shortAnswer: "React's built-in mechanism to share values across the component tree without manually passing props.",
    detailedAnswer: "Context provides a way to pass data through the component tree without having to pass props down manually at every level. It is designed to share data that can be considered 'global' for a tree of React components, such as the current authenticated user, theme, or preferred language.",
    visualExplanation: "A shared noticeboard in a building. Instead of the landlord knocking on every single door to tell each tenant about an event, they write it on the lobby board. Anyone can check it directly whenever they want.",
    examples: [
      {
        title: "Creating and using Context",
        code: `const ActiveTabContext = createContext('dashboard'); \n\nexport function TabProvider({ children }) { \n  return ( \n    <ActiveTabContext.Provider value="settings"> \n      {children} \n    </ActiveTabContext.Provider> \n  ); \n}`,
        explanation: "Instantiates a shared data store that any child can read from directly."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 33,
    category: Category.CoreConcepts,
    question: "What is React Fragment?",
    shortAnswer: "A wrapper (<>...</>) that groups children without adding an extra DOM node.",
    detailedAnswer: "React components must return a single root element. When you need to return multiple sibling elements, wrapping them in a standard 'div' adds an unnecessary node to the real DOM, which can break CSS layouts (like grid or flexbox). Fragments group elements without compiling to any DOM nodes.",
    visualExplanation: "Imagine you're shipping a set of plates. You want to bundle them together for the journey (in JSX), but when they are placed on the dining table (Real DOM), you throw away the packaging entirely so only the plates sit on the wood.",
    examples: [
      {
        title: "Standard and Shorthand Fragments",
        code: `// Standard Fragment \nreturn ( \n  <React.Fragment> \n    <td>Apples</td> \n    <td>Oranges</td> \n  </React.Fragment> \n); \n\n// Shorthand syntax \nreturn ( \n  <> \n    <td>Apples</td> \n    <td>Oranges</td> \n  </> \n);`,
        explanation: "Shorthand fragments don't support attributes (like keys) but are extremely compact."
      }
    ],
    visualizerType: "vdom"
  },
  {
    id: 34,
    category: Category.Architecture,
    question: "What is a Portal?",
    shortAnswer: "Renders children into a DOM node outside the parent hierarchy — commonly used for modals/tooltips.",
    detailedAnswer: "Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. This is useful when the parent component has styles like 'overflow: hidden' or 'z-index' that interfere with overlay components like modals, dropdowns, or tooltips.",
    visualExplanation: "It's like having a portal gun. You stand inside a tiny closet (small container), shoot a portal on the wall, and stick your arm through. To a bystander, your arm is waving around in the wide-open grand ballroom, even though you are physically still inside the closet.",
    examples: [
      {
        title: "React Portal Example",
        code: `import { createPortal } from 'react-dom'; \n\nfunction Modal({ children }) { \n  const mountNode = document.getElementById('modal-root')!; \n  return createPortal( \n    <div className="modal-overlay">{children}</div>, \n    mountNode \n  ); \n}`,
        explanation: "Renders the modal markup directly into a global container to bypass CSS limitations."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 35,
    category: Category.Architecture,
    question: "What is React.lazy?",
    shortAnswer: "Enables code-splitting by dynamically importing a component, loaded only when rendered.",
    detailedAnswer: "React.lazy lets you define a component that is loaded dynamically. This helps minimize the bundle size by postponing the loading of components that aren't rendered during initial page load (like secondary tabs, modals, or page routes). It must be rendered inside a Suspense component.",
    visualExplanation: "Instead of ordering the entire restaurant menu on your table at once (bloating the table and costing time), you order only the appetizer. When you are ready for dessert (render), the waiter rushes to the kitchen (network load) to fetch it.",
    examples: [
      {
        title: "Lazy Loading Component",
        code: `import React, { lazy, Suspense } from 'react'; \n\nconst HeavyChart = lazy(() => import('./HeavyChart')); \n\nfunction App() { \n  return ( \n    <Suspense fallback={<div>Loading component...</div>}> \n      <HeavyChart /> \n    </Suspense> \n  ); \n}`,
        explanation: "Saves client bundle size by fetching heavy modules on-demand."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 36,
    category: Category.Architecture,
    question: "What is Suspense?",
    shortAnswer: "A component that lets you show a fallback UI while children are still loading (used with lazy or data fetching).",
    detailedAnswer: "Suspense is a built-in React component that lets you orchestrate loading states in your component tree. It detects when children are 'suspending' (waiting for a promise, lazy components, or async resources to resolve) and temporarily displays a fallback component (like a skeleton or loader).",
    visualExplanation: "Like a placeholder movie screen. While the film reel is being spun up and aligned in the projection room, the theater displays a beautiful slide saying 'Your movie will begin shortly', swapping it out immediately when the film starts playing.",
    examples: [
      {
        title: "Suspense Fallback Boundaries",
        code: `<Suspense fallback={<SkeletonLoader />}> \n  <DeferredProfileDetails /> \n</Suspense>`,
        explanation: "Gracefully manages asynchronous UI chunks and provides placeholder fallback layouts."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 37,
    category: Category.Architecture,
    question: "What is the difference between class and functional components?",
    shortAnswer: "Functional components with hooks can do everything classes can (state, lifecycle) with less boilerplate; classes use lifecycle methods and this.",
    detailedAnswer: "Class components are ES6 classes that extend React.Component, requiring a render() method and using 'this' and lifecycle methods (componentDidMount, etc.). Functional components are plain JavaScript functions that accept props and return JSX. With the introduction of Hooks, functional components became fully stateful and capable of handling complex lifecycles.",
    visualExplanation: "Class components are heavy, complex mechanical clocks with interlocking gears (lifecycle methods). Functional components are sleek digital watches — simpler to construct, fewer moving parts, and powered by small modular batteries (Hooks).",
    examples: [
      {
        title: "Class vs Functional Styles",
        code: `// Class Style: \nclass Counter extends React.Component { \n  render() { return <h1>{this.props.count}</h1>; } \n} \n\n// Functional Style: \nfunction Counter({ count }) { \n  return <h1>{count}</h1>; \n}`,
        explanation: "Functional components offer less boilerplate, easier nesting, and better bundle minification."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 38,
    category: Category.Architecture,
    question: "Class lifecycle equivalents: componentDidMount?",
    shortAnswer: "useEffect(() => {...}, []).",
    detailedAnswer: "componentDidMount runs once immediately after a component is inserted into the DOM. In a functional component, this is achieved by calling useEffect with an empty dependency array `[]`. React will run the effect block exactly once when the component is initially mounted.",
    visualExplanation: "A welcome handshake when a guest enters your house. You shake their hand once at the door, and then let them join the party without repeating the greeting every time they move to another room.",
    examples: [
      {
        title: "componentDidMount Hook Equivalent",
        code: `useEffect(() => { \n  console.log('Component has mounted successfully!'); \n  // Fetch initial configuration... \n}, []); // empty dependencies array`,
        explanation: "Guarantees the setup callback triggers exactly once per instance lifetime."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 39,
    category: Category.Architecture,
    question: "Class lifecycle equivalents: componentDidUpdate?",
    shortAnswer: "useEffect(() => {...}) with relevant dependencies, or without array (runs every update).",
    detailedAnswer: "componentDidUpdate runs immediately after updating occurs, but not on the initial render. To replicate this with useEffect, you pass a dependency array containing the monitored values. If you need to skip the very first (mount) trigger, you can track the mount status using a ref.",
    visualExplanation: "A safety check that occurs whenever a package shifts on a conveyor belt. You inspect the box every single time its contents update to make sure everything is still packed securely.",
    examples: [
      {
        title: "Selective Update Tracking",
        code: `const isFirstRun = useRef(true); \nuseEffect(() => { \n  if (isFirstRun.current) { \n    isFirstRun.current = false; \n    return; \n  } \n  console.log('Value changed to:', value); \n}, [value]);`,
        explanation: "Uses a mutable ref to successfully ignore the mount run, acting like componentDidUpdate."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 40,
    category: Category.Architecture,
    question: "Class lifecycle equivalents: componentWillUnmount?",
    shortAnswer: "The cleanup function returned from useEffect.",
    detailedAnswer: "componentWillUnmount is called immediately before a component is destroyed and removed from the DOM. In functional components, any function returned by the callback of useEffect acts as a cleanup function. React executes this cleanup function right before the component unmounts.",
    visualExplanation: "Cleaning up the campsite before you leave. You put out the fire, throw away the garbage, and pack up the tent so the next travelers find a clean, safe space.",
    examples: [
      {
        title: "Unmounting Event Listeners",
        code: `useEffect(() => { \n  const onResize = () => console.log('resized'); \n  window.addEventListener('resize', onResize); \n  // componentWillUnmount equivalent: \n  return () => { \n    window.removeEventListener('resize', onResize); \n  }; \n}, []);`,
        explanation: "Prevents dangling event handlers from triggering after component destruction."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 41,
    category: Category.StateAndProps,
    question: "What is the significance of 'children' prop?",
    shortAnswer: "Special prop letting a component render whatever is passed between its opening and closing JSX tags.",
    detailedAnswer: "The 'children' prop allows you to pass components or elements as data to other components. It is a built-in prop in React that is automatically populated with whatever content sits inside the opening and closing brackets of your custom tag.",
    visualExplanation: "Think of an empty picture frame. The frame determines the border, wood, and glass, but it doesn't care what photo you put inside. The 'children' prop is the photo you slide into the frame.",
    examples: [
      {
        title: "Picture Frame Composition",
        code: `function Frame({ children }) { \n  return <div className="border border-zinc-800 p-6">{children}</div>; \n} \n\n// Usage: \n<Frame> \n  <p>This is child markup!</p> \n</Frame>`,
        explanation: "Frame handles container rendering while accommodating custom child components."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 42,
    category: Category.CoreConcepts,
    question: "What is reconciliation's 'type + key' heuristic?",
    shortAnswer: "React assumes elements of a different type produce different trees (unmounts old, mounts new); same type + key means it can reuse and just update.",
    detailedAnswer: "To keep diffing fast, React's reconciliation uses two heuristic assumptions: 1. If two elements have different HTML/Component types, they will produce entirely different trees. React completely tears down the old tree and builds the new one. 2. Elements with the same type and a stable, matching key are identified as the same, and React only updates their props in place.",
    visualExplanation: "If you change a `<div>` tag to a `<section>` tag, React doesn't try to compare details inside. It completely demolishes the building and starts fresh. If the tag remains a `<div>`, it keeps the structure and only repaints the walls (props/classes).",
    examples: [
      {
        title: "Type Swap Demolition",
        code: `// Renders a Component input state \n{isInput ? <input type="text" /> : <textarea />} \n// React sees 'input' -> 'textarea' swap. \n// It completely destroys the input DOM, clearing text, and mounts a fresh textarea.`,
        explanation: "Changing element type triggers a full unmount and remount sequence."
      }
    ],
    visualizerType: "reconciliation"
  },
  {
    id: 43,
    category: Category.Performance,
    question: "What is a Pure Component (class) and its functional equivalent?",
    shortAnswer: "PureComponent does shallow prop/state comparison to skip re-render; functional equivalent is React.memo.",
    detailedAnswer: "In class components, React.PureComponent is a class that implements 'shouldComponentUpdate' with a shallow prop and state comparison. It skips re-rendering if no references have changed. Its functional component equivalent is wrapping the function in 'React.memo'.",
    visualExplanation: "Like a gatekeeper who holds up a checklist. Before letting the painter paint the room, they look at your current bag (props) and compare it item-by-item to yesterday's bag. If everything is identical, they stop you and say: 'Don't paint, we are already set.'",
    examples: [
      {
        title: "Pure Class Component",
        code: `class Title extends React.PureComponent<{ text: string }> { \n  render() { \n    return <h2>{this.props.text}</h2>; \n  } \n}`,
        explanation: "Avoids updates if parent updates other unrelated state variables."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 44,
    category: Category.BestPractices,
    question: "What is prop-types and do you still need it with TypeScript?",
    shortAnswer: "Runtime prop validation library; largely redundant once you have TypeScript's compile-time checking.",
    detailedAnswer: "Prop-types is a legacy library used to validate the types of props passed to React components at runtime, printing console warnings in development on failures. TypeScript provides static type-checking at compile-time. Once you adopt TypeScript, prop-types is almost entirely redundant because compilation will fail before buggy props reach runtime.",
    visualExplanation: "Prop-types is like a bouncer checking passports at the club doors (runtime). TypeScript is a visa check at the airport terminal (compile-time). If you have strict terminal checks, no invalid guests can even get on the flight, making the club bouncer redundant.",
    examples: [
      {
        title: "TypeScript Prop Safety",
        code: `interface ProfileProps { \n  name: string; \n  age: number; \n} \n\nexport default function Profile({ name, age }: ProfileProps) { \n  return <p>{name} is {age} years old.</p>; \n}`,
        explanation: "TypeScript flags invalid props directly in your editor before you run the code."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 45,
    category: Category.BestPractices,
    question: "What is the significance of the 'dangerouslySetInnerHTML' prop?",
    shortAnswer: "Lets you inject raw HTML into a component; named deliberately to warn about XSS risk if content isn't sanitized.",
    detailedAnswer: "dangerouslySetInnerHTML is React's replacement for using raw innerHTML in the browser DOM. It is named dangerouslySetInnerHTML because it exposes your application to Cross-Site Scripting (XSS) attacks if you pass unsanitized input (e.g. user-submitted comments) into it.",
    visualExplanation: "It's like accepting a chemical canister in a secure bio-hazard lab. The long name is a giant warning tape wrapped around the valve. It is saying: 'If you don't verify what chemical is in here first, you could poison the entire facility.'",
    examples: [
      {
        title: "Sanitizing injected HTML",
        code: `import DOMPurify from 'dompurify'; \n\nfunction SafeViewer({ rawHtml }) { \n  // Purify prevents malicious scripts from executing! \n  const cleanHtml = DOMPurify.sanitize(rawHtml); \n  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />; \n}`,
        explanation: "Always sanitize third-party markup prior to binding."
      }
    ],
    visualizerType: "forms"
  },
  {
    id: 46,
    category: Category.Performance,
    question: "How do you optimize a large list rendering performance?",
    shortAnswer: "Virtualization (e.g. react-window/react-virtualized) to render only visible rows.",
    detailedAnswer: "When rendering lists with thousands of items, creating thousands of DOM nodes causes heavy memory overhead and layout lag. The solution is 'List Virtualization' or 'Windowing'. This technique only mounts and renders the specific list items that are currently visible inside the viewport, recycling DOM nodes as the user scrolls.",
    visualExplanation: "Think of an ancient scroll. Instead of unrolling a 50-foot parchment and holding it open on your desk (bloating memory), you build a small cardboard window. You scroll the paper underneath the window, reading and rendering only the 5 lines that are visible.",
    examples: [
      {
        title: "Virtual List Concept",
        code: `// Conceptual virtualization: \n// Render only items from index Math.floor(scrollPos / itemHeight) \n// up to (viewportHeight / itemHeight). All other elements are skipped!`,
        explanation: "Reduces DOM footprint from 10,000 nodes down to just 20 active nodes."
      }
    ],
    visualizerType: "keys"
  },
  {
    id: 47,
    category: Category.Architecture,
    question: "What is code splitting and why does it matter?",
    shortAnswer: "Breaking your bundle into smaller chunks loaded on demand, reducing initial load time.",
    detailedAnswer: "Code splitting is a feature supported by bundlers (like Webpack, Vite, or ESBuild) which can create multiple bundles that can be dynamically loaded at runtime. By splitting your application's entry bundle, you avoid forcing the client to download pages or components they haven't visited yet, heavily accelerating initial page load.",
    visualExplanation: "Instead of forcing a moving truck to deliver your entire furniture set (bedroom, garage, yard) before you can sit down, they deliver just one comfortable folding chair. You sit on it immediately while they bring the rest of the crates later.",
    examples: [
      {
        title: "Vite Routing Code Splitting",
        code: `// Chunking routes dynamically \nconst Dashboard = () => import('./routes/Dashboard'); \nconst Analytics = () => import('./routes/Analytics');`,
        explanation: "Separates distinct application routes into independent network files."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 48,
    category: Category.Architecture,
    question: "What is server-side rendering (SSR) in React context?",
    shortAnswer: "Rendering React components to HTML on the server first, then hydrating on the client — improves first paint and SEO.",
    detailedAnswer: "In Server-Side Rendering (SSR), the server generates a fully-formed static HTML string representing your React components, and sends this flat HTML to the browser. The browser displays it immediately. Afterward, the client-side JavaScript bundle loads and 'hydrates' the HTML to make it fully interactive.",
    visualExplanation: "SSR is like pre-baking a frozen pizza and delivering it hot to the customer. They can look at it and hold it immediately. Hydration is the client putting the final seasoning and cheese melts on top, making it fully ready to eat and interact with.",
    examples: [
      {
        title: "SSR Express Rendering",
        code: `import ReactDOMServer from 'react-dom/server'; \nimport App from './App'; \n\napp.get('/', (req, res) => { \n  const html = ReactDOMServer.renderToString(<App />); \n  res.send(\`<div id="root">\${html}</div><script src="/bundle.js"></script>\`); \n});`,
        explanation: "Outputs raw static markup from the server, speeding up the initial content painting."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 49,
    category: Category.Architecture,
    question: "What is hydration?",
    shortAnswer: "The process where React attaches event listeners to server-rendered HTML on the client, making it interactive.",
    detailedAnswer: "Hydration is a client-side process that occurs after the browser receives server-rendered HTML. React loads the JavaScript bundle, parses the markup, maps the virtual component tree onto the existing DOM nodes, and attaches all necessary event listeners (onClick, etc.) to make the static HTML dynamic.",
    visualExplanation: "Imagine a wax museum mannequin. The server delivers the perfect physical structure (HTML). Hydration is breathing life and reflexes into the mannequin, making it blink, speak, and respond when you shake its hand.",
    examples: [
      {
        title: "Client-side Hydration",
        code: `import { hydrateRoot } from 'react-dom/client'; \nimport App from './App'; \n\n// Matches server HTML and hooks up interactive listeners \nhydrateRoot(document.getElementById('root')!, <App />);`,
        explanation: "Attaches event handlers to existing markup without rebuilding the DOM nodes."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 50,
    category: Category.Architecture,
    question: "What is the difference between SSR, CSR, and SSG?",
    shortAnswer: "SSR renders per request on server; CSR renders entirely in browser; SSG pre-renders pages at build time.",
    detailedAnswer: "1. CSR (Client-Side Rendering): Browser downloads empty HTML and builds everything via JS. Great for rich dashboards, slow initial load. 2. SSR (Server-Side Rendering): Server compiles HTML dynamically for each incoming request. Great for dynamic content requiring SEO. 3. SSG (Static Site Generation): HTML is compiled once at build time. Ultra-fast delivery via CDN, perfect for blogs or static pages.",
    visualExplanation: "CSR is like shipping flat-pack furniture; you build it yourself. SSR is ordering hot takeout; it is made on-demand and delivered warm. SSG is buying canned soup; it was made in a factory months ago, ready to open instantly.",
    examples: [
      {
        title: "SSG vs SSR Mock Data",
        code: `// SSG (Next.js example): \nexport async function getStaticProps() { /* built once */ } \n\n// SSR: \nexport async function getServerSideProps() { /* runs every request */ }`,
        explanation: "SSG saves server CPU cycles; SSR supports hyper-dynamic, user-specific feeds."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 51,
    category: Category.Architecture,
    question: "What are error boundaries?",
    shortAnswer: "Class components implementing componentDidCatch/getDerivedStateFromError that catch JS errors in their child tree and show a fallback UI.",
    detailedAnswer: "Error boundaries are class components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire application. They catch errors during rendering, lifecycle methods, and constructors, but not inside async code or event handlers.",
    visualExplanation: "Think of an electrical circuit breaker. If an appliance (child component) short-circuits, the breaker trips (Error Boundary). This isolates the sparks, keeping the lights on in the rest of the house instead of burning down the whole power grid.",
    examples: [
      {
        title: "React Error Boundary Component",
        code: `class ErrorBoundary extends React.Component { \n  state = { hasError: false }; \n  static getDerivedStateFromError(error) { \n    return { hasError: true }; \n  } \n  componentDidCatch(error, info) { \n    console.error('Logged:', error, info); \n  } \n  render() { \n    if (this.state.hasError) return <h1>Something went wrong.</h1>; \n    return this.props.children; \n  } \n}`,
        explanation: "A robust class component protecting children subtrees from total crashes."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 52,
    category: Category.Architecture,
    question: "Can functional components be error boundaries?",
    shortAnswer: "Not natively — error boundaries currently require a class component (or a library wrapper).",
    detailedAnswer: "Currently, functional components cannot act as error boundaries because the lifecycle hooks required (getDerivedStateFromError and componentDidCatch) do not have equivalent hooks in functional components yet. Most developers use class boundaries or wrap their trees with libraries like 'react-error-boundary'.",
    visualExplanation: "Certain specialty deep-sea safety suits require high-pressure titanium steel (class classes). Standard neoprene wetsuits (functional functions) are comfortable and quick for 95% of tasks, but for high-risk error containment, you still need to rent the titanium suit.",
    examples: [
      {
        title: "Using react-error-boundary Library",
        code: `import { ErrorBoundary } from 'react-error-boundary'; \n\nfunction Fallback({ error }) { \n  return <div className="text-red-500">Error: {error.message}</div>; \n} \n\n<ErrorBoundary FallbackComponent={Fallback}> \n  <MyBuggyWidget /> \n</ErrorBoundary>`,
        explanation: "Wraps functional structures using a community library wrapper internally."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 53,
    category: Category.BestPractices,
    question: "What is prop spreading and its risk?",
    shortAnswer: "Spreading an object as props ({...props}); risk is passing unintended/unexpected props down, obscuring what a component actually needs.",
    detailedAnswer: "Prop spreading is a syntax `{...props}` that passes all key-value pairs of an object down as props. While concise, it makes the code hard to read by hiding what a child actually expects, and runs the risk of leaking sensitive properties, triggering console errors, or overriding explicit props by accident.",
    visualExplanation: "It's like handing someone your entire suitcase of belongings instead of just taking out the key they asked for. You might expose private letters, weight down their flight, or accidentally hand them duplicate clothes.",
    examples: [
      {
        title: "Safe vs Unsafe Spreading",
        code: `// ❌ RISKY: unknown parameters are passed through \n<Button {...props} /> \n\n// ✅ SAFE: Destructure and pass explicitly \nconst { variant, label, ...domAttributes } = props; \n<button className={variant} {...domAttributes}>{label}</button>`,
        explanation: "Explicit destructuring prevents HTML console warnings and keeps code readable."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 54,
    category: Category.BestPractices,
    question: "What is a 'stale closure' bug?",
    shortAnswer: "When a function (like inside useEffect) captures an old value from a previous render because it wasn't included in the dependency array.",
    detailedAnswer: "In JavaScript, nested functions 'close over' outer scope variables. In React, because every render is a fresh invocation with its own props and state, any callback generated in render captures state from that specific render moment. If a hook dependencies array is missing a state variable, the callback is never recreated, locking it into the outdated, captured state.",
    visualExplanation: "Like taking a photograph of a whiteboard. If you write numbers on the board every hour, but continue reading the numbers off the photograph you took on Monday, you are working with stale data because you didn't update your snapshot.",
    examples: [
      {
        title: "Stale Closure in React",
        code: `const [count, setCount] = useState(0); \nuseEffect(() => { \n  const timer = setInterval(() => { \n    console.log('Count:', count); // Will ALWAYS log 0! \n  }, 1000); \n  return () => clearInterval(timer); \n}, []); // ❌ Missing 'count' dependency`,
        explanation: "By omitting count, the interval handler is trapped in a closure capturing count = 0."
      }
    ],
    visualizerType: "debounce"
  },
  {
    id: 55,
    category: Category.BestPractices,
    question: "What is the significance of functional updates in setState (setCount(c => c + 1))?",
    shortAnswer: "Guarantees you're updating based on the latest state, avoiding stale value bugs especially in rapid updates or closures.",
    detailedAnswer: "When you pass a function to setState, React executes that function passing the absolute, latest resolved state. This is vital when multiple state updates are scheduled rapidly in the same batch, or inside event closures, preventing subsequent updates from overwriting each other.",
    visualExplanation: "Like telling a cashier: 'Add 1 dollar to whatever is in the cash register right now' versus saying: 'Take 5 dollars (which I counted 10 minutes ago) and make that the new total'. The former is always correct, even if someone else added money in between.",
    examples: [
      {
        title: "Functional State Updates",
        code: `// Overcomes stale value bugs inside closures \nsetCount(prev => prev + 1); \nsetCount(prev => prev + 1); \n// Result: increments by 2 safely!`,
        explanation: "Eliminates dependencies from effects and handles asynchronous batching perfectly."
      }
    ],
    visualizerType: "debounce"
  },
  {
    id: 56,
    category: Category.Concurrent,
    question: "What is batching in React 18?",
    shortAnswer: "Multiple state updates within the same event/tick are grouped into a single re-render, even across async boundaries like promises/timeouts.",
    detailedAnswer: "In React 17 and earlier, updates inside React event handlers were batched, but updates inside promises, setTimeout, or native events were not. In React 18, automatic batching is enabled by default. React bundles all state updates together regardless of where they originate, executing a single re-render for performance.",
    visualExplanation: "Like mail delivery. Instead of mailmen running to your house three times in one afternoon because you got three letters, they wait until the afternoon sorting is complete and deliver all three letters in a single, efficient trip.",
    examples: [
      {
        title: "Automatic Batching in React 18",
        code: `fetch('/api').then(() => { \n  setCount(c => c + 1); \n  setFlag(f => !f); \n  // React 18: Triggers ONLY ONE component re-render! \n});`,
        explanation: "Reduces paint bottlenecks by combining layout paints behind asynchronous boundaries."
      }
    ],
    visualizerType: "concurrent"
  },
  {
    id: 57,
    category: Category.Concurrent,
    question: "What is useTransition?",
    shortAnswer: "A React 18 hook to mark state updates as non-urgent, letting the UI stay responsive during expensive re-renders.",
    detailedAnswer: "useTransition is a React 18 hook that lets you mark some state updates as transitions. Transitions are non-urgent state updates. If they are interrupted by an urgent update (like typing in a text field), React will pause the rendering of the transition, process the urgent input, and resume the transition when finished.",
    visualExplanation: "Imagine you are explaining a story (rendering a heavy dashboard) when a fire alarm rings (user keystroke). Instead of ignoring the alarm to finish the story, you instantly pause, address the fire, and then resume the story where you left off.",
    examples: [
      {
        title: "useTransition Filtering List",
        code: `const [isPending, startTransition] = useTransition(); \nconst [filterText, setFilterText] = useState(''); \n\nconst handleChange = (e) => { \n  setFilterText(e.target.value); // Urgent \n  startTransition(() => { \n    setSearchQuery(e.target.value); // Non-urgent, heavy search \n  }); \n};`,
        explanation: "Keeps typing responsive while calculating list elements in the background."
      }
    ],
    visualizerType: "concurrent"
  },
  {
    id: 58,
    category: Category.Concurrent,
    question: "What is useDeferredValue?",
    shortAnswer: "Lets you defer re-rendering a non-urgent part of the UI based on a value, similar goal to useTransition but for values instead of updates.",
    detailedAnswer: "useDeferredValue accepts a value and returns a deferred version of that value. During urgent updates (like input typing), the deferred value lags behind, keeping its old value. Once urgent paints are done, React schedules a background render with the new deferred value, making heavy sub-components look snappy.",
    visualExplanation: "A shadow follower. If you run forward suddenly (typing fast), your shadow (deferred search list) waits momentarily on the path, catches up when you slow down and stop, preventing you from tripping over it.",
    examples: [
      {
        title: "Deferring Heavy Calculations",
        code: `const [query, setQuery] = useState(''); \nconst deferredQuery = useDeferredValue(query); \n\n// HeavyChart only updates when deferredQuery catches up \nreturn <HeavyChart query={deferredQuery} />;`,
        explanation: "Optimizes component updates when you do not control the child component state setters."
      }
    ],
    visualizerType: "concurrent"
  },
  {
    id: 59,
    category: Category.Concurrent,
    question: "What is concurrent rendering?",
    shortAnswer: "React 18's ability to interrupt, pause, or abandon a render in progress to prioritize more urgent updates.",
    detailedAnswer: "Historically, rendering in React was a single, uninterrupted synchronous transaction. Once rendering started, nothing could stop it until it completed. Concurrent rendering is a core architectural update that allows React to pause rendering midway to respond to high-priority browser events (like touch input), resuming or discarding the progress as needed.",
    visualExplanation: "A chef cooking. In old React, if they are chopping onions, they *must* finish chopping all 50 onions before answering a phone call. In concurrent React, they can pause immediately when the phone rings, answer the call, and then go back to chopping onions.",
    examples: [
      {
        title: "Concurrent UI Responsiveness",
        code: `// React 18 manages a prioritizing scheduler under the hood. \n// It assigns high priorities to physical clicks/types, and low priorities to lazy updates.`,
        explanation: "Enables multi-threaded-like rendering behavior within a single-threaded environment."
      }
    ],
    visualizerType: "concurrent"
  },
  {
    id: 60,
    category: Category.Concurrent,
    question: "What is the significance of strict mode?",
    shortAnswer: "Development-only tool that highlights potential problems (double-invokes some functions to surface side-effect bugs, warns on deprecated APIs).",
    detailedAnswer: "StrictMode is a development tool that does not render visible UI. It activates additional checks and warnings for its descendants. It helps developers find common bugs, warns against deprecated API usages, and intentionally double-invokes constructor and render functions to verify they are pure.",
    visualExplanation: "A strict drill instructor. They make you perform the exercises twice, shouting at you for bad posture or outdated styles. In actual combat (production), they are not there, but their harsh training ensures you run perfectly.",
    examples: [
      {
        title: "Enabling StrictMode",
        code: `import { StrictMode } from 'react'; \nimport { createRoot } from 'react-dom/client'; \n\ncreateRoot(document.getElementById('root')!).render( \n  <StrictMode> \n    <App /> \n  </StrictMode> \n);`,
        explanation: "Enforces strict React paradigms exclusively inside development environments."
      }
    ],
    visualizerType: "reconciliation"
  },
  {
    id: 61,
    category: Category.Concurrent,
    question: "Why does StrictMode double-invoke component functions/effects in dev?",
    shortAnswer: "To help surface impure logic or effects that aren't properly cleaned up, since they should be safe to run twice.",
    detailedAnswer: "React assumes render functions are pure, meaning they produce identical JSX given identical inputs and have no side effects. If a component modifies global variables during render, running it twice will multiply the modification, making the bug obvious. StrictMode double-invokes to make these subtle leaks loud and clear before deployment.",
    visualExplanation: "Testing a water valve. You turn it on and off twice in rapid succession. If it is high-quality and sealed properly, no water leaks out. If it is faulty, the double action immediately floods the testing tray, exposing the defect.",
    examples: [
      {
        title: "Impure Component caught by Double Render",
        code: `let rendersCount = 0; \n\nfunction ImpureComponent() { \n  rendersCount++; // ❌ Side-effect! Modifies global variable on render \n  return <p>{rendersCount}</p>; \n}`,
        explanation: "StrictMode renders this twice, making the count jump by 2, pointing to impure logic."
      }
    ],
    visualizerType: "reconciliation"
  },
  {
    id: 62,
    category: Category.CoreConcepts,
    question: "What is the significance of composition over inheritance in React?",
    shortAnswer: "React favors combining components via children/props (composition) rather than class inheritance for reuse and flexibility.",
    detailedAnswer: "In React, code reuse is accomplished via Composition (putting components inside one another or passing them as props) rather than Inheritance (subclassing components). Inheritance creates rigid, coupled hierarchies that are difficult to refactor, while composition provides high flexibility.",
    visualExplanation: "Composition is like Lego. If you want a police car, you don't grow/mutate a regular police officer into a car. You take basic blocks, snap on a siren block, snap on a wheel block, and you have a car. You can reuse the siren block anywhere else.",
    examples: [
      {
        title: "Composition Pattern",
        code: `function Dialog({ title, children }) { \n  return <div className="dialog-box"><h3>{title}</h3>{children}</div>; \n} \n\nfunction WelcomeDialog() { \n  return <Dialog title="Welcome">Welcome to our site!</Dialog>; \n}`,
        explanation: "Reuses generic layouts to assemble specific page elements."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 63,
    category: Category.StateAndProps,
    question: "What's the 'lifting state up' pattern?",
    shortAnswer: "Moving shared state to the closest common ancestor of components that need it, passing it down via props.",
    detailedAnswer: "In React, data flows one-way from top to bottom. If two sibling components need access to the same state, you cannot pass data directly sideways between them. Instead, you lift that state up to their closest common parent component, and pass the state and setter down as props.",
    visualExplanation: "If two roommates (siblings) want to share a key, they don't keep tossing it across the floor. They put the key on a hook in the common living room (parent). Both can grab and return it there safely.",
    examples: [
      {
        title: "Lifting State Example",
        code: `function Parent() { \n  const [text, setText] = useState(''); \n  return ( \n    <> \n      <Input value={text} onChange={setText} /> \n      <Viewer value={text} /> \n    </> \n  ); \n}`,
        explanation: "Parent coordinates the state, resolving data syncing issues between sibling components."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 64,
    category: Category.Hooks,
    question: "How do you share logic between components without duplicating code?",
    shortAnswer: "Custom hooks (for stateful logic) or composition/children (for UI structure).",
    detailedAnswer: "React separates logic reuse into two categories: UI structure and Stateful logic. For UI layouts (headers, grids, modals), use composition with children. For shared stateful behaviors (fetching, timers, window listeners), write Custom Hooks. Hooks consolidate active operations into singular, clean functions.",
    visualExplanation: "Use cookies cutters (composition) to reuse the shape of the treats. Use a standard recipe card (custom hooks) to reuse the mixing logic and oven settings without rewriting them.",
    examples: [
      {
        title: "Hook Composition",
        code: `// Stateful logic reusable via hooks \nconst isOnline = useOnlineStatus(); \nconst theme = useTheme(); \n\n// UI reusable via composition \nreturn <Container theme={theme}>{isOnline ? <Chat /> : <Offline />}</Container>;`,
        explanation: "Pairs visual frameworks with logical controllers without mixing concerns."
      }
    ],
    visualizerType: "reducer"
  },
  {
    id: 65,
    category: Category.StateAndProps,
    question: "What is the significance of forwardRef?",
    shortAnswer: "Allows a component to receive a ref and forward it to a child DOM element or component.",
    detailedAnswer: "By default, React components do not expose their internal DOM elements to parents. Passing a 'ref' to a custom component returns undefined or throws a warning. React.forwardRef allows a functional component to intercept a ref passed by its parent and hand it off directly to an internal HTML DOM node.",
    visualExplanation: "Passing a letter to a secure embassy. Standard mail gets blocked at the outer gate (component barrier). forwardRef is the security guard taking the letter and hand-delivering it directly to the ambassador's desk (internal input element).",
    examples: [
      {
        title: "Forwarding Input Ref",
        code: `import { forwardRef } from 'react'; \n\nconst CustomInput = forwardRef<HTMLInputElement, { label: string }>((props, ref) => { \n  return <label>{props.label}<input ref={ref} /></label>; \n});`,
        explanation: "Exposes the raw nested HTML node to parent components using standard ref binding."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 66,
    category: Category.StateAndProps,
    question: "What is useImperativeHandle?",
    shortAnswer: "Customizes what a parent gets when it accesses a forwarded ref, useful for exposing specific methods rather than the whole DOM node.",
    detailedAnswer: "useImperativeHandle is used alongside forwardRef. Instead of giving the parent component full, unrestricted access to the underlying DOM node (which breaks encapsulation and can allow bad modifications), useImperativeHandle lets you define a specific, safe object containing only approved functions for the parent to call.",
    visualExplanation: "Like renting a hotel room. Instead of handing the guest the master set of building keys (full DOM access), the receptionist hands them a digital card configured to only open their door and call the front desk (selective imperative handle).",
    examples: [
      {
        title: "Exposing Custom API via Ref",
        code: `useImperativeHandle(ref, () => ({ \n  focusAndSelect() { \n    inputRef.current?.focus(); \n    inputRef.current?.select(); \n  } \n}));`,
        explanation: "Limits parent operations to explicit method calls, protecting DOM boundaries."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 67,
    category: Category.BestPractices,
    question: "What's the difference between synchronous and asynchronous state updates in React events?",
    shortAnswer: "Inside React event handlers, updates are batched and applied asynchronously; outside (e.g. setTimeout, promises) behavior varies by React version.",
    detailedAnswer: "To prevent constant visual reflows, React state updates are scheduled asynchronously and batched. Reading state immediately after calling setState does not show the updated value because the render tick has not processed yet. In React 18, all updates are batched automatically inside and outside event callbacks.",
    visualExplanation: "Like sending a feedback form to a company. If you write 'Please change my username' on the form and immediately look at your user profile badge in your hand, it won't be updated yet. You have to wait for the office to receive and process the form.",
    examples: [
      {
        title: "Async State Pitfall",
        code: `const handleClick = () => { \n  setCount(count + 1); \n  console.log(count); // ❌ Logs the OLD value, not the incremented one! \n};`,
        explanation: "State updates are not instant; they are scheduled for the next rendering pass."
      }
    ],
    visualizerType: "debounce"
  },
  {
    id: 68,
    category: Category.BestPractices,
    question: "How do you debounce input typing in React?",
    shortAnswer: "Store raw input in state, and use a debounced value (via useEffect + setTimeout, or a custom useDebouncedValue hook) for the actual expensive operation (like an API call).",
    detailedAnswer: "Debouncing delays an expensive operation (e.g. API search) until the user stops typing for a specific timeframe. In React, you store the instant text in one state variable (for visual input feedback), and update a secondary 'debounced' state variable inside a useEffect hook that runs a timer, clearing the timer if the input changes before completion.",
    visualExplanation: "Like an elevator door. When you press the button, the elevator doesn't immediately close the doors and move. It waits 5 seconds. If someone else presses the button in between, the 5-second timer resets, waiting for complete silence.",
    examples: [
      {
        title: "Clean Debouncing Hook",
        code: `function useDebounce(value, delay) { \n  const [debounced, setDebounced] = useState(value); \n  useEffect(() => { \n    const handler = setTimeout(() => setDebounced(value), delay); \n    return () => clearTimeout(handler); // clears on typing! \n  }, [value, delay]); \n  return debounced; \n}`,
        explanation: "Prevents network flooding by collapsing hundreds of keystroke actions into single fetches."
      }
    ],
    visualizerType: "debounce"
  },
  {
    id: 69,
    category: Category.BestPractices,
    question: "What is the significance of keys changing (e.g. using key={Math.random()})",
    shortAnswer: "Forces React to unmount/remount the component entirely on every render — sometimes intentionally used to 'reset' a component's internal state.",
    detailedAnswer: "When a component's 'key' prop changes, React treats it as an entirely new component instance. It will unmount the old component instance, destroy all its internal state (including active timers, input fields, refs), and mount a fresh, brand-new component instance with clean initial state.",
    visualExplanation: "Like burning down a house and building a brand new house from scratch, rather than remodeling. If you assign a random number as a key on every render, you demolish and rebuild the house every single second, wiping out all furniture.",
    examples: [
      {
        title: "Intentionally Resetting a Form",
        code: `// Change key to current userId to force input boxes to clear state \n<ProfileForm key={selectedUserId} />`,
        explanation: "Changing key is a declarative way to wipe a component's state clean instantly."
      }
    ],
    visualizerType: "reconciliation"
  },
  {
    id: 70,
    category: Category.BestPractices,
    question: "What's a common cause of 'Can't perform a React state update on an unmounted component' warning?",
    shortAnswer: "An async operation (fetch, timer) resolves after the component unmounts and still tries to call its setState — fixed with cleanup (AbortController, clearTimeout, or an isMounted flag).",
    detailedAnswer: "This warning occurs when an asynchronous task (like a fetch or an interval) finishes after a user has navigated away from a page, causing the component to unmount. The callback then tries to write to local state on a destroyed node. To resolve this, return a cleanup function in useEffect to cancel the fetch (via AbortController) or clear timers.",
    visualExplanation: "Like ordering a package to a hotel room, then checking out and flying home. When the delivery driver knocks on the door 3 days later, they find a locked room and shout a warning because they can't hand you the box.",
    examples: [
      {
        title: "Aborting Network Fetch",
        code: `useEffect(() => { \n  const controller = new AbortController(); \n  fetch('/api', { signal: controller.signal }) \n    .then(r => r.json()).then(setData); \n  return () => controller.abort(); // cancels if unmounted! \n}, []);`,
        explanation: "Aborting resolves the warning and releases client memory immediately."
      }
    ],
    visualizerType: "debounce"
  },
  {
    id: 71,
    category: Category.Concurrent,
    question: "What is the significance of React.StrictMode for effects specifically in React 18?",
    shortAnswer: "It intentionally mounts, unmounts, and remounts components in dev to catch effects that don't clean up properly.",
    detailedAnswer: "In React 18 development, StrictMode intentionally mounts, unmounts, and mounts every component again on initial load. This simulates future React features where React might preserve state across mounts. It forces developers to write resilient, idempotent effects that clean up after themselves.",
    visualExplanation: "Like a flight simulator injecting a sudden heavy wind storm. It is making sure your autopilot system handles a quick drop and recovery securely, rather than crashing when unexpected conditions occur.",
    examples: [
      {
        title: "Correcting Double Trigger",
        code: `useEffect(() => { \n  // StrictMode will fire this on-off-on \n  connection.connect(); \n  return () => { \n    connection.disconnect(); // Must have cleanup! \n  }; \n}, []);`,
        explanation: "Without disconnect cleanup, StrictMode leaves behind dangling, duplicate socket channels."
      }
    ],
    visualizerType: "reconciliation"
  },
  {
    id: 72,
    category: Category.Hooks,
    question: "What's the difference between useEffect(() => {}, []) and putting logic directly in the component body?",
    shortAnswer: "Body-level code runs on every render synchronously during render (can cause issues like side effects during render); effects run after render is committed, appropriate for side effects.",
    detailedAnswer: "Code in the component body runs synchronously during the rendering phase. If you put side effects (like data fetches, logging, mutating window variables) there, it slows down rendering, triggers leaks, and violates React's pure-rendering rule. useEffect delays execution until *after* rendering is committed and painted on screen, keeping updates safe and asynchronous.",
    visualExplanation: "Body code is like unpacking suitcases in the middle of a runway while planes are trying to land (blocking layout). useEffect is moving the bags to the arrival terminal lounge once the plane has safely stopped.",
    examples: [
      {
        title: "Body vs Effect Placement",
        code: `function MyComponent() { \n  // ❌ BAD: Fetches during render! Runs on every single update. \n  fetch('/api/logs'); \n\n  // ✅ GOOD: Runs safely in the background after paint. \n  useEffect(() => { fetch('/api/logs'); }, []); \n}`,
        explanation: "Keeping the render body pure avoids memory leaks and screen flickering."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 73,
    category: Category.Performance,
    question: "What is memoization and why does it matter for React performance?",
    shortAnswer: "Caching a value/function so identical inputs don't trigger recomputation or unnecessary child re-renders.",
    detailedAnswer: "Memoization caches the output of an operation based on its input parameters. In React, it prevents wasting CPU cycles recalculating expensive data (via useMemo) and prevents breaking shallow-comparison optimizations (React.memo) in children due to fresh variable references (via useCallback).",
    visualExplanation: "Like keeping a cheat sheet of complex math calculations. Instead of working out 847 x 231 by hand every time, you write the result once, keep it in your pocket, and look it up instantly.",
    examples: [
      {
        title: "A Memoization Paradigm",
        code: `const memoizedData = useMemo(() => computeHeavyStats(rawProps), [rawProps]);`,
        explanation: "Ensures calculations are strictly bound to actual input data mutations."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 74,
    category: Category.Performance,
    question: "What's the difference between shallow and deep comparison in the context of React.memo?",
    shortAnswer: "Shallow compares references (are these the same object?); deep compares actual nested values — React.memo defaults to shallow, which is why new object literals as props defeat it.",
    detailedAnswer: "Shallow comparison checks if values are equal for primitives (like string, numbers) and checks if the *memory reference* is the same for objects. Deep comparison recurses through nested object keys to see if values match. Because deep comparison is very slow, React.memo defaults to shallow, meaning you must preserve object references using useMemo.",
    visualExplanation: "Shallow checks if the driver's license card itself is the exact same piece of plastic. Deep checks if the name, photo, address, and expiration match, checking every letter line-by-line.",
    examples: [
      {
        title: "Shallow vs Deep Equivalency",
        code: `const obj1 = { val: 1 }; \nconst obj2 = { val: 1 }; \n\n// Shallow check: obj1 === obj2 is FALSE! (Different memory references) \n// Deep check: obj1.val === obj2.val is TRUE!`,
        explanation: "React prefers shallow checks for performance, requiring stable pointers from hooks."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 75,
    category: Category.Architecture,
    question: "What is the 'children as a function' (render props) example use case?",
    shortAnswer: "A <DataProvider> that fetches data and calls children(data) so consumers decide how to render it.",
    detailedAnswer: "The 'children as a function' pattern is a specific type of render prop where the child of a component is a function rather than static JSX. This is used when a wrapper component manages state, and wants to supply that state dynamically to its children, letting the parent control the HTML skeleton.",
    visualExplanation: "A clean, empty theater. The theater manager sets up the lighting and handles ticket checks, then calls a guest director (children function) and says: 'Here are the actors and lights, direct whatever play you want.'",
    examples: [
      {
        title: "Children as Function Component",
        code: `function CurrentUser({ children }) { \n  const [user] = useState({ name: 'Alex' }); \n  return children(user); \n} \n\n// Usage: \n<CurrentUser> \n  {(user) => <h1>Hello, {user.name}!</h1>} \n</CurrentUser>`,
        explanation: "Allows nesting logical providers without creating complex prop structures."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 76,
    category: Category.Architecture,
    question: "What's the difference between React.Component and React.PureComponent?",
    shortAnswer: "PureComponent implements shouldComponentUpdate with shallow prop/state comparison automatically; Component always re-renders on parent re-render unless you implement it yourself.",
    detailedAnswer: "React.Component will re-render whenever its parent re-renders, regardless of whether its props or state have changed. React.PureComponent overrides 'shouldComponentUpdate' to execute a shallow comparison of current vs. next props and state, skipping render if nothing changed, reducing paint times.",
    visualExplanation: "React.Component is a hyper-active student who rewrites their entire essay every time the teacher asks for an update. PureComponent is a relaxed student who only rewrites if they see the assignment parameters actually shifted.",
    examples: [
      {
        title: "PureComponent and Component Layout",
        code: `class SmartCard extends React.PureComponent<{ title: string }> { \n  // Skips render() if title is unchanged \n}`,
        explanation: "Saves client rendering overhead in legacy class-based applications."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 77,
    category: Category.BestPractices,
    question: "What's a common React anti-pattern with useEffect and data fetching that newer patterns try to solve?",
    shortAnswer: "Fetching directly in useEffect without cancellation/race-condition handling — libraries like React Query solve this with built-in caching, retries, and cancellation.",
    detailedAnswer: "Writing fetches in useEffect is prone to bugs. If you fetch user A, and then user B, but user A's network request is slow and resolves *after* user B, user A's data will overwrite user B (a race condition). It also lacks native caching, causing redundant requests when navigating back and forth.",
    visualExplanation: "Like sending letters to a supplier. If you send letter 1, then change your mind and send letter 2, but letter 1 gets delayed in the snow and arrives last, the supplier will fulfill letter 1, giving you the wrong product.",
    examples: [
      {
        title: "Race Condition in effect",
        code: `// ❌ Buggy: overlaps on rapid navigation \nuseEffect(() => { \n  fetch(\`/user/\${id}\`).then(r => r.json()).then(setData); \n}, [id]);`,
        explanation: "Fails to clean up or ignore slow requests, causing wrong state overrides."
      }
    ],
    visualizerType: "debounce"
  },
  {
    id: 78,
    category: Category.BestPractices,
    question: "What is React Query / TanStack Query used for?",
    shortAnswer: "Managing server state (fetching, caching, syncing, background refetching) separately from client UI state, reducing manual useEffect fetch boilerplate.",
    detailedAnswer: "React Query manages 'Server State' (data owned by the backend). It treats fetches as cached resources. It handles loading states, automatic background synchronization, failure retries, request deduplication, and automatic stale-while-revalidate caching, removing 95% of manual data-fetching code.",
    visualExplanation: "Like having a personal smart personal butler. Instead of you running to the supermarket (fetch) every time you want milk, the butler keeps a fresh bottle in the fridge (cache) and dynamically restocks it when you aren't looking.",
    examples: [
      {
        title: "Querying with TanStack Query",
        code: `// Elegant client code \nconst { data, isLoading, error } = useQuery({ \n  queryKey: ['user', id], \n  queryFn: () => fetchUser(id) \n});`,
        explanation: "Eliminates useEffect, AbortController, and custom state flags completely."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 79,
    category: Category.BestPractices,
    question: "What's the difference between client state and server state?",
    shortAnswer: "Client state is local UI state (form input, toggle); server state is data owned by a backend that can go stale and needs syncing/caching strategies.",
    detailedAnswer: "Client state is synchronous and fully owned by the browser (like an open modal, a typed input, or a dark-theme flag). Server state is asynchronous, owned remotely (stored in a SQL database), and can be modified by other users, meaning it goes stale and requires synchronization strategies.",
    visualExplanation: "Client state is your current shopping cart checklist. Server state is the actual product stock in the warehouse. Your checklist is instant, but the warehouse stock shifts asynchronously as other people buy items.",
    examples: [
      {
        title: "Client vs Server States",
        code: `// Client State: immediate, local \nconst [isMenuOpen, setIsMenuOpen] = useState(false); \n\n// Server State: remote, async \nconst { data: posts } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });`,
        explanation: "Distinctly categorizing states prevents syncing bugs and bloated codebases."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 80,
    category: Category.Hooks,
    question: "What is the significance of the useId hook (React 18)?",
    shortAnswer: "Generates stable unique IDs for accessibility attributes (like linking a label to an input) that are consistent between server and client rendering.",
    detailedAnswer: "When using Server-Side Rendering, HTML is compiled on the server and hydrated on the client. If you generate dynamic IDs via Math.random(), the server-rendered ID will differ from the client's hydrated ID, causing rendering mismatches. useId generates stable, unique IDs that match perfectly on both sides.",
    visualExplanation: "Like assigning seat tickets in a theatre. If the ticket printer assigns random numbers separately to the usher and the audience, seats won't match, causing arguments. useId is a shared, synchronized booking system.",
    examples: [
      {
        title: "Accessibility Binding with useId",
        code: `import { useId } from 'react'; \n\nfunction AccessibleInput() { \n  const id = useId(); \n  return ( \n    <> \n      <label htmlFor={id}>Email:</label> \n      <input id={id} type="email" /> \n    </> \n  ); \n}`,
        explanation: "Yields a stable, unique ID string for aria and input bindings safely."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 81,
    category: Category.Performance,
    question: "What's a common reason to avoid inline function definitions in JSX for performance-critical lists?",
    shortAnswer: "Each render creates a new function reference, which can defeat memoization on child components receiving that function as a prop.",
    detailedAnswer: "Writing an inline function `<Button onClick={() => doSomething()} />` creates a new function object on every single render. If this Button is a memoized component (React.memo), it will see a different prop reference and re-render anyway, completely wasting the React.memo optimization.",
    visualExplanation: "Handing the child component a newly signed paper contract every 2 seconds. The child component looks at the new signature, gets nervous, and triggers an update because they don't realize the contract text inside is identical.",
    examples: [
      {
        title: "Inline Function vs Stable Callback",
        code: `// ❌ BAD: Defeats memo in child \n<ChildItem onClick={() => handleClick(id)} /> \n\n// ✅ GOOD: Use useCallback or handle inside child \nconst onClick = useCallback((id) => handle(id), []); \n<ChildItem onClick={onClick} id={id} />`,
        explanation: "Stable parameters permit optimal rendering checks on heavy lists."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 82,
    category: Category.Performance,
    question: "What is the significance of the flushSync API?",
    shortAnswer: "Forces React to apply a state update and re-render synchronously, bypassing batching — used rarely, for cases needing immediate DOM updates.",
    detailedAnswer: "flushSync forces React to immediately apply a state update and update the DOM synchronously on the spot. This overrides React 18's automatic batching and concurrent scheduler. It is useful in rare scenarios, like ensuring the DOM is updated before letting a third-party library measure it.",
    visualExplanation: "A VIP skip-the-line pass at an amusement park. If you have an absolute emergency and need a ride immediately, you flash the pass (flushSync) to bypass standard queuing (batching) and ride on the spot.",
    examples: [
      {
        title: "Immediate DOM update with flushSync",
        code: `import { flushSync } from 'react-dom'; \n\nconst updateAndScroll = () => { \n  flushSync(() => { \n    setMessages([...messages, newMsg]); \n  }); \n  // DOM updated! Safe to scroll instantly \n  listRef.current.scrollTop = listRef.current.scrollHeight; \n};`,
        explanation: "Forces state synchronization in place to support precise DOM calculations."
      }
    ],
    visualizerType: "concurrent"
  },
  {
    id: 83,
    category: Category.Performance,
    question: "How would you test whether a component re-renders unnecessarily?",
    shortAnswer: "Add a console.log in the component body, or use React DevTools Profiler to record and inspect render counts/reasons.",
    detailedAnswer: "Unnecessary re-renders are identified by placing debug logs in render paths or using the React Developer Tools 'Profiler' tab. The Profiler lets you record an interaction and color-codes components that re-rendered, displaying the exact reason (e.g. 'Props changed: onClick').",
    visualExplanation: "Placing a ringing bell on a door. Every time someone touches or re-arranges the door (renders), the bell rings. If you hear the bell ringing when no one is actually walking through the doorway, you have a design leak.",
    examples: [
      {
        title: "Simple Profiling Render Logger",
        code: `function HeavyCard({ name }) { \n  console.count('HeavyCard Rendered!'); \n  return <div>{name}</div>; \n}`,
        explanation: "Tracks total prints in console to flag redundant parent updates."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 84,
    category: Category.BestPractices,
    question: "What is the significance of the 'single source of truth' principle in React state?",
    shortAnswer: "Avoids the same piece of data existing in multiple places that can drift out of sync — derive values instead of duplicating state.",
    detailedAnswer: "In React, you should avoid copying props into state or duplicating state variables. If a piece of data is needed by multiple components, store it in a single common ancestor. If a value can be computed from another state variable (like list length), calculate it on the fly during render instead of storing it in a separate state variable.",
    visualExplanation: "If you have two clocks in your house, and you set them manually, they will slowly drift apart. If you look at a single central grandfather clock (the single source of truth), everyone in the house is perfectly synchronized.",
    examples: [
      {
        title: "Duplicated vs Derived State",
        code: `// ❌ BAD: Storing derived total in state \nconst [items] = useState([]); \nconst [total, setTotal] = useState(0); // can drift! \n\n// ✅ GOOD: Compute derived total during render \nconst [items] = useState([]); \nconst total = items.reduce((sum, item) => sum + item.price, 0);`,
        explanation: "Derived calculation guarantees the total is always synchronized with items."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 85,
    category: Category.BestPractices,
    question: "What's an example of state that should be derived rather than stored?",
    shortAnswer: "A cart's total price — compute it from items array rather than storing a separate total state that could get out of sync.",
    detailedAnswer: "Any value that can be computed from existing props or state should not be stored in a component's state. Examples include: calculating an array's length, filtering a list of users based on search text, finding the selected item from an array using an ID, or converting a string to uppercase.",
    visualExplanation: "Imagine storing the 'Word Count' of a blog article as a separate database field that you have to manually update every time you press a key. It's much safer to just run `.split(' ').length` on the text when reading it.",
    examples: [
      {
        title: "Deriving Filtered Items",
        code: `const [items] = useState<string[]>([]); \nconst [search, setSearch] = useState(''); \n\n// Compute list during render - fast and bug-free! \nconst filteredItems = items.filter(i => i.includes(search));`,
        explanation: "Eliminates state syncing boilerplate and avoids visual synchronization delays."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 86,
    category: Category.BestPractices,
    question: "What is the significance of key when conditionally rendering different components in the same slot?",
    shortAnswer: "Forces remount instead of update when you want a full reset of internal state (e.g. switching between two different form components).",
    detailedAnswer: "If you render different components in the same slot conditionally, React's reconciliation might see that the DOM element position matches and try to reuse the node or its child states if they share structural tags. Giving them unique keys explicitly forces React to unmount the old component and build the new one clean.",
    visualExplanation: "Swapping teachers in a classroom. If the substitute sits in the same chair at the same desk, students might treat them exactly like the old teacher and use the same habits. Putting a giant 'NEW CLASS' sign on the door resets the environment.",
    examples: [
      {
        title: "Forcing state reset with keys",
        code: `// Key guarantees inputs are completely rebuilt with fresh state \n{isAdmin ? <Form key="admin" type="admin" /> : <Form key="user" type="user" />}`,
        explanation: "Differentiates identical components in the same layout slot."
      }
    ],
    visualizerType: "reconciliation"
  },
  {
    id: 87,
    category: Category.BestPractices,
    question: "What's the risk of storing a function or JSX element directly in state?",
    shortAnswer: "Usually a sign state shouldn't hold it — functions/JSX in state can cause serialization issues and usually indicate a design smell.",
    detailedAnswer: "React state is meant to hold pure, serializable data representing raw information (strings, numbers, arrays, JSON). Storing functions, class instances, or fully-formed JSX elements directly in state breaks visual separation of concerns, causes state synchronization leaks, and can lead to bugs where old variables are bound to closures.",
    visualExplanation: "Storing a baked cake inside a flour bin. The bin is meant to hold clean, raw ingredients (state data). Putting fully baked assets inside it ruins the ingredients and makes it hard to bake anything else.",
    examples: [
      {
        title: "Data vs JSX State",
        code: `// ❌ BAD: Storing component in state \nconst [content, setContent] = useState(<p>Initial</p>); \n\n// ✅ GOOD: Store state as identifier, render JSX dynamically \nconst [status, setStatus] = useState('initial'); \nconst renderContent = () => status === 'initial' ? <p>Initial</p> : <p>Done</p>;`,
        explanation: "Separates logic representation from the visual markup parser."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 88,
    category: Category.BestPractices,
    question: "What is the significance of colocating state close to where it's used?",
    shortAnswer: "Reduces unnecessary re-renders of unrelated components and keeps logic easier to reason about — lift state up only as far as necessary.",
    detailedAnswer: "Colocation means keeping state as close to where it is used as possible. If only a small dropdown widget needs to track if it is open or closed, that state should live inside the dropdown itself, not in the global App state. This prevents parent component updates from triggering full-app re-renders.",
    visualExplanation: "If you want to keep track of your active pen, you keep it in your shirt pocket (local state). Putting your pen in a global town hall cabinet across the street means you have to walk back and forth every time you want to write a letter.",
    examples: [
      {
        title: "Colocating Toggle State",
        code: `// Only Sidebar re-renders when toggled, leaving App untouched \nfunction Sidebar() { \n  const [isOpen, setIsOpen] = useState(false); \n  return <aside className={isOpen ? 'w-64' : 'w-16'} />; \n}`,
        explanation: "Isolates component updates to maintain high visual framerates."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 89,
    category: Category.BestPractices,
    question: "What's the difference between onClick={handleClick} and onClick={() => handleClick()}?",
    shortAnswer: "Former passes the function reference directly (stable); latter creates a new function on every render (can affect memoization) but lets you pass extra arguments.",
    detailedAnswer: "onClick={handleClick} passes the stable reference of 'handleClick' directly to the listener. onClick={() => handleClick()} declares a new anonymous function wrapper on every render. While acceptable for standard button clicks, the inline wrapper creates a new reference on each render, which can trigger child re-renders if passed as props.",
    visualExplanation: "Handing someone a permanent wooden key (stable reference) versus handing them a new, freshly drawn paper drawing of a key (anonymous function) every single render.",
    examples: [
      {
        title: "Event Binding Syntax",
        code: `// Passes reference (reuses function) \n<button onClick={handleClick}>Click</button> \n\n// Creates closure wrapper (useful for arguments) \n<button onClick={() => handleClick(id)}>Click</button>`,
        explanation: "Direct passing is more memory-friendly; closures are convenient for lists."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 90,
    category: Category.Hooks,
    question: "What is the significance of useSyncExternalStore?",
    shortAnswer: "A React 18 hook for safely subscribing to external stores (like third-party state managers) in a way that's compatible with concurrent rendering.",
    detailedAnswer: "In React 18's concurrent rendering, rendering can be paused and resumed. If an external store (like Redux, Zustand, or a browser API) changes *while* React is in the middle of a deferred render, different parts of the UI could render using different state snapshots, a bug called 'tearing'. useSyncExternalStore prevents tearing by forcing synchronous updates for that store.",
    visualExplanation: "A choir singing. If the conductor (React) is slowing down or pausing sections, and the song sheet (external store) is suddenly edited mid-verse, some singers will sing old words and others new ones. useSyncExternalStore keeps everyone on the exact same syllable.",
    examples: [
      {
        title: "Subscribing to Browser Online Status",
        code: `import { useSyncExternalStore } from 'react'; \n\nfunction useOnline() { \n  return useSyncExternalStore( \n    (callback) => { \n      window.addEventListener('online', callback); \n      window.addEventListener('offline', callback); \n      return () => { \n        window.removeEventListener('online', callback); \n        window.removeEventListener('offline', callback); \n      }; \n    }, \n    () => navigator.onLine \n  ); \n}`,
        explanation: "Safely reads client state without triggers causing render tearing."
      }
    ],
    visualizerType: "reducer"
  },
  {
    id: 91,
    category: Category.CoreConcepts,
    question: "What's the purpose of the key prop warning when rendering lists without one?",
    shortAnswer: "Without keys, React falls back to index-based diffing, which can cause incorrect reuse/state bugs, especially with reorderable lists.",
    detailedAnswer: "If you omit keys, React does not know which DOM nodes match which items in your array. It prints a console warning because it is falling back to index-based reconciliation. If you add or remove items, React will reuse DOM nodes in order and change their text, which leads to inputs, transitions, or state mismatch bugs.",
    visualExplanation: "Like having a row of safety deposit boxes. If you don't assign box numbers, the bank manager assumes box 1 is the first person in line. If the first person leaves, they shift box 2's cash into box 1, causing a massive security error.",
    examples: [
      {
        title: "Missing Key Warning",
        code: `// Triggers: 'Warning: Each child in a list should have a unique key' \n{items.map(item => <li>{item.title}</li>)}`,
        explanation: "Always resolve this warning by adding a unique identifier to the outermost tag."
      }
    ],
    visualizerType: "keys"
  },
  {
    id: 92,
    category: Category.BestPractices,
    question: "How do you conditionally render JSX cleanly?",
    shortAnswer: "Ternary for two options, && for show/hide (careful with falsy numbers like 0 rendering), or early returns for larger blocks.",
    detailedAnswer: "For simple show/hide conditions, use the logical AND `&&` operator. For if-else cases, use a ternary operator. For complex, multi-branch conditional layouts, use early returns in your function component, or delegate the logic to helper functions to keep the main JSX return clean and readable.",
    visualExplanation: "Like a routing sign in a museum. If you are a member, take the left door (ternary). If you have a bag, pass it through the scanner (&&). If the museum is closed, stop at the front doors and go home immediately (early return).",
    examples: [
      {
        title: "Conditional Rendering Best Practices",
        code: `// 1. Early return \nif (isLoading) return <Spinner />; \n\n// 2. Ternary \nreturn <div>{isLoggedIn ? <Profile /> : <LoginForm />}</div>;`,
        explanation: "Keeps component layouts clean and prevents visual bugs."
      }
    ],
    visualizerType: "reconciliation"
  },
  {
    id: 93,
    category: Category.BestPractices,
    question: "What's a subtle bug with {count && <Component />} when count can be 0?",
    shortAnswer: "Renders the literal 0 instead of nothing, since 0 is falsy but not undefined/null — use count > 0 && ... or a ternary instead.",
    detailedAnswer: "In JavaScript, the `&&` operator returns the first falsy operand. If `count` is 0, the expression evaluates to `0`. Since React treats numbers as valid renderable content, it will render the literal character `0` inside your HTML page instead of rendering nothing. To prevent this, always use comparison operators.",
    visualExplanation: "It's like expecting a doorway to stay empty because no one is walking through, but instead, a giant '0' cardboard cutout gets placed in the doorframe because someone counted exactly zero guests.",
    examples: [
      {
        title: "The Zero Render Bug",
        code: `// ❌ BUG: prints '0' on screen if count is 0 \n<div>{count && <CartBadge />}</div> \n\n// ✅ FIX: coerce to boolean or use comparison \n<div>{count > 0 && <CartBadge />}</div> \n<div>{Boolean(count) && <CartBadge />}</div>`,
        explanation: "Using numeric checks prevents unexpected digits from cluttering layouts."
      }
    ],
    visualizerType: "reconciliation"
  },
  {
    id: 94,
    category: Category.BestPractices,
    question: "What is the significance of the 'composition' pattern for a Modal component?",
    shortAnswer: "Passing children lets the modal be content-agnostic — the modal handles overlay/focus/escape, while the caller controls what's inside.",
    detailedAnswer: "Instead of configuring a Modal by passing 20 separate props like `title`, `bodyText`, `showButton`, and `buttonColor`, you design the Modal as a wrapper that accepts `children`. The Modal encapsulates complex structural concerns (like background overlays, locking page scroll, trapping focus, and listening for Escape), while letting the caller pass any custom layout inside.",
    visualExplanation: "Think of an elevator. The elevator handles the shaft, cables, doors, safety brakes, and weight checks (modal behavior). It doesn't care if it is carrying a group of businesspeople, a bicycle, or a sofa (modal children).",
    examples: [
      {
        title: "Composite Modal Implementation",
        code: `function Modal({ isOpen, onClose, children }) { \n  if (!isOpen) return null; \n  return ( \n    <div className="overlay" onClick={onClose}> \n      <div className="content" onClick={e => e.stopPropagation()}> \n        {children} \n      </div> \n    </div> \n  ); \n}`,
        explanation: "Modal handles container constraints; caller handles details."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 95,
    category: Category.CoreConcepts,
    question: "What's the difference between React.createElement and JSX?",
    shortAnswer: "JSX is syntactic sugar that compiles down to React.createElement(type, props, children) calls.",
    detailedAnswer: "JSX is a developer-facing visual abstraction. Under the hood, compilers parse JSX and replace every tag with a call to `React.createElement` (or direct dynamic element creations). React.createElement is a standard JavaScript function that returns a lightweight object representation of the node (a React element).",
    visualExplanation: "JSX is like writing musical notes on sheet paper. React.createElement is the physical keystroke on the piano keys that produces the sound wave object. Sheet music is much easier for humans to read than coordinates of piano strings.",
    examples: [
      {
        title: "Equivalent Compilation",
        code: `// 1. Written in JSX: \nconst node = <div className="card">Hello</div>; \n\n// 2. Transpiled JavaScript: \nconst node = React.createElement('div', { className: 'card' }, 'Hello');`,
        explanation: "JSX is just a visual utility that expands to standard JavaScript function calls."
      }
    ],
    visualizerType: "vdom"
  },
  {
    id: 96,
    category: Category.CoreConcepts,
    question: "What is the significance of the automatic JSX runtime (React 17+)?",
    shortAnswer: "No longer need to import React in every file just to use JSX, since the compiler injects the necessary import automatically.",
    detailedAnswer: "In React 17 and later, compilers (like Babel 7.9.0 and SWC) work alongside React to introduce a new entry point. Instead of compiling JSX into `React.createElement` (which requires importing `React` at the top of every file), it compiles to imports from the runtime package `react/jsx-runtime`, importing the creator function automatically.",
    visualExplanation: "Like having a smart notepad that automatically supplies a pen. You don't have to carry a pen (import React) to every desk you sit at anymore; the notepad detects you are about to write and places a pen in your hand.",
    examples: [
      {
        title: "Modern Compilation Output",
        code: `// Input (No React import): \nconst App = () => <h1>Hello</h1>; \n\n// Output (Auto-injected compiler code): \nimport { jsx as _jsx } from 'react/jsx-runtime'; \nconst App = () => _jsx('h1', { children: 'Hello' });`,
        explanation: "Reduces bundle file sizes and eliminates redundant top-level imports."
      }
    ],
    visualizerType: "vdom"
  },
  {
    id: 97,
    category: Category.BestPractices,
    question: "What's a common cause of infinite re-render loops?",
    shortAnswer: "Calling a state setter unconditionally in the component body (not inside an effect/handler), or missing/incorrect dependency array causing an effect to always re-trigger its own dependency.",
    detailedAnswer: "An infinite re-render occurs when React triggers a render, and that render immediately schedules another render unconditionally, over and over. Common causes: 1. Calling setState directly in the component rendering body. 2. Running an effect that calls setState, but listing that state variable in the effect's own dependency array, triggering it in a circle.",
    visualExplanation: "Like looking at your phone screen, and taking a picture of the screen, which displays the camera app, which displays the picture. It creates an endless mirror tunnel that instantly crashes your system.",
    examples: [
      {
        title: "Infinite Loop Trap",
        code: `// ❌ INFINITE LOOP: body call \nfunction Loop() { \n  const [val, setVal] = useState(0); \n  setVal(val + 1); // Triggers re-render immediately, crashes! \n}`,
        explanation: "Unconditional state setting in render loops indefinitely."
      }
    ],
    visualizerType: "lifecycle"
  },
  {
    id: 98,
    category: Category.BestPractices,
    question: "What is the significance of testing components by behavior rather than implementation?",
    shortAnswer: "Makes tests resilient to refactors — testing what the user sees/does (via React Testing Library) rather than internal state/methods.",
    detailedAnswer: "Testing implementation details (like asserting on internal state names, or checking class method names) makes tests extremely fragile. If you rename a variable, the test fails even if the component works perfectly. Testing behavior (asserting that clicking a button displays a text block) is robust because it mirrors what the user actually experiences, allowing safe refactors.",
    visualExplanation: "If you are testing a toaster, you don't stick a voltage probe on the internal heating element wires. You put a slice of bread in, press the lever down, and check if you get golden toast after 2 minutes.",
    examples: [
      {
        title: "Behavioral Test Example",
        code: `// Testing with React Testing Library \ntest('clicks toggle', async () => { \n  render(<Toggle />); \n  const btn = screen.getByRole('button', { name: /toggle/i }); \n  await userEvent.click(btn); \n  expect(screen.getByText(/visible content/i)).toBeInTheDocument(); \n});`,
        explanation: "Tests what is rendered on screen, completely independent of internal hooks or names."
      }
    ],
    visualizerType: "ssr"
  },
  {
    id: 99,
    category: Category.BestPractices,
    question: "How would you share a WebSocket connection across multiple components?",
    shortAnswer: "A context provider wrapping the connection, or a custom hook backed by a singleton connection instance, so components subscribe without each opening their own socket.",
    detailedAnswer: "To share a singular WebSocket connection, instantiate the connection inside a Context Provider (or as a singleton class file), and export a custom hook `useSocket()`. This allows sibling components to register listeners or dispatch payloads through the exact same socket connection, preventing redundant sockets from overloading servers.",
    visualExplanation: "Like building a single telephone line to a house. Instead of every family member digging their own trenches and running private wires to the telephone tower, everyone uses the shared living room phone line.",
    examples: [
      {
        title: "WebSocket Provider",
        code: `const SocketContext = createContext<WebSocket | null>(null); \n\nexport function SocketProvider({ children }) { \n  const [socket, setSocket] = useState<WebSocket | null>(null); \n  useEffect(() => { \n    const ws = new WebSocket('wss://api.com'); \n    setSocket(ws); \n    return () => ws.close(); \n  }, []); \n  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>; \n}`,
        explanation: "Initializes a singleton socket channel and manages its lifecycle safely."
      }
    ],
    visualizerType: "dataflow"
  },
  {
    id: 100,
    category: Category.CoreConcepts,
    question: "What is the significance of 'thinking in React' (component decomposition)?",
    shortAnswer: "Breaking a UI mock into a component hierarchy based on single-responsibility before writing code, then working out where state should live within that hierarchy.",
    detailedAnswer: "Thinking in React is the process of breaking down a graphic design mockup into a nested tree of small, single-responsibility components. You define the minimal state representation, identify which components require that state, and find their closest common ancestor to locate the 'lifting state' boundaries.",
    visualExplanation: "Like building a car. You don't forge the entire vehicle as a single giant steel block. You sketch out the engine, the doors, the dashboard gauges, and the wheels separately, define how they fit together, and run wire channels between them.",
    examples: [
      {
        title: "Decomposition sketch",
        code: `// - App (holds state: filterText) \n//   - SearchBar (props: filterText, onChange) \n//   - ProductTable (props: items, filterText) \n//     - ProductRow (props: item)`,
        explanation: "Planning component hierarchies prevents state pollution and promotes logic reuse."
      }
    ],
    visualizerType: "dataflow"
  }
];
