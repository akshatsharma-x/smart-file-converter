import { useState } from 'react'
import { useConversionStore } from './useConversionStore'
import { checkConversionStatus } from '../services/api'

export const useConvert = () => {
  const [isChecking, setIsChecking] = useState(false)
  const { setStatus, setProgress } = useConversionStore()

  const checkStatus = async (uploadId) => {
    if (isChecking) return // Prevent multiple simultaneous calls
    
    setIsChecking(true)

    try {
      const result = await checkConversionStatus(uploadId)
      
      // Update progress based on status
      switch (result.status) {
        case 'processing':
          setStatus('processing')
          // Only update progress if it's actually increasing
          if (result.progress && result.progress > 0) {
            setProgress(result.progress)
          }
          break
        case 'completed':
          setStatus('completed')
          setProgress(100)
          break
        case 'error':
          setStatus('error')
          break
      }

      return result
    } catch (error) {
      setStatus('error')
      throw error
    } finally {
      setIsChecking(false)
    }
  }

  return {
    checkStatus,
    isChecking,
  }
}