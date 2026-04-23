import { db } from '@/db';
import { auth } from '@/lib/auth';
import { quiz as quizTable } from '@quizpot/quizcore/db/schema';
import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: You must be logged in to update a quiz.' },
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

    await db
      .update(quizTable)
      .set({
        title: quizData.title,
        quiz: quizData,
      })
      .where(
        and(
          eq(quizTable.id, quizData.id),
          eq(quizTable.ownerId, session.user.id)
        )
      );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}