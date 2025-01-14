import { API_READ_LISTINGS } from '../../utilities/constants';
import { returnToken } from '../../utilities/returnToken';
import { API_KEY } from '../../utilities/constants';

export const createListing = async function (testData) {
  const accessToken = returnToken();
  try {
    const response = await fetch(API_READ_LISTINGS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': `${API_KEY}`,
      },
      body: JSON.stringify(testData),
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.errors[0].message);
      throw new Error(data.errors[0].message);
    } else {
      alert('Listing created');
      window.location.href = '/profile/';
    }
    return data;
  } catch (error) {
    throw error;
  }
};
