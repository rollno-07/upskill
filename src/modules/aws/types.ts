export type Difficulty = 'Foundational' | 'Associate' | 'Professional';

export interface CodeSnippet {
  language: string;
  code: string;
  title: string;
}

export interface AWSQuestion {
  id: number;
  question: string;
  answer: string;
  category: string;
  service: string;
  difficulty: Difficulty;
  example: string;
  snippet?: CodeSnippet;
}

export interface ExplainResponse {
  success: boolean;
  explanation: string;
}

export interface ScoreResponse {
  success: boolean;
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export interface UserProgress {
  completedIds: number[];
  starredIds: number[];
  notes: Record<number, string>;
}
