import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authToken from './middleware/authToken.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const mongoUri = process.env.MONGO_DB_URL;
const port = process.env.PORT || 5000;


if (!mongoUri) {
  console.error('MongoDB connection string is missing in .env');
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use('/auth', authRoutes);
app.use('/task', authToken, taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
