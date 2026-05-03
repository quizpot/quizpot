import { db } from '@/db';
import { auth } from '@/lib/auth';
import { quiz } from '@quizpot/quizcore/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: You must be logged in to delete a quiz.' },
        { status: 401 }
      );
    }

    const { quizId } = await request.json();

    const q = await db.select().from(quiz).where(eq(quiz.id, quizId));

    if (!quiz || q[0].ownerId !== session.user.id) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    await db.delete(quiz).where(eq(quiz.id, quizId));

    return NextResponse.json({ message: 'Quiz deleted successfully'}, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}