interface StatsBarProps {
  wpm: number;
  accuracy: number;
  mistakes: number;
  timer: number;
  isTimeless: boolean;
}

export function StatsBar({ wpm, accuracy, mistakes, timer, isTimeless }: StatsBarProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="stats-display">
          <div className="stat-value">{wpm.toFixed(1)}</div>
          <div className="stat-label">WPM</div>
        </div>
        <div className="stats-display">
          <div className="stat-value">{accuracy.toFixed(1)}%</div>
          <div className="stat-label">Accuracy</div>
        </div>
        <div className="stats-display">
          <div className="stat-value text-red-600">{mistakes}</div>
          <div className="stat-label">Mistakes</div>
        </div>
        <div className="stats-display">
          <div className="stat-value">{isTimeless ? formatTime(timer) : formatTime(timer)}</div>
          <div className="stat-label">{isTimeless ? 'Elapsed' : 'Remaining'}</div>
        </div>
      </div>
    </div>
  );
}
