// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://smart-file-converter.onrender.com/api";

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
  const response = await fetch(`${API_BASE_URL}/status/${uploadId}`);
  if (!response.ok) {
    throw new Error("Failed to check status");
  }
  return await response.json();
};

// Get conversion result
export const getConversionResult = async (uploadId) => {
  const response = await fetch(`${API_BASE_URL}/result/${uploadId}`);
  if (!response.ok) {
    throw new Error("Failed to get result");
  }
  return await response.json();
};

// Download converted file
export const downloadFile = async (uploadId) => {
  try {
    const statusResp = await checkConversionStatus(uploadId);
    if (statusResp.status === "completed") {
      const downloadUrl = `${API_BASE_URL}/download/${uploadId}`;
      const response = await fetch(downloadUrl, {
        method: "GET",
      });
      if (!response.ok) {
        alert("Failed to download file.");
        return;
      }
      const blob = await response.blob();
      let filename = "converted-presentation.pptx";
      const disposition = response.headers.get("Content-Disposition");
      if (disposition && disposition.indexOf("filename=") !== -1) {
        filename = disposition
          .split("filename=")[1]
          .replace(/['"]/g, "")
          .trim();
      }
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } else {
      alert(
        "File is not ready for download yet. Please wait until conversion is complete."
      );
    }
  } catch (err) {
    alert("An error occurred while downloading the file.");
    console.error(err);
  }
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
