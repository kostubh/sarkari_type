interface ReferenceTextProps {
  text: string;
  typedLength: number;
  showGuidePointer?: boolean;
}

export function ReferenceText({ text, typedLength, showGuidePointer = true }: ReferenceTextProps) {
  return (
    <div className="font-mono leading-relaxed">
      <span className="text-gray-400">{text.slice(0, typedLength)}</span>
      {showGuidePointer && typedLength < text.length ? (
        <>
          <span className="bg-blue-500 text-white animate-pulse">{text[typedLength]}</span>
          <span className="text-gray-900">{text.slice(typedLength + 1)}</span>
        </>
      ) : (
        <span className="text-gray-900">{text.slice(typedLength)}</span>
      )}
    </div>
  );
}
