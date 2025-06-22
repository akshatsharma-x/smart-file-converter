import { motion } from 'framer-motion'
import { Check, Upload, Brain, Download } from 'lucide-react'

const StepIndicator = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, name: 'Upload', icon: Upload },
    { id: 2, name: 'AI Processing', icon: Brain },
    { id: 3, name: 'Download', icon: Download },
  ]

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id
          const isActive = currentStep === step.id
          const isInactive = currentStep < step.id
          
          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`step-indicator ${
                  isCompleted ? 'completed' : isActive ? 'active' : 'inactive'
                }`}
                aria-label={`Step ${step.id}: ${step.name}`}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <step.icon className="h-4 w-4" />
                )}
              </motion.div>

              {/* Step Label */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.1 }}
                className={`ml-2 text-xs font-medium ${
                  isCompleted || isActive
                    ? 'text-secondary-900 dark:text-white'
                    : 'text-secondary-500 dark:text-secondary-400'
                }`}
              >
                {step.name}
              </motion.span>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="h-0.5 bg-secondary-200 dark:bg-secondary-700 relative overflow-hidden">
                    <motion.div
                      className="h-full bg-accent-500"
                      initial={{ width: '0%' }}
                      animate={{ 
                        width: currentStep > step.id ? '100%' : '0%' 
                      }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StepIndicator