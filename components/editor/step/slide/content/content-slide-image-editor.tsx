"use client"

import ImageInput from '@/components/ui/ImageInput'
import React, { useState, useEffect } from 'react'
import { ContentSlideLayout } from '@quizpot/quizcore'
import FancyButton from '@/components/ui/fancy-button'
import { Loader2 } from 'lucide-react'
import { useEditorQuiz } from '@/components/editor/providers/editor-quiz-provider'
import { useEditorCurrentStep } from '@/components/editor/providers/editor-current-step-provider'
import { useEditorStep } from '@/components/editor/providers/editor-step-provider'

const ContentSlideImageEditor = () => {
  const { quiz, setQuiz } = useEditorQuiz();
  const { currentStep } = useEditorCurrentStep();
  const { data } = useEditorStep<ContentSlideLayout>();
  const [isUploading, setIsUploading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (currentStep === undefined || currentStep === null) return null;

  const updateSlideImage = (hash?: string, url?: string) => {
    const updatedSteps = [...quiz.steps];
    const targetStep = updatedSteps[currentStep];

    if (targetStep.type === 'slide') {
      if (targetStep.data.slideType === 'content') {
        updatedSteps[currentStep] = {
          ...targetStep,
          data: { ...targetStep.data, imageHash: hash }
        };
      }
    }

    setQuiz({
      ...quiz,
      images: hash && url ? { ...(quiz.images || {}), [hash]: url } : (quiz.images || {}),
      steps: updatedSteps
    });
  };

  const imageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/editor/quiz/upload-image', {
        method: 'POST',
        body: formData
      });
      const { hash, url } = await res.json();
      if (hash && url) updateSlideImage(hash, url);
    } catch (err) {
      console.error('Image upload failed', err);
    } finally {
      setIsUploading(false);
    }
  };

  const currentHash = data?.imageHash;
  const imageUrl = (mounted && currentHash) ? quiz.images?.[currentHash] : null;

  if (isUploading) {
    return (
      <div className='flex items-center justify-center w-full h-full min-h-[200px]'>
        <Loader2 className='animate-spin w-8 h-8 text-white/50' />
      </div>
    );
  }

  if (!imageUrl || imageUrl === "undefined") {
    return (
      <section className='flex items-center justify-center w-full h-full min-h-0 flex-1'>
        <ImageInput onChange={imageChange} />
      </section>
    );
  }

  return (
    <section className='flex flex-col items-center justify-center w-full h-full min-h-0 flex-1 overflow-hidden'>
      <div className='flex-1 w-full min-h-0 flex items-center justify-center p-2'>
        <img 
          src={imageUrl}
          alt='Slide' 
          className='h-full w-auto max-w-full object-contain'
        />
      </div>
      <div className='shrink-0 py-2'>
        <FancyButton 
          color='red' 
          size='sm'
          onClick={() => updateSlideImage(undefined)}
        >
          Remove Image
        </FancyButton>
      </div>
    </section>
  );
};

export default ContentSlideImageEditor;