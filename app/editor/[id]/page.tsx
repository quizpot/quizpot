import { EditorPage } from '@/components/editor/EditorPage'
import React from 'react'

const EditQuizPage = async ({ params }: { params: { id: string } }) => {
  const par = await params
  const quizId = par.id

  return <EditorPage quizId={ quizId } />
}


export default EditQuizPage