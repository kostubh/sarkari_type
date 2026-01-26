/**
 * Timer Hook
 *
 * High-precision timer using performance.now()
 * Adapted from MonkeyType's test-timer.ts
 */

import { useState, useRef, useCallback, useEffect } from 'react';

interface UseTimerOptions {
  duration: number; // in seconds
  isTimeless: boolean;
  isActive: boolean;
  onTimeUp?: () => void;
}

export function useTimer({ duration, isTimeless, isActive, onTimeUp }: UseTimerOptions) {
  // duration is already in seconds now, based on standard config
  const durationInSeconds = duration; 
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(durationInSeconds);

  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);
  const hasCalledTimeUpRef = useRef(false);
  const onTimeUpRef = useRef(onTimeUp);

  // Keep ref in sync with latest callback to avoid re-subscribing effect
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  const reset = useCallback(() => {
    setElapsedSeconds(0);
    setRemainingSeconds(duration);
    startTimeRef.current = 0;
    hasCalledTimeUpRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, [duration]);

  useEffect(() => {
    if (!isActive) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    // Initialize start time on first activation
    if (startTimeRef.current === 0) {
      startTimeRef.current = performance.now();
    }

    const updateTimer = () => {
      const now = performance.now();
      const elapsed = (now - startTimeRef.current) / 1000;

      setElapsedSeconds(elapsed);

      if (!isTimeless) {
        const remaining = Math.max(0, duration - elapsed);
        setRemainingSeconds(remaining);

        // Call onTimeUp when timer reaches zero
        if (remaining === 0 && !hasCalledTimeUpRef.current) {
          hasCalledTimeUpRef.current = true;
          onTimeUpRef.current?.();
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateTimer);
    };

    animationFrameRef.current = requestAnimationFrame(updateTimer);

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
