interface ControlButtonsProps {
  onPause: () => void;
  onResume: () => void;
  onFinish: () => void;
  onReset: () => void;
  onToggleFullscreen: () => void;
  isPaused: boolean;
  isFullscreen: boolean;
}

export function ControlButtons({
  onPause,
  onResume,
  onFinish,
  onReset,
  onToggleFullscreen,
  isPaused,
  isFullscreen,
}: ControlButtonsProps) {
  return (
    <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
      <div className="flex gap-3 justify-center flex-wrap">
        {!isPaused ? (
          <button
            onClick={onPause}
            className="px-6 py-2 bg-yellow-500 text-white rounded font-medium hover:bg-yellow-600"
          >
            ⏸️ Pause
          </button>
        ) : (
          <button
            onClick={onResume}
            className="px-6 py-2 bg-green-500 text-white rounded font-medium hover:bg-green-600"
          >
            ▶️ Resume
          </button>
        )}

        <button
          onClick={onFinish}
          className="px-6 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700"
        >
          ✓ Submit
        </button>

        <button
          onClick={onReset}
          className="px-6 py-2 bg-gray-400 text-white rounded font-medium hover:bg-gray-500"
        >
          ↻ Reset
        </button>

        <button
          onClick={onToggleFullscreen}
          className="px-6 py-2 bg-purple-600 text-white rounded font-medium hover:bg-purple-700"
        >
          {isFullscreen ? '⛌ Exit Fullscreen' : '⛶ Fullscreen'}
        </button>
      </div>
    </div>
  );
}
