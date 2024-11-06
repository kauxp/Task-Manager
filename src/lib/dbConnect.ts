import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/task-manager';
export default async function dbConnect() {
    mongoose.connect(MONGO_DB_URL)
    .then(() => {
        console.log('Connected to MongoDB')       
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err)
    })
}