/**
 * WPM Calculation Module
 *
 * Adapted from MonkeyType's test-stats.ts
 * Standard formula: 1 word = 5 characters
 * WPM = (correctChars + correctSpaces) * (60 / testSeconds) / 5
 */

export function calculateWpm(
  correctChars: number,
  correctSpaces: number,
  testSeconds: number
): number {
  if (testSeconds <= 0) return 0;
  const wpm = ((correctChars + correctSpaces) * (60 / testSeconds)) / 5;
  return Math.round(wpm * 100) / 100; // Round to 2 decimal places
}

export function calculateRawWpm(
  allChars: number,
  spaces: number,
  incorrectChars: number,
  extraChars: number,
  testSeconds: number
): number {
  if (testSeconds <= 0) return 0;
  const raw = ((allChars + spaces + incorrectChars + extraChars) * (60 / testSeconds)) / 5;
  return Math.round(raw * 100) / 100;
}

export function calculateAccuracy(
  correctChars: number,
  incorrectChars: number
): number {
  const total = correctChars + incorrectChars;
  if (total === 0) return 100;
  const accuracy = (correctChars / total) * 100;
  return Math.round(accuracy * 100) / 100;
}
