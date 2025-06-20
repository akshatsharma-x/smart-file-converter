import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card'
import ProgressBar from '../components/Progress'
import Button from '../components/Button'
import { useConversionStore } from '../hooks/useConversionStore'
import { useConvert } from '../hooks/useConvert'

const ProgressPage = () => {
  const navigate = useNavigate()
  const { file, uploadId, progress, status, setResultUrl } = useConversionStore()
  const { checkStatus, isChecking } = useConvert()

  useEffect(() => {
    if (!uploadId) {
      navigate('/upload')
      return
    }

    const pollStatus = async () => {
      try {
        const result = await checkStatus(uploadId)
        if (result.status === 'completed' && result.downloadUrl) {
          setResultUrl(result.downloadUrl)
          navigate('/download')
        }
      } catch (error) {
        console.error('Status check failed:', error)
      }
    }

    // Poll every 2 seconds
    const interval = setInterval(pollStatus, 2000)
    
    // Initial check
    pollStatus()

    return () => clearInterval(interval)
  }, [uploadId, navigate, checkStatus, setResultUrl])

  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
        return <Clock className="h-6 w-6 text-primary-600 animate-pulse" />
      case 'processing':
        return <FileText className="h-6 w-6 text-primary-600 animate-pulse" />
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-success-600" />
      case 'error':
        return <AlertCircle className="h-6 w-6 text-error-600" />
      default:
        return <Clock className="h-6 w-6 text-secondary-400" />
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading your PDF file...'
      case 'processing':
        return 'Converting PDF to PowerPoint...'
      case 'completed':
        return 'Conversion completed successfully!'
      case 'error':
        return 'An error occurred during conversion'
      default:
        return 'Preparing conversion...'
    }
  }

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-2xl mb-4">
            {getStatusIcon()}
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            Converting Your File
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Please wait while we process your PDF
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Progress</CardTitle>
            <CardDescription>
              {file?.name || 'Processing your file...'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600 dark:text-secondary-400">
                  Progress
                </span>
                <span className="font-medium text-secondary-900 dark:text-white">
                  {progress}%
                </span>
              </div>
              <ProgressBar value={progress} />
            </div>

            {/* Status Message */}
            <motion.div
              key={status}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 p-4 bg-secondary-50 dark:bg-secondary-800 rounded-xl"
            >
              {getStatusIcon()}
              <div>
                <p className="font-medium text-secondary-900 dark:text-white">
                  {getStatusMessage()}
                </p>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  This usually takes 30-60 seconds
                </p>
              </div>
            </motion.div>

            {/* Processing Steps */}
            <div className="space-y-3">
              <h4 className="font-medium text-secondary-900 dark:text-white">
                Processing Steps:
              </h4>
              <div className="space-y-2">
                {[
                  { step: 'File Upload', completed: progress >= 25 },
                  { step: 'PDF Analysis', completed: progress >= 50 },
                  { step: 'Content Extraction', completed: progress >= 75 },
                  { step: 'PowerPoint Generation', completed: progress >= 100 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      item.completed 
                        ? 'bg-success-500' 
                        : 'bg-secondary-300 dark:bg-secondary-600'
                    }`} />
                    <span className={`text-sm ${
                      item.completed 
                        ? 'text-success-600 dark:text-success-400' 
                        : 'text-secondary-600 dark:text-secondary-400'
                    }`}>
                      {item.step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {status === 'error' && (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => navigate('/upload')}
                >
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default ProgressPage