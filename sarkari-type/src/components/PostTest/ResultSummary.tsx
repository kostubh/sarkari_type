import { TestState } from '../../types';

interface ResultSummaryProps {
  testState: TestState;
}

export function ResultSummary({ testState }: ResultSummaryProps) {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg mb-8 border border-green-200">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
        🎉 Congratulations! Test Completed
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-white rounded shadow-sm">
          <div className="text-3xl font-bold text-blue-600">{testState.wpm.toFixed(1)}</div>
          <div className="text-sm text-gray-600 font-medium">WPM</div>
        </div>
        <div className="text-center p-4 bg-white rounded shadow-sm">
          <div className="text-3xl font-bold text-green-600">{testState.accuracy.toFixed(1)}%</div>
          <div className="text-sm text-gray-600 font-medium">Accuracy</div>
        </div>
        <div className="text-center p-4 bg-white rounded shadow-sm">
          <div className="text-3xl font-bold text-purple-600">{testState.finalScore.toFixed(1)}</div>
          <div className="text-sm text-gray-600 font-medium">Score</div>
        </div>
        <div className="text-center p-4 bg-white rounded shadow-sm">
          <div className="text-3xl font-bold text-orange-600">
            {testState.elapsedSeconds.toFixed(1)}s
          </div>
          <div className="text-sm text-gray-600 font-medium">Duration</div>
        </div>
      </div>
    </div>
  );
}
