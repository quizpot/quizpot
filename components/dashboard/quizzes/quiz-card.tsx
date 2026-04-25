'use client'

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import FancyButton from "@/components/ui/fancy-button"
import FancyCard from "@/components/ui/fancy-card"
import { quiz } from "@quizpot/quizcore/db/schema"
import { InferSelectModel } from "drizzle-orm"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Quiz = InferSelectModel<typeof quiz>

export const QuizCard = ({ 
  quiz, 
  onDeleteSuccess 
}: { 
  quiz: Quiz, 
  onDeleteSuccess: (id: string) => void 
}) => {
  const router = useRouter()
  const t = useTranslations('QuizCard')
  const bt = useTranslations('Buttons')
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteQuiz = async () => {
    setIsDeleting(true)
    try {
      const res = await fetch('/api/dashboard/quizzes/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quizId: quiz.id })
      })

      if (res.ok) {
        setOpen(false)
        // Immediately remove from the client-side list
        onDeleteSuccess(quiz.id)
        // Refresh server data/cache
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to delete quiz:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <FancyCard className='flex flex-col p-0 overflow-hidden'>
      <div 
        className='aspect-video h-fit w-full' 
        style={{ background: quiz.theme.color }}
      ></div>
      <div className='p-4 flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold'>{quiz.title}</h1>
        <div className='flex gap-4 pb-2 flex-wrap'>
          <FancyButton color='green' disabled={ true }>
            { bt('host') }
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
                <p>
                  { t('deleteQuizDescription') } <strong>{ quiz.title }</strong>
                </p>
                <div className='flex justify-end gap-2'>
                  <FancyButton onClick={ () => setOpen(false) }>
                    { bt('cancel') }
                  </FancyButton>
                  <FancyButton 
                    color='red' 
                    onClick={ deleteQuiz } 
                    disabled={ isDeleting }
                  >
                    { isDeleting ? `${bt('delete')}...` : bt('delete') }
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