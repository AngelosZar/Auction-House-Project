import { API_SEARCH_LISTINGS, API_SEARCH_PROFILES, API_KEY } from '../../utilities/constants';
import { returnToken } from '../../utilities/returnToken';
export async function searchListings(query) {
  // Search for listings by their title or description properties.
  const accessToken = returnToken();
  try {
    const response = await fetch(`${API_SEARCH_LISTINGS}${query}`, {
      method: 'GET',
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
  const accessToken = returnToken();
  const API_KEY = localStorage.getItem('apiKey');
  console.log(accessToken, API_KEY);
  try {
    const response = await fetch(`${API_SEARCH_PROFILES}${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': `${API_KEY}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(data.errors[0].message);
    }
    console.log('route: model.listings.search.js');
    console.log(response);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
