"use client"
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import FancyCard from '@/components/ui/fancy-card'
import { useEditorStep } from '../../../editor/providers/editor-step-provider' // Adjusted path based on typical project structure
import { Question } from '@quizpot/quizcore' // Assuming Question type has imageUrl?: string
import { sha256 } from 'js-sha256' // Client-side SHA256 calculation

const QuestionImageEditor = () => {
  // Use the useEditorStep hook to manage quiz data
  const { data, setData } = useEditorStep<Question>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Trigger the hidden file input when the card is clicked
  const handleImageClick = () => {
    if (!isUploading) { // Prevent clicking while an upload is in progress
      fileInputRef.current?.click()
    }
  }

  // Handle file selection and upload
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      // Read file as ArrayBuffer to calculate SHA256 hash
      const arrayBuffer = await file.arrayBuffer()
      const hash = sha256(arrayBuffer)

      const formData = new FormData()
      formData.append('image', file)
      formData.append('hash', hash) // Send client-calculated hash to server

      // Upload image to the server API route
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Image upload failed.')
      }

      const result = await response.json()
      // Update the quiz data with the new image URL
      setData({
        ...data,
        imageUrl: result.url, // Assuming the API returns a 'url' field
      })
    } catch (error: any) {
      console.error('Upload error:', error)
      setUploadError(error.message || 'Failed to upload image.')
    } finally {
      setIsUploading(false)
      // Clear the file input value to allow re-uploading the same file if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const imageUrl = data.imageUrl

  return (
    <FancyCard
      color='background' // Using 'background' as a default color for the card
      className='p-4 rounded-lg cursor-pointer relative group' // Added p-4 for 1rem padding, rounded-lg for consistent roundness, and 'group' for hover effects
      onClick={handleImageClick}
    >
      {/* Hidden file input */}
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      {/* Image display area */}
      <div className='w-full h-48 flex items-center justify-center relative overflow-hidden rounded-lg'> {/* Fixed height for consistent layout */}
        {isUploading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 text-white text-lg z-10 rounded-lg">Uploading...</div>
        ) : uploadError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-red-800 bg-opacity-75 text-white text-center p-2 z-10 rounded-lg">Error: {uploadError}</div>
        ) : imageUrl ? (
          <Image alt='Question Image' src={imageUrl} fill={true} className='object-contain rounded-lg' />
        ) : (
          <div className="text-gray-500 text-center">Click to upload question image</div>
        )}
        {/* Overlay for upload prompt on hover */}
        {!isUploading && !uploadError && !imageUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">Upload Image</div>
        )}
      </div>
    </FancyCard>
  )
}

export default QuestionImageEditor
