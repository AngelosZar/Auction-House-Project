import { API_AUTH_REGISTER } from '../../utilities/constants';

// const testData = {};
export const signUpApiCall = async (data) => {
  console.log('i am fetching data');
  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorResponse = await res.json();
      console.log(errorResponse);
      let mappedErrors = 'Unexpected error';
      if (errorResponse.errors && errorResponse.errors.length > 0) {
        mappedErrors = errorResponse.errors.map((error) => error.message).join('\n');
      }
      alert(mappedErrors);
      console.log(mappedErrors);
      throw new Error('Failed to register');
    }
    console.log(response.json());
    console.log(response);
    return response.json();
  } catch (error) {
    throw Error;
  }
};
// {
//     "name": "my_username", // Required
//     "email": "first.last@stud.noroff.no", // Required
//     "password": "UzI1NiIsInR5cCI", // Required
//     "bio": "This is my profile bio", // Optional
//     "avatar": {
//       "url": "https://img.service.com/avatar.jpg", // Optional
//       "alt": "My avatar alt text" // Optional
//     },
//     "banner": {
//       "url": "https://img.service.com/banner.jpg", // Optional
//       "alt": "My banner alt text" // Optional
//     },
//     "venueManager": true // Optional
//   }
