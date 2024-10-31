
import { NextResponse } from 'next/server';
import { Pool } from 'pg';



const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const estateType = searchParams.get('estateType');

    if (!estateType) {
        return NextResponse.json({ error: 'Estate type is required' }, { status: 400 });
    }

    try {
        const query = 'SELECT * FROM questions WHERE estate_type = $1';
        const result = await pool.query(query, [estateType]);

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

