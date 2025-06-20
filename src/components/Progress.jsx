import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

const Progress = ({ value = 0, className, ...props }) => {
  return (
    <div
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-secondary-100 dark:bg-secondary-800',
        className
      )}
      {...props}
    >
      <motion.div
        className="h-full bg-primary-600 transition-all"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </div>
  )
}

export default Progress