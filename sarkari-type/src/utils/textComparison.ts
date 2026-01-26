/**
 * Text Comparison Module
 *
 * Implements sequence alignment algorithm (similar to git diff)
 * to properly match words even when some are missing or extra
 */

import { ErrorDetail, WordComparisonResult, WordResult } from '../types';

export function isCharCorrect(
  inputChar: string,
  targetChar: string,
  checkCase: boolean = true
): boolean {
  if (inputChar === undefined || targetChar === undefined) {
    return false;
  }

  if (checkCase) {
    return inputChar === targetChar;
  }

  return inputChar.toLowerCase() === targetChar.toLowerCase();
}

export function compareWords(
  typedWord: string,
  referenceWord: string
): WordComparisonResult {
  const errors: ErrorDetail[] = [];
  let correctChars = 0;
  let incorrectChars = 0;
  let extraChars = 0;
  let missedChars = 0;

  const maxLen = Math.max(typedWord.length, referenceWord.length);

  for (let i = 0; i < maxLen; i++) {
    const typed = typedWord[i];
    const reference = referenceWord[i];

    if (typed === undefined) {
      // Missing character
      missedChars++;
      errors.push({
        type: 'missing',
        position: i,
        expected: reference || '',
        actual: '',
      });
    } else if (reference === undefined) {
      // Extra character
      extraChars++;
      errors.push({
        type: 'extra',
        position: i,
        expected: '',
        actual: typed,
      });
    } else if (typed === reference) {
      correctChars++;
    } else {
      // Determine error type
      incorrectChars++;
      const errorType = categorizeError(typed, reference);
      errors.push({
        type: errorType,
        position: i,
        expected: reference,
        actual: typed,
      });
    }
  }

  return {
    isCorrect: errors.length === 0,
    correctChars,
    incorrectChars,
    extraChars,
    missedChars,
    errors,
  };
}

function categorizeError(typed: string, expected: string): 'spelling' | 'punctuation' | 'case' {
  // Space/whitespace error - treat as punctuation
  if (typed === ' ' || expected === ' ') {
    return 'punctuation';
  }

  // Case error: same letter, different case
  if (typed.toLowerCase() === expected.toLowerCase()) {
    return 'case';
  }

  // Punctuation error
  const punctuation = /[.,!?;:'"()\-—–—]/;
  if (punctuation.test(expected) || punctuation.test(typed)) {
    return 'punctuation';
  }

  // Default to spelling error
  return 'spelling';
}

/**
 * Split text into words by spaces
 */
export function splitIntoWords(text: string): string[] {
  return text.split(/\s+/).filter((word) => word.length > 0);
}

/**
 * Compute Longest Common Subsequence (LCS) length matrix
 * Used for sequence alignment similar to git diff
 */
function computeLCS(arr1: string[], arr2: string[]): number[][] {
  const m = arr1.length;
  const n = arr2.length;
  const dp: number[][] = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp;
}

/**
 * Align two word arrays using LCS algorithm
 * Returns aligned pairs with null for missing/extra words
 */
function alignWords(typedWords: string[], referenceWords: string[]): Array<{ typed: string | null; reference: string | null }> {
  const dp = computeLCS(typedWords, referenceWords);
  const aligned: Array<{ typed: string | null; reference: string | null }> = [];

  let i = typedWords.length;
  let j = referenceWords.length;

  // Backtrack to find alignment
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && typedWords[i - 1] === referenceWords[j - 1]) {
      // Match found
      aligned.unshift({ typed: typedWords[i - 1], reference: referenceWords[j - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      // Missing word (in reference but not typed)
      aligned.unshift({ typed: null, reference: referenceWords[j - 1] });
      j--;
    } else if (i > 0) {
      // Extra word (typed but not in reference)
      aligned.unshift({ typed: typedWords[i - 1], reference: null });
      i--;
    }
  }

  return aligned;
}

/**
 * Compare entire texts using sequence alignment algorithm
 * This properly handles missing/extra words without cascading errors
 */
export function compareTexts(typedText: string, referenceText: string) {
  const typedWords = splitIntoWords(typedText);
  const referenceWords = splitIntoWords(referenceText);

  // Use LCS-based alignment to match words properly
  const alignedPairs = alignWords(typedWords, referenceWords);

  const wordResults: WordResult[] = [];
  let totalCorrectChars = 0;
  let totalIncorrectChars = 0;
  let totalMissedChars = 0;
  let totalExtraChars = 0;

  // Process aligned word pairs
  for (const pair of alignedPairs) {
    const typed = pair.typed || '';
    const reference = pair.reference || '';

    let status: 'correct' | 'incorrect' | 'missing' | 'extra';
    let comparison: WordComparisonResult;

    if (pair.typed === null) {
      // Missing word (in reference but not typed)
      status = 'missing';
      comparison = {
        isCorrect: false,
        correctChars: 0,
        incorrectChars: 0,
        extraChars: 0,
        missedChars: reference.length,
        errors: [],
      };
    } else if (pair.reference === null) {
      // Extra word (typed but not in reference)
      status = 'extra';
      comparison = {
        isCorrect: false,
        correctChars: 0,
        incorrectChars: 0,
        extraChars: typed.length,
        missedChars: 0,
        errors: [],
      };
    } else if (typed === reference) {
      // Exact match
      status = 'correct';
      comparison = {
        isCorrect: true,
        correctChars: typed.length,
        incorrectChars: 0,
        extraChars: 0,
        missedChars: 0,
        errors: [],
      };
    } else {
      // Incorrect spelling (words aligned but different)
      status = 'incorrect';
      comparison = compareWords(typed, reference);
    }

    wordResults.push({
      reference,
      typed,
      status,
      errors: comparison.errors,
    });

    totalCorrectChars += comparison.correctChars;
    totalIncorrectChars += comparison.incorrectChars;
    totalMissedChars += comparison.missedChars;
    totalExtraChars += comparison.extraChars;
  }

  return {
    wordResults,
    totalCorrectChars,
    totalIncorrectChars,
    totalMissedChars,
    totalExtraChars,
  };
}
