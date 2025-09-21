import { EditorPage } from '@/components/editor/EditorPage'
import { EditorCurrentQuestionProvider } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { EditorQuizFileProvider } from '@/components/editor/providers/EditorQuizFileProvider'
import DeviceScreenUnsupported from '@/components/ui/DeviceScreenUnsupported'
import React from 'react'

const EditQuizPage = async ({ params }: { params: { id: string } }) => {
  const par = await params
  const quizId = par.id

  return (
    <>
      <DeviceScreenUnsupported />
      <EditorQuizFileProvider>
        <EditorCurrentQuestionProvider>
          <EditorPage quizId={ quizId } />
        </EditorCurrentQuestionProvider>
      </EditorQuizFileProvider>
    </>
  )
}


export default EditQuizPage