import mongoose from 'mongoose';
import  userSchema from './User.js';
import { getPriority, type } from 'os';

const taskSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //reference to user schema model
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    status:{
        type: String,
        enum : ["To Do", "In Progress", "Completed"],
        required: true,
    },
    priority:{
        type: String,
        enum : ["Low", "Medium", "High"],
        required: true,
    },
    dueDate:{
        type: Date,
    },
})

export default mongoose.model('Task', taskSchema);