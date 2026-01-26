/**
 * Timer Hook
 *
 * High-precision timer using performance.now()
 * Supports pause/resume and auto-cleanup
 */

import { useState, useRef, useCallback, useEffect } from 'react';

interface UseTimerOptions {
  duration: number; // in seconds
  isTimeless: boolean;
  isActive: boolean;
  onTimeUp?: () => void;
}

export function useTimer({ duration, isTimeless, isActive, onTimeUp }: UseTimerOptions) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(duration);

  // Refs to track timing state without re-renders
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);
  const hasCalledTimeUpRef = useRef(false);
  const onTimeUpRef = useRef(onTimeUp);

  // Keep callback ref fresh
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  const reset = useCallback(() => {
    setElapsedSeconds(0);
    setRemainingSeconds(duration);
    startTimeRef.current = 0;
    accumulatedTimeRef.current = 0;
    hasCalledTimeUpRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, [duration]);

  // Handle Active State Changes (Start/Pause/Resume)
  useEffect(() => {
    if (isActive) {
      // START or RESUME
      startTimeRef.current = performance.now();
      hasCalledTimeUpRef.current = false;

      const updateTimer = () => {
        const now = performance.now();
        const currentSessionElapsed = (now - startTimeRef.current) / 1000;
        const totalElapsed = accumulatedTimeRef.current + currentSessionElapsed;

        setElapsedSeconds(totalElapsed);

        if (!isTimeless) {
          const remaining = Math.max(0, duration - totalElapsed);
          setRemainingSeconds(remaining);

          if (remaining <= 0 && !hasCalledTimeUpRef.current) {
            hasCalledTimeUpRef.current = true;
            onTimeUpRef.current?.();
          }
        }

        animationFrameRef.current = requestAnimationFrame(updateTimer);
      };

      animationFrameRef.current = requestAnimationFrame(updateTimer);
    } else {
      // PAUSE or STOP
      if (startTimeRef.current > 0) {
        // If we were running, accumulate the elapsed time
        const now = performance.now();
        accumulatedTimeRef.current += (now - startTimeRef.current) / 1000;
        startTimeRef.current = 0; // Reset session start
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, isTimeless, duration]);

  return {
    elapsedSeconds: Math.round(elapsedSeconds * 100) / 100,
    remainingSeconds: Math.round(remainingSeconds * 100) / 100,
    reset,
    timeUp: remainingSeconds <= 0 && !isTimeless,
  };
}
