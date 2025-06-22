import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card'
import ProgressBar from '../components/Progress'
import Button from '../components/Button'
import StepIndicator from '../components/StepIndicator'
import AIBrainAnimation from '../components/AIBrainAnimation'
import SlidePreview from '../components/SlidePreview'
import { useConversionStore } from '../hooks/useConversionStore'
import { useConvert } from '../hooks/useConvert'

const ProcessingPage = () => {
  const navigate = useNavigate()
  const { file, uploadId, progress, status, setResultUrl } = useConversionStore()
  const { checkStatus, isChecking } = useConvert()
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0)

  const statusMessages = [
    'Analyzing page layout with AI...',
    'Extracting text with advanced OCR...',
    'Understanding document structure...',
    'Constructing PowerPoint slides...',
    'Applying intelligent formatting...',
    'Finalizing your presentation...'
  ]

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
          toast.success('AI conversion completed successfully!')
          navigate('/download')
        } else if (result.status === 'error') {
          toast.error('AI conversion failed. Please try again.')
        }
      } catch (error) {
        console.error('Status check failed:', error)
        toast.error('Connection error. Retrying...')
      }
    }

    // Update status message based on progress
    const messageIndex = Math.min(
      Math.floor((progress / 100) * statusMessages.length),
      statusMessages.length - 1
    )
    setCurrentStatusIndex(messageIndex)

    // Poll every 2 seconds
    const interval = setInterval(pollStatus, 2000)
    
    // Initial check
    pollStatus()

    return () => clearInterval(interval)
  }, [uploadId, navigate, checkStatus, setResultUrl, progress, statusMessages.length])

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-success-600" />
      case 'error':
        return <AlertCircle className="h-6 w-6 text-error-600" />
      default:
        return null
    }
  }

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <StepIndicator currentStep={2} />
        
        <div className="text-center mb-8">
          <AIBrainAnimation />
          <h1 className="text-3xl font-bold font-heading text-secondary-900 dark:text-white mb-2">
            AI is Converting Your File
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Our advanced AI is analyzing and converting your PDF
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Processing Card */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {getStatusIcon()}
                  <span>AI Conversion Progress</span>
                </CardTitle>
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

                {/* Current Status */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStatusIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-3 p-4 bg-primary-50 dark:bg-primary-950 rounded-xl border border-primary-200 dark:border-primary-800"
                  >
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
                    <div>
                      <p className="font-medium text-primary-900 dark:text-primary-100">
                        {statusMessages[currentStatusIndex]}
                      </p>
                      <p className="text-sm text-primary-600 dark:text-primary-400">
                        This usually takes 30-90 seconds
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Processing Steps */}
                <div className="space-y-3">
                  <h4 className="font-medium text-secondary-900 dark:text-white">
                    AI Processing Pipeline:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { step: 'Document Upload', completed: progress >= 15 },
                      { step: 'AI Layout Analysis', completed: progress >= 30 },
                      { step: 'OCR Text Extraction', completed: progress >= 50 },
                      { step: 'Content Understanding', completed: progress >= 70 },
                      { step: 'Slide Generation', completed: progress >= 85 },
                      { step: 'Format Optimization', completed: progress >= 100 },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          item.completed 
                            ? 'bg-success-500' 
                            : 'bg-secondary-300 dark:bg-secondary-600'
                        }`} />
                        <span className={`text-sm transition-colors duration-300 ${
                          item.completed 
                            ? 'text-success-600 dark:text-success-400 font-medium' 
                            : 'text-secondary-600 dark:text-secondary-400'
                        }`}>
                          {item.step}
                        </span>
                      </motion.div>
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
          </div>

          {/* Slide Preview Sidebar */}
          <div className="lg:col-span-1">
            <SlidePreview />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProcessingPage