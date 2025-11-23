import { QuizFile } from '@/lib/QuizFile'
import React from 'react'
import Button from '../ui/ButtonOld'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui/dialog'
import { deleteQuiz } from '@/lib/client/IndexedDB'
import FancyButton from '../ui/fancy-button'
import Link from 'next/link'
import FancyCard from '../ui/fancy-card'
import { useTranslations } from 'next-intl'

const QuizCard = ({ quiz, id }: { quiz: QuizFile, id: string }) => {
  const t = useTranslations('Buttons')
  const dev = process.env.NODE_ENV === 'development'

  return (
    <FancyCard className='p-0 mb-auto'>
      {
        quiz.thumbnail ?
          <div className='w-full h-48 rounded-t-lg'
            style={{ 
              backgroundImage: `url(${quiz.thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        :
          <div className='w-full h-48 rounded-t-lg'
            style={{ 
              backgroundColor: quiz.theme.background.startsWith('data:image/') ? undefined : quiz.theme.background 
            }}
          ></div>
      }
      <div className='p-4 pb-6 bg-neutral-200 dark:bg-neutral-800 rounded-b-lg flex flex-col gap-4'>
        <div className='flex gap-2 select-none'>
          <FancyCard className='text-xs font-semibold' size='sm'>{ 
            new Date(quiz.createdAt).toLocaleString(undefined, {
              minute: 'numeric',
              hour: 'numeric',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }) 
          }</FancyCard>
          <FancyCard className='text-xs font-semibold' size='sm'>
            { quiz.language }
          </FancyCard>
          {
            dev && <FancyCard className='text-xs font-semibold mr-auto' size='sm'>
              v{ quiz.version }
            </FancyCard>
          }
        </div>
        <div>
          <h1 className='text-xl font-bold'>{ quiz.title }</h1>
          <p className='text-sm'>{ quiz.description }</p>
        </div>
        <div className='flex gap-4'>
          <FancyButton color='green' asChild>
            <Link href={`/editor/${id.replace('quiz:', '')}`}>
              { t('edit') }
            </Link>
          </FancyButton>
          <FancyButton color='blue' onClick={() => {
            const a = document.createElement("a")
            const jsonString = JSON.stringify(quiz, null, 2)
            const file = new Blob([jsonString], {type: 'text/json'})
            a.href = URL.createObjectURL(file);
            a.download = quiz.title + '.qp'
            a.click()
          }}>
            { t('download') }
          </FancyButton>
          <Dialog>
            <DialogTrigger color='red'>
              { t('delete') }
            </DialogTrigger>
            <DialogContent>
              <DialogHeader title={ t('sure') } />
              <section className="relative flex-grow overflow-y-auto">
                <div className='w-full h-full p-4 flex flex-col gap-4'>
                  <Button variant='red' onClick={async () => {
                    await deleteQuiz(id)
                    window.location.reload()
                  }}>
                    { t('delete') }
                  </Button>
                </div>
              </section>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </FancyCard>
  )
}

export default QuizCard