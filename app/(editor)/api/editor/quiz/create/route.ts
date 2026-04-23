import { db } from '@/db';
import { auth } from '@/lib/auth';
import { quiz } from '@quizpot/quizcore/db/schema';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: You must be logged in to create a quiz.' },
        { status: 401 }
      );
    }

    const quizData = await request.json();
    
    if (!quizData || !quizData.id) {
      return NextResponse.json(
        { error: 'Bad Request: Quiz data and ID are required.' },
        { status: 400 }
      );
    }

    const [newQuiz] = await db.insert(quiz).values({
      id: quizData.id,
      title: quizData.title,
      theme: quizData.theme,
      ownerId: session.user.id,
      quiz: quizData,
    }).returning();

    return NextResponse.json(newQuiz, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}