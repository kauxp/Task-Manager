import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import {ObjectId}  from 'mongodb';
dotenv.config();

const Task = mongoose.models.Task || mongoose.model('Task', new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    dueDate: { type: Date, required: true }
}));

const JWT_SECRET = process.env.JWT_SECRET


export async function POST(req: Request) {

        const { userId, title, description, status, priority, dueDate } = await req.json();
        console.log("Request body: ", { userId, title, description, status, priority, dueDate });
        try {
            const task = new Task({
                userId: userId,
                title: title,
                description: description,
                status: status,
                priority: priority,
                dueDate: dueDate
            });
            await task.save();
            return NextResponse.json({ message: "Task created successfully" });
        } catch (error) {
            return NextResponse.json({ message: "Error creating task", error });
        }
}

export async function GET(req: Request ){
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    try{
        if (token) {
            if(!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
            const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload | string;
            if (typeof decoded === 'string') {
                return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
            }
            const userId = decoded.id;
            console.log("User ID", userId);
            const task  = await Task.find({userId: userId});           
            return NextResponse.json({ message: 'User data retrieved successfully', task });
        } else {
            return NextResponse.json({ message: 'Invalid token structure' }, { status: 400 });
        }
    }
    catch(error){
        console.log("Error fetching tasks", error);
        return NextResponse.json({message: "Error fetching tasks ", error});
    }
}




