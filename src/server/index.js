import express from 'express';
import mongoose from 'mongoose';
// import dotenv from '../../dotenv';
import cors from 'cors';


import authToken from './middleware/authToken.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';

// dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));  // Adjust the frontend URL if needed
app.use(express.json());
app.use(cors());

const PORT =  5000;
// console.log(process.env.MONGO_DB_URL)
mongoose.connect("mongodb+srv://kauxp:aarya5772@cluster0.n2xgn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch((error)=>{
        console.log('Error:', error);
    })

app.use('/auth', authRoutes);
app.use('/task',  taskRoutes);

app.listen(PORT, 'localhost',()=>{
    console.log(`Server is running on port ${PORT}`);
})