import { useState } from 'react'
import { useConversionStore } from './useConversionStore'
import { checkConversionStatus } from '../services/api'

export const useConvert = () => {
  const [isChecking, setIsChecking] = useState(false)
  const { setStatus, setProgress } = useConversionStore()

  const checkStatus = async (uploadId) => {
    setIsChecking(true)

    try {
      const result = await checkConversionStatus(uploadId)
      
      // Update progress based on status
      switch (result.status) {
        case 'processing':
          setStatus('processing')
          setProgress(prev => Math.min(prev + 10, 90))
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