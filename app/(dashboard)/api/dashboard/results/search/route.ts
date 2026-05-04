import { db } from '@/db';
import { auth } from '@/lib/auth';
import { result } from '@quizpot/quizcore/db/schema';
import { NextResponse } from 'next/server';
import { and, desc, sql } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { query = '', page = 1, limit = 9 } = await request.json();
    const offset = (page - 1) * limit;

    const results = await db
      .select()
      .from(result)
      .where(
        and(
          sql`${result.result}->'quiz'->>'title' ILIKE ${`%${query}%`}`
        )
      )
      .limit(limit)
      .offset(offset)
      .orderBy(desc(result.createdAt));

    return NextResponse.json(results);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Search failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}