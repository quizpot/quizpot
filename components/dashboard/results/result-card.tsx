'use client'

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import FancyButton from "@/components/ui/fancy-button"
import FancyCard from "@/components/ui/fancy-card"
import { result } from "@quizpot/quizcore/db/schema"
import { InferSelectModel } from "drizzle-orm"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Result = InferSelectModel<typeof result>

export const ResultCard = ({ 
  result, 
  onDeleteSuccess 
}: { 
  result: Result, 
  onDeleteSuccess: (id: string) => void 
}) => {
  const router = useRouter()
  const t = useTranslations('ResultCard')
  const bt = useTranslations('Buttons')
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteResult = async () => {
    setIsDeleting(true)
    try {
      const res = await fetch('/api/dashboard/results/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ resultId: result.id })
      })

      if (res.ok) {
        setOpen(false)
        onDeleteSuccess(result.id)
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to delete result:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const d = new Date(result.createdAt)

  return (
    <FancyCard className='flex flex-col p-0 overflow-hidden'>
      <div 
        className='aspect-video h-fit w-full' 
        style={{ background: result.result.quiz.theme.color }}
      ></div>
      <div className='p-4 flex flex-col gap-2'>
        <div className="flex gap-4">
          <h1 className='text-2xl font-semibold w-full'>{result.result.quiz.title}</h1>
          <FancyCard color="foreground" className="flex gap-2" size="sm">
            <span className="whitespace-nowrap">{ d.toLocaleTimeString() }</span>
            <span>{ d.toLocaleDateString() }</span>
          </FancyCard>
        </div>
        <div className='flex gap-4 pb-2 flex-wrap'>
          
          <FancyButton color='green' asChild>
            <Link href={'/result?id=' + result.id}>
              { bt('view') }
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
              <DialogHeader title={ t('deleteResultTitle') } />
              <div className='p-4 flex flex-col gap-6'>
                <p>
                  { t('deleteResultDescription') } <strong>{ result.result.quiz.title }</strong>
                </p>
                <div className='flex justify-end gap-2'>
                  <FancyButton onClick={ () => setOpen(false) }>
                    { bt('cancel') }
                  </FancyButton>
                  <FancyButton 
                    color='red' 
                    onClick={ deleteResult } 
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