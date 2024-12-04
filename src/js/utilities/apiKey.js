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
      // console.dir(data, { depth: null });
      // console.log(apiKey);
      localStorage.setItem('API_KEY1', apiKey1);
      return apiKey;
    }
  } catch (error) {
    console.error('Error fetching API key:', error);
    return null;
  }
}
