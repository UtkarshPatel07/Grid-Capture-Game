# Grid Capture Backend

Real-time multiplayer grid capture game backend built with Express and Socket.io.

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express
- **Real-time**: Socket.io
- **Database**: MongoDB (Mongoose)
- **Language**: JavaScript (ES Modules)

## Project Structure

```
src/
├── models/
│   └── Block.js           # MongoDB schema
├── services/
│   └── gridService.js     # Business logic
├── sockets/
│   └── gridSocket.js      # Socket.io handlers
├── routes/
│   └── stats.js           # REST API endpoints
├── utils/
│   └── rateLimiter.js     # Rate limiting utility
└── server.js              # Application entry point
```

## Key Features

- **Atomic Operations**: Race condition prevention with MongoDB
- **Service Layer**: Clean separation of concerns
- **Rate Limiting**: 3-second cooldown per user
- **Memory Management**: Automatic cleanup to prevent leaks
- **Real-time Broadcasting**: Instant updates to all clients

## Environment Variables

Create `.env`:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/grid-capture
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Development

```bash
npm install
npm run dev
```

Server runs on [http://localhost:3001](http://localhost:3001)

## API Endpoints

### GET /api/stats
Returns live statistics:
```json
{
  "totalUsersOnline": 42,
  "totalBlocksClaimed": 387,
  "claimsPerMinute": 12,
  "totalBlocks": 900
}
```

### GET /api/leaderboard
Returns top 10 players:
```json
[
  {
    "username": "user_4821",
    "count": 45,
    "color": "#FF6B6B"
  }
]
```

### GET /api/health
Health check endpoint

## Socket.io Events

### Server → Client
- `user_identity` - User assignment
- `grid_state` - Initial grid data
- `block_updated` - Successful capture
- `capture_failed` - Failed attempt
- `rate_limited` - Cooldown notification
- `leaderboard_update` - Rankings update
- `stats_update` - Statistics update

### Client → Server
- `capture_block` - Attempt to claim tile
- `request_leaderboard` - Request rankings

## Deployment

Ready for deployment on Render, Railway, or any Node.js hosting:

1. Set environment variables
2. Ensure MongoDB connection (MongoDB Atlas recommended)
3. Deploy!

## License

MIT

