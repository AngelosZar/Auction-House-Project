import { API_READ_PROFILES } from '../../utilities/constants';
import { headers } from '../../utilities/headers';
import { API_KEY } from '../../utilities/constants';
// console.log(API_KEY);
// const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// console.log(currentUser.email);
//
// console.log(API_READ_PROFILES);
export async function readProfiles() {
  console.log('I am fetching data from the server - models/profile/read.js');
  const { accessToken } = JSON.parse(localStorage.getItem('currentUser'));
  try {
    const response = await fetch(API_READ_PROFILES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });
    const userData = await response.json();
    if (!response.ok) {
      throw new Error(userData.errors?.[0]?.message || 'Failed to fetch profiles');
    }
    console.log('userdata', userData);
    console.log(Promise.resolve(userData));
    return userData;
    // need authorization header
  } catch (error) {
    // console.error('Error:', responseData.errors[0].message);
    console.error(error);
  }
}

export async function readProfile() {
  console.log('I am fetching data from the server - models/profile/read.js');
  // fetch function to get the data from the server
  //   return userdata;
}
