/**
 * Text Comparison Module
 *
 * Implements sequence alignment algorithm with fuzzy matching
 * to properly detect character-level errors even in misspelled words
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
 * Calculate similarity score between two words using Levenshtein distance
 * Returns value between 0 (completely different) and 1 (identical)
 */
function wordSimilarity(word1: string, word2: string): number {
  if (word1 === word2) return 1.0;
  if (word1.length === 0 || word2.length === 0) return 0.0;

  // Use normalized Levenshtein distance
  const maxLen = Math.max(word1.length, word2.length);
  const distance = levenshteinDistance(word1, word2);
  return 1 - distance / maxLen;
}

/**
 * Compute Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,    // deletion
          dp[i][j - 1] + 1,    // insertion
          dp[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  return dp[m][n];
}

/**
 * Compute similarity matrix and LCS with fuzzy matching
 * Uses similarity threshold to align similar (but not identical) words
 */
function computeFuzzyLCS(arr1: string[], arr2: string[]): number[][] {
  const m = arr1.length;
  const n = arr2.length;
  const SIMILARITY_THRESHOLD = 0.5; // Words must be at least 50% similar to align

  const dp: number[][] = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const similarity = wordSimilarity(arr1[i - 1], arr2[j - 1]);
      
      if (similarity >= SIMILARITY_THRESHOLD) {
        // Similar words - align them (weighted by similarity)
        dp[i][j] = dp[i - 1][j - 1] + similarity;
      } else {
        // Not similar enough - treat as different
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp;
}

/**
 * Align two word arrays using fuzzy LCS algorithm
 * Returns aligned pairs, matching similar words even if not identical
 */
function alignWords(typedWords: string[], referenceWords: string[]): Array<{ typed: string | null; reference: string | null }> {
  const dp = computeFuzzyLCS(typedWords, referenceWords);
  const aligned: Array<{ typed: string | null; reference: string | null }> = [];
  const SIMILARITY_THRESHOLD = 0.5;

  let i = typedWords.length;
  let j = referenceWords.length;

  // Backtrack to find alignment
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0) {
      const similarity = wordSimilarity(typedWords[i - 1], referenceWords[j - 1]);
      
      if (similarity >= SIMILARITY_THRESHOLD) {
        // Words are similar enough to align
        aligned.unshift({ typed: typedWords[i - 1], reference: referenceWords[j - 1] });
        i--;
        j--;
        continue;
      }
    }
    
    if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
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
 * Compare entire texts using fuzzy sequence alignment algorithm
 * This properly handles missing/extra words AND character-level errors
 */
export function compareTexts(typedText: string, referenceText: string) {
  const typedWords = splitIntoWords(typedText);
  const referenceWords = splitIntoWords(referenceText);

  // Use fuzzy LCS-based alignment to match similar words
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
      // Similar words aligned - compare character by character
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
