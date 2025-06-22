import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, FileText, Zap, Shield, Download, Brain, Sparkles } from 'lucide-react'
import { Card, CardContent } from '../components/Card'
import Button from '../components/Button'
import AIBadge from '../components/AIBadge'

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Conversion',
      description: 'Advanced machine learning algorithms analyze and convert your PDFs with intelligent layout recognition.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Our optimized AI engine processes your files in seconds, delivering results faster than ever.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Enterprise-grade security ensures your files are processed safely and deleted automatically.',
    },
    {
      icon: Download,
      title: 'Perfect Quality',
      description: 'Maintain original formatting, fonts, and layouts with our advanced AI reconstruction technology.',
    },
  ]

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-secondary-900 dark:text-white">
            Convert PDF to{' '}
            <span className="text-primary-600">PowerPoint</span>
          </h1>
          <AIBadge className="ml-4" />
        </div>
        
        <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-8 leading-relaxed">
          Transform your PDF documents into editable PowerPoint presentations using our 
          cutting-edge AI technology. Experience the future of document conversion.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/upload">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="group">
            <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            See AI in Action
          </Button>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <Card className="text-center h-full">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold font-heading text-secondary-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* AI Showcase Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <Card className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 border-primary-200 dark:border-primary-800">
          <CardContent className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-6">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold font-heading text-secondary-900 dark:text-white mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-8 max-w-2xl mx-auto">
              Our proprietary AI engine combines OCR, layout analysis, and content understanding 
              to deliver the most accurate PDF to PowerPoint conversions available.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { title: 'OCR Technology', desc: 'Extract text with 99.9% accuracy' },
                { title: 'Layout AI', desc: 'Preserve complex formatting' },
                { title: 'Smart Reconstruction', desc: 'Rebuild slides intelligently' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-2 h-2 bg-accent-500 rounded-full mx-auto mb-2"></div>
                  <h4 className="font-semibold text-secondary-900 dark:text-white text-sm">
                    {item.title}
                  </h4>
                  <p className="text-xs text-secondary-600 dark:text-secondary-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-primary-600 to-accent-600 text-white border-0">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold font-heading mb-4">
              Ready to experience AI-powered conversion?
            </h2>
            <p className="text-primary-100 mb-8 text-lg">
              Join thousands of professionals who trust our AI technology daily.
            </p>
            <Link to="/upload">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-primary-600 hover:bg-primary-50 shadow-xl"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Converting Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Home