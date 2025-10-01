import Button from '@/components/ui/Button'
import React from 'react'

const AddAnswerButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button onClick={ onClick } variant='green' className='font-semibold w-full'>
      Add Answer
    </Button>
  )
}

export default AddAnswerButton