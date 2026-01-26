import { useTest } from '../../context/TestContext';

export function TimeConfig() {
  const { config, dispatch } = useTest();

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">⏱️ Time Settings</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Time Mode</label>
        <div className="flex gap-4">
          <button
            onClick={() => dispatch({ type: 'SET_CONFIG', payload: { timeMode: 'timed' } })}
            className={`px-4 py-2 rounded font-medium transition ${
              config.timeMode === 'timed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Timed
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_CONFIG', payload: { timeMode: 'timeless' } })}
            className={`px-4 py-2 rounded font-medium transition ${
              config.timeMode === 'timeless'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Timeless
          </button>
        </div>
      </div>

      {config.timeMode === 'timed' && (
        <div>
          <label className="block text-sm font-medium mb-2">Duration (seconds)</label>
          <div className="grid grid-cols-3 gap-2">
            {[30, 60, 120].map((time) => (
              <button
                key={time}
                onClick={() => dispatch({ type: 'SET_CONFIG', payload: { duration: time } })}
                className={`px-3 py-2 rounded font-medium transition ${
                  config.duration === time
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {time}s
              </button>
            ))}
          </div>
          <div className="mt-3">
            <input
              type="number"
              min="10"
              max="600"
              value={config.duration}
              onChange={(e) =>
                dispatch({ type: 'SET_CONFIG', payload: { duration: parseInt(e.target.value) } })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Custom duration (seconds)"
            />
          </div>
        </div>
      )}
    </div>
  );
}
