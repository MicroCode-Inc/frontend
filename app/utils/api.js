/**
 * API utility for making authenticated requests to the backend.
 * Centralizes API URL configuration and Authorization header management.
 */

// Get API base URL from environment variable or default to localhost
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

/**
 * Get the authentication token from localStorage
 * @returns {string|null} JWT token or null if not authenticated
 */
export function getAuthToken() {
  // Check if we're in the browser (not SSR)
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error reading token from localStorage:", error);
    return null;
  }
}

/**
 * Build headers for API requests, including Authorization if token exists
 * @param {HeadersInit} additionalHeaders - Additional headers to include
 * @returns {Headers} Headers object with Authorization and content-type
 */
export function buildHeaders(additionalHeaders = {}) {
  const headers = new Headers(additionalHeaders);

  // Add Authorization header if token exists
  const token = getAuthToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Set Content-Type for JSON requests if not already set
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return headers;
}

/**
 * Make an authenticated API request
 * @param {string} endpoint - API endpoint (e.g., "/users/1")
 * @param {RequestInit} options - Fetch options (method, body, etc.)
 * @returns {Promise<Response>} Fetch promise
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  // Build headers with auth token
  const headers = buildHeaders(options.headers);

  // Make the request
  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
}

/**
 * Make an authenticated API request and parse JSON response
 * @param {string} endpoint - API endpoint
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<any>} Parsed JSON response
 * @throws {Error} If response is not ok
 */
export async function apiRequestJSON(endpoint, options = {}) {
  const response = await apiRequest(endpoint, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      error: response.statusText,
    }));
    throw new Error(errorData.error || `Request failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Upload a file with authentication
 * @param {string} endpoint - API endpoint
 * @param {FormData} formData - FormData containing the file
 * @returns {Promise<any>} Parsed JSON response
 */
export async function apiUpload(endpoint, formData) {
  const token = getAuthToken();
  const headers = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Don't set Content-Type for FormData - browser will set it with boundary
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      error: response.statusText,
    }));
    throw new Error(errorData.error || `Upload failed: ${response.status}`);
  }

  return response.json();
}
