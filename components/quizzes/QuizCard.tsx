import { QuizFile } from '@/lib/misc/QuizFile'
import React from 'react'
import Button from '../ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui/Dialog'
import { deleteQuiz } from '@/lib/client/IndexedDB'

const QuizCard = ({ quiz, id }: { quiz: QuizFile, id: string }) => {
  return (
    <div className='bg-neutral-100 rounded-lg'>
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
      <div className='p-4 bg-neutral-200 rounded-b-lg'>
        <p className='text-xs font-semibold'>{ new Date(quiz.createdAt).toLocaleString(undefined, {
          minute: 'numeric',
          hour: 'numeric',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }) }</p>
        <h2 className='text-xl font-bold'>{ quiz.title }</h2>
        <p className='text-sm'>{ quiz.description }</p>
        <div className='mt-4 flex gap-4'>
          <Button href={`/editor/${id.replace('quiz:', '')}`} className='font-semibold' variant='green'>
            Edit
          </Button>
          <Button variant='blue' className='font-semibold' onClick={() => {
            const a = document.createElement("a")
            const jsonString = JSON.stringify(quiz, null, 2)
            const file = new Blob([jsonString], {type: 'text/json'})
            a.href = URL.createObjectURL(file);
            a.download = quiz.title + '.qp'
            a.click()
          }}>
            Download
          </Button>
          <Dialog>
            <DialogTrigger variant='red' className='font-semibold'>
              Delete
            </DialogTrigger>
            <DialogContent>
              <DialogHeader title="Are you sure?" />
              <section className="relative flex-grow overflow-y-auto">
                <div className='w-full h-full p-4 flex flex-col gap-4'>
                  <Button variant='red' onClick={async () => {
                    await deleteQuiz(id)
                    window.location.reload()
                  }}>
                    Delete
                  </Button>
                </div>
              </section>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default QuizCard