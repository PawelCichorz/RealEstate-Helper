'use client';
import React from 'react';
import {  useForm } from 'react-hook-form';

type FormData = {
    password: string;
    email: string;
    message: string;
  };

export default function Login() {
 

    const { register, handleSubmit, formState: { errors },reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
          }
    
          const responseData = await response.json();
          console.log('User registered:', responseData);
    
          
          console.log('JWT Token:', responseData.token);
    
          reset();
        } catch (error) {
          console.error('Error registering user:', error);
        }
      };

  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center h-screen'>
        <label htmlFor="email" className='text-2xl pb-4 '>Email:</label>
        <input  className='border-2 w-[300px] h-12'
          id="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        
        <label htmlFor="password" className='text-2xl pb-4 '>Hasło:</label>
        <input
        className='border-2 w-[300px] h-12'
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            validate: {
                minLength: value => value.length >= 5 || "Password must be at least 5 characters long",
                containsUppercase: value => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                containsNumber: value => /\d/.test(value) || "Password must contain at least one number",
              }
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
  
        <button type="submit"  className='m-4 border-2 px-8 py-4 text-2xl border-red-500' >Submit</button>
      </form>
    );
  
}
