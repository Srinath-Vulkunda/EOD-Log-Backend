import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.config.js';
import authRoutes from './routes/authRoutes.js';
import entryRoutes from './routes/entryRoute.js';
import goalsRoutes from './routes/goalsRoutes.js';

dotenv.config({ quiet: true });
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/goals', goalsRoutes);

async function startSession() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startSession();

export default app;
