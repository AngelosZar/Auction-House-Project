import { API_READ_LISTINGS } from '../../utilities/constants';
import { returnToken } from '../../utilities/returnToken';
import { API_KEY } from '../../utilities/constants';

export const bidOnListing = async function (bid, id) {
  const accessToken = returnToken();
  try {
    const response = await fetch(`${API_READ_LISTINGS}/${id}/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': `${API_KEY}`,
      },
      body: JSON.stringify(bid),
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.errors[0].message);
      throw new Error(data.errors[0].message);
    }
    console.log(' route :model.listings.bid.js');
    console.log(data);
    console.log(response);
    return data;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

const bid = {
  //   amount: 10, // Required
};
