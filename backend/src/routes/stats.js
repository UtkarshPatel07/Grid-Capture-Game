import express from 'express';

const router = express.Router();

export default function createStatsRouter(gridService, socketHandler) {
  router.get('/stats', async (req, res) => {
    try {
      const stats = await gridService.getStats();
      const enhancedStats = {
        ...stats,
        totalUsersOnline: socketHandler.connectedUsers.size
      };
      
      res.json(enhancedStats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  });

  router.get('/leaderboard', async (req, res) => {
    try {
      const leaderboard = await gridService.getLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  });

  router.get('/health', (req, res) => {
    res.json({ 
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  return router;
}

