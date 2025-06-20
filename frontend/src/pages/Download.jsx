import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download as DownloadIcon, FileText, CheckCircle, RotateCcw } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card'
import Button from '../components/Button'
import { useConversionStore } from '../hooks/useConversionStore'

const Download = () => {
  const { file, resultUrl, reset } = useConversionStore()

  const handleDownload = () => {
    if (resultUrl) {
      // In a real app, this would trigger the download
      window.open(resultUrl, '_blank')
    }
  }

  const handleNewConversion = () => {
    reset()
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success-100 dark:bg-success-900 rounded-2xl mb-4">
            <CheckCircle className="h-8 w-8 text-success-600" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            Conversion Complete!
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Your PowerPoint presentation is ready for download
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Download Your File</CardTitle>
            <CardDescription>
              Your PDF has been successfully converted to PowerPoint format
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* File Info */}
            <div className="flex items-center space-x-4 p-4 bg-success-50 dark:bg-success-950 border border-success-200 dark:border-success-800 rounded-xl">
              <div className="p-3 bg-success-100 dark:bg-success-900 rounded-lg">
                <FileText className="h-6 w-6 text-success-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-success-900 dark:text-success-100">
                  {file?.name?.replace('.pdf', '.pptx') || 'converted-presentation.pptx'}
                </h4>
                <p className="text-sm text-success-600 dark:text-success-400">
                  PowerPoint Presentation • Ready to download
                </p>
              </div>
            </div>

            {/* Preview Card */}
            <div className="border-2 border-dashed border-secondary-300 dark:border-secondary-600 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl mb-4">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <h4 className="font-medium text-secondary-900 dark:text-white mb-2">
                PowerPoint Preview
              </h4>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Your converted presentation maintains the original formatting and layout
              </p>
            </div>

            {/* Conversion Summary */}
            <div className="bg-secondary-50 dark:bg-secondary-800 rounded-xl p-4">
              <h4 className="font-medium text-secondary-900 dark:text-white mb-3">
                Conversion Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-400">Original format:</span>
                  <span className="font-medium text-secondary-900 dark:text-white">PDF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-400">Output format:</span>
                  <span className="font-medium text-secondary-900 dark:text-white">PowerPoint (.pptx)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-400">Processing time:</span>
                  <span className="font-medium text-secondary-900 dark:text-white">45 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-400">Status:</span>
                  <span className="font-medium text-success-600">Completed</span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleDownload}
              className="flex-1 group"
              size="lg"
            >
              <DownloadIcon className="mr-2 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
              Download PowerPoint
            </Button>
            <div className="flex gap-3 flex-1 sm:flex-initial">
              <Link to="/upload" className="flex-1 sm:flex-initial">
                <Button
                  variant="outline"
                  onClick={handleNewConversion}
                  className="w-full"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Convert Another
                </Button>
              </Link>
              <Link to="/" className="flex-1 sm:flex-initial">
                <Button variant="secondary" className="w-full">
                  Home
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default Download