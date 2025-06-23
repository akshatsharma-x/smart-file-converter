import { useState, useRef } from 'react'
import { useConversionStore } from './useConversionStore'
import { checkConversionStatus } from '../services/api'

export const useConvert = () => {
  const [isChecking, setIsChecking] = useState(false)
  const { setStatus, setProgress } = useConversionStore()
  const lastCallRef = useRef(null)

  const checkStatus = async (uploadId) => {
    // Prevent multiple simultaneous calls for the same uploadId
    if (isChecking || lastCallRef.current === uploadId) return
    
    setIsChecking(true)
    lastCallRef.current = uploadId

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
      lastCallRef.current = null
    }
  }

  return {
    checkStatus,
    isChecking,
  }
}