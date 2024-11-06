"use client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateTaskModal } from "../UpdateTaskModal/UpdatetaskModal";
import dotenv from "dotenv";
dotenv.config();

export type TaskData = {
  userId: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
};

export const deleteTask = (id: string) => {
  console.log("Deleting task with id: ", id);
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      window.location.reload();
    })
    .catch((err) => console.log(err));
};

const ActionsCell = ({ row }: { row: any }) => {
  const payment = row.original;
  const [isModalOpen, setModalOpen] = useState(false);

  const handleUpdateTask = () => {
    setModalOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleUpdateTask}>
            Update Task
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-700 hover:text-red-700" onClick={() => deleteTask(payment._id)}>
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateTaskModal
        id={payment._id}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        taskData={payment}
      />
    </>
  );
};

export const columns: ColumnDef<TaskData>[] = [
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} />, 
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Priority
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Due Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  
];
