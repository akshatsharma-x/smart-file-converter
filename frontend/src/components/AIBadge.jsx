import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import * as Tooltip from '@radix-ui/react-tooltip'

const AIBadge = ({ className = '' }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className={`ai-badge ${className}`}
          >
            <Sparkles className="h-3 w-3" />
            <span>AI-powered</span>
          </motion.div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-secondary-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg z-50"
            sideOffset={5}
          >
            Uses advanced OCR + layout AI
            <Tooltip.Arrow className="fill-secondary-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default AIBadge