import { db } from '@/db'
import { auth } from '@/lib/auth'
import { result } from '@quizpot/quizcore/db/schema'
import { eq } from 'drizzle-orm'
import { headers, cookies } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import ResultPageClient from './page.client'
import { getCookie } from 'cookies-next'

const ResultPage = async ({ searchParams }: { searchParams: Promise<{ id: string }> }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  const { id } = await searchParams

  if (!id) {
    redirect('/dashboard/results')
  }

  const data = (await db.select().from(result).where(eq(result.id, id)))[0]

  if (!data) {
    notFound()
  }

  if (data.ownerId !== session.user.id) {
    throw new Error('You are not the owner of this result')
  }
  
  return <ResultPageClient result={data.result} />
}

export default ResultPage