import { API_READ_LISTINGS } from '../../utilities/constants';

export async function testReadListings() {
  console.log('I run the readListings function');
}

export async function readListings(limit = 12, offset = 1, active = true) {
  const page = Math.floor(offset / limit + 1);
  try {
    // const response = await fetch(`${API_READ_LISTINGS}?_seller=true&_bids=true`);
    const response = await fetch(
      `${API_READ_LISTINGS}?limit=${limit}&page=${+page}&_seller=true&_bids=true&_active=${active}`
    );
    const results = await response.json();
    console.log(results.data);
    if (!response.ok) {
      throw new Error(results.errors?.[0]?.message || 'Failed to fetch listings');
    }
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function readListing(id) {
  try {
    const response = await fetch(`${API_READ_LISTINGS}/${id}?_seller=true&_bids=true`);
    const singleListing = await response.json();
    console.log('singleListing');
    console.log(singleListing);
    if (!response.ok) {
      throw new Error(singleListing.errors?.[0]?.message || 'Failed to fetch listing');
    }
    return singleListing;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// await readListing('ff98e567-ebe0-41bc-889b-2533a5860014');
