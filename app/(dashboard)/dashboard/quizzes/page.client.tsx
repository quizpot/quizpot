'use client'

import FancyButton from '@/components/ui/fancy-button'
import FancyCard from '@/components/ui/fancy-card'
import TextInput from '@/components/ui/text-input'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { quiz } from '@quizpot/quizcore/db/schema'
import { type InferSelectModel } from 'drizzle-orm'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

type Quiz = InferSelectModel<typeof quiz>

const QuizzesPageClient = ({
  quizzes
}: {
  quizzes: Quiz[]
}) => {
  const t = useTranslations('QuizzesPage')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((q) =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, quizzes])

  return (
    <>
      <FancyButton color='green' className='text-center' asChild>
        <Link href={'/editor'}>
          { t('createNew') }
        </Link>
      </FancyButton>
      <TextInput placeholder={ t('search') } onChange={(e) => setSearchQuery(e.target.value)} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
        {
          filteredQuizzes.map((q) => (
            <QuizCard key={q.id} quiz={q} />
          ))
        }
      </div>
    </>
  )
}

export const QuizCard = ({ quiz }: { quiz: Quiz }) => {
  const router = useRouter()
  const t = useTranslations('QuizCard')
  const bt = useTranslations('Buttons')
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteQuiz = async () => {
    setIsDeleting(true)
    await fetch('/api/dashboard/quizzes/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quizId: quiz.id })
    })
    setOpen(false)
    router.refresh()
    setIsDeleting(false)
  }

  return (
    <FancyCard className='flex flex-col p-0 overflow-hidden'>
      <div className='aspect-video h-fit w-full' style={{ background: quiz.theme.color }}></div>
      <div className='p-4 flex flex-col gap-2'>
        <h1 className='text-2xl'>{quiz.title}</h1>
        <div className='flex gap-4 pb-2 flex-wrap'>
          <FancyButton color='green' disabled={ true }>
            {/* <Link href={'/host?id=' + quiz.id}> */}
              { bt('host') }
            {/* </Link> */}
          </FancyButton>
          <FancyButton color='yellow' asChild>
            <Link href={'/editor?quizId=' + quiz.id}>
              { bt('edit') }
            </Link>
          </FancyButton>
          <FancyButton color='blue' disabled={ true }>
            { bt('download') }
          </FancyButton>
          <Dialog open={ open } onOpenChange={ setOpen }>
            <DialogTrigger color='red'>
              { bt('delete') }
            </DialogTrigger>
            <DialogContent className='max-w-md'>
              <DialogHeader title={ t('deleteQuizTitle') } />
              <div className='p-4 flex flex-col gap-6'>
                <p>{ t('deleteQuizDescription') } <strong>{ quiz.title }</strong></p>
                <div className='flex justify-end gap-2'>
                  <FancyButton onClick={ () => setOpen(false) }>
                    { bt('cancel') }
                  </FancyButton>
                  <FancyButton color='red' onClick={ deleteQuiz } disabled={ isDeleting }>
                    { bt('delete') }
                  </FancyButton>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </FancyCard>
  )
}


export default QuizzesPageClient