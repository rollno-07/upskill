/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from '../types';
import { QUESTIONS_1_25 } from './questions1_25';
import { QUESTIONS_26_50 } from './questions26_50';
import { QUESTIONS_51_75 } from './questions51_75';
import { QUESTIONS_76_100 } from './questions76_100';

export const ALL_QUESTIONS: Question[] = [
  ...QUESTIONS_1_25,
  ...QUESTIONS_26_50,
  ...QUESTIONS_51_75,
  ...QUESTIONS_76_100
];
