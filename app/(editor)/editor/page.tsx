import { db } from '@/db'
import { auth } from '@/lib/auth'
import { quiz } from '@quizpot/quizcore/db/schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import EditorPageClient from './page.client'
import { Quiz } from '@quizpot/quizcore'

const EditorPage = async ({ searchParams }: { searchParams: Promise<{ quizId: string }> }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const { quizId } = await searchParams

  if (!quizId) {
    return <EditorPageClient quiz={ { 
      theme: {
        color: '#737373',
      }
    } as Quiz } />
  }

  const q = (await db.select().from(quiz).where(eq(quiz.id, quizId)))[0]

  if (q.ownerId !== session!.user.id) {
    throw new Error('You are not the owner of this quiz')
  }
  
  return <EditorPageClient quiz={ q.quiz } />
}

export default EditorPage