"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const NEXT_PUBLIC_BACKEND_URL= process.env.NEXT_PUBLIC_BACKEND_URL
const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${NEXT_PUBLIC_BACKEND_URL}/api/register` , {
        email: formData.email,
        password: formData.password
      });


      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('User created successfully');
        router.push('/task');
      } else {
        console.error('No token received');
        alert('Sign Up failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during login:', err); // Log the error
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className=''>
      <Card>
        <CardHeader className='gap-2'>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            New here? Create an account.
          </CardDescription> 
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" value={formData.email} onChange={handleChange} />
              </div>
            </div>
            <div className="grid w-full items-center mt-3 gap-4">
              <div className="flex flex-col space-y-1.5 gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={formData.password} onChange={handleChange} />
              </div>
            </div>
            <Button type="submit" className="w-full bg-[#9fcc00] font-semibold mt-4">Log In</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 ">
          <Button className="w-full bg-transparent hover:bg-transparent text-black shadow-none">Create an account</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
