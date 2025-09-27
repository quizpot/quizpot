"use client"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/Dialog'
import QuizFileInput from '@/components/ui/QuizFileInput'
import SelectInput from '@/components/ui/SelectInput'
import { useToast } from '@/components/ui/Toaster'
import { getAllQuizzes } from '@/lib/client/IndexedDB'
import { QuizFile } from '@/lib/misc/QuizFile'
import React, { useEffect, useState } from 'react'

const SetQuizDialog = ({ quizName, setQuiz }: { quizName?: string, setQuiz: (quiz: QuizFile) => void }) => {
  const addToast = useToast()
  const [openedSetQuizDialog, setOpenedSetQuizDialog] = useState(false)
  const [quizzes, setQuizzes] = useState<QuizFile[]>([])

  useEffect(() => {
    getAllQuizzes().then(quizzes => {
      setQuizzes(quizzes)
    })
  }, [])

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files.length === 0) {
      addToast({ message: 'No file selected', type: 'error' })
      return
    }

    const file = e.target.files[0]
    const fileText = await file.text()

    try {
      const jsonObj = JSON.parse(fileText)
      setQuiz(jsonObj)
    } catch (e) {
      addToast({ message: 'Error parsing quiz file, ' + e, type: 'error' })
    }
  }

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const quizIndex = e.target.value as unknown as number
    setQuiz(quizzes[quizIndex])
    setOpenedSetQuizDialog(false)
  }

  return (
    <Dialog open={ openedSetQuizDialog } onOpenChange={ (open) => { setOpenedSetQuizDialog(open) } }>
      <DialogTrigger variant='gray' className='font-semibold w-full'>
        { quizName || 'Select Quiz' }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title='Select Quiz' />
        <div className='p-4 flex flex-col gap-4'>
          <QuizFileInput onChange={ (e) => { onFile(e); setOpenedSetQuizDialog(false) } } />
          <SelectInput onChange={ onSelectChange } className='w-full'>
            <option>Select a quiz from editor</option>
            {
              quizzes.map((quiz, index) => {
                return (
                  <option key={ index } value={ index }>{ quiz.title }</option>
                )
              })
            }
          </SelectInput>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SetQuizDialog