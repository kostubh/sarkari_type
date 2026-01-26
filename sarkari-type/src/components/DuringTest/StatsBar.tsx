interface StatsBarProps {
  timer: number;
  isTimeless: boolean;
}

export function StatsBar({ timer, isTimeless }: StatsBarProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-center max-w-4xl mx-auto">
        <div className="stats-display">
          <div className="stat-value text-4xl font-bold">{formatTime(timer)}</div>
          <div className="stat-label text-lg">{isTimeless ? 'Elapsed' : 'Remaining'}</div>
        </div>
      </div>
    </div>
  );
}
