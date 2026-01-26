import { useTest } from '../../context/TestContext';

export function ScoringConfig() {
  const { config, dispatch } = useTest();

  const updateScoring = (key: keyof typeof config.scoringOptions, value: number) => {
    dispatch({
      type: 'SET_CONFIG',
      payload: {
        scoringOptions: {
          ...config.scoringOptions,
          [key]: value,
        },
      },
    });
  };

  const updateDisplay = (key: keyof typeof config.displaySettings, value: any) => {
    dispatch({
      type: 'SET_CONFIG',
      payload: {
        displaySettings: {
          ...config.displaySettings,
          [key]: value,
        },
      },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Scoring Options */}
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">⭐ Scoring</h3>

        <div className="space-y-3">
          {[
            {
              key: 'correctWord' as const,
              label: 'Correct Word',
              icon: '✓',
            },
            {
              key: 'missingWord' as const,
              label: 'Missing Word (Penalty)',
              icon: '✗',
            },
            {
              key: 'incorrectSpelling' as const,
              label: 'Spelling Error (Penalty)',
              icon: '~',
            },
            {
              key: 'punctuationError' as const,
              label: 'Punctuation Error (Penalty)',
              icon: '.',
            },
            {
              key: 'caseError' as const,
              label: 'Case Error (Penalty)',
              icon: 'A',
            },
          ].map(({ key, label, icon }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">
                {icon} {label}
              </label>
              <input
                type="number"
                value={config.scoringOptions[key]}
                onChange={(e) => updateScoring(key, parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Display Settings */}
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">👁️ Display Settings</h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Font Size</label>
            <select
              value={config.displaySettings.fontSize}
              onChange={(e) =>
                updateDisplay('fontSize', e.target.value as 'small' | 'medium' | 'large')
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contrast</label>
            <select
              value={config.displaySettings.contrast}
              onChange={(e) =>
                updateDisplay('contrast', e.target.value as 'low' | 'medium' | 'high')
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="border-t pt-3">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.displaySettings.showGuidePointer}
                onChange={(e) => updateDisplay('showGuidePointer', e.target.checked)}
                className="w-4 h-4 mt-0.5"
              />
              <div className="flex-1">
                <span className="text-sm font-medium">Highlight Current Position</span>
                <p className="text-xs text-gray-500 mt-1">
                  Show color highlighting on reference text based on your typing cursor position
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
