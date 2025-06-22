import { motion } from 'framer-motion'
import { Brain, Zap, Eye, Cpu } from 'lucide-react'

const AIBrainAnimation = () => {
  return (
    <div className="relative w-24 h-24 mx-auto mb-6">
      {/* Main Brain Icon */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Brain className="h-16 w-16 text-primary-600" />
      </motion.div>

      {/* Orbiting Icons */}
      {[
        { icon: Zap, delay: 0, radius: 40 },
        { icon: Eye, delay: 0.5, radius: 35 },
        { icon: Cpu, delay: 1, radius: 45 },
      ].map(({ icon: Icon, delay, radius }, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: delay
          }}
        >
          <motion.div
            className="absolute"
            style={{
              transform: `translateX(${radius}px)`
            }}
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay
            }}
          >
            <Icon className="h-4 w-4 text-accent-500" />
          </motion.div>
        </motion.div>
      ))}

      {/* Pulsing Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary-500/20"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.1, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

export default AIBrainAnimation