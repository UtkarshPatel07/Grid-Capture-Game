'use client';

import { useEffect } from 'react';
import useSocket from '@/hooks/useSocket';
import Grid from '@/components/Grid';
import Leaderboard from '@/components/Leaderboard';
import Stats from '@/components/Stats';

export default function Home() {
  const {
    isConnected,
    user,
    grid,
    leaderboard,
    stats,
    error,
    cooldownMessage,
    captureBlock
  } = useSocket();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Grid Capture
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Claim tiles in real-time. Compete with players worldwide.
          </p>
        </div>
      </header>

      {/* Notifications */}
      {error && (
        <div className="fixed top-20 right-4 bg-red-500/90 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          {error}
        </div>
      )}

      {cooldownMessage && (
        <div className="fixed top-20 right-4 bg-yellow-500/90 text-slate-900 px-4 py-3 rounded-lg shadow-lg z-50 font-medium">
          {cooldownMessage}
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Stats */}
          <div className="lg:col-span-1 space-y-4">
            <Stats stats={stats} user={user} isConnected={isConnected} />
          </div>

          {/* Center - Grid */}
          <div className="lg:col-span-2">
            <Grid
              grid={grid}
              onTileClick={captureBlock}
              currentUsername={user?.username}
            />
          </div>

          {/* Right Sidebar - Leaderboard */}
          <div className="lg:col-span-1">
            <Leaderboard
              leaderboard={leaderboard}
              currentUsername={user?.username}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-slate-400 text-sm">
          <p>Built with Next.js, Socket.io, and MongoDB</p>
          <p className="mt-1 text-xs text-slate-500">
            Real-time grid capture game with concurrency handling
          </p>
        </div>
      </footer>
    </main>
  );
}

