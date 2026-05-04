import { db } from '@/db'
import { result } from '@quizpot/quizcore/db/schema'
import { eq, desc } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import FancyCard from '@/components/ui/fancy-card'
import { getTranslations } from 'next-intl/server'
import ResultsPageClient from './page.client'

const DashboardResultsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/')
  }

  const t = await getTranslations('ResultsPage')

  const userResults = await db.query.result.findMany({
    where: eq(result.ownerId, session.user.id),
    limit: 9,
    orderBy: [desc(result.createdAt)],
  })

  return (
    <section className='flex flex-col gap-4'>
      <FancyCard className='p-4'>
        <h1 className="text-4xl font-semibold">{ t('title') }</h1>
      </FancyCard>
      <ResultsPageClient initialResults={ userResults } />
    </section>
  )
}

export default DashboardResultsPage