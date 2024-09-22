"use client"
import Header from "@/components/ui/header"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import TaskModal from '@/components/modals/TaskModal';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

import {ViewOptions} from "@/components/ui/ViewOptions"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { isAuthenticated } from '@/utils/isAuthenticates';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

import {TaskData, columns} from "@/components/ui/column"
import { DataTable } from "@/components/ui/dataTable"

import { AddTask } from '@/components/ui/addTask';

const Task: React.FC = () => {
    useLayoutEffect(() => {
        const isAuth = isAuthenticated;
        if(!isAuth){
          redirect("/login");
        }
    }, [])

    const [data, setData] = useState<TaskData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:5000/task/");
            const result = await res.json();
            
            setData(result);
        };

        fetchData();
    }, []);

    return (
        <div className='bg-[#1a1a1a] h-screen p-10 gap-8 flex flex-col'>

            <Header />
            <div>
                <AddTask/>
            </div>
            <div >
            <DataTable columns={columns} data={data} />
            </div>
            
        </div>
    );
};

export default Task;
