'use client';

export default function Stats({ stats, user, isConnected }) {
  const userBlocks = user ? stats.leaderboard?.find(u => u.username === user.username)?.count || 0 : 0;

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <div className="bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm border border-slate-700/50">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">Status</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className={`text-sm font-medium ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div className="bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm border border-slate-700/50">
          <h3 className="text-sm text-slate-400 mb-2">Your Identity</h3>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: user.color }}
            />
            <span className="font-bold text-slate-200">{user.username}</span>
          </div>
          <div className="text-2xl font-bold text-slate-100">
            {userBlocks} <span className="text-sm text-slate-400 font-normal">tiles captured</span>
          </div>
        </div>
      )}

      {/* Live Stats */}
      <div className="bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm border border-slate-700/50">
        <h3 className="text-sm text-slate-400 mb-3">Live Stats</h3>
        <div className="space-y-3">
          <div>
            <div className="text-sm text-slate-400">Players Online</div>
            <div className="text-2xl font-bold text-blue-400">{stats.totalUsersOnline || 0}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400">Total Claimed</div>
            <div className="text-2xl font-bold text-purple-400">{stats.totalBlocksClaimed || 0}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400">Claims/Min</div>
            <div className="text-2xl font-bold text-green-400">{stats.claimsPerMinute || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

