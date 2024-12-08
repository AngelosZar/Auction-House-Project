import { API_READ_LISTINGS, API_KEY } from '../../utilities/constants';
import { returnToken } from '../../utilities/returnToken';

export const deleteListing = async function (id) {
  const accessToken = returnToken();
  try {
    const response = await fetch(`${API_READ_LISTINGS}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': `${API_KEY}`,
      },
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
