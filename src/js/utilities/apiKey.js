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

export async function getApiKey() {
  try {
    const token = await returnToken();
    //
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) throw new Error('You are not Logged in\nPlease Log in to get API key');
    //
    const userObject = JSON.parse(currentUser);
    //
    if (!userObject.email || !userObject.password) throw new Error('No user credentials found');
    //
    const userCredentials = {
      email: userObject.email,
      password: userObject.password,
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
      // import.meta.env.VITE_API_KEY = apiKey;
      //   cannot save to .env file
      return apiKey;
    }
  } catch (error) {
    console.error('Error fetching API key:', error);
    return null;
  }
}
