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
    }
    // console.log(data);
    // console.log(response);
    return data;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

//
const testData = {
  title: 'test',
  description: 'This is a macbook pro , very good condition',
  tags: ['electronics'],
  media: [
    {
      url: 'https://images.unsplash.com/photo-1518448828347-28e2cf0d6e28?q=80&w=1436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'laptop',
    },
  ],
  endsAt: '2025-12-26T20:50:21.899Z',
};
