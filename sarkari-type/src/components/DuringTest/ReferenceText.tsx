interface ReferenceTextProps {
  text: string;
  typedLength: number;
  showGuidePointer?: boolean;
}

export function ReferenceText({ text, typedLength, showGuidePointer = true }: ReferenceTextProps) {
  // When highlighting is disabled, show entire text uniformly
  if (!showGuidePointer) {
    return (
      <div className="font-mono leading-relaxed">
        <span className="text-gray-900">{text}</span>
      </div>
    );
  }

  // When highlighting is enabled, show position-based coloring
  return (
    <div className="font-mono leading-relaxed">
      <span className="text-gray-400">{text.slice(0, typedLength)}</span>
      {typedLength < text.length ? (
        <>
          <span className="bg-blue-500 text-white animate-pulse">{text[typedLength]}</span>
          <span className="text-gray-900">{text.slice(typedLength + 1)}</span>
        </>
      ) : null}
    </div>
  );
}
