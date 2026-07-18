export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Question {
  id: number;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  codeExample: string;
  category: string;
  difficulty: Difficulty;
  quizOptions?: string[];
  quizCorrectIndex?: number;
  quizExplanation?: string;
  latexFormula?: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  questions: number[]; // Question IDs belonging to this chapter
  iconName: string; // Lucide icon identifier
  diagramId: string; // Identifier for the interactive diagram component
}

export interface UserProgress {
  bookmarked: number[]; // Array of bookmarked question IDs
  completed: number[]; // Array of completed question IDs
  flashcardStates: Record<number, 'new' | 'easy' | 'medium' | 'hard'>;
  quizHighScores: Record<string, number>; // Category/chapter to score percentage
}
