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

  // Handle empty or undefined wordResults
  if (!wordResults || wordResults.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">📋 Text Comparison</h3>
        <p className="text-gray-500 text-center py-8">No comparison data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">📋 Text Comparison</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Reference Text */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Reference Text</h4>
          <div className="p-4 bg-gray-50 rounded font-mono text-sm leading-relaxed border border-gray-200 overflow-hidden word-break">
            {wordResults.map((result, idx) => (
              <span key={idx} className={`${getWordClass(result)} inline`}>
                {result.reference}{idx < wordResults.length - 1 ? ' ' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Typed Text with Error Highlighting */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Your Typing</h4>
          <div className="p-4 bg-gray-50 rounded font-mono text-sm leading-relaxed border border-gray-200 overflow-hidden word-break">
            {wordResults.map((result, idx) => (
              <span key={idx} className="inline">
                {result.status === 'correct' ? (
                  <span className="text-green-600">{result.typed}{idx < wordResults.length - 1 ? ' ' : ''}</span>
                ) : result.status === 'missing' ? (
                  <span className="text-gray-400 line-through">{result.reference}{idx < wordResults.length - 1 ? ' ' : ''}</span>
                ) : result.status === 'extra' ? (
                  <span className="text-orange-600 font-bold">{result.typed}{idx < wordResults.length - 1 ? ' ' : ''}</span>
                ) : (
                  <span>
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
                    {idx < wordResults.length - 1 ? ' ' : ''}
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
