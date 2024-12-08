import { API_READ_LISTINGS } from '../../utilities/constants';
import { returnToken } from '../../utilities/returnToken';
import { API_KEY } from '../../utilities/constants';

export const updateListing = async function (testData, id) {
  const accessToken = returnToken();
  try {
    const response = await fetch(`${API_READ_LISTINGS}/${id}`, {
      method: 'PUT',
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
    }
    return data;
  } catch (error) {
    throw error;
  }
};
