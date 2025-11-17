import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import AddQuestionButton from './AddQuestionButton'
import { useTranslations } from 'next-intl'

const NewQuestionDialog = () => {
  const t = useTranslations('NewQuestionDialog')

  return (
    <Dialog>
      <DialogTrigger>
        { t('button') }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title={ t('title') } />
        <section className="relative flex-grow overflow-y-auto">
          <div className='w-full h-full p-4 flex flex-col gap-4'>
            <AddQuestionButton questionType='multipleChoice' />
            <AddQuestionButton questionType='trueFalse' />
            <AddQuestionButton questionType='shortAnswer' />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default NewQuestionDialog