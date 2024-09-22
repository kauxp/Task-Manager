import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface TaskModalProps {
    onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose }) => {
    const [date, setDate] = useState<Date>();
    const [task, setTask] = useState({
        title: '',
        description: '',
        priority: '',
        status: '',
        dueDate: date,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleSelectChange = (field: keyof typeof task) => (value: string) => {
        setTask((prevTask) => ({
            ...prevTask,
            [field]: value,
        }));
    };

    // handleTask = () => {
    //     set
    // };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-[#e2ff7f] flex flex-col justify-center items-start p-14 gap-3 w-full max-w-lg rounded-md'>
                <Label>Task Title</Label>
                <Input
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="bg-white"
                    onChange={handleChange}
                />

                <Label>Description</Label>
                <Textarea
                    name="description"
                    placeholder="Description"
                    className="bg-white"
                    onChange={handleChange}
                />

                <Label>Priority</Label>
                <Select onValueChange={handleSelectChange('priority')}>
                    <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                </Select>

                <Label>Status</Label>
                <Select onValueChange={handleSelectChange('status')}>
                    <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="To Do">To Do</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                </Select>

                <Label>Due Date</Label>
                <Popover>
                    <PopoverTrigger asChild className="bg-white">
                        <Button
                            variant={"outline"}
                            className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(selectedDate) => {
                                setDate(selectedDate);
                                setTask((prevTask) => ({
                                    ...prevTask,
                                    dueDate: selectedDate,
                                }));
                            }}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                <Button className='bg-[#9fcc00]' onClick={onClose}>
                    Add Task
                </Button>
            </div>
        </div>
    );
};

export default TaskModal;
