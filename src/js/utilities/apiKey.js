import { returnToken } from './returnToken';
import { API_AUTH_KEY } from './constants';

export async function getApiKey(userCredentials) {
  try {
    const token = await returnToken();
    const response = await fetch(API_AUTH_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userCredentials }),
    });

    if (response.ok) {
      const data = await response.json();
      const apiKey = data.data.key;
      localStorage.setItem('API_KEY', apiKey);
      import.meta.env.VITE_RUNTIME_API_KEY = apiKey;
      return apiKey;
    }
  } catch (error) {
    return null;
  }
}
