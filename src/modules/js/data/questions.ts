import { Question } from '../types';
import { scopeClosuresQuestions } from './cat_scope_closures';
import { asyncEventLoopQuestions } from './cat_async_event_loop';
import { thisFunctionsQuestions } from './cat_this_functions';
import { objectsPrototypesQuestions } from './cat_objects_prototypes';
import { typesCoercionQuestions } from './cat_types_coercion';
import { arrayMethodsQuestions } from './cat_array_methods';
import { domBrowserAdvQuestions } from './cat_dom_browser_adv';

// Merge all modular questions
const rawQuestionsList: Question[] = [
  ...scopeClosuresQuestions,
  ...asyncEventLoopQuestions,
  ...thisFunctionsQuestions,
  ...objectsPrototypesQuestions,
  ...typesCoercionQuestions,
  ...arrayMethodsQuestions,
  ...domBrowserAdvQuestions
];

// Ensure they are sorted strictly by ID (1 to 100)
export const questions: Question[] = rawQuestionsList.sort((a, b) => a.id - b.id);

// Export helper categories mapping
export const categoryLabels: Record<string, string> = {
  scope_closures: "Scope, Hoisting & Closures",
  async_event_loop: "Promises & Event Loop",
  this_functions: "this & Functions",
  objects_prototypes: "Objects & Prototypes",
  types_coercion: "Types & Coercion",
  array_methods: "Array Methods",
  dom_browser_adv: "DOM & Advanced",
};
