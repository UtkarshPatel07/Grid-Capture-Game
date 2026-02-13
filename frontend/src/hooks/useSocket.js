'use client';

import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

export default function useSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState(null);
  const [grid, setGrid] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [stats, setStats] = useState({
    totalUsersOnline: 0,
    totalBlocksClaimed: 0,
    claimsPerMinute: 0
  });
  const [error, setError] = useState(null);
  const [cooldownMessage, setCooldownMessage] = useState(null);
  
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    const socket = socketRef.current;

    // Connection events
    socket.on('connect', () => {
      setIsConnected(true);
      setError(null);
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    socket.on('connect_error', (err) => {
      setError('Connection failed. Please check if the server is running.');
      console.error('Connection error:', err);
    });

    // User identity
    socket.on('user_identity', (data) => {
      setUser(data);
      console.log('User identity received:', data);
    });

    // Grid state
    socket.on('grid_state', (gridData) => {
      setGrid(gridData);
    });

    // Block updates
    socket.on('block_updated', (block) => {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        const index = newGrid.findIndex(b => b.id === block.id);
        if (index !== -1) {
          newGrid[index] = block;
        }
        return newGrid;
      });
    });

    // Leaderboard
    socket.on('leaderboard_update', (data) => {
      setLeaderboard(data);
    });

    // Stats
    socket.on('stats_update', (data) => {
      setStats(data);
    });

    // User count
    socket.on('user_count_update', (data) => {
      setStats(prev => ({ ...prev, totalUsersOnline: data.count }));
    });

    // Error handling
    socket.on('capture_failed', (data) => {
      console.log('Capture failed:', data.message);
    });

    socket.on('rate_limited', (data) => {
      setCooldownMessage(data.message);
      setTimeout(() => setCooldownMessage(null), 3000);
    });

    socket.on('error', (data) => {
      setError(data.message);
      setTimeout(() => setError(null), 5000);
    });

    // Request initial leaderboard
    socket.emit('request_leaderboard');

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const captureBlock = (blockId) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('capture_block', { blockId });
    }
  };

  const requestLeaderboard = () => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('request_leaderboard');
    }
  };

  return {
    isConnected,
    user,
    grid,
    leaderboard,
    stats,
    error,
    cooldownMessage,
    captureBlock,
    requestLeaderboard
  };
}

