// web/src/apiClient.js (or similar)
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'; // Fallback for non-Docker local dev

export async function fetchData(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}
