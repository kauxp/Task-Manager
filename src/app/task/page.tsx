"use client"
import Header from "@/components/ui/header"
import React, { useState, useEffect } from 'react';

import { isAuthenticated } from '@/utils/isAuthenticates';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

import {TaskData, columns} from "@/components/ui/column"
import { DataTable } from "@/components/ui/dataTable"

import { AddTask } from '@/components/ui/addTask';
import dotenv from 'dotenv';
dotenv.config();

const Task: React.FC = () => {
    // useLayoutEffect(() => {
    //     const isAuth = isAuthenticated;
    //     if(!isAuth){
    //       redirect("/login");
    //     }
    // }, [])

    const [data, setData] = useState<TaskData[]>([]);

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
            setData(result.task);
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
