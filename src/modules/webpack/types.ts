/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum WebpackCategory {
  CORE = "Core Architecture",
  LOADERS = "Loaders & Assets",
  PLUGINS = "Plugins & Styling",
  OPTIMIZATIONS = "Optimizations & Chunks",
  DEV_EXP = "Dev Experience"
}

export type Difficulty = "Basic" | "Intermediate" | "Advanced";

export type DiagramType = "graph" | "loader" | "plugin" | "optimization" | "devexp";

export interface Question {
  id: number;
  question: string;
  answer: string;
  detailedAnswer: string;
  category: WebpackCategory;
  difficulty: Difficulty;
  codeExample: string;
  diagramType: DiagramType;
}

export interface GraphNode {
  id: string;
  name: string;
  type: "js" | "ts" | "css" | "png" | "svg";
  role: "entry" | "helper" | "style" | "asset";
  imports: string[];
  sizeKb: number;
  content: string;
}

export interface LoaderStep {
  name: string;
  type: "loader";
  description: string;
  status: "idle" | "processing" | "completed";
}
