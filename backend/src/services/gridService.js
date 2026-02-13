import Block from '../models/Block.js';

class GridService {
  constructor(gridSize = 30) {
    this.gridSize = gridSize;
    this.totalBlocks = gridSize * gridSize;
    this.claimHistory = [];
  }

  async initializeGrid() {
    const existingBlocks = await Block.countDocuments();
    
    if (existingBlocks === this.totalBlocks) {
      console.log('Grid already initialized');
      return;
    }

    // Clear existing blocks if count doesn't match
    if (existingBlocks > 0) {
      await Block.deleteMany({});
    }

    const blocks = [];
    for (let i = 0; i < this.totalBlocks; i++) {
      blocks.push({
        id: i,
        owner: null,
        ownerColor: null,
        updatedAt: new Date()
      });
    }

    await Block.insertMany(blocks);
    console.log(`Grid initialized with ${this.totalBlocks} blocks`);
  }

  async getFullGrid() {
    const blocks = await Block.find({}).sort({ id: 1 }).lean();
    return blocks;
  }

  async captureBlock(blockId, username, color) {
    try {
      // Atomic update - only succeeds if owner is null
      const result = await Block.findOneAndUpdate(
        { id: blockId, owner: null },
        { 
          owner: username,
          ownerColor: color,
          updatedAt: new Date()
        },
        { new: true }
      );

      if (result) {
        this.recordClaim();
        return { success: true, block: result };
      }

      return { success: false, message: 'Block already claimed' };
    } catch (error) {
      console.error('Error capturing block:', error);
      return { success: false, message: 'Server error' };
    }
  }

  async getLeaderboard() {
    const leaderboard = await Block.aggregate([
      { $match: { owner: { $ne: null } } },
      { 
        $group: {
          _id: '$owner',
          count: { $sum: 1 },
          color: { $first: '$ownerColor' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $project: {
          _id: 0,
          username: '$_id',
          count: 1,
          color: 1
        }
      }
    ]);

    return leaderboard;
  }

  async getStats() {
    const totalClaimed = await Block.countDocuments({ owner: { $ne: null } });
    return {
      totalBlocksClaimed: totalClaimed,
      totalBlocks: this.totalBlocks,
      claimsPerMinute: this.getClaimsPerMinute()
    };
  }

  recordClaim() {
    const now = Date.now();
    this.claimHistory.push(now);
    
    // Keep only last 5 minutes of history
    const fiveMinutesAgo = now - 300000;
    this.claimHistory = this.claimHistory.filter(time => time > fiveMinutesAgo);
  }

  getClaimsPerMinute() {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const recentClaims = this.claimHistory.filter(time => time > oneMinuteAgo);
    return recentClaims.length;
  }

  async resetGrid() {
    await Block.updateMany({}, {
      owner: null,
      ownerColor: null,
      updatedAt: new Date()
    });
    this.claimHistory = [];
    console.log('Grid reset complete');
  }
}

export default GridService;

