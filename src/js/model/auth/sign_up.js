import { API_AUTH_REGISTER } from '../../utilities/constants';

export const signUpApiCall = async (data) => {
  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok || response.status === 400) {
      const errorMessage = responseData.errors[0].message;
      const errorStatus = responseData.status;
      const errorCode = responseData.statusCode;
      console.log('responseData', responseData);
      console.log('errorMessage', errorMessage);
      console.log('errorStatus', errorStatus);
      console.log('errorCode', errorCode);
      throw new Error(errorMessage);
    }
    //
    return responseData;
  } catch (error) {
    throw error;
  }
};
