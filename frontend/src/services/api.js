// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

// Utility function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Request failed:', error)
    throw error
  }
}

// Upload PDF file
export const uploadFile = async (file) => {
  // Simulate API call for now
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUploadId = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      resolve(mockUploadId)
    }, 2000)
  })

  /* Real implementation would be:
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Upload failed')
  }

  const result = await response.json()
  return result.uploadId
  */
}

// Check conversion status
export const checkConversionStatus = async (uploadId) => {
  // Simulate API call for now
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate different statuses
      const statuses = ['processing', 'processing', 'processing', 'completed']
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
      
      resolve({
        uploadId,
        status: randomStatus,
        progress: randomStatus === 'completed' ? 100 : Math.floor(Math.random() * 80) + 10,
        downloadUrl: randomStatus === 'completed' 
          ? `${API_BASE_URL}/download/${uploadId}` 
          : null,
      })
    }, 1000)
  })

  /* Real implementation would be:
  return apiRequest(`/status/${uploadId}`)
  */
}

// Get conversion result
export const getConversionResult = async (uploadId) => {
  // Simulate API call for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        uploadId,
        downloadUrl: `${API_BASE_URL}/download/${uploadId}`,
        filename: 'converted-presentation.pptx',
        fileSize: 2048576, // 2MB
      })
    }, 500)
  })

  /* Real implementation would be:
  return apiRequest(`/result/${uploadId}`)
  */
}

// Download converted file
export const downloadFile = async (uploadId) => {
  // In a real implementation, this would handle the file download
  const downloadUrl = `${API_BASE_URL}/download/${uploadId}`
  window.open(downloadUrl, '_blank')
}

// Health check endpoint
export const healthCheck = async () => {
  try {
    return await apiRequest('/health')
  } catch (error) {
    return { status: 'error', message: 'API unavailable' }
  }
}

export default {
  uploadFile,
  checkConversionStatus,
  getConversionResult,
  downloadFile,
  healthCheck,
}