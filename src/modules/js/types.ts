export type Category =
  | 'scope_closures'
  | 'async_event_loop'
  | 'this_functions'
  | 'objects_prototypes'
  | 'types_coercion'
  | 'array_methods'
  | 'dom_browser_adv';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: number;
  question: string;
  answer: string;
  category: Category;
  difficulty: Difficulty;
  codeExample: string;
  explanationSteps: string[];
  playgroundCode?: string;
  expectedOutput?: string;
}
