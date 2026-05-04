import { db } from '@/db';
import { auth } from '@/lib/auth';
import { result } from '@quizpot/quizcore/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: You must be logged in to delete a result.' },
        { status: 401 }
      );
    }

    const { resultId } = await request.json();

    const q = await db.select().from(result).where(eq(result.id, resultId));

    if (!result || q[0].ownerId !== session.user.id) {
      return NextResponse.json(
        { error: 'Result not found' },
        { status: 404 }
      );
    }

    await db.delete(result).where(eq(result.id, resultId));

    return NextResponse.json({ message: 'Result deleted successfully'}, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}