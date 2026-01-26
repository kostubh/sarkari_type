import { useTest } from '../../context/TestContext';
import { TimeConfig } from './TimeConfig';
import { TextSourceConfig } from './TextSourceConfig';
import { ScoringConfig } from './ScoringConfig';

export function PreTestScreen() {
  const { config, dispatch } = useTest();

  const isReady = config.customText && config.customText.trim().length > 0;

  const handleStartTest = () => {
    if (!isReady) {
      alert('Please generate or paste text before starting');
      return;
    }
    dispatch({
      type: 'START_TEST',
      payload: config.customText,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">SarkariType</h1>
          <p className="text-gray-600">Master Your Typing Skills with AI-Generated Text</p>
        </div>

        {/* Configuration Sections */}
        <div className="space-y-6 mb-8">
          <TimeConfig />
          <TextSourceConfig />
          <ScoringConfig />
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={handleStartTest}
            disabled={!isReady}
            className={`px-8 py-3 rounded-lg font-bold text-lg transition ${
              isReady
                ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
          >
            {isReady ? '▶️ Start Test' : '⚠️ Configure & Generate Text First'}
          </button>
        </div>
      </div>
    </div>
  );
}