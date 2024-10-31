import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import jwt, { JwtPayload } from 'jsonwebtoken'; 
import { cookies } from 'next/headers'; 

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});



interface Answers {
    [key: string]: string[]; 
}

export async function POST(req: Request) {
    const { estateType, answers }: { estateType: string; answers: Answers } = await req.json();

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
    } catch (error) {
        console.error('Błąd weryfikacji tokena:', error);
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    try {
      
        const questionIds = Object.keys(answers).map(id => Number(id));
        const questionsQuery = 'SELECT id, question_text FROM questions WHERE id = ANY($1)';
        const { rows: questions } = await pool.query(questionsQuery, [questionIds]);

   
        const formattedAnswers = questions.map(question => {
            const answerText = answers[question.id]?.join(', ') || ''; 
            return { question: question.question_text, answer: answerText };
        });

        const result = await pool.query(
            'INSERT INTO estates (user_id, estate_type, answers) VALUES ($1, $2, $3) RETURNING id',
            [userId, estateType, JSON.stringify(formattedAnswers)]
        );

        return NextResponse.json({ success: true, id: result.rows[0].id });
    } catch (error) {
        console.error('Błąd przy zapisywaniu danych:', error);
        return NextResponse.json({ success: false, message: 'Błąd przy zapisywaniu danych' }, { status: 500 });
    }
}
