# Quick Setup Guide

## Prerequisites Check

Before starting, ensure you have:

- ✅ Node.js 18 or higher (`node --version`)
- ✅ MongoDB 6.0 or higher
- ✅ npm or yarn

## Option 1: Quick Start (Recommended)

### Windows:
```bash
# Run the setup script
start.bat

# Then follow the on-screen instructions
```

### Manual Setup:

**Step 1: Install Dependencies**

```bash
# Backend
cd backend
npm install

# Frontend (in a new terminal)
cd frontend
npm install
```

**Step 2: Start MongoDB**

```bash
# If MongoDB is installed locally
mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:6.0
```

**Step 3: Start Backend**

```bash
cd backend
npm run dev
```

You should see:
```
Connected to MongoDB
Grid initialized with 900 blocks
Server running on port 3001
```

**Step 4: Start Frontend**

```bash
cd frontend
npm run dev
```

You should see:
```
ready - started server on 0.0.0.0:3000
```

**Step 5: Test**

Open `http://localhost:3000` in multiple browser windows to test real-time functionality.

## Option 2: Docker (Easiest)

```bash
# Start everything with one command
docker-compose up

# Access at http://localhost:3000
```

## Troubleshooting

### MongoDB Connection Error

**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution**:
1. Make sure MongoDB is running: `mongod`
2. Check if port 27017 is available
3. Verify MONGODB_URI in `backend/.env`

### Socket Connection Failed

**Error**: Connection failed in browser console

**Solution**:
1. Ensure backend is running on port 3001
2. Check CORS_ORIGIN in `backend/.env` matches frontend URL
3. Verify NEXT_PUBLIC_SOCKET_URL in `frontend/.env.local`

### Port Already in Use

**Error**: `EADDRINUSE: address already in use`

**Solution**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

## Testing Real-time Features

1. Open `http://localhost:3000` in two browser windows side by side
2. Click a tile in one window
3. Watch it update instantly in the other window
4. Try clicking the same tile simultaneously - only one should succeed
5. Test the 3-second cooldown by clicking rapidly

## Environment Variables

### Backend (.env)
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/grid-capture
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

## Production Deployment

See the main README.md for detailed deployment instructions for:
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

## Next Steps

1. ✅ Verify the app works locally
2. ✅ Test with multiple browser windows
3. ✅ Review the code structure
4. ✅ Customize colors/grid size if needed
5. ✅ Deploy to production

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify all services are running
3. Check the troubleshooting section above
4. Review logs in terminal windows

Happy coding! 🚀

