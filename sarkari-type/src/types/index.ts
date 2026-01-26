// Test Configuration
export interface TestConfig {
  timeMode: 'timed' | 'timeless';
  duration: number; // in minutes
  wordCount: number; // number of words for text generation
  textSource: 'ai' | 'wikipedia' | 'custom';
  aiTopic: string;
  aiPromptType: 'preset' | 'custom';
  customPrompt: string;
  customText: string;
  wikipediaTopic: string; // Selected Wikipedia article topic
  scoringOptions: {
    correctWord: number;
    missingWord: number;
    incorrectSpelling: number;
    punctuationError: number;
    caseError: number;
  };
  displaySettings: {
    fontSize: 'small' | 'medium' | 'large';
    contrast: 'low' | 'medium' | 'high';
    showGuidePointer: boolean;
    textColor: string;
  };
}

// Test State
export interface TestState {
  phase: 'pre' | 'during' | 'post';
  isFullscreen: boolean;
  isPaused: boolean;
  referenceText: string;
  referenceWords: string[];
  typedText: string;
  typedWords: string[];
  currentWordIndex: number;
  startTime: number;
  elapsedSeconds: number;
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

// Word Comparison Result
export interface WordResult {
  reference: string;
  typed: string;
  status: 'correct' | 'incorrect' | 'missing' | 'extra';
  errors: ErrorDetail[];
}

// Error Detail
export interface ErrorDetail {
  type: 'spelling' | 'punctuation' | 'case' | 'missing' | 'extra';
  position: number;
  expected: string;
  actual: string;
}

// Word Comparison Result
export interface WordComparisonResult {
  isCorrect: boolean;
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  missedChars: number;
  errors: ErrorDetail[];
}

// Default Config
export const DEFAULT_CONFIG: TestConfig = {
  timeMode: 'timed',
  duration: 1, // in minutes
  wordCount: 100, // number of words
  textSource: 'wikipedia', // Default to Wikipedia
  aiTopic: 'Technology',
  aiPromptType: 'preset',
  customPrompt: '',
  customText: '',
  wikipediaTopic: 'Random Article', // Default Wikipedia selection
  scoringOptions: {
    correctWord: 10,
    missingWord: -5,
    incorrectSpelling: -2,
    punctuationError: -1,
    caseError: -1,
  },
  displaySettings: {
    fontSize: 'medium',
    contrast: 'medium',
    showGuidePointer: true,
    textColor: '#000000',
  },
};

// Default Test State
export const DEFAULT_TEST_STATE: TestState = {
  phase: 'pre',
  isFullscreen: false,
  isPaused: false,
  referenceText: '',
  referenceWords: [],
  typedText: '',
  typedWords: [],
  currentWordIndex: 0,
  startTime: 0,
  elapsedSeconds: 0,
  wpm: 0,
  rawWpm: 0,
  accuracy: 100,
  correctChars: 0,
  incorrectChars: 0,
  missedChars: 0,
  extraChars: 0,
  finalScore: 0,
  wordResults: [],
};
