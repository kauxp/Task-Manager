import {  useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, set } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";  
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from "axios";
import { TaskData } from "./column";
import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  id: String,
  iat : String,
  exp : String
}
export function AddTask() {
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false); // State to handle modal visibility
  const [data, setData] = useState<TaskData>({
    userId: "",
    title: "",
    description: "",
    priority: "",
    status: "",
    dueDate:  "",
  });

  const handleSubmit = async () => {
    console.log("Data: ", data);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/`, {
        userId: data.userId,
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        dueDate: date?.toISOString(),
      }).then((res) => {
        console.log("Task added successfully", res.data);
      }).catch((error) => {
        console.error("Error adding task:", error);
      });
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const token = localStorage.getItem('token');
    if (token) {
      const payloadBase64 = token.split('.')[1]; // The payload is the second part
      const payloadDecoded = atob(payloadBase64); // Decode from Base64
      const payload = JSON.parse(payloadDecoded);
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
        userId: payload.id,
      }));

    } else {
      console.error("Token is null");
    }
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-white" onClick={() => {
          setIsOpen(true);
        }}>
          Add Task +
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black">
        <DialogHeader className="text-white">
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription>Add a new task</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-white">
          <Label>Task Title</Label>
          <Input name="title" type="text" placeholder="Title" onChange={handleChange} />

          <Label>Description</Label>
          <Textarea name="description" placeholder="Description" onChange={handleChange} />

          <Label>Priority</Label>
          <Select onValueChange={handlePriorityChange}>
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
          <Select onValueChange={handleStatusChange}>
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
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
