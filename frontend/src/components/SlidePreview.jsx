import { motion } from 'framer-motion'
import { FileText, Image, BarChart3, PieChart } from 'lucide-react'

const SlidePreview = ({ slides = [] }) => {
  const mockSlides = slides.length > 0 ? slides : [
    { id: 1, type: 'title', title: 'Introduction', icon: FileText },
    { id: 2, type: 'content', title: 'Key Points', icon: FileText },
    { id: 3, type: 'image', title: 'Visual Content', icon: Image },
    { id: 4, type: 'chart', title: 'Data Analysis', icon: BarChart3 },
    { id: 5, type: 'summary', title: 'Summary', icon: PieChart },
  ]

  return (
    <div className="w-64 bg-white dark:bg-secondary-800 border-l border-secondary-200 dark:border-secondary-700 p-4">
      <h3 className="text-sm font-medium text-secondary-900 dark:text-white mb-4">
        Slide Preview
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
        {mockSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-3 p-3 bg-secondary-50 dark:bg-secondary-700 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-600 transition-colors cursor-pointer"
          >
            <div className="flex-shrink-0">
              <div className="w-8 h-6 bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-600 rounded flex items-center justify-center">
                <slide.icon className="h-3 w-3 text-secondary-500" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-secondary-900 dark:text-white truncate">
                {slide.title}
              </p>
              <p className="text-xs text-secondary-500 dark:text-secondary-400">
                Slide {index + 1}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SlidePreview