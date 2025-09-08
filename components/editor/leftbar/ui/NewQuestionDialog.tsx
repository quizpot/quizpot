import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/Dialog'
import React from 'react'
import AddQuestionButton from './AddQuestionButton'

const NewQuestionDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        New Question
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title="Choose Question Type" />
        <section className="relative flex-grow overflow-y-auto">
          <div className='w-full h-full p-4 flex flex-col gap-4'>
            <AddQuestionButton questionType='multipleChoice' />
            <AddQuestionButton questionType='trueFalse' />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default NewQuestionDialog