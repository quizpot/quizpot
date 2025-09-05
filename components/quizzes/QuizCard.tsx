import { QuizFile } from '@/lib/misc/QuizFile'
import Image from 'next/image'
import React from 'react'
import Button from '../ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui/Dialog'

const QuizCard = ({ quiz, id }: { quiz: QuizFile, id: string }) => {
  return (
    <div className='bg-neutral-100 rounded-lg'>
      <div className='w-full h-48 rounded-t-lg'
        style={{ 
          backgroundColor: quiz.theme.background.startsWith('data:image/') ? undefined : quiz.theme.background 
        }}
      >
        { quiz.thumbnail && <Image src={ quiz.thumbnail } alt={ quiz.title } width={ 480/9*16 } height={ 480 } className='object-cover' /> }
      </div>
      <div className='p-4 bg-neutral-200 rounded-b-lg'>
        <h2 className='text-xl font-bold'>{ quiz.title }</h2>
        <p className='text-sm'>{ quiz.description }</p>
        <div className='mt-4 flex gap-4'>
          <Button href={`/editor/${id.replace('quiz:', '')}`} variant='green'>
            Edit
          </Button>
          <Button variant='blue' onClick={() => {
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
            <DialogTrigger variant='red'>
              Delete
            </DialogTrigger>
            <DialogContent>
              <DialogHeader title="Are you sure?" />
              <section className="relative flex-grow overflow-y-auto">
                <div className='w-full h-full p-4 flex flex-col gap-4'>
                  <Button variant='red' onClick={() => {
                    localStorage.removeItem(id)
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