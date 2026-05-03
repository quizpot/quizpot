import { db } from '@/db';
import { auth } from '@/lib/auth';
import { quiz } from '@quizpot/quizcore/db/schema';
import { NextResponse } from 'next/server';
import { eq, and, ilike, desc } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { query = '', page = 1, limit = 9 } = await request.json();
    const offset = (page - 1) * limit;

    const results = await db.query.quiz.findMany({
      where: and(
        eq(quiz.ownerId, session.user.id),
        ilike(quiz.title, `%${query}%`)
      ),
      limit,
      offset,
      orderBy: [desc(quiz.createdAt)],
    });

    return NextResponse.json(results);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Search failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}