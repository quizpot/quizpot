import { db } from '@/db'
import { auth } from '@/lib/auth'
import { quiz } from '@quizpot/quizcore/db/schema'
import { eq } from 'drizzle-orm'
import { headers, cookies } from 'next/headers'
import EditorPageClient from './page.client'
import { Quiz } from '@quizpot/quizcore'
import { getCookie } from 'cookies-next'

const EditorPage = async ({ searchParams }: { searchParams: Promise<{ quizId: string }> }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const sidebarCookie = await getCookie('editor-sidebar-opened', { cookies });
  const initialSidebarOpen = sidebarCookie === 'true';

  const { quizId } = await searchParams

  if (!quizId) {
    return <EditorPageClient 
      quiz={{ theme: { color: '#737373' } } as Quiz} 
      initialSidebarOpen={initialSidebarOpen}
    />
  }

  const q = (await db.select().from(quiz).where(eq(quiz.id, quizId)))[0]

  if (q.ownerId !== session!.user.id) {
    throw new Error('You are not the owner of this quiz')
  }
  
  return <EditorPageClient 
    quiz={q.quiz} 
    initialSidebarOpen={initialSidebarOpen}
  />
}

export default EditorPage