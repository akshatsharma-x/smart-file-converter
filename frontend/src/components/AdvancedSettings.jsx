import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Settings, Sliders } from 'lucide-react'
import * as Collapsible from '@radix-ui/react-collapsible'
import * as Select from '@radix-ui/react-select'
import * as Slider from '@radix-ui/react-slider'
import { Card, CardContent } from './Card'

const AdvancedSettings = ({ settings, onSettingsChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const presets = [
    { value: 'classic', label: 'Classic' },
    { value: 'modern', label: 'Modern' },
    { value: 'corporate', label: 'Corporate' },
  ]

  return (
    <Card className="overflow-hidden">
      <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
        <Collapsible.Trigger asChild>
          <button className="w-full p-4 flex items-center justify-between text-left hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors">
            <div className="flex items-center space-x-3">
              <Settings className="h-5 w-5 text-primary-600" />
              <span className="font-medium text-secondary-900 dark:text-white">
                Advanced AI Settings
              </span>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-secondary-500" />
            </motion.div>
          </button>
        </Collapsible.Trigger>

        <AnimatePresence>
          {isOpen && (
            <Collapsible.Content forceMount>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <CardContent className="pt-0 space-y-6">
                  {/* Slide Detail Level */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-secondary-900 dark:text-white flex items-center space-x-2">
                        <Sliders className="h-4 w-4" />
                        <span>Slide Detail Level</span>
                      </label>
                      <span className="text-sm text-secondary-600 dark:text-secondary-400">
                        {settings.detailLevel}/10
                      </span>
                    </div>
                    <Slider.Root
                      className="relative flex items-center select-none touch-none w-full h-5"
                      value={[settings.detailLevel]}
                      onValueChange={(value) => onSettingsChange({ ...settings, detailLevel: value[0] })}
                      max={10}
                      min={1}
                      step={1}
                    >
                      <Slider.Track className="bg-secondary-200 dark:bg-secondary-700 relative grow rounded-full h-2">
                        <Slider.Range className="absolute bg-primary-600 rounded-full h-full" />
                      </Slider.Track>
                      <Slider.Thumb
                        className="block w-5 h-5 bg-white border-2 border-primary-600 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all"
                        aria-label="Detail Level"
                      />
                    </Slider.Root>
                    <div className="flex justify-between text-xs text-secondary-500">
                      <span>Minimal</span>
                      <span>Detailed</span>
                    </div>
                  </div>

                  {/* Styling Presets */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-secondary-900 dark:text-white">
                      Styling Presets
                    </label>
                    <Select.Root
                      value={settings.preset}
                      onValueChange={(value) => onSettingsChange({ ...settings, preset: value })}
                    >
                      <Select.Trigger className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-secondary-800 border border-secondary-300 dark:border-secondary-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <Select.Value />
                        <Select.Icon>
                          <ChevronDown className="h-4 w-4" />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg shadow-lg z-50">
                          <Select.Viewport className="p-1">
                            {presets.map((preset) => (
                              <Select.Item
                                key={preset.value}
                                value={preset.value}
                                className="relative flex items-center px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-secondary-100 dark:hover:bg-secondary-700 focus:outline-none focus:bg-secondary-100 dark:focus:bg-secondary-700"
                              >
                                <Select.ItemText>{preset.label}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>
                </CardContent>
              </motion.div>
            </Collapsible.Content>
          )}
        </AnimatePresence>
      </Collapsible.Root>
    </Card>
  )
}

export default AdvancedSettings