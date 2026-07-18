export interface QuestionData {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  keyTakeaways: string[];
  codeExample?: string;
  visualLabel: string; // Title for the interactive diagram
}

export interface CategoryData {
  id: string;
  name: string;
  icon: string;
  description: string;
}
