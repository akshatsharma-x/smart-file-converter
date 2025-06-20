import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Progress from './pages/Progress'
import Download from './pages/Download'
import { ThemeProvider } from './hooks/useTheme'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Layout>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/download" element={<Download />} />
            </Routes>
          </motion.div>
        </Layout>
      </div>
    </ThemeProvider>
  )
}

export default App