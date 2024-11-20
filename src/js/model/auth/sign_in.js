import { API_AUTH_LOGIN } from '../../utilities/constants';
/**
 *
 * @param {object} data -user email and password
 * @returns  - user data and access token
 */
export const signInApiCall = async (data) => {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      alert(result.errors[0].message);
      return { result, Error };
    }
    console.log(result);
    const {
      data: {
        name,
        email,
        accessToken,
        avatar: { url: avatarUrl, alt: avatarAlt },
        banner: { url: bannerUrl, alt: bannerAlt },
      },
    } = await result;
    //
    const currentUser = {
      name,
      email,
      accessToken,
      avatar: { url: avatarUrl, alt: avatarAlt },
      banner: { url: bannerUrl, alt: bannerAlt },
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    return result;
  } catch (error) {
    return error;
  }
};
