import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

const Task = mongoose.models.Task || mongoose.model('Task', new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    dueDate: { type: Date, required: true }
}));

export async function DELETE(req: Request , {params}: {params: {id: string}}) {
    if(!params) return NextResponse.json({message: "Task ID is required"}, {status: 400});
    const { id } = params;
    if(!id) return NextResponse.json({message: "Task ID is required"}, {status: 400});
    console.log("Request params: ", params);
    try{
        await Task.findByIdAndDelete(id);
        return NextResponse.json({message: "Task deleted successfully"});
    }
    catch(error){
        return NextResponse.json({message: "Error deleting the task ", error});
    }
}


export async function PUT(req: Request, {params}: {params:{id:String}} ) {
    const {id} = params;
    const {title, description, status, priority, dueDate} = await req.json();
    console.log("Request body: ", {title, description, status, priority, dueDate});
    try{
        const task= await Task.findByIdAndUpdate(
            id,
            {
                title,
                description,
                status,
                priority,
                dueDate
            }
        );

        return NextResponse.json(task);
    }
    catch(error){
        return NextResponse.json({message: "Error updating the task ", error});
    }
}