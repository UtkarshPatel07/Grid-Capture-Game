import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import GridService from './services/gridService.js';
import GridSocketHandler from './sockets/gridSocket.js';
import createStatsRouter from './routes/stats.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Services
const gridService = new GridService(30);
const socketHandler = new GridSocketHandler(io, gridService);

// Routes
app.use('/api', createStatsRouter(gridService, socketHandler));

// Socket.io connection handling
io.on('connection', (socket) => {
  socketHandler.handleConnection(socket);
});

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/grid-capture';

async function connectDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Initialize grid
    await gridService.initializeGrid();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  httpServer.close(() => {
    mongoose.connection.close(false, () => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});

// Start server
const PORT = process.env.PORT || 3001;

async function startServer() {
  await connectDatabase();
  
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();

