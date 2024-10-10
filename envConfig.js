import dotenv from 'dotenv';

dotenv.config(); 

export const MONGO_DB_URL = process.env.MONGO_DB_URL;
export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET;
