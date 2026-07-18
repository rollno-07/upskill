export interface Question {
  id: number;
  question: string;
  answer: string;
  category: 'Fundamentals' | 'Redux Toolkit' | 'Async & Middleware' | 'Performance & State' | 'React Integration' | 'Testing & Debugging';
  latex: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  example: string;
  conceptKey: 'redux-flow' | 'immer' | 'selectors' | 'normalization' | 'thunk-saga' | 'optimistic' | 'middleware-chain' | 'rtkq' | 'render-profiler' | 'boilerplate';
}

export const questions: Question[] = [
  {
    id: 1,
    category: 'Fundamentals',
    question: 'What is Redux?',
    answer: 'Redux is a predictable, state-containment library for JavaScript applications. It centralizes your application\'s state and logic in a single global store, ensuring that state transitions are predictable and trackable because changes are made only by dispatching actions through pure functions called reducers.',
    latex: 'S_{t+1} = R(S_t, A_t)',
    difficulty: 'Beginner',
    example: `// Core Redux state update equation
const reducer = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'counter/incremented':
      return { ...state, value: state.value + 1 };
    default:
      return state;
  }
}`,
    conceptKey: 'redux-flow'
  },
  {
    id: 2,
    category: 'Fundamentals',
    question: 'What are Redux\'s three core principles?',
    answer: '1. **Single Source of Truth**: The global state of your application is stored in an object tree within a single store.\\n2. **State is Read-Only**: The only way to change the state is to emit an action, an object describing what happened.\\n3. **Changes are Made with Pure Functions**: To specify how the state tree is transformed by actions, you write pure reducers.',
    latex: '\\mathcal{S} \\in \\mathbf{SingleStore} \\quad \\Delta S = R(S, A)',
    difficulty: 'Beginner',
    example: `// Principle 2 & 3: Read-only state + Pure function
const state = Object.freeze({ count: 5 }); // Read-only representation
const nextState = reducer(state, { type: 'INCREMENT' }); // Pure reducer returns new state`,
    conceptKey: 'redux-flow'
  },
  {
    id: 3,
    category: 'Fundamentals',
    question: 'What is an action?',
    answer: 'An action is a plain JavaScript object that represents an intention to change the state. Actions are the only way to send data from your application to the Redux store. They must have a `type` property (typically a string) that indicates the type of action being performed, and can optionally carry a `payload` of additional data.',
    latex: 'A \\in \\mathbf{Actions} \\equiv \\{ type: \\text{string}, payload?: T \\}',
    difficulty: 'Beginner',
    example: `// Example of a structured Redux Action
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: {
    id: 1,
    text: 'Learn Redux Architecture'
  }
};`,
    conceptKey: 'redux-flow'
  },
  {
    id: 4,
    category: 'Fundamentals',
    question: 'What is a reducer?',
    answer: 'A reducer is a pure function that takes the current state and an action as arguments, and returns a new state. It is named after the reduce operation in functional programming because it reduces a stream of actions down to a single state over time. It must be synchronous and free of side effects.',
    latex: 'R: (S, A) \\rightarrow S \\quad \\text{where } R(S, A) \\text{ is pure}',
    difficulty: 'Beginner',
    example: `// Reducer signature: (State, Action) => NewState
function todoReducer(state = [], action) {
  if (action.type === 'ADD_TODO') {
    return [...state, action.payload]; // Returns a brand new array reference
  }
  return state;
}`,
    conceptKey: 'redux-flow'
  },
  {
    id: 5,
    category: 'Fundamentals',
    question: 'Why must reducers be pure?',
    answer: 'Reducers must be pure to ensure predictability, enable time-travel debugging, and prevent rendering bugs. Pure functions have **no side effects** and **always return the exact same output for the same inputs**. Furthermore, React-Redux relies on reference comparison (`===`) to determine if data changed; mutating state in-place breaks this check and halts UI re-renders.',
    latex: 'f(x) \\text{ pure } \\implies \\text{No mutations, } x \\text{ unchanged}',
    difficulty: 'Beginner',
    example: `// ❌ IMPURE (MUTATING)
function badReducer(state) {
  state.todos.push({ text: 'No' }); // Breaks React change detection
  return state;
}

// ✅ PURE (IMMUTABLE)
function goodReducer(state) {
  return { ...state, todos: [...state.todos, { text: 'Yes' }] };
}`,
    conceptKey: 'redux-flow'
  },
  {
    id: 6,
    category: 'Fundamentals',
    question: 'What is the store?',
    answer: 'The Redux store is the centralized object that holds your application state tree. It is created by passing a reducer to the state configuration. The store provides vital methods: `getState()` to retrieve current state, `dispatch(action)` to update state, `subscribe(listener)` to react to state changes, and key middleware integration hooks.',
    latex: '\\mathbf{Store} = \\{ getState, dispatch, subscribe \\}',
    difficulty: 'Beginner',
    example: `// Creating a store (Classic API) and dispatching
import { createStore } from 'redux';
const store = createStore(counterReducer);

console.log(store.getState()); // { value: 0 }
store.dispatch({ type: 'counter/incremented' });`,
    conceptKey: 'redux-flow'
  },
  {
    id: 7,
    category: 'Fundamentals',
    question: 'What is dispatch?',
    answer: '`dispatch` is a method provided by the Redux store. It is the **only way** to trigger a state change in Redux. When you call `store.dispatch(action)`, the store runs the root reducer function with the current state and the dispatched action, updates its internal state reference, and notifies all active UI subscribers.',
    latex: '\\text{dispatch}(A) \\implies S_{t+1} = R(S_t, A)',
    difficulty: 'Beginner',
    example: `// Dispatching an Action Creator result
const increment = () => ({ type: 'INCREMENT' });
store.dispatch(increment()); // Dispatches { type: 'INCREMENT' }`,
    conceptKey: 'redux-flow'
  },
  {
    id: 8,
    category: 'Redux Toolkit',
    question: 'What problem does Redux Toolkit (RTK) solve?',
    answer: 'Redux Toolkit was created to address three common complaints about classic Redux: \\n1. "Configuring a Redux store is too complicated."\\n2. "I have to add a lot of packages to get Redux to do anything useful."\\n3. "Redux requires too much boilerplate code."\\nIt simplifies setups, automates immer integration, and standardizes async calls.',
    latex: '\\text{RTK} \\implies \\text{Standardization} - \\text{Boilerplate}',
    difficulty: 'Beginner',
    example: `// Classic boilerplate vs RTK
// Classic requires Action Types, Action Creators, and a custom Switch Reducer.
// RTK replaces all three with a single call to createSlice!`,
    conceptKey: 'boilerplate'
  },
  {
    id: 9,
    category: 'Redux Toolkit',
    question: 'What is createSlice?',
    answer: '`createSlice` is the cornerstone of Redux Toolkit. It accepts an initial state, an object of reducer functions, and a "slice name". It **automatically generates** corresponding action creators and action types for you, while internally integrating Immer so you can write simpler state mutations safely.',
    latex: '\\text{createSlice}(M) \\rightarrow \\{ actions, reducer, name \\}',
    difficulty: 'Beginner',
    example: `import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // Safe mutation thanks to Immer!
    }
  }
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;`,
    conceptKey: 'immer'
  },
  {
    id: 10,
    category: 'Performance & State',
    question: 'What is Immer and how does RTK use it?',
    answer: 'Immer is a tiny package that lets you write mutable-style code (`state.value = 42`) inside Redux Toolkit reducers. Immer works by creating a temporary "Draft State" proxy of your actual state. As you "mutate" this draft, Immer tracks changes and generates a brand-new, perfectly immutable state object behind the scenes.',
    latex: '\\text{Immer}(\\text{State}) \\rightarrow \\text{Proxy(Draft)} \\rightarrow \\text{New State}',
    difficulty: 'Intermediate',
    example: `// Under the hood of RTK reducers
import { produce } from 'immer';

const baseState = [{ todo: 'Learn Redux' }];
const nextState = produce(baseState, draft => {
  draft[0].todo = 'Master RTK'; // baseState is untouched!
});`,
    conceptKey: 'immer'
  },
  {
    id: 11,
    category: 'Redux Toolkit',
    question: 'What is configureStore?',
    answer: '`configureStore` is RTK\'s wrapper around standard Redux `createStore`. It sets up sensible defaults out of the box: automatically compiles multiple slice reducers, injects default middleware (including `redux-thunk` and developmental immutability checks), and activates the Redux DevTools extension seamlessly.',
    latex: '\\text{configureStore}(R) \\rightarrow \\text{Store} + \\text{Thunk} + \\text{DevTools}',
    difficulty: 'Beginner',
    example: `import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});`,
    conceptKey: 'boilerplate'
  },
  {
    id: 12,
    category: 'Async & Middleware',
    question: 'What is createAsyncThunk?',
    answer: '`createAsyncThunk` is an RTK utility that simplifies data-fetching cycles. It accepts a Redux action type string and a callback function that performs an async API call (returning a Promise). It then automatically generates action creators for three lifecycle phases: `pending`, `fulfilled`, and `rejected`.',
    latex: '\\text{AsyncThunk} \\rightarrow \\mathcal{P}(\\text{pending}) \\rightarrow \\mathcal{P}(\\text{fulfilled}) \\mid \\mathcal{P}(\\text{rejected})',
    difficulty: 'Intermediate',
    example: `import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'users/fetchById',
  async (userId) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json(); // Becomes the action.payload on success
  }
);`,
    conceptKey: 'thunk-saga'
  },
  {
    id: 13,
    category: 'Redux Toolkit',
    question: 'How do you handle async thunk results in a slice?',
    answer: 'Async thunk actions are handled inside a slice\'s `extraReducers` builder callback. Because these action lifecycles (pending, fulfilled, rejected) are created outside of the local slice reducers scope, we hook into them using `builder.addCase` to update corresponding states like loaders and api results.',
    latex: '\\text{builder.addCase}(T\\text{.fulfilled}, (state, action) \\Rightarrow S_{next})',
    difficulty: 'Intermediate',
    example: `import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: { data: null, loading: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => { state.loading = 'loading'; })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.data = action.payload;
      });
  }
});`,
    conceptKey: 'thunk-saga'
  },
  {
    id: 14,
    category: 'Performance & State',
    question: 'What is a selector?',
    answer: 'A selector is a pure helper function that extracts or derives specific pieces of state from the global Redux state tree. They help isolate the UI from the structural shape of your Redux store, and allow you to write reusable getters that can transform, aggregate, or filter state before rendering.',
    latex: '\\text{Selector}: S \\rightarrow T \\quad \\text{where } T \\subset S \\text{ or derived}',
    difficulty: 'Beginner',
    example: `// Basic state selectors
const selectCartItems = (state) => state.cart.items;

// Derived state selector
const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + item.price, 0);`,
    conceptKey: 'selectors'
  },
  {
    id: 15,
    category: 'Performance & State',
    question: 'What is reselect / createSelector used for?',
    answer: '`createSelector` (from RTK or Reselect) is used to create **memoized selectors**. A memoized selector caches its outputs. It only re-calculates the derived computation if the input selectors return a new reference. If the input references stay the same, the selector skips running the expensive filter/map function and returns the cached result immediately.',
    latex: '\\text{createSelector}(I_1, I_2, F) \\rightarrow F(I_1(S), I_2(S)) \\text{ cached}',
    difficulty: 'Intermediate',
    example: `import { createSelector } from '@reduxjs/toolkit';

const selectTodos = (state) => state.todos.items;
const selectFilter = (state) => state.todos.filter;

// Memoized: Only runs when items or filter change!
export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (items, filter) => {
    return items.filter(todo => todo.status === filter);
  }
);`,
    conceptKey: 'selectors'
  },
  {
    id: 16,
    category: 'Async & Middleware',
    question: 'What is middleware in Redux?',
    answer: 'Redux Middleware is a pipeline of functions positioned between dispatching an action and the moment it reaches the reducers. It is used to extend Redux with custom capabilities, such as logging actions, performing asynchronous API requests, reporting crashes, routing, or transforming dispatched payloads before they impact state.',
    latex: '\\text{Dispatch}(A) \\rightarrow [M_1 \\rightarrow M_2 \\rightarrow M_3] \\rightarrow \\text{Reducer}',
    difficulty: 'Intermediate',
    example: `// Standard middleware currying signature
const customMiddleware = (store) => (next) => (action) => {
  console.log('Intercepted:', action);
  const result = next(action); // Forward action to next middleware or reducer
  return result;
};`,
    conceptKey: 'middleware-chain'
  },
  {
    id: 17,
    category: 'Async & Middleware',
    question: 'What is redux-thunk?',
    answer: '`redux-thunk` is the standard middleware used for writing async code in Redux. By default, Redux dispatch only accepts plain action objects. Redux-thunk extends this behavior, allowing you to dispatch **functions (thunks)** instead. These inner functions receive `(dispatch, getState)` as arguments, enabling asynchronous operations.',
    latex: '\\text{dispatch}(\\text{function}(d, g)) \\implies \\text{Invoke async pipeline}',
    difficulty: 'Intermediate',
    example: `// A thunk creator is an action creator returning a function
export const saveTodo = (text) => async (dispatch, getState) => {
  dispatch({ type: 'todos/savePending' });
  const response = await api.post('/todos', { text });
  dispatch({ type: 'todos/saveSuccess', payload: response.data });
};`,
    conceptKey: 'thunk-saga'
  },
  {
    id: 18,
    category: 'Async & Middleware',
    question: 'Thunk vs Saga?',
    answer: 'Thunks and Sagas are both async middlewares. **Thunks** are simple, imperative JS functions that can dispatch other actions; they are easy to write but can become messy for complex sequences. **Sagas** use ES6 Generator functions (`yield`) and a declarative effect API, excelling at complex async orchestrations, task cancellations, and race conditions.',
    latex: '\\text{Thunk} \\equiv \\text{Promises} \\quad \\text{vs} \\quad \\text{Saga} \\equiv \\text{Generators/Channels}',
    difficulty: 'Advanced',
    example: `// Redux Saga generator representation
function* fetchUserSaga(action) {
  try {
    const user = yield call(Api.fetchUser, action.payload);
    yield put({ type: 'USER_SUCCESS', user }); // put is declarative dispatch
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}`,
    conceptKey: 'thunk-saga'
  },
  {
    id: 19,
    category: 'Testing & Debugging',
    question: 'What is Redux DevTools\' "time travel debugging"?',
    answer: 'Time-travel debugging is a powerful feature enabled by Redux\'s strict architectural principles (immutability and pure reducers). Because every state change is the result of a dispatched action, and every action is recorded sequentially, the DevTools can "re-play" or "rewind" the log of actions, restoring the exact state tree at any point in history.',
    latex: 'S_t = R(R(R(S_0, A_1), A_2), A_t)',
    difficulty: 'Beginner',
    example: `// Time Travel relies on resetting State to S_0 and re-running all actions up to index T:
function timeTravel(actions, index) {
  return actions.slice(0, index).reduce(rootReducer, initialState);
}`,
    conceptKey: 'redux-flow'
  },
  {
    id: 20,
    category: 'Performance & State',
    question: 'Why is state normalization important in Redux?',
    answer: 'State normalization involves organizing state like a relational database: storing entities in flat collections indexed by ID, rather than in deep, nested structures. This prevents duplication of data, simplifies updates (you only update the entity in one place), avoids massive unnecessary re-renders of nested UI trees, and speeds up lookups to O(1).',
    latex: '\\mathcal{O}(N) \\text{ nested traversal} \\rightarrow \\mathcal{O}(1) \\text{ key lookup}',
    difficulty: 'Intermediate',
    example: `// Normalizing data keeps relationships separate:
const state = {
  posts: {
    ids: ['post-1'],
    entities: {
      'post-1': { id: 'post-1', title: 'Normalized Redux', author: 'user-42' }
    }
  },
  users: {
    entities: { 'user-42': { name: 'Dan Abramov' } }
  }
};`,
    conceptKey: 'normalization'
  },
  {
    id: 21,
    category: 'Performance & State',
    question: 'What does "normalized state" typically look like?',
    answer: 'Normalized state typically splits dynamic arrays into a flat map of primary-key indexed details, along with an array of keys representing lists. An ideal normalized structure contains an `ids` array of keys, and an `entities` lookup map, which matches the exact design generated automatically by `createEntityAdapter`.',
    latex: '\\text{Normalized} = \\{ ids: K[], entities: \\mathbf{Record}\\langle K, V \\rangle \\}',
    difficulty: 'Intermediate',
    example: `// Standard normalized layout:
const articles = {
  ids: [1, 2],
  entities: {
    1: { id: 1, title: 'Immer Reducer' },
    2: { id: 2, title: 'RTK Query' }
  }
};`,
    conceptKey: 'normalization'
  },
  {
    id: 22,
    category: 'Performance & State',
    question: 'What is createEntityAdapter?',
    answer: '`createEntityAdapter` is a standard RTK utility that generates prebuilt reducers and selectors for managing normalized collections in a slice. It gives you standardized CRUD utilities (like `addOne`, `updateOne`, `removeMany`, `setAll`) that execute high-performance normalized state operations behind the scenes.',
    latex: '\\text{Adapter} \\rightarrow \\text{CRUD methods} + \\text{Pre-built Selectors}',
    difficulty: 'Intermediate',
    example: `import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter(); // Automates ids + entities

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({ loading: false }),
  reducers: {
    userAdded: usersAdapter.addOne, // Automatically updates ids and entities
    userUpdated: usersAdapter.updateOne
  }
});`,
    conceptKey: 'normalization'
  },
  {
    id: 23,
    category: 'React Integration',
    question: 'How do you connect a React component to Redux (classic)?',
    answer: 'In classic Redux, you connect components using the `connect()` higher-order component (HOC) provided by `react-redux`. It accepts `mapStateToProps` (to select store variables) and `mapDispatchToProps` (to prepare dispatch functions), wrapping your presentational component to feed them in as standard React props.',
    latex: '\\text{connect}(MAP\\_S, MAP\\_D)(Component) \\rightarrow HOC',
    difficulty: 'Beginner',
    example: `import { connect } from 'react-redux';

function Counter({ count, increment }) {
  return <button onClick={increment}>{count}</button>;
}

const mapStateToProps = (state) => ({ count: state.counter.value });
const mapDispatchToProps = { increment: () => ({ type: 'INCREMENT' }) };

export default connect(mapStateToProps, mapDispatchToProps)(Counter);`,
    conceptKey: 'boilerplate'
  },
  {
    id: 24,
    category: 'React Integration',
    question: 'How do you connect a React component to Redux (modern hooks)?',
    answer: 'Modern Redux hooks replace `connect()` entirely. We use `useSelector` to extract any required variables from the Redux store state (subscribing to changes) and `useDispatch` to fetch a copy of the store\'s `dispatch` function to issue updates directly from buttons and event listeners.',
    latex: '\\text{useSelector}(f_s) \\rightarrow S_{local} \\quad \\text{useDispatch}() \\rightarrow \\text{dispatch}',
    difficulty: 'Beginner',
    example: `import { useSelector, useDispatch } from 'react-redux';
import { increment } from './counterSlice';

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(increment())}>{count}</button>;
}`,
    conceptKey: 'render-profiler'
  },
  {
    id: 25,
    category: 'React Integration',
    question: 'Why type useSelector/useDispatch with TypeScript?',
    answer: 'Default react-redux hooks have generic untyped signatures, which won\'t recognize your custom state structure or support dispatch autocompletes. By declaring pre-typed `useAppSelector` and `useAppDispatch` hooks using your concrete `RootState` and `AppDispatch`, you secure type-safety and robust editor autocomplete throughout your app.',
    latex: '\\text{TypedSelector}: RootState \\rightarrow V_t',
    difficulty: 'Intermediate',
    example: `// hooks.ts - Setup pre-typed wrappers
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();`,
    conceptKey: 'boilerplate'
  },
  {
    id: 26,
    category: 'React Integration',
    question: 'What are RootState and AppDispatch?',
    answer: 'They are TypeScript types compiled directly from the store\'s concrete configuration. `RootState` is the complete type of the global state tree, and `AppDispatch` is the type of the store\'s configured dispatch function (which includes middleware extensions like Thunks). They are critical for ensuring TS safety across files.',
    latex: '\\text{RootState} = \\text{ReturnType}\\langle \\text{store.getState} \\rangle \\quad \\text{AppDispatch} = \\text{store.dispatch}',
    difficulty: 'Intermediate',
    example: `// Standard store TS types
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({ reducer: {} });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`,
    conceptKey: 'boilerplate'
  },
  {
    id: 27,
    category: 'Fundamentals',
    question: 'What is an action creator?',
    answer: 'An action creator is a function that simply returns a styled action object. Rather than manually typing `{ type: "todos/add", payload: "Text" }` inside various forms and components, action creators encapsulate this logic. Redux Toolkit\'s `createSlice` automatically generates highly styled action creators for every reducer.',
    latex: '\\text{ActionCreator}(P) \\rightarrow \\{ type, payload: P \\}',
    difficulty: 'Beginner',
    example: `// Standard action creator function
export const todoAdded = (text) => ({
  type: 'todos/added',
  payload: text
});

// Invoking: dispatch(todoAdded('Buy groceries'));`,
    conceptKey: 'redux-flow'
  },
  {
    id: 28,
    category: 'React Integration',
    question: 'What does PayloadAction<T> do in RTK with TypeScript?',
    answer: '`PayloadAction<T>` is a prebuilt generic type provided by Redux Toolkit that declares the expected type of an action\'s `payload` property. When typing your slice reducer actions, matching your slice payload parameters with `PayloadAction<T>` locks in autocomplete and compiler warnings during dispatches.',
    latex: '\\text{ActionReducer}: (State, PayloadAction\\langle T \\rangle) \\rightarrow State',
    difficulty: 'Intermediate',
    example: `import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem: (state, action: PayloadAction<{ id: string; price: number }>) => {
      state.items.push(action.payload); // Autocompletes action.payload.price!
    }
  }
});`,
    conceptKey: 'immer'
  },
  {
    id: 29,
    category: 'Redux Toolkit',
    question: 'How do you combine multiple reducers?',
    answer: 'In classic Redux, you combine multiple separate reducers into a unified state tree using `combineReducers()`. When using Redux Toolkit\'s `configureStore()`, you simply pass a plain map object as the `reducer` configuration key; RTK automatically handles calling `combineReducers` for you under the hood.',
    latex: '\\mathbf{S}_{total} = R_1(S_1, A) \\oplus R_2(S_2, A) \\oplus \\dots R_n(S_n, A)',
    difficulty: 'Beginner',
    example: `// RTK automates reducer combination:
const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    cart: cartReducer
  }
});`,
    conceptKey: 'boilerplate'
  },
  {
    id: 30,
    category: 'Performance & State',
    question: 'What is the danger of mutating state directly in a plain reducer?',
    answer: 'Mutating state directly in classic Redux reducers (e.g. `state.user = "Dan"`) breaks reference comparisons. Libraries like React-Redux perform a fast `===` comparison of the old state vs the new state to verify changes. If you mutate the same object reference, they evaluate to "identical" and skip rendering, causing hidden state sync bugs.',
    latex: 'S_{old} \\equiv S_{new} \\implies \\text{React skips update}',
    difficulty: 'Intermediate',
    example: `// ❌ Accidental Mutation breaking state reference:
const myReducer = (state = { count: 0 }, action) => {
  if (action.type === 'INC') {
    state.count += 1; // Direct mutation!
    return state; // Reference to 'state' is identical, UI misses render!
  }
  return state;
};`,
    conceptKey: 'immer'
  },
  {
    id: 31,
    category: 'React Integration',
    question: 'How does React-Redux decide when a component re-renders?',
    answer: 'The `useSelector` hook stores the selected data value and subscribes to the Redux store. When an action is dispatched, `useSelector` immediately runs its selector function on the new state tree. It then performs a strict reference equality check (`===`) between the old selected value and the new selected value. If they are different, it forces a re-render.',
    latex: 'V_{old} \\neq V_{new} \\implies \\text{Trigger Render}',
    difficulty: 'Intermediate',
    example: `// Re-render check:
// useSelector(state => state.todos.count) compares numbers (by value): 5 === 5 (no render)
// useSelector(state => state.todos) compares objects (by reference): { ... } === { ... } is false! (renders!)`,
    conceptKey: 'render-profiler'
  },
  {
    id: 32,
    category: 'Performance & State',
    question: 'How do you prevent unnecessary re-renders from useSelector?',
    answer: '1. **Granular Selectors**: Extract the smallest, primitive value possible (like `state.cart.items.length` rather than the whole cart).\\n2. **Memoized Selectors**: Use `createSelector` to compute arrays/objects without changing references on identical inputs.\\n3. **Shallow Equality**: Pass a shallow comparator as a second hook argument to compare keys rather than direct object references.',
    latex: '\\text{useSelector}(f_s, \\text{shallowEqual})',
    difficulty: 'Intermediate',
    example: `import { useSelector, shallowEqual } from 'react-redux';

// Hook only triggers render if individual object keys change!
const userData = useSelector(
  state => state.user.profile,
  shallowEqual
);`,
    conceptKey: 'render-profiler'
  },
  {
    id: 33,
    category: 'React Integration',
    question: 'What is useSelector\'s second argument used for?',
    answer: 'It is a custom **equality comparison function** `(prev, next) => boolean`. When specified, `useSelector` will call this comparison instead of the default `===` reference check. If the comparison returns `true`, the hook considers the data unchanged and skips re-rendering the host component, making it vital for optimizing inline object mappings.',
    latex: '\\text{Comp}(V_{prev}, V_{next}) = \\text{true} \\implies \\text{No render}',
    difficulty: 'Intermediate',
    example: `// Optimizing with a custom equality checker
const customCheck = (prev, next) => prev.id === next.id;

const selectedItem = useSelector(
  state => state.items.active,
  customCheck
);`,
    conceptKey: 'render-profiler'
  },
  {
    id: 34,
    category: 'Redux Toolkit',
    question: 'What\'s the purpose of extraReducers in createSlice?',
    answer: '`extraReducers` allows a slice to respond to actions defined **outside** of itself. This includes standard actions dispatched by other slices or the dynamic actions launched by a `createAsyncThunk`. `extraReducers` operates on an automated builder callback mapping cases without populating the local slice\'s `actions` registry.',
    latex: '\\text{extraReducers}(builder) \\implies \\text{Handles global action matches}',
    difficulty: 'Intermediate',
    example: `const logOutAction = { type: 'auth/logOut' };

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    // Empty the cart when auth slice fires logOut!
    builder.addCase(logOutAction.type, (state) => {
      state.items = [];
    });
  }
});`,
    conceptKey: 'thunk-saga'
  },
  {
    id: 35,
    category: 'Performance & State',
    question: 'What is optimistic update in Redux and how is it implemented?',
    answer: 'An optimistic update instantly commits state changes to the UI *before* receiving confirmation from an asynchronous API request, making operations feel instantaneous. If the server request succeeds, the state is finalized. If the server request fails, Redux dispatches a fallback action to revert state back to its pre-update snapshot.',
    latex: '\\text{UI}_{immediate} \\xrightarrow{\\text{Update State}} A_t \\xrightarrow{\\text{On Failure}} \\text{Revert to } S_{backup}',
    difficulty: 'Advanced',
    example: `// Flow of an optimistic update thunk:
export const completeTodoOptimistic = (id) => async (dispatch, getState) => {
  const backup = getState().todos.entities[id];
  dispatch(todoUpdated({ id, completed: true })); // Optimistic update
  try {
    await api.post(\`/todos/\${id}/complete\`);
  } catch (err) {
    dispatch(todoUpdated({ id, completed: backup.completed })); // Revert!
  }
};`,
    conceptKey: 'optimistic'
  },
  {
    id: 36,
    category: 'Testing & Debugging',
    question: 'How would you structure a large Redux app (folder-wise)?',
    answer: 'Large Redux applications are structured using the feature-based **"ducks" pattern (or features folder pattern)**. Instead of categorizing files by technical type (all actions in `/actions`, all reducers in `/reducers`), you co-locate everything associated with a feature (slice, selectors, components, thunks) inside a single feature folder (e.g., `/features/cart/`).',
    latex: '\\text{Structure} = \\bigoplus \\mathbf{FeatureFolder}\\{ \\text{Slice, Components, API} \\}',
    difficulty: 'Intermediate',
    example: `// Large app folder tree layout:
// /src
//   /features
//     /cart
//       cartSlice.ts
//       CartList.tsx
//       cartSelectors.ts
//     /auth
//       authSlice.ts
//   /app
//     store.ts`,
    conceptKey: 'boilerplate'
  },
  {
    id: 37,
    category: 'Performance & State',
    question: 'What is the "single store" principle\'s tradeoff?',
    answer: 'The single store provides a single predictable source of truth, centralizes debugging, and enables global history. The tradeoff is **scaling complexity**: as applications grow massive, one single state tree can become cluttered and computationally intensive to traverse. It requires strict domain division (slices), normalization, and lazy loading to remain performant.',
    latex: '\\mathbf{SingleStore} \\implies \\text{Centralized consistency vs Complexity scaling}',
    difficulty: 'Intermediate',
    example: `// Overcoming the tradeoff:
// Large teams split domains carefully across independent slice sub-trees:
// state = { auth: {...}, billing: {...}, orders: {...}, reports: {...} }`,
    conceptKey: 'redux-flow'
  },
  {
    id: 38,
    category: 'Async & Middleware',
    question: 'How do middleware functions get composed?',
    answer: 'Redux middleware functions compose dynamically in a functional chain. When a store is configured with middlewares `[M1, M2, M3]`, Redux applies functional currying to bind them together. When you dispatch an action, it cascades sequentially through each middleware, using `next(action)` to pass control down the chain to the next interceptor.',
    latex: '(M_1 \\circ M_2 \\circ M_3)(\\text{dispatch}) \\rightarrow A_x \\rightarrow R',
    difficulty: 'Advanced',
    example: `// Under the hood currying composition:
// dispatch = M1( M2( M3( store.dispatch ) ) )
// Running 'next(action)' forwards to the next wrapped block in the chain.`,
    conceptKey: 'middleware-chain'
  },
  {
    id: 39,
    category: 'Async & Middleware',
    question: 'What is the typical shape of a Redux middleware function?',
    answer: 'Redux middleware utilizes a curried triple-function signature. It takes the store\'s `API` interface, returns a function that takes the `next` dispatcher, which in turn returns a function taking the active `action`. This nested closure structure maintains lexical access to both the global state and the next middleware segment.',
    latex: '\\text{Middleware} \\equiv \\text{store} \\rightarrow \\text{next} \\rightarrow \\text{action} \\rightarrow \\text{result}',
    difficulty: 'Advanced',
    example: `// Triple-curried middleware signature:
const customMiddleware = (store) => {
  return (next) => {
    return (action) => {
      // Middleware execution logic
      const result = next(action);
      return result;
    };
  };
};`,
    conceptKey: 'middleware-chain'
  },
  {
    id: 40,
    category: 'Async & Middleware',
    question: 'How would you write custom logging middleware?',
    answer: 'Custom logging middleware intercepts actions, prints the dispatch metadata, and then uses the `next` callback to let the action proceed to the reducer. After the state has updated, it logs the final resulting state, creating a clean record of changes in development.',
    latex: '\\text{Log}(A) \\rightarrow \\text{Next}(A) \\rightarrow \\text{Log}(S_{next})',
    difficulty: 'Intermediate',
    example: `const loggerMiddleware = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('Action dispatched:', action);
  const result = next(action); // Update runs synchronously!
  console.log('Next state:', store.getState());
  console.groupEnd();
  return result;
};`,
    conceptKey: 'middleware-chain'
  },
  {
    id: 41,
    category: 'Fundamentals',
    question: 'What is combineReducers doing under the hood?',
    answer: '`combineReducers` takes an object of slice-specific reducers and returns a single, combined reducer function. Under the hood, this returned function loops over every reducer key, passes that key\'s relevant state slice along with the action, collects the computed new values, and aggregates them into a single global state object.',
    latex: 'R_{combined}(S, A) = \\bigoplus_{k \\in \\mathcal{K}} R_k(S[k], A)',
    difficulty: 'Intermediate',
    example: `// Simplified combineReducers implementation
function combineReducers(reducers) {
  return function combination(state = {}, action) {
    const nextState = {};
    for (const key in reducers) {
      nextState[key] = reducers[key](state[key], action);
    }
    return nextState;
  };
}`,
    conceptKey: 'boilerplate'
  },
  {
    id: 42,
    category: 'Async & Middleware',
    question: 'How do you handle side effects (API calls) the "Redux way"?',
    answer: 'In Redux, side effects are handled exclusively within the middleware pipeline. Reducers themselves **must remain completely pure**, meaning they can never execute API calls, trigger random values, or write to external storage. Middlewares like `thunks` intercept these actions, handle async promises, and dispatch plain actions to update state on completion.',
    latex: '\\text{Reducer: } S \\rightarrow S \\quad \\text{vs} \\quad \\text{Middleware: } S \\times A \\xrightarrow{\\text{Side Effect}} P(A_{done})',
    difficulty: 'Intermediate',
    example: `// API handler matching the "Redux way"
export const loadData = () => async (dispatch) => {
  dispatch({ type: 'DATA_LOADING' });
  const data = await api.get('/endpoint');
  dispatch({ type: 'DATA_LOADED', payload: data });
};`,
    conceptKey: 'thunk-saga'
  },
  {
    id: 43,
    category: 'React Integration',
    question: 'What is the "container vs presentational component" pattern in classic Redux apps?',
    answer: 'It was a pattern where components were split into two files: **Presentational components** (dumb components) which only cared about UI rendering and received all data via props; and **Container components** (smart components) which mapped state and actions via `connect()` to feed props to the presentational component. Modern Hooks render this pattern mostly obsolete.',
    latex: '\\text{Container}(Connect) \\longrightarrow \\text{Presentational}(Props \\rightarrow UI)',
    difficulty: 'Beginner',
    example: `// Presentational: CartView({ items })
// Container: CartContainer = connect(state => ({ items: state.cart }))(CartView)`,
    conceptKey: 'boilerplate'
  },
  {
    id: 44,
    category: 'Redux Toolkit',
    question: 'Why might a team choose Redux Toolkit over plain Redux today?',
    answer: 'Redux Toolkit is the official, strongly recommended standard for all Redux apps. It eliminates almost all boilerplate, prevents common configuration errors, incorporates default middlewares like thunks, enforces immutable state management out of the box via Immer, and supports highly advanced built-in state tools like RTK Query.',
    latex: '\\text{Redux Toolkit} = \\text{Plain Redux} \\times \\text{Best Practices} \\times \\text{Dev Velocity}',
    difficulty: 'Beginner',
    example: `// Code lines comparison:
// Plain Redux: 5 files, ~120 lines of boilerplate for typical CRUD.
// RTK: 1 file, ~30 lines of clean slice definitions.`,
    conceptKey: 'boilerplate'
  },
  {
    id: 45,
    category: 'Testing & Debugging',
    question: 'How do you test a Redux reducer?',
    answer: 'Because Redux reducers are pure functions, testing them is incredibly simple and robust. You do not need mock stores, server setups, or complex react-testing renders. You simply call the reducer function directly with a starting state and mock action, and assert that the returned next state matches your expectation.',
    latex: '\\mathbf{Assert}\\left( R(S_{initial}, A) \\equiv S_{expected} \\right)',
    difficulty: 'Beginner',
    example: `import counterReducer from './counterSlice';

test('should handle increment', () => {
  const state = { value: 2 };
  const action = { type: 'counter/increment' };
  const nextState = counterReducer(state, action);
  
  expect(nextState).toEqual({ value: 3 });
});`,
    conceptKey: 'redux-flow'
  },
  {
    id: 46,
    category: 'Testing & Debugging',
    question: 'How do you test an RTK slice with createAsyncThunk?',
    answer: 'To test an async thunk, you typically mock your network client (e.g. mock `fetch` or `axios`), dispatch the async thunk against a newly initialized test Redux store, and then assert that the correct sequences of actions (`pending`, then `fulfilled` or `rejected`) were dispatched and applied to your slice state.',
    latex: '\\mathbf{Assert}\\left( S_{final}.data \\equiv \\text{MockPayload} \\right)',
    difficulty: 'Advanced',
    example: `// Redux testing sequence mock:
import { configureStore } from '@reduxjs/toolkit';
import usersReducer, { fetchUser } from './usersSlice';

test('loads user details', async () => {
  global.fetch = jest.fn().mockResolvedValue({ json: () => ({ id: 1, name: 'Test' }) });
  const store = configureStore({ reducer: { users: usersReducer } });
  await store.dispatch(fetchUser(1));
  expect(store.getState().users.data).toEqual({ id: 1, name: 'Test' });
});`,
    conceptKey: 'thunk-saga'
  },
  {
    id: 47,
    category: 'Testing & Debugging',
    question: 'What is the Redux store\'s subscribe method for?',
    answer: 'The `subscribe(listener)` method registers a listener function that is called by the store **every single time** an action is dispatched and the state tree is updated. It returns an unsubscribe function to clean up the registration. React-Redux uses this method under the hood to detect state updates and trigger React renders.',
    latex: '\\text{State Change} \\implies \\forall L \\in \\text{Listeners}, L()',
    difficulty: 'Beginner',
    example: `const unsubscribe = store.subscribe(() => {
  console.log('State updated to:', store.getState());
});

// To stop listening:
unsubscribe();`,
    conceptKey: 'redux-flow'
  },
  {
    id: 48,
    category: 'Performance & State',
    question: 'How do you persist Redux state across reloads?',
    answer: 'Redux state persistence is typically managed using libraries like `redux-persist`. This middleware automatically serializes specified slices of your Redux state tree and saves them to browser storage (like localStorage or IndexedDB) on every state change. Upon reload, the middleware rehydrates the store with the saved snapshot.',
    latex: 'S_{storage} \\xrightarrow{\\text{Rehydrate}} S_{store} \\xrightarrow{\\text{Serialize}} S_{storage}',
    difficulty: 'Intermediate',
    example: `// Typical redux-persist configuration:
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = { key: 'root', storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);`,
    conceptKey: 'redux-flow'
  },
  {
    id: 49,
    category: 'Testing & Debugging',
    question: 'What is a common pitfall with redux-persist and sensitive data?',
    answer: 'Storing sensitive credentials, authentication tokens, or personal profile data directly in unencrypted `localStorage` via `redux-persist` leaves the application vulnerable to Cross-Site Scripting (XSS) attacks. A common remedy is to **blacklist** sensitive slices from persistence, or use short-lived state caches combined with secure HttpOnly cookies.',
    latex: '\\text{XSS Vulnerability} \\subset \\text{localStorage}(AuthTokens)',
    difficulty: 'Intermediate',
    example: `// Blacklisting sensitive data
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'payments'] // These slices will NOT be saved to disk
};`,
    conceptKey: 'redux-flow'
  },
  {
    id: 50,
    category: 'Performance & State',
    question: 'How do you handle feature flags or environment-specific reducers?',
    answer: 'You can configure feature-flagged or environment-specific reducers by conditionally structuring the reducer map object passed to `configureStore()`. In addition, dynamically adding or injecting slices at runtime is supported, which is highly useful for code-splitting large, lazy-loaded feature modules.',
    latex: '\\text{Reducers} = \\begin{cases} R \\oplus R_{dev} & \\text{if } Env = Dev \\\\ R & \\text{if } Env = Prod \\end{cases}',
    difficulty: 'Intermediate',
    example: `const reducers = {
  main: mainReducer,
};

// Conditionally append dev-only logger or dashboard slice
if (process.env.NODE_ENV === 'development') {
  reducers.devSandbox = sandboxReducer;
}

const store = configureStore({ reducer: reducers });`,
    conceptKey: 'boilerplate'
  },
  {
    id: 51,
    category: 'Redux Toolkit',
    question: 'What\'s the benefit of colocating actions and reducers via createSlice?',
    answer: 'Colocation solves the "classic Redux context switching" pain point. In classic Redux, adding a single field required editing three files: an action type constant file, an action creator file, and a reducer file. By combining them into a single cohesive slice definition, development velocity is increased, cognitive load is reduced, and typos are virtually eliminated.',
    latex: '\\text{Colocation} \\implies \\text{Constants} \\oplus \\text{Actions} \\oplus \\text{Reducers} \\in \\mathbf{OneFile}',
    difficulty: 'Beginner',
    example: `// Classic redundant code vs colocated RTK:
// RTK generates action counterSlice.actions.increment automatically from:
// reducers: { increment(state) { state.val++ } }`,
    conceptKey: 'immer'
  },
  {
    id: 52,
    category: 'Async & Middleware',
    question: 'How would you dispatch multiple actions in sequence for a single user action?',
    answer: 'To execute sequential dispatches, you write a Redux Thunk action creator. Because Thunks receive the store\'s `dispatch` function, you can fire multiple actions sequentially — such as launching a loading indicator, initiating an API request, updating state on success, and showing a notification.',
    latex: 'A_{user} \\xrightarrow{\\text{Thunk}} d(A_{load}) \\rightarrow d(A_{fetch}) \\rightarrow d(A_{notify})',
    difficulty: 'Intermediate',
    example: `export const purchaseItem = (id) => async (dispatch) => {
  dispatch(checkoutStarted());
  const success = await api.buy(id);
  if (success) {
    dispatch(checkoutSuccess(id));
    dispatch(showToast('Checkout Complete!'));
  }
};`,
    conceptKey: 'thunk-saga'
  },
  {
    id: 53,
    category: 'Performance & State',
    question: 'What is the "single responsibility" concern with big reducers?',
    answer: 'A massive, monolithic reducer that handles unrelated state domains (e.g., auth, products, chat, and cart) is difficult to maintain and test. Adhering to the single responsibility principle, you should split your store state tree into highly focused, domain-specific slice files, each with its own state and reducers, and combine them with configureStore.',
    latex: '\\text{Slices} = \\bigcup_{i} \\text{FocusedSlice}_i \\quad \\text{where } \\text{FocusedSlice}_i \\cap \\text{FocusedSlice}_j = \\emptyset',
    difficulty: 'Beginner',
    example: `// Highly split single responsibility layout:
// - authSlice.ts (authentications only)
// - themeSlice.ts (UI appearance preferences only)
// - inventorySlice.ts (items database only)`,
    conceptKey: 'boilerplate'
  },
  {
    id: 54,
    category: 'Redux Toolkit',
    question: 'How does RTK Query differ from createAsyncThunk for data fetching?',
    answer: 'While `createAsyncThunk` requires you to manually write async request code, coordinate loading/error state variables in your slice, and handle caching yourself, **RTK Query** is a complete, declarative data-fetching and caching engine. You define your API endpoints, and RTK Query automatically generates React hooks that manage loading, caching, polling, and cache invalidation.',
    latex: '\\text{RTKQ} = \\text{Thunks} \\times \\text{Caching} \\times \\text{Auto-Loading Hooks} \\times \\text{Auto-Invalidation}',
    difficulty: 'Advanced',
    example: `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getUser: builder.query({ query: (id) => \`users/\${id}\` }),
  }),
});

export const { useGetUserQuery } = userApi;`,
    conceptKey: 'rtkq'
  },
  {
    id: 55,
    category: 'Redux Toolkit',
    question: 'When would you use RTK Query vs plain thunks?',
    answer: 'Use **RTK Query** for typical server-side state (REST or GraphQL API endpoints) where you need features like automatic loading/error indicators, automatic caching, cache expiration, pagination, and data sharing between multiple screens. Use **plain thunks** for custom, non-caching async operations (such as custom browser sensors, custom sequential dispatches, or wrapping complex non-API logic).',
    latex: '\\text{RTK Query (Server Caching)} \\quad \\longleftrightarrow \\quad \\text{Thunks (Client Logic)}',
    difficulty: 'Intermediate',
    example: `// Use RTKQ for: api/getProducts, api/saveProfile
// Use Thunks for: playAudioEngine(), synchronizeBluetoothSensor()`,
    conceptKey: 'rtkq'
  },
  {
    id: 56,
    category: 'Redux Toolkit',
    question: 'What is cache invalidation in RTK Query?',
    answer: 'Cache invalidation in RTK Query is managed using a declarative **"Tags"** system. Queries (read endpoints) can **provide tags** (e.g. `\'Post\'`), and Mutations (write endpoints) can **invalidate tags**. When a mutation runs successfully and invalidates a tag, RTK Query automatically re-fetches any active queries that provided that tag, keeping your UI perfectly synchronized.',
    latex: '\\text{Mutation(Invalidates Tag)} \\implies \\text{Auto Refetch(Queries providing Tag)}',
    difficulty: 'Advanced',
    example: `// In RTK Query endpoint builder:
// query: getUserPosts (providesTags: ['Post'])
// mutation: addPost (invalidatesTags: ['Post']) // Triggers refetch on success!`,
    conceptKey: 'rtkq'
  },
  {
    id: 57,
    category: 'Performance & State',
    question: 'How do you handle pagination with Redux/RTK?',
    answer: 'Pagination is handled by storing page parameters (such as `currentPage` or `cursor`) and the loaded collections in your slice. When the page increments, you dispatch an API query. For infinite scrolls, your reducer appends new items to the existing collection, whereas for standard page navigation, the reducer replaces the collection entirely.',
    latex: 'S_{t+1}.items = \\begin{cases} S_t.items \\cup \\text{NewItems} & \\text{if InfiniteScroll} \\\\ \\text{NewItems} & \\text{if PageNav} \\end{cases}',
    difficulty: 'Intermediate',
    example: `// Reducer handling infinite scroll appending:
reducers: {
  postsReceived: (state, action) => {
    state.items = [...state.items, ...action.payload.posts]; // Append items
    state.currentPage = action.payload.page;
  }
}`,
    conceptKey: 'rtkq'
  },
  {
    id: 58,
    category: 'Performance & State',
    question: 'What\'s the difference between local component state and Redux state?',
    answer: 'Use **local component state** (`useState`) for transient, component-specific UI state that no other part of the app cares about (e.g., "is this modal open?", "is this input highlighted?"). Use **global Redux state** for data that is shared between distant components, needs to persist across route transitions, or is fetched from a server and needs caching.',
    latex: '\\text{Local (useState): Components} \\quad \\longleftrightarrow \\quad \\text{Global (Redux): App Tree}',
    difficulty: 'Beginner',
    example: `// Local: isDropdownOpen (use state!)
// Global: currentUserSession, shoppingCartItems (use Redux!)`,
    conceptKey: 'render-profiler'
  },
  {
    id: 59,
    category: 'Testing & Debugging',
    question: 'How would you debug an action that doesn\'t seem to update the UI?',
    answer: '1. **DevTools Check**: Confirm if the action actually fired and reached the store.\\n2. **Reducer Inspection**: Check if the reducer returned the updated data correctly.\\n3. **Reference Comparison Check**: Ensure you didn\'t mutate state directly (plain Redux) breaking React-Redux `===` comparison.\\n4. **Selector Inspection**: Check if the component\'s selector matches the updated state path.',
    latex: '\\text{Debug} \\equiv \\text{Verify Dispatch} \\rightarrow \\text{Verify Pure Reducer} \\rightarrow \\text{Verify Selector Path}',
    difficulty: 'Intermediate',
    example: `// Debug flow checklist:
// - Is action showing up in Redux DevTools tab?
// - Did the state panel reflect changes on that action?
// - Did useSelector read from state.cart instead of state.shoppingCart?`,
    conceptKey: 'render-profiler'
  },
  {
    id: 60,
    category: 'Testing & Debugging',
    question: 'What is a common accidental-mutation bug in plain Redux?',
    answer: 'A common bug is executing standard mutable operations like `state.items.push(newItem)` or `state.activeUser.name = "John"` inside a classic Redux reducer. This modifies the existing state object reference. React-Redux, seeing that the state reference didn\'t change (`oldState === newState` is true), skips re-rendering, leaving the user with an out-of-sync UI.',
    latex: 'S_{old} \\equiv S_{new} \\implies \\text{UI fails to synchronize}',
    difficulty: 'Intermediate',
    example: `// ❌ MUTATING BUG (No UI update)
const itemsReducer = (state = { list: [] }, action) => {
  if (action.type === 'ADD') {
    state.list.push(action.payload); // Mutating array in-place!
    return state; // Reference matches old reference!
  }
  return state;
};`,
    conceptKey: 'immer'
  }
];
