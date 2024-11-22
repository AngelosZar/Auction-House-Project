import { API_READ_LISTINGS } from '../../utilities/constants';
import { returnToken } from '../../utilities/returnToken';
import { API_KEY } from '../../utilities/constants';

export const createListing = async function (testData) {
  console.log('hei i am here to create a listing');
  const accessToken = returnToken();
  try {
    const response = await fetch(`${API_READ_LISTINGS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': `${API_KEY}`,
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// await createListing();

// {
//     "title": "string",
//     "description": "string",
//     "endsAt": "2024-11-22T20:50:21.899Z",
//     "tags": [
//       "string"
//     ],
//     "media": [
//       {
//         "url": "string",
//         "alt": ""
//       }
//     ]
//   }

const testData = {
  title: 'Macbook Not pro',
  description: 'This is a macbook pro , very good condition',
  endsAt: '2024-11-22T20:50:21.899Z',
  tags: ['electronics'],
  media: [
    {
      url: 'https://images.unsplash.com/photo-1518448828347-28e2cf0d6e28?q=80&w=1436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'laptop',
    },
  ],
};
await createListing(testData);
