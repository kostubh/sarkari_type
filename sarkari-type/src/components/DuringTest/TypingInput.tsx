import { useEffect } from 'react';

interface TypingInputProps {
  inputRef: React.RefObject<HTMLDivElement>;
  onKeyPress: (char: string) => void;
  onDelete: () => void;
  typedText: string;
}

export function TypingInput({
  inputRef,
  onKeyPress,
  onDelete,
  typedText,
}: TypingInputProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default for most keys to avoid unwanted browser behavior
      if (e.key === 'Backspace') {
        e.preventDefault();
        onDelete();
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        // Regular character (not a special key or shortcut)
        e.preventDefault();
        onKeyPress(e.key);
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const pastedText = e.clipboardData?.getData('text') || '';
      // For paste, we need to manually trigger keypress for each char to set startTime
      if (pastedText) {
        for (const char of pastedText) {
          onKeyPress(char);
        }
      }
    };

    const divElement = inputRef.current;
    if (divElement) {
      divElement.addEventListener('keydown', handleKeyDown);
      divElement.addEventListener('paste', handlePaste);
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener('keydown', handleKeyDown);
        divElement.removeEventListener('paste', handlePaste);
      }
    };
  }, [onKeyPress, onDelete, inputRef]);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <div
      ref={inputRef}
      className="w-full border-2 border-gray-300 rounded p-4 bg-gray-50 font-mono text-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 cursor-text"
      tabIndex={0}
      role="textbox"
      aria-label="Typing input area"
    >
      <span className="text-gray-700">{typedText}</span>
      <span className="animate-pulse">|</span>
      <p className="text-xs text-gray-500 mt-2">Click here and start typing...</p>
    </div>
  );
}
