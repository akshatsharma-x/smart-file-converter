import { useState } from 'react'
import { useConversionStore } from './useConversionStore'
import { uploadFile as apiUploadFile } from '../services/api'

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false)
  const { setStatus, setProgress } = useConversionStore()

  const uploadFile = async (file) => {
    setIsUploading(true)
    setStatus('uploading')
    setProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 25) {
            clearInterval(progressInterval)
            return 25
          }
          return prev + 5
        })
      }, 200)

      const uploadId = await apiUploadFile(file)
      
      clearInterval(progressInterval)
      setProgress(25)
      setStatus('processing')
      
      return uploadId
    } catch (error) {
      setStatus('error')
      throw error
    } finally {
      setIsUploading(false)
    }
  }

  return {
    uploadFile,
    isUploading,
  }
}