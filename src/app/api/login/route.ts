import dbConnect from '../../../lib/dbConnect';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true }
}));

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request): Promise<Response> {
    await dbConnect();

    try {
        const { email, password } = await req.json();
        console.log(email, password);

        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const match = await bcrypt.compare(password, user.password);
        console.log(match);

        if (!match) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        } else {
            if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');

            const payload = { id: user._id };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            cookies().set('userId', user._id.toString(), { secure: true });

            return NextResponse.json({ message: "Logged in successfully", token: token });
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
