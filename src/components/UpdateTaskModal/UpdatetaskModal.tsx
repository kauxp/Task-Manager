"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TaskData } from "../ui/column";

interface UpdateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskData: TaskData;
}

export function UpdateTaskModal({ isOpen, onClose, taskData }: UpdateTaskModalProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [data, setData] = useState<TaskData>(taskData);

  useEffect(() => {
    setData(taskData);
    setDate(taskData.dueDate ? new Date(taskData.dueDate) : undefined);
  }, [taskData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        console.log("data", data);
      const response = await fetch(`http://localhost:5000/task/update/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({
          ...data,
          dueDate: date ? date.toISOString() : "",
        }),
      });

      if (!response.ok) {
        console.log("Task update failed:", response);
        
        throw new Error("Network response was not ok",);
      }

      const result = await response.json();
      console.log("Task updated successfully:", result);
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePriorityChange = (value: string) => {
    setData((prevData) => ({
      ...prevData,
      priority: value,
    }));
  };

  const handleStatusChange = (value: string) => {
    setData((prevData) => ({
      ...prevData,
      status: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black">
        <DialogHeader className="text-white">
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>Edit the task details</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4 text-white">
          <Label>Task Title</Label>
          <Input name="title" type="text" value={data.title} onChange={handleChange} />

          <Label>Description</Label>
          <Textarea name="description" value={data.description} onChange={handleChange} />

          <Label>Priority</Label>
          <Select value={data.priority} onValueChange={handlePriorityChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>

          <Label>Status</Label>
          <Select value={data.status} onValueChange={handleStatusChange}>
            <SelectTrigger>
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
            <PopoverTrigger asChild>
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
                onSelect={(selectedDate) => setDate(selectedDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <DialogFooter>
            <Button type="submit">Update Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
