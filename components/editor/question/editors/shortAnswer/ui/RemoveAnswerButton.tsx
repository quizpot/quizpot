import Button from '@/components/ui/ButtonOld'
import React from 'react'

const RemoveAnswerButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button onClick={ onClick } variant='red' className='font-semibold w-full'>
      Remove Answer
    </Button>
  )
}

export default RemoveAnswerButton