/**
 * Scoring Module
 *
 * Calculates the final score based on:
 * - Correct words
 * - Missing words
 * - Character-level errors (spelling, punctuation, case)
 */

import { WordResult } from '../types';

export interface ScoringOptions {
  correctWord: number;
  missingWord: number;
  incorrectSpelling: number;
  punctuationError: number;
  caseError: number;
}

export function calculateFinalScore(
  wordResults: WordResult[],
  scoringOptions: ScoringOptions
): number {
  let score = 0;

  for (const result of wordResults) {
    if (result.status === 'correct') {
      // Correct word
      score += scoringOptions.correctWord;
    } else if (result.status === 'missing') {
      // Missing word
      score += scoringOptions.missingWord;
    } else if (result.status === 'extra') {
      // Extra word (typed but not in reference)
      // Apply same penalty as spelling errors
      score += scoringOptions.incorrectSpelling;
    } else {
      // Incorrect word - count penalties by error type
      for (const error of result.errors) {
        switch (error.type) {
          case 'spelling':
            score += scoringOptions.incorrectSpelling;
            break;
          case 'punctuation':
            score += scoringOptions.punctuationError;
            break;
          case 'case':
            score += scoringOptions.caseError;
            break;
          case 'missing':
            score += scoringOptions.missingWord;
            break;
          case 'extra':
            score += scoringOptions.incorrectSpelling;
            break;
        }
      }
    }
  }

  return Math.max(0, score); // Don't go below zero
}

/**
 * Calculate percentages for stats display
 */
export function calculateStats(
  correctChars: number,
  incorrectChars: number,
  totalChars: number
) {
  const accuracy = totalChars === 0 ? 100 : Math.round((correctChars / totalChars) * 100 * 100) / 100;
  const errorRate = totalChars === 0 ? 0 : Math.round(((incorrectChars + (totalChars - correctChars - incorrectChars)) / totalChars) * 100 * 100) / 100;

  return {
    accuracy,
    errorRate,
  };
}
