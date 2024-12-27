import { API_READ_PROFILES } from '../../utilities/constants';
import { API_KEY } from '../../utilities/constants';
import { returnToken } from '../../utilities/returnToken';

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
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.errors?.[0]?.message || 'Failed to fetch profiles');
    }
    const { data } = result;
    const userData = data.map((user) => ({
      name: user.name || '',
      email: user.email || '',
      credits: user.credits || 0,
      _count: {
        listings: user._count?.listings || 0,
        wins: user._count?.wins || 0,
      },
      avatar: {
        url: user.avatar?.url || '',
        alt: user.avatar?.alt || '',
      },
      banner: {
        url: user.banner?.url || '',
        alt: user.banner?.alt || '',
      },
      bio: user.bio || '',
    }));
    return userData;
  } catch (error) {
    throw new Error(error);
  }
}

export async function readProfile(username, query = '') {
  const { accessToken } = JSON.parse(localStorage.getItem('currentUser'));
  if (!accessToken) return;

  try {
    const response = await fetch(`${API_READ_PROFILES}/${username}${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });
    const userData = await response.json();
    // let name, email, credits, listings, wins, avatarUrl, avatarAlt, bannerUrl, bannerAlt, bio;

    const {
      data: {
        name,
        email,
        credits,
        _count: { listings, wins },
        avatar: { url: avatarUrl, alt: avatarAlt },
        banner: { url: bannerUrl, alt: bannerAlt },
        bio,
      },
    } = userData;

    if (!response.ok) {
      throw new Error(userData.errors?.[0]?.message || 'Failed to fetch profile');
    }

    return {
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
  } catch (error) {
    throw new Error(error);
  }
}

export async function readProfileListings(
  username,
  limit = 12,
  offset = 1,
  query = '',
  seller = true,
  bids = true,
  active = true
) {
  //GET
  // /auction/profiles/<name>/listings
  // Retrieve all listings created by profile.
  // The response is the same as the listings endpoint, and accepts the same optional query parameters and flags.
  try {
    const accessToken = returnToken();
    const page = Math.floor(offset / limit + 1);
    const response = await fetch(
      `${API_READ_PROFILES}/${username}/listings${query}?limit=${limit}&page=${page}&_seller=${seller}&_bids=${bids}&_active=${active}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': API_KEY,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || 'Failed to fetch profile listings');
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

//

export async function readProfileBids(username, limit = 12, offset = 1) {
  const accessToken = returnToken();
  const page = Math.floor(offset / limit + 1);
  try {
    const response = await fetch(
      `${API_READ_PROFILES}/${username}/bids?limit=${limit}&page=${+page}&_listings=true&_wins=true`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': API_KEY,
        },
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || 'Failed to fetch profile bids');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function readProfileWins(username, limit = 12, offset = 1) {
  const accessToken = returnToken();
  const page = Math.floor(offset / limit + 1);
  try {
    const response = await fetch(
      `${API_READ_PROFILES}/${username}/wins?limit=${limit}&page=${+page}&_seller=true&_bids=true`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': API_KEY,
        },
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || 'Failed to fetch profile wins');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
