// Utility function to get the base API URL
// In development, we use localhost:5001
// In production, we need to configure this properly
const getApiBaseUrl = () => {
  // If we're in a browser environment
  if (typeof window !== 'undefined') {
    // For development, use localhost
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:5001';
    }
    
    // For production, you might want to use environment variables
    // or a reverse proxy setup
    return process.env.REACT_APP_API_URL || 'http://localhost:5001';
  }
  
  // For server-side rendering, fallback to localhost
  return 'http://localhost:5001';
};

// Export the base URL
export const API_BASE_URL = getApiBaseUrl();

// Export helper functions for API endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
  LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
  ME: `${API_BASE_URL}/api/v1/auth/me`
};

export const TASK_ENDPOINTS = {
  TASKS: `${API_BASE_URL}/api/v1/tasks`
};