"use client"; // Mark the whole component as client-side

import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {  TaskData } from "@/components/ui/column";
import { AddTask } from '@/components/ui/addTask';
import Header from '@/components/ui/header';

interface Board {
    id: string;
    name: string;
    items: TaskData[];
}

let initialBoards: Board[] = [
    { id: 'todo', name: 'To Do', items: [] },
    { id: 'in-progress', name: 'In Progress', items: [] },
    { id: 'done', name: 'Done', items: [] },
];

const SimpleKanban: React.FC = () => {
    const [data, setData] = useState<TaskData[]>([]);
    const [boards, setBoards] = useState(initialBoards);
    const [taskTitle, setTaskTitle] = useState('');
    const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:5000/task/");
            const result = await res.json();
            setData(result);

            // Initialize boards based on fetched data
            const initialBoards = result.map((task: any) => ({
                id: task.status,
                name: task.status,
                items: result.filter((item: any) => item.status === task.status),
            }));

            // Remove duplicates by converting to a Set
            const uniqueBoards = Array.from(new Set(initialBoards.map((board: { id: any; }) => board.id)))
                .map(id => initialBoards.find((board: { id: unknown; }) => board.id === id));

            // Sort boards to ensure "To Do" is always first
            const sortedBoards = uniqueBoards.sort((a, b) => {
                if (a.id === 'todo') return -1; // "To Do" first
                if (b.id === 'todo') return 1;
                return 0; // Keep the original order for others
            });

            setBoards(sortedBoards);
        };

        fetchData();
    }, []);

    const updateTask = async (task: TaskData) => {
        try {
            const res = await fetch(`http://localhost:5000/task/update/status/${task._id}`, {
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

    const addTask = (boardId: string) => {
        if (taskTitle.trim()) {
            const newTask: TaskData = {
                title: taskTitle,
                _id: `task-${Date.now()}`,
                description: '',
                status: 'todo',
                priority: 'low',
                dueDate: new Date().toISOString()
            };
            const updatedBoards = boards.map(board => {
                if (board.id === boardId) {
                    return { ...board, items: [...board.items, newTask] };
                }
                return board;
            });
            setBoards(updatedBoards);
            setTaskTitle('');
            setSelectedBoardId(null);
        }
    };

    return (
        <div className='bg-[#1a1a1a] h-screen p-10 gap-8 flex flex-col'>
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
                                                            className='bg-[#1a1a1a] text-white p-2 mb-2 rounded'
                                                        >
                                                            {item.title}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                                {selectedBoardId === board.id &&
                                    <div className='mt-2'>
                                        <input
                                            type="text"
                                            placeholder="Enter task title"
                                            className="w-full p-2 border rounded bg-gray-600 text-white"
                                            value={taskTitle}
                                            onChange={(e) => setTaskTitle(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    addTask(board.id);
                                                }
                                            }}
                                        />
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
};

export default SimpleKanban;
