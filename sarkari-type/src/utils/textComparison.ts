/**
 * Text Comparison Module
 *
 * Adapted from MonkeyType's validation.ts
 * Compares typed text against reference text
 * Categorizes errors: spelling, punctuation, case, missing, extra
 */

import { ErrorDetail, WordComparisonResult } from '../types';

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
 * Compare entire texts and return detailed results
 */
export function compareTexts(typedText: string, referenceText: string) {
  const typedWords = splitIntoWords(typedText);
  const referenceWords = splitIntoWords(referenceText);

  const wordResults = [];
  let totalCorrectChars = 0;
  let totalIncorrectChars = 0;
  let totalMissedChars = 0;
  let totalExtraChars = 0;

  // Compare word by word
  const maxWords = Math.max(typedWords.length, referenceWords.length);
  for (let i = 0; i < maxWords; i++) {
    const typed = typedWords[i] || '';
    const reference = referenceWords[i] || '';

    const comparison = compareWords(typed, reference);

    wordResults.push({
      reference,
      typed,
      status:
        typed === reference
          ? 'correct'
          : typed === ''
            ? 'missing'
            : reference === ''
              ? 'extra'
              : 'incorrect',
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
