// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// Utility function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Request failed:", error);
    throw error;
  }
};

// Upload PDF file
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const result = await response.json();
  return result.uploadId;
};

// Check conversion status
export const checkConversionStatus = async (uploadId) => {
  return apiRequest(`/status/${uploadId}`);
};

// Get conversion result
export const getConversionResult = async (uploadId) => {
  return apiRequest(`/result/${uploadId}`);
};

// Download converted file
export const downloadFile = async (uploadId) => {
  const downloadUrl = `${API_BASE_URL}/download/${uploadId}`;
  window.open(downloadUrl, "_blank");
};

// Health check endpoint
export const healthCheck = async () => {
  try {
    return await apiRequest("/health");
  } catch (error) {
    return { status: "error", message: "API unavailable" };
  }
};

export default {
  uploadFile,
  checkConversionStatus,
  getConversionResult,
  downloadFile,
  healthCheck,
};
