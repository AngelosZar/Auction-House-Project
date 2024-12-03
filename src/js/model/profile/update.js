import { API_KEY } from '../../utilities/constants';

export const updateProfileApiCall = async (name, userData) => {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) throw new Error('No user data found');

  const { accessToken } = JSON.parse(currentUser);
  console.log(accessToken);

  try {
    const response = await fetch(`https://v2.api.noroff.dev/auction/profiles/${name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': `${API_KEY}`,
      },
      body: JSON.stringify(userData),
    });

    const res = await response.json();

    if (!response.ok) {
      alert(res.errors[0].message);
      throw new Error(res.errors[0].message);
    }
    // console.log(Promise.resolve(userData));

    // console.log('  Profile updated', res);
    return res;
  } catch (error) {
    console.error('  Error updating profile', error);
  }
};
