/**
 * Test Context
 *
 * Central state management for the entire typing test application
 * Provides test configuration, test state, and dispatch actions
 */

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { TestConfig, TestState, DEFAULT_CONFIG, DEFAULT_TEST_STATE } from '../types';

interface TestContextType {
  config: TestConfig;
  testState: TestState;
  dispatch: (action: TestAction) => void;
}

export type TestAction =
  | { type: 'SET_CONFIG'; payload: Partial<TestConfig> }
  | { type: 'START_TEST'; payload: string } // reference text
  | { type: 'ADD_TYPED_CHAR'; payload: string }
  | { type: 'DELETE_CHAR' }
  | { type: 'UPDATE_STATS'; payload: Partial<TestState> }
  | { type: 'PAUSE_TEST' }
  | { type: 'RESUME_TEST' }
  | { type: 'FINISH_TEST' }
  | { type: 'RESET_TEST' }
  | { type: 'TOGGLE_FULLSCREEN' };

// Create context
const TestContext = createContext<TestContextType | undefined>(undefined);

// Initial combined state
interface CombinedState {
  config: TestConfig;
  testState: TestState;
}

const initialState: CombinedState = {
  config: DEFAULT_CONFIG,
  testState: DEFAULT_TEST_STATE,
};

// Reducer function
function testReducer(state: CombinedState, action: TestAction): CombinedState {
  switch (action.type) {
    case 'SET_CONFIG':
      return {
        ...state,
        config: {
          ...state.config,
          ...action.payload,
        },
      };

    case 'START_TEST':
      return {
        ...state,
        testState: {
          ...state.testState,
          phase: 'during',
          referenceText: action.payload,
          referenceWords: action.payload.split(/\s+/).filter((w) => w.length > 0),
          startTime: 0, // Will be set on first keystroke
          typedText: '',
          typedWords: [],
          correctChars: 0,
          incorrectChars: 0,
          missedChars: 0,
          extraChars: 0,
          wpm: 0,
          accuracy: 100,
          elapsedSeconds: 0,
        },
      };

    case 'ADD_TYPED_CHAR':
      return {
        ...state,
        testState: {
          ...state.testState,
          typedText: state.testState.typedText + action.payload,
          // Set startTime on first character only
          startTime: state.testState.startTime === 0 ? Date.now() : state.testState.startTime,
        },
      };

    case 'DELETE_CHAR':
      return {
        ...state,
        testState: {
          ...state.testState,
          typedText: state.testState.typedText.slice(0, -1),
        },
      };

    case 'UPDATE_STATS':
      return {
        ...state,
        testState: {
          ...state.testState,
          ...action.payload,
        },
      };

    case 'PAUSE_TEST':
      return {
        ...state,
        testState: {
          ...state.testState,
          isPaused: true,
        },
      };

    case 'RESUME_TEST':
      return {
        ...state,
        testState: {
          ...state.testState,
          isPaused: false,
        },
      };

    case 'FINISH_TEST':
      return {
        ...state,
        testState: {
          ...state.testState,
          phase: 'post',
          isPaused: true,
        },
      };

    case 'RESET_TEST':
      return {
        ...state,
        testState: DEFAULT_TEST_STATE,
      };

    case 'TOGGLE_FULLSCREEN':
      return {
        ...state,
        testState: {
          ...state.testState,
          isFullscreen: !state.testState.isFullscreen,
        },
      };

    default:
      return state;
  }
}

// Provider component
interface TestProviderProps {
  children: ReactNode;
}

export function TestProvider({ children }: TestProviderProps) {
  const [state, dispatch] = useReducer(testReducer, initialState);

  const value: TestContextType = {
    config: state.config,
    testState: state.testState,
    dispatch,
  };

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
}

// Hook to use the context
export function useTest(): TestContextType {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}
