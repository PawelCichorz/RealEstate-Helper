import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET() {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('token'); 
    const token = tokenCookie ? tokenCookie.value : null; 

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let userId: string | undefined;
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        
        const decoded = jwt.verify(token, secret) as JwtPayload; 
        userId = decoded.id; 
        console.log("User ID:", userId);
    } catch (error) {
        console.error('Błąd weryfikacji tokena:', error);
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    try {
        const result = await pool.query(
            'SELECT id, estate_type, answers FROM estates WHERE user_id = $1',
            [userId]
        );

     
        const estates = result.rows.map(row => ({
            ...row,
            answers: row.answers.reduce((acc: Record<string, string>, item: { question: string; answer: string }) => {
                acc[item.question] = item.answer;
                return acc;
            }, {})
        }));

        return NextResponse.json({ success: true, estates });
    } catch (error) {
        console.error('Błąd przy pobieraniu nieruchomości:', error);
        return NextResponse.json({ success: false, message: 'Błąd przy pobieraniu danych' }, { status: 500 });
    }
}
