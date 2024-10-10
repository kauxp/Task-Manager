import mongoose from 'mongoose';
import {MONGO_DB_URL} from '../../envConfig'


export default async function dbConnect() {
    mongoose.connect(MONGO_DB_URL)
    .then(() => {
        console.log('Connected to MongoDB')       
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err)
    })
}