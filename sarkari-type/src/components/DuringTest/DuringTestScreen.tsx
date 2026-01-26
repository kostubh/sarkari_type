import { useEffect, useRef } from 'react';
import { useTest } from '../../context/TestContext';
import { useTimer } from '../../hooks/useTimer';
import { useTypingStats } from '../../hooks/useTypingStats';
import { ReferenceText } from './ReferenceText';
import { TypingInput } from './TypingInput';
import { StatsBar } from './StatsBar';
import { ControlButtons } from './ControlButtons';

export function DuringTestScreen() {
  const { config, testState, dispatch } = useTest();
  const { calculateStats } = useTypingStats();
  const inputRef = useRef<HTMLDivElement>(null);
  const updateIntervalRef = useRef<ReturnType<typeof setInterval>>();

  const isTimeless = config.timeMode === 'timeless';
  
  const handleFinishTest = () => {
    // Use the actual elapsed time from timer, with minimal fallback only for edge cases
    const finalElapsed = timer.elapsedSeconds > 0 ? timer.elapsedSeconds : 0.01;

    const finalStats = calculateStats(
      testState.typedText,
      testState.referenceText,
      finalElapsed
    );

    dispatch({
      type: 'UPDATE_STATS',
      payload: {
        elapsedSeconds: finalElapsed,
        wpm: finalStats.wpm,
        rawWpm: finalStats.rawWpm,
        accuracy: finalStats.accuracy,
        correctChars: finalStats.correctChars,
        incorrectChars: finalStats.incorrectChars,
        missedChars: finalStats.missedChars,
        extraChars: finalStats.extraChars,
        finalScore: finalStats.finalScore,
        wordResults: finalStats.wordResults,
      },
    });

    dispatch({ type: 'FINISH_TEST' });
  };
  
  const timer = useTimer({
    duration: config.duration,
    isTimeless,
    isActive: testState.phase === 'during' && !testState.isPaused && testState.startTime > 0,
    onTimeUp: handleFinishTest,
  });

  // Update stats periodically during active typing
  // This effect should only recreate when test phase changes, not on every keystroke
  useEffect(() => {
    // Clear any existing interval
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
    }

    // Only set up interval if test is in progress
    if (testState.phase === 'during') {
      updateIntervalRef.current = setInterval(() => {
        // Only update if we have actually started (startTime > 0) and not paused
        if (testState.startTime > 0 && !testState.isPaused) {
          // Use actual elapsed time, with minimal fallback for initial render
          const currentElapsed = timer.elapsedSeconds > 0 ? timer.elapsedSeconds : 0.01;
          
          const stats = calculateStats(
            testState.typedText,
            testState.referenceText,
            currentElapsed
          );

          dispatch({
            type: 'UPDATE_STATS',
            payload: {
              elapsedSeconds: currentElapsed,
              wpm: stats.wpm,
              rawWpm: stats.rawWpm,
              accuracy: stats.accuracy,
              correctChars: stats.correctChars,
              incorrectChars: stats.incorrectChars,
              missedChars: stats.missedChars,
              extraChars: stats.extraChars,
              finalScore: stats.finalScore,
              wordResults: stats.wordResults,
            },
          });
        }
      }, 200);
    }

    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [
    testState.phase,
    // We intentionally do NOT include testState.typedText, testState.isPaused, 
    // testState.startTime, or timer.elapsedSeconds to prevent constant recreation
    // The interval will read the current values from closure on each tick
  ]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const fontSizeClass =
    config.displaySettings.fontSize === 'small'
      ? 'text-base'
      : config.displaySettings.fontSize === 'large'
        ? 'text-2xl'
        : 'text-lg';

  const contrastClass =
    config.displaySettings.contrast === 'high'
      ? 'text-gray-900'
      : config.displaySettings.contrast === 'low'
        ? 'text-gray-400'
        : 'text-gray-700';

  const containerClass = testState.isFullscreen ? 'fullscreen-container' : '';

  return (
    <div className={`${containerClass} flex flex-col h-screen bg-white`}>
      {/* Stats Bar */}
      <StatsBar 
        wpm={testState.wpm} 
        accuracy={testState.accuracy} 
        mistakes={testState.incorrectChars} 
        timer={timer.remainingSeconds} 
        isTimeless={isTimeless} 
      />

      {/* Reference Text */}
      <div className={`flex-1 overflow-auto p-6 bg-gray-50 ${fontSizeClass} ${contrastClass}`}>
        <ReferenceText
          text={testState.referenceText}
          typedLength={testState.typedText.length}
          showGuidePointer={config.displaySettings.showGuidePointer}
        />
      </div>

      {/* Typing Input */}
      <div className="p-6 border-t border-gray-200">
        <TypingInput
          inputRef={inputRef}
          onKeyPress={(char) => {
            dispatch({ type: 'ADD_TYPED_CHAR', payload: char });
          }}
          onDelete={() => {
            dispatch({ type: 'DELETE_CHAR' });
          }}
          typedText={testState.typedText}
        />
      </div>

      {/* Control Buttons */}
      <ControlButtons
        onPause={() => dispatch({ type: 'PAUSE_TEST' })}
        onResume={() => dispatch({ type: 'RESUME_TEST' })}
        onFinish={handleFinishTest}
        onReset={() => dispatch({ type: 'RESET_TEST' })}
        onToggleFullscreen={() => dispatch({ type: 'TOGGLE_FULLSCREEN' })}
        isPaused={testState.isPaused}
        isFullscreen={testState.isFullscreen}
      />
    </div>
  );
}
