import { data } from 'autoprefixer';
import { API_BASE } from '../../utilities/constants';
import { headers } from '../../utilities/headers';
import { API_KEY } from '../../utilities/constants';
import { parse } from 'postcss';

export const updateProfileApiCall = async (name, userData) => {
  //   console.log('  API call to update profile');
  //   const currentUser = localStorage.getItem('currentUser');
  //   if (!currentUser) throw new Error('No user data found');
  //   if (currentUser) {
  //     console.log('currentUser', currentUser);
  //   }
  //   const { accessToken } = JSON.parse('currentUser');
  //   console.log(currentUser.accessToken);
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) throw new Error('No user data found');

  const { accessToken } = JSON.parse(currentUser);
  console.log(accessToken);

  try {
    const response = await fetch(`https://v2.api.noroff.dev/auction/profiles/${name}`, {
      // const response = await fetch(`${API_BASE}/auction/profiles/${name}`, {
      //   ask why this is  not working
      //
      // Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://v2.api.noroff.dev/auction/profiles/kimYong. (Reason: CORS request did not succeed). Status code: (null).
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
    console.log(Promise.resolve(userData));

    console.log('  Profile updated', res);
    return res;
  } catch (error) {
    console.error('  Error updating profile', error);
  }
};

// PUT
// /auction/profiles/<name>
// Update or set bio, banner and avatar properties.

// You may provide any combination of the properties, but at least one must be provided.
export const testData = {
  bio: 'string',
  avatar: {
    url: 'https://images.unsplash.com/photo-1476348644449-f68b865b98e4?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'beauty',
  },
  banner: {
    url: 'https://images.unsplash.com/photo-1731466450638-959a6f0d1514?q=80&w=1475&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'random img',
  },
};
