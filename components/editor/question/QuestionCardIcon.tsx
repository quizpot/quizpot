import React from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { TbCards } from 'react-icons/tb'

const QuestionCardIcon = ({ questionType }: { questionType: string }) => {
  if (questionType === 'multipleChoice') {
    return <TbCards size={24} />
  } else if (questionType === 'trueFalse') {
    return <IoMdCheckmarkCircleOutline size={24} />
  } else {
    return questionType
  }
}

export default QuestionCardIcon