import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(req: Request) {
    const { email, password } = await req.json();
  
 
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
  
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
  

    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
    
      const result = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
        [email, hashedPassword]
      );
      const newUser = result.rows[0];
      return NextResponse.json({ message: 'User created', user: newUser }, { status: 201 });
    } catch (error:any) {
      console.error(error);
      if (error.code === '23505') { 
        return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
      }
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
  }