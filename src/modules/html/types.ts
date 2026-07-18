/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: number;
  category: string;
  question: string;
  answer: string;
  explanation: string;
  codeExample: string;
  codeLanguage: string;
  visualId: string;
  visualDescription: string;
}

export interface UserProgress {
  viewedQuestionIds: number[];
  starredQuestionIds: number[];
  completedQuizIds: number[];
  scores: { [quizId: string]: number };
}

export type CategoryKey = 
  | 'basics'
  | 'structure'
  | 'attributes'
  | 'metadata'
  | 'forms'
  | 'media'
  | 'dom'
  | 'seo_a11y';

export interface CategoryInfo {
  key: CategoryKey;
  name: string;
  icon: string;
  color: string;
  description: string;
}
