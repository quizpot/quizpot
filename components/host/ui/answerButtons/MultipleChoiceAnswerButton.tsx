import Button from '@/components/ui/Button'
import { ColorVariants } from '@/lib/misc/colorVariants/ColorVariants'
import React from 'react'

const MultipleChoiceAnswerButton = ({ label, variant }: { label: string, variant: ColorVariants }) => {
  return (
    <Button variant={ variant }>
      <div className='flex justify-between items-center w-full h-full p-8 text-4xl'>
        { label }
      </div>
    </Button>
  )
}

export default MultipleChoiceAnswerButton