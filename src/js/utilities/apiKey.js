import { returnToken } from './returnToken';
import { API_AUTH_KEY } from './constants';

// import 'dotenv/config';
// import * as dotenv from 'dotenv';
// dotenv.config();

export async function getApiKey() {
  try {
    const token = await returnToken();
    //
    const userCredentials = {
      email: '    testUser91',
      password: '  /.,Qwerty123',
    };
    // userinput from log in function
    const response = await fetch(API_AUTH_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userCredentials),
      //
    });
    console.log(response);

    if (response.ok) {
      const { apiKey } = await response.json();
      localStorage.setItem('API_KEY', apiKey);
      import.meta.env.VITE_API_KEY = apiKey;
      //   cannot save to .env file
      return apiKey;
    }
  } catch (error) {
    console.error('Error fetching API key:', error);
    return null;
  }
}
