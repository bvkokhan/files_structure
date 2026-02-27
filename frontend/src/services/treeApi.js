const API_URL = 'http://localhost:3001/root';

export async function fetchTree() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}
