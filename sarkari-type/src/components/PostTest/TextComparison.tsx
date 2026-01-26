import { WordResult } from '../../types';

interface TextComparisonProps {
  wordResults: WordResult[];
}

export function TextComparison({ wordResults }: TextComparisonProps) {
  const getWordClass = (result: WordResult): string => {
    switch (result.status) {
      case 'correct':
        return 'word-correct';
      case 'missing':
        return 'word-missing';
      case 'extra':
        return 'word-extra';
      default:
        return 'word-error';
    }
  };

  const getCharClass = (errorType?: string): string => {
    switch (errorType) {
      case 'spelling':
        return 'char-error';
      case 'case':
        return 'char-case-error';
      case 'punctuation':
        return 'char-punctuation-error';
      case 'missing':
        return 'char-missing';
      default:
        return 'char-correct';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">📋 Text Comparison</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Reference Text */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Reference Text</h4>
          <div className="p-4 bg-gray-50 rounded font-mono text-sm leading-relaxed border border-gray-200">
            {wordResults.map((result, idx) => (
              <span key={idx} className={`${getWordClass(result)} mr-1`}>
                {result.reference}
              </span>
            ))}
          </div>
        </div>

        {/* Typed Text with Error Highlighting */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Your Typing</h4>
          <div className="p-4 bg-gray-50 rounded font-mono text-sm leading-relaxed border border-gray-200">
            {wordResults.map((result, idx) => (
              <span key={idx}>
                {result.status === 'correct' ? (
                  <span className="text-green-600 mr-1">{result.typed}</span>
                ) : result.status === 'missing' ? (
                  <span className="text-gray-400 line-through mr-1">{result.reference}</span>
                ) : result.status === 'extra' ? (
                  <span className="text-orange-600 font-bold mr-1">{result.typed}</span>
                ) : (
                  <span className="mr-1">
                    {Array.from(result.typed || '').map((char, charIdx) => (
                      <span
                        key={charIdx}
                        className={
                          char === result.reference?.[charIdx]
                            ? 'text-green-600'
                            : 'text-red-600 font-bold'
                        }
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded">
        <p className="font-semibold text-gray-700 mb-3">Legend:</p>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-semibold">■</span>
            <span>Correct</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-semibold">■</span>
            <span>Spelling Error</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-600 font-semibold">■</span>
            <span>Case Error</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-600 font-semibold">■</span>
            <span>Extra/Punctuation Error</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through">■</span>
            <span>Missing Word</span>
          </div>
        </div>
      </div>
    </div>
  );
}
