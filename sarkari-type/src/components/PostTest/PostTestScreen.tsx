import { useTest } from '../../context/TestContext';
import { ResultSummary } from './ResultSummary';
import { TextComparison } from './TextComparison';
import { PDFExport } from './PDFExport';

export function PostTestScreen() {
  const { config, testState, dispatch } = useTest();

  const handleRetry = () => {
    dispatch({ type: 'RESET_TEST' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Test Complete!</h1>
          <p className="text-gray-600">Here's your detailed report and feedback</p>
        </div>

        {/* Results Summary */}
        <ResultSummary testState={testState} />

        {/* Text Comparison */}
        <TextComparison wordResults={testState.wordResults} />

        {/* PDF Export */}
        <div className="mt-8">
          <PDFExport testConfig={config} testState={testState} />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <button
            onClick={handleRetry}
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
          >
            🔄 Try Again
          </button>
          <button
            onClick={() => dispatch({ type: 'RESET_TEST' })}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
          >
            ⚙️ Configure New Test
          </button>
        </div>
      </div>
    </div>
  );
}
