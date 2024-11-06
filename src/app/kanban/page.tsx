"use client"; // Mark the whole component as client-side

import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {  TaskData } from "@/components/ui/column";
import { AddTask } from '@/components/ui/addTask';
import Header from '@/components/ui/header';
import dotenv from 'dotenv';
import TaskCard from '@/components/ui/taskCard';
dotenv.config();

interface Task{
    _id: string;
    userId: string;
    title: string;
    description: string;
    status: string;
    priority: 'High' | 'Medium' | 'Low';
    dueDate: string;
}

interface Board {
    id: string;
    name: string;
    items: Task[];
}


let initialBoards: Board[] = [
    { id: 'todo', name: 'To Do', items: [] },
    { id: 'in-progress', name: 'In Progress', items: [] },
    { id: 'done', name: 'Done', items: [] },
];

const SimpleKanban: React.FC = () => {
    const [data, setData] = useState<Task[]>([]);
    const [boards, setBoards] = useState(initialBoards);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/`,{
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, 
                },

            });
            const result = await res.json();
            console.log(result);
            setData(result);

            // Initialize boards based on fetched data
            const allStatuses = ["To Do", "In Progress", "Completed"]; // Define all possible statuses here

            // Initialize boards with all statuses, including empty ones
            const initialBoards = allStatuses.map((status) => ({
                id: status,
                name: status,
                items: result?.task?.filter((task: any) => task.status === status),
            }));

            // Filter out duplicates while keeping empty boards
            const uniqueBoards = Array.from(new Set(initialBoards.map((board) => board.id)))
                .map(id => initialBoards.find((board) => board.id === id))
                .filter((board): board is Board => board !== undefined);


            // Sort boards to ensure "To Do" is always first
            const sortedBoards = uniqueBoards?.sort((a, b) => {
                if (a?.id === 'todo') return -1; // "To Do" first
                if (b?.id === 'todo') return 1;
                return 0; // Keep the original order for others
            });

            sortedBoards?.map((board) => ({
                ...board,
                items: board.items.sort((a, b) => {
                    const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                }),
            }));
            
            console.log("srtBoard", sortedBoards);
            setBoards(sortedBoards);
        };

        fetchData();
    }, []);

    const updateTask = async (task: Task) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });
            console.log('Task updated successfully:', res);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    const onDragEnd = (result: any) => {
        if (!result.destination) return;
        console.log(result);
        const { source, destination } = result;

        const sourceBoard = boards.find(board => board.id === source.droppableId);
        const destBoard = boards.find(board => board.id === destination.droppableId);
        const draggedItem = sourceBoard?.items[source.index];
        if (!draggedItem) return;

        // Move the item
        sourceBoard?.items.splice(source.index, 1);
        destBoard?.items.splice(destination.index, 0, draggedItem);

        setBoards([...boards]);

        const updatedTask = { ...draggedItem, status: destination.droppableId };
        updateTask(updatedTask);
    };

    
    return (
        <div className='bg-[#1a1a1a] min-h-screen p-10 gap-8 flex flex-col overflow-y-auto'>
            <Header />
            <div>
                <AddTask />
            </div>
            <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex space-x-4">
                        {boards.map(board => (
                            <div key={board.id} className='bg-[#303030] p-4 rounded-lg w-1/3'>
                                <h2 className='text-xl text-white font-semibold mb-3'>{board.name}</h2>
                                <Droppable droppableId={board.id}>
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className='min-h-[200px]'
                                        >
                                            {board.items.map((item, index) => (
                                                <Draggable key={item._id} draggableId={item._id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className=' text-white p-2 mb-2 rounded'
                                                        >
                                                            <TaskCard item={item} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                                
                            </div>
                        ))}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
};

export default SimpleKanban;
