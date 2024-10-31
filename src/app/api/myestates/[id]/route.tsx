
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const result = await pool.query(
            'SELECT * FROM estates WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ success: false, message: 'Estate not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, estate: result.rows[0] });
    } catch (error) {
        console.error('Error fetching estate details:', error);
        return NextResponse.json({ success: false, message: 'Error fetching data' }, { status: 500 });
    }
}
