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
      // Count correct spaces between words
      const typedWords = typedText.split(/\s+/).filter((w) => w.length > 0);
      const correctSpaces = Math.min(typedWords.length - 1, comparison.wordResults.filter((wr) => wr.status === 'correct').length - 1);
      const correctSpacesCount = Math.max(0, correctSpaces);

      const wpm = calculateWpm(comparison.totalCorrectChars, correctSpacesCount, elapsedSeconds);
      const rawWpm = calculateRawWpm(
        comparison.totalCorrectChars + comparison.totalIncorrectChars,
        typedWords.length > 0 ? typedWords.length - 1 : 0,
        comparison.totalIncorrectChars,
        comparison.totalExtraChars,
        elapsedSeconds
      );

      // Calculate accuracy
      const accuracy = calculateAccuracy(comparison.totalCorrectChars, comparison.totalIncorrectChars);

      // Calculate final score based on WPM and Accuracy
      const finalScore = calculateFinalScoreFromStats(wpm, accuracy);
      
      console.log('useTypingStats calculateStats result:', {
        typedTextLength: typedText.length,
        referenceTextLength: referenceText.length,
        elapsedSeconds,
        wpm,
        accuracy,
        wordResultsCount: comparison.wordResults.length,
        finalScore,
        correctCount: comparison.wordResults.filter((w) => w.status === 'correct').length,
        incorrectCount: comparison.wordResults.filter((w) => w.status === 'incorrect').length,
        extraCount: comparison.wordResults.filter((w) => w.status === 'extra').length,
        missingCount: comparison.wordResults.filter((w) => w.status === 'missing').length,
      });

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
