'use client'

import StepEditor from '../../step-editor'
import ContentSlideTextEditor from './content-slide-text-editor'
import ContentSlideTitleEditor from './content-slide-title-editor'
import ContentSlideImageEditor from './content-slide-image-editor'

const ContentSlideEditor = () => {
  return (
    <div className="relative flex flex-1 h-full w-full overflow-hidden min-h-0">
      <StepEditor className='p-4 flex flex-col gap-4 min-h-0'>
        <div className='flex gap-4 shrink-0'>
          <ContentSlideTitleEditor />
        </div>
        
        <div className="flex-1 min-h-0 w-full flex items-center justify-center">
          <ContentSlideImageEditor />
        </div>
        
        <div className='shrink-0'>
          <ContentSlideTextEditor />
        </div>
      </StepEditor>
    </div>
  )
}

export default ContentSlideEditor