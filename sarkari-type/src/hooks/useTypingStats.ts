/**
 * Typing Stats Hook
 *
 * Calculates WPM, accuracy, and error counts in real-time
 */

import { useCallback } from 'react';
import { compareTexts } from '../utils/textComparison';
import { calculateWpm, calculateAccuracy, calculateRawWpm } from '../utils/wpmCalculation';
import { calculateFinalScoreFromStats } from '../utils/scoring';
import { WordResult } from '../types';

export interface TypingStatsResult {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  missedChars: number;
  extraChars: number;
  finalScore: number;
  wordResults: WordResult[];
}

export function useTypingStats() {
  const calculateStats = useCallback(
    (
      typedText: string,
      referenceText: string,
      elapsedSeconds: number
    ): TypingStatsResult => {
      // Compare texts and get detailed results
      const comparison = compareTexts(typedText, referenceText);

      // Calculate WPM
      // Standard WPM formula treats 5 characters as 1 word
      // It should include correct spaces in the character count
      // Using only totalCorrectChars which includes letters; spaces are often implicit in typing tests 
      // but standard formula is (All Correct Entries / 5) / Time
      
      const wpm = calculateWpm(comparison.totalCorrectChars, 0, elapsedSeconds); 
      
      const rawWpm = calculateRawWpm(
        comparison.totalCorrectChars + comparison.totalIncorrectChars + comparison.totalExtraChars,
        0,
        0,
        0,
        elapsedSeconds
      );

      // Calculate accuracy including ALL error types
      const accuracy = calculateAccuracy(
        comparison.totalCorrectChars,
        comparison.totalIncorrectChars,
        comparison.totalMissedChars,
        comparison.totalExtraChars
      );

      // Calculate final score based on WPM and Accuracy
      const finalScore = calculateFinalScoreFromStats(wpm, accuracy);
      
      return {
        wpm: isFinite(wpm) ? wpm : 0,
        rawWpm: isFinite(rawWpm) ? rawWpm : 0,
        accuracy: isFinite(accuracy) ? accuracy : 100,
        correctChars: comparison.totalCorrectChars,
        incorrectChars: comparison.totalIncorrectChars,
        missedChars: comparison.totalMissedChars,
        extraChars: comparison.totalExtraChars,
        finalScore,
        wordResults: comparison.wordResults,
      };
    },
    []
  );

  return { calculateStats };
}
