import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, X } from 'lucide-react'
import Button from './Button'
import { cn } from '../utils/cn'

const FileDropzone = ({ onFileSelect, accept = '.pdf', className }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const validFile = files.find(file => file.type === 'application/pdf')
    
    if (validFile) {
      setSelectedFile(validFile)
      onFileSelect?.(validFile)
    }
  }, [onFileSelect])

  const handleFileInput = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      onFileSelect?.(file)
    }
  }, [onFileSelect])

  const removeFile = useCallback(() => {
    setSelectedFile(null)
    onFileSelect?.(null)
  }, [onFileSelect])

  return (
    <div className={cn('w-full', className)}>
      {!selectedFile ? (
        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors',
            isDragOver
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
              : 'border-secondary-300 dark:border-secondary-600 hover:border-primary-400'
          )}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-primary-100 dark:bg-primary-900 rounded-full">
              <Upload className="h-8 w-8 text-primary-600" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                Drop your PDF here
              </h3>
              <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                or click to browse files
              </p>
            </div>
            
            <Button variant="outline" size="sm">
              Browse Files
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-between p-4 bg-success-50 dark:bg-success-950 border border-success-200 dark:border-success-800 rounded-2xl"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success-100 dark:bg-success-900 rounded-lg">
              <FileText className="h-5 w-5 text-success-600" />
            </div>
            <div>
              <p className="font-medium text-success-900 dark:text-success-100">
                {selectedFile.name}
              </p>
              <p className="text-sm text-success-600 dark:text-success-400">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={removeFile}
            className="text-error-600 hover:text-error-700 hover:bg-error-50"
          >
            <X className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}

export default FileDropzone