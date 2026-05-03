import { db } from '@/db';
import { auth } from '@/lib/auth';
import { Quiz } from '@quizpot/quizcore';
import { quiz } from '@quizpot/quizcore/db/schema';
import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: You must be logged in to create a quiz.' },
        { status: 401 }
      );
    }

    const newQuiz = await db.insert(quiz).values({
      id: randomUUID(),
      title: "New Quiz",
      quiz: defaultQuiz,
      ownerId: session.user.id
    });

    return NextResponse.json(newQuiz, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

const defaultQuiz: Quiz = {
  id: randomUUID(),
  title: "New Quiz",
  images: {},
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
  language: "en",
  steps: [],
  theme: {
    color: "#f3f3f3",
  },
  version: 2
}