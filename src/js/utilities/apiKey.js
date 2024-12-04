import { returnToken } from './returnToken';
import { API_AUTH_KEY } from './constants';

// import 'dotenv/config';
// import * as dotenv from 'dotenv';
// dotenv.config();
// const currentUser = localStorage.getItem('currentUser');
// const userObject = JSON.parse(userCredentialsTest);
// const userCredentials = {
//   email: userObject.email,
//   password: userObject.password,
// };

export async function getApiKey(userCredentials) {
  // const envApiKey = import.meta.env.import.meta.env.VITE_API_KEY;
  // if (envApiKey) return envApiKey;
  // const localApiKey = localStorage.getItem('API_KEY');
  // if (localApiKey) return localApiKey;

  try {
    const token = await returnToken();
    const response = await fetch(API_AUTH_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userCredentials }),
      //
    });

    if (response.ok) {
      const data = await response.json();
      const apiKey = data.data.key;
      localStorage.setItem('API_KEY', apiKey);
      import.meta.env.VITE_RUNTIME_API_KEY = apiKey;
      return apiKey;
    }
  } catch (error) {
    console.error('Error fetching API key:', error);
    return null;
  }
}
