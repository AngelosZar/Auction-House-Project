import { API_SEARCH_LISTINGS, API_SEARCH_PROFILES, API_KEY } from '../../utilities/constants';
import { returnToken } from '../../utilities/returnToken';
export async function searchListings(query) {
  // Search for listings by their title or description properties.
  const accessToken = returnToken();
  try {
    const response = await fetch(`${API_SEARCH_LISTINGS}${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'api-key': API_KEY,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(response.errors);
    }
    console.log('route: model.listings.search.js');
    console.log(response);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function searchProfiles(query) {
  //
}
