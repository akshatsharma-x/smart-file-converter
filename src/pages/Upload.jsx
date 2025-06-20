import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card'
import Button from '../components/Button'
import FileDropzone from '../components/FileDropzone'
import { useConversionStore } from '../hooks/useConversionStore'
import { useUpload } from '../hooks/useUpload'

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const navigate = useNavigate()
  const { setFile, setUploadId } = useConversionStore()
  const { uploadFile, isUploading } = useUpload()

  const handleFileSelect = (file) => {
    setSelectedFile(file)
    setFile(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    try {
      const uploadId = await uploadFile(selectedFile)
      setUploadId(uploadId)
      navigate('/progress')
    } catch (error) {
      console.error('Upload failed:', error)
      // Handle error (show toast, etc.)
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
            <FileText className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            Upload Your PDF
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Select the PDF file you want to convert to PowerPoint
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Choose File</CardTitle>
            <CardDescription>
              Upload a PDF file (max 50MB) to start the conversion process
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <FileDropzone
              onFileSelect={handleFileSelect}
              accept=".pdf"
              className="mb-6"
            />
            
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                <div className="bg-secondary-50 dark:bg-secondary-800 rounded-xl p-4">
                  <h4 className="font-medium text-secondary-900 dark:text-white mb-2">
                    Conversion Settings
                  </h4>
                  <div className="space-y-2 text-sm text-secondary-600 dark:text-secondary-400">
                    <div className="flex justify-between">
                      <span>Output format:</span>
                      <span className="font-medium">PowerPoint (.pptx)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality:</span>
                      <span className="font-medium">High</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Preserve formatting:</span>
                      <span className="font-medium">Yes</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile}
              loading={isUploading}
              className="group"
            >
              {isUploading ? 'Uploading...' : 'Start Conversion'}
              {!isUploading && (
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default Upload