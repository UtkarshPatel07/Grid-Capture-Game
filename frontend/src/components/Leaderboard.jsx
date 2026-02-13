'use client';

export default function Leaderboard({ leaderboard, currentUsername }) {
  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm border border-slate-700/50">
        <h2 className="text-xl font-bold mb-3 text-slate-200">Leaderboard</h2>
        <p className="text-slate-400 text-sm">No captures yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm border border-slate-700/50">
      <h2 className="text-xl font-bold mb-3 text-slate-200">Leaderboard</h2>
      <div className="space-y-2">
        {leaderboard.map((entry, index) => (
          <div
            key={entry.username}
            className={`
              flex items-center justify-between p-2 rounded transition-colors
              ${entry.username === currentUsername ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-slate-700/30'}
            `}
          >
            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-mono text-sm w-6">
                #{index + 1}
              </span>
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className={`font-medium ${entry.username === currentUsername ? 'text-yellow-400' : 'text-slate-200'}`}>
                {entry.username}
                {entry.username === currentUsername && ' (You)'}
              </span>
            </div>
            <span className="text-slate-300 font-bold">
              {entry.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

