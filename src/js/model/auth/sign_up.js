import { API_AUTH_REGISTER } from '../../utilities/constants';

// const testData = {};
export const signUpApiCall = async (data) => {
  console.log('i am fetching data');
  //   try {
  //     const response = await fetch(API_AUTH_REGISTER, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     if (!res.ok) {
  //       const errorResponse = await res.json();
  //       let mappedErrors = 'Unexpected error';
  //       if (errorResponse.errors && errorResponse.errors.length > 0) {
  //         mappedErrors = errorResponse.errors.map((error) => error.message).join('\n');
  //       }
  //       alert(mappedErrors);
  //       console.log(mappedErrors);
  //       throw new Error('Failed to register');
  //     }
  //     console.log(response.json());
  //     console.log(response);
  //     return response.json();
  //   } catch (error) {
  //     return error;
  //   }
};
