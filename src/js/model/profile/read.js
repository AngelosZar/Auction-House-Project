import { data } from 'autoprefixer';
import { API_READ_PROFILES } from '../../utilities/constants';
// import { headers } from '../../utilities/headers';
import { API_KEY } from '../../utilities/constants';

export async function readProfiles(limit = 12, page = 1, query = '_wins') {
  const offset = (page - 1) * limit;
  const { accessToken } = JSON.parse(localStorage.getItem('currentUser'));
  try {
    const response = await fetch(`${API_READ_PROFILES}/?limit=${limit}&offset=${offset}${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });
    const userData = await response.json();
    if (!response.ok) {
      throw new Error(userData.errors?.[0]?.message || 'Failed to fetch profiles');
    }
    // console.log('userdata', userData);
    // console.log(Promise.resolve(userData));
    return userData;
  } catch (error) {
    console.error(error);
  }
}

export async function readProfile(username, query = '') {
  const { accessToken } = JSON.parse(localStorage.getItem('currentUser'));

  try {
    const response = await fetch(`${API_READ_PROFILES}/${username}${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });
    // const userData = await response.json();
    let name, email, credits, listings, wins, avatarUrl, avatarAlt, bannerUrl, bannerAlt, bio;

    ({
      data: {
        name,
        email,
        credits,
        _count: { listings, wins },
        avatar: { url: avatarUrl, alt: avatarAlt },
        banner: { url: bannerUrl, alt: bannerAlt },
        bio,
      },
    } = await response.json());

    const userData = {
      data: {
        name,
        email,
        credits,
        _count: { listings, wins },
        avatar: { url: avatarUrl, alt: avatarAlt },
        banner: { url: bannerUrl, alt: bannerAlt },
        bio,
      },
    };
    if (!response.ok) {
      throw new Error(userData.errors?.[0]?.message || 'Failed to fetch profile');
    }
    console.log(userData);
    // console.log(Promise.resolve(userData));
    return userData;
  } catch (error) {
    console.error(error);
  }
}
