import { db } from '@/db'
import { quiz } from '@quizpot/quizcore/db/schema'
import { eq, desc } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import FancyCard from '@/components/ui/fancy-card'
import QuizzesPageClient from './page.client'
import { getTranslations } from 'next-intl/server'

const DashboardQuizzesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/')
  }

  const t = await getTranslations('QuizzesPage')

  const userQuizzes = await db.query.quiz.findMany({
    where: eq(quiz.ownerId, session.user.id),
    limit: 9,
    orderBy: [desc(quiz.createdAt)],
  })

  return (
    <section className='flex flex-col gap-4'>
      <FancyCard className='p-4'>
        <h1 className="text-4xl font-semibold">{ t('title') }</h1>
      </FancyCard>
      <QuizzesPageClient quizzes={ userQuizzes } />
    </section>
  )
}

export default DashboardQuizzesPage