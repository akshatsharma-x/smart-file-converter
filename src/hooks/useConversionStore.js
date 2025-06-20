import { create } from 'zustand'

export const useConversionStore = create((set) => ({
  // File state
  file: null,
  uploadId: null,
  progress: 0,
  status: 'idle', // idle, uploading, processing, completed, error
  resultUrl: null,

  // Actions
  setFile: (file) => set({ file }),
  setUploadId: (uploadId) => set({ uploadId }),
  setProgress: (progress) => set({ progress }),
  setStatus: (status) => set({ status }),
  setResultUrl: (resultUrl) => set({ resultUrl }),
  
  // Reset all state
  reset: () => set({
    file: null,
    uploadId: null,
    progress: 0,
    status: 'idle',
    resultUrl: null,
  }),
}))