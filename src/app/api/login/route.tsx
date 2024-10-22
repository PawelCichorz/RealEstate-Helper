import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'; 

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(req: Request) {
    const { email, password } = await req.json();


    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    try {
      
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);


        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const user = result.rows[0];


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }


        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '60m' }
        );

    
        cookies().set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600, 
            path: '/',
            sameSite: 'lax',
        });

   
        return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
