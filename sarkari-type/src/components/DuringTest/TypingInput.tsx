import { useRef, useEffect } from 'react';

interface TypingInputProps {
  inputRef: React.RefObject<HTMLDivElement>;
  onTextChange: (text: string) => void;
  onKeyPress: (char: string) => void;
  onDelete: () => void;
  typedText: string;
}

export function TypingInput({
  inputRef,
  onTextChange,
  onKeyPress,
  onDelete,
  typedText,
}: TypingInputProps) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        onDelete();
      } else if (e.key.length === 1) {
        // Regular character
        onKeyPress(e.key);
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const pastedText = e.clipboardData?.getData('text') || '';
      onTextChange(typedText + pastedText);
    };

    inputRef.current?.addEventListener('keydown', handleKeyDown);
    inputRef.current?.addEventListener('paste', handlePaste);

    return () => {
      inputRef.current?.removeEventListener('keydown', handleKeyDown);
      inputRef.current?.removeEventListener('paste', handlePaste);
    };
  }, [onKeyPress, onDelete, onTextChange, typedText, inputRef]);

  return (
    <>
      {/* Hidden input for focus and paste handling */}
      <input
        ref={hiddenInputRef}
        type="text"
        style={{ position: 'absolute', left: '-9999px' }}
        onChange={(e) => onTextChange(e.target.value)}
      />

      {/* Visual typing area with focus */}
      <div
        ref={inputRef}
        onClick={() => hiddenInputRef.current?.focus()}
        className="w-full border-2 border-gray-300 rounded p-4 bg-gray-50 font-mono text-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        tabIndex={0}
      >
        <span className="text-gray-700">{typedText}</span>
        <span className="animate-pulse">|</span>
      </div>

      <p className="text-xs text-gray-500 mt-2">Click here and start typing...</p>
    </>
  );
}
