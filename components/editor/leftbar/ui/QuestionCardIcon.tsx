import { QuestionType } from '@/lib/misc/QuizFile'
import React from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { PiSlideshow } from 'react-icons/pi'
import { TbCards } from 'react-icons/tb'

const QuestionCardIcon = ({ questionType }: { questionType: QuestionType }) => {
  if (questionType === 'multipleChoice') {
    return <TbCards size={24} />
  } else if (questionType === 'trueFalse') {
    return <IoMdCheckmarkCircleOutline size={24} />
  } else if (questionType === 'slide') {
    return <PiSlideshow size={24} />
  } else {
    return questionType
  }
}

export default QuestionCardIcon