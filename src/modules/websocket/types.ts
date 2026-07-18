export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export enum Category {
  Fundamentals = 'Fundamentals & Architecture',
  ProtocolHandshake = 'Protocol & Handshake',
  ClientAPI = 'Client API & Lifecycle',
  NetworkPerformance = 'Network & Performance',
  ScalingProduction = 'Scaling & Production',
  RealWorldCases = 'Real-World Scenarios',
}

export interface WebSocketQuestion {
  id: number;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  codeSnippet?: string;
  codeLanguage?: string;
  mathFormula?: string;
  mathExplanation?: string;
  category: Category;
  difficulty: Difficulty;
  keyTakeaways: string[];
  tags: string[];
  interactiveDiagramId: string; // matches custom diagram components
}

export interface UserProgress {
  completedIds: number[];
  bookmarkedIds: number[];
  quizHighScore: number;
}
