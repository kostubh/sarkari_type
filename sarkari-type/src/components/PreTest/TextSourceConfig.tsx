import { useState, useEffect } from 'react';
import { useTest } from '../../context/TestContext';
import {
  generateAIText,
  fetchWikipediaText,
  getAITopics,
  getWikipediaTopics,
  getGovernmentDocTypes,
  generateGovernmentText,
  generateCustomPromptText,
  prepareText,
} from '../../services/textApi';

export function TextSourceConfig() {
  const { config, dispatch } = useTest();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedWordCount, setGeneratedWordCount] = useState<number | null>(null);

  // Check if current text word count matches the configured word count
  const currentTextWordCount = config.customText ? config.customText.split(/\s+/).filter(w => w.length > 0).length : 0;
  const wordCountMismatch = config.customText && currentTextWordCount > 0 && 
                            Math.abs(currentTextWordCount - config.wordCount) > 10; // Allow 10 word tolerance

  const handleGenerateAI = async () => {
    setLoading(true);
    setError(null);
    try {
      const text = await generateAIText(config.aiTopic, config.wordCount);
      dispatch({
        type: 'SET_CONFIG',
        payload: { customText: text },
      });
      setGeneratedWordCount(text.split(/\s+/).filter(w => w.length > 0).length);
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
      const text = await fetchWikipediaText(config.wordCount, config.wikipediaTopic);
      dispatch({
        type: 'SET_CONFIG',
        payload: { customText: text },
      });
      setGeneratedWordCount(text.split(/\s+/).filter(w => w.length > 0).length);
    } catch (err) {
      setError('Failed to fetch Wikipedia article. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateGovernment = async () => {
    setLoading(true);
    setError(null);
    try {
      const text = await generateGovernmentText(config.aiTopic, config.wordCount);
      dispatch({
        type: 'SET_CONFIG',
        payload: { customText: text },
      });
      setGeneratedWordCount(text.split(/\s+/).filter(w => w.length > 0).length);
    } catch (err) {
      setError('Failed to generate government document. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCustomPrompt = async () => {
    setLoading(true);
    setError(null);
    try {
      const text = await generateCustomPromptText(config.customPrompt, config.wordCount);
      dispatch({
        type: 'SET_CONFIG',
        payload: { customText: text },
      });
      setGeneratedWordCount(text.split(/\s+/).filter(w => w.length > 0).length);
    } catch (err) {
      setError('Failed to generate text from custom prompt. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-regenerate when word count changes (only if we have previously generated text from AI/Wikipedia)
  useEffect(() => {
    if (generatedWordCount !== null && config.textSource !== 'custom') {
      // Show warning that word count changed
      const timer = setTimeout(() => {
        setGeneratedWordCount(null); // Reset to allow new generation
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [config.wordCount]);

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">📝 Text Source</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Choose Text Source</label>
        <div className="flex gap-2 flex-wrap">
          {['wikipedia', 'ai', 'custom'].map((source) => (
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

      {/* Word Count Mismatch Warning */}
      {wordCountMismatch && config.textSource !== 'custom' && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
          <span className="text-yellow-600 text-lg">⚠️</span>
          <div className="flex-1">
            <p className="text-sm text-yellow-800 font-medium">
              Word count mismatch detected!
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Current text: {currentTextWordCount} words | Target: {config.wordCount} words
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Click the generate button again to create new text with {config.wordCount} words.
            </p>
          </div>
        </div>
      )}

      {config.textSource === 'wikipedia' && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">Select Topic Category</label>
            <select
              value={config.wikipediaTopic}
              onChange={(e) =>
                dispatch({ type: 'SET_CONFIG', payload: { wikipediaTopic: e.target.value } })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {getWikipediaTopics().map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {config.wikipediaTopic === 'Random Article' 
                ? 'Will fetch a completely random Wikipedia article'
                : `Will fetch a random article from the ${config.wikipediaTopic} category`
              }
            </p>
          </div>
          <button
            onClick={handleFetchWikipedia}
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Fetching...' : `Fetch Article (${config.wordCount} words)`}
          </button>
        </div>
      )}

      {config.textSource === 'ai' && (
        <div className="space-y-3">
          {/* Prompt Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Prompt Type</label>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  dispatch({ type: 'SET_CONFIG', payload: { aiPromptType: 'preset' } })
                }
                className={`px-3 py-2 rounded font-medium transition flex-1 ${
                  config.aiPromptType === 'preset'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Preset Topics
              </button>
              <button
                onClick={() =>
                  dispatch({ type: 'SET_CONFIG', payload: { aiPromptType: 'custom' } })
                }
                className={`px-3 py-2 rounded font-medium transition flex-1 ${
                  config.aiPromptType === 'custom'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Custom Prompt
              </button>
            </div>
          </div>

          {config.aiPromptType === 'preset' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Select Category</label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => dispatch({ type: 'SET_CONFIG', payload: { aiTopic: 'General' } })}
                    className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200"
                  >
                    General Topics
                  </button>
                  <button
                    onClick={() =>
                      dispatch({ type: 'SET_CONFIG', payload: { aiTopic: 'Office Memorandum' } })
                    }
                    className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200"
                  >
                    Government Docs
                  </button>
                </div>
                <select
                  value={config.aiTopic}
                  onChange={(e) =>
                    dispatch({ type: 'SET_CONFIG', payload: { aiTopic: e.target.value } })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <optgroup label="General Topics">
                    {getAITopics().map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Government Documents">
                    {getGovernmentDocTypes().map((docType) => (
                      <option key={docType} value={docType}>
                        {docType}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
              <button
                onClick={() => {
                  const isGovDoc = getGovernmentDocTypes().includes(config.aiTopic);
                  if (isGovDoc) {
                    handleGenerateGovernment();
                  } else {
                    handleGenerateAI();
                  }
                }}
                disabled={loading}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Generating...' : `Generate Text (${config.wordCount} words)`}
              </button>
            </>
          )}

          {config.aiPromptType === 'custom' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Your Custom Prompt</label>
                <textarea
                  value={config.customPrompt}
                  onChange={(e) =>
                    dispatch({ type: 'SET_CONFIG', payload: { customPrompt: e.target.value } })
                  }
                  placeholder="e.g., Write a formal letter requesting leave for medical reasons..."
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <button
                onClick={handleGenerateCustomPrompt}
                disabled={loading || !config.customPrompt.trim()}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Generating...' : `Generate from Prompt (${config.wordCount} words)`}
              </button>
            </>
          )}
        </div>
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
          <p className="text-xs text-gray-600 mb-2">
            Preview (Word count: {currentTextWordCount}
            {config.textSource !== 'custom' && currentTextWordCount !== config.wordCount && (
              <span className="text-yellow-600 font-medium"> - Target: {config.wordCount}</span>
            )}
            ):
          </p>
          <p className="text-sm text-gray-700 line-clamp-3">{config.customText}</p>
        </div>
      )}
    </div>
  );
}
