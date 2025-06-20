import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, FileText, Zap, Shield, Download } from 'lucide-react'
import { Card, CardContent } from '../components/Card'
import Button from '../components/Button'

const Home = () => {
  const features = [
    {
      icon: FileText,
      title: 'PDF to PowerPoint',
      description: 'Convert your PDF documents to editable PowerPoint presentations with ease.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Our advanced conversion engine processes your files in seconds, not minutes.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your files are processed securely and deleted automatically after conversion.',
    },
    {
      icon: Download,
      title: 'High Quality Output',
      description: 'Maintain the original formatting and quality of your documents.',
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
        <h1 className="text-5xl md:text-6xl font-bold text-secondary-900 dark:text-white mb-6">
          Convert PDF to{' '}
          <span className="text-primary-600">PowerPoint</span>
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-8 leading-relaxed">
          Transform your PDF documents into editable PowerPoint presentations with our 
          powerful conversion tool. Fast, secure, and incredibly easy to use.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/upload">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            Learn More
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
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl mb-4">
                <feature.icon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-primary-600 to-accent-600 text-white border-0">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">
              Ready to convert your first PDF?
            </h2>
            <p className="text-primary-100 mb-8 text-lg">
              Join thousands of users who trust our conversion service daily.
            </p>
            <Link to="/upload">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-primary-600 hover:bg-primary-50"
              >
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