/**
 * Scoring Module
 *
 * Calculates the final score based on:
 * - WPM (Words Per Minute)
 * - Accuracy percentage
 * 
 * Formula: Score = WPM * (Accuracy / 100)
 */

import { WordResult } from '../types';

export interface ScoringOptions {
  correctWord: number;
  missingWord: number;
  incorrectSpelling: number;
  punctuationError: number;
  caseError: number;
}

/**
 * Calculate final score based on WPM and accuracy
 * Formula: Score = WPM * (Accuracy / 100)
 * @param wpm Words per minute
 * @param accuracy Accuracy percentage (0-100)
 * @returns Final score
 */
export function calculateFinalScoreFromStats(wpm: number, accuracy: number): number {
  const score = wpm * (accuracy / 100);
  return Math.max(0, Math.round(score * 100) / 100); // Round to 2 decimal places
}

/**
 * Legacy function kept for backward compatibility
 * Calculates final score based on word results (deprecated - use calculateFinalScoreFromStats instead)
 */
export function calculateFinalScore(
  wordResults: WordResult[],
  scoringOptions: ScoringOptions
): number {
  let score = 0;
  
  // Debug logging
  console.log('calculateFinalScore (deprecated) called with:', {
    wordResultsLength: wordResults?.length || 0,
    wordResults: wordResults?.slice(0, 5), // Log first 5 for debugging
    scoringOptions,
  });
  
  if (!wordResults || wordResults.length === 0) {
    console.warn('calculateFinalScore: wordResults is empty');
    return 0;
  }

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

  console.log('calculateFinalScore result:', score);
  return Math.max(0, score); // Don't go below zero
}

/**
 * Calculate percentages for stats display
 */

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
