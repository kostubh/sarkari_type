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
    // If elapsedSeconds is 0 (immediate finish), fallback to a small value to avoid division by zero
    const finalElapsed = Math.max(0.1, elapsedSeconds);

    const finalStats = calculateStats(
      testState.typedText,
      testState.referenceText,
      finalElapsed
    );

    dispatch({
      type: 'UPDATE_STATS',
      payload: {
        elapsedSeconds: finalElapsed, // Save final elapsed time to state
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
  
  const { elapsedSeconds, remainingSeconds } = useTimer({
    duration: config.duration,
    isTimeless,
    isActive: testState.phase === 'during' && !testState.isPaused && testState.startTime > 0,
    onTimeUp: handleFinishTest,
  });

  // Update stats periodically
  useEffect(() => {
    updateIntervalRef.current = setInterval(() => {
      // Only update if we have actually started (startTime > 0)
      if (testState.phase === 'during' && !testState.isPaused && testState.startTime > 0) {
        // Prevent 0 division in live stats
        const currentElapsed = Math.max(0.1, elapsedSeconds);
        
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

    return () => {
      if (updateIntervalRef.current) clearInterval(updateIntervalRef.current);
    };
  }, [
    testState.phase, 
    testState.isPaused, 
    testState.startTime, 
    testState.typedText, 
    // Remove testState.referenceText from dep array to avoid re-renders if it doesn't change
    elapsedSeconds, 
    calculateStats, 
    dispatch
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
        timer={remainingSeconds} 
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
          onTextChange={(text) => {
            dispatch({ type: 'UPDATE_STATS', payload: { typedText: text } });
          }}
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
