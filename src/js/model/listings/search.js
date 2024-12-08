import { API_SEARCH_LISTINGS, API_SEARCH_PROFILES, API_KEY } from '../../utilities/constants';
import { returnToken } from '../../utilities/returnToken';
export async function searchListings(query) {
  try {
    const response = await fetch(`${API_SEARCH_LISTINGS}${query}`, {
      method: 'GET',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errors[0].message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function searchProfiles(query) {
  const accessToken = returnToken();
  const apiKey = API_KEY || localStorage.getItem('apiKey');
  try {
    const response = await fetch(`${API_SEARCH_PROFILES}${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': `${apiKey}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errors[0].message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}
