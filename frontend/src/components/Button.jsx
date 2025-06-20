import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'default',
  disabled = false,
  loading = false,
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
  }

  const sizes = {
    sm: 'h-9 px-3 text-xs',
    default: 'h-10 px-4 py-2',
    lg: 'h-11 px-8',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </motion.button>
  )
}

export default Button