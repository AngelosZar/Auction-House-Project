import { API_READ_LISTINGS } from '../../utilities/constants';
import { API_KEY } from '../../utilities/constants';
import { returnToken } from '../../utilities/returnToken';

export async function readListings(limit = 12, offset = 1, active = true) {
  const page = Math.floor(offset / limit + 1);
  try {
    // const response = await fetch(`${API_READ_LISTINGS}?_seller=true&_bids=true`);
    const response = await fetch(
      `${API_READ_LISTINGS}?limit=${limit}&page=${+page}&_seller=true&_bids=true&_active=${active}`
    );
    const results = await response.json();
    // console.log(results.data);
    if (!response.ok) {
      throw new Error(results.errors?.[0]?.message || 'Failed to fetch listings');
    }
    return results;
  } catch (error) {
    // console.log(error);
    throw error;
  }
}

export async function readListing(id) {
  console.log(API_READ_LISTINGS);
  const accessToken = returnToken();
  try {
    const response = await fetch(`${API_READ_LISTINGS}/${id}?_seller=true&_bids=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });
    if (!response.ok) {
      // throw new Error(singleListing.errors?.[0]?.message || 'Failed to fetch listing');
      throw new Error('Failed to fetch listing');
      // console.log('Failed to fetch listing');
    }
    const { data: singleListing } = await response.json();
    // console.log('singleListing');
    return singleListing;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch listing');
  }
}
