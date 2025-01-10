import { API_AUTH_LOGIN } from './constants';
export const config = {
  apiKey: import.meta.env.VITE_API_KEY,
  accessToken: import.meta.env.VITE_ACCESS_TOKEN,
};

export async function loginUserGuestUser(credentials) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.errors?.[0]?.message || 'Login failed');
    }

    const currentUser = {
      name: result.data.name,
      email: result.data.email,
      accessToken: result.data.accessToken,
      avatar: result.data.avatar,
      banner: result.data.banner,
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    return result;
  } catch (error) {
    throw error;
  }
}

export async function signInGuestController() {
  try {
    const guestCredentials = {
      email: import.meta.env.VITE_EMAIL,
      password: import.meta.env.VITE_PASSWORD,
    };

    const loginResult = await loginUserGuestUser(guestCredentials);
    return loginResult;
  } catch (error) {
    console.error('Error in guest login:', error);
  }
}
