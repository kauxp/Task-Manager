import mongoose from 'mongoose';
import dbConnect from '../../../lib/dbConnect'
import bcrypt from 'bcrypt';
import {cookies} from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true }
}));

export async function POST(req: Request){
    await dbConnect();
    const { email, password } = await req.json();
    console.log(email, password);
    try {
        const existing = await User.findOne({email});
        if(existing) return NextResponse.json({message: "User already exists"});
        else{
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email: email, password: hashedPassword});
            await user.save();
            if (!JWT_SECRET) {
                console.log(JWT_SECRET);
                throw new Error('JWT_SECRET is not defined');
            }
            const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            cookies().set('userId', user._id, {secure:true});

            return NextResponse.json({message: "User created successfully", token: token});
        }
    } catch (error) {
        return NextResponse.json({message: "Error: ", error});
    }
}
