
import { NextResponse } from 'next/server';
import { Pool } from 'pg'; 

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function DELETE(req: Request) {
    const { estateId }: { estateId: number } = await req.json(); 

    try {
        const result = await pool.query('DELETE FROM estates WHERE id = $1 RETURNING id', [estateId]);

        if (result.rows.length === 0) {
            return NextResponse.json({ success: false, message: 'Estate not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Estate deleted successfully' });
    } catch (error) {
        console.error('Error deleting estate:', error);
        return NextResponse.json({ success: false, message: 'Error deleting estate' }, { status: 500 });
    }
}
