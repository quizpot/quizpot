import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/Dialog'
import React from 'react'
import AddSlideButton from './AddSlideButton'

const NewSlideDialog = () => {
  return (
    <Dialog>
      <DialogTrigger variant='gray'>
        New Slide
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title="Choose Slide Type" />
        <section className="relative flex-grow overflow-y-auto">
          <div className='w-full h-full p-4 flex flex-col gap-4'>
            <AddSlideButton slideType='title' />
            <AddSlideButton slideType='titleImageText' />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default NewSlideDialog