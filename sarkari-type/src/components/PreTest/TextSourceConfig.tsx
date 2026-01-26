import { useState } from 'react';
import { useTest } from '../../context/TestContext';
import { generateAIText, fetchWikipediaText, getAITopics, prepareText } from '../../services/textApi';

export function TextSourceConfig() {
  const { config, dispatch } = useTest();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateAI = async () => {
    setLoading(true);
    setError(null);
    try {
      const text = await generateAIText(config.aiTopic);
      dispatch({
        type: 'SET_CONFIG',
        payload: { customText: text },
      });
    } catch (err) {
      setError('Failed to generate text. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchWikipedia = async () => {
    setLoading(true);
    setError(null);
    try {
      const text = await fetchWikipediaText();
      dispatch({
        type: 'SET_CONFIG',
        payload: { customText: text },
      });
    } catch (err) {
      setError('Failed to fetch Wikipedia article. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">📝 Text Source</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Choose Text Source</label>
        <div className="flex gap-2 flex-wrap">
          {['ai', 'wikipedia', 'custom'].map((source) => (
            <button
              key={source}
              onClick={() => dispatch({ type: 'SET_CONFIG', payload: { textSource: source as 'ai' | 'wikipedia' | 'custom' } })}
              className={`px-3 py-2 rounded font-medium transition capitalize ${
                config.textSource === source
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {source === 'ai' ? 'AI Generated' : source === 'wikipedia' ? 'Wikipedia' : 'Custom'}
            </button>
          ))}
        </div>
      </div>

      {config.textSource === 'ai' && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">Topic</label>
            <select
              value={config.aiTopic}
              onChange={(e) =>
                dispatch({ type: 'SET_CONFIG', payload: { aiTopic: e.target.value } })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {getAITopics().map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleGenerateAI}
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Generating...' : 'Generate AI Text'}
          </button>
        </div>
      )}

      {config.textSource === 'wikipedia' && (
        <button
          onClick={handleFetchWikipedia}
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Fetching...' : 'Fetch Random Article'}
        </button>
      )}

      {config.textSource === 'custom' && (
        <div>
          <label className="block text-sm font-medium mb-2">Paste Your Text</label>
          <textarea
            value={config.customText}
            onChange={(e) =>
              dispatch({
                type: 'SET_CONFIG',
                payload: { customText: prepareText(e.target.value) },
              })
            }
            placeholder="Paste your text here..."
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      )}

      {error && <div className="mt-3 text-red-600 text-sm font-medium">{error}</div>}

      {config.customText && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-xs text-gray-600 mb-2">Preview:</p>
          <p className="text-sm text-gray-700 line-clamp-3">{config.customText}</p>
        </div>
      )}
    </div>
  );
}
