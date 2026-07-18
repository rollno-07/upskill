export type Category = 'jest' | 'rtl' | 'cypress' | 'all';

export interface Question {
  id: number;
  category: 'jest' | 'rtl' | 'cypress';
  question: string;
  answer: string;
  detailedAnswer: string;
  exampleCode?: string;
  testCaseCode?: string;
  conceptKey: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
  category: 'jest' | 'rtl' | 'cypress';
}
