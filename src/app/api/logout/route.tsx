import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; 

export async function PUT() {
    const response = NextResponse.json({ message: 'Logged out' });


    response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0, 
        path: '/', 
        sameSite: 'lax',
    });

    return response;
}