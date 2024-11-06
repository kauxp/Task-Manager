import { Draggable } from "react-beautiful-dnd";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskData, deleteTask } from "./column";
import { Dustbin } from "@/app/assets/Dustbin";
import { Pen } from "@/app/assets/Pen"; 
import { UpdateTaskModal } from "../UpdateTaskModal/UpdatetaskModal";
import { useState } from "react";
interface Task{
    _id: string;
    userId: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
}

interface TaskCardProps {
    item: Task;
}


const TaskCard : React.FC<TaskCardProps> = ({item}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const updateTask = (id: string) => {
        setModalOpen(true);
        
    }
    return (                  
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg  flex justify-between">
                        {item.title}
                        <div className="space-x-3">
                        <button onClick={() => deleteTask(item._id)}><Dustbin/></button>
                        <button onClick={() => updateTask(item._id)}><Pen/></button>
                        </div>
                    </CardTitle>
                    <CardDescription className="font-semibold">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <CardDescription>Priority: {item.priority}</CardDescription>
                    <CardDescription>Due Date: {item.dueDate}</CardDescription>
                </CardContent>
                <CardFooter>
                    <CardDescription></CardDescription>
                </CardFooter>
                <UpdateTaskModal id={item._id} 
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        taskData={item}/>
            </Card>
    )
}

export default TaskCard;