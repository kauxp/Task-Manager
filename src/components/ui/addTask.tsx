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

export function AddTask() {
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false); // State to handle modal visibility
  const [data, setData] = useState<TaskData>({
    _id: "",
    title: "",
    description: "",
    priority: "",
    status: "",
    dueDate: date ? date.toISOString() : "",
  });

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/task/create", {
        ...data,
        userId: "66eff16833445c3bef11cdfe",
        dueDate: date ? date.toISOString() : "",
      });
      console.log("Task added successfully:", res.data);
      setIsOpen(false); // Close modal after successful submission
    } catch (error) {
      console.error("Error adding task:", error);
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
