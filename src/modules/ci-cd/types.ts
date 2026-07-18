export interface QuestionData {
  id: number;
  question: string;
  answer: string;
  category: string;
  concept: string;
  visualType: 'pipeline' | 'deployment' | 'docker' | 'db-migration' | 'git-flow' | 'general';
  codeExample?: string;
  keyTakeaway: string;
}

export interface ExplainerResponse {
  detailedExplanation: string;
  pros: string[];
  cons: string[];
  flowchart: {
    stepNumber: number;
    title: string;
    description: string;
    status: string;
  }[];
  isFallback?: boolean;
}
