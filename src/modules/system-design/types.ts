export interface ProsCons {
  title: string;
  list: string[];
}

export interface QuestionItem {
  id: number;
  category: "Architecture & Frameworks" | "Database & Storage" | "Performance & Caching" | "Real-time & Security" | "Frontend & Rollouts";
  question: string;
  answer: string;
  conceptBreakdown: { title: string; text: string }[];
  practicalExample: string;
  prosCons: ProsCons[];
  codeExample: string;
  codeLanguage?: string;
}
