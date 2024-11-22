// Query parameters
// Not all of the properties of a listing are returned by default. You can use the following optional query parameters to include additional properties in the response.

// Prop	Type	Default
// _seller

// boolean
// false
// _bids

// boolean
// false

// Filtering
// You can filter for active listings by using the _active query flag.

// You can filter based on an entry in the tags array by using the _tag query flag. You may only filter by one tag at a time.

// Prop	Type	Default
// _tag

// string
// -
// _active

// boolean
// -

import { API_READ_LISTINGS } from '../../utilities/constants';
console.log(API_READ_LISTINGS);

export async function testReadListings() {
  //   console.log(API_READ_LISTINGS);
  //   console.log('I am the testReadListings function');
  //   await readListings();
  console.log('I run the readListings function');
  await readListings();
}

export async function readListings() {
  try {
    // const response = await fetch(API_READ_LISTINGS);
    const response = await fetch(`${API_READ_LISTINGS}?_seller=true&_bids=true`);
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
