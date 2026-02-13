class RateLimiter {
  constructor(cooldownMs = 3000) {
    this.cooldownMs = cooldownMs;
    this.userLastAction = new Map();
  }

  canPerformAction(userId) {
    const now = Date.now();
    const lastAction = this.userLastAction.get(userId);
    
    if (!lastAction) {
      this.userLastAction.set(userId, now);
      return true;
    }
    
    const timeSinceLastAction = now - lastAction;
    
    if (timeSinceLastAction >= this.cooldownMs) {
      this.userLastAction.set(userId, now);
      return true;
    }
    
    return false;
  }

  getRemainingCooldown(userId) {
    const now = Date.now();
    const lastAction = this.userLastAction.get(userId);
    
    if (!lastAction) return 0;
    
    const elapsed = now - lastAction;
    const remaining = Math.max(0, this.cooldownMs - elapsed);
    
    return Math.ceil(remaining / 1000);
  }

  cleanup(userId) {
    this.userLastAction.delete(userId);
  }

  // Periodic cleanup to prevent memory leaks
  startPeriodicCleanup(intervalMs = 300000) {
    setInterval(() => {
      const now = Date.now();
      const threshold = this.cooldownMs * 10;
      
      for (const [userId, lastAction] of this.userLastAction.entries()) {
        if (now - lastAction > threshold) {
          this.userLastAction.delete(userId);
        }
      }
    }, intervalMs);
  }
}

export default RateLimiter;

