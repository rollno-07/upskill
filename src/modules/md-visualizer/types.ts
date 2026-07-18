export type Category = 
  | "Box Model & Core"
  | "Selectors & Specificity"
  | "Positioning & Stacking"
  | "Flexbox & Grid"
  | "Sizing & Responsive"
  | "Transitions & Animations"
  | "Architecture & Modern";

export type SandboxType =
  | "BOX_MODEL"
  | "SELECTORS"
  | "POSITIONING"
  | "Z_INDEX"
  | "FLEXBOX"
  | "GRID"
  | "VARIABLES"
  | "RESPONSIVE"
  | "FONT_UNITS"
  | "TRANSITIONS"
  | "LOGICAL_PROPERTIES"
  | "OBJECT_FIT";

export interface Question {
  id: number;
  question: string;
  shortAnswer: string;
  category: Category;
  deepDive: string;
  codeExample: string;
  sandboxType: SandboxType;
  sandboxConfig?: any; // For custom startup states in the sandbox
}
