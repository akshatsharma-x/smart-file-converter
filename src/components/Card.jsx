import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

const Card = ({ children, className, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('card p-6', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

const CardHeader = ({ children, className, ...props }) => {
  return (
    <div className={cn('flex flex-col space-y-1.5 pb-6', className)} {...props}>
      {children}
    </div>
  )
}

const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props}>
      {children}
    </h3>
  )
}

const CardDescription = ({ children, className, ...props }) => {
  return (
    <p className={cn('text-sm text-secondary-600 dark:text-secondary-400', className)} {...props}>
      {children}
    </p>
  )
}

const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={cn('pt-0', className)} {...props}>
      {children}
    </div>
  )
}

const CardFooter = ({ children, className, ...props }) => {
  return (
    <div className={cn('flex items-center pt-6', className)} {...props}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }