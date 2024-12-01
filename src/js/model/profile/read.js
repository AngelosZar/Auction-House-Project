import { API_READ_PROFILES } from '../../utilities/constants';
// import { headers } from '../../utilities/headers';
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
    const { data } = await response.json();
    data.forEach((user) => {
      let name, email, credits, listings, wins, avatarUrl, avatarAlt, bannerUrl, bannerAlt, bio;
      console.log(user);
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
    });
    if (!response.ok) {
      throw new Error(userData.errors?.[0]?.message || 'Failed to fetch profiles');
    }
    // console.log('userdata', userData);
    // console.log(Promise.resolve(userData));
    // console.log('data', data);
    return data;
  } catch (error) {
    throw new Error(error);
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
    // console.log(userData);
    // console.log(Promise.resolve(userData));
    return userData;
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

    // console.log(data);
    // console.log(response);
    // console.log(Promise.resolve(data));
    return data;
  } catch (error) {
    throw new Error(error);
  }
  // status  200 but no listings found.
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
    // console.log('route: model/profile/read.js');
    // console.log(data);
    // console.log(response);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function readProfileWins(username, limit = 12, offset = 1) {
  const accessToken = returnToken();
  const page = Math.floor(offset / limit + 1);
  try {
    // GET /auction/profiles/<name>/wins
    // check the url and the query parameters if they are correct
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
    // console.log('route: model/profile/read.js');
    // console.log(data);
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// readProfileListings('kimYong');
readProfileBids('kimYong');
// readProfileWins('kimYong', 12, 1);
