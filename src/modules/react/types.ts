export enum Category {
  CoreConcepts = "Core Concepts",
  StateAndProps = "Components & Data Flow",
  Hooks = "React Hooks",
  Performance = "Performance & Optimization",
  Architecture = "Architecture & SSR",
  Concurrent = "React 18 & Concurrent Mode",
  BestPractices = "Best Practices & Testing"
}

export interface ExampleCode {
  title: string;
  code: string;
  explanation: string;
}

export interface Question {
  id: number;
  category: Category;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  visualExplanation: string;
  examples: ExampleCode[];
  visualizerType: string;
}
