import RateLimiter from '../utils/rateLimiter.js';

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
  '#E63946', '#A8DADC', '#457B9D', '#F1FAEE', '#E76F51'
];

class GridSocketHandler {
  constructor(io, gridService) {
    this.io = io;
    this.gridService = gridService;
    this.rateLimiter = new RateLimiter(0); // No cooldown - allows instant clicks
    this.connectedUsers = new Map();
    
    // Start periodic cleanup
    this.rateLimiter.startPeriodicCleanup();
  }

  generateUsername() {
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    return `user_${randomNum}`;
  }

  getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  handleConnection(socket) {
    const username = this.generateUsername();
    const color = this.getRandomColor();
    
    const userData = {
      id: socket.id,
      username,
      color,
      connectedAt: Date.now()
    };
    
    this.connectedUsers.set(socket.id, userData);
    
    console.log(`User connected: ${username} (${socket.id})`);

    // Send user their identity
    socket.emit('user_identity', { username, color });

    // Send initial grid state
    this.sendGridState(socket);

    // Send initial stats
    this.sendStats(socket);

    // Broadcast updated user count
    this.broadcastUserCount();

    // Handle block capture attempts
    socket.on('capture_block', async (data) => {
      await this.handleBlockCapture(socket, data);
    });

    // Handle leaderboard requests
    socket.on('request_leaderboard', async () => {
      await this.sendLeaderboard(socket);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      this.handleDisconnection(socket);
    });
  }

  async sendGridState(socket) {
    try {
      const grid = await this.gridService.getFullGrid();
      socket.emit('grid_state', grid);
    } catch (error) {
      console.error('Error sending grid state:', error);
      socket.emit('error', { message: 'Failed to load grid' });
    }
  }

  async handleBlockCapture(socket, data) {
    const user = this.connectedUsers.get(socket.id);
    
    if (!user) {
      socket.emit('capture_failed', { message: 'User not found' });
      return;
    }

    const { blockId } = data;

    if (typeof blockId !== 'number' || blockId < 0 || blockId >= this.gridService.totalBlocks) {
      socket.emit('capture_failed', { message: 'Invalid block ID' });
      return;
    }

    // Check rate limit
    if (!this.rateLimiter.canPerformAction(socket.id)) {
      const remaining = this.rateLimiter.getRemainingCooldown(socket.id);
      socket.emit('rate_limited', { 
        message: `Please wait ${remaining}s before capturing again`,
        remainingSeconds: remaining
      });
      return;
    }

    // Attempt to capture the block
    const result = await this.gridService.captureBlock(blockId, user.username, user.color);

    if (result.success) {
      // Broadcast to all clients
      this.io.emit('block_updated', result.block);
      
      // Send updated leaderboard
      await this.broadcastLeaderboard();
      
      // Send updated stats
      await this.broadcastStats();
    } else {
      socket.emit('capture_failed', { 
        message: result.message,
        blockId 
      });
    }
  }

  async sendLeaderboard(socket) {
    try {
      const leaderboard = await this.gridService.getLeaderboard();
      socket.emit('leaderboard_update', leaderboard);
    } catch (error) {
      console.error('Error sending leaderboard:', error);
    }
  }

  async broadcastLeaderboard() {
    try {
      const leaderboard = await this.gridService.getLeaderboard();
      this.io.emit('leaderboard_update', leaderboard);
    } catch (error) {
      console.error('Error broadcasting leaderboard:', error);
    }
  }

  async sendStats(socket) {
    try {
      const stats = await this.gridService.getStats();
      const enhancedStats = {
        ...stats,
        totalUsersOnline: this.connectedUsers.size
      };
      socket.emit('stats_update', enhancedStats);
    } catch (error) {
      console.error('Error sending stats:', error);
    }
  }

  async broadcastStats() {
    try {
      const stats = await this.gridService.getStats();
      const enhancedStats = {
        ...stats,
        totalUsersOnline: this.connectedUsers.size
      };
      this.io.emit('stats_update', enhancedStats);
    } catch (error) {
      console.error('Error broadcasting stats:', error);
    }
  }

  broadcastUserCount() {
    this.io.emit('user_count_update', { 
      count: this.connectedUsers.size 
    });
  }

  handleDisconnection(socket) {
    const user = this.connectedUsers.get(socket.id);
    
    if (user) {
      console.log(`User disconnected: ${user.username} (${socket.id})`);
      this.connectedUsers.delete(socket.id);
      this.rateLimiter.cleanup(socket.id);
      this.broadcastUserCount();
    }
  }
}

export default GridSocketHandler;

