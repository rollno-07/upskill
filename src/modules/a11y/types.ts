/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CategoryType = 
  | 'core'       // Core Concepts (1-4)
  | 'semantics'  // HTML Semantics (5-8, 30-31, 36-37)
  | 'aria'       // ARIA Attributes & Live Regions (9-14, 32-33, 35)
  | 'keyboard'   // Keyboard Nav & Focus Management (15-22, 34, 39)
  | 'design'     // Visual, Color Contrast, & Multimedia (23-25, 38, 40)
  | 'testing';   // Testing & Dropdowns (26-29)

export interface QuestionData {
  id: number;
  question: string;
  answer: string;
  category: CategoryType;
  conceptName: string;
  keyTakeaways: string[];
  goodCode?: string;
  badCode?: string;
}

export interface ScreenReaderLog {
  timestamp: string;
  message: string;
  type: 'speech' | 'alert' | 'system';
}

export interface Persona {
  id: string;
  name: string;
  avatar: string;
  role: string;
  description: string;
  impacts: string[];
}
