# Grid Capture Frontend

Real-time multiplayer grid capture game built with Next.js 14 and Socket.io.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: TailwindCSS
- **Real-time**: Socket.io-client
- **Language**: JavaScript

## Project Structure

```
src/
├── app/
│   ├── page.js          # Main page component
│   ├── layout.js        # Root layout
│   └── globals.css      # Global styles
├── components/
│   ├── Grid.jsx         # Grid container
│   ├── Tile.jsx         # Individual tile
│   ├── Leaderboard.jsx  # Rankings display
│   └── Stats.jsx        # Statistics panel
└── hooks/
    └── useSocket.js     # Socket.io connection hook
```

## Key Features

- **Custom Hook**: `useSocket` manages all Socket.io logic
- **Optimized Rendering**: Memoization prevents unnecessary re-renders
- **Real-time Updates**: Instant UI updates via WebSocket events
- **Responsive Design**: Works on desktop and mobile
- **Error Handling**: Clear user feedback for errors and cooldowns

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Deployment

This app is ready to deploy on Vercel:

1. Push to GitHub
2. Import to Vercel
3. Set `NEXT_PUBLIC_SOCKET_URL` environment variable
4. Deploy!

## License

MIT

