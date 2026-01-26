import { useEffect, useCallback, RefObject } from 'react';

/**
 * Hook to manage fullscreen mode using browser Fullscreen API
 */
export function useFullscreen(elementRef: RefObject<HTMLElement>, isFullscreen: boolean) {
  const enterFullscreen = useCallback(async () => {
    const element = elementRef.current;
    if (!element) return;

    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        // Safari
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        // Firefox
        await (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        // IE/Edge
        await (element as any).msRequestFullscreen();
      }
    } catch (error) {
      console.error('Error entering fullscreen:', error);
    }
  }, [elementRef]);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        // Safari
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        // Firefox
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        // IE/Edge
        await (document as any).msExitFullscreen();
      }
    } catch (error) {
      console.error('Error exiting fullscreen:', error);
    }
  }, []);

  // Handle fullscreen changes
  useEffect(() => {
    if (isFullscreen) {
      enterFullscreen();
    } else {
      // Only exit if we're actually in fullscreen mode
      const isCurrentlyFullscreen = !!
        (document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement);
      
      if (isCurrentlyFullscreen) {
        exitFullscreen();
      }
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  return { enterFullscreen, exitFullscreen };
}
